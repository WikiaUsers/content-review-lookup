

(function () {
	console.log("JS ACTUALLY WORKS")
    const startDate = Date.UTC(2026, 6, 15); 
    const imageWidth = 120;
    const items = [

        {
            name: "Frost Staff",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Frost_Staff",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/d/d5/FrostStaffBM.png/revision/latest?cb=20260715152355"
        },

        {
            name: "Hellbreakers",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Hellbreakers",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/d/d0/HellBreakersBM.png/revision/latest?cb=20260715154216"
        },

        {
            name: "Strange Drink",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Strange_Drink",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/2/2a/StrangeDrinkBM.png/revision/latest?cb=20260715154201"
        },

        {
            name: "Classic Sword",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Classic_Sword",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/f/fe/ClassicSwordBMTemp.png/revision/latest?cb=20260715154633"
        },

        {
            name: "Spookinator",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Spookinator",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/c/c8/SpookinatorBM.png/revision/latest?cb=20260717103535"
        },

        {
            name: "Firework Launcher",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Firework_Launcher",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/9/95/FireworkLauncherBM.png/revision/latest?cb=20260718105035"
        },

        {
            name: "Speed Scythe",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Speed_Scythe",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/2/28/SpeedScythe.PNG.png/revision/latest?cb=20240122142042"
        },

        {
            name: "Noob Scythe",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Noob_Scythe",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/1/12/Noob.png/revision/latest?cb=20231202103257"
        },

        {
            name: "Golden Bubble Shot",
            page: "https://undertale-3d-boss-battles-roblox.fandom.com/wiki/Golden_Bubble_Shot",
            image: "https://static.wikia.nocookie.net/undertale-3d-boss-battles-roblox/images/c/c2/GoldenBubbleShotBM.png/revision/latest?cb=20260719095739"
        }

    ];

    function buildDailyItems(container) {

        const now = new Date();

        const todayUTC = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate()
        );

        const daysSinceStart = Math.floor(
            (todayUTC - startDate) / 86400000
        );

        const firstIndex =
            ((daysSinceStart % items.length) + items.length) % items.length;

        let html = `
            <table class="wikitable" style="width:100%; text-align:center;">
                <tr>
                	<th colspan="3">Today's Stock</th>
                </tr>
                <tr>
                	<th colspan="1" style="text-align:center;">Leaves next refresh</th>
                	<th colspan="1" style="text-align:center;">Leaves in 2 days</th>
                	<th colspan="1" style="text-align:center;">Leaves in 3 days</th>
                <tr>
        `;

        for (let i = 0; i < 3; i++) {

            const item = items[(firstIndex + i) % items.length];

            html += `
                <td style="padding:10px;">
                    <a href="${item.page}">
                        <img
                            src="${item.image}"
                            width="${imageWidth}"
                            alt="${item.name}"
                        >
                    </a>
                    <br>
                    <a href="${item.page}">
                        ${item.name}
                    </a>
                </td>
            `;
        }

        html += `
                </tr>
            </table>
        `;

        container.innerHTML = html;

    }


    $(function () {
    	console.log("BlackMarketScriptLoadSuccess")

        document.querySelectorAll(".current-market-items").forEach(function (element) {
        	console.log("containerSuccess");
            buildDailyItems(element);
        });

    });

})();