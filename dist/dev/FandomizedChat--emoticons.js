/**
 * @module          emoticons
 * @description     Creates an emoticon panel for the chat. This script
 *                  is based on the EmoticonWindow script by KockaAdmiralac.
 * @version         1.1
 * @author          KockaAdmiralac
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA
 **/

(function($, mw, mainRoom){
    $(importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Colors/code.js',
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:FandomizedChat/ui.js',
            'u:dev:MediaWiki:FandomizedChat/library.js'
        ]
    })).on('load', $.proxy(function(){
        function EmoticonWindow(){
            this.emoticons = {};
            this.loaded = false;
            this.enabled = false;
            this.modalOpened = false;
            this.$mainElement = $('<div>').addClass('EmoticonWindowContent emoticon-window-content');
        }
    }, this));
}(jQuery, mediaWiki, mainRoom));