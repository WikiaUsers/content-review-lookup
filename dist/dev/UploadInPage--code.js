/* <pre>
 * @author User:Clear Arrow
 * @version 2.1
 * Upload files using api by User:Gguigui1
 * Features:
 * Allows to upload multiple files at once from the editor
 * Prevents to upload a file without a license (enabled for side-wide, disabled by default for personal use but it can be enabled)
 */

window.UploadFile = (function ($, mw) {
    'use strict';
    var _datalang = {
        en: {
            updone: "You uploaded the file: ",
            duplicate: 'This image is a duplicated ',
            upcopy: "Copy",
            modaltitle: "Upload File",
            closemodal: "Close",
            defaultOpt: "None selected",
            browser: "Please, update your browser!",
            desc: "Description: ",
            problem: "A problem occurred, upload cancelled",
            updateform: "Update form",
            nolicenses: "We couldn't find the licenses, please see MediaWiki:Licenses",
            alreadyname: "There is already a file named like that, please choose another name ",
            error: "Error",
            imagename: "Image",
            licensetext: 'License: ',
            uploadfiles: 'Upload all images',
            nofile: "You have to choose a file to upload it",
            filenamespace: "File:",
            licensetitle: "License",
            licenseerror: "You need to put a license",
            allfiles: "Files uploaded",
            filedescription: 'File description',
            filename: "Name: ",
            deleted: "This file was deleted before, are you sure you want to reupload it?"
        },
        ar: {
            updone: "لقد رفعت الملف: ",
            duplicate: 'هذه الصورة مكررة ',
            upcopy: "انسخ",
            modaltitle: "ارفع ملفًا",
            closemodal: "أغلق",
            defaultOpt: "لم تحدد أي شيء",
            browser: "من فضلك، قم بتحديث متفصحك!",
            desc: "الوصف: ",
            problem: "حدثت مشكلة، أُلغي الرفع",
            updateform: "نموذج الرفع",
            nolicenses: "لم نستطع إيجاد التراخيص، من فضلك انظر ميدياويكي:Licenses",
            alreadyname: "يوجد ملف آخر بهذا الاسم، من فضلك اختر اسمًا آخر ",
            error: "خطأ",
            imagename: "صورة",
            licensetext: 'الترخيص: ',
            uploadfiles: 'ارفع كل الصور',
            nofile: "يجب أن تختار ملفًا حتى ترفعه",
            filenamespace: "ملف:",
            licensetitle: "ترخيص",
            licenseerror: "يجب أن تضع ترخيصًا",
            allfiles: "انتهى رفع الملفات",
            filedescription: 'وصف الملف',
            filename: "الاسم: ",
            deleted: "هذا الملف كان محذوفًا، هل أنت متأكد من أنك تريد إعادة رفعه؟"
        },
        be: {
            updone: "Вы загрузілі файл: ",
            duplicate: 'Гэта выява дублюецца ',
            upcopy: "Скапіяваць",
            modaltitle: "Загрузіць файл",
            closemodal: "Зачыніць",
            defaultOpt: "Не абрана",
            browser: "Калі ласка, абновіце ваш браўзар!",
            desc: "Апісанне: ",
            problem: "Паўстала праблема, загрузка скасавана",
            updateform: "Абнавіць форму",
            nolicenses: "Мы не змаглі знайсці ліцэнзіі, гл. MediaWiki:Licenses",
            alreadyname: "Ужо ёсць файл з такой назвай, калі ласка, абярыце іншае імя ",
            error: "Абмыла",
            imagename: "Выява",
            licensetext: 'Ліцэнзія: ',
            uploadfiles: 'Загрузіць усе выявы',
            nofile: "Вы павінны выбраць файл для яго загрузкі",
            filenamespace: "Файл:",
            licensetitle: "Ліцэнзія",
            licenseerror: "Вам трэба паставіць ліцэнзію",
            allfiles: "Загружаныя файлы",
            filedescription: 'Апісанне файла',
            filename: "Назва: ",
            deleted: "Раней гэты файл быў выдалены, вы ўпэўнены, што хочаце яго перазагрузіць?"
        },
        es: {
            updone: "Has subido el archivo: ",
            duplicate: 'Este archivo es duplicado',
            upcopy: "Copiar",
            modaltitle: "Subir Archivo",
            closemodal: "Cerrar",
            defaultOpt: 'Ninguna seleccionada',
            browser: "Por favor, ¡actualiza tu navegador!",
            desc: "Descripción: ",
            problem: "Ha ocurrido un problema, subida cancelada",
            updateform: "Actualizar formulario",
            nolicenses: "No pudimos encontrar las licencias, por favor revisa MediaWiki:Licenses",
            alreadyname: "Ya hay un archivo con ese nombre, por favor selecciona otro ",
            error: "Error",
            imagename: "Imagen",
            licensetext: 'Licencia: ',
            uploadfiles: 'Subir los archivos',
            nofile: "Tienes que seleccionar un archivo para subirlo",
            filenamespace: "Archivo:",
            licensetitle: "Licencia",
            licenseerror: "Tienes que poner una licencia",
            allfiles: "Archivos subidos",
            filedescription: 'Descripción del archivo',
            filename: "Nombre: ",
            deleted: "Este archivo fue borrado anteriormente, ¿seguro que quieres resubirlo?"
        },
        pl: {
            updone: "Przesłałeś/aś plik: ",
            duplicate: 'Ten obrazek jest zduplikowany ',
            upcopy: "Kopiuj",
            modaltitle: "Prześlij plik",
            closemodal: "Zamknij",
            defaultOpt: "Żaden nie został wybrany",
            browser: "Proszę zaktualizować wyszukiwarkę!",
            desc: "Opis: ",
            problem: "Wystąpił problem, przesyłanie anulowane",
            updateform: "Forma przesyłania nowej wersji pliku",
            nolicenses: "Nie znaleziino licencji, proszę zobaczyć MediaWiki:Licenses",
            alreadyname: "Istnieje już plik o takiej nazwie, proszę wybrać nową nazwę ",
            error: "Błąd",
            imagename: "Obraz",
            licensetext: 'Licencja: ',
            uploadfiles: 'Prześlij wszystkie pliki',
            nofile: "Musisz wybrać plik aby go przesłać",
            filenamespace: "Plik:",
            licensetitle: "Licencja",
            licenseerror: "Musisz wybrać licencję",
            allfiles: "Pliki zostały przesłane",
            filedescription: 'Opis pliku',
            filename: "Nazwa: ",
            deleted: "Ten plik został wcześniej usunięty, czy na pewno chcesz go przesłać?"
        },
        ru: {
            updone: "Вы загрузили файл: ",
            duplicate: 'Это изображение дублируется ',
            upcopy: "Скопировать",
            modaltitle: "Загрузить файл",
            closemodal: "Закрыть",
            defaultOpt: "Не выбрано",
            browser: "Пожалуйста, обновите ваш браузер!",
            desc: "Описание: ",
            problem: "Возникла проблема, загрузка отменена",
            updateform: "Обновить форму",
            nolicenses: "Мы не смогли найти лицензии, см. MediaWiki:Licenses",
            alreadyname: "Уже есть файл с таким названием, пожалуйста, выберите другое имя ",
            error: "Ошибка",
            imagename: "Изображение",
            licensetext: 'Лицензия: ',
            uploadfiles: 'Загрузить все изображения',
            nofile: "Вы должны выбрать файл для его загрузки",
            filenamespace: "Файл:",
            licensetitle: "Лицензия",
            licenseerror: "Вам нужно проставить лицензию",
            allfiles: "Загруженные файлы",
            filedescription: 'Описание файла',
            filename: "Название: ",
            deleted: "Ранее этот файл был удален, вы уверены, что хотите его перезагрузить?"
        },
        tr: {
            updone: "Dosyayı yüklediniz: ",
            duplicate: 'Bu resim kopyalandı ',
            upcopy: "Kopyala",
            modaltitle: "Dosya Yükle",
            closemodal: "Kapat",
            defaultOpt: "Hiçbiri seçilmedi",
            browser: "Lütfen tarayıcınızı güncelleyin!",
            desc: "Açıklama: ",
            problem: "Bir sorun oluştu, yükleme iptal edildi",
            updateform: "Formu güncelle",
            nolicenses: "Lisansları bulamadık, lütfen MediaWiki:Licenses'a bakınız",
            alreadyname: "Böyle bir dosya zaten var, lütfen başka bir isim seçin ",
            error: "Hata",
            imagename: "Resim",
            licensetext: 'Lisans: ',
            uploadfiles: 'Tüm resimleri yükle',
            nofile: "Yüklemek için bir dosya seçmelisiniz",
            filenamespace: "Dosya:",
            licensetitle: "Lisans",
            licenseerror: "Bir lisans koymak gerekir",
            allfiles: "Yüklenen dosyalar",
            filedescription: 'Dosya açıklaması',
            filename: "Adı: ",
            deleted: "Bu dosya daha önce silindi, tekrar yüklemek istediğinize emin misiniz?"
        },
        uk: {
            updone: "Ви завантажили файл: ",
            duplicate: 'Це зображення дублюється ',
            upcopy: "Копіювати",
            modaltitle: "Завантажити файл",
            closemodal: "Закрити",
            defaultOpt: "Не вибрано",
            browser: "Будь ласка, оновіть ваш браузер!",
            desc: "Опис: ",
            problem: "Виникла проблема, завантаження скасовано",
            updateform: "Відновити форму",
            nolicenses: "Ми не змогли знайти ліцензії, див. MediaWiki:Licenses",
            alreadyname: "Вже є файл з такою назвою, будь ласка, оберіть інше ім'я ",
            error: "Помилка",
            imagename: "Зображення",
            licensetext: 'Ліцензія: ',
            uploadfiles: 'Завантажити всі зображення',
            nofile: "Ви маєте обрати файл для завантаження",
            filenamespace: "Файл",
            licensetitle: "Ліцензія",
            licenseerror: "Вам потрібно проставити ліцензію",
            allfiles: "Завантажені файли",
            filedescription: 'Опис файлу',
            filename: "Назва: ",
            deleted: "Раніше цей файл було видалено, ви впевнені, що хочете перезавантажити?"
        },
        zh: {
            "updone": "您上传的文件：",
            "duplicate": "已存在此文件",
            "upcopy": "复制",
            "modaltitle": "上传文件",
            "closemodal": "关闭",
            "defaultOpt": "未选择",
            "browser": "请升级您的浏览器！",
            "desc": "描述：",
            "problem": "发生问题，上传已取消。",
            "updateform": "刷新表单",
            "nolicenses": "无法获取授权协议列表，请检查MediaWiki:Licenses",
            "alreadyname": "已存在相同名称的文件，请使用其他名称。",
            "error": "错误",
            "imagename": "图片",
            "licensetext": "授权协议：",
            "uploadfiles": "上传所有图片",
            "nofile": "您未选择要上传的文件。",
            "filenamespace": "文件：",
            "licensetitle": "授权协议",
            "licenseerror": "您必须选择一个授权协议。",
            "allfiles": "文件上传",
            "filedescription": "文件描述：",
            "filename": "文件名：",
            "deleted": "这个文件曾被删除，您确定要重新上传吗？"
        },
        'zh-hans': {
            "updone": "您上传的文件：",
            "duplicate": "已存在此文件",
            "upcopy": "复制",
            "modaltitle": "上传文件",
            "closemodal": "关闭",
            "defaultOpt": "未选择",
            "browser": "请升级您的浏览器！",
            "desc": "描述：",
            "problem": "发生问题，上传已取消。",
            "updateform": "刷新表单",
            "nolicenses": "无法获取授权协议列表，请检查MediaWiki:Licenses",
            "alreadyname": "已存在相同名称的文件，请使用其他名称。",
            "error": "错误",
            "imagename": "图片",
            "licensetext": "授权协议：",
            "uploadfiles": "上传所有图片",
            "nofile": "您未选择要上传的文件。",
            "filenamespace": "文件：",
            "licensetitle": "授权协议",
            "licenseerror": "您必须选择一个授权协议。",
            "allfiles": "文件上传",
            "filedescription": "文件描述：",
            "filename": "文件名：",
            "deleted": "这个文件曾被删除，您确定要重新上传吗？"
        },
        'zh-hant': {
            "updone": "您上傳的檔案：",
            "duplicate": "已存在此檔案",
            "upcopy": "復制",
            "modaltitle": "上傳檔案",
            "closemodal": "關閉",
            "defaultOpt": "未選擇",
            "browser": "請升級您的瀏覽器！",
            "desc": "描述：",
            "problem": "發生問題，上傳已取消。",
            "updateform": "刷新表單",
            "nolicenses": "無法獲取授權協議列表，請檢視MediaWiki:Licenses",
            "alreadyname": "已存在相同名稱的檔案，請使用其他名稱。",
            "error": "錯誤",
            "imagename": "圖片",
            "licensetext": "授權協議：",
            "uploadfiles": "上傳所有圖片",
            "nofile": "您未選擇要上傳的檔案。",
            "filenamespace": "檔案：",
            "licensetitle": "授權協議",
            "licenseerror": "您必須選擇一個授權協議。",
            "allfiles": "檔案上傳",
            "filedescription": "檔案描述：",
            "filename": "檔案名稱：",
            "deleted": "這個檔案曾被刪除，您確定要重新上傳嗎？"
        },
        'zh-hk': {
            "updone": "您上載的檔案：",
            "duplicate": "已存在此檔案",
            "upcopy": "復制",
            "modaltitle": "上載檔案",
            "closemodal": "關閉",
            "defaultOpt": "未選擇",
            "browser": "請升級您的瀏覽器！",
            "desc": "描述：",
            "problem": "發生問題，上傳已取消。",
            "updateform": "刷新表單",
            "nolicenses": "無法獲取授權協議列表，請檢視MediaWiki:Licenses",
            "alreadyname": "已存在相同名稱的檔案，請使用其他名稱。",
            "error": "錯誤",
            "imagename": "圖片",
            "licensetext": "授權協議：",
            "uploadfiles": "上載所有圖片",
            "nofile": "您未選擇要上載的檔案。",
            "filenamespace": "檔案：",
            "licensetitle": "授權協議",
            "licenseerror": "您必須選擇一個授權協議。",
            "allfiles": "檔案上載",
            "filedescription": "檔案描述：",
            "filename": "檔案名稱：",
            "deleted": "這個檔案曾被刪除，您確定要重新上載嗎？"
        },
        'zh-tw': {
            "updone": "您上傳的檔案：",
            "duplicate": "已存在此檔案",
            "upcopy": "復制",
            "modaltitle": "上傳檔案",
            "closemodal": "關閉",
            "defaultOpt": "未選擇",
            "browser": "請升級您的瀏覽器！",
            "desc": "描述：",
            "problem": "發生問題，上傳已取消。",
            "updateform": "刷新表單",
            "nolicenses": "無法獲取授權協議列表，請檢視MediaWiki:Licenses",
            "alreadyname": "已存在相同名稱的檔案，請使用其他名稱。",
            "error": "錯誤",
            "imagename": "圖片",
            "licensetext": "授權協議：",
            "uploadfiles": "上傳所有圖片",
            "nofile": "您未選擇要上傳的檔案。",
            "filenamespace": "檔案：",
            "licensetitle": "授權協議",
            "licenseerror": "您必須選擇一個授權協議。",
            "allfiles": "檔案上傳",
            "filedescription": "檔案描述：",
            "filename": "檔案名稱：",
            "deleted": "這個檔案曾被刪除，您確定要重新上傳嗎？"
        }
    }, 
    // Depends on Content Language, if it's not here, will be "en"
    _i18n = $.extend(_datalang['en'], _datalang[(mw.config.get('wgUserLanguage')).split("-")[0]], _datalang[(mw.config.get('wgUserLanguage'))], _datalang[(mw.config.get('wgContentLanguage'))]), 
    // Config: The user can change all of these
    _siteWide = window.UFsitewide || true, // If the user wants to import this only for the licenses, enabled by default
    _personalUse = window.customUpload || false, // The customized modal, disabled by default
    _noLicense = window.needsLicense || false, // Disabled by default
    _maxFiles = window.maxFiles || 100, // Max files to upload at once
    _ignoreWarnings = window.ignoreWarnings || 0, // Disabled by default
    _showDetails = window.uploadDetails || true, // Enabled by default
    _needsLicense = function () {
        // TODO: Support for visual editor, Special:Images, threads and comments
        if (({ edit: 1, submit: 1 }[mw.config.get('wgAction')] || mw.config.get('wgCanonicalSpecialPageName') == "CreateBlogPage") && mw.config.get('skin') == 'oasis' && _siteWide) {
            WikiaEditor.load("WikiaMiniUpload").done(function () {
                var _timer = setInterval(function () {
                    try {
                        if (_showDetails) {
                            $('#WMU_div .advanced').css('display', 'block');
                        }
                        if ($('#ImageUploadLicenseSpan').find('select').val() == '') {
                            $('#ImageUploadDetails input[type="submit"]').prop('disabled', true);
                        }
                        else {
                            $('#ImageUploadDetails input[type="submit"]').prop('disabled', false);
                        }
                        if ($('#ImageUploadDetails') && $('#infoLicences').length < 1) {
                            $('.modalWrapper .ImageUploadLeft').append('<div id="infoLicences">' + _i18n["licenseerror"] + '</div>');
                        }
                    }
                    catch (err) {
                        console.warn('This is not an error lol (?)');
                    }
                }, 500);
            });
        }
        else if ({ Upload: 1, MultipleUpload: 1 }[mw.config.get('wgCanonicalSpecialPageName')]) {
            $('#wpLicense').prop('required', true);
        }
    }, _init = function () {
        if (window.UploadFileLoaded) {
            return;
        }
        window.UploadFileLoaded = true;
        // Support for version 1
        if ((_siteWide && _personalUse) || (_siteWide && window.UploadFileOasis)) {
            _siteWide = false;
        }
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:UploadInPage.css'
        });
        if (_noLicense || _siteWide) {
            $(_needsLicense);
        }
        if (!_siteWide && $('#mw-editbutton-addfile').length < 1) {
            // For some reason the code below doesn't work when the user has disabled the classic editor
            /*if (typeof (mwCustomEditButtons) != 'undefined') {
                mwCustomEditButtons[mwCustomEditButtons.length] = {
                    "imageFile": window.UploadFileIcon || "https://vignette.wikia.nocookie.net/kirby/images/4/4a/A%C3%B1adirImagen.png/revision/latest?cb=20171020011105&format=original",
                    "speedTip": _i18n['modaltitle'],
                    "tagOpen": "",
                    "tagClose": "",
                    "sampleText": "",
                    "imageId": "mw-editbutton-addfile"
                };
            }*/
            // Main
            if ({ edit: 1, submit: 1 }[mw.config.get('wgAction')] || mw.config.get('wgCanonicalSpecialPageName') == "CreateBlogPage") {
                var interval = setInterval(function () {
                    var $button = $('#mw-editbutton-wmu');
                    if ($button.exists()) {
                        clearInterval(interval);
                        mw.loader.using('mediawiki.action.edit', function () {
                            if (mw.toolbar) {
                                mw.toolbar.addButton(window.UploadFileIcon ||
                                    'https://vignette.wikia.nocookie.net/kirby/images/4/4a/A%C3%B1adirImagen.png/revision/latest?cb=20171020011105&format=original', _i18n['modaltitle'], 
                                    '', 
                                    '', 
                                    '', 
                                    'mw-editbutton-addfile');
                                $('#mw-editbutton-wmu').remove();
                                $('#mw-editbutton-addfile').insertBefore('#mw-editbutton-wpg');
                                $('#mw-editbutton-addfile').on('click', function (event) {
                                    event.preventDefault();
                                    _showModal();
                                });
                            }
                        });
                    }
                }, 100);
            }
        }
    }, _licensesList = function () {
        $.ajax({
            type: 'GET',
            url: mw.util.wikiScript('api') + '?action=query&meta=allmessages&ammessages=Licenses&format=json&amlang=' + mw.config.get('wgContentLanguage'),
            success: function (datos) {
                _throwLicenses(datos.query.allmessages[0]['*']);
            },
            error: function (datos) {
                alert(_i18n['nolicenses']);
            }
        });
    }, _throwLicenses = function (list) {
        if (list != null) {
            var options = list.split('\n');
            if (options[options.length - 1] == '') {
                options.splice(-1, 1);
            }
            $('.licencias').replaceWith('<select class="licencias"></select>');
            $('.licencias').prepend('<option value="none">' + _i18n['defaultOpt'] + '</option>');
            for (var i in options) {
                if (options[i].indexOf('**') == 0) {
                    options[i] = options[i].replace('**', '');
                    $('.licencias').find('optgroup:last-child').append('<option value="' + options[i].split('|')[0] + '">' + options[i].split('|')[1] + '</option>');
                }
                else {
                    options[i] = options[i].replace('*', '');
                    $('.licencias').append('<optgroup label="' + options[i] + '"></optgroup>');
                }
            }
        }
    }, _uploadFiles = function (fileToUpload, fileName, license) {
        var lFileName = fileName;
        var formdata = new FormData();
        formdata.append('action', 'upload');
        formdata.append('filename', lFileName);
        formdata.append('token', mw.user.tokens.get('editToken'));
        formdata.append('file', fileToUpload);
        formdata.append('text', license);
        formdata.append('format', 'json');
        if (_ignoreWarnings == false || _ignoreWarnings == 0) {
            _ignoreWarnings = 0;
        }
        else {
            _ignoreWarnings = 1;
            formdata.append('ignorewarnings', _ignoreWarnings);
        }
        // Send the data
        $.ajax({
            url: mw.util.wikiScript('api'),
            contentType: false,
            processData: false,
            type: "POST",
            data: formdata,
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data.upload.result);
                console.log(data.upload.warnings);
                if (data.upload.result == 'Warning') {
                    if (data.upload.warnings.hasOwnProperty('was-deleted')) {
                        var reUpload = confirm(_i18n['deleted']);
                        if (reUpload) {
                            _ignoreWarnings = 1;
                            lFileName = _uploadFiles(fileToUpload, lFileName, license);
                        }
                        else {
                            console.log(_i18n["error"]);
                        }
                    }
                    else if (data.upload.warnings.hasOwnProperty('duplicate-archive')) { // Change the name to the existing file
                        alert(_i18n['duplicate']);
                    }
                    else if (data.upload.warnings.hasOwnProperty('exists')) {
                        lFileName = prompt(_i18n['alreadyname'], lFileName);
                        if (lFileName != null) {
                            lFileName = _uploadFiles(fileToUpload, lFileName, license);
                        }
                        else {
                            alert(_i18n['error']);
                        }
                    }
                }
                else {
                    console.log(_i18n['updone']);
                    var insertFiles = '[[' + _i18n['filenamespace'] + lFileName + ']]';
                    _insertAtCaret('wpTextbox1', insertFiles);
                }
            },
            error: function (xhr, status, err) {
                alert(err);
            }
        });
    }, _insertAtCaret = function (areaId, text) {
        var txtarea = document.getElementById(areaId);
        if (!txtarea) {
            return;
        }
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false));
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
        }
        else if (br == "ff") {
            strPos = txtarea.selectionStart;
        }
        var front = (txtarea.value).substring(0, strPos);
        var back = (txtarea.value).substring(strPos, txtarea.value.length);
        txtarea.value = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var ieRange = document.selection.createRange();
            ieRange.moveStart('character', -txtarea.value.length);
            ieRange.moveStart('character', strPos);
            ieRange.moveEnd('character', 0);
            ieRange.select();
        }
        else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
    }, _fileSelect = function () {
        var input = document.getElementById('fileinput'), license;
        if (!input.files) {
            alert(_i18n['browser']);
            $('#fileinput').prop("disabled", false);
        }
        else if (!input.files[0]) {
            alert(_i18n["problem"]);
            $('#fileinput').prop("disabled", false);
        }
        else {
            var numberfiles = $('#UploadFile fieldset').length - 1;
            var file, filename;
            if (numberfiles > 0) {
                for (var i = 0; i < numberfiles; i++) {
                    file = input.files[i];
                    filename = $('.imagename').eq(i).val() || input.files[i].name;
                    if ($('#UploadContainer').find('select:eq(' + i + ')').find('option:selected').val() != "none") {
                        license = '==' + _i18n['licensetitle'] + '==\n{{' + $('#UploadContainer').find('select:eq(' + i + ')').find('option:selected').val() + '}}' + '\n' + $('#UploadDescription').val();
                    }
                    else if ($('#UploadContainer').find('select:eq(' + i + ')').find('option:selected').val() == "none" && _noLicense == false) {
                        license = $('#UploadDescription').val();
                    }
                    else {
                        alert(_i18n['licenseerror']);
                        return false;
                    }
                    $('#loading' + (i + 1)).css('display', 'initial');
                    _uploadFiles(file, filename, license);
                }
                $('#UploadFile').closeModal();
                alert(_i18n['allfiles']);
            }
        }
    }, _showModal = function () {
        require(['wikia.ui.factory'], function (wui) {
            wui.init(['modal']);
            $.showCustomModal(_i18n['modaltitle'], '<div id="UploadContainer"><input type="file" id="fileinput" multiple accept="image/*" /><div id="editor" style="display:none"></div><button id="UFdone">' + _i18n['updateform'] + '</button></div>', {
                id: 'UploadFile',
                width: 700,
                height: 560,
                buttons: [{
                        defaultButton: true,
                        id: "CloseModal",
                        message: _i18n['closemodal'],
                        handler: function () {
                            $('#UploadFile').closeModal();
                        }
                    }]
            });
            $('#UFdone').on('click', function () {
                _update();
            });
        });
    }, _update = function () {
        if ($('#UploadFile fieldset').length > 0) {
            _fileSelect();
            return false;
        }
        $('#editor').show();
        $('#fileinput').prop("disabled", true);
        var input = document.getElementById('fileinput');
        $('#editor').html('');
        if (input.files.length == 0) {
            alert(_i18n['nofile']);
            return false;
        }
        var limit;
        if (_maxFiles < input.files.length) {
            limit = _maxFiles;
        }
        else {
            limit = input.files.length;
        }
        for (var i = 0; i < limit; i++) {
            $('#editor').append('<fieldset><legend>' + _i18n["imagename"] + ' ' + (i + 1) + '</legend><br /><div style="float:left">' + _i18n["filename"] + '<input type="text" class="imagename" value="' + input.files[i].name + '" id="imagename' + (i + 1) + '"/></div><div style="float:center; display:none;" id="loading' + (i + 1) + '"><img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" /></div><br/><br/><div style="float:left">' + _i18n["licensetext"] + '<input type="text" class="licencias" id="license' + (i + 1) + '"/></div></fieldset>');
        }
        _licensesList();
        $('#editor').append('<fieldset><legend>' + _i18n["filedescription"] + '</legend><table><tr><td>' + _i18n["desc"] + '</td><td><textarea rows="8" cols="200" id="UploadDescription"/></td></tr></table></fieldset>');
        $('#UFdone').html(_i18n['uploadfiles']);
    };
    return {
        init: _init
    };
})(jQuery, mw);
$(window.UploadFile.init);