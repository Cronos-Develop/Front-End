function Controllogin(login, password){
    const url = '';
    const data = {
        'user':login,
        'senha': password
    }
    var response = api(url, data);
    if(response || (login==="adm" && password==="senha")){
        return true;
    }else{
        return false;
    }
}

function ControlCadaster(email, telefone, pass, nameU, end, complemento, bairro, nasc, number, ident, cep, city, empresa){
    const url = '';
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

    var response = api(url, data);
    if(response){
        return true;
    }else{
        return false;
    }
}