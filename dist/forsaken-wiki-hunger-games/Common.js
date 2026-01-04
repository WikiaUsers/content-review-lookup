/* Any JavaScript here will be loaded for all users on every page load. */
// dee vee dee
$(function() {
    if (mw.config.get('wgPageName') === 'Test:DVD') {
        const container = $('<div id="dvd-container" style="width:500px;height:300px;position:relative;background:black;overflow:hidden;"></div>');
        const logo = $('<img id="dvd-logo" src="https://static.wikia.nocookie.net/forsaken-wiki-hunger-games/images/3/30/DVD.png/revision/latest/scale-to-width-down/800?cb=20251229142050" style="position:absolute;width:100px;height:50px;top:0;left:0;">');

        container.append(logo);
        $('#WikiaArticle').prepend(container);

        let x = 0, y = 0, dx = 2, dy = 2;

        function moveLogo() {
            x += dx; y += dy;
            if(x + logo.width() > container.width() || x < 0) dx *= -1;
            if(y + logo.height() > container.height() || y < 0) dy *= -1;
            logo.css({ left: x + 'px', top: y + 'px' });
            requestAnimationFrame(moveLogo);
        }
        moveLogo();
    }
});