var pdfs = document.querySelectorAll(".mw-parser-output .pdf");
pdfs.forEach(function(e)
{
    var embed = document.createElement("embed");
    embed.src = e.dataset.src;
    embed.type = "application/pdf";
    embed.style.cssText = e.style.cssText;
    e.replaceWith(embed);
});