// Category thumbnails 1x1
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/40/height/40');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('width/40/height/30', 'width/40/height/40'));
});

// Recent Images design
document.querySelectorAll('.alice-carousel__stage img').forEach(img => {
    img.src = img.src.replace('height/168', 'height/300');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('height/168', 'height/300'));
    img.onload = function() {
        console.log('Bild geladen:', img.src);
    };
    img.removeAttribute('loading');
});

// New usertags
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.user-identity-header__tag').forEach(function(tag) {
        if (tag.textContent === "Administrator") {
            tag.textContent = "Admin";
        }
    });
});

/*document.querySelectorAll('.alice-carousel__stage img').forEach(img => {
    img.src = img.src.replace('height/168', 'height/300');
    img.setAttribute('data-src', img.getAttribute('data-src').replace('height/168', 'height/300'));
    img.setAttribute('onload', img.getAttribute('loading'));
    img.removeAttribute('loading');
});*/
/*document.addEventListener("DOMContentLoaded", function() {
    function updateCarouselItems() {
        document.querySelectorAll('.alice-carousel__stage-item').forEach(item => {
            const cardVertical = item.querySelector('.wds-card-vertical');
            const cardImageContainer = item.querySelector('.card-image');
            const cardImage = item.querySelector('.card-image img');

            if (cardVertical) {
                cardVertical.classList.remove('wds-card-vertical--4-3');
                cardVertical.classList.add('wds-card-vertical--1-1');
            }

            if (cardImageContainer) {
                cardImageContainer.classList.remove('card-image--4-3');
                cardImageContainer.classList.add('card-image--1-1');
            }

            if (cardImage) {
                // Hier die neue URL setzen
                cardImage.src = cardImage.src.replace('/smart/width/300/height/168', '/revision/latest');
            }
        });
    }

    // Initiale Anwendung der Änderungen
    updateCarouselItems();

    // Änderungen erneut anwenden, wenn neue Inhalte geladen werden
    const observer = new MutationObserver(updateCarouselItems);
    observer.observe(document.querySelector('.alice-carousel__stage'), { childList: true, subtree: true });

    // Sicherstellen, dass Änderungen nach einer kurzen Verzögerung angewendet werden
    setTimeout(updateCarouselItems, 1000);
});*/
/*document.querySelectorAll('.alice-carousel__stage-item').forEach(item => {
    const cardVertical = item.querySelector('.wds-card-vertical');
    const cardImageContainer = item.querySelector('.card-image');
    const cardImage = item.querySelector('.card-image img');

    if (cardVertical) {
        cardVertical.classList.remove('wds-card-vertical--4-3');
        cardVertical.classList.add('wds-card-vertical--1-1');
    }

    if (cardImageContainer) {
        cardImageContainer.classList.remove('card-image--4-3');
        cardImageContainer.classList.add('card-image--1-1');
    }

    if (cardImage) {
        // Hier die neue URL setzen
        cardImage.src = cardImage.src.replace('/smart/width/300/height/168', '/revision/latest');
    }
});*/
/*document.querySelectorAll('.alice-carousel__stage-item').forEach(item => {
    const cardVertical = item.querySelector('.wds-card-vertical');
    const cardImage = item.querySelector('.card-image img');

    if (cardVertical) {
        cardVertical.classList.remove('wds-card-vertical--4-3');
        cardVertical.classList.add('wds-card-vertical--1-1');
    }

    if (cardImage) {
        cardImage.parentElement.classList.remove('card-image--4-3');
        cardImage.parentElement.classList.add('card-image--1-1');
        // Hier die neue URL setzen
        cardImage.src = cardImage.src.replace('/smart/width/300/height/168', '/revision/latest');
    }
});*/
/*document.querySelectorAll('.alice-carousel__stage-item').forEach(item => {
    const cardVertical = item.querySelector('.wds-card-vertical');
    const cardImageContainer = item.querySelector('.card-image');
    const cardImage = item.querySelector('.card-image img');

    if (cardVertical) {
        cardVertical.classList.remove('wds-card-vertical--4-3');
        cardVertical.classList.add('wds-card-vertical--1-1');
        cardVertical.style.setProperty('width', '100%', 'important');
    }

    if (cardImageContainer) {
        cardImageContainer.classList.remove('card-image--4-3');
        cardImageContainer.classList.add('card-image--1-1');
        cardImageContainer.style.setProperty('width', '100%', 'important');
        cardImageContainer.style.setProperty('height', 'auto', 'important');
    }

    if (cardImage) {
        // Hier die neue URL setzen
        cardImage.src = cardImage.src.replace('/smart/width/300/height/168', '/revision/latest');
        cardImage.style.setProperty('width', '100%', 'important');
        cardImage.style.setProperty('height', 'auto', 'important');
    }
});*/


// Recent images gallery adjustment
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.alice-carousel__stage-item').forEach(item => {
        if (item.style.width === '200px') {
            item.style.width = '100px !important';
        }
    });
});