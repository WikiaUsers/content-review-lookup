const specialChangeByDiv = document.getElementById('specialChangeByDiv');
if(specialChangeByDiv !== null) {
    var wiki = specialChangeByDiv.getAttribute("data-source-wiki");
    if(wiki == "tq") {
       document.getElementsByClassName("wds-community-header__sitename")[0].innerHTML = '<a href="//nosniy-games.fandom.com">NG:Treasure Quest Wiki</a>';
       document.body.classList.add('tqbg');
       document.getElementsByClassName("wds-community-header__wordmark")[0].innerHTML = '<a accesskey="z" href="//nosniy-games.fandom.com"><img src="https://i.imgur.com/mFFR42S.png" width="65" height="65" alt="NG:Treasure Quest Wiki" class="treasure-quest_wordmark"></a>'
    }
    else if(wiki == "bhs") {
        document.getElementsByClassName("wds-community-header__sitename")[0].innerHTML = '<a href="//nosniy-games.fandom.com">NG:Black Hole Simulator Wiki</a>';
        document.body.classList.add('bhsbg');
        document.getElementsByClassName("wds-community-header__wordmark")[0].innerHTML = '<a accesskey="z" href="//nosniy-games.fandom.com"><img src="https://i.imgur.com/JUFAaVN.png" width="65" height="65" alt="NG:Black Hole Simulator Wiki" class="black-hole-simulator_wordmark"></a>'
    }
}
else {
    document.getElementsByClassName("wds-community-header__wordmark")[0].innerHTML = '<a accesskey="z" href="//nosniy-games.fandom.com"><img src="https://i.imgur.com/NYoB7mS.png" width="80" height="55" alt="Nosniy Games Wiki" style="position: absolute"><img src="https://i.imgur.com/xa3TwYa.png" width="80" height="55" alt="Nosniy Games Wiki" style="position: relative" class="ogWordmark_Special"></a>'
}