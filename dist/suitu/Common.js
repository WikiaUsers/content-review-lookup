(function () {
    function getOriginalUrl(url) {
        return url.replace(
            /(\.(?:png|jpe?g|gif|webp|svg))(?:\/[^?]*)?(\?.*)?$/i,
            '$1$2'
        );
    }

    function forceHighRes(img) {
        if (img.classList.contains('high-res-fixed')) return;

        var src = img.getAttribute('src') || '';
        var dataSrc = img.getAttribute('data-src') || '';
        var needsFixing = false;

        if (src) {
            var newSrc = getOriginalUrl(src);
            if (newSrc !== src) {
                img.setAttribute('src', newSrc);
                needsFixing = true;
            }
        }

        if (dataSrc) {
            var newDataSrc = getOriginalUrl(dataSrc);
            if (newDataSrc !== dataSrc) {
                img.setAttribute('data-src', newDataSrc);
                needsFixing = true;
            }
        }

        if (img.hasAttribute('srcset')) {
            img.removeAttribute('srcset');
            needsFixing = true;
        }

        if (img.hasAttribute('data-srcset')) {
            img.removeAttribute('data-srcset');
            needsFixing = true;
        }

        if (needsFixing) {
            img.classList.add('high-res-fixed');
        }
    }

    mw.hook('wikipage.content').add(function ($content) {
        $content.find('img').each(function () {
            forceHighRes(this);
        });
    });

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'src' &&
                mutation.target.tagName === 'IMG'
            ) {
                forceHighRes(mutation.target);
            } else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType !== 1) return;

                    if (node.tagName === 'IMG') {
                        forceHighRes(node);
                    } else {
                        node.querySelectorAll('img').forEach(function (img) {
                            forceHighRes(img);
                        });
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src']
    });
})();

/********/
window.DisplayClockJS = {
	format: "%2I:%2M:%2S %p, %B %1d, %Y (Server time)",    
    monofonts: 'Archivo Narrow, sans-serif',
    offset: -480
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});



/* Love Color Quiz Table */
mw.hook('wikipage.content').add(function($content) {
    var $quizTable = $content.find('table.interactive-quiz');
    
    if (!$quizTable.length || $quizTable.hasClass('quiz-loaded')) {
        return;
    }
    $quizTable.addClass('quiz-loaded');

    var currentQ = 0;

    $quizTable.find('tr').each(function() {
        var $row = $(this);
        var $tds = $row.find('td');
        
        if ($tds.length >= 2) {
            var letterText = $tds.eq(0).text().trim();
            var letter = letterText.charAt(0);
            
            if (letter === 'A') {
                currentQ++; 
            }
            
            if (['A', 'B', 'C', 'D'].includes(letter)) {
                var letterHtml = $tds.eq(0).html();
                
                $tds.eq(0).html(
                    '<label style="cursor:pointer; white-space:nowrap; display:inline-block;">' +
                    '<input type="radio" name="q' + currentQ + '" value="' + letter + '" style="margin-right:8px; transform:scale(1.2);">' + 
                    letterHtml + 
                    '</label>'
                );
            }
        }
    });

    var $btn = $('<button class="wds-button" style="width:100%;">Get Result</button>');
    var $resultDiv = $('<div class="quiz-result-display" style="margin-top:15px; text-align:center;"></div>');
    
    var $actionRow = $('<tr><td colspan="2" style="padding:15px; border-bottom: none;"></td></tr>');
    $actionRow.find('td').append($btn).append($resultDiv);
    
    $quizTable.find('tbody').append($actionRow);

    var resultImages = {
        'Fatal Red': 'https://placehold.co/300x300/red/white?text=Fatal+Red',
        'Wood Brown': 'https://placehold.co/300x300/saddlebrown/white?text=Wood+Brown',
        'Deep Sea Blue': 'https://placehold.co/300x300/blue/white?text=Deep+Sea+Blue',
        'Oxygen Green': 'https://placehold.co/300x300/green/white?text=Oxygen+Green',
        'Neon Purple': 'https://placehold.co/300x300/purple/white?text=Neon+Purple',
        'Aurora White': 'https://placehold.co/300x300/efefef/black?text=Aurora+White',
        'Warm Sun Yellow': 'https://placehold.co/300x300/gold/black?text=Warm+Sun+Yellow',
        'Obsidian Black': 'https://placehold.co/300x300/black/white?text=Obsidian+Black'
    };

    var isResultShowing = false;

    $btn.on('click', function() {
        if (isResultShowing) {
            $quizTable.find('input[type="radio"]').prop('checked', false);
            $resultDiv.empty();
            $btn.text('Get Result');
            isResultShowing = false;
            return;
        }

        var weights = { 'A': 4, 'B': 2, 'C': -1, 'D': -3 };
        var scores = [];
        var answeredAll = true;
        
        for (var i = 1; i <= 6; i++) {
            var selected = $quizTable.find('input[name="q' + i + '"]:checked').val();
            if (!selected) {
                answeredAll = false;
                break;
            }
            scores.push(weights[selected]);
        }

        if (!answeredAll) {
            $resultDiv.html('<span style="color:red; font-weight:bold;">Please answer all 6 questions!</span>');
            return;
        }

        var act1 = (scores[0] + scores[1] > 0) ? 'W' : 'C';
        var act2 = (scores[2] + scores[3] > 0) ? 'W' : 'C';
        var act3 = (scores[4] + scores[5] > 0) ? 'W' : 'C';
        var finalPattern = act1 + act2 + act3;

        var results = {
            'WWW': 'Fatal Red', 'CCC': 'Wood Brown', 'WCW': 'Deep Sea Blue', 'CWC': 'Oxygen Green',
            'WWC': 'Neon Purple', 'WCC': 'Aurora White', 'CWW': 'Warm Sun Yellow', 'CCW': 'Obsidian Black'
        };

        var charResult = results[finalPattern];
        var imgUrl = resultImages[charResult];
        
        $resultDiv.html(
            '<h3 style="margin-bottom: 15px;">Your Character Match: <span style="text-transform:uppercase;">' + charResult + '</span></h3>' +
            '<img src="' + imgUrl + '" alt="' + charResult + '" style="max-width: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">'
        );
        
        $btn.text('Take Again');
        isResultShowing = true;
    });
});