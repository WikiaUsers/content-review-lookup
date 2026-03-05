/* Any JavaScript here will be loaded for all users on every page load. */

(function() {
    // 1. Define your Image URLs
    // Replace these with the direct URLs of your uploaded icons
    const cursorNormal = 'https://static.wikia.nocookie.net/roblox-murdurr/images/f/fc/Cursor.webp/revision/latest?cb=20260219144140';
    const cursorWalking = 'https://static.wikia.nocookie.net/roblox-murdurr/images/f/fc/Cursor.webp/revision/latest?cb=20260219144140';

    // 2. Create the CSS
    const style = document.createElement('style');
    style.innerHTML = `
        body, a, button {
            cursor: url('${cursorNormal}'), auto !important;
        }
        body.cursor-dragging, body.cursor-dragging a, body.cursor-dragging button {
            cursor: url('${cursorWalking}'), move !important;
        }
    `;
    document.head.appendChild(style);

    // 3. JavaScript to toggle the "Walking" state
    window.addEventListener('mousedown', function() {
        document.body.classList.add('cursor-dragging');
    });

    window.addEventListener('mouseup', function() {
        document.body.classList.remove('cursor-dragging');
    });
})();

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionTemplates.js',
    ]
});