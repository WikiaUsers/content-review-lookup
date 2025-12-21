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

// for staff clocks
function initializeDynamicOffsetClocks() {
    const allElements = document.querySelectorAll('.dynamic-offset-time');
    
    if (allElements.length === 0) return;

    const uniqueOffsets = new Set();
    allElements.forEach(element => {
        const offset = element.getAttribute('data-offset');
        if (offset !== null) {
            uniqueOffsets.add(offset);
        }
    });

    uniqueOffsets.forEach(offsetHoursStr => {
        const offsetHours = parseFloat(offsetHoursStr);
        const elementsForThisOffset = document.querySelectorAll('.dynamic-offset-time[data-offset="' + offsetHoursStr + '"]');

        function updateTimeForOffsetGroup() {
            const now = new Date();
            const offsetMs = now.getTime() + (now.getTimezoneOffset() * 60000) + (offsetHours * 3600000);
            const offsetDate = new Date(offsetMs);

            let hours = offsetDate.getHours();
            const minutes = offsetDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12;

            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const timeString = `${hours}:${formattedMinutes} ${ampm}`;

            elementsForThisOffset.forEach(element => {
                element.textContent = timeString;
            });
        }

        updateTimeForOffsetGroup();

        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        setTimeout(() => {
            updateTimeForOffsetGroup();
            setInterval(updateTimeForOffsetGroup, 60000);
        }, msUntilNextMinute);
    });
}

jQuery(function($) {
    initializeDynamicOffsetClocks();
});

$(function () {
    var conf = mw.config.get();
    console.log('[SAB wall helper] script running');

    if (!conf.wgUserName) return;

    var groups = conf.wgUserGroups || [];
    var isStaff = groups.indexOf('sysop') !== -1 || groups.indexOf('bureaucrat') !== -1;
    if (!isStaff) return;

    if (conf.wgNamespaceNumber !== 1200) return;

    var targetUser = conf.wgTitle;
    var adminUser  = conf.wgUserName;

    var $btn = $('<a>')
        .addClass('SAB-blockLog-button wds-button wds-is-secondary')
        .attr('href', '#')
        .text('Fetch Report Template')
        .on('click', function (e) {
            e.preventDefault();
            console.log('[SAB wall helper] button clicked');

            $.get('/wiki/Template:PreloadBlockReport/text?action=raw', function (tmpl) {
                var noticeText = tmpl
                    .replace(/\$USERNAME\$/g, targetUser)
                    .replace(/\$ADMIN\$/g, adminUser);

                noticeText = noticeText
                    .replace(/\[\[User:(.*?)\|(.*?)\]\]/g, '<a href="/wiki/User:$1">$2</a>')
                    .replace(/\[\[(.*?)\|(.*?)\]\]/g, '<a href="/wiki/$1">$2</a>')
                    .replace(/\[\[(.*?)\]\]/g, '<a href="/wiki/$1">$1</a>')
                    .replace(/'''(.*?)'''/g, '<strong>$1</strong>')
                    .replace(/''(.*?)''/g, '<em>$1</em>');

                var $editable = $('[contenteditable="true"]:visible').last();
                var $textarea = $('textarea:visible').last();

                if ($editable.length) {
                    console.log('[SAB wall helper] injecting HTML into editor');

                var normalized = noticeText.replace(/<br\s*\/?>/gi, '\n');
                var lines = normalized.split(/\r?\n/);
                var html = lines.map(function (line) {
                    if (line.trim() === '') {
                        return '<div>&nbsp;</div>';
                    }
                    return '<div>' + line + '</div>';
                }).join('');
                $editable.html(html);

                } else if ($textarea.length) {
                    console.log('[SAB wall helper] injecting plain text into textarea');
                    var plain = noticeText
                        .replace(/<br\s*\/?>/gi, '\n')
                        .replace(/<\/?[^>]+>/g, '');
                    $textarea.val(plain).trigger('input');
                } else {
                    alert('Open the write-a-message box first.');
                }
            });
        });

    var $startArea = $('.reskin-message-wall__start-topic');
    if ($startArea.length) {
        $startArea.before($btn);
    } else {
        $('#content, .mw-body, .page__main').first().prepend($btn);
    }
});

/* Auto-Updating DST clocks */
function initializeDynamicTimezoneClocks() {
    const allElements = document.querySelectorAll('.dynamic-timezone-time');
    
    if (allElements.length === 0) return;
    
    const uniqueTimezones = new Set();
    allElements.forEach(element => {
        const timezone = element.getAttribute('data-timezone');
        if (timezone) {
            uniqueTimezones.add(timezone);
        }
    });
    
    uniqueTimezones.forEach(timezone => {
        const elementsForThisTimezone = document.querySelectorAll('.dynamic-timezone-time[data-timezone="' + timezone + '"]');
        
        function updateTimeForTimezoneGroup() {
            try {
                const timeString = new Intl.DateTimeFormat('en-US', {
                    timeZone: timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).format(new Date());
                
                elementsForThisTimezone.forEach(element => {
                    element.textContent = timeString;
                });
            } catch (e) {
                // Invalid timezone, fallback
                elementsForThisTimezone.forEach(element => {
                    element.textContent = 'Invalid timezone, please use IANA official timezones.';
                });
            }
        }
        
        updateTimeForTimezoneGroup();
        
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        
        setTimeout(() => {
            updateTimeForTimezoneGroup();
            setInterval(updateTimeForTimezoneGroup, 60000);
        }, msUntilNextMinute);
    });
}

jQuery(function($) {
    initializeDynamicTimezoneClocks();
});

/* Autolock Comments */
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 14;