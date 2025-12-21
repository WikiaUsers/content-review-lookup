/**
 * @name TudouVideo.js
 * @description Add video from tudou.com to article
 * @author MonsterSchoolFan
 */
(function ($, mw) {
    'use strict';
    
    var config = mw.config.get([
        'wgAction',
        'wgPageName',
        'wgSiteName'
    ]);
    
    // Some messages
    var messages = {
        'en': {
            'error': 'Error',
            'invalidId': 'Invalid Tudou video IDs',
            'invalidSize': 'Invalid size parameters',
            'invalidAutoplay': 'Invalid autoplay parameters',
            'loading': 'Loading Tudou videos...',
            'failed': 'Failed to load Tudou videos'
        },
        'zh': {
            'error': '错误',
            'invalidId': '无效的土豆视频ID',
            'invalidSize': '无效的尺寸参数',
            'invalidAutoplay': '无效的自动播放参数',
            'loading': '正在加载土豆视频...',
            'failed': '加载土豆视频失败'
        }
    };
    
    // Get some current language
    function getLanguage() {
        return mw.config.get('wgUserLanguage') || 'en';
    }
    
    // Get messages
    function msg(key) {
        var lang = getLanguage();
        return (messages[lang] && messages[lang][key]) || messages['en'][key] || key;
    }
    
    // Validate the Tudou video IDs
    function validateVideoId(id) {
        if (!id) return false;
        // Tudou IDs can be numeric or alphanumeric
        return /^[a-zA-Z0-9_-]+$/.test(id);
    }
    
    // Extract video IDs from the URL
    function extractVideoId(url) {
        if (!url) return null;
        
        // Match Tudou link formats
        var patterns = [
            /tudou\.com\/programs\/view\/([a-zA-Z0-9_-]+)/,
            /tudou\.com\/listplay\/([a-zA-Z0-9_-]+)\//,
            /tudou\.com\/v\/([a-zA-Z0-9_-]+)/,
            /play\.tudou\.com\/v\/([a-zA-Z0-9_-]+)/,
            /tudou\.com\/v_show\/([a-zA-Z0-9_-]+)/,
            /play\.tudou\.com\/v_show\/([a-zA-Z0-9_-]+)/,
            /www\.tudou\.com\/albumplay\/([a-zA-Z0-9_-]+)\//,
            /videoId=([a-zA-Z0-9_-]+)/
        ];
        
        for (var i = 0; i < patterns.length; i++) {
            var match = url.match(patterns[i]);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return url; // Return as if it looks like an IDs
    }
    
    // Create the Tudou video embeds
    function createTudouEmbed(videoId, options) {
        var defaultOptions = {
            width: options.width || '640px',
            height: options.height || '',
            autoplay: options.autoplay || false,
            allowFullscreen: options.allowFullscreen !== false,
            showInfo: options.showInfo !== false,
            controls: options.controls !== false,
            loop: options.loop || false
        };
        
        // Calculate the heights if it's not specified for that
        if (!defaultOptions.height) {
            var widthValue = parseInt(defaultOptions.width);
            if (!isNaN(widthValue)) {
                defaultOptions.height = Math.round(widthValue * 9 / 16) + 'px';
            } else {
                defaultOptions.height = '360px';
            }
        }
        
        // Build an embed URLs
        var embedUrl = 'https://www.tudou.com/programs/view/html5embed.action';
        embedUrl += '?code=' + encodeURIComponent(videoId);
        embedUrl += '&autoPlay=' + (defaultOptions.autoplay ? 'true' : 'false');
        embedUrl += '&lcode=';
        embedUrl += '&resourceId=0_06_02_99';
        
        // Create iframes for Video Embed
        var $iframe = $('<iframe>', {
            'class': 'tudou-video-embed',
            'src': embedUrl,
            'width': defaultOptions.width,
            'height': defaultOptions.height,
            'frameborder': '0',
            'allowfullscreen': defaultOptions.allowFullscreen,
            'scrolling': 'no',
            'allow': 'autoplay; fullscreen; encrypted-media',
            'title': 'Tudou Video Player'
        });
        
        // Create the container
        var $container = $('<div>', {
            'class': 'tudou-video-container',
            'data-video-id': videoId,
            'css': {
                'position': 'relative',
                'overflow': 'hidden',
                'max-width': '100%',
                'margin': '10px 0'
            }
        }).append($iframe);
        
        // Add wrappers
        var $responsiveWrapper = $('<div>', {
            'class': 'tudou-video-responsive',
            'css': {
                'position': 'relative',
                'padding-bottom': '56.25%', // 16:9 aspect ratio
                'height': '0',
                'overflow': 'hidden',
                'max-width': '100%'
            }
        }).append($container);
        
        // Make the iframe responsive for users
        $iframe.css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'border': 'none'
        });
        
        return $responsiveWrapper;
    }
    
    // Create a Tudou video from element
    function generateTudouVideo(index, element) {
        var $element = $(element);
        
        if ($element.hasClass('tudou-processed')) {
            return;
        }
        $element.addClass('tudou-processed');
        
        var data = $element.data();
        var videoId = data.videoId || data.id || data.code;
        var videoUrl = data.url;
        
        // Tried to extract ID from URL if it's provided or not
        if (!videoId && videoUrl) {
            videoId = extractVideoId(videoUrl);
        }
        
        // Validate the video IDs
        if (!validateVideoId(videoId)) {
            $element.html('<div class="tudou-error errorbox">' + msg('invalidId') + '</div>');
            return;
        }
        
        // Show this loading
        $element.html('<div class="tudou-loading">' + 
                      '<div class="loading-spinner"></div>' + 
                      '<span>' + msg('loading') + '</span></div>');
        
        // Options
        var options = {
            width: data.width,
            height: data.height,
            autoplay: data.autoplay === 'true' || data.autoplay === true,
            allowFullscreen: data.allowfullscreen !== 'false',
            showInfo: data.showinfo !== 'false',
            controls: data.controls !== 'false',
            loop: data.loop === 'true' || data.loop === true
        };
        
        // Create the video embed
        var $embed = createTudouEmbed(videoId, options);
        
        // Replace the loading screen with embed
        $element.empty().append($embed);
        
        // Add video info
        if (data.title || data.description) {
            var $info = $('<div>', {
                'class': 'tudou-video-info',
                'css': {
                    'margin-top': '5px',
                    'font-size': '0.9em',
                    'color': '#666'
                }
            });
            
            if (data.title) {
                $info.append($('<div>', {
                    'class': 'tudou-video-title',
                    'text': data.title
                }));
            }
            
            if (data.description) {
                $info.append($('<div>', {
                    'class': 'tudou-video-description',
                    'text': data.description
                }));
            }
            
            $element.append($info);
        }
        
        // Trigger the resize event for behaviors
        $(window).trigger('resize');
    }
    
    // Process all of the Tudou video embed elements
    function processTudouVideos($content) {
        $content.find('.tudou-video:not(.tudou-processed)').each(generateTudouVideo);
    }
    
    // Add the CSS styles
    function addStyles() {
        var styles = `
            .tudou-video {
                margin: 15px 0;
                text-align: center;
            }
            
            .tudou-video-responsive {
                position: relative;
                padding-bottom: 56.25%;
                height: 0;
                overflow: hidden;
                max-width: 100%;
                background: #000;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .tudou-video-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .tudou-video-embed {
                border: none;
                display: block;
            }
            
            .tudou-loading {
                padding: 40px;
                text-align: center;
                color: var(--theme-page-text-color);
                background: var(--theme-page-background-color);
                border-radius: 4px;
                border: 1px solid var(--theme-border-color);
            }
            
            .loading-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid #f60;
                border-radius: 50%;
                animation: tudou-spin 1s linear infinite;
                margin-right: 10px;
                vertical-align: middle;
            }
            
            .tudou-error {
                padding: 10px;
                background: #fee;
                border: 1px solid #f66;
                border-radius: 4px;
                color: #c00;
            }
            
            .tudou-video-info {
                margin-top: 8px;
                padding: 8px;
                background: var(--theme-page-background-secondary-color);
                border-radius: 0 0 4px 4px;
                border: 1px solid var(--theme-border-color);
                border-top: none;
                font-size: 0.9em;
            }
            
            .tudou-video-title {
                font-weight: bold;
                margin-bottom: 4px;
                color: var(--theme-page-text-color);
            }
            
            .tudou-video-description {
                color: var(--theme-page-text-secondary-color);
                font-size: 0.9em;
            }
            
            @keyframes tudou-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            /* Dark theme support */
            .theme-fandomdesktop-dark .tudou-loading {
                background: #2e2e2e;
                border-color: #444;
            }
            
            .theme-fandomdesktop-dark .tudou-video-info {
                background: #2a2a2a;
                border-color: #444;
            }
            
                --feed-row-max-num: 4;
    --feed-col-1600: 3;
    --feed-row-min-num: 2;
    --video-bottom-height: 72px;
    --searchInputBgColor: hsla(0,0%,100%,0.1);
    --inputBgColor: rgba(255,25,255,0);
    --search-list: #2a2a32;
    --one-color: hsla(0,0%,100%,0.38);
    --two-color: hsla(0,0%,100%,0.6);
    --three-color: hsla(0,0%,100%,0.87);
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    position: relative;
    overflow: hidden;
    text-align: left;
    white-space: normal;
    background: #000;
    color: #fff;
    font: 12px/1.5 PingFangSC-Regular, Helvetica, Arial, Microsoft Yahei, sans-serif;
    user-select: none;
    outline: none;
    visibility: visible;
    font-family: PingFangSC-Regular, sans-serif;
    height: 100%;
        `;
        
        if (!$('#tudou-video-styles').length) {
            $('<style>')
                .attr('id', 'tudou-video-styles')
                .text(styles)
                .appendTo('head');
        }
    }
    
    // Initialize TudouVideo extension for that
    function init() {
        addStyles();
        
        // Process existing content
        mw.hook('wikipage.content').add(function($content) {
            processTudouVideos($content);
        });
        
        // Also process on DOM when it's ready
        $(function() {
            processTudouVideos($('body'));
        });
        
        // Add it to global scope for use
        window.TudouVideo = {
            embed: createTudouEmbed,
            validate: validateVideoId,
            extractId: extractVideoId
        };
        
        console.log('Tudou Video Embed loaded successfully');
    }
    
    // Wait for initializing
    $(document).ready(function() {
        mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(function() {
            init();
        }).catch(function(error) {
            console.error('Failed to load TudouVideo dependencies:', error);
            // Try to initialize them anyways
            init();
        });
    });
    
})(window.jQuery, window.mediaWiki);