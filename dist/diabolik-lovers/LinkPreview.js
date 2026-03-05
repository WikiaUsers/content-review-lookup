
/* ============================
   CUSTOM LINK PREVIEW POPUPS 
   ============================ */

(function () {
    const api = new mw.Api();
    let popup = null;
    let hideTimeout = null;

    function createPopup() {
        popup = document.createElement("div");
        popup.className = "mwe-popups mwe-popups-fade-in-up";
        popup.style.position = "absolute";
        popup.style.zIndex = "99999";
        popup.style.display = "none";

        popup.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
        popup.addEventListener("mouseleave", () => {
            hideTimeout = setTimeout(hidePopup, 150);
        });

        document.body.appendChild(popup);
    }

    function getPageTitleFromLink(link) {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("/wiki/")) return null;

        let title = href.replace("/wiki/", "");
        title = title.split("#")[0];
        title = title.split("?")[0];
        return decodeURIComponent(title).replace(/_/g, " ");
    }

    /* ------------------------------
       Parse template from target page
    ------------------------------ */
    function fetchTemplateData(title) {
        return api.get({
            action: "parse",
            page: title,
            prop: "text",
            format: "json"
        }).then(data => {
            const html = document.createElement("div");
            html.innerHTML = data.parse.text["*"];

            const descEl = html.querySelector(".shortdescription");
            if (!descEl) return {};

            return {
                customImage: descEl.dataset.shortdescImage || null,
                customTitle: descEl.dataset.shortdescTitle || null,
                customText: descEl.dataset.shortdescText || null
            };
        });
    }

    function hidePopup() {
        if (popup) popup.style.display = "none";
    }

    function showPopup(link, page, templateData) {
        if (!popup) createPopup();

        const fallbackParagraph = page.extract || page.description || null;
        const fallbackInfoboxImage = page.thumbnail ? page.thumbnail.source : null;

        const title =
            templateData.customTitle ||
            page.title ||
            link.textContent;

        const extract =
            templateData.customText ||
            fallbackParagraph ||
            "No preview available.";

        const thumbnail =
            (templateData.customImage ? `/wiki/Special:FilePath/${templateData.customImage}` : null) ||
            fallbackInfoboxImage ||
            null;

        popup.innerHTML = `
            <div class="mwe-popups-container">
                ${thumbnail ? `
                <div class="mwe-popups-thumbnail">
                    <img src="${thumbnail}" />
                </div>` : ""}
                <div class="mwe-popups-content">
                    <div class="mwe-popups-title"><strong>${title}</strong></div>
                    <div class="mwe-popups-extract"><small>${extract}</small></div>
                </div>
            </div>
            <div class="mwe-popups-footer">
                <a href="${link.href}" class="mwe-popups-readmore">Read more</a>
            </div>
        `;

        popup.style.display = "block";

        const rect = link.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        popup.style.top = `${window.scrollY + rect.bottom + 6}px`;
        popup.style.left = `${window.scrollX + rect.left}px`;

        if (rect.left + popupRect.width > window.innerWidth) {
            popup.style.left = `${window.scrollX + rect.right - popupRect.width}px`;
        }
    }

    function fetchPreview(title, link) {
        Promise.all([
            api.get({
                action: "query",
                prop: "extracts|pageimages|description",
                exintro: 1,
                explaintext: 1,
                piprop: "thumbnail",
                pithumbsize: 200,
                titles: title,
                format: "json"
            }),
            fetchTemplateData(title)
        ]).then(([apiData, templateData]) => {
            const pages = apiData.query.pages;
            const page = pages[Object.keys(pages)[0]];
            showPopup(link, page, templateData);
        });
    }

    function init() {
        const links = document.querySelectorAll(
            "#mw-content-text a[href^='/wiki/']:not(.image)"
        );

        links.forEach(link => {
            link.addEventListener("mouseenter", () => {
                clearTimeout(hideTimeout);
                const title = getPageTitleFromLink(link);
                if (title) fetchPreview(title, link);
            });

            link.addEventListener("mouseleave", () => {
                hideTimeout = setTimeout(hidePopup, 150);
            });
        });
    }

    mw.hook("wikipage.content").add(init);
})();