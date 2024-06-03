function apiGET(url, data=null){
    var response;
    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType: 'html',
        async: false,
        success: function(data){
            response = data;
        },
        error: function(data){
            console.log("falhou"+data);
            response = null;
        }
    });

    return response;
}

function apiPOST(url, data){
    var response;
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'html',
        async: false,
        success: function(data){
            console.log(data);
            response = true;
        },
        error: function(data){
            console.log(data);
            response = false;
        }
    });
    return response;
}

function apiPUT(url, data){
    var response;
    $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        dataType: 'html',
        async: false,
        success: function(data){
            console.log(data);
            response = true;
        },
        error: function(data){
            console.log(data);
            response = false;
        }
    });
    return response;
}

function apiDELETE(url){
    var response;
    $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'html',
        async: false,
        success: function(data){
            console.log(data);
            response = true;
        },
        error: function(data){
            console.log(data);
            response = false;
        }
    });
    return response;
}