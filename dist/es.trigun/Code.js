;(function ($, mw, window, location, importArticle) {
    "use strict";

    $(function () {
        var load = function (s) {
                // Translations
                window.lng = {
                    // English
                    en: {
                        changes: 'Changes',
                        characters: 'characters',
                        editing: 'Editing',
                        goToLine: 'Go to line',
                        load: 'Load',
                        minorEdit: 'Minor edit',
                        newVersion: 'There is a new version of this code. Would you like to replace the existing code with the new one?',
                        no: 'No',
                        paste: 'Paste to editor',
                        publish: 'Publish',
                        publishAs: 'Publish as',
                        replace: 'Replace',
                        save: 'Save',
                        search: 'Search this wiki',
                        selectAll: 'Select all',
                        shortcut: 'Shortcuts',
                        showChanges: 'Show changes',
                        summary: 'Summary',
                        unpublished: 'You have made some unpublished edits. Are you sure you want to leave without publishing them?',
                        view: 'View code',
                        yes: 'Yes'
                    },
                    // Polish
                    pl: {
                        changes:	'Zmiany',
                        characters:	'znaków',
                        editing:	'Edytowanie',
                        goToLine:	'Idź do linii',
                        load:		'Wczytaj',
                        minorEdit:	'Drobna edycja',
                        newVersion:	'Istnieje nowa wersja tego kodu. Czy chcesz zastąpić istniejący kod nowym?',
                        no:		'Nie',
                        paste:		'Wklej do edytora',
                        publish:	'Publikuj',
                        publishAs:	'Publikuj jako',
                        replace:	'Zastąp',
                        save:		'Zapisz',
                        search:		'Przeszukaj tę wiki',
                        selectAll:	'Zaznacz wszystko',
                        shortcut:	'Skróty',
                        showChanges:	'Pokaż zmiany',
                        summary:	'Opis zmian',
                        unpublished:	'Masz pewne nieopublikowane zmiany. Na pewno chcesz opuścić stronę bez ich zapisywania?',
                        view:		'Zobacz kod',
                        yes:		'Tak'
                    },
                    // French
                    fr: {
                        changes: 'Changements',
                        characters: 'caractères',
                        editing: 'Modification',
                        goToLine: 'Aller à la ligne',
                        load: 'Charger',
                        minorEdit: 'Modification mineure',
                        newVersion: 'Il existe une nouvelle version de ce code. Voulez-vous remplacer la version existante par celle-ci ?',
                        no: 'Non',
                        paste: 'Copier dans l\'éditeur',
                        publish: 'Publier',
                        publishAs: 'Publier en tant que',
                        replace: 'Remplacer',
                        save: 'Enregistrer',
                        search: 'Rechercher sur ce Wiki',
                        selectAll: 'Tout sélectionner',
                        shortcut: 'Raccourcis',
                        showChanges: 'Voir les changements',
                        summary: 'Résumé',
                        unpublished: 'Vous avez fait des modifications qui ne sont pas publiées. Etes-vous sûr de vouloir quitter sans enregistrer ?',
                        view: 'Voir le code',
                        yes: 'Oui'
                    },
                    // Spanish
                    es: {
                        changes: 'Cambios',
                        characters: 'caráteres',
                        editing: 'Editando',
                        goToLine: 'Ir a la línea',
                        load: 'Cargar',
                        minorEdit: 'Edición menor',
                        newVersion: 'Hay una nueva versión de este código. ¿Desea reemplazar el código existente con el nuevo?',
                        no: 'No',
                        paste: 'Pegar al editor',
                        publish: 'Publicar',
                        publishAs: 'Publicar como',
                        replace: 'Reemplazar',
                        save: 'Guardar',
                        search: 'En este wiki',
                        selectAll: 'Seleccionar todo',
                        shortcut: 'Acceso directo',
                        showChanges: 'Mostrar cambios',
                        summary: 'Resumen',
                        unpublished: 'Has hecho algunos cambios no publicados. ¿Estás seguro de no publicarlos?',
                        view: 'Ver código',
                        yes: 'Sí'
                    },
                    // Russian
                    ru: {
                        changes: 'Изменения',
                        characters: 'символы',
                        editing: 'Правка',
                        goToLine: 'Перейти к строке',
                        load: 'Загрузить',
                        minorEdit: 'Малая правка',
                        newVersion: 'Появилась новая версия этого кода. Хотите заменить существующий код на новый?',
                        no: 'Нет',
                        paste: 'Вставить в редактор',
                        publish: 'Опубликовать',
                        publishAs: 'Опубликовать как',
                        replace: 'Заменить',
                        save: 'Сохранить',
                        search: 'Поиск на этой вики',
                        selectAll: 'Выбрать все',
                        shortcut: 'Ярлыки',
                        showChanges: 'Показать изменения',
                        summary: 'Внесенные изменения',
                        unpublished: 'У вас есть не опубликованные изменения. Вы уверены, что хотите выйти без их публикации?',
                        view: 'Посмотреть код',
                        yes: 'Да'
                    }
                };

                window.lng = $.extend(window.lng.en, window.lng[mw.config.get('wgUserLanguage')]);

                importArticle({
                    type: 'script',
                    article: 'u:dev:Code/' + s + '.js'
                });
            };

        if (mw.config.get('skin') === 'oasis' && [0, 2, 8].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 && mw.config.get('wgAction') === 'view' && !/oldid\=|diff\=/.test(location.href) && !$('.noarticletext, .CodeMirror').length) {
            if (/\.js$/.test(mw.config.get('wgPageName'))) {
                load('javascript');
            } else if (/\.css$/.test(mw.config.get('wgPageName'))) {
                load('css');
            }
        }
    });
}(this.jQuery, this.mediaWiki, this, this.location, this.importArticle));