/* SCP-Türkçe Optimizasyonlu ve Kırmızı Link Destekli Wikiwalk Scripti */
$(function() {
    var pageName = mw.config.get('wgPageName');
    var pageTitle = mw.config.get('wgTitle');
        
    var excludedPages = [
        'Anasayfa', 'Ana_Sayfa', 'Main_Page', 'Kurallar', 
        'Seri_I', 'Seri_II', 'Seri_III', 'Seri_IV', 'Seri_V', 'Seri_VI', 
        'Seri_TR', 'Seri_TR_2', 'Hikayeler', 'Çıkar_Grupları', 'Kanonlar', 'Nasıl_SCP_Yazılır', 'SCP_Nesne_Sınıfları'
    ];
        
    if (excludedPages.indexOf(pageName) !== -1 || mw.config.get('wgNamespaceNumber') !== 0) {
        return;
    }
        
    var isTR = /-TR/i.test(pageTitle);
    var match = pageTitle.match(/SCP-(\d+)/i);
    var prevNum = 0;
    var nextNum = 1;
        
    if (match && match[1]) {
        var currentNum = parseInt(match[1], 10);
        prevNum = Math.max(0, currentNum - 1);
        nextNum = currentNum + 1;
    }
        
    var suffix = isTR ? "-TR" : "";
    var prevLinkText = "SCP-" + String(prevNum).padStart(3, '0') + suffix;
    var nextLinkText = "SCP-" + String(nextNum).padStart(3, '0') + suffix;
        
    var wikiwalkHTML = '<div class="footer-wikiwalk-wrapper">' +
                       '<div class="footer-wikiwalk-nav"><center>';
                       
    if (currentNum > 0) {
        wikiwalkHTML += '&lt;&lt;&nbsp;&nbsp;<a class="wikiwalk-link" id="wikiwalk-prev" href="/tr/wiki/' + prevLinkText + '">' + prevLinkText + '</a>&nbsp;&nbsp;| ';
    } else {
        wikiwalkHTML += '&lt;&lt;&nbsp;&nbsp;<span class="wikiwalk-disabled">' + prevLinkText + '</span>&nbsp;&nbsp;| ';
    }
    
    wikiwalkHTML += pageTitle + ' |&nbsp;&nbsp;<a class="wikiwalk-link" id="wikiwalk-next" href="/tr/wiki/' + nextLinkText + '">' + nextLinkText + '</a>&nbsp;&nbsp;&gt;&gt;' +
                       '</center></div></div>';
                           
    if ($('.page-content').length) {
        $('.page-content').append(wikiwalkHTML);
    } else {
        $('#content').append(wikiwalkHTML);
    }

    // Tek istekte (Batch) her iki sayfayı kontrol edip olmayanları kırmızı yapar
    var titlesToCheck = prevLinkText + '|' + nextLinkText;
    $.getJSON(mw.util.wikiScript('api') + '?action=query&titles=' + encodeURIComponent(titlesToCheck) + '&format=json', function(data) {
        if (data && data.query && data.query.pages) {
            var pages = data.query.pages;
            for (var pageId in pages) {
                if (pages.hasOwnProperty(pageId)) {
                    var pTitle = pages[pageId].title;
                    var isMissing = (pageId < 0 || pages[pageId].missing !== undefined);
                    
                    if (isMissing) {
                        if (pTitle === prevLinkText) {
                            $('#wikiwalk-prev').addClass('new');
                        }
                        if (pTitle === nextLinkText) {
                            $('#wikiwalk-next').addClass('new');
                        }
                    }
                }
            }
        }
    });
});