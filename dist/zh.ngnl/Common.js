/* Adapted from YouTubePlayer & DraggableYouTubePlayer for video previews on episode pages. */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.episodepreview-video').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();
 
        if (data.loaded || id === '') {
            return;
        }
 
        uri.path += id;
        uri.query = {
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim(),
            controls: 0,
            fs: 0,
            showinfo: 0,
            rel: 0, 
        };
 
        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
        data.loaded = true;
    });
});

/** 
 * User Handbook
 * For NGNL zh wiki Project
 * Author: No Wiki No Life Project Team
 * https://no-game-no-life.fandom.com/zh/wiki/Project:About
 **/
$(function(){
$('.handbook').html(function (){
  var $this = $(this),
      $content = $this.find('.dialog-box'),
      $pageNum = $this.find('.page-num'),
      $preBtn = $this.find('.page-btn .pre-page'),
      $nextBtn = $this.find('.page-btn .next-page');
  $content.html($this.find('.dialog-content ._1').html());
  $preBtn.hide();
  
  // Pre page
  $preBtn.click(function (){
    var $page = Number( $this.find('.dialog-box').attr('data-page') ),
        $prePageNum = $page-1,
        $prePreNum = $page-2,
        $prePage = $('.dialog-content ._' + $prePageNum ),
        $prePre = $('.dialog-content ._' + $prePreNum );
    $nextBtn.show();
    $content.html($prePage.html());
    $pageNum.html($prePageNum);
    $this.find('.dialog-box').attr('data-page',$prePageNum);
    if ( $prePre.length > 0) {
      $preBtn.show();
    } else {
      $preBtn.hide();
    }
  
  });

  // Next page
  $nextBtn.click(function (){
    var $page = Number( $this.find('.dialog-box').attr('data-page') ),
        $nextPageNum = $page+1,
        $nextNextNum = $page+2,
        $nextPage = $('.dialog-content ._' + $nextPageNum ),
        $nextNext = $('.dialog-content ._' + $nextNextNum );
    $preBtn.show();
    $content.html($nextPage.html());
    $pageNum.html($nextPageNum);
    $this.find('.dialog-box').attr('data-page',$nextPageNum);
    if ( $nextNext.length > 0) {
      $nextBtn.show();
    } else {
      $nextBtn.hide();
    }
  
  });
  
});

});

/** RailWAM Config **/
window.railWAM = {
  logPage: 'Project:WAM Log',
  autoLogForUsers: 'Sara Lindery',
  botUsers: 'Sara Lindery'
};