function ability_tabber_init() {
    var $this = $(this)
    $this.find('.ability-tabber-tabs *').removeAttr('title')
    $this.find('.ability-tabber-tabs .ability-tab a').click(ability_tabber_tab_handler)
    if(location.hash) {
        var tab = ability_tabber_change($this, location.hash, 0)
        if(tab) {
            if(!is_in_view(tab.closest('.ability-tabber'))) {
                tab.closest('.ability-tabber')[0].scrollIntoView()
            }
        }
    }
    $(window).on('hashchange', function(e) {
        var tab = ability_tabber_change($this, location.hash, 500)
        if(tab) {
            e.preventDefault()
            if(!is_in_view(tab.closest('.ability-tabber'))) {
                tab.closest('.ability-tabber')[0].scrollIntoView()
            }
        }
        return false
    });
}
function ability_tabber_tab_handler(e) {
    e.preventDefault()
    var tab = $(this).closest('.ability-tab')
    var tabber = $(this).closest('.ability-tabber')
    var id = tab.attr('id').replace(/^ab-/, '')
    ability_tabber_change(tabber, id, 500)
    return false
}
function ability_tabber_change(tabber, id, duration) {
    if(tabber.hasClass('.ability-tabber-anim')) return false
    id = id.replace(/^#/, '')
    var tab = tabber.find('#ab-'+id.replace(/\./g, '\\.').replace(/\:/g, '\\:').replace(/\>/g, '\\>').replace(/\+/g, '\\+').replace(/\*/g, '\\*').replace(/\~/g, '\\~'))
    if(tab.length == 0 || tab.hasClass('current')) return false
    var no = tab.data('no')
    
    if(history.pushState) history.pushState(null, null, '#'+id);
    
    var prev = tabber.find('.ability-content.current')
    var next = tabber.find('.ability-content[data-no=' + no + ']')
    
    ability_tabber_animation(prev, next, duration)
    return tab
}
function ability_tabber_animation(from, to, duration) {
    var tabber = from.closest('.ability-tabber').addClass('ability-tabber-anim');
    tabber.find('.ability-tab, .ability-content').removeClass('current')
    
    from.hide(duration)
    to.show(duration, function() {
        var no = $(this).data('no')
        var tabber = $(this).closest('.ability-tabber').removeClass('ability-tabber-anim')
        tabber.find('.ability-tab[data-no=' + no + '], .ability-content[data-no=' + no + ']').addClass('current')
    })
}
function is_in_view(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
$(function() {
    $('.ability-tabber').each(ability_tabber_init)
    $(window).on('EditPageAfterRenderPreview', function(e, preview) {
        preview.find('.ability-tabber').each(ability_tabber_init)
    })
});