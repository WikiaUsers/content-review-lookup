var backgroundLayer1 = document.createElement('div');
var backgroundLayer2 = document.createElement('div');
var bg1Style = ['backgroundColor','backgroundImage','height','position','top','left','width','zIndex'];
var bg2Style = ['width','height','backgroundImage','backgroundPosition','backgroundRepeat','backgroundAttachment','backgroundSize','position', 'top', 'left', 'zIndex'];
var bg1StyleValue = ['"#b6f5ff"','"url(\'https://images.wikia.nocookie.net/__cb20140604124319/lps2012/images/9/92/Bg_bricks.jpg\')"','"100%"','"fixed"','"0"' ,'"0"' ,'"100%"' ,'"-10"'];
var bg2StyleValue = ['"100%"', '"1392px"', '"url(\'https://images.wikia.nocookie.net/__cb20140604124319/lps2012/images/e/e5/Lps_wikia_bg3.jpg\')"', '"center top"', '"no-repeat"', '"scroll"', '"auto auto"', '"absolute"', '"0"', '"0"', '"-1"'];

for (i=0; i < bg1Style.length; i++) {
eval('backgroundLayer1.style.' + bg1Style[i] + '=' + bg1StyleValue[i] +';');
}
for (i=0; i < bg2Style.length; i++) {
eval('backgroundLayer2.style.' + bg2Style[i] + '=' + bg2StyleValue[i] +';');
}
document.body.appendChild(backgroundLayer1);
document.body.appendChild(backgroundLayer2);