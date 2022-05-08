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
/*
    if(wgNamespaceNumber == 0) {
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
    }

}());
*/

window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'wShqyYe3gM',
    prependToRail: true
    noRail: false
};