(function ($){
//tabber mtmb issue
    var settings = window.mtabber || {};
    //defaults
    //activate tab by #hash
    settings.autoact = typeof(settings.autoact) !== 'undefined' ? settings.autoact : 1;
    //autoscroll to #tab
    settings.autoscroll = typeof(settings.autoscroll) !== 'undefined' ? settings.autoscroll : 1;
    //convert headers to tabs. headers must be wrapped in '.tabberhead data-lvl=lvl'
    settings.convertheaders = typeof(settings.convertheaders) !== 'undefined' ? settings.convertheaders : 1;
    //do nothing
    settings.donot = typeof(settings.donot) !== 'undefined' ? settings.donot : 0;
    
    if (settings.donot) return;
    
    function convertUTF2ANSI(s) {
        var ret = s.replace(/\./g, '%');
        ret = decodeURIComponent(ret).replace(/_/g, ' ');
        return ret;
    } //convertUTF2ANSI

    function getTabId(data) {
        var id = $(data).find('.mw-headline').get(0).id;
        var editlink = $(data).find('.editsection a');
        var editimg = $(editlink).find('img');
        //replace unnecessary text
        if ($(editimg).length !== 0) {
            $(editlink).text('');
            $(editlink).append(editimg);
        }
        id = convertUTF2ANSI(id);
        return {id:id, edit: editlink.get(0).outerHTML};
    } //getTabId

    function convertHeaders2Tabs (data, id, lvl) {
        //id is not used yet.
        var tabsbox = $('<div/>', {class:'tabsbox'});
        var hlvl = 'H'+lvl;
        $(data).children(hlvl).each(function(index){
            var lid = getTabId(this);
            var layer = $('<div/>', {class:'layer'});
            $(layer).attr('data-id', lid.id);
            $(layer).attr('data-edit', lid.edit);
            $(layer).append($(this).nextUntil(hlvl));
            $(tabsbox).append(layer);
        }); // each hlvl
        return tabsbox;
    } //convertHeaders2Tabs

    function setActiveTab(){
        var nstarget = window.location.hash.replace('#', '');
        if (nstarget === '') return;
        //convert wiki-utf 2 ansi
        nstarget = convertUTF2ANSI(nstarget);
        var $nt2a = $('.tabsbox>.tabheaders>.tabheader[data-id="' + nstarget + '"]');
        if ($nt2a && ($nt2a.length > 0)) {
            $nt2a.click();
            //scroll to header
            if (settings.autoscroll) $nt2a.get(0).scrollIntoView();
        }
    } //setActiveTab

    mw.hook('wikipage.content').add(function($content){
        //convert headers to tabs
        if (settings.convertheaders) {
            $content.find('.tabberhead').each(function(){
                var tabsbox = convertHeaders2Tabs(this, $(this).data('id'), $(this).data('lvl'));
                //$(this).get(0).outerHTML=$(tabsbox).get(0).outerHTML; //move html ony (drop handlers etc)
                //clear
                $(this).get(0).innerHTML = '';
                $(this).append(tabsbox);
                $(this).removeClass('tabberhead');
                $(this).addClass('tabberheaddone');
            }); //each .tabberhead
        } //if convertheaders
    
        //create headers
        //enumerate parent divs (multiple tabboxes)
        var $ntabs, $ntab;
        var nk = 0; //active tab counter
        $content.find('.tabsbox').each(function(indexp, elementp){
            $ntabs = $('<span>', {class : 'tabheaders'});
            //enumerate tabs
            nk = 0;
            $(elementp).find('.layer').each(function(index, element){
                //create headers
                var $element = $(element);
                $ntab = $('<div>', {class: 'tabheader', text : $element.data('id')});
                //$ntab.data('id', $(element).data('id'));
                $ntab.attr('data-id', $element.data('id'));
                if ($element.data('edit') && ($element.data('edit').length !== 0)) {
                    $ntab.append($element.data('edit'));
                } //if data-edit
                if ($element.hasClass('act')) {
                    //only 1 active tab allowed is
                    if (nk === 0) {
                        $ntab.addClass('act');
                        nk++;
                    } else {
                        $element.removeClass('act');
                    }
                } //if hasclass act
                $ntabs.append($ntab);
            }); // each .layer
            //ensure active tab exists
            if (nk === 0) {
                $ntabs.children(':first').addClass('act');
                $(elementp).find('.layer:first').addClass('act');
            }
            //append headers to parent tabbox
            $(elementp).prepend($ntabs);
        }); // each .tabsbox
      
        //add click handler
        $content.find('.tabheader').on('click', function(e){
            //remove act from headers
            $(e.target).parent().find('.act').removeClass('act');
            //add act to active header
            $(e.target).addClass('act');
            //remove act from tabs
            $(e.target).parents('.tabsbox').find('.layer.act').removeClass('act');
            //add act to active tab
            $(e.target).parents('.tabsbox').find('.layer[data-id="' + $(e.target).data('id') + '"]').addClass('act');
            $(window).trigger('scroll'); //trigger lazy loading
        }); //.tabheader onclick
        //activate tab by hash (page#hash)
        if (settings.autoact) {
            setActiveTab();
            $(window).off('hashchange.newtabber');
            $(window).on('hashchange.newtabber', function(){setActiveTab();});
        } //if autoact
    }); //wikipage.content hook
})(jQuery);//tabber mtmb issue