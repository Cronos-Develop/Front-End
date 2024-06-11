document.addEventListener('DOMContentLoaded', (event) => {

    // Função para exibir pop-up de Participantes
    function showParticipants() {
        Swal.fire({
            title: 'Participantes',
            html: `
                <p>Aqui você pode visualizar e gerenciar os participantes da empresa.</p>
                <label for="participantName">Nome do Participante:</label>
                <input type="text" id="participantName" class="swal2-input" placeholder="Nome do Participante">
                <label for="participantRole">Cargo do Participante:</label>
                <input type="text" id="participantRole" class="swal2-input" placeholder="Cargo do Participante">
            `,
            confirmButtonText: 'Adicionar',
            preConfirm: () => {
                const participantName = document.getElementById('participantName').value;
                const participantRole = document.getElementById('participantRole').value;
                return { participantName, participantRole };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { participantName, participantRole } = result.value;
                // Aqui você pode adicionar a lógica para adicionar o participante
                Swal.fire('Sucesso!', 'Participante adicionado com sucesso!', 'success');
            }
        });
    }

    // Função para exibir pop-up de Permissões
    function showPermissions() {
        Swal.fire({
            title: 'Permissões',
            html: `
                <p>Aqui você pode configurar as permissões dos usuários.</p>
                <label for="userName">Nome do Usuário:</label>
                <input type="text" id="userName" class="swal2-input" placeholder="Nome do Usuário">
                <label for="userPermission">Permissão:</label>
                <select id="userPermission" class="swal2-select">
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Visualizador</option>
                </select>
            `,
            confirmButtonText: 'Salvar',
            preConfirm: () => {
                const userName = document.getElementById('userName').value;
                const userPermission = document.getElementById('userPermission').value;
                return { userName, userPermission };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { userName, userPermission } = result.value;
                // Aqui você pode adicionar a lógica para salvar as permissões do usuário
                Swal.fire('Sucesso!', 'Permissões salvas com sucesso!', 'success');
            }
        });
    }

    // Adiciona os event listeners aos botões
    document.querySelector('.btn-conf[onclick=""]').addEventListener('click', showCompanyInfo);
    document.querySelector('.btn-conf[onclick=""]').addEventListener('click', showParticipants);
    document.querySelector('.btn-conf[onclick=""]').addEventListener('click', showPermissions);
});

