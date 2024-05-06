function Controllogin(login, password){
    const url = '';
    const data = {
        'user':login,
        'senha': password
    }

    if(api(url, data)){
        return true;
    }else{
        return false;
    }
}

function ControlCadaster(email, telefone, pass, nameU, end, complemento, bairro, nasc, number, ident, cep, city, empresa){
    const url = '';
    const data = {
        'email':email,
        'telefone': telefone,
        'senha':pass,
        'nome': nameU,
        'endereco': end,
        'complemento': complemento,
        'bairro': bairro,
        'nascimento': nasc,
        'numero': number,
        'Ident': ident,
        'cep': cep,
        'cidade': city,
        'Empresa': empresa
    }

    if(api(url, data)){
        return true;
    }else{
        return false;
    }
}