//<!--
//Usage:
//<span class="countdown" data-date="January 01 2007 00:00:00 PST" data-string="Only %% until New years." data-before="until" data-after="since">Default text</span>
//required: data-date
//optional: data-string, data-before, data-after

function doCountdown(thistimer) {
  start = new Date($(thistimer).attr("data-date")).getTime();
  end = new Date().getTime();
  diff = start - end;
  if (isNaN(diff)) return;

  if (diff < 0) diff *= -1;
  days = Math.floor(diff / (1000*60*60*24));
  output = "";

  if (days) output += days+" days, ";
  output += new Date(diff).toISOString().substr(11, 8);

  if ($(thistimer).attr("data-string")) {
    output = $(thistimer).attr("data-string").replace("%%", output);
    if (start - end < 0) output = output.replace($(thistimer).attr("data-before"), $(thistimer).attr("data-after"));
  } else {
    output += (start - end > 0)?" left":" ago";
  }
  $(thistimer).text(output);
}

function initCountdown() {
  if (!$("span.countdown").length) return;
  $("span.countdown").each(function(){
    doCountdown($(this));
  })
  setTimeout(function(){ initCountdown() },1000);
}

$(function() {
  initCountdown(); 
});