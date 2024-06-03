document.addEventListener('DOMContentLoaded', () => {
    const tasks = [
        {
            title: 'Definição dos horários de venda',
            description: 'Análise dos critérios para os melhores horários para o início e fim das vendas',
            subtasks: [
                { name: 'Análise de mercado', done: false },
                { name: 'Definição de horários', done: false }
            ]
        },
        {
            title: 'Marketing da marca',
            description: 'Definição de como será a publicidade da marca.',
            subtasks: [
                { name: 'Pesquisa de mercado', done: false },
                { name: 'Criação de conteúdo', done: false },
                { name: 'Lançamento da campanha', done: false }
            ]
        },
        {
            title: 'Entrega dos componentes eletrônicos',
            description: 'Definição da data e o encarregado da entrega dos componentes eletrônicos',
            subtasks: [
                { name: 'Contato com fornecedores', done: false },
                { name: 'Definição de datas', done: false }
            ]
        },
        {
            title: 'Local físico',
            description: 'Achar o local físico da empresa que cumpra os requisitos.',
            subtasks: [
                { name: 'Pesquisa de locais', done: false },
                { name: 'Visita aos locais', done: false },
                { name: 'Escolha do local', done: false }
            ]
        }
    ];

    const inProgressColumn = document.querySelector('.in-progress-column');

    tasks.forEach(task => {
        // Create task container
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.setAttribute('draggable', 'true');

        // Task tags
        const tagsDiv = document.createElement('div');
        tagsDiv.classList.add('task__tags');
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('task__tag');
        tagSpan.textContent = task.title;
        tagsDiv.appendChild(tagSpan);

        // Task description
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;

        // Task stats
        const taskStats = document.createElement('div');
        taskStats.classList.add('task__stats');
        const taskOwner = document.createElement('span');
        taskStats.appendChild(taskOwner);

        taskElement.appendChild(tagsDiv);
        taskElement.appendChild(taskDescription);
        taskElement.appendChild(taskStats);

        // Create progress bar for subtasks
        const taskProgress = document.createElement('div');
        taskProgress.classList.add('task-progress');

        const progressBar = document.createElement('progress');
        progressBar.classList.add('progress');
        progressBar.setAttribute('max', task.subtasks.length);
        progressBar.setAttribute('value', '0');

        const progressTitle = document.createElement('p');
        progressTitle.textContent = `Progresso: `;
        const progressSpan = document.createElement('span');
        progressSpan.textContent = `0/${task.subtasks.length}`;
        progressTitle.appendChild(progressSpan);

        taskProgress.appendChild(progressTitle);
        taskProgress.appendChild(progressBar);
        taskElement.appendChild(taskProgress);

        inProgressColumn.appendChild(taskElement);

        // Update progress on subtasks change
        task.subtasks.forEach((subtask, index) => {
            const subtaskElement = document.createElement('div');
            subtaskElement.classList.add('subtask');

            const subtaskCheckbox = document.createElement('input');
            subtaskCheckbox.type = 'checkbox';
            subtaskCheckbox.id = `subtask-${task.title}-${index}`;
            subtaskCheckbox.addEventListener('change', () => {
                subtask.done = subtaskCheckbox.checked;
                const completedCount = task.subtasks.filter(st => st.done).length;
                progressSpan.textContent = `${completedCount}/${task.subtasks.length}`;
                progressBar.value = completedCount;
            });

            const subtaskLabel = document.createElement('label');
            subtaskLabel.setAttribute('for', `subtask-${task.title}-${index}`);
            subtaskLabel.textContent = subtask.name;

            subtaskElement.appendChild(subtaskCheckbox);
            subtaskElement.appendChild(subtaskLabel);
            taskElement.appendChild(subtaskElement);
        });
    });
});
