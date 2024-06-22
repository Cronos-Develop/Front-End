    // Função para exibir pop-up de Participantes
    function addParticipants(){
        let CPF;
        Swal.fire({
            title: 'Participantes',
            html: `
                <p>Aqui você pode visualizar e gerenciar os participantes da empresa.</p>
                <label for="participantName">CPF do Participante:</label>
                <input type="text" id="participantName" class="swal2-input" placeholder="CPF do Participante">
            `,
            confirmButtonText: 'Adicionar',
            preConfirm: () => {
                const participantName = document.getElementById('participantName').value;
                CPF = participantName.value;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (adicionarParticipante(CPF) == 1) Swal.fire('Sucesso!', 'Participante adicionado com sucesso!', 'success');
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Algo deu errado!",
                        text: "Tente novamente mais tarde.",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Tentar novamente!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            aux()
                        }});
                }
            }
        });
    }

    function aux(){
        Swal.close()
        addParticipants();
    }

    console.log(empresa)
    var code = `<table>`;
    let resp = getPartiners(empresa[i].id)
    let info = JSON.parse(resp);
    console.log(info)
    for(j=0; j<info.lenght; j++){
        code += `<tr><td>${info[j].name}</td><td><button onclick="deletaPartner(${empresa[i].id},${info[j].id})"></button?</td></tr>`
    }
    code += `</table>`;
    
    function showParticipants() {
        Swal.fire({
            title: 'Participantes',
            html: code,
            confirmButtonText: 'Adicionar',
        }).then((result) => {
            if (result.isConfirmed) {
                aux()
            }
        });
    }

    // função para adicionar o participante para as tarefas da empresa:

document.addEventListener('DOMContentLoaded', function () {
    const adicionarParticipanteBtn = document.getElementById('adicionar-participante');
  
    adicionarParticipanteBtn.addEventListener('click', function () {
      Swal.fire({
        title: "Coloque o nome do usuário que deseja adicionar",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Adicionar",
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
          try {
            const githubUrl = `https://api.github.com/users/${login}`;
            const response = await fetch(githubUrl);
            if (!response.ok) {
              return Swal.showValidationMessage(`
                ${JSON.stringify(await response.json())}
              `);
            }
            return response.json();
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login} foi adicionado para as atividades da empresa`,
            imageUrl: result.value.avatar_url
          });
        }
      });
    });
  });
  
  // ------------------------------------------------------------------------------------------------------------------------------------------------  

    // Função para exibir pop-up de Permissões
    // function showPermissions() {
    //     Swal.fire({
    //         title: 'Permissões',
    //         html: `
    //             <p>Aqui você pode configurar as permissões dos usuários.</p>
    //             <label for="userName">Nome do Usuário:</label>
    //             <input type="text" id="userName" class="swal2-input" placeholder="Nome do Usuário">
    //             <label for="userPermission">Permissão:</label>
    //             <select id="userPermission" class="swal2-select">
    //                 <option value="admin">Administrador</option>
    //                 <option value="editor">Editor</option>
    //                 <option value="viewer">Visualizador</option>
    //             </select>
    //         `,
    //         confirmButtonText: 'Salvar',
    //         preConfirm: () => {
    //             const userName = document.getElementById('userName').value;
    //             const userPermission = document.getElementById('userPermission').value;
    //             return { userName, userPermission };
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             const { userName, userPermission } = result.value;
    //             // Aqui você pode adicionar a lógica para salvar as permissões do usuário
    //             Swal.fire('Sucesso!', 'Permissões salvas com sucesso!', 'success');
    //         }
    //     });
    // }

    // Adiciona os event listeners aos botões
    document.querySelector('.btn-conf[onclick=""]').addEventListener('click', showCompanyInfo);
    document.querySelector('.btn-conf[onclick=""]').addEventListener('click', showParticipants);
    // document.querySelector('.btn-conf[onclick=""]').addEventListener('click', showPermissions);
