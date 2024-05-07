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
        }
    });

const pass2 = document.querySelector('#confirm-password');
    pass2.addEventListener("change", function(){
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

    // Função para avançar para o próximo container
function avancarParaProximoContainer(containerAtual, proximoContainer) {
    containerAtual.style.display = "none"; // Esconde o container atual
    proximoContainer.style.display = "block"; // Mostra o próximo container
}

// container do cadastro --------------------------------------------------------------------------------------------

document.getElementById('submit-btn').addEventListener('click', function() {
    var containerAtual = document.getElementById('cadastro-container');
    var proximoContainer = document.getElementById('cadastro1-container');
    if(verifyEmail(email.value) && telefone.value && verifyPass(pass.value) && pass2.value === pass.value){
        avancarParaProximoContainer(containerAtual, proximoContainer);
    }else{
        Swal.fire({
            icon: "error",
            title: "Preencha os dados corretamente!",
            text: "Usuário ou senha estão incorretos",
            //footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
});


document.getElementById('submit-btn1').addEventListener('click', function(event){
    var containerAtual = document.getElementById('cadastro1-container');
    var proximoContainer = document.getElementById('cadastro2-container');

    if(verifyName(nameU.value) && end.value && complemento.value && bairro.value && nasc.value && verifyNumber(number.value) && (verifyCNPJ(ident) || verifyCPF(ident.value)) && verifyCEP(cep.value) && verifyCity(city.value)){
        avancarParaProximoContainer(containerAtual, proximoContainer);
    }else{
        Swal.fire({
            icon: "error",
            title: "Preencha os dados corretamente!",
            text: "Usuário ou senha estão incorretos",
            //footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
});

//Enviando Formulario
document.getElementById('submit-btn-cadastro2').addEventListener('click', function(event) {
    ControlCadaster(email.value, telefone.value, pass.value, nameU.value, end.value, complemento.value, bairro.value, nasc.value,number.value, ident.value,cep.value, city.value, empresa.value);

    window.location.href = 'paginaInicial.html';
});

// animando a barra de progresso --------------------------------------------------------------------------------------------

const contBtns = document.querySelectorAll(".btn-primary, .btn-primary1");
const progress = document.getElementById("progress");
const formStep = document.querySelectorAll(".cadastro-container");
const progressSteps = document.querySelectorAll(".progress-step")

let formStepsNum = 0;

contBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepsNum ++;
        updateFormSteps();
        updateProgressbar();
    })
});


function updateFormSteps(){
    formStep[formStepsNum].classList.add("cadastro-container-ativo")
}

function updateProgressbar(){
   progressSteps.forEach((progressStep, idx) => {
       if(idx < formStepsNum + 1) {
        progressStep.classList.add('progress-step-active');
       }
       else{
        progressStep.classList.remove('progress-step-active');
       }
   })
}

const progressActive = document.querySelectorAll(".progress-step-active");

progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%';