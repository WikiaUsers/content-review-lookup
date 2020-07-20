/***
 * Theme Selector v1.0.0 alpha
 * 
 * This plugin allows the user to select a theme from a custom dropdown list.
 * The plugin has been appropriated for the HTML & CSS Wiki. Therefore, I
 * advise you to use it with caution.
 * 
 * Created by Ultimate Dark Carnage
 ***/
 
const ThemeSelector = {
    config: {
        load_msg: 'Theme Selector v1.0.0 alpha has been loaded!',
        load_error: 'Theme Selector v1.0.0 alpha cannot be loaded!',
        loaded: false
    },
    select: function($target){
        if (typeof $target === 'undefined') return;
        var $main = $('.theme-selector'),
            $label = $('.theme-selector .dropdown-label-text'),
            Class_Name = 'ChatWindow';
        $main.removeClass('show');
        $label.text($target.text());
        if (['Normal', 'Base', 'Regular', 'Plain'].indexOf($target.text()) === -1){
            Class_Name += ' ' + $target.text();
        }
        $('body.ChatWindow').attr('class', Class_Name);
    },
    load: function(enabled){
        if (enabled === false || ThemeSelector.config.loaded) return;
        
        var $theme_selector = $('<nav class="theme-selector dropdown" />'),
            theme_html = [['<div class="dropdown-label">', '<span class="dropdown-label-text"></span>', '<span class="dropdown-arrow"><i class="icon ion-arrow-down-b"></i></span>', '</div>'].join(''), '<ul class="dropdown-list" />'];
        $theme_selector.html(theme_html);
        $.ajax({
            method: 'GET',
            dataType: 'text',
            url: mw.util.wikiScript('index'),
            data: {
                title: 'MediaWiki:Custom-Themes',
                action: 'raw',
                format: 'text'
            }
        }).success(function(data){
            var themes = data.split(/\n/),
                $themes = null,
                articles = null;
            articles = Array.prototype.map.call(themes, function(theme, index){
                var page_temp = 'MediaWiki:Chat.css/$1.css',
                    page = page_temp.replace('$1', theme);
                if (['Normal', 'Base', 'Regular', 'Plain'].indexOf(theme) === -1)
                    return page;
            });
            $themes = Array.prototype.map.call(themes, function(theme, index){
                var $list_item = $('<li class="dropdown-item" />'),
                    $link = $('<a href="#" />');
                // Item
                $list_item.attr('data-index', index);
                $list_item.attr('data-option', theme);
                // Link
                $link.text(theme);
                $link.on('click', function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    var $el = $(event.target);
                    ThemeSelector.select($el);
                });
                $list_item.html($link);
                
                if (index === 0){
                    $('.dropdown-label .dropdown-label-text').text(theme);
                }
                
                return $list_item;
            });
            
            $theme_selector.find('.dropdown-label').on('click', function(event){
                $theme_selector.toggleClass('show');
            });
            
            importArticles({
                type: 'style',
                articles: articles
            });
            
            $theme_selector.find('.dropdown-list').html($themes);
            
            $('.Chat ul').append('<li class="inline-alert">$1</li>'.replace('$1', ThemeSelector.config.load_msg));
        }).fail(function(error){
            console.log(error);
            $('.Chat ul').append('<li class="inline-alert">$1</li>'.replace('$1', ThemeSelector.config.load_error));
        });
        if (!$('.theme-selector').length) $('.Rail').prepend($theme_selector);
        ThemeSelector.config.loaded = true;
    }
};

if (!$('.theme-selector').length){
    $(document).ready(function(){
        ThemeSelector.load((typeof THEME_SELECTOR_ENABLED == 'boolean') ? THEME_SELECTOR_ENABLED : true);
    });
}