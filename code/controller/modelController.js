const URL = 'http://localhost:8000'
function Controllogin(login, password){
    const url = URL+'/api/users/';
    const data = login + ':' + password + '/userHash';
    var response = apiGET(url, data);
    if(response != null){
        localStorage.setItem("myHash", response);
        return true;
    }else{
        return false;
    }
}

function ControlEnterprises(specify=null){
    var url = URL;
    var hash = localStorage.getItem("myHash");
    if(hash){
        if(specify == null) {
            url = url+'/api/empresas/'+hash;
        }else{
            url = url+'/api/empresas/'+specify+'/'+hash;
        }
        console.log(url);
        var response = apiGET(url);
        if(response!=null){
            return response;
        }else{
            return false;
        }
    }
}

function ControlUsers(){
    var url = URL;
    var hash = localStorage.getItem("myHash");
    if(hash){
        url = url+'/api/users/'+hash;
        console.log(url);
        var response = apiGET(url);
        if(response!=null){
            return response;
        }else{
            return false;
        }
    }
}

function ControlCadaster(email, telefone, pass, nameU, end, complemento=null, bairro, nasc, number, ident, cep, city, empresa){
    const url = URL + '/api/users/f4945H4870A5220j4776A4880a5619';

    const data = {
        "name": nameU,
        "cpf_cnpj": ident,
        "senha": pass,
        "email": email,
        "telefone": telefone,
        "endereco": city + ',' + bairro + ',' + end + ', Número:' + number + ',' + complemento,
        "cep": cep,
        "nascimento": nasc,
        "empresario": 0,
        "nome_da_empresa": empresa
    }
    console.log(data);
    var response = apiPOST(url, data);
    if(response == 1){
        if(ControlEnterpriseCadaster(ident, pass, empresa)==1){
            return 1;
        }
    }
    return 0;
}

function ControlEnterpriseCadaster(ident, pass, empresa, nicho=null, resumo=null){
    Controllogin(ident, pass)
    hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/'+hash;

    const data = {
        "usuario_id": hash,
        "nome_da_empresa": empresa,
        "nicho": nicho,
        "resumo": resumo
    }

    console.log(data);
    var response = apiPOST(url, data);
    if(response == 1){
        return 1;
    }else{
        return 0;
    }
}

function alteraCadastro(Nome, email, telefone, cep, endereco, bairro, number, cidade, compl=null){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/users/' + hash + "/<hash>";

    const data = {
        "name": Nome,
        "email": email,
        "telefone": telefone,
        "endereco": cidade + ',' + bairro + ',' + endereco + ', Número:' + number + ',' + compl,
        "cep": cep,
    }

    var response = apiPUT(url, data);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

function deletaUsuario(){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/users/' + hash + "/<hash>";

    var response = apiDELETE(url);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}