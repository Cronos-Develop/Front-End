function sucesso() {

    Swal.fire({
        title: "Boa sorte!",
        text: "Esse é todo suporte que você precisa",
        icon: "success"
      });

}

function dados() {
Swal.fire({
    title: "Dados da conta",
    text: "Nome: Pedro Pascal",
    icon: "question"
  });
}

function procuraN() {
Swal.fire({
    title: "Coloque seu Nome",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Procurar",
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      try {
        const githubUrl = `
          https://api.github.com/users/${login}
        `;
        const response = await fetch(githubUrl);
        if (!response.ok) {
          return Swal.showValidationMessage(`
            ${JSON.stringify(await response.json())}
          `);
        }
        return response.json();
      } catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      });
    }
  });
}

function mais() {
    let timerInterval;
Swal.fire({
  title: "Buscando mais informações!",
  html: "buscando em <b></b> millisegundos.",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("fechado pelo tempo");
  }
});
}

function deleteUser(){
  Swal.fire({
    title: "Parabéns!",
    text: "Sua conta foi deletada com Sucesso",
    icon: "success"
  });
}