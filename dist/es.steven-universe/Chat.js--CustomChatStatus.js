(function() {
  if (mw.config.get('wgCanonicalSpecialPageName') != 'Chat' || !window.Promise) return;

  window.CustomChatStatus = $.extend({
    config: {
      debug: false
    },
    localUser: mw.config.get('wgUserName'),
    statuses: {},
    partTimeouts: {},

    handleStatusUpdate: function(user, data) {
      if (data && data.type) {
        switch(data.type) {
          case 'setStatus': {
            this.statuses[user] = data.status;
            this.updateView(user, data.status);
            if (user === this.localUser) {
              localStorage.setItem('CustomChatStatus', JSON.stringify({
                status: this.statuses[this.localUser]
              }));
            }
            break;
          }
          case 'resetStatus': {
            if (user === this.localUser) {
              localStorage.setItem('CustomChatStatus', JSON.stringify({
                status: ''
              }));
            }
            delete this.statuses[user];
            this.updateView(user, '');
            break;
          }
          case 'requestStatuses': {
            if (this.statuses.hasOwnProperty(this.localUser)) {
              // only send your status if you have one set
              this.send({
                type: 'setStatus',
                status: this.statuses[this.localUser]
              });
            }
            this.refreshView(user);
            break;
          }
          default: {
            console.warn('[CustomChatStatus] unknown event from user ' + user + ': ' + data);
            this.refreshView(user);
            break;
          }
        }
      }
    },

    initModal: function() {
      this.statusModal = new window.dev.modal.Modal({
        title: 'Mensaje de estado',
        closeTitle: 'Cerrar',
        id: 'custom-chat-status',
        classes: ['custom-chat-status'],
        size: 'small',
        content: {
          type: "div",
          classes: [
          "custom-chat-status-main"
          ],
          children: [
          {
            type: "div",
            classes: [
            "subtitle"
            ],
            text: "Escribe tu mensaje de estado (máximo 128 caracteres):"
          },
          {
            type: "input",
            attr: {
              type: "text",
              maxlength: 128
            },
            classes: [
            "status-message"
            ]
          }
          ]
        },
        buttons: [
          {
            primary: true,
            classes: ['btn-save'],    
            text: 'Guardar',
            event: 'setStatus'
          },
          {
            primary: false,
            classes: ['btn-cancel'],
            text: 'Cancelar',
            event: 'close',
          }
        ],
        events: {
          setStatus: function() {
            this.setStatus();
            this.statusModal.close();
          }.bind(this)

        }
      });
      this.statusModal.create();
    },

    initSocket: function() {
      if (this.config.debug) console.log('[CustomChatStatus] attaching socket.io event listener');
      mainRoom.socket.on('updateUser', function(message) {
        var data = JSON.parse(message.data);
        if (this.config.debug) console.log('[CustomChatStatus] updateUser:', data);
        var user = data.attrs.name;
        if (user === this.localUser) this.addChatHeaderListener();

        if (data.attrs.statusMessage === 'CustomChatStatus') {
          var statusData;
          if (this.config.debug) console.log('[CustomChatStatus] received event from user ' + user + ': ' + data.attrs.statusState);
          try {
            statusData = JSON.parse(data.attrs.statusState);
            this.handleStatusUpdate(user, statusData);
          } catch(err) {
            console.error('[CustomChatStatus] Error while parsing: ' + data.attrs.statusState);
            console.error(err);
            this.refreshView(user);
          }
        } else {
          if (this.config.debug) console.log('Updating view for' + user + ': ' + this.statuses[user]);
          this.refreshView(user);
        }
      }.bind(this));
      
      mainRoom.socket.on('join', function(message) {
        var data = JSON.parse(message.data);
        if (this.config.debug) console.log('[CustomChatStatus] join:', data);
        var user = data.attrs.name;
        if (this.partTimeouts.hasOwnProperty(user)) {
          if (this.config.debug) console.log('[CustomChatStatus] removing part timeout for user ' + user);
          clearTimeout(this.partTimeouts[user]);
          delete this.partTimeouts[user];
        }
        if (this.statuses.hasOwnProperty(user)) {
          // update UI if we have a saved status from that user
          this.refreshView(user);
        }
      }.bind(this));

      mainRoom.socket.on('part', function(message) {
        var data = JSON.parse(message.data);
        if (this.config.debug) console.log('[CustomChatStatus] part:', data);
        var user = data.attrs.name;
        if (this.statuses.hasOwnProperty(user) && !this.partTimeouts.hasOwnProperty(user)) {
          if (this.config.debug) console.log('[CustomChatStatus] creating part timeout for user ' + user);            
          this.partTimeouts[user] = setTimeout(function() {
            if (this.config.debug) console.log('[CustomChatStatus] removing data for user ' + user);
            delete this.statuses[user];
            delete this.partTimeouts[user];
          }.bind(this), 45000);
        }
      }.bind(this));

      mainRoom.socket.on('logout', function(message) {
        var data = JSON.parse(message.data);
        if (this.config.debug) console.log('[CustomChatStatus] logout:', data);
        var user = data.attrs.name;
        if (this.statuses.hasOwnProperty(user) && !this.partTimeouts.hasOwnProperty(user)) {
          if (this.config.debug) console.log('[CustomChatStatus] creating part timeout for user ' + user);
          this.partTimeouts[user] = setTimeout(function() {
            if (this.config.debug) console.log('[CustomChatStatus] removing data for user ' + user);                
            delete this.statuses[user];
            delete this.partTimeouts[user];
          }.bind(this), 10000);
        }
      }.bind(this));

    },

    addChatHeaderListener: function() {
      var myStatus = $('.ChatHeader > .User > .details > .status');
      myStatus.on('click', this.openModal.bind(this));
      myStatus.prop('title', 'Clic para cambiar tu mensaje de estado');
    },
    
    initUI: function() {
      var inputAvatar = $('#Write > img');
      inputAvatar.on('click', this.openModal.bind(this));
      inputAvatar.prop('title', 'Clic para cambiar tu mensaje de estado');
      this.addChatHeaderListener();
    },

    initUserView: function() {
      if (this.config.debug) console.log('[CustomChatStatus] replacing UserView');
      $('#user-template')[0].text = $('#user-template')[0].text.replace('<span class="status">', '<span class="status-message"></span>\n     <span class="status">')
      .replace('<li class="edits"><%= editCount %></li>', '<li class="status-message"></li>\n         <li class="edits"><%= editCount %></li>');
      UserView.prototype.template = _.template($('#user-template').html());
    },

    loadSavedStatus: function() {
      var storage = localStorage.getItem('CustomChatStatus');
      if (storage) {
        try {
          var storageData = JSON.parse(storage);
          if (storageData.status.trim()) {
            this.send({
              type: 'setStatus',
              status: storageData.status
            });
          }
        } catch(err) {
          console.error('[CustomChatStatus] Could not load saved status: ' + err.message);
        }
      }
    },

    openModal: function() {
      this.statusModal.show();
      var input = $('.custom-chat-status-main > .status-message');
      input.val(this.statuses[this.localUser] || '');
    },
    
    refreshView: function(user) {
      this.updateView(user, this.statuses[user] || '');
    },

    requestStatuses: function() {
      this.send({
        type: 'requestStatuses'
      });
    },

    send: function(params) {
      var string = JSON.stringify(params);
      if (this.config.debug) console.log('[CustomChatStatus] Sending: ' + string);

      var command = new models.SetStatusCommand({
        statusMessage: "CustomChatStatus",
        statusState: string
      });
      mainRoom.socket.send(command.xport());
    },

    setStatus: function() {
      var input = $('.custom-chat-status-main > .status-message');
      var status = input.val().trim();
      if (this.statuses[this.localUser] === status) return; // don't do anything if the status didn't change
      if (status) {
        this.send({
          type: 'setStatus',
          status: status
        });
      } else {
        this.send({
          type: 'resetStatus'
        });
      }
    },

    updateView: function(user, status) {
      if (this.config.debug) console.log('[CustomChatStatus] Updating UI');
      var userView = (user === this.localUser) ? $(".ChatHeader .User") : $(mainRoom.model.users.findByName(user).view.el);
      var statusElement = $(userView).find(".status-message");
      status = status.trim().substring(0, 128);
      if (status) {
        userView.addClass('has-status');
      } else {
        userView.removeClass('has-status');
      }
      statusElement.text(status);
      statusElement.prop('title', status);
    }

  }, window.CustomChatStatus);

  mw.hook('dev.chat').add(CustomChatStatus.initUserView.bind(CustomChatStatus));
  mw.hook('dev.chat.socket').add(CustomChatStatus.initSocket.bind(CustomChatStatus));
  mw.hook('dev.modal').add(CustomChatStatus.initModal.bind(CustomChatStatus));
  mw.hook('dev.chat.render').add(CustomChatStatus.initUI.bind(CustomChatStatus));
  mw.hook('dev.chat.render').add(CustomChatStatus.requestStatuses.bind(CustomChatStatus));
  mw.hook('dev.chat.render').add(CustomChatStatus.loadSavedStatus.bind(CustomChatStatus));

  importArticles({
    type: 'script',
    articles: [
        'u:dev:Chat-js.js',
        'u:dev:UI-js/code.js',
        'u:dev:Modal.js'
    ]
  });

})();