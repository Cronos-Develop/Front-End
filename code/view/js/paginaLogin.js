const signup = "./paginaCadastro.html"
const forgot = "./paginaRecuperaSenha.html"
const ident = document.querySelector('#identifier');
const pass = document.querySelector('#password');

function stateIdent(response){
    const label = document.querySelector('#fix-data-ident');
    if(!response){
        ident.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "CPF inválido";
    }else{
        ident.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
    }
}

function statePass(response){
    const label = document.querySelector('#fix-data-pass');
    if(!response){
        pass.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Senha inválida";
    }else{
        pass.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
    }
}

function direct(page){
    switch(page){
        case 0:
            window.location.href = signup;
            break;
        case 1:
            window.location.href = forgot;
            break;
    }
}

function login(){
    if(ident.value && pass.value){
        //Aqui vão acontecer as requisições de usuário e senha
    }else{
        stateIdent(false);//false para deixar campo vermelho
        statePass(false);//true para deixar campo normal
    }
}