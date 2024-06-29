// conjunto para as funções de atividades e sub-tarefas:
function deletaTarefa(id){
  if(apagaTarefa(id)==1){
    Swal.fire({
      title: "Tarefa apagada com sucesso",
      icon: "success",
        showConfirmButton: true,
        ConfirmButtonText: 'Salvar',
        showCancelButton: false,
      }).then((result) => {
        if (result.isConfirmed) {
          task.remove();
          Swal.close();
          saveTasks();
        }
    });
  }
}

function addSub(id, tarefa){
  console.log(tarefa)
  if(tarefa) addSubtarefa(id, tarefa);
  location.reload();
}

function deleteSubtask(id){
  console.log("Deletando: "+id)
  apagaSubtarefa(id);
  location.reload();
}

function deleteTask(id){
  apagaTarefa(id);
  location.reload();
}
function alterState(id, type){
  alteraEstado(id, type);
  location.reload();
}

function addActivity(title, id, subtasks = [{}], save = true) {
  const newTask = document.createElement('div');
  newTask.classList.add('task');
  newTask.setAttribute('draggable', 'true');
  newTask.innerHTML = `
    <div class='task__tags'>
      <span class='task__tag task__tag--design'>${title}</span>
    </div>
    <p style="display:none">${id}</p>
    <div class='task__stats'>
      <span class='task__owner'></span>
    </div>
  `;
  for(k=0; k<subtasks.length; k++){
    addSubtask(newTask, subtasks[k].subtarefa, subtasks[k].id, false);
  }

  const inProgressColumn = document.querySelector('.in-progress-column');
  inProgressColumn.appendChild(newTask);

  newTask.addEventListener('dragstart', handleDragStart, false);
  newTask.addEventListener('dragenter', handleDragEnter, false);
  newTask.addEventListener('dragover', handleDragOver, false);
  newTask.addEventListener('dragleave', handleDragLeave, false);
  newTask.addEventListener('drop', handleDrop, false);
  newTask.addEventListener('dragend', handleDragEnd, false);
  newTask.addEventListener('click', handleTaskClick, false);

  if (save) {
    saveTasks();
  }
}
// ------------------------------------------------------------------------------------------------------------------------------------------------

// conjunto para as funções de atividades e sub-tarefas:

var response = ControlTasks(empresa[i].id);
let tarefas = JSON.parse(response);
console.log(tarefas)
for(j=0; j<tarefas.length; j++){
  if(tarefas[j]){
    addActivity(tarefas[j].descrição, tarefas[j].id, tarefas[j].subtarefas);
  }
}
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.1';
    this.style.border = '3px dashed #c4cad3';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('task-hover');
  }

  function handleDragLeave(e) {
    this.classList.remove('task-hover');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      updateProgress();
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.border = 0;
    items.forEach(function (item) {
      item.classList.remove('task-hover');
    });
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addActivity(task.title, task.description, task.subtasks || [], false));
    updateProgress();
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.in-progress-column .task').forEach(task => {
      const title = task.querySelector('.task__tag').textContent;
      const description = task.querySelector('p').textContent;
      const subtasks = Array.from(task.querySelectorAll('.subtask')).map(subtask => ({
        text: subtask.querySelector('span').textContent,
        completed: subtask.querySelector('input').checked,
        id: subtask.querySelector('div').textContent,
      }));
      tasks.push({ title, description, subtasks });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function saveDoneTasks() {
    const doneTasks = [];
    document.querySelectorAll('.done-column .task').forEach(task => {
      const title = task.querySelector('.task__tag').textContent;
      const description = task.querySelector('p').textContent;
      const subtasks = Array.from(task.querySelectorAll('.subtask')).map(subtask => ({
        text: subtask.querySelector('span').textContent,
        completed: subtask.querySelector('input').checked,
        id: subtask.querySelector('div').textContent,
      }));
      doneTasks.push({ title, description, subtasks });
    });
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }

  let items = document.querySelectorAll('.task');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
    item.addEventListener('click', handleTaskClick, false);
  });

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

  // Aqui está o pop - up de adicionar uma atividade a lista, é direcionado automaticamente para "Em progresso"

  document.querySelector('.project-activites__add').addEventListener('click', () => {
    Swal.fire({
      title: 'Adicionar Nova Atividade',
      html: `
        <input type="text" id="activity-title" class="swal2-input" placeholder="Título da Atividade">
        <textarea id="activity-description" class="swal2-textarea" placeholder="Descrição da Atividade"></textarea>
      `,
      confirmButtonText: 'Adicionar',
      focusConfirm: false,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#activity-title').value;
        const description = Swal.getPopup().querySelector('#activity-description').value;
        if (!title || !description) {
          Swal.showValidationMessage(`Por favor, preencha todos os campos`);
        }
        return { title: title, description: description };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const activity = result.value;
        adicionaAtividade(empresa[i].id, activity.title, activity.description)
        addActivity(activity.title, activity.description);
        saveTasks();
      }
    });
  });
  //  Aqui para adicionar a lista de sub-tarefas na atividade da empresa

  function addSubtask(taskElement, text, id, completed = false) {
    const subtasksContainer = taskElement.querySelector('.subtasks-container') || document.createElement('div');
    if (!subtasksContainer.classList.contains('subtasks-container')) {
      subtasksContainer.classList.add('subtasks-container');
      taskElement.appendChild(subtasksContainer);
    }

    const subtask = document.createElement('div');
    subtask.classList.add('subtask');
    if (completed) {
      subtask.classList.add('completed');
    }
    subtask.innerHTML = `
      <input type="checkbox" onchange="alterState(${id}, 1)" ${completed ? 'checked' : ''}>
      <span>${text}</span>
      <div style="display:none" id="id">${id}</div>
    `;
    subtasksContainer.appendChild(subtask);
    subtask.querySelector('input').addEventListener('change', (e) => {
      e.stopPropagation();
      if (subtask.querySelector('input').checked) {
        subtask.classList.add('completed');
      } else {
        subtask.classList.remove('completed');
      }
      saveTasks();
    });
  }

  function handleTaskClick(e) {
    const task = e.currentTarget;
    const title = task.querySelector('.task__tag').textContent;
    const description = task.querySelector('p').textContent;
    const gutGravity = parseInt(task.getAttribute('data-gut-gravity'));
    const gutUrgency = parseInt(task.getAttribute('data-gut-urgency'));
    const gutTendency = parseInt(task.getAttribute('data-gut-tendency'));
    const subtasks = Array.from(task.querySelectorAll('.subtask')).map(subtask => ({
      text: subtask.querySelector('span').textContent,
      completed: subtask.querySelector('input').checked,
      id: subtask.querySelector('div').textContent,
    }));
  
    if (e.target.type === 'checkbox') {
      return; // Impede que o pop-up seja exibido ao clicar no checkbox das subtarefas das atividades
    }
  
    // Pop-up das atividades
    Swal.fire({
      title: title,
      html: `
        <p>${description}</p>
        <ul id="subtasks-list" style="margin-top: 2rem">
          ${subtasks.map(subtask => `
            <li class="subtask">
              <input type="checkbox" ${subtask.completed ? 'checked' : ''}>
              <span>${subtask.text}</span>
              <div style="display:none" id="id">${subtask.id}</div>
            </li>
          `).join('')}
        </ul>
        <div style="margin-top: 20px;"></div>
        <input type="text" id="new-subtask-text" placeholder="Nova Sub-tarefa">
        <button id="add-subtask" class="swal2-confirm swal2-styled" onclick="addSub(${description}, document.getElementById('new-subtask-text').value)">
          <i class="fas fa-plus"></i>
        </button>
        <div style="margin-top: 20px;"></div>
        <div style="margin-top: 20px;"></div>
        <div class="button-group">
          <button id="delete-task" class="swal2-confirm swal2-styled" onclick="deleteTask(${description})">
            <i class="fas fa-trash"></i>
          </button>
          <button id="edit-task" class="swal2-confirm swal2-styled">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Salvar', // Correção aqui
    }).then((result) => {
      if (result.isConfirmed) {
        savePA(task);
        saveTasks();
        updateProgress();
      }
    });

    // Cuida de adicionar as sub-tarefas:

    document.getElementById('add-subtask').addEventListener('click', () => {
        const subtaskText = document.getElementById('new-subtask-text').value;
        if (subtaskText) {
            const newSubtask = document.createElement('li');
            newSubtask.classList.add('subtask');
            newSubtask.innerHTML = `
                <input type="checkbox">
                <span>${subtaskText}</span>
            `;
            document.getElementById('subtasks-list').appendChild(newSubtask);
            document.getElementById('new-subtask-text').value = '';
            saveTasks();
        }
    });

    // Cuida das mudanças de checkbox das sub-tarefas: (ativado ou não)

    document.getElementById('subtasks-list').addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            saveTasks(); 
        }
    });

    document.getElementById('edit-task').addEventListener('click', () => {
        const currentSubtasks = Array.from(task.querySelectorAll('.subtask')).map(subtask => ({
            text: subtask.querySelector('span').textContent,
            completed: subtask.querySelector('input').checked,
            id: subtask.querySelector('div').textContent,
        }));
        Swal.fire({
            title: 'Editar Tarefa',
            html: `
                <input type="text" id="edit-task-title" class="swal2-input" value="${title}">
                <textarea id="edit-task-description" class="swal2-textarea" readonly>${description}</textarea>
                <ul id="edit-subtasks-list">
                    ${currentSubtasks.map(subtask => `
                        <li>
                            <input type="checkbox" ${subtask.completed ? 'checked' : ''}>
                            <input type="text" class="edit-subtask-text" value="${subtask.text}">
                            <input style="display:none" class="id" value="${subtask.id}">
                            <button class="delete-subtask" onclick="deleteSubtask(${subtask.id})">Excluir</button>
                        </li>
                    `).join('')}
                </ul>
                <div style="margin-top: 5px;"></div>
            `,
            confirmButtonText: 'Salvar',
            preConfirm: () => {
                const newTitle = Swal.getPopup().querySelector('#edit-task-title').value;
                const newDescription = Swal.getPopup().querySelector('#edit-task-description').value;
                const updatedSubtasks = Array.from(Swal.getPopup().querySelectorAll('#edit-subtasks-list li')).map(li => ({
                    text: li.querySelector('.edit-subtask-text').value,
                    completed: li.querySelector('input[type="checkbox"]').checked,
                    id: li.querySelector('.id').value,
                }));

                return { newTitle, newDescription, updatedSubtasks };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { newTitle, newDescription, updatedSubtasks} = result.value;
                task.querySelector('.task__tag').textContent = newTitle;
                task.querySelector('p').textContent = newDescription;
                editaTarefa(empresa[i].id, newDescription, newTitle);//|Função AXIOS
                const subtasksContainer = task.querySelector('.subtasks-container') || document.createElement('div');
                if (!subtasksContainer.classList.contains('subtasks-container')) {
                    subtasksContainer.classList.add('subtasks-container');
                    task.appendChild(subtasksContainer);
                }
                subtasksContainer.innerHTML = '';
                updatedSubtasks.forEach(subtask => {
                    addSubtask(task, subtask.text, subtask.id, subtask.completed);
                    console.log(subtask)
                    editaSubtarefa(subtask.text, subtask.id);
                });
                saveTasks();
            }
        });

        document.getElementById('add-edit-subtask').addEventListener('click', () => {
            const subtaskText = document.getElementById('new-edit-subtask-text').value;
            if (subtaskText) {
                const newSubtask = document.createElement('li');
                newSubtask.innerHTML = `
                    <input type="checkbox">
                    <input type="text" class="edit-subtask-text" value="${subtaskText}">
                    <button class="delete-subtask">Excluir</button>
                `;
                document.getElementById('edit-subtasks-list').appendChild(newSubtask);
            }
        });

        document.getElementById('edit-subtasks-list').addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-subtask')) {
                const subtask = event.target.closest('li');
                subtask.remove();
            }
        });
    });

    document.getElementById('complete-task').addEventListener('click', () => {
        const doneColumn = document.querySelector('.done-column');
        doneColumn.appendChild(task);
        
        saveTasks();
        Swal.close();
    });
}

  // Função para adicionar subtarefas ao elemento da atividade:

  function savePA(taskElement) {
    const title = Swal.getPopup().querySelector('.swal2-title').textContent;
    const description = Swal.getPopup().querySelector('p').textContent;
    const subtasks = Array.from(Swal.getPopup().querySelectorAll('#subtasks-list .subtask')).map(subtask => ({
      text: subtask.querySelector('span').textContent,
      completed: subtask.querySelector('input').checked,
      id: subtask.querySelector('div').textContent,
    }));

    taskElement.querySelector('.task__tag').textContent = title;
    taskElement.querySelector('p').textContent = description;

    const subtasksContainer = taskElement.querySelector('.subtasks-container') || document.createElement('div');
    if (!subtasksContainer.classList.contains('subtasks-container')) {
      subtasksContainer.classList.add('subtasks-container');
      taskElement.appendChild(subtasksContainer);
    }
    subtasksContainer.innerHTML = '';
    subtasks.forEach(subtask => {
      addSubtask(taskElement, subtask.text, subtask.id, subtask.completed);
    });
    savePA(task);
    saveTasks();
    updateProgress();
  }
// -------------------------------------------------------------------------------------------------------------------------------------------