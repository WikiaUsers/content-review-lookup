/* Any JavaScript here will be loaded for all users on every page load. */

/* Embedding timezones */
var url = 'http://free.timeanddate.com/clock/i5e6su25/';
var settings = '/fs20/fcffa811/tct/pct/tt0/tw0/tm1/td2/th1/tb1';
var iframe = '<iframe frameborder=0 width=265 height=25 allowTransparency=true src="' + url;
 
pdt = iframe + 'n137' + settings;
est = iframe + 'n250' + settings;
cest = iframe + 'n48' + settings;
msk = iframe + 'n1927' + settings;
jst = iframe + 'n248' + settings;
pht = iframe + 'n1982' + settings;
wib = iframe + 'n108' + settings;
ict = iframe + 'n28' + settings;
 
$('#pdt').append(pdt + '"></iframe>');
$('#est').append(est + '"></iframe>');
$('#cest').append(cest + '"></iframe>');
$('#msk').append(msk + '"></iframe>');
$('#jst').append(jst + '"></iframe>');
$('#pht').append(pht + '"></iframe>');
$('#wib').append(wib + '"></iframe>');
$('#ict').append(ict + '"></iframe>');