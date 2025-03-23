/**
 * Name:        MultiUploadJS (Enhanced)
 * Author:      Fujimaru-kun (original), Enhanced version with global license and description selector
 * Based on:    MultiUpload (by Gguigui1 and KhangND), Gadget-multiupload.js (by Pcj)
 * Customizer:  Ark (User:Makudoumee)
 * Description: Allows upload of multiple files at the same time with global license and description selection
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.confirmCloseWindow',
    'mediawiki.notification',
    'mediawiki.util',
    'oojs-ui-core',
    'oojs-ui-widgets',
    'oojs-ui-windows',
    'ext.fandom.photoGallery.gallery.css',
]).then(function () {
    'use strict';
    
    // Early exit conditions
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgFormattedNamespaces',
        'wgNamespaceIds',
        'wgUserLanguage',
        'wgUserGroups'
    ]);
    
    var query = new URLSearchParams(document.location.search);
    
    if (
        window.MultiUploadJSLoaded ||
        config.wgCanonicalSpecialPageName !== "Upload" ||
        $("#wpForReUpload").val() || // Disabling for Reupload
        query.get('wpDestFile') ||   // Disabling when following a redlink
        !/autoconfirmed/.test(config.wgUserGroups.join())
    ) {
        return;
    }
    
    window.MultiUploadJSLoaded = true;
    
    // Constants and configuration
    var UPLOAD_OPTIONS = window.MultiUploadoption || {};
    var MAX_UPLOADS = {
        STAFF: 200,
        BUREAUCRAT: 70,
        SYSOP: 50,
        ROLLBACK: 30,
        DEFAULT: 20
    };
    
    // Custom CSS for modern styling
    var styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Modern styling for MultiUploadJS */
        .mu-fieldset {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            background-color: #fafafa;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: box-shadow 0.3s ease;
        }
        
        .mu-fieldset:hover {
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        
        .mu-fieldset legend {
            font-weight: bold;
            padding: 0 10px;
            color: #333;
        }
        
        .mu-global-settings {
            background-color: #f0f5ff;
            border-left: 4px solid #4285f4;
        }
        
        .mu-file-upload {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px;
            border: 2px dashed #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
            margin-bottom: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .mu-file-upload:hover {
            border-color: #4285f4;
            background-color: #f0f5ff;
        }
        
        .mu-file-upload input[type="file"] {
            display: none;
        }
        
        .mu-upload-icon {
            margin-right: 10px;
            color: #4285f4;
        }
        
        .mu-button {
            background-color: #4285f4;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.3s ease;
            margin-right: 10px;
        }
        
        .mu-button:hover {
            background-color: #3367d6;
        }
        
        .mu-button.secondary {
            background-color: #f1f3f4;
            color: #202124;
        }
        
        .mu-button.secondary:hover {
            background-color: #e8eaed;
        }
        
        .mu-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #dadce0;
            border-radius: 4px;
            font-size: 14px;
            transition: border 0.3s ease;
        }
        
        .mu-input:focus {
            border-color: #4285f4;
            outline: none;
            box-shadow: 0 0 0 2px rgba(66,133,244,0.2);
        }
        
        .mu-textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #dadce0;
            border-radius: 4px;
            font-size: 14px;
            min-height: 80px;
            resize: vertical;
            transition: border 0.3s ease;
        }
        
        .mu-textarea:focus {
            border-color: #4285f4;
            outline: none;
            box-shadow: 0 0 0 2px rgba(66,133,244,0.2);
        }
        
        .mu-checkbox {
            display: flex;
            align-items: center;
            margin: 8px 0;
        }
        
        .mu-checkbox input[type="checkbox"] {
            margin-right: 8px;
        }
        
        .mu-file-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 16px;
            margin-top: 20px;
        }
        
        .mu-file-card {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            transition: box-shadow 0.3s ease;
        }
        
        .mu-file-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .mu-file-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
        }
        
        .mu-file-title {
            font-weight: bold;
            color: #333;
        }
        
        .mu-upload-result {
            margin-top: 30px;
        }
        
        .mu-upload-result h3 {
            margin-top: 20px;
            font-size: 18px;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
        }
        
        .mu-success-list {
            list-style-type: none;
            padding-left: 0;
        }
        
        .mu-success-list li {
            padding: 8px 12px;
            margin: 4px 0;
            background-color: #e6f4ea;
            border-left: 4px solid #34a853;
            border-radius: 4px;
        }
        
        .mu-warning-list {
            list-style-type: none;
            padding-left: 0;
        }
        
        .mu-warning-list li {
            padding: 8px 12px;
            margin: 4px 0;
            background-color: #fef7e0;
            border-left: 4px solid #fbbc04;
            border-radius: 4px;
        }
        
        .mu-error-list {
            list-style-type: none;
            padding-left: 0;
        }
        
        .mu-error-list li {
            padding: 8px 12px;
            margin: 4px 0;
            background-color: #fce8e6;
            border-left: 4px solid #ea4335;
            border-radius: 4px;
        }
        
        /* Progress bar styling */
        .mu-progress-container {
            margin: 20px 0;
            background-color: #f1f3f4;
            border-radius: 4px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .mu-progress-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .mu-progress-label {
            font-weight: 500;
        }
        
        /* Small screens adjustments */
        @media (max-width: 768px) {
            .mu-file-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // State variables
    var api = new mw.Api();
    var i18n;
    var preloads = 1;
    var allowCloseWindow;
    var token = mw.user.tokens.get('csrfToken');
    var files = [];
    var limit = UPLOAD_OPTIONS.max || -1;
    var defaultLicense = UPLOAD_OPTIONS.defaultlicense || '';
    var defaultDescription = UPLOAD_OPTIONS.defaultdescription || '';
    var curFile = 0;
    var progressBarWidget;
    var uploadResultCount = {
        warnings: 0,
        errors: 0
    };
    
    // Standard MediaWiki messages to load
    var stdmsgs = [
        // General UI elements
        'filedesc', 'license-header', 'watchthisupload', 'ignorewarnings',
        // Upload warnings
        'badfilename', 'file-exists-duplicate', 'fileexists', 'fileexists-no-change'
    ];
    
    /**
     * Initialize preloads counter
     */
    function preload() {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('MultiUpload', {
                cacheVersion: 1
            }).done(init);
        }
    }
    
    /**
     * Initialize the multi-upload interface
     * @param {Object} i18nData - Internationalization data
     */
    function init(i18nData) {
        i18n = i18nData;
        setUploadLimit();
        
        api.loadMessagesIfMissing(stdmsgs).then(function() {
            modifyUploadForm();
            registerEventHandlers();
            
            // Add close window confirmation
            allowCloseWindow = mw.confirmCloseWindow({
                test: function() {
                    return files.length !== 0;
                }
            });
            
            // Add license fixup function to check and fix any missing license dropdowns
            window.fixMissingLicenseDropdowns = fixMissingLicenseDropdowns;
            
            // Monitor for DOM mutations that might affect the form
            setupDOMObserver();
        });
    }
    
    /**
     * Modify the upload form to support multiple files
     */
    function modifyUploadForm() {
        // Hide the original form elements
        $("#mw-htmlform-source > tbody > tr.mw-htmlform-field-UploadSourceField").hide();
        $("#mw-upload-form > fieldset:nth-of-type(3)").hide();
        $("#mw-upload-form > span > input.mw-htmlform-submit").hide();
        $("#mw-upload-form > fieldset:nth-of-type(2)").hide();
        
        // Create new modern UI container
        var modernUI = $('<div>', {
            'class': 'mu-container'
        });
        
        // Add drag & drop file upload area
        var fileUploadArea = $('<div>', {
            'class': 'mu-file-upload',
            'id': 'mu-dropzone'
        }).append(
            $('<span>', {
                'class': 'mu-upload-icon'
            }).html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18ZM8 13H10.55V16H13.45V13H16L12 9L8 13Z" fill="currentColor"/></svg>'),
            $('<span>').text('Drag & drop files here, or click to select'),
            $('<input>', {
                'type': 'file',
                'id': 'multiupload',
                'multiple': true
            })
        );
        
        // Add button container
        var buttonContainer = $('<div>', {
            'class': 'mu-button-container',
            'style': 'display: flex; justify-content: center; margin: 20px 0;'
        }).append(
            $('<button>', {
                'type': 'submit',
                'id': 'multiFileSubmit',
                'class': 'mu-button'
            }).text(i18n.msg('uploadfiles').escape()),
            $('<button>', {
                'type': 'button',
                'id': 'multiFileReset',
                'class': 'mu-button secondary'
            }).text(i18n.msg('reset').escape())
        );
        
        // Add to page
        modernUI.append(fileUploadArea, buttonContainer);
        $("#mw-upload-form").prepend(modernUI);
        
        // Add global license and description selector
        addGlobalBatchSettings();
        
        // Add file grid container
        $('<div>', {
            'id': 'mu-file-grid',
            'class': 'mu-file-grid'
        }).insertBefore(buttonContainer);
    }
    
    /**
     * Register event handlers for form elements
     */
    function registerEventHandlers() {
        // File selection handlers
        $("#multiupload").change(addFileFields);
        
        // Drag and drop handlers
        var dropZone = document.getElementById('mu-dropzone');
        
        dropZone.addEventListener('click', function() {
            document.getElementById('multiupload').click();
        });
        
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('mu-drag-over');
        });
        
        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('mu-drag-over');
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('mu-drag-over');
            
            var dt = e.dataTransfer;
            var fileInput = document.getElementById('multiupload');
            fileInput.files = dt.files;
            
            // Trigger the change event manually
            var event = new Event('change');
            fileInput.dispatchEvent(event);
        });
        
        // Form submission handlers
        $("#mw-upload-form").on('submit', uploadFiles);
        $("#multiFileReset").click(resetForm);
    }
    
    /**
     * Set up observer to watch for DOM changes that might affect the form
     */
    function setupDOMObserver() {
        // Only use MutationObserver if it's available
        if (typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(function(mutations) {
                // Check for added nodes that might need license dropdowns
                for (var i = 0; i < mutations.length; i++) {
                    if (mutations[i].addedNodes.length > 0) {
                        fixMissingLicenseDropdowns();
                        break;
                    }
                }
            });
            
            // Start observing the form for changes
            var form = document.getElementById('mw-upload-form');
            if (form) {
                observer.observe(form, { childList: true, subtree: true });
            }
        }
    }
    
    /**
     * Fix any missing license dropdowns in the file fieldsets
     */
    function fixMissingLicenseDropdowns() {
        // Get file count
        var fileCount = $('fieldset.mu-fieldset').length;
        
        if (fileCount === 0) {
            return; // No files yet
        }
        
        // Get source for license dropdown
        var licenseSource = $('#wpGlobalLicense');
        
        if (!licenseSource.length) {
            console.warn('Global license dropdown not found for cloning');
            return;
        }
        
        // Check each file's license dropdown cell
        for (var i = 0; i < fileCount; i++) {
            var licenseCell = $('fieldset#file-' + i + ' .mu-license-container');
            
            // If the cell is empty, insert a cloned dropdown
            if (licenseCell.length && !licenseCell.children().length) {
                var licenseDropdown = licenseSource.clone().attr({
                    name: 'wpLicense' + i,
                    id: 'wpLicense' + i,
                    'class': 'mu-input'
                }).val(defaultLicense);
                
                licenseCell.append(licenseDropdown);
                console.log('Added missing license dropdown to file ' + (i + 1));
            }
        }
    }
    
    /**
     * Add global license and description selector to the form
     */
    function addGlobalBatchSettings() {
        // Clone the license dropdown from the hidden template fieldset
        var licenseDropdown = $("#wpLicense").clone();
        
        // Create fieldset structure
        var globalBatchFieldset = $('<fieldset>', {
            id: 'global-batch-fieldset',
            'class': 'mu-fieldset mu-global-settings'
        });
        
        var legend = $('<legend>', {
            text: 'Batch Settings for All Files'
        });
        
        // Create license container
        var licenseContainer = $('<div>', {
            'class': 'mu-setting-container'
        });
        
        var licenseLabel = $('<label>', {
            'for': 'wpGlobalLicense',
            text: 'Set license for all files:',
            'class': 'mu-label'
        });
        
        // Set the license dropdown attributes
        licenseDropdown.attr({
            id: 'wpGlobalLicense',
            name: 'wpGlobalLicense',
            'class': 'mu-input'
        });
        
        // Create license controls
        var licenseControls = $('<div>', {
            'class': 'mu-controls',
            'style': 'margin-top: 10px; display: flex; align-items: center;'
        });
        
        var applyLicenseButton = $('<button>', {
            type: 'button',
            id: 'applyGlobalLicense',
            'class': 'mu-button',
            style: 'margin-right: 15px;'
        }).text('Apply to All Files');
        
        var autoApplyLicenseContainer = $('<div>', {
            'class': 'mu-checkbox'
        });
        
        var autoApplyLicenseCheckbox = $('<input>', {
            type: 'checkbox',
            id: 'wpAutoApplyLicense',
            checked: true
        });
        
        var autoApplyLicenseLabel = $('<label>', {
            'for': 'wpAutoApplyLicense',
            text: 'Automatically apply license to new files'
        });
        
        // Create description container
        var descriptionContainer = $('<div>', {
            'class': 'mu-setting-container',
            'style': 'margin-top: 20px;'
        });
        
        var descriptionLabel = $('<label>', {
            'for': 'wpGlobalDescription',
            text: 'Set description for all files:',
            'class': 'mu-label'
        });
        
        // Create description textarea
        var descriptionTextarea = $('<textarea>', {
            id: 'wpGlobalDescription',
            name: 'wpGlobalDescription',
            'class': 'mu-textarea'
        }).val(defaultDescription);
        
        // Create description controls
        var descriptionControls = $('<div>', {
            'class': 'mu-controls',
            'style': 'margin-top: 10px; display: flex; align-items: center;'
        });
        
        var applyDescriptionButton = $('<button>', {
            type: 'button',
            id: 'applyGlobalDescription',
            'class': 'mu-button',
            style: 'margin-right: 15px;'
        }).text('Apply to All Files');
        
        var autoApplyDescContainer = $('<div>', {
            'class': 'mu-checkbox'
        });
        
        var autoApplyDescCheckbox = $('<input>', {
            type: 'checkbox',
            id: 'wpAutoApplyDescription',
            checked: true
        });
        
        var autoApplyDescLabel = $('<label>', {
            'for': 'wpAutoApplyDescription',
            text: 'Automatically apply description to new files'
        });
        
        // Assemble license elements
        autoApplyLicenseContainer.append(autoApplyLicenseCheckbox, autoApplyLicenseLabel);
        licenseControls.append(applyLicenseButton, autoApplyLicenseContainer);
        licenseContainer.append(licenseLabel, licenseDropdown, licenseControls);
        
        // Assemble description elements
        autoApplyDescContainer.append(autoApplyDescCheckbox, autoApplyDescLabel);
        descriptionControls.append(applyDescriptionButton, autoApplyDescContainer);
        descriptionContainer.append(descriptionLabel, descriptionTextarea, descriptionControls);
        
        // Add to fieldset
        globalBatchFieldset.append(legend, licenseContainer, descriptionContainer);
        
        // Insert the global batch settings after the upload area
        $("#mu-dropzone").after(globalBatchFieldset);
        
        // Set the default license if specified
        if (defaultLicense) {
            $('#wpGlobalLicense').val(defaultLicense);
        }
        
        // Add event handlers
        licenseDropdown.on('change', function() {
            if ($('#wpAutoApplyLicense').is(':checked')) {
                applyGlobalLicense();
                fixMissingLicenseDropdowns();
            }
        });
        
        applyLicenseButton.on('click', function() {
            applyGlobalLicense();
            fixMissingLicenseDropdowns();
        });
        
        descriptionTextarea.on('change keyup', function() {
            if ($('#wpAutoApplyDescription').is(':checked')) {
                applyGlobalDescription();
            }
        });
        
        applyDescriptionButton.on('click', function() {
            applyGlobalDescription();
        });
    }
    
    /**
     * Apply the global license to all individual license fields
     */
    function applyGlobalLicense() {
        var selectedLicense = $('#wpGlobalLicense').val();
        console.log('Applying license: ' + selectedLicense + ' to all files');
        
        // First make sure all files have license dropdowns
        fixMissingLicenseDropdowns();
        
        // Now set the license for each file
        $('fieldset.mu-fieldset [id^="wpLicense"]').not('#wpGlobalLicense').each(function() {
            $(this).val(selectedLicense);
        });
        
        mw.notify('License applied to all files', { type: 'success' });
    }
    
    /**
     * Apply the global description to all individual description fields
     */
    function applyGlobalDescription() {
        var globalDescription = $('#wpGlobalDescription').val();
        console.log('Applying description to all files');
        
        // Set the description for each file
        $('fieldset.mu-fieldset [id^="wpUploadDescription"]').each(function() {
            $(this).val(globalDescription);
        });
        
        mw.notify('Description applied to all files', { type: 'success' });
    }
    
    /**
     * Set maximum number of files the user can import at one time
     * Can be overriden by a config var but its value is capped at 100
     */
    function setUploadLimit() {
        // Check if limit is valid
        if (limit < 0 || limit > 100 || typeof limit !== 'number') {
            // Determine limit based on user groups
            var userGroups = config.wgUserGroups.join();
            
            if (/staff|util|bot-global|wiki-specialist/.test(userGroups)) {
                limit = MAX_UPLOADS.STAFF;
            } else if (/bureaucrat|bot/.test(userGroups)) {
                limit = MAX_UPLOADS.BUREAUCRAT;
            } else if (/sysop/.test(userGroups)) {
                limit = MAX_UPLOADS.SYSOP;
            } else if (/rollback|content-moderator/.test(userGroups)) {
                limit = MAX_UPLOADS.ROLLBACK;
            } else {
                limit = MAX_UPLOADS.DEFAULT;
            }
        }
    }
    
    /**
     * Add fields to change the filename, description and license of each file
     */
    function addFileFields() {
        resetForm();
        files = $("#multiupload")[0].files;
        
        if (files.length > limit) {
            alert(i18n.msg('limit').plain());
            $("#multiupload").val("");
            resetForm();
            return;
        }
        
        var watchUploads = mw.user.options.get('watchuploads') == "1" ? 'checked="checked"' : '';
        
        // Store original license dropdown for cloning
        var licenseSource = $('#wpGlobalLicense');
        
        // Get the global description if auto-apply is checked
        var globalDescription = '';
        if ($('#wpAutoApplyDescription').is(':checked')) {
            globalDescription = $('#wpGlobalDescription').val();
        }
        
        // Clear file grid
        $('#mu-file-grid').empty();
        
        // Create cards for each file
        for (var index = 0; index < files.length; index++) {
            var element = files[index];
            createFileCard(index, element, licenseSource, globalDescription, watchUploads);
        }
        
        // Apply the global license if auto-apply is checked
        if ($('#wpAutoApplyLicense').is(':checked')) {
            applyGlobalLicense();
        }
        
        // Fix any license dropdowns that might be missing
        setTimeout(fixMissingLicenseDropdowns, 100);
    }
    
    /**
     * Create a modern card UI for a single file
     * @param {number} index - The index of the file
     * @param {File} fileElement - The file object
     * @param {jQuery} licenseSource - The license dropdown to clone
     * @param {string} globalDescription - The global description to use (if any)
     * @param {string} watchUploads - The watch checkbox HTML attribute
     */
    function createFileCard(index, fileElement, licenseSource, globalDescription, watchUploads) {
        // Create file card
        var fileCard = $('<fieldset>', {
            id: 'file-' + index,
            'class': 'mu-fieldset mu-file-card'
        });
        
        // Add header with file info
        var fileHeader = $('<div>', {
            'class': 'mu-file-header'
        }).append(
            $('<div>', {
                'class': 'mu-file-title'
            }).text('File ' + (index + 1) + ': ' + fileElement.name),
            $('<div>', {
                'class': 'mu-file-size'
            }).text(formatFileSize(fileElement.size))
        );
        
        // File preview if supported
        var filePreview = $('<div>', {
            'class': 'mu-file-preview',
            'style': 'margin-bottom: 15px; text-align: center;'
        });
        
        if (fileElement.type.startsWith('image/')) {
            var img = document.createElement('img');
            img.style.maxWidth = '100%';
            img.style.maxHeight = '150px';
            img.style.borderRadius = '4px';
            
            var reader = new FileReader();
            reader.onload = (function(theImg) {
                return function(e) {
                    theImg.src = e.target.result;
                };
            })(img);
            
            reader.readAsDataURL(fileElement);
            filePreview.append(img);
        } else {
            filePreview.append(
                $('<div>', {
                    'style': 'background-color: #eee; padding: 40px; border-radius: 4px;'
                }).text('File preview not available')
            );
        }
        
        // Filename input
        var filenameContainer = $('<div>', {
            'class': 'mu-input-container',
            'style': 'margin-bottom: 15px;'
        }).append(
            $('<label>', {
                'for': 'wpDestFile' + index,
                'class': 'mu-label'
            }).text('Filename:'),
            $('<input>', {
                type: 'text',
                name: 'wpDestFile' + index,
                id: 'wpDestFile' + index,
                'class': 'mu-input',
                value: fileElement.name
            })
        );
        
        // Description input
        var descriptionContainer = $('<div>', {
            'class': 'mu-input-container',
            'style': 'margin-bottom: 15px;'
        }).append(
            $('<label>', {
                'for': 'wpUploadDescription' + index,
                'class': 'mu-label'
            }).text('Description:'),
            $('<textarea>', {
                name: 'wpUploadDescription' + index,
                id: 'wpUploadDescription' + index,
                'class': 'mu-textarea'
            }).val(globalDescription || defaultDescription)
        );
        
        // License input
        var licenseContainer = $('<div>', {
            'class': 'mu-input-container mu-license-container',
            'style': 'margin-bottom: 15px;'
        }).append(
            $('<label>', {
                'for': 'wpLicense' + index,
                'class': 'mu-label'
            }).text('License:')
        );
        
        // Only add the dropdown if we have a source to clone from
        if (licenseSource && licenseSource.length) {
            var licenseDropdown = licenseSource.clone().attr({
                name: 'wpLicense' + index,
                id: 'wpLicense' + index,
                'class': 'mu-input'
            }).val(defaultLicense);
            
            licenseContainer.append(licenseDropdown);
        }
        
        // Checkbox options container
        var checkboxContainer = $('<div>', {
            'class': 'mu-checkbox-container',
            'style': 'margin-top: 15px;'
        });
        
        // Watch checkbox
        var watchContainer = $('<div>', {
            'class': 'mu-checkbox'
        }).append(
            $('<input>', {
                type: 'checkbox',
                name: 'wpWatchthis' + index,
                id: 'wpWatchthis' + index,
                value: '1',
                checked: watchUploads ? true : false
            }),
            $('<label>', {
                'for': 'wpWatchthis' + index
            }).text(mw.message('watchthisupload').text())
        );
        
        // Ignore warnings checkbox
        var ignoreWarningContainer = $('<div>', {
            'class': 'mu-checkbox'
        }).append(
            $('<input>', {
                type: 'checkbox',
                name: 'wpIgnoreWarning' + index,
                id: 'wpIgnoreWarning' + index,
                value: '1'
            }),
            $('<label>', {
                'for': 'wpIgnoreWarning' + index
            }).text(mw.message('ignorewarnings').text())
        );
        
        // Add all elements to card
        checkboxContainer.append(watchContainer, ignoreWarningContainer);
        fileCard.append(
            fileHeader,
            filePreview,
            filenameContainer,
            descriptionContainer,
            licenseContainer,
            checkboxContainer
        );
        
        // Add card to grid
        $('#mu-file-grid').append(fileCard);
    }
    
    /**
     * Format file size in human-readable format
     * @param {number} bytes - The file size in bytes
     * @return {string} Formatted file size
     */
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    /**
     * Reset form to its initial state
     */
    function resetForm() {
        files = [];
        $("#mu-file-grid").empty();
    }
    
    /**
     * Initiate uploading process
     * @param {Event} event - The submit event
     * @return {boolean} False to prevent default form submission
     */
    function uploadFiles(event) {
        event.preventDefault();
        
        if (files.length === 0) {
            alert(i18n.msg('nofile').plain());
            return false;
        } else if (files.length > limit) {
            alert(i18n.msg('limit').plain());
            return false;
        }
        
        // Fix any license dropdowns that might be missing before upload
        fixMissingLicenseDropdowns();
        
        // Set up the UI for upload status
        setupUploadStatusUI();
        
        // Start uploading
        uploadNextFile();
        
        return false;
    }
    
    /**
     * Set up the UI elements to display upload status
     */
    function setupUploadStatusUI() {
        $("#mw-content-text").hide();
        
        // Create upload results container
        var uploadResultsContainer = $('<div>', {
            'class': 'mu-upload-result'
        });
        
        // Create progress info container
        var progressContainer = $('<div>', {
            'class': 'mu-progress-container'
        });
        
        var progressInfo = $('<div>', {
            'class': 'mu-progress-info'
        }).append(
            $('<div>', {
                'class': 'mu-progress-label'
            }).text('Uploading files...'),
            $('<div>', {
                'class': 'mu-progress-counter',
                'id': 'mu-progress-counter'
            }).text('0/' + files.length)
        );
        
        // Add ProgressBarWidget
        progressBarWidget = new OO.ui.ProgressBarWidget();
        
        // Create success section
        var successSection = $('<div>').append(
            $('<h3>').text(i18n.msg('successful').escape()),
            $('<ul>', {
                'id': 'multiUploadDone',
                'class': 'mu-success-list'
            })
        );
        
        // Create warnings section
        var warningsSection = $('<div>', {
            'id': 'multiUploadWarnings',
            'style': 'display:none;'
        }).append(
            $('<h3>').text(i18n.msg('warnings').escape()),
            $('<ul>', {
                'class': 'mu-warning-list'
            })
        );
        
        // Create errors section
        var errorSection = $('<div>', {
            'id': 'multiUploadFailed',
            'style': 'display:none;'
        }).append(
            $('<h3>').text(i18n.msg('failed').escape()),
            $('<ul>', {
                'class': 'mu-error-list'
            })
        );
        
        // Add back button
        var backButton = $('<button>', {
            'type': 'button',
            'class': 'mu-button',
            'style': 'margin-top: 20px;'
        }).text('Upload More Files').on('click', function() {
            location.reload();
        });
        
        // Assemble UI
        progressContainer.append(progressInfo, progressBarWidget.$element);
        uploadResultsContainer.append(
            progressContainer,
            successSection,
            warningsSection,
            errorSection,
            backButton
        );
        
        uploadResultsContainer.prependTo("#content");
        document.body.scrollIntoView(true);
        
        // Reset counters
        curFile = 0;
        uploadResultCount = {
            warnings: 0,
            errors: 0
        };
    }
    
    /**
     * Upload the next file in the queue
     */
    function uploadNextFile() {
        if (curFile >= files.length) {
            finishUpload();
            return;
        }
        
        if (files[curFile] === undefined) {
            curFile++;
            uploadNextFile();
            return;
        }
        
        var progress = 100 * curFile / files.length;
        progressBarWidget.setProgress(progress);
        $('#mu-progress-counter').text(curFile + '/' + files.length);
        
        var uploadParams = createUploadParams(curFile);
        performUploadRequest(uploadParams);
    }
    
    /**
     * Create parameters for the upload API request
     * @param {number} fileIndex - The index of the file to upload
     * @return {Object} Parameters for the API request
     */
    function createUploadParams(fileIndex) {
        var filename = $("#wpDestFile" + fileIndex).val() || files[fileIndex].name;
        var license = "";
        var licenseDropdown = $("#wpLicense" + fileIndex);
        
        if (licenseDropdown.length) {
            var licenseTitle = licenseDropdown.find('option:selected').prop("title");
            license = (licenseTitle && licenseTitle !== "{{}}") ? 
                "== " + mw.message('license-header').plain() + " ==\n" + licenseTitle : "";
        }
        
        var description = $("#wpUploadDescription" + fileIndex).val() ? 
            "== " + mw.message('filedesc').plain() + " ==\n" + $("#wpUploadDescription" + fileIndex).val() : "";
        
        var watch = $("#wpWatchthis" + fileIndex).is(":checked") ? 'watch' : 'nochange';
        var ignoreWarnings = $("#wpIgnoreWarning" + fileIndex).is(":checked");
        
        var params = {
            action: 'upload',
            file: files[fileIndex],
            filename: filename,
            filesize: files[fileIndex].size,
            token: token,
            text: description + "\n" + license,
            watchlist: watch,
            format: 'json',
            formatversion: 2,
            errorformat: 'html',
            errorlang: config.wgUserLanguage
        };
        
        if (ignoreWarnings) {
            params.ignorewarnings = 1;
        }
        
        return params;
    }
    
    /**
     * Perform the upload API request
     * @param {Object} params - Parameters for the API request
     */
    function performUploadRequest(params) {
        var options = {
            contentType: 'multipart/form-data',
            timeout: 0  // No timeout (copied from mw.Api.upload code)
        };
        
        api.post(params, options)
            .done(function(data) {
                handleUploadSuccess(data, params.filename);
            })
            .fail(function(code, data) {
                handleUploadFailure(code, data, params.filename);
            });
    }
    
    /**
     * Handle a successful upload response
     * @param {Object} data - The API response data
     * @param {string} filename - The filename that was uploaded
     */
    function handleUploadSuccess(data, filename) {
        console.log(data);
        
        if (data.upload.result === 'Warning') {
            uploadResultCount.warnings++;
            getUploadWarningTexts(data.upload.warnings, filename).done(function(warnings) {
                $("#multiUploadWarnings > ul").append(makeFailureItem(filename, warnings));
                $("#multiUploadWarnings").show();
            });
        } else if (data.upload.result === 'Success') {
            $("#multiUploadDone").append(
                '<li><a href="' + data.upload.imageinfo.descriptionurl + 
                '" target="_blank">' + data.upload.filename + '</a></li>'
            );
        } else {
            console.warn('Unexpected success result', data);
        }
        
        curFile++;
        uploadNextFile();
    }
    
    /**
     * Handle an upload failure
     * @param {string} code - The error code
     * @param {Object} data - The error data
     * @param {string} filename - The filename that failed to upload
     */
    function handleUploadFailure(code, data, filename) {
        console.log(code);
        console.log(data);
        
        uploadResultCount.errors++;
        var failureItem;
        
        if (data.errors) {
            var errorReasons = data.errors.map(function(error) { return error.html; });
            failureItem = makeFailureItem(filename, errorReasons);
        } else if (code === 'http') {
            failureItem = makeFailureItem(filename, i18n.msg('network-error').escape());
        } else {
            failureItem = makeFailureItem(filename, i18n.msg('unknown-error').escape());
        }
        
        $("#multiUploadFailed > ul").append(failureItem);
        $("#multiUploadFailed").show();
        
        curFile++;
        uploadNextFile();
    }
    
    /**
     * Complete the upload process and display final status
     */
    function finishUpload() {
        allowCloseWindow.release();
        
        if (uploadResultCount.warnings === 0 && uploadResultCount.errors === 0) {
            showNotification('success');
        } else {
            if (uploadResultCount.warnings !== 0) {
                showNotification('warning', uploadResultCount.warnings);
            }
            if (uploadResultCount.errors !== 0) {
                showNotification('error', uploadResultCount.errors);
            }
        }
        
        progressBarWidget.setProgress(100);
        $('.mu-progress-label').text('Upload Complete');
        $('#mu-progress-counter').text(files.length + '/' + files.length);
    }
    
    /**
     * Create an HTML list item for upload failures or warnings
     * @param {string} filename - The filename that had an issue
     * @param {string|Array} reasons - The reasons for the failure
     * @return {jQuery} The list item element
     */
    function makeFailureItem(filename, reasons) {
        if (reasons && !Array.isArray(reasons)) {
            reasons = [reasons];
        }
        
        var item = $('<li>');
        
        if (!reasons || reasons.length === 0) {
            item.text(filename);
        } else if (reasons.length === 1) {
            item.text(filename + ': ').append(reasons[0]);
        } else {
            var reasonList = $('<ul>', {
                'class': 'mu-reason-list'
            });
            reasons.forEach(function(reason) {
                reasonList.append($('<li>').html(reason));
            });
            item.text(filename + ':').append(reasonList);
        }
        
        return item;
    }
    
    /**
     * Get localized warning messages for upload warnings
     * @param {Object} warnings - The warnings object from the API
     * @param {string} filename - The filename that caused warnings
     * @return {jQuery.Promise} A promise that resolves with the warning messages
     */
    function getUploadWarningTexts(warnings, filename) {
        var deferred = $.Deferred();
        
        var parseDataWrapper = $('<div>');
        var correctedFilename = warnings.badfilename || filename;
        
        for (var warningKey in warnings) {
            var warningData = warnings[warningKey];
            var message = getLocalizedWarningMessage(warningKey, warningData, correctedFilename);
            $('<div>').html(message).appendTo(parseDataWrapper);
        }
        
        api.parse(parseDataWrapper.html()).done(function(parsedData) {
            var parsedWarnings = $(parsedData).children().map(function() {
                return this.innerHTML;
            }).get();
            deferred.resolve(parsedWarnings);
        }).fail(function() {
            deferred.reject();
        });
        
        return deferred.promise();
    }
    
    /**
     * Get a localized warning message for a specific warning type
     * @param {string} key - The warning key
     * @param {*} args - The warning arguments
     * @param {string} filenameWithoutNamespace - The filename without namespace
     * @return {string} The localized warning message
     */
    function getLocalizedWarningMessage(warningKey, args, filenameWithoutNamespace) {
        switch (warningKey) {
            case 'badfilename': 
                return mw.message('badfilename', args).plain();
                
            case 'duplicate': {
                var duplicateNames = args;
                var warningMessage = mw.message('file-exists-duplicate', duplicateNames.length).plain();
                var gallery = '<gallery>\n';
                duplicateNames.forEach(function(name) {
                    gallery += prependNamespace('file', name) + '\n';
                });
                gallery += '</gallery>';
                warningMessage += '\n' + gallery;
                return warningMessage;
            }
            
            case 'exists': {
                var existingFile = prependNamespace('file', args);
                return mw.message('fileexists', existingFile).plain();
            }
            
            case 'nochange': {
                var unchangedFile = prependNamespace('file', filenameWithoutNamespace);
                return mw.message('fileexists-no-change', unchangedFile).plain();
            }
            
            default: {
                // There is no exhaustive documentation on all possible warnings.
                // For now the (seemingly) most common ones are implemented.
                // For the rest we fall back to this generic message and wait for feedback.
                var warningKey = '<code>' + warningKey + '</code>';
                var warningDetails = '<code>' + JSON.stringify(args) + '</code>';
                return i18n.msg('unknown-warning', warningKey, warningDetails).plain();
            }
        }
    }
    
    /**
     * Show a notification message
     * @param {string} type - The type of notification (success, warning, error)
     * @param {number} count - The count of items for the notification
     */
    function showNotification(type, count) {
        var text = i18n.msg(type + '-notification', count).parse();
        var messageWidget = new OO.ui.MessageWidget({
            type: type,
            inline: true,
            label: text
        });
        mw.notification.notify(messageWidget.$element);
    }
    
    /**
     * Prepend a namespace to a page name
     * @param {string} canonicalNamespace - The canonical namespace name
     * @param {string} pageName - The page name
     * @return {string} The full page name with namespace
     */
    function prependNamespace(canonicalNamespace, pageName) {
        var namespaceId = config.wgNamespaceIds[canonicalNamespace];
        var formattedNamespace = config.wgFormattedNamespaces[namespaceId];
        var fullPageName = formattedNamespace + ':' + pageName;
        return fullPageName;
    }
    
    // Start the initialization process
    mw.hook('dev.i18n').add(preload);
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});