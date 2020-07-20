window.UI = $.extend({}, window.UI);

UI.tooltip = {
    text: '',
    position: 'top',
    $target: null,
    pos: {},
    added: false,
    create: function(){
        this.$tooltip = $('<div>').addClass('QuakeTooltip tooltip');
        if (this.isBlock){
            this.$tooltip_title = $('<h2>').addClass('QuakeTooltipTitle tooltip-title');
            this.$tooltip_title.html(this.heading || this.title);
            this.$tooltip_text = $('<blockquote>').addClass('QuakeTooltipText tooltip-text');
            this.$tooltip_text.html(this.html || this.content || this.text);
            this.$tooltip_content = [this.$tooltip_title, this.$tooltip_text];
        } else {
            this.$tooltip_content = $('<span>').addClass('QuakeTooltipText tooltip-text');
        }
        this.$tooltip.html(this.$tooltip_content);
        return this;
    },
    toggleOnHover: function(){
        if (this.$target === null) return;
        this.$target
            .on('mouseover', $.proxy(this.show, this))
            .on('mouseout', $.proxy(this.hide, this));
    },
    show: function(event){
        this.$currentTarget = $(event.delegateTarget);
        var offset = this.$currentTarget.offset(),
            width = this.$currentTarget.width(),
            height = this.$currentTarget.height();
        if (this.position === 'top' || !this.position){
            this.pos.x = parseFloat(offset.left) - 86 + (width / 2);
            this.pos.y = parseFloat(offset.top) - (height + 5);
        } else if (this.position === 'bottom'){
            this.pos.x = parseFloat(offset.left) - 86 + (width / 2);
            this.pos.y = parseFloat(offset.top) + (height + 5);
        } else if (this.position === 'left'){
            this.pos.x = parseFloat(offset.left) - (width + 5);
            this.pos.y = parseFloat(offset.top) - 86 + (height / 2);
        } else if (this.position === 'right'){
            this.pos.x = parseFloat(offset.left) + (width + 5);
            this.pos.y = parseFloat(offset.top) - 86 + (height / 2);
        }
        this.$tooltip.css({ top: this.pos.y, left: this.pos.x });
        if (!this.added){
            $(document.body).append(this.$tooltip);
            this.added = true;
        } else {
            this.$tooltip.show();
        }
    },
    hide: function(event){
        this.$currentTarget = null;
        this.$tooltip.hide();
    }
};