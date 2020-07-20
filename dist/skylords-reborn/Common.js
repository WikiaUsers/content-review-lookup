/* Any JavaScript here will be loaded for all users on every page load. */

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

/* Image Loading Fix */
$(window).load(function() {
    $('.lazyimg-wrapper img').trigger("onload");
});

/* Card Tooltip */
var tooltips_list = [
    {
        classname: 'card-icon',
        parse: '{'+'{Tooltip/Card|<#card#>}}',
    }
];
 
var tooltips_config = {
    offsetX: 15,
    offsetY: 15,
    waitForImages: true,
    noCSS: true,
};

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
                dt.prepend($('<span class="prev-tab" title="Click to cycle through the information.">«</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i-1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
            if(i < dts.length-1) {
                dt.append($('<span class="next-tab" title="Click to cycle through the information.">»</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i+1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
        });
    });
});

/* mw-tabber link fix [links containing "()"] */
$(window).load(function() {
    $('.tabbernav > li > a[href="#"][title="'+decodeURI(window.location.hash.replace(/\./gi, "%")).substr(1).replace(/_/gi, " ")+'"]').click();
});