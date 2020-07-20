(function() {
  if (mw.config.get('wgCanonicalSpecialPageName') != 'Chat' || !window.Promise) return;

  window.ChatRules = $.extend({
    config: {
      page: 'Project:Reglas/chat',
      buttonText: 'Reglas',
      modalTitle: 'Reglas del chat'
    },

    createButton: function() {
      this.button = new dev.chat.Button({
        name: this.config.modalTitle,
        attr: {
          'class': 'ui-button-rules',
          text: this.config.buttonText,
          click: function click() {
            this.modal.show();
          }.bind(this)
        }
      });
    },

    createModal: function(data) {
      this.modal = new window.dev.modal.Modal({
        buttons: [{
          event: 'close',
          id: 'ui-modal-rules-close',
          primary: true,
          text: 'Cerrar'
        }],
        closeTitle: 'Cerrar',
        content: {
          type: 'div',
          attr: {
            'class': 'ui-modal-rules-main'
          },
          html: data
        },
        id: 'ui-modal-rules',
        size: 'medium',
        title: this.config.modalTitle
      });
      this.modal.create();
    },

    init: function() {
      fetch('./'+ this.config.page +'?action=render').then(function (response) {
        if (response.status !== 200) {
          console.error('[ChatRulesModal] API request error. Status Code: ' + response.status);
          return;
        }
        response.text().then(function (data) {
          mw.hook('dev.modal').add(function() {
            this.createModal(data);
            this.createButton();
          }.bind(this));

        }.bind(this));
      }.bind(this))['catch'](function (err) {
        console.error('[ChatRulesModal] Fetch Error: ', err);
      });
    }

  }, window.ChatRules);

  mw.hook('dev.modal').add(ChatRules.init.bind(ChatRules));

  importArticles({
    type: 'script',
    articles: [
        'u:dev:Chat-js.js',
        'u:dev:UI-js/code.js',
        'u:dev:Modal.js'
    ]
  });

})();