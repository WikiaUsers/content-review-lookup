/**
 * ModBlock.js - Enhanced Version with Secret Space Support
 */
;(function($, mw) {
  'use strict';
  
  if (!$ || !mw || !mw.config) {
      console.log('%cModBlock: Initialization error', 'color: red; font-weight: bold');
      return;
  }
  
  // Конфигурация
  const config = {
      // Скрытое пространство страниц - будет заменено после создания
      secretSpace: '(Main):',
      configPage: 'ModBlock/config',    // Страница с настройками доступа и конфигурацией
      credentialsPage: 'ModBlock/session' // Страница с fandom_session
  };
  
  // Глобальные переменные для хранения состояния
  let adminCookies = null;     // Куки администратора
  let adminToken = null;       // Токен для API-запросов
  let originalCookies = null;  // Оригинальные куки пользователя
  let allowedUsers = [];       // Список пользователей с доступом к ModBlock
  let configLoaded = false;    // Флаг загрузки конфигурации
  
  /**
   * Загружает конфигурацию ModBlock из скрытого пространства
   * @param {function} callback - Функция обратного вызова (success)
   */
  function loadConfig(callback) {
      if (configLoaded) {
          if (callback) callback(true);
          return;
      }
      
      $.ajax({
          url: mw.util.wikiScript('load'),
          data: {
              title: config.configPage,
              action: 'raw',
              ctype: 'application/json'
          },
          success: function(content) {
              try {
                  if (!content) {
                      console.log('%c' + config.configPage + ' is empty', 'color: red');
                      showStatus('ModBlock configuration not found.', 'error');
                      if (callback) callback(false);
                      return;
                  }
                  
                  // Парсим JSON-конфигурацию
                  const configData = JSON.parse(content);
                  
                  // Извлекаем список разрешенных пользователей
                  if (configData.allowedUsers && Array.isArray(configData.allowedUsers)) {
                      allowedUsers = configData.allowedUsers;
                  }
                  
                  // Если есть другие настройки, загружаем их
                  if (configData.secretSpace) {
                      config.secretSpace = configData.secretSpace;
                  }
                  
                  if (configData.credentialsPage) {
                      config.credentialsPage = configData.credentialsPage;
                  }
                  
                  configLoaded = true;
                  console.log('%cModBlock configuration loaded successfully', 'color: green');
                  
                  if (callback) callback(true);
              } catch (error) {
                  console.log('%cError parsing ModBlock configuration', 'color: red', error);
                  showStatus('Error loading ModBlock configuration: ' + error.message, 'error');
                  if (callback) callback(false);
              }
          },
          error: function(xhr, status, error) {
              console.log('%cAJAX error fetching ModBlock configuration', 'color: red', error);
              showStatus('Failed to load ModBlock configuration: ' + error, 'error');
              if (callback) callback(false);
          }
      });
  }
  
  /**
   * Проверяет, имеет ли текущий пользователь доступ к ModBlock
   * @returns {boolean} - true, если пользователь имеет доступ
   */
  function hasModBlockAccess() {
      // Проверяем, загружена ли конфигурация
      if (!configLoaded) {
          return false;
      }
      
      // Получаем текущего пользователя
      const currentUser = mw.config.get('wgUserName');
      
      // Если пользователь в списке разрешенных, даем доступ
      if (allowedUsers.includes(currentUser)) {
          return true;
      }
      
      // Проверяем права администратора (sysop всегда имеют доступ)
      const userGroups = mw.config.get('wgUserGroups') || [];
      return userGroups.indexOf('sysop') !== -1;
  }
  
  /**
   * Проверяет наличие прав модератора у текущего пользователя
   * для отображения кнопки ModBlock в интерфейсе
   * @returns {boolean} - true, если пользователь имеет права модератора
   */
  function hasModRights() {
      var userGroups = mw.config.get('wgUserGroups') || [];
      return userGroups.indexOf('sysop') !== -1 || 
             userGroups.indexOf('content-moderator') !== -1 || 
             userGroups.indexOf('staff') !== -1;
  }
  
  /**
   * Загружает сессию администратора (fandom_session) из скрытого пространства
   * @param {function} callback - Функция обратного вызова (success)
   */
  function loadAdminSession(callback) {
      if (adminCookies) {
          if (callback) callback(true);
          return;
      }
      
      $.ajax({
          url: mw.util.wikiScript('load'),
          data: {
              title: config.credentialsPage,
              action: 'raw',
              ctype: 'text/javascript'
          },
          success: function(content) {
              try {
                  if (!content || content.indexOf('fandom_session') === -1) {
                      console.log('%c' + config.credentialsPage + ' is empty or invalid', 'color: red');
                      showStatus('Admin session not found.', 'error');
                      if (callback) callback(false);
                      return;
                  }
                  
                  // Используем регулярное выражение для извлечения fandom_session
                  const sessionMatch = content.match(/fandom_session\s*=\s*["']([^"']+)["']/);
                  if (!sessionMatch || !sessionMatch[1]) {
                      console.log('%cCould not find fandom_session in ' + config.credentialsPage, 'color: red');
                      showStatus('Admin session is invalid.', 'error');
                      if (callback) callback(false);
                      return;
                  }
                  
                  const sessionValue = sessionMatch[1];
                  
                  // Создаем объект с куки
                  adminCookies = {
                      'fandom_session': sessionValue
                  };
                  
                  console.log('%cAdmin session loaded successfully', 'color: green');
                  getAdminToken(callback);
              } catch (error) {
                  console.log('%cError parsing ' + config.credentialsPage + ' content', 'color: red', error);
                  showStatus('Error loading admin session.', 'error');
                  if (callback) callback(false);
              }
          },
          error: function(xhr, status, error) {
              console.log('%cAJAX error fetching admin session', 'color: red', error);
              showStatus('Failed to load admin session: ' + error, 'error');
              if (callback) callback(false);
          }
      });
  }
  
  /**
   * Получает токен администратора для API-запросов
   * @param {function} callback - Функция обратного вызова (success)
   */
  function getAdminToken(callback) {
      if (!adminCookies) {
          loadAdminSession(callback);
          return;
      }
      
      if (adminToken) {
          if (callback) callback(true);
          return;
      }
      
      originalCookies = document.cookie;
      
      try {
          document.cookie = '';
          
          for (var cookieName in adminCookies) {
              if (adminCookies.hasOwnProperty(cookieName)) {
                  document.cookie = cookieName + '=' + adminCookies[cookieName] + '; path=/';
              }
          }
          
          $.ajax({
              url: mw.util.wikiScript('api'),
              data: {
                  action: 'query',
                  meta: 'tokens',
                  format: 'json'
              },
              success: function(data) {
                  document.cookie = originalCookies;
                  
                  if (data && data.query && data.query.tokens && data.query.tokens.csrftoken) {
                      adminToken = data.query.tokens.csrftoken;
                      console.log('%cAdmin token obtained successfully', 'color: green');
                      if (callback) callback(true);
                  } else {
                      console.log('%cFailed to get admin token', 'color: red', data);
                      showStatus('Failed to get admin authorization token.', 'error');
                      if (callback) callback(false);
                  }
              },
              error: function(xhr, status, error) {
                  document.cookie = originalCookies;
                  
                  console.log('%cAJAX error getting admin token', 'color: red', error);
                  showStatus('Error obtaining admin token: ' + error, 'error');
                  if (callback) callback(false);
              }
          });
      } catch (e) {
          document.cookie = originalCookies;
          
          console.log('%cError setting admin cookies', 'color: red', e);
          showStatus('Error setting admin cookies: ' + e.message, 'error');
          if (callback) callback(false);
      }
  }
  
  /**
   * Выполняет действие от имени администратора
   * @param {object} actionData - Данные для API-запроса
   * @param {function} successCallback - Функция обратного вызова при успехе
   * @param {function} errorCallback - Функция обратного вызова при ошибке
   */
  function performAdminAction(actionData, successCallback, errorCallback) {
      if (!adminToken) {
          getAdminToken(function(success) {
              if (success) {
                  performAdminAction(actionData, successCallback, errorCallback);
              } else {
                  if (errorCallback) errorCallback('Failed to obtain admin token');
              }
          });
          return;
      }
      
      originalCookies = document.cookie;
      
      try {
          document.cookie = '';
          
          for (var cookieName in adminCookies) {
              if (adminCookies.hasOwnProperty(cookieName)) {
                  document.cookie = cookieName + '=' + adminCookies[cookieName] + '; path=/';
              }
          }
          
          actionData.token = adminToken;
          actionData.format = 'json';
          
          $.ajax({
              url: mw.util.wikiScript('api'),
              type: 'POST',
              data: actionData,
              success: function(data) {
                  document.cookie = originalCookies;
                  
                  if (successCallback) successCallback(data);
              },
              error: function(xhr, status, error) {
                  document.cookie = originalCookies;
                  
                  console.log('%cAJAX error during admin action', 'color: red', error);
                  if (errorCallback) errorCallback(error);
              }
          });
      } catch (e) {
          document.cookie = originalCookies;
          
          console.log('%cError setting admin cookies for action', 'color: red', e);
          if (errorCallback) errorCallback(e.message);
      }
  }
  
  /**
   * Добавляет кнопку ModBlock в интерфейс
   */
  function addModBlockButton() {
      var $myToolsMenu = $('#my-tools-menu');
      
      if ($myToolsMenu.length && !$('#modblock-link').length) {
          var listItem = $('<li class="overflow" id="modblock-placement-list"><a id="modblock-link" href="javascript:void(0);" title="ModBlock">ModBlock</a></li>');
          $myToolsMenu.append(listItem);
          
          $('#modblock-link').on('click', function(e) {
              e.preventDefault();
              openModBlockModal();
          });
          
          console.log('%cModBlock button added to toolbar', 'color: green');
      }
  }
  
  /**
   * Открывает модальное окно ModBlock
   */
  function openModBlockModal() {
      if (!hasModRights()) {
          alert('You do not have access to this feature. ModBlock is restricted to moderators.');
          return;
      }
      
      // Загружаем конфигурацию перед открытием модального окна
      loadConfig(function(configSuccess) {
          // Проверяем, имеет ли пользователь доступ к ModBlock
          if (!hasModBlockAccess()) {
              alert('You do not have access to ModBlock. Please contact an administrator.');
              return;
          }
          
          if (!$('#modblock-modal').length) {
              createModBlockModal();
          }
          
          $('#modblock-modal').show();
      });
  }
  
  /**
   * Создает модальное окно ModBlock
   */
  function createModBlockModal() {
      var blockReasons = [
          'Vandalism',
          'Spam',
          'Personal attacks',
          'Edit warring',
          'Inappropriate username',
          'Harassment',
          'Inappropriate content',
          'Sock puppetry',
          'Other'
      ];
      
      var blockDurations = [
          '1 hour',
          '2 hours',
          '3 hours',
          '1 day',
          '3 days',
          '1 week',
          '2 weeks',
          '1 month',
          '3 months',
          '6 months',
          '1 year',
          'indefinite',
          'custom'
      ];
      
      var blockOptionsHTML = '';
      for (var i = 0; i < blockReasons.length; i++) {
          blockOptionsHTML += '<option value="' + blockReasons[i] + '">' + blockReasons[i] + '</option>';
      }
      
      var durationOptionsHTML = '';
      for (var i = 0; i < blockDurations.length; i++) {
          durationOptionsHTML += '<option value="' + blockDurations[i] + '">' + blockDurations[i] + '</option>';
      }
      
      var modalHTML = '<div id="modblock-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.7); z-index:9999;">' +
          '<div id="modblock-interface" class="modblock-interface">' +
          '<span id="modblock-close" style="position:absolute; top:10px; right:15px; font-size:20px; cursor:pointer; color:white;">&times;</span>' +
          '<h2 class="modblock-header">Moderator Block Panel</h2>' +
          '<div class="modblock-section">' +
              '<div class="modblock-form">' +
                  '<div class="modblock-form-group">' +
                      '<label for="modblock-username">Username to block:</label>' +
                      '<input type="text" id="modblock-username" placeholder="Enter username" class="modblock-input">' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label for="modblock-reason">Block reason:</label>' +
                      '<select id="modblock-reason" class="modblock-select">' +
                          blockOptionsHTML +
                      '</select>' +
                  '</div>' +
                  '<div id="modblock-custom-reason-container" style="display: none;">' +
                      '<label for="modblock-custom-reason">Custom reason:</label>' +
                      '<input type="text" id="modblock-custom-reason" placeholder="Enter reason" class="modblock-input">' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label for="modblock-duration">Block duration:</label>' +
                      '<select id="modblock-duration" class="modblock-select">' +
                          durationOptionsHTML +
                      '</select>' +
                  '</div>' +
                  '<div id="modblock-custom-duration-container" style="display: none;">' +
                      '<label for="modblock-custom-duration">Custom duration:</label>' +
                      '<input type="text" id="modblock-custom-duration" placeholder="Example: 2 weeks" class="modblock-input">' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label><input type="checkbox" id="modblock-autoblock"> Autoblock last used IP address and subsequent IPs</label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label><input type="checkbox" id="modblock-email"> Prevent user from sending email</label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label><input type="checkbox" id="modblock-talk"> Prevent user from editing their talk page</label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<button id="modblock-submit" class="modblock-button">Block User</button>' +
                      '<div id="modblock-status" class="modblock-status"></div>' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '<div class="modblock-section">' +
              '<h3 class="modblock-subheader">Block Log</h3>' +
              '<div id="modblock-log-container">' +
                  '<table id="modblock-log-table" class="modblock-table">' +
                      '<thead>' +
                          '<tr>' +
                              '<th>Blocked User</th>' +
                              '<th>Blocked By</th>' +
                              '<th>Date</th>' +
                              '<th>Duration</th>' +
                              '<th>Reason</th>' +
                              '<th>Actions</th>' +
                          '</tr>' +
                      '</thead>' +
                      '<tbody id="modblock-log-body">' +
                      '</tbody>' +
                  '</table>' +
              '</div>' +
          '</div>' +
          '<div class="modblock-section">' +
              '<h3 class="modblock-subheader">Debug Information</h3>' +
              '<div class="modblock-debug-info">' +
                  '<div class="modblock-form-group">' +
                      '<label>Current User: <span id="modblock-debug-user">' + mw.config.get('wgUserName') + '</span></label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label>Has ModBlock Access: <span id="modblock-debug-access">' + hasModBlockAccess() + '</span></label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label>Secret Space: <span id="modblock-debug-secret">' + config.secretSpace + '</span></label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label>Session Status: <span id="modblock-debug-session">' + (adminCookies ? 'Loaded' : 'Not Loaded') + '</span></label>' +
                  '</div>' +
                  '<div class="modblock-form-group">' +
                      '<label>Token Status: <span id="modblock-debug-token">' + (adminToken ? 'Obtained' : 'Not Obtained') + '</span></label>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</div>' +
      '</div>';

      $('body').append(modalHTML);
      
      mw.util.addCSS(
          '.modblock-interface { position:relative; width:90%; max-width:800px; margin:50px auto; ' +
          'background-color: var(--theme-page-background-color, #36759c); padding:20px; border-radius:5px; ' +
          'max-height:80vh; overflow-y:auto; border:solid 1px var(--theme-accent-color, #36759c); ' +
          'box-shadow: 0 4px 8px var(--theme-shadow-color, rgba(0,0,0,0.3)); font-family:sans-serif; color:white; }' +
          
          '.modblock-header { padding:5px; background-color:var(--theme-accent-color, #36759c); ' +
          'color:var(--theme-header-text-color, white); border-radius:3px; margin-top:0; text-align:center; }' +
          
          '.modblock-subheader { padding:5px; background-color:var(--theme-accent-color, #36759c); ' +
          'color:var(--theme-header-text-color, white); border-radius:3px; }' +
          
          '.modblock-section { background:var(--theme-page-background-color--secondary, #4a8cbd); ' +
          'border:1px solid var(--theme-border-color, #ddd); border-radius:5px; padding:20px; margin-bottom:20px; color:white; }' +
          
          '.modblock-bot-section { background:var(--theme-page-background-color--secondary, #4a8cbd); ' +
          'border:1px solid var(--theme-border-color, #ddd); border-radius:5px; padding:10px; margin-bottom:20px; color:white; }' +
          
          '.modblock-form-group { margin-bottom:15px; }' +
          
          '.modblock-form-group label { display:block; margin-bottom:5px; font-weight:bold; ' +
          'color:var(--theme-text-color, white); }' +
          
          '.modblock-input, .modblock-select { width:100%; padding:8px; ' +
          'border:1px solid var(--theme-border-color, #a2a9b1); border-radius:2px; font-size:14px; ' +
          'background-color: white; color: #333; }' +
          
          '.modblock-button { transition:all 0.3s ease; ' +
          'background-color:var(--theme-button-background-color, #4CAF50); ' +
          'color:var(--theme-button-text-color, white); border:none; padding:10px 20px; border-radius:4px; ' +
          'cursor:pointer; box-shadow:0 2px 5px var(--theme-shadow-color, rgba(0,0,0,0.2)); font-weight:bold; }' +
          
          '.modblock-button:hover { background-color:var(--theme-button-hover-background-color, #45a049); ' +
          'transform:translateY(-2px); box-shadow:0 4px 8px var(--theme-shadow-color, rgba(0,0,0,0.3)); }' +
          
          '.modblock-status { margin-top:10px; padding:10px; display:none; }' +
          
          '.modblock-status.success { background:#dff0d8; border:1px solid #5cb85c; color:#3c763d; }' +
          
          '.modblock-status.error { background:#f2dede; border:1px solid #d9534f; color:#a94442; }' +
          
          '.modblock-status.info { background:#d9edf7; border:1px solid #31708f; color:#31708f; }' +
          
          '.modblock-unblock-btn { transition:all 0.3s ease; ' +
          'background-color:var(--theme-button-background-color, #ff6d22); ' +
          'color:var(--theme-button-text-color, white); border:none; padding:5px 10px; border-radius:4px; ' +
          'cursor:pointer; box-shadow:0 2px 5px var(--theme-shadow-color, rgba(0,0,0,0.2)); }' +
          
          '.modblock-unblock-btn:hover { background-color:var(--theme-button-hover-background-color, #ff8c55); ' +
          'transform:translateY(-2px); box-shadow:0 4px 8px var(--theme-shadow-color, rgba(0,0,0,0.3)); }' +
          
          '.modblock-table { width:100%; border-collapse:collapse; }' +
          
          '.modblock-table th, .modblock-table td { padding:8px; text-align:left; ' +
          'border:1px solid var(--theme-border-color, white); color:white; }' +
          
          '.modblock-table th { background:var(--theme-accent-color, #36759c); ' +
          'color:var(--theme-header-text-color, white); }' +
          
          '.modblock-debug-info { font-size: 14px; }' +
          
          '.modblock-debug-info label { margin-bottom: 8px; display: block; }'
      );
      
      setupEventListeners();
      loadBlockLogs();
      loadAdminSession(function(success) {
          if (success) {
              showStatus('Admin session loaded successfully', 'info');
              setTimeout(function() {
                  $('#modblock-status').fadeOut();
              }, 3000);
              
              // Обновляем информацию отладки
              $('#modblock-debug-session').text('Loaded');
              $('#modblock-debug-token').text('Obtained');
          } else {
              // Обновляем информацию отладки
              $('#modblock-debug-session').text('Failed to load');
              $('#modblock-debug-token').text('Not obtained');
          }
      });
  }
  
  /**
   * Настраивает обработчики событий для модального окна
   */
  function setupEventListeners() {
      $('#modblock-reason').on('change', function() {
          if ($(this).val() === 'Other') {
              $('#modblock-custom-reason-container').show();
          } else {
              $('#modblock-custom-reason-container').hide();
          }
      });
      
      $('#modblock-duration').on('change', function() {
          if ($(this).val() === 'custom') {
              $('#modblock-custom-duration-container').show();
          } else {
              $('#modblock-custom-duration-container').hide();
          }
      });
      
      $('#modblock-submit').on('click', function() {
          blockUser();
      });
      
      $(document).on('click', '.modblock-unblock-btn', function() {
          var username = $(this).data('username');
          unblockUser(username);
      });
      
      $('#modblock-close').on('click', function() {
          $('#modblock-modal').hide();
      });
      
      $('#modblock-modal').on('click', function(e) {
          if (e.target === this) {
              $(this).hide();
          }
      });
  }
  
  /**
   * Отображает сообщение о статусе операции
   * @param {string} message - Текст сообщения
   * @param {string} type - Тип сообщения ('success', 'error', 'info')
   */
  function showStatus(message, type) {
      var statusEl = $('#modblock-status');
      if (statusEl.length) {
          statusEl.removeClass('success error info').addClass(type);
          statusEl.text(message).show();
          
          if (type === 'success') {
              setTimeout(function() {
                  statusEl.fadeOut();
              }, 5000);
          }
      } else {
          console.log('%cStatus element not found', 'color: orange');
      }
  }
  
  /**
   * Блокирует пользователя
   */
  function blockUser() {
    var username = $('#modblock-username').val().trim();
    var reason = $('#modblock-reason').val();
    var duration = $('#modblock-duration').val();
    
    if (!username) {
        showStatus('Please enter a username to block', 'error');
        return;
    }
    
    if (reason === 'Other') {
        var customReason = $('#modblock-custom-reason').val().trim();
        if (!customReason) {
            showStatus('Please enter a custom reason', 'error');
            return;
        }
        reason = customReason;
    }
    
    if (duration === 'custom') {
        var customDuration = $('#modblock-custom-duration').val().trim();
        if (!customDuration) {
            showStatus('Please enter a custom duration', 'error');
            return;
        }
        duration = customDuration;
    }
    
    var autoblock = $('#modblock-autoblock').is(':checked');
    var preventEmail = $('#modblock-email').is(':checked');
    var preventTalk = $('#modblock-talk').is(':checked');
    
    showStatus('Loading admin token...', 'info');
    
    getAdminToken(function(success) {
        if (!success) {
            showStatus('Failed to get admin token. Unable to block user.', 'error');
            return;
        }
        
        showStatus('Blocking user...', 'info');
        
        var blockData = {
            action: 'block',
            user: username,
            expiry: duration,
            reason: reason + ' (via ModBlock)',
            allowusertalk: preventTalk ? '0' : '1',
            autoblock: autoblock ? '1' : '0'
            // ПРИМЕЧАНИЕ: Параметр 'noemail' удален для предотвращения ошибок доступа
            // noemail: preventEmail ? '1' : '0'  - Было удалено
        };
        
        // Добавляем noemail только если он был явно запрошен и есть права
        if (preventEmail) {
            blockData.noemail = '1';
        }
        
        performAdminAction(blockData, 
            function(data) {
                if (data.block) {
                    console.log('%cUser blocked successfully', 'color: green', data);
                    showStatus('User "' + username + '" has been blocked successfully', 'success');
                    
                    addToBlockLog(username, 'ModBlock Admin', new Date(), duration, reason);
                    
                    $('#modblock-username').val('');
                    $('#modblock-custom-reason').val('');
                    $('#modblock-custom-duration').val('');
                    $('#modblock-autoblock').prop('checked', false);
                    $('#modblock-email').prop('checked', false);
                    $('#modblock-talk').prop('checked', false);
                } else if (data.error) {
                    console.log('%cBlock error', 'color: red', data.error);
                    showStatus('Error: ' + data.error.info, 'error');
                } else {
                    console.log('%cUnknown block response', 'color: orange', data);
                    showStatus('Unknown error occurred while blocking user', 'error');
                }
            },
            function(error) {
                showStatus('Error during block: ' + error, 'error');
            }
        );
    });
  }
  
  /**
   * Разблокирует пользователя
   * @param {string} username - Имя пользователя для разблокировки
   */
  function unblockUser(username) {
      if (!confirm('Are you sure you want to unblock "' + username + '"?')) {
          return;
      }
      
      showStatus('Loading admin token...', 'info');
      
      getAdminToken(function(success) {
          if (!success) {
              showStatus('Failed to get admin token. Unable to unblock user.', 'error');
              return;
          }
          
          showStatus('Unblocking user...', 'info');
          
          // Добавляем информацию о модераторе в причину разблокировки
          var currentUser = mw.config.get('wgUserName');
          var unblockReason = 'Unblocked via ModBlock | (Unblocked by: ' + currentUser + ')';
          
          var unblockData = {
              action: 'unblock',
              user: username,
              reason: unblockReason
          };
          
          performAdminAction(unblockData, 
              function(data) {
                  if (data.unblock) {
                      console.log('%cUser unblocked successfully', 'color: green', data);
                      showStatus('User "' + username + '" has been unblocked successfully', 'success');
                      
                      removeFromBlockLog(username);
                  } else if (data.error) {
                      console.log('%cUnblock error', 'color: red', data.error);
                      showStatus('Error: ' + data.error.info, 'error');
                  } else {
                      console.log('%cUnknown unblock response', 'color: orange', data);
                      showStatus('Unknown error occurred while unblocking user', 'error');
                  }
              },
              function(error) {
                  showStatus('Error during unblock: ' + error, 'error');
              }
          );
      });
  }
  
  /**
   * Загружает журнал блокировок
   */
  function loadBlockLogs() {
      getBlockLogs(function(logs) {
          renderBlockLogs(logs);
      });
  }
  
  /**
   * Получает журнал блокировок
   * @param {function} callback - Функция обратного вызова с журналом
   */
  function getBlockLogs(callback) {
      var logKey = 'modblock-logs-' + mw.config.get('wgDBname');
      var logs = localStorage.getItem(logKey);
      
      if (logs) {
          try {
              logs = JSON.parse(logs);
              callback(logs);
          } catch (e) {
              console.log('%cError parsing block logs', 'color: red', e);
              callback([]);
          }
      } else {
          var api = new mw.Api();
          api.get({
              action: 'query',
              list: 'logevents',
              letype: 'block',
              format: 'json'
          })
          .done(function(data) {
              var logs = [];
              
              if (data && data.query && data.query.logevents) {
                  for (var i = 0; i < data.query.logevents.length; i++) {
                      var logEvent = data.query.logevents[i];
                      var logEntry = {
                          user: (logEvent.title || '').replace(/^User:/, ''),
                          blocker: logEvent.user || 'Unknown',
                          timestamp: new Date(logEvent.timestamp || Date.now()).toISOString(),
                          reason: logEvent.comment || 'No reason given'
                      };
                      
                      if (logEvent.params) {
                          logEntry.duration = logEvent.params.expiry || 'indefinite';
                      } else {
                          logEntry.duration = 'indefinite';
                      }
                      
                      logs.push(logEntry);
                  }
                  
                  localStorage.setItem(logKey, JSON.stringify(logs));
              }
              
              callback(logs);
          })
          .fail(function(xhr, status, error) {
              console.log('%cAJAX error getting block logs', 'color: red', error);
              callback([]);
          });
      }
  }
  
  /**
   * Отображает журнал блокировок в таблице
   * @param {Array} logs - Журнал блокировок
   */
  function renderBlockLogs(logs) {
      var logBody = $('#modblock-log-body');
      if (!logBody.length) {
          console.log('%cLog body element not found', 'color: orange');
          return;
      }
      
      logBody.empty();
      
      if (!logs || logs.length === 0) {
          logBody.html('<tr><td colspan="6" style="text-align: center;">No block logs found</td></tr>');
          return;
      }
      
      for (var i = 0; i < logs.length; i++) {
          var log = logs[i];
          var date = new Date(log.timestamp);
          var formattedDate = date.toLocaleString();
          
          var row = '<tr>' +
              '<td>' + (log.user || 'Unknown') + '</td>' +
              '<td>' + (log.blocker || 'Unknown') + '</td>' +
              '<td>' + formattedDate + '</td>' +
              '<td>' + (log.duration || 'Unknown') + '</td>' +
              '<td>' + (log.reason || 'No reason given') + '</td>' +
              '<td><button class="modblock-unblock-btn" data-username="' + log.user + '">Unblock</button></td>' +
          '</tr>';
          
          logBody.append(row);
      }
  }
  
  /**
   * Добавляет запись в журнал блокировок
   * @param {string} username - Имя заблокированного пользователя
   * @param {string} blocker - Имя пользователя, выполнившего блокировку
   * @param {Date} date - Дата блокировки
   * @param {string} duration - Продолжительность блокировки
   * @param {string} reason - Причина блокировки
   */
  function addToBlockLog(username, blocker, date, duration, reason) {
      var logKey = 'modblock-logs-' + mw.config.get('wgDBname');
      var logs = localStorage.getItem(logKey);
      
      try {
          logs = logs ? JSON.parse(logs) : [];
      } catch (e) {
          logs = [];
      }
      
      logs.unshift({
          user: username,
          blocker: blocker,
          timestamp: date.toISOString(),
          duration: duration,
          reason: reason
      });
      
      localStorage.setItem(logKey, JSON.stringify(logs));
      
      renderBlockLogs(logs);
  }
  
  /**
   * Удаляет записи о пользователе из журнала блокировок
   * @param {string} username - Имя пользователя
   */
  function removeFromBlockLog(username) {
      var logKey = 'modblock-logs-' + mw.config.get('wgDBname');
      var logs = localStorage.getItem(logKey);
      
      try {
          logs = logs ? JSON.parse(logs) : [];
      } catch (e) {
          logs = [];
      }
      
      var newLogs = [];
      for (var i = 0; i < logs.length; i++) {
          if (logs[i].user !== username) {
              newLogs.push(logs[i]);
          }
      }
      
      localStorage.setItem(logKey, JSON.stringify(newLogs));
      
      renderBlockLogs(newLogs);
  }
  
  /**
   * Создает примерный файл конфигурации в формате JSON
   * Для использования в скрытом пространстве
   * @returns {string} - Строка JSON с конфигурацией
   */
  function createExampleConfig() {
      var configObject = {
          // Список пользователей, имеющих доступ к ModBlock
          // Администраторы (sysop) всегда имеют доступ автоматически
          "allowedUsers": [
              "ExampleModerator1",
              "ExampleModerator2",
              "ContentModerator3"
          ],
          
          // Настройки скрытого пространства
          "secretSpace": "(Main):",
          
          // Страница с сессией администратора
          "credentialsPage": "ModBlock/session",
          
          // Дополнительные настройки
          "settings": {
              // Настройки блокировки по умолчанию
              "defaultBlockDuration": "3 days",
              "defaultBlockReason": "Vandalism",
              
              // Опции логирования
              "enableLogging": true,
              "logLocation": "localStorage" // или "wiki"
          }
      };
      
      return JSON.stringify(configObject, null, 4);
  }
  
  /**
   * Создает примерный файл с сессией администратора
   * Для использования в скрытом пространстве
   * @param {string} sessionValue - Значение fandom_session
   * @returns {string} - JavaScript-код с объявлением сессии
   */
  function createExampleSession(sessionValue) {
      var sessionCode = [
          '/**',
          ' * ModBlock Admin Session',
          ' * DO NOT SHARE THIS FILE OR ITS CONTENTS',
          ' */',
          '',
          '// The fandom_session cookie used for admin actions',
          'var fandom_session = "' + (sessionValue || 'PASTE_YOUR_FANDOM_SESSION_HERE') + '";',
          ''
      ].join('\n');
      
      return sessionCode;
  }
  
  // Инициализация ModBlock при загрузке страницы
  if ($('#WikiaBarWrapper').length) {
      addModBlockButton();
  } else {
      $(document).on('ready', function() {
          addModBlockButton();
      });
  }
  
  // Экспортируем полезные функции в глобальный объект для администраторов
  window.ModBlock = {
      // Создает примерный файл конфигурации
      createExampleConfig: createExampleConfig,
      
      // Создает примерный файл с сессией администратора
      createExampleSession: createExampleSession,
      
      // Проверяет наличие доступа к ModBlock
      hasAccess: hasModBlockAccess,
      
      // Загружает конфигурацию
      loadConfig: loadConfig
  };
  
})(window.jQuery, window.mediaWiki);