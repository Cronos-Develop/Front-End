document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container-C');
    
    // Adiciona a classe fade-in após 100ms
    setTimeout(() => {
        container.classList.add('fade-in');
    }, 100);

    // Remove a classe fade-in e adiciona fade-out antes de redirecionar
    setTimeout(() => {
        container.classList.remove('fade-in');
        container.classList.add('fade-out');
    }, 3500); // Inicia o fade-out após 3.5 segundos

    // Redireciona após a animação de fade-out
    setTimeout(() => {
        window.location.href = 'paginaLogin.html';
    }, 5500); // Redireciona após 5.5 segundos
});
