
$.ajax({
    url: '',
    type: 'POST',
    data: {data: opcao.value},
    dataType: 'html',
    success: function(data){
        $("#table").html(data);
    },
});