/* Any JavaScript here will be loaded for all users on every page load. */
$('ul.commentslikes li:first-child').after('<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script><a href="https://platform.twitter.com/widgets.js" class="twitter-share-button" data-count="horizontal" data-via="AppsWiki">Tweet</a>');

importScriptPage('MediaWiki:Common.js/BrowserSpecificCSS.js', 'legouniverse');

importScriptPage('MediaWiki:Common.js/UITest.js', 'lutest');

importScriptURI('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js');

$('.tilt').html('<style type="text/css">body{transform:rotate(3deg);-moz-transform:rotate(3deg);-ms-transform:rotate(3deg);-webkit-transform:rotate(3deg);-o-transform:rotate(3deg);}</style>');

importScriptPage('MediaWiki:Common.js/Other4.js', 'legouniverse');
importScriptPage('MediaWiki:Common.js/Other5.js', 'legouniverse');

importScriptPage('MediaWiki:Common.js/user.js', 'lutest');

importScriptPage('MediaWiki:Common.js/Countdown.js', 'legouniverse');

$('.blackblue').html('<style type="text/css">body{background-color:black; background-image: -ms-radial-gradient(left bottom, ellipse farthest-side, transparent 0%, transparent 75%, #4480B3 125%), -ms-radial-gradient(right top, ellipse farthest-corner, #000000 0%, #000000 80%, #4480B3 100%); background-image: -o-radial-gradient(left bottom, ellipse farthest-side, transparent 0%, transparent 75%, #4480B3 125%), -o-radial-gradient(right top, ellipse farthest-corner, #000000 0%, #000000 80%, #4480B3 100%); background-image: -webkit-gradient(radial, left bottom, 0, left bottom, 979, color-stop(0, transparent), color-stop(.75, transparent), color-stop(1.25, #4480B3)), -webkit-gradient(radial, right top, 0, right top, 1020, color-stop(0, #000000), color-stop(.8, #000000), color-stop(1, #4480B3)); background-image: -webkit-radial-gradient(left bottom, ellipse farthest-side, transparent 0%, transparent 75%, #4480B3 125%), -webkit-radial-gradient(right top, ellipse farthest-corner, #000000 0%, #000000 80%, #4480B3 100%); background-image: radial-gradient(left bottom, ellipse farthest-side, transparent 0%, transparent 75%, #4480B3 125%), radial-gradient(right top, ellipse farthest-corner, #000000 0%, #000000 80%, #4480B3 100%); background-image: -moz-radial-gradient(left bottom, ellipse farthest-side, transparent 0%, transparent 75%, #4480B3 125%), -moz-radial-gradient(right top, ellipse farthest-corner, #000000 0%, #000000 80%, #4480B3 100%);');

$('.180button').click(function(){$('.180').html('<style type="text/css">body{transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);}</style>');});