
const lblMsgErrorForm = document.querySelectorAll('.lbl-mgs-error-form');
const lblAsterisk = document.querySelectorAll('.lbl');
//checkIdSeach

/*start Seach */
let lblMsg = document.querySelector('.lbl-msg');
let lblSeach = document.querySelector('.lblSeach');
let listSeach = document.getElementById('list-seach');

const checkIdField = (inputSeach) => {
    
    let msg = '';
    
    if(!inputSeach.value || inputSeach.value.length !== 4) {
        msg += 'Por favor, informe o código do produto, com 4 digitos!\n';
        inputSeach.classList.add('inputs');
    }
    if(msg != ''){
        inputSeach.focus();
        lblSeach.classList.add('msgError');
        lblMsg.innerText = msg;
        lblMsg.classList.add('msgError');
        return false;
    }
    return true;
}

const removeClassList = (input) => {
    input.classList.remove('inputs');
    lblSeach.classList.remove('msgError');
    lblMsg.innerText = '';
}

const clearSeach = (inputId) => {
    inputId.value = '';
    inputId.classList.remove('inputs');
    lblSeach.classList.remove('msgError');
    lblMsg.innerText = '';
    listSeach.innerHTML = '';
}
/*end Seach */
const checkInput = (_inputs) => {
    const fields = Object.values(_inputs);
    let msgError = '';
    fields.forEach((field, index) => {
        if(field.value === ''){
            msgError += 'Por favor preencha o campo \n';
            field.focus();

            lblMsgErrorForm[index].innerText = 'Por favor, preencha o campo obrigatório!';
            lblMsgErrorForm[index].classList.add('msgError');
            lblAsterisk[index].classList.add('msgError');
        }
        if(field.value === 'selecione') {
            msgError += 'Por favor selecione uma opção! \n';
            field.focus();
        }
    });

    if(msgError != ''){
        alert(msgError);
        return false;
    }
    return true;
}

const clearInputs = (inputs) => {
    inputs.forEach((input, index) => {
        if(input.name != 'type') input.value = '';
    });
}
const clearlabels = () => {
    lblMsgErrorForm.forEach((label, index) =>{
        label.textContent = ''
        lblAsterisk[index].classList.remove('msgError');
    });
}


const getAllIds = ({id}) => id;

const checkId = (inputId, datas) => {
    let id = inputId.value;
    if(datas.map(getAllIds).includes(id)) {
        inputId.focus();
        lblMsgErrorForm[0].innerText = `Este código que você digitou, já existe!`
        lblMsgErrorForm[0].classList.add('msgError');
        return false;
    }
    if(id.length !== 4){
        inputId.focus();
        lblMsgErrorForm[0].innerText = 'O código deve conter 4 digitos!'
        lblMsgErrorForm[0].classList.add('msgError');
        return false;
    }
    
    return true;
}


export {checkInput, clearInputs, clearlabels, checkId, checkIdField, removeClassList, clearSeach};