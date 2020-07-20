/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Collapsible template feature.
 * Source: http://dev.wikia.com/wiki/ShowHide
 */
importScriptPage('ShowHide/code.js', 'dev');

// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'

  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

// Randomizer for "Did You Know" section of the main page. Author: Slyst

$(function() {
    $.fn.extend({
        randomize: function(parent, child) {
            var $this = $(this);
            var randomize = {
                items: [],
                index: function() {
                    if (!parent) {
                        parent = $this.data('parent') || $this.find(':first-child');
                    }
                    if (!child) {
                        child = $this.data('child') || parent.children(':first-child') || parent;
                    }
                    var elem = (parent !== child) ? $this.find(parent).find(child).eq(0).parent().children(child) : $this.find(parent);
                    elem.each(function(i) {
                        $(this).addClass('item-' + i);
                    });
                },
                store: function() {
                    randomize.items = [];
                    if (!$this.find('[class^="item-"]').length) {
                        this.index();
                    }
                    $this.find('[class^="item-"]').each(function() {
                        randomize.items.push($(this).html());
                    });
                },
                generate: function(limit) {
                    var array = this.shuffle(this.items);
                    for (var i = 0; i < limit; i++) {
                        $this.find('.item-' + i).html(array[i]).addClass('shuffled');
                    }
                    $this.find('[class^="item-"]').not('.shuffled').remove();
                },
                shuffle: function(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var random = Math.floor(Math.random() * (i + 1)),
                            temp = array[i];
                        array[i] = array[random];
                        array[random] = temp;
                    }
                    return array;
                },
                init: function() {
                    this.store();
                    if (!$this.data('limit')) {
                        $this.attr('data-limit', $this.find('[class^="item-"]').length);
                    }
                    this.generate($this.data('limit'));
                }
            };
            return randomize.init();
        }
    });
    if ($('.randomize').length) {
        $('.randomize').each(function() {
            $(this).randomize();
        });
    }
});

// Welcome module. More info on the page "Forum:Welcome messages and spoilers". Author:Slyst
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Welcome',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .html($.parseHTML(data.parse.text['*'])[0].innerHTML)
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                $.parseHTML(data.parse.text['*'])[1].innerHTML.replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'passer-by'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Dismiss')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});