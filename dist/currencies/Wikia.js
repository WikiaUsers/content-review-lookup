//Imports

ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20111230181004/currencytest/images/d/de/Ajax-loader.gif';
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:NewFiles","Special:NewPages"];
importScriptPage('AjaxRC/code.js', 'dev');

!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

var dcf = 'GBP';
var dct = 'USD';
var c = 'yes';
var fc = '3A3A3A';
var lc = 'FFFFFF';
var bdr = '000000';
var mbg = 'FFFFFF';
var mbg2 = '014421';
var ac = '787878';
var ahc = 'B3B3B3';
var cfc = '350024';
var cbdc = '000000';
var cbgc = 'F0F0F0';
var ifc = 'E6E3DF';
var ibdc = '000000';
var ibgc = '524D4D';
var tz = 'userset';

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.currency-converter.org.uk/widget/CCUK-CC2-1.php';

$('#WikiaPage .WikiaPageContentWrapper').append('<table class="converterDynamic mw-collapsible mw-collapsed" style="margin:0em auto; border:1px solid #aaa;"><tbody><tr><th style="text-align:left; font-size:1.2em;">Converter</th></tr><tr><th><div style="width:248px;margin:0;padding:0;border:1px solid #000000;background:#FFFFFF;"><div style="width:248px;text-align:center;padding:2px 0px;background:#014421;font-family:arial;font-size:11px;color:#FFFFFF;font-weight:bold;vertical-align:middle;"><a style="color:#FFFFFF;text-decoration:none;text-transform:uppercase;" href="http://www.currency-converter.org.uk" target="_new" title="Currency Converter">Currency Converter</a></div><div style="padding:0px;" id="converterBody"><iframe src="http://www.currency-converter.org.uk/widget/CCUK-CC2-2.php?ws=http://www.currency-converter.org.uk/widgets/smart-currency-converter.html&amp;userhr=12&amp;os=6&amp;dcf=GBP&amp;dct=GBP&amp;ac=787878&amp;ahc=B3B3B3&amp;mbg2=014421&amp;lc=FFFFFF&amp;fc=3A3A3A&amp;ifc=E6E3DF&amp;ibdc=000000&amp;ibgc=524D4D&amp;cfc=350024&amp;cbdc=000000&amp;cbgc=F0F0F0&amp;mbg=FFFFFF&amp;bdr=000000&amp;c=yes&amp;tz=userset" width="248" height="100" frameborder="0" scrolling="no"></iframe></div></div></th></tr></tbody></table><table style="width:100%; text-align:center; border:1px solid darkgreen; vertical-align:middle;"><tr><td style="width:25%; font-weight:bold;">Social networking:</td><td style="width:25%;"><iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com/pages/Currency-Wiki/574975715846347&amp;layout=button_count&amp;show_faces=true&amp;width=450&amp;action=like&amp;colorscheme=light&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:20px;" allowTransparency="true"></iframe></td><td style="width:25%;"><iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/follow_button.html?screen_name=Currency_Wiki" style="width:235px; height:20px;"></iframe></td><td style="width:25%;"><a href="https://plus.google.com/communities/101894052007398391011"><img src="https://images.wikia.nocookie.net/__cb20130515221625/currencies/images/thumb/5/5c/Google_plus.svg/13px-Google_plus.svg.png"/> Google+</a></td>');
document.getElementById('converterBody').appendChild(script);

$('a[href="http://www.currency-converter.org.uk/widgets/smart-currency-converter.html"]').remove();