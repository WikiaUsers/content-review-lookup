/* Umieszczony tutaj kod JavaScript zostanie załadowany przez użytkowników korzystających ze wszystkich skórek */
importArticles({
	type: 'script',
	articles: [
		'u:pl.tes:MediaWiki:APIQuery.js', /* Łatwe dodawanie licencji do przesłanych obrazków */
		'u:pl.tes:MediaWiki:Licenses.js', /* Łatwe dodawanie licencji do przesłanych obrazków */
		'u:pl.tes:MediaWiki:Change.js',	  /* Switcher dla infoboksów */
	]
});

// LICZNIK by Nanaki
function getTimeCountText(time) {
	amount = Math.floor((time - new Date().getTime()) / 1000);
	if (amount < 0) return false;

	var days = Math.floor(amount / 86400);
	amount = amount % 86400;
	var hours = Math.floor(amount / 3600);
	amount = amount % 3600;
	var mins = Math.floor(amount / 60);
	amount = amount % 60;
	var secs = Math.floor(amount);

	var list = [];
	if (days > 0) {
		list.push('<span class="days">' + days + ' ' + ((days == 1) ? 'dzień' : 'dni') + '</span>');
	}
	if (hours > 0) {
		list.push('<span span="hours">' + hours + ' h</span>');
	}
	list.push('<span span="minutes">' + mins + ' m</span>');
	list.push('<span span="seconds">' + secs + ' s</span>');

	return list.join(' ');
}

function countBoxTick(box) {
	console.log(this);
	var time = box.data('time');
	var res = getTimeCountText(time);
	if (res) {
		box.html(res);
		setTimeout(function() {
			countBoxTick(box);
		}, 1000);
	} else {
		box.html('Oczekuj!');
	}
}
$('.countbox').each(function() {
	if ($(this).data('date')) {
		var time = new Date($(this).data('date')).getTime();
		if (!isNaN(time)) {
			$(this).data('time', time);
			countBoxTick($(this));
		} else {
			$(this).html('Niepoprawna data');
		}
	}
});

/* Konfiguracja tooltipów */
var tooltips_list = [{
		classname: 'item-tooltip',
		parse: '{' + '{p/tooltip|<#item#>}}',
	},
	{
		classname: 'character-tooltip',
		parse: '{' + '{h/tooltip|<#character#>}}'
	}
];

/* Piękne rzeczy od Lu */
$(function() {
	var pi = $(".pi-theme-groupswitch");
	if (pi.length > 0) {
		pi.children(".pi-group").each(function() {
			$this = $(this);
			$this.attr("id", "pi-switchablegroup-" + ($this.index() - 2));
		});
		pi.find("> .pi-navigation .pi-switch-text").each(function() {
			$this = $(this);
			$this.data("groupid", $this.index());
			$this.click(function() {
				$this = $(this);
				if ($this.hasClass("pi-switch-text-active")) return;
				pi.find("> .pi-navigation .pi-switch-text-active").removeClass("pi-switch-text-active");
				$this.addClass("pi-switch-text-active");
				pi.children(".pi-group.pi-collapse-open").removeClass("pi-collapse-open").addClass("pi-collapse-closed");
				$("#pi-switchablegroup-" + $this.data("groupid")).removeClass("pi-collapse-closed").addClass("pi-collapse-open");
			});
		});
	}
});

/* Ładowanie ikonek by Lu */
$(".pi-icon img").each(function() {
	var $this = $(this);
	$this.attr("src", $this.attr("data-src"));
	$this.removeClass("lzyPlcHld");
});