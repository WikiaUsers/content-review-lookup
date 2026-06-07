/* All JavaScript here loads for everyone on every page view. */

/* ==========================================================================
   UTOPIAN ARENA DYNAMIC RECENTLY UPDATED SLIDER ENGINE - HYBRID THEME EDITION
   ========================================================================== */
(function() {
    function initRecentSlider() {
        var $slider = $('#dynamic-history-slider');
        if ($slider.length === 0) return;

        var apiURI = mw.util.wikiScript('api');
        $.ajax({
            url: apiURI,
            data: {
                action: 'query',
                list: 'recentchanges',
                rclimit: 20,
                rcnamespace: 0,
                rctype: 'new|edit',
                format: 'json'
            },
            dataType: 'json',
            success: function(data) {
                if (!data || !data.query || !data.query.recentchanges) {
                    renderFallbackError();
                    return;
                }
                var rawChanges = data.query.recentchanges;
                var filteredPages = [];
                var seenTitles = {};

                for (var i = 0; i < rawChanges.length; i++) {
                    var title = rawChanges[i].title;
                    var cleanTitle = title.replace(/_/g, ' ');

                    if (cleanTitle !== "Main Page" && cleanTitle !== "Utopian Arena Wiki" && !seenTitles[title] && filteredPages.length < 10) {
                        seenTitles[title] = true;
                        filteredPages.push({
                            title: title,
                            url: mw.util.getUrl(title)
                        });
                    }
                }

                if (filteredPages.length === 0) {
                    renderFallbackError();
                    return;
                }

                fetchPageSummaries(filteredPages);
            },
            error: function() {
                renderFallbackError();
            }
        });
    }

    function fetchPageSummaries(pages) {
        var titles = pages.map(function(p) { return p.title; }).join('|');
        var apiURI = mw.util.wikiScript('api');
        $.ajax({
            url: apiURI,
            data: {
                action: 'query',
                titles: titles,
                prop: 'revisions|pageimages',
                rvprop: 'content',
                rvslots: 'main',
                piprop: 'thumbnail',
                pithumbsize: 800,
                format: 'json'
            },
            dataType: 'json',
            success: function(data) {
                var pagesData = (data.query && data.query.pages) ? data.query.pages : {};
                pages.forEach(function(page) {
                    page.image = "https://vignette.wikia.nocookie.net/utopian-arena/images/d/d1/Placeholder_Stage1.png";
                    page.desc = ""; 
                    
                    var normalizedLocalTitle = page.title.replace(/_/g, ' ').toLowerCase().trim();

                    for (var id in pagesData) {
                        var normalizedApiTitle = pagesData[id].title.replace(/_/g, ' ').toLowerCase().trim();
                        
                        if (normalizedApiTitle === normalizedLocalTitle) {
                            if (pagesData[id].thumbnail) {
                                page.image = pagesData[id].thumbnail.source;
                            }
                            
                            var wikitext = "";
                            if (pagesData[id].revisions && pagesData[id].revisions[0]) {
                                var rev = pagesData[id].revisions[0];
                                if (rev.slots && rev.slots.main && rev.slots.main['*']) {
                                    wikitext = rev.slots.main['*'];
                                } else if (rev['*']) {
                                    wikitext = rev['*'];
                                }
                            }

                            if (wikitext.length > 0) {
                                var cleanDesc = "";
                                var introMatch = wikitext.match(/==\s*Introduction\s*==\s*([\s\S]*?)(?=\n\s*==|$)/i);
                                
                                if (introMatch && introMatch[1].trim().length > 0) {
                                    var rawIntro = introMatch[1].trim();
                                    cleanDesc = rawIntro
                                        .replace(/\{\{[\s\S]*?\}\}/g, '') 
                                        .replace(/\[\[File:[^\]]+\]\]/gi, '') 
                                        .replace(/\[\[[^\|\]]+\|([^\]]+)\]\]/g, '$1') 
                                        .replace(/\[\[([^\]]+)\]\]/g, '$1') 
                                        .replace(/'''/g, '') 
                                        .replace(/''/g, '') 
                                        .replace(/<[^>]+>/g, '') 
                                        .replace(/\s+/g, ' ') 
                                        .trim();
                                }

                                if (!cleanDesc || cleanDesc.length === 0) {
                                    var lines = wikitext.split('\n');
                                    for (var l = 0; l < lines.length; l++) {
                                        var line = lines[l].trim();
                                        if (line.length === 0 || line.startsWith('{') || line.startsWith('|') || line.startsWith('}') || line.startsWith('<') || line.startsWith('==')) {
                                            continue;
                                        }
                                        cleanDesc = line
                                            .replace(/\[\[[^\|\]]+\|([^\]]+)\]\]/g, '$1')
                                            .replace(/\[\[([^\]]+)\]\]/g, '$1')
                                            .replace(/'''/g, '')
                                            .replace(/''/g, '')
                                            .trim();
                                        if (cleanDesc.length > 20) break;
                                    }
                                }

                                if (cleanDesc.length > 260) {
                                    cleanDesc = cleanDesc.substring(0, 257) + '...';
                                }
                                
                                page.desc = cleanDesc;
                            }
                        }
                    }
                    if (!page.desc) {
                        page.desc = "Database node file verified for " + page.title + ".";
                    }
                });
                buildSliderMarkup(pages);
            },
            error: function() {
                buildSliderMarkup(pages);
            }
        });
    }

    function buildSliderMarkup(trendingPages) {
        if (!trendingPages || trendingPages.length === 0) {
            renderFallbackError();
            return;
        }

        var slidesHtml = '';
        var thumbsHtml = '';
        
        var styleHtml = 
            '<style>' +
                ':root, .theme-fandomdesktop-light, body.theme-fandomdesktop-light {' +
                    '--slider-accent: #1affff;' +
                    '--slider-accent-rgb: 26, 255, 255;' +
                '}' +
                '.theme-fandomdesktop-dark, body.theme-fandomdesktop-dark {' +
                    '--slider-accent: #ff9400;' +
                    '--slider-accent-rgb: 255, 148, 0;' +
                '}' +
                '.cyber-slider-container .slider-arrow:hover {' +
                    'background: var(--slider-accent) !important;' +
                    'color: #000 !important;' +
                    'box-shadow: 0 0 10px var(--slider-accent);' +
                '}' +
                '.cyber-slider-container .thumb-trigger.active {' +
                    'border-color: var(--slider-accent) !important;' +
                    'opacity: 1 !important;' +
                '}' +
            '</style>';

        trendingPages.forEach(function(page, idx) {
            var activeClass = (idx === 0) ? ' active' : '';
            var opacity = (idx === 0) ? '1' : '0';
            var visibility = (idx === 0) ? 'visible' : 'hidden';
            var zIndex = (idx === 0) ? '2' : '1';
            var thumbOpacity = (idx === 0) ? '1' : '0.4';

            slidesHtml += '<div class="cyber-slide' + activeClass + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: ' + opacity + '; visibility: ' + visibility + '; z-index: ' + zIndex + '; transition: opacity 0.3s ease-in-out;">' +
                '<img src="' + mw.html.escape(page.image) + '" alt="' + mw.html.escape(page.title) + '" style="width: 100%; height: 100%; object-fit: contain;">' +
                '<span class="meta-title" style="display:none;">' + mw.html.escape(page.title.toUpperCase()) + '</span>' +
                '<span class="meta-desc" style="display:none;">' + mw.html.escape(page.desc) + '</span>' +
                '<span class="meta-link" style="display:none;">' + mw.html.escape(page.url) + '</span>' +
                '</div>';

            thumbsHtml += '<div class="thumb-trigger' + activeClass + '" style="width: 65px; height: 40px; border: 2px solid transparent; cursor: pointer; opacity: ' + thumbOpacity + '; overflow: hidden; box-sizing: border-box; transition: all 0.2s ease;">' + 
    			'<img src="' + mw.html.escape(page.image) + '" style="width: 100%; height: 100%; object-fit: cover;">' + 
    			'</div>';
        });

        var initialPage = trendingPages[0];
        var fullSliderHtml = styleHtml +
            '<div class="cyber-slider-container" style="position: relative; width: 100%; overflow: hidden; background: #0c0d12; border: 2px solid var(--slider-accent); margin: 15px 0; box-shadow: 0 0 15px rgba(var(--slider-accent-rgb), 0.15); font-family: sans-serif; transition: border-color 0.3s ease, box-shadow 0.3s ease;">' +
                '<div class="cyber-slides" style="position: relative; width: 100%; height: 400px; background: #000;">' + slidesHtml + '</div>' +
                
                '<div class="slider-arrow prev" style="position: absolute; top: 50%; left: 15px; transform: translateY(-50%); z-index: 12; width: 36px; height: 36px; background: rgba(0,0,0,0.5); border: 1px solid rgba(var(--slider-accent-rgb),0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--slider-accent); font-size: 18px; font-weight: bold; cursor: pointer; user-select: none; transition: all 0.2s;">&lt;</div>' +
                '<div class="slider-arrow next" style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); z-index: 12; width: 36px; height: 36px; background: rgba(0,0,0,0.5); border: 1px solid rgba(var(--slider-accent-rgb),0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--slider-accent); font-size: 18px; font-weight: bold; cursor: pointer; user-select: none; transition: all 0.2s;">&gt;</div>' +
                
                '<div class="slider-bottom-bar" style="position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(7, 8, 12, 0.9); border-top: 2px solid var(--slider-accent); display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; box-sizing: border-box; z-index: 10; gap: 20px; transition: border-color 0.3s ease;">' +
                    '<div class="caption-text" style="flex: 1; min-width: 0;">' +
                        '<h4 style="margin: 0 0 3px 0; color: #ffffff; font-size: 16px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">' + mw.html.escape(initialPage.title.toUpperCase()) + '</h4>' +
                        '<p style="margin: 0 0 4px 0; color: #cbd5e1; font-size: 13px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">' + mw.html.escape(initialPage.desc) + '</p>' +
                        '<a href="' + mw.html.escape(initialPage.url) + '" style="color: var(--slider-accent); text-decoration: none; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; transition: color 0.3s ease;">Read more →</a>' +
                    '</div>' +
                    '<div class="slider-thumbnails" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">' + thumbsHtml + '</div>' +
                '</div>' +
            '</div>';

        $('#dynamic-history-slider').html(fullSliderHtml);
        bindSliderEvents($('#dynamic-history-slider'));
    }

    function bindSliderEvents($container) {
        var $slides = $container.find('.cyber-slide');
        var $thumbs = $container.find('.thumb-trigger');
        var $prevBtn = $container.find('.slider-arrow.prev');
        var $nextBtn = $container.find('.slider-arrow.next');
        var $captionTitle = $container.find('.caption-text h4');
        var $captionDesc = $container.find('.caption-text p');
        var $captionLink = $container.find('.caption-text a');
        var currentIndex = 0;
        var scrollInterval = null; // Engine rotation timer variable

        function updateSlider(index) {
            if (index >= $slides.length) index = 0;
            if (index < 0) index = $slides.length - 1;
            currentIndex = index;

            $slides.removeClass('active').css({ 'opacity': 0, 'visibility': 'hidden', 'z-index': 1 });
            $slides.eq(currentIndex).addClass('active').css({ 'opacity': 1, 'visibility': 'visible', 'z-index': 2 });

            $thumbs.removeClass('active').css({ 'opacity': 0.4 });
            $thumbs.eq(currentIndex).addClass('active').css({ 'opacity': 1 });

            var $cur = $slides.eq(currentIndex);
            $captionTitle.text($cur.find('.meta-title').text());
            $captionDesc.text($cur.find('.meta-desc').text());
            $captionLink.attr('href', $cur.find('.meta-link').text());
        }

        // Initialize and clear timer subsystems
        function startAutoScroll() {
            if (!scrollInterval) {
                scrollInterval = setInterval(function() {
                    updateSlider(currentIndex + 1);
                }, 5000); // 5-second cycle parameters
            }
        }

        function stopAutoScroll() {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollInterval = null;
            }
        }

        // User action updates clear the automatic rotation timer to prevent jagged jumps
        $nextBtn.off('click').on('click', function() { 
            stopAutoScroll(); 
            updateSlider(currentIndex + 1); 
            startAutoScroll(); 
        });
        
        $prevBtn.off('click').on('click', function() { 
            stopAutoScroll(); 
            updateSlider(currentIndex - 1); 
            startAutoScroll(); 
        });
        
        $thumbs.off('click').on('click', function() { 
            stopAutoScroll(); 
            updateSlider($thumbs.index(this)); 
            startAutoScroll(); 
        });

        // Pause rotation protocol during mouse interaction
        $container.on('mouseenter', stopAutoScroll).on('mouseleave', startAutoScroll);

        // Run rotation cycle
        startAutoScroll();
    }

    function renderFallbackError() {
        var errorStyle = '<style>' +
            ':root, .theme-fandomdesktop-light, body.theme-fandomdesktop-light { --slider-accent: #1affff; }' +
            '.theme-fandomdesktop-dark, body.theme-fandomdesktop-dark { --slider-accent: #ff9400; }' +
        '</style>';
        $('#dynamic-history-slider').html(errorStyle + '<div style="border: 2px dashed var(--slider-accent); padding: 20px; text-align: center; color: #e2e8f0; background: #0c0d12; margin: 15px 0;"><h4 style="color: var(--slider-accent); margin: 0 0 5px 0;">DATA STREAM OFFLINE</h4></div>');
    }

    mw.hook('wikipage.content').add(function($content) {
        if ($content.attr('id') === 'mw-content-text' || $content.find('#dynamic-history-slider').length > 0) {
            initRecentSlider();
        }
    });
})();