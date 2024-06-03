var response = ControlTasks(empresa[i].id);
let tarefas = JSON.parse(response);

console.log(tarefas[4].subtarefas)
var codigo = ``;
for(k=0; k < tarefas.length; k++){
    var sub = ""
    for(j=0; j<tarefas[k].subtarefas.length; j++){
        sub+=tarefas[k].subtarefas[j].subtarefa;
    }

    codigo = codigo + `<div class="todo-container">
                <header class="header-tarefa">
                    <h1 class="cortxt">${tarefas[k].tarefa}</h1>
                </header>
                <div id="todo-list">${sub}</div>
            </div>`;
}

document.getElementById('tar').innerHTML = codigo;
