/**
 * RAILWAM LIBRARY
 * 
 * Provides WAM-related functions for use in RailWAM and other scripts.
 * 
 * @author User:Blaster Niceshot
 * 
 * @version 1.12
 * 
 * Note: To view error messages sent by this script via mw.log, 
         append ?debug=true to the URL.
 */
 
;(function($, mw) {
 
    'use strict';
 
    // Initialize rw object
    window.rw = window.rw || {};
 
    if (typeof window.rw.loaded !== 'undefined') {
 
        // Exit function to prevent second load.
        return;
 
    }
 
    var local = {
 
        /**
         * Gets max and min WAM dates.
         * 
         * @param {function} callback - Executed after request completes.
         * 
         * @returns {void}
         */
        getMaxDate: function(callback) {
            $.ajax( {
 
                url:'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fwww.wikia.com%2Fapi%2Fv1%2FWAM%2FMinMaxWamIndexDate%22&format=json&callback=',
 
                success: function(data) {
 
                    // Execute callback with the maximum WAM date from returned data.
                    if (typeof data === 'object' && data.query.results !== null) {
                        callback(data.query.results.min_max_dates.max_date, data.query.results.min_max_dates.min_date);
                    } else {
                        callback((Math.floor(new Date().getTime() / 1000 / 86400) * 86400) - 86400, 1325462400);
                    }
 
                    mw.hook('rw.api.ready').fire();
 
                },
 
                error: function() {
 
                    callback((Math.floor(new Date().getTime() / 1000 / 86400) * 86400) - 86400, 1325462400);
 
                    mw.hook('rw.api.ready').fire();
 
                },
 
                cache: false,
 
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
 
        },
 
        /**
         * Replaces first number wiki id with underscore; used as property of data from AJAX.
         * 
         * @param {number} or {string} id - Wiki id
         * 
         * @returns {string} "id" with first number replaced with underscore
         */
        toWamId: function(id) {
 
            id = id.toString();
 
            if (id.match(/[^0-9]/) || local.parseNum(id) < 0) {
                mw.log('RailWAM API: "local.toWamId" was aborted. "id" must be a positive integer. Invalid value: ' + id);
 
                return '';
            } else {
                return id.replace(id.charAt(0), '_');
            }
 
        },
 
        /**
         * Initializes API methods
         * 
         * @param {number} maxDate - Maximum date of WAM data in seconds.
         * @param {number} minDate - Minimum date of WAM data in seconds.
         * 
         * @returns {void}
         */
        init: function(maxDate, minDate) {
 
                    var ajaxList = {},
 
                    config = {     
                            wgServer: mw.config.get('wgServer'),
                            token: mw.user.tokens.get('editToken'),      
                    },
 
                        global = {
                            config: {
                                maxDate: local.parseNum(maxDate),
                                minDate: local.parseNum(minDate),
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
 
                                    var dateId,
                                        startDate = local.parseNum(settings.startDate),
                                        endDate = local.parseNum(settings.endDate);
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
 
                                    // Initialization   
                                    var wamId = settings.wikiId !== -1 ? local.toWamId(settings.wikiId) : '',
 
                                        // Initialize data object
                                        data = settings.logged || {},
 
                                        // Calculate number of requests to be made
                                        requests = (endDate - startDate) / 86400 + 2;
 
                                    $.each(settings.logged, function(id, dataObj) {
 
                                        if (local.parseNum(id) <= endDate && local.parseNum(id) >= startDate) {
                                            requests--;
                                        }
 
                                    });
 
                                    var blacklistParam = settings.excludeBlacklist === true ? '%26exclude_blacklist%3Dtrue' : '',
                                        inURLParam = settings.inURL !== '' ? '%26wiki_word%3D' + settings.inURL : '',
                                        offsetParam = settings.offset > 0 ? '%26offset%3D' + settings.offsett : '',
                                        sortDirParam = settings.sortDirection === 'ASC' ? '%26sort_direction%3DASC' : '',
                                        langParam = settings.wikiLang !== '' ? '%26wiki_lang%3D' + settings.wikiLang : '',
                                        verticalIdParam = settings.verticalId > -1 ? '%26vertical_id%3D' + settings.verticalId : '';
 
                                    (function getData(dateId) {
 
                                        // Within "days" days starting yesterday
                                        if (dateId <= endDate) {
 
                                            if (typeof data[dateId] === 'undefined') {
 
                                                    $.ajax( {
 
                                                        url: 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from json where url="https://www.wikia.com/api/v1/WAM/WAMIndex?wam_day=' + dateId +'&wam_previous_day=' + (dateId - 86400) + verticalIdParam + langParam + '&wiki_id=' + settings.wikiId + inURLParam + blacklistParam + '&sort_column=wam' + sortDirParam + offsetParam + '&limit=' + settings.wikis + '&fetch_admins=false&fetch_wiki_images=false"') + '&diagnostics=false&format=json',
 
                                                        success: function(newData) {
 
                                                            requests--;
 
                                                            if (typeof newData === 'object' && newData.query.results !== null) {
 
                                                                if (newData.query.results.json.wam_results_total >= 1) {
 
                                                                    if (wamId !== '') {
                                                                        data[dateId] = newData.query.results.json.wam_index[wamId];
 
                                                                        if (typeof data[dateId] - 86400 === 'object') {
 
                                                                            /* Fix useless and confusing property
                                                                               that equals the WAM score by default. */
                                                                            data[dateId].wam_change = data[dateId] - data[dateId - 86400];
 
                                                                        } else {
 
                                                                            /* Useless and confusing property
                                                                               that equals the WAM score by default */
                                                                            data[dateId].wam_change = null;
 
                                                                        }
 
                                                                    } else {
                                                                        data[dateId] = newData.query.results.json.wam_index;
                                                                    }
 
                                                                    data[dateId].logged = false;
                                                                }
 
                                                                if (typeof settings.success === 'function') {
                                                                    settings.success(data, startDate, endDate, requests);
                                                                }
 
                                                            } else if (typeof settings.error === 'function') {
                                                                settings.error(data, startDate, endDate, requests);   
                                                            }
 
                                                        },
 
                                                        error: function() {
 
                                                            requests--;
 
                                                            if (typeof settings.error === 'function') {
                                                                settings.error(data, startDate, endDate, requests);
                                                            }
 
                                                        },
 
                                                        complete: function() {
 
                                                            if (typeof settings.complete === 'function') {
                                                                settings.complete(data, startDate, endDate, requests);
                                                            }
 
                                                            /* If the next request is the second
                                                               or the data for it already exists */
                                                            if (dateId === startDate - 86400 || typeof data[dateId + 86400] === 'object') {
                                                                getData(dateId + 86400);
                                                            } else if (dateId < endDate) {
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
 
                                                } else if (dateId < endDate) {
 
                                                    if (typeof settings.exists === 'function') {
                                                        settings.exists(data, startDate, endDate, requests);
                                                    }
 
                                                    // Execute next request immediately
                                                    getData(dateId + 86400);
 
                                                } else if (typeof settings.callback === 'function') {
                                                    settings.callback(data, startDate, endDate);
                                                }
 
                                            } else if (typeof settings.callback === 'function') {
                                                settings.callback(data, startDate, endDate);
                                            }
 
                                    } ) (startDate - 86400);
 
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
                                    var wamId = local.toWamId(settings.wikiId),
 
                                        dateId = (Math.floor(new Date().getTime() / 1000 / 86400) * 86400) - 86400,
 
                                        // Initialize data object
                                        data = settings.logged || {};
 
                                    if (typeof data[dateId] === 'undefined') {
                                        $.ajax( {
 
                                            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fwww.wikia.com%2Fapi%2Fv1%2FWikis%2FDetails%3Fids%3D' + settings.wikiId + '%22&format=json&callback=',
 
                                            success: function(newData) {
 
                                                if (typeof newData === 'object' && newData.query.results !== null) {
 
                                                    // Rank and vertical rank can not be retrieved with this API call
                                                    data[dateId] = {
                                                        logged: false,
                                                        wam: newData.query.results.items[wamId].wam_score,
                                                    };
 
                                                    if (typeof settings.success === 'function') {
                                                        settings.success(data, dateId);
                                                    }
 
                                                } else if (typeof settings.error === 'function') {
                                                    settings.error({}, dateId);
                                                }
 
 
 
                                            },
 
                                            error: function() {
 
                                                if (typeof settings.error === 'function') {
                                                    settings.error({}, dateId);
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
 
                                            cache: false,
 
                                        } );
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
                                getLogged: function(settings) {
 
                                    // Convert to array
                                    settings.log = typeof settings.log !== 'object' ? [settings.log] : settings.log;
 
                                    // Remove Invalid page names
                                    $.each(settings.log,
                                        function(i, page) {
 
                                            if (settings.log.toString().match(/[#<>\[\]\|{}]/)) {
                                                $(this).splice(i, 1);
                                            }
 
                                        }
                                    );
 
                                    // No valid pages
                                    if (settings.log.length === 0) {
                                        mw.log('RailWAM API: "data.getLogged" was aborted. All values in array "settings.log" contain Invalid characters. #, <, >, [, ], |, {, and } can not be used in page titles. Invalid value: ' + settings.log);
 
                                        if (typeof settings.error === 'function') {
                                            settings.error({});
                                        }
 
                                        return;
                                    }
 
 
                                    // Initialize data
                                    var data = {};
 
                                    $.each(settings.log, 
                                        function(i, page) {
 
                                            // Send AJAX request to WAM log page
                                            $.ajax( {
 
                                                url: config.wgServer + '/index.php?title=' + page + '&action=raw',
 
                                                success: function(wamLog) {
 
                                                    // Find log elements
                                                    if (wamLog.match(/<[a-z][\s\S]*class="[\s\S]*railwam-data-element[\s\S]*">/)) {
 
                                                        // Convert string to HTML
                                                        var wamLogHtml = $(wamLog),
 
                                                            // Get elements with WAM data
                                                            dataElms = wamLogHtml.filter('.railwam-data-element');
 
                                                        $.each(dataElms, function(i2, thisElm) {
 
                                                            // Get date of data in seconds as stored in element's ID
                                                            var dateId = $(thisElm).attr('id').replace('railwam_','');
 
                                                            // Create object inside data object and store day's data
                                                            data[dateId] = {
                                                                logged: true,
                                                            };
 
                                                            // Create data object with element's data
                                                            $.each($(thisElm).children(), 
                                                                function(childIndex, element) {
 
                                                                    var type = $(this).attr('class').replace('railwam_', ''),
                                                                        val = $(this).text();
 
                                                                    data[dateId][type] = val;
 
                                                                }
                                                            );
 
                                                        });
 
                                                    }
 
                                                    // Execute a function after data has been retrieved
                                                    if (typeof settings.success === 'function') {
                                                        settings.success(data);
                                                    }
 
                                                },
 
                                                error: function() {
 
                                                    // Execute function even if WAM log does not exist.
                                                    if (typeof settings.error === 'function') {
                                                        settings.error({});
                                                    }
 
                                                },
 
                                                complete: function() {
 
                                                    if (typeof settings.complete === 'function') {
                                                        settings.complete(data);
                                                    }
 
                                                    if (typeof settings.callback === 'function') {
                                                        settings.callback(data);
                                                    }
 
                                                },
 
                                                cache: false,
 
                                            } );
 
                                        }
                                    );
 
                                },
 
                                /**
                                 * Logs WAM data on log page in user's settings.
                                 * 
                                 * @param {Object} settings - With properties:
                                     * {Object} data - WAM data
                                     * {string} log - Log page name
                                     * {string} summary - Edit summary
                                     * {boolean} bot - Whether this edit should be marked as a bot edit
                                                       ! NOTE: User must have the bot flag on their account !
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
 
 
                                    var botParam = settings.bot === true ? '&bot=true' : '',
                                        appendData = '';
 
                                    $.each(settings.data, function(dateId, dataObj) {
 
                                        // Start data element
                                        var dataStr = '<span id="railwam_' + dateId + '" class="railwam-data-element">';
 
                                        if (typeof dataObj === 'object' && dataObj !== null && (typeof dataObj.logged === 'undefined' || dataObj.logged === false)) {
                                            $.each(dataObj, function(key, val) {
 
                                                if ((typeof settings.types === 'undefined' || $.inArray(key, settings.types) !== -1) && key !== 'logged' && val !== null) {
 
                                                    // Add data item
                                                    dataStr += '<span class="railwam_' + key + '">' + val + '</span>';
 
                                                }
 
                                            });
 
                                            // End data element
                                            appendData += dataStr +  '</span>';
 
                                        }
 
                                    });
 
                                    // Send AJAX request to edit API and add data in HTML to log page
                                    $.post(config.wgServer + '/api.php?action=edit&title=' + settings.log + '&recreate=true&appendtext='+ encodeURIComponent(appendData) + '&summary=' + encodeURIComponent(settings.summary) + '&format=json' + botParam + '&token=' + encodeURIComponent(config.token))
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
                                    var days = Math.floor(sec / 86400),
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
 
                                    var diff = cur,
                                        upColor = invColors === true ? '#ea8500' : '#7fc914',
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
                                 * @param {number} or {string} sec - Current time in seconds
                                 * 
                                 * @returns {number} If sec is a number; time of today at midnight in seconds (UTC), or
                                            {string} If sec is a string; time of today at midnight in seconds (UTC)
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
 
                                    // Up arrow SVG definition
                                    var upArrowDef = '<path id="railwam-arrow-up" stroke-width="0" d="M 3.09,12.09 C 3.03,4.88 3.82,6.00 0.00,6.00 0.00,6.00 6.00,0.00 6.00,0.00 6.00,0.00 11.00,6.00 11.00,6.00 7.27,6.00 7.84,5.19 7.98,12.00 6.96,13.09 4.00,13.04 3.09,12.09 Z" />',
 
                                        // Down arrow SVG definition
                                        downArrowDef = '<path id="railwam-arrow-down" stroke-width="0" d="M 7.91,0.91 C 7.97,8.13 7.18,7.00 11.00,7.00 11.00,7.00 5.00,13.00 5.00,13.00 5.00,13.00 0.00,7.00 0.00,7.00 3.73,7.00 3.16,7.81 3.02,1.00 4.04,-0.09 7.00,-0.04 7.91,0.91 Z"></path>',
 
                                        // Neutral, blue circle SVG definition
                                        zeroArrowDef = '<path id="railwam-arrow-zero" stroke-width="0" d="M 2.52,3.50 C 4.02,2.02 7.03,2.00 8.48,3.50 9.98,5.02 9.98,8.00 8.53,9.48 7.02,10.98 4.02,11.00 2.48,9.48 1.02,8.02 1.08,5.00 2.52,3.50 Z" />';
 
                                    // Append SVG definitions to document body
                                    $(selector).append('<svg id="rw-api-svg-defs" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"><defs>' + upArrowDef + downArrowDef + zeroArrowDef + '</defs></svg>');
 
                                },
 
                            },
 
                        };
 
 
                $.extend(window.rw, global);
 
            },
 
        };
 
    local.getMaxDate(local.init);
 
}) (this.jQuery, this.mediaWiki);