// Função para carregar os dados da empresa
function carregarDadosEmpresa() {
    var response = ControlUsers();
    let empresa = JSON.parse(response)[0];
    document.querySelector('#nomeE').value = empresa.name;
    document.querySelector('#descricaoE').value = empresa.description;
    document.querySelector('#identifierE').value = empresa.cnpj;
    document.querySelector('#cepE').value = empresa.cep;

    // Dividir o endereço em partes
    let enderecoCompleto = empresa.endereco.split(", ");
    document.querySelector('#endereco').value = enderecoCompleto[1];
    document.querySelector('#bairro').value = enderecoCompleto[0];

    let numeroECidade = enderecoCompleto[2].split(". ");
    document.querySelector('#number').value = numeroECidade[0];
    document.querySelector('#cidade').value = numeroECidade[1];
    document.querySelector('#compl').value = empresa.compl;
}

// Função para validar os campos do formulário
function validarCampos() {
    let nomeValido = verifyName(document.querySelector('#nomeE').value);
    let descricaoValida = document.querySelector('#descricaoE').value !== "";
    let cnpjValido = verifyCNPJ(document.querySelector('#identifierE').value);
    let cepValido = verifyCEP(document.querySelector('#cepE').value);

    return nomeValido && descricaoValida && cnpjValido && cepValido;
}

// Função para alterar os dados da empresa
function alteraCad() {
    if (validarCampos()) {
        let nome = document.querySelector('#nomeE').value;
        let descricao = document.querySelector('#descricaoE').value;
        let cnpj = document.querySelector('#identifierE').value;
        let cep = document.querySelector('#cepE').value;
        let endereco = document.querySelector('#endereco').value;
        let bairro = document.querySelector('#bairro').value;
        let numero = document.querySelector('#number').value;
        let cidade = document.querySelector('#cidade').value;
        let compl = document.querySelector('#compl').value;

        if (alteraCadastro(nome, descricao, cnpj, cep, endereco, bairro, numero, cidade, compl) == 1) {
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
                }
            });
        } else {
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
                }
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Algo não está correto",
            text: "Verifique se há alguma coisa escrita em vermelho para você corrigir ou se você deixou algo vazio.",
        });
    }
}

// Carregar os dados da empresa ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDadosEmpresa);

// Funções de validação específicas
document.querySelector('#nomeE').addEventListener("change", function() {
    const label = document.querySelector('#fix-data-name');
    if (!verifyName(this.value)) {
        this.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Nome inválido";
    } else {
        this.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});

document.querySelector('#descricaoE').addEventListener("change", function() {
    const label = document.querySelector('#fix-data-descricao');
    if (this.value === "") {
        this.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Descrição inválida";
    } else {
        this.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});

document.querySelector('#identifierE').addEventListener("change", function() {
    const label = document.querySelector('#fix-data-ident');
    if (!verifyCNPJ(this.value)) {
        this.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "CNPJ inválido";
    } else {
        this.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});

document.querySelector('#cepE').addEventListener("change", function() {
    const label = document.querySelector('#fix-data-cep');
    if (!verifyCEP(this.value)) {
        this.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "CEP inválido";
    } else {
        this.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});
