/* Função tela de Cadastro 
const pass = document.querySelector('#password');
    pass.addEventListener("mouseout", function(){
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
 const ident = document.querySelector('#identifier');
    ident.addEventListener("mouseout", function(){
        const label = document.querySelector('#fix-data-ident');
        if(!verifyCPF(ident.value) && !verifyCNPJ(ident)){
            ident.style.borderColor = 'red';
            label.style.color = 'red';
            label.innerHTML = "CPF inválido";
        }else{
            ident.style.borderColor = "#C6C6C6";
            label.innerHTML = "";
            label.style.color = 'black';
        }
    });   
    
    */

    // Função para avançar para o próximo container
function avancarParaProximoContainer(containerAtual, proximoContainer) {
    containerAtual.style.display = "none"; // Esconde o container atual
    proximoContainer.style.display = "block"; // Mostra o próximo container
}

// Função para lidar com o envio do formulário
function enviarFormulario(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio de formulário

    // Aqui você pode adicionar a lógica para enviar o formulário, por exemplo, via AJAX

    // Exemplo de envio assíncrono do formulário
    // fetch('url_do_destino', {
    //     method: 'POST',
    //     body: new FormData(event.target)
    // })
    // .then(response => {
    //     if (response.ok) {
    //         // Redirecionar para outra página após o envio bem-sucedido
    //         window.location.href = 'outra_pagina.html';
    //     } else {
    //         // Tratar erros de envio, se necessário
    //     }
    // })
    // .catch(error => console.error('Erro ao enviar formulário:', error));
}

// container do cadastro --------------------------------------------------------------------------------------------

document.getElementById('submit-btn').addEventListener('click', function() {
    var containerAtual = document.getElementById('cadastro-container');
    var proximoContainer = document.getElementById('cadastro1-container');
    avancarParaProximoContainer(containerAtual, proximoContainer);
});


document.getElementById('submit-btn1').addEventListener('click', function(event) {
    enviarFormulario(event); 

    var containerAtual = document.getElementById('cadastro1-container');
    var proximoContainer = document.getElementById('cadastro2-container');
    avancarParaProximoContainer(containerAtual, proximoContainer);
});

document.getElementById('submit-btn-cadastro2').addEventListener('click', function(event) {
    enviarFormulario(event); 

    window.location.href = 'paginaInicial.html';
});

document.getElementById('btn-link1-cadastro2').addEventListener('click', function(event) {
    enviarFormulario(event); 

    window.location.href = 'paginaInicial.html';
});


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