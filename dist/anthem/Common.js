// LinkPreview //
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
    window.pPreview.tlen = 200;
    window.pPreview.RegExp.iimages = [/Grabbit_Stub\.png/, /Grabbit_Store\.png/, /Grabbit_Spoiler\.png/, /Grabbit_Skulls\.png/, /Grabbit_Protect\.png/, /Grabbit_Notice\.png/, /Grabbit_Missing\.png/, /Grabbit_Icetide\.png/, /Grabbit_Help\.png/, /Grabbit_Heart\.png/, /Grabbit_Echoes\.png/, /Grabbit_Disambiguation\.png/, /Divider\.png/];
    window.pPreview.RegExp.noinclude = ['.quotebackground', '.hatnote', '.Quote', '.Quote2'];
    window.pPreview.defimage = 'https://static.wikia.nocookie.net/anthemgame/images/5/55/Anthem_Loading_Image.gif/revision/latest?cb=20211219190407';
    window.pPreview.noimage = 'https://static.wikia.nocookie.net/anthemgame/images/6/6a/Default_Anthem_Image.png/revision/latest?cb=20200825204924';
    window.pPreview.delay = 200;



//<syntaxhighlight lang="javascript">
$(function(){
    initImage360();
    
    
    
    function initImage360() {
        var wrappersList = $('.image-360-wrapper');
        var mousedown = false;
        var startX = null;
        
        for (var j = 0; j < wrappersList.length; j ++) {
            var wrapper = $(wrappersList[j]);
            wrapper.data('wrapperNumber', j);
            var framesList = wrapper.find('img');
            for (var i = 0; i < framesList.length; i++) {
                var frame = $(framesList[i]);
                frame
                    .attr({
                        id: 'wrapper-' + j + 'frame-' + i,
                        draggable: false
                    })
                    .data('frameNumber', i);
                if (i !== 0) {
                    frame.hide();
                }
            }
        }
        
        $(wrappersList)
            .show()
            .on('mousedown', function(event) {
                mousedown = true;
                startX = event.clientX;
                $(this).css('cursor', 'grabbing');
            })
            .on('mousemove', function(event) {
              if (mousedown) {
                  var framesCount = $(this).find('img').length;
                  var pixelsPerFrame = parseInt($(this).width() / framesCount / 1.5);
                  var deltaX = event.clientX - startX;
                  var deltaXAbs = Math.abs(event.clientX - startX);
                  var direction = deltaX / deltaXAbs;
                  if (deltaXAbs / pixelsPerFrame > 1) {
                      var currentFrame = $($(this).find('img:visible'));
                      currentFrame.hide();
                      var nextFrameNumber = (parseInt(currentFrame.data('frameNumber')) + parseInt(deltaX / pixelsPerFrame) + framesCount) % framesCount;
                      $('img#wrapper-' + $(this).data('wrapperNumber') + 'frame-' + nextFrameNumber).show();
                      startX += direction * pixelsPerFrame;
                  }
              } 
            })
            .on('wheel', function(event) {
                if (event.ctrlKey) {
                    event.preventDefault();
                    var framesCount = $(this).find('img').length;
                    var deltaScroll = event.originalEvent.deltaY / Math.abs(event.originalEvent.deltaY);
                    var currentFrame = $($(this).find('img:visible'));
                    currentFrame.hide();
                    var nextFrameNumber = (parseInt(currentFrame.data('frameNumber')) + deltaScroll + framesCount) % framesCount;
                    $('img#wrapper-' + $(this).data('wrapperNumber') + 'frame-' + nextFrameNumber).show();
                }
            });
            
        $(document)
            .on('mouseup', function() {
                mousedown = false;
                startX = null;
                $('.image-360-wrapper').css('cursor', 'grab');
            })
    }
});
//</syntaxhighlight>


//Importing the Countdown script

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js",
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:MassRenameRevert/code.js',
        'u:dev:MediaWiki:AjaxDelete/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

window.MassEditGroups = ['sysop', 'content-moderator'];
window.MassRenameGroups = ['sysop', 'content-moderator'];
window.MassRenameRevertGroups = ['sysop', 'content-moderator'];
window.AjaxDeleteGroups = ['sysop', 'content-moderator'];
window.AjaxBatchDeleteGroups = ['sysop', 'content-moderator'];