mw.loader.using('mediawiki.util').then(function () {

function zselector($content) {
    // 
    $content.find('[data-tab-group]').each(function() {
        var $group = $(this);
        var groupId = $group.data('tab-group');
        
        initGroup($group, groupId);
    });
    
    // 
    if ($content.find('[data-tab-group]').length === 0) {
        initGroup($content, 'default');
    }
    
    function initGroup($container, groupId) {
        var ActiveID = '';
        
        // 
        $container.find('[class*="cc-"]')
            .off('click.zselector.' + groupId)
            .on('click.zselector.' + groupId, function () {
                var cn = $(this).attr('class');
                if (cn) {
                    ZContent(cn, '0', $container, groupId);
                }
            });
        
        // 
        $container.find('[class*="hh-"]')
            .off('mouseenter.zselector.' + groupId)
            .on('mouseenter.zselector.' + groupId, function () {
                var cn = $(this).attr('class');
                if (cn) {
                    ZContent(cn, '1', $container, groupId);
                }
            });
        
        $container.find('[class*="hh-"]')
            .off('mouseleave.zselector.' + groupId)
            .on('mouseleave.zselector.' + groupId, function () {
                var cn = $(this).attr('class');
                if (cn) {
                    ZContent(cn, '2', $container, groupId);
                }
            });
        
        //
        $container.find('[class*="zz-"]').each(function () {
            if ($(this).is(':hidden')) {
                $(this).css('opacity', 0);
            }
        });
        
        // 
        var activeStates = {};
        
        function ZContent(classValue, effect, $container, groupId) {
            var ID = '';
            var elemClasses = classValue.split(' ');
            
            for (var i = 0; i < elemClasses.length; i++) {
                var elemClass = elemClasses[i];
                
                if (elemClass.startsWith('hh-') || elemClass.startsWith('cc-')) {
                    ID = elemClass.substring(3);
                    
                    if (effect === '0') {
                        activeStates[groupId] = ID;
                        ZEffect(ID, $container);
                        SelectElem('cc', ID, $container);
                        break;
                        
                    } else if (effect === '1') {
                        activeStates[groupId] = ID;
                        ZEffect(ID, $container);
                        SelectElem('hh', ID, $container);
                        break;
                        
                    } else if (effect === '2') {
                        ZEffect(activeStates[groupId] || '', $container);
                        SelectElem('hh', ID, $container);
                        break;
                    }
                }
            }
        }
        
        function ZEffect(ID, $container) {
            $container.find('[class*="zz-"]').each(function () {
                if ($(this).hasClass('zz-' + ID)) {
                    $(this)
                        .stop(true, true)
                        .css('display', 'block')
                        .animate({ opacity: 1 }, 300);
                } else {
                    $(this)
                        .stop(true, true)
                        .animate({ opacity: 0 }, 0, function () {
                            $(this).css('display', 'none');
                        });
                }
            });
        }
        
        function SelectElem(type, ID, $container) {
            $container.find('[class*="cc-"], [class*="hh-"]').each(function () {
                if ($(this).hasClass(type + '-' + ID)) {
                    $(this).removeClass('sn').addClass('sy');
                } else {
                    $(this).removeClass('sy').addClass('sn');
                }
            });
        }
    }
}

mw.hook('wikipage.content').add(zselector);

});