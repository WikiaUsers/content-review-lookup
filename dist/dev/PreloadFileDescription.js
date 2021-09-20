(function($) {
    function observe(elem, selector, callback) {
        if(MutationObserver) {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if($(node).is(selector)) {
                            $(node).each(callback);
                        }
                    });
                });
            });
            $(elem).each(function() {
                observer.observe(this, { childList: true });
            });
        } else {
            $(elem).on('DOMNodeInserted', selector, callback);
        }
    }

    window.PFD = {
        templates: {},
        defaultLicense: '',
        prevLicense: false,
        overrideLang: false,
        currentTemplate: false,

        init: function() {
            if(typeof PFD_templates == 'object' || typeof PFD_template == 'object') PFD.templates = PFD_templates || PFD_template;
            if(typeof PFD_templates == 'string' || typeof PFD_template == 'string') PFD.templates = [{desc:''+(PFD_templates || PFD_template)}];
            if(typeof PFD_license == 'string') PFD.prevLicense = PFD.defaultLicense = PFD_license;
            if(typeof PFD_language == 'string') PFD.overrideLang = PFD_language;
            if(typeof PFD_messages == 'object') PFD.customMessages(PFD_messages);

            PFD_requireLicense = typeof PFD_requireLicense == 'undefined' ? false : !!PFD_requireLicense;
            PFD_discourageEditorFileUpload = typeof PFD_discourageEditorFileUpload == 'undefined' ? false : !!PFD_discourageEditorFileUpload;

            PFD.setLicense(PFD.defaultLicense);
            PFD.updateForm('#wpUploadDescription');

            if(PFD_requireLicense) PFD.requireLicense('#wpLicense');

            observe('body', '#UploadPhotosWrapper', function () {
                if(!$(this).find('button.wikia-chiclet-button').length) return false;
                if(PFD.updateForm($(this).find('textarea[name=wpUploadDescription]'))) {
                    if(PFD_requireLicense) PFD.requireLicense('#wpLicense');
                    $(this).find('.step-1 .options').show();
                    var a = $(this).find('.advanced a');
                    a.text(a.data("fewer"));
                    $(this).find('.advanced .chevron').addClass('up');
                }
            });
            if(PFD_discourageEditorFileUpload) {
                observe('body', '#ImageUpload', function () {
                    var form = $(this).find('#ImageUploadForm');
                    if(!form.length) return false;
                    if(form.hasClass('pfd-notice')) return false;
                    form.addClass('pfd-notice').hide();
                    var td = form.parent();
                    td.prepend('<div id="pfd-form-notice">' + PFD.msg('discourage-editor-file-upload') + '</div>');
                    td.find('#pfd-form-notice').append(' <button>' + PFD.msg('discourage-continue') + '</button>');
                    td.find('button').on('click', function() {
                        var td = $(this).closest('td');
                        td.find('form').show();
                        td.find('#pfd-form-notice').remove();
                    });
                });
            }
        },
        requireLicense: function(license) {
            license = $(license);
            license.find('option[value=""]').addClass('empty-license');
            license.on('change', function() {
                $this = $(this);
                if($this.val()) {
                    $this.closest('form').find('input[type=submit]').prop('disabled', false).attr('title', '');
                } else {
                    $this.closest('form').find('input[type=submit]').prop('disabled', true).attr('title', PFD.msg('disabled-submit'));
                }
            });
            if(!license.val()) {
                license.closest('form').find('input[type=submit]').prop('disabled', true).attr('title', PFD.msg('disabled-submit'));
            }
        },
        injectUploadPhotos: function() {
            if(UploadPhotos) {
                UploadPhotos.filePathSetInj = UploadPhotos.filePathSet;
                UploadPhotos.filePathSet = PFD.filePathSet;
            }
        },
        filePathSet: function() {
            PFD.changeLicense(PFD.defaultLicense);
            PFD.updateForm($('#UploadPhotos textarea[name=wpUploadDescription]').width('100%'));

            UploadPhotos.advancedA.text(UploadPhotos.advancedA.data("fewer"));
            UploadPhotos.advancedChevron.addClass("up");
            UploadPhotos.options.slideDown("fast");

            UploadPhotos.filePathSetInj.call(this);
        },
        clearLicense: function() {
            PFD.setLicense(PFD.prevLicense);
            PFD.prevLicense = false;
        },
        changeLicense: function(license) {
            var elem = $('#wpLicense');
            if(!PFD.prevLicense) PFD.prevLicense = elem.find('option:selected:first').val();
            PFD.setLicense(license);
        },
        setLicense: function(license) {
            var elem = $('#wpLicense');
            elem.find('option:selected').prop('selected', false);
            elem.find('option[value="'+license+'"]:first').prop('selected', true);
            elem.trigger('change');
        },
        updateForm: function(textarea) {
            if($(textarea).length <= 0) return false;
            if($(textarea).hasClass('pfd-initialized')) return false;
            if($('#wpForReUpload').length && $('#wpForReUpload').val()) return false;

            if(skin == 'monobook') mw.util.addCSS('.tooltip-icon { background-color:#06c; border-radius:6px; border:1px solid #000; color:white; display:inline-block; font-size:10px; height:12px; line-height:12px; margin:0 3px; text-align:center; width:12px; }');

            PFD.textarea = $(textarea).addClass('pfd-initialized');
            PFD.textarea.height('auto').attr('rows', 9);

            if(PFD.templates.length > 1) {
                PFD.textarea.before('<div id="fileDescTemplatesSwitch" style="display:none"><select id="fileDescriptionTemplate"></select>&nbsp;<span style="display:inline-block;vertical-align:middle;cursor:help;" class="tooltip-icon" title="'+PFD.msg('template-change-notice')+'">?</span></div>');
                PFD.textarea.before('<div id="fileDescTemplatesTip" style="padding:2px 5px;"></div>');
                PFD.textarea.after('<div id="fileDescTemplatesMoreInfo" style="padding:4px 5px;"></div>');

                var indent = false;
                for(var x=0;x<PFD.templates.length;x++) {
                    var opt = $('<option />').appendTo('#fileDescriptionTemplate');
                    opt.val(x);

                    if(typeof PFD.templates[x] == 'string') {
                        opt.html(PFD.templates[x]);
                        opt.val('').prop('disabled', true);
                        indent = true;
                    } else if(typeof PFD.templates[x] == 'object') {
                        opt.html(PFD.templates[x].label);
                        if(indent) opt.html('&nbsp;&nbsp;'+opt.html());
                    }
                }
                $('#fileDescriptionTemplate').width(444).change(function() {
                    if(!PFD.changeTemplate($(this).val()))
                        $(this).val(PFD.currentTemplate);
                });
                $('#fileDescTemplatesSwitch').show();
            }
            PFD.changeTemplate(0);
            return true;
        },
        msg: function(name, lang) {
            lang = lang || PFD.overrideLang || wgUserLanguage || wgContentLanguage;
            if(PFD.messages[lang] && PFD.messages[lang][name]) return PFD.messages[lang][name];
            return PFD.messages.en[name] || ('('+name+')');
        },
        changeTemplate: function(id) {
            if(typeof PFD.templates[id] == 'string') id++;
            if(PFD.currentTemplate !== false && PFD.textarea.val() != PFD.templates[PFD.currentTemplate].desc && !confirm(PFD.msg('confirm-overwrite')))
                return false;
            PFD.textarea.val(PFD.templates[id].desc);
            if(PFD.templates[id].license) PFD.changeLicense(PFD.templates[id].license);
            else PFD.clearLicense();
            if(PFD.templates[id].tip) {
                $('#fileDescTemplatesTip').html(PFD.templates[id].tip);
            } else $('#fileDescTemplatesTip').html('');
            if(PFD.templates[id].altdesc) {
                $('#fileDescTemplatesMoreInfo').html(PFD.msg('multiple-versions')+' ');
                $('#fileDescTemplatesMoreInfo').append($('<span class="button" />').html(PFD.templates[id].buttonlabel || PFD.msg('basic-version')).data('id', id).click(function(){
                    if(PFD.isAlt && PFD.textarea.val() != PFD.templates[$(this).data('id')].altdesc && !confirm(PFD.msg('confirm-overwrite')))
                        return false;
                    PFD.textarea.val(PFD.templates[$(this).data('id')].desc)
                    PFD.isAlt = false;
                })).append(' ');
                $('#fileDescTemplatesMoreInfo').append($('<span class="button" />').html(PFD.templates[id].altbuttonlabel || PFD.msg('alternative-version')).data('id', id).click(function(){
                    if(!PFD.isAlt && PFD.textarea.val() != PFD.templates[$(this).data('id')].desc && !confirm(PFD.msg('confirm-overwrite')))
                        return false;
                    PFD.textarea.val(PFD.templates[$(this).data('id')].altdesc)
                    PFD.isAlt = true;
                }));
                $('#fileDescTemplatesMoreInfo').append(' <span style="display:inline-block;vertical-align:middle;cursor:help;" class="tooltip-icon" title="'+PFD.msg('template-change-notice')+'">?</span>');
            } else $('#fileDescTemplatesMoreInfo').html('');
            PFD.currentTemplate = id;
            PFD.isAlt = false;
            return true;
        },
        customMessages: function(messages) {
            if(typeof messages == 'object') {
                for(var x in messages) {
                    if(typeof messages[x] == 'undefined') PFD.messages[x] = {};
                    for(var y in messages[x]) {
                        PFD.messages[x][y] = messages[x][y];
                    }
                }
            }
        },
        messages: {
            'en': {
                'alternative-version': 'Alternative',
                'basic-version': 'Basic',
                'multiple-versions': 'This template is available in two versions:',
                'template-change-notice': 'Changing the template will overwrite current description.',
                'confirm-overwrite': 'Description has been modified.\nDo you want to overwrite it with a new template?',
                'discourage-editor-file-upload': 'This wiki encourages usage of <a href="/wiki/Special:Upload">Special:Upload</a> for uploading files.',
                'discourage-continue': 'Continue',
                'disabled-submit': 'Choose a license in order to upload a file',
            },
            'ar': {
              'alternative-version': 'بديل',
              'basic-version': 'بسيط',
              'multiple-versions': 'هذا القالب متاح بنسختين:',
              'template-change-notice': 'تغيير القالب سيستبدل الوصف الحالي.',
              'confirm-overwrite': 'تم تعديل الوصف.\nهل تريد استبداله بقالب جديد؟',
              'discourage-editor-file-upload': 'هذه الموسوعة تشجع استخدام <a href="/wiki/Special:Upload">خاص:رفع</a> لرفع الملفات.',
              'discourage-continue': 'استمر',
              'disabled-submit': 'اختر رخصة حتى تتمكن من رفع ملف',
            },
            'be': {
                'alternative-version': 'Дадатковая',
                'basic-version': 'Асноўная',
                'multiple-versions': 'Гэты шаблон даступны ў двух версіях:',
                'template-change-notice': 'Змена шаблону будзе перазапісваць бягучае апісанне.',
                'confirm-overwrite': 'Апісанне было зменена.\nВы ўпэўненыя, што не хочаце захаваць гэтыя змены?',
                'discourage-editor-file-upload': 'Выкарыстоўвайце <a href="/wiki/Special:Upload">Адмысловае:Upload</a> для загрузкі файлаў.',
                'discourage-continue': 'Працягнуць',
                'disabled-submit': 'Выберыце ліцэнзію, каб спампаваць файл.',
            },
            'fr': {
                'alternative-version': 'Alternative',
                'basic-version': 'Basique',
                'multiple-versions': 'Ce modèle est disponible en deux versions :',
                'template-change-notice': 'Changer le modèle va remplacer la description actuelle.',
                'confirm-overwrite': 'La description a été modifiée.\nVoulez-vous la remplacer avec un nouveau modèle ?',
                'discourage-editor-file-upload': 'Ce wiki encourage l’utilisation de <a href="/wiki/Special:Upload">Special:Upload</a> pour le téléchargement de fichiers.',
                'discourage-continue': 'Continuer',
                'disabled-submit': 'Choisir une licence pour télécharger un fichier',
            },
            'it': {
                'alternative-version': 'Alternativa',
                'basic-version': 'Base',
                'multiple-versions': 'Questo template è disponibile in due versioni:',
                'template-change-notice': 'Cambiare il template sovrasciverà la descrizione corrente.',
                'confirm-overwrite': 'La descrizione è stata modificata.\nVuoi sovrascriverla con un nuovo template?',
                'discourage-editor-file-upload': 'Questa wiki raccomanda l\'uso di <a href="/wiki/Special:Upload">Speciale:Carica</a> per caricare i file.',
                'discourage-continue': 'Continua',
                'disabled-submit': 'Scegli una licenza in modo da poter caricare il file',
            },
            'nl': {
                'alternative-version': 'Alternatief',
                'basic-version': 'Standaard',
                'multiple-versions': 'Dit sjabloon is beschikbaar in twee versies:',
                'template-change-notice': 'De huidige beschrijving wordt overschreven wanneer het sjabloon wordt gewijzigd.',
                'confirm-overwrite': 'Beschrijving is gewijzigd.\n Overschrijven met een nieuw sjabloon?',
                'discourage-editor-file-upload': 'Deze wiki moedigt het gebruik van <a href="/wiki/Special:Upload">Special:Upload</a> aan voor het uploaden van bestanden.',
                'discourage-continue': 'Doorgaan',
                'disabled-submit': 'Kies een licentie om een bestand te uploaden',
            },
            'pl': {
                'alternative-version': 'Alternatywna',
                'basic-version': 'Podstawowa',
                'multiple-versions': 'Ten szablon jest dostępny w dwóch wersjach:',
                'template-change-notice': 'Zmiana szablonu spowoduje nadpisanie wprowadzonych zmian.',
                'confirm-overwrite': 'Opis został zmieniony.\nChcesz go nadpisać nowym szablonem?',
                'discourage-editor-file-upload': 'Ta wiki zaleca używanie <a href="/wiki/Special:Upload">Specjalna:Prześlij</a> do przesyłania plików.',
                'discourage-continue': 'Kontynuuj',
                'disabled-submit': 'Wybierz licencję aby móc przesłać plik',
            },
            'pt': {
                'alternative-version': 'Alternativa',
                'basic-version': 'Básica',
                'multiple-versions': 'Essa predefinição está disponível em duas versões:',
                'template-change-notice': 'Mudar a predefinição vai sobrescrever a descrição atual.',
                'confirm-overwrite': 'A descrição foi modificada.\nVocê gostaria de sobreescrevê-la com uma nova predefinição?',
                'discourage-editor-file-upload': 'Essa wiki estimula o uso de <a href="/wiki/Special:Upload">Especial:Upload</a> para o upload de arquivos.',
                'discourage-continue': 'Continuar',
                'disabled-submit': 'Escolha uma licensa a fim de carregar o arquivo',
            },
            'ru': {
                'alternative-version': 'Дополнительная',
                'basic-version': 'Основная',
                'multiple-versions': 'Этот шаблон доступен в двух версиях:',
                'template-change-notice': 'Изменение шаблона будет перезаписывать текущее описание.',
                'confirm-overwrite': 'Описание было изменено.\nВы уверены, что не хотите сохранить эти изменения?',
                'discourage-editor-file-upload': 'Используйте <a href="/wiki/Special:Upload">Служебная:Upload</a> для загрузки файлов.',
                'discourage-continue': 'Продолжить',
                'disabled-submit': 'Выберите лицензию, чтобы загрузить файл.',
            },
            'tr': {
                'alternative-version': 'Alternatif',
                'basic-version': 'Temel',
                'multiple-versions': 'Bu şablon iki versiyonda mevcuttur:',
                'template-change-notice': 'Şablonu değiştirmek mevcut açıklamanın üzerine yazacaktır.',
                'confirm-overwrite': 'Açıklama değiştirildi.\nYeni bir şablonla yazmak ister misiniz?',
                'discourage-editor-file-upload': 'Bu wiki, dosyaları yüklemek için <a href="/wiki/Special:Upload">Özel:Upload</a> kullanımını teşvik eder.',
                'discourage-continue': 'Devam et',
                'disabled-submit': 'Dosya yüklemek için bir lisans seçin',
            },
            'uk': {
                'alternative-version': 'Додаткова',
                'basic-version': 'Основна',
                'multiple-versions': 'Цей шаблон доступний у двох версіях:',
                'template-change-notice': 'Зміна шаблону перезаписуватиме поточний опис.',
                'confirm-overwrite': 'Опис було змінено.\nВи впевнені, що не хочете зберегти ці зміни?',
                'discourage-editor-file-upload': 'Використовуйте <a href="/wiki/Special:Upload">Спеціальна:Upload</a> для завантаження файлів.',
                'discourage-continue': 'Продовжити',
                'disabled-submit': 'Виберіть ліцензію, щоб завантажити файл.',
            },
            'qqx': {
                'alternative-version': '(alternative-version)',
                'basic-version': '(basic-version)',
                'multiple-versions': '(multiple-versions)',
                'template-change-notice': '(template-change-notice)',
                'confirm-overwrite': '(confirm-overwrite)',
                'discourage-editor-file-upload': '(discourage-editor-file-upload)',
                'discourage-continue': '(discourage-continue)',
                'disabled-submit': '(disabled-submit)',
            },
        }
    };
    $(function() { PFD.init() });
})(jQuery);