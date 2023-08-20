/* ДЛЯ СТАРОГО ФОРУМА */
/**
 * Получает массив элементов по XPath (аналог $x() функции).
 * Get elements by XPath (like $x function in Chrome developer mode).
 * 
 * @xpath - a valid xpath string
 * @return - an array of corresponding DOM elements
 */
window.getByXPath = function (xpath) {
  var res = [];
  var nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
    res.push( nodesSnapshot.snapshotItem(i) );
  }
  return res;
}
 
/**
 * Подчищает HTML-текст от лишних тегов и минимально переводит в вики-разметку.
 * Transforms HTML into wikitext (bold, italic and links only).
 * 
 * @htmlText - any string with HTML tags
 * @return - the @htmlText with some HTML tags replaced with corresponding wikitext
 */
window.cleanUpHTML = function (htmlText) {
    //Жир и курсив - в вики-стиле / bold and italic
    var res = htmlText.replace(/<b>/g, "'''").replace(/<\/b>/g, "'''")
            .replace(/<i>/g, "''").replace(/<\/i>/g, "''"); 
    //ссылки на вики-страницы / wiki links
    var link = res.match(/<a href=".*?title="(.*?)".*?>(.*?)\s?<\/a>/);  //\s? - если теги в ссылках, то может перевод строки появиться
    while (link !== null) { //loop is necessary, otherwise everything is replaced with the 1st match result
        res = res.replace(/<a href=".*?title=".*?".*?>.*?\s?<\/a>/, "[[" + link[1] + "|" + link[2] + "]]");
        link = res.match(/<a href=".*?title="(.*?)".*?>(.*?)\s?<\/a>/);
    }
    //ссылки на якори / anchor links ([[#id]])
    link = res.match(/<a href="#(.*?)">(.*?)\s?<\/a>/); 
    while (link !== null) {
        res = res.replace(/<a href="#.*?">.*?\s?<\/a>/, "[[#" + link[1] + "|" + link[2] + "]]");
        link = res.match(/<a href="#(.*?)">(.*?)\s?<\/a>/);
    }
    //внешние ссылки / external links
    link = res.match(/<a.*?href="http(.*?)">(.*?)\s?<\/a>/); 
    while (link !== null) {
        res = res.replace(/<a.*?href="http(.*?)">(.*?)\s?<\/a>/, "[http" + link[1] + " " + link[2] + "]");
        link = res.match(/<a.*?href="http(.*?)">(.*?)\s?<\/a>/);
    }
    //ссылки на несуществующие страницы / not existing pages links
    link = res.match(/<a class="new".*?title="(.*?) \(.*?\).*?">(.*?)\s?<\/a>/); 
    while (link !== null) {
        res = res.replace(/<a class="new".*?title=".*? \(.*?\).*?">.*?\s?<\/a>/, "[[" + link[1] + "|" + link[2] + "]]");
        link = res.match(/<a class="new".*?title="(.*?) \(.*?\).*?">(.*?)\s?<\/a>/);
    }
 
    res = res.replace(/<p>/g, "\n").replace(/<\/p>/g, ""); //параграфы ни к чему / paragraph tags is trash
    res = res.replace(/<dl><dd>/g, ":").replace(/<\/dd><\/dl>/g, ""); //отступы слева / tabulation with colon
 
    return res;
}
 
/**
 * Копирует цитируемое сообщение форума в буфер обмена при клике на "Ответить" .
 * Copies the quoted forum message into clipboard on "Answer" button click.
 * 
 * @ID - the id of the message, actually {{CURRENTTIMESTAMP}}
 */
window.copyCite = function (ID) {
    var msg = window.getByXPath("//div[@id='cite-button-"+ ID +"']/preceding-sibling::div[@class='forum-message-text']")[0].innerHTML; //gets parameter {{{сообщение}}} from Шаблон:Форум/Ответ
    msg = window.cleanUpHTML(msg); //it was in HTML, but we prefer wikitext
 
    var author = window.getByXPath("//div[@id='cite-button-"+ ID +"']/preceding-sibling::div[@class='forum-theme-author-nickname']")[0].innerText; //gets parameter {{{автор}}} from Шаблон:Форум/Ответ
 
    var copyText = '<div class="forum-quote">\n:' + author;
    if (msg.length < 1500) { 
        copyText = copyText + " [[#" + ID +  "|пишет]]:\n\n" + msg + "\n</div>\n";
    }
    else { //Overquoting should be omitted
        copyText = copyText + ", отвечаю на [[#" + ID +  "|сообщение]].</div>\n";
    }
    if (navigator.clipboard) { //May not be supported
        navigator.clipboard.writeText(copyText);
    } 
    else { //Supported anyway, excepting old IE browser
        /* This fragment is from here: https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript */
        const el = document.createElement('textarea');
        el.value = copyText;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    
    if (msg.length < 300) {
        alert("Сообщение " + author + " скопировано в буфер обмена: \n" + msg);
    }
    else {
        alert("Сообщение " + author + " скопировано в буфер обмена.");
    }
}
 
/**
 * Для страниц форума добавить атрибуты onclick кнопкам "Ответить".
 * Add onclick attribute to forum "Answer" buttons.
 */
function addOnclickСitation() {
    if (mw.config.get("wgNamespaceNumber") == 110) { //Т. е. если пространство имён Форум: / for Forum: namespace only
        citeButtons = window.getByXPath("//div[@class='cite-button']"); //this class is used only in Шаблон:Форум/Ответ
    
       for (var i = 0; i < citeButtons.length; i++) {
           var nextID = citeButtons[i].id;
           nextID = nextID.replace("cite-button-", ""); //since each ID has the form of "cite-button-{{CURRENTTIMESTAMP}}"
           citeButtons[i].setAttribute("onclick", "window.copyCite(" + nextID + ");");
       }
    }
 }
 
addOnclickСitation();