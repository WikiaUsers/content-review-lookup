/*
 * @title       SearchContributions.js
 * @version     1.0
 * @description A script that let's you search contributions from users.
 * @author      MonsterSchoolFan
 * @license     CC-BY-SA-3.0
 */

( () => {
    'use strict';
    
    // Some Configuration
    var config = {
        api: new mw.Api(),
        defaultLimit: 50,
        maxLimit: 500
    };
    
    function SearchContributions() {
        this.init();
    }
    
    SearchContributions.prototype = {
        init: function() {
            this.createInterface();
            this.bindEvents();
        },
        
        createInterface: function() {
            var container = document.createElement('div');
            container.className = 'search-contributions';
            container.innerHTML = `
                <div class="search-contributions-header">
                    <h3>Search User Contributions</h3>
                </div>
                <div class="search-contributions-form">
                    <div class="form-row">
                        <label for="sc-username">Username:</label>
                        <input type="text" id="sc-username" placeholder="Enter username (leave empty for current ones)">
                    </div>
                    <div class="form-row">
                        <label for="sc-pagetitle">Page Title:</label>
                        <input type="text" id="sc-pagetitle" placeholder="Search at the page titles">
                    </div>
                    <div class="form-row">
                        <label for="sc-comment">Edit Comment:</label>
                        <input type="text" id="sc-comment" placeholder="Search at the edit comments">
                    </div>
                    <div class="form-row">
                        <label for="sc-date">Date:</label>
                        <input type="date" id="sc-date">
                    </div>
                    <div class="form-row">
                        <label for="sc-namespace">Namespace:</label>
                        <select id="sc-namespace">
                            <option value="">All namespaces</option>
                            <option value="0">(Main)</option>
                            <option value="1">Talk</option>
                            <option value="2">User</option>
                            <option value="3">User talk</option>
                            <option value="4">Project</option>
                            <option value="5">Project talk</option>
                            <option value="6">File</option>
                            <option value="7">File talk</option>
                            <option value="8">MediaWiki</option>
                            <option value="9">MediaWiki talk</option>
                            <option value="10">Template</option>
                            <option value="11">Template talk</option>
                            <option value="12">Help</option>
                            <option value="13">Help talk</option>
                            <option value="14">Category</option>
                            <option value="15">Category talk</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="sc-limit">Results limit:</label>
                        <input type="number" id="sc-limit" value="${config.defaultLimit}" min="1" max="${config.maxLimit}">
                    </div>
                    <div class="form-row">
                        <button id="sc-search-btn" class="wds-button wds-is-secondary">Search Contributions</button>
                        <button id="sc-reset-btn" class="wds-button wds-is-text">Reset</button>
                    </div>
                </div>
                <div class="search-contributions-results" style="display: none;">
                    <div class="results-header">
                        <h4>Search Results</h4>
                        <div class="results-stats"></div>
                    </div>
                    <div class="results-list"></div>
                    <div class="results-pagination"></div>
                </div>
                <div class="search-contributions-loading" style="display: none;">
                    <div class="wds-spinner"></div>
                    <span>Searching some of the contributions...</span>
                </div>
            `;
            
            // Added some styles
            this.addStyles();
            
            // Append to this content
            var content = document.getElementById('mw-content-text');
            if (content) {
                content.appendChild(container);
            }
        },
        
        addStyles: function() {
            var styles = `
                .search-contributions {
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 15px;
                    margin: 20px 0;
                    background: var(--theme-page-background-color);
                }
                
                .search-contributions-header h3 {
                    margin-top: 0;
                    color: var(--theme-page-text-color);
                }
                
                .form-row {
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                }
                
                .form-row label {
                    width: 120px;
                    font-weight: bold;
                    color: var(--theme-page-text-color);
                }
                
                .form-row input,
                .form-row select {
                    flex: 1;
                    padding: 6px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                
                .search-contributions-results {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 15px;
                }
                
                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .results-stats {
                    color: #666;
                    font-size: 0.9em;
                }
                
                .contribution-item {
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    padding: 10px;
                    margin-bottom: 10px;
                    background: var(--theme-page-background-color);
                }
                
                .contribution-title {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .contribution-meta {
                    font-size: 0.9em;
                    color: #666;
                    margin-bottom: 5px;
                }
                
                .contribution-comment {
                    font-style: italic;
                    color: #888;
                }
                
                .contribution-size {
                    color: #2e7540;
                }
                
                .contribution-negative {
                    color: #cc0000;
                }
                
                .results-pagination {
                    margin-top: 15px;
                    text-align: center;
                }
                
                .pagination-btn {
                    margin: 0 5px;
                    padding: 5px 10px;
                }
                
                .search-contributions-loading {
                    text-align: center;
                    padding: 20px;
                    color: var(--theme-page-text-color);
                }
                
                .wds-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-right: 10px;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .no-results {
                    text-align: center;
                    padding: 20px;
                    color: #666;
                    font-style: italic;
                }
            `;
            
            var styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        },
        
        bindEvents: function() {
            var self = this;
            
            document.getElementById('sc-search-btn').addEventListener('click', function() {
                self.performSearch();
            });
            
            document.getElementById('sc-reset-btn').addEventListener('click', function() {
                self.resetForm();
            });
            
            // Make sure that Enter key is supported
            ['sc-username', 'sc-pagetitle', 'sc-comment'].forEach(function(id) {
                document.getElementById(id).addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        self.performSearch();
                    }
                });
            });
        },
        
        performSearch: function() {
            var username = document.getElementById('sc-username').value.trim();
            var pagetitle = document.getElementById('sc-pagetitle').value.trim();
            var comment = document.getElementById('sc-comment').value.trim();
            var date = document.getElementById('sc-date').value;
            var namespace = document.getElementById('sc-namespace').value;
            var limit = parseInt(document.getElementById('sc-limit').value) || config.defaultLimit;
            
            // Make sure it has Validate limit
            if (limit > config.maxLimit) {
                limit = config.maxLimit;
                document.getElementById('sc-limit').value = config.maxLimit;
            }
            
            // Use the current user if no username is provided
            if (!username) {
                username = mw.config.get('wgUserName');
                if (!username) {
                    this.showError('Please enter a username or try to log in');
                    return;
                }
            }
            
            this.showLoading(true);
            this.searchContributions(username, pagetitle, comment, date, namespace, limit);
        },
        
        searchContributions: function(username, pagetitle, comment, date, namespace, limit) {
            var self = this;
            var params = {
                action: 'query',
                list: 'usercontribs',
                ucuser: username,
                uclimit: limit,
                format: 'json'
            };
            
            // Added some of optional parameters
            if (pagetitle) params.uctitle = pagetitle;
            if (comment) params.uccomment = comment;
            if (date) params.ucend = date + 'T23:59:59Z';
            if (namespace) params.ucnamespace = namespace;
            
            config.api.get(params)
                .done(function(data) {
                    self.displayResults(data.query.usercontribs, username);
                })
                .fail(function(error) {
                    self.showError('ERROR: Search failed: ' + error);
                })
                .always(function() {
                    self.showLoading(false);
                });
        },
        
        displayResults: function(contributions, username) {
            var resultsContainer = document.querySelector('.search-contributions-results');
            var resultsList = document.querySelector('.results-list');
            var resultsStats = document.querySelector('.results-stats');
            
            resultsContainer.style.display = 'block';
            resultsList.innerHTML = '';
            
            if (!contributions || contributions.length === 0) {
                resultsStats.textContent = 'No contributions found';
                resultsList.innerHTML = '<div class="no-results">No contributions that matches to your search criterias</div>';
                return;
            }
            
            resultsStats.textContent = `Found ${contributions.length} contributions for ${username}`;
            
            contributions.forEach(function(contribution) {
                var item = document.createElement('div');
                item.className = 'contribution-item';
                
                var titleLink = contribution.title ? 
                    `<a href="/wiki/${encodeURIComponent(contribution.title)}" target="_blank">${contribution.title}</a>` :
                    'Unknown page';
                
                var timestamp = new Date(contribution.timestamp).toLocaleString();
                var sizeDiff = contribution.sizediff || 0;
                var sizeClass = sizeDiff >= 0 ? 'contribution-size' : 'contribution-negative';
                var sizeSymbol = sizeDiff >= 0 ? '+' : '';
                
                item.innerHTML = `
                    <div class="contribution-title">${titleLink}</div>
                    <div class="contribution-meta">
                        <strong>Timestamp:</strong> ${timestamp} | 
                        <strong>Size change:</strong> <span class="${sizeClass}">${sizeSymbol}${sizeDiff}</span> | 
                        <strong>Namespace:</strong> ${contribution.ns}
                    </div>
                    ${contribution.comment ? `<div class="contribution-comment"><strong>Comment:</strong> ${contribution.comment}</div>` : ''}
                `;
                
                resultsList.appendChild(item);
            });
        },
        
        showLoading: function(show) {
            var loading = document.querySelector('.search-contributions-loading');
            var form = document.querySelector('.search-contributions-form');
            var results = document.querySelector('.search-contributions-results');
            
            if (show) {
                loading.style.display = 'block';
                form.style.opacity = '0.5';
                form.style.pointerEvents = 'none';
                results.style.display = 'none';
            } else {
                loading.style.display = 'none';
                form.style.opacity = '1';
                form.style.pointerEvents = 'auto';
            }
        },
        
        showError: function(message) {
            this.showLoading(false);
            
            // Error Displays - you can enhance this if you want.
            alert('SearchContributions Error: ' + message);
        },
        
        resetForm: function() {
            document.getElementById('sc-username').value = '';
            document.getElementById('sc-pagetitle').value = '';
            document.getElementById('sc-comment').value = '';
            document.getElementById('sc-date').value = '';
            document.getElementById('sc-namespace').value = '';
            document.getElementById('sc-limit').value = config.defaultLimit;
            
            var results = document.querySelector('.search-contributions-results');
            results.style.display = 'none';
        }
    };
    
    // Run it up when the DOM is ready
    mw.hook('wikipage.content').add(function($content) {
        new SearchContributions();
    });
    
})();