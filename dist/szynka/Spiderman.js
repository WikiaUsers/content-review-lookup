document.write("<LINK REL=STYLESHEET TYPE='text/css' HREF='http://www.miastogier.pl/mod/Encyklopedia/style/licznik.css'>");document.write("<center><div class='cntr arial14 kolorGrey2 rogi5px bd1BROWN' style='background: #303644 url(https://images.wikia.nocookie.net/szynka013/pl/images/d/d4/SpidermenPremiera.png) no-repeat left center; width: 265px; text-shadow: 0px 0px 3px #000, 0px 0px 3px #000, 0px 0px 3px #000, 0px 0px 5px #000, 0px 0px 5px #000; background-size: cover; padding: 5px 10px; font-weight: bold; opacity: 0.7;'>Amerykańska premiera<br />„Spider-Man”!<div id='countbox313158' class='countbox'></div></div></center>");dateFuture313158 = new Date("July 28, 2017 18:00:00");
			function GetCount313158(ddate,iid){ dateNow = new Date(); amount = ddate.getTime() - dateNow.getTime(); delete dateNow; if(amount < 0){ document.getElementById(iid).innerHTML='Oczekuj!'; } else { days=0;hours=0;mins=0;secs=0;out=''; amount = Math.floor(amount/1000); days=Math.floor(amount/86400); amount=amount%86400; hours=Math.floor(amount/3600); amount=amount%3600; mins=Math.floor(amount/60); amount=amount%60; secs=Math.floor(amount); if(days != 0){out += '<b>'+ days +''+((days==1)?'dzień':'dni')+'</b>';} if(hours != 0){out += '<b>'+ hours +''+((hours==1)?'h':'h')+'</b>';} out += '<b>'+ mins +''+((mins==1)?'min':'min')+'</b>'; out += '<b>'+ secs +''+((secs==1)?'s':'s')+'</b>'; out = out.substr(0,out.length-1); document.getElementById(iid).innerHTML=out; setTimeout(function(){GetCount313158(ddate,iid)}, 1000); } } GetCount313158(dateFuture313158, 'countbox313158');