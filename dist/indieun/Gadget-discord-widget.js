(function () {
    function insertDiscordWidget() {
        const container = document.querySelector("#discord-widget");
        if (!container) return;

        container.innerHTML = `
            <iframe 
                src="https://discord.com/widget?id=1050493243500024030&theme=dark"
                width="100%" 
                height="400" 
                allowtransparency="true" 
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
            </iframe>
        `;
    }

    document.addEventListener("DOMContentLoaded", insertDiscordWidget);
})();