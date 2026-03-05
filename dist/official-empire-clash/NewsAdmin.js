mw.loader.using(['mediawiki.util', 'mediawiki.api', 'mediawiki.user'], function () {  
	$(function() {
        'use strict';
        const userGroups = mw.config.get('wgUserGroups') || [];
        const allowedGroups = ['sysop', 'content-moderator', 'bureaucrat'];
        const isAuthorized = userGroups.some((group) => {return allowedGroups.includes(group)})
        if(!isAuthorized) {
            mw.notify("No Authorized", { type: "error" });
            return;
        }
        mw.notify("Authorized | Do not leave input fields blank.", { type: "info" });
        const targetDiv = document.getElementById("empire-news-admin-panel");

        const targetHTML = `
    <div class="page-nf-css">
        <div class="news-form-nc">
            <div class="news-form-title">Empire Clash News Card</div>
            <div class="news-form-nc-i-title">
                <input type="text" placeholder="News Title" id="news-f-title-input" aria-label="News title input" maxlength="30">
            </div>
            <div class="news-form-nc-i-description">
                <textarea id="news-f-description-input" aria-label="News description input" placeholder="News Description" maxlength="200"></textarea>
            </div>
            <div class="news-form-submit" aria-label="News submit button"><a id="news-f-submit-a">Submit</a></div>
            <div id="news-form-status-msg"></div>
        </div>
    </div>
                `
        if(!targetDiv) {
            mw.notify("Cannot find target div, contact with admin", { type: "error" });
            return;
        }
        targetDiv.innerHTML = targetHTML;
        let isSubmitting = false;
        document.getElementById("news-f-submit-a").addEventListener("click", () => {
            if(isSubmitting) return;
            const titleValue = document.getElementById("news-f-title-input").value.trim();
            const descriptionValue = document.getElementById("news-f-description-input").value.trim();
            if(!titleValue || !descriptionValue) {
                mw.notify("Title or Description is null", { type: "warn" });
                return;
            }
            isSubmitting = true;
            
            const submitBtn = document.getElementById("news-f-submit-a");
            submitBtn.style.pointerEvents = "none";
            submitBtn.style.opacity = "0.5";

            const description = descriptionValue.length > 200 ? descriptionValue.substring(0, 200) + "..." : descriptionValue;
            const title = titleValue.length > 30 ? titleValue.substring(0, 30) + "..." : titleValue;
                    
            databaseProgress(title, description);
        });
        const databaseProgress = (title, description) => {
            const username = mw.config.get("wgUserName");
            const link = "/wiki/news/"+title.replace(/ /g, "_");
            const targetLink = "/wiki/news/"+title.replace(/ /g, "_")+"?action=edit&preload=Template:NewsPreload";

            const api = new mw.Api();
            const dbPage = "Template:news.json";
            const statusMsg = $('#news-form-status-msg');

            statusMsg.css('color', 'yellow').text('Being processed...');

            api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: dbPage,
                formatversion: 2
            }).then((data) => {
                const page = data.query.pages[0];
                let currentData = [];
                if(!page.missing) {
                    try {
                        currentData = JSON.parse(page.revisions[0].content);
                    } catch(err) {
                        console.error("JSON Error:", err);
                        currentData = [];
                    }
                }
                const newEntry = {
                    id: Date.now(),
                    title: title,
                    description: description,
                    link: link,
                    author: username,
                    timestamp: Date.now(),
                    date_display: new Date().toLocaleString('en-GB', {day: '2-digit',month: 'short',year: 'numeric',hour: '2-digit',minute: '2-digit',hour12: false})
                }

                currentData.unshift(newEntry);
                if(currentData.length > 50) {
                    currentData = currentData.slice(0, 50);
                }
                statusMsg.text('Saving...');

                return api.postWithToken('csrf', {
                    action: 'edit',
                    title: dbPage,
                    text: JSON.stringify(currentData, null, 4),
                    summary: 'New news entry: ' + title + ' (via Admin Panel)',
                    minor: true
                });
            }).then(() => {
                statusMsg.css('color', '#55ff55').html('Task complated');
                setTimeout(() => {
                    window.location.href = targetLink;
                }, 1500);
            }).catch((error) => {
                console.error("API Error:",error);
                statusMsg.css('color', 'red').text('Task failed: ' + error);
                mw.notify("Error saving news", { type: "error" });

                isSubmitting = false;
                const submitBtn = document.getElementById("news-f-submit-a");
                submitBtn.style.pointerEvents = "auto";
                submitBtn.style.opacity = "1";
            })
        }
	})
});