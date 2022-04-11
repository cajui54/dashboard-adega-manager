import {checkInput, clearInputs, clearlabels, checkId, checkIdField, removeClassList, clearSeach} from "./validation.js";
import {typeArr, saveStorage, getProductsStorage, deleteItemStorage, checkIdSeach, loadSeachItem, sumTotalPrice, sumTotalAmount, dataUpdateStorage} from './datas.js';

const $formRegister = document.getElementById('frm-add-product');
let btnConfirm = document.getElementById('btn-salve');
const btnCancel = document.getElementById('btn-cancel');
const inputSelect = document.getElementById('select-type');
$formRegister.addEventListener('submit', event => event.preventDefault());
const inputForm = document.querySelectorAll('#frm-add-product [name]');
const optionSelect =  document.querySelectorAll('#select-type option');

let indexToEdit;
let btn = true;

/*Section Seach start*/
const btnSeach = document.getElementById('btn-Seach');
const btnSeachClear = document.getElementById('btn-clear-seach');

const getInputSeach = () => document.getElementById('input-seach');

btnSeachClear.addEventListener('click', () => clearSeach(getInputSeach()));

const onSeach = () =>{
    let inputSeach = getInputSeach();
    if(checkIdField(inputSeach)) {
        if(checkIdSeach(inputSeach)){
            loadSeachItem(inputSeach);
        }
    }
}

getInputSeach().addEventListener('input', () => {
    removeClassList(getInputSeach());
})

btnSeach.addEventListener('click', onSeach);


/*end Seach*/

const getInputs = () => {
    const data = {};

    inputForm.forEach(element => {
        data[element.name] = element;
    });
    return data;
}

const loadFunctions = () => {
    loadBtnsDelete();
    sumTotalPrice();
    sumTotalAmount();
    loadBtnsEdit();
}
const onClick = () => {
    const dataInput = getInputs();
    let storageData = getProductsStorage();

    if(btn){
    
        if(checkInput(dataInput)){
            if(checkId(dataInput.id, storageData)){
                alert('Produto foi salvo com sucesso!');
                saveStorage(dataInput);
                
            }
        }
    }
    else{
        dataUpdateStorage(dataInput, indexToEdit);
        btnConfirm.innerText = 'Confirmar';
        btnConfirm.classList.remove('btnEdit');
        btn = true;
    }
    clearInputs(inputForm);
    loadFunctions();
}

btnConfirm.addEventListener('click', onClick);

/*Select */
const loadTypeSelect = () => {
    
    typeArr.forEach(value => {
        let option  = document.createElement('option');
        option.innerText = value;
        inputSelect.appendChild(option);
    });
}

/*Cancel*/
btnCancel.addEventListener('click',() => {
    clearInputs(inputForm);
    clearlabels();
    btnConfirm.innerText = 'Confirmar';
    
});

/* - Delete items of table*/
const deleteItemTable = (index) => {
    if(confirm('Você tem certeza que deseja excluir esse item ?')){
        deleteItemStorage(index);
        loadBtnsDelete();
        loadBtnsEdit();
        sumTotalPrice();
        sumTotalAmount();
    }
}

const loadBtnsDelete = () => {
    let btnTableDelete = document.querySelectorAll('.btn-delete-table');

    btnTableDelete.forEach((btn, index) =>{
        btn.addEventListener('click', () => deleteItemTable(index));
    });
}

// - Edit items of table
const loadInputToEdit = (_index) => {
    const products = getProductsStorage();
    let inputsForm = getInputs();

    inputForm.forEach((input) => {
        input.value =  products[_index][input.name];
    });
}
const changeBtn = () => {
    btn = false;
    btnConfirm.innerText = 'Editar';
    btnConfirm.classList.add('btnEdit');
}



const loadBtnsEdit = () => {
    let btnsEdit = document.querySelectorAll('.btn-edit-table');
    btnsEdit.forEach((btn, index) => {
        btn.addEventListener('click', () =>{
            loadInputToEdit(index);
            changeBtn();
            indexToEdit = index;
        });
    });
}

loadBtnsEdit();
loadBtnsDelete();
loadTypeSelect();
