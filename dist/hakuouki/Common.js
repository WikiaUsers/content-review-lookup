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
    	//Chizuru
        {
            link: document.querySelectorAll('.page__main p a[href$="/wiki/Chizuru_Yukimura"], .page__main p a[href$="/wiki/Chizuru_Yukimura_(Visual_Novel)"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c3/Yukimura.Chizuru.full.2978401.png/revision/latest?cb=20221211115156&format=original"><br><b>Chizuru Yukimura</b> is the main female character.</div>'
        }, 
	    // Hijikata
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Toshizou_Hijikata"], .page__main p a[href$="/wiki/Toshizou_Hijikata_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c1/Hijikata.Toshizou.%28Hakuouki%29.full.2982101.png/revision/latest?cb=20230102173613&format=original"><br><b>Toshizou Hijikata</b> is the Vice-Commander of the Shinsengumi.</div>'
	    },
	    // Okita
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Souji_Okita"], .page__main p a[href$="/wiki/Souji_Okita_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/51/Okita.Souji.%28Hakuouki%29.full.2982108.png/revision/latest?cb=20230102173902&format=original"><br><b>Souji Okita</b> is the Captain of the 1st Division of the Shinsengumi.</div>'
	    },
	    // Saitou
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Hajime_Saitou"], .page__main p a[href$="/wiki/Hajime_Saitou_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/5b/Saitou.Hajime.%28Hakuouki%29.full.2978403.png/revision/latest?cb=20230102174403&format=original"><br><b>Hajime Saitou</b> is the Captain of the 3rd Division of the Shinsengumi.</div>'
	    },
	    // Heisuke
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Heisuke_Toudou"], .page__main p a[href$="/wiki/Heisuke_Toudou_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/55/Toudou.Heisuke.%28Hakuouki%29.full.2978408.png/revision/latest?cb=20221222163236&format=original"><br><b>Heisuke Toudou</b> is the Captain of the 8th Division of the Shinsengumi.</div>'
	    },
	    // Sano
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Sanosuke_Harada"], .page__main p a[href$="/wiki/Sanosuke_Harada_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/8/8f/Harada.Sanosuke.%28Hakuouki%29.full.2978414.png/revision/latest?cb=20230102173358&format=original"><br><b>Sanosuke Harada</b> is the Captain of the 10th Division of the Shinsengumi.</div>'
	    },
	    // Kondou
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Isami_Kondou"], .page__main p a[href$="/wiki/Isami_Kondou_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/d/d2/Kondou.new.menu.png/revision/latest?cb=20230125064625&format=original"><br><b>Isami Kondou</b> is the Commander of the Shinsengumi.</div>'
	    },
	    // Sannan
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Keisuke_Sannan"], .page__main p a[href$="/wiki/Keisuke_Sannan_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/e/ec/Sannan.Keisuke.full.2982114.png/revision/latest?cb=20230102093808&format=original"><br><b>Keisuke Sannan</b> is the Deputy Commander of the Shinsengumi.</div>'
	    },
	    // Shinpachi
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Shinpachi_Nagakura"], .page__main p a[href$="/wiki/Shinpachi_Nagakura_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/b/bc/Nagakura.Shinpachi.%28Hakuouki%29.full.2978418.png/revision/latest?cb=20221210230924&format=original"><br><b>Shinpachi Nagakura</b> is the Captain of the 2nd Division of the Shinsengumi.</div>'
	    },
	    // Inoue
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Genzaburou_Inoue"], .page__main p a[href$="/wiki/Genzaburou_Inoue_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/0/03/Inoue.new.menu.png/revision/latest?cb=20230125064624&format=original"><br><b>Genzaburou Inoue</b> is the Captain of the 6th Division of the Shinsengumi.</div>'
	    },
	    // Yamazaki
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Susumu_Yamazaki"], .page__main p a[href$="/wiki/Susumu_Yamazaki_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/7/7e/Yamazaki.Susumu.%28Hakuouki%29.full.2982119.png/revision/latest?cb=20230102085124&format=original"><br><b>Susumu Yamazaki</b> is a spy and a medic in the Shinsengumi.</div>'
	    },
	    // Shimada
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Kai_Shimada"], .page__main p a[href$="/wiki/Kai_Shimada_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/5/51/Shimada.new.menu.png/revision/latest?cb=20230125064622&format=original"><br><b>Kai Shimada</b> is a spy and a 2nd Division Corporal in the Shinsengumi.</div>'
	    },
	    // Kazama
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Chikage_Kazama"], .page__main p a[href$="/wiki/Chikage_Kazama_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/d/dd/Kazama.Chikage.full.2982131.png/revision/latest?cb=20221211104843&format=original"><br><b>Chikage Kazama</b> is a demon working with the Satsuma Domain.</div>'
	    },
	    // Itou
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Kashitarou_Itou"], .page__main p a[href$="/wiki/Kashitarou_Itou_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/c/c5/Itou-normal.png/revision/latest?cb=20230107084316&format=original"><br><b>Kashitarou Itou</b> is a temporary member of the Shinsengumi and an imperial nationalist.</div>'
	    },
	    // Shiranui
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Kyou_Shiranui"], .page__main p a[href$="/wiki/Kyou_Shiranui_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/8/80/Shiranui-normal.png/revision/latest?cb=20230107084923&format=original"><br><b>Kyou Shiranui</b> is a demon hired by the Chōshū Domain who uses a gun.</div>'
	    },
	    // Amagiri
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Kyuuju_Amagiri"], .page__main p a[href$="/wiki/Kyuuju_Amagiri_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/2/2f/Amagiri.Kyuuju.full.2978980.png/revision/latest?cb=20221211185037&format=original"><br><b>Kyuuju Amagiri</b> is a polite demon serving the Satsuma Domain.</div>'
	    },
	    // Senhime
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Senhime"], .page__main p a[href$="/wiki/Senhime_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/8/86/Sen-normal.png/revision/latest?cb=20230107084851&format=original"><br><b>Senhime</b> is a female demon who helps Chizuru.</div>'
	    },
	    // Koudou
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Koudou_Yukimura"], .page__main p a[href$="/wiki/Koudou_Yukimura_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/6/6a/Kodo-normal.png/revision/latest?cb=20230107084437&format=original"><br><b>Koudou Yukimura</b> is Chizuru`s father and the creator of Rasetsu.</div>'
	    },
	    // Kaoru
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Kaoru_Nagumo"], .page__main p a[href$="/wiki/Kaoru_Nagumo_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/7/74/Kaoru-normal.png/revision/latest?cb=20230107084323&format=original"><br><b>Kaoru Nagumo</b> is Chizuru`s twin brother dressed like a female.</div>'
	    },
	    // Kimigiku
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Kimigiku"], .page__main p a[href$="/wiki/Kimigiku_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/9/9d/Kimigiku-normal.png/revision/latest?cb=20230107084416&format=original"><br><b>Kimigiku</b> is a female demon and a ninja serving Senhime.</div>'
	    },
	    // Ryuunosuke
	    {
	        link: document.querySelectorAll('.page__main p a[href$="/wiki/Ryuunosuke_Ibuki"], .page__main p a[href$="/wiki/Ryuunosuke_Ibuki_(Visual_Novel)"]'),
	        tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/f/fe/Ryunosuke-normal.png/revision/latest?cb=20230108144040&format=original"><br><b>Ryuunosuke Ibuki</b> is the main protagonist of Hakuōki: Reimeiroku.</div>'
	    },
        //Serizawa
        {
            link: document.querySelectorAll('.page__main p a[href$="/wiki/Kamo_Serizawa"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/0/0c/Serizawa-normal.png/revision/latest?cb=20230107084901&format=original"><br><b>Kamo Serizawa</b> is the main antagonist of Hakuōki: Reimeiroku.</div>'
        },
        //Iba
        {
            link: document.querySelectorAll('.page__main p a[href$="/wiki/Hachirou_Iba"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/6/64/Iba.Hachirou.full.2982126.png/revision/latest?cb=20221226203210&format=original"><br><b>Hachirou Iba</b> is a hatamoto serving the shōgun.</div>'
        },
        //Sakamoto
        {
            link: document.querySelectorAll('.page__main p a[href$="/wiki/Ryouma_Sakamoto"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/0/0a/Sakamoto.Ryouma.%28Hakuouki%29.full.2978427.png/revision/latest?cb=20240103161336&format=original"><br><b>Ryouma Sakamoto</b> is a rōnin from the Tosa Domain.</div>'
        },
        //Souma
        {
            link: document.querySelectorAll('.page__main p a[href$="/wiki/Kazue_Souma"]'),
            tooltip: '<div id="tooltip" class="none"><img src="https://static.wikia.nocookie.net/hakuouki/images/2/2d/Souma.Kazue.full.2978422.png/revision/latest?cb=20240103153905&format=original"><br><b>Kazue Souma</b> is Isami Kondou`s page.</div>'
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