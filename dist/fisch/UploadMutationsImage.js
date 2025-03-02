/*
 * Mutations Gallery Upload System
 * A streamlined interface for managing mutation images in wiki galleries
 * Created by xGronox/Gronox/v.lad
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
function isSafeElement(element) {
	return element && element.nodeType === 1 && typeof element.querySelectorAll === 'function';
}

function sanitizeFileName(name) {
	return name
		// Convert to proper case (first letter uppercase)
		.replace(/^[a-z]/, function(letter) {
			return letter.toUpperCase();
		})
		// Remove illegal characters (keep only alphanumeric, spaces, hyphens, and underscores)
		.replace(/[^a-zA-Z0-9\s\-_]/g, '')
		// Replace multiple spaces/underscores with single underscore
		.replace(/[\s_]+/g, '_')
		// Remove leading/trailing underscores
		.replace(/^_+|_+$/g, '');
}

$(document).ready(function() {
	var isUploading = false;
	var uploadQueue = [];

	var modalHTML = '<div id="mutation-modal" style="display:none;" class="mutation-modal">' +
		'<div class="mutation-modal-content">' +
		'<div class="mutation-close"></div>' +
		'<h2>Upload Mutation Image</h2>' +
		'<form id="mutation-form">' +
		'<div class="file-input-wrapper">' +
		'<input type="file" id="mutation-image" accept="image/*" required>' +
		'<div class="file-info" style="display:none;">' +
		'<span class="file-name"></span>' +
		'<input type="text" class="file-name-edit" style="display:none;">' +
		'<div class="file-remove"></div>' +
		'</div>' +
		'</div>' +
		'<div id="image-preview-container" style="display:none;">' +
		'<div class="preview-title">Preview image:</div>' +
		'<img id="image-preview" src="" alt="Preview">' +
		'</div>' +
		'<input type="text" class="mutation-input" id="mutation-names" placeholder="> Enter only mutations (comma-separated)" required>' +
		'<button type="submit" class="mutation-submit">Upload</button>' +
		'</form>' +
		'<div id="upload-status"></div>' +
		'</div>' +
		'</div>';

	$('body').append(modalHTML);

	$('#mutation-image').on('change', function(e) {
		var file = e.target.files[0];
		if (file) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#image-preview').attr('src', e.target.result);
				$('#image-preview-container').fadeIn();
			};
			reader.readAsDataURL(file);
		} else {
			$('#image-preview-container').fadeOut();
		}
	});

	function cleanGalleryStructure(content) {
		var lines = content.split('\n').map(function(line) {
			return line.trim();
		}).filter(function(line) {
			return line && !line.match(/^}}$/);
		});


		var galleryStartIndex = -1;
		var galleryEndIndex = -1;

		for (var i = 0; i < lines.length; i++) {
			if (lines[i].indexOf('<gallery') !== -1) galleryStartIndex = i;
			if (lines[i].indexOf('</gallery>') !== -1) galleryEndIndex = i;
		}

		if (galleryStartIndex === -1 || galleryEndIndex === -1) return content;

		var beforeGallery = lines.slice(0, galleryStartIndex + 1);
		var galleryContent = lines.slice(galleryStartIndex + 1, galleryEndIndex);

		galleryContent = galleryContent.filter(function(line) {
			return line && !line.match(/^<\/gallery>$/);
		}).map(function(line) {
			return line.replace(/<\/gallery>$/, '').trim();
		});

		var result = beforeGallery.join('\n');
		if (galleryContent.length > 0) {
			result += '\n' + galleryContent.join('\n');
		}
		result += '\n</gallery>\n}}';

		return result;
	}
	
    $(document).on('keydown', function(e) {
        if ($('#mutation-modal').is(':visible')) {
            if (e.ctrlKey && e.keyCode === 86) {
                navigator.clipboard.read().then(function(clipboardItems) {
                    clipboardItems.forEach(function(clipboardItem) {
                        clipboardItem.types.forEach(function(type) {
                            if (type.startsWith('image/')) {
                                clipboardItem.getType(type).then(function(blob) {
                                    var file = new File([blob], 'pasted_image_' + new Date().getTime() + '.' + type.split('/')[1], {
                                        type: type
                                    });
                                    
                                    const dataTransfer = new DataTransfer();
                                    dataTransfer.items.add(file);
                                    $('#mutation-image')[0].files = dataTransfer.files;
                                    
                                    $('#mutation-image').trigger('change');
                                });
                            }
                        });
                    });
                }).catch(function(err) {
                    console.error('Failed to read clipboard:', err);
                });
            }
        }
    });

    $('#mutation-modal').on('dragover', function(e) {
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
            $('#mutation-image')[0].files = files;
            $('#mutation-image').trigger('change');
        }
    });

    $('#mutation-modal').on('paste', function(e) {
        var items = (e.clipboardData || e.originalEvent.clipboardData).items;
        
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                var blob = items[i].getAsFile();
                var file = new File([blob], 'pasted_image_' + new Date().getTime() + '.' + blob.type.split('/')[1], {
                    type: blob.type
                });
                
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                $('#mutation-image')[0].files = dataTransfer.files;
                
                $('#mutation-image').trigger('change');
                break;
            }
        }
    });

	function addUploadButtons() {
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

					// drag&drop
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
					return;
				}
			}
		});
	}

	function processQueue() {
		if (uploadQueue.length > 0 && !isUploading) {
			var next = uploadQueue.shift();
			processUpload(next.file, next.mutations);
		}
	}

    function processUpload(file, mutations) {
        if (!file || !mutations) return;
    
        var fileExtension = file.name.split('.').pop().toLowerCase();
        
        // Validate file extension
        var allowedExtensions = ['png', 'gif', 'jpg', 'jpeg'];
        if (!allowedExtensions.includes(fileExtension)) {
            $('#upload-status').html('Error: Invalid file type. Allowed types: ' + allowedExtensions.join(', ')).show();
            return;
        }
    
        // название страницы и очистка
        var pageName = mw.config.get('wgPageName')
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '');
    
        // Очищаем текст мутаций
        var sanitizedMutations = mutations
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '');
    
        // Базовое имя файла без счетчика
        var baseFileName = pageName + '_' + sanitizedMutations;
        
        // Функция для проверки существования файла
        function checkFileExists(counter) {
            var suffix = counter > 0 ? '_(' + counter + ')' : '';
            var testFileName = baseFileName + suffix + '.' + fileExtension;
            
            return new mw.Api().get({
                action: 'query',
                titles: 'File:' + testFileName,
                prop: 'info'
            }).then(function(data) {
                var pages = data.query.pages;
                return !pages[-1]; // Если есть страница с id -1, значит файл не существует
            });
        }
    
        // Рекурсивная функция для поиска свободного имени файла
        function findAvailableFileName(counter) {
            return checkFileExists(counter).then(function(exists) {
                if (!exists) {
                    var suffix = counter > 0 ? '_(' + counter + ')' : '';
                    return baseFileName + suffix + '.' + fileExtension;
                }
                return findAvailableFileName(counter + 1);
            });
        }
    
        // Начинаем с проверки базового имени файла
        findAvailableFileName(0).then(function(newFileName) {
            isUploading = true;
            $('#upload-status').html('Uploading file...').show();
    
            var formData = new FormData();
            formData.append('action', 'upload');
            formData.append('format', 'json');
            formData.append('token', mw.user.tokens.get('csrfToken'));
            formData.append('filename', newFileName);
            formData.append('file', file);
            
            if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                formData.append('filetype', 'image/jpeg');
            }
    
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.upload && response.upload.result === 'Success') {
                        $('#upload-status').html('File uploaded! Searching for gallery section...').show();
    
                        var api = new mw.Api();
                        api.get({
                            action: 'query',
                            prop: 'revisions',
                            titles: mw.config.get('wgPageName'),
                            rvprop: 'content|timestamp',
                            rvslots: 'main',
                            formatversion: '2'
                        }).done(function(data) {
                            var pageContent = data.query.pages[0].revisions[0].slots.main.content;
                            var timestamp = data.query.pages[0].revisions[0].timestamp;
                            // Используем только оригинальный текст мутаций без счетчика
                            var galleryItem = 'File:' + newFileName + '|' + mutations;
    
                            var mutationsSection = pageContent.match(/\{\{MutationsCollapsible\|\s*<gallery[^>]*>[\s\S]*?}}/);
    
                            if (mutationsSection) {
                                var sectionContent = mutationsSection[0];
                                var cleanedContent = cleanGalleryStructure(sectionContent);
                                var updatedContent = cleanedContent.replace('</gallery>', galleryItem + '\n</gallery>');
                                var finalContent = pageContent.replace(mutationsSection[0], updatedContent);
    
                                $('#upload-status').html('Gallery found! Updating content...').show();
    
                                api.postWithToken('csrf', {
                                    action: 'edit',
                                    title: mw.config.get('wgPageName'),
                                    text: finalContent,
                                    summary: 'Added mutation image: ' + newFileName,
                                    basetimestamp: timestamp,
                                    starttimestamp: new Date().toISOString()
                                }).done(function() {
                                    isUploading = false;
                                    processQueue();
                                    $('#upload-status').html('Success! Reloading page...').show();
                                    setTimeout(function() {
                                        location.reload();
                                    }, 1000);
                                }).fail(function(error) {
                                    isUploading = false;
                                    processQueue();
                                    $('#upload-status').html('Error updating gallery: ' + (error.info || error));
                                });
                            } else {
                                isUploading = false;
                                processQueue();
                                $('#upload-status').html('Error: Mutations section not found. The image was uploaded but could not be added to the gallery.').show();
                            }
                        }).fail(function(error) {
                            isUploading = false;
                            processQueue();
                            $('#upload-status').html('Error getting page content: ' + (error.info || error));
                        });
                    } else {
                        isUploading = false;
                        processQueue();
                        // Более подробное сообщение об ошибке
                        var errorMsg = 'Error uploading file: ';
                        if (response.error) {
                            errorMsg += response.error.code + ' - ' + response.error.info;
                        } else if (response.upload && response.upload.result) {
                            errorMsg += response.upload.result;
                        } else if (response.upload && response.upload.warnings) {
                            errorMsg += JSON.stringify(response.upload.warnings);
                        } else {
                            errorMsg += 'Unknown error';
                        }
                        console.log('Full response:', response); // Для отладки
                        $('#upload-status').html(errorMsg).show();
                    }
                },
                error: function(xhr, status, error) {
                    isUploading = false;
                    processQueue();
                    $('#upload-status').html('Error uploading file: ' + (error || status));
                }
            });
        });
    }

	addUploadButtons();

    $('.mutation-close, #mutation-modal').on('click', function(event) {
        // Проверяем, кликнули ли мы по самому модальному окну или по кнопке закрытия
        if (event.target === this) {
            // Сброс всех полей
            $('#mutation-image').val('').show();
            $('.file-info').hide();
            $('.file-name').text('');
            $('.file-name-edit').val('').hide();
            $('#image-preview-container').hide();
            $('#image-preview').attr('src', '');
            $('#upload-status').html('').hide();
            $('#mutation-names').val('');
            
            // Закрытие модального окна
            $('#mutation-modal').hide();
        }
    });

	$(window).click(function(event) {
		if ($(event.target).is('#mutation-modal')) {
			$('#mutation-modal').hide();
			$('#upload-status').html('');
			$('#image-preview-container').hide();
			$('#image-preview').attr('src', '');
		}
	});

	$('#mutation-image').on('change', function(e) {
		var file = e.target.files[0];
		if (file) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#image-preview').attr('src', e.target.result);
				$('#image-preview-container').fadeIn();

				var fileName = file.name;
				var extension = fileName.split('.').pop();
				var nameWithoutExt = fileName.slice(0, -(extension.length + 1));

				$('.file-name').text(file.name);
				$('.file-name-edit').val(nameWithoutExt);
				$('.file-info').fadeIn();
				$(this).hide();
			};
			reader.readAsDataURL(file);
		}
	});

	$('.file-name').on('click', function() {
		$(this).hide();
		$('.file-name-edit').show().focus().select();
	});

	$('.file-name-edit').on('blur keypress', function(e) {
		if (e.type === 'blur' || e.which === 13) {
			var newName = $(this).val();
			var extension = $('#mutation-image')[0].files[0].name.split('.').pop();
			$('.file-name').text(newName + '.' + extension).show();
			$(this).hide();

			if (e.type === 'keypress') {
				e.preventDefault();
			}
		}
	});

	// Обработчик удаления файла
    $('.file-remove').on('click', function() {
        // Сброс input file
        $('#mutation-image').val('').show();
        
        // Скрытие и очистка информации о файле
        $('.file-info').hide();
        $('.file-name').text('');
        $('.file-name-edit').val('').hide();
        
        // Скрытие и очистка превью
        $('#image-preview-container').hide();
        $('#image-preview').attr('src', '');
        
        // Сброс статуса загрузки если есть
        $('#upload-status').html('').hide();
    });

	$('#mutation-form').submit(function(e) {
		e.preventDefault();

		var file = $('#mutation-image')[0].files[0];
		var mutations = $('#mutation-names').val();

		if (file && mutations) {
			if (isUploading) {
				$('#upload-status').html('Another upload is in progress, your request has been queued...').show();
				uploadQueue.push({
					file: file,
					mutations: mutations,
					newFileName: $('#mutation-filename').val() + '.' + file.name.split('.').pop()
				});
				return;
			}

			// Создаем новый файл с измененным именем
			var extension = file.name.split('.').pop().toLowerCase();
			var newFileName = $('#mutation-filename').val() + '.' + extension;

			// Создаем новый File объект с новым именем
			var newFile = new File([file], newFileName, {
				type: file.type,
				lastModified: file.lastModified
			});

			processUpload(newFile, mutations);
		}
	});

	$(window).on('beforeunload', function() {
		if (isUploading) {
			return 'An upload is in progress. Are you sure you want to leave?';
		}
	});
});