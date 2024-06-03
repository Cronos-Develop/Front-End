const template = document.createElement('template');
localStorage.setItem("myHash", "A4983G5552a5177C4759a4858a5654"); //Para testes
var response = ControlEnterprises();
let empresa = JSON.parse(response);
var response2 = ControlUsers();
let usuario = JSON.parse(response2);
userCNPJ = usuario[0].cpf_cnpj;

let i = 0;
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
    i = j;
    Swal.close();
}



function geraEmmpresas(){
    console.log(i)
    var code = `<div class="btn-list d-flex flex-column align-items-center">`
    for(j = 0; j<empresa.length; j++){
        code += `<button class="btn-conf width-50" onclick="Ftemplate(${j})"><strong>${empresa[j].nome_da_empresa}</strong></button>`;
    }
    code += `</div>`

    Swal.fire({
        title: 'Escolha a empresa',
        html: code,
        icon: 'info',
    });
}