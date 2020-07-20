/* Video Annotation */
$(function() {
   YouTubeRemote.init();
});
 
YouTubeRemote = {
   init: function() {
      //YouTube videos
      YouTubeRemote.videos = $("#WikiaArticle").find("embed[src*=youtube]");
 
      //Find remote controls
      $(".YouTubeRemote").click(function() {
         //Parameters
         var time = $(this).attr("title"); 
         //var video = $(this).attr("data-video");
 
         //Default variables
         seconds = 0;
         var videoIndex = 0;
 
         //Playlist handling
         var playlistArray = time.split("/");
         var playlist = parseInt(playlistArray[1]) + 1;
 
         //Time handling
         timeArray = time.split(":");
         var trimmed = timeArray[0].replace(/\/[0-9]+/,"");
 
         if (trimmed !== "") {
            timeArrayTrimmed = timeArray[1].replace(/\/[0-9]+/,"");
            timeArray[1] = timeArrayTrimmed;
            timeMultiplier = Array(3600,60,1);
            while(timeArray.length > 0) {
	       seconds += timeArray.pop() * timeMultiplier.pop();
            }
         }
         //Video identification
         if (video) {
            videoIndex = parseInt(video) - 1;
         }
 
         //Stop videos
         YouTubeRemote.pause();
 
         //Control video
         var video = YouTubeRemote.videos.get(videoIndex);
	 if (playlist) { 
	    video.playVideoAt(playlist);
         } 
         if (trimmed !== "") {
            setTimeout("YouTubeRemote.seekToDelay()",500);
         }
         video.playVideo();
      });
   },
   pause: function() {
      YouTubeRemote.videos.each(function() {
         $(this).get(0).pauseVideo();
      });
   },
   seekToDelay: function() {
      YouTubeRemote.videos.each(function() {
         $(this).get(0).seekTo(seconds);
      });
   }
};
/* End Video Annotation */