/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

var Tabs = {
    switchDuration: 500,
    selectorDuration: 250,
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
    tab11: null,
    tab12: null,
    tab13: null,
    tab14: null,
    tab15: null,
    tab16: null,
    tab17: null,
    tab18: null,
    tab19: null,
    tab20: null,
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
    tab11Selector: null,
    tab12Selector: null,
    tab13Selector: null,
    tab14Selector: null,
    tab15Selector: null,
    tab16Selector: null,
    tab17Selector: null,
    tab18Selector: null,
    tab19Selector: null,
    tab20Selector: null,
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
        if (tab === 11) {
            Tabs.tab11Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 12) {
            Tabs.tab12Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 13) {
            Tabs.tab13Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 14) {
            Tabs.tab14Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 15) {
            Tabs.tab15Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 16) {
            Tabs.tab16Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 17) {
            Tabs.tab17Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 18) {
            Tabs.tab18Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 19) {
            Tabs.tab19Selector.animate({
                opacity: Tabs.hoverOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 20) {
            Tabs.tab20Selector.animate({
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
        if (tab === 11) {
            Tabs.tab11Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 12) {
            Tabs.tab12Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 13) {
            Tabs.tab13Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 14) {
            Tabs.tab14Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 15) {
            Tabs.tab15Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 16) {
            Tabs.tab16Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 17) {
            Tabs.tab17Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 18) {
            Tabs.tab18Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 19) {
            Tabs.tab19Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (tab === 20) {
            Tabs.tab20Selector.animate({
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
        if (Tabs.selected === 11) {
            Tabs.tab11.hide(Tabs.switchDuration);
            Tabs.tab11Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 12) {
            Tabs.tab12.hide(Tabs.switchDuration);
            Tabs.tab12Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 13) {
            Tabs.tab13.hide(Tabs.switchDuration);
            Tabs.tab13Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 14) {
            Tabs.tab14.hide(Tabs.switchDuration);
            Tabs.tab14Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 15) {
            Tabs.tab15.hide(Tabs.switchDuration);
            Tabs.tab15Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 16) {
            Tabs.tab16.hide(Tabs.switchDuration);
            Tabs.tab16Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 17) {
            Tabs.tab17.hide(Tabs.switchDuration);
            Tabs.tab17Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 18) {
            Tabs.tab18.hide(Tabs.switchDuration);
            Tabs.tab18Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 19) {
            Tabs.tab19.hide(Tabs.switchDuration);
            Tabs.tab19Selector.animate({
                opacity: Tabs.inactiveOpacity
            }, Tabs.selectorDuration);
        }
        if (Tabs.selected === 20) {
            Tabs.tab20.hide(Tabs.switchDuration);
            Tabs.tab20Selector.animate({
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
        if (tab === 11) {
            Tabs.tab11.show(Tabs.switchDuration);
            Tabs.tab11Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 12) {
            Tabs.tab12.show(Tabs.switchDuration);
            Tabs.tab12Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 13) {
            Tabs.tab13.show(Tabs.switchDuration);
            Tabs.tab13Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 14) {
            Tabs.tab14.show(Tabs.switchDuration);
            Tabs.tab14Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 15) {
            Tabs.tab15.show(Tabs.switchDuration);
            Tabs.tab15Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 16) {
            Tabs.tab16.show(Tabs.switchDuration);
            Tabs.tab16Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 17) {
            Tabs.tab17.show(Tabs.switchDuration);
            Tabs.tab17Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 18) {
            Tabs.tab18.show(Tabs.switchDuration);
            Tabs.tab18Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 19) {
            Tabs.tab19.show(Tabs.switchDuration);
            Tabs.tab19Selector.animate({
                opacity: 1
            }, Tabs.selectorDuration);
        }
        if (tab === 20) {
            Tabs.tab20.show(Tabs.switchDuration);
            Tabs.tab20Selector.animate({
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
        Tabs.tab11 = $('#content-11');
        Tabs.tab11Selector = $('#selector-11').click(function () {
            Tabs.changeTab(11);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab11Selector.hover(function () {
            Tabs.hoverTab(11);
        }, function () {
            Tabs.unhoverTab(11);
        });
        Tabs.tab12 = $('#content-12');
        Tabs.tab12Selector = $('#selector-12').click(function () {
            Tabs.changeTab(12);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab12Selector.hover(function () {
            Tabs.hoverTab(12);
        }, function () {
            Tabs.unhoverTab(12);
        });
        Tabs.tab13 = $('#content-13');
        Tabs.tab13Selector = $('#selector-13').click(function () {
            Tabs.changeTab(13);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab13Selector.hover(function () {
            Tabs.hoverTab(13);
        }, function () {
            Tabs.unhoverTab(13);
        });
        Tabs.tab14 = $('#content-14');
        Tabs.tab14Selector = $('#selector-14').click(function () {
            Tabs.changeTab(14);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab14Selector.hover(function () {
            Tabs.hoverTab(14);
        }, function () {
            Tabs.unhoverTab(14);
        });
        Tabs.tab15 = $('#content-15');
        Tabs.tab15Selector = $('#selector-15').click(function () {
            Tabs.changeTab(15);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab15Selector.hover(function () {
            Tabs.hoverTab(15);
        }, function () {
            Tabs.unhoverTab(15);
        });
        Tabs.tab16 = $('#content-16');
        Tabs.tab16Selector = $('#selector-16').click(function () {
            Tabs.changeTab(16);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab16Selector.hover(function () {
            Tabs.hoverTab(16);
        }, function () {
            Tabs.unhoverTab(16);
        });
        Tabs.tab17 = $('#content-17');
        Tabs.tab17Selector = $('#selector-17').click(function () {
            Tabs.changeTab(17);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab17Selector.hover(function () {
            Tabs.hoverTab(17);
        }, function () {
            Tabs.unhoverTab(17);
        });
        Tabs.tab18 = $('#content-18');
        Tabs.tab18Selector = $('#selector-18').click(function () {
            Tabs.changeTab(18);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab18Selector.hover(function () {
            Tabs.hoverTab(18);
        }, function () {
            Tabs.unhoverTab(18);
        });
        Tabs.tab19 = $('#content-19');
        Tabs.tab19Selector = $('#selector-19').click(function () {
            Tabs.changeTab(19);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab19Selector.hover(function () {
            Tabs.hoverTab(19);
        }, function () {
            Tabs.unhoverTab(19);
        });
        Tabs.tab20 = $('#content-20');
        Tabs.tab20Selector = $('#selector-20').click(function () {
            Tabs.changeTab(20);
            return false;
        }).css('opacity', Tabs.inactiveOpacity);
        Tabs.tab20Selector.hover(function () {
            Tabs.hoverTab(20);
        }, function () {
            Tabs.unhoverTab(20);
        });
    }
};
Tabs.init();