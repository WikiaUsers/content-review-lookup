function StatusIndicator(config){
    this.canonical = ['online', 'busy', 'around', 'offline', 'unavailable', 'unknown', 'blocked'];
    this.status_regex = new RegExp('(' + this.canonical.join('|') + ')', 'gi');
    this.target = '.status-indicator';
    this.create();
}

StatusIndicator.prototype.create = function create(){
    var $status_indicator = $('<div class="status-indicator" />'),
        $bubble = $('<span class="status-bubble" />'),
        $status = $('<span class="status-text" />'),
        _t = this;
    $.ajax({
        method: 'GET',
        dataType: 'text',
        url: mw.util.wikiScript('index'),
        data: {
            title: 'User:' + wgUserName + '/status',
            action: 'raw'
        },
        complete: function(data){
            var status = (typeof data.responseText !== 'undefined') ? data.responseText.split(/\[([a-z0-9]*)\]/) : ['', 'unknown', 'Unknown'],
                status_text = status[2],
                status_bubble = status[1];
            if (_t.status_regex.test(status_bubble)){
                $bubble.addClass(status_bubble);
                $status.text(status_text);
            } else {
                $bubble.addClass(status_bubble + ' custom');
                $status.text(status_text);
            }
            
            if (!$(_t.target).exists())
                $('.UserIdentityBox .masthead-header').append($status_indicator.html([$bubble, $status]));
        }
    });
};