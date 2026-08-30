/* Any JavaScript here will be loaded for all users on every page load. */
//Load only on template page documentation
if (mw.config.get('wgPageName') === 'Template:EchartPie/doc') {
    mw.loader.load('/wiki/MediaWiki:EchartPie.css?action=raw&ctype=text/css', 'text/css');
}

//Test for tooltip that goes beyond the edges
mw.hook('wikipage.content').add(function($content) {

    function checkBoundary($text) {
        if (!$text.length) return;

         // Reset classes to for flips
        $text.removeClass('flip-left flip-right');

        var rect = $text[0].getBoundingClientRect();
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        if (rect.right > viewportWidth - 15) {
            $text.addClass('flip-left');
        } else if (rect.left < 15) {
            $text.addClass('flip-right');
        }
    }

    var $tooltips = $content.find('.tooltip');

    $tooltips.each(function() {
        checkBoundary($(this).children('.tooltiptext'));
    });

    $tooltips.on('mouseenter', function() {
        checkBoundary($(this).children('.tooltiptext'));
    });
});

// Blocks the page jump completely
mw.hook('wikipage.content').add(function($content) {
  $content.find('.no-snap a[href^="#"], a.no-snap[href^="#"]').on('click', function(e) {
    e.preventDefault(); 
    
    var targetId = $(this).attr('href'); 
    
    if (targetId && targetId !== '#') {
      var $target = $(targetId);
      
      if ($target.length) {
        
        $target.siblings().each(function() {
          this.style.setProperty('display', 'none', 'important');
        });
        
        $target[0].style.setProperty('display', 'block', 'important');
        
        history.pushState(null, null, targetId);
      }
    }
  });
});

// Back to top button
window.BackToTopModern = true;
// to use modern

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js'
    ]
});

// ========================================================
// WIKIFORMS ENGINE
// ========================================================
mw.hook('wikipage.content').add(function () {

    var urlParams = new URLSearchParams(window.location.search),
        processedIds = new Set(),
        api = new mw.Api();

        // PHASE 1: ORPHAN STRUCTURE VALIDATION
        document.querySelectorAll('.wikiform-dropdown, .wikiform-btn-submit, .wikiform-btn-clear').forEach(function(el) {
            var label = el.className.match(/dropdown|submit|clear/);
            if (!el.closest('.wikiform-form')) {
                console.error('[Wiki Form Engine] Structural Error: Found an orphaned ' + label + ' outside of any ".wikiform-form" container.');
            }
        });

        // PHASE 2: PROCESSING EACH ACTIVE WORKSPACE FORM
        document.querySelectorAll('.wikiform-form').forEach(function (form) {
            var formId = form.getAttribute('id');
            if (!formId || /^\d+$/.test(formId) || processedIds.has(formId)) {
                var err = !formId ? 'missing "id" attribute.' : /^\d+$/.test(formId) ? 'purely numeric ID "' + formId + '" banned.' : 'duplicate ID "' + formId + '" collision.';
                console.error('[Wiki Form Engine] Configuration Error: ' + err);
                return;
            }
            processedIds.add(formId);

	        var dropdowns = form.querySelectorAll('.wikiform-dropdown');

        	if (dropdowns.length > 0 && !form.querySelector('.wikiform-btn-submit')) {
                console.warn('[Wiki Form Engine] Warning in form "' + formId + '": Missing a ".wikiform-btn-submit" button.');
            }

            function purgeFormUrlParams(paramsObject) {
                var toRemove = [];
                paramsObject.forEach(function(v, k) { if (k.indexOf(formId + '_') === 0) toRemove.push(k); });
                toRemove.forEach(function(k) { paramsObject.delete(k); });
            }

            // PHASE 2.5: WIKITEXT TOKEN REPLACEMENT & VIEWPORT COMPILATION
            form.parentElement.querySelectorAll('.wikiform-viewport').forEach(function (viewport) {
                var blueprint = viewport.querySelector('.wikiform-blueprint');
                var output = viewport.querySelector('.wikiform-output') || document.createElement('div');
                
                if (!viewport.querySelector('.wikiform-output')) {
                    output.className = 'wikiform-output';
                    viewport.appendChild(output);
                }
                if (blueprint && output) {
                    var wikitext = blueprint.innerHTML; //
                    var decoder = document.createElement('div');
                    decoder.innerHTML = wikitext;
                    decoder.querySelectorAll('span.mw-nowiki-text, typeof\\:mw\\:Nowiki').forEach(function(span) {
                        span.parentNode.replaceChild(document.createTextNode(span.textContent || span.innerText), span);
                    });
                    wikitext = decoder.textContent || decoder.innerText;
                    
                    if (/%PARAM(?::[^%]+)?%/g.test(wikitext)) {
                        var compiled = wikitext;
                        var tokens = Array.from(new Set(wikitext.match(/%PARAM(?::[^%]+)?%/g) || []));
                        var hasAtLeastOneValue = false;
                        
                        tokens.forEach(function(token) {
                            var paramName = token === "%PARAM%" ? viewport.getAttribute('wikiform-data-dpl-param') : token.replace("%PARAM:", "").replace("%", "");
                            var lowerParamName = (paramName || '').toLowerCase().trim();
                            var val = urlParams.get(formId + '_' + lowerParamName);
                            
                            if (val === null || val === undefined) {
                                val = "";
                            }
                            
                            if (val.trim() !== "") {
                                hasAtLeastOneValue = true;
                            }
                            
                            compiled = compiled.replace(new RegExp(token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), val);
                        });

                        if (hasAtLeastOneValue) {
                            output.innerHTML = '<p class="wikiform-loading">Loading...</p>';
                            api.parse(compiled).done(function(html) { output.innerHTML = html; })
                                .fail(function() { output.innerHTML = '<p style="color:red;">Error: The server failed to parse the compiled wikitext statement.</p>'; });
                        } else {
                            output.innerHTML = '<p class="wikiform-unloaded">UNLOADED</p>';
                        }
                    }
                }
            });


            // PHASE 3: SELECT ENGINE DROPDOWN TRANSFORMATIONS
            dropdowns.forEach(function (placeholder) {
                var param = placeholder.getAttribute('data-wikiform-param');
                if (!param || !param.trim()) return;

                var select = document.createElement('select');
                select.setAttribute('data-wikiform-param', param);
                if (placeholder.className) select.className = placeholder.className.replace('wikiform-dropdown', '').trim();
                
                ['data-wikiform-master-param', 'data-wikiform-lua-name', 'data-wikiform-lua-module', 'data-wikiform-lua-function', 'data-wikiform-master-id'].forEach(function(attr) {
                    if (placeholder.hasAttribute(attr)) select.setAttribute(attr, placeholder.getAttribute(attr));
                });

                var textNode = placeholder.querySelector('.wikiform-dropdown-option[data-wikiform-value=""]');
                var defaultLabel = textNode ? (textNode.textContent || textNode.innerText || '').trim() : "-- Select " + param + " --";
                
                var defaultOpt = document.createElement('option');
                defaultOpt.value = ""; defaultOpt.innerText = defaultLabel;
                select.appendChild(defaultOpt);

            	placeholder.querySelectorAll('.wikiform-dropdown-option').forEach(function(rawOpt) {
                	var val = rawOpt.getAttribute('data-wikiform-value');
                
                // skip blank or empty value rows because we already used them for the main placeholder text
                	if (val !== null && val !== undefined && val !== "" && !/^%PARAM/.test(val)) {
                    var opt = document.createElement('option');
                    opt.value = val; 
                    opt.innerText = (rawOpt.textContent || rawOpt.innerText || '').trim() || val;
                    select.appendChild(opt);
                	}
        		});


                var activeVal = urlParams.get(formId + '_' + param);
                if (activeVal) {
                    var matchingOpt = select.querySelector('option[value="' + activeVal + '"]');
                    if (matchingOpt) matchingOpt.selected = true;
                }

                placeholder.parentNode.replaceChild(select, placeholder);
            });

            // PHASE 3.5: NATIVE CHECKBOX TOGGLES
            form.querySelectorAll('.wikiform-toggle').forEach(function(placeholder) {
                var param = placeholder.getAttribute('data-wikiform-param');
                if (!param) return;

                // 1. create interactive checkbox
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.setAttribute('data-wikiform-param', param);
                checkbox.className = 'wikiform-toggle-input';

                // extract data states from placeholders
                var optionNode = placeholder.querySelector('.wikiform-toggle-option');
                var val = optionNode ? optionNode.getAttribute('data-wikiform-value') : 'Yes';
                var labelText = optionNode ? (optionNode.textContent || optionNode.innerText).trim() : '';
                checkbox.value = val;

                // restore checkpoint memory from URL parameter lines
                var activeUrlVal = urlParams.get(formId + '_' + param);
                if (activeUrlVal === val) {
                    checkbox.checked = true;
                }

                // 2. build UI container
                var renderLabel = document.createElement('label');
                renderLabel.className = 'wikiform-toggle-label';

                // assemble structural sequence hierarchy 
                renderLabel.appendChild(checkbox);
                renderLabel.appendChild(document.createTextNode(labelText));

                // 3. overwrite layout surface placeholders on page load
                placeholder.parentNode.replaceChild(renderLabel, placeholder);
            });
            
            // LIVE TABLE HEADER RE-ALIGNER
           // scans entire document for compiled blueprint wrapper
				var initialTargetTable = document.querySelector('.wikiform-livecalc-summary');
				if (initialTargetTable) {
    			var initialGoal = parseInt(initialTargetTable.getAttribute('data-wikiform-base-value'), 10) || 0;
                
                var initialLiveWeight = 0;
                form.querySelectorAll('.wikiform-grid-count-display').forEach(function(node) {
                    var unitWeight = parseInt(node.getAttribute('data-wikiform-value'), 10) || 0;
                    var count = parseInt(node.getAttribute('data-wikiform-count'), 10) || 0;
                    initialLiveWeight = initialLiveWeight + (count * unitWeight);
                });

                var initialHeaderText = initialLiveWeight + " / " + initialGoal;
                var initialHeaderNode = form.querySelector('.wikiform-livecalc-header');
                if (initialHeaderNode) initialHeaderNode.textContent = initialHeaderText;
            }



            // PHASE 4: UNIVERSAL CASCADING LISTENERS OPERATOR
            form.querySelectorAll('select[data-wikiform-lua-function]').forEach(function(childSelect) {
                var luaFunction  = childSelect.getAttribute('data-wikiform-lua-function');
                if (!luaFunction) return;

                var rawDependsOn = childSelect.getAttribute('data-wikiform-master-param') || '';
                var rawPassAs    = childSelect.getAttribute('data-wikiform-lua-name') || '';
                var luaModule    = childSelect.getAttribute('data-wikiform-lua-module') || form.getAttribute('data-wikiform-lua-default-module') || 'CrewCalc';
                var targetParam  = childSelect.getAttribute('data-wikiform-param');

                var parentParams = rawDependsOn.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
                var passAsParams = rawPassAs ? rawPassAs.split(',').map(function(s) { return s.trim(); }).filter(Boolean) : parentParams;
                
                // reads the text of the first option if it exists, otherwise falls back
            	var originalDefaultLabel = (childSelect.options && childSelect.options.length > 0) ? childSelect.options[0].text : "-- Select --";

                if (!parentParams.length) return;
                var masterSelect = form.querySelector('select[data-wikiform-param="' + parentParams[0] + '"]');
                if (!masterSelect) return;

                function runCascadeWorker() {
                    var argsArray = [];
                    var allParentsReady = true;

                    for (var i = 0; i < parentParams.length; i++) {
                        var pParam = parentParams[i];
                        var pSelect = form.querySelector('select[data-wikiform-param="' + pParam + '"]');
                        var val = pSelect ? pSelect.value : '';

                        if (val === "" || val === null || val === undefined || /^%PARAM/.test(val)) {
                            allParentsReady = false;
                            break;
                        }
                        var argKey = (passAsParams[i] !== undefined) ? passAsParams[i] : pParam;
                        argsArray.push('|' + argKey + '=' + val);
                    }

                // 1. synchronous reset: clears elements if parents are missing
                if (!allParentsReady) {
                    childSelect.innerHTML = '';
                    var fallbackOpt = document.createElement('option');
                    fallbackOpt.value = ""; 
                    fallbackOpt.innerText = originalDefaultLabel;
                    childSelect.appendChild(fallbackOpt);
                    return;
                }

                var invokeStatement = '{{#invoke:' + luaModule + '|' + luaFunction + argsArray.join('') + '}}';
                api.parse(invokeStatement).done(function(rawText) {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = rawText;
                    var cleanList = (tempDiv.textContent || tempDiv.innerText || '').trim();

                    // 2. asynchronous prep: clears out old character values
                    childSelect.innerHTML = '';
                    if (!childSelect.querySelector('option[value=""]')) {
                        var fallbackOpt = document.createElement('option');
                        fallbackOpt.value = ""; 
                        fallbackOpt.innerText = originalDefaultLabel;
                        childSelect.appendChild(fallbackOpt);
                    }

                        if (cleanList) {
                            cleanList.split(/\s*,\s*/).forEach(function(optText) {
                                if (optText) {
                                    var opt = document.createElement('option');
                                    opt.value = optText; opt.innerText = optText;
                                    childSelect.appendChild(opt);
                                }
                            });

                            var urlStoredValue = urlParams.get(formId + '_' + targetParam);
                            if (urlStoredValue) {
                                var targetNode = childSelect.querySelector('option[value="' + urlStoredValue + '"]');
                                if (targetNode) targetNode.selected = true;
                            }
                        }
                    });
                }

                parentParams.forEach(function(pParam) {
                    var pSelect = form.querySelector('select[data-wikiform-param="' + pParam + '"]');
                    if (pSelect) pSelect.addEventListener('change', runCascadeWorker);
                });

                runCascadeWorker();
            });

            // LIVECALC DROPDOWN RE-CALCULATOR
            form.addEventListener('change', function(e) {
                var target = e.target;
                
                // 1. only proceed if changed item is a native select dropdown element
                if (target.tagName !== 'SELECT') return;

                // 2. relative check: trace up to find if this select sits inside a livecalc section
                var liveCalcContainer = target.closest('.wikiform-livecalc');
                if (!liveCalcContainer) return; // ignores elements that are outside of livecalc

                // 3. extract the target Scribunto module details from the container attributes
                var luaModule   = liveCalcContainer.getAttribute('data-wikiform-lua-module');
                var luaFunction = liveCalcContainer.getAttribute('data-wikiform-lua-function');
                var luaRoute    = liveCalcContainer.getAttribute('data-wikiform-lua-route') || 'BaseExpOnly';
                
                var headerNode  = form.querySelector('.wikiform-livecalc-header');
                if (!luaModule || !luaFunction || !headerNode) return;

                // 4. gather every parameter name and value inside the isolated box region
                var argsArray = [];
                liveCalcContainer.querySelectorAll('select[data-wikiform-param]').forEach(function(select) {
                    var paramName = select.getAttribute('data-wikiform-param');
                    var paramValue = select.value || "";
                    if (paramName) {
                        argsArray.push('|' + paramName.toLowerCase().trim() + '=' + paramValue);
                    }
                });

                // 5. construct invoke query statement
                var invokeStatement = '{{#invoke:' + luaModule + '|' + luaFunction + argsArray.join('') + '|Route=' + luaRoute + '}}';

                // 6. fire asynchronous parser request
                api.parse(invokeStatement).done(function(rawText) {
                    // strip HTML tags, newlines, tabs, and carriage returns completely
                    var cleanGoal = rawText.replace(/<[^>]*>/g, '').replace(/[\r\n\t]/g, '').trim();
                    var goalInteger = parseInt(cleanGoal, 10) || 0;

                    // 7. calculate the active items weight density on screen to maintain the live balance
                    var cumulativeLiveWeight = 0;
                    form.querySelectorAll('.wikiform-grid-count-display').forEach(function(node) {
                        var unitWeight = parseInt(node.getAttribute('data-wikiform-value'), 10) || 0;
                        var count = parseInt(node.getAttribute('data-wikiform-count'), 10) || 0;
                        cumulativeLiveWeight = cumulativeLiveWeight + (count * unitWeight);
                    });

                    // 8. overwrite the layout display text instantly
                    headerNode.textContent = cumulativeLiveWeight + " / " + goalInteger;
                });
            });

            // PHASE 5: ACTION BUTTON EVENT EMITTERS
            form.querySelectorAll('.wikiform-btn-submit').forEach(function (btn) {
                btn.style.cursor = 'pointer';
                btn.onclick = function () {
                    var newParams = new URLSearchParams(window.location.search);
                    purgeFormUrlParams(newParams);
                    
                    // 1. HARVEST DROPDOWNS & ACTIVATION TOGGLE CHECKBOXES
                    form.querySelectorAll('select[data-wikiform-param], input[type="checkbox"][data-wikiform-param]').forEach(function (input) {
                        if (input.tagName === 'INPUT' && input.type === 'checkbox') {
                            if (input.checked) {
                                newParams.set(formId + '_' + input.getAttribute('data-wikiform-param'), input.value);
                            }
                        } else {
                            if (input.value && input.value.trim()) {
                                newParams.set(formId + '_' + input.getAttribute('data-wikiform-param'), input.value);
                            }
                        }
                    });

                    // 2. HARVEST USER CLICKER GRID METRICS
                    form.querySelectorAll('.wikiform-grid-count-display').forEach(function (node) {
                        var paramName = node.getAttribute('data-wikiform-param');
                        var countVal  = node.getAttribute('data-wikiform-count') || "0";
                        if (paramName && countVal !== "0" && countVal.trim() !== "") {
                            newParams.set(formId + '_' + paramName.toLowerCase().trim(), countVal);
                        }
                    });

                    window.location.href = mw.util.getUrl(mw.config.get('wgPageName')) + '?' + newParams.toString();
                };
            });

            // FORM GRID CLICK COUNTER INTERACTION ENGINE

(function() {
    var form = document.querySelector('.wikiform-form');
    var liveCalcBox = form.querySelector('.wikiform-livecalc');
    var headerNode = form.querySelector('.wikiform-livecalc-header');

    if (!form || !liveCalcBox || !headerNode) return console.error("Missing elements");

    console.log("Validation Block Armed: Click a '+' button on your grid cards now...");

    form.querySelectorAll('.wikiform-livecalc-btn').forEach(function(btn) {
        btn.onclick = function(e) {
            e.preventDefault();
            
            var row = btn.closest('.wikiform-livecalc-item');
            if (!row) return;
            
            var displayNode = row.querySelector('.wikiform-grid-count-display');
            if (!displayNode) return;

            // 1. calculate and update the card quantity counter number
            var currentCount = parseInt(displayNode.getAttribute('data-wikiform-count'), 10) || 0;
            var stepValue = parseInt(btn.getAttribute('data-wikiform-btn-step'), 10) || 0;

            currentCount = currentCount + stepValue;
            if (currentCount < 0) currentCount = 0;

            displayNode.setAttribute('data-wikiform-count', currentCount);
            displayNode.textContent = currentCount; 

            // 2. gather active dropdown parameters to secure goal calculation
            var argsArray = [];
            liveCalcBox.querySelectorAll('select[data-wikiform-param]').forEach(function(select) {
                var paramName = select.getAttribute('data-wikiform-param');
                var paramValue = select.value || "";
                if (paramName) {
                    argsArray.push('|' + paramName.toLowerCase().trim() + '=' + paramValue);
                }
            });

            // 3. fire the asynchronous background parsing call to fetch the true goal total
            var invokeStatement = '{{#invoke:PsychCalc|main' + argsArray.join('') + '|Route=BaseExpOnly}}';
            
            new mw.Api().parse(invokeStatement).done(function(rawText) {
                var cleanText = rawText.replace(/<[^>]*>/g, '').replace(/[\r\n\t]/g, '').trim();
                var goalInteger = parseInt(cleanText, 10) || 0;

                // 4. calculate the left-side number (cumulative item weights density totals)
                var cumulativeLiveWeight = 0;
                form.querySelectorAll('.wikiform-grid-count-display').forEach(function(node) {
                    var unitWeight = parseInt(node.getAttribute('data-wikiform-value'), 10) || 0;
                    var count = parseInt(node.getAttribute('data-wikiform-count'), 10) || 0;
                    cumulativeLiveWeight = cumulativeLiveWeight + (count * unitWeight);
                });

                // 5. overwrite the header layout text
                headerNode.textContent = cumulativeLiveWeight + " / " + goalInteger;
                console.log("GRID CLICK CALC SUCCESS: Header set to:", cumulativeLiveWeight + " / " + goalInteger);
            });
        };
    });
})();
            // GRID STOCKPILE MEMORY RESTORER
            form.querySelectorAll('.wikiform-grid-count-display').forEach(function (node) {
                var paramName = node.getAttribute('data-wikiform-param');
                if (paramName) {
                    // 1. check if this specific core count was saved in the browser URL parameters
                    var urlSavedCount = urlParams.get(formId + '_' + paramName.toLowerCase().trim());
                    if (urlSavedCount && urlSavedCount !== "0") {
                        var parsedCount = parseInt(urlSavedCount, 10) || 0;
                        
                        // 2. force custom quantities back onto grid row attributes targets safely
                        node.setAttribute('data-wikiform-count', parsedCount);
                        node.textContent = parsedCount;
                    }
                }
            });

        });
});