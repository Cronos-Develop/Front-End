var response2 = ControlUsers();
let Nusuario = JSON.parse(response2);
console.log(Nusuario);

const Nome = document.querySelector('#nome');

const email = document.querySelector('#email');

const telefone = document.querySelector('#phone');

const cep = document.querySelector('#cep');

const cidade = document.querySelector('#cidade');

const endereco = document.querySelector('#endereco');

const bairro = document.querySelector('#bairro');

const number = document.querySelector('#number');

const compl = document.querySelector('#compl');

Nome.value = Nusuario.success.name;
email.value = Nusuario.success.email;
telefone.value = Nusuario.success.telefone;
cep.value = Nusuario.success.cep;

let vetor = Nusuario.success.endereco.split(",")
console.log(vetor);
endereco.value = vetor[2];
bairro.value = vetor[1];
number.value = vetor[3].replace("Número:", "");
cidade.value = vetor[0];
compl.value = vetor[4];

Nome.addEventListener("change", function(){
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
});

cidade.addEventListener("change", function(){
    const label = document.querySelector('#fix-data-city');
    if(!verifyCity(cidade.value)){
        cidade.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Cidade não possui nome válido";
    }else{
        cidade.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});

function alteraCad(){
    if(verifyName(Nome.value) && verifyEmail(email.value) && telefone.value && verifyCEP(cep.value) && endereco.value && bairro.value && verifyNumber(number.value) && verifyCity(cidade.value)){
        if(alteraCadastro(Nome.value, email.value, telefone.value, cep.value, endereco.value, bairro.value, number.value, cidade.value, compl.value) == 1){
            Swal.fire({
                icon: "success",
                title: "Alteração feita com sucesso!",
                text: "Aperte no botão azul",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Voltar à página inicial"
            }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = './paginaInicial.html';
                }});
        }else{
            Swal.fire({
                icon: "error",
                title: "Algo deu errado!",
                text: "Tente novamente mais tarde.",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Tentar Novamente!"
            }).then((result) => {
                if (result.isConfirmed) {
                  alteraCad();
            }});
        }
    }else{
        Swal.fire({
            icon: "error",
            title: "Algo não está correto",
            text: "Verifique se há alguma coisa escrita em vermelho para você corrigir ou se você deixou algo vazio.",
        })
    }
}