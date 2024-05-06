// Função para exibir o modal de empresas quando a imagem do cabeçalho é clicada
document.querySelector('.company-logo').addEventListener('click', function () {
    var myModal = new bootstrap.Modal(document.getElementById('modalEmpresas'));
    myModal.show();
});

// Função para lidar com o clique no botão "Editar Empresas"
function editarEmpresas() {
    // Lógica para editar empresas aqui
    alert('Editar empresas...');
}