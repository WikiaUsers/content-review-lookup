/**
 * MultiLookup.js
 * Author: DJKurt
 * Description: Allows admins to check a user's global contributions across all Fandom wikis.
 * Features: Real API integration, cross-wiki search, contribution tracking, rate limiting.
 * Version: 2.0 - Full API Integration
 */

(function() {
    'use strict';

    // Configuration
    var config = {
        maxResultsPerWiki: 50,
        maxWikisToCheck: 25,
        showEditCounts: true,
        enableDarkMode: true,
        defaultSort: 'date',
        apiTimeout: 10000, // 10 seconds
        rateLimitDelay: 500, // ms between API calls
        useCommunityApi: true // Use Fandom's community API for wiki discovery
    };

    // Known Fandom wiki domains (can be expanded)
    var wikiDomains = [
        'community.fandom.com',
        'starwars.fandom.com',
        'minecraft.fandom.com',
        'marvel.fandom.com',
        'dc.fandom.com',
        'harrypotter.fandom.com',
        'lotr.fandom.com',
        'walkingdead.fandom.com',
        'residentevil.fandom.com',
        'fallout.fandom.com',
        'elderscrolls.fandom.com',
        'wowwiki.fandom.com',
        'destiny.fandom.com',
        'borderlands.fandom.com',
        'halo.fandom.com',
        'callofduty.fandom.com',
        'battlefield.fandom.com',
        'fortnite.fandom.com',
        'pubg.fandom.com',
        'apexlegends.fandom.com',
        'overwatch.fandom.com',
        'leagueoflegends.fandom.com',
        'dota2.fandom.com',
        'smashbros.fandom.com',
        'zelda.fandom.com',
        'pokemon.fandom.com',
        'finalfantasy.fandom.com',
        'kingdomhearts.fandom.com',
        'persona.fandom.com',
        'gta.fandom.com',
        'reddead.fandom.com',
        'cyberpunk.fandom.com',
        'witcher.fandom.com',
        'assassinscreed.fandom.com',
        'farcy.fandom.com',
        'watchdogs.fandom.com',
        'sims.fandom.com',
        'simcity.fandom.com',
        'civilization.fandom.com',
        'stellaris.fandom.com',
        'warhammer40k.fandom.com',
        'pathofexile.fandom.com',
        'diablo.fandom.com',
        'starcraft.fandom.com',
        'hearthstone.fandom.com',
        'warcraft.fandom.com',
        'runescape.fandom.com',
        'osrs.fandom.com',
        'oldschoolrunescape.fandom.com'
    ];

    // Check if user has admin rights
    function isAdmin() {
        if (window.mw && mw.config) {
            var userGroups = mw.config.get('wgUserGroups', []);
            return userGroups.includes('sysop') || userGroups.includes('staff') || userGroups.includes('util') || userGroups.includes('bureaucrat');
        }
        return false;
    }

    // Fetch real user contributions from a specific wiki
    async function fetchWikiContributions(wikiDomain, username, limit) {
        return new Promise((resolve) => {
            var apiUrl = `https://${wikiDomain}/api.php`;
            var params = new URLSearchParams({
                action: 'query',
                format: 'json',
                list: 'usercontribs',
                ucuser: username,
                uclimit: limit || config.maxResultsPerWiki,
                ucprop: 'title|timestamp|comment|size|ids|sizediff',
                origin: '*'
            });

            var fullUrl = `${apiUrl}?${params.toString()}`;
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', fullUrl, true);
            xhr.timeout = config.apiTimeout;
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        if (data && data.query && data.query.usercontribs) {
                            var contributions = data.query.usercontribs.map(function(contrib) {
                                return {
                                    title: contrib.title,
                                    url: `https://${wikiDomain}/wiki/${encodeURIComponent(contrib.title.replace(/ /g, '_'))}`,
                                    date: contrib.timestamp,
                                    summary: contrib.comment || 'No edit summary',
                                    size: contrib.size || 0,
                                    sizeDiff: contrib.sizediff || 0,
                                    revid: contrib.revid,
                                    parentid: contrib.parentid
                                };
                            });
                            
                            // Get user edit count for this wiki
                            var editCount = 0;
                            if (data.query && data.query.usercontribs.length > 0) {
                                // Also fetch userinfo for edit count
                                fetchUserEditCount(wikiDomain, username).then(function(count) {
                                    resolve({
                                        success: true,
                                        wikiName: wikiDomain.replace('.fandom.com', ''),
                                        wikiDomain: wikiDomain,
                                        editCount: count,
                                        contributions: contributions
                                    });
                                }).catch(function() {
                                    resolve({
                                        success: true,
                                        wikiName: wikiDomain.replace('.fandom.com', ''),
                                        wikiDomain: wikiDomain,
                                        editCount: contributions.length,
                                        contributions: contributions
                                    });
                                });
                            } else {
                                resolve({
                                    success: true,
                                    wikiName: wikiDomain.replace('.fandom.com', ''),
                                    wikiDomain: wikiDomain,
                                    editCount: 0,
                                    contributions: []
                                });
                            }
                        } else {
                            resolve({
                                success: true,
                                wikiName: wikiDomain.replace('.fandom.com', ''),
                                wikiDomain: wikiDomain,
                                editCount: 0,
                                contributions: []
                            });
                        }
                    } catch (e) {
                        resolve({
                            success: false,
                            wikiName: wikiDomain.replace('.fandom.com', ''),
                            wikiDomain: wikiDomain,
                            error: 'Parse error'
                        });
                    }
                } else {
                    resolve({
                        success: false,
                        wikiName: wikiDomain.replace('.fandom.com', ''),
                        wikiDomain: wikiDomain,
                        error: 'HTTP ' + xhr.status
                    });
                }
            };
            
            xhr.onerror = function() {
                resolve({
                    success: false,
                    wikiName: wikiDomain.replace('.fandom.com', ''),
                    wikiDomain: wikiDomain,
                    error: 'Network error'
                });
            };
            
            xhr.ontimeout = function() {
                resolve({
                    success: false,
                    wikiName: wikiDomain.replace('.fandom.com', ''),
                    wikiDomain: wikiDomain,
                    error: 'Timeout'
                });
            };
            
            xhr.send();
        });
    }

    // Fetch user edit count for a specific wiki
    function fetchUserEditCount(wikiDomain, username) {
        return new Promise(function(resolve, reject) {
            var apiUrl = `https://${wikiDomain}/api.php`;
            var params = new URLSearchParams({
                action: 'query',
                format: 'json',
                list: 'users',
                ususers: username,
                usprop: 'editcount',
                origin: '*'
            });
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `${apiUrl}?${params.toString()}`, true);
            xhr.timeout = 5000;
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        if (data && data.query && data.query.users && data.query.users[0]) {
                            resolve(data.query.users[0].editcount || 0);
                        } else {
                            resolve(0);
                        }
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error('HTTP ' + xhr.status));
                }
            };
            
            xhr.onerror = function() { reject(new Error('Network error')); };
            xhr.ontimeout = function() { reject(new Error('Timeout')); };
            xhr.send();
        });
    }

    // Search for user across multiple wikis with rate limiting
    async function searchUserAcrossWikis(username, maxWikis, onProgress) {
        var results = [];
        var wikisToSearch = wikiDomains.slice(0, maxWikis);
        var totalWikis = wikisToSearch.length;
        var completed = 0;
        
        for (var i = 0; i < wikisToSearch.length; i++) {
            var wiki = wikisToSearch[i];
            
            try {
                var result = await fetchWikiContributions(wiki, username, config.maxResultsPerWiki);
                if (result.success && result.editCount > 0) {
                    results.push(result);
                }
            } catch (e) {
                console.log(`Failed to fetch from ${wiki}:`, e);
            }
            
            completed++;
            if (onProgress) {
                onProgress(completed, totalWikis, results.length);
            }
            
            // Rate limiting delay
            if (i < wikisToSearch.length - 1) {
                await new Promise(resolve => setTimeout(resolve, config.rateLimitDelay));
            }
        }
        
        // Sort by edit count (most active wikis first)
        results.sort(function(a, b) {
            return b.editCount - a.editCount;
        });
        
        return results;
    }

    // Render the main MultiLookup page
    function renderMultiLookupPage(container) {
        var html = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 28px;">🌐 DJKurt's MultiLookup Tool v2.0</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">Real API Integration — Global user lookup across Fandom wikis</p>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: bold;">Username or IP Address:</label>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <input type="text" id="multilookup-user" placeholder="e.g., DJKurt" style="flex: 1; padding: 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 16px;">
                    <button id="multilookup-search" style="padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">🔍 Search Real Data</button>
                    <button id="multilookup-advanced" style="padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">⚙️ Advanced</button>
                </div>
                <div id="multilookup-advanced-panel" style="display: none; margin-top: 15px; padding: 15px; background: white; border-radius: 5px; border: 1px solid #ddd;">
                    <label><input type="checkbox" id="show-editcounts" ${config.showEditCounts ? 'checked' : ''}> Show detailed edit counts</label><br>
                    <label><input type="checkbox" id="enable-darkmode" ${config.enableDarkMode ? 'checked' : ''}> Enable dark mode</label><br>
                    <label>Max wikis to check (1-50): <input type="number" id="max-wikis" value="${config.maxWikisToCheck}" min="1" max="50" style="width: 60px;"></label><br>
                    <label>Results per wiki: <input type="number" id="results-per-wiki" value="${config.maxResultsPerWiki}" min="5" max="100" style="width: 60px;"></label><br>
                    <label>Sort by: 
                        <select id="sort-by">
                            <option value="date" ${config.defaultSort === 'date' ? 'selected' : ''}>Date (newest first)</option>
                            <option value="wiki" ${config.defaultSort === 'wiki' ? 'selected' : ''}>Wiki name</option>
                            <option value="edits" ${config.defaultSort === 'edits' ? 'selected' : ''}>Most edits</option>
                        </select>
                    </label>
                </div>
            </div>
            
            <div id="multilookup-progress" style="display: none;">
                <div style="background: #e0e0e0; border-radius: 10px; overflow: hidden; margin-bottom: 10px;">
                    <div id="progress-bar" style="background: #667eea; width: 0%; height: 30px; transition: width 0.3s; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;"></div>
                </div>
                <p id="progress-status" style="text-align: center; color: #666;">Searching wikis...</p>
            </div>
            
            <div id="multilookup-results" style="display: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                    <h2 style="margin: 0;">Results for: <span id="search-username"></span></h2>
                    <div>
                        <button id="export-results" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">📥 Export CSV</button>
                        <button id="clear-results" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">🗑️ Clear</button>
                    </div>
                </div>
                <div id="results-summary" style="background: #e7f3ff; padding: 10px; border-radius: 5px; margin-bottom: 20px;"></div>
                <div id="results-content"></div>
            </div>
            
            <div id="multilookup-error" style="display: none; background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-top: 20px;"></div>
            
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .wiki-card {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    margin-bottom: 15px;
                    overflow: hidden;
                    transition: box-shadow 0.3s;
                }
                .wiki-card:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .wiki-header {
                    background: #667eea;
                    color: white;
                    padding: 12px 15px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .wiki-header h3 {
                    margin: 0;
                    font-size: 18px;
                }
                .wiki-badge {
                    background: rgba(255,255,255,0.2);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                }
                .wiki-contributions {
                    padding: 15px;
                    display: none;
                    max-height: 400px;
                    overflow-y: auto;
                }
                .wiki-contributions.show {
                    display: block;
                }
                .contribution-item {
                    padding: 10px;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 14px;
                }
                .contribution-item:hover {
                    background: #f8f9fa;
                }
                .contribution-title {
                    font-weight: bold;
                    color: #3366cc;
                    text-decoration: none;
                }
                .contribution-title:hover {
                    text-decoration: underline;
                }
                .contribution-date {
                    color: #6c757d;
                    font-size: 12px;
                    margin-left: 10px;
                }
                .size-positive {
                    color: #28a745;
                }
                .size-negative {
                    color: #dc3545;
                }
                .dark-mode {
                    background: #1a1a2e;
                    color: #eee;
                }
                .dark-mode .wiki-card {
                    background: #16213e;
                    border-color: #0f3460;
                }
                .dark-mode .contribution-item {
                    border-bottom-color: #0f3460;
                }
                .dark-mode .contribution-item:hover {
                    background: #1a1a3e;
                }
                .dark-mode #results-summary {
                    background: #0f3460;
                    color: #eee;
                }
            </style>
        `;
        
        container.innerHTML = html;
        
        // Dark mode toggle
        var darkModeCheckbox = document.getElementById('enable-darkmode');
        if (darkModeCheckbox) {
            darkModeCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('dark-mode');
                    container.classList.add('dark-mode');
                    config.enableDarkMode = true;
                } else {
                    document.body.classList.remove('dark-mode');
                    container.classList.remove('dark-mode');
                    config.enableDarkMode = false;
                }
            });
        }
        
        // Search button handler
        document.getElementById('multilookup-search').addEventListener('click', function() {
            var username = document.getElementById('multilookup-user').value.trim();
            if (username) {
                performRealMultiLookup(username);
            } else {
                alert('Please enter a username.');
            }
        });
        
        // Advanced panel toggle
        document.getElementById('multilookup-advanced').addEventListener('click', function() {
            var panel = document.getElementById('multilookup-advanced-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });
        
        // Enter key support
        document.getElementById('multilookup-user').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('multilookup-search').click();
            }
        });
        
        // Clear results
        document.getElementById('clear-results').addEventListener('click', function() {
            document.getElementById('multilookup-results').style.display = 'none';
            document.getElementById('multilookup-user').value = '';
            document.getElementById('multilookup-error').style.display = 'none';
        });
    }
    
    // Perform real API lookup
    async function performRealMultiLookup(username) {
        var progressDiv = document.getElementById('multilookup-progress');
        var resultsDiv = document.getElementById('multilookup-results');
        var errorDiv = document.getElementById('multilookup-error');
        var progressBar = document.getElementById('progress-bar');
        var progressStatus = document.getElementById('progress-status');
        var searchSpan = document.getElementById('search-username');
        
        // Get settings
        var maxWikis = parseInt(document.getElementById('max-wikis').value) || 20;
        var resultsPerWiki = parseInt(document.getElementById('results-per-wiki').value) || 50;
        config.maxResultsPerWiki = resultsPerWiki;
        config.showEditCounts = document.getElementById('show-editcounts').checked;
        var sortBy = document.getElementById('sort-by').value;
        
        // Reset display
        progressDiv.style.display = 'block';
        resultsDiv.style.display = 'none';
        errorDiv.style.display = 'none';
        progressBar.style.width = '0%';
        progressStatus.textContent = 'Starting search...';
        searchSpan.textContent = username;
        
        var wikisFound = 0;
        var totalEdits = 0;
        
        try {
            var results = await searchUserAcrossWikis(username, maxWikis, function(completed, total, found) {
                var percent = (completed / total) * 100;
                progressBar.style.width = percent + '%';
                progressBar.textContent = Math.round(percent) + '%';
                progressStatus.textContent = `Searched ${completed} of ${total} wikis... Found activity on ${found} wikis so far.`;
                wikisFound = found;
            });
            
            // Calculate total edits
            for (var i = 0; i < results.length; i++) {
                totalEdits += results[i].editCount;
            }
            
            progressDiv.style.display = 'none';
            
            if (results.length === 0) {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = `<strong>⚠️ No results found for "${username}"</strong><br>
                    No contributions were found across any of the searched wikis. 
                    The user may not exist or may have no edits.`;
                return;
            }
            
            displayRealResults(results, username, sortBy, totalEdits);
            
        } catch (error) {
            progressDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `<strong>❌ Error occurred</strong><br>${error.message || 'Unknown error'}<br><br>
                This could be due to network issues or API limitations. Try again with fewer wikis.`;
            console.error('MultiLookup error:', error);
        }
    }
    
    // Display real API results
    function displayRealResults(results, username, sortBy, totalEdits) {
        var resultsContent = document.getElementById('results-content');
        var summaryDiv = document.getElementById('results-summary');
        var resultsDiv = document.getElementById('multilookup-results');
        
        // Sort results
        var sortedResults = results.slice();
        if (sortBy === 'wiki') {
            sortedResults.sort(function(a, b) {
                return a.wikiName.localeCompare(b.wikiName);
            });
        } else if (sortBy === 'edits') {
            sortedResults.sort(function(a, b) {
                return b.editCount - a.editCount;
            });
        }
        
        // Calculate date range
        var allDates = [];
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].contributions.length; j++) {
                allDates.push(new Date(results[i].contributions[j].date));
            }
        }
        allDates.sort(function(a, b) { return b - a; });
        var lastEdit = allDates[0] ? allDates[0].toLocaleDateString() : 'Unknown';
        var firstEdit = allDates[allDates.length - 1] ? allDates[allDates.length - 1].toLocaleDateString() : 'Unknown';
        
        // Update summary
        summaryDiv.innerHTML = `
            <strong>📊 Real API Results for ${username}:</strong><br>
            • Found on <strong>${results.length}</strong> wiki(s) with <strong>${totalEdits.toLocaleString()}</strong> total edits<br>
            • First edit: ${firstEdit} | Last edit: ${lastEdit}<br>
            • Most active wiki: <strong>${sortedResults[0] ? sortedResults[0].wikiName.toUpperCase() : 'N/A'}</strong> (${sortedResults[0] ? sortedResults[0].editCount.toLocaleString() : 0} edits)
        `;
        
        // Build wiki cards
        resultsContent.innerHTML = '';
        
        for (var i = 0; i < sortedResults.length; i++) {
            var wiki = sortedResults[i];
            var wikiCard = document.createElement('div');
            wikiCard.className = 'wiki-card';
            
            var contributionsHtml = '';
            var displayContribs = wiki.contributions.slice(0, 20);
            
            for (var j = 0; j < displayContribs.length; j++) {
                var contrib = displayContribs[j];
                var dateObj = new Date(contrib.date);
                var formattedDate = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
                var sizeClass = contrib.sizeDiff > 0 ? 'size-positive' : (contrib.sizeDiff < 0 ? 'size-negative' : '');
                var sizeSymbol = contrib.sizeDiff > 0 ? '+' : (contrib.sizeDiff < 0 ? '' : '');
                
                contributionsHtml += `
                    <div class="contribution-item">
                        <a href="${contrib.url}" target="_blank" class="contribution-title">${contrib.title.replace(/_/g, ' ')}</a>
                        <span class="contribution-date">${formattedDate}</span>
                        <div style="font-size: 12px; color: #666; margin-top: 4px;">${contrib.summary.substring(0, 100)}</div>
                        <div style="font-size: 11px; margin-top: 4px;">
                            <span class="${sizeClass}">${sizeSymbol}${contrib.sizeDiff || 0} bytes</span>
                            ${contrib.size ? ` | Total: ${contrib.size.toLocaleString()} bytes` : ''}
                        </div>
                    </div>
                `;
            }
            
            if (wiki.contributions.length > 20) {
                contributionsHtml += `<div style="padding: 10px; text-align: center; color: #667eea;">
                    <a href="https://${wiki.wikiDomain}/wiki/Special:Contributions/${encodeURIComponent(username)}" target="_blank">+ View all ${wiki.editCount.toLocaleString()} contributions →</a>
                </div>`;
            }
            
            if (wiki.contributions.length === 0) {
                contributionsHtml = '<div style="padding: 15px; text-align: center; color: #999;">No recent contributions found.</div>';
            }
            
            wikiCard.innerHTML = `
                <div class="wiki-header" data-wiki="${wiki.wikiName}">
                    <h3>📚 ${wiki.wikiName.toUpperCase()} Wiki</h3>
                    <div class="wiki-badge">${wiki.editCount.toLocaleString()} edits</div>
                </div>
                <div class="wiki-contributions" id="contrib-${wiki.wikiName.replace(/[^a-z0-9]/gi, '')}">
                    ${contributionsHtml}
                </div>
            `;
            
            resultsContent.appendChild(wikiCard);
        }
        
        // Add click handlers for collapsible sections
        var headers = document.querySelectorAll('.wiki-header');
        for (var k = 0; k < headers.length; k++) {
            headers[k].addEventListener('click', function() {
                var contributionsDiv = this.nextElementSibling;
                contributionsDiv.classList.toggle('show');
            });
        }
        
        resultsDiv.style.display = 'block';
        
        // Export handler
        document.getElementById('export-results').onclick = function() {
            exportRealResultsToCSV(results, username);
        };
    }
    
    // Export real results to CSV
    function exportRealResultsToCSV(results, username) {
        var csvRows = [];
        csvRows.push(['Username', 'Wiki', 'Edit Count', 'Page Title', 'Date', 'Summary', 'Size Change'].join(','));
        
        for (var i = 0; i < results.length; i++) {
            var wiki = results[i];
            for (var j = 0; j < wiki.contributions.length; j++) {
                var contrib = wiki.contributions[j];
                csvRows.push([
                    username,
                    wiki.wikiName,
                    wiki.editCount,
                    '"' + contrib.title.replace(/"/g, '""') + '"',
                    contrib.date,
                    '"' + (contrib.summary || '').replace(/"/g, '""').substring(0, 200) + '"',
                    contrib.sizeDiff || 0
                ].join(','));
            }
        }
        
        var csvContent = csvRows.join('\n');
        var blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'multilookup_' + username + '_' + new Date().toISOString().split('T')[0] + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Add a link to Special:MultiLookup in the tools menu
    function addToolLink() {
        setTimeout(function() {
            var toolsMenu = document.querySelector('#p-tb ul, .toolbox ul, .vector-menu-tabs, .mw-portlet-tools ul');
            if (toolsMenu) {
                var existingLink = toolsMenu.querySelector('a[href*="Special:MultiLookup"]');
                if (!existingLink) {
                    var listItem = document.createElement('li');
                    listItem.id = 'n-multilookup';
                    listItem.innerHTML = '<a href="/wiki/Special:MultiLookup" title="Search user across all Fandom wikis">🌐 MultiLookup</a>';
                    toolsMenu.appendChild(listItem);
                }
            }
        }, 1500);
    }
    
    // Initialize the script
    function init() {
        if (!isAdmin()) {
            console.log('[MultiLookup] Admin rights required. Tool will not load.');
            return;
        }
        
        addToolLink();
        
        if (window.location.pathname.indexOf('Special:MultiLookup') !== -1) {
            var container = document.createElement('div');
            container.id = 'multilookup-root';
            var contentArea = document.querySelector('#mw-content-text, .mw-body-content');
            if (contentArea) {
                contentArea.innerHTML = '';
                contentArea.appendChild(container);
                renderMultiLookupPage(container);
            }
        }
    }
    
    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();