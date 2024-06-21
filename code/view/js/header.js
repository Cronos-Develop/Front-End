const template = document.createElement('template');
localStorage.setItem("myHash", "A5147b5359A5195b472a4831A5181"); //Para testes
var response = ControlEnterprises();
let empresa = JSON.parse(response);
var response2 = ControlUsers();
let usuario = JSON.parse(response2);
userCNPJ = usuario[0].cpf_cnpj;

var t = localStorage.getItem("myEnterprise");
let i;
if(t){
    i = t;
}else{
    i = 0;
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
    code += `</div>`

    Swal.fire({
        title: 'Escolha a empresa',
        html: code,
        icon: 'info',
    });
}