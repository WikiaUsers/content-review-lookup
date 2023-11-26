/* Фикс новостной ленты */
var imageBGCleaner = setInterval(function () {
    if (document.getElementsByClassName('mcf-card-article__thumbnail').length > 0) {
        var fanFeed = document.getElementsByClassName('mcf-card-article__thumbnail')
        Array.prototype.forEach.call(fanFeed,
            function (image) {
                image.src = image.src.replace(/(\/smart\/width\/[\d]*\/height\/[\d]*)/g, "")
            }
        )
        clearInterval(imageBGCleaner)    
    } 
}, 500)

/* Фикс свежих изображений */
setInterval(function () {
    if (document.getElementsByClassName('rail-recentImages-module')[0].getElementsByClassName('recentImage__image').length > 0) {
        var recentImagesRail = document.getElementsByClassName('rail-recentImages-module')[0].getElementsByClassName('recentImage__image')
        Array.prototype.forEach.call(recentImagesRail,
            function (image) {
                image.getElementsByTagName('img')[0].src = image.getElementsByTagName('img')[0].src.replace(/(\/smart\/width\/[\d]*\/height\/[\d]*)/g, "")
            }
        )
    } 
}, 500)