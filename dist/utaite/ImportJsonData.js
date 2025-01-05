(function($, mw) {
    'use strict';
    var initialized = false;
    var processingTable = false;
    var pageExistenceCache = {};
    var currentJsonData = [];
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
            var index = $('#rowIndex').val();
            var updatedData = {
                ranking: $('#ranking').val(),
                song_title: $('#songTitle').val(),
                utaite: $('#utaite').val(),
                video_id: $('#videoId').val(),
                ufu: $('#ufu').val() || null
            };
            
            currentJsonData[index] = updatedData;
            saveJsonData();
            $('#editModal').hide();
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
    
    function saveJsonData() {
    var api = new mw.Api();
    var dataTable = $('#ranking-table').DataTable();
    
    // Store current page information
    var currentPage = dataTable.page();
    var pageLength = dataTable.page.len();
    var scrollPosition = $(window).scrollTop();

    api.postWithToken('csrf', {
        action: 'edit',
        title: jsonPath,
        text: JSON.stringify(currentJsonData, null, 2),
        summary: 'Updated data via table editor'
    }).done(function() {
        // Create table data array for the updated row
        var tableData = currentJsonData.map(function(item, index) {
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
        Promise.all(tableData).then(function(processedData) {
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
        mw.notify('Error saving data: ' + error, { type: 'error' });
    });
}
    
    function openEditModal(rowIndex, data) {
        $('#rowIndex').val(rowIndex);
        $('#ranking').val(data.ranking);
        $('#songTitle').val(data.song_title);
        $('#utaite').val(data.utaite);
        $('#ufu').val(data.ufu || '');
        $('#videoId').val(data.video_id);
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

    function isUserAdmin() {
        return mw.config.get('wgUserGroups') && mw.config.get('wgUserGroups').includes('sysop');
    }
    
    function processTable() {
        if (processingTable) {
            console.log('Table processing already in progress');
            return false;
        }
        
        console.log('Looking for table...');
        var $table = $('#ranking-table');
        
        if ($table.length === 0) {
            console.log('Table not found');
            return false;
        }
        
        if ($table.data('dt-processed') === true) {
            console.log('Table already processed');
            return true;
        }
        
        console.log('Found unprocessed table');
        processingTable = true;
        
        jsonPath = $table.data('json');
        if (!jsonPath) {
            console.error('No data-json attribute found on #ranking-table.');
            processingTable = false;
            return false;
        }
        
        console.log('JSON path:', jsonPath);

        if (!$table.find('thead').length) {
            var $tableHeader = $('<thead>');
            $table.prepend($tableHeader);
            $table.find('> tbody > tr').first().appendTo($tableHeader);
        }

        try {
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
                columnDefs: [
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
                        render: function(data, type, row) {
                            if (isUserAdmin()) {
                                return '<i class="fas fa-edit" style="cursor: pointer; color:#17a2b8;"></i>';
                            } else {
                                return '<span class="no-action" style="color: #999; font-size: 0.9em;"><i class="fa-solid fa-ban" style="cursor: help;" title="no action available"></i></span>';
                            }
                        }
                    }
                ]
            });

            var jsonUrl = 'https://utaite.fandom.com/wiki/' + jsonPath + '?action=raw';
            console.log('Fetching data from:', jsonUrl);
            
            $.getJSON(jsonUrl, function(data) {
                console.log('Data received:', data);
                currentJsonData = data;
                
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
                            console.log('Table populated with data');
                            $table.data('dt-processed', true);
                            processingTable = false;
                        }
                    });
                });
                
                // Add edit button click handler
                $table.on('click', '.fa-edit', function() {
                   if (isUserAdmin()) {
                       var rowData = dataTable.row($(this).parents('tr')).data();
                       var rowIndex = dataTable.row($(this).parents('tr')).index();
                       openEditModal(rowIndex, currentJsonData[rowIndex]);
                   }
               });
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Failed to load JSON data:', textStatus, errorThrown);
                console.error('Response:', jqXHR.responseText);
                processingTable = false;
            });
        } catch (error) {
            console.error('Error initializing DataTable:', error);
            processingTable = false;
            return false;
        }
        
        return true;
    }

    function initialize() {
        if (!initialized || !$.fn.DataTable) {
            console.log('Waiting for DataTables to initialize...');
            return;
        }
        
        if (!$('#editModal').length) {
            addModalToPage();
        }
        
        processTable();
    }

    console.log('Loading DataTables CSS...');
    mw.loader.load('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.css', 'text/css');

    console.log('Loading DataTables JS...');
    mw.loader.getScript('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.js').then(function() {
        console.log('DataTables JS loaded');
        initialized = true;
        initialize();
    });
    
    function initializeTheme() {
        // Check if theme is already set in body
        if (!document.body.hasAttribute('data-theme')) {
            // Default to light theme if no theme is set
            document.body.setAttribute('data-theme', 'light');
        }

        // Watch for theme changes using MutationObserver with ES5 syntax
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        
        if (MutationObserver) {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                        // Theme changed, refresh icons if needed
                        if ($('#top100-table').length) {
                            $('#top100-table').DataTable().draw();
                        }
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