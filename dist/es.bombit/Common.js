//Custom user tags
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces
				days: 25,
				namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				zeroIsInactive: false
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'threadmoderator', 'mediawiki', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				bot: ['bot-global'],
				sysop: ['bureaucrat'],
			},
		}
	};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'Reversor' },
		rollback2: { u: 'Reversora' },
		chatmoderator: { u: 'Moderador del chat' },
		chatmoderator2: { u: 'Moderadora del chat' },
                threadmoderator: { u: 'Moderador de hilos' },
		sysop: { u: 'Administrador' },
		sysop2: { u: 'Administradora' },
		bureaucrat: { u: 'Burócrata' },
		founder: { u: 'Fundador' },
		founder2: { u: 'Fundadora' },
	}
};
 
UserTagsJS.modules.custom = {
	'I-Goten24~!': ['bureaucrat'],
	'Esteban2941': ['sysop'],
	'GunShot': ['founder'],
	'Finn2b': ['rollback'],
     'Gisela :3': ['sysop2'],
     'CaramelRandom Girl': ['chatmoderator2'],
     'LapisLazuli987': ['sysop2'],
        
};
 
// Tabber
var Tabs = {
    switchDuration: 400,
    selectorDuration: 200,
    inactiveOpacity: 0.25,
    hoverOpacity: 0.6,
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
    tab5: null,
    tab6: null,
    tab7: null,
    tab8: null,
    tab9: null,
    tab10: null,
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
    tab7Selector: null,
    tab8Selector: null,
    tab9Selector: null,
    tab10Selector: null,
    selected: 1,
    hoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
    },
    unhoverTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (tab === 1) {
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
    },
    changeTab: function (tab) {
        "use strict";
        if (tab === Tabs.selected) {
            return;
        }
        if (Tabs.selected === 1) {
            Tabs.tab1.hide(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 2) {
            Tabs.tab2.hide(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 3) {
            Tabs.tab3.hide(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 4) {
            Tabs.tab4.hide(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 5) {
            Tabs.tab5.hide(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 6) {
            Tabs.tab6.hide(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 7) {
            Tabs.tab7.hide(Tabs.switchDuration);
            Tabs.tab7Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 8) {
            Tabs.tab8.hide(Tabs.switchDuration);
            Tabs.tab8Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 9) {
            Tabs.tab9.hide(Tabs.switchDuration);
            Tabs.tab9Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 10) {
            Tabs.tab10.hide(Tabs.switchDuration);
            Tabs.tab10Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        Tabs.selected = tab;
        if (tab === 1) {
            Tabs.tab1.show(Tabs.switchDuration);
            Tabs.tab1Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 2) {
            Tabs.tab2.show(Tabs.switchDuration);
            Tabs.tab2Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 3) {
            Tabs.tab3.show(Tabs.switchDuration);
            Tabs.tab3Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 4) {
            Tabs.tab4.show(Tabs.switchDuration);
            Tabs.tab4Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 5) {
            Tabs.tab5.show(Tabs.switchDuration);
            Tabs.tab5Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 6) {
            Tabs.tab6.show(Tabs.switchDuration);
            Tabs.tab6Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 7) {
            Tabs.tab7.show(Tabs.switchDuration);
            Tabs.tab7Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 8) {
            Tabs.tab8.show(Tabs.switchDuration);
            Tabs.tab8Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 9) {
            Tabs.tab9.show(Tabs.switchDuration);
            Tabs.tab9Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 10) {
            Tabs.tab10.show(Tabs.switchDuration);
            Tabs.tab10Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
    },
    init: function () {
        "use strict";
        Tabs.tab1 = $('#content-1');
        Tabs.tab1Selector = $('#selector-1').click(function () {
            Tabs.changeTab(1);
            return false;
        }).css('opacity', 1);
        Tabs.tab1Selector.hover(function () {
            Tabs.hoverTab(1);
        }, function () {
            Tabs.unhoverTab(1);
        });
        Tabs.tab2 = $('#content-2');
        Tabs.tab2Selector = $('#selector-2').click(function () {
            Tabs.changeTab(2);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab2Selector.hover(function () {
            Tabs.hoverTab(2);
        }, function () {
            Tabs.unhoverTab(2);
        });
        Tabs.tab3 = $('#content-3');
        Tabs.tab3Selector = $('#selector-3').click(function () {
            Tabs.changeTab(3);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab3Selector.hover(function () {
            Tabs.hoverTab(3);
        }, function () {
            Tabs.unhoverTab(3);
        });
        Tabs.tab4 = $('#content-4');
        Tabs.tab4Selector = $('#selector-4').click(function () {
            Tabs.changeTab(4);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab4Selector.hover(function () {
            Tabs.hoverTab(4);
        }, function () {
            Tabs.unhoverTab(4);
        });
        Tabs.tab5 = $('#content-5');
        Tabs.tab5Selector = $('#selector-5').click(function () {
            Tabs.changeTab(5);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab5Selector.hover(function () {
            Tabs.hoverTab(5);
        }, function () {
            Tabs.unhoverTab(5);
        });
        Tabs.tab6 = $('#content-6');
        Tabs.tab6Selector = $('#selector-6').click(function () {
            Tabs.changeTab(6);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab6Selector.hover(function () {
            Tabs.hoverTab(6);
        }, function () {
            Tabs.unhoverTab(6);
        });
        Tabs.tab7 = $('#content-7');
        Tabs.tab7Selector = $('#selector-7').click(function () {
            Tabs.changeTab(7);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab7Selector.hover(function () {
            Tabs.hoverTab(7);
        }, function () {
            Tabs.unhoverTab(7);
        });
        Tabs.tab8 = $('#content-8');
        Tabs.tab8Selector = $('#selector-8').click(function () {
            Tabs.changeTab(8);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab8Selector.hover(function () {
            Tabs.hoverTab(8);
        }, function () {
            Tabs.unhoverTab(8);
        });
        Tabs.tab9 = $('#content-9');
        Tabs.tab9Selector = $('#selector-9').click(function () {
            Tabs.changeTab(9);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab9Selector.hover(function () {
            Tabs.hoverTab(9);
        }, function () {
            Tabs.unhoverTab(9);
        });
        Tabs.tab10 = $('#content-10');
        Tabs.tab10Selector = $('#selector-10').click(function () {
            Tabs.changeTab(10);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab10Selector.hover(function () {
            Tabs.hoverTab(10);
        }, function () {
            Tabs.unhoverTab(10);
        });
    }
};
Tabs.init();
 
// Time
var refreshDate;
 
function addDate() {
    "use strict";
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().append('<span style="font-weight: bold; text-transform: none;"><a title="Refresca el chaché y purga la página [Ctrl+Shift+R]" href="' + mw.config.get('wgArticlePath').replace('$1', mw.config.get('wgPageName').replace(/ /g, '_')) + '?action=purge">' + UTCDate.substring(5) + '</a></span>');
    clearTimeout(refreshDate);
    refreshDate = setTimeout(addDate, 1000);
    
}
// Etiqueta Inactivo
InactiveUsers = { text: 'Flojeando' };
importScriptPage('InactiveUsers/code.js', 'dev');