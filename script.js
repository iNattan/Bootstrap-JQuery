var comentarios = [];

$("#meuForm").submit(function (e) { 
    e.preventDefault();
    console.log("Interceptado.");
});

$("#addComentario").click(function () { 
    var texto = $("#textarea").val();

    if (texto == ""){
        return;
    }
    
    var newItem = $("<li class='list-group-item' style='word-wrap: break-word;'></li>").text(texto);
    var buttonsDiv = $("<div class='d-flex justify-content-center align-items-center'></div>");
    var likeButton = $("<button type='button' class='btn btn-primary btn-sm like-button'>Curtir <span class='badge badge-primary like-count'>0</span></button>");
    var removeButton = $("<button type='button' class='btn btn-danger btn-sm remove-button ms-1' id='removeComentario'>Remover</button>");
    buttonsDiv.append(likeButton, removeButton);
    newItem.append(buttonsDiv);
    $("#lista").append(newItem);
    $("#textarea").val("");

    comentarios.push({
        texto: texto,
        data: new Date(), 
        item: newItem
    });
});

$("#lista").on("click", "#removeComentario", function () {
    var botaoRemover = $(this);
    $("#confirmacaoModal").modal("show");
    $("#confirmarRemocao").off("click");
    $("#confirmarRemocao").click(function () {
        botaoRemover.closest("li").remove();
        $("#confirmacaoModal").modal("hide");
    });
});

$("#lista").on("click", ".like-button", function () {
    var comentario = $(this).closest("li");
    var likeCount = comentario.find(".like-count");
    var currentLikes = parseInt(likeCount.text());
    likeCount.text(currentLikes + 1);
});

$("#ordenarRecente").click(function () {
    comentarios.sort(function (a, b) {
        return b.data - a.data; 
    });
    atualizarListaComentarios();
});

$("#ordenarAntigo").click(function () {
    comentarios.sort(function (a, b) {
        return a.data - b.data; 
    });
    atualizarListaComentarios();
});

function atualizarListaComentarios() {
    $("#lista").empty(); 
    for (var i = 0; i < comentarios.length; i++) {
        $("#lista").append(comentarios[i].item); 
    }
}