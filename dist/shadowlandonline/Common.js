/* MediaWiki:Common.js */
try
{
	/* Any JavaScript here will be loaded for all users on every page load. */
	var tooltip=function()
	{
		var id = 'tooltip_mouseover';
		var top = 3;
		var left = 15;
		var speed = 10;
		var timer = 20;
		var endalpha = 98;
		var alpha = 0;
		var tt,h;
		var ie = document.all ? true : false;
		var ttArray = new Array();
		var ttArrayWidths = new Array();
		var current_article;
		return{
			create:function(v, w)
			{
				if(tt == null)
				{
					tt = document.createElement('div');
					tt.setAttribute('id',id);
					document.body.appendChild(tt);
					tt.style.opacity = 0;
					tt.style.position = 'absolute';
					tt.style.zIndex = 100;
					tt.style.border = '2px solid #000000';
					tt.style.backgroundColor = '#000000';
					tt.style.filter = 'alpha(opacity=0)';
					document.onmousemove = this.pos;
				}
				tt.style.display = 'block';
				tt.innerHTML = v;
				tt.style.width = w ? w : 'auto';
				h = parseInt(tt.offsetHeight) + top;
				clearInterval(tt.timer);
				tt.timer = setInterval(function(){tooltip.fade(1)},timer);
			},
			pos:function(e)
			{
				var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
				var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
				tt.style.top = (u-h) + 'px';
				tt.style.left = (l + left) + 'px';
			},
			fade:function(d)
			{
				var a = alpha;
				if((a != endalpha && d == 1) || (a != 0 && d == -1))
				{
					var i = speed;
					if(endalpha - a < speed && d == 1)
					{
						i = endalpha - a;
					}else if(alpha < speed && d == -1)
					{
						i = a;
					}
					alpha = a + (i * d);
					tt.style.opacity = alpha * .01;
					tt.style.filter = 'alpha(opacity=' + alpha + ')';
				}else
				{
					clearInterval(tt.timer);
					if(d == -1){tt.style.display = 'none'}
				}
			},
			hide:function()
			{
				if (tt != null) 
				{
					clearInterval(tt.timer);
					tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
				}
			},
			show:function(article, maxwidth)
			{
				current_article = article;
				if (ttArray[article] == null) 
				{
					ttArrayWidths[article] = maxwidth;
					tooltip.create('Retrieving information...', maxwidth);
					if (tooltip.access(article) == false) 
					{
						tt.innerHTML = 'Sorry, your browser is not compatible with tooltips.';
					}
				} 
				else 
				{
					tooltip.create(ttArray[article], ttArrayWidths[article]);
				}
			},
			update:function(httpRequest,article) 
			{
				if (httpRequest.readyState == 4) 
				{
					if (httpRequest.status == 200) 
					{
						if (tt != null && current_article == article) 
						{
							var searchStr = new RegExp('Click here to start this page!');
							if ((httpRequest.responseText).search(searchStr) != -1) 
							{
								tt.innerHTML = 'This article does not yet exist.';
							} 
							else 
							{
								searchStr = '<span id="tooltipstart"></span>';
								var startPoint = (httpRequest.responseText).indexOf(searchStr) + searchStr.length;
								if (startPoint != -1) 
								{
									var endPoint = (httpRequest.responseText).lastIndexOf('<span id="tooltipend"></span>');
									if (endPoint != -1)
									{
										tt.innerHTML = (httpRequest.responseText).substr(startPoint,endPoint-startPoint);
										ttArray[article] = tt.innerHTML;
										return;
									}
								}
								tt.innerHTML = 'This article does not yet have a properly formatted tooltip.';
							}
						}
						h = parseInt(tt.offsetHeight) + top;
					} 
					else 
					{
						if (tt != null) 
						{
							tt.innerHTML = 'Could not retrieve information.';
						}
					}
				}
			},
			access:function(article) 
			{
				var httpRequest;
				if (window.XMLHttpRequest) 
				{
					httpRequest = new XMLHttpRequest();
					if (httpRequest.overrideMimeType) 
					{
						httpRequest.overrideMimeType('text/xml');
					}
				}
				else if (window.ActiveXObject) 
				{
					try 
					{
						httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
					}
					catch (e) 
					{
						try 
						{
							httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
						}
						catch (e) {}
					}
				}
				if (!httpRequest) 
				{
					// Browser incompatible with AJAX
					return false;
				}
				httpRequest.onreadystatechange = function() 
				{ 
					tooltip.update(httpRequest,article); 
				};
				httpRequest.open('GET', 'http://shadowlandonline.wikia.com/index.php?action=render&title='+article+'&templates=expand', true);
				httpRequest.send();
			}
		};
	}();
	/* Check for tooltip links when document finishes loading */
	function mouseoverTooltip(article, maxwidth) {
		return function() 
		{
			article = article.replace(".27","'");
			tooltip.show(article, maxwidth);
		};
	}
	function putTooltips()
	{
		var spanArray = document.getElementsByTagName("span");
		for (var i=0 ; i<spanArray.length ; i++)
		{
			if (spanArray[i].className == "tooltip_link") 
			{
				var article = (spanArray[i].id).substr(3);
				spanArray[i].onmouseover = mouseoverTooltip(article, spanArray[i].style.maxWidth);
				spanArray[i].onmouseout = function(){ tooltip.hide() };
				// Change link inside to mouseover link style
				var tlink = spanArray[i].getElementsByTagName("a");
				if (tlink[0] && tlink[0].className != "new")
				{
					tlink[0].title = "";
                                        tlink[0].style.color = spanArray[i].style.color;
				}
			}
		}
	}
	if (window.addEventListener)
		window.addEventListener("load", putTooltips, false);
	else if (window.attachEvent)
		window.attachEvent("onload", putTooltips);
	else if (document.getElementById)
		window.onload=putTooltips();
}
catch(err) 
{
	window._customJSerror = err;
}

importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});