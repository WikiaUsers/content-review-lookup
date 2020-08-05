/*! Any JavaScript here will be loaded for all users on every page load. */

// Module loader
(function(root, factory) {
    var returnValue = factory(root.jQuery, root.mediaWiki);
    var key;
    for (key in returnValue) {
        root[key] = returnValue[key];
    }
})(this, function($, mw) {
    
    'use strict';
    
    // ---------- Core variables ---------- //
    
    // Custom modules
    var Modules = {};
    
    // Data that needs to be exposed as global
    var Expose = {};
    
    // Utility functions
    var Util = {};
    
    
    // ---------- Constants ---------- //
     
    // MediaWiki states
    var CONFIG = mw.config.get([
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgContentLanguage',
        'wgIsMainPage',
        'wgNamespaceNumber',
        'wgPageName',
        'wgServer',
        'wgUserGroups'
    ]);
    
    // Article container
    var $CONTENT_BASE = $('#mw-content-text');
    
    
    //---------- Utility Functions ---------- //
    
    Util.getHostURL = function() {
        return [
            CONFIG.wgServer,
            CONFIG.wgContentLanguage,
            'wiki',
            ''
        ].join('/');
    };
    
    Util.isSpecialPage = function() {
        return CONFIG.wgNamespaceNumber === -1;
    };
    
    Util.isUploadPage = function() {
        var pageNamePattern = /UPLOAD$/i;
        return Util.isSpecialPage()
            && pageNamePattern.test(CONFIG.wgCanonicalSpecialPageName)
    };
    
    
    // ---------- Variables to expose to the environment. ---------- //
    
    // Configuration of `Tooltips` imported via [[MediaWiki:ImportJS]]
    
    // Module options - too bad we gotta pollute global namespace :(
    Expose.tooltips_config = {
        offsetX: 0,
        offsetY: 0
    };
     
    // Pin tooltips at the bottom of pages for debugging
    Expose.tooltips_debug = false;
     
    // Tooltip types
    Expose.tooltips_list = [
        // Load article that matches `data-article` attribute.
        // Content only within <onlyinclude /> will be included.
        {
            classname: 'gd-tooltip-article',
            parse: '{'+'{:<#article#>}}',
        }
    ];
    
    
    // ---------- Custom modules ---------- //
    
    /**
     * Modules that should be executed during `init` process.
     * Each module must provide a `test` function that checks if we should run it,
     * and a `run` function that contains the codes to execute.
     */
    
    /**
     * Insert file description template into [[Speical:FileUpload]] page.
     */
    Modules.addFileUploadTemplate = {
        test: Util.isUploadPage,
        run: function() {
            var $description = $('#wpUploadDescription');
            var $container = $description.parent();
            var template = '{{파일\n'
                + '|설명 = \n'
                + '|출처 = \n'
                + '|소유자 = \n'
                + '|이용 목적 = \n'
                + '|비고 = \n}}';
            var notes = '위 서식에 대한 설명을 읽으려면 <a class="page" href="'
                + Util.getHostURL() + encodeURI('틀:파일') + 'target="_blank">'
                + '틀:파일</a> 문서를 참조해 주세요.';
            
            // insert file description template into <textarea />
            $description.val(template);
            // append explanatory notes
            $('<p />').html(notes).appendTo($container);
        }
    };
    
    /**
     * Fix issues with <poll />:
     * 1. We cannot click option label to select it
     * 2. Radio buttons' appearance is not customizable.
     */
    Modules.fixPoll = {
        test: function() {
            // skip on pages w/o any poll
            return !!$CONTENT_BASE.find('.ajax-poll').length;
        },
        run: function() {
            // force labels to toggle relevant radio buttons
            $(document).on('click', '.pollAnswerName label', function(event) {
                // skip if user clicked the radio button inside the label
                if (event.target.tagName.toUpperCase() === 'INPUT') {
                    return;
                }
                
                var $label = $(this);
                var $input = $label.find('input');
                var isChecked = $input.is(':checked');
                
                // toggle the radio button's check state
                $input.prop('checked', !isChecked);
                
                // toggle CSS class to allow styling
                $label.closest('form').find('label').removeClass('is-checked');
                $label.addClass('is-checked');
            });
        }
    };
    
    
    // ---------- Initiation script ---------- //
    
    (function init() {
        // Look through `Modules` and run each of them if the conditions are met.
        $.each(Modules, function(_, _module) {
            var shouldRun;
            
            switch (typeof _module.test) {
                // test => function
                case 'function':
                    shouldRun = _module.test();
                break;
                
                // test => true/false
                case 'boolean':
                    shouldRun = _module.test;
                break;
                
                // Run it if not specified
                default:
                    shouldRun = true;
                break;
            }
            
            if (shouldRun) {
                _module.run();
            }
        });
    })();
    
    
    // ---------- Exports ---------- //
    
    return Expose;
});