// Category thumbnails 1x1 -----------------------------------------------------
document.querySelectorAll('.category-page__member img').forEach(img => {
    img.src = img.src.replace('width/40/height/30', 'width/100/height/100');
});

// Images limit = 500 ----------------------------------------------------------
document.querySelectorAll('li a[data-tracking="explore-images"]').forEach(link => {
	link.href = link.href.replace(':NewFiles', ':NewFiles?limit=500');
});

// Recent Images ---------------------------------------------------------------
setTimeout(() => {
    document.querySelectorAll('.card-image img').forEach(img => {
        img.src = img.src.replace('top-crop/width/300/height/168', 'scale-to-width-down/200');
    });
}, 3000);
// Later added images
setTimeout(() => {
	const observerRecentIamges = new MutationObserver(mutations => {
	    for (const mutation of mutations) {
	        if (mutation.type === "childList") {
	            mutation.addedNodes.forEach(node => {
	                if (node.nodeType === 1 && node.classList.contains("alice-carousel__stage-item")) {

					    setTimeout(() => {
					    	document.querySelectorAll('.card-image img').forEach(img => {
								img.src = img.src.replace('top-crop/width/300/height/168', 'scale-to-width-down/200');
							});
						}, 300);
	                }
	            });
	        }
	    }
	});
	observerRecentIamges.observe(document.body, {
	    childList: true,
	    subtree: true
	});
}, 500);

// Replace letters with other letters that have the font-family ----------------
$("head").append(`<style> 
	span[data-letter] {
	    font-size: 0;
	    display: inline-block;
	}
	span[data-letter]::after {
	    content: attr(data-letter);
	    font-size: 36px;
    	display: inline-block;
	} 
	span[data-letter="d"]::after {
    	translate: 0 -15px;
	}
	span[data-letter="n"]::after {
	    translate: -10px -15px;
	}
	span:is([data-letter="Э"],[data-letter="э"]):before {
	    content: attr(data-letter);
	    font-size: 36px;
	    scale: -1 1;
	    margin-left: -1.2px;
	    position: absolute;
	}
	span[data-letter="э"]:before {
	    margin-left: -0.6px;
	}
	span[data-letter="o"]::before {
	    content: "1";
	    font-size: 36px;
	    position: absolute;
	    translate: 0 -2px;
	    scale: -1 1;
	    rotate: 323deg;
	    overflow: hidden;
	    height: 18px;
	}
	span[data-letter=e][φ]::before {
	    content: "-";
	    font-size: 36px;
	    position: absolute;
	    translate: -12px 1.5px;
	}
	span[data-letter="I"]::before {
	    content: "C";
	    font-size: 36px;
	    position: absolute;
	    rotate: 270deg;
	    translate: -6.3px -4px;
	}
	</style>`
);
document.querySelectorAll('.page-header__title').forEach(h1 => {
	h1.innerHTML = h1.innerHTML
		.replace(/Ɔ/g, '<span data-letter="C" style="scale:-1 1">Ɔ</span>')
		.replace(/ɔ/g, '<span data-letter="c" style="scale:-1 1">ɔ</span>')
		.replace(/Ɛ/g, '<span data-letter="З" style="scale:-1 1">Ɛ</span>')
		.replace(/ɛ/g, '<span data-letter="з" style="scale:-1 1">ɛ</span>')
		.replace(/Ǝ/g, '<span data-letter="E" style="scale:-1 1">Ǝ</span>')
		.replace(/ǝ/g, '<span data-letter="e" style="scale:-1 1">ǝ</span>')
		.replace(/Ʒ/g, '<span data-letter="3">Ʒ</span>')
		.replace(/ʒ/g, '<span data-letter="3" style="translate:0 6px">ʒ</span>')
		.replace(/Ɵ/g, '<span data-letter="Э">Ɵ</span>')
		.replace(/ɵ/g, '<span data-letter="э">ɵ</span>')
		.replace(/δ/g, '<span data-letter="o">δ</span>')
		.replace(/Λ/g, '<span data-letter="V" style="rotate:180deg;translate:0 -1.4px;">Λ</span>')
		.replace(/ɑ/g, '<span data-letter="d" style="overflow:hidden;height:20px;translate:0 .7px;">ɑ</span>')
		.replace(/Ψ/g, '<span data-letter="I" style="margin:0 10px;">Ψ</span>')
		.replace(/φ/g, '<span data-letter="e" φ style="rotate:270deg;translate:3.5px 1px;scale:1 -1;margin-right:2px;">φ</span>')
		.replace(/ɾ/g, '<span data-letter="n" style="overflow:hidden;height:20px;scale:-1 1;translate:0 .7px;width:11px;margin-right:1px;">ɾ</span>');
		/*.replace(/ɽ/g, 'r<span data-letter="j" style="scale:-1 1">ɽ</span>');*/
});

// Audio from URL---------------------------------------------------------------
document.querySelectorAll('.mw-default-size').forEach(span => {
	span.innerHTML = span.innerHTML
		.replace('&lt;', '<')
		.replace('&gt;', '>')
		.replace('delete', '')
		.replace('<span style="display:none">', '');
});

// History button --------------------------------------------------------------
(function($){
	// Prevent double load
	window.xorumwiki = window.xorumwiki || {};
	if (window.xorumwiki.historyButton) return;
	window.xorumwiki.historyButton = true;

	function main() {
		// More consitent
		setTimeout(historyHtml, 200);
	}

	function historyHtml() {
		var $button = $("<a>")
			.addClass("wds-button wds-is-text page-header__action-button has-label")
			.attr("href", "?action=history")
			.html(`<svg class='wds-icon wds-icon-small'>
				<use xlink:href='#wds-icons-book-small'></use>
			</svg>	History`);

		// Insert to nav
		$("body:not(.action-history) .page-header__actions>a:last-of-type").after($button);
	}
	
	// Remove original button in dropdown
	document.querySelector(".page-header__actions #ca-history").remove();

	main();
})(jQuery);

// Lightbox --------------------------------------------------------------------
const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.classList.contains("lightboxContainer")) {
						
					setTimeout(() => {
						// Link open in current tab by default
						document.querySelectorAll('a[target="_blank"]').forEach(link => {
						    link.removeAttribute('target');
						});
						// Image size change
						document.querySelectorAll('.LightboxCarouselContainer img').forEach(img => {
						    img.src = img.src.replace('latest?', 'latest/scale-to-width-down/55?');
						});
					}, 800);
                }
            });
        }
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Infobox tab syncronization --------------------------------------------------
setTimeout(() => {
	const groups = [
		{
			buttons: [...document.querySelectorAll(".wds-tab__content.wds-is-current .pi-image-collection .wds-tabs__tab")],
			images:  [...document.querySelectorAll(".wds-tab__content.wds-is-current .pi-image-collection .wds-tab__content:nth-child(n+2)")]
		},
		{
			buttons: [...document.querySelectorAll(".wds-tab__content:not(.wds-is-current) .pi-image-collection .wds-tabs__tab")],
			images:  [...document.querySelectorAll(".wds-tab__content:not(.wds-is-current) .pi-image-collection .wds-tab__content:nth-child(n+2)")]
		}
	];
	
	function activate(index, from, to) {
		from.buttons.forEach((b,i) => b.classList.toggle("wds-is-current", i === index));
		from.images.forEach((img,i) => img.classList.toggle("wds-is-current", i === index));
		to.buttons.forEach((b,i) => b.classList.toggle("wds-is-current", i === index));
		to.images.forEach((img,i) => img.classList.toggle("wds-is-current", i === index));
	}
	
	groups.forEach((group, gIndex) => {
		group.buttons.forEach((btn, i) => {
			btn.addEventListener("click", () => {
				activate(i, groups[gIndex], groups[1 - gIndex]);
			});
		});
	});
}, 500);