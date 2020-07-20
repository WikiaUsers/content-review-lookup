fixGallery();

function fixGallery() {
    var maxD=120;
    var spans=document.evaluate('//span[@class="wikia-gallery-item"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<spans.snapshotLength;i++) {
        var s = spans.snapshotItem(i);
        var d1 = s.firstChild;
        if (d1) {
            var d2 = d1.firstChild;
            if (d2) {
                var a = d2.firstChild;
                if (a) {
                    var curH = a.style.height.replace(/[^0-9]*/g,'');
                    var curW = a.style.width.replace(/[^0-9]*/g,'');
                    if (curH && curW) {
                        var ratio = curH/curW;
                        if(curW >= maxD && ratio <= 1){
                            curW = maxD;
                        } else if(curH >= maxD) {
                            curW = Math.floor(maxD / ratio);
                        }
                        s.style.width = maxD+'px';
                        d1.style.height = maxD+'px';
                        d2.style.height = maxD+'px';
                        d2.style.width = maxD+'px';
                        d2.style.top = '';
                        a.style.backgroundImage = a.style.backgroundImage.replace(/\/[0-9]*px-/i,'/'+curW+'px-');
                        a.style.height = maxD+'px';
                        a.style.width = maxD+'px';
                        var capt = d1.nextSibling;
                        if (capt) {
                            capt.style.width = maxD+'px';
                        }
                    }
                }
            }
        }
    }
}