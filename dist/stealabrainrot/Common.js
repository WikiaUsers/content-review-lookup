/* Any JavaScript here will be loaded for all users on every page load. */

/* UNIX Timestamp Java */
mw.hook('wikipage.content').add(function ($content) {
  var now = Date.now();

  //relative time class
  $content.find('.rel-time[data-timestamp]').each(function () {
    var node = this;
    var ts = parseInt(node.getAttribute('data-timestamp'), 10);
    if (isNaN(ts)) return;

    var target = ts * 1000; // ms
    var diffMs = target - now;
    var past = diffMs < 0;
    var diff = Math.abs(diffMs);

    var seconds = Math.round(diff / 1000);
    var minutes = Math.round(seconds / 60);
    var hours   = Math.round(minutes / 60);
    var days    = Math.round(hours / 24);
    var weeks   = Math.round(days / 7);
    var months  = Math.round(days / 30);
    var years   = Math.round(days / 365);

    var value, unit;

    if (seconds < 60)      { value = seconds; unit = 'second'; }
    else if (minutes < 60) { value = minutes; unit = 'minute'; }
    else if (hours < 24)   { value = hours;   unit = 'hour'; }
    else if (days < 7)     { value = days;    unit = 'day'; }
    else if (weeks < 5)    { value = weeks;   unit = 'week'; }
    else if (months < 12)  { value = months;  unit = 'month'; }
    else                   { value = years;   unit = 'year'; }

    if (value !== 1) unit += 's';

    var text = past
      ? value + ' ' + unit + ' ago'
      : 'in ' + value + ' ' + unit;

    node.textContent = text;
    node.title = new Date(target).toUTCString();
  });
  
  // absolute time class
  $content.find('.abs-time[data-timestamp]').each(function () {
    var node = this;
    var ts = parseInt(node.getAttribute('data-timestamp'), 10);
    if (isNaN(ts)) return;

    var date = new Date(ts * 1000);

    // absolute time format when displayed: "Jan 1, 2000 • 12:00 AM"
    var formatted = date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });

    node.textContent = formatted;
    node.title = date.toUTCString(); // hovering shows UTC
  });
});