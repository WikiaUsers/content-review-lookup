// Cosplay FanFeed --------------------------------------------------------
setTimeout(() => {
    document.querySelectorAll('.mcf-card-wiki-articles__list li').forEach(li => {
        li.innerHTML = li.innerHTML.replace(`<a href="/de/wiki/" class="mcf-card-wiki-articles__item-link" title="Main Page">`, `<a href="/de/wiki/Category:Darsteller" class="mcf-card-wiki-articles__item-link" title="Darsteller">`);
        li.innerHTML = li.innerHTML.replace(`<a href="/de/f" class="mcf-card-wiki-articles__item-link" title="Discuss">`, `<a href="/de/wiki/Category:Kollektionen" class="mcf-card-wiki-articles__item-link" title="Kollektionen">`);
        li.innerHTML = li.innerHTML.replace(`<a href="/de/wiki/Special:RecentChanges" class="mcf-card-wiki-articles__item-link" title="Recent changes">`, `<a href="/de/wiki/Category:Cosplays" class="mcf-card-wiki-articles__item-link" title="Cosplays">`);

        li.innerHTML = li.innerHTML.replace(`<svg class="wds-icon-tiny wds-icon" style="width: 14px; height: 14px;">
		                                		<use xlink:href="#wds-icons-home-tiny"></use>
		                                	</svg>`, `1`);
        li.innerHTML = li.innerHTML.replace(`<svg class="wds-icon-tiny wds-icon" style="width: 14px; height: 14px;">
		                                		<use xlink:href="#wds-icons-discussions-tiny"></use>
		                                	</svg>`, `2`);
        li.innerHTML = li.innerHTML.replace(`<svg class="wds-icon-tiny wds-icon" style="width: 14px; height: 14px;">
		                                		<use xlink:href="#wds-icons-activity-tiny"></use>
		                                	</svg>`, `3`);

        li.innerHTML = li.innerHTML.replace(`Main Page`, `Darsteller`);
        li.innerHTML = li.innerHTML.replace(`Discuss`, `Kollektionen`);
        li.innerHTML = li.innerHTML.replace(`Recent changes`, `Cosplays`);
    });
}, 4000);