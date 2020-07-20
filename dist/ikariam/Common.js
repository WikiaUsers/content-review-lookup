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

// Global Tooltip customization
$(document).ready(function()
{
	mw.hook('wikipage.content').add(function($content)
	{
		$('[title], .ikariam-tooltip').hover(function(e)
		{
			var txt = '';
			var title = $(this).attr('title');
			if(title&&title!=='')
			{
				if(!$(this).hasClass('ikariam-tooltip')){$(this).addClass('ikariam-tooltip');}
				$(this).attr('data-tooltip',title);
			}
			var dtip = $(this).attr('data-tooltip');
			txt = dtip&&dtip!==''?dtip:'';
			if($(this).parents('.tabber').length === 0)
			{
				$(this).removeAttr('title');
			}
			$('<div id="ikariam-tooltip-content" class="WikiaArticle" style="border:1px solid #F1D031;color:#444;background:#fbeecb;box-shadow:0 2px 2px #999;position:absolute;padding:2px;text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;z-index:6000000;margin:0px;min-height:0px;overflow:hidden;font-size:14px;display:none"></div>').html(txt).appendTo('body');
			$('#ikariam-tooltip-content').css('display','inline-block').fadeIn('fast');
		},function()
		{
			$('#ikariam-tooltip-content').remove();
		}).mousemove(function(e)
		{
			var o = 10;
			var cX = e.pageX;
			var cY = e.pageY;
			var wW = $(window).width();
			var wH = $(window).height();
			var t = $('#ikariam-tooltip-content');
			var tW = t.width()+parseInt(t.css('padding-left'))+parseInt(t.css('padding-right'));
			var tH = t.height()+parseInt(t.css('padding-top'))+parseInt(t.css('padding-bottom'));
			var tL = cX+o;
			if(tL+tW>$(window).scrollLeft()+wW) { tL = $(window).scrollLeft()+wW-tW*2; }
			else if(tL-tW<$(window).scrollLeft()) { tL = $(window).scrollLeft()+tW; }
			var tT = cY+o;
			if(tT+tH>$(window).scrollTop()+wH) { tT = $(window).scrollTop()+wH-tH; }
			else if(tT-tH<$(window).scrollTop()) { tT = $(window).scrollTop(); }
			$('#ikariam-tooltip-content').css({'top':tT+'px','left':tL+'px'});
		});
	});
});

/*******************************************************************************
** "Hidden appearances section/interactive tree" script; by [[User:Bp]]
** Required functions outside of ".ready" portion
*******************************************************************************/
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