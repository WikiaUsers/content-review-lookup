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
 * - Duplicate image detection (SHA1 verification)
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

// Модульная структура с использованием IIFE
var MutationsGallery = (function() {
	// Приватные переменные
	var isUploading = false;
	var uploadQueue = [];
	var currentTheme = 'auto'; // 'auto', 'light', 'dark'
	
	// Worker для SHA1 вычислений
	var sha1Worker = null;
	var workerCallbacks = {};
	
	// Конфигурация модульной системы
	var config = {
		workerPath: '/load.php?modules=mediawiki.template.mustache&only=scripts&raw=1&hash=sha1-worker.js',
		allowedExtensions: ['png', 'gif', 'jpg', 'jpeg'],
		maxMutationLength: 150,
		uploadDelay: 1000,
		hotkeys: {
			close: 'Escape',
			submit: 'ctrl+Enter',
			paste: 'ctrl+v'
		}
	};

	// Модуль UI - управляет интерфейсом
	var UI = {
		modal: null,
		$form: null,
		$status: null,
		$preview: null,
		$imageInput: null,
		$mutationsInput: null,
		$progressBar: null,
		$progressContainer: null,
		
		init: function() {
			this.createModal();
			this.bindEvents();
			this.detectTheme();
		},
		
		// Определение текущей темы
		detectTheme: function() {
			try {
				// Проверяем наличие тёмной темы на странице
				var isDarkTheme = (
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ||
					document.body.classList.contains('skin-fandomdark') ||
					document.documentElement.classList.contains('theme-dark') ||
					document.body.classList.contains('theme-dark')
				);
				
				// Устанавливаем тему
				currentTheme = isDarkTheme ? 'dark' : 'light';
				this.applyTheme();
				
				// Отслеживаем изменения системной темы
				if (window.matchMedia) {
					window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
						if (currentTheme === 'auto') {
							currentTheme = e.matches ? 'dark' : 'light';
							UI.applyTheme();
						}
					});
				}
			} catch(e) {
				console.warn('Theme detection failed:', e);
				currentTheme = 'light'; // Fallback к светлой теме
			}
		},
		
		// Применение темы к элементам
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
		
		// Создание модального окна и всех элементов UI
		createModal: function() {
			var modalHTML = '<div id="mutation-modal" style="display:none;" class="mutation-modal">' +
				'<div class="mutation-modal-content">' +
				'<div class="mutation-close" title="Close (Esc)"></div>' +
				'<h2>Upload Mutation Image</h2>' +
				'<form id="mutation-form">' +
				'<div class="file-input-wrapper">' +
				'<input type="file" id="mutation-image" accept="image/*" required>' +
				'<div class="file-remove" style="display:none;" title="Remove selected file"></div>' +
				'</div>' +
				'<div id="image-preview-container" style="display:none;">' +
				'<div class="preview-header">' +
				'<div class="preview-title">Preview image</div>' +
				'</div>' +
				'<div class="preview-body">' +
				'<img id="image-preview" src="" alt="Preview">' +
				'</div>' +
				'</div>' +
				'<div id="progress-container" class="progress-container" style="display:none;">' +
				'<div class="progress-bar" id="progress-bar"></div>' +
				'</div>' +
				'<input type="text" class="mutation-input" id="mutation-names" maxlength="150" placeholder="> Enter only mutations (comma-separated)" required>' +
				'<div class="mutation-controls">' +
				'<span class="mutation-shortcut-hint">Ctrl+Enter to upload</span>' +
				'<button type="submit" class="mutation-submit">Upload</button>' +
				'</div>' +
				'</form>' +
				'<div id="upload-status"></div>' +
				'</div>' +
				'</div>';

			$('body').append(modalHTML);
			
			// Кэшируем DOM элементы для быстрого доступа
			this.modal = document.getElementById('mutation-modal');
			this.$form = $('#mutation-form');
			this.$status = $('#upload-status');
			this.$preview = $('#image-preview');
			this.$imageInput = $('#mutation-image');
			this.$mutationsInput = $('#mutation-names');
			
			// Добавление счетчика символов
			this.$mutationsInput.after('<div class="char-counter"><span id="char-count">0</span>/150</div>');
			this.$charCount = $('#char-count');
			
			// Обработчик для подсчета символов
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
			
			// Применяем начальную тему
			this.applyTheme();
		},
		
		// Привязка всех обработчиков событий
		bindEvents: function() {
			// Загрузка файла
			this.$imageInput.on('change', this.handleFileSelect.bind(this));
			
			// Удаление файла
			$('.file-remove').on('click', this.handleFileRemove.bind(this));
			
			// Закрытие модального окна
			$('.mutation-close, #mutation-modal').on('click', this.handleModalClose.bind(this));
			
			// Отправка формы
			this.$form.on('submit', this.handleFormSubmit.bind(this));
			
			// Drag & Drop
			this.setupDragDrop();
			
			// Вставка из буфера обмена
			this.setupClipboardPaste();
			
			// Горячие клавиши
			this.setupHotkeys();
		},
		
		// Настройка горячих клавиш
		setupHotkeys: function() {
			$(document).on('keydown', function(e) {
				// Если модальное окно открыто
				if ($('#mutation-modal').is(':visible')) {
					// Закрытие модального окна по Esc
					if (e.key === 'Escape') {
						$('#mutation-modal').hide();
						UI.resetForm();
					}
					
					// Отправка формы по Ctrl+Enter
					if (e.ctrlKey && e.key === 'Enter') {
						e.preventDefault();
						$('#mutation-form').submit();
					}
				}
			});
		},
		
		// Drag & Drop для файлов
		setupDragDrop: function() {
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
		},
		
		// Вставка изображения из буфера обмена
		setupClipboardPaste: function() {
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
			
			// Специальная обработка для Ctrl+V
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
		},
		
		// Обработка выбора файла
		handleFileSelect: function(e) {
			var file = e.target.files[0];
			if (file) {
				var reader = new FileReader();
				reader.onload = function(e) {
					$('#image-preview').attr('src', e.target.result);
					$('#image-preview-container').fadeIn();
					$('.file-remove').show();
				};
				reader.readAsDataURL(file);
			} else {
				$('#image-preview-container').fadeOut();
				$('.file-remove').hide();
			}
		},
		
		// Удаление выбранного файла
		handleFileRemove: function() {
			// Сбросить поле выбора файла
			$('#mutation-image').val('').show();
			
			// Скрыть кнопку удаления
			$('.file-remove').hide();
			
			// Скрыть и очистить превью
			$('#image-preview-container').hide();
			$('#image-preview').attr('src', '');
			
			// Сбросить статус загрузки если есть
			$('#upload-status').html('').hide();
			
			// Скрыть прогресс-бар
			UI.$progressContainer.hide();
			UI.$progressBar.css('width', '0%');
		},
		
		// Закрытие модального окна
		handleModalClose: function(event) {
			var $target = $(event.target);
			var $modalContent = $('.mutation-modal-content');
			
			// Если это кнопка закрытия или клик вне модального содержимого
			if ($target.hasClass('mutation-close') || 
				($target.is('#mutation-modal') && !$modalContent.has(event.target).length)) {
				this.resetForm();
				$('#mutation-modal').hide();
			}
		},
		
		// Отправка формы
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
			
			// Дополнительная проверка на случайные/бессмысленные строки
			if (/^(.)\1{10,}$/.test(mutations) || // Повторяющиеся символы (например, "aaaaaaaaaa")
				/^[^\s]{20,}$/.test(mutations)) { // Длинное слово без пробелов (вероятно, бессмысленное)
				UI.showStatus('Error: Mutation text appears to be random or meaningless. Please enter valid mutations.', 'error');
				return;
			}

			if (file && mutations) {
				if (isUploading) {
					$('#upload-status').html('Another upload is in progress, your request has been queued...').show();
					uploadQueue.push({
						file: file,
						mutations: mutations
					});
					return;
				}

				UploadHandler.processUpload(file, mutations);
			}
		},
		
		// Сброс формы к начальному состоянию
		resetForm: function() {
			$('#mutation-image').val('').show();
			$('.file-remove').hide();
			$('#image-preview-container').hide();
			$('#image-preview').attr('src', '');
			$('#upload-status').html('').hide();
			$('#mutation-names').val('');
			UI.$progressContainer.hide();
			UI.$progressBar.css('width', '0%');
		},
		
		// Обновление индикатора прогресса
		updateProgress: function(percent) {
			this.$progressContainer.show();
			this.$progressBar.css('width', percent + '%');
			
			// Если загрузка завершена, скрываем индикатор через некоторое время
			if (percent >= 100) {
				setTimeout(function() {
					UI.$progressContainer.fadeOut();
				}, 1000);
			}
		},
		
		// Отображение статуса
		showStatus: function(message, type) {
			this.$status.html(message).show();
			
			// Сброс всех классов статуса
			this.$status.removeClass('status-error status-success status-warning status-info');
			
			// Применение соответствующего класса
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
					// По умолчанию - информационное сообщение
					this.$status.addClass('status-info');
			}
		}
	};

	// Модуль для работы с Web Workers - вычисление SHA1
	var WorkerHandler = {
		init: function() {
			this.createWorker();
		},
		
		// Инициализация воркера для SHA1
		createWorker: function() {
			try {
				// Создаем инлайновый воркер
				var workerBlob = new Blob([`
					self.onmessage = function(e) {
						var data = e.data;
						var id = data.id;
						var fileBuffer = data.buffer;
						
						// Функция для конвертации строки в ArrayBuffer
						function str2ab(str) {
							var buf = new ArrayBuffer(str.length);
							var bufView = new Uint8Array(buf);
							for (var i=0, strLen=str.length; i < strLen; i++) {
								bufView[i] = str.charCodeAt(i);
							}
							return buf;
						}
						
						// Функция для расчета SHA1
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
						
						// Начинаем вычисление SHA1
						sha1(fileBuffer).then(function(result) {
							self.postMessage({ id: id, result: result });
						}).catch(function(error) {
							self.postMessage({ id: id, error: error.message || 'SHA1 calculation failed' });
						});
					};
				`], { type: 'application/javascript' });
				
				var workerUrl = URL.createObjectURL(workerBlob);
				sha1Worker = new Worker(workerUrl);
				
				// Настраиваем обработчик сообщений
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
						delete workerCallbacks[id]; // Очищаем колбэк
					}
				};
				
				// Обработка ошибок
				sha1Worker.onerror = function(error) {
					console.error('Web Worker error:', error);
					sha1Worker = null; // Отключаем воркер при ошибке
				};
			} catch (error) {
				console.warn('Web Worker initialization failed:', error);
				sha1Worker = null; // Воркер не поддерживается или не инициализирован
			}
		},
		
		// Расчет SHA1 через воркер или в основном потоке
		calculateSHA1: function(file) {
			return new Promise(function(resolve, reject) {
				var reader = new FileReader();
				
				reader.onload = function(e) {
					var buffer = e.target.result;
					
					// Если воркер доступен, используем его
					if (sha1Worker) {
						var id = Date.now() + '' + Math.random();
						workerCallbacks[id] = { resolve: resolve, reject: reject };
						
						sha1Worker.postMessage({
							id: id,
							buffer: buffer
						});
					} else {
						// Fallback: вычисляем SHA1 в основном потоке
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
									resolve(null); // Продолжаем без проверки SHA1
								});
						} catch (error) {
							console.warn('SHA-1 calculation error:', error);
							resolve(null); // Продолжаем без проверки SHA1
						}
					}
				};
				
				reader.onerror = function() {
					console.warn('File reading error');
					resolve(null); // Продолжаем без проверки SHA1
				};
				
				reader.readAsArrayBuffer(file);
			});
		}
	};

	// Модуль для работы с API Wiki
	var WikiAPI = {
		// Проверка наличия прав у пользователя
		checkUserPermissions: function() {
			return new Promise(function(resolve, reject) {
				try {
					// Получаем права пользователя через MediaWiki API
					new mw.Api().get({
						action: 'query',
						meta: 'userinfo',
						uiprop: 'rights'
					}).done(function(data) {
						if (data && data.query && data.query.userinfo && data.query.userinfo.rights) {
							var rights = data.query.userinfo.rights;
							// Проверяем наличие прав на загрузку и редактирование
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
		
		// Проверка наличия дубликата по SHA1
		checkDuplicateImage: function(sha1) {
			if (!sha1) return Promise.resolve(null);
			
			return new mw.Api().get({
				action: 'query',
				list: 'allimages',
				aisha1: sha1,
				ailimit: 1
			}).then(function(response) {
				if (response.query && response.query.allimages && response.query.allimages.length > 0) {
					return response.query.allimages[0].name; // Возвращаем имя файла, если найден дубликат
				}
				return null; // Дубликат не найден
			}).catch(function(error) {
				console.warn('Error checking duplicate image:', error);
				return null; // В случае ошибки продолжаем без проверки
			});
		},
		
		// Проверка существования файла в галерее
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
		
		// Получение содержимого галереи
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
		
		// Обновление галереи через AJAX
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
						
						// Заменяем старую секцию на новую
						var finalContent = pageContent.replace(originalContent, updatedContent);
						
						new mw.Api().postWithToken('csrf', {
							action: 'edit',
							title: mw.config.get('wgPageName'),
							text: finalContent,
							summary: 'Added mutation image: ' + galleryItem.split('|')[0],
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
		
		// Проверка и обновление DOM после успешного добавления
		updateDOM: function(galleryItem) {
			try {
				// Находим галерею на странице
				var $gallery = $('.mw-customcollapsible-rodsContent .gallery');
				
				if ($gallery.length) {
					// Создаем новый элемент галереи
					var fileName = galleryItem.split('|')[0];
					var mutationText = galleryItem.split('|')[1];
					
					// Получаем URL миниатюры (для википроекта)
					var wikiUrl = mw.config.get('wgServer') + mw.config.get('wgScriptPath');
					var thumbUrl = wikiUrl + '/Special:FilePath/' + encodeURIComponent(fileName.replace('File:', '')) + '?width=120';
					
					// Создаем элемент
					var $newItem = $('<li class="gallerybox">' +
						'<div class="thumb">' +
						'<div class="image">' +
						'<a href="' + wikiUrl + '/wiki/' + encodeURIComponent(fileName) + '">' +
						'<img alt="' + mutationText + '" src="' + thumbUrl + '" decoding="async" loading="lazy">' +
						'</a></div></div>' +
						'<div class="gallerytext">' + mutationText + '</div>' +
						'</li>');
					
					// Добавляем в галерею
					$gallery.append($newItem);
					
					// Анимируем добавление
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

	// Модуль для обработки загрузки
	var UploadHandler = {
		// Обработка загрузки
		processUpload: function(file, mutations) {
			if (!file || !mutations) {
				UI.showStatus('Error: File or mutation text is missing', true);
				return;
			}
			
			// Валидация текста мутаций
			mutations = mutations.trim();
			if (!mutations) {
				UI.showStatus('Error: Mutation text cannot be empty or only whitespace', true);
				return;
			}
		
			var fileExtension = file.name.split('.').pop().toLowerCase();
			
			// Валидация расширения файла
			if (!config.allowedExtensions.includes(fileExtension)) {
				UI.showStatus('Error: Invalid file type. Allowed types: ' + config.allowedExtensions.join(', '), true);
				isUploading = false;
				processQueue();
				return;
			}
		
			// Очистка и форматирование имени страницы
			var pageName = mw.config.get('wgPageName')
				.replace(/\s+/g, '_')
				.replace(/[^a-zA-Z0-9_]/g, '');
		
			// Очистка текста мутаций
			var sanitizedMutations = mutations
				.replace(/[^a-zA-Z0-9\s]/g, '')
				.replace(/\s+/g, '');
		
			// Базовое имя файла без счетчика
			var baseFileName = pageName + '_' + sanitizedMutations;
			
			isUploading = true;
			UI.showStatus('Checking user permissions...', 'info');
			
			// Проверка разрешений пользователя
			WikiAPI.checkUserPermissions().then(function() {
				UI.showStatus('Checking for duplicate images...', 'info');
				
				// Проверка на дубликаты по SHA1
				return WorkerHandler.calculateSHA1(file).then(function(sha1) {
					if (!sha1) {
						UI.showStatus('Warning: Unable to check for duplicate images. Continuing with upload...', 'warning');
						return null;
					}
					return WikiAPI.checkDuplicateImage(sha1);
				}).then(function(existingFileName) {
					if (existingFileName) {
						UI.showStatus('Found existing image with same content: ' + existingFileName, 'info');
						
						// Проверка наличия файла в текущей галерее
						return WikiAPI.checkImageExistsInGallery(existingFileName).then(function(existsInGallery) {
							if (existsInGallery) {
								UI.showStatus('This image is already in the gallery. Upload canceled.', 'error');
								isUploading = false;
								processQueue();
								return null;
							} else {
								// Используем существующий файл вместо загрузки нового
								var galleryItem = 'File:' + existingFileName + '|' + mutations;
								return UploadHandler.addImageToGallery(galleryItem);
							}
						});
					} else {
						// Проверка существования файла
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
							}).catch(function(error) {
								console.warn('Error checking file existence:', error);
								return false; // Предполагаем, что файл не существует в случае ошибки
							});
						}
					
						// Рекурсивный поиск доступного имени файла
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
						return findAvailableFileName(0).then(function(newFileName) {
							UI.showStatus('Uploading file...', 'info');
							return UploadHandler.uploadFileWithProgress(file, newFileName, mutations);
						});
					}
				});
			}).catch(function(error) {
				isUploading = false;
				processQueue();
				UI.showStatus('Permission error: ' + error, 'error');
			});
		},
		
		// Загрузка файла с отображением прогресса
		uploadFileWithProgress: function(file, fileName, mutations) {
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				var formData = new FormData();
				
				// Подготовка данных для загрузки
				formData.append('action', 'upload');
				formData.append('format', 'json');
				formData.append('token', mw.user.tokens.get('csrfToken'));
				formData.append('filename', fileName);
				formData.append('file', file);
				formData.append('comment', 'Uploaded via UMI: User:' + mw.config.get('wgUserName'));
				
				// Добавление типа для JPEG файлов
				var fileExtension = fileName.split('.').pop().toLowerCase();
				if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
					formData.append('filetype', 'image/jpeg');
				}
				
				// Настройка отслеживания прогресса
				xhr.upload.addEventListener('progress', function(e) {
					if (e.lengthComputable) {
						var percent = Math.round((e.loaded / e.total) * 100);
						UI.updateProgress(percent);
					}
				}, false);
				
				// Обработка завершения загрузки
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
				
				// Обработка ошибок загрузки
				xhr.addEventListener('error', function() {
					reject('Network error during file upload');
				});
				
				xhr.addEventListener('abort', function() {
					reject('File upload was aborted');
				});
				
				// Отправка запроса
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
		
		// Добавление изображения в галерею
		addImageToGallery: function(galleryItem) {
			UI.showStatus('Updating gallery...', 'info');
			
			return WikiAPI.getGalleryContent().then(function(data) {
				var originalContent = data.mutationsSection;
				var fileName = galleryItem.split('|')[0];
				
				// Проверяем, есть ли уже такой файл в галерее
				var fileNameEscaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				var filePattern = new RegExp(fileNameEscaped + '\\|', 'i');
				
				if (filePattern.test(originalContent)) {
					UI.showStatus('This exact file is already in the gallery. No changes made.', 'error');
					isUploading = false;
					processQueue();
					return;
				}
				
				// Форматируем содержимое галереи
				var cleanedContent = Utilities.cleanGalleryStructure(originalContent);
				var updatedContent = cleanedContent.replace('</gallery>', galleryItem + '\n</gallery>');
				
				// Обновляем галерею
				return WikiAPI.updateGallery(originalContent, updatedContent, galleryItem).then(function() {
					isUploading = false;
					processQueue();
					
					// Пробуем обновить DOM без перезагрузки
					var domUpdated = WikiAPI.updateDOM(galleryItem);
					
					if (domUpdated) {
						UI.showStatus('Success! Image added to gallery.', 'success');
						setTimeout(function() {
							$('#mutation-modal').hide();
							UI.resetForm();
						}, config.uploadDelay);
					} else {
						UI.showStatus('Success! Reloading page...', 'success');
						setTimeout(function() {
							location.reload();
						}, config.uploadDelay);
					}
				});
			}).catch(function(error) {
				isUploading = false;
				processQueue();
				UI.showStatus(error, 'error');
			});
		}
	};

	// Модуль для кнопок загрузки
	var ButtonManager = {
		init: function() {
			this.addUploadButtons();
		},
		
		// Добавление кнопок загрузки в заголовки разделов
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
						console.warn('Error adding upload button:', error);
					}
				}
			});
		}
	};

	// Модуль с утилитами
	var Utilities = {
		// Очистка структуры галереи
		cleanGalleryStructure: function(content) {
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
		},
		
		// Обработка очереди загрузок
		processQueue: function() {
			if (uploadQueue.length > 0 && !isUploading) {
				var next = uploadQueue.shift();
				UploadHandler.processUpload(next.file, next.mutations);
			}
		}
	};

	// Публичные методы модуля
	return {
		// Инициализация системы
		init: function() {
			UI.init();
			WorkerHandler.init();
			ButtonManager.init();
			
			// Глобальная ссылка на обработчик очереди
			processQueue = Utilities.processQueue;
		}
	};
})();

// Запуск после загрузки страницы
$(document).ready(function() {
	MutationsGallery.init();
});