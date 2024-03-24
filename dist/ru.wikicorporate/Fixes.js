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

/* Фикс рекламного блока */
var adBGCleaner = setInterval(function () {
    if (document.getElementsByClassName('popular-pages__image').length > 0) {
        var adRail = document.getElementsByClassName('popular-pages__image')
        Array.prototype.forEach.call(adRail,
            function (image) {
                image.src = image.src.replace(/(\/smart\/width\/[\d]*\/height\/[\d]*)/g, "")
            }
        )
        clearInterval(adBGCleaner)    
    } 
}, 500)

/* Фикс категорий */
var catBGCleaner = setInterval(function () {
    if (document.getElementsByClassName('category-page__member-thumbnail').length > 0) {
        var pageCategory = document.getElementsByClassName('category-page__member-thumbnail')
        Array.prototype.forEach.call(pageCategory,
            function (image) {
                image.src = image.src.replace(/(\/smart\/width\/[\d]*\/height\/[\d]*)/g, "")
            }
        )
        clearInterval(catBGCleaner)    
    } 
}, 500)