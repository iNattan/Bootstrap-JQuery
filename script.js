$("#meuForm").submit(function (e) { 
    e.preventDefault();
    console.log("Interceptado.");
});

$("#addComentario").click(function () { 
    var texto = $("#textarea").val();

    if (texto == ""){
        return;
    }
    
    var newItem = $("<li class='list-group-item'></li>").text(texto);
    $("#lista").append(newItem);
    $("#textarea").val("");
});