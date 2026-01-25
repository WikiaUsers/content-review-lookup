(function(mw, $) {
    $(function() {
        var diffs = [
            { name: 'Easy', color: '#90EE90' },
            { name: 'Medium', color: '#ffff00' }, // Updated to vibrant yellow
            { name: 'Hard', color: '#FF6666' },
            { name: 'Nightmare', color: '#B19CD9' }
        ];
        var currentDiff = 0;

        if ($('#assistant-frame').length === 0) {
            $('body').append(`
                <div id="assistant-frame">
                    <span class="close-frame" title="Close">X</span>
                    <div class="frame-header">MATCH SETTINGS</div>
                    <div id="frame-content">
                        <div class="settings-row-inline">
                            <div class="setting-item">
                                <label class="setting-label">PLAYERS</label>
                                <input type="number" id="player-count" min="1" max="4" value="1">
                            </div>
                            <div class="setting-item">
                                <label class="setting-label">DIFFICULTY</label>
                                <div id="diff-container">
                                    <span class="arrow" id="prev-diff"><</span>
                                    <span id="difficulty-display">EASY</span>
                                    <span class="arrow" id="next-diff">></span>
                                </div>
                            </div>
                        </div>
                        <div id="extra-settings"></div> 
                    </div>
                </div>
            `);
        }

        function updateDiffUI() {
            var d = diffs[currentDiff];
            $('#difficulty-display').text(d.name).css('color', d.color);
        }

        $(document).on('click', '#start-match-btn', function() {
            $('#assistant-frame').fadeIn(200);
            updateDiffUI();
        });

        $(document).on('click', '.close-frame', function() { $('#assistant-frame').fadeOut(200); });
        $(document).on('click', '#next-diff', function() { currentDiff = (currentDiff + 1) % diffs.length; updateDiffUI(); });
        $(document).on('click', '#prev-diff', function() { currentDiff = (currentDiff - 1 + diffs.length) % diffs.length; updateDiffUI(); });

        updateDiffUI();
    });
})(mediaWiki, jQuery);

/* =================================================================
   MODULE: CHALLENGES FETCHER V3
   - Fetches from the CURRENT page (Match_Assistant)
   - Supports numbered lists (#) with no extra line gaps
   - Case-sensitive matching for "Challanges:"
   ================================================================= */

(function(mw, $) {
    $(function() {
        var $targetSlot = $('#extra-settings');
        if (!$targetSlot.length) return;

        // Add the section structure
        $targetSlot.append(`
            <div class="setting-item-vertical" id="challenges-section">
                <label class="setting-label">CHALLENGES</label>
                <div id="challenges-loader" style="color:#888; font-size:11px; letter-spacing:1px;">FETCHING FROM PAGE...</div>
                <div id="challenges-grid-container" class="challenges-grid"></div>
            </div>
        `);

        // We use mw.config to get the current page name dynamically
        var currentPage = mw.config.get('wgPageName');

        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'parse',
                page: currentPage,
                prop: 'wikitext',
                format: 'json',
                formatversion: 2
            },
            dataType: 'json',
            success: function(data) {
                $('#challenges-loader').remove();

                if (!data || !data.parse) {
                    $('#challenges-grid-container').html('<div style="color:#ff4444; font-size:10px;">ERROR: COULD NOT READ PAGE DATA</div>');
                    return;
                }

                var wikitext = data.parse.wikitext;

                /* REGEX EXPLANATION:
                   1. Looks for "Challanges:" (matching your screenshot)
                   2. Uses [\s\S]*? to skip any invisible formatting or immediate newlines
                   3. Captures all following lines starting with # (numbered list)
                */
                var regex = /Challanges:[\s\S]*?((?:^#.*(?:\r?\n|$))+)/m;
                var match = wikitext.match(regex);

                if (match && match[1]) {
                    var lines = match[1].split('\n');
                    lines.forEach(function(line) {
                        // Remove the '#' and trim whitespace to get the challenge text
                        var cleanName = line.replace(/^#\s*/, '').trim();
                        if (cleanName) {
                            $('#challenges-grid-container').append(
                                $('<div class="challenge-btn">').text(cleanName)
                            );
                        }
                    });
                } else {
                    $('#challenges-grid-container').html('<div style="color:#888; font-size:10px;">NO LIST FOUND UNDER "CHALLANGES:"</div>');
                }
            },
            error: function() {
                $('#challenges-loader').html('<div style="color:#ff4444; font-size:10px;">CONNECTION ERROR</div>');
            }
        });
    });
})(mediaWiki, jQuery);

/* =================================================================
   MODULE: CHALLENGES CONTROL (V4)
   - Adds "All" and "Reset" buttons
   - Syncs "All" button highlight with manual selection
   ================================================================= */

(function(mw, $) {
    $(function() {
        // 1. Create the new header row with All and Reset buttons
        // We wait a tiny bit to make sure the previous module finished appending
        setTimeout(function() {
            var $section = $('#challenges-section');
            if (!$section.length) return;

            // Replace the old label with a row containing buttons
            $section.find('.setting-label').replaceWith(`
                <div class="challenges-controls-wrapper">
                    <label class="setting-label" style="margin:0;">CHALLENGES</label>
                    <div class="challenge-controls-right">
                        <span id="reset-challenges">Reset</span>
                        <div id="all-challenges-btn">ALL</div>
                    </div>
                </div>
            `);
        }, 100);

        // 2. HELPER: Update the "All" button state
        function updateAllButtonState() {
            var total = $('.challenge-btn').length;
            var selected = $('.challenge-btn.selected').length;
            
            if (total > 0 && total === selected) {
                $('#all-challenges-btn').addClass('selected');
            } else {
                $('#all-challenges-btn').removeClass('selected');
            }
        }

        // 3. EVENT: Individual Challenge Click (Updated)
        $(document).on('click', '.challenge-btn', function() {
            // Logic for toggling is already in previous part, 
            // we just need to trigger the "All" button check
            setTimeout(updateAllButtonState, 10);
        });

        // 4. EVENT: Reset Button
        $(document).on('click', '#reset-challenges', function() {
            $('.challenge-btn').removeClass('selected');
            updateAllButtonState();
        });

        // 5. EVENT: All Button
        $(document).on('click', '#all-challenges-btn', function() {
            var $btn = $(this);
            if ($btn.hasClass('selected')) {
                // If already on, turn everything off (Reset)
                $('.challenge-btn').removeClass('selected');
            } else {
                // If off, turn everything on
                $('.challenge-btn').addClass('selected');
            }
            updateAllButtonState();
        });
    });
})(mediaWiki, jQuery);

/* =================================================================
   MODULE: ADVANCED CHALLENGE CONTROLS (V5)
   - Synchronizes All/Reset buttons
   - Implements toggle switches for individual challenges
   ================================================================= */
/* =================================================================
   MODULE: CHALLENGES FINAL (Line 200+)
   - Cleans up duplicates automatically
   - Fetches from current page data
   - Handles "All" and "Reset" toggle logic
   ================================================================= */

(function(mw, $) {
    $(function() {
        var $targetSlot = $('#extra-settings');
        if (!$targetSlot.length) return;

        // 1. SELF-CLEAN: Remove any old challenge sections before building
        $('#challenges-section').remove();

        // 2. BUILD UI STRUCTURE
        $targetSlot.append(`
            <div class="setting-item-vertical" id="challenges-section">
                <div class="challenges-header-row">
                    <label class="setting-label" style="margin:0;">CHALLENGES</label>
                    <div class="controls-group">
                        <span id="reset-challenges-text">Reset</span>
                        <div id="all-btn-box">All</div>
                    </div>
                </div>
                <div id="challenges-grid-container" class="challenges-grid">
                    <div id="challenges-loader" style="color:#555; font-size:10px; padding:10px;">LOADING...</div>
                </div>
            </div>
        `);

        // 3. HELPER: Sync the "All" button box state
        function syncAllBox() {
            var total = $('.challenge-btn').length;
            var active = $('.challenge-btn.selected').length;
            var $allBox = $('#all-btn-box');

            if (total > 0 && total === active) {
                $allBox.addClass('active');
            } else {
                $allBox.removeClass('active');
            }
        }

        // 4. FETCH DATA FROM CURRENT PAGE
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'parse',
            page: mw.config.get('wgPageName'),
            prop: 'wikitext',
            format: 'json',
            formatversion: 2
        }).done(function(data) {
            $('#challenges-loader').remove();
            
            if (!data || !data.parse) return;

            var wikitext = data.parse.wikitext;
            // Regex matches "Challanges:" followed by a numbered list
            var regex = /Challanges:[\s\S]*?((?:^#.*(?:\r?\n|$))+)/m;
            var match = wikitext.match(regex);

            if (match && match[1]) {
                var lines = match[1].split('\n');
                lines.forEach(function(line) {
                    var cleanName = line.replace(/^#\s*/, '').trim();
                    if (cleanName) {
                        $('#challenges-grid-container').append(
                            $('<div class="challenge-btn">').text(cleanName)
                        );
                    }
                });
            }
        });

        // 5. INTERACTION EVENTS
        // Individual Toggle
        $(document).off('click.challenge').on('click.challenge', '.challenge-btn', function() {
            $(this).toggleClass('selected');
            syncAllBox();
        });

        // Reset All
        $(document).on('click', '#reset-challenges-text', function() {
            $('.challenge-btn').removeClass('selected');
            $('#all-btn-box').removeClass('active');
        });

        // All Toggle
        $(document).on('click', '#all-btn-box', function() {
            var $this = $(this);
            if ($this.hasClass('active')) {
                $('.challenge-btn').removeClass('selected');
                $this.removeClass('active');
            } else {
                $('.challenge-btn').addClass('selected');
                $this.addClass('active');
            }
        });
    });
})(mediaWiki, jQuery);