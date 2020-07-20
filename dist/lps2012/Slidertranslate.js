function translateToSlider() {
    for (i = 0; i < document.getElementsByClassName('ws_images')[0].getElementsByTagName('li').length; i++) {
        var newImg = document.createElement('img');
        var tmpStr = document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].getElementsByTagName('p')[0].innerHTML;
        tmpStr = tmpStr.substring(tmpStr.search("http"));
        //console.log("tmpStr 0:", tmpStr);
        //console.log("DEBUG: ", tmpStr.substring(0, tmpStr.search(">"))[tmpStr.search(">") - 1].charCodeAt(0));
        if (tmpStr.search(String.fromCharCode(34)) != 0) {
            newImg.src = tmpStr.substring(0, tmpStr.search(String.fromCharCode(34)));
            //console.log("tmpStr 1:", newImg.src);
        } else {
            newImg.src = tmpStr.substring(0, tmpStr.search("<")); //because Wikia's every next surprise is worse then the previous.
            //console.log("tmpStr 2:", newImg.src);
        }
        newImg.title = document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].getElementsByTagName('p')[2].textContent;
        newImg.alt = newImg.title;
        var articleLink = document.createElement('a');
        articleLink.href = document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].getElementsByTagName('p')[1].textContent;
        articleLink.innerHTML = 'read more';
        if (i === 0) {
            articleLink.style.display = 'none';
        }
        var infotext = document.createTextNode(document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].getElementsByTagName('p')[3].textContent);
        var briek = document.createElement('br');
        document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].innerHTML = '';
        document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].appendChild(newImg);
        console.log("newImg:", newImg, " | tmpStr:", tmpStr);
        document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].appendChild(infotext);
        document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].appendChild(briek);
        document.getElementsByClassName('ws_images')[0].getElementsByTagName('li')[i].appendChild(articleLink);
    }
    var divs = ['ws_bullets', 'ws_shadow'];
    for (i = 0; i < divs.length; i++) {
        var newdiv = document.createElement('div');
        newdiv.className = divs[i];
        document.getElementsByClassName('ws_images')[0].parentNode.appendChild(newdiv);
    }
    for (i = 0; i < document.getElementsByClassName('ws_images')[0].getElementsByTagName('img').length; i++) {
        document.getElementsByClassName('ws_images')[0].getElementsByTagName('img')[i].id = "wows1_" + i;
    }
    var container = document.createElement('div');
    var index = 1;
    for (i = 0; i < document.getElementsByClassName('ws_images')[0].getElementsByTagName('img').length; i++) {
        var newLink = document.createElement('a');
        newLink.href = '#';
        newLink.title = document.getElementsByClassName('ws_images')[0].getElementsByTagName('img')[i].title;
        var newImg = document.createElement('img');
        newImg.src = document.getElementsByClassName('ws_images')[0].getElementsByTagName('img')[i].src;
        newImg.alt = document.getElementsByClassName('ws_images')[0].getElementsByTagName('img')[i].title;
        newImg.setAttribute('width', '40');
        newImg.setAttribute('height', '30');
        var num = document.createTextNode(index);
        newLink.appendChild(newImg);
        newLink.appendChild(num);
        container.appendChild(newLink);
        index++;
    }
    document.getElementsByClassName('ws_bullets')[0].appendChild(container);
    document.getElementsByClassName('ws_images')[0].parentNode.style.display = 'none';
    $('#wowslider-container1').css('float', 'left');
}

translateToSlider();