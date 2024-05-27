const pass3 = document.querySelector('#confirm-password');
const pass4 = document.querySelector('#new-password');

pass3.addEventListener("change", function testaSenha(){
    const label = document.querySelector('#fix-data-confirm-pass');
    if(pass3.value === pass4.value){
        console.log("Iguais");
        pass3.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
        label.style.color = 'black';
    }else{
        pass3.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "Senhas não conferem";
        console.log(pass3.value)
    }
});

pass4.addEventListener("change", function(){
    const label = document.querySelector('#fix-data-new-pass');
    var response = verifyPass(pass4.value);
    if(response.charAt(0)!=0){
        pass4.style.borderColor = 'red';
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
        pass4.style.borderColor = '#C6C6C6';
        label.innerHTML = "";
        label.style.color = 'black';
        if(pass3.value){
            testaSenha();
        }
    }
});

function modifyPass(){
    if(pass3.value && pass4.value && pass4.value===pass3.value){
        //Chamar o Axios
    }else{
        Swal.fire({
            icon: "error",
            title: "Senhas não conferem ou não foram preenchidas",
            text: "Veja se há algum aviso em vermelho"
        });
    }
}