/*
 * Mutations Gallery Upload System
 * A streamlined interface for managing mutation images in wiki galleries
 * Created by xGronox/Gronox/v.lad
 * Enhanced with optimizations and additional features
 * 
 * This script provides an intuitive system for uploading and managing mutation images
 * directly within wiki galleries. It integrates seamlessly with existing gallery templates
 * while providing a modern, user-friendly interface.
 *
 * Key features:
 * - Modern modal interface for image uploads
 * - Automatic gallery structure maintenance 
 * - Real-time upload status feedback
 * - Built-in queue system for multiple uploads
 * - Conflict prevention system
 * - Automatic error handling and recovery
 * - Duplicate image detection (SHA1 verification)
 * - Warning notification about checking existing images
 *
 * Technical highlights:
 * - Uses native MediaWiki API for all operations
 * - Follows ECMAScript 5 standards for maximum compatibility
 * - Implements Fandom's design patterns and color schemes
 * - Preserves gallery formatting and structure
 * - Handles concurrent uploads safely
 *
 * Integration:
 * - Works with MutationsCollapsible template
 * - Preserves existing gallery structure
 * - Maintains proper wiki formatting
 * - Prevents edit conflicts
 *
 * Dependencies:
 * - jQuery
 * - MediaWiki API
 * - mw.user tokens
 *
 * TEMPLATE: https://fisch.fandom.com/wiki/Template:MutationsCollapsible
 * CSS: https://fisch.fandom.com/wiki/MediaWiki:UploadMutationsImage.css
 * JS: https://fisch.fandom.com/wiki/MediaWiki:UploadMutationsImage.js
 */

// Module structure using IIFE
var MutationsGallery = (function() {
	// Private variables
	var isUploading = false;
	var uploadQueue = [];
	var batchQueue = []; // For batch processing
	var currentTheme = 'auto'; // 'auto', 'light', 'dark'
	var processQueue; // Reference to queue processing function
	var connectionSpeed = 0; // Network connection speed in Mbps
	var isLowBandwidth = false; // Flag for low bandwidth mode
	var isMobileDevice = false; // Flag for mobile device detection
	var hasTouch = false; // Flag for touch device detection
	var editMode = null; // Current edit mode (crop, rotate, null)
	
	// Worker for SHA1 calculations
	var sha1Worker = null;
	var workerCallbacks = {};
	
	// Error logging
	var errorLog = [];
	var uploadStats = {
		total: 0,
		success: 0,
		failed: 0,
		lastUpload: null
	};
	
	// DOM elements cache
	var domCache = {};
	
	// Module configuration
	var config = {
		workerPath: '/load.php?modules=mediawiki.template.mustache&only=scripts&raw=1&hash=sha1-worker.js',
		allowedExtensions: ['png', 'gif', 'jpg', 'jpeg'],
		maxMutationLength: 150,
		uploadDelay: 1000,
		maxImageSize: 5 * 1024 * 1024, // 5MB max file size
		maxMultipleUploads: 10, // Maximum number of simultaneous uploads
		compressionQuality: 0.8, // Image compression quality (0.0-1.0)
		enableCompression: true, // Enable compression for slow connections
		lowBandwidthThreshold: 1, // Mbps threshold for low bandwidth mode
		errorLogSize: 50, // Number of errors to keep in log
		hotkeys: {
			close: 'Escape',
			submit: 'ctrl+Enter',
			paste: 'ctrl+v',
			rotate: 'r',
			crop: 'c'
		},
		messages: {
			checkExisting: 'Before adding a photo - make sure it hasn\'t been added already!',
			selectMultiple: 'You can select multiple files to upload at once!',
			lowBandwidth: 'Low bandwidth mode enabled. Images will be compressed.'
		},
		mobile: {
			touchElementSize: 44, // Minimum touch target size in px
			smallScreen: 480, // Threshold for very small screens
			lowResImageSize: 800 // Max dimension for low-res preview
		}
	};

	// UI Module - manages interface
	var UI = {
		modal: null,
		$form: null,
		$status: null,
		$preview: null,
		$imageInput: null,
		$mutationsInput: null,
		$progressBar: null,
		$progressContainer: null,
		$charCount: null,
		$notification: null,
		
		init: function() {
			this.createModal();
			this.bindEvents();
			this.detectTheme();
		},
		
		// Theme detection
		detectTheme: function() {
			try {
				// Check for dark theme presence
				var isDarkTheme = (
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ||
					document.body.classList.contains('skin-fandomdark') ||
					document.documentElement.classList.contains('theme-dark') ||
					document.body.classList.contains('theme-dark')
				);
				
				// Set theme
				currentTheme = isDarkTheme ? 'dark' : 'light';
				this.applyTheme();
				
				// Watch for system theme changes
				if (window.matchMedia) {
					var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
					// Use older addEventListener or onchange for compatibility
					if (mediaQuery.addEventListener) {
						mediaQuery.addEventListener('change', function(e) {
							if (currentTheme === 'auto') {
								currentTheme = e.matches ? 'dark' : 'light';
								UI.applyTheme();
							}
						});
					} else if ('onchange' in mediaQuery) {
						// Fallback for older browsers
						mediaQuery.onchange = function(e) {
							if (currentTheme === 'auto') {
								currentTheme = e.matches ? 'dark' : 'light';
								UI.applyTheme();
							}
						};
					}
				}
			} catch(e) {
				console.warn('Theme detection failed:', e);
				currentTheme = 'light'; // Fallback to light theme
			}
		},
		
		// Apply theme to elements
		applyTheme: function() {
			if (this.modal) {
				if (currentTheme === 'dark') {
					this.modal.classList.add('mutation-dark-theme');
					this.modal.classList.remove('mutation-light-theme');
				} else {
					this.modal.classList.add('mutation-light-theme');
					this.modal.classList.remove('mutation-dark-theme');
				}
			}
		},
		
		// Create modal and all UI elements
		createModal: function() {
			var modalHTML = '<div id="mutation-modal" style="display:none;" class="mutation-modal">' +
				'<div class="mutation-modal-content">' +
				'<div class="mutation-close" title="Close (Esc)"></div>' +
				'<h2>Upload Mutation Image</h2>' +
				'<div class="mutation-notification">' + config.messages.checkExisting + '</div>' +
				'<div id="low-bandwidth-notice" class="mutation-notification bandwidth-notice" style="display:none;">' + 
					config.messages.lowBandwidth + 
				'</div>' +
				'<form id="mutation-form">' +
				'<div class="file-input-wrapper">' +
				'<input type="file" id="mutation-image" accept="image/*" required>' +
				'<div class="file-remove" style="display:none;" title="Remove selected file"></div>' +
				'</div>' +
				
				'<div id="image-preview-container" style="display:none;">' +
					'<div class="preview-header">' +
						'<div class="preview-title">Preview image</div>' +
						'<div class="preview-tools">' +
							'<button type="button" id="rotate-left-btn" class="tool-btn" title="Rotate Left"><span class="tool-icon">↺</span></button>' +
							'<button type="button" id="rotate-right-btn" class="tool-btn" title="Rotate Right"><span class="tool-icon">↻</span></button>' +
							'<button type="button" id="crop-btn" class="tool-btn" title="Crop Image"><span class="tool-icon">⊡</span></button>' +
							'<button type="button" id="reset-edit-btn" class="tool-btn" title="Reset Edits"><span class="tool-icon">↺↻</span></button>' +
						'</div>' +
					'</div>' +
					'<div class="preview-body">' +
						'<div id="image-editor-container" class="image-editor-container">' +
							'<img id="image-preview" src="" alt="Preview" draggable="false">' +
							'<div id="crop-overlay" class="crop-overlay" style="display:none;"></div>' +
						'</div>' +
					'</div>' +
					'<div id="edit-controls" class="edit-controls" style="display:none;">' +
						'<button type="button" id="confirm-edit-btn" class="edit-btn confirm-btn">Apply</button>' +
						'<button type="button" id="cancel-edit-btn" class="edit-btn cancel-btn">Cancel</button>' +
					'</div>' +
				'</div>' +
				
				'<div id="progress-container" class="progress-container" style="display:none;">' +
					'<div class="progress-bar" id="progress-bar"></div>' +
				'</div>' +
				
				'<input type="text" class="mutation-input" id="mutation-names" maxlength="150" placeholder="> Enter mutations (comma-separated)" required>' +
				'<div class="mutation-controls">' +
					'<span class="mutation-shortcut-hint">Ctrl+Enter to upload</span>' +
					'<button type="submit" class="mutation-submit">Upload</button>' +
				'</div>' +
				'</form>' +
				'<div id="upload-status"></div>' +
				'<div id="error-log-container" class="error-log-container" style="display:none;">' +
					'<div class="error-log-header">' +
						'<div class="error-log-title">Error Log</div>' +
						'<button type="button" id="toggle-error-log" class="toggle-error-log">Show Log</button>' +
					'</div>' +
					'<div id="error-log-content" class="error-log-content" style="display:none;"></div>' +
				'</div>' +
				'</div>' +
				'</div>';

			$('body').append(modalHTML);
			
			// Cache DOM elements for quick access
			this.modal = document.getElementById('mutation-modal');
			this.$form = $('#mutation-form');
			this.$status = $('#upload-status');
			this.$preview = $('#image-preview');
			this.$imageInput = $('#mutation-image');
			this.$mutationsInput = $('#mutation-names');
			this.$notification = $('.mutation-notification');
			
			// Add character counter
			this.$mutationsInput.after('<div class="char-counter"><span id="char-count">0</span>/150</div>');
			this.$charCount = $('#char-count');
			
			// Handler for character counting
			this.$mutationsInput.on('input', function() {
				var length = $(this).val().length;
				UI.$charCount.text(length);
				
				if (length > 140) {
					UI.$charCount.addClass('char-count-warning');
				} else {
					UI.$charCount.removeClass('char-count-warning');
				}
				
				if (length > 150) {
					UI.$charCount.addClass('char-count-limit');
				} else {
					UI.$charCount.removeClass('char-count-limit');
				}
			});
			this.$progressBar = $('#progress-bar');
			this.$progressContainer = $('#progress-container');
			
			// Apply initial theme
			this.applyTheme();
		},
		
		// Bind all event handlers
		bindEvents: function() {
			// File upload
			this.$imageInput.on('change', this.handleFileSelect.bind(this));
			
			// File removal
			$('.file-remove').on('click', this.handleFileRemove.bind(this));
			
			// Close modal
			$('.mutation-close').on('click', this.handleModalClose.bind(this));
			$('#mutation-modal').on('click', function(e) {
				if ($(e.target).is('#mutation-modal')) {
					UI.handleModalClose(e);
				}
			});
			
			// Form submission
			this.$form.on('submit', this.handleFormSubmit.bind(this));
			
			// Image editing tools
			$('#rotate-left-btn').on('click', function() {
				UI.rotateImage(-90);
			});
			
			$('#rotate-right-btn').on('click', function() {
				UI.rotateImage(90);
			});
			
			$('#crop-btn').on('click', function() {
				UI.toggleCropMode();
			});
			
			$('#reset-edit-btn').on('click', function() {
				UI.resetImageEdits();
			});
			
			$('#confirm-edit-btn').on('click', function() {
				UI.applyEdits();
			});
			
			$('#cancel-edit-btn').on('click', function() {
				UI.cancelEdits();
			});
			
			// Batch processing
			$('#cancel-batch-btn').on('click', function() {
				BatchProcessor.cancelBatch();
			});
			
			// Error log toggle
			$('#toggle-error-log').on('click', function() {
				var $logContent = $('#error-log-content');
				if ($logContent.is(':visible')) {
					$logContent.hide();
					$(this).text('Show Log');
				} else {
					$logContent.show();
					$(this).text('Hide Log');
					$logContent.html(ErrorLogger.getErrorLogText());
				}
			});
			
			// Drag & Drop
			this.setupDragDrop();
			
			// Clipboard paste
			this.setupClipboardPaste();
			
			// Hotkeys
			this.setupHotkeys();
		},
		
		// Setup hotkeys
		setupHotkeys: function() {
			$(document).on('keydown', function(e) {
				// If modal is open
				if ($('#mutation-modal').is(':visible')) {
					// Close modal with Esc
					if (e.key === 'Escape') {
						$('#mutation-modal').hide();
						UI.resetForm();
					}
					
					// Submit form with Ctrl+Enter
					if (e.ctrlKey && e.key === 'Enter') {
						e.preventDefault();
						$('#mutation-form').submit();
					}
				}
			});
		},
		
		// Drag & Drop for files
		setupDragDrop: function() {
			var $modal = $('#mutation-modal');
			
			$modal.on('dragover', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).addClass('drag-over');
			}).on('dragleave', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).removeClass('drag-over');
			}).on('drop', function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).removeClass('drag-over');
			
				var files = e.originalEvent.dataTransfer.files;
				if (files && files.length) {
					$('#mutation-image')[0].files = files;
					$('#mutation-image').trigger('change');
				}
			});
		},
		
		// Clipboard paste for images
		setupClipboardPaste: function() {
			$('#mutation-modal').on('paste', function(e) {
				var items = (e.clipboardData || e.originalEvent.clipboardData).items;
				
				if (items) {
					for (var i = 0; i < items.length; i++) {
						if (items[i].type.indexOf('image') !== -1) {
							var blob = items[i].getAsFile();
							// Handle the file only if it's valid
							if (blob) {
								var fileExt = blob.type.split('/')[1] || 'png';
								var file = new File([blob], 'pasted_image_' + new Date().getTime() + '.' + fileExt, {
									type: blob.type
								});
								
								try {
									// Use DataTransfer for modern browsers
									var dataTransfer = new DataTransfer();
									dataTransfer.items.add(file);
									$('#mutation-image')[0].files = dataTransfer.files;
									$('#mutation-image').trigger('change');
								} catch (error) {
									// Fallback method for older browsers
									UI.showStatus('Your browser doesn\'t support pasting images directly. Please save and upload the image manually.', 'warning');
								}
								break;
							}
						}
					}
				}
			});
		},
		
		// Handle file selection
		handleFileSelect: function(e) {
			var files = e.target.files;
			
			if (!files || files.length === 0) {
				this.resetFileSelection();
				return;
			}
			
			// Show file remove button
			$('.file-remove').show();
			
			// If multiple files selected
			if (files.length > 1) {
				this.handleMultipleFiles(files);
			} else {
				// Single file selected
				var file = files[0];
				this.handleSingleFile(file);
			}
		},
		
		// Handle single file selection
		handleSingleFile: function(file) {
			// Hide multiple files container
			$('#selected-files-container').hide();
			
			// Check if it's an image
			if (file.type.match(/^image\//)) {
				var fileReader = new FileReader();
				fileReader.onload = function(e) {
					// Set preview image
					$('#image-preview').attr('src', e.target.result);
					$('#image-preview-container').fadeIn();
					
					// Initialize image for editing
					ImageProcessor.loadImage(file, function(img) {
						if (img) {
							// Image loaded successfully
							UI.showEditTools();
						}
					});
				};
				fileReader.readAsDataURL(file);
			} else {
				// Not an image file
				UI.showStatus('Selected file is not an image', 'error');
			}
		},
		
		// Handle multiple files selection
		handleMultipleFiles: function(files) {
			var self = this;
			var validFiles = Array.from(files).filter(function(file) {
				return file.type.match(/^image\//);
			});
			
			if (validFiles.length === 0) {
				UI.showStatus('No valid image files selected', 'error');
				return;
			}
			
			if (validFiles.length !== files.length) {
				UI.showStatus((files.length - validFiles.length) + ' non-image files will be ignored', 'warning');
			}
			
			// Hide single image preview
			$('#image-preview-container').hide();
			
			// Show files list
			$('#selected-count').text(validFiles.length);
			var $filesList = $('#selected-files-list').empty();
			
			// Process each file
			validFiles.forEach(function(file, index) {
				var fileReader = new FileReader();
				
				fileReader.onload = function(e) {
					var $fileItem = $('<div class="selected-file-item" data-index="' + index + '">' +
						'<img src="' + e.target.result + '" class="selected-file-thumb" alt="Thumbnail">' +
						'<div class="selected-file-info">' +
							'<div class="selected-file-name">' + file.name + '</div>' +
							'<div class="selected-file-size">' + Utilities.formatFileSize(file.size) + '</div>' +
						'</div>' +
						'<div class="selected-file-remove" title="Remove file"></div>' +
					'</div>');
					
					// Add click handler to preview image
					$fileItem.find('.selected-file-thumb').on('click', function() {
						self.previewFileFromList(file, index);
					});
					
					// Add click handler to remove button
					$fileItem.find('.selected-file-remove').on('click', function(e) {
						e.stopPropagation();
						self.removeFileFromList(index);
					});
					
					$filesList.append($fileItem);
				};
				
				fileReader.readAsDataURL(file);
			});
			
			$('#selected-files-container').fadeIn();
			
			// Preview the first image
			if (validFiles.length > 0) {
				this.previewFileFromList(validFiles[0], 0);
			}
		},
		
		// Preview file from multiple files list
		previewFileFromList: function(file, index) {
			// Highlight selected item
			$('.selected-file-item').removeClass('selected');
			$('.selected-file-item[data-index="' + index + '"]').addClass('selected');
			
			// Load image for preview and editing
			var fileReader = new FileReader();
			fileReader.onload = function(e) {
				// Show preview container
				$('#image-preview').attr('src', e.target.result);
				$('#image-preview-container').fadeIn();
				
				// Initialize image for editing
				ImageProcessor.loadImage(file, function(img) {
					if (img) {
						// Image loaded successfully
						UI.showEditTools();
					}
				});
			};
			fileReader.readAsDataURL(file);
		},
		
		// Remove file from multiple files list
		removeFileFromList: function(index) {
			// Get current file list
			var files = Array.from(this.$imageInput[0].files);
			
			// Remove file at index
			files.splice(index, 1);
			
			if (files.length === 0) {
				// If no files left, reset file input
				this.resetFileSelection();
				return;
			}
			
			// Update file input with new file list
			try {
				var dataTransfer = new DataTransfer();
				files.forEach(function(file) {
					dataTransfer.items.add(file);
				});
				this.$imageInput[0].files = dataTransfer.files;
				
				// Refresh file list
				this.handleFileSelect({ target: { files: dataTransfer.files } });
			} catch (error) {
				// Fallback: reset completely if DataTransfer is not supported
				ErrorLogger.logError(error, 'removeFileFromList');
				this.resetFileSelection();
			}
		},
		
		// Remove selected file
		handleFileRemove: function() {
			// Reset file input field
			$('#mutation-image').val('').show();
			
			// Hide remove button
			$('.file-remove').hide();
			
			// Hide and clear preview
			$('#image-preview-container').hide();
			$('#image-preview').attr('src', '');
			
			// Reset upload status if present
			$('#upload-status').html('').hide();
			
			// Hide progress bar
			UI.$progressContainer.hide();
			UI.$progressBar.css('width', '0%');
		},
		
		// Close modal
		handleModalClose: function(event) {
			this.resetForm();
			$('#mutation-modal').hide();
		},
		
		// Form submission
		handleFormSubmit: function(e) {
			e.preventDefault();

			var file = $('#mutation-image')[0].files[0];
			var mutations = $('#mutation-names').val().trim();

			if (!file) {
				UI.showStatus('Error: No file selected', 'error');
				return;
			}
			
			if (!mutations) {
				UI.showStatus('Error: Please enter mutation text', 'error');
				return;
			}
			
			if (mutations.length > config.maxMutationLength) {
				UI.showStatus('Error: Mutation text exceeds ' + config.maxMutationLength + ' character limit', 'error');
				return;
			}
			
			// Additional check for random/meaningless strings
			if (/^(.)\1{10,}$/.test(mutations) || // Repeated characters (e.g., "aaaaaaaaaa")
				/^[^\s]{20,}$/.test(mutations)) { // Long word without spaces (likely meaningless)
				UI.showStatus('Error: Mutation text appears to be random or meaningless. Please enter valid mutations.', 'error');
				return;
			}

			// Update upload stats
			uploadStats.total += 1;
			
			if (file && mutations) {
				if (isUploading) {
					$('#upload-status').html('Another upload is in progress, your request has been queued...').show();
					uploadQueue.push({
						file: file,
						mutations: mutations
					});
					return;
				}

				// Check if we should compress for low bandwidth
				if (isLowBandwidth && config.enableCompression) {
					UI.showStatus('Compressing image for upload...', 'info');
					ImageProcessor.compressImage(file, function(compressedFile) {
						UploadHandler.processUpload(compressedFile, mutations);
					});
				} else {
					UploadHandler.processUpload(file, mutations);
				}
			}
		},
		
		// Reset form to initial state
		resetForm: function() {
			$('#mutation-image').val('').show();
			$('.file-remove').hide();
			$('#image-preview-container').hide();
			$('#image-preview').attr('src', '');
			$('#upload-status').html('').hide();
			$('#mutation-names').val('');
			$('#char-count').text('0').removeClass('char-count-warning char-count-limit');
			$('#selected-files-container').hide();
			$('#selected-files-list').empty();
			$('#edit-controls').hide();
			$('#crop-overlay').hide();
			$('#batch-progress-container').hide();
			UI.$progressContainer.hide();
			UI.$progressBar.css('width', '0%');
			
			// Reset the image processor
			ImageProcessor.resetEditState();
			editMode = null;
		},
		
		// Reset file selection
		resetFileSelection: function() {
			$('#mutation-image').val('');
			$('.file-remove').hide();
			$('#image-preview-container').hide();
			$('#image-preview').attr('src', '');
			$('#selected-files-container').hide();
			$('#selected-files-list').empty();
			$('#edit-controls').hide();
			$('#crop-overlay').hide();
			
			// Reset the image processor
			ImageProcessor.resetEditState();
			editMode = null;
		},
		
		// Show edit tools
		showEditTools: function() {
			// Make sure crop overlay is hidden initially
			$('#crop-overlay').hide();
			$('#edit-controls').hide();
		},
		
		// Rotate image
		rotateImage: function(degrees) {
			if (!ImageProcessor.currentImage) return;
			
			var dataUrl = ImageProcessor.rotateImage(degrees);
			if (dataUrl) {
				$('#image-preview').attr('src', dataUrl);
			}
		},
		
		// Toggle crop mode
		toggleCropMode: function() {
			if (editMode === 'crop') {
				// Disable crop mode
				this.cancelEdits();
			} else {
				// Enable crop mode
				editMode = 'crop';
				this.initCropMode();
			}
		},
		
		// Initialize crop mode
		initCropMode: function() {
			if (!ImageProcessor.currentImage) return;
			
			var $image = $('#image-preview');
			var $overlay = $('#crop-overlay');
			
			// Get image dimensions
			var imgWidth = $image.width();
			var imgHeight = $image.height();
			
			// Start with a default crop area (50% of original image)
			var cropWidth = Math.round(imgWidth * 0.5);
			var cropHeight = Math.round(imgHeight * 0.5);
			var cropLeft = Math.round((imgWidth - cropWidth) / 2);
			var cropTop = Math.round((imgHeight - cropHeight) / 2);
			
			// Position crop overlay
			$overlay.css({
				left: cropLeft + 'px',
				top: cropTop + 'px',
				width: cropWidth + 'px',
				height: cropHeight + 'px',
				display: 'block'
			});
			
			// Show edit controls
			$('#edit-controls').show();
			
			// Setup drag functionality
			this.setupCropDrag();
		},
		
		// Setup crop drag functionality
		setupCropDrag: function() {
			var $overlay = $('#crop-overlay');
			var $image = $('#image-preview');
			var $container = $('.preview-body');
			
			var isDragging = false;
			var isResizing = false;
			var startX, startY, startWidth, startHeight, startLeft, startTop;
			
			// Mouse events for desktop
			$overlay.on('mousedown', function(e) {
				e.preventDefault();
				
				// Check if resize handle clicked
				var overlayRect = $overlay[0].getBoundingClientRect();
				var isResize = (e.clientX > overlayRect.right - 10 && e.clientY > overlayRect.bottom - 10);
				
				startX = e.clientX;
				startY = e.clientY;
				startLeft = parseInt($overlay.css('left'), 10);
				startTop = parseInt($overlay.css('top'), 10);
				startWidth = $overlay.width();
				startHeight = $overlay.height();
				
				if (isResize) {
					isResizing = true;
				} else {
					isDragging = true;
				}
			});
			
			$(document).on('mousemove', function(e) {
				if (!isDragging && !isResizing) return;
				
				var imgRect = $image[0].getBoundingClientRect();
				
				if (isResizing) {
					// Resize operation
					var newWidth = startWidth + (e.clientX - startX);
					var newHeight = startHeight + (e.clientY - startY);
					
					// Constrain to image boundaries
					newWidth = Math.min(Math.max(20, newWidth), imgRect.width - startLeft);
					newHeight = Math.min(Math.max(20, newHeight), imgRect.height - startTop);
					
					$overlay.css({
						width: newWidth + 'px',
						height: newHeight + 'px'
					});
				} else if (isDragging) {
					// Move operation
					var newLeft = startLeft + (e.clientX - startX);
					var newTop = startTop + (e.clientY - startY);
					
					// Constrain to image boundaries
					newLeft = Math.min(Math.max(0, newLeft), imgRect.width - startWidth);
					newTop = Math.min(Math.max(0, newTop), imgRect.height - startHeight);
					
					$overlay.css({
						left: newLeft + 'px',
						top: newTop + 'px'
					});
				}
			});
			
			$(document).on('mouseup', function() {
				isDragging = false;
				isResizing = false;
			});
			
			// Touch events for mobile
			$overlay.on('touchstart', function(e) {
				e.preventDefault();
				
				var touch = e.originalEvent.touches[0];
				
				// Check if resize handle touched
				var overlayRect = $overlay[0].getBoundingClientRect();
				var isResize = (touch.clientX > overlayRect.right - 20 && touch.clientY > overlayRect.bottom - 20);
				
				startX = touch.clientX;
				startY = touch.clientY;
				startLeft = parseInt($overlay.css('left'), 10);
				startTop = parseInt($overlay.css('top'), 10);
				startWidth = $overlay.width();
				startHeight = $overlay.height();
				
				if (isResize) {
					isResizing = true;
				} else {
					isDragging = true;
				}
			});
			
			$(document).on('touchmove', function(e) {
				if (!isDragging && !isResizing) return;
				
				var touch = e.originalEvent.touches[0];
				var imgRect = $image[0].getBoundingClientRect();
				
				if (isResizing) {
					// Resize operation
					var newWidth = startWidth + (touch.clientX - startX);
					var newHeight = startHeight + (touch.clientY - startY);
					
					// Constrain to image boundaries
					newWidth = Math.min(Math.max(20, newWidth), imgRect.width - startLeft);
					newHeight = Math.min(Math.max(20, newHeight), imgRect.height - startTop);
					
					$overlay.css({
						width: newWidth + 'px',
						height: newHeight + 'px'
					});
				} else if (isDragging) {
					// Move operation
					var newLeft = startLeft + (touch.clientX - startX);
					var newTop = startTop + (touch.clientY - startY);
					
					// Constrain to image boundaries
					newLeft = Math.min(Math.max(0, newLeft), imgRect.width - startWidth);
					newTop = Math.min(Math.max(0, newTop), imgRect.height - startHeight);
					
					$overlay.css({
						left: newLeft + 'px',
						top: newTop + 'px'
					});
				}
			});
			
			$(document).on('touchend', function() {
				isDragging = false;
				isResizing = false;
			});
		},
		
		// Apply image edits
		applyEdits: function() {
			if (editMode === 'crop') {
				var $image = $('#image-preview');
				var $overlay = $('#crop-overlay');
				
				// Get image and overlay dimensions
				var imgRect = $image[0].getBoundingClientRect();
				var imgNaturalWidth = ImageProcessor.currentImage.width;
				var imgNaturalHeight = ImageProcessor.currentImage.height;
				
				// Get scaling factors
				var scaleX = imgNaturalWidth / imgRect.width;
				var scaleY = imgNaturalHeight / imgRect.height;
				
				// Get crop overlay coordinates
				var cropLeft = parseInt($overlay.css('left'), 10);
				var cropTop = parseInt($overlay.css('top'), 10);
				var cropWidth = $overlay.width();
				var cropHeight = $overlay.height();
				
				// Convert to natural image coordinates
				var naturalCropX = Math.round(cropLeft * scaleX);
				var naturalCropY = Math.round(cropTop * scaleY);
				var naturalCropWidth = Math.round(cropWidth * scaleX);
				var naturalCropHeight = Math.round(cropHeight * scaleY);
				
				// Apply crop
				var dataUrl = ImageProcessor.setCropArea(
					naturalCropX, naturalCropY, 
					naturalCropWidth, naturalCropHeight
				);
				
				if (dataUrl) {
					$('#image-preview').attr('src', dataUrl);
				}
				
				// Hide crop overlay and controls
				$('#crop-overlay').hide();
				$('#edit-controls').hide();
				editMode = null;
			}
		},
		
		// Cancel edits
		cancelEdits: function() {
			if (editMode === 'crop') {
				// Hide crop overlay and controls
				$('#crop-overlay').hide();
				$('#edit-controls').hide();
				editMode = null;
			}
		},
		
		// Reset image edits
		resetImageEdits: function() {
			if (!ImageProcessor.originalImage) return;
			
			// Reset all edits
			ImageProcessor.resetEditState();
			var dataUrl = ImageProcessor.applyEdits();
			
			if (dataUrl) {
				$('#image-preview').attr('src', dataUrl);
			}
			
			// Cancel any ongoing edit operation
			this.cancelEdits();
		},
		
		// Show low bandwidth notice
		showLowBandwidthNotice: function() {
			$('#low-bandwidth-notice').show();
		},
		
		// Show batch UI
		showBatchUI: function(batchItems) {
			// Hide file lists and preview
			$('#selected-files-container').hide();
			$('#image-preview-container').hide();
			
			// Setup batch progress UI
			var $batchItemsContainer = $('#batch-items-container').empty();
			
			batchItems.forEach(function(item, index) {
				var $item = $('<div class="batch-item">' +
					'<div class="batch-item-icon pending">⏳</div>' +
					'<div class="batch-item-info">' +
						'<div class="batch-item-name">' + item.file.name + '</div>' +
						'<div class="batch-item-status">Pending</div>' +
					'</div>' +
				'</div>');
				
				$batchItemsContainer.append($item);
			});
			
			// Update progress text
			$('#batch-progress-text').text('0/' + batchItems.length);
			$('#batch-progress-bar').css('width', '0%');
			
			// Show batch progress container
			$('#batch-progress-container').show();
		},
		
		// Update batch item status
		updateBatchItemStatus: function(index, status, error) {
			var $item = $('#batch-items-container .batch-item').eq(index);
			var $icon = $item.find('.batch-item-icon');
			var $status = $item.find('.batch-item-status');
			
			$icon.removeClass('pending processing success error');
			
			switch(status) {
				case 'processing':
					$icon.addClass('processing').text('⏳');
					$status.text('Processing...');
					break;
				case 'success':
					$icon.addClass('success').text('✅');
					$status.text('Uploaded successfully');
					break;
				case 'error':
					$icon.addClass('error').text('❌');
					$status.text(error || 'Failed to upload');
					break;
				case 'cancelled':
					$icon.addClass('error').text('⛔');
					$status.text('Cancelled');
					break;
				default:
					$icon.addClass('pending').text('⏳');
					$status.text('Pending');
			}
		},
		
		// Update batch progress
		updateBatchProgress: function(current, total) {
			var percent = Math.round((current / total) * 100);
			$('#batch-progress-text').text(current + '/' + total);
			$('#batch-progress-bar').css('width', percent + '%');
		},
		
		// Complete batch UI
		completeBatchUI: function(successCount, errorCount, cancelled) {
			// Update cancel button
			$('#cancel-batch-btn').text('Close').off('click').on('click', function() {
				$('#batch-progress-container').hide();
			});
			
			// Show completion message
			var statusText = cancelled ? 'Cancelled' : 'Completed';
			$('#batch-progress-text').text(statusText + ': ' + successCount + ' success, ' + errorCount + ' failed');
			
			// Show error log if there were errors
			if (errorCount > 0) {
				$('#error-log-container').show();
			}
		},
		
		// Update progress indicator
		updateProgress: function(percent) {
			this.$progressContainer.show();
			this.$progressBar.css('width', percent + '%');
			
			// If upload complete, hide indicator after some time
			if (percent >= 100) {
				setTimeout(function() {
					UI.$progressContainer.fadeOut();
				}, 1000);
			}
		},
		
		// Display status
		showStatus: function(message, type) {
			this.$status.html(message).show();
			
			// Reset all status classes
			this.$status.removeClass('status-error status-success status-warning status-info');
			
			// Apply appropriate class
			switch(type) {
				case 'error':
					this.$status.addClass('status-error');
					break;
				case 'success':
					this.$status.addClass('status-success');
					break;
				case 'warning':
					this.$status.addClass('status-warning');
					break;
				case 'info':
					this.$status.addClass('status-info');
					break;
				default:
					// Info message by default
					this.$status.addClass('status-info');
			}
		}
	};

	// Module for Web Workers - SHA1 calculation
	var WorkerHandler = {
		init: function() {
			this.createWorker();
		},
		
		// Initialize worker for SHA1
		createWorker: function() {
			try {
				// Create inline worker
				var workerBlob = new Blob([`
					self.onmessage = function(e) {
						var data = e.data;
						var id = data.id;
						var fileBuffer = data.buffer;
						
						// Function to convert string to ArrayBuffer
						function str2ab(str) {
							var buf = new ArrayBuffer(str.length);
							var bufView = new Uint8Array(buf);
							for (var i=0, strLen=str.length; i < strLen; i++) {
								bufView[i] = str.charCodeAt(i);
							}
							return buf;
						}
						
						// Function to calculate SHA1
						function sha1(buffer) {
							return crypto.subtle.digest('SHA-1', buffer)
								.then(function(hash) {
									var hashArray = Array.from(new Uint8Array(hash));
									var hashHex = hashArray.map(function(b) {
										return ('00' + b.toString(16)).slice(-2);
									}).join('');
									return hashHex;
								});
						}
						
						// Start SHA1 calculation
						sha1(fileBuffer).then(function(result) {
							self.postMessage({ id: id, result: result });
						}).catch(function(error) {
							self.postMessage({ id: id, error: error.message || 'SHA1 calculation failed' });
						});
					};
				`], { type: 'application/javascript' });
				
				var workerUrl = URL.createObjectURL(workerBlob);
				sha1Worker = new Worker(workerUrl);
				
				// Set up message handler
				sha1Worker.onmessage = function(e) {
					var data = e.data;
					var id = data.id;
					var callback = workerCallbacks[id];
					
					if (callback) {
						if (data.error) {
							callback.reject(data.error);
						} else {
							callback.resolve(data.result);
						}
						delete workerCallbacks[id]; // Clear callback
					}
				};
				
				// Error handling
				sha1Worker.onerror = function(error) {
					console.error('Web Worker error:', error);
					sha1Worker = null; // Disable worker on error
				};
			} catch (error) {
				console.warn('Web Worker initialization failed:', error);
				sha1Worker = null; // Worker not supported or not initialized
			}
		},
		
		// Calculate SHA1 via worker or in main thread
		calculateSHA1: function(file) {
			return new Promise(function(resolve, reject) {
				var reader = new FileReader();
				
				reader.onload = function(e) {
					var buffer = e.target.result;
					
					// If worker available, use it
					if (sha1Worker) {
						var id = Date.now() + '' + Math.random();
						workerCallbacks[id] = { resolve: resolve, reject: reject };
						
						sha1Worker.postMessage({
							id: id,
							buffer: buffer
						});
					} else {
						// Fallback: calculate SHA1 in main thread
						try {
							crypto.subtle.digest('SHA-1', buffer)
								.then(function(hashBuffer) {
									var hashArray = Array.from(new Uint8Array(hashBuffer));
									var hashHex = hashArray.map(function(b) {
										return ('00' + b.toString(16)).slice(-2);
									}).join('');
									resolve(hashHex);
								})
								.catch(function(error) {
									console.warn('SHA-1 calculation fallback error:', error);
									resolve(null); // Continue without SHA1 check
								});
						} catch (error) {
							console.warn('SHA-1 calculation error:', error);
							resolve(null); // Continue without SHA1 check
						}
					}
				};
				
				reader.onerror = function() {
					console.warn('File reading error');
					resolve(null); // Continue without SHA1 check
				};
				
				reader.readAsArrayBuffer(file);
			});
		}
	};

	// Module for Wiki API operations
	var WikiAPI = {
		// Check user permissions
		checkUserPermissions: function() {
			return new Promise(function(resolve, reject) {
				try {
					// Get user rights via MediaWiki API
					new mw.Api().get({
						action: 'query',
						meta: 'userinfo',
						uiprop: 'rights'
					}).done(function(data) {
						if (data && data.query && data.query.userinfo && data.query.userinfo.rights) {
							var rights = data.query.userinfo.rights;
							// Check for upload and edit permissions
							if (rights.indexOf('upload') !== -1 && rights.indexOf('edit') !== -1) {
								resolve(true);
							} else {
								var missingRights = [];
								if (rights.indexOf('upload') === -1) missingRights.push('upload');
								if (rights.indexOf('edit') === -1) missingRights.push('edit');
								reject('Missing required permissions: ' + missingRights.join(', '));
							}
						} else {
							reject('Failed to retrieve user rights information');
						}
					}).fail(function(error) {
						reject('Error checking permissions: ' + (error.info || error));
					});
				} catch (error) {
					reject('Unexpected error checking permissions: ' + error.message);
				}
			});
		},
		
		// Check for duplicate by SHA1
		checkDuplicateImage: function(sha1) {
			if (!sha1) return Promise.resolve(null);
			
			return new mw.Api().get({
				action: 'query',
				list: 'allimages',
				aisha1: sha1,
				ailimit: 1
			}).then(function(response) {
				if (response.query && response.query.allimages && response.query.allimages.length > 0) {
					return response.query.allimages[0].name; // Return file name if duplicate found
				}
				return null; // No duplicate found
			}).catch(function(error) {
				console.warn('Error checking duplicate image:', error);
				return null; // Continue without check in case of error
			});
		},
		
		// Check if file exists in gallery
		checkImageExistsInGallery: function(fileNameToCheck) {
			return new Promise(function(resolve, reject) {
				try {
					new mw.Api().get({
						action: 'query',
						prop: 'revisions',
						titles: mw.config.get('wgPageName'),
						rvprop: 'content',
						rvslots: 'main',
						formatversion: '2'
					}).done(function(data) {
						try {
							if (!data.query || !data.query.pages || !data.query.pages[0] || 
								!data.query.pages[0].revisions || !data.query.pages[0].revisions[0] || 
								!data.query.pages[0].revisions[0].slots || !data.query.pages[0].revisions[0].slots.main) {
								reject('Failed to retrieve page content');
								return;
							}
							
							var content = data.query.pages[0].revisions[0].slots.main.content;
							var mutationsSection = content.match(/\{\{MutationsCollapsible\|\s*<gallery[^>]*>[\s\S]*?}}/);
							
							if (mutationsSection) {
								var fileNamePattern = new RegExp('File:' + fileNameToCheck.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
								var exists = fileNamePattern.test(mutationsSection[0]);
								resolve(exists);
							} else {
								resolve(false);
							}
						} catch (error) {
							reject('Error parsing gallery content: ' + error.message);
						}
					}).fail(function(error) {
						reject('Error retrieving page content: ' + (error.info || error));
					});
				} catch (error) {
					reject('Unexpected error checking gallery: ' + error.message);
				}
			});
		},
		
		// Get gallery content
		getGalleryContent: function() {
			return new Promise(function(resolve, reject) {
				new mw.Api().get({
					action: 'query',
					prop: 'revisions',
					titles: mw.config.get('wgPageName'),
					rvprop: 'content|timestamp',
					rvslots: 'main',
					formatversion: '2'
				}).done(function(data) {
					try {
						if (!data.query || !data.query.pages || !data.query.pages[0] || 
							!data.query.pages[0].revisions || !data.query.pages[0].revisions[0] || 
							!data.query.pages[0].revisions[0].slots || !data.query.pages[0].revisions[0].slots.main) {
							reject('Failed to retrieve page content');
							return;
						}
						
						var pageContent = data.query.pages[0].revisions[0].slots.main.content;
						var timestamp = data.query.pages[0].revisions[0].timestamp;
						var mutationsSection = pageContent.match(/\{\{MutationsCollapsible\|\s*<gallery[^>]*>[\s\S]*?}}/);
						
						if (mutationsSection) {
							resolve({
								pageContent: pageContent,
								timestamp: timestamp,
								mutationsSection: mutationsSection[0]
							});
						} else {
							reject('Mutations gallery section not found on this page');
						}
					} catch (error) {
						reject('Error processing gallery content: ' + error.message);
					}
				}).fail(function(error) {
					reject('Error retrieving page content: ' + (error.info || error));
				});
			});
		},
		
		// Update gallery via AJAX
		updateGallery: function(originalContent, updatedContent, galleryItem) {
			return new Promise(function(resolve, reject) {
				new mw.Api().get({
					action: 'query',
					prop: 'revisions',
					titles: mw.config.get('wgPageName'),
					rvprop: 'content|timestamp',
					rvslots: 'main',
					formatversion: '2'
				}).done(function(data) {
					try {
						if (!data.query || !data.query.pages || !data.query.pages[0] || 
							!data.query.pages[0].revisions || !data.query.pages[0].revisions[0] || 
							!data.query.pages[0].revisions[0].slots || !data.query.pages[0].revisions[0].slots.main) {
							reject('Failed to retrieve page content');
							return;
						}
						
						var pageContent = data.query.pages[0].revisions[0].slots.main.content;
						var timestamp = data.query.pages[0].revisions[0].timestamp;
						
						// Replace old section with new one
						var finalContent = pageContent.replace(originalContent, updatedContent);
						
						new mw.Api().postWithToken('csrf', {
							action: 'edit',
							title: mw.config.get('wgPageName'),
							text: finalContent,
							summary: 'UMI: ' + galleryItem.split('|')[0],
							basetimestamp: timestamp,
							starttimestamp: new Date().toISOString()
						}).done(function() {
							resolve();
						}).fail(function(error) {
							var errorMsg = 'Error updating gallery: ';
							if (error.error && error.error.code) {
								if (error.error.code === 'permissiondenied') {
									errorMsg += 'You don\'t have permission to edit this page.';
								} else if (error.error.code === 'editconflict') {
									errorMsg += 'Edit conflict detected. Please reload the page and try again.';
								} else {
									errorMsg += error.error.code + ' - ' + (error.error.info || 'Unknown error');
								}
							} else {
								errorMsg += (error.info || error);
							}
							reject(errorMsg);
						});
					} catch (error) {
						reject('Error processing gallery update: ' + error.message);
					}
				}).fail(function(error) {
					reject('Error retrieving page content: ' + (error.info || error));
				});
			});
		},
		
		// Check and update DOM after successful addition
		updateDOM: function(galleryItem) {
			try {
				// Find gallery on page
				var $gallery = $('.mw-customcollapsible-rodsContent .gallery');
				
				if ($gallery.length) {
					// Create new gallery element
					var fileName = galleryItem.split('|')[0];
					var mutationText = galleryItem.split('|')[1];
					
					// Get thumbnail URL (for wiki)
					var wikiUrl = mw.config.get('wgServer') + mw.config.get('wgScriptPath');
					var thumbUrl = wikiUrl + '/Special:FilePath/' + encodeURIComponent(fileName.replace('File:', '')) + '?width=120';
					
					// Create element
					var $newItem = $('<li class="gallerybox">' +
						'<div class="thumb">' +
						'<div class="image">' +
						'<a href="' + wikiUrl + '/wiki/' + encodeURIComponent(fileName) + '">' +
						'<img alt="' + mutationText + '" src="' + thumbUrl + '" decoding="async" loading="lazy">' +
						'</a></div></div>' +
						'<div class="gallerytext">' + mutationText + '</div>' +
						'</li>');
					
					// Add to gallery
					$gallery.append($newItem);
					
					// Animate addition
					$newItem.css('backgroundColor', 'rgba(255, 255, 0, 0.3)');
					setTimeout(function() {
						$newItem.css('transition', 'background-color 1s');
						$newItem.css('backgroundColor', 'transparent');
					}, 100);
					
					return true;
				}
				return false;
			} catch (error) {
				console.warn('Error updating DOM:', error);
				return false;
			}
		}
	};

	// Upload handler module
	var UploadHandler = {
		// Process upload
		processUpload: function(file, mutations) {
			if (!file || !mutations) {
				UI.showStatus('Error: File or mutation text is missing', 'error');
				return;
			}
			
			// Validate mutation text
			mutations = mutations.trim();
			if (!mutations) {
				UI.showStatus('Error: Mutation text cannot be empty or only whitespace', 'error');
				return;
			}
		
			var fileExtension = file.name.split('.').pop().toLowerCase();
			
			// Validate file extension
			if (config.allowedExtensions.indexOf(fileExtension) === -1) {
				UI.showStatus('Error: Invalid file type. Allowed types: ' + config.allowedExtensions.join(', '), 'error');
				isUploading = false;
				if (typeof processQueue === 'function') {
					processQueue();
				}
				return;
			}
		
			// Clean and format page name
			var pageName = mw.config.get('wgPageName')
				.replace(/\s+/g, '_')
				.replace(/[^a-zA-Z0-9_]/g, '');
		
			// Clean mutation text
			var sanitizedMutations = mutations
				.replace(/[^a-zA-Z0-9\s]/g, '')
				.replace(/\s+/g, '');
		
			// Base file name without counter
			var baseFileName = pageName + '_' + sanitizedMutations;
			
			isUploading = true;
			UI.showStatus('Checking user permissions...', 'info');
			
			// Check user permissions
			WikiAPI.checkUserPermissions()
				.then(function() {
					UI.showStatus('Checking for duplicate images...', 'info');
					
					// Check for duplicates by SHA1
					return WorkerHandler.calculateSHA1(file).then(function(sha1) {
						if (!sha1) {
							UI.showStatus('Warning: Unable to check for duplicate images. Continuing with upload...', 'warning');
							return null;
						}
						return WikiAPI.checkDuplicateImage(sha1);
					});
				})
				.then(function(existingFileName) {
					if (existingFileName) {
						UI.showStatus('Found existing image with same content: ' + existingFileName, 'info');
						
						// Check if file exists in current gallery
						return WikiAPI.checkImageExistsInGallery(existingFileName).then(function(existsInGallery) {
							if (existsInGallery) {
								UI.showStatus('This image is already in the gallery. Upload canceled.', 'error');
								isUploading = false;
								if (typeof processQueue === 'function') {
									processQueue();
								}
								return null;
							} else {
								// Use existing file instead of uploading new one
								var galleryItem = 'File:' + existingFileName + '|' + mutations;
								return UploadHandler.addImageToGallery(galleryItem);
							}
						});
					} else {
						// Check file existence
						function checkFileExists(counter) {
							var suffix = counter > 0 ? '_(' + counter + ')' : '';
							var testFileName = baseFileName + suffix + '.' + fileExtension;
							
							return new mw.Api().get({
								action: 'query',
								titles: 'File:' + testFileName,
								prop: 'info'
							}).then(function(data) {
								var pages = data.query.pages;
								return !pages[-1]; // If there's a page with id -1, file doesn't exist
							}).catch(function(error) {
								console.warn('Error checking file existence:', error);
								return false; // Assume file doesn't exist in case of error
							});
						}
					
						// Recursive search for available file name
						function findAvailableFileName(counter) {
							return checkFileExists(counter).then(function(exists) {
								if (!exists) {
									var suffix = counter > 0 ? '_(' + counter + ')' : '';
									return baseFileName + suffix + '.' + fileExtension;
								}
								return findAvailableFileName(counter + 1);
							});
						}
					
						// Start with checking base file name
						return findAvailableFileName(0).then(function(newFileName) {
							UI.showStatus('Uploading file...', 'info');
							return UploadHandler.uploadFileWithProgress(file, newFileName, mutations);
						});
					}
				})
				.catch(function(error) {
					isUploading = false;
					if (typeof processQueue === 'function') {
						processQueue();
					}
					UI.showStatus('Permission error: ' + error, 'error');
				});
		},
		
		// Upload file with progress display
		uploadFileWithProgress: function(file, fileName, mutations) {
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				var formData = new FormData();
				
				// Prepare data for upload
				formData.append('action', 'upload');
				formData.append('format', 'json');
				formData.append('token', mw.user.tokens.get('csrfToken'));
				formData.append('filename', fileName);
				formData.append('file', file);
				formData.append('comment', 'Uploaded via UMI: User:' + mw.config.get('wgUserName'));
				
				// Add type for JPEG files
				var fileExtension = fileName.split('.').pop().toLowerCase();
				if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
					formData.append('filetype', 'image/jpeg');
				}
				
				// Setup progress tracking
				xhr.upload.addEventListener('progress', function(e) {
					if (e.lengthComputable) {
						var percent = Math.round((e.loaded / e.total) * 100);
						UI.updateProgress(percent);
					}
				}, false);
				
				// Handle upload completion
				xhr.addEventListener('load', function() {
					try {
						var response = JSON.parse(xhr.responseText);
						
						if (response.upload && response.upload.result === 'Success') {
							UI.showStatus('File uploaded! Searching for gallery section...', 'success');
							UI.updateProgress(100);
							
							var galleryItem = 'File:' + fileName + '|' + mutations;
							resolve(galleryItem);
						} else {
							var errorMsg = 'Error uploading file: ';
							if (response.error) {
								errorMsg += response.error.code + ' - ' + response.error.info;
							} else if (response.upload && response.upload.result) {
								errorMsg += response.upload.result;
							} else if (response.upload && response.upload.warnings) {
								var warnings = response.upload.warnings;
								if (warnings.exists) {
									errorMsg += 'File already exists: ' + warnings.exists;
								} else if (warnings.duplicate) {
									errorMsg += 'Duplicate of: ' + warnings.duplicate.join(', ');
								} else {
									errorMsg += JSON.stringify(warnings);
								}
							} else {
								errorMsg += 'Unknown error';
							}
							
							console.log('Upload response:', response);
							reject(errorMsg);
						}
					} catch (error) {
						reject('Error processing upload response: ' + error.message);
					}
				});
				
				// Handle upload errors
				xhr.addEventListener('error', function() {
					reject('Network error during file upload');
				});
				
				xhr.addEventListener('abort', function() {
					reject('File upload was aborted');
				});
				
				// Send request
				xhr.open('POST', mw.util.wikiScript('api'), true);
				xhr.send(formData);
			}).then(function(galleryItem) {
				return UploadHandler.addImageToGallery(galleryItem);
			}).catch(function(error) {
				isUploading = false;
				processQueue();
				UI.showStatus(error, 'error');
				return null;
			});
		},
		
                		// Add image to gallery
		addImageToGallery: function(galleryItem) {
			UI.showStatus('Updating gallery...', 'info');

			return WikiAPI.getGalleryContent().then(function(data) {
				var originalContent = data.mutationsSection;
				var fileName = galleryItem.split('|')[0];

				// Check if file already exists in gallery
				var fileNameEscaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				var filePattern = new RegExp(fileNameEscaped + '\\|', 'i');

				if (filePattern.test(originalContent)) {
					UI.showStatus('This exact file is already in the gallery. No changes made.', 'error');
					isUploading = false;
					if (typeof processQueue === 'function') {
						processQueue();
					}
					return;
				}

				// Format gallery content
				var cleanedContent = Utilities.cleanGalleryStructure(originalContent);
				var updatedContent = cleanedContent.replace('</gallery>', galleryItem + '\n</gallery>');

				// Update gallery
				return WikiAPI.updateGallery(originalContent, updatedContent, galleryItem).then(function() {
					isUploading = false;
					if (typeof processQueue === 'function') {
						processQueue();
					}

					UI.showStatus('Success! Reloading page...', 'success');
					setTimeout(function() {
						location.reload();
					}, config.uploadDelay);
				});
			}).catch(function(error) {
				isUploading = false;
				if (typeof processQueue === 'function') {
					processQueue();
				}
				UI.showStatus(error, 'error');
			});
		}
	};

	// Button manager module
	var ButtonManager = {
		init: function() {
			this.addUploadButtons();
		},
		
		// Add upload buttons to section headers
		addUploadButtons: function() {
			$('th').each(function() {
				if (!this || !$(this).is('th')) return;

				var $header = $(this);
				var $div = $header.children('div:first');

				if ($div.length && !$div.find('.mutation-upload-btn').length) {
					try {
						var uploadBtn = $('<div>', {
							'class': 'mutation-upload-btn no-ink',
							'text': 'Upload Mutation Image'
						}).on('click', function(e) {
							e.preventDefault();
							e.stopPropagation();
							$('#mutation-modal').show();
							window.currentGallery = $(this).closest('table').find('.mw-customcollapsible-rodsContent');
						});

						// Drag & drop
						uploadBtn.on('dragover', function(e) {
							e.preventDefault();
							e.stopPropagation();
							$(this).addClass('drag-over');
						}).on('dragleave', function(e) {
							e.preventDefault();
							e.stopPropagation();
							$(this).removeClass('drag-over');
						}).on('drop', function(e) {
							e.preventDefault();
							e.stopPropagation();
							$(this).removeClass('drag-over');

							var files = e.originalEvent.dataTransfer.files;
							if (files.length) {
								$('#mutation-modal').show();
								$('#mutation-image')[0].files = files;
								$('#mutation-image').trigger('change');
							}
						});

						var titleSpan = $div.find('span:first');
						var expandButton = $div.find('.mw-customtoggle-rodsContent');

						if (titleSpan.length && expandButton.length) {
							// Use display flex for better layout control
							$div.empty()
								.css({
									'display': 'flex',
									'justify-content': 'space-between',
									'align-items': 'center'
								})
								.append(titleSpan)
								.append(uploadBtn)
								.append(expandButton);
						}
					} catch (error) {
						console.warn('Error adding upload button:', error);
					}
				}
			});
		}
	};

	// Error Logger Module
	var ErrorLogger = {
		// Initialize logger
		init: function() {
			this.clearLog();
			window.addEventListener('error', this.handleGlobalError.bind(this));
		},
		
		// Log an error with detailed information
		logError: function(error, context, severity) {
			var errorInfo = {
				timestamp: new Date().toISOString(),
				message: error.message || error,
				stack: error.stack || null,
				context: context || 'unknown',
				severity: severity || 'error',
				userAgent: navigator.userAgent,
				url: window.location.href,
				connectionType: this.getConnectionType()
			};
			
			// Add to error log
			errorLog.unshift(errorInfo);
			
			// Trim log if needed
			if (errorLog.length > config.errorLogSize) {
				errorLog = errorLog.slice(0, config.errorLogSize);
			}
			
			// Log to console for development
			console.error('[Mutations Gallery]', errorInfo.severity.toUpperCase() + ':', errorInfo.message);
			if (errorInfo.stack) {
				console.error('Stack:', errorInfo.stack);
			}
			
			// For critical errors, show user feedback
			if (severity === 'critical') {
				UI.showStatus('Critical error: ' + errorInfo.message, 'error');
			}
			
			return errorInfo;
		},
		
		// Handle global uncaught errors
		handleGlobalError: function(event) {
			this.logError({
				message: event.message,
				stack: event.error ? event.error.stack : null
			}, 'window.onerror', 'critical');
			
			// Don't prevent default error handling
			return false;
		},
		
		// Get connection type info
		getConnectionType: function() {
			if (navigator.connection) {
				return {
					type: navigator.connection.effectiveType || 'unknown',
					downlink: navigator.connection.downlink || 0,
					rtt: navigator.connection.rtt || 0,
					saveData: navigator.connection.saveData || false
				};
			}
			return 'unknown';
		},
		
		// Get error log as formatted string
		getErrorLogText: function() {
			if (errorLog.length === 0) {
				return 'No errors logged.';
			}
			
			return errorLog.map(function(error, index) {
				return (index + 1) + '. [' + error.severity.toUpperCase() + '] ' + 
					error.timestamp + ' - ' + error.message + 
					(error.context ? ' (Context: ' + error.context + ')' : '');
			}).join('\n');
		},
		
		// Clear the error log
		clearLog: function() {
			errorLog = [];
		},
		
		// Export log as JSON for debugging
		exportLog: function() {
			return JSON.stringify(errorLog, null, 2);
		}
	};
	
	// Network Detection Module
	var NetworkMonitor = {
		init: function() {
			this.checkConnectionSpeed();
			this.detectMobileDevice();
			
			// Listen for network changes if supported
			if (navigator.connection) {
				navigator.connection.addEventListener('change', this.handleNetworkChange.bind(this));
			}
		},
		
		// Check connection speed
		checkConnectionSpeed: function() {
			if (navigator.connection && navigator.connection.downlink) {
				connectionSpeed = navigator.connection.downlink;
				isLowBandwidth = connectionSpeed < config.lowBandwidthThreshold;
				
				if (isLowBandwidth) {
					console.log('Low bandwidth mode activated. Connection speed: ' + connectionSpeed + ' Mbps');
				}
			} else {
				// Fallback: load a small image and measure time
				this.measureConnectionSpeed();
			}
		},
		
		// Measure connection speed by loading a test image
		measureConnectionSpeed: function() {
			var startTime = new Date().getTime();
			var downloadSize = 100000; // Test image size in bytes
			var testImage = new Image();
			
			testImage.onload = function() {
				var endTime = new Date().getTime();
				var duration = (endTime - startTime) / 1000; // seconds
				var bitsLoaded = downloadSize * 8;
				var speedBps = bitsLoaded / duration;
				var speedMbps = speedBps / 1024 / 1024;
				
				connectionSpeed = speedMbps;
				isLowBandwidth = connectionSpeed < config.lowBandwidthThreshold;
				
				if (isLowBandwidth) {
					console.log('Low bandwidth mode activated. Measured speed: ' + connectionSpeed.toFixed(2) + ' Mbps');
					UI.showLowBandwidthNotice();
				}
			};
			
			testImage.onerror = function() {
				console.warn('Could not measure connection speed');
				// Default to low bandwidth mode for safety
				isLowBandwidth = true;
				UI.showLowBandwidthNotice();
			};
			
			// Use a transparent 1px GIF to minimize impact
			testImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7?' + new Date().getTime();
		},
		
		// Handle network change event
		handleNetworkChange: function() {
			this.checkConnectionSpeed();
			if (isLowBandwidth) {
				UI.showLowBandwidthNotice();
			}
		},
		
		// Detect mobile device
		detectMobileDevice: function() {
			// Check for touch device
			hasTouch = 'ontouchstart' in window || 
					   navigator.maxTouchPoints > 0 || 
					   navigator.msMaxTouchPoints > 0;
					   
			// Check if mobile device based on user agent
			isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			
			// Apply mobile optimizations if needed
			if (isMobileDevice || hasTouch) {
				this.applyMobileOptimizations();
			}
		},
		
		// Apply optimizations for mobile devices
		applyMobileOptimizations: function() {
			// Add mobile-specific class to body
			document.body.classList.add('mutations-mobile-device');
			
			// Add these optimizations when UI is initialized
			document.addEventListener('DOMContentLoaded', function() {
				// Increase touch target sizes
				var touchElements = document.querySelectorAll('.mutation-close, .file-remove, .mutation-submit');
				for (var i = 0; i < touchElements.length; i++) {
					touchElements[i].classList.add('touch-optimized');
				}
			});
		}
	};

	// Image Processing Module
	var ImageProcessor = {
		canvas: null,
		ctx: null,
		currentImage: null,
		originalImage: null,
		editState: {
			rotation: 0,
			crop: null
		},
		
		// Initialize canvas for image processing
		init: function() {
			this.canvas = document.createElement('canvas');
			this.ctx = this.canvas.getContext('2d');
		},
		
		// Load image into canvas
		loadImage: function(imageFile, callback) {
			var reader = new FileReader();
			var self = this;
			
			reader.onload = function(event) {
				var img = new Image();
				img.onload = function() {
					self.originalImage = img;
					self.currentImage = img;
					self.resetEditState();
					if (callback) callback(img);
				};
				img.src = event.target.result;
			};
			
			reader.onerror = function(error) {
				ErrorLogger.logError(error, 'ImageProcessor.loadImage');
				if (callback) callback(null, error);
			};
			
			reader.readAsDataURL(imageFile);
		},
		
		// Reset edit state
		resetEditState: function() {
			this.editState = {
				rotation: 0,
				crop: null
			};
		},
		
		// Rotate image
		rotateImage: function(degrees) {
			this.editState.rotation = (this.editState.rotation + degrees) % 360;
			return this.applyEdits();
		},
		
		// Set crop area
		setCropArea: function(x, y, width, height) {
			this.editState.crop = {
				x: x,
				y: y,
				width: width,
				height: height
			};
			return this.applyEdits();
		},
		
		// Clear crop area
		clearCrop: function() {
			this.editState.crop = null;
			return this.applyEdits();
		},
		
		// Apply all edits to the image
		applyEdits: function() {
			if (!this.originalImage) return null;
			
			var img = this.originalImage;
			var width = img.width;
			var height = img.height;
			
			// Handle rotation
			var rotation = this.editState.rotation;
			var swapDimensions = rotation === 90 || rotation === 270;
			
			// Set canvas dimensions
			this.canvas.width = swapDimensions ? height : width;
			this.canvas.height = swapDimensions ? width : height;
			
			// Clear canvas
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			// Apply rotation
			if (rotation !== 0) {
				this.ctx.save();
				this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
				this.ctx.rotate(rotation * Math.PI / 180);
				this.ctx.drawImage(img, -width / 2, -height / 2, width, height);
				this.ctx.restore();
			} else {
				this.ctx.drawImage(img, 0, 0, width, height);
			}
			
			// Apply crop if specified
			if (this.editState.crop) {
				var crop = this.editState.crop;
				var imageData = this.ctx.getImageData(crop.x, crop.y, crop.width, crop.height);
				
				// Resize canvas to cropped dimensions
				this.canvas.width = crop.width;
				this.canvas.height = crop.height;
				
				// Draw cropped image
				this.ctx.putImageData(imageData, 0, 0);
			}
			
			// Create result image
			var resultDataUrl = this.canvas.toDataURL('image/png');
			var resultImage = new Image();
			resultImage.src = resultDataUrl;
			
			this.currentImage = resultImage;
			return resultDataUrl;
		},
		
		// Compress image for low bandwidth
		compressImage: function(imageFile, callback) {
			// Skip compression if not enabled or not an image
			if (!config.enableCompression || !imageFile || !imageFile.type.match(/^image\//)) {
				if (callback) callback(imageFile);
				return;
			}
			
			var self = this;
			var reader = new FileReader();
			
			reader.onload = function(event) {
				var img = new Image();
				
				img.onload = function() {
					// Calculate dimensions maintaining aspect ratio
					var maxDimension = config.mobile.lowResImageSize;
					var width = img.width;
					var height = img.height;
					
					if (width > maxDimension || height > maxDimension) {
						if (width > height) {
							height = Math.round(height * (maxDimension / width));
							width = maxDimension;
						} else {
							width = Math.round(width * (maxDimension / height));
							height = maxDimension;
						}
					}
					
					// Set canvas dimensions
					self.canvas.width = width;
					self.canvas.height = height;
					
					// Draw image at new dimensions
					self.ctx.drawImage(img, 0, 0, width, height);
					
					// Convert to Blob with compression
					self.canvas.toBlob(function(blob) {
						if (blob) {
							// Create new File object
							var compressedFile = new File([blob], imageFile.name, {
								type: 'image/jpeg',
								lastModified: new Date().getTime()
							});
							
							console.log('Image compressed from ' + 
								(imageFile.size / 1024).toFixed(2) + 'KB to ' + 
								(compressedFile.size / 1024).toFixed(2) + 'KB');
								
							if (callback) callback(compressedFile);
						} else {
							// Fallback to original file on error
							console.warn('Image compression failed, using original file');
							if (callback) callback(imageFile);
						}
					}, 'image/jpeg', config.compressionQuality);
				};
				
				img.onerror = function() {
					console.warn('Error loading image for compression');
					if (callback) callback(imageFile);
				};
				
				img.src = event.target.result;
			};
			
			reader.onerror = function() {
				console.warn('Error reading file for compression');
				if (callback) callback(imageFile);
			};
			
			reader.readAsDataURL(imageFile);
		}
	};
	
	// Batch Processing Module
	var BatchProcessor = {
		isProcessing: false,
		currentBatchIndex: 0,
		batchSize: 0,
		
		// Process batch of uploads
		processBatch: function(files, mutationsText) {
			if (!files || files.length === 0) {
				UI.showStatus('No files selected for batch upload', 'error');
				return;
			}
			
			// Limit number of files
			var filesToProcess = Array.from(files).slice(0, config.maxMultipleUploads);
			
			if (filesToProcess.length < files.length) {
				UI.showStatus('Maximum ' + config.maxMultipleUploads + ' files allowed. Processing first ' + 
							  config.maxMultipleUploads + ' files.', 'warning');
			}
			
			// Validate file types
			var validFiles = filesToProcess.filter(function(file) {
				var extension = file.name.split('.').pop().toLowerCase();
				return config.allowedExtensions.indexOf(extension) !== -1;
			});
			
			if (validFiles.length < filesToProcess.length) {
				UI.showStatus((filesToProcess.length - validFiles.length) + 
							  ' invalid file(s) skipped. Only processing valid image files.', 'warning');
			}
			
			if (validFiles.length === 0) {
				UI.showStatus('No valid files to upload. Allowed types: ' + 
							 config.allowedExtensions.join(', '), 'error');
				return;
			}
			
			// Create batch queue
			this.batchSize = validFiles.length;
			this.currentBatchIndex = 0;
			batchQueue = [];
			
			// Split mutations text for multiple files
			var mutationsList = this.splitMutations(mutationsText, validFiles.length);
			
			// Create batch items
			for (var i = 0; i < validFiles.length; i++) {
				batchQueue.push({
					file: validFiles[i],
					mutations: mutationsList[i] || 'mutation',
					status: 'pending',
					error: null
				});
			}
			
			// Update UI for batch processing
			UI.showBatchUI(batchQueue);
			
			// Start processing
			this.isProcessing = true;
			this.processNextBatchItem();
		},
		
		// Process next item in batch
		processNextBatchItem: function() {
			if (!this.isProcessing || this.currentBatchIndex >= this.batchSize) {
				this.completeBatch();
				return;
			}
			
			var batchItem = batchQueue[this.currentBatchIndex];
			
			// Skip already processed items
			if (batchItem.status !== 'pending') {
				this.currentBatchIndex++;
				this.processNextBatchItem();
				return;
			}
			
			// Update status
			batchItem.status = 'processing';
			UI.updateBatchItemStatus(this.currentBatchIndex, 'processing');
			
			// Process with low bandwidth optimization if needed
			if (isLowBandwidth && config.enableCompression) {
				ImageProcessor.compressImage(batchItem.file, function(compressedFile) {
					UploadHandler.processUpload(compressedFile, batchItem.mutations, function(success, error) {
						BatchProcessor.handleBatchItemComplete(success, error);
					});
				});
			} else {
				UploadHandler.processUpload(batchItem.file, batchItem.mutations, function(success, error) {
					BatchProcessor.handleBatchItemComplete(success, error);
				});
			}
		},
		
		// Handle batch item completion
		handleBatchItemComplete: function(success, error) {
			var batchItem = batchQueue[this.currentBatchIndex];
			
			if (success) {
				batchItem.status = 'success';
				uploadStats.success++;
			} else {
				batchItem.status = 'error';
				batchItem.error = error;
				uploadStats.failed++;
			}
			
			UI.updateBatchItemStatus(this.currentBatchIndex, batchItem.status, error);
			
			// Move to next item
			this.currentBatchIndex++;
			
			// Update overall progress
			UI.updateBatchProgress(this.currentBatchIndex, this.batchSize);
			
			// Process next item after a short delay
			setTimeout(function() {
				BatchProcessor.processNextBatchItem();
			}, 500);
		},
		
		// Complete batch processing
		completeBatch: function() {
			this.isProcessing = false;
			uploadStats.lastUpload = new Date();
			
			var successCount = batchQueue.filter(function(item) { 
				return item.status === 'success'; 
			}).length;
			
			var errorCount = batchQueue.filter(function(item) { 
				return item.status === 'error'; 
			}).length;
			
			var message = 'Batch upload complete: ' + successCount + ' successful, ' + errorCount + ' failed.';
			var type = errorCount > 0 ? 'warning' : 'success';
			
			UI.showStatus(message, type);
			UI.completeBatchUI(successCount, errorCount);
		},
		
		// Split mutations text into chunks for multiple files
		splitMutations: function(text, count) {
			if (!text) return Array(count).fill('mutation');
			
			// Check if comma-separated
			if (text.indexOf(',') !== -1) {
				return text.split(',')
					.map(function(item) { return item.trim(); })
					.filter(function(item) { return item; })
					.slice(0, count);
			}
			
			// Check if space-separated
			if (text.indexOf(' ') !== -1) {
				return text.split(' ')
					.map(function(item) { return item.trim(); })
					.filter(function(item) { return item; })
					.slice(0, count);
			}
			
			// Single mutation, duplicate for all files
			return Array(count).fill(text);
		},
		
		// Cancel batch processing
		cancelBatch: function() {
			this.isProcessing = false;
			var pendingItems = batchQueue.filter(function(item) {
				return item.status === 'pending';
			});
			
			pendingItems.forEach(function(item) {
				item.status = 'cancelled';
			});
			
			UI.showStatus('Batch upload cancelled. Completed: ' + 
						 (this.currentBatchIndex) + '/' + this.batchSize, 'warning');
			UI.completeBatchUI(this.currentBatchIndex, 0, true);
		}
	};
	
	// Utilities module
	var Utilities = {
		// Clean gallery structure
		cleanGalleryStructure: function(content) {
			var lines = content.split('\n').map(function(line) {
				return line.trim();
			}).filter(function(line) {
				return line && !line.match(/^}}$/);
			});

			var galleryStartIndex = -1;
			var galleryEndIndex = -1;

			// Find gallery tag positions
			for (var i = 0; i < lines.length; i++) {
				if (lines[i].indexOf('<gallery') !== -1) galleryStartIndex = i;
				if (lines[i].indexOf('</gallery>') !== -1) galleryEndIndex = i;
			}

			if (galleryStartIndex === -1 || galleryEndIndex === -1) return content;

			var beforeGallery = lines.slice(0, galleryStartIndex + 1);
			var galleryContent = lines.slice(galleryStartIndex + 1, galleryEndIndex);

			// Clean gallery content
			galleryContent = galleryContent.filter(function(line) {
				return line && !line.match(/^<\/gallery>$/);
			}).map(function(line) {
				return line.replace(/<\/gallery>$/, '').trim();
			});

			// Reconstruct gallery
			var result = beforeGallery.join('\n');
			if (galleryContent.length > 0) {
				result += '\n' + galleryContent.join('\n');
			}
			result += '\n</gallery>\n}}';

			return result;
		},
		
		// Generate unique ID
		generateUniqueId: function() {
			return 'mutation_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
		},
		
		// Convert file size to human-readable format
		formatFileSize: function(bytes) {
			if (bytes === 0) return '0 Bytes';
			
			var k = 1024;
			var sizes = ['Bytes', 'KB', 'MB', 'GB'];
			var i = Math.floor(Math.log(bytes) / Math.log(k));
			
			return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
		},
		
		// Debounce function for performance
		debounce: function(func, wait) {
			var timeout;
			return function() {
				var context = this;
				var args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					func.apply(context, args);
				}, wait);
			};
		},
		
		// Detect browser capabilities
		detectCapabilities: function() {
			var capabilities = {
				fileReader: !!window.FileReader,
				formData: !!window.FormData,
				canvas: !!document.createElement('canvas').getContext,
				webWorkers: !!window.Worker,
				touch: 'ontouchstart' in window,
				dragDrop: 'draggable' in document.createElement('div')
			};
			
			return capabilities;
		}
	};

	// Process upload queue
	processQueue = function() {
		if (uploadQueue.length > 0 && !isUploading) {
			var next = uploadQueue.shift();
			UploadHandler.processUpload(next.file, next.mutations);
		}
	};

	// Public methods
	return {
		// Initialize system
		init: function() {
			// Initialize error logger first for better debugging
			ErrorLogger.init();
			
			try {
				// Initialize core components
				UI.init();
				WorkerHandler.init();
				ButtonManager.init();
				
				// Initialize new features
				NetworkMonitor.init();
				ImageProcessor.init();
				
				// Define processQueue globally
				window.processQueue = function() {
					if (uploadQueue.length > 0 && !isUploading) {
						var next = uploadQueue.shift();
						UploadHandler.processUpload(next.file, next.mutations);
					}
				};
				
				// Also set local reference
				processQueue = window.processQueue;
				
				console.log('Mutations Gallery Upload System initialized successfully.');
			} catch (error) {
				ErrorLogger.logError(error, 'MutationsGallery.init', 'critical');
				console.error('Failed to initialize Mutations Gallery:', error);
			}
		},
		
		// Public method to show error log
		showErrorLog: function() {
			return ErrorLogger.getErrorLogText();
		},
		
		// Public method to access the version
		version: '2.0.0'
	};
})();

// Run after page load
$(document).ready(function() {
	MutationsGallery.init();
});