window.FandomNotification = window.FandomNotifcation || function FandomNotifcation(options){
    var _options = options || {};
    this.title = options.title || '';
    this.id = options.id || '';
    this.content = options.content || '';
    this.callbacks = $.Callbacks();
    this.close = options.close || $.noop;
    this.delay = options.delay || Infinity;
    this.autoOpen = options.open || false;
    this.state = "open";
    this.element = null;
    this.headingElement = null;
    this.contentElement = null;
    this.create();
    if (this.autoOpen === true){
        this.open();
        return this.element;
    }
    return this;
};

FandomNotification.prototype.closeNotification = function close(callback){
    if (this.element && this.state == "open"){
        var $element = this.element;
        if (isNaN(this.delay) || [Infinity, null, undefined, 0].indexOf(this.delay) > -1 || this.delay < 0){
            if (['slow', 'fast'].indexOf(this.delay) > -1){
                $element.fadeOut(this.delay);
            }
            else $element.hide();
        } else {
            if (typeof this.delay == 'number'){
                $element.fadeOut(this.delay);
            } else {
                var delay = parseInt(this.delay, 10);
                $element.fadeOut(delay);
            }
        }
        this.state = "closed";
    }
};

FandomNotification.prototype.getFromSource = function getFromSource(pageName){
    var promise = new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            dataType: 'json',
            url: mw.util.wikiScript('index'),
            data: {
                title: pageName,
                action: 'raw',
                ctype: 'text/plain'
            }
        }).done((data) => {
            if (data.error) reject(data.error);
            else resolve(data);
        }).fail((error) => {
            reject(error);
        });
    });
    
    promise.then((content) => {
        this.contentElement.html(content);
    }, (error) => {
        this.contentElement.html(content);
    });
};

FandomNotification.prototype.create = function(){
    var $element = $('<section />', {
            'class': 'FandomNotification notification',
            'id': this.id,
            html: [
                $('<header />', {
                    'class': 'FandomNotificationHeader notification-header',
                    html: [
                        $('<h2 />', {
                            'class': 'FandomNotificationHeading notification-heading',
                            html: this.title
                        }),
                        $('<a />', {
                            'class': 'FandomNotificationClose notification-close',
                            href: '#',
                            on: {
                                'click': this.close()
                            }
                        })
                    ]
                }),
                $('<div />', {})
            ]
        });
};