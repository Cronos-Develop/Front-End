function verifyCPF(cpf){
    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

    Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
        return true;
}

function verifyCNPJ(cnpj) { 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

function verifyDate(date){
    var flag ="";
    var n = 0;
    const tempo = new Date();
    const anoAtual = tempo.getFullYear().toString();
    if(anoAtual - date[0] < 18 && anoAtual - date[0] > 0){
        flag += "[Você não é de maior, não pode possuir empresa.]";
        n++;
    }
    if(anoAtual - date[0] > 105){
        flag += "[Você deveria estar aposentado e curtindo a vida.]";
        n++;
    }
    if(anoAtual <= date[0]){
        flag += "[Data inválida.]";
        n++;
    }

    return n+flag; 
}

function verifyPass(password){
    var flag ="";
    var n = 0;

    if(password.length < 8){ 
        flag += "[Senha deve ter pelo menos 8 caracteres.]";
        n++;
    }
    if(!(/\d/.test(password))){
        flag += "[Senha deve ter pelo menos um número.]";
        n++;
    }
    if(!(/[a-z]/.test(password))){
        flag += "[Senha deve ter pelo menos um caractere minúsculo.]";
        n++;
    }
    if(!(/[A-Z]/.test(password))){
        flag += "[Senha deve ter pelo menos um caractere maiúsculo.]";
        n++;
    }
    if(!(/\W/.test(password))){
        flag += "[Senha deve ter pelo menos um caractere especial (.,*,@,#,?,/,&,|).]";
        n++;
    }

    return n+flag;
}

function verifyCEP(cep){
    return (/^\d{8}$/.test(cep.replace(/[^\d]+/g, "")));
}

function verifyName(nameU){
    if(nameU.length < 3){
        return 0;
    }else{
        for(i=0; i<nameU.length; i++){
            if(parseInt(nameU.charAt(i))>0){
                return 0;
            } 
        }
        return 1;
    }
}

function verifyCity(city){
    if(city.length <3) return false;
    for(i=0; i<city.length; i++){
        if(parseInt(city.charAt(i))>0){
            return false;
        }
    }
    return true;
}

function verifyNumber(number){
    for(i=0; i<number.length; i++){
        if(/[a-zA-Z]/.test(number.charAt(i))) return false;
    }
    return true;
}

function verifyEmail(email) {
    if ((email == null) || (email.length < 4))
    return false;

    var partes = email.split('@');
    if (partes.length < 2 ) return false;

    var pre = partes[0];
    if (pre.length == 0) return false;
    
    if (!/^[a-zA-Z0-9_.-/+]+$/.test(pre))
        return false;

    // gmail.com, outlook.com, terra.com.br, etc.
    var partesDoDominio = partes[1].split('.');
    if (partesDoDominio.length < 2 ) return false;

    for ( var indice = 0; indice < partesDoDominio.length; indice++ )
    {
        var parteDoDominio = partesDoDominio[indice];

        // Evitando @gmail...com
        if (parteDoDominio.length == 0) return false;  

        if (!/^[a-zA-Z0-9-]+$/.test(parteDoDominio))
            return false;
    }

    return true;
}