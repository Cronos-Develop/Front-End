//1° Formulário:
const email = document.querySelector('#email');
const pass2 = document.querySelector('#confirm-password');
const telefone = document.querySelector('#phone');
const pass = document.querySelector('#password');

//2° Formulário
const end = document.querySelector('#endereco');
const complemento = document.querySelector('#compl');
const bairro = document.querySelector('#bairro');
const nasc = document.querySelector('#data-nascimento');
const nameU = document.querySelector('#nome');
const ident = document.querySelector('#identifier');
const cep = document.querySelector('#cep');
const city = document.querySelector('#cidade');
const number = document.querySelector('#number');

/*Funções para o cadastro e para a tela de progresso*/
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        updateFormSteps(0);
        updateProgressBar();
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        updateFormSteps(1);
        updateProgressBar();
    });
});

function updateFormSteps(num) {
    if(num == 0){
        console.log(formStepsNum);
        if(verifyForm()){
        formStepsNum++;
        formSteps.forEach(formStep => {
            formStep.classList.contains("form-step-active") &&
            formStep.classList.remove("form-step-active");
        });
            formSteps[formStepsNum].classList.add("form-step-active");
        }else{
            Swal.fire({
                icon: "error",
                title: "Preencha os dados corretamente!",
                text: "Verifique as caixas com letras vermelhas em baixo delas",
                //footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }else{
        formStepsNum--;
        formSteps.forEach(formStep => {
            formStep.classList.contains("form-step-active") &&
            formStep.classList.remove("form-step-active");
        });
        formSteps[formStepsNum].classList.add("form-step-active");
    }
}

function verifyForm(){
    if(formStepsNum == 0){
        if(verifyEmail(email.value) && telefone.value && verifyPass(pass.value).charAt(0)==0 && pass2.value === pass.value){
            return true;
        }
        return false;
    }else{
        if(formStepsNum == 1){
            if(verifyName(nameU.value) && end.value && bairro.value && verifyDate(nasc.value) && verifyNumber(number.value) && (verifyCNPJ(ident.value) || verifyCPF(ident.value)) && verifyCEP(cep.value) && verifyCity(city.value)){
                return true;
            }
            return false;
        }else{
            return false;
        }
    }
}
function updateProgressBar(){
    progressSteps.forEach((progressStep, idx) => {
        if(idx < formStepsNum + 1) 
        {
            progressStep.classList.add('progress-step-active');
        }
        else 
        {
            progressStep.classList.remove('progress-step-active');
        }
    })
    const progressActive = document.querySelectorAll(".progress-step-active");
    

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1 )) * 100 + "%";
}
//Validar dados
//1° Formulário:
email.addEventListener("change", function(){
    const label = document.querySelector('#fix-email');
    var response = verifyEmail(email.value);
    if(!response){
        email.style.borderColor = 'red';
        console.log(response);
        label.style.color = 'red';
        label.innerHTML = "Email inválido";
    }else{
        email.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
        label.style.color = 'black';
    }
});

pass2.addEventListener("change", function testaSenha(){
    const label = document.querySelector('#fix-confirm-password');
    if(pass2.value === pass.value){
        console.log("Iguais");
        pass2.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
        label.style.color = 'black';
    }else{
        pass2.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Senhas não conferem";
        console.log(pass2.value)
    }
});

pass.addEventListener("change", function(){
    const label = document.querySelector('#fix-data-pass');
    var response = verifyPass(pass.value);
    if(response.charAt(0)!=0){
        pass.style.borderColor = 'red';
        n = parseInt(response.charAt(0));
        response = response.replace(response.charAt(0), '');
        for(i=0; i<n; i++){
            response = response.replace(/\[|\,/, '');
            response = response.replace(']', '<br>');
        }
        console.log(response);
        label.style.color = 'red';
        label.innerHTML = response;
    }else{
        pass.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
        label.style.color = 'black';
        if(pass2.value){
            testaSenha();
        }
    }
});

//2° Formulário

nameU.addEventListener("change", function(){
    const label = document.querySelector('#fix-data-name');
    if(verifyName(nameU.value) == 0){
        nameU.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Nome inválido";
    }else{
        nameU.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});

ident.addEventListener("change", function(){
    console.log("FF");
    const label = document.querySelector('#fix-data-ident');
    if(!verifyCPF(ident.value) && !verifyCNPJ(ident.value)){
        ident.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "CPF ou CNPJ inválido";
    }else{
        ident.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});   

cep.addEventListener("change", function(){
const label = document.querySelector('#fix-data-cep');
if(!verifyCEP(cep.value)){
    cep.style.borderColor = 'red';
    label.style.color = 'red';
    label.innerHTML = "CEP inválido";
}else{
    cep.style.borderColor = "#C6C6C6";
    label.innerHTML = "";
    label.style.color = 'black';
}
});

city.addEventListener("change", function(){
const label = document.querySelector('#fix-data-city');
if(!verifyCity(city.value)){
    city.style.borderColor = 'red';
    label.style.color = 'red';
    label.innerHTML = "Cidade não possui nome válido";
}else{
    city.style.borderColor = "#C6C6C6";
    label.innerHTML = "";
    label.style.color = 'black';
}
});

nasc.addEventListener("change", function(){
    date = nasc.value;
    date = date.split("-")
    const label = document.querySelector('#fix-data-date');
    var response = verifyDate(date);
    if(response.charAt(0)!=0){
        nasc.style.borderColor = 'red';
        n = parseInt(response.charAt(0));
        response = response.replace(response.charAt(0), '');
        for(i=0; i<n; i++){
            response = response.replace('[', '');
            response = response.replace(/\|\,/, '');
            response = response.replace(']', '<br>');
        }
        console.log(response);
        label.style.color = 'red';
        label.innerHTML = response;
    }else{
        nasc.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
        label.style.color = 'black';
    }
})

number.addEventListener("change", function(){
const label = document.querySelector('#fix-data-number');
if(!verifyNumber(number.value)){
    number.style.borderColor = 'red';
    label.style.color = 'red';
    label.innerHTML = "Número inválido";
}else{
    number.style.borderColor = "#C6C6C6";
    label.innerHTML = "";
    label.style.color = 'black';
}
})

// container do cadastro --------------------------------------------------------------------------------------------
const empresa = document.querySelector('#nome-empresa');
//Enviando Formulario
function cadastro(){
    if(ControlCadaster(email.value, telefone.value, pass.value, nameU.value, end.value, complemento.value, bairro.value, nasc.value,number.value, ident.value,cep.value, city.value, empresa.value) == 1){
        Swal.fire({
            icon: "success",
            title: "Cadastro feito com sucesso!",
            text: "Aperte no botão azul",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Recarregar a página"
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './paginaLogin.html';
            }});
    }else{
        Swal.fire({
            icon: "error",
            title: "Algo deu errado!",
            text: "Tente novamente mais tarde.",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Recarregar a página"
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './paginaCadastro.html';
            }});
    }
};