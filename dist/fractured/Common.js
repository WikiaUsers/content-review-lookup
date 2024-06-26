/* Discord Banner settings */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'jRSG4VnfwY',
    prependToRail: true,
    noRail: false
};

/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
    /* Hide namespace prefixes for page links on category pages */
    var prefix = $('#mw-cat-hide-page-ns').text().trim();

    if (prefix.length > 0){
        $('#mw-pages a').text(function(i, val){
            return val.slice(0, prefix.length) === prefix ? val.slice(prefix.length + 1) : val;
        });
    }


    /******************
    /* CUSTOMIZATIONS *
    /******************/

    /*if(wgNamespaceNumber == 0) {
        // Put edit links on Item tables that point to data modules
        var item_table_headers= {
            'Base': '/Module:Items/Data',
            'Crafted': '/Module:Items/Data/Crafted',
            'Edible': '/Module:Items/Data/Edible',
            'Category:Game mechanics': '/Module:Items/Data/Equipment',
            'Category:Reagents': '/Module:Items/Data/Reagents'
        };


        function addEditLink(url, extra_style){
            if (extra_style === undefined){
                extra_style = "";
            }

            return '<a target="_blank" style="font-size: 90%; font-weight: bold; position: absolute; right: 8px;'+ extra_style +'" href="'+ url +'">[edit]</a>';
        }

        $("table.game-item-table .section-header").each(function(idx){
            var title = $(this).children("a").attr("title")

            if (title !== undefined){
                $(this).append(addEditLink(item_table_headers[title]));
            }
        });

        $("table.game-item-table img.section-header").each(function(idx){
            var node = $(this).parentsUntil("div.floatnone");
            var title = "Base";
            node.append(addEditLink(item_table_headers[title]));
        });

        $("caption.game-item-table").each(function(idx){
            var title = "Crafted";
            var url = item_table_headers[title];
            $(this).append('<a target="_blank" style="font-size: 90%; font-weight: bold; float: right; padding-right: 5px" href="' + url + '">[edit]</a>');
        });
    }*/

}());



/*----------------------------------------------------*/
/*Add Obtained from style*/
const obtainedFrom = document.querySelector('.obtained-from'); //check if it's a skill page with mobs
const customText = '<div class="text-obtained-from">Obtained from</div>';

const functionObtainedFromText = function (functionObtainedFrom) {
	obtainedFrom.insertAdjacentHTML('afterbegin', customText); //insert the heading before Syndesia
};
if (obtainedFrom) {
    functionObtainedFromText(); 
}




/*-----------------------------------------------------*/
/*Add custom roles to profiles*/
const checkIDLucy = document.querySelector('#LucyKuranSKYDOME');
const findContainer = document.querySelector('.headline');
const newGroupLucy = '<ul class="grouptags"><li><a href="/wiki/Special:ListUsers?group=bureaucrat" title="Only appear when worshipped">Transparent Wiki Goddess</a></li></ul>';
const hideGroups = document.querySelector('.grouptags');
const replaceGroupsLucy = function () {
	hideGroups.classList.add('hide');
    findContainer.insertAdjacentHTML('beforeend', newGroupLucy);
};

if (checkIDLucy) {
    replaceGroupsLucy();
}
/*--------------*/
const checkIDSkykal = document.querySelector('#Lord_Skykal');
const newGroupSkykal = '<ul class="grouptags"><li><a href="/wiki/Special:ListUsers?group=bureaucrat" title="Bureaucrat">Fürst Axolotl <img src="https://static.wikia.nocookie.net/fractured_gamepedia_en/images/a/a3/Axolotl_Skykal.png/revision/latest?cb=20220818173031&format=original" width="30" height="30"></a></li></ul>';
const replaceGroupsSkykal = function () {
	hideGroups.classList.add('hide');
    findContainer.insertAdjacentHTML('beforeend', newGroupSkykal);
};

if (checkIDSkykal) {
    replaceGroupsSkykal();
}
/*----------------------*/
const checkIDSpoletta = document.querySelector('#Spoletta');

const newGroupSpoletta = '<ul class="grouptags"><li><a href="/wiki/Special:ListUsers?group=bureaucrat" title="Bureaucrat">Don <img src="https://static.wikia.nocookie.net/fractured_gamepedia_en/images/e/e3/Don_Spoletta.png/revision/latest?cb=20220817072324&format=original" width="30" height="30"></a></li></ul>';
 
const replaceGroupsSpoletta = function () {
	hideGroups.classList.add('hide');
    findContainer.insertAdjacentHTML('beforeend', newGroupSpoletta);
};
 
if (checkIDSpoletta) {
	replaceGroupsSpoletta();
}


/*-----------------------------------------------------------------------------------*/
/*********Adds a spoiler button on that freakin spider*************/
const checkPic = document.querySelector('.image-spoiler');
const spoilerButton = document.querySelector('.spoiler-button');
const clickToRemoveBlur = function () {
    spoilerButton.addEventListener('click', function () {
        checkPic.classList.remove('image-spoiler');
        spoilerButton.remove();
    });
};

if (checkPic) {
    clickToRemoveBlur();
}




/***********************************************************************************/
/*----------Hides overflow to make the back button work with position sticky------------------*/
/*Hide overflow on skills page*/
const checkPage = document.querySelector('.back-menu');
const addHideOverflowClass = function () {
	document.querySelector('.page-content').classList.add('hide-overflow');
};


if (checkPage) {
	addHideOverflowClass();
}



/*----------------------------------------------------------------------------*/
/* Move the language dropdown to the left */
const welcomeCustom = document.querySelector('.welcome'); //check if it's the main page by the class
const linksCustom = '<div class="page-header__languages" style="float: right; padding-top: 15px;"><div class="wds-dropdown"><div class="wds-dropdown__toggle">English<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div><div class="wds-dropdown__content"><ul class="wds-list wds-is-linked"><li><a href="https://fractured.fandom.com/de/wiki/" data-tracking-label="lang-de">Deutsch</a></li><li><a href="https://fractured.fandom.com/it/wiki/" data-tracking-label="lang-it">Italiano</a></li></ul></div></div></div>';

const headerCustom = document.querySelector('.page-header__title-wrapper'); //find the header
const addLanguageLinks = function () {
	headerCustom.insertAdjacentHTML('beforeend', linksCustom);
};

if (welcomeCustom) {
    addLanguageLinks();
}