;(function(mw, $, mainRoom, module){
    var mwVars = mw.config.get([
            'wgPageName',
            'wgUserName',
            'wgCanonicalSpecialPageName',
            'wgServer'
        ]),
        config = $.extend(module, {
            version: '0.0.1 alpha',
            create_modal: function(_config){
                var $modal = $('<section class="modal-blackout" id="' + _config.id + '" />'),
                    $wrapper = $('<div class="modal-window" id="modal-window" />'),
                    $html = [
                        $('<header class="modal-header" id="modal-header" />')
                            .html([
                                $('<h2 class="modal-heading" id="modal-heading" />')
                                    .html(_config.title),
                                $('<a href="#' + _config.id + '" class="modal-close close" />')
                                    .html(
                                        $('<i class="icon ion-close" />')
                                    )
                                    .on('click', function(event){
                                        event.preventDefault();
                                        var $m = $(event.target.hash);
                                        if ($m.length){
                                            $m.remove();
                                        }
                                    })
                            ]),
                        $('<article class="modal-content" id="modal-content" />')
                            .html(_config.content),
                        $('<footer class="modal-toolbar modal-buttons" id="modal-buttons" />')
                            .html(
                                Object.keys(_config.buttons).map(function(id){
                                    var button = _config.buttons[id],
                                        $button = $('<a href="#' + _config.id + '" class="modal-button" id="' + id + '" />');
                                    $button
                                        .html(button.text)
                                        .on('click', function(event){
                                            event.preventDefault();
                                            if (typeof button.handler != 'undefined')
                                                Function.prototype.apply.call(button.handler, this, [event, $button]);
                                        });
                                    
                                    if (button.isDefault)
                                        $button.addClass('primary');
                                    
                                    return $button;
                                })
                            )
                    ];
                $wrapper.html($html);
                $modal.html($wrapper);
                
                if (!$('#' + _config.id).exists())
                    $('.ChatWindow').append($modal);
            },
            allusers: mainRoom.model.users.map(function(child){
                return child.attributes.name;
            }).sort()
        });
})(this.mediaWiki, this.jQuery, this.mainRoom, this.test = this.test || {});