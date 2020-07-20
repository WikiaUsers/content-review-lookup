/**
 * RAILWAM LIBRARY
 * 
 * Provides WAM-related functions for use in RailWAM and other scripts.
 * 
 * @author User:Blaster Niceshot
 * 
 * @version 1.22
 * 
 * Note: To view error messages sent by this script via mw.log, 
         append ?debug=true to the URL.
 */

;(function($, mw) {
    
    'use strict';
    
    // Initialize rw object
    window.rw = window.rw || {};
    
    if (typeof window.rw.loaded !== 'undefined') {
        
        // Exit function to prevent second load
        return;

    } else {
        
        window.rw.loaded = true;
        
        const config = {
                cacheId: new Date().getTime() / 1000,
                legalTitleChars: mw.config.get('wgLegalTitleChars'),
                token: mw.user.tokens.get('editToken'),
                wgServer: window.location.href.split(/(\/wiki\/)|(\/index)/)[0],
            },
        
        local = {
            
            /**
             * Checks a value for a WAM property to ensure that it is valid.
             * 
             * @param {string} prop - Property name
             * @param {number|string} val - Property value
             * 
             * @returns {boolean} Whether the value is valid
             */
            checkWamProp: function(prop, val) {
                
                var isValid = true;
                
                // Properties that need a special, individual check
                const propExceptions = ['title', 'url', 'wiki_image'],
                
                    // Used to check if any unknown properties have been added
                    fullPropList = ['wiki_id', 'wam', 'wam_rank', 'hub_wam_rank', 'vertical_wam_rank', 'peak_wam_rank', 'peak_hub_wam_rank', 'peak_vertical_wam_rank', 'top_1k_days', 'top_1k_weeks', 'first_peak', 'last_peak', 'hub_name', 'vertical_id', 'wam_change', 'wam_is_new', 'vertical_name', 'url', 'title', 'wam_score'],
                    
                    // Longest possible length of a valid value
                    maxLength = 10;
                
                val = val.toString();
                
                /** A valid value is:
                 * Given for a known property
                 * A number
                 * OR a string with containing only letters, numbers, and hyphens that is shorter than the maxLength 
                 * OR an exception (see propExceptions array)
                 */
                if ($.inArray(prop, propExceptions) > -1) {
                    switch (prop) {
                        case 'url':
                            
                            // URL must point to a fandom.com or wikia.com domain
                            if ((/^(https?:\/\/([\w-]+?\.){0,2}(fandom\.com|wikia\.com|wikia\.org)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/).test(val) === false) {
                                isValid = false;
                            }
                            
                            break;
                        case 'title':
                            
                            // Titles can only have legal title characters
                            if ((new RegExp('[^' + config.legalTitleChars + ']', 'i')).test(val) === true) {
                                isValid = false;
                            }
                            
                            break;
                    }
                } else if ($.inArray(prop, fullPropList) === -1 || (isNaN(local.parseNum(val)) === true && ((/[^-\w\d\s]/).test(val) === true || val.length > maxLength))) {
                    isValid = false;
                }
                
                if (isValid === false) {
                    mw.log('RailWAM API: A suspicious value was detected for "' + prop + '": ' + val + '\n Please report this issue IMMEDIATELY to dev.wikia.com/wiki/Talk:RailWAM, along with the property name and the suspicious value.');
                    return false;
                } else {
                    return true;
                }
                
            },
            
            /**
             * Loads data stored on the WAM log to an object.
             * 
             * @param {Object} settings - With properties:
                 * {string|number|array} log - Log page name(s)
                 * {function} success - Function to be executed after data is loaded
                 *  @param {Object} data - WAM data
                 * {function} error - Function to be executed on error
                 *  @param {Object} Empty object
             * 
             * @returns {void}
             */
            getLogged: function(settings) {
                
                // Convert to array
                settings.log = typeof settings.log !== 'object' ? [settings.log] : settings.log;
                
                // Remove Invalid page names
                $.each(settings.log,
                    function(i, page) {
                            
                        if (page.toString().match(/[#<>\[\]\|{}]/)) {
                            $(this).splice(i, 1);
                        }
                        
                    }
                );
                
                // No valid pages
                if (settings.log.length === 0) {
                    mw.log('RailWAM API: "data.getLogged" was aborted. All values in array "settings.log" contain invalid characters. #, <, >, [, ], |, {, and } can not be used in page titles. Invalid value: ' + settings.log);
                    
                    if (typeof settings.error === 'function') {
                        settings.error({});
                    }
                        
                    return;
                }
                
                
                // Initialize data
                const data = {};
                
                $.each(settings.log, 
                    function(i, page) {
                            
                        // Send AJAX request to WAM log page
                        $.ajax( {
                            
                            url: config.wgServer + '/index.php?title=' + page + '&action=raw',
                                
                            success: function(wamLog) {
                                
                                // Convert string to HTML
                                const wamLogHtml = $(wamLog),
                                
                                // Get elements with WAM data
                                dataElms = wamLogHtml.filter('.railwam-data-element');
                                
                                // Find log elements
                                if (dataElms.length > 0) {
                                    
                                    $.each(dataElms, function(i2, thisElm) {
                                        
                                        // Get date of data in seconds as stored in element's ID
                                        const dateId = $(thisElm).attr('id').replace('railwam_','');
                                                    
                                        // Create object inside data object and store day's data
                                        data[dateId] = {
                                            logged: true,
                                        };
                                        
                                        // Include app name and version in data if known
                                        const addedBy = $(thisElm).attr('addedBy');
                                        if (typeof addedBy === 'string') {
                                            data[dateId].addedBy = addedBy;
                                        }
                                        
                                        const version = local.parseNum($(thisElm).attr('version'));
                                        if (isNaN(local.parseNum(version)) === false) {
                                            data[dateId].version = version;
                                        }
                                        
                                        // Data validation check - ensure no data has been tampered with
                                        var dataIsInvalid = false;
                                        
                                        // Create data object with element's data
                                        $.each($(thisElm).children(), 
                                            function(childIndex, element) {
                                                
                                                const type = $(this).attr('class').replace('railwam_', ''),
                                                    val = $(this).text();
                                                
                                                if (local.checkWamProp(type, val) === true) {
                                                    
                                                    data[dateId][type] = val;
                                                    
                                                } else {
                                                    dataIsInvalid = true;
                                                    return false;
                                                }
                                                
                                            }
                                        );
                                        
                                        if (dataIsInvalid === true) {
                                            data[dateId] = null;
                                        }
                                                    
                                    });
                                        
                                }
                                
                                // Execute a function after data has been retrieved
                                if (typeof settings.success === 'function') {
                                    settings.success(data, wamLog);
                                }
                                 
                            },
                                
                            error: function() {
                                            
                                // Execute function even if WAM log does not exist.
                                if (typeof settings.error === 'function') {
                                    settings.error({}, '');
                                }
                                        
                            },
                            
                            complete: function(wamLogXHR) {
                                
                                const wamLog = typeof wamLogXHR.responseText === 'string' ? wamLogXHR.responseText : '';
                                
                                if (typeof settings.complete === 'function') {
                                    settings.complete(data, wamLog);
                                }
                                
                                if (typeof settings.callback === 'function') {
                                    settings.callback(data, wamLog);
                                }
                                
                            },
                                                        
                            cache: false,
                                
                        } );
                    }
                );
                
            },
            
            /**
             * Gets max and min WAM dates.
             * 
             * @param {function} callback - Executed after request completes.
             * 
             * @returns {void}
             */
            getMaxDate: function(callback) {
                $.ajax( {
                    
                    url:'https://railwam.herokuapp.com/api/v1/WAM/MinMaxWamIndexDate&cacheId=' + config.cacheId,
                    
                    dataType: 'json',
                    
                    success: function(data) {
                        
                        const max = local.parseNum(data.min_max_dates.max_date),
                            min = local.parseNum(data.min_max_dates.min_date);
                                                
                        // Execute callback with the maximum WAM date from returned data.
                        if (typeof data === 'object' && isNaN(max) === false && isNaN(min) === false) {
                            callback(max, min);
                        } else {
                            callback((Math.floor(new Date().getTime() / 1000 / 86400) * 86400) - 86400, 1325462400);
                        }
                                                
                    },
                    
                    error: function() {
                        
                        callback((Math.floor(new Date().getTime() / 1000 / 86400) * 86400) - 86400, 1325462400);
                        
                    }
                    
                } );
            },
            
            /**
             * Parses numbers more strictly than Number().
             * 
             * @param {string} n - Number as a string
             * 
             * @returns {number}
             */
            parseNum: function(n) {
                
                switch (typeof n) {
                    case 'number':
                        return n;
                    case 'string':
                        
                        // Ensure that value matches number pattern
                        if ((/^(\-|\+)?([0-9]+(\.[0-9]*)?((e(\+|\-)[0-9]+)?)?|Infinity)$/).test(n) === true) {
                            return parseFloat(n);
                        } else {
                            return NaN;
                        }
                        
                        break;
                        
                    default:
                        return NaN;
                }
                
            }
            
        };
        
        /**
         * Initializes API methods
         * 
         * @param {number} maxDate - Maximum date of WAM data in seconds.
         * @param {number} minDate - Minimum date of WAM data in seconds.
         * 
         * @returns {void}
         */
        rw.init = function() {
            
            const deferred = $.Deferred();
            
            local.getMaxDate(function (maxDate, minDate) {
                
                if (rw.initialized !== true) {
                    
                    var ajaxList = {};
                                    
                    const global = {
                                    config: {
                                        maxDate: local.parseNum(maxDate),
                                        minDate: local.parseNum(minDate),
                                        version: 1.22,
                                        wamLangs: ['', 'aa', 'ab', 'ace', 'af', 'ak', 'aln', 'am', 'anp', 'ar', 'arc', 'arn', 'ary', 'arz', 'as', 'av', 'avk', 'ay', 'az', 'ba', 'bat-smg', 'bcc', 'bcl', 'be', 'be-tarask', 'be-x-old', 'bg', 'bh', 'bho', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'bqi', 'br', 'brh', 'bs', 'bug', 'bxr', 'ca', 'cbk-zam', 'cdo', 'ce', 'ceb', 'ch', 'cho', 'chr', 'chy', 'ckb', 'co', 'cps', 'cr', 'crh', 'crh-cyrl', 'crh-latn', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'de', 'diq', 'dsb', 'dtp', 'dv', 'dz', 'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fi', 'fiu-vro', 'fj', 'fo', 'fr', 'frp', 'frr', 'fur', 'fy', 'ga', 'gag', 'gan', 'gan-hans', 'gan-hant', 'gd', 'gl', 'glk', 'gn', 'got', 'grc', 'gsw', 'gu', 'gv', 'ha', 'hak', 'haw', 'he', 'hi', 'hif', 'hif-latn', 'hil', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy', 'hz', 'id', 'ig', 'ii', 'ik', 'ike-cans', 'ike-latn', 'ilo', 'inh', 'io', 'is', 'iy', 'iu', 'ja', 'jam', 'jbo', 'jut', 'jv', 'ka', 'kaa', 'kab', 'kbd', 'kbd-cyrl', 'kg', 'khw', 'ki', 'kiu', 'kj', 'kk', 'kk-arab', 'kk-cn', 'kk-cyrl', 'kk-kz', 'kk-latn', 'kk-tr', 'kl', 'km', 'kn', 'ko', 'ko-kp', 'koi', 'kr', 'krc', 'kri', 'kij', 'ks', 'ks-arab', 'ks-deva', 'ku', 'ku-arab', 'ku-latn', 'kv', 'kv', 'kw', 'ky', 'la', 'lad', 'lb', 'lbe', 'lez', 'lfn', 'lg', 'li', 'lij', 'liv', 'lmo', 'ln', 'lo', 'loz', 'lt', 'ltg', 'lv', 'lzh', 'lzz', 'mai', 'map-bms', 'mdf', 'mg', 'mh', 'mhr', 'mi', 'min', 'mk', 'ml', 'mn', 'mo', 'mr', 'mrj', 'ms', 'mt', 'mus', 'my', 'myv', 'mzn', 'na', 'nah', 'nan', 'nap', 'ne', 'new', 'ng', 'niu', 'nl', 'nl-informal', 'nn', 'no', 'nov', 'nrm', 'nso', 'nv', 'ny', 'oc', 'om', 'or', 'os', 'pa', 'pag', 'pam', 'pap', 'pcd', 'pi', 'pih', 'pl', 'pms', 'pnb', 'pnt', 'prg', 'ps', 'pt', 'pt-br', 'qu', 'qug', 'rgn', 'rif', 'rm', 'rmy', 'rn', 'ro', 'roa-rup', 'roa-tara', 'ru', 'rue', 'rup', 'ruq', 'ruq-cyrl', 'ruq-latn', 'rw', 'sa', 'sah', 'sc', 'scn', 'sco', 'sd', 'sdc', 'se', 'sei', 'sg', 'sgs', 'sh', 'shi', 'shi-latn', 'shi-tfng', 'si', 'sk', 'sl', 'sli', 'sm', 'sma', 'sn', 'so', 'sq', 'sr', 'sr-ec', 'sr-el', 'srn', 'ss', 'st', 'stq', 'su', 'sv', 'sw', 'szl', 'ta', 'tcy', 'te', 'tet', 'tg', 'tg-cyrl', 'tg-latn', 'th', 'ti', 'tk', 'tl', 'tly', 'tn', 'to', 'tpi', 'tr', 'ts', 'tt', 'tt-cyrl', 'tt-latn', 'tum', 'tw', 'ty', 'tyv', 'udm', 'ug', 'ug-arab', 'ug-latn', 'uk', 'ur', 'uz', 'val', 've', 'vec', 'vep', 'vi', 'vls', 'vmf', 'vo', 'vot', 'vro', 'wa', 'war', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'yue', 'za', 'zea', 'zh', 'zh-hk', 'zh-tw', 'zu'],
                                    },
                                            
                                    data: {
                                        
                                        /**
                                         * Cancels AJAX requests that are on timers.
                                         * 
                                         * @param {string} id - Name of function that executed request to be canceled (e.g. "get")
                                                                "*" can be passed to cancel all requests on timers.
                                         * 
                                         * @returns {void}
                                         */
                                        cancel: function(id) {
                                            
                                            if (id === '*') {
                                                $.each(ajaxList, 
                                                    function(key, val) {
                                                    
                                                        clearTimeout(ajaxList[key].req);
                                                        
                                                        if (typeof ajaxList[key].callback === 'function') {
                                                            ajaxList[key].callback();
                                                        }
                                                        
                                                        ajaxList[key] = null;
                                                    
                                                    }
                                                );
                                            } else {
                                                clearTimeout(ajaxList[id].req);
                                                
                                                if (typeof ajaxList[id].callback === 'function') {
                                                    ajaxList[id].callback();
                                                }
                                                
                                                ajaxList[id] = null;
                                            }
                                            
                                        },
                                        
                                        /**
                                         * Retrieves WAM data within last ## days, starting at the earliest data.
                                         * 
                                         * @param {Object} settings - With properties:
                                            * Required: 
                                                * {number} startDate - Date of first day to retrieve data for in seconds
                                                * {number} endDate - Date of latest day to retrieve data for in seconds
                                            * Optional: 
                                                * {boolean} excludeBlacklist - Exclude wikis with Content Warning
                                                * {string} inURL - Search wiki URL fragments
                                                * {number} wikis - Number of wikis to retrieve data for (max 20)
                                                * {Object} logged - Object containing logged data
                                                * {number} offset - Entries offset from data beginning
                                                * {string} sortDirection - ASC (ascending) or DESC (descending)
                                                * {number} verticalId - Vertical id of wikis
                                                * {number} wikiId - numerical wiki ID
                                                * {string} wikiLang - Language of wikis
                                            * {function} callback - Executed once all data has been retrieved
                                            *   @param {Object} data - All retrieved data
                                            *   @param {number} dateId - See "dateId" above
                                            * {function} complete - Executed upon completion (success or failure) of each AJAX request
                                            *   @param {Object} data - All retrieved data (at execution time)
                                            *   @param {number} dateId - Date of this day in seconds
                                            * {function} success - Executed upon success of each AJAX request
                                            *   @param {Object} data - All retrieved data (at execution time)
                                            *   @param {number} dateId - Date of this day in seconds
                                            * {function} error - Executed upon failure of each AJAX request
                                            *   @param {Object} data - All retrieved data (at execution time)
                                            *   @param {number} dateId - Date of this day in seconds
                                            * {function} exists - Executed if day's has already been retrieved
                                            *   @param {Object} data - All retrieved data (at execution time)
                                            *   @param {number} dateId - Date of this day in seconds
                                         * 
                                         * @returns {void}
                                         */
                                        get: function(settings) {
                                            
                                            // Defaults for optional parameters
                                            settings = $.extend(
                                                                    {
                                                                        excludeBlacklist: false,
                                                                        inURL: '',
                                                                        logged: {},
                                                                        offset: 0,
                                                                        sortDirection: 'DESC',
                                                                        wikis: 1,
                                                                        wikiId: '',
                                                                        wikiLang: '',
                                                                        verticalId: -1,
                                                                    },
                                                                    
                                                                    settings
                                                                );
                                            
                                            const startDate = local.parseNum(settings.startDate),
                                                endDate = local.parseNum(settings.endDate) >= rw.config.maxDate ? rw.config.maxDate : local.parseNum(settings.endDate);
                                            // DateId
                                            if (Number.isInteger(startDate) === true && startDate >= window.rw.config.minDate) {
                                                
                                                if (Number.isInteger(endDate) === true) {
                                                    
                                                    if (endDate < startDate) {
                                                        mw.log('RailWAM API: "data.get" was aborted. "settings.endDate" must be a positive integer greater than or equal to "settings.startDate." Invalid value: ' + settings.endDate);
                                                        
                                                        if (typeof settings.callback === 'function') {
                                                            settings.callback(settings.logged, startDate, endDate);
                                                        }
                                                        return;
                                                    }
                                                    
                                                } else {
                                                    mw.log('RailWAM API: "data.get" was aborted. "settings.endDate" must be a positive integer greater than or equal to "settings.startDate." Invalid value: ' + settings.endDate);
                                                    
                                                    if (typeof settings.callback === 'function') {
                                                        settings.callback(settings.logged, startDate, endDate);
                                                    }
                                                    return;
                                                }
                                            } else {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.startDate" must be a positive integer greater than rw.config.minDate (' + window.rw.config.minDate + '). Invalid value: ' + settings.startDate);
                                                    
                                                    if (typeof settings.callback === 'function') {
                                                        settings.callback(settings.logged, startDate, endDate);
                                                    }
                                                    return;
                                            }
                                            
                                            // Logged
                                            if (typeof settings.logged !== 'object') {
                                                mw.log('RailWAM API: "data.get()" was aborted. "settings.logged" must be an object. Invalid value: ' + settings.logged);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Blacklist
                                            if (typeof settings.excludeBlacklist !== 'boolean' && (typeof settings.excludeBlacklist !== 'string' || (settings.excludeBlacklist === 'true' || settings.excludeBlacklist === 'false'))) {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.excludeBlacklist" must be a boolean. Invalid value: ' + settings.excludeBlacklist);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                                
                                            }
                                            
                                            // In URL
                                            if (typeof settings.inURL === 'string' || typeof settings.inURL === 'number') {
                                                settings.inURL = encodeURIComponent(settings.inURL);
                                            } else {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.inURL" must be a number or string. Invalid value: ' + settings.inURL);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Limit
                                            if (Number.isInteger(local.parseNum(settings.wikis)) === false || local.parseNum(settings.wikis) < 1 || local.parseNum(settings.wikis) > 20) {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.wikis" must be an integer between 1 and 20. Invalid value: ' + settings.wikis);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Offset
                                            if (Number.isInteger(local.parseNum(settings.offset)) === false || local.parseNum(settings.offset) < 0 || local.parseNum(settings.offset) > 4965) {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.offset" must be an integer between 0 and 4965. Invalid value: ' + settings.offset);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Sort direction
                                            if (settings.sortDirection !== 'ASC' && settings.sortDirection !== 'DESC') {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.sortDirection" must be "ASC" (ascending) or "DESC" (descending). Invalid value: ' + settings.sortDirection);
                                            
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                                
                                            }
                                            
                                            // Vertical ID
                                            if (Number.isInteger(local.parseNum(settings.verticalId)) === false || local.parseNum(settings.verticalId) < -1 || local.parseNum(settings.verticalId) > 7) {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.verticalId" must be an integer between -1 and 7. Invalid value: ' + settings.verticalId);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // WikiId
                                            if (Number.isInteger(local.parseNum(settings.wikiId)) === false || local.parseNum(settings.wikiId) < 0) {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.wikiId" must be a positive integer. Invalid value: ' + settings.wikiId);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Wiki lang
                                            if (typeof settings.wikiLang !== 'string' || window.rw.config.wamLangs.indexOf(settings.wikiLang) === -1) {
                                                mw.log('RailWAM API: "data.get" was aborted. "settings.wikiLang" must be a string containing one of the language codes specified in "rw.config.wamLangs". Invalid value: ' + settings.wikiLang);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback(settings.logged, startDate, endDate);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Ensure wikiId is defined
                                            settings.wikiId = settings.wikiId || '';
                                            
                                            // Initialize data object
                                            const data = JSON.parse(JSON.stringify(settings.logged)) || {};
                                                    
                                            // Calculate number of requests to be made
                                            var requests = (endDate - startDate) / 86400 + 2;
                                                    
                                            $.each(settings.logged, function(id, dataObj) {
                                                            
                                                if (local.parseNum(id) <= endDate && local.parseNum(id) >= startDate) {
                                                    requests--;
                                                }
                                                        
                                            });
                                            
                                            // Define parameters
                                            const blacklistParam = settings.excludeBlacklist === true ? '%26exclude_blacklist%3Dtrue' : '',
                                                inURLParam = settings.inURL !== '' ? '%26wiki_word%3D' + settings.inURL : '',
                                                offsetParam = settings.offset > 0 ? '%26offset%3D' + settings.offsett : '',
                                                sortDirParam = settings.sortDirection === 'ASC' ? '%26sort_direction%3DASC' : '',
                                                langParam = settings.wikiLang !== '' ? '%26wiki_lang%3D' + settings.wikiLang : '',
                                                verticalIdParam = settings.verticalId > -1 ? '%26vertical_id%3D' + settings.verticalId : '';
                                                        
                                            (function getData(dateId) {
                                                        
                                                // Within "days" days starting yesterday
                                                if (dateId <= endDate) {
                                                                
                                                    if (typeof data[dateId] === 'undefined' || data[dateId] === null) {
                                                                        
                                                            $.ajax({
                                                                        
                                                                url: 'https://railwam.herokuapp.com/api/v1/WAM/WAMIndex?wam_day=' + dateId +'&wam_previous_day=' + (dateId - 86400) + verticalIdParam + langParam + '&wiki_id=' + settings.wikiId + inURLParam + blacklistParam + '&sort_column=wam' + sortDirParam + offsetParam + '&limit=' + settings.wikis + '&fetch_admins=false&fetch_wiki_images=false',
                                                                
                                                                dataType: 'json',
                                                                
                                                                success: function(newData) {
                                                                    
                                                                    requests--;
                                                                    
                                                                    if (typeof newData === 'object') {
                                                                        
                                                                        if (newData.wam_results_total >= 1) {
                                                                                
                                                                            if (settings.wikiId !== '') {
                                                                                data[dateId] = newData.wam_index[settings.wikiId];
                                                                            } else {
                                                                                
                                                                                // Put data for all matching wikis in one object grouped by ID
                                                                                data[dateId] = newData.wam_index;
                                                                                
                                                                            }
                                                                            
                                                                            // Extra security check: Ensure that all data meets expected patterns
                                                                            var dataIsInvalid = false;
                                                                            
                                                                            $.each(data[dateId], 
                                                                                function(wamProp, wamVal) {
                                                                                    
                                                                                    // Multiple wikis
                                                                                    if (wamVal !== null) {
                                                                                        if (typeof wamVal === 'object') {
                                                                                            data[dateId][wamProp].logged = false;
                                                                                            
                                                                                            $.each(wamVal, 
                                                                                                function(wamIndivWikiProp, wamIndivWikiVal) {
                                                                                                    if (local.checkWamProp(wamIndivWikiProp, wamIndivWikiVal) === false) {
                                                                                                        dataIsInvalid = true;
                                                                                                        data[dateId][wamProp] = null;
                                                                                                        return false;
                                                                                                    }
                                                                                                }
                                                                                            );
                                                                                        
                                                                                        // One wiki
                                                                                        } else {
                                                                                            data[dateId].logged = false;
                                                                                            
                                                                                            if (local.checkWamProp(wamProp, wamVal) === false) {
                                                                                                dataIsInvalid = true;
                                                                                                data[dateId] = null;
                                                                                                return false;
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            );
                                                                            
                                                                            if (dataIsInvalid === true) {
                                                                                
                                                                                if (typeof settings.error === 'function') {
                                                                                    settings.error(data, dateId, requests);
                                                                                }
                                                                                
                                                                            } else if (typeof settings.success === 'function') {
                                                                                settings.success(data, dateId, requests);
                                                                            }
                                                                            
                                                                        } else  {
                                                                            
                                                                            data[dateId] = null;
                                                                            
                                                                            if (typeof settings.error === 'function') {
                                                                                
                                                                                settings.error(data, dateId, requests);
                                                                            }
                                                                            
                                                                        }
                                                                        
                                                                    } else {
                                                                        
                                                                        data[dateId] = null;
                                                                        
                                                                        if (typeof settings.error === 'function') {
                                                                            settings.error(data, dateId, requests);
                                                                        }
                                                                        
                                                                    }
                                                                    
                                                                },
                                                                    
                                                                error: function() {
                                                                            
                                                                    requests--;
                                                                    
                                                                    data[dateId] = null;
                                                                        
                                                                    if (typeof settings.error === 'function') {
                                                                        settings.error(data, dateId, requests);
                                                                    }
                                                                            
                                                                },
                                                                    
                                                                complete: function() {
                                                                    
                                                                    if (typeof settings.complete === 'function') {
                                                                        settings.complete(data, dateId, requests);
                                                                    }
                                                                    
                                                                    /* If the next request is the second
                                                                       or the data for it already exists */
                                                                    if (dateId === startDate - 86400 || typeof data[dateId + 86400] === 'object') {
                                                                        getData(dateId + 86400);
                                                                    } else if (dateId < endDate && dateId < rw.config.maxDate) {
                                                                        ajaxList.get = {
                                                                            req: setTimeout(
                                                                                            function() {
                                                                                                        
                                                                                                getData(dateId + 86400);
                                                                                                    
                                                                                            },
                                                                                        10000),
                                                                            callback: function() {
                                                                                
                                                                                if (typeof settings.callback === 'function') {
                                                                                    settings.callback(data, startDate, endDate);
                                                                                }
                                                                                
                                                                            }
                                                                        };
                                                                    } else if (typeof settings.callback === 'function') {
                                                                        settings.callback(data, startDate, endDate);
                                                                    }
                                                                        
                                                                },
                                                                
                                                                // URLs different for each day, so cache can be used
                                                                cache: true
                                                                        
                                                            });
                                                                        
                                                        } else {
                                                            
                                                            if (typeof settings.exists === 'function') {
                                                                settings.exists(data, dateId, requests);
                                                            }
                                                            
                                                            if (dateId < endDate) {
                                                                
                                                                // Execute next request immediately
                                                                getData(dateId + 86400);
                                                                
                                                            } else if (dateId === endDate) {
                                                                
                                                                if (typeof settings.callback === 'function') {
                                                                    settings.callback(data, startDate, endDate);
                                                                }
                                                                
                                                            }
                                                                            
                                                        }
                                                                
                                                    } else if (typeof settings.callback === 'function') {
                                                        settings.callback(data, startDate, endDate);
                                                    }
                                                                
                                            }) (startDate - 86400);
                                                    
                                        },
                                        
                                        /**
                                         * Retrieves latest WAM score.
                                         * 
                                         * @param {Object} settings - With properties:
                                            * {number} wikiId - numerical wiki ID
                                            * {Object} logged - Object containing logged data
                                            * {function} callback - Executed once all data has been retrieved
                                            *   @param {Object} data - All retrieved data
                                            *   @param {number} dateId - See "dateId" above
                                            * {function} complete - Executed upon completion (success or failure) of AJAX request
                                            *   @param {Object} data - All retrieved data and logged data
                                            *   @param {number} dateId - Date of this day in seconds
                                            * {function} success - Executed upon success of AJAX request
                                            *   @param {Object} data - All retrieved data and logged data
                                            *   @param {number} dateId - Date of this day in seconds
                                            * {function} error - Executed upon failure of AJAX request
                                            *   @param {Object} data - Logged data
                                            *   @param {number} dateId - Date of this day in seconds
                                         * 
                                         * @returns {void}
                                         */
                                        getLess: function(settings) {
                                            
                                            // wikiId check
                                            if (Number.isInteger(local.parseNum(settings.wikiId)) === false || local.parseNum(settings.wikiId) < 0) {
                                                mw.log('RailWAM API: "data.getLess" was aborted. "settings.wikiId" must be a positive integer. Invalid value: ' + settings.wikiId);
                                                
                                                if (typeof settings.callback === 'function') {
                                                    settings.callback({}, settings.dateId);
                                                }
                                                
                                                return;
                                            }
                                            
                                            // Logged must be object
                                            settings.logged = typeof settings.logged === 'object' ? settings.logged : {};
                                                
                                            // Initialization
                                            const dateId = Math.floor(new Date().getTime() / 1000 / 86400) * 86400;
                                                    
                                                // Initialize data object
                                            const data = JSON.parse(JSON.stringify(settings.logged)) || {};
                                            
                                            if (typeof data[dateId] === 'undefined' || data[dateId] === null) {
                                                $.ajax({
                                                        
                                                    url: 'https://community.fandom.com/api/v1/Wikis/Details?ids=' + settings.wikiId + '&cacheId=' + config.cacheId,
                                                        
                                                    success: function(newData) {
                                                        
                                                        if (typeof newData === 'object' && $.isEmptyObject(newData.items) === false) {
                                                            
                                                            if (local.checkWamProp('wam_score', newData.items[settings.wikiId].wam_score) === true) {
                                                                
                                                                // Rank and vertical rank can not be retrieved with this API call
                                                                data[dateId] = {
                                                                    logged: false,
                                                                    wam: newData.items[settings.wikiId].wam_score,
                                                                    wiki_id: settings.wikiId,
                                                                };
                                                                
                                                                if (typeof settings.success === 'function') {
                                                                    settings.success(data, dateId);
                                                                }
                                                            
                                                            } else {
                                                                
                                                                data[dateId] = null;
                                                                
                                                                if (typeof settings.error === 'function') {
                                                                    settings.error(data, dateId);
                                                                }
                                                                
                                                            }
                                                            
                                                        } else {
                                                            
                                                            data[dateId] = null;
                                                            
                                                            if (typeof settings.error === 'function') {
                                                                settings.error(data, dateId);
                                                            }
                                                            
                                                        }
                                                        
                                                    },
                                                        
                                                    error: function() {
                                                        
                                                        if (typeof settings.error === 'function') {
                                                            settings.error(data, dateId);
                                                        }
                                                        
                                                    },
                                                    
                                                    complete: function() {
                                                        
                                                        if (typeof settings.complete === 'function') {
                                                            settings.complete(data, dateId);
                                                        }
                                                            
                                                        if (typeof settings.callback === 'function') {
                                                            settings.callback(data, dateId);
                                                        }
                                                        
                                                    },
                                                        
                                                });
                                            } else if (typeof settings.callback === 'function') {
                                                settings.callback(data, dateId);
                                            }
                                                
                                        },
                                            
                                        /**
                                         * Loads data stored on the WAM log to an object.
                                         * 
                                         * @param {Object} settings - With properties:
                                             * {string|number|array} log - Log page name(s)
                                             * {function} success - Function to be executed after data is loaded
                                             *  @param {Object} data - WAM data
                                             * {function} error - Function to be executed on error
                                             *  @param {Object} Empty object
                                         * 
                                         * @returns {void}
                                         */
                                        getLogged: local.getLogged,
                                                
                                        /**
                                         * Logs WAM data on log page in user's settings.
                                         * 
                                         * @param {Object} settings - With properties:
                                             * {Object} data - WAM data
                                             * {string} log - Log page name
                                             * {string} summary - Edit summary
                                             * {number} version - Version number to attach to each entry
                                             * {string} addedBy - App name
                                             * {boolean} bot - Whether this edit should be marked as a bot edit
                                                               ! NOTE: User must have the bot flag on their account !
                                             * {boolean} override - Whether to override logged data for the same date
                                             * {function} callback - Executed after data logged
                                                 * {Object} data - See "data"
                                             * {function} complete - Executed if AJAX request completes (succeeds or fails)
                                                 * {Object} data - See "data"
                                             * {function} success - Executed if logging succeeds
                                                 * {Object} data - See "data"
                                             * {function} error - Executed if logging fails
                                                 * {Object} data - See "data"
                                         * 
                                         * @returns {void}
                                         */
                                        log: function(settings) {
                                            
                                            if (settings.log.toString().match(/[#<>\[\]\|{}]/)) {
                                                mw.log('RailWAM API: "data.log" was aborted. "settings.log" can not contain #, <, >, [, ], |, {, or }. Invalid value: ' + settings.log);
                                                
                                                return;
                                            }
                                            
                                            if (typeof settings.data !== 'object') {
                                                mw.log('RailWAM API: "data.log" was aborted. "settings.data" must be an object. Invalid value: ' + settings.data);
                                                
                                                return;
                                            }
                                            
                                            // Get logged data to prevent duplicates
                                            local.getLogged(
                                                {
                                                    log: settings.log, 
                                                    complete: function (logged, responseText) {
                                                        
                                                        const appNameParam = typeof settings.addedBy === 'string' ? ' addedBy="' + settings.addedBy + '"' : '',
                                                            versionParam = isNaN(local.parseNum(settings.version)) === false ? ' version="' + settings.version + '"' : '';
                                                        
                                                        $.each(settings.data, function(dateId, dataObj) {
                                                            
                                                            // New data element
                                                            var dataStr = '<span id="railwam_' + dateId + '" class="railwam-data-element"' + appNameParam + versionParam + '>';
                                                            
                                                            if (typeof dataObj === 'object' && dataObj !== null && (typeof dataObj.logged === 'undefined' || dataObj.logged === false)) {
                                                                $.each(dataObj, function(key, val) {
                                                                        
                                                                    if ((typeof settings.types === 'undefined' || $.inArray(key, settings.types) > -1) && key !== 'logged' && val !== null) {
                                                                        
                                                                        // Add data item
                                                                        dataStr += '<span class="railwam_' + key + '">' + val + '</span>';
                                                                    
                                                                    }
                                                                    
                                                                });
                                                                
                                                                // End data element
                                                                dataStr += '</span>';
                                                                
                                                                // Add or override entry
                                                                if (settings.override === true && typeof logged[dateId] === 'object') {
                                                                    const dupEntry = new RegExp('<span id="railwam_' + dateId + '" class="railwam-data-element".*?<\/span><\/span>');
                                                                    responseText = responseText.replace(dupEntry, dataStr);
                                                                } else {
                                                                    responseText += dataStr;
                                                                }
                                                                
                                                            }
                                                                    
                                                        });
                                                        
                                                        // Edit request params
                                                        const postParams = {
                                                            action: 'edit',
                                                            title: settings.log,
                                                            recreate: true,
                                                            text: responseText,
                                                            summary: settings.summary,
                                                            format: 'json',
                                                            token: config.token,
                                                        };
                                                        
                                                        if (settings.bot === true) {
                                                            postParams.bot = true;
                                                        }
                                                                
                                                        // Send AJAX request to edit API and add data in HTML to log page
                                                        (new mw.Api())
                                                            .post(postParams)
                                                            .done(
                                                                function() {
                                                                
                                                                    if (typeof settings.success === 'function') {
                                                                        settings.success(settings.data);
                                                                    }
                                                                
                                                                }
                                                            )
                                                            .error (
                                                                function() {
                                                                    
                                                                    if (typeof settings.error === 'function') {
                                                                        settings.error(settings.data);
                                                                    }
                                                                    
                                                                }
                                                            )
                                                            .always(
                                                                function() {
                                                                    
                                                                    if (typeof settings.complete === 'function') {
                                                                        settings.complete(settings.data);
                                                                    }
                                                                    
                                                                    if (typeof settings.callback === 'function') {
                                                                        settings.callback(settings.data);
                                                                    }
                                                                    
                                                                }
                                                            );
                                                    },
                                            });
                                        },
                                                        
                                    },
                                                    
                                    math: {
                                            
                                        /**
                                         * Converts seconds to days, hours, minutes, and seconds.
                                         * 
                                         * @param {number} sec - # of seconds
                                         * 
                                         * @returns {Object} Days, hours, minutes, seconds as object
                                         */
                                        convertTime: function(sec) {
                                            
                                            sec = local.parseNum(sec);
                                            
                                            if (Number.isNaN(sec) === true) {
                                                mw.log('RailWAM API: "math.convertTime" was aborted. "sec" must be numeric. Invalid value: ' + sec);
                                                
                                                return {};
                                            }
                                                    
                                            // Convert to days, hours, min, sec
                                            const days = Math.floor(sec / 86400),
                                                hours = Math.floor((sec - (days * 86400)) / 3600),
                                                min = Math.floor((sec - (days * 86400) - (hours * 3600)) / 60),
                                                remainder = Math.floor(sec - (days * 86400) - (hours * 3600) - (min * 60));
                                                    
                                            // Return object with time values 
                                            return {
                                                d: days,
                                                h: hours,
                                                m: min,
                                                s: remainder,
                                            };
                                                    
                                        },
                                                        
                                        /**
                                         * Returns difference between two values and appropriate image.
                                         * 
                                         * @param {number} cur - Current value or precalculated difference
                                         * @param {number} prev - Previous value (optional if cur is difference)
                                         * @param {boolean} invColors - Whether up/down arrow colors should be swapped
                                         * 
                                         * @returns {string} HTML of SVG and difference
                                         */
                                        diff: function(cur, prev, invColors) {
                                            
                                            cur = local.parseNum(cur);
                                                
                                            var diff = cur;
                                            const upColor = invColors === true ? '#ea8500' : '#7fc914',
                                                downColor = invColors === true ? '#7fc914' : '#ea8500';
                                                
                                            if (typeof prev !== 'undefined') {
                                                    
                                                // Round to nearest ten-thousandth
                                                diff = Math.round((cur - local.parseNum(prev)) * 10000) / 10000;
                                                
                                            }
                                                            
                                            // Return images based on change
                                            if (diff > 0) {
                                                                
                                                // Positive change - up arrow
                                                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13" class="railwam-arrow" fill="' + upColor + '"><use xlink:href="#railwam-arrow-up"/></svg> ' + diff;
                                                                
                                            } else if (diff < 0) {
                                                                
                                                // Negative change - down arrow
                                                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13" class="railwam-arrow" fill="' + downColor + '"><use xlink:href="#railwam-arrow-down"/></svg> ' + Math.abs(diff);
                                                                
                                            } else if (diff === 0) {
                                                                
                                                // No change - neutral blue circle
                                                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13" class="railwam-arrow" fill="#0a5fa3"><use xlink:href="#railwam-arrow-zero"/></svg> 0';
                                                                
                                            } else if (isNaN(diff) === true) {
                                                                
                                                // Change can not be calculated as one value is not numerical
                                                return NaN;
                                                                
                                            }
                                                            
                                        },
                                        
                                        /**
                                         * Calculates time in seconds of today at midnight (UTC) from current time in seconds
                                         * 
                                         * @param {number|string} sec - Current time in seconds
                                         * 
                                         * @returns {number|string} Time of today at midnight in seconds (UTC); same type as sec param
                                         */
                                        toWamDate: function(sec) {
                                            
                                            if (Number.isNaN(local.parseNum(sec)) === true) {
                                                mw.log('RailWAM API: "math.toWamDate" was aborted. "sec" must be numeric. Invalid value: ' + sec);
                                                
                                                if (typeof sec === 'string') {
                                                    
                                                    return '';
                                                    
                                                } else if (typeof sec === 'number') {
                                                    
                                                    return NaN;
                                                    
                                                }
                                            }
                                            
                                            if (typeof sec === 'string') {
                                                
                                                // Return string
                                                return (Math.floor(local.parseNum(sec) / 86400) * 86400).toString();
                                                
                                            } else if (typeof sec === 'number') {
                                                
                                                // Return number
                                                return Math.floor(sec / 86400) * 86400;
                                                
                                            }
                                             
                                            
                                        }
                                                        
                                    },
                                    
                                    svg: {
                                        
                                        /**
                                         * Inserts WAM change SVGs used by math.diff.
                                         * 
                                         * @param {string} selector - Element to append SVG definitions to
                                         * 
                                         * @returns {void}
                                         */
                                        insert: function(selector) {
                                            
                                            if (typeof selector !== 'string') {
                                                mw.log('RailWAM API: "svg.insert" was aborted. "selector" must be a string. Invalid value: ' + selector);
                                                
                                                return;
                                            }
                        
                                            // Positive, green arrow SVG definition
                                            const upArrowDef = '<path id="railwam-arrow-up" stroke-width="0" d="M 3.09,12.09 C 3.03,4.88 3.82,6.00 0.00,6.00 0.00,6.00 6.00,0.00 6.00,0.00 6.00,0.00 11.00,6.00 11.00,6.00 7.27,6.00 7.84,5.19 7.98,12.00 6.96,13.09 4.00,13.04 3.09,12.09 Z" />',
                                                            
                                                // Negative, orange arrow SVG definition
                                                downArrowDef = '<path id="railwam-arrow-down" stroke-width="0" d="M 7.91,0.91 C 7.97,8.13 7.18,7.00 11.00,7.00 11.00,7.00 5.00,13.00 5.00,13.00 5.00,13.00 0.00,7.00 0.00,7.00 3.73,7.00 3.16,7.81 3.02,1.00 4.04,-0.09 7.00,-0.04 7.91,0.91 Z"></path>',
                                                                
                                                // Neutral, blue circle SVG definition
                                                zeroArrowDef = '<path id="railwam-arrow-zero" stroke-width="0" d="M 2.52,3.50 C 4.02,2.02 7.03,2.00 8.48,3.50 9.98,5.02 9.98,8.00 8.53,9.48 7.02,10.98 4.02,11.00 2.48,9.48 1.02,8.02 1.08,5.00 2.52,3.50 Z" />';
                                                    
                                            // Append SVG definitions to document body
                                            $(selector).append('<svg id="rw-api-svg-defs" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"><defs>' + upArrowDef + downArrowDef + zeroArrowDef + '</defs></svg>');
                                                
                                        },
                
                                    },
                                    
                                };
                        
                    $.extend(window.rw, global);
                    
                    rw.initialized = true;
                    
                }
                        
                mw.hook('rw.api.ready').fire();
                deferred.resolve();
                    
            });
            
            return deferred;
            
        };
        
    }

}) (this.jQuery, this.mediaWiki);