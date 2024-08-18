/* Any JavaScript here will be loaded for all users on every page load. */
/*Message Block*/
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block with the reason $1. Important: This is an automated message. If you need anymore help, please check our Discord Server at https://arenatd.fandom.com/Discord or leave a message wall on one of our Staff pages at https://arenatd.fandom.com/Staff. Do read the rules before continuing your wiki journey. Thanks. ',
	autocheck : true
};

window.SpoilerAlertJS = {
    question: 'This area contains spoilers for secret mail. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1000
};
/*Load Libs*/
mw.loader.load('ext.fandom.TwitterTag.js');
mw.loader.load('https://cdn.jsdelivr.net/npm/chart.js');

/*UserPages Autocreate*/
window.AutoCreateUserPagesConfig = {
    content: {
        2: 'Hello! This is your new profile page! Edit it to include information that you might want people to know about you! Need help getting started? Try out the Template {{Infobox user}}! ',
    },
    summary: 'Automatically creating user-page.',
    notify: '<a href="/wiki/User:$2">We just made your user page! Feel free to edit your profile at $1!</a>'
};
/* TBL Extension */
TBL_GROUP = "roblox-en";

/*LinKPreviewJS*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} }); /*Configuration Object*/
window.pPreview.csize = 100; /*Cache Size*/
window.pPreview.debug = false; /*Debug Mode (bool)*/
window.pPreview.apid = true; /*Use API to get*/
window.pPreview.noimage = 'https://static.wikia.nocookie.net/arena-defense-arenadev/images/6/6a/NoImageRA.png/revision/latest/scale-to-width-down/800?cb=20230505140256'; /*Image not found*/
window.pPreview.delay = 90; /*Hover reaction delay*/
window.pPreview.dock = '#mw-content-text'; /*Article Container*/
window.pPreview.tlen = 1000; /*Max text length*/

/*SocialShareWidget*/
$(document).ready(function() {
  var $widget = $('#social-share-widget');
  var initialOffset = $widget.offset().top;

  $(window).scroll(function() {
    var currentOffset = $widget.offset().top;
    var scrollDistance = currentOffset - initialOffset;

    $widget.css('top', (50 + scrollDistance) + '%');
  });
});
/*tally form embed*/
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.tallyforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://tally.so/embed/' + id ,
                css: css
            })
        );
    });
});
/*Open Roblox Game using URI*/
$(function() {
    function openRobloxLink() {
        var link = "roblox://placeId=7396774756";
        window.open(link, "_self");

        mw.hook("dev.toasts").add(function(toasts) {
            var toastMessage = "Game Launched!";
            toasts.success(toastMessage);
        });
    }

    $('.play-defense').click(function() {
        openRobloxLink();
    });
});
/*right rail module*/
window.AddRailModule = [{prepend: true}];

/* Arenaversary Badge Charts*/

mw.loader.using('jquery', function() {
    $(document).ready(function() {
        // Select the span with the specific ID ArenaversaryBadgeChart
        $('span#ArenaversaryBadgeChart').each(function() {
            // Create a new canvas element
            var canvas = $('<canvas width="400" height="200"></canvas>');
            // Replace the span with the canvas
            $(this).replaceWith(canvas);
            // Get the context of the canvas
            var ctx = canvas[0].getContext('2d');
            // Create the chart
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['2022', '2023', '2024'], // Years on the X-axis
                    datasets: [
                        {
                            label: 'Obtainments',
                            data: [9119, 6224, 1207, // Obtainments data points
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
                            borderColor: 'rgba(75, 192, 192, 1)', // Line color
                            borderWidth: 2, // Line thickness
                            fill: true, // Fill under the line
                            yAxisID: 'y', // Attach to the default y-axis
                        },
                        {
                            label: 'Win Rates',
                            data: [41.9, 24.25, 16.15], // Win Rates data points (in percentages)
                            backgroundColor: 'rgba(255, 159, 64, 0.2)', // Fill color for the second line
                            borderColor: 'rgba(255, 159, 64, 1)', // Line color for the second line
                            borderWidth: 2, // Line thickness
                            fill: true, // Fill under the line
                            yAxisID: 'y1', // Attach to a secondary y-axis
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            position: 'left', 
                            title: {
                                display: true,
                                text: 'Obtainments',
                            }
                        },
                        y1: {
                            beginAtZero: true,
                            position: 'right', 
                            title: {
                                display: true,
                                text: 'Win Rates (%)',
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%'; 
                                }
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Arenaversary Badge Statistics', 
                            font: {
                                size: 18 
                            }
                        }
                    }
                }
            });
        });
    });
});