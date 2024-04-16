/* Função tela de Cadastro 
const pass = document.querySelector('#password');
    pass.addEventListener("mouseout", function(){
        const label = document.querySelector('#fix-data-pass');
        var response = verifyPass(pass.value);
        if(response.charAt(0)!=0){
            pass.style.borderColor = 'red';
            n = parseInt(response.charAt(0));
            response = response.replace(response.charAt(0), '');
            for(i=0; i<n; i++){
                response = response.replace(/\[|\,/, '');
                response = response.replace(']', '<br>');
            }
            console.log(response);
            label.style.color = 'red';
            label.innerHTML = response;
        }else{
            pass.style.borderColor = '#C6C6C6';
            label.innerHTML = "";
            label.style.color = 'black';
        }
    });
 const ident = document.querySelector('#identifier');
    ident.addEventListener("mouseout", function(){
        const label = document.querySelector('#fix-data-ident');
        if(!verifyCPF(ident.value) && !verifyCNPJ(ident)){
            ident.style.borderColor = 'red';
            label.style.color = 'red';
            label.innerHTML = "CPF inválido";
        }else{
            ident.style.borderColor = "#C6C6C6";
            label.innerHTML = "";
            label.style.color = 'black';
        }
    });   
    
    */