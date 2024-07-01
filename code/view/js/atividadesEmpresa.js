function showAddActivityPopup() {
    Swal.fire({
        title: 'Adicionar Atividade',
        html: `
            <input type="text" id="activity-title" class="swal2-input" placeholder="Título da Atividade">
            <textarea id="activity-description" class="swal2-textarea" placeholder="Descrição da Atividade"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Adicionar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const title = Swal.getPopup().querySelector('#activity-title').value;
            const description = Swal.getPopup().querySelector('#activity-description').value;
            if (!title || !description) {
                Swal.showValidationMessage(`Por favor, preencha ambos os campos.`);
            }
            return { title: title, description: description };
        }
    }).then((result) => {
        var Vet = [];
        function constroiVet(number, flag=0){
            if(flag == 1){
                for(t=0; t<Vet.lenght; t++){
                    if(Vet[t]==number){
                        Vet.splice(t, 1);
                    }
                }
            }else{
                Vet.append(number)
            }
            Vet.sort()
            console.log(Vet)
        }
        if (result.isConfirmed) {
            const activity = result.value;
            saveActivity(activity);
            var resp = getAPI(activity.title);
            resp = JSON.parse(resp);
            console.log(resp);
            var codigo = `<table><tr><th>Tarefa retornada</th><th>Sim</th><th>Não</th></tr>`
            for(k=0; k<resp.length; k++){
                codigo += `<tr><td>${resp[k]}</td><td><input type="checkbox" id="yes" value="Sim" onchange="constroiVet(${k}"/></td><td><input type="checkbox" id="not" value="Não" onchange="constroiVet(${k}, 1)"/></td></tr>`
            }
            codigo += `</table>`
            Swal.fire({
                        title:'Escolha as atividades que deseja registrar:',
                        html: codigo,
                        icon:'question',
                        showCancelButton: true,
                        confirmButtonText: 'Salvar',
                        cancelButtonText: 'Cancelar',
                        customClass: {
                            popup: 'custom-swal-popup',
                            title: 'custom-swal-title',
                            confirmButton: 'custom-swal-button',
                            cancelButton: 'custom-swal-button-alt',
                            denyButton: 'custom-swal-button-delete' 
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var NewVet = []
                            for(k=0; k<resp.length; k++){
                                for(t=0; t<Vet.lenght; t++){
                                    if(k==Vet[t]){
                                        NewVet.append(resp[k]);
                                    }
                                }
                            }
                            adicionaAtividade(empresa[i].id, activity.title, activity.description);
                            var response2 = ControlTasks(empresa[i].id);
                            let tarefas2 = JSON.parse(response2);
                            for(j=0; j<tarefas2.length; j++){
                                if(tarefas2[j].tarefa == activity.title){
                                    addSubtarefa(tarefas2.id, NewVet);
                                    Swal.fire(`Atividade adicionada: ${activity.title}`);
                                    break;
                                }
                            }
                        }
                    });
        }
    });
}

function showAddActivityPopup2() {
    Swal.fire({
        title: 'Adicionar Atividade com Matriz GUT',
        html: `
            <input type="text" id="activity-title" class="swal2-input" placeholder="Título da Atividade">
            <textarea id="activity-description" class="swal2-textarea" placeholder="Descrição da Atividade"></textarea>
            <label for="gut-gravity" class="swal2-label">Gravidade:</label>
            <select id="gut-gravity" class="swal2-select">
                <option value="1">Sem gravidade</option>
                <option value="2">Pouco grave</option>
                <option value="3">Grave</option>
                <option value="4">Muito grave</option>
                <option value="5">Extremamente grave</option>
            </select>
            <label for="gut-urgency" class="swal2-label">Urgência:</label>
            <select id="gut-urgency" class="swal2-select">
                <option value="1">Pode esperar</option>
                <option value="2">Pouco urgente</option>
                <option value="3">Urgente</option>
                <option value="4">Muito urgente</option>
                <option value="5">Imediatamente</option>
            </select>
            <label for="gut-tendency" class="swal2-label">Tendência:</label>
            <select id="gut-tendency" class="swal2-select">
                <option value="1">Não irá mudar</option>
                <option value="2">Irá piorar a longo prazo</option>
                <option value="3">Irá piorar a médio prazo</option>
                <option value="4">Irá piorar a curto prazo</option>
                <option value="5">Irá piorar rapidamente</option>
            </select>
        `,
        showCancelButton: true,
        confirmButtonText: 'Adicionar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const title = Swal.getPopup().querySelector('#activity-title').value;
            const description = Swal.getPopup().querySelector('#activity-description').value;
            const gutGravity = parseInt(Swal.getPopup().querySelector('#gut-gravity').value);
            const gutUrgency = parseInt(Swal.getPopup().querySelector('#gut-urgency').value);
            const gutTendency = parseInt(Swal.getPopup().querySelector('#gut-tendency').value);

            if (!title || !description || !gutGravity || !gutUrgency || !gutTendency) {
                Swal.showValidationMessage(`Por favor, preencha todos os campos.`);
            }

            return { title, description, gutGravity, gutUrgency, gutTendency };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { title, description, gutGravity, gutUrgency, gutTendency } = result.value;
            const activity = { title, description, gutGravity, gutUrgency, gutTendency };
            saveActivity(activity);
            Swal.fire(`Atividade adicionada: ${activity.title}`);
        }
    });
}

function saveActivity(activity) {
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push(activity);
    adicionaAtividade(empresa[i].id, activity.title, activity.description, activity.gutGravity, activity.gutUrgency, activity.gutTendency );
}