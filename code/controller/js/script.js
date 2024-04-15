document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const forgotPasswordBtn = document.getElementById('forgot-password-btn');
    const signupBtn = document.getElementById('login-btn');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Aqui você pode adicionar o código para processar o login
        // Por exemplo:
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value.trim(); // Remova os espaços em branco no início e no final
        const password = passwordInput.value.trim();

        // Validar se o campo de e-mail está vazio ou contém apenas espaços em branco
        if (!username) {
            alert('Por favor, insira um e-mail válido.');
            usernameInput.focus(); // Coloque o foco de volta no campo de e-mail
            return; // Pare a execução da função
        }

        console.log('Username:', username);
        console.log('Password:', password);

        // Aqui você pode adicionar o código para enviar os dados do formulário para o servidor
    });

    forgotPasswordBtn.addEventListener('click', function () {
        // Aqui você pode adicionar o código para lidar com a recuperação de senha
        console.log('Esqueci minha senha');
    });

    signupBtn.addEventListener('click', function () {
        // Aqui você pode adicionar o código para redirecionar para a página de cadastro
        // Por exemplo:
        window.location.href = 'cadastro.html';
    });
});
