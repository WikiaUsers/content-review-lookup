/**
 * @module          redesign
 * @description     Redesigns the wiki's chat and adds new features
 * @version         1.0
 * @author          Ultimate Dark Carnage
 **/

(function($, mw, mainRoom, FC){
    FC.Redesign = function(){
        this.railInserted = $.Deferred();
        this.chatSendButtonInserted = $.Deferred();
        this.railOpened = false;
        this.railCreated = false;
        this.railSections = [];
    }
    
    // Wiki Chat Rail
    
    FC.Redesign.prototype.createRail = function(){
        $('#ChatHeader .User').wrap($('<nav>').addClass('ChatRailMenuWrapper chat-rail-menu-wrapper').attr('id', 'ChatRailMenuWrapper'));
        var $ChatRailMenu = $('#ChatRailMenuWrapper');
        $ChatRailMenu.on('click', $.proxy(function(event){
            event.preventDefault();
            this.openRail();
        }, this));
        this.$ChatRailMenu = $ChatRailMenu;
        this.createRailHTML();
    };
    
    FC.Redesign.prototype.createRailHTML = function(){
        var $ChatRailMenuHTML = $('<section>').addClass('ChatRailMenu chat-rail-menu').attr('id', 'ChatRailMenu');
        $ChatRailMenuHTML.html(this.railSections.map($.proxy(function(railSection){
            return $('<div>').addClass('ChatRailMenuSection chat-rail-menu-section')
                .attr({ 'id': railSection.id, 'data-title': railSection.title })
                .html([
                    $('<h3>').addClass('ChatRailMenuSectionTitle chat-rail-menu-section-title')
                        .text(railSection.title),
                    $('<div>').addClass('ChatRailMenuSectionContent chat-rail-menu-section-content')
                ]);
        }, this)));
        if (this.railCreated === false){
            this.$ChatRailMenu.append($ChatRailMenuHTML);
            this.railCreated = true;
        }
    };
}(jQuery, mediaWiki, mainRoom));