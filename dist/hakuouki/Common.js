/* Any JavaScript here will be loaded for all users on every page load. */

/*	CUSTOM TOOLTIP SCRIPT */
//jQuery version just to keep here
// $(function () {
//     const arrayCharacters = [
//         {
//             link: $('a[href$="/wiki/Chizuru_Yukimura"]'),
//             tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c3/Yukimura.Chizuru.full.2978401.png/revision/latest?cb=20221211115156&format=original"><br><b>Chizuru Yukimura</b> is the main female character.</div>'
//         }, {
//             link: $('a[href$="/wiki/Toshizou_Hijikata"]'),
//             tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c1/Hijikata.Toshizou.%28Hakuouki%29.full.2982101.png/revision/latest?cb=20230102173613&format=original"><br><b>Toshizou Hijikata</b> is the Vice-Commander of the Shinsengumi.</div>'
//         }, {
//             link: $('a[href$="/wiki/Souji_Okita"]'),
//             tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/51/Okita.Souji.%28Hakuouki%29.full.2982108.png/revision/latest?cb=20230102173902&format=original"><br><b>Souji Okita</b> is the Captain of the 1st Division of the Shinsengumi.</div>'
//         }
//     ];
//     arrayCharacters.forEach(function (element) {
//         element.link.each(function(_, link) {
//             const $link = $(link);
//             const tooltipReveal = function () {
//                 const $tooltip = $(element.tooltip);
//                 $link.before($tooltip);
//                 $tooltip.toggleClass('none');
//             };
//             const tooltipRemove = function () {
//                 const $tooltip = $('#tooltip');
//                 $tooltip.remove();
//             };
//             $link.on({
//                 mouseenter: tooltipReveal,
//                 mouseleave: tooltipRemove,
//             });
//         });
//     });
// });


$(function () {
	const checkPage = document.querySelector('#nocharacterscript'); //if there's this id, don't run the script
	if(checkPage) {
		return;
	} else {
		//creating objects for characters with their links and the tooltip info
    const arrayCharacters = [
        {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Chizuru_Yukimura"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c3/Yukimura.Chizuru.full.2978401.png/revision/latest?cb=20221211115156&format=original"><br><b>Chizuru Yukimura</b> is the main female character.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Toshizou_Hijikata"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c1/Hijikata.Toshizou.%28Hakuouki%29.full.2982101.png/revision/latest?cb=20230102173613&format=original"><br><b>Toshizou Hijikata</b> is the Vice-Commander of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Souji_Okita"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/51/Okita.Souji.%28Hakuouki%29.full.2982108.png/revision/latest?cb=20230102173902&format=original"><br><b>Souji Okita</b> is the Captain of the 1st Division of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Hajime_Saitou"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/5b/Saitou.Hajime.%28Hakuouki%29.full.2978403.png/revision/latest?cb=20230102174403&format=original"><br><b>Hajime Saitou</b> is the Captain of the 3rd Division of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Heisuke_Toudou"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/55/Toudou.Heisuke.%28Hakuouki%29.full.2978408.png/revision/latest?cb=20221222163236&format=original"><br><b>Heisuke Toudou</b> is the Captain of the 8th Division of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Sanosuke_Harada"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/8/8f/Harada.Sanosuke.%28Hakuouki%29.full.2978414.png/revision/latest?cb=20230102173358&format=original"><br><b>Sanosuke Harada</b> is the Captain of the 10th Division of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Isami_Kondou"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/7/7b/Kondou.Isami.%28Hakuouki%29.full.2978988.png/revision/latest?cb=20221210231604&format=original"><br><b>Isami Kondou</b> is the Commander of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Keisuke_Sannan"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/e/ec/Sannan.Keisuke.full.2982114.png/revision/latest?cb=20230102093808&format=original"><br><b>Keisuke Sannan</b> is the General Commander of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Shinpachi_Nagakura"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/b/bc/Nagakura.Shinpachi.%28Hakuouki%29.full.2978418.png/revision/latest?cb=20221210230924&format=original"><br><b>Shinpachi Nagakura</b> is the Captain of the 2nd Division of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Genzaburou_Inoue"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/1/19/Inoue.Genzaburou.full.2978983.png/revision/latest?cb=20230102172503&format=original"><br><b>Genzaburou Inoue</b> is the Captain of the 6th Division of the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Susumu_Yamazaki"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/7/7e/Yamazaki.Susumu.%28Hakuouki%29.full.2982119.png/revision/latest?cb=20230102085124&format=original"><br><b>Susumu Yamazaki</b> is a spy and a medic in the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Kai_Shimada"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/52/Shimada.Kai.full.2978993.png/revision/latest?cb=20230102170701&format=original"><br><b>Kai Shimada</b> is a spy and a 2nd Division Corporal in the Shinsengumi.</div>'
        }, {
            link: document.querySelectorAll('.page__main a[href$="/wiki/Chikage_Kazama"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/d/dd/Kazama.Chikage.full.2982131.png/revision/latest?cb=20221211104843&format=original"><br><b>Chikage Kazama</b> is a demon working with the Satsuma Domain.</div>'
        }
    ];
    arrayCharacters.forEach(function (element) {
        element.link.forEach(function(link) {
            const tooltipReveal = function () {
                link.insertAdjacentHTML('beforebegin', element.tooltip); //add a tooltip to each element above the link
                const tooltip = document.querySelector('#tooltip');
                tooltip.classList.toggle('none'); //show it on the page cuz it's hidden by default
            };
            const tooltipRemove = function () {
                const tooltip = document.querySelector('#tooltip');
                tooltip.remove(); //remove the tooltip from the DOM
            };
            link.addEventListener('mouseenter', tooltipReveal);
            link.addEventListener('mouseleave', tooltipRemove);
        });
    });
	}
});