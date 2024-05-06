function api(url, data){
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'html',
        success: function(){
            return true;
        },
    });
}