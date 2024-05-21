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

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1 )) * 100 + "%";
}

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
});