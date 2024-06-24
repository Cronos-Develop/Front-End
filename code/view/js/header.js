function AddEmpresa(){
    Swal.fire({
        title: 'Participantes',
        html: `
            <p>Aqui você pode visualizar e gerenciar os participantes da empresa.</p>
            <label for="participantName">Nome da empresa:</label>
            <input type="text" id="participantName" class="swal2-input" placeholder="Digite o nome da empresa">
            <label for="participantName">Descrição da empresa:</label>
            <input type="text" id="descr" class="swal2-input" placeholder="Digite a descrição da empresa">
            <label for="participantName">Nicho da empresa:</label>
            <input type="text" id="nicho" class="swal2-input" placeholder="Digite o nicho da empresa">
        `,
        confirmButtonText: 'Adicionar',
        preConfirm: () => {
            const participantName = document.getElementById('participantName').value;
            const descr = document.getElementById('descr').value;
            const nicho = document.getElementById('nicho').value;
            NomeEmpr = participantName.value;
            descrEmpr = descr.value;
            nichoEmpr = nicho.value;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (ControlEnterpriseCadaster(null, null, NomeEMpr, descrEmpr, nichoEmpr)==1) Swal.fire('Sucesso!', 'Participante adicionado com sucesso!', 'success');
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
                        ControlEnterpriseCadaster(null, null, NomeEMpr, descrEmpr, nichoEmpr);
                    }});
            }
        }
    });
}

const template = document.createElement('template');
//localStorage.setItem("myHash", "A5147b5359A5195b472a4831A5181"); //Para testes
console.log(localStorage.getItem("myHash"));
var response = ControlEnterprises();
let empresa = JSON.parse(response);
if(empresa.length==0){
    var Nmpresa = localStorage.getItem('nomeEmpresa');
    if(Nmpresa){
        console.log(Nmpresa);
    }else{
        Nmpresa = "Empresa - Placeholder";
    }
    ControlEnterpriseCadaster(null, null, empresa, "Placeholder", "Placeholder");
}
console.log(empresa);
var response2 = ControlUsers();
let usuario = JSON.parse(response2);
userCNPJ = usuario[0].cpf_cnpj;

var t = localStorage.getItem("myEnterprise");
let i = 0;
if(t){
    i = t;
}

let nomeEmpresa = empresa[i].nome_da_empresa;
    template.innerHTML = `
    <header class="header-geral"> 
        <div class="header-content">
            <div class="company-info">
                <h1 class="cortxt" id="titleEnterprise">  ${nomeEmpresa} </h1>
                <p>CNPJ: ${userCNPJ} </p>
            </div>
            <button class="btn-conf width-10" onclick="geraEmmpresas()" style="border:none; border-radius:90px"><img src="img/pngegg.png" alt="Logo da Empresa" class="company-logo"></button>
        </div>
    </header>
    `;
document.body.appendChild(template.content);

function Ftemplate(j){
    document.getElementById('titleEnterprise').innerHTML = empresa[j].nome_da_empresa;
    localStorage.setItem("myEnterprise", j);
    Swal.close();
    window.location.reload(false);
}



function geraEmmpresas(){
    console.log(i)
    var code = `<div class="btn-list d-flex flex-column align-items-center">`
    for(j = 0; j<empresa.length; j++){
        code += `<button class="btn-conf width-50" onclick="Ftemplate(${j})"><strong>${empresa[j].nome_da_empresa}</strong></button>`;
    }
    code += `</div><div><button class="btn-conf width-50" onclick="AddEmpresa()">Adicionar Empresa</button></div>`

    Swal.fire({
        title: 'Escolha a empresa',
        html: code,
        icon: 'info',
    });
}