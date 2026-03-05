mw.loader.using(['mediawiki.util', 'mediawiki.api'], function () {
	$(function() {
    	const npNewsDiv = document.getElementById("npNewsDiv");
        const npSearchDiv = document.querySelector(".np-news-search-box");

        if(!npNewsDiv || !npSearchDiv) {
            mw.notify("Target div not found", { type: "error" });
            return;
        }
        const escapeHTML = (str) => {
            if (!str) return "";
            return str.replace(/[&<>"']/g, function(m) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                }[m];
            });
        };

        npSearchDiv.innerHTML = `
<input type="text" placeholder="Search News" id="npNewsInput">
                `;
        const api = new mw.Api();
        const dbPage = "Template:news.json";
        api.get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            titles: dbPage,
            formatversion: 2
        }).then((data) => {
            const page = data.query.pages[0];
            let newsData = [];

            if(!page.missing) {
                try {
                    newsData = JSON.parse(page.revisions[0].content);
                } catch(error) {
                    console.error(error);
                    npNewsDiv.innerHTML = '<div style="color:red;">Error loading news data.</div>';
                    return;
                }
            }
            if(newsData.length === 0) {
                npNewsDiv.innerHTML = '<div style="color:gray; text-align:center;">No news yet.</div>';
                return;
            }
                    
            const renderNews = (filterText = "") => {
                let htmlOutput = "";
                const lowerFilter = filterText.toLowerCase();
                const filteredData = newsData.filter(item => item.title.toLowerCase().includes(lowerFilter) || item.description.toLowerCase().includes(lowerFilter) || item.author.toLowerCase().includes(lowerFilter));

                if(filteredData.length === 0) {
                    npNewsDiv.innerHTML = '<div style="color:gray; text-align:center;">No matching news found.</div>';
                    return;
                }

                filteredData.forEach(data => {
                    htmlOutput += `
<div class="np-news-box card" data-link="${escapeHTML(data.link) || ''}">
    <div class="np-news-box-title">${escapeHTML(data.title)}</div>
    <div class="np-news-box-description">${escapeHTML(data.description)}</div>
    <div class="np-news-box-footer">${escapeHTML(data.author)} ● ${escapeHTML(data.date_display)}</div>
</div>
                    `;
                    
                });
                npNewsDiv.innerHTML = htmlOutput;
                
            }

            renderNews();
            document.getElementById("npNewsInput").addEventListener("input", (event) => {
                const input = event.target;
                const inputValue = input.value;
                console.log(input, inputValue);
                renderNews(inputValue);
            });
            npNewsDiv.addEventListener("click", (event) => {
                const isCard = event.target && event.target.closest(".card");
                if(!isCard) return;
                const link = isCard.getAttribute("data-link");
                if(link) window.location.href = link;
            });
        }).catch(error => {
            console.error(error);
            npNewsDiv.innerHTML = "News load failed.";
        });
	});
});