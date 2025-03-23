alert("MediaWiki:Common.js loaded!");
$(document).ready(function() {
    console.log("Custom JS loaded");

    // Check for verse range in the URL (decoded)
    let url = decodeURIComponent(window.location.href);
    console.log("Decoded URL:", url);
    let rangeMatch = url.match(/:(\d+)-(\d+)$/);
    if (rangeMatch) {
        console.log("Range found in URL:", rangeMatch);
        // Change the hash to the first verse
        window.location.hash = "#" + rangeMatch[1];
        // Call the highlighting function
        highlightVerseRange(rangeMatch[1], rangeMatch[2]);
    } else {
        console.log("No range found in URL");
    }

    // Process all internal links in the page
    let anchors = document.querySelectorAll("a[href*=':']");
    anchors.forEach(anchor => {
        // Only process wiki links
        if (anchor.href.indexOf("/wiki/") === -1) return;

        console.log("Processing link:", anchor.href);

        // Check if link ends with a range e.g. :1-5
        let rangeMatchLink = anchor.href.match(/:(\d+)-(\d+)$/i);
        if (rangeMatchLink) {
            let newHref = anchor.href.replace(/:(\d+)-(\d+)$/i, "#$1");
            console.log("Rewriting range link to:", newHref);
            anchor.href = newHref;
            anchor.dataset.rangeStart = rangeMatchLink[1];
            anchor.dataset.rangeEnd = rangeMatchLink[2];
            anchor.addEventListener("click", function(event) {
                setTimeout(function() {
                    highlightVerseRange(anchor.dataset.rangeStart, anchor.dataset.rangeEnd);
                }, 100);
            });
        } else {
            // Handle standard verse links (e.g. :1)
            let match = anchor.href.match(/:(\d+)$/i);
            if (match) {
                let newHref = anchor.href.replace(/:(\d+)$/i, "#$1");
                console.log("Rewriting standard link to:", newHref);
                anchor.href = newHref;
            }
        }
    });

    // Highlighting function
    function highlightVerseRange(start, end) {
        console.log("Highlighting verses", start, "to", end);
        let startNum = parseInt(start, 10);
        let endNum = parseInt(end, 10);
        if (isNaN(startNum) || isNaN(endNum)) {
            console.log("Parsing error in highlightVerseRange");
            return;
        }
        for (let i = startNum; i <= endNum; i++) {
            let verseEl = document.getElementById(String(i));
            if (verseEl) {
                verseEl.classList.add("verse-highlight");
                console.log("Highlighted verse", i);
            } else {
                console.log("No element found for verse", i);
            }
        }
    }
});