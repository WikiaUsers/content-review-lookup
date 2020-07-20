function SpecialAlert() {
  var d = getClassById('activityfeed-diff').innerHTML = activityfeed-diff();
  var f = mw.config.get('wgactivityfeed-diff');
  if  (d == 785998)
  return window.alert("It''s getting away!");
  if (f == 785998)
  return window.alert("It''s about to happen!");
}

function loadSpecialAlert() 
    $.showCustomModal(msg.title.replace('%pagename', ''), '<table class="diff" id="activityfeed-diff"></table>', {
      id: 'LBAlert-modal',
      width: $(window).width() - 100
    })