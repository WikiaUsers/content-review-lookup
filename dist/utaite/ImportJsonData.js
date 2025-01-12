(function($, mw) {
    'use strict';
    var initialized = false;
    var processingTable = false;
    var pageExistenceCache = {};
    var currentJsonData = {};
    var jsonPath = '';

    function addThemeStyles() {
        var styleElement = document.createElement('style');
        styleElement.textContent = [
            '/*css vars declaration has been moved to MediaWiki:Common.css*/',
            '.nnd-link svg { width: 20px; height: 20px; vertical-align: middle; }',
            'body[data-theme="dark"] .nnd-link svg .b { stroke: white; }',
            'body:not([data-theme="dark"]) .nnd-link svg .b { stroke: black; }'
        ].join('\n');
        document.head.appendChild(styleElement);
    }
    
    // Add modal HTML to the page
    function addModalToPage() {
        var modalHtml = [
            '<div id="editModal" class="modal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: var(--ijd-modal-overlay);">',
                '<div class="modal-content" style="background-color: var(--ijd-modal-bg); color: var(--ijd-modal-text); margin: 15% auto; padding: 20px; border: 1px solid var(--ijd-modal-border); width: 80%; max-width: 500px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">',
                    '<span class="close" style="color: var(--ijd-modal-close); float: right; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>',
                    '<h2 style="margin-bottom: 20px;">Edit Entry</h2>',
                    '<form id="editForm">',
                        '<div style="margin-bottom: 15px;">',
                            '<label for="ranking" style="display: block; margin-bottom: 5px;">Ranking:</label>',
                            '<input type="number" id="ranking" name="ranking" style="width: 100%; padding: 8px; box-sizing: border-box; background-color: var(--ijd-modal-input-bg); color: var(--ijd-modal-text); border: 1px solid var(--ijd-modal-input-border); border-radius: 4px;">',
                        '</div>',
                        '<div style="margin-bottom: 15px;">',
                            '<label for="songTitle" style="display: block; margin-bottom: 5px;">Song Title:</label>',
                            '<input type="text" id="songTitle" name="songTitle" style="width: 100%; padding: 8px; box-sizing: border-box; background-color: var(--ijd-modal-input-bg); color: var(--ijd-modal-text); border: 1px solid var(--ijd-modal-input-border); border-radius: 4px;">',
                        '</div>',
                        '<div style="margin-bottom: 15px;">',
                            '<label for="utaite" style="display: block; margin-bottom: 5px;">Utaite:</label>',
                            '<input type="text" id="utaite" name="utaite" style="width: 100%; padding: 8px; box-sizing: border-box; background-color: var(--ijd-modal-input-bg); color: var(--ijd-modal-text); border: 1px solid var(--ijd-modal-input-border); border-radius: 4px;">',
                        '</div>',
                        '<div style="margin-bottom: 15px;">',
                            '<label for="ufu" style="display: block; margin-bottom: 5px;">Utaite Wiki Article Title:</label>',
                            '<input type="text" id="ufu" name="ufu" style="width: 100%; padding: 8px; box-sizing: border-box; background-color: var(--ijd-modal-input-bg); color: var(--ijd-modal-text); border: 1px solid var(--ijd-modal-input-border); border-radius: 4px;">',
                        '</div>',
                        '<div style="margin-bottom: 15px;">',
                            '<label for="videoId" style="display: block; margin-bottom: 5px;">Video ID:</label>',
                            '<input type="text" id="videoId" name="videoId" style="width: 100%; padding: 8px; box-sizing: border-box; background-color: var(--ijd-modal-input-bg); color: var(--ijd-modal-text); border: 1px solid var(--ijd-modal-input-border); border-radius: 4px;">',
                        '</div>',
                        '<input type="hidden" id="rowIndex" name="rowIndex">',
                        '<button type="submit" style="width: 100%; background-color: var(--ijd-modal-button-bg); color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;">Save Changes</button>',
                    '</form>',
                '</div>',
            '</div>'
        ].join('');
        
        $('body').append(modalHtml);
        
        // Add hover effects
        var $close = $('.close');
        var $submitButton = $('#editForm button[type="submit"]');
        
        $close.hover(
            function() {
                $(this).css('color', 'var(--ijd-modal-close-hover)');
            },
            function() {
                $(this).css('color', 'var(--ijd-modal-close)');
            }
        );
        
        $submitButton.hover(
            function() {
                $(this).css('background-color', 'var(--ijd-modal-button-hover)');
            },
            function() {
                $(this).css('background-color', 'var(--ijd-modal-button-bg)');
            }
        );
        
        // Modal close button
        $close.click(function() {
            $('#editModal').hide();
        });
        
        // Close modal when clicking outside
        $(window).click(function(event) {
            if ($(event.target).is('#editModal')) {
                $('#editModal').hide();
            }
        });
        
        // Handle form submission
        $('#editForm').submit(function(e) {
		    e.preventDefault();
		    var tableId = $(this).data('table-id');
		    var index = parseInt($('#rowIndex').val());
		    var updatedData = {
		        ranking: $('#ranking').val(),
		        song_title: $('#songTitle').val(),
		        utaite: $('#utaite').val(),
		        video_id: $('#videoId').val(),
		        ufu: $('#ufu').val() || null
		    };
		    
		    // Update the correct table's data
		    currentJsonData[tableId][index] = updatedData;
		    
		    // Find the table element and save
		    var $table = $('#' + tableId);
		    if ($table.length) {
		        saveJsonData($table);
		        $('#editModal').hide();
		    } else {
		        console.error('Table not found:', tableId);
		        mw.notify('Error: Could not find table', { type: 'error' });
		    }
		});
    }
    
    // Function to set theme
    function setTheme(theme) {
        $('#editModal').attr('data-theme', theme);
    }
    

    function initialize() {
        if (!initialized || !$.fn.DataTable) {
            console.log('Waiting for DataTables to initialize...');
            return;
        }
        
        addThemeStyles();
        
        if (!$('#editModal').length) {
            addModalToPage();
        }
        
        processTable();
    }
    
    function saveJsonData($table) {
	    var api = new mw.Api();
	    var tableId = $table.attr('id');
	    var dataTable = tableInstances[tableId];
	    
	    if (!dataTable) {
	        console.error('DataTable instance not found for table:', tableId);
	        mw.notify('Error: Could not access table data', { type: 'error' });
	        return;
	    }
	    
	    // Store current page information
	    var currentPage = dataTable.page();
	    var pageLength = dataTable.page.len();
	    var scrollPosition = $(window).scrollTop();
	
	    // Get the table-specific data
	    var tableData = currentJsonData[tableId];
	    if (!Array.isArray(tableData)) {
	        console.error('Invalid table data for table:', tableId);
	        mw.notify('Error: Invalid table data', { type: 'error' });
	        return;
	    }
	
	    api.postWithToken('csrf', {
	        action: 'edit',
	        title: $table.data('json'),
	        text: JSON.stringify(tableData, null, 2),
	        summary: 'Updated data via table editor'
	    }).done(function() {
	        // Create table data array for the updated row
	        var updatedTableData = tableData.map(function(item) {
	            return new Promise(function(resolve) {
	                var pageName = item.ufu || item.utaite;
	                createUtaiteLink(pageName, item.utaite, function(link) {
	                    resolve([
	                        item.ranking,
	                        item.song_title,
	                        link,
	                        createNndLink(item.video_id),
	                        ''
	                    ]);
	                });
	            });
	        });
	
	        // Wait for all links to be created
	        Promise.all(updatedTableData).then(function(processedData) {
	            // Clear and update the DataTable
	            dataTable.clear();
	            dataTable.rows.add(processedData);
	            
	            // Restore pagination state and redraw
	            dataTable.page(currentPage).page.len(pageLength).draw('full-hold');
	            
	            // Restore scroll position
	            $(window).scrollTop(scrollPosition);
	            
	            mw.notify('Data saved and table updated successfully!', { type: 'success' });
	        });
	    }).fail(function(error) {
	        console.error('Error saving data:', error);
	        mw.notify('Error saving data: ' + error, { type: 'error' });
	    });
	}
    
	function openEditModal(rowIndex, data, $table) {
	    $('#rowIndex').val(rowIndex);
	    $('#ranking').val(data.ranking);
	    $('#songTitle').val(data.song_title);
	    $('#utaite').val(data.utaite);
	    $('#ufu').val(data.ufu || '');
	    $('#videoId').val(data.video_id);
	    $('#editForm').data('table-id', $table.attr('id'));
	    $('#editModal').show();
	}
    
    function createNndLink(videoId) {
        return '<span class="nnd-link" data-nnd-id="' + videoId + '" style="vertical-align: middle; display: inline-block;">' +
               '<a href="http://www.nicovideo.jp/watch/' + videoId + '" style="display: inline-block;">' +
               '<svg width="20px" height="20px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">' +
               '<defs><style>.b{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs>' +
               '<path class="b" d="M42.1281,37.201V14.7035c0-.9296-.8367-1.6734-1.8593-1.6734H7.7312c-1.0226,0-1.8593,.7437-1.8593,1.6734v22.4975c0,.9296,.8367,1.6734,1.8593,1.6734H40.2688c1.0226,0,1.8593-.7437,1.8593-1.6734Z"/>' +
               '<path class="b" d="M38.8744,34.4121V17.4925c0-.6508-.6508-1.2085-1.4874-1.2085H10.706c-.8367,0-1.4874,.5578-1.4874,1.2085v16.8266c0,.6508,.6508,1.2085,1.4874,1.2085h26.6809c.7437,.093,1.4874-.4648,1.4874-1.1156Z"/>' +
               '<polyline class="b" points="32.8317 5.5 25.0226 13.0302 22.9774 13.0302 15.1683 5.5"/>' +
               '<polygon class="b" points="24 29.5779 20.7462 33.2035 27.2538 33.2035 24 29.5779"/>' +
               '<circle class="b" cx="33.2965" cy="22.4196" r="1.8593"/>' +
               '<circle class="b" cx="14.6106" cy="26.2312" r="1.8593"/>' +
               '<path class="b" d="M18.608,38.8744c-.5578,2.1382-1.6734,3.6256-3.0678,3.6256-1.3015,0-2.51-1.4874-3.0678-3.6256"/>' +
               '<path class="b" d="M35.5276,38.8744c-.5578,2.1382-1.6734,3.6256-3.0678,3.6256-1.3015,0-2.5101-1.4874-3.0678-3.6256"/>' +
               '</svg></a></span>';
    }
    
    function checkPageExistence(pageName, callback) {
        if (pageExistenceCache.hasOwnProperty(pageName)) {
            callback(pageExistenceCache[pageName]);
            return;
        }

        $.ajax({
            url: 'https://utaite.fandom.com/api.php',
            data: {
                action: 'query',
                titles: pageName,
                format: 'json',
                origin: '*'
            },
            dataType: 'json',
            success: function(data) {
                var pages = data.query.pages;
                var exists = !pages.hasOwnProperty('-1');
                pageExistenceCache[pageName] = exists;
                callback(exists);
            },
            error: function() {
                callback(false);
            }
        });
    }

    function createUtaiteLink(pageName, displayName, callback) {
        checkPageExistence(pageName, function(exists) {
            var baseUrl = '/wiki/' + pageName;
            var url = exists ? baseUrl : baseUrl + '?action=edit&redlink=1';
            
            // Default style (non-hover)
            var defaultStyle = exists ? '' : [
                'color: red',
                'text-decoration: underline',
                'text-decoration-style: dashed',
                'text-decoration-color: red',
                '-webkit-text-decoration-color: red',
                'text-decoration-thickness: 1px',
                '-webkit-text-decoration-thickness: 1px',
                'text-underline-offset: 2px',
                '-webkit-text-underline-offset: 2px',
                'transition: all 0.2s ease'
            ].join(';');
            
            // Hover style
            var hoverStyle = exists ? '' : [
                'color: red',
                'text-shadow: 0 0 2px rgba(255, 255, 255, 0.5)',
                'text-decoration: underline',
                'text-decoration-style: dashed',
                'text-decoration-color: rgba(255, 255, 255, 0.7)',
                '-webkit-text-decoration-color: rgba(255, 255, 255, 0.7)',
                'text-decoration-thickness: 1px',
                '-webkit-text-decoration-thickness: 1px',
                'text-underline-offset: 2px',
                '-webkit-text-underline-offset: 2px',
                'box-shadow: 0 0 3px rgba(255, 255, 255, 0.3)'
            ].join(';');
            
            var titleText = exists ? pageName : pageName + ' (page does not exist)';
            var linkId = 'utaite-link-' + Math.random().toString(36).substr(2, 9);
            
            var link = '<a id="' + linkId + '" title="' + titleText + '" href="' + url + '" style="' + defaultStyle + '">' + displayName + '</a>';
            
            callback(link);
            
            setTimeout(function() {
                $('#' + linkId).hover(
                    function() {
                        $(this).attr('style', hoverStyle);
                    },
                    function() {
                        $(this).attr('style', defaultStyle);
                    }
                );
            }, 0);
        });
    }

	var userEditPermission = null;
	
	
	function checkUserEditPermission(callback) {
	    // console.log('Starting checkUserEditPermission...');
	    if (userEditPermission !== null) {
	        // console.log('Using cached permission:', userEditPermission);
	        callback(userEditPermission);
	        return;
	    }
	
	    var userGroups = mw.config.get('wgUserGroups') || [];
	    // console.log('User groups:', userGroups);
	    
	    // If user is admin, they can always edit
	    if (userGroups.indexOf('sysop') !== -1) {
	        // console.log('User is admin');
	        userEditPermission = true;
	        callback(true);
	        return;
	    }
	    
	    // If user is anonymous, they can't edit
	    if (mw.user.isAnon()) {
	        // console.log('User is anonymous');
	        userEditPermission = false;
	        callback(false);
	        return;
	    }
	
	    // Check if user has either user or emailconfirmed role
	    var hasRequiredRole = userGroups.indexOf('user') !== -1 && 
	                         (userGroups.indexOf('autoconfirmed') !== -1 || 
	                          userGroups.indexOf('emailconfirmed') !== -1);
	    
	    console.log('Has required role:', hasRequiredRole);
	
	    // If no jsonPath, we can't check protection, so base it on role only
	    if (!jsonPath) {
	        console.log('No jsonPath available, using role-based permission only');
	        userEditPermission = hasRequiredRole;
	        callback(hasRequiredRole);
	        return;
	    }
	
	    // console.log('Checking API for page:', jsonPath);
	
	    // Get the protection status and let MediaWiki API determine if user can edit
	    var api = new mw.Api();
	    api.get({
	        action: 'query',
	        prop: 'info',
	        inprop: 'protection',
	        titles: jsonPath,
	        format: 'json'
	    }).done(function(data) {
	        console.log('API response:', data);
	        
	        // If we can't get protection info, fall back to role-based permission
	        if (!data || !data.query || !data.query.pages) {
	            console.log('No protection info available, using role-based permission');
	            userEditPermission = hasRequiredRole;
	            callback(hasRequiredRole);
	            return;
	        }
	        
	        var pages = data.query.pages;
	        var pageId = Object.keys(pages)[0];
	        var page = pages[pageId];
	        
	        var canEdit = true; // Default to true if no protection
	
	        if (page && page.protection && page.protection.length) {
	            console.log('Protection data found:', page.protection);
	            var editProtection = null;
	            for (var i = 0; i < page.protection.length; i++) {
	                if (page.protection[i].type === 'edit') {
	                    editProtection = page.protection[i];
	                    break;
	                }
	            }
	            
	            if (editProtection) {
	                console.log('Edit protection found:', editProtection);
	                canEdit = editProtection.level === 'autoconfirmed' || 
	                         editProtection.level === 'user';
	            }
	        }
	
	        userEditPermission = canEdit && hasRequiredRole;
	        console.log('Final permission result:', userEditPermission);
	        callback(userEditPermission);
	    }).fail(function(error) {
	        console.error('API request failed:', error);
	        // On error, fall back to role-based permission
	        userEditPermission = hasRequiredRole;
	        callback(hasRequiredRole);
	    });
	}
	
	function bindEditButtonHandler($table) {
	    var tableId = $table.attr('id');
	    
	    $table.on('click', '.fa-edit', function(e) {
	    	jsonPath = $table.data('json');
	    	console.log('Setting jsonPath for permission check:', jsonPath);
	        checkUserEditPermission(function(canEdit) {
	            if (canEdit) {
	                try {
	                    var $button = $(e.target);
	                    var $row = $button.closest('tr');
	                    
	                    // Get DataTable instance from stored instances
	                    var dataTable = tableInstances[tableId];
	                    if (!dataTable) {
	                        console.error('DataTable instance not found for table:', tableId);
	                        mw.notify('Error: Could not access table data', { type: 'error' });
	                        return;
	                    }
	
	                    var dtRow = dataTable.row($row);
	                    if (!dtRow) {
	                        console.error('DataTable row not found');
	                        mw.notify('Error: Could not access row data', { type: 'error' });
	                        return;
	                    }
	
	                    var rowData = dtRow.data();
	                    if (!rowData) {
	                        console.error('No row data found');
	                        mw.notify('Error: Could not get row data', { type: 'error' });
	                        return;
	                    }
	                    
	                    var ranking = rowData[0];
	                    var result = findDataByRanking(ranking, currentJsonData[tableId]);
	                    
	                    if (result) {
	                        openEditModal(result.index, result.data, $table);
	                    } else {
	                        console.error('Could not find data for ranking:', ranking);
	                        mw.notify('Error: Could not find data for this row', { type: 'error' });
	                    }
	                } catch (error) {
	                    console.error('Error processing edit click:', error);
	                    mw.notify('Error: ' + error.message, { type: 'error' });
	                }
	            }
	        });
	    });
	}
	
	function destroyTable(tableId) {
	    if (tableInstances[tableId]) {
	        tableInstances[tableId].destroy();
	        delete tableInstances[tableId];
	    }
	}
    
    function getColumnDefs($table) {
	    return [
	        {
	            targets: 0,
	            width: '30px',
	            className: 'text-center'
	        },
	        {
	            targets: 3,
	            width: '30px',
	            className: 'text-center',
	            orderable: false
	        },
	        {
	            targets: 4,
	            data: null,
	            width: '30px',
	            orderable: false,
	            render: function(data, type, row, meta) {
	                // Initially show loading state
	                var loadingHtml = '<span class="loading-permission" style="color: #999;"><i class="fas fa-spinner fa-spin"></i></span>';
	                
	                // Check permission and update cell once we know
	                checkUserEditPermission(function(canEdit) {
	                    var table = $table.DataTable();  // Use passed table reference
	                    var cell = table.cell(meta.row, meta.col);
	                    
	                    if (canEdit) {
	                        cell.node().innerHTML = '<i class="fas fa-edit" style="cursor: pointer; color:#17a2b8;"></i>';
	                    } else {
	                        cell.node().innerHTML = '<span class="no-action" style="color: #999; font-size: 0.9em;"><i class="fa-solid fa-ban" style="cursor: help;" title="no action available"></i></span>';
	                    }
	                });
	                
	                return loadingHtml;
	            }
	        }
	    ];
	}
	
	function loadTableData($table, dataTable) {
	    var jsonUrl = 'https://utaite.fandom.com/wiki/' + $table.data('json') + '?action=raw';
	    var tableId = $table.attr('id');
	    
	    $.getJSON(jsonUrl, function(data) {
	        console.log('Data received for ' + tableId + ':', data);
	        currentJsonData[tableId] = data;
	        
	        var processedItems = 0;
	        var totalItems = data.length;
	        var tableData = [];
	        
	        data.forEach(function(item, index) {
	            var pageName = item.ufu || item.utaite;
	            createUtaiteLink(pageName, item.utaite, function(link) {
	                tableData[index] = [
	                    item.ranking,
	                    item.song_title,
	                    link,
	                    createNndLink(item.video_id),
	                    ''
	                ];
	                
	                processedItems++;
	                if (processedItems === totalItems) {
	                    dataTable.clear();
	                    dataTable.rows.add(tableData).draw();
	                    console.log('Table ' + tableId + ' populated with data');
	                    $table.data('dt-processed', true);
	                }
	            });
	        });
	    }).fail(function(jqXHR, textStatus, errorThrown) {
	        console.error('Failed to load JSON data for ' + tableId + ':', textStatus, errorThrown);
	    });
	}
	
	function findDataByRanking(ranking, tableData) {
	    // Convert ranking to string for comparison
	    var rankingStr = ranking.toString();
	    
	    // Try to find the data by ranking
	    for (var i = 0; i < tableData.length; i++) {
	        if (tableData[i].ranking.toString() === rankingStr) {
	            return {
	                index: i,
	                data: tableData[i]
	            };
	        }
	    }
	    
	    // If not found by ranking, try to find by array index
	    var index = parseInt(ranking) - 1;
	    if (index >= 0 && index < tableData.length) {
	        return {
	            index: index,
	            data: tableData[index]
	        };
	    }
	    
	    return null;
	}
    
	var tableInstances = {};
	
	function processTable() {
	    if (processingTable) {
	        console.log('Table processing already in progress');
	        return false;
	    }
	    
	    console.log('Looking for tables...');
	    var $tables = $('table[data-json]').filter(function() {
	        return !this.id.match(/_wrapper|_length|_filter|_info|_paginate|_previous|_next|_processing/);
	    });
	    
	    if ($tables.length === 0) {
	        console.log('No tables found');
	        return false;
	    }
	
	    processingTable = true;
	    
	    $tables.each(function() {
	        var $table = $(this);
	        var tableId = $table.attr('id');
	        
	        if ($table.data('dt-processed') === true) {
	            console.log('Table ' + tableId + ' already processed');
	            return true;
	        }
	
	        console.log('Processing table:', tableId);
	        
	        var jsonPath = $table.data('json');
	        if (!jsonPath) {
	            console.error('No data-json attribute found on ' + tableId);
	            return true;
	        }
	
	        try {
	            // Initialize and store the DataTable instance immediately
	            var dataTable = $table.DataTable({
	                paging: true,
	                searching: true,
	                ordering: true,
	                info: true,
	                pageLength: 25,
	                order: [[0, 'asc']],
	                processing: true,
	                language: {
	                    processing: "Loading data..."
	                },
	                destroy: true,
	                autoWidth: false,
	                columnDefs: [
	                    {
	                        targets: 0,
	                        width: '50px',
	                        className: 'text-center'
	                    },
	                    {
	                        targets: 1,
	                        width: '45%'
	                    },
	                    {
	                        targets: 2,
	                        width: '25%'
	                    },
	                    {
	                        targets: 3,
	                        width: '50px',
	                        className: 'text-center',
	                        orderable: false
	                    },
	                    {
	                        targets: 4,
	                        width: '50px',
	                        className: 'text-center',
	                        orderable: false,
	                        render: function(data, type, row, meta) {
	                            return '<span class="edit-permission-placeholder"></span>';
	                        }
	                    }
	                ],
	                dom: '<"dataTables_header"<"dataTables_title">f>rtip',
	                createdRow: function(row, data, dataIndex) {
	                    $(row).addClass('dataTables_row');
	                    checkUserEditPermission(function(canEdit) {
	                        var $cell = $(row).find('td:last-child .edit-permission-placeholder');
	                        if (canEdit) {
	                            $cell.html('<i class="fas fa-edit" style="cursor: pointer; color:#17a2b8;"></i>');
	                        } else {
	                            $cell.html('<span class="no-action" style="color: #999; font-size: 0.9em;"><i class="fa-solid fa-ban" style="cursor: help;" title="no action available"></i></span>');
	                        }
	                    });
	                },
	                initComplete: function() {
	                    $('.dataTables_title').html('<i class="fas fa-trophy"></i> TOP100 ランキング');
	                    
	                    var style = document.createElement('style');
	                    style.type = 'text/css';
	                    var styleRules = [
	                        '.dataTables_wrapper {',
	                        '    padding: 20px;',
	                        '    background: var(--theme-page-background-color);',
	                        '}',
	                        '.dataTables_header {',
	                        '    display: flex;',
	                        '    justify-content: space-between;',
	                        '    align-items: center;',
	                        '    margin-bottom: 20px;',
	                        '}',
	                        '.dataTables_title {',
	                        '    font-size: 1.5em;',
	                        '    font-weight: bold;',
	                        '    color: var(--theme-page-text-color);',
	                        '}',
	                        '.dataTables_filter {',
	                        '    margin: 0;',
	                        '}',
	                        '.dataTables_filter input {',
	                        '    margin-left: 10px;',
	                        '    padding: 5px;',
	                        '    border-radius: 4px;',
	                        '    border: 1px solid var(--theme-border-color);',
	                        '}',
	                        'table.dataTable thead th {',
	                        '    padding: 10px;',
	                        '    background-color: var(--theme-header-background-color);',
	                        '    color: var(--theme-header-text-color);',
	                        '    border-bottom: 2px solid var(--theme-border-color);',
	                        '}',
	                        'table.dataTable tbody td {',
	                        '    padding: 8px 10px;',
	                        '    vertical-align: middle;',
	                        '}',
	                        '.dataTables_row:hover {',
	                        '    background-color: var(--theme-row-hover-color) !important;',
	                        '}'
	                    ].join('\n');
	                    
	                    style.innerHTML = styleRules;
	                    document.head.appendChild(style);
	                }
	            });
	
	            // Store the instance immediately after creation
	            tableInstances[tableId] = dataTable;
	            
	            // Bind edit button handler
	            bindEditButtonHandler($table);
	
	            var jsonUrl = 'https://utaite.fandom.com/wiki/' + jsonPath + '?action=raw';
	            
	            // Load JSON data
	            $.getJSON(jsonUrl, function(data) {
	                console.log('Data received for ' + tableId + ':', data);
	                currentJsonData[tableId] = data;
	                
	                var processedItems = 0;
	                var totalItems = data.length;
	                var tableData = [];
	                
	                data.forEach(function(item, index) {
	                    var pageName = item.ufu || item.utaite;
	                    createUtaiteLink(pageName, item.utaite, function(link) {
	                        tableData[index] = [
	                            item.ranking,
	                            item.song_title,
	                            link,
	                            createNndLink(item.video_id),
	                            ''
	                        ];
	                        
	                        processedItems++;
	                        if (processedItems === totalItems) {
	                            tableInstances[tableId].clear();
	                            tableInstances[tableId].rows.add(tableData).draw();
	                            console.log('Table ' + tableId + ' populated with data');
	                            $table.data('dt-processed', true);
	                        }
	                    });
	                });
	            }).fail(function(jqXHR, textStatus, errorThrown) {
	                console.error('Failed to load JSON data for ' + tableId + ':', textStatus, errorThrown);
	                mw.notify('Error loading data: ' + textStatus, { type: 'error' });
	            });
	            
	        } catch (error) {
	            console.error('Error initializing DataTable for ' + tableId + ':', error);
	            return true;
	        }
	    });
	    
	    processingTable = false;
	    return true;
	}
	
	
    // console.log('Loading DataTables CSS...');
    // mw.loader.load('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.css', 'text/css');

    // console.log('Loading DataTables JS...');
    // mw.loader.getScript('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.js').then(function() {
    //     console.log('DataTables JS loaded');
    //     initialized = true;
    //     initialize();
    // });
    
    initialized = true;
	// console.log('DataTables JS skipped');
	initialize();
    
    function initializeTheme() {
        // Check if theme is already set in body
        if (!document.body.hasAttribute('data-theme')) {
            // Default to light theme if no theme is set
            document.body.setAttribute('data-theme', 'light');
        }
        
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        
        if (MutationObserver) {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                        // Theme changed, refresh icons if needed
                        Object.keys(tableInstances).forEach(function(tableId) {
						    if (tableInstances[tableId]) {
						        tableInstances[tableId].draw();
						    }
						});
                    }
                });
            });

            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['data-theme']
            });
        }
    }

    $(function() {
        console.log('Document ready');
        initializeTheme();
        initialize();
    });

    mw.hook('wikipage.content').add(function() {
        console.log('Content changed');
        initialize();
    });
})(jQuery, mediaWiki);