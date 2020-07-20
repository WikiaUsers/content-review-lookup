$(document).ready(function() {
    $(".wc-input-container").html(
        '<label class="wc-input-label" for="title">\
        Weapon 1:\
      </label>\
      <input class="wc-input-field" id="wc-input-field-1" type="text"/>\
      <label class="wc-input-label" for="title">\
        Weapon 2:\
      </label>\
      <input class="wc-input-field" id="wc-input-field-2" type="text"/>\
      <label class="wc-input-label" for="title">\
        Weapon 3:\
      </label>\
      <input class="wc-input-field" id="wc-input-field-3" type="text"/>\
      <button class="wc-input-button">Compare Stats</button>');
});
 
$(document).on("click", ".wc-input-button", function() {
    $(".wc-infobox-container").children().remove();
    var pageTitle;
    var pageInfobox;
    for (var i = 0; i < 3; i++) {
        pageTitle = $("#wc-input-field-" + (i + 1)).val().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        pageTitle = pageTitle
            /* Capitalizations */
            .replace(/^DEagle/i, 'DEagle')
            .replace(/^G18C/i, 'G18C')
            .replace(/^M93R/i, 'M93R')
            .replace(/^OT/i, 'OT')
            .replace(/^OTs/i, 'OTs')
            .replace(/Cursed$/i, 'Cursed')
            .replace(/^P30L/i, 'P30L')
            .replace(/^MAC/i, 'MAC')
            .replace(/^MP5/i, 'MP5')
            .replace(/^UMP9/i, 'UMP9')
            .replace(/^M1A1/i, 'M1A1')
            .replace(/^CZ/i, 'CZ')
            .replace(/3A1$/i, '3A1')
            .replace(/Gun$/i, 'Gun')
            .replace(/^MP220/i, 'MP220')
            .replace(/^SPAS/i, 'SPAS')
            .replace(/^USAS/i, 'USAS')
            .replace(/12G$/i, '12G')
            .replace(/^AK/i, 'AK')
            .replace(/^FAMAS/i, 'FAMAS')
            .replace(/^M416/i, 'M416')
            .replace(/^M4A1/i, 'M4A1')
            .replace(/-S$/i, '-S')
            .replace(/^SCAR/i, 'SCAR')
            .replace(/-H$/i, 'SCAR-H')
            .replace(/^AN/i, 'AN')
            .replace(/^BAR/i, 'BAR')
            .replace(/M1918$/i, 'M1918')
            .replace(/^DP/i, 'DP')
            .replace(/^QBB/i, 'QBB')
            .replace(/^PKP/i, 'PKP')
            .replace(/Pecheneg$/i, 'Pecheneg')
            .replace(/^PKM/i, 'PKM')
            .replace(/EMR$/i, 'EMR')
            .replace(/^Mk/i, 'Mk')
            .replace(/SPR$/i, 'SPR')
            .replace(/Garand$/i, 'Garand')
            .replace(/^L86A2/i, 'L86A2')
            .replace(/^VSS/i, 'VSS')
            .replace(/SSR$/i, 'SSR')
            .replace(/^SVD/i, 'SVD')
            .replace(/^Mk45G/i, 'Mk45G')
            .replace(/Elite$/i, 'Elite')
            .replace(/Nagant$/i, 'Nagant')
            .replace(/^SV/i, 'SV')
            .replace(/^AWM/i, 'AWM')
            .replace(/^BLR/i, 'BLR')
            .replace(/Cannon$/i, 'Cannon')
            .replace(/Blaster$/i, 'Blaster')
            .replace(/Axe$/i, 'Axe')
            .replace(/Hammer$/i, 'Hammer')
            .replace(/Swrd$/i, 'Swrd')
            .replace(/Grenade$/i, 'Grenade')
            .replace(/Bomb$/i, 'Bomb')
            .replace(/Throwable/i, 'Throwable')
            /* Abbreviations */
            .replace(/^DEagle$/, 'DEagle 50')
            .replace(/^OT$/, 'OT-38')
            .replace(/^OTs$/, 'OTs-38')
            .replace(/^MAC$/, 'MAC-10')
            .replace(/^CZ$/, 'CZ-3A1')
            .replace(/^Saiga$/, 'Saiga-12')
            .replace(/^SPAS$/, 'SPAS-12')
            .replace(/^USAS$/, 'USAS-12')
            .replace(/^Hawk$/, 'Hawk 12G')
            .replace(/^AK$/, 'AK-47')
            .replace(/^M4A1$/, 'M4A1-S')
            .replace(/^SCAR$/, 'SCAR-H')
            .replace(/^AN$/, 'AN-94')
            .replace(/^BAR$/, 'BAR M1918')
            .replace(/^DP$/, 'DP-28')
            .replace(/^QBB$/, 'QBB-97')
            .replace(/^PKP$/, 'PKP Pecheneg')
            .replace(/^M39$/, 'M39 EMR')
            .replace(/^Mk 12$/, 'Mk 12 SPR')
            .replace(/^M1$/, 'M1 Garand')
            .replace(/^Mk 20$/, 'Mk 20 SSR')
            .replace(/^SVD$/, 'SVD-63')
            .replace(/^Scout$/, 'Scout Elite')
            .replace(/^Mosin$/, 'Mosin-Nagant')
            .replace(/^SV$/, 'SV-98')
            .replace(/^AWM$/, 'AWM-S')
            .replace(/^BLR$/, 'BLR 81')
            .replace(/^Frag$/, 'Frag Grenade')
            .replace(/^Smoke$/, 'Smoke Grenade')
            .replace(/^MIRV$/, 'MIRV Grenade')
            .replace(/^Martyrdom$/, 'Martyrdom (Throwable)');
        $.ajax({
            url: 'https://survivio.fandom.com/index.php?title=' + pageTitle,
            success: function(pageContent) {
                pageInfobox = $('<div>' + pageContent + '</div>').find('.portable-infobox')[0];
                $(".wc-infobox-container").append(pageInfobox);
            },
            async: false
        });
    }
    var $collapsibleGroups = $(".WikiaArticle").find('.pi-collapse');
    $collapsibleGroups.each(function(index) {
        var $group = $collapsibleGroups.eq(index);
        var $header = $group.find('.pi-header:first');
        $header.click(function() {
            $group.toggleClass('pi-collapse-closed');
            $(window).trigger('scroll');
        });
    });
    
    var $panels = $(".WikiaArticle").find('.pi-panel');
    $panels.each(function(index) {
        var $panel = $panels.eq(index)
          , $scrollWrapper = $panel.find('.pi-panel-scroll-wrapper')
          , $toggles = $panel.find('.pi-section-navigation')
        $toggles.on('click', function(e) {
            var toggle = e.target.closest('.pi-section-tab');
            if (toggle !== null) {
                var $newActiveToggle = $(toggle)
                  , newRef = $newActiveToggle.attr('data-ref')
                  , $oldActiveToggle = $toggles.find('.pi-section-active')
                  , $oldActiveContent = $panel.find('.pi-section-content.pi-section-active')
                  , $newActiveContent = $panel.find('.pi-section-content[data-ref=' + newRef + ']');
                $oldActiveToggle.removeClass('pi-section-active');
                $oldActiveContent.removeClass('pi-section-active');
                $newActiveToggle.addClass('pi-section-active');
                $newActiveContent.addClass('pi-section-active');
            }
        });
    });
});