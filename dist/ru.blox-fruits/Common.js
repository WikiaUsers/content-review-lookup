/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

document.addEventListener('DOMContentLoaded', () => {
    const infobox = document.querySelector('.portable-infobox.type-pedia');
    if (infobox) {
        const figure = infobox.querySelector('figure');
        const piItem = infobox.querySelector('.pi-item');
        if (figure && !piItem) {
            const newPiItem = document.createElement('div');
            newPiItem.classList.add('pi-item');
            figure.after(newPiItem);
        }
    }
});