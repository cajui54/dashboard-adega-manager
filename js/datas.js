const typeArr = ['cerveja', 'refrigerante', 'vodka', 'energetico', 'cachaça'];


const getProductsStorage = () => {
    let products = [];

    if(sessionStorage.getItem('products')){
        products = JSON.parse(sessionStorage.getItem('products'));
    }

    return products;
}

const insertStorage = (_dataProducts) => {

    let products = getProductsStorage();

    products.push(_dataProducts);

    sessionStorage.setItem('products', JSON.stringify(products));
    loadStorage();
}

const saveStorage = (data) => {
    const products = [];
    let dataProducts = {};
    let keysProduct = Object.keys(data);
    let values = Object.values(data)

    keysProduct.forEach((key, index) =>{
        dataProducts[key] = values[index].value;
        const {price, amount} = dataProducts;
        dataProducts.total = calculateTotal(parseFloat(price), parseFloat(amount));
    });

    insertStorage(dataProducts);
}

const calculateTotal = (_price, _amount) => _price * _amount;

const formatMoney = new Intl.NumberFormat('pt-Br',{
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
});

//load table
const loadStorage = () => {
    let $tbody = document.getElementById('tbody');
    $tbody.innerHTML = '';
    const products = getProductsStorage();

    products.map(({id, description, brand, type, price, amount, total}) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${id}</td>
            <td>${description}</td>
            <td>${brand}</td>
            <td>${type}</td>
            <td>${formatMoney.format(price)}</td>
            <td>${amount}</td>
            <td>${formatMoney.format(total)}</td>
            <td>
            <button class="btn-edit-table btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="btn-delete-table btn-danger"><i class="fa-solid fa-trash-can"></i></button>
        </td>
        `;
        $tbody.appendChild(tr);
    });
}
//start seach
let lblMsg = document.querySelector('.lbl-msg');
let listSeach = document.getElementById('list-seach');

const checkIdSeach = (_input) => {
    const dataStorage  = getProductsStorage();
    const inputId = _input.value.toUpperCase();
    if(dataStorage.map(({id}) => id).includes(inputId)){
        return true;
    }
    else {
        _input.focus();
        lblMsg.innerText = `ocorreu um erro, código não encontrado!`;
        lblMsg.classList.add('msgError');
        return false;
    }
}

const loadSeachItem = (_inputId) => {
    listSeach.innerHTML = '';
    const dataStorage  = getProductsStorage();
    const inputId = _inputId.value.toUpperCase();
    
    dataStorage.find(product => {
    
        const {id, description, brand, type, price, amount, total} = product;
        if(product.id === inputId){
            
            listSeach.innerHTML = `
                <li>${id}</li>
                <li>${description}</li>
                <li>${brand}</li>
                <li>${type}</li>
                <li>${formatMoney.format(price)}</li>
                <li>${amount}</li>
                <li>${formatMoney.format(total)}</li>
            `;
            
        }
    });

    _inputId.value = '';
}

// end seach
loadStorage();
 
/*delete of storage*/
const deleteItemStorage = (index) => {
    
    let produtctsDatas = getProductsStorage();
    produtctsDatas.splice(index, 1);
    sessionStorage.setItem('products', JSON.stringify(produtctsDatas));
    loadStorage();
}
//section info
//money
let totalPrice =  document.getElementById('output-values-total');

const AccumulateTotalPrice = (acc, curr, total) =>  acc + parseFloat(curr.total);

const sumTotalPrice = () => {
    let products = getProductsStorage();
    let total = products.reduce(AccumulateTotalPrice, 0);
    totalPrice.innerText = formatMoney.format(total); 
}
sumTotalPrice();

//amount
let totalAmount = document.getElementById('output-values-total-amont');
let totalStockNow = document.getElementById('output-stock-now');
let totalStockTotal = document.getElementById('output-stock-total');

const AccumulateTotalAmount = (acc, curr) => acc + parseFloat(curr.amount);
const sumNewStock = (stock) => 5000 - stock;

const sumTotalAmount = () =>{
    let products = getProductsStorage();
    let getTotal = products.reduce(AccumulateTotalAmount, 0);
    totalAmount.innerText = getTotal;
    totalStockNow.innerText = getTotal;
    totalStockTotal.innerText = sumNewStock(getTotal);
}

const saveUpdate = (data) => {
    sessionStorage.setItem('products', JSON.stringify(data));
    loadStorage();
}

const dataUpdateStorage = (inputs, _indexInputs) => {
    let dataProducts = getProductsStorage();
    let keys = Object.keys(inputs);
    let values = Object.values(inputs);
    let itemUpdated = {};

    keys.forEach((key, index) => {
        itemUpdated[key] = values[index].value;
        const {price, amount} = itemUpdated;
        itemUpdated.total = calculateTotal(parseFloat(price), parseFloat(amount));
        
    });

    dataProducts[_indexInputs] = itemUpdated;
    saveUpdate(dataProducts);

}

sumTotalAmount();

export {typeArr, saveStorage, getProductsStorage, deleteItemStorage, checkIdSeach, loadSeachItem, sumTotalPrice, sumTotalAmount, dataUpdateStorage};