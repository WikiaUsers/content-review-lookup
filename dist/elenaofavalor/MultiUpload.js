//<source lang="javascript">
(function ($) {
    var i18n = {
        en: {
            logout: "You have to be log in and autoconfirmed to upload files",
            update: "Update the form",
            nofile: "You have to choose a file to upload it",
            imagename: 'Image n°',
            filename: 'File name : ',
            licensetext: 'File license : ',
            uploadfiles: 'Upload all images',
            browsersupport: 'This browser doesn\'t seem to support the `files` property of file inputs.',
            nolicence: 'None selected',
            problem: 'A problem occured, upload cancelled',
            success: 'Image uploaded successfully.',
            duplicate: 'This image is a doublon of : ',
            alreadyname: 'A image has already this name, please choose an other one below :',
            reset: 'Reset the form',
            description: 'Summary :',
            filedescription: 'File description'
        },
        be: {
            logout: "Вы павінны быць зарэгістраваныя і мець пацверджаны рахунак, каб мець магчымасць загружаць файлы",
            update: "Абновіце форму",
            nofile: "Вы павінны выбраць файл, каб загрузіць яго",
            imagename: 'Малюнак n°',
            filename: 'Імя файла : ',
            licensetext: 'Ліцэнзія файла : ',
            uploadfiles: 'Адправіць ўсе файлы',
            browsersupport: 'Гэты браўзэр не падтрымлівае ўласцівасці `files` на ўваходзе.',
            nolicence: 'Нічога не абрана',
            problem: 'Паўстала праблема, загрузка адменена',
            success: 'Выявы былі загружаныя.',
            duplicate: 'Гэты файл з\'яўляецца дублікатам : ',
            alreadyname: 'Іншы файл ўжо мае такую назву, калі ласка, выберыце іншы ніжэй :',
            reset: 'Ачысціць форму',
            description: 'Апісанне :',
            filedescription: 'Апісанне файла'
        },
        fr: {
            logout: "Vous devez être connecté et autoconfirmed pour importer des fichiers",
            update: "Mettre à jour le formulaire",
            nofile: "Vous devez choisir un fichier pour l'importer !",
            imagename: 'Image n°',
            filename: 'Nom du fichier : ',
            licensetext: 'Licence du fichier : ',
            uploadfiles: 'Importer les images',
            browsersupport: 'Ce navigateur n\'a pas l\'air de reconnaître l\'attribut file des file inputs',
            nolicence: 'Aucune licence sélectionné',
            problem: 'Un problème est survenu, l\'opération a été annulé',
            success: 'Les images ont été importés avec succès.',
            duplicate: 'Cette image est un doublon de l\'image : ',
            alreadyname: 'Une image porte déjà ce nom sur ce wikia, merci donc de choisir un autre nom',
            reset: 'Réinitialiser le formulaire',
            description: 'Description :',
            filedescription: 'Description du fichier'
        },
	es: {
            logout: "Debes haber iniciado sesión y estar autoconfirmado para subir archivos",
            update: "Actualizar el formulario",
            nofile: "Tienes que elegir un archivo para subirlo",
            imagename: 'Imagen n°',
            filename: 'Nombre del archivo : ',
            licensetext: 'Licencia del archivo : ',
            uploadfiles: 'Subir todas las imágenes',
            browsersupport: 'Este navegador no parece soportar la propiedad `files` de las entradas de archivo.',
            nolicence: 'Ninguna seleccionada',
            problem: 'Ha ocurrido un problema, subida cancelada',
            success: 'Imagen subida satisfactoriamente.',
            duplicate: 'Esta imagen es un duplicado de : ',
            alreadyname: 'Una imagen ya tiene este nombre, por favor escoge otro nombre debajo:',
            reset: 'Reiniciar el formulario',
            description: 'Sumario:',
            filedescription: 'Descripción del archivo'
        },
        pl: {
            logout: "Musisz być zalogowany i mieć potwierdzone konto, aby móc przesyłać pliki",
            update: "Zaktualizuj formularz",
            nofile: "Musisz wybrać plik, aby go przesłać",
            imagename: 'Obraz n°',
            filename: 'Nazwa pliku : ',
            licensetext: 'Licencja pliku : ',
            uploadfiles: 'Prześlij wszystkie pliki',
            browsersupport: 'Ta przeglądarka nie wspiera właściwości `files` na wejściu.',
            nolicence: 'Nic nie wybrano',
            problem: 'Wystąpił problem, przesyłanie anulowane',
            success: 'Obrazy zostały przesłane.',
            duplicate: 'Ten obraz jest duplikatem : ',
            alreadyname: 'Inny obraz już posiada tą nazwę, proszę wybierz poniżej inną :',
            reset: 'Wyczyść formularz',
            description: 'Opis :',
            filedescription: 'Opis pliku'
        },
        ru: {
            logout: "Вы должны быть зарегистрированы и иметь подтвержденный аккаунт, чтобы иметь возможность загружать файлы",
            update: "Обновите форму",
            nofile: "Вы должны выбрать файл, чтобы загрузить его",
            imagename: 'Изображение n°',
            filename: 'Имя файла : ',
            licensetext: 'Лицензия файла : ',
            uploadfiles: 'Отправить все файлы',
            browsersupport: 'Этот браузер не поддерживает свойства `files` на входе.',
            nolicence: 'Ничего не выбрано',
            problem: 'Возникла проблема, загрузка отменена',
            success: 'Изображения были загружены.',
            duplicate: 'Этот файл является дубликатом : ',
            alreadyname: 'Другой файл уже имеет такое название, пожалуйста, выберите ниже другой :',
            reset: 'Очистить форму',
            description: 'Описание :',
            filedescription: 'Описание файла'
        },
        uk: {
            logout: "Ви повинні бути зареєстровані і мати підтверджений аккаунт, щоб мати можливість завантажувати файли",
            update: "Оновіть форму",
            nofile: "Ви повинні вибрати файл, щоб завантажити його",
            imagename: 'Зображення n°',
            filename: 'Ім\'я файлу :',
            licensetext: 'Ліцензія файлу : ',
            uploadfiles: 'Відправити всі файли',
            browsersupport: 'Цей браузер не підтримує властивості `files` на вході.',
            nolicence: 'Нічого не вибрано',
            problem: 'Виникла проблема, завантаження скасовано',
            success: 'Зображення були завантажені.',
            duplicate: 'Цей файл є дублікатом :',
            alreadyname: 'Інший файл вже має таку назву, будь ласка, виберіть нижче інший :',
            reset: 'Очистити форму',
            description: 'Опис :',
            filedescription: 'Опис файлу'
        }
    };
    
    // UserLanguage > ContentLanguage > ENGLISH
    i18n = $.extend(i18n.en, i18n[mw.config.get('wgContentLanguage')], i18n[mw.config.get('wgUserLanguage')]);
 
    var MultiUpload = {
        init: function () {
            $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" href="/wiki/Special:BlankPage?blankspecial=MultiUpload">Multi Upload</a></li>');
            if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'MultiUpload') {
                if (wgUserName == null || !$.inArray('autoconfirmed', wgUserGroups)) { /* If the user don't have multiple upload rights (if it's not autoconfirmed) */
                    $('#mw-content-text').html(i18n.logout);
                    return false;
                }
                var MultiUploadoption = MultiUploadoption || {};
                $.extend(MultiUpload, MultiUploadoption);
                $('#mw-content-text').remove();
                $('#WikiaArticle').append('<input type="file" multiple id="fileinput" accept="image/*" />\n<div id="editor">Ici</div>\n<button id="go">' + i18n.update + '</button>');
                $('#editor').css('display', 'none');
                var token = mw.user.tokens.get('editToken');
                $('.AdminDashboardArticleHeader > h1').html('Multi Upload');
                var filename;
            }
        },
        updatelicensebutton: function (licencestext) {
            if (licencestext != null) {
                var licences = licencestext.split('\n');
                if (licences[licences.length - 1] === '') {
                    licences.splice(-1, 1); //Remove last line as it is empty
                }
                $('.licence').replaceWith('<select class="licence"></select>');
                $('.licence').prepend('<option value="none">' + i18n.nolicence + '</option>');
                for (i = 0; i < licences.length; i++) {
                    if (licences[i].indexOf('** ') === 0) {
                        licences[i] = licences[i].replace("** ", "");
                        if (licences[i].split('|')[0] == MultiUpload.defaultlicence) {
                            $('.licence').find('optgroup:last-child').append('<option selected value="' + licences[i].split('|')[0] + '">' + licences[i].split('|')[1] + '</option>');
                        } else {
                            $('.licence').find('optgroup:last-child').append('<option value="' + licences[i].split('|')[0] + '">' + licences[i].split('|')[1] + '</option>');
                        }
                    } else {
                        licences[i] = licences[i].replace('* ', '');
                        $('.licence').append('<optgroup label="' + licences[i] + '"></optgroup');
                    }
                }
            }
        },
        getlicence: function () {
            $.ajax({
                type: "GET",
                url: wgServer + '/api.php?action=query&meta=allmessages&ammessages=Licenses&format=json',
                success: function (data) {
                    var content = data.query.allmessages[0]['*'];
                    MultiUpload.updatelicensebutton(content);
                },
                error: function (data) {
                    alert(i18n.errorapi + ' : ' + data.error.info);
                }
            });
        },
        update: function () {
            if ($('fieldset').length > 0) {
                MultiUpload.handleFileSelect();
                return false;
            }
            $('#editor').css('display', 'block');
            $('#fileinput').attr("disabled", true);
            input = document.getElementById('fileinput');
            $('#editor').html('');
            if (input.files.length == 0) {
                alert(i18n.nofile);
                return false;
            }
            if (!MultiUpload.max || typeof MultiUpload.max != "number" || MultiUpload.max < 0 || MultiUpload.max > 101) {
                if ($.inArray('staff', wgUserGroups) + $.inArray('helper', wgUserGroups) + $.inArray('util', wgUserGroups) + $.inArray('bot-global', wgUserGroups) > -4) {
                    MultiUpload.max = 200;
                } else if ($.inArray('bureaucrat', wgUserGroups) + $.inArray('bot', wgUserGroups) > -2) {
                    MultiUpload.max = 70;
                } else if ($.inArray('sysop', wgUserGroups) > -1) {
                    MultiUpload.max = 50;
                } else if ($.inArray('rollback', wgUserGroups) > -1) {
                    MultiUpload.max = 30;
                } else {
                    MultiUpload.max = 20;
                }
            }
            if (!MultiUpload.max) {
                alert(lng.problem);
                return false;
            }
            var limit;
            if (MultiUpload.max < input.files.length) {
                limit = MultiUpload.max;
            } else {
                limit = input.files.length;
            }
            for (i = 0; i < limit; i++) {
                $('#editor').append('<fieldset><legend>' + i18n.imagename + (i + 1) + '</legend><br /><div style="float:left">' + i18n.filename + '<input type="text" class="imagename" value="' + input.files[i].name + '" id="imagename' + (i + 1) + '"/></div><div style="float:center; display:none;" id="loading' + (i + 1) + '"><img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="float: right; margin-left: 20px;" /></div><div style="float:right">' + i18n.licensetext + '<input type="text" class="licence" id="licence' + (i + 1) + '"/></div></fieldset>');
            }
            MultiUpload.getlicence();
             $('#editor').append('<fieldset><legend>' + i18n.filedescription + '</legend><table><tr><td>' + i18n.description + '</td><td><textarea rows="8" cols="80" id="UploadDescription"/></td></tr></table></fieldset>');
            $('#go').html(i18n.uploadfiles);
        },
        handleFileSelect: function () {
            input = document.getElementById('fileinput');
            if (!input.files) {
                alert(i18n.browsersupport);
                $('#fileinput').attr("disabled", false);
            } else if (!input.files[0]) {
                alert(i18n.problem);
                $('#fileinput').attr("disabled", false);
            } else {
                $('fieldset').attr('disabled', 'disabled');
                $('#go').attr('disabled', 'disabled');
                var numberfiles = $('fieldset').length - 1;
                if (numberfiles > 0) {
                    for (i = 0; i < numberfiles; i++) {
                        file = input.files[i];
                        filename = $('.imagename').eq(i).val() || input.files[i].name;
                        console.log(filename);
                        if ($('#WikiaArticle').find('select:eq(' + i + ')').find('option:selected').val() !== "none") {
                        licence = '{{' + $('#WikiaArticle').find('select:eq(' + i + ')').find('option:selected').val() + '}}' + '\n' + $('#UploadDescription').val();
                        } else {
                        licence = $('#UploadDescription').val();
                        }
                        console.log(licence);
                        $('#loading' + (i + 1)).css('display', 'initial');
                        MultiUpload.uploadfiles(file, filename, licence);
                    }
                    alert(i18n.success);
                    $('#go').html(i18n.reset);
                    $('#go').removeAttr('disabled');
                    $('#go').click(function (event) {
                        if ($('#go').html() == i18n.reset) {
                        event.stopPropagation();
                        $('#WikiaArticle').find('*').attr("disabled", false);
                        $('#editor').html('');
                        $('#editor').css('display', 'none');
                        $('#go').html(i18n.update);
                        $('#fileinput').val('');
                        }
                    });
                }
            }
        },
        uploadfiles: function (fileToUpload, fileName, licence) {
            var lFileName = fileName;
 
            formdata = new FormData(); //see https://developer.mozilla.org/en-US/docs/Web/Guide/Using_FormData_Objects?redirectlocale=en-US&redirectslug=Web%2FAPI%2FFormData%2FUsing_FormData_Objects
            formdata.append('action', 'upload');
            formdata.append('filename', lFileName);
            formdata.append('token', mw.user.tokens.get('editToken'));
            formdata.append('file', fileToUpload);
            formdata.append('text', licence);
            formdata.append('format', 'json');
 
            //as we now have created the data to send, we send it...
            $.ajax({ //http://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery
                url: mw.util.wikiScript('api'), //url to api.php 
                contentType: false,
                processData: false,
                type: 'POST',
                data: formdata, //the formdata object we created above
                dataType: 'json',
                async: false,
                success: function (data) {
                    //        console.log(data);
                    if (data.upload.result == 'Warning') {
                        if (data.upload.warnings.hasOwnProperty('duplicate')) {
                            //if file is a duplicate, we use the name of the first existing file
                            lFileName = data.upload.warnings.duplicate[0];
                            alert(i18n.duplicate + lFileName);
                            MultiUpload.uploadfinished(false);
                        } else if (data.upload.warnings.hasOwnProperty('exists')) {
                            lFileName = prompt(i18n.alreadyname, lFileName);
                            if (lFileName != null) {
                                lFileName = MultiUpload.uploadfiles(fileToUpload, lFileName, licence);
                            } else {
                                MultiUpload.uploadfinished(false);
                            }
                        }
                    } else {
                        MultiUpload.uploadfinished(true);
                    }
                },
                error: function (xhr, status, error) {
                    alert(error);
                    MultiUpload.uploadfinished(false);
                }
            });
        },
        uploadfinished: function (result) {
            if (result) {
                $('#loading' + (i + 1) + ' > img').attr('src', 'https://vignette.wikia.nocookie.net/guigui/images/e/ef/Success.png/revision/latest?cb=20141230103851&path-prefix=fr');
            } else {
                $('#loading' + (i + 1) + ' > img').attr('src', 'https://vignette.wikia.nocookie.net/guigui/images/8/8a/Problem.png/revision/latest?cb=20141230110222&path-prefix=fr');
            }
        }
    };
    $('#WikiaArticle').on("click", "#go", function () {
        MultiUpload.update();
    });
    MultiUpload.init(); // Start script
})(jQuery); 
//</source>