const URL = 'http://localhost:8000'

function Controllogin(login, password){
    const url = URL+'/api/users/';
    const data = login + ':' + password + '/userHash';
    var response = apiGET(url, data);
    console.log(response);
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ControlEnterpriseCadaster(ident, pass, empresa, nicho=null, resumo=null){
    Controllogin(ident, pass)
    hash = localStorage.getItem("myHash");
    console.log("Seu login é:" + hash)
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
    const url = URL + '/api/users/' + hash + "/hash";

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

function controlEmail(ident){
    const url = URL + '/api/recuperar/' + ident;

    var response = apiGET(url);
        if(response!=null){
            console.log(response);
            return response;
        }else{
            return false;
        }
}

function ControlTasks(specify=0){
    var hash = localStorage.getItem("myHash");
    if(hash){
        const url = URL+'/api/empresas/'+ specify + '/tarefas/' + hash;
        var response = apiGET(url);
        if(response != false){
            return response;
        }else{
            return false;
        }
    }
}

function alteraCadastroEmpresa(nome, descricao, nicho, specify){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/'+ specify + '/' + hash;

    const data = {
        "usuario_id": hash,
	    "nome_da_empresa": nome,
	    "nicho": nicho,
        "resumo": descricao
    }

    var response = apiPUT(url, data);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

function getPartiners(specify){
    var hash = localStorage.getItem("myHash");
    const url = URL+'/api/users/partners/'+specify+'/'+hash;
    console.log(url)
    var response = apiGET(url);
    if(response != null){
        return response;
    }else{
        return false;
    }
}

function deletaPartner(specify, id){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/partner/'+specify+'/'+ hash +"/"+id;
    var response = apiDELETE(url);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

function adicionaAtividade(id, tarefa, descricao=null, g=1, u=1, t=1, p = [null, null, null, null, null, null, null]){
    hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/t5w2h/'+id+'/'+hash;
    const data = {
        "tarefa": tarefa,
        "gut": {
            "gravidade": g,
            "urgencia": u,
            "tendencia": t
        },
        "respostas": [
            {
                "pergunta_id": 1,
                "resposta": p[0]
            },
            {
                "pergunta_id": 2,
                "resposta": p[1]
            },
            {
                "pergunta_id": 3,
                "resposta": p[2]
            },
            {
                "pergunta_id": 4,
                "resposta": p[3]
            },
            {
                "pergunta_id": 5,
                "resposta": p[4]
            },
            {
                "pergunta_id": 6,
                "resposta": p[5]
            },
            {
                "pergunta_id": 7,
                "resposta": p[6]
            }
        ]
    }

    console.log(data);
    var response = apiPOST(url, data);
    if(response == 1){
        return 1;
    }else{
        return 0;
    }
}

function apagaTarefa(specify){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/t5w2h/'+specify+'/'+ hash;
    var response = apiDELETE(url);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

function editaTarefa(specify, id, title, g=1, u=1, t=1, p = [null, null,null,null,null,null,null]){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/t5w2h/'+ specify + '/' + hash;

    const data = {
        "tarefa_id": id,
        "tarefa": title,
        "gut": {
            "gravidade": g,
            "urgencia": u,
            "tendencia": t
        },
        "respostas": [
            {
                "pergunta_id": 1,
                "resposta": p[0]
            },
            {
                "pergunta_id": 2,
                "resposta": p[1]
            },
            {
                "pergunta_id": 3,
                "resposta": p[2]
            },
            {
                "pergunta_id": 4,
                "resposta": p[3]
            },
            {
                "pergunta_id": 5,
                "resposta": p[4]
            },
            {
                "pergunta_id": 6,
                "resposta": p[5]
            },
            {
                "pergunta_id": 7,
                "resposta": p[6]
            }
        ]
    }

    var response = apiPUT(url, data);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

//api/empresas/subtarefas/{tarefa}/{hash}
function addSubtarefa(id, tarefas= []){
    hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/subtarefas/'+id+'/'+hash;
    const data = {
        tarefas
    }

    console.log(data);
    var response = apiPOST(url, data);
    if(response == 1){
        return 1;
    }else{
        return 0;
    }
}

function apagaSubtarefa(specify){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/subtarefas/'+specify+'/'+ hash;
    var response = apiDELETE(url);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

function alteraEstado(specify, flag=0){
    var hash = localStorage.getItem("myHash");
    var url = URL
    if(flag==0){
        url += '/api/empresas/tarefas/'+specify+'/'+ hash;
    }else{
        url += '/api/empresas/subtarefas/'+specify+'/'+ hash;
    }
    var response = apiPATCH(url);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}


function getAPI(tarefa){
    hash = localStorage.getItem("myHash");
    const url = URL + '/api/IA/'+hash;
    const data = {
        "tarefa": tarefa
    }

    console.log(data);
    var response = apiPOST(url, data);
    if(response){
        return response;
    }else{
        return 0;
    }
}

////Editar para baixo
function editaSubtarefa(subtarefa, specify){
    var hash = localStorage.getItem("myHash");
    const url = URL + '/api/empresas/subtarefas/'+ specify + '/' + hash;

    const data = {
        "subtarefa": subtarefa
    }

    var response = apiPUT(url, data);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}

function alteraSenha(codigo, senha){
    const url = URL + '/api/users/trocarsenha/';

    const data = {
        "nova_senha": senha,
        "codigo_confitmacao": codigo
    }

    var response = apiPOST(url, data);
    if(response == true){
        return 1;
    }else{
        return 0;
    }
}