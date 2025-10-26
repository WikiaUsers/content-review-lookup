/*
 * Staff Management System
 * A comprehensive icon and username colorization system for Fandom wikis
 * Created by xGronox/Gronox/v.lad
 * Version: 2.0.5
 * 
 * This system provides a powerful, flexible interface for managing staff badges,
 * colored usernames, and custom icons across all wiki pages. It allows administrators
 * to create custom staff roles with unique icons and colors, assign them to users,
 * and display them consistently throughout the wiki.
 *
 * Key Features:
 * - Custom icon types with individual colors and tooltips
 * - User management with multiple role assignments
 * - Custom badge tooltips per user
 * - Global and per-location icon size settings
 * - Configurable display locations (Profile, Message Wall, etc.)
 * - Drag & drop interface for reordering
 * - Material Design 3 UI with custom color picker
 * - Real-time preview and editing
 * - Dynamic content observer for React-based pages
 *
 * Technical Highlights:
 * - Uses native MediaWiki API for all operations
 * - ECMAScript 5 compatible
 * - jQuery-based for maximum compatibility
 * - Performance optimized with debouncing
 * - Mutation Observer for dynamic content
 * - Follows Fandom design patterns
 *
 * Display Locations:
 * - Profile pages (h1[itemprop="name"])
 * - Message Wall (EntityHeader_name)
 * - Contributions, Activity, History pages
 * - Recent Changes (.mw-userlink)
 * - Blog listings
 * - CircleAvatar templates (Meet Our Team)
 * - Top Contributors widgets
 *
 * Permissions:
 * - View: content-moderator, staff
 * - Edit: sysop+ (administrators) only
 *
 * Dependencies:
 * - jQuery
 * - MediaWiki API
 * - u:dev:ShowCustomModal
 * - Material Symbols Outlined font
 *
 * FILES:
 * - JS: MediaWiki:Staff.js (Fisch_Wiki:Staff.js)
 * - CSS: MediaWiki:Staff.css
 * - DATA: Fisch_Wiki:Staff (JSON configuration)
 */

;(function($, mw) {
    'use strict';
    
    // ========================================
    // IMPORTS & DEPENDENCIES
    // ========================================
    
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:ShowCustomModal.js'
    });
    
    importArticle({
        type: 'style',
        article: 'MediaWiki:Staff.css'
    });
    
    var showCustomModal;
    
    // ========================================
    // PAGE VALIDATION
    // ========================================
    
    var namespace = mw.config.get('wgNamespaceNumber');
    var canonicalSpecialPageName = mw.config.get('wgCanonicalSpecialPageName');
    
    // ========================================
    // CUSTOM COLOR PICKER COMPONENT
    // ========================================
    
    var CustomColorPicker = {
        h: 0, s: 1, l: 0.5, a: 1,
        callback: null,
        el: {},
        
        init: function() {
            if (document.getElementById('custom-color-picker')) return;
            this.create();
            this.bindEvents();
        },
        
        create: function() {
            var pickerHTML = '<div class="custom-color-picker" id="custom-color-picker">' +
                '<div class="saturation-brightness-box" id="sat-box">' +
                    '<div class="handle" id="sat-handle"></div>' +
                '</div>' +
                '<div class="color-controls">' +
                    '<div class="color-preview-section">' +
                        '<div id="color-preview-box">' +
                            '<div class="color-fill" id="color-fill"></div>' +
                        '</div>' +
                        '<button id="eyedropper-btn" title="Pick color from screen">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">' +
                                '<path d="M8.5,8.5l-8-8"/>' +
                                '<path d="M12.2,1.3l2.5,2.5c0.6,0.6,0.6,1.5,0,2.1l-1,1L9.5,2.8l1-1C10.8-0.4,11.7-0.4,12.2,1.3z"/>' +
                                '<path d="M1.3,12.2L2.8,9.5L7,13.7l-2.8,1.5C3.5,15.5,2.5,15.5,1.9,14.9C1,14.2,1,13.2,1.3,12.2z"/>' +
                            '</svg>' +
                        '</button>' +
                    '</div>' +
                    '<div class="sliders-section">' +
                        '<div class="slider-container" id="hue-slider-container">' +
                            '<input type="range" id="hue-slider" min="0" max="360">' +
                        '</div>' +
                        '<div class="slider-container" id="opacity-slider-container">' +
                            '<input type="range" id="opacity-slider" min="0" max="1" step="0.01">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="color-inputs">' +
                    '<div class="input-group">' +
                        '<input type="text" id="hex-input">' +
                        '<label>HEX</label>' +
                    '</div>' +
                    '<div class="input-group">' +
                        '<input type="number" id="rgb-r" min="0" max="255">' +
                        '<label>R</label>' +
                    '</div>' +
                    '<div class="input-group">' +
                        '<input type="number" id="rgb-g" min="0" max="255">' +
                        '<label>G</label>' +
                    '</div>' +
                    '<div class="input-group">' +
                        '<input type="number" id="rgb-b" min="0" max="255">' +
                        '<label>B</label>' +
                    '</div>' +
                '</div>' +
            '</div>';
            
            $('body').append(pickerHTML);
            
            this.el = {
                picker: document.getElementById('custom-color-picker'),
                satBox: document.getElementById('sat-box'),
                satHandle: document.getElementById('sat-handle'),
                hueSlider: document.getElementById('hue-slider'),
                opacitySlider: document.getElementById('opacity-slider'),
                colorFill: document.getElementById('color-fill'),
                hexInput: document.getElementById('hex-input'),
                rInput: document.getElementById('rgb-r'),
                gInput: document.getElementById('rgb-g'),
                bInput: document.getElementById('rgb-b'),
                eyedropperBtn: document.getElementById('eyedropper-btn')
            };
        },
        
        bindEvents: function() {
            var self = this;
            
            var drag = function(element, callback) {
                var move = function(e) {
                    e.preventDefault();
                    callback(e);
                };
                var stop = function() {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', stop);
                };
                element.addEventListener('mousedown', function(e) {
                    if (e.button === 0) {
                        callback(e);
                        document.addEventListener('mousemove', move);
                        document.addEventListener('mouseup', stop);
                    }
                });
            };
            
            drag(this.el.satBox, function(e) { self.updateSaturationBrightness(e); });
            
            this.el.hueSlider.addEventListener('input', function(e) { self.updateFromHue(e); });
            this.el.opacitySlider.addEventListener('input', function(e) { self.updateFromOpacity(e); });
            this.el.hexInput.addEventListener('change', function(e) { self.updateFromHex(e); });
            
            ['r', 'g', 'b'].forEach(function(c) {
                self.el[c + 'Input'].addEventListener('change', function() { self.updateFromRgb(); });
            });
            
            this.el.eyedropperBtn.addEventListener('click', function() { self.openEyedropper(); });
            
            this.makeDraggable();
        },
        
        makeDraggable: function() {
            var self = this;
            var isDragging = false;
            var startX = 0, startY = 0;
            var initialLeft = 0, initialTop = 0;
            
            var mouseDownHandler = function(e) {
                var rect = self.el.picker.getBoundingClientRect();
                var edgeSize = 10;
                var isOnEdge = (
                    e.clientX < rect.left + edgeSize ||
                    e.clientX > rect.right - edgeSize ||
                    e.clientY < rect.top + edgeSize ||
                    e.clientY > rect.bottom - edgeSize
                );
                
                var isInteractiveElement = (
                    e.target.tagName === 'INPUT' ||
                    e.target.tagName === 'BUTTON' ||
                    e.target.closest('.saturation-brightness-box') ||
                    e.target.closest('.slider-container')
                );
                
                if (isOnEdge || !isInteractiveElement) {
                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    
                    var currentLeft = parseInt(self.el.picker.style.left) || rect.left;
                    var currentTop = parseInt(self.el.picker.style.top) || rect.top;
                    
                    initialLeft = currentLeft;
                    initialTop = currentTop;
                    
                    self.el.picker.style.cursor = 'grabbing';
                    e.preventDefault();
                    e.stopPropagation();
                }
            };
            
            var mouseMoveHandler = function(e) {
                if (isDragging) {
                    var deltaX = e.clientX - startX;
                    var deltaY = e.clientY - startY;
                    
                    var newLeft = initialLeft + deltaX;
                    var newTop = initialTop + deltaY;
                    
                    self.el.picker.style.left = newLeft + 'px';
                    self.el.picker.style.top = newTop + 'px';
                    
                    e.preventDefault();
                }
            };
            
            var mouseUpHandler = function(e) {
                if (isDragging) {
                    isDragging = false;
                    self.el.picker.style.cursor = 'default';
                }
            };
            
            this.el.picker.addEventListener('mousedown', mouseDownHandler);
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        },
        
        updateUI: function() {
            var rgb = this.hslToRgb(this.h, this.s, this.l);
            var hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
            
            this.el.satBox.style.backgroundColor = 'hsl(' + this.h + ', 100%, 50%)';
            this.el.satHandle.style.left = (this.s * 100) + '%';
            this.el.satHandle.style.top = (100 * (1 - this.l / (1 - 0.5 * Math.abs(2 * this.s - 1)))) + '%';
            
            this.el.hueSlider.value = this.h;
            this.el.opacitySlider.value = this.a;
            
            this.el.colorFill.style.backgroundColor = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + this.a + ')';
            this.el.hexInput.value = hex.toUpperCase();
            this.el.rInput.value = rgb.r;
            this.el.gInput.value = rgb.g;
            this.el.bInput.value = rgb.b;
            
            if (this.callback) {
                this.callback(hex);
            }
        },
        
        updateSaturationBrightness: function(e) {
            var rect = this.el.satBox.getBoundingClientRect();
            var s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            var v = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
            
            this.s = s;
            this.l = (1 - v) * (1 - 0.5 * Math.abs(2 * s - 1));
            this.updateUI();
        },
        
        updateFromHue: function(e) {
            this.h = e.target.value;
            this.updateUI();
        },
        
        updateFromOpacity: function(e) {
            this.a = e.target.value;
            this.updateUI();
        },
        
        updateFromHex: function(e) {
            var rgb = this.hexToRgb(e.target.value);
            this.updateFromRgbValues(rgb.r, rgb.g, rgb.b);
        },
        
        updateFromRgb: function() {
            this.updateFromRgbValues(this.el.rInput.value, this.el.gInput.value, this.el.bInput.value);
        },
        
        updateFromRgbValues: function(r, g, b) {
            var hsl = this.rgbToHsl(r, g, b);
            this.h = hsl.h;
            this.s = hsl.s;
            this.l = hsl.l;
            this.updateUI();
        },
        
        openEyedropper: function() {
            var self = this;
            if (!window.EyeDropper) {
                alert("Your browser doesn't support the Eyedropper API.");
                return;
            }
            var eyeDropper = new window.EyeDropper();
            eyeDropper.open().then(function(result) {
                self.updateFromHex({ target: { value: result.sRGBHex } });
            }).catch(function() {
                console.log('Eyedropper canceled.');
            });
        },
        
        show: function(trigger, initialColor, callback) {
            this.callback = callback;
            this.currentTrigger = trigger;
            
            var rect = trigger.getBoundingClientRect();
            this.el.picker.style.left = (window.scrollX + rect.left) + 'px';
            this.el.picker.style.top = (window.scrollY + rect.bottom + 5) + 'px';
            this.el.picker.classList.add('is-open');
            this.updateFromHex({ target: { value: initialColor || '#FFFFFF' } });
            
            var self = this;
            
            if (this.closeHandler) {
                document.removeEventListener('click', this.closeHandler);
            }
            
            setTimeout(function() {
                self.closeHandler = function(e) {
                    if (!self.el.picker.contains(e.target) && 
                        e.target !== trigger && 
                        !e.target.classList.contains('md-color-preview')) {
                        self.hide();
                    }
                };
                document.addEventListener('click', self.closeHandler);
            }, 100);
        },
        
        hide: function() {
            this.el.picker.classList.remove('is-open');
            if (this.closeHandler) {
                document.removeEventListener('click', this.closeHandler);
                this.closeHandler = null;
            }
        },
        
        currentTrigger: null,
        
        hslToRgb: function(h, s, l) {
            var c = (1 - Math.abs(2 * l - 1)) * s;
            var x = c * (1 - Math.abs((h / 60) % 2 - 1));
            var m = l - c / 2;
            var r = 0, g = 0, b = 0;
            
            if (0 <= h && h < 60) { r = c; g = x; b = 0; }
            else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
            else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
            else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
            else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
            else { r = c; g = 0; b = x; }
            
            return {
                r: Math.round(255 * (r + m)),
                g: Math.round(255 * (g + m)),
                b: Math.round(255 * (b + m))
            };
        },
        
        rgbToHex: function(r, g, b) {
            return '#' + [r, g, b].map(function(x) {
                var hex = parseInt(x).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
        },
        
        hexToRgb: function(hex) {
            var r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = '0x' + hex[1] + hex[1];
                g = '0x' + hex[2] + hex[2];
                b = '0x' + hex[3] + hex[3];
            } else if (hex.length === 7) {
                r = '0x' + hex[1] + hex[2];
                g = '0x' + hex[3] + hex[4];
                b = '0x' + hex[5] + hex[6];
            }
            return { r: +r, g: +g, b: +b };
        },
        
        rgbToHsl: function(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            var min = Math.min(r, g, b);
            var max = Math.max(r, g, b);
            var delta = max - min;
            var h = 0, s = 0, l = 0;
            
            if (delta === 0) h = 0;
            else if (max === r) h = ((g - b) / delta) % 6;
            else if (max === g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            
            h = Math.round(h * 60);
            if (h < 0) h += 360;
            
            l = (max + min) / 2;
            s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            
            return { h: h, s: s, l: l };
        }
    };
    
    // ========================================
    // STAFF FUNCTIONS OBJECT
    // ========================================
    
    window.staffFunctions = {
        
        // Page refresh with cache purge
        quickPurge: function() {
            new mw.Api().post({
                action: 'purge',
                titles: mw.config.get('wgPageName'),
            }).always(function(data) {
                if (typeof(data) !== "object") {
                    console.warn('[Staff System] API Error in purging:', data);
                }
            });
            window.location.reload();
        },

        // Default settings template
        staffDefaultSettings: function() {
            var default_cfg = JSON.stringify({
                dataUser: {}, 
                dataStaffTypes: {
                    "bureaucrat": {
                        "title": "Bureaucrat",
                        "description": "Has all administrative abilities including giving and removing administrator and bureaucrat status.",
                        "color": "#FF7F7F",
                        "text_shadow": "0 0 3px rgba(255, 127, 127, 0.3)",
                        "image_url": "https://static.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg",
                        "filter": "drop-shadow(0 0 2px rgba(255, 127, 127, 0.7))"
                    },
                    "administrator": {
                        "title": "Administrator",
                        "description": "Has access to all maintenance tools.",
                        "color": "#4CAF50",
                        "text_shadow": "0 0 3px rgba(76, 175, 80, 0.3)",
                        "image_url": "https://static.wikia.nocookie.net/central/images/1/12/Badge-Admin.svg",
                        "filter": "drop-shadow(0 0 2px rgba(76, 175, 80, 0.7))"
                    },
                    "contentmoderator": {
                        "title": "Content Moderator",
                        "description": "Can edit protected pages, delete and undelete pages.",
                        "color": "#78A2CC",
                        "text_shadow": "0 0 3px rgba(120, 162, 204, 0.3)",
                        "image_url": "https://static.wikia.nocookie.net/central/images/e/ef/Badge-ContentModerator.svg",
                        "filter": "drop-shadow(0 0 2px rgba(120, 162, 204, 0.7))"
                    },
                    "discussionmoderator": {
                        "title": "Discussion Moderator",
                        "description": "Can moderate the forums, message walls, comments and chat.",
                        "color": "#78A2CC",
                        "text_shadow": "0 0 3px rgba(120, 162, 204, 0.3)",
                        "image_url": "https://static.wikia.nocookie.net/central/images/5/50/Badge-DiscussionsModerator.svg",
                        "filter": "drop-shadow(0 0 2px rgba(120, 162, 204, 0.7))"
                    },
                    "rollback": {
                        "title": "Rollback",
                        "description": "Can quickly undo vandalism and bad-faith edits.",
                        "color": "#FFB980",
                        "text_shadow": "0 0 3px rgba(255, 185, 128, 0.3)",
                        "image_url": "https://static.wikia.nocookie.net/fisch/images/0/0b/Rollback.png/revision/latest",
                        "filter": "drop-shadow(0 0 2px rgba(255, 185, 128, 0.7))"
                    }
                },
                show_username_color: true,
                animation_enabled: false,
                display_settings: {
                    profile_page: true,
                    message_wall: true,
                    contributions: true,
                    user_activity: true,
                    recent_changes: true,
                    blog_listing: true,
                    circle_avatar: true,
                    top_contributors: true,
                    discussion_posts: true,
                    wiki_activity: true
                },
                icon_sizes: {
                    profile_page: 24,
                    message_wall: 20,
                    contributions: 18,
                    user_activity: 18,
                    recent_changes: 16,
                    blog_listing: 18,
                    circle_avatar: 20,
                    top_contributors: 18,
                    discussion_posts: 18,
                    wiki_activity: 16
                },
                icon_spacing: 4
            });
            
            $('#mw-content-text').prepend('<div class="staff-notification-panel md-panel"><div class="md-panel-content">Settings not exist or broken.&nbsp;<button id="StaffResetSettings" class="md-button md-button-raised md-button-primary">Reset settings</button></div></div>');
            $('#StaffResetSettings').click(function() {
                staffFunctions.saveSettingFunction(default_cfg);
            });
        },
        
        // Switch between tabs
        switchSettings: function(class_name) {
            $('.StaffSetMenu').hide();
            $('.' + class_name).show();
            
            $('.staff-settings-tab').removeClass('active');
            $('[data-tab="' + class_name + '"]').addClass('active');
        },
        
        // URL validation for Wikia images
        urlMatcher: function(url) {
            if (url.match(/^https?:\/\/(images?|static|vignette)\d?\.wikia\.nocookie\.net\//)) {
                return true;
            }
            return false;
        },

        // Add new staff type form
        addStaffTypeForm: function() {
            var $newForm = $(
                '<div class="StaffTypeForm md-card">' +
                    '<div class="md-card-header staff-type-header">' +
                        '<div class="StaffImagePreview">' +
                            '<img class="staff-icon-image" height="32" src="" alt="Icon preview"/>' +
                        '</div>' +
                        '<div class="md-card-title">' +
                            '<span>New Icon Type (click to edit)</span>' +
                        '</div>' +
                        '<div class="md-card-actions">' +
                            '<button class="md-button md-button-icon md-button-delete" onclick="event.stopPropagation(); staffFunctions.deleteStaffType($(this).closest(\'.StaffTypeForm\'))" title="Remove">' +
                                '<span class="md-icon">close</span>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="staff-type-editor">' +
                        '<div class="md-card-content">' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Staff icon ID</label>' +
                                '<input class="StaffListId md-input" placeholder="staff-id (lowercase, no spaces)" data-prev="undefined"/>' +
                            '</div>' +
                            '<div class="md-input-group">' + 
                                '<label class="md-input-label">Display title</label>' +
                                '<input class="StaffListTitle md-input" placeholder="e.g., Administrator"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Tooltip description (shown on hover)</label>' +
                                '<input class="StaffListDescription md-input" placeholder="Icon description for tooltip"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Icon image URL</label>' +
                                '<input class="StaffListImageUrl md-input" placeholder="Full image URL from Wikia"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Username color (hex) - optional</label>' +
                                '<div class="md-color-input-wrapper">' +
                                    '<input class="StaffListColor md-input md-color-input" placeholder="Leave empty for no color" pattern="^#([A-Fa-f0-9]{6})$"/>' +
                                    '<span class="md-color-preview" style="background-color:#ccc;"></span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Icon size (pixels) - optional</label>' +
                                '<input class="StaffListIconSize md-input" type="number" min="8" max="48" placeholder="Default: 24"/>' +
                            '</div>' +
                        '</div>' +
                        '<div class="md-card-actions md-card-actions-right">' +
                            '<button class="md-button md-button-text" onclick="staffFunctions.previewStaffType($(this).closest(\'.StaffTypeForm\'))" title="Preview">Preview</button>' +
                            '<button class="md-button md-button-raised md-button-primary" onclick="staffFunctions.saveStaffType($(this).closest(\'.StaffTypeForm\'))" title="Save">Save</button>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
            
            $('.StaffList').append($newForm);
            $newForm.find('.staff-type-editor').show();
            
            $newForm.find('.StaffListColor').on('input', function() {
                var color = $(this).val();
                if (color && color.match(/^#([A-Fa-f0-9]{6})$/)) {
                    $(this).closest('.md-color-input-wrapper').find('.md-color-preview').css('background-color', color);
                }
            });
        },
        
        // Preview staff type
        previewStaffType: function($form) {
            var imageUrl = $form.find('.StaffListImageUrl').val();
            var title = $form.find('.StaffListTitle').val();
            var color = $form.find('.StaffListColor').val();
            
            if (!imageUrl) {
                staffFunctions.showNotification('Error: Image URL is required for preview', 'error');
                return;
            }
            
            if (this.urlMatcher(imageUrl)) {
                $form.find('.StaffImagePreview img')
                    .attr('src', imageUrl)
                    .attr('title', title);
                
                if (color && color.match(/^#([A-Fa-f0-9]{6})$/)) {
                    $form.find('.StaffImagePreview').css('border-color', color);
                }
                
                staffFunctions.showNotification('Preview updated', 'info');
            } else {
                staffFunctions.showNotification('Error: Invalid image URL. Must be from Wikia image server.', 'error');
            }
        },
        
        // Save staff type
        saveStaffType: function($form) {
            var typeId = $form.find('.StaffListId').val().toLowerCase().replace(/\s+/g, '');
            var imageUrl = $form.find('.StaffListImageUrl').val();
            var title = $form.find('.StaffListTitle').val();
            var description = $form.find('.StaffListDescription').val();
            var color = $form.find('.StaffListColor').val();
            var prevId = $form.find('.StaffListId').attr('data-prev');
            
            if (!typeId || !title || !imageUrl) {
                staffFunctions.showNotification('Error: ID, title and image URL are required fields', 'error');
                return;
            }
            
            if (!this.urlMatcher(imageUrl)) {
                staffFunctions.showNotification('Error: Invalid image URL. Must be from Wikia image server.', 'error');
                return;
            }
            
            $form.find('.StaffListId').attr('data-prev', typeId);
            $form.find('.StaffImagePreview img')
                .attr('src', imageUrl)
                .attr('title', title);
                
            if (color && color.match(/^#([A-Fa-f0-9]{6})$/)) {
                $form.find('.StaffImagePreview').css('border-color', color);
            }
            
            $form.find('.staff-type-header .md-card-title span').text(title);
            
            staffFunctions.showNotification('Staff icon "' + title + '" saved successfully', 'success');
        },
        
        // Delete staff type
        deleteStaffType: function($form) {
            var typeId = $form.find('.StaffListId').val();
            var title = $form.find('.StaffListTitle').val() || typeId;
            
            $form.fadeOut(300, function() {
                $(this).remove();
            });
            
            staffFunctions.showNotification('Staff icon "' + title + '" removed', 'info');
        },
        
        // Add new user form
        addUserForm: function() {
            var uniqueId = staffFunctions.generateUniqueId();
            $('.StaffUser').append(
                '<div class="UserForm md-card">' +
                    '<div class="md-card-header">' +
                        '<div class="md-card-title">' +
                            '<input class="StaffUserName md-input" placeholder="Username"/>' +
                        '</div>' +
                        '<div class="md-card-action-buttons">' +
                            '<button class="md-button md-button-icon md-button-icon-red" onclick="$(this).closest(\'.UserForm\').remove()" title="Remove">' +
                                '<span class="md-icon">close</span>' +
                            '</button>' +
                            '<button class="md-button md-button-icon md-button-icon-green user-icons-toggle" onclick="staffFunctions.toggleUserIcons(this)" title="Toggle Icons">' +
                                '<span class="md-icon">chevron_right</span>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="staff-icons-selector" style="display:none;">' +
                        '<div class="md-card-content">' +
                            '<div class="md-input-row-two-column">' +
                                '<div class="md-input-group">' +
                                    '<label class="md-input-label">Badge Title (optional - overrides icon title)</label>' +
                                    '<input class="StaffUserBadgeTitle md-input" placeholder="Custom title for this user"/>' +
                                '</div>' +
                                '<div class="md-input-group">' +
                                    '<label class="md-input-label">Badge Tooltip (optional - overrides icon tooltip)</label>' +
                                    '<input class="StaffUserBadgeTooltip md-input" placeholder="Custom tooltip for this user\'s badges"/>' +
                                '</div>' +
                            '</div>' +
                            '<div class="md-chip-container" id="user-icon-container-' + uniqueId + '"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
            
            var $container = $('.StaffUser .UserForm:last-child .md-chip-container');
            this.populateIconSelector($container);
        },
        
        // Toggle user icons selector
        toggleUserIcons: function(button) {
            var $button = $(button);
            var $form = $button.closest('.UserForm');
            var $selector = $form.find('.staff-icons-selector');
            var $icon = $button.find('.md-icon');
            
            $selector.slideToggle(200, function() {
                if ($selector.is(':visible')) {
                    $icon.text('expand_more');
                } else {
                    $icon.text('chevron_right');
                }
            });
        },
        
        // Populate icon selector with chips
        populateIconSelector: function($container) {
            $container.empty();
            
            if (StaffSettings && StaffSettings.dataStaffTypes) {
                $.each(StaffSettings.dataStaffTypes, function(typeId, typeData) {
                    var $chip = $('<div class="md-chip" data-staff-type="' + typeId + '">' +
                        '<div class="md-chip-icon">' +
                        '<img src="' + typeData.image_url + '" alt="' + typeData.title + '" />' +
                        '</div>' +
                        '<div class="md-chip-content">' + typeData.title + '</div>' +
                        '<div class="md-chip-selector">' +
                        '<input type="checkbox" class="staff-type-checkbox" id="staff-type-' + typeId + '-' + staffFunctions.generateUniqueId() + '" />' +
                        '</div>' +
                        '</div>');
                    
                    $container.append($chip);
                });
            }
        },
        
        // Generate unique ID
        generateUniqueId: function() {
            return Math.random().toString(36).substring(2, 9);
        },
        
        // Collect all settings data from forms
        collectSettingsData: function() {
            var result = {};
            result.dataUser = {};
            result.dataStaffTypes = {};
            
            result.show_username_color = $('#StaffShowUsernameColor').prop('checked');
            result.animation_enabled = $('#StaffAnimationEnabled').prop('checked');
            
            result.display_settings = {
                profile_page: $('#StaffDisplayProfilePage').prop('checked'),
                message_wall: $('#StaffDisplayMessageWall').prop('checked'),
                contributions: $('#StaffDisplayContributions').prop('checked'),
                user_activity: $('#StaffDisplayUserActivity').prop('checked'),
                recent_changes: $('#StaffDisplayRecentChanges').prop('checked'),
                blog_listing: $('#StaffDisplayBlogListing').prop('checked'),
                circle_avatar: $('#StaffDisplayCircleAvatar').prop('checked'),
                top_contributors: $('#StaffDisplayTopContributors').prop('checked'),
                discussion_posts: $('#StaffDisplayDiscussionPosts').prop('checked'),
                wiki_activity: $('#StaffDisplayWikiActivity').prop('checked')
            };
            
            result.icon_sizes = {};
            
            var profileSize = $('#StaffIconSizeProfilePage').val();
            if (profileSize && parseInt(profileSize) > 0) result.icon_sizes.profile_page = parseInt(profileSize);
            
            var messageWallSize = $('#StaffIconSizeMessageWall').val();
            if (messageWallSize && parseInt(messageWallSize) > 0) result.icon_sizes.message_wall = parseInt(messageWallSize);
            
            var contributionsSize = $('#StaffIconSizeContributions').val();
            if (contributionsSize && parseInt(contributionsSize) > 0) result.icon_sizes.contributions = parseInt(contributionsSize);
            
            var userActivitySize = $('#StaffIconSizeUserActivity').val();
            if (userActivitySize && parseInt(userActivitySize) > 0) result.icon_sizes.user_activity = parseInt(userActivitySize);
            
            var recentChangesSize = $('#StaffIconSizeRecentChanges').val();
            if (recentChangesSize && parseInt(recentChangesSize) > 0) result.icon_sizes.recent_changes = parseInt(recentChangesSize);
            
            var blogListingSize = $('#StaffIconSizeBlogListing').val();
            if (blogListingSize && parseInt(blogListingSize) > 0) result.icon_sizes.blog_listing = parseInt(blogListingSize);
            
            var circleAvatarSize = $('#StaffIconSizeCircleAvatar').val();
            if (circleAvatarSize && parseInt(circleAvatarSize) > 0) result.icon_sizes.circle_avatar = parseInt(circleAvatarSize);
            
            var topContributorsSize = $('#StaffIconSizeTopContributors').val();
            if (topContributorsSize && parseInt(topContributorsSize) > 0) result.icon_sizes.top_contributors = parseInt(topContributorsSize);
            
            var discussionPostsSize = $('#StaffIconSizeDiscussionPosts').val();
            if (discussionPostsSize && parseInt(discussionPostsSize) > 0) result.icon_sizes.discussion_posts = parseInt(discussionPostsSize);
            
            var wikiActivitySize = $('#StaffIconSizeWikiActivity').val();
            if (wikiActivitySize && parseInt(wikiActivitySize) > 0) result.icon_sizes.wiki_activity = parseInt(wikiActivitySize);
            
            result.icon_spacing = parseInt($('#StaffIconSpacing').val()) || 4;
            
            $('.UserForm').each(function() {
                var username = $(this).find('.StaffUserName').val();
                if (!username) return;
                
                var staffTypes = [];
                var badgeTooltip = $(this).find('.StaffUserBadgeTooltip').val();
                var badgeTitle = $(this).find('.StaffUserBadgeTitle').val();
                
                $(this).find('.staff-type-checkbox:checked').each(function() {
                    var staffType = $(this).closest('.md-chip').attr('data-staff-type');
                    if (staffType) {
                        staffTypes.push(staffType);
                    }
                });
                            
                if ((badgeTooltip && badgeTooltip.trim() !== '') || (badgeTitle && badgeTitle.trim() !== '')) {
                    result.dataUser[username] = {
                        types: staffTypes
                    };
                    if (badgeTitle && badgeTitle.trim() !== '') {
                        result.dataUser[username].badge_title = badgeTitle;
                    }
                    if (badgeTooltip && badgeTooltip.trim() !== '') {
                        result.dataUser[username].badge_tooltip = badgeTooltip;
                    }
                } else {
                    result.dataUser[username] = staffTypes;
                }
            });
                    
            $('.StaffTypeForm').each(function() {
                var typeId = $(this).find('.StaffListId').val().toLowerCase().replace(/\s+/g, '');
                if (!typeId) return;
                
                var imageUrl = $(this).find('.StaffListImageUrl').val();
                if (!staffFunctions.urlMatcher(imageUrl)) return;
                
                var color = $(this).find('.StaffListColor').val();
                var iconSize = $(this).find('.StaffListIconSize').val();
                
                var staffTypeData = {
                    title: $(this).find('.StaffListTitle').val(),
                    description: $(this).find('.StaffListDescription').val(),
                    image_url: imageUrl
                };
                
                if (color && color !== '' && color !== '#') {
                    var rgb = staffFunctions.hexToRgb(color);
                    var shadowColor = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.3)';
                    var filterColor = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.7)';
                    
                    staffTypeData.color = color;
                    staffTypeData.text_shadow = '0 0 3px ' + shadowColor;
                    staffTypeData.filter = 'drop-shadow(0 0 2px ' + filterColor + ')';
                }
                
                if (iconSize && parseInt(iconSize) > 0) {
                    staffTypeData.icon_size = parseInt(iconSize);
                }
                
                result.dataStaffTypes[typeId] = staffTypeData;
            });
            
            return result;
        },
        
        // Save settings via MediaWiki API
        saveSettingFunction: function(staffSettings) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'edit',
                    title: 'Fisch_Wiki:Staff',
                    summary: 'Staff Settings update',
                    text: staffSettings,
                    contentmodel: 'json',
                    bot: 1,
                    token: mw.user.tokens.get('csrfToken'),
                    format: 'json'
                },
                success: function(d) {
                    if (d.error && d.error.info) {
                        staffFunctions.showNotification(d.error.info, 'error');
                    } else if (d.edit && d.edit.result == 'Success') {
                        staffFunctions.showNotification('Settings saved successfully! Refreshing...', 'success');
                        setTimeout(function() {
                            staffFunctions.quickPurge();
                        }, 1500);
                    }
                },
                error: function(error) {
                    staffFunctions.showNotification('Error saving settings: ' + (error.statusText || 'Unknown error'), 'error');
                }
            });
        },
        
        // HEX to RGB converter
        hexToRgb: function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        },
        
        // Initialize drag & drop for reordering
        initDragAndDrop: function() {
            var draggedElement = null;
            var $placeholder = null;
            
            var createPlaceholder = function($elem) {
                return $('<div class="drag-placeholder"></div>').css({
                    'height': $elem.outerHeight() + 'px',
                    'border': '2px dashed rgba(var(--theme-link-color--rgb, 58, 109, 160), 0.5)',
                    'border-radius': '12px',
                    'background': 'rgba(var(--theme-link-color--rgb, 58, 109, 160), 0.1)',
                    'margin': '8px 0'
                });
            };
            
            var setupDragDrop = function(selector, container) {
                $(document).on('dragstart', selector, function(e) {
                    // Prevent drag if element is expanded
                    if ($(this).hasClass('StaffTypeForm')) {
                        var $editor = $(this).find('.staff-type-editor');
                        if ($editor.is(':visible')) {
                            e.preventDefault();
                            return false;
                        }
                    }
                    if ($(this).hasClass('UserForm')) {
                        var $selector = $(this).find('.staff-icons-selector');
                        if ($selector.is(':visible')) {
                            e.preventDefault();
                            return false;
                        }
                    }
                    
                    draggedElement = this;
                    $(this).addClass('dragging');
                    $placeholder = createPlaceholder($(this));
                    
                    e.originalEvent.dataTransfer.effectAllowed = 'move';
                    e.originalEvent.dataTransfer.setData('text/plain', '');
                });
                
                $(document).on('dragend', selector, function(e) {
                    $(this).removeClass('dragging');
                    if ($placeholder) {
                        $placeholder.remove();
                        $placeholder = null;
                    }
                    draggedElement = null;
                });
                
                $(document).on('dragover', selector, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (!draggedElement || this === draggedElement) return;
                    
                    var $this = $(this);
                    var $draggedElem = $(draggedElement);
                    
                    var rect = this.getBoundingClientRect();
                    var midpoint = rect.top + rect.height / 2;
                    
                    if (e.clientY < midpoint) {
                        $this.before($draggedElem);
                    } else {
                        $this.after($draggedElem);
                    }
                });
                
                $(document).on('drop', selector, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });
                
                $(document).on('mouseenter', selector, function() {
                    if (!$(this).attr('draggable')) {
                        $(this).attr('draggable', 'true');
                    }
                });
            };
            
            setupDragDrop('.StaffTypeForm', '.StaffList');
            setupDragDrop('.UserForm', '.StaffUser');
        },
        
        // Show notification message
        showNotification: function(message, type) {
            var $notification = $('.staff-notification');
            if ($notification.length === 0) {
                $notification = $('<div class="staff-notification"></div>');
                $('#staff-settings-container').prepend($notification);
            }
            
            $notification.attr('class', 'staff-notification md-notification md-notification-' + type)
                .html(message)
                .fadeIn();
            
            setTimeout(function() {
                $notification.fadeOut();
            }, 5000);
        },
        
        // Show tooltip on icon hover
        showTooltip: function(element) {
            if (!element || !$(element).is(':visible')) return;
            
            var $icon = $(element);
            var title = $icon.data('staff-title') || '';
            var description = $icon.data('staff-description') || '';
            
            if (!title && !description) return;
            
            var offset = $icon.offset();
            var left = offset.left + ($icon.width() / 2) - 80;
            var top = offset.top + $icon.height() + 5;
            
            $('body').append(
                '<div class="staff-tooltip md-tooltip" style="left:' + left + 'px; top:' + top + 'px;">' +
                    '<div class="md-tooltip-arrow"></div>' +
                    '<div class="md-tooltip-content">' +
                        (title ? '<div class="md-tooltip-title">' + title + '</div>' : '') +
                        (description ? '<div class="md-tooltip-body">' + description + '</div>' : '') +
                    '</div>' +
                '</div>'
            );
        },
        
        // Hide tooltip
        hideTooltip: function() {
            $('.staff-tooltip').remove();
        },
        
        // Apply dynamic staff styles to page
        applyStaffStyles: function() {
            if (typeof StaffSettings === 'undefined') {
                return;
            }
            
            $('#staff-dynamic-styles').remove();
            
            var iconSpacing = StaffSettings.icon_spacing || 4;
            var iconSizes = StaffSettings.icon_sizes || {};
            
            var styleRules = '.staff-icon { display: inline-block; vertical-align: middle; margin-left: ' + iconSpacing + 'px; width: 24px; height: 24px; background-size: contain; background-repeat: no-repeat; background-position: center; cursor: help; }';
            
            styleRules += '.staff-username { gap: ' + iconSpacing + 'px !important; }';
            
            $.each(StaffSettings.dataStaffTypes, function(typeId, staffData) {
                if (StaffSettings.show_username_color && staffData.color && staffData.color !== '' && staffData.color !== '#') {
                    styleRules += '.staff-username[data-staff-type="' + typeId + '"] {';
                    styleRules += '  color: ' + staffData.color + ' !important;';
                    styleRules += '  font-weight: bold !important;';
                    styleRules += '}';
                    
                    if (staffData.text_shadow) {
                        styleRules += '.staff-username[data-staff-type="' + typeId + '"]:not(.staff-icon) {';
                        styleRules += '  text-shadow: ' + staffData.text_shadow + ' !important;';
                        styleRules += '}';
                    }
                    
                    styleRules += '.staff-username[data-staff-type="' + typeId + '"] .staff-icon {';
                    styleRules += '  text-shadow: none !important;';
                    styleRules += '  color: transparent !important;';
                    styleRules += '}';
                }
                
                styleRules += '.staff-icon[data-staff-type="' + typeId + '"] {';
                styleRules += '  background-image: url("' + staffData.image_url + '") !important;';
                
                // Individual icon size (HIGHER PRIORITY - overrides global)
                if (staffData.icon_size) {
                    styleRules += '  width: ' + staffData.icon_size + 'px !important;';
                    styleRules += '  height: ' + staffData.icon_size + 'px !important;';
                }
                
                styleRules += '}';
            });
            
            styleRules += '.staff-icon { background-color: transparent !important; border: none !important; }';
            styleRules += '.wds-avatar .staff-icon { display: none !important; }';
            
            // Global icon sizes per location (AFTER individual sizes for lower priority)
            if (iconSizes.profile_page) {
                styleRules += 'h1[itemprop="name"] .staff-icon { width: ' + iconSizes.profile_page + 'px; height: ' + iconSizes.profile_page + 'px; }';
            }
            if (iconSizes.message_wall) {
                styleRules += 'a[class^="EntityHeader_name"] .staff-icon { width: ' + iconSizes.message_wall + 'px; height: ' + iconSizes.message_wall + 'px; }';
            }
            if (iconSizes.contributions) {
                styleRules += '.mw-contributions-user-tools .staff-icon { width: ' + iconSizes.contributions + 'px; height: ' + iconSizes.contributions + 'px; }';
            }
            if (iconSizes.user_activity) {
                styleRules += '.user-profile-activity .staff-icon { width: ' + iconSizes.user_activity + 'px; height: ' + iconSizes.user_activity + 'px; }';
            }
            if (iconSizes.recent_changes) {
                styleRules += '.mw-userlink .staff-icon, .mw-changeslist .staff-icon, .mw-logevent-loglines .staff-icon { width: ' + iconSizes.recent_changes + 'px; height: ' + iconSizes.recent_changes + 'px; }';
            }
            if (iconSizes.blog_listing) {
                styleRules += '.blog-listing__user-name .staff-icon { width: ' + iconSizes.blog_listing + 'px; height: ' + iconSizes.blog_listing + 'px; }';
            }
            if (iconSizes.circle_avatar) {
                styleRules += '.circle-avatar-link .staff-icon { width: ' + iconSizes.circle_avatar + 'px; height: ' + iconSizes.circle_avatar + 'px; }';
            }
            if (iconSizes.top_contributors) {
                styleRules += '.contributor .name .staff-icon, .weekly-leaderboard .staff-icon { width: ' + iconSizes.top_contributors + 'px; height: ' + iconSizes.top_contributors + 'px; }';
            }
            if (iconSizes.discussion_posts) {
                styleRules += '.nkch-rdp-item__author-link .staff-icon { width: ' + iconSizes.discussion_posts + 'px; height: ' + iconSizes.discussion_posts + 'px; }';
            }
            if (iconSizes.wiki_activity) {
                styleRules += '.recent-wiki-activity__username .staff-icon, .edit-info-user .staff-icon { width: ' + iconSizes.wiki_activity + 'px; height: ' + iconSizes.wiki_activity + 'px; }';
            }
            
            $('<style id="staff-dynamic-styles">' + styleRules + '</style>').appendTo('head');
        },
        
        // Create staff icon element
        addStaffIcon: function(username, staffType, customTitle, customTooltip) {
            if (!StaffSettings || !StaffSettings.dataStaffTypes || !StaffSettings.dataStaffTypes[staffType]) {
                return null;
            }
            
            var staffData = StaffSettings.dataStaffTypes[staffType];
            
            var tooltipTitle = customTitle || staffData.title;
            var tooltipDesc = customTooltip || staffData.description;
            
            var $icon = $('<span class="staff-icon"></span>')
                .attr('data-staff-type', staffType)
                .attr('data-staff-title', tooltipTitle)
                .attr('data-staff-description', tooltipDesc)
                .attr('data-username', username)
                .hover(function() {
                    staffFunctions.showTooltip(this);
                }, function() {
                    staffFunctions.hideTooltip();
                });
                
            return $icon;
        },
        
        // Main function to add icons to user links
        attributeUserLinks: function() {
            if (typeof StaffSettings === 'undefined') {
                console.warn('[Staff System] StaffSettings not defined');
                return;
            }
            
            var self = this;
            var displaySettings = StaffSettings.display_settings || {};
            
            $.each(StaffSettings.dataUser, function(username, userData) {
                var staffTypes = Array.isArray(userData) ? userData : (userData.types || []);
                var badgeTooltip = !Array.isArray(userData) ? userData.badge_tooltip : null;
                var badgeTitle = !Array.isArray(userData) ? userData.badge_title : null;
                
                if (!staffTypes || !staffTypes.length) return;
                
                var primaryStaffType = staffTypes[0];
                
                // STEP 1: Profile page h1
                if (displaySettings.profile_page !== false) {
                    $('h1[itemprop="name"]').each(function() {
                        var $header = $(this);
                        if ($header.text().trim() === username && !$header.hasClass('staff-username')) {
                            $header.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $header.append(icon);
                            });
                        }
                    });
                }
                
                // STEP 2: Message Wall
                if (displaySettings.message_wall !== false) {
                    $('a[class^="EntityHeader_name"]:not(.staff-username)').each(function() {
                        var $link = $(this);
                        var href = $link.attr('href');
                        var text = $link.text().trim();
                        if (href === '/wiki/User:' + username || text === username) {
                            $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $link.append(icon);
                            });
                        }
                    });
                }
                
                // STEP 3: Blog Listing
                if (displaySettings.blog_listing !== false) {
                    $('.blog-listing__user-name').each(function() {
                        var $link = $(this);
                        if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && !$link.hasClass('staff-username')) {
                            $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $link.append(icon);
                            });
                        }
                    });
                }
                
                // STEP 4: Recent Changes, History, Logs
                if (displaySettings.recent_changes !== false) {
                    $('.mw-userlink').each(function() {
                        var $link = $(this);
                        var linkText = $link.find('bdi').length > 0 ? $link.find('bdi').text() : $link.text().trim();
                        if (($link.attr('href') === '/wiki/User:' + username || linkText === username) && !$link.hasClass('staff-username')) {
                            $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $link.append(icon);
                            });
                        }
                    });
                }
                
                // STEP 5: CircleAvatar
                if (displaySettings.circle_avatar !== false) {
                    $('a.circle-avatar-link').each(function() {
                        var $link = $(this);
                        var dataUsername = $link.attr('data-username');
                        if (dataUsername === username || dataUsername === '@' + username) {
                            var $nameSpan = $link.find('span').last();
                            if ($nameSpan.length > 0 && !$nameSpan.hasClass('staff-username')) {
                                $nameSpan.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                                staffTypes.forEach(function(staffType) {
                                    var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                    if (icon) $nameSpan.append(icon);
                                });
                            }
                        }
                    });
                }
                
                // STEP 6: Top Contributors
                if (displaySettings.top_contributors !== false) {
                    $('.contributor .name a, .weekly-leaderboard .name a').each(function() {
                        var $link = $(this);
                        if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && !$link.hasClass('staff-username')) {
                            $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $link.append(icon);
                            });
                        }
                    });
                }
                
                // STEP 7: Discussion posts
                if (displaySettings.discussion_posts !== false) {
                    $('a.nkch-rdp-item__author-link').each(function() {
                        var $link = $(this);
                        if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && !$link.hasClass('staff-username')) {
                            $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $link.append(icon);
                            });
                        }
                    });
                }
                
                // STEP 8: Recent Wiki Activity
                if (displaySettings.wiki_activity !== false) {
                    $('.recent-wiki-activity__username, .edit-info-user').each(function() {
                        var $link = $(this);
                        if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && !$link.hasClass('staff-username')) {
                            $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                            staffTypes.forEach(function(staffType) {
                                var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                if (icon) $link.append(icon);
                            });
                        }
                    });
                }
            });
            
            // Start observer for dynamic content
            if (displaySettings.message_wall !== false || displaySettings.circle_avatar !== false || displaySettings.top_contributors !== false || displaySettings.wiki_activity !== false) {
                this.startDynamicContentObserver();
            }
        },
        
        // Mutation Observer for dynamically loaded content
        startDynamicContentObserver: function() {
            var self = this;
            var processingTimeout;
            var isProcessing = false;
            
            var processDynamicElements = function() {
                if (typeof StaffSettings === 'undefined' || isProcessing) return;
                isProcessing = true;
                
                var displaySettings = StaffSettings.display_settings || {};
                
                $.each(StaffSettings.dataUser, function(username, userData) {
                    var staffTypes = Array.isArray(userData) ? userData : (userData.types || []);
                    var badgeTooltip = !Array.isArray(userData) ? userData.badge_tooltip : null;
                    var badgeTitle = !Array.isArray(userData) ? userData.badge_title : null;
                    
                    if (!staffTypes || !staffTypes.length) return;
                    var primaryStaffType = staffTypes[0];
                    
                    if (displaySettings.message_wall !== false) {
                        $('a[class^="EntityHeader_name"]:not(.staff-username)').each(function() {
                            var $link = $(this);
                            if ($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) {
                                $link.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                                staffTypes.forEach(function(staffType) {
                                    var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                    if (icon) $link.append(icon);
                                });
                            }
                        });
                    }
                    
                    if (displaySettings.circle_avatar !== false) {
                        $('a.circle-avatar-link:not([data-staff-processed])').each(function() {
                            var $link = $(this);
                            var dataUsername = $link.attr('data-username');
                            if (dataUsername === username || dataUsername === '@' + username) {
                                var $nameSpan = $link.find('span').last();
                                if ($nameSpan.length > 0 && !$nameSpan.hasClass('staff-username') && $nameSpan.find('.staff-icon').length === 0) {
                                    $nameSpan.addClass('staff-username').attr('data-staff-type', primaryStaffType);
                                    staffTypes.forEach(function(staffType) {
                                        var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                        if (icon) $nameSpan.append(icon);
                                    });
                                    $link.attr('data-staff-processed', 'true');
                                }
                            }
                        });
                    }
                    
                    if (displaySettings.top_contributors !== false) {
                        $('.contributor .name a:not(.staff-username):not([data-staff-processed]), .weekly-leaderboard .name a:not(.staff-username):not([data-staff-processed])').each(function() {
                            var $link = $(this);
                            if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && $link.find('.staff-icon').length === 0) {
                                $link.addClass('staff-username').attr('data-staff-type', primaryStaffType).attr('data-staff-processed', 'true');
                                staffTypes.forEach(function(staffType) {
                                    var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                    if (icon) $link.append(icon);
                                });
                            }
                        });
                    }
                    
                    if (displaySettings.discussion_posts !== false) {
                        $('a.nkch-rdp-item__author-link:not(.staff-username):not([data-staff-processed])').each(function() {
                            var $link = $(this);
                            if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && $link.find('.staff-icon').length === 0) {
                                $link.addClass('staff-username').attr('data-staff-type', primaryStaffType).attr('data-staff-processed', 'true');
                                staffTypes.forEach(function(staffType) {
                                    var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                    if (icon) $link.append(icon);
                                });
                            }
                        });
                    }
                    
                    if (displaySettings.wiki_activity !== false) {
                        $('.recent-wiki-activity__username:not(.staff-username):not([data-staff-processed]), .edit-info-user:not(.staff-username):not([data-staff-processed])').each(function() {
                            var $link = $(this);
                            if (($link.attr('href') === '/wiki/User:' + username || $link.text().trim() === username) && $link.find('.staff-icon').length === 0) {
                                $link.addClass('staff-username').attr('data-staff-type', primaryStaffType).attr('data-staff-processed', 'true');
                                staffTypes.forEach(function(staffType) {
                                    var icon = self.addStaffIcon(username, staffType, badgeTitle, badgeTooltip);
                                    if (icon) $link.append(icon);
                                });
                            }
                        });
                    }
                });
                
                isProcessing = false;
            };
            
            var debouncedProcess = function() {
                clearTimeout(processingTimeout);
                processingTimeout = setTimeout(processDynamicElements, 150);
            };
            
            setTimeout(processDynamicElements, 800);
            setTimeout(processDynamicElements, 2000);
            setTimeout(processDynamicElements, 4000);
            
            var observer = new MutationObserver(function(mutations) {
                var shouldProcess = false;
                for (var i = 0; i < mutations.length; i++) {
                    var mutation = mutations[i];
                    if (mutation.addedNodes.length > 0) {
                        for (var j = 0; j < mutation.addedNodes.length; j++) {
                            var node = mutation.addedNodes[j];
                            if (node.nodeType === 1 && !node.classList.contains('staff-icon') && !node.classList.contains('staff-username')) {
                                shouldProcess = true;
                                break;
                            }
                        }
                    }
                    if (shouldProcess) break;
                }
                
                if (shouldProcess && !isProcessing) {
                    debouncedProcess();
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        },
        
        _contentHookTimer: null,
        
        // Build and display staff settings UI (SYSOP ONLY)
        staffSettingsFunction: function() {
            var currentPage = mw.config.get('wgPageName');
            var namespace = mw.config.get('wgNamespaceNumber');
            var wgTitle = mw.config.get('wgTitle');
            
            console.log('[Staff System] staffSettingsFunction called');
            console.log('[Staff System] Current page:', currentPage, 'Namespace:', namespace, 'Title:', wgTitle);
            
            // Проверяем что мы на правильной странице
            if (namespace !== 4 || wgTitle !== 'Staff') {
                console.log('[Staff System] Not on Staff page, skipping');
                return;
            }
            
            var group_list = mw.config.get('wgUserGroups');
            var isSysop = group_list.indexOf('sysop') !== -1;
            var hasAnyAccess = isSysop || 
                              group_list.indexOf('content-moderator') !== -1 ||
                              group_list.indexOf('staff') !== -1 ||
                              group_list.indexOf('soap') !== -1;
            
            console.log('[Staff System] User groups:', group_list, 'Has access:', hasAnyAccess);
            
            if (!hasAnyAccess) {
                console.log('[Staff System] User has no access rights');
                return;
            }
            
            console.log('[Staff System] StaffSettings:', typeof StaffSettings, StaffSettings);
            
            // Проверяем что настройки существуют
            if (typeof StaffSettings === "undefined" || !StaffSettings || !StaffSettings.dataStaffTypes) {
                console.warn('[Staff System] Settings invalid, showing default settings button');
                staffFunctions.staffDefaultSettings();
                return;
            }
            
            console.log('[Staff System] Settings valid, showing Manage button');
            
            // Показываем кнопку управления
            $('#mw-content-text').prepend('<div class="staff-manage-panel md-panel">' +
                '<div class="md-panel-content">' +
                '<button id="StaffSettings" class="md-button md-button-raised md-button-primary">Manage Staff Icons</button>' +
                (isSysop ? '' : '<span style="margin-left: 12px; color: var(--theme-page-text-color--hover);">👁️ View Only (Sysop required for editing)</span>') +
                '</div></div>');
        
            var staffModalForm = $('<div id="staff-settings-container" class="md-container">');
            
            staffModalForm.append('<div class="staff-notification" style="display:none;"></div>');
            
            staffModalForm.append(
                '<div class="staff-settings-tabs md-tabs">' +
                    '<div class="staff-settings-tab active" data-tab="StaffMainDialog" onclick="staffFunctions.switchSettings(\'StaffMainDialog\')">General</div>' +
                    '<div class="staff-settings-tab" data-tab="StaffUserDialog" onclick="staffFunctions.switchSettings(\'StaffUserDialog\')">Users</div>' +
                    '<div class="staff-settings-tab" data-tab="StaffTypesDialog" onclick="staffFunctions.switchSettings(\'StaffTypesDialog\')">Icon Types</div>' +
                '</div>'
            );
            
            var displaySettings = StaffSettings.display_settings || {};
            var iconSizes = StaffSettings.icon_sizes || {};
            var iconSpacing = StaffSettings.icon_spacing || 4;
            
            staffModalForm.append(
                '<div class="StaffMainDialog StaffSetMenu">' +
                    '<div class="staff-scrollable-container">' +
                    '<div class="md-card">' +
                        '<div class="md-card-header">' +
                            '<div class="md-card-title">General Settings</div>' +
                        '</div>' +
                        '<div class="md-card-content">' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffShowUsernameColor" ' + (StaffSettings.show_username_color ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Colorize usernames</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffAnimationEnabled" ' + (StaffSettings.animation_enabled ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Enable animations</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Icon spacing (gap between username and icon, px)</label>' +
                                '<input type="number" id="StaffIconSpacing" class="md-input" min="0" max="20" value="' + iconSpacing + '"/>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="md-card">' +
                        '<div class="md-card-header">' +
                            '<div class="md-card-title">Display Locations</div>' +
                        '</div>' +
                        '<div class="md-card-content">' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayProfilePage" ' + (displaySettings.profile_page !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Profile Page (h1)</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayMessageWall" ' + (displaySettings.message_wall !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Message Wall</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayContributions" ' + (displaySettings.contributions !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Contributions Page</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayUserActivity" ' + (displaySettings.user_activity !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">User Activity Page</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayRecentChanges" ' + (displaySettings.recent_changes !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Recent Changes (.mw-userlink)</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayBlogListing" ' + (displaySettings.blog_listing !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Blog Listing (blog-listing__user-name)</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayCircleAvatar" ' + (displaySettings.circle_avatar !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">CircleAvatar (Meet Our Team)</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayTopContributors" ' + (displaySettings.top_contributors !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Top Contributors Widget</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayDiscussionPosts" ' + (displaySettings.discussion_posts !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Discussion Posts (nkch-rdp-item)</span>' +
                                '</label>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-switch">' +
                                    '<input type="checkbox" id="StaffDisplayWikiActivity" ' + (displaySettings.wiki_activity !== false ? 'checked' : '') + '>' +
                                    '<span class="md-switch-slider"></span>' +
                                    '<span class="md-switch-label">Wiki Activity (recent-wiki-activity)</span>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="md-card">' +
                        '<div class="md-card-header">' +
                            '<div class="md-card-title">Global Icon Sizes (leave empty to use icon\'s individual size)</div>' +
                        '</div>' +
                        '<div class="md-card-content">' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Profile Page (px)</label>' +
                                '<input type="number" id="StaffIconSizeProfilePage" class="md-input" min="8" max="48" value="' + (iconSizes.profile_page || '') + '" placeholder="Optimal: 24"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Message Wall (px)</label>' +
                                '<input type="number" id="StaffIconSizeMessageWall" class="md-input" min="8" max="48" value="' + (iconSizes.message_wall || '') + '" placeholder="Optimal: 20"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Contributions Page (px)</label>' +
                                '<input type="number" id="StaffIconSizeContributions" class="md-input" min="8" max="48" value="' + (iconSizes.contributions || '') + '" placeholder="Optimal: 18"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">User Activity Page (px)</label>' +
                                '<input type="number" id="StaffIconSizeUserActivity" class="md-input" min="8" max="48" value="' + (iconSizes.user_activity || '') + '" placeholder="Optimal: 18"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Recent Changes (px)</label>' +
                                '<input type="number" id="StaffIconSizeRecentChanges" class="md-input" min="8" max="48" value="' + (iconSizes.recent_changes || '') + '" placeholder="Optimal: 16"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Blog Listing (px)</label>' +
                                '<input type="number" id="StaffIconSizeBlogListing" class="md-input" min="8" max="48" value="' + (iconSizes.blog_listing || '') + '" placeholder="Optimal: 18"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">CircleAvatar / Meet Our Team (px)</label>' +
                                '<input type="number" id="StaffIconSizeCircleAvatar" class="md-input" min="8" max="48" value="' + (iconSizes.circle_avatar || '') + '" placeholder="Optimal: 20"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Top Contributors Widget (px)</label>' +
                                '<input type="number" id="StaffIconSizeTopContributors" class="md-input" min="8" max="48" value="' + (iconSizes.top_contributors || '') + '" placeholder="Optimal: 18"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Discussion Posts (px)</label>' +
                                '<input type="number" id="StaffIconSizeDiscussionPosts" class="md-input" min="8" max="48" value="' + (iconSizes.discussion_posts || '') + '" placeholder="Optimal: 18"/>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Wiki Activity (px)</label>' +
                                '<input type="number" id="StaffIconSizeWikiActivity" class="md-input" min="8" max="48" value="' + (iconSizes.wiki_activity || '') + '" placeholder="Optimal: 16"/>' +
                            '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
            
            staffModalForm.append(
                '<div class="StaffUserDialog StaffSetMenu" style="display:none;">' +
                    '<div class="md-card">' +
                        '<div class="md-card-header">' +
                            '<div class="md-card-title">Manage Users</div>' +
                            '<div class="md-card-actions">' +
                                '<button onclick="staffFunctions.addUserForm()" class="md-button md-button-raised md-button-primary" title="Add User">' +
                                    '<span class="md-icon">person_add</span>' +
                                    '<span>Add User</span>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="StaffUser staff-scrollable-container"></div>' +
                '</div>'
            );
            
            staffModalForm.append(
                '<div class="StaffTypesDialog StaffSetMenu" style="display:none;">' +
                    '<div class="md-card">' +
                        '<div class="md-card-header">' +
                            '<div class="md-card-title">Manage Icon Types</div>' +
                            '<div class="md-card-actions">' +
                                '<button onclick="staffFunctions.addStaffTypeForm()" class="md-button md-button-raised md-button-primary" title="Add Icon Type">' +
                                    '<span class="md-icon">add</span>' +
                                    '<span>Add Icon Type</span>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="StaffList staff-scrollable-container"></div>' +
                '</div>'
            );
    
            $.each(StaffSettings.dataStaffTypes, function(typeId, staffData) {
                var $staffType = $(
                    '<div class="StaffTypeForm md-card">' +
                        '<div class="md-card-header staff-type-header">' +
                            '<div class="StaffImagePreview" style="border-color:' + (staffData.color || '#ccc') + ';">' +
                                '<img class="staff-icon-image" height="32" src="' + staffData.image_url + '" alt="' + staffData.title + '" title="' + staffData.title + '"/>' +
                            '</div>' +
                            '<div class="md-card-title">' +
                                '<span>' + staffData.title + '</span>' +
                            '</div>' +
                            '<div class="md-card-actions">' +
                                '<button class="md-button md-button-icon md-button-delete" onclick="event.stopPropagation(); staffFunctions.deleteStaffType($(this).closest(\'.StaffTypeForm\'))" title="Remove">' +
                                    '<span class="md-icon">close</span>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="staff-type-editor" style="display:none;">' +
                            '<div class="md-card-content">' +
                                '<div class="md-input-group">' +
                                    '<label class="md-input-label">Staff icon ID</label>' +
                                    '<input class="StaffListId md-input" value="' + typeId + '" data-prev="' + typeId + '"/>' +
                                '</div>' +
                                '<div class="md-input-group">' + 
                                    '<label class="md-input-label">Display title</label>' +
                                    '<input class="StaffListTitle md-input" value="' + staffData.title + '"/>' +
                                '</div>' +
                                '<div class="md-input-group">' +
                                    '<label class="md-input-label">Tooltip description (shown on hover)</label>' +
                                    '<input class="StaffListDescription md-input" value="' + staffData.description + '"/>' +
                                '</div>' +
                                '<div class="md-input-group">' +
                                    '<label class="md-input-label">Icon image URL</label>' +
                                    '<input class="StaffListImageUrl md-input" value="' + staffData.image_url + '"/>' +
                                '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Username color (hex) - optional</label>' +
                                '<div class="md-color-input-wrapper">' +
                                    '<input class="StaffListColor md-input md-color-input" value="' + (staffData.color || '') + '" pattern="^#([A-Fa-f0-9]{6})$" placeholder="Leave empty for no color"/>' +
                                    '<span class="md-color-preview" style="background-color:' + (staffData.color || '#ccc') + ';"></span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="md-input-group">' +
                                '<label class="md-input-label">Icon size (pixels) - optional</label>' +
                                '<input class="StaffListIconSize md-input" type="number" min="8" max="48" value="' + (staffData.icon_size || '') + '" placeholder="Default: 24"/>' +
                            '</div>' +
                        '</div>' +
                        '<div class="md-card-actions md-card-actions-right">' +
                            '<button class="md-button md-button-text" onclick="staffFunctions.previewStaffType($(this).closest(\'.StaffTypeForm\'))" title="Preview">Preview</button>' +
                            '<button class="md-button md-button-raised md-button-primary" onclick="staffFunctions.saveStaffType($(this).closest(\'.StaffTypeForm\'))" title="Save">Save</button>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
            
            staffModalForm.find('.StaffList').append($staffType);
            
            $staffType.find('.StaffListColor').on('input', function() {
                var color = $(this).val();
                if (color && color.match(/^#([A-Fa-f0-9]{6})$/)) {
                    $(this).closest('.md-color-input-wrapper').find('.md-color-preview').css('background-color', color);
                }
            });
        });
            
            staffModalForm.find('.StaffList').on('click', '.staff-type-header', function() {
                $(this).siblings('.staff-type-editor').slideToggle(200);
            });
            
            $.each(StaffSettings.dataUser, function(username, userData) {
                var staffTypes = Array.isArray(userData) ? userData : (userData.types || []);
                var badgeTooltip = !Array.isArray(userData) ? userData.badge_tooltip : '';
                var badgeTitle = !Array.isArray(userData) ? userData.badge_title : '';
                
                var uniqueId = staffFunctions.generateUniqueId();
                var $userForm = $(
                    '<div class="UserForm md-card">' +
                        '<div class="md-card-header">' +
                            '<div class="md-card-title">' +
                                '<input class="StaffUserName md-input" value="' + username + '"/>' +
                            '</div>' +
                            '<div class="md-card-action-buttons">' +
                                '<button class="md-button md-button-icon md-button-icon-red" onclick="$(this).closest(\'.UserForm\').remove()" title="Remove">' +
                                    '<span class="md-icon">close</span>' +
                                '</button>' +
                                '<button class="md-button md-button-icon md-button-icon-green user-icons-toggle" onclick="staffFunctions.toggleUserIcons(this)" title="Toggle Icons">' +
                                    '<span class="md-icon">chevron_right</span>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="staff-icons-selector" style="display:none;">' +
                            '<div class="md-card-content">' +
                                '<div class="md-input-row-two-column">' +
                                    '<div class="md-input-group">' +
                                        '<label class="md-input-label">Badge Title (optional - overrides icon title)</label>' +
                                        '<input class="StaffUserBadgeTitle md-input" value="' + (badgeTitle || '') + '" placeholder="Custom title for this user"/>' +
                                    '</div>' +
                                    '<div class="md-input-group">' +
                                        '<label class="md-input-label">Badge Tooltip (optional - overrides icon tooltip)</label>' +
                                        '<input class="StaffUserBadgeTooltip md-input" value="' + (badgeTooltip || '') + '" placeholder="Custom tooltip for this user\'s badges"/>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="md-chip-container" id="user-icon-container-' + uniqueId + '"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                );
                
                staffModalForm.find('.StaffUser').append($userForm);
                
                var $container = $userForm.find('.md-chip-container');
                staffFunctions.populateIconSelector($container);
                
                $.each(staffTypes, function(i, staffType) {
                    $container.find('.md-chip[data-staff-type="' + staffType + '"] .staff-type-checkbox').prop('checked', true);
                });
            });
            
            CustomColorPicker.init();
            
            staffModalForm.on('click', '.md-color-preview', function(e) {
                e.preventDefault();
                var $preview = $(this);
                var $input = $preview.siblings('.StaffListColor');
                var currentColor = $input.val() || '#FFFFFF';
                
                CustomColorPicker.show(this, currentColor, function(newColor) {
                    $input.val(newColor);
                    $preview.css('background-color', newColor);
                });
            });
            
            staffFunctions.initDragAndDrop();
            
            $('#StaffSettings').click(function() {
                var group_list = mw.config.get('wgUserGroups');
                var isSysop = group_list.indexOf('sysop') !== -1;
                
                if (!isSysop) {
                    var $accessDenied = $('<div class="md-notification md-notification-error" style="margin: 20px; padding: 16px; border-radius: 8px;">' +
                        '<strong>🚫 Access Denied</strong><br>' +
                        'Only users with <strong>Sysop (Administrator)</strong> rights can manage Staff Icons.<br>' +
                        'Current groups: ' + group_list.join(', ') +
                        '</div>');
                    
                    showCustomModal('Access Denied', $accessDenied, {
                        id: 'StaffAccessDenied',
                        width: 500,
                        buttons: [{
                            message: 'Close',
                            handler: function() {
                                $('#StaffAccessDenied').find('.close').click();
                            }
                        }]
                    });
                    return;
                }
                
                showCustomModal('Staff Icon Management', staffModalForm, {
                    id: 'StaffSettingsWindow',
                    width: 750,
                    buttons: [{
                        message: 'Save Changes',
                        defaultButton: true,
                        handler: function() {
                            var result = staffFunctions.collectSettingsData();
                            var stringified = JSON.stringify(result, null, 4);
                            staffFunctions.saveSettingFunction(stringified);
                        }
                    },{
                        message: 'Cancel',
                        handler: function() {
                            $('#StaffSettingsWindow').find('.close').click();
                        }
                    }]
                });
                
                setTimeout(function() {
                    var $modal = $('#StaffSettingsWindow');
                    var $blackout = $('.SCMBlackout');
                    
                    $blackout.css('z-index', '500');
                    
                    $modal.css({
                        'position': 'fixed',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'margin-left': '0',
                        'margin-top': '0',
                        'z-index': '600',
                        'max-height': '90vh'
                    });
                }, 100);
            });
        },
        
        // Initialize script
        init: function(modalScript) {
            showCustomModal = modalScript;
            
            $('head').append('<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">');
            
            $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    title: 'Fisch_Wiki:Staff',
                    action: 'raw',
                    cb: Math.ceil(new Date().getTime() / 1000),
                    dataType:'text'
                },
                success: function(data) {
                    console.log('[Staff System] AJAX success, data length:', data.length);
                    
                    try {
                        window.StaffSettings = JSON.parse(data);
                        console.log('[Staff System] Settings parsed successfully:', StaffSettings);
                    } catch(err) {
                        console.error('[Staff System] JSON parse error:', err);
                        var wgAction = mw.config.get('wgAction');
                        var isEditPage = (wgAction === 'edit' || wgAction === 'submit');
                        if (namespace === 4 && mw.config.get('wgTitle') === 'Staff' && !isEditPage) {
                            staffFunctions.staffDefaultSettings();
                        }
                        return;
                    }
                    
                    console.log('[Staff System] Namespace:', namespace, 'Title:', mw.config.get('wgTitle'));
                    
                    var wgAction = mw.config.get('wgAction');
                    var isEditPage = (wgAction === 'edit' || wgAction === 'submit');
                    
                    if (namespace === 4 && mw.config.get('wgTitle') === 'Staff' && !isEditPage) {
                        console.log('[Staff System] Calling staffSettingsFunction...');
                        staffFunctions.staffSettingsFunction();
                    } else {
                        console.log('[Staff System] Applying styles and icons...');
                        staffFunctions.applyStaffStyles();
                        staffFunctions.attributeUserLinks();
                    }
                },
                error: function(xhr, status, error) {
                    console.error('[Staff System] AJAX error:', status, error);
                    var wgAction = mw.config.get('wgAction');
                    var isEditPage = (wgAction === 'edit' || wgAction === 'submit');
                    if (namespace === 4 && mw.config.get('wgTitle') === 'Staff' && !isEditPage) {
                        staffFunctions.staffDefaultSettings();
                    }
                }
            });
        }
    };
    
    // Make staffFunctions globally accessible
    window.staffFunctions = staffFunctions;
    
    mw.hook('dev.showCustomModal').add(staffFunctions.init);
    
    var _staffInitialized = false;
    mw.loader.using(['jquery.cookie']).then(function() {
        $(document).ready(function() {
            if (_staffInitialized) return;
            _staffInitialized = true;
            
            setTimeout(function() {
                staffFunctions.attributeUserLinks();
            }, 1000);
            
            setTimeout(function() {
                staffFunctions.attributeUserLinks();
            }, 3000);
        });
    });
    
})(this.jQuery, this.mediaWiki);