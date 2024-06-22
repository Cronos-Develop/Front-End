// função para a barra de busca e o filtro de pesquisa:

document.addEventListener('DOMContentLoaded', (event) => {

  const searchBar = document.getElementById('search-bar');
  const statusFilter = document.getElementById('status-filter');

  searchBar.addEventListener('input', filterTasks);
  statusFilter.addEventListener('change', filterTasks);

  function filterTasks() {
    const searchText = searchBar.value.toLowerCase();
    const filterStatus = statusFilter.value;

    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => {
      const title = task.querySelector('.task__tag').textContent.toLowerCase();
      const description = task.querySelector('p').textContent.toLowerCase();
      const isInProgress = task.closest('.in-progress-column') !== null;
      const isDone = task.closest('.done-column') !== null;

      let matchesSearch = title.includes(searchText) || description.includes(searchText);
      let matchesStatus = (filterStatus === 'all') ||
                          (filterStatus === 'in-progress' && isInProgress) ||
                          (filterStatus === 'done' && isDone);

      if (matchesSearch && matchesStatus) {
        task.style.display = '';
      } else {
        task.style.display = 'none';
      }
    });
  }

  loadTasks();
  const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];
  doneTasks.forEach(task => addActivity(task.title, task.description, task.subtasks, false));
  filterTasks();
});
 
// ------------------------------------------------------------------------------------------------------------------------------------------------

// conjunto para as funções de atividades e sub-tarefas:

document.addEventListener('DOMContentLoaded', (event) => {
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
        addActivity(activity.title, activity.description);
        saveTasks();
        updateProgress();
      }
    });
  });

  function addActivity(title, description, subtasks = [], save = true) {
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.setAttribute('draggable', 'true');
    newTask.innerHTML = `
      <div class='task__tags'>
        <span class='task__tag task__tag--design'>${title}</span>
      </div>
      <p>${description}</p>
      <div class='task__stats'>
        <span class='task__owner'></span>
      </div>
    `;

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
    updateProgress();
  }

  //  Aqui para adicionar a lista de sub-tarefas na atividade da empresa

  function addSubtask(taskElement, text, completed = false) {
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
      <input type="checkbox" ${completed ? 'checked' : ''}>
      <span>${text}</span>
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
      updateProgress();
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
            </li>
          `).join('')}
        </ul>
        <div style="margin-top: 20px;"></div>
        <input type="text" id="new-subtask-text" placeholder="Nova Sub-tarefa">
        <button id="add-subtask" class="swal2-confirm swal2-styled">
          <i class="fas fa-plus"></i>
        </button>

        <div style="margin-top: 20px;"></div>
        <h2 style="text-align: left; font-size: 1.5em;">Matriz GUT </h2>
        <div style="margin-top: 5px;"></div>
        <label for="gut-gravity">Gravidade:</label>
        <select id="gut-gravity" class="swal2-select">
          <option value="1" ${gutGravity === 1 ? 'selected' : ''}>Sem gravidade</option>
          <option value="2" ${gutGravity === 2 ? 'selected' : ''}>Pouco grave</option>
          <option value="3" ${gutGravity === 3 ? 'selected' : ''}>Grave</option>
          <option value="4" ${gutGravity === 4 ? 'selected' : ''}>Muito grave</option>
          <option value="5" ${gutGravity === 5 ? 'selected' : ''}>Extremamente grave</option>
        </select>
        <div style="margin-top: 2px;"></div>
        <label for="gut-urgency">Urgência:</label>
        <select id="gut-urgency" class="swal2-select">
          <option value="1" ${gutUrgency === 1 ? 'selected' : ''}>Pode esperar</option>
          <option value="2" ${gutUrgency === 2 ? 'selected' : ''}>Pouco urgente</option>
          <option value="3" ${gutUrgency === 3 ? 'selected' : ''}>Urgente</option>
          <option value="4" ${gutUrgency === 4 ? 'selected' : ''}>Muito urgente</option>
          <option value="5" ${gutUrgency === 5 ? 'selected' : ''}>Imediatamente</option>
        </select>
        <div style="margin-top: 2px;"></div>
        <label for="gut-tendency">Tendência:</label>
        <select id="gut-tendency" class="swal2-select">
          <option value="1" ${gutTendency === 1 ? 'selected' : ''}>Não irá mudar</option>
          <option value="2" ${gutTendency === 2 ? 'selected' : ''}>Irá piorar a longo prazo</option>
          <option value="3" ${gutTendency === 3 ? 'selected' : ''}>Irá piorar a médio prazo</option>
          <option value="4" ${gutTendency === 4 ? 'selected' : ''}>Irá piorar a curto prazo</option>
          <option value="5" ${gutTendency === 5 ? 'selected' : ''}>Irá piorar rapidamente</option>
        </select>
        <div style="margin-top: 20px;"></div>
        <label style="text-align: left; font-weight: bold;">Resultado da Matriz GUT:</label>
        <span id="multiplication-result">${gutGravity * gutUrgency * gutTendency}</span>
        <div style="margin-top: 20px;"></div>
        <div class="button-group">
          <button id="delete-task" class="swal2-confirm swal2-styled">
            <i class="fas fa-trash"></i>
          </button>
          <button id="edit-task" class="swal2-confirm swal2-styled">
            <i class="fas fa-edit"></i>
          </button>
          <button id="complete-task" class="swal2-confirm swal2-styled">
            <i class="fas fa-check"></i>
          </button>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Salvar', // Correção aqui
      preConfirm: () => {
        const gutGravity = parseInt(Swal.getPopup().querySelector('#gut-gravity').value);
        const gutUrgency = parseInt(Swal.getPopup().querySelector('#gut-urgency').value);
        const gutTendency = parseInt(Swal.getPopup().querySelector('#gut-tendency').value);
        const question = Swal.getPopup().querySelector('#question').value;
  
        const multiplicationResult = gutGravity * gutUrgency * gutTendency;
        Swal.getPopup().querySelector('#multiplication-result').textContent = multiplicationResult;
  
        return { gutGravity, gutUrgency, gutTendency, question };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { gutGravity, gutUrgency, gutTendency, question } = result.value;
        task.setAttribute('data-gut-gravity', gutGravity);
        task.setAttribute('data-gut-urgency', gutUrgency);
        task.setAttribute('data-gut-tendency', gutTendency);
        task.setAttribute('data-question', question);
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
            savePA(task);
            updateProgress(); 
        }
    });

    document.getElementById('delete-task').addEventListener('click', () => {
        task.remove();
        Swal.close();
        saveTasks();
        saveDoneTasks();
        updateProgress();
    });

    document.getElementById('edit-task').addEventListener('click', () => {
        const currentSubtasks = Array.from(task.querySelectorAll('.subtask')).map(subtask => ({
            text: subtask.querySelector('span').textContent,
            completed: subtask.querySelector('input').checked,
        }));

        Swal.fire({
            title: 'Editar Tarefa',
            html: `
                <input type="text" id="edit-task-title" class="swal2-input" value="${title}">
                <textarea id="edit-task-description" class="swal2-textarea">${description}</textarea>
                <ul id="edit-subtasks-list">
                    ${currentSubtasks.map(subtask => `
                        <li>
                            <input type="checkbox" ${subtask.completed ? 'checked' : ''}>
                            <input type="text" class="edit-subtask-text" value="${subtask.text}">
                            <button class="delete-subtask">Excluir</button>
                        </li>
                    `).join('')}
                </ul>
                <div style="margin-top: 20px;"></div>
                <input type="text" id="new-edit-subtask-text" placeholder="Nova Sub-tarefa">
                <button id="add-edit-subtask" class="swal2-confirm swal2-styled">Adicionar Sub-tarefa</button>
                <div style="margin-top: 5px;"></div>
        <label for="edit-gut-gravity">Gravidade:</label>
        <select id="edit-gut-gravity" class="swal2-select">
          <option value="1" ${gutGravity == 1 ? 'selected' : ''}>Sem gravidade</option>
          <option value="2" ${gutGravity == 2 ? 'selected' : ''}>Pouco grave</option>
          <option value="3" ${gutGravity == 3 ? 'selected' : ''}>Grave</option>
          <option value="4" ${gutGravity == 4 ? 'selected' : ''}>Muito grave</option>
          <option value="5" ${gutGravity == 5 ? 'selected' : ''}>Extremamente grave</option>
        </select>
        <div style="margin-top: 2px;"></div>
        <label for="edit-gut-urgency">Urgência:</label>
        <select id="edit-gut-urgency" class="swal2-select">
          <option value="1" ${gutUrgency == 1 ? 'selected' : ''}>Pode esperar</option>
          <option value="2" ${gutUrgency == 2 ? 'selected' : ''}>Pouco urgente</option>
          <option value="3" ${gutUrgency == 3 ? 'selected' : ''}>Urgente</option>
          <option value="4" ${gutUrgency == 4 ? 'selected' : ''}>Muito urgente</option>
          <option value="5" ${gutUrgency == 5 ? 'selected' : ''}>Imediatamente</option>
        </select>
        <div style="margin-top: 2px;"></div>
        <label for="edit-gut-tendency">Tendência:</label>
        <select id="edit-gut-tendency" class="swal2-select">
          <option value="1" ${gutTendency == 1 ? 'selected' : ''}>Não irá mudar</option>
          <option value="2" ${gutTendency == 2 ? 'selected' : ''}>Irá piorar a longo prazo</option>
          <option value="3" ${gutTendency == 3 ? 'selected' : ''}>Irá piorar a médio prazo</option>
          <option value="4" ${gutTendency == 4 ? 'selected' : ''}>Irá piorar a curto prazo</option>
          <option value="5" ${gutTendency == 5 ? 'selected' : ''}>Irá piorar rapidamente</option>
        </select>
            `,
            confirmButtonText: 'Salvar',
            preConfirm: () => {
                const newGutGravity = Swal.getPopup().querySelector('#edit-gut-gravity').value;
                const newGutUrgency = Swal.getPopup().querySelector('#edit-gut-urgency').value;
                const newGutTendency = Swal.getPopup().querySelector('#edit-gut-tendency').value;
                const newTitle = Swal.getPopup().querySelector('#edit-task-title').value;
                const newDescription = Swal.getPopup().querySelector('#edit-task-description').value;
                const updatedSubtasks = Array.from(Swal.getPopup().querySelectorAll('#edit-subtasks-list li')).map(li => ({
                    text: li.querySelector('.edit-subtask-text').value,
                    completed: li.querySelector('input[type="checkbox"]').checked,
                }));

                return { gutGravity, gutUrgency, gutTendency, newTitle, newDescription, updatedSubtasks, newGutUrgency, newGutGravity, newGutTendency };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { newTitle, newDescription, updatedSubtasks, newGutGravity, newGutTendency, newGutUrgency } = result.value;
                task.querySelector('.task__tag').textContent = newTitle;
                task.querySelector('p').textContent = newDescription;
                task.setAttribute('data-gut-gravity', newGutGravity);
                task.setAttribute('data-gut-urgency', newGutUrgency);
                task.setAttribute('data-gut-tendency', newGutTendency);

                const subtasksContainer = task.querySelector('.subtasks-container') || document.createElement('div');
                if (!subtasksContainer.classList.contains('subtasks-container')) {
                    subtasksContainer.classList.add('subtasks-container');
                    task.appendChild(subtasksContainer);
                }
                subtasksContainer.innerHTML = '';
                updatedSubtasks.forEach(subtask => {
                    addSubtask(task, subtask.text, subtask.completed);
                });
                saveTasks();
                saveDoneTasks();
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
        saveDoneTasks();
        updateProgress();
        Swal.close();
    });
}

  // Função para adicionar subtarefas ao elemento da atividade:

  function addSubtask(taskElement, text, completed = false) {
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
      <input type="checkbox" ${completed ? 'checked' : ''}>
      <span>${text}</span>
    `;
    subtasksContainer.appendChild(subtask);

    subtask.querySelector('input').addEventListener('change', () => {
      if (subtask.querySelector('input').checked) {
        subtask.classList.add('completed');
      } else {
        subtask.classList.remove('completed');
      }
      savePA(task);
      saveTasks();
      updateProgress();
    });
  }

  function savePA(taskElement) {
    const title = Swal.getPopup().querySelector('.swal2-title').textContent;
    const description = Swal.getPopup().querySelector('p').textContent;
    const subtasks = Array.from(Swal.getPopup().querySelectorAll('#subtasks-list .subtask')).map(subtask => ({
      text: subtask.querySelector('span').textContent,
      completed: subtask.querySelector('input').checked,
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
      addSubtask(taskElement, subtask.text, subtask.completed);
    });
    savePA(task);
    saveTasks();
    updateProgress();
  }


  // função que atualiza a area de "progresso das atividades"

  function updateProgress() {

    const inProgressTasks = document.querySelectorAll('.in-progress-column .task');
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.innerHTML = '';

    inProgressTasks.forEach(task => {

      const title = task.querySelector('.task__tag').textContent;
      const subtasks = task.querySelectorAll('.subtask');
      const completedSubtasks = task.querySelectorAll('.subtask input:checked');
      const totalSubtasks = subtasks.length;
      const completedCount = completedSubtasks.length;
      const progressPercentage = totalSubtasks === 0 ? 0 : (completedCount / totalSubtasks) * 100;

      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      progressBar.innerHTML =
      `
        <span>${title}</span>
        <div class="progress">
          <div class="progress__bar--green" style="width: ${progressPercentage}%;"></div>
          <div class="progress__bar--gray" style="width: ${100 - progressPercentage}%;"></div>
        </div>
      `;
      progressContainer.appendChild(progressBar);
    });
  }

  loadTasks();
  const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];
  doneTasks.forEach(task => addActivity(task.title, task.description, task.subtasks, false));
  updateProgress();
});

// -------------------------------------------------------------------------------------------------------------------------------------------