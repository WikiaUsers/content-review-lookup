function createTabs() {

    var tabIndex = 1;

    for (i = 0; i < document.getElementsByClassName('tabheader')[0].getElementsByTagName('li').length; i++) {
        var innerText = document.getElementsByClassName('tabheader')[0].getElementsByTagName('li')[i].textContent;
        var createLink = document.createElement('a');
        createLink.href = '#tabs-' + tabIndex;
        createLink.innerHTML = innerText;
        document.getElementsByClassName('tabheader')[0].getElementsByTagName('li')[i].innerHTML = '';
        document.getElementsByClassName('tabheader')[0].getElementsByTagName('li')[i].appendChild(createLink);
        tabIndex++;
    }

}

if ($('.tabheader').length) { createTabs(); }