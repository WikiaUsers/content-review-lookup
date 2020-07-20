$(function(){
    if ($("#imap-main").length) {
      $.getJSON("/api.php?action=parse&text={{Mapa/Kod|" + $("#imap-main").data("map") + "}}&format=json", function(data) {
        var code = data.parse.text['*']; 
        var reg = new RegExp("&lt;", "g"); 
        code = code.replace(reg, "<"); 
        reg = new RegExp("&gt;", "g"); 
        code = code.replace(reg, ">");
        $("div#imap-main").html(code);
      });
    }
});