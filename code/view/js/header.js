const template = document.createElement('template');
var i = 0;
localStorage.setItem("myHash", "C53100D555A5356C4720a4818a4837");
var response = ControlEnterprises();
let empresa = JSON.parse(response);
let nomeEmpresa = empresa[i].nome_da_empresa;
var response2 = ControlUsers();
let usuario = JSON.parse(response2);
userCNPJ = usuario[0].cpf_cnpj;

template.innerHTML = `
<header class="header-geral"> 
    <div class="header-content">
        <div class="company-info">
            <h1 class="cortxt">  ${nomeEmpresa} </h1>
            <p>CNPJ: ${userCNPJ} </p>
        </div>
        <img src="img/pngegg.png" alt="Logo da Empresa" class="company-logo">
    </div>
</header>
`;

document.body.appendChild(template.content);