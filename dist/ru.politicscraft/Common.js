/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$(function () {
    var mapContainer = document.getElementById('dynmap-container');
    if (mapContainer) {
        var mapIframe = document.createElement('iframe');
        mapIframe.src = 'https://map.politicscraft.pp.ua/';
        mapIframe.style.width = '100%';
        mapIframe.style.height = '650px';
        mapIframe.style.border = '2px solid #2c2f33';
        mapIframe.style.borderRadius = '8px';
        mapIframe.setAttribute('allowfullscreen', 'true');
        mapContainer.innerHTML = '';
        mapContainer.appendChild(mapIframe);
    }

    var translatorContainer = document.getElementById('lingojam-container');
    if (translatorContainer) {
        var transIframe = document.createElement('iframe');
        transIframe.src = 'https://lingojam.com/embed/Chlenkijizyk';
        transIframe.style.width = '100%';
        transIframe.style.height = '350px';
        transIframe.style.border = '2px solid #2c2f33';
        transIframe.style.borderRadius = '8px';
        translatorContainer.innerHTML = '';
        translatorContainer.appendChild(transIframe);
    }
});