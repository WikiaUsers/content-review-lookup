//
// Any JavaScript here will be loaded for all users on every page load.
// A lot of this code has been taken from other Wikis, which follow the same copyright laws
//

 // Load the UserTags-Settings.js file
 importArticle({
     type: "script",
     article: "UserTags-Settings.js"
 });
 
 // MassCategories settings
 window.MassCategorizationGroups = ['sysop', 'content-moderator'];
 
 // RevealAnonIP settings -- MUST be before the script is imported
window.RevealAnonIP =
{
	permissions : ['rollback', 'sysop', 'bureaucrat']
};

// AjaxRC settings
ajaxPages =
[
	'Special:RecentChanges',
	'Special:Watchlist',
	'Special:Log',
	'Special:Contributions'
];

// FloatingTOC settings
window.FloatingToc =
{
	speed: 500,
	auto: false,
	enableKey: true
};

// Tooltips settings
var tooltips_config =
{
	offsetX: 0,
	offsetY: 0,
	waitForImages: true,
//	events: ['CustomEvent'],
	noCSS: false,
};
var tooltips_list =
[
	{
		classname: 'basic-tooltip',
		delay: 500,
		onHide: function(handle) { $(this).html($(handle).html()) },
	},
];

//
// "Hidden appearances section/interactive tree" script; by User:Bp
//

function toggleAppearancesPane(eid)
{
	e = document.getElementById(eid);
	if(e)
	{
		e.className = e.className == 'hiddenlist' ? 'visiblelist' : 'hiddenlist';
	}
}

function showAppearancesPane(eid)
{
	e = document.getElementById(eid);
	if(e)
	{
		e.className = 'visiblelist';
	}
}

function hideAppearancesPane(eid)
{
	e = document.getElementById(eid);
	if(e)
	{
		e.className = 'hiddenlist';
	}
}

$(document).ready(function()
{
	var tree = 0;
	var pane = 0;
	var paneListForThisTree = [];
	var descriptionString = 'This list contains %d items';
	var smallTreeCount = 4;
	var interactiveTrees = 1;
	function button(text,onclick,cls)
	{
		var b = document.createElement('a');
		b.innerHTML = text;
		b.href = 'javascript:'+onclick;
		b.className = cls;
		return b;
	}
	
	function recursiveCountAndMark(e,depth,nocount)
	{
		var si = e.firstChild;
		var total = 0;
		while(si)
		{
			var tn = si.tagName ? si.tagName.toLowerCase() : '';
			if(tn=='li')
			{
				total++;
			}
			var subtotal = recursiveCountAndMark(si,depth+1,nocount);
			if(tn=='ul' || tn=='ol')
			{
				if(depth>1)
				{
					si.id = 'Pane'+(pane++);
					paneListForThisTree.push(si.id);
					si.className = 'hiddenlist';
					si.parentNode.insertBefore(document.createTextNode('('),si);
					si.parentNode.insertBefore(button(nocount?'+/-':subtotal,'toggleAppearancesPane("'+si.id+'")','listexpand'),si);
					si.parentNode.insertBefore(document.createTextNode(')'),si);
					total--;
				}
				else
				{
					if(subtotal<smallTreeCount)
					{
						for(var i=0;i<paneListForThisTree.length;i++)
						{
							toggleAppearancesPane(paneListForThisTree[i]);
						}
					}
					var allonexec = '{';
					var alloffexec = '{';
					for(i=0;i<paneListForThisTree.length;i++)
					{
						allonexec += 'showAppearancesPane("'+paneListForThisTree[i]+'"); ';
						alloffexec += 'hideAppearancesPane("'+paneListForThisTree[i]+'"); ';
					}
					allonexec += '}'; alloffexec += '}';
					var ds = nocount ? '' : descriptionString.replace(/\%d/g,subtotal);
					si.parentNode.insertBefore(document.createTextNode(ds+' ('),si);
					si.parentNode.insertBefore(button('show all',allonexec,'listexpand'),si);
					si.parentNode.insertBefore(document.createTextNode(' • '), si);
					si.parentNode.insertBefore(button('hide all',alloffexec,'listexpand'),si);
					si.parentNode.insertBefore(document.createTextNode(')'),si);
				}
			}
			total += subtotal;
			si = si.nextSibling;
		}
		return total;
	}
	
	function doAppearancesTrees()
	{
		if(!interactiveTrees)
		{
			return;
		}
		var divs = document.getElementsByTagName('div');
		for(var i=0;i<divs.length;i++)
		{
			if(divs[i].className.match(/\bappear\b/))
			{
				recursiveCountAndMark(divs[i],0,(divs[i].className.match(/\bnocount\b/)) ? 1 : 0);
				paneListForThisTree = new Array();
				tree++;
			}
		}
		if(window.location.hash && tree > 0)
		{
			if(navigator.userAgent.indexOf('MSIE')!=-1)
			{
				window.location = window.location.hash;
			}
			else
			{
				window.location.hash = window.location.hash;
			}
		}
	}
	
	hookEvent('load',doAppearancesTrees);
});

//
// Tool-tips script by User:Panos78
//

function NumToStr(inputNum,outputSign,precision)
{
	var tho = lg[lang].tho;
	var dec = lg[lang].dec;
	var p = Math.abs(inputNum).toString().split('.');
	var num = parseFloat(parseInt(p[0]).toString()+(precision!==undefined ? '.'+parseFloat(p[1]!==undefined ? '0.'+p[1]: 0).toFixed(precision).split('.')[1]:''));
	var sgn = num===0?'':Math.sign(inputNum)==-1?'-':'+';
	return (outputSign || sgn=='-' ? sgn : '')+(precision===undefined && num===0 ? '' : parseInt(p[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g,tho))+(precision!==undefined && precision>0 ? dec+parseFloat(p[1]!==undefined ? '0.'+p[1]: 0).toFixed(precision).split('.')[1] : '');
}

function img(i,t,a,c,w,h,l)
{
	var s = ' style="width:'+(w&&w!==''?w+'px':'auto')+';height:'+(h&&h!==''?h+'px':'auto')+'"';
	var p = i&&i!==''?'<img src="https://ikariam.fandom.com/el/wiki/Special:Filepath/'+i+'"'+(t&&t!==''?' data-tooltip="'+t+'"':'')+(' alt="'+(a&&a!==''?a:i.replace('_',' '))+'"')+(c&&c!==''?' class="'+c+' ikariam-tooltip"':'')+' data-image-key="'+i+'" data-image-name="'+i.replace('_',' ')+'"'+s+'>':'';
	return (l&&l!==''?'<a href="'+(l!==''?l:'/el/wiki/Special:Filepath/'+i)+'">':'')+p+(l&&l!==''?'</a>':'');
}

function icon(r,w,h)
{
	var res = ['wood_small.gif','wine_small.gif','marble_small.gif','crystal_small.gif','sulphur_small.gif','ambrosia.png','gold_small.gif','icon_citizen.gif'];
	var rel = ['ξύλο','κρασί','μάρμαρο','kρύσταλλο','Θείο','Αμβροσία','Χρυσός','Πολίτης'];
	return img(res[r][0].toUpperCase()+res[r].slice(1),rel[r][0].toUpperCase()+rel[r].slice(1),rel[r][0].toUpperCase()+rel[r].slice(1),'image image-thumbnail link-internal',w?w:25,h?h:20,'/el/wiki/'+rel[r][0].toUpperCase()+rel[r].slice(1));
}

function mul(p)
{
	p = parseInt(p);
	switch(true)
	{
		case (p >= 1 && p <= 5):
			return 3-0.25*p;
		case (p >= 6 && p <= 10):
			return 2.25-0.125*p;
		case (p >= 11 && p <= 20):
			return 0.875;
		case (p >= 21 && p <= 30):
			return 0.75;
		case (p >= 31 && p <= 50):
			return 0.5;
		case (p >= 51 || p <= 0):
			return 0;
	}
}

function calc(rank,townhall,level,type)
{
	var rk = !isNaN(parseInt(rank))?parseInt(rank):0;
	var tw = townhall?true:false;
	var lv = !isNaN(parseInt(level))?parseInt(level):0;
	var types = ['safe','resource','rsum'];
	var tp = types.indexOf(type);
	var cf = tp==-1?0:(tp<2?1:(tp==2?5:(tp==3?12:0)));
	return ((tw?100:0)+lv*480)*(tp>=1?mul(rk):1)*(tp==2?5:1);
}

function translate(lang)
{
	var arr = ['citytitle','citynum','wlvls','safeqnty','safewoodqnty','safewineqnty','safemarbleqnty','safecrystalqnty','safesulfurqnty','safesumqnty','sum','townsum','levelsum','safesum','woodsum','winesum','marblesum','glasssum','sulfursum','resqntysum'];
	$('#flags > img').each(function(x,i) { $(i).css({'cursor':'pointer','opacity':'1.0'}); });
	$('[id="'+lang+'"]').css({'cursor':'default','opacity':'0.5'});
	$('#rank').before(lg[lang].rnklbl+': ');
	$('#rewardtable > thead > tr:first > th').contents().first().each(function(){$(this).replaceWith(lg[lang].rcvdres)});
	$('#rank_v').text(NumToStr(mul($('#rank').val()),false,3).replace(/0+$/,'').replace(/[,.]$/,''));
	$('#rewardtable > thead > tr:last > th:first').attr('title',lg[lang].citytitle).text(lg[lang].city);
	$('#rewardtable > thead > tr:last > th').each(function(k,th)
	{
		$(th).attr('title',lg[lang][arr[k]]);
		switch(k)
		{
			case 0:
				$(th).text(lg[lang].city);
				break;
			case $('#rewardtable > thead > tr:last > th').length-1:
				$(th).text(lg[lang].sum);
				break;
		}
	});
	
	$('#rewardtable > tfoot > tr > th').each(function(k,th)
	{
		switch(k)
		{
			case 0:
				$(th).text(lg[lang].sum);
				break;
			default:
				$(th).attr('title',lg[lang][arr[k+10]]);
				break;
		}
	});
	
	$('#townsum').text($('input[id^="town"]:checked').length);
	var lsum = 0;
	var sfsum = 0;
	var ressum = 0;
	$('input[id^="town"]:checked').each(function()
	{
		$(this).parents('tr').css('opacity','1.0').find('input[type="number"]').prop('disabled',false);
		var lv = parseInt($(this).parents('tr').find('input[type="number"]').val());
		lsum += lv;
		sfsum += calc($('#rank').val(),true,lv,'safe');
		$(this).parents('tr').find('td[id^="safe"]').text(NumToStr(calc($('#rank').val(),true,lv,'safe'),false,0));
		$(this).parents('tr').find('td[id^="wood"],td[id^="wine"],td[id^="marble"],td[id^="glass"],td[id^="sulfur"]').text(NumToStr(calc($('#rank').val(),true,lv,'resource'),false,0));
		ressum += calc($('#rank').val(),true,lv,'resource');
		$(this).parents('tr').find('td[id^="citysum"]').text(NumToStr(calc($('#rank').val(),true,lv,'rsum'),false,0));
	});
	
	$('input[id^="town"]:not(:checked)').each(function()
	{
		$(this).parents('tr').css('opacity','0.5').find('input[type="number"]').prop('disabled',true).val(0).parents('tr').find('td:gt(2)').text('0');
	});
	
	$('#levelsum').text(NumToStr(lsum,false,0));
	$('#safesum').text(NumToStr(sfsum,false,0));
	$('#woodsum,#winesum,#marblesum,#glasssum,#sulfursum').text(NumToStr(ressum,false,0));
	$('#sum').text(NumToStr(ressum*5,false,0));
}
var lang = 'en';
var lg = {
		en: {
			flag: 'R0lGODlhGgASAPcAAMwKBMyGdMRSPOzGtAQOTPTi1ISGpERKdOTi7MQ+RNSmtKwqJCQqZGxqjPT27MxqVLQ6LMTC1LyinMxudKSmvOTq7LxaZNSapDQ6bNTS3BQeVLwyLMy2xOTq9IyGnJyWrIx6jPT2/Mx6ZMReVAwWVPTq5CwyZLxGNOSmjNR+hNza5KwaFFRahPz69LQ+PKyuxPTq7LQyNLSOjLxOVPTWxPTi5ISOrLyytLwqLPTy9MQ6LMzK1MxibDxCdOzS3Hx6nNR+bCw2bOSenNQaFMSuxMSSjOTGzAQSTExSfPTm7LRGTLwuJHRylMRqbLw+LMx2fOzu7MxiXMSetDQ+dCQmXLw2LOS6xPTu9JyivMR2bAwaVNR+jOS2pPT29MzK3NQmHNSOfNROPPTi3IyGpERKfOTm7LxCTLQqJCQuZGxulMxyXLw6LNSilMxufOzq7MRaZNyapDw+bNTW5BwiXMQyLLy+zOzu9JyarIR6lPz6/NR6ZMxmTPTu5DQ2ZOSmlNze5FxijNSKlNSWnJySrISCnNQmJLSyxOyinOy6pPTu7PTm5OzW3MSyxOTKzNSCjLwyNMROVNTK1DQ2bAwSTBQaVPz29AAAAAAAAJhKAOHTABIAAAAAADR0AADjAAASAMAAAJyFAPcrABKDAAB8ABgAaO4AnpEAgHwAfHAA/wUA/5IA/3wA//8AYP8Anv8AgP8AfG0ADwUBAJIAAHwAAErpD/QrAICDAHx8AACYAADj8BUSEgAAAADE/wAr/wCD/wB8/3AAADwAABUAAAAAAABQoAH25AAXEgAAAAA09gBkWACDTAB8AFf/gPT/5ID/Enz/AIScd+PkMBISTwAAAHBttDxk5BWDEgB8AAA0NABMZABPgwAAfF4gO+NV5RJPEgAAAAEA7wAB/wAA/wAAf8CYLOLj5RISEgAAAOYAUKYB9gEAFwAAAAWINABkZACDgwB8fPABUOEA9hIAFwAAAAMASgAw0wAwAAAAANj4AOKWABIXAABEABgAze4A/5EAR3wAACH5BAAAAAAALAAAAAAaABIABwj/AJvAcGCAEoGDBxkcAgBACBqEB+d8SLEigAAXRvLU6QMRzUIAhxggnHSAAyQdA7owAXMmUI4ODUgk/Hjo4aRJY+AsUVNCDhkCPSScmOGjywsqBDwyDEkAAxEeSxBVwjIHoQZCIhbAqfSHhVKQkggpePSgQAdACClR0kKJBZs1ExJVMiRkaSRHG/w48BJHixYSlMogKJMEQY5EYnLkyUOzkpgSLfJc+VNGUZkyhTJr3lxoCMMhnEMzHE26tOnTqFOj/lKItWvWmT0DGPK6dWvXCChTLrM4h6IcNHvDyFEhdxnKJNhqofIhhBElI27UBZkhj5gRbzj0AAwYYY8dXQQtacjSwMRHIZJsHAby6AJahCR+uKlhAYIMDAQULn2IREULLnS0MUhVfdSRhxUxqIGHQfnRJBIBc1AQQgF7JCBFHG5c8QQERRwAkX4gPXTQJICUUQkKS2yxiBl7gFBVRzSJiBAaL+RBQxgBAQA7',
			tho: ',',
			dec: '.',
			rnklbl: 'Select your current position in the piracy highscore list',
			rcvdres: 'Resources you can receive with piracy',
			city: 'City',
			citytitle: '# of cities',
			citynum: 'Select the number of cities you own',
			wlvls: 'Set the sum of your warehouse levels',
			safeqnty: 'Safe resource quantity per city',
			safewoodqnty: 'Safe wood quantity per city',
			safewineqnty: 'Safe wine quantity per city',
			safemarbleqnty: 'Safe marble quantity per city',
			safecrystalqnty: 'Safe crystal quantity per city',
			safesulfurqnty: 'Safe sulfur quantity per city',
			safesumqnty: 'Sum of Safe resource quantity per city',
			sum: 'Sum',
			townsum: 'Total number of cities',
			levelsum: 'Total number of warehouse levels',
			safesum: 'Total safe resources quantity',
			woodsum: 'Total wood quantity',
			winesum: 'Total wine quantity',
			marblesum: 'Total marble quantity',
			glasssum: 'Total crystal quantity',
			sulfursum: 'Total sulfur quantity',
			resqntysum: 'Total resources quantity',
		}
	};
$(document).ready(function()
{
	mw.hook('wikipage.content').add(function($content)
	{
		try
		{
			if($('#firstHeading').text()=='Pirate Fortress')
			{
				$('#rewardscalc').html('<form><label for="rank"><input type="number" id="rank" name="rank" min="1" max="50" value="1" step="1" style="width:35px"></label></form><table id="rewardtable" class="darktable zebra" style="display:inline;color:#000;font-weight:normal;font-size:11px;background-color:transparent;border:0px;overflow:auto"><thead><tr><th colspan="10" style="text-align:center">Υλικά που μπορούν να ληφθούν με την πειρατεία<div style="font-weight:normal">(<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC"> × <span id="rank_v">2,75</span> = '+icon(0,13,10)+'+<img src="data:image/gif;base64,R0lGODlhGgAUAPZ9AA8KCScZFjY2FjslJFMzM0VAG3pIC0xzC15KNzNedXNIR2tWQnRgTXtoVYdUD5dlFaNyHIteK61+IolSUp5cXYFuW4VzYYh2Y415ZI58abRqasV4dlyJD2ibEHOtEnuPNHSlILeLLYWrN8qfNIfIFbuXXZOBbZmHdbGafMGWQdStQuG8Tc6sbd++YKHKT+3KU+/QbPXVY+zPefPWeEWGpV2TrE+Ut2ees2OrzmqszXqyzW2y1G+53ny20nK323a63Hu/4X/A4aCQgKqbi7mihbSnmIyoqZmuq5OytqWxpa2zpL+0pLu+q8qvidW4jNy+lMS7oMS5q7vHvePGi/XahejIl+XHnebInO/anv7kg9jEqNbKrM3Cs8LKvtPKvOzPpenRrfXlvYzA15TD2ITD4onH5o3J5pPK5JvN5ZXN6JbQ7qLQ5qTT667Z7bTa7Lrd7Lvh8s3QwcnUzc/YztvSxOXayenj2crg5s7p9tLr99bu+PXw6Pz37wAAAAAAAAAAACH5BAUAAH0ALAAAAAAaABQAAAf/gH2Cg3ZCKIOIfU4HHCBOiYhLdg0ZF02QHYwgLpCCWl51CxcNFZBEHIxEnWBeXEN2GA0NiU4EAQUHHR2QdEtFXnsNJhlPg04UAxMbAh0cHom9dkV7CycnJn1XA8kbEwAfzh0kglZ2UXVeXnYIGRXYVxrdAQEEJBwdHs9WdF4ZGSdR1jGoMMvJAAIEAGygkAvfLi+9KDGwQAcBAgYM+kwgoEyBggFONnAgsatTJydOFDwaRISECEhVXpQwSRMSFRgwSlQxuSVOzTAxwoSAEKHTER9l5pjkIwNLFhgPHjiYIojJGSlGyASpkQTSlykzZsQYkcLACgOCkKQx08MHkARyZhLxwTJjxIoXD1ZAkOBAkJI3QH6MoaFDDaK5VFqEqPtAxQoHDwbdYIMjjRs8QLoMwtIiRYgYKiQ8SPFCtCAoZ3LsgIMGTh4eg6pMqTLjRQoJLFjAUIFWkA0xevq0WdOmx52ayDsFAgA7" style="width:auto;height:10px">)</div></th></tr><tr><th style="text-align:center" title="Αύξων αριθμός πόλης">Πόλη</th><th style="text-align:center" title="Επιλέξτε τον αριθμό των πόλεων που έχετε">'+img('Δημαρχείο.png','','','image',15,15,'Δημαρχείο')+'</th><th style="text-align:center" title="Ορίστε το σύνολο των επιπέδων των αποθηκών σας">'+img('Αποθήκη Εμπορευμάτων.png','','','image',15,15,'Αποθήκη Εμπορευμάτων')+'</th><th style="text-align:center" title="Ασφαλής ποσότητα υλικών ανά πόλη"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC" style="width:auto;height:15px"></th><th style="text-align:center" title="Ασφαλής ποσότητα ξύλου ανά πόλη">'+icon(0,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα κρασιού ανά πόλη">'+icon(1,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα μαρμάρου ανά πόλη">'+icon(2,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα κρύσταλλου ανά πόλη">'+icon(3,20,15)+'</th><th style="text-align:center" title="Ασφαλής ποσότητα θείου ανά πόλη">'+icon(4,20,15)+'</th><th style="text-align:center" title="Συνολική ασφαλής ποσότητα υλικών ανά πόλη">Σύνολο</th></tr></thead><tbody></tbody><tfoot><tr><th style="text-align:center;width:40px">Σύνολο</th><th id="townsum" style="text-align:center" title="Συνολικός αριθμός πόλεων">0</th><th id="levelsum" style="text-align:center" title="Συνολικός αριθμός επιπέδων αποθηκών">0</th><th id="safesum" style="text-align:center" title="Συνολική ασφαλής ποσότητα υλικών">0</th><th id="woodsum" style="text-align:center" title="Συνολική ποσότητα ξύλου">0</th><th id="winesum" style="text-align:center" title="Συνολική ποσότητα κρασιού">0</th><th id="marblesum" style="text-align:center" title="Συνολική ποσότητα μαρμάρου">0</th><th id="glasssum" style="text-align:center" title="Συνολική ποσότητα κρύσταλλου">0</th><th id="sulfursum" style="text-align:center" title="Συνολική ποσότητα θείου">0</th><th id="sum" style="text-align:center" title="Συνολική ποσότητα υλικών">0</th></tr></tfoot></table>');
				var res = ['wood','wine','marble','glass','sulfur'];
				var bd = '';
				for(var y=0;y<12;y++)
				{
					bd += '<tr style="opacity:0.5"><td>'+(y+1)+'</td><td style="text-align:center"><label for="town'+y+'"><input type="checkbox" id="town'+y+'" name="town'+y+'"></label></td><td><label for="level'+y+'"><input type="number" id="level'+y+'" name="level'+y+'" min="0" max="160" value="0" step="1" style="width:40px" disabled></label></td><td id="safe'+y+'" style="width:45px">0</td>';
					$.each(res,function(k,r)
					{
						bd += '<td id="'+r+y+'" style="width:54px">0</td>';
					});
					bd += '<td id="citysum'+y+'" style="width:61px">0</td></tr>';
				}
				$('#rewardtable tbody').append(bd);
				$('#rewardtable').find('th').css({'border':'1px solid black','text-align':'center','padding':'2px','font-weight':'bold'});
				$('#rewardtable').find('td').css({'border':'1px solid black','text-align':'center','padding':'2px'});
				$('#rewardtable').find('tr > td:nth-child(2)').css({'text-align':'left'});
				translate(lang);
				$('#rank,input[id^="town"],input[id^="level"]').on('change input',function()
				{
					$('#rank').parent().contents().first().each(function(){$(this).replaceWith('')});
					translate(lang);
				});
			}
		}
		catch(e)
		{
			console.log(e);
		}
	});
});