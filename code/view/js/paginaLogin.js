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
        if(Controllogin(ident.value, pass.value)){
            Swal.fire({
                title: "Login feito",
                text: "Usuário e senha corretos",
                icon: "success"
              });
              window.location.href = "./paginaInicial.html";
        }else{
            Swal.fire({
                icon: "error",
                title: "Tente Novamente",
                text: "Usuário ou senha estão incorretos",
              });
        }
    }else{
        stateIdent(false);//false para deixar campo vermelho
        statePass(false);//true para deixar campo normal
    }
}