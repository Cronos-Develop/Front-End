<<<<<<< HEAD
/*Funções para o cadastro e para a tela de progresso*/

const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressBar();
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressBar();
    });
});

function updateFormSteps() {
    formSteps.forEach(formStep => {
        formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    })

    formSteps[formStepsNum].classList.add("form-step-active");
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
=======
//Validar dados
    const email = document.querySelector('#email');
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

    const pass2 = document.querySelector('#confirm-password');
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
    const telefone = document.querySelector('#phone');
    const pass = document.querySelector('#password');
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

//Segunda Tela
const nameU = document.querySelector('#nome');
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

 const ident = document.querySelector('#identifier');
    ident.addEventListener("change", function(){
        const label = document.querySelector('#fix-data-ident');
        if(!verifyCPF(ident.value) && !verifyCNPJ(ident)){
            ident.style.borderColor = 'red';
            label.style.color = 'red';
            label.innerHTML = "CPF ou CNPJ inválido";
        }else{
            ident.style.borderColor = "#C6C6C6";
            label.innerHTML = "";
            label.style.color = 'black';
        }
    });   

 const cep = document.querySelector('#cep');
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
 })

 const city = document.querySelector('#cidade');
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
 })

 const end = document.querySelector('#endereco');
 const complemento = document.querySelector('#compl');
 const bairro = document.querySelector('#bairro');

 const nasc = document.querySelector('#data-nascimento');
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

 const number = document.querySelector('#number');
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

 //Terceiro formulario
const empresa = document.querySelector('#nome-empresa');
>>>>>>> develop

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1 )) * 100 + "%";
}

<<<<<<< HEAD
/*--------------------------------------------------------------------------------------------------------------------------------------------- */

document.getElementById('data-nascimento').addEventListener('input', function() {
    var input = this.value;
    if (input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
        var day = parseInt(input.split('/')[0]);
        var month = parseInt(input.split('/')[1]);
        var year = parseInt(input.split('/')[2]);

        if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > (new Date().getFullYear())) {
            document.getElementById('fix-data-date').textContent = "Data inválida";
        } else {
            document.getElementById('fix-data-date').textContent = "";
        }
    } else {
        document.getElementById('fix-data-date').textContent = "Formato inválido";
    }
=======
// container do cadastro --------------------------------------------------------------------------------------------

document.getElementById('submit-btn').addEventListener('click', function() {
    var containerAtual = document.getElementById('cadastro-container');
    var proximoContainer = document.getElementById('cadastro1-container');
    if(verifyEmail(email.value) && telefone.value && verifyPass(pass.value).charAt(0)==0 && pass2.value === pass.value){
        avancarParaProximoContainer(containerAtual, proximoContainer);
    }else{
        Swal.fire({
            icon: "error",
            title: "Preencha os dados corretamente!",
            text: "Verifique as caixas com letras vermelhas em baixo delas",
            //footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
});


document.getElementById('submit-btn1').addEventListener('click', function(event){
    var containerAtual = document.getElementById('cadastro1-container');
    var proximoContainer = document.getElementById('cadastro2-container');
    if(verifyName(nameU.value) && end.value && complemento.value && bairro.value && verifyDate(nasc.value) && verifyNumber(number.value) && (verifyCNPJ(ident) || verifyCPF(ident.value)) && verifyCEP(cep.value) && verifyCity(city.value)){
        avancarParaProximoContainer(containerAtual, proximoContainer);
    }else{
        Swal.fire({
            icon: "error",
            title: "Preencha os dados corretamente!",
            text: "Verifique as caixas com letras vermelhas em baixo delas",
            //footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
});

//Enviando Formulario
document.getElementById('submit-btn-cadastro2').addEventListener('click', function(event) {
    ControlCadaster(email.value, telefone.value, pass.value, nameU.value, end.value, complemento.value, bairro.value, nasc.value,number.value, ident.value,cep.value, city.value, empresa.value);

    window.location.href = 'paginaInicial.html';
>>>>>>> develop
});