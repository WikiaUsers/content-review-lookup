// preview button for article comments
// todo: rewrite to unified msgEditApi interface, cuz of clashes w\ other scripts and classic editor itself
(function ($, cp) {
    // create settings
    cp = cp || {};// me
    var mwc = mw.config.get(['wgScriptPath', 'wgTitle', 'wgUserLanguage', 'wgContentLanguage']);
    // error on custom cp.lang with en=nil is intended by design
    cp = $.extend(true, {}, cp, {lang: {
        // language list - start
        en: {preview: 'Preview', cancel: 'Cancel', publish: 'Publish'},
        ar: {preview: 'معاينة', cancel: 'إلغاء', publish: 'نشر'},
        az: {preview: 'İlkin baxılış', cancel: 'Ləğv etmək', publish: 'Nəşr etmək'},
        ba: {preview: 'Байҡау', cancel: 'Бөтөрөү', publish: 'Һаҡлау'},
        be: {preview: 'Перадпрагляд', cancel: 'Скасаванне', publish: 'Захаваць'},
        'be-tarask': {preview: 'Перадпрагляд', cancel: 'Скасаваньне', publish: 'Захаваць'},
        bg: {preview: 'Преглед', cancel: 'Отмени', publish: 'Запази'},
        br: {preview: 'Taol-lagad a-raok embann', cancel: 'Diverkañ', publish: 'Embann'},
        bs: {preview: 'Pregled', cancel: 'Otkaži', publish: 'Objavi'},
        ca: {preview: 'Previsualització', cancel: 'Canceŀla', publish: 'Publica'},
        co: {preview: 'Anteprima', cancel: 'Annulla', publish: 'Publichi'},
        cs: {preview: 'Náhled', cancel: 'Zrušení', publish: 'Udržet'},
        da: {preview: 'Forhåndsvisning', cancel: 'Afbryd', publish: 'Offentliggør'},
        de: {preview: 'Vorschau', cancel: 'Abbrechen', publish: 'Speichern'},
        eml: {preview: 'Anteprimà', cancel: 'Annulla', publish: 'Pubblica'},
        el: {preview: 'Προεπισκόπηση', cancel: 'Ακύρωση', publish: 'Δημοσίευση'},
        eo: {preview: 'Antaŭvido', cancel: 'Nuligi', publish: 'Publikigi'},
        es: {preview: 'Previsualización', cancel: 'Cancelar', publish: 'Publicar'},
        eu: {preview: 'Aurreikuspena', cancel: 'Utzi', publish: 'Argitaratu'},
        fi: {preview: 'Esikatselu', cancel: 'Peruuta', publish: 'Julkaise'},
        fr: {preview: 'Prévisualisation', cancel: 'Annuler', publish: 'Publier'},
        fo: {preview: 'Forskoðan', cancel: 'Ógilda', publish: 'Geva út'},
        fy: {preview: 'Oerlêze', cancel: 'Annulearje', publish: 'Publisearje'},
        ga: {preview: 'Réamhléiriú', cancel: 'Cealaigh', publish: 'Foilsigh'},
        gd: {preview: 'Ro-shealladh', cancel: 'Cuir dheth', publish: 'Foillsich'},
        gl: {preview: 'Previsualización', cancel: 'Cancelar', publish: 'Publicar'},
        gv: {preview: 'Roie-haishbynys', cancel: 'Dolley magh', publish: 'Soilshaghey magh'},
        hi: {preview: 'पूर्वावलोकन', cancel: 'रद्द करें', publish: 'प्रकाशित करें'},
        hu: {preview: 'Előnézet', cancel: 'Töröl', publish: 'Közzétesz'},
        hr: {preview: 'Pregled', cancel: 'Otkazivanje', publish: 'Uštedjeti'},
        id: {preview: 'Pratinjau', cancel: 'Batalkan', publish: 'Terbitkan'},
        is: {preview: 'Forskoða', cancel: 'Hætta við', publish: 'Gefa út'},
        it: {preview: 'Anteprima', cancel: 'Annulla', publish: 'Pubblica'},
        ja: {preview: 'プレビュー', cancel: '取り消し', publish: '保存'},
        ka: {preview: 'გადახედვა', cancel: 'გაუქმება', publish: 'გამოქვეყნება'},
        kk: {preview: 'Алдын-ала қарау', cancel: 'Болдырмау', publish: 'Жариялау'},
        kn: {preview: 'ಪೂರ್ವವೀಕ್ಷಣೆ', cancel: 'ರದ್ದುಮಾಡು', publish: 'ಪ್ರಕಟಿಸು'},
        ko: {preview: '미리보기', cancel: '취소', publish: '작성하기'},
        la: {preview: 'Prospectus', cancel: 'Abrogare', publish: 'Divulgare'},
        li: {preview: 'Veurvertuining', cancel: 'Braek aaf', publish: 'Bring oet'},
        mhr: {preview: 'Ончылгоч ончалаш', cancel: 'Шӧраш', publish: 'Аныклаш'},
        mk: {preview: 'Преглед', cancel: 'Откажи', publish: 'Објави'},
        mo: {preview: 'Превизуализаре', cancel: 'Анулязэ', publish: 'Публикэ'},
        mrj: {preview: 'Ончылгоч тӹшлен', cancel: 'Вашталтыме', publish: 'Перегӹмӹ'},
        nap: {preview: 'Anteprima', cancel: 'Annulla', publish: 'Pubblìc'},
        nds: {preview: 'Vörschau', cancel: 'Afbreken', publish: 'Afspiekern'},
        nl: {preview: 'Voorvertoning', cancel: 'Annuleren', publish: 'Publiceren'},
        nn: {preview: 'Førehandsvis', cancel: 'Avbryt', publish: 'Publiser'},
        no: {preview: 'Forhåndsvisning', cancel: 'Avbryt', publish: 'Publiser'},
        oc: {preview: 'Previsualizacion', cancel: 'Anullar', publish: 'Publicar'},
        pl: {preview: 'Podgląd', cancel: 'Anuluj', publish: 'Publikuj'},
        pt: {preview: 'Visualizar', cancel: 'Voltar', publish: 'Publicar'},
        ro: {preview: 'Previzualizare', cancel: 'Anulează', publish: 'Publică'},
        ru: {preview: 'Предпросмотр', cancel: 'Отмена', publish: 'Сохранить'},
        sk: {preview: 'Náhľad', cancel: 'Zrušenie', publish: 'Uložiť'},
        sl: {preview: 'Predogled', cancel: 'Prekliči', publish: 'Shrani'},
        sq: {preview: 'Parshtrimi', cancel: 'Anulo', publish: 'Publikoj'},
        sr: {preview: 'Преглед', cancel: 'Откажи', publish: 'Објави'},
        'sr-el': {preview: 'Pregled', cancel: 'Otkaži', publish: 'Objavi'},
        sv: {preview: 'Förhandsgranskning', cancel: 'Avbryt', publish: 'Publicera'},
        tr: {preview: 'Önizle', cancel: 'İptal', publish: 'Yayınla'},
        tt: {preview: 'Алдан карау', cancel: 'Бетерү', publish: 'Саклап'},
        'tt-latn': {preview: 'Aldan karau', cancel: 'Beterü', publish: 'Saklap'},
        udm: {preview: 'Учке-бери', cancel: 'Воштонъя', publish: 'Утьыны'},
        uk: {preview: 'Перегляд', cancel: 'Скасування', publish: 'Зберегти'},
        ur: {preview: 'پیشگی دیکهنا', cancel: 'منسوخ کرنا', publish: 'نشر کرنا'},
        val: {preview: 'Previsualisació', cancel: 'Cancelar', publish: 'Publicar'},
        vi: {preview: 'Xem trước', cancel: 'Hủy bỏ', publish: 'Xuất bản'},
        zh: {preview: '预览', cancel: '取消', publish: '发布'},
        'zh-hans': {preview: '预览', cancel: '取消', publish: '发布'},
        'zh-cn': {preview: '预览', cancel: '取消', publish: '发布'},
        'zh-hant': {preview: '預覽', cancel: '取消', publish: '發佈'},
        'zh-tw': {preview: '預覽', cancel: '取消', publish: '發佈'},
        'zh-hk': {preview: '預覽', cancel: '取消', publish: '發佈'},
        // language list - stop
    }});// not just $.extend(true, cp, …). because of reasons.

    window.fng.cp = cp;

    var urlVars = $.getUrlVars();
    cp.debug = cp.debug || urlVars.debug;
    // throbber
    var throbberSrc = null;

    var log = cp.log = function () {
        if (!cp.debug) return;
        log.meth = console.log;
        // console methods
        log.logs = log.logs || {
            'debug': 'debug',
            'error': 'error',
            'info': 'info',
            'log': 'log',
            'warn': 'warn'
        };
        var a = [].slice.call(arguments);
        log.method = log.logs[(a[0] || '').toString().toLowerCase()];
        if (log.method) {
            a.splice(0, 1);
            log.meth = console[log.method];
        }
        a.unshift('cp');
        log.meth.apply(this, a);
    };// log
    
    function chkThrobberSrc (src) {
        // is src belongs to wikia
        if (!src) return false;
        var url;
        try {
            url = new URL(src);
            return (/(\.wikia\.com|\.fandom\.com|\.wikia\.nocookie\.net)$/.test(url.host));
        }
        catch (e) {
            return false;
        }
        return false;
    }// chkthrobbersrc
    
    cp.rte2wiki = function (content) {
        // extract wikitext from rte-content
        var c = $('<div>', {html: content});
        c.find('[data-rte-meta]').replaceWith(function () {
            var $this = $(this);
            var jstring = decodeURIComponent($('<div>', {html: $this.data('rteMeta')}).text());
            var jo = JSON.parse(jstring);
            return jo.wikitext ? jo.wikitext : this;
        });// replacewith
        return c.html();
    };// rte2wiki
    
    cp.getContent = function () {
        // get *book content
        log('getcontent', this);
        return this.val();
    };// getcontent
    
    cp.onPreview = function (e) {
        // btnpreview click
        e.preventDefault();
        var MEW = $(e.target).closest('.article-comm-form');// ('.MiniEditorWrapper');
        if (!MEW) {
            log('onpreview mew not found for', e);
            return;
        }
        var editor = MEW.find('.editarea textarea:first').data('wikiaEditor');
        if (!editor) {
            log('onpreview editor not found for', e);
            // monobook presumed is
            // wikiaeditor emulation mode on
            editor = MEW.find('textarea:first');
            editor.element = MEW;
            editor.mode = 'source';
            editor.getContent = cp.getContent;
        }
        cp.e = e;
        cp.editor = editor;
        cp.throb(true);
        var content = editor.getContent();
        // nothing to parse
        if (!content || content.length < 1) {
            cp.throb(false);
            cp.onCancel();
            return;
        }
        if (editor.mode === 'wysiwyg') {
            log('onpreview wysiwyg');
            content = cp.rte2wiki(content);
        }// if wysiwyg
        
        var apiUri = (new mw.Uri({path: mwc.wgScriptPath + '/index.php'}).extend({action: 'ajax',
            rs: 'EditPageLayoutAjax', title: mwc.wgTitle,
            page: 'SpecialCustomEditPage', method: 'preview', content: content}));
        log('onpreview api', apiUri);
        $.getJSON(apiUri)
        .done(function (data) {
            log('onpreview getjson.done', data);
            cp.showPreview(data.html);
        })// getjson.done
        .fail(function (data) {
            log('onpreview getjson.fail', data);
            cp.showPreview('Can\'t parse data.<br>' + data.responseText);
        });// getjson.fail
    };// onpreview
    
    cp.onCancel = function (e) {
        // btncancel click. also, generic remove preview
        if (e && e.preventDefault) e.preventDefault();
        log('oncancel', e);
        // fire trigger to detach attached to previewed content stuff
        $(window).trigger('EditPagePreviewClosed');
        $('.cp-modal').remove();
        $('body').removeClass('cp-blackout-body');
        cp.editor = null;
        cp.e = null;
        $(document).off('keydown', cp.onkeydown);
    };// oncancel
    
    cp.onPublish = function (e) {
        // btnpublish click
        e.stopPropagation();
        log('onpublish', e);
        cp.editor.element.find('input[name=wpArticleSubmit]').click();
        cp.onCancel();
    };// onpublish
    
    cp.throb = function (state) {
        var $throbber,
            $closform = cp.editor ? $(cp.editor.element.context).closest('form') : {};
        if ($closform.length) {
            $throbber = $closform.find('.throbber');
            if (!$throbber.length) return;
            $throbber.css('visibility', state ? 'visible' : 'hidden');
        }// if editor<-form
    };// throb
    
    cp.onkeydown = function (e) {
        // keydown handler. and mouse
        if ($(e.target).closest('.cp-window').length) return;
        if (e.keyCode === 27 || e.button !== undefined) cp.onCancel();
    };// onkeydown
    
    cp.disablePreview = function (target) {
        // disable preview button
        if (!target) return;
        if (!(target instanceof jQuery)) target = $(target);
        var btnpreview = target.closest('.article-comments').find('.buttons .cp-button-preview');
        if (!btnpreview.length) return;
        btnpreview.attr('disabled', 'disabled');
    };// disablepreview
    
    cp.enablePreview = function (target) {
        // enable preview button
        if (!target) return;
        if (!(target instanceof jQuery)) target = $(target);
        var btnpreview = target.closest('.article-comments').find('.buttons .cp-button-preview');
        if (!btnpreview.length) return;
        btnpreview.removeAttr('disabled');
    };// enablepreview
    
    cp.addButtons = function (content) {
        log('addbuttons', content);
        if (!(content instanceof jQuery)) content = $(content);
        var buttons = content.find('>:not(#article-comments-ul) .buttons');
        if (!buttons.length) return;
        buttons.find('.cp-button').remove();
        buttons.append(cp.btnPreview.clone());
        // change throbber
        var $throbber = buttons.find('.throbber');
        if (throbberSrc && $throbber.attr('src') !== throbberSrc) $throbber.attr('src', throbberSrc);
    };// addbuttons
    
    cp.mo = new MutationObserver(function (records, obj) {
        // mutation observer callback
        $.each(records, function () {
            if (!this.addedNodes) return true;
            var arr = [].slice.call(this.addedNodes);
            log('debug', 'mo.arr', arr);
            arr.map(function (v) {
                var $this = $(v);
                log('debug', 'mo.map', $this);
                if ($this.hasClass('article-comments') || $this.hasClass('article-comm-edit-box')) {
                    cp.addButtons($this);
                }// if article-comments
            });// map
        });// each record
    });// mutation observer
    
    cp.init = function () {
        log('init');

        if (cp.clang) {
            log('warn', 'init 2nd init detected');
            return;
        }
        
        // is there smth to do
        if (!$('#WikiaArticleComments').length) {
            log('init no comments found');
            return;
        }
        
        // user-defined throbber
        throbberSrc = chkThrobberSrc(cp.throbber) ? cp.throbber : null;
        // build gui
        // define lang precedence
        cp.userlang = (urlVars.useuserlang || cp.useuserlang) ? mwc.wgUserLanguage : mwc.wgContentLanguage;
        // current lang
        cp.clang = cp.lang[urlVars.uselang || cp.uselang] || cp.lang[cp.userlang] || cp.lang[cp.userlang.split('-')[0]] || cp.lang.en;
        cp.btnPreviewText = cp.clang.preview || (cp.lang[cp.userlang] || cp.lang[cp.userlang.split('-')[0]] || cp.lang.en).preview;
        cp.btnCancelText = cp.clang.cancel || (cp.lang[cp.userlang] || cp.lang[cp.userlang.split('-')[0]] || cp.lang.en).cancel;
        cp.btnPublishText = cp.clang.publish || (cp.lang[cp.userlang] || cp.lang[cp.userlang.split('-')[0]] || cp.lang.en).publish;
        
        var isDark = $('body').hasClass('oasis-dark-theme');
        // dark/light theme-specific styling
        var dlStyle = {
            dark: 'background-color:rgba(200,200,200,0.3);',
            light: 'background-color:rgba(200,200,200,0.85);'
        };
        
        // dark for dark oasis, light for others
        dlStyle.current = isDark ? dlStyle.dark : dlStyle.light;
        
        cp.modal = $('<div>', {
            class: 'cp-modal cp-blackout-modal'
            ,style: 'z-index:10000;position:absolute;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.8);'
        });
        
        cp.window = $('<div>', {
            class: 'cp-window'
            ,style: dlStyle.current + 'z-index:1000;position:absolute;width:700px;height:400px;overflow:visible;padding:5px 20px;'
        });
        
        cp.content = $('<div>', {
            class: 'cp-content'
            // ,id: 'mw-content-text'
            ,style: 'overflow:auto;margin:5px;border-style:groove;border-width:thin;border-color:silver;height:300px;max-height:350px;'
        });
        
        cp.header = $('<div>', {
            class: 'cp-header'
            ,style: 'left:0;right:0;top:0;margin:5px;line-height:2em;'
        });
        
        cp.footer = $('<div>', {
            class: 'cp-footer'
            ,style: 'left:0;right:0;bottom:0;padding-bottom:15px;padding-right:20px;position:absolute;'
        });
        
        cp.btnPreview = $('<input>', {
            class: 'cp-button cp-button-preview wikia-button secondary',
            type: 'button',
            value: cp.btnPreviewText
            ,style: 'float:right;'
        });
        
        cp.btnCancel = $('<input>', {
            class: 'cp-button cp-button-cancel wikia-button secondary',
            type: 'button',
            value: cp.btnCancelText
            ,style: 'float:right;margin-right:7px;'
        });
        
        cp.btnPublish = $('<input>', {
            class: 'cp-button cp-button-publish wikia-button',
            type: 'button',
            value: cp.btnPublishText
            ,style: 'float:right;'
        });
        
        cp.xcancel = $('<a>', {
            class: 'cp-xcancel',
            href: '#',
            text: 'X'
            ,style: 'float:right;font-weight:500;font-size:x-large;'
        });

        cp.header.append(cp.xcancel).append($('<h1>', {text: cp.btnPreviewText}));
        cp.footer.append(cp.btnPublish).append(cp.btnCancel);
        cp.window.append(cp.header)
            .append(cp.content)
            .append(cp.footer);
        cp.modal.append(cp.window);
        // events
        $('body').on('click', '.cp-button-preview', cp.onPreview);
        $('body').on('click', '.cp-button-cancel, .cp-xcancel', cp.onCancel);
        // $('body').on('click', '.cp-xcancel', cp.onCancel);
        $('body').on('click', '.cp-button-publish', cp.onPublish);
        $('body').on('click', '.cp-modal', cp.onkeydown);
        
        // add hook
        var hcb = function(content) {
            // add preview button to new-article-comment
            if (!$(content).hasClass('article-comments')) return;
            mw.hook('wikipage.content').remove(hcb);
            cp.addButtons(content);
            // set observer to add buttons to all mew's
            if (content instanceof jQuery) content = content.get(0);
            log('init.wikipage.content', content);
            cp.mo.observe(content, {childList: true, subtree: true});
        };// hcb
        // remove body y-scroll only if space is enough
        mw.util.addCSS('@media only screen and (min-height:500px) {.cp-blackout-body {overflow-y:hidden} .cp-blackout-modal{overflow-y:scroll}}');
        mw.hook('wikipage.content').add(hcb);
    };// init
    
    cp.showPreview = function (content) {
        log('showpreview content:', content);
        cp.modal.find('.cp-content').html(content);
        // remove title
        cp.modal.find('.cp-content .pagetitle:first').css('display', 'none');

        // .prepend to "fix" gallery-slider searching for id
        // slider fix. change ids to supposed-to-be-unique, then re-init slider
        var slider = cp.modal.find('.wikiaPhotoGallery-slider-body');
        var slides, id, ids = [];
        $.each(slider, function () {
            id = '10000' + this.id.replace(/(wikiaPhotoGallery\-slider\-body\-)(\d)/, '$2');
            this.id = 'wikiaPhotoGallery-slider-body-' + id;
            ids.push(id);
            slides = $(this).find('[class*="wikiaPhotoGallery-slider-"]');
            $.each(slides, function () {
                this.id = this.id.replace(/(wikiaPhotoGallery\-slider\-)(\d)-(\d)/, '$1' + id + '-$3');
            });// each slides
        });// each slider
        $('body').addClass('cp-blackout-body');
        cp.throb(false);
        $('body').prepend(cp.modal);
        cp.modal.find('.cp-window').css({
            left: (window.innerWidth > cp.window.width() ? window.innerWidth / 2 - cp.window.width() / 2 : 0) + $('body').scrollLeft(),
            top: (window.innerHeight > cp.window.height() ? window.innerHeight / 2 - cp.window.height() / 2 : 50) + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
        });
        // enlarge modal: *book fix
        // units are for losers
        if ($('.cp-modal').height() < $('body').height()) {
            $('.cp-modal').height($('body').height());
            $('.cp-modal').css('height', height($('body').height()));
        }
        if ($('.cp-modal').width() < window.innerWidth) {
            $('.cp-modal').width(window.innerWidth);
            $('.cp-modal').css('width', window.innerWidth);
        }
        $(document).on('keydown', cp.onkeydown);// doc.keydown
        mw.hook('wikipage.content').fire($('.cp-modal'));
        // init sliders
        for (var i = 0; i < ids.length; i++) {
            // avoid weird circumstances with lost slider environment
            if (window.WikiaPhotoGallerySlider && window.WikiaPhotoGallerySlider.init)
                window.WikiaPhotoGallerySlider.init(ids[i]);
        }// for ids
    };// showPreview
    
    // doc.rdy
    $(cp.init);
})(jQuery, (window.fng = window.fng || {}).cp);