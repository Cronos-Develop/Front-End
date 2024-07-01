// Função para carregar os dados da empresa
var empresaF;
function carregarDadosEmpresa() {
    var response = ControlEnterprises();
    var t = localStorage.getItem("myEnterprise");
    let i;
    if(t){
        i = t;
    }else{
        i = 0;
    }
    let empresa = JSON.parse(response);
    console.log(empresa)
    empresa = empresa[i];
    empresaF = empresa;
    console.log(empresa)
    document.querySelector('#nomeE').value = empresa.nome_da_empresa;
    document.querySelector('#descricaoE').value = empresa.resumo;
    document.querySelector('#identifierE').value = empresa.nicho;
}

// Função para validar os campos do formulário
function validarCampos() {
    let nomeValido = verifyName(document.querySelector('#nomeE').value);
    let descricaoValida = document.querySelector('#descricaoE').value !== "";

    if (nomeValido && descricaoValida){
        return true;
    }
    return false;
}

// Função para alterar os dados da empresa
function alteraCad() {
    if (validarCampos()) {
        let nome = document.querySelector('#nomeE').value;
        let descricao = document.querySelector('#descricaoE').value;
        let nicho = document.querySelector('#identifierE').value;

        if (alteraCadastroEmpresa(nome, descricao, nicho, empresaF.id) == 1) {
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
                    alteraCadastroEmpresa(nome, descricao, nicho, empresaF.id);
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
