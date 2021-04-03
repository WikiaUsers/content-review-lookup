$(function () {
    var video = document.createElement("video");
    video.setAttribute("loop", "loop");
    video.setAttribute("autoplay", "autoplay");

    video.style.borderRadius = "20px";
    video.style.filter = "brightness(.2)";
    video.style.width = "100%";

    var src = document.createElement("source");
    src.src = "https://static.wikia.nocookie.net/rabi-ribi/images/2/2a/Microtrailer.webm/revision/latest?path-prefix=ru"; //use a local source
    
    var content = document.createElement("div");
    
    content.style.width = "80%";
    content.style.position = "absolute";
    content.style.textAlign = "center";
    content.style.margin = "10% 0";

    var img = document.createElement("img");
    img.src = "https://vignette.wikia.nocookie.net/rabi-ribi/images/1/12/Заглавная_-_Сисини.png/revision/latest?path-prefix=ru";
    img.setAttribute("width", "80px");

    var header = document.createElement("div");
    header.innerHTML = "Добро пожаловать на Rabi-Ribi вики";

    header.style.fontFamily = "VWB, 'Helvetica Neue', Helvetica, sans-serif";
    header.style.letterSpacing = "0.1ex";
    header.style.background = "linear-gradient(45deg, #8b57bc, #ee7294)";
    header.style.WebkitBackgroundClip = "text";
    header.style.WebkitTextFillColor = "transparent";
    header.style.fontSize = "25px";

    var subheader = document.createElement("p");
    subheader.innerHTML = "Википроект об игре <i>Rabi-Ribi</i>, свободный для редактирования";

    var separator = document.createElement("hr");

    separator.style.border = "none";
    separator.style.background = "linear-gradient(45deg, transparent, #ee7294, transparent)";
    separator.style.width = "80%";
    separator.style.height = "2px";

    var desc = document.createElement("p");
    desc.innerHTML = "<a href='/ru/wiki/Rabi-Ribi'>Rabi-Ribi</a> — это показательная смесь метроидвании и буллет-хелла от студии <i>CreSpirit</i> за авторством идеи <i>GemaYue</i>, предлагающая множество различных сложностей, боссов и вариантов её прохождения.";

    var buttons = document.createElement("div");

    buttons.style.marginTop = "20px"

    var link_steam = document.createElement("a");
    link_steam.className = "wds-button wds-is-secondary";

    link_steam.style.margin = "0 6px";
    link_steam.style.borderColor = "#47bfff";
    link_steam.style.color = "#47bfff";
    link_steam.style.backgroundColor = "#47bfff25";

    link_steam.href = "https://store.steampowered.com/app/400910/RabiRibi/";
    link_steam.innerHTML = "Steam";

    var link_psStore = document.createElement("a");
    link_psStore.className = "wds-button wds-is-secondary";

    link_psStore.style.margin = "0 6px";
    link_psStore.style.borderColor = "#00a2ff";
    link_psStore.style.color = "#00a2ff";
    link_psStore.style.backgroundColor = "#00a2ff25";

    link_psStore.href = "https://store.playstation.com/ru-ru/product/EP4293-CUSA08233_00-RABIRIBIPS400100";
    link_psStore.innerHTML = "PlayStation Store";

    var link_eShop = document.createElement("a");
    link_eShop.className = "wds-button wds-is-secondary";

    link_eShop.style.margin = "0 6px";
    link_eShop.style.borderColor = "#ffbc00";
    link_eShop.style.color = "#ffbc00";
    link_eShop.style.backgroundColor = "#ffbc0025";

    link_eShop.href = "https://www.nintendo.ru/-/-Nintendo-Switch/Rabi-Ribi-1651288.html";
    link_eShop.innerHTML = "Nintendo eShop";

    $("#mainpageHeader")[0].innerHTML = "";
    $("#mainpageHeader")[0].appendChild(video);
    video.appendChild(src);
    video.after(content);

    content.appendChild(img);
    content.appendChild(header);
    content.appendChild(subheader);
    content.appendChild(separator);
    content.appendChild(desc);
    content.appendChild(buttons);

    buttons.appendChild(link_steam);
    buttons.appendChild(link_psStore);
    buttons.appendChild(link_eShop);
})