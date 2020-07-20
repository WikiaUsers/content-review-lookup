/* BlogDraft
 *
 * Saves blog drafts in localStorage, with optionally using a custom save function.
 * Yes, it works with RTE, unlike FindAndReplace. Doesn't mean you should use it.
 * 
 * @author Dorumin
 */

(function() {
  if (
    !window.Promise ||
    mw.config.get('wgCanonicalSpecialPageName') != 'CreateBlogPage' ||
    (window.BlogDraft && window.BlogDraft.init)
  ) return;

  var stupidChevronBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D';

  window.BlogDraft = $.extend(Object.create(null), {
    saveWhileTyping: true,
    saveBeforeUnload: true,
    delay: 5000,
    editor: WikiaEditor.getInstance(),
    _preload: 0,
    getTitle: function() {
      return $('.hiddenTitle').text().split('/').slice(1).join('/');
    },
    getContent: function() {
      return this.editor.getContent();
    },
    setContent: function(wikitext) {
      this.disableAutosave = false;
      this.notice.style.display = 'none';
      return this.editor.setContent(wikitext);
    },
    // -> Promise<Array<title>>
    loadDrafts: function() {
      return Promise.resolve(
        Object.keys(localStorage)
          .filter(function(key) {
            return key.indexOf('BlogDraft-') == 0;
          })
          .map(function(key) {
            return key.slice(10);
          })
      );
    },
    // title -> Promise<content>
    load: function(title) {
      return Promise.resolve(localStorage.getItem('BlogDraft-' + title));
    },
    // -> Promise<>
    save: function() {
      try {
        return Promise.resolve(localStorage.setItem('BlogDraft-' + this.getTitle(), this.getContent()));
      } catch(e) {
        return Promise.reject(e);
      }
    },
    // title -> Promise<>
    del: function(title) {
      return Promise.resolve(localStorage.removeItem('BlogDraft-' + title));
    },
    saveDraft: function(e) {
      if (this.saving) return;
      if (e) {
        e.preventDefault();
      }
      if (this.drafts.indexOf(this.getTitle()) == -1) {
        this.drafts.push(this.getTitle());
        this.save().then(this.appendDraft.bind(this, this.getTitle()));
      } else {
        this.save();
      }
    },
    autoSave: function() {
      if (this.disableAutosave) return;
      this.saveDraft();
    },
    onListClick: function(draft, e) {
      e.preventDefault();
      if (e.target.className == 'remove-draft-button') {
        this.del(draft).then(function() {
          e.currentTarget.remove();
        });
      } else {
        this.load(draft).then(this.setContent.bind(this));
      }
    },
    appendDraft: function(draft) {
      this.ul.appendChild(
        dev.ui({
          type: 'li',
          classes: ['draft-li'],
          children: [
            {
              type: 'a',
              classes: ['load-draft-link'],
              text: draft
            },
            {
              type: 'span',
              classes: ['remove-draft-button']
            }
          ],
          events: {
            click: this.onListClick.bind(this, draft)
          }
        })
      )
    },
    appendModule: function() {
      $('.rail-auto-height').prepend(dev.ui({
        type: 'div',
        classes: ['module', 'blog-draft-module'],
        children: [
          {
            type: 'h3',
            children: [
              {
                type: 'span',
                text: this.i18n.msg('module-header').plain()
              },
              {
                type: 'img',
                classes: ['chevron', 'expand'],
                attr: {
                  src: stupidChevronBase64
                }
              }
            ],
            events: {
              click: function(e) {
                e.preventDefault();

                var chevron = this.querySelector('.chevron'),
                content = this.parentElement.querySelector('.module_content'),
                expanded = chevron.classList.contains('expand');

                chevron.classList.toggle('expand');
                chevron.classList.toggle('collapse');
                content.style.display = expanded ? 'block' : 'none';
              }
            }
          }, {
            type: 'div',
            classes: ['module_content'],
            style: {
              display: 'none'
            },
            children: [
              this.notice = dev.ui({
                type: 'span',
                classes: ['draft-autosave-disabled-notice'],
                style: {
                  display: 'none'
                },
                text: this.i18n.msg('autosave-notice').plain()
              }),
              this.ul = dev.ui({
                type: 'ul',
                classes: ['drafts'],
                children: [
                  {
                    type: 'li',
                    children: [{
                      type: 'img',
                      classes: ['ajax-indicator'],
                      attr: {
                        src: stylepath + '/common/images/ajax.gif'
                      },
                      style: {
                        margin: '20px auto',
                        display: 'block'
                      }
                    }]
                  }
                ]
              }),
              {
                type: 'button',
                classes: ['save-draft-button'],
                text: this.i18n.msg('save-draft').plain(),
                events: {
                  click: this.saveDraft.bind(this)
                }
              }
            ]
          }
        ]
      }));
      this.loadDrafts().then(function(drafts) {
        this.ul.innerHTML = '';
        this.drafts = drafts;
        if (drafts.indexOf(this.getTitle()) != -1) {
          this.notice.style.display = 'block';
          this.disableAutosave = true;
        }
        drafts.forEach(this.appendDraft, this);
      }.bind(this));
    },
    preload: function() {
      if (++this._preload == 2) {
        dev.i18n.loadMessages('BlogDraft').then(this.init.bind(this));
      }
    },
    init: function(i18n) {
      this.i18n = i18n;
      i18n.useUserLang();
      this.appendModule();
      if (this.saveWhileTyping) {
        var iframe = document.querySelector('cke_wysiwyg_frame'),
        textbox = document.getElementById('wpTextbox1');
        if (iframe) {
          iframe.contentDocument.addEventListener('input', $.debounce(this.delay, this.autoSave.bind(this)));
        } else if (textbox) {
          textbox.addEventListener('input', $.debounce(this.delay, this.autoSave.bind(this)));
        } // TODO: Lucy :^)
      }
      if (this.saveBeforeUnload) {
        window.addEventListener('beforeunload', this.saveDraft.bind(this));
      }
      $(document).on('click', '#publish, #wpSave', function() {
        this.saving = true;
        this.del(this.getTitle());
      }.bind(this));
    }
  }, window.BlogDraft);

  // Get resources
  importArticles(
    {
      type: 'script',
      articles: [
        'u:dev:MediaWiki:I18n-js/code.js',
        'u:dev:MediaWiki:UI-js/code.js'
      ]
    },
    {
        type: 'style',
        articles: [
            'u:dev:MediaWiki:BlogDraft.css'
        ]
    }
  );

  mw.hook('dev.ui').add(BlogDraft.preload.bind(BlogDraft));
  mw.hook('dev.i18n').add(BlogDraft.preload.bind(BlogDraft));
})();