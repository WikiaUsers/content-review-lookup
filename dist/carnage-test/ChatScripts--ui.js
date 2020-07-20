// Panels
function Panel(name, config){
    this.title = name;
    this.parent = config.parent || '#Write';
    this.id = config.id;
    this.target = '#'.concat(this.id);
    this.content = config.content;
    this.confirm = config.confirm;
    this.create();
}

Panel.prototype.bind = function(){
    var $target = $(this.target),
        button = $target.find('.panel-button'),
        _this = this;
    
    button.on('click', function(event){
        event.preventDefault();
        if ($(event.target.hash).length)
            $(event.target.hash).remove();
        if (typeof _this.confirm == 'function'){
            if ($(event.target).hasClass('confirm'))
                Function.prototype.apply.call(_this.confirm, window, [event]);
        }
    });
};

Panel.prototype.create = function(){
    var $panel = $('<section class="CustomPanel GlobalModule panel " />'),
        $panel_header =
            $('<header class="panel-header header" />')
            .html(['<h2 class="panel-heading heading"><span class="headline">',
                this.title,
                '</span></h2>'].join('')),
        $panel_content =
            $('<article class="panel-content content" />')
            .html(this.content),
        $panel_footer =
            $('<footer class="panel-buttons panel-footer" />')
            .html(['Cancel', 'Confirm'].map(function(name){
                var html = '<a href="' + this.target + '" class="panel-button ';
                html = html.concat(name.toLowerCase());
                html = html.concat('">');
                html = html.concat(name);
                html = html.concat('</a>');
                return html;
            }));
    $panel.attr('id', this.id);
    $panel.html([$panel_header, $panel_content, $panel_footer]);
    if (!$(this.target).length) $(this.parent).append($panel);
    this.bind();
};

// Checkboxes
function Item(name, config){
    this.name = name;
    this.content = config.content || this.name;
    this.tooltip = config.tooltip || true;
    this.title = config.title;
    return this;
}