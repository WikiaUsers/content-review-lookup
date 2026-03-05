mw.loader.using(['mediawiki.util', 'mediawiki.api'], function () {
	$(function() {
    	const newsDiv = document.getElementById("newsDiv");
        if(!newsDiv) {
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
                    newsDiv.innerHTML = '<div style="color:red;">Error loading news data.</div>';
                    return;
                }
            }
            if(newsData.length === 0) {
                newsDiv.innerHTML = '<div style="color:gray; text-align:center;">No news yet.</div>';
                return;
            }
            const latestNews = newsData.slice(0, 5);
            let htmlOutput = "";
            latestNews.forEach(item => {
                const titleHtml = item.link ? `<a href="${escapeHTML(item.link)}" style="color: inherit; text-decoration: none;">${escapeHTML(item.title)}</a>` : escapeHTML(item.title);
                htmlOutput += `
<div class="news-box">
    <div class="news-box-title">${titleHtml}</div>
    <div class="news-box-description">${escapeHTML(item.description)}</div>
    <div class="news-box-footer">${escapeHTML(item.author)} ● ${escapeHTML(item.date_display)}</div>
</div>
                `;
            });
            newsDiv.innerHTML = htmlOutput;
        }).catch(error => {
            console.error(error);
            newsDiv.innerHTML = "News load failed.";
        });
	});
});