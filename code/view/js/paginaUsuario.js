function sucesso() {

    Swal.fire({
        title: "Boa sorte!",
        text: "Esse é todo suporte que você precisa",
        icon: "success"
      });

}

function dados() {
Swal.fire({
    title: "Dados da conta",
    text: "Nome: Pedro Pascal",
    icon: "question"
  });
}

// Função para mostrar pop-up com informações do usuário
function mostrarDadosUsuario() {
    Swal.fire({
        title: 'Informações da Conta',
        html: `
            <p><strong>Nome do Usuário:</strong> Nome do Usuário</p>
            <p><strong>CNPJ:</strong> 00.000.000/0001-00</p>
            <p><strong>Email:</strong> usuario@empresa.com</p>
            <p><strong>Telefone:</strong> (00) 0000-0000</p>
        `,
        icon: 'info',
        confirmButtonText: 'Fechar',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            confirmButton: 'custom-swal-button'
        }
    });
}

// Função para mostrar pop-up de configurações
function mostrarConfiguracoes() {
    Swal.fire({
        title: 'Configurações',
        html: `
            <p><a href="#" class="config-link">Alterar Senha</a></p>
            <p><a href="#" class="config-link">Configurações de Privacidade</a></p>
            <p><a href="#" class="config-link">Notificações</a></p>
        `,
        icon: 'info',
        confirmButtonText: 'Fechar',
        customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            confirmButton: 'custom-swal-button'
        }
    });
}

function salvarMudanca() {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
}

function confirmarSair() {
    Swal.fire({
        title: "Tem certeza que deseja sair ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "saiu",
            text: "vc saiu da conta",
            icon: "success"
          });
        }
      });
}