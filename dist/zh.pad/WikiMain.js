var tc=0;

function maincheck() {

    if (document.getElementById("eventTimeLeft")!==null) {
        eventTimeLeft();
    } else {
        tc=tc+1;
        if(tc==10){
            return;
        }
        setTimeout(maincheck,1500);
        return;
    }
    
    if (document.getElementById("Now")!==null) {
        importArticles({
            type: "script",
            articles: ["MediaWiki:CurrentTime.js"]
        });
        textTip();
    } else {
        setTimeout(maincheck,1500);
        return;
    }
    
}

function textTipcheck() {
if ($("span").hasClass("TextTip")===true) {
    textTip();
    } else {
    tc=tc+1;
    if(tc==10){
        return;
    }
    setTimeout(textTipcheck,1500);
    return;
    }
}

setTimeout(maincheck, 2000);

$("a").click(function(){
    tc=0;
	setTimeout(textTipcheck, 1000);
});

$(window).load(function() {
    if ($("div").hasClass("paddn7")===true) {
        
        var ifr = document.createElement("iframe");
        ifr.id = "dn7ta";
        ifr.setAttribute("scrolling", "no");
  
        $("div.paddn7").append(ifr);
        
        
		var oIf = document.getElementById('dn7ta'),
			win = oIf.contentWindow,
			doc = win.document;
		
		doc.write('<html><head></head><body><script type="text/javascript" src="http://widget.pad.dnt7.com/widget/blog.fc2.left.t1.html" charset="utf-8"></sc' + 'ript><body></html>');
		
		if(doc.all) {
			var scArr = doc.getElementsByTagName('script'),
				oSc = scArr[scArr.length - 1];	
			_check();
			return;
			
			function _check() {
				var rs = oSc.readyState;
				if(rs == 'loaded' || rs == 'complete') {
					doc.close();
					_height();
					return;
				}
				
				setTimeout(_check, 100);
			}			
		}
		
		win.onload = _height;
		doc.write('<script> document.close(); </sc' + 'ript>');
		
		function _height() {
			oIf.style.height = doc.body.scrollHeight + 'px';
		}
    }
});