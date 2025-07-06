// Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице

// Изменение фона вики с течением дня
$(function () {
    const bgImages = [
        'https://static.wikia.nocookie.net/slimerancher/images/a/a2/Site-background-light1.jpg/revision/latest?cb=20250626142202&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/d/db/Site-background-light2.jpg/revision/latest?cb=20250626142203&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/5/59/Site-background-light3.jpg/revision/latest?cb=20250626142204&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/7/78/Site-background-light4.jpg/revision/latest?cb=20250703194636&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/3/34/Site-background-dark1.jpg/revision/latest?cb=20250626142158&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/f/fe/Site-background-dark2.jpg/revision/latest?cb=20250626142159&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/1/14/Site-background-dark3.jpg/revision/latest?cb=20250626142200&format=original&path-prefix=ru',
        'https://static.wikia.nocookie.net/slimerancher/images/0/07/Site-background-dark4.jpg/revision/latest?cb=20250626142201&format=original&path-prefix=ru'
    ];
    bgImages.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    const now = new Date();
    const hour = now.getHours();
    let className = '';
    if (hour < 6) {
        className = 'BG4';
    } else if (hour < 9) {
        className = 'BG1';
    } else if (hour < 16) {
        className = 'BG2';
    } else if (hour < 19) {
        className = 'BG3';
    } else {
        className = 'BG4';
    }
    const oldClasses = ['BG1', 'BG2', 'BG3', 'BG4'];
    oldClasses.forEach(cls => document.body.classList.remove(cls));
    if (className) {
        document.body.classList.add(className);
    }
});