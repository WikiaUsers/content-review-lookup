/* Any JavaScript here will be loaded for all users on every page load. */

var tooltips_list = [
   {
       classname: 'plants-tooltip',
       parse: '{'+'{TooltipP|<#name#>}}',
   }
];

// auto-loop .webM videos inside class="webm-loop" to make them behave like GIFs
mw.hook('wikipage.content').add($content =>
    $content.find('.webm-loop video, video.webm-loop')
        .prop('loop', true)
        .prop('muted', true)
        .prop('autoplay', true)
        .prop('controls', false)
        .trigger('play')
);