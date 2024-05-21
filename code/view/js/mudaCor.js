// Função para definir o modo de cor
function definirModoCor(modo) {
    if (modo === 'escuro') {
        // Mudar para o modo escuro
        document.documentElement.setAttribute('data-modo', 'escuro');

        // Alterar as cores para o modo escuro
        document.documentElement.style.setProperty('--cor-primaria', '#2A4F83');
        document.documentElement.style.setProperty('--cor-secundaria', '#2A4F83');
        document.documentElement.style.setProperty('--cor-terciaria', '#0056b3');
        document.documentElement.style.setProperty('--cor-fundo', '#1A1818');
        document.documentElement.style.setProperty('--cor-text', '#fff');
        document.documentElement.style.setProperty('--cor-link', '#1c2aec');
        document.documentElement.style.setProperty('--cor-botão', '#07194F');
        document.documentElement.style.setProperty('--cor-nav', '#3565A9');
        document.documentElement.style.setProperty('--cor-link2', '#2A8353');
    } else {
        // Mudar para o modo claro (padrão)
        document.documentElement.setAttribute('data-modo', 'claro');

        // Alterar as cores para o modo claro
        document.documentElement.style.setProperty('--cor-primaria', '#32C6F4');
        document.documentElement.style.setProperty('--cor-secundaria', '#92E5FF');
        document.documentElement.style.setProperty('--cor-terciaria', '#0056b3');
        document.documentElement.style.setProperty('--cor-fundo', '#fff');
        document.documentElement.style.setProperty('--cor-text', '#000000'); 
        document.documentElement.style.setProperty('--cor-link', '#1c2aec');
        document.documentElement.style.setProperty('--cor-botão', '#fff');
        document.documentElement.style.setProperty('--cor-nav', '#92E5FF');
        document.documentElement.style.setProperty('--cor-link2', '#32F474');
    }
}

// Função para recuperar o modo de cor armazenado
function recuperarModoCor() {
    return localStorage.getItem('modoCor') || 'claro'; // Retorna o modo armazenado ou o modo padrão (claro)
}

// Função para alternar o modo de cor
function alternarModoCor() {
    const modoAtual = document.documentElement.getAttribute('data-modo');
    const novoModo = modoAtual === 'claro' ? 'escuro' : 'claro';

    // Definir o novo modo de cor
    definirModoCor(novoModo);

    // Armazenar o novo modo de cor
    localStorage.setItem('modoCor', novoModo);
}

// Chamar a função para recuperar o modo de cor armazenado e definir o modo de cor com base no que foi recuperado
const modoCor = recuperarModoCor();
definirModoCor(modoCor);

// Seletor para o botão de alternar modo de cor
document.querySelector('.container-imagem-direita img').addEventListener('click', function() {
    // Chamar a função para alternar o modo de cor
    alternarModoCor();
});
