/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function(){
      $('.sblur-toggle').on('click', function(e){
        $('.sblur, .no-sblur').toggleClass('sblur no-sblur');
        $('.miawiki-sblur-on, .miawiki-sblur-off').toggleClass('miawiki-sblur-on miawiki-sblur-off');
        $('.miawiki-sblur-on').text('On');
        $('.miawiki-sblur-off').text('Off');
        localStorage.setItem("miawikiSblur",$(e.target).text());
  });
  //set local storage value if the status doesn't exist in it, if it does just make changes to the page
  if (!localStorage.getItem("miawikiSblur")) {
   var blurStatus = $(".sblur-toggle").text();
   localStorage.setItem("miawikiSblur",blurStatus);
   
   setStatus();
  } else {
   setStatus();
  }

  //make changes to the page according to the status of the button (since the default is on, nothing else needs to happen)
  function setStatus() {
   var currBlurStatus = localStorage.getItem("miawikiSblur");
   if (currBlurStatus == "Off") {
    $('.sblur, .no-sblur').toggleClass('sblur no-sblur');
    $('.miawiki-sblur-on, .miawiki-sblur-off').toggleClass('miawiki-sblur-on miawiki-sblur-off');
    $('.miawiki-sblur-off').text('Off');
   }
  }

});