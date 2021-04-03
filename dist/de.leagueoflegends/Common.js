/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// Über [[Mediawiki:ImportJS]] sind weitere Skripte eingebunden!

/* Replaces {{USERNAME}} with the name of the user browsing the page. */
(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
}());

/* Config for [[MediaWiki:Common.js/gridfiltering.js]] */
gridContainer = '#champion-grid';
gridFilters = {
	'search': 'search',
    'role': ['- Rolle -',
        ['Beherrscher','Beherrscher'],
        ['Unterbrecher','• Unterbrecher'],
        ['Verzauberer','• Verzauberer'],
        ['Kämpfer','Kämpfer'],
        ['Moloch','• Moloch'],
        ['Stürmer','• Stürmer'],
        ['Magier','Magier'],
        ['Artillerie','• Artillerie'],
        ['Burst','• Burst'],
        ['Kampfmagier','• Kampfmagier'],
        ['Schlächter','Schlächter'],
        ['Assassine','• Assassine'],
        ['Plänkler','• Plänkler'],
        ['Schütze','Schütze'],
        ['Tank','Tank'],
        ['Vorkämpfer','• Vorkämpfer'],
        ['Wächter','• Wächter'],
        ['Spezialist','Spezialist'],
    ],
	'type': [ '- Angriffstyp -',
		['Nahkampf','Nahkämpfer'],
		['Fernkampf','Fernkämpfer'],
	],
};

window.tooltips_list = [
    {
        classname: 'character-icon',
        parse: '{'+'{Tooltip/Champion|<#character#>|<#skin#>|<#variant#>}}',
    },
    {
        classname: 'ability-icon',
        parse: '{'+'{Tooltip/Fähigkeit|<#champion#>|<#ability#>}}',
    },
    {
        classname: 'item-icon',
        parse: '{'+'{Tooltip/Gegenstand|item=<#item#>|variant=<#variant#>|enchantment=<#enchantment#>}}',
    },
    {
        classname: 'spell-icon',
        parse: '{'+'{Tooltip/Beschwörerzauber|<#spell#>|<#variant#>}}',
    },
    {
        classname: 'mastery-icon',
        parse: '{'+'{Tooltip/Meisterschaft|season=<#season#>|mastery=<#mastery#>}}',
    },
    {
        classname: 'skin-icon',
        parse: '{'+'{Tooltip/Skin|<#character#>|<#skin#>|<#variant#>}}',
    },
    {
        classname: 'skinloading-icon',
        parse: '{'+'{Tooltip/Skin/Loading|<#character#>|<#skin#>|<#variant#>}}',
    },
    {
        classname: 'chroma-icon',
        parse: '{'+'{Tooltip/Chroma|<#character#>|<#skin#>|<#chromas#>}}',
    },
    {
        classname: 'tip-tooltip',
        parse: '{'+'{Tooltip/Tip|<#tip#>}}',
    },
    {
        classname: 'pp-tooltip',
        parse: '{'+'{Tooltip/Pp|<#size#>|<#values#>|values1=<#values1#>|values2=<#values2#>|label1=<#label1#>|label2=<#label2#>|displayformula=<#displayformula#>|useformula=<#useformula#>|key1=<#key1#>|key2=<#key2#>|start=<#start#>|end=<#end#>|round1=<#round1#>|round2=<#round2#>}}'
    },
    {
        classname: 'rune-icon',
        parse: '{'+'{Tooltip/Rune|<#rune#>|<#variant#>}}',
    },
    {
        classname: 'buff-icon',
        parse: '{'+'{Tooltip/Verbesserung|<#buff#>|<#variant#>}}',
    },
    {
        classname: 'rp-icon',
        parse: '{'+'{Tooltip/RP|<#param#>}}',
    }
];
 
window.tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    noCSS: true,
};

window.AddRailModule = [{prepend: true}];

/* Flip Text */
(function() {
    function addHook() {
        $(".flipText1").show();
        $(".flipText2").hide();
        $(".flipText1, .flipText2").off();
        $(".flipText1, .flipText2").click(function(e) {
           $(e.target).closest('span#container.container').children().toggle();
        });
    }
    $(addHook);
    mw.hook('wikipage.content').add(addHook);
}());

/* Skinviewer: loading fix */
(function() {
    $('.lazyimg-wrapper img.lazyload').each(function() {
    	$(this).removeClass('lazyload');
    	$(this).attr('src', $(this).attr('data-src'));
    });
}());

/* Skinviewer: Skinselektor onclick ([[Vorlage:Champion_info/Skins]]) */
$(document).on("click", "span.show", function () {
    if (!$('#item-' + this.id).is($('.skinviewer-active-tab'))) {
        $(".skinviewer-active-tab").removeClass('skinviewer-active-tab');
        $(".skinviewer-tab-container > div").hide();
        $('#item-' + this.id).addClass('skinviewer-active-tab');
        $('#item-' + this.id).fadeIn();
    }
});

/* Champion Attribute: hover-Effekte ([[Vorlage:Champion_Attributsübersicht]]) */
$('.champion_attribut area').hover(function(){
    $('#attribut_' + $(this).attr('href').substring($(this).attr('href').lastIndexOf("#") + 1)).show();
}, function(){
    $('#attribut_' + $(this).attr('href').substring($(this).attr('href').lastIndexOf("#") + 1)).hide();
});

/* Toggleable skill tabs */
mw.hook('wikipage.content').add(function(elem) {
    $(elem).find('.skill-tabs:not(.made-skill-tabs)').each(function() {
        var tabs = $(this).addClass('made-skill-tabs');
        var dts = $(this).find('> dt');
        if(dts.length === 2) tabs.addClass('toggle-tabs');
        dts.each(function(i) {
            var dt = $(this);
            if(i > 0) {
                dt.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                dt.prepend($('<span class="prev-tab" title="Klicken, um weitere Informationen anzuzeigen.">«</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i-1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
            if(i < dts.length-1) {
                dt.append($('<span class="next-tab" title="Klicken, um weitere Informationen anzuzeigen.">»</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i+1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
        });
    });
});

/* custom and simple tabber implementation; mainly for t:Champion_info */
$(function() {
    $('.customtabber-nav span').replaceWith(function () {
        return $('<a/>', {
            href: '#',
            'data-ctabcontrol': this.dataset.ctabcontrol,
            'data-ctabgroup': this.dataset.ctabgroup,
            title: this.title,
            'class': this.className,
            style: this.style.cssText,
            html: this.innerHTML
        });
    });
    /* customtabber-nav click handler */
    $("[data-ctabcontrol]").click(function(e) {
        e.preventDefault();
        var group = $(this).data('ctabgroup');
        var contr = $(this).data('ctabcontrol');
        $('.ct-nav-active[data-ctabgroup="'+ group +'"]').removeClass('ct-nav-active');
        $(this).addClass('ct-nav-active');
        $('.ct-active[data-ctabgroup="'+ group +'"]').css('display', 'none').removeClass('ct-active');
        $('[data-ctabcontent="'+ contr +'"]').css('display', 'block').addClass('ct-active');
        window.location.hash = contr;
    });
    var hash = decodeURI(window.location.hash.replace(/\.28/gi, "%28").replace(/\.29/gi, "%29").replace(/\.7E/gi, "%7E")).substr(1).replace(/_/gi, " ");
    if ($('[data-ctabcontent="'+hash+'"]')[0] && $('[data-ctabcontrol="'+hash+'"]')[0]) {
        $('[data-ctabcontrol="'+hash+'"]').click();
    }
});

/* mw-tabber link handler */
window.addEventListener('load', function() {
	var hash = decodeURI(window.location.hash.replace(/\.28/gi, "%28").replace(/\.29/gi, "%29").replace(/\.7E/gi, "%7E")).substr(1).replace(/_/gi, " ");
	if (hash.startsWith("Kosmetisch~")) {
        $('.tabbernav a[data-hash="Kosmetisch"]').click();
        $('span.show > span[title="'+ hash.substring(11) +'"]').parent().click();
    } else {
    	$('.tabbernav a[data-hash="'+hash+'"]').click();
    }
});