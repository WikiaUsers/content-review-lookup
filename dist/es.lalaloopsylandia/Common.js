/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

//C�digo relacionado a tags de usuarios. Extra�do de Dev Wikia
	window.UserTagsJS = {
		modules: {
	// Condiciones para ser declarado inactivo
			inactive: { 
				days: 25,
				namespaces: [0, 'Talk', 'User talk', 'Forum'],
				//Si no ha participadoen la wikia; no se pone.
				zeroIsInactive: false 
				
			},
			autoconfirmed: true,
			newuser: true,
		},
		
	tags: {
	autoconfirmed: { u: 'Reci�n fabricado', f: 'Reci�n fabricada' },
	inactive: { u: 'Buscando una ciudad' },
	newuser:  { u: 'Clase Little' },
		//Tag especial de adoptante
	adopter: { u: 'Adoptante', title:'El chico que lider� y salv� a Lalaloopsylandia' },
    bannedfromchat: { u: 'Vetado del chat', f: 'Vetada del chat'},
	},
	
};

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.custom = {
	'RGL Victor The Great': ['adopter'],
};

//C�digo para tabs animados. Extra�do de Lalaloopsy Land Wiki
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
    tab1Selector: null,
    tab2Selector: null,
    tab3Selector: null,
    tab4Selector: null,
    tab5Selector: null,
    tab6Selector: null,
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
    }
};
Tabs.init();