    $j(document).ready(function() {

        $j('div.collapsibleheader')
        .show();

        $j('div.collapsibletemplate.collapsed')
        .each(function() {
           if(window.location.hash != "#"+encodeURI($j(this).find('div.header').attr('title').replace(/ /g, "_")).replace(/%/g, "."))
               $j(this).find('div.body').hide();
           else
               $j(this).toggleClass('collapsed').toggleClass('expanded');
        });

        $j('div.collapsibletemplate')
        .find('div.body')
        .removeClass('show-on-commons');

        function toggleTemplate($element) {
            $element
            .parent()
            .toggleClass('expanded')
            .toggleClass('collapsed')
            .find('div.body')
            .slideToggle('fast');
        }
        var $headings = $j('div.collapsibletemplate > div.collapsibleheader');
        $headings
        .mousedown(function() {
            toggleTemplate($j(this));
            return false;
        });
    });