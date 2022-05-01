// TOOLTIPS by Nanaki
	window.tooltips_list = [
	{
		classname: 'hero-tooltip',
		parse: "{"+"{#dpl:|title=<#hero#>|count={"+"{#if:<#hero#>|1|0}}|uses=Szablon:Infobox/Bohatera|include={Infobox/Bohatera¦Bohater/Tooltip}|secseparators=,,<div style='text-align:center;border:2px solid #00c4ff;border-width:0 2px 2px;width:248px;'>[[File:,.svg¦50px]] , [[File:,.svg¦50px]]</div>|multisecseparators=,.svg¦50px]] [[File:,,]]|format=,|suppresserrors=true}}",
	},
];

// KONFIGURACJA TAGU NIEAKTYWNYCH UŻYTKOWNIKÓW //
	window.InactiveUsers = {
	text: {
		unknown: 'Nieaktywny',
		female: 'Nieaktywna'
	},
	months: 2
};

// PODTYTUŁY BOHATERÓW by Szynka013, Luqreg // 
	$(".page-header__title").after('<div class="page-header__page-subtitle">' + $("span.changePageTitle").text() + '</div>');

// DWA MODUŁY //
window.AddRailModule = ['Szablon:Aktualności', 'Szablon:Discord'];