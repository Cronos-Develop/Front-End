const ident = document.querySelector('#identifier');
ident.addEventListener("change", function(){
    const label = document.querySelector('#fix-data-ident');
    if(!verifyCPF(ident.value) && !verifyCNPJ(ident.value)){
        ident.style.borderColor = 'red';
        label.style.color = 'red';
        label.innerHTML = "CPF ou CNPJ inválido";
    }else{
        ident.style.borderColor = "#C6C6C6";
        label.innerHTML = "";
        label.style.color = 'black';
    }
});  

function enviaEmail(){
    response = controlEmail(ident.value);
    let email = JSON.parse(response);
    if(response!=false){
        Swal.fire({
            icon: "success",
            title: "Email enviado para: "+ email[0].email,
            text: "Verifique sua caixa de entrada e seu spam para encontrar o email e recuperar sua senha!",
        })
    }else{
        Swal.fire({
            icon: "error",
            title: "Algo deu errado!",
            text: "Tente novamente mais tarde.",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tentar Novamente!"
        }).then((result) => {
            if (result.isConfirmed) {
              enviaEmail();
        }});
    }
}