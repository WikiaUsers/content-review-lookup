function ProfileDropdown(items, config){
    this.items = items;
    this.target = '.tabs-container';
    this.name = 'More';
    if (typeof config == 'object'){
        this.theme = config.theme || '';
        this.name = config.name || 'More';
        this.id = config.id;
    }
    this.create();
}

ProfileDropdown.prototype.create = function create(){
    var $target = $(this.target),
        _t = this,
        $tab_dropdown =
            $('<div class="tab-item _tab parent"' + (typeof this.id == 'string' ? 'id="' + this.id + '"' : '') + '/>')
            .html([
                $('<a href="#UserIdentityBox" class="tab-link" />')
                    .html(this.name + ' &#x25BE;')
                    .on('click', function(event){ event.preventDefault(); }),
                $('<ul class="tab-dropdown tabs-list overflow" />')
                    .html(Object.keys(this.items).map(function(item){
                        var lh = _t.items[item],
                            $item =
                                $('<li class="dropdown-item" />')
                                .html(function(){
                                    var $link = $('<a />');
                                    switch (typeof lh){
                                        case 'string':
                                            $link.attr('href', lh).text(item);
                                            break;
                                        case 'function':
                                            $link.attr('href', '#UserIdentityBox').on('click', function(event){
                                                event.preventDefault();
                                                Function.prototype.apply.call(lh, window, [event]);
                                            }).text(item);
                                            break;
                                        default:
                                            return false;
                                    }
                                    return $link;
                                });
                        return $item;
                    }))
            ]);
    if (typeof this.theme == 'string')
        $tab_dropdown.addClass(this.theme);
    $target.append($tab_dropdown);
};