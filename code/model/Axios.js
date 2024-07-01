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
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
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
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
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
        type: 'DELETE',
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

function apiPATCH(url){
    var response;
    $.ajax({
        url: url,
        type: 'PATCH',
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