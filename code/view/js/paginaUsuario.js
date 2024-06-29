const dict = {
  "logout": `<h2 id="sair-da-conta-logout-">Sair da conta(logout)</h2>
              <ol>
                <li>Selecione a aba &#39;Perfil&#39;</li>
                <li>Pressione o botão &#39;Sair&#39;</li>
                <li>Pressione &#39;Sim&#39; para confirmar</li>
              </ol>`,
  "AlteraSenha": `<h2 id="mudan-a-de-senha">Mudança de senha</h2>
                  <ol>
                    <li>Selecione a aba &#39;Perfil&#39;</li>
                    <li>Pressione o botão &#39;Informações de conta&#39;</li>
                    <li>Pressione o ícone do &#39;lápis&#39; na seção &#39;Informações de Conta&#39; para editar</li>
                    <li>Insira a senha anterior</li>
                    <li>Insira a senha nova</li>
                    <li>Confirme as alterações</li>
                  </ol>`,
  "Criaempresa": `<h2 id="cria-o-de-empresa">Criação de empresa</h2>
                    <ol>
                      <li>Selecione a aba &#39;Empresas&#39;</li>
                      <li>Pressione o botão &#39;Editar Empresas&#39;</li>
                      <li>Pressione o botão &#39;Nova Empresa&#39;</li>
                      <li>Insira os dados da nova empresa</li>
                      <li>Confirme as alterações</li>
                    </ol>`,
  "AlteraEmpresa": `<h2 id="alterar-empresa-gerenciada">Alterar empresa gerenciada</h2>
                    <ol>
                      <li>Selecione a aba &#39;Empresas&#39;</li>
                      <li>Selecione uma empresa existente</li>
                      <li>Confirme a mudança</li>
                    </ol>`,
  "AlteraEmpresaD": `<h2 id="alterar-dados-de-empresa">Alterar dados de empresa</h2>
                    <ol>
                      <li>Selecione a aba &#39;Empresas&#39;</li>
                      <li>Pressione o botão &#39;Editar Empresas&#39;</li>
                      <li>Selecione uma empresa existente</li>
                      <li>Faça a edição da empresa selecionada</li>
                      <li>Confirme as alterações</li>
                    </ol>`,
  "CriaTarefa": `<h2 id="criar-tarefas">Criar tarefas</h2>
                  <ol>
                    <li>Selecione a aba &#39;Tarefas&#39;</li>
                    <li>Pressione o botão &#39;Criar Tarefa&#39;</li>
                    <li>Insira as informações necessárias</li>
                    <li>Confirme as alterações</li>
                  </ol>`,
  "EditaTarefa": `<h2 id="editar-tarefas">Editar tarefas</h2>
                  <ol>
                    <li>Selecione a aba &#39;Tarefas&#39;</li>
                    <li>Selecione uma tarefa</li>
                    <li>Aperte no ícone do &#39;lápis&#39; para poder editar</li>
                    <li>Edite as informações</li>
                    <li>Confirme as alterações</li>
                  </ol>`,
  "ExcluiTarefa": `<h2 id="excluir-tarefas">Excluir tarefas</h2>
                    <ol>
                      <li>Selecione a aba &#39;Tarefas&#39;</li>
                      <li>Selecione uma tarefa</li>
                      <li>Aperte no ícone da &#39;lixeira&#39; para poder excluir</li>
                      <li>Confirme as alterações</li>
                    </ol>`,
  "MarcarTArefa": `<h2 id="marcar-tarefas">Marcar tarefas</h2>
                    <ol>
                      <li>Selecione a aba &#39;Tarefas&#39;</li>
                      <li>Seleciona uma tarefa</li>
                      <li>Pressione o botão &#39;Marcar Tarefa&#39;</li>
                      <li>Confirme as alterações</li>
                    </ol>`
}
function sucesso() {
    Swal.fire({
        title: "Tutorial",
        html: `
        <p><a href="#" onclick="tutorial('logout')" class="config-link">Sair da conta(logout)</a></p>
        <p><a href="#" onclick="tutorial('AlteraSenha')" class="config-link">Mudança de senha</a></p>
        <p><a href="#" onclick="tutorial('Criaempresa')" class="config-link">Criação de empresa</a></p>
        <p><a href="#" onclick="tutorial('AlteraEmpresa')" class="config-link">Alterar empresa gerenciada</a></p>
        <p><a href="#" onclick="tutorial('AlteraEmpresaD')" class="config-link">Alterar dados de empresa</a></p>
        <p><a href="#" onclick="tutorial('CriaTarefa')" class="config-link">Criar tarefas</a></p>
        <p><a href="#" onclick="tutorial('EditaTarefa')" class="config-link">Editar tarefas</a></p>
        <p><a href="#" onclick="tutorial('ExcluiTarefa')" class="config-link">Excluir tarefas</a></p>
        <p><a href="#" onclick="tutorial('MarcarTArefa')" class="config-link">Marcar tarefas</a></p>
        `,
        icon: "question"
      });
}

function tutorial(dictN){
  Swal.fire({
    title: "Tutorial",
    html: `<div style="justify-content: left; align=itens: left; text-align:left;">
    ${dict[dictN]}
    </div>`,
    icon: "question"
  });
}

// Função para mostrar pop-up com informações do usuário
function mostrarDadosUsuario() {
  Swal.fire({
      title: 'Informações da Conta',
      html: `
          <p><strong>Nome do Usuário:</strong> ${Nusuario.success.name}</p>
          <p><strong>CNPJ:</strong> ${Nusuario.success.cpf_cnpj}</p>
          <p><strong>Email:</strong> ${Nusuario.success.email}</p>
          <p><strong>Telefone:</strong> ${Nusuario.success.telefone}</p>
      `,
      icon: 'info',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Fechar',
      cancelButtonText: 'Alterar Dados',
      denyButtonText: 'Deletar Dados',
      customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-button',
          cancelButton: 'custom-swal-button-alt',
          denyButton: 'custom-swal-button-delete' 
      }
  }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = 'paginaAlteraDados.html';
      } else if (result.isDenied) {
          // Adicione aqui a lógica para deletar os dados do usuário
          Swal.fire({
              title: 'Tem certeza?',
              text: "Esta ação não pode ser desfeita !",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Deletar',
              cancelButtonText: 'Cancelar',
              customClass: {
                  confirmButton: 'custom-swal-button-delete',
                  cancelButton: 'custom-swal-button'
              }
          }).then((result) => {
              if (result.isConfirmed) {
                  // Lógica para deletar os dados
                  deletaUsuario();
                  Swal.fire('Deletado!', 'Os dados foram deletados com sucesso.', 'success');
              }
          });
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
          localStorage.removeItem("myHash");
          Swal.fire({
              title: "saiu",
              text: "Você saiu da conta",
              icon: "success"
          });
          window.location.href = './paginaLogin.html';
        }
      })}
      
// // Função para mostrar pop-up de configurações
// function mostrarConfiguracoes() {
//   Swal.fire({
//       title: 'Configurações',
//       html: `
//           <p><a href="#" class="config-link">Alterar Senha</a></p>
//           <p><a href="#" class="config-link">Configurações de Privacidade</a></p>
//           <p><a href="#" class="config-link">Notificações</a></p>
//       `,
//       icon: 'info',
//       confirmButtonText: 'Fechar',
//       customClass: {
//           popup: 'custom-swal-popup',
//           title: 'custom-swal-title',
//           confirmButton: 'custom-swal-button'
//       }
//   });
// }

// function salvarMudanca() {
//   Swal.fire({
//       title: "Do you want to save the changes?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: `Don't save`
//   }).then((result) => {
//       if (result.isConfirmed) {
//           Swal.fire("Saved!", "", "success");
//       } else if (result.isDenied) {
//           Swal.fire("Changes are not saved", "", "info");
//       }
//   });
// }