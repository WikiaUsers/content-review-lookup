// Cheque se o div est� com o id "spoilers_image" e � clic�vel e adicione "display:none" o estilo de atributo para div com o id "spoilers.
document.getElementById("spoilers_image").addEventListener("click", function() {
    document.getElementById("spoilers").style.display = "none";
});