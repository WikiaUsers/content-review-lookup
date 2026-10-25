/* eslint-disable */
/* Исходные файлы располагаются на GitHub (fandom_stuff) и собираются автоматически */

/* === LAYER: 01_init.js === */
/* CrossWikiActivity - Глобальный трекер активности */
(async () => {
    'use strict';

    const targetContainer = document.querySelector('#cwa-app-container');
    if (!targetContainer || targetContainer.dataset.cwaMounted === 'true') {
        return;
    }
    targetContainer.dataset.cwaMounted = 'true';

    const localRequire = await mw.loader.using([
        'mediawiki.api',
        'mediawiki.ForeignApi',
        'mediawiki.util',
        'mediawiki.jqueryMsg',
        'vue'
    ]);
    const Vue = localRequire('vue');

/* === LAYER: 02_constants.js === */
const CwaDicts = {
        logActMap: {
            'delete': 'Удаление',
            'restore': 'Восстановление',
            'protect': 'Закрытие',
            'unprotect': 'Открытие'
        },
        logMap: {
            'delete/delete': 'Страница удалена',
            'delete/restore': 'Страница восстановлена',
            'block/block': 'Участник заблокирован',
            'block/unblock': 'Участник разблокирован',
            'protect/protect': 'Страница защищена',
            'protect/unprotect': 'Защита снята',
            'upload/upload': 'Загружен новый файл',
            'upload/overwrite': 'Перезаписан файл',
            'move/move': 'Страница переименована',
            'move/move_redir': 'Переименована поверх перенаправления',
            'rights/rights': 'Изменены права участника',
            'contentmodel/change': 'Изменена модель контента'
        },
        logNamesMap: {
            'move': 'Журнал переименований',
            'rights': 'Журнал прав участника',
            'delete': 'Журнал удалений',
            'block': 'Журнал блокировок',
            'protect': 'Журнал защиты',
            'upload': 'Журнал загрузок',
            'contentmodel': 'Журнал изменения модели',
            'newusers': 'Журнал регистрации',
            'patrol': 'Журнал патрулирования',
            'import': 'Журнал импорта',
            'merge': 'Журнал объединений',
            'create': 'Журнал создания страниц'
        },
        socialTitleMap: {
            'talk': {
                'Новый': 'Новое обсуждение',
                'Изменение': 'Редактирование обсуждения',
                'Удаление': 'Удаление обсуждения',
                'Восстановление': 'Восстановление обсуждения',
                'Закрытие': 'Закрытие обсуждения',
                'Открытие': 'Открытие обсуждения'
            },
            'comment': {
                'Новый': 'Новый комментарий',
                'Изменение': 'Редактирование комментария',
                'Удаление': 'Удаление комментария',
                'Восстановление': 'Восстановление комментария',
                'Закрытие': 'Закрытие комментария',
                'Открытие': 'Открытие комментария'
            },
            'blog': {
                'Новый': 'Новая запись в блоге',
                'Изменение': 'Редактирование блога',
                'Удаление': 'Удаление блога',
                'Восстановление': 'Восстановление блога',
                'Закрытие': 'Закрытие блога',
                'Открытие': 'Открытие блога'
            },
            'message': {
                'Новый': 'Новое сообщение на стене',
                'Изменение': 'Редактирование сообщения',
                'Удаление': 'Удаление сообщения',
                'Восстановление': 'Восстановление сообщения',
                'Закрытие': 'Закрытие темы на стене',
                'Открытие': 'Открытие темы на стене'
            },
            'post': {
                'Новый': 'Новый пост в обсуждениях',
                'Изменение': 'Редактирование поста',
                'Удаление': 'Удаление поста',
                'Восстановление': 'Восстановление поста',
                'Закрытие': 'Закрытие поста',
                'Открытие': 'Открытие поста'
            }
        },
        icons: {
            social: {
                'create': {
                    'comment': 'fa-solid fa-comment-dots',
                    'comment-reply': 'fa-solid fa-comments',
                    'message': 'fa-solid fa-envelope',
                    'message-reply': 'fa-solid fa-reply',
                    'post': 'fa-solid fa-message',
                    'post-reply': 'fa-solid fa-reply-all',
                    'blog': 'fa-solid fa-blog',
                    'blog-reply': 'fa-solid fa-comment-medical'
                },
                'update': {
                    'comment': 'fa-solid fa-pen-to-square',
                    'comment-reply': 'fa-solid fa-pen',
                    'message': 'fa-solid fa-envelope-open-text',
                    'message-reply': 'fa-solid fa-marker',
                    'post': 'fa-solid fa-pen-clip',
                    'post-reply': 'fa-solid fa-pencil',
                    'blog': 'fa-solid fa-pen-nib',
                    'blog-reply': 'fa-solid fa-pen-ruler'
                },
                'delete': {
                    'comment': 'fa-solid fa-trash-can',
                    'comment-reply': 'fa-solid fa-eraser',
                    'message': 'fa-solid fa-calendar-xmark',
                    'message-reply': 'fa-solid fa-minus-square',
                    'post': 'fa-solid fa-ban',
                    'post-reply': 'fa-solid fa-trash',
                    'blog': 'fa-solid fa-trash-can',
                    'blog-reply': 'fa-solid fa-eraser'
                },
                'undelete': {
                    'comment': 'fa-solid fa-trash-arrow-up',
                    'message': 'fa-solid fa-recycle',
                    'post': 'fa-solid fa-trash-can-arrow-up',
                    'blog': 'fa-solid fa-trash-arrow-up'
                },
                'lock': {
                    'comment': 'fa-solid fa-lock',
                    'message': 'fa-solid fa-user-lock',
                    'post': 'fa-solid fa-clock',
                    'blog': 'fa-solid fa-lock'
                },
                'unlock': {
                    'comment': 'fa-solid fa-lock-open',
                    'message': 'fa-solid fa-unlock',
                    'post': 'fa-solid fa-key',
                    'blog': 'fa-solid fa-lock-open'
                }
            },
            log: {
                'delete': 'fa-solid fa-trash',
                'block': 'fa-solid fa-user-lock',
                'protect': 'fa-solid fa-shield-halved',
                'upload': 'fa-solid fa-upload',
                'move': 'fa-solid fa-copy',
                'rights': 'fa-solid fa-user-shield',
                'contentmodel': 'fa-solid fa-file-code'
            },
            ns: {
                '-1': 'fa-solid fa-code',
                '8': 'fa-solid fa-code',
                '828': 'fa-solid fa-code',
                '10': 'fa-solid fa-gears',
                '14': 'fa-solid fa-tags',
                '6': 'fa-solid fa-image',
                '4': 'fa-solid fa-flag',
                '2': 'fa-solid fa-user',
                '500': 'fa-solid fa-message',
                '502': 'fa-solid fa-message',
                '400': 'fa-solid fa-video',
                '1100': 'fa-solid fa-video',
                '420': 'fa-solid fa-map-location-dot'
            }
        }
    };

/* === LAYER: 03_template.js === */
const AppTemplate = `
            <div class="cwa-rc">
                <header class="cwa-rc__header">
                    <div class="cwa-rc__title">
                        <h2><i class="fa-solid fa-globe"></i> Вся активность с любимых Вики в одном месте</h2>
                        <div class="cwa-rc__title-actions">
                            <button v-if="canPatrol && hasUnpatrolled" class="wds-button wds-is-secondary cwa-rc__refresh" @click="patrolAll" :disabled="isPatrolling || isLoading">
                                <i class="fa-solid cwa-rc__btn-icon" :class="isPatrolling ? 'fa-spinner fa-spin' : 'fa-check-double'"></i> {{ isPatrolling ? 'Патрулирование...' : 'Отпатрулировать видимые' }}
                            </button>
                            <button class="wds-button wds-is-secondary cwa-rc__refresh" @click="fetchData" :disabled="isLoading || isPatrolling">
                                <i class="fa-solid fa-rotate-right cwa-rc__btn-icon" :class="{'fa-spin': isLoading}"></i> Обновить
                            </button>
                        </div>
                    </div>
                    <nav class="cwa-rc__tabs">
                        <div v-for="tab in tabs" :key="tab.id" 
                             class="cwa-rc__tab" 
                             :class="{'cwa-rc__tab--active': activeTab === tab.id}"
                             @click="activeTab = tab.id">
                             <i :class="tab.icon"></i> {{ tab.name }}
                             <span class="cwa-rc__badge" v-if="getEditsByTab(tab.id).length">{{ getEditsByTab(tab.id).length }}</span>
                        </div>
                    </nav>
                </header>
                <main class="cwa-rc__content">
                    
                    <div v-if="failedWikis.length > 0" class="cwa-rc__error-box">
                        <strong><i class="fa-solid fa-triangle-exclamation"></i> Ошибка загрузки с этих Вики. Возможно, неправильно указаны ссылки в Модуле или данные проекты внесены в реестр запрещённых ресурсов РКН:</strong>
                        <ul><li v-for="w in failedWikis" :key="w">{{ w }}</li></ul>
                    </div>
                    
                    <div v-if="isLoading && edits.length === 0" class="cwa-rc__loader">
                        <i class="fa-solid fa-spinner fa-spin-pulse"></i> Сбор данных с Википроектов...
                    </div>
                    
                    <div v-else-if="editsByDate.length === 0" class="cwa-rc__empty">
                        В этой категории пока нет новых изменений.
                    </div>
                    
                    <ul v-else class="cwa-rc__list">
                        <!-- РАЗБИВКА ПО ДНЯМ -->
                        <template v-for="dateGroup in editsByDate" :key="dateGroup.date">
                            <li class="cwa-rc__date-header">
                                {{ dateGroup.date }}
                            </li>
                            
                            <li v-for="group in dateGroup.groups" :key="group.key" class="cwa-rc__group-container">
                                
                                <!-- ОДИНОЧНАЯ ПРАВКА -->
                                <div v-if="group.items.length === 1" 
                                     class="cwa-rc__item"
                                     :data-type="group.items[0].type"
                                     :data-ns="group.items[0].ns"
                                     :data-logtype="group.items[0].logtype"
                                     :data-activity-type="group.items[0].socialContext ? group.items[0].socialContext.activityType : null"
                                     :data-content-type="group.items[0].socialContext ? group.items[0].socialContext.contentType : null">
                                     
                                    <div class="cwa-rc__favicon-wrap">
                                        <img :src="group.items[0].wikiFavicon" class="cwa-rc__favicon" :title="group.items[0].wikiName" loading="lazy">
                                    </div>
                                    <div class="cwa-rc__main-info">
                                        <div class="cwa-rc__meta">
                                            <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].actionTitle || group.items[0].logaction || group.items[0].type"></i>
                                            <span v-if="group.items[0].unpatrolled" class="cwa-rc__unpatrolled" title="Неотпатрулированная правка">!</span>
                                            <span class="cwa-rc__time">{{ group.items[0].time }}</span>
                                            <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank" rel="noopener noreferrer">{{ group.items[0].title }}</a>
                                            <span v-if="group.items[0].actionText" class="cwa-rc__action-text">({{ group.items[0].actionText }})</span>
                                            <span v-if="group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(group.items[0].sizeDiff)">
                                                ({{ group.items[0].sizeDiff > 0 ? '+' : '' }}{{ group.items[0].sizeDiff }})
                                            </span>
                                            <span v-if="group.items[0].flags && group.items[0].flags.length" class="cwa-rc__flags">
                                                ( <template v-for="(flag, index) in group.items[0].flags" :key="index">
                                                    <abbr class="cwa-rc__flag-abbr" :title="flag.title">{{ flag.text }}</abbr><span v-if="index < group.items[0].flags.length - 1"> | </span>
                                                </template> )
                                            </span>
                                        </div>
                                        <div class="cwa-rc__details">
                                            <span class="cwa-rc__user-wrap">
                                                <a :href="group.items[0].userUrl" class="cwa-rc__user" target="_blank" rel="noopener noreferrer">{{ group.items[0].user }}</a>
                                                <span class="cwa-rc__user-actions">
                                                    <button class="cwa-rc__action-btn" title="Стена обсуждения" @click.stop="openInNewTab(group.items[0].userTalkUrl)"><i class="fa-solid fa-comment-dots"></i></button>
                                                    <button class="cwa-rc__action-btn" title="Вклад" @click.stop="openInNewTab(group.items[0].userContribsUrl)"><i class="fa-solid fa-list-ul"></i></button>
                                                    <button v-if="canBlock" class="cwa-rc__action-btn" title="Заблокировать" @click.stop="openInNewTab(group.items[0].userBlockUrl)"><i class="fa-solid fa-user-slash"></i></button>
                                                </span>
                                            </span>
                                            <span class="cwa-rc__summary" v-html="group.items[0].parsedComment"></span>
                                        </div>
                                    </div>
                                    <div class="cwa-rc__actions">
                                        <button v-if="canPatrol && group.items[0].unpatrolled" class="cwa-rc__action-btn cwa-rc__action-btn--success" title="Отпатрулировать" @click="doPatrol(group.items[0])">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                        <button v-if="group.items[0].pageid || group.items[0].type === 'discussion'" class="cwa-rc__action-btn" title="Предпросмотр" @click="openPreviewModal(group.items[0])">
                                            <i class="fa-solid fa-eye"></i>
                                        </button>
                                        <button v-if="group.items[0].old_revid" class="cwa-rc__action-btn" title="Показать изменения" @click="openDiffModal(group.items[0].wikiDomain, group.items[0].old_revid, group.items[0].revid, group.items[0].title)">
                                            <i class="fa-solid fa-code-compare"></i>
                                        </button>
                                        <button v-if="group.items[0].undoUrl" class="cwa-rc__action-btn cwa-rc__action-btn--warn" title="Отменить" @click.stop="openInNewTab(group.items[0].undoUrl)">
                                            <i class="fa-solid fa-rotate-left"></i>
                                        </button>
                                        <button v-if="canRollback && group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__action-btn cwa-rc__action-btn--danger" title="Быстрый откат" @click="doRollback(group.items[0])">
                                            <i class="fa-solid fa-clock-rotate-left"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- СГРУППИРОВАННЫЕ ПРАВКИ -->
                                <div v-else class="cwa-rc__group">
                                    <div class="cwa-rc__item cwa-rc__item--group-header" 
                                         @click="toggleGroup(group.key)"
                                         :data-type="group.items[0].type"
                                         :data-ns="group.items[0].ns"
                                         :data-logtype="group.items[0].logtype"
                                         :data-activity-type="group.items[0].socialContext ? group.items[0].socialContext.activityType : null"
                                         :data-content-type="group.items[0].socialContext ? group.items[0].socialContext.contentType : null">
                                         
                                        <div class="cwa-rc__favicon-wrap">
                                            <img :src="group.wikiFavicon" class="cwa-rc__favicon" :title="group.wikiName" loading="lazy">
                                        </div>
                                        <div class="cwa-rc__main-info">
                                            <div class="cwa-rc__meta">
                                                <i :class="getIconForType(group.items[0])" class="cwa-rc__type-icon" :title="group.items[0].actionTitle || group.items[0].logaction || group.items[0].type"></i>
                                                <i class="fa-solid fa-chevron-right cwa-rc__toggle-icon" :class="{'cwa-rc__toggle-icon--expanded': expandedGroups[group.key]}"></i>
                                                <span v-if="group.items.some(i => i.unpatrolled)" class="cwa-rc__unpatrolled" title="Есть неотпатрулированные правки">!</span>
                                                <span class="cwa-rc__time">{{ group.items[0].time }}</span>
                                                <a :href="group.items[0].pageUrl" class="cwa-rc__page-title" target="_blank" rel="noopener noreferrer" @click.stop>{{ group.title }}</a>
                                                <span v-if="group.items[0].actionText" class="cwa-rc__action-text">({{ group.items[0].actionText }})</span>
                                                <span class="cwa-rc__group-count">{{ pluralize(group.items.length, ['изменение', 'изменения', 'изменений']) }}</span>
                                                <span v-if="group.items[0].type !== 'log' && group.items[0].type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(group.totalSizeDiff)">
                                                    ({{ group.totalSizeDiff > 0 ? '+' : '' }}{{ group.totalSizeDiff }})
                                                </span>
                                            </div>
                                            <div class="cwa-rc__details">
                                                <span class="cwa-rc__summary">Авторы: {{ Array.from(new Set(group.items.map(i => i.user))).join(', ') }}</span>
                                            </div>
                                        </div>
                                        <div class="cwa-rc__actions">
                                            <button v-if="canPatrol && group.items.some(i => i.unpatrolled)" class="cwa-rc__action-btn cwa-rc__action-btn--success" title="Отпатрулировать группу" @click.stop="doPatrolGroup(group)">
                                                <i class="fa-solid fa-check-double"></i>
                                            </button>
                                            <button v-if="group.items[0].pageid || group.items[0].type === 'discussion'" class="cwa-rc__action-btn" title="Предпросмотр" @click.stop="openPreviewModal(group.items[0])">
                                                <i class="fa-solid fa-eye"></i>
                                            </button>
                                            <button v-if="getGroupDiff(group)" class="cwa-rc__action-btn" title="Все изменения" @click.stop="openDiffModal(group.wikiDomain, getGroupDiff(group).from, getGroupDiff(group).to, group.title)">
                                                <i class="fa-solid fa-code-compare"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <ul v-if="expandedGroups[group.key]" class="cwa-rc__sublist">
                                        <li v-for="subEdit in group.items" :key="subEdit.id" 
                                            class="cwa-rc__item cwa-rc__item--sub"
                                            :data-type="subEdit.type"
                                            :data-ns="subEdit.ns"
                                            :data-logtype="subEdit.logtype"
                                            :data-activity-type="subEdit.socialContext ? subEdit.socialContext.activityType : null"
                                            :data-content-type="subEdit.socialContext ? subEdit.socialContext.contentType : null">
                                            
                                            <div class="cwa-rc__main-info">
                                                <div class="cwa-rc__meta">
                                                    <i :class="getIconForType(subEdit)" class="cwa-rc__type-icon cwa-rc__sub-icon" :title="subEdit.actionTitle || subEdit.logaction || subEdit.type"></i>
                                                    <span v-if="subEdit.unpatrolled" class="cwa-rc__unpatrolled" title="Неотпатрулированная правка">!</span>
                                                    <span class="cwa-rc__time">{{ subEdit.time }}</span>
                                                    <span v-if="subEdit.type !== 'log' && subEdit.type !== 'discussion'" class="cwa-rc__size" :class="getSizeClass(subEdit.sizeDiff)">
                                                        ({{ subEdit.sizeDiff > 0 ? '+' : '' }}{{ subEdit.sizeDiff }})
                                                    </span>
                                                    <span v-if="subEdit.actionText" class="cwa-rc__action-text">({{ subEdit.actionText }})</span>
                                                    <span v-if="subEdit.flags && subEdit.flags.length" class="cwa-rc__flags">
                                                        ( <template v-for="(flag, index) in subEdit.flags" :key="index">
                                                            <abbr class="cwa-rc__flag-abbr" :title="flag.title">{{ flag.text }}</abbr><span v-if="index < subEdit.flags.length - 1"> | </span>
                                                        </template> )
                                                    </span>
                                                </div>
                                                <div class="cwa-rc__details">
                                                    <span class="cwa-rc__user-wrap">
                                                        <a :href="subEdit.userUrl" class="cwa-rc__user" target="_blank" rel="noopener noreferrer">{{ subEdit.user }}</a>
                                                        <span class="cwa-rc__user-actions">
                                                            <button class="cwa-rc__action-btn" title="Стена обсуждения" @click.stop="openInNewTab(subEdit.userTalkUrl)"><i class="fa-solid fa-comment-dots"></i></button>
                                                            <button class="cwa-rc__action-btn" title="Вклад" @click.stop="openInNewTab(subEdit.userContribsUrl)"><i class="fa-solid fa-list-ul"></i></button>
                                                            <button v-if="canBlock" class="cwa-rc__action-btn" title="Заблокировать" @click.stop="openInNewTab(subEdit.userBlockUrl)"><i class="fa-solid fa-user-slash"></i></button>
                                                        </span>
                                                    </span>
                                                    <span class="cwa-rc__summary" v-html="subEdit.parsedComment"></span>
                                                </div>
                                            </div>
                                            <div class="cwa-rc__actions">
                                                <button v-if="canPatrol && subEdit.unpatrolled" class="cwa-rc__action-btn cwa-rc__action-btn--success" title="Отпатрулировать" @click="doPatrol(subEdit)">
                                                    <i class="fa-solid fa-check"></i>
                                                </button>
                                                <button v-if="subEdit.old_revid" class="cwa-rc__action-btn" title="Показать изменения" @click="openDiffModal(subEdit.wikiDomain, subEdit.old_revid, subEdit.revid, subEdit.title)">
                                                    <i class="fa-solid fa-code-compare"></i>
                                                </button>
                                                <button v-if="subEdit.undoUrl" class="cwa-rc__action-btn cwa-rc__action-btn--warn" title="Отменить" @click.stop="openInNewTab(subEdit.undoUrl)">
                                                    <i class="fa-solid fa-rotate-left"></i>
                                                </button>
                                                <button v-if="canRollback && subEdit.type !== 'log' && subEdit.type !== 'discussion'" class="cwa-rc__action-btn cwa-rc__action-btn--danger" title="Быстрый откат" @click="doRollback(subEdit)">
                                                    <i class="fa-solid fa-clock-rotate-left"></i>
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </template>
                    </ul>
                </main>
                <!-- МОДАЛЬНОЕ ОКНО -->
                <div v-if="modal.isOpen" class="cwa-modal-overlay" @click.self="closeModal">
                    <div class="cwa-modal">
                        <header class="cwa-modal__header">
                            <h3>{{ modal.title }}</h3>
                            <button class="cwa-modal__close" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
                        </header>
                        <div class="cwa-modal__body">
                            <div v-if="modal.isLoading" class="cwa-modal__loader">
                                <i class="fa-solid fa-spinner fa-spin-pulse"></i> Загрузка...
                            </div>
                            <div v-else class="cwa-modal__content" id="mw-content-text">
                                <div class="mw-parser-output" v-html="modal.content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;

/* === LAYER: 04_state.js === */
const AppState = {
        data() {
            const uGroupsSet = new Set(mw.config.get('wgUserGroups') ?? []);
            const rollbackGroups = new Set(['sysop', 'content-moderator', 'rollback', 'staff', 'wiki-representative', 'soap']);
            const patrolGroups = new Set(['sysop', 'content-moderator', 'staff', 'wiki-representative', 'soap', 'wiki-specialist']);
            const blockGroups = new Set(['sysop', 'staff', 'wiki-representative', 'soap']);

            // ES2025/ES2026 Set.prototype.isDisjointFrom (O(1) проверка пересечения множеств групп)
            const hasRollback = !uGroupsSet.isDisjointFrom(rollbackGroups);
            const hasPatrol = !uGroupsSet.isDisjointFrom(patrolGroups);
            const hasBlock = !uGroupsSet.isDisjointFrom(blockGroups);

            let cachedPatrolled = [];
            try {
                const parsed = JSON.parse(localStorage.getItem('cwa-patrolled-cache') ?? '[]');
                if (Array.isArray(parsed)) cachedPatrolled = parsed;
            } catch {}

            return {
                canRollback: hasRollback,
                canPatrol: hasPatrol,
                canBlock: hasBlock,
                isLoading: false,
                isPatrolling: false,
                activeTab: 'content',
                settings: { limit: 4000, days: 3, showBots: false, showMinor: true, autoRefresh: 60 },
                refreshInterval: null,
                apiCache: {},
                wikis: [],
                edits: [],
                failedWikis: [],
                expandedGroups: {},
                patrolledIds: cachedPatrolled,
                tabs: [
                    { id: 'content', name: 'Статьи и Шаблоны', icon: 'fa-solid fa-file-lines' },
                    { id: 'social', name: 'Общение', icon: 'fa-solid fa-comments' },
                    { id: 'media', name: 'Медиа', icon: 'fa-solid fa-image' },
                    { id: 'system', name: 'Служебное и Боты', icon: 'fa-solid fa-robot' }
                ],
                modal: { isOpen: false, isLoading: false, title: '', content: '' }
            };
        },
        computed: {
            hasUnpatrolled() {
                return this.edits.some(e => e.unpatrolled && e.category === this.activeTab);
            },
            editsByDate() {
                const filtered = this.getEditsByTab(this.activeTab);
                const groupMap = new Map();

                for (const edit of filtered) {
                    const dateKey = new Date(edit.timestamp).toDateString();
                    const groupKey = `${edit.wikiDomain}-${edit.groupWithID}-${dateKey}`;
                    const existing = groupMap.get(groupKey);

                    if (existing) {
                        existing.items.push(edit);
                        existing.totalSizeDiff += edit.sizeDiff;
                    } else {
                        groupMap.set(groupKey, {
                            key: groupKey,
                            wikiDomain: edit.wikiDomain,
                            wikiName: edit.wikiName,
                            wikiFavicon: edit.wikiFavicon,
                            title: edit.title,
                            totalSizeDiff: edit.sizeDiff,
                            items: [edit]
                        });
                    }
                }

                const result = [];
                for (const g of groupMap.values()) {
                    const d = new Date(g.items[0].timestamp);
                    const dateStr = d.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');

                    const lastDateGroup = result.at(-1);
                    if (lastDateGroup?.date === dateStr) {
                        lastDateGroup.groups.push(g);
                    } else {
                        result.push({ date: dateStr, groups: [g] });
                    }
                }
                return result;
            }
        }
    };

/* === LAYER: 05_api_methods.js === */
const AppMethodsApi = {
        getForeignApi(cleanDomain, anonymous = false) {
            const cacheKey = `${cleanDomain}:${anonymous ? 'anon' : 'auth'}`;
            return (this.apiCache[cacheKey] ??= new mw.ForeignApi(
                `https://${cleanDomain}/api.php`,
                anonymous ? { anonymous: true } : {}
            ));
        },

        async fetchConfig() {
            try {
                const rawUrl = `${mw.util.wikiScript()}?title=MediaWiki:Custom-CrossWikiActivity.json&action=raw&ctype=application/json`;
                const rawRes = await fetch(rawUrl);
                if (!rawRes.ok) return;

                const parsed = await rawRes.json();
                if (parsed) {
                    this.wikis = Array.isArray(parsed.wikis) ? parsed.wikis : [];
                    if (parsed.settings && typeof parsed.settings === 'object') {
                        Object.assign(this.settings, parsed.settings);
                    }
                }
            } catch (e) {
                console.error('[CWA] Ошибка загрузки MediaWiki:Custom-CrossWikiActivity.json:', e);
            }
        },

        async fetchData() {
            if (this.wikis.length === 0) {
                await this.fetchConfig();
                this.setupAutoRefresh();
            }

            this.isLoading = true;
            this.failedWikis = [];

            try {
                const editsMap = new Map();
                const endDate = new Date();
                endDate.setDate(endDate.getDate() - (this.settings.days || 3));
                const rcend = endDate.toISOString();

                const rcshow = [];
                if (this.settings.showBots === false) rcshow.push('!bot');
                if (this.settings.showMinor === false) rcshow.push('!minor');

                const fetchPromises = this.wikis.map((rawDomain, index) => new Promise((resolve) => {
                    setTimeout(async () => {
                        let cleanDomain;
                        try {
                            cleanDomain = this.formatWikiUrl(rawDomain);
                        } catch {
                            if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                            return resolve([]);
                        }

                        const wikiEdits = [];
                        let currentWikiName = cleanDomain;

                        try {
                            const baseParams = {
                                action: 'query',
                                list: 'recentchanges',
                                meta: 'siteinfo',
                                siprop: 'general',
                                rclimit: this.settings.limit || 4000,
                                rctype: 'edit|new|log',
                                rcend,
                                formatversion: 2,
                                _: Date.now()
                            };
                            if (rcshow.length > 0) baseParams.rcshow = rcshow.join('|');

                            const anonProps = 'user|title|ids|sizes|timestamp|loginfo|parsedcomment|flags';
                            const rcPromise = this.canPatrol
                                ? this.getForeignApi(cleanDomain, false)
                                    .get({ ...baseParams, rcprop: `${anonProps}|patrolled` })
                                    .catch(() => this.getForeignApi(cleanDomain, true).get({ ...baseParams, rcprop: anonProps }).catch(() => null))
                                : this.getForeignApi(cleanDomain, true).get({ ...baseParams, rcprop: anonProps }).catch(() => null);

                            const discLimit = Math.min(this.settings.limit || 100, 100);
                            const discPromise = fetch(
                                `https://${cleanDomain}/wikia.php?controller=DiscussionPost&method=getPosts&limit=${discLimit}&viewableOnly=true&format=json&cb=${Date.now()}`,
                                { mode: 'cors' }
                            ).then(r => (r.ok ? r.json() : null)).catch(() => null);

                            const [res, discData] = await Promise.all([rcPromise, discPromise]);

                            if (res?.query?.recentchanges) {
                                currentWikiName = res.query.general?.sitename || cleanDomain;
                                const rcEdits = res.query.recentchanges;

                                if (this.canPatrol && rcEdits.length > 0) {
                                    const trustedGroups = new Set([
                                        'sysop', 'content-moderator', 'rollback', 'staff',
                                        'wiki-representative', 'soap', 'wiki-specialist',
                                        'bot', 'autopatrolled', 'vanguard', 'voldev',
                                        'global-discussions-moderator'
                                    ]);
                                    const trustedUsers = new Set([
                                        'GlobalJSReviewer', 'Fandom', 'Fandombot', 'Wikia', 'WikiaBot', 'Default',
                                        mw.config.get('wgUserName')
                                    ]);

                                    const uniqueUsers = [...new Set(rcEdits.map(rc => rc.user).filter(Boolean))];
                                    const uApi = this.getForeignApi(cleanDomain, true);
                                    const userChunks = Array.from(
                                        { length: Math.ceil(uniqueUsers.length / 50) },
                                        (_, i) => uniqueUsers.slice(i * 50, i * 50 + 50)
                                    );

                                    const uResults = await Promise.all(
                                        userChunks.map(chunk => uApi.get({
                                            action: 'query',
                                            list: 'users',
                                            ususers: chunk.join('|'),
                                            usprop: 'groups',
                                            formatversion: 2
                                        }).catch(() => null))
                                    );

                                    for (const uRes of uResults) {
                                        for (const u of uRes?.query?.users ?? []) {
                                            if (u.groups && !new Set(u.groups).isDisjointFrom(trustedGroups)) {
                                                trustedUsers.add(u.name);
                                            }
                                        }
                                    }

                                    for (const rc of rcEdits) {
                                        if (trustedUsers.has(rc.user)) delete rc.unpatrolled;
                                    }
                                }

                                wikiEdits.push(...rcEdits.map(rc => this.normalizeData(rc, cleanDomain, currentWikiName)));
                            } else if (!this.failedWikis.includes(rawDomain)) {
                                this.failedWikis.push(rawDomain);
                            }

                            if (discData) {
                                const posts = discData._embedded?.['doc:posts'] ?? [];
                                const uniqueIds = [...new Set(
                                    posts
                                        .filter(p => p._embedded?.thread?.[0]?.containerType === 'ARTICLE_COMMENT')
                                        .map(p => p.forumId)
                                        .filter(Boolean)
                                )];
                                let articleData = {};

                                if (uniqueIds.length > 0) {
                                    try {
                                        const artRes = await fetch(
                                            `https://${cleanDomain}/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=${uniqueIds.join(',')}&format=json&cb=${Date.now()}`,
                                            { mode: 'cors' }
                                        );
                                        if (artRes.ok) {
                                            articleData = (await artRes.json()).articleNames ?? {};
                                        }
                                    } catch {}
                                }

                                for (const p of posts) {
                                    try {
                                        wikiEdits.push(this.normalizeDiscussion(p, cleanDomain, articleData, currentWikiName));
                                    } catch {}
                                }
                            }

                            resolve(wikiEdits);
                        } catch {
                            if (!this.failedWikis.includes(rawDomain)) this.failedWikis.push(rawDomain);
                            resolve([]);
                        }
                    }, index * 50);
                }));

                const results = await Promise.all(fetchPromises);
                for (const e of this.edits) editsMap.set(e.id, e);
                for (const wikiEdits of results) {
                    for (const e of wikiEdits) editsMap.set(e.id, e);
                }

                this.edits = editsMap.values()
                    .filter(edit => new Date(edit.timestamp) >= endDate)
                    .toArray()
                    .toSorted((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            } finally {
                this.isLoading = false;
            }
        },

        normalizeData(rc, wikiDomain, wikiName) {
            const serverUrl = `https://${wikiDomain}`;
            const articlePath = `${serverUrl}/wiki/`;

            let category = 'content';
            let groupWithID = rc.title;
            const isBot = Boolean(rc.bot);

            const mediaNs = [-2, 6];
            const systemNs = [-1, 2, 8, 828];
            const socialNs = [119, 500, 501, 502, 503, 1200, 1201, 1202, 2000, 2001, 2002];

            if (rc.type === 'log') {
                groupWithID = rc.logtype;
                if (rc.logtype === 'upload' || mediaNs.includes(rc.ns)) category = 'media';
                else if (rc.ns % 2 !== 0 || socialNs.includes(rc.ns)) category = 'social';
                else category = 'system';
            } else if (mediaNs.includes(rc.ns)) {
                category = 'media';
            } else if (rc.ns % 2 !== 0 || socialNs.includes(rc.ns)) {
                category = 'social';
            } else if (systemNs.includes(rc.ns)) {
                category = 'system';
            }

            const flagsArr = [];
            if (rc.type === 'new') flagsArr.push({ text: 'Н', title: 'Новая страница' });
            if (rc.minor) flagsArr.push({ text: 'м', title: 'Малая правка' });
            if (isBot) flagsArr.push({ text: 'б', title: 'Правка бота' });

            let actionTitle = null;
            let socialContext = null;

            if (category === 'social') {
                const isMessage = [1200, 1201, 1202].includes(rc.ns);
                const isPost = [2000, 2001, 2002].includes(rc.ns);
                const isBlog = [500, 501, 502, 503].includes(rc.ns);
                const isTalk = !isMessage && !isPost && !isBlog;

                let act = 'Изменение';
                let actKey = 'update';
                if (rc.type === 'new') {
                    act = 'Новый';
                    actKey = 'create';
                } else if (rc.type === 'log') {
                    act = CwaDicts.logActMap[rc.logaction] ?? 'Изменение';
                    const logKeyMap = { delete: 'delete', restore: 'undelete', protect: 'lock', unprotect: 'unlock' };
                    actKey = logKeyMap[rc.logaction] ?? 'update';
                }

                const cType = isTalk ? 'talk' : isBlog ? 'blog' : isMessage ? 'message' : 'post';
                const iconContentBase = isTalk ? 'comment' : cType;
                const isReply = (isBlog && (rc.ns === 501 || rc.ns === 503)) || (isMessage && rc.ns === 1201) || (isPost && rc.ns === 2001);

                socialContext = {
                    activityType: actKey,
                    contentType: `${iconContentBase}${isReply ? '-reply' : ''}`
                };

                if (act === 'Новый' && isReply) {
                    const replyMap = { blog: 'Ответ на блог', message: 'Ответ на сообщение', post: 'Ответ на пост' };
                    actionTitle = replyMap[cType] ?? 'Новое обсуждение';
                } else {
                    actionTitle = CwaDicts.socialTitleMap?.[cType]?.[act] ?? 'Изменение';
                }
            } else if (rc.type === 'new') {
                actionTitle = rc.ns === 6 ? 'Загружен новый файл' : 'Создана новая страница';
            } else if (rc.type === 'log') {
                actionTitle = CwaDicts.logMap[`${rc.logtype}/${rc.logaction}`] ?? `${rc.logtype} / ${rc.logaction}`;
            } else {
                actionTitle = rc.ns === 6 ? 'Отредактирован файл' : 'Отредактирована страница';
            }

            const targetId = rc.rcid || rc.logid || rc.revid;
            const fallbackLogComment = rc.type === 'log'
                ? (CwaDicts.logNamesMap[rc.logtype] ?? `Журнал: ${mw.html.escape(String(rc.logtype ?? ''))} (${mw.html.escape(String(rc.logaction ?? ''))})`)
                : '';

            return Object.freeze({
                id: rc.rcid || rc.logid || Math.random().toString(36).slice(2, 9),
                revid: rc.revid,
                rcid: rc.rcid,
                old_revid: rc.old_revid,
                pageid: rc.pageid,
                unpatrolled: rc.unpatrolled !== undefined && !this.patrolledIds.includes(targetId),
                type: rc.type,
                logtype: rc.logtype,
                logaction: rc.logaction,
                ns: rc.ns,
                title: rc.title,
                user: rc.user,
                timestamp: rc.timestamp,
                time: new Date(rc.timestamp).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
                parsedComment: rc.parsedcomment || fallbackLogComment,
                sizeDiff: (rc.newlen ?? 0) - (rc.oldlen ?? 0),
                flags: flagsArr,
                wikiDomain,
                wikiName: wikiName || wikiDomain,
                wikiFavicon: `${serverUrl}/wiki/Special:FilePath/Site-favicon.ico`,
                pageUrl: `${articlePath}${encodeURIComponent(rc.title)}`,
                userUrl: `${articlePath}User:${encodeURIComponent(rc.user)}`,
                userTalkUrl: `${articlePath}User_talk:${encodeURIComponent(rc.user)}`,
                userContribsUrl: `${articlePath}Special:Contributions/${encodeURIComponent(rc.user)}`,
                userBlockUrl: `${articlePath}Special:Block/${encodeURIComponent(rc.user)}`,
                undoUrl: rc.revid && rc.old_revid ? `${articlePath}${encodeURIComponent(rc.title)}?action=edit&undo=${rc.revid}&undoafter=${rc.old_revid}` : null,
                category,
                groupWithID,
                actionTitle,
                socialContext
            });
        },

        normalizeDiscussion(post, wikiDomain, articleData, wikiName) {
            const thread = post._embedded?.thread?.[0] ?? {};
            const createdEpoch = post.creationDate?.epochSecond ?? 0;
            const modifiedEpoch = post.modificationDate?.epochSecond ?? createdEpoch;
            const date = new Date((modifiedEpoch || createdEpoch) * 1000);
            const isReply = post.position > 1;
            const containerType = thread.containerType || 'FORUM';

            let pageUrl = '';
            let contentType = 'post';
            let displayTitle = thread.title || post.title;

            if (containerType === 'ARTICLE_COMMENT') {
                contentType = (displayTitle?.startsWith('User blog:') || displayTitle?.startsWith('Блог участника:')) ? 'blog' : 'comment';
                const info = articleData?.[post.forumId] ?? null;
                if (info) {
                    pageUrl = `https://${wikiDomain}/wiki/${encodeURIComponent(info.title.replaceAll(' ', '_'))}?commentId=${encodeURIComponent(post.threadId)}${isReply ? `&replyId=${encodeURIComponent(post.id)}` : ''}`;
                    displayTitle = info.title;
                } else {
                    pageUrl = `https://${wikiDomain}/f/p/${encodeURIComponent(post.threadId)}`;
                    displayTitle = post.forumName || 'Комментарий к статье';
                }
            } else if (containerType === 'WALL' || containerType === 'MESSAGE_WALL') {
                const cleanWallName = (post.forumName ?? '').replace(/ Message Wall$/, '').replace(/^Стена обсуждения:/, '');
                pageUrl = `https://${wikiDomain}/wiki/Message_Wall:${encodeURIComponent(cleanWallName.replaceAll(' ', '_'))}?threadId=${encodeURIComponent(post.threadId)}${isReply ? `#${encodeURIComponent(post.id)}` : ''}`;
                if (!displayTitle || displayTitle.startsWith('@')) displayTitle = 'Стена обсуждения';
                contentType = 'message';
            } else {
                pageUrl = `https://${wikiDomain}/f/p/${encodeURIComponent(post.threadId)}${isReply ? `/r/${encodeURIComponent(post.id)}` : ''}`;
                displayTitle ||= 'Обсуждение на форуме';
            }

            let summary = post.snippet || post.rawContent || post.body;
            if (!summary && post.jsonModel) {
                try {
                    const texts = [];
                    JSON.parse(post.jsonModel, (key, value) => {
                        if (key === 'text' && typeof value === 'string') texts.push(value);
                        return value;
                    });
                    summary = texts.join(' ').replace(/\s+/g, ' ').trim();
                } catch {}
            }

            summary ||= '(Вложение / Опрос)';
            if (summary.length > 85) summary = `${summary.slice(0, 85)}...`;

            let act = 'Новый';
            let activityType = 'create';
            if (post.isDeleted) {
                act = 'Удаление';
                activityType = 'delete';
            } else if (post.isLocked) {
                act = 'Закрытие';
                activityType = 'lock';
            } else if (modifiedEpoch - createdEpoch > 60) {
                act = 'Изменение';
                activityType = 'update';
            }

            const safeContentType = ['comment', 'message', 'blog', 'post'].includes(contentType) ? contentType : 'post';
            const replyMap = {
                comment: 'Ответ на комментарий',
                message: 'Ответ на сообщение',
                blog: 'Ответ на блог',
                post: 'Ответ на пост'
            };
            const actionTitle = (act === 'Новый' && isReply)
                ? replyMap[safeContentType]
                : (CwaDicts.socialTitleMap?.[safeContentType]?.[act] ?? 'Изменение');

            const userName = post.createdBy?.name || 'Аноним';

            return Object.freeze({
                id: `disc-${post.id}`,
                revid: null,
                rcid: null,
                old_revid: null,
                pageid: null,
                unpatrolled: false,
                type: 'discussion',
                logtype: '',
                logaction: '',
                ns: -5234,
                title: displayTitle,
                actionTitle,
                user: userName,
                timestamp: date.toISOString(),
                time: date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
                parsedComment: mw.html.escape(summary),
                sizeDiff: 0,
                flags: [],
                wikiDomain,
                wikiName: wikiName || wikiDomain,
                wikiFavicon: `https://${wikiDomain}/wiki/Special:FilePath/Site-favicon.ico`,
                pageUrl,
                userUrl: `https://${wikiDomain}/wiki/User:${encodeURIComponent(userName)}`,
                userTalkUrl: `https://${wikiDomain}/wiki/User_talk:${encodeURIComponent(userName)}`,
                userContribsUrl: `https://${wikiDomain}/wiki/Special:Contributions/${encodeURIComponent(userName)}`,
                userBlockUrl: `https://${wikiDomain}/wiki/Special:Block/${encodeURIComponent(userName)}`,
                category: 'social',
                groupWithID: `disc-${post.threadId}`,
                socialContext: {
                    activityType,
                    contentType: `${safeContentType}${isReply ? '-reply' : ''}`
                },
                jsonModel: post.jsonModel,
                rawContent: post.rawContent
            });
        }
    };

/* === LAYER: 06_ui_methods.js === */
const AppMethodsUi = {
        sanitizeUrl(rawUrl) {
            if (!rawUrl || typeof rawUrl !== 'string') return '#';
            const trimmed = rawUrl.trim();
            if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
                return mw.html.escape(trimmed);
            }
            try {
                const parsed = new URL(trimmed);
                if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                    return mw.html.escape(parsed.href);
                }
            } catch {}
            return '#';
        },

        savePatrolledId(id) {
            if (!id || this.patrolledIds.includes(id)) return;
            this.patrolledIds.push(id);
            if (this.patrolledIds.length > 2000) {
                this.patrolledIds = this.patrolledIds.slice(-2000);
            }
            try {
                localStorage.setItem('cwa-patrolled-cache', JSON.stringify(this.patrolledIds));
            } catch {}
        },

        openInNewTab(url) {
            if (url) window.open(url, '_blank', 'noopener,noreferrer');
        },

        pluralize(count, words) {
            const cases = [2, 0, 1, 1, 1, 2];
            return `${count} ${words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]]}`;
        },

        getEditsByTab(tabId) {
            return this.edits.filter(edit => edit.category === tabId);
        },

        toggleGroup(key) {
            this.expandedGroups[key] = !this.expandedGroups[key];
        },

        getGroupDiff(group) {
            const diffableEdits = group.items.filter(i => i.revid && i.old_revid);
            if (diffableEdits.length === 0) return null;
            return { from: diffableEdits.at(-1).old_revid, to: diffableEdits[0].revid };
        },

        formatWikiUrl(inputUrl) {
            const urlToParse = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
            const parsed = new URL(urlToParse);
            const hostname = parsed.hostname.toLowerCase();

            if (!hostname.endsWith('.fandom.com') && hostname !== 'fandom.com') {
                throw new Error('Security Error: Only fandom.com domains are allowed.');
            }

            let url = `${hostname}${parsed.pathname}`.replace(/\/$/, '');
            const oldFormatMatch = url.match(/^([a-z]{2,3}(?:-[a-z]{2,4})?)\.([^.]+)\.fandom\.com$/);
            if (oldFormatMatch) {
                url = `${oldFormatMatch[2]}.fandom.com/${oldFormatMatch[1]}`;
            }
            return url;
        },

        setupAutoRefresh() {
            if (this.refreshInterval) clearInterval(this.refreshInterval);
            if (this.settings.autoRefresh > 0) {
                this.refreshInterval = setInterval(() => {
                    if (!this.isLoading && !this.isPatrolling) this.fetchData();
                }, this.settings.autoRefresh * 1000);
            }
        },

        getIconForType(edit) {
            if (edit.socialContext) {
                const { activityType, contentType } = edit.socialContext;
                const socialIcon = CwaDicts.icons.social[activityType]?.[contentType];
                if (socialIcon) return socialIcon;
                if (edit.type === 'discussion') return 'fa-solid fa-comment';
            }
            if (edit.type === 'log') {
                return CwaDicts.icons.log[edit.logtype] ?? 'fa-solid fa-clipboard-list';
            }
            if (edit.type === 'new') return 'fa-solid fa-folder-plus';
            return CwaDicts.icons.ns[edit.ns] ?? 'fa-solid fa-pen-to-square';
        },

        getSizeClass(diff) {
            if (diff > 500) return 'cwa-rc__size--large-plus';
            if (diff > 0) return 'cwa-rc__size--plus';
            if (diff < -500) return 'cwa-rc__size--large-minus';
            if (diff < 0) return 'cwa-rc__size--minus';
            return 'cwa-rc__size--zero';
        },

        async doPatrol(edit) {
            try {
                const api = this.getForeignApi(edit.wikiDomain, false);
                const params = { action: 'patrol', formatversion: 2 };
                if (edit.rcid) params.rcid = edit.rcid;
                else if (edit.revid) params.revid = edit.revid;
                else throw new Error('No ID');

                await api.postWithToken('patrol', params);
                mw.notify(`Правка на странице "${edit.title}" отпатрулирована.`, { type: 'success' });

                this.savePatrolledId(edit.rcid || edit.logid || edit.revid);
                const index = this.edits.findIndex(e => e.id === edit.id);
                if (index !== -1) {
                    this.edits[index] = Object.freeze({ ...this.edits[index], unpatrolled: false });
                }
            } catch (e) {
                mw.notify(`Ошибка при патрулировании: ${e.info || 'Нет прав.'}`, { type: 'error' });
            }
        },

        async doPatrolGroup(group) {
            const unpatrolled = group.items.filter(i => i.unpatrolled);
            if (!unpatrolled.length) return;

            try {
                const api = this.getForeignApi(group.wikiDomain, false);
                for (const edit of unpatrolled) {
                    const params = { action: 'patrol', formatversion: 2 };
                    if (edit.rcid) params.rcid = edit.rcid;
                    else if (edit.revid) params.revid = edit.revid;
                    else continue;

                    await api.postWithToken('patrol', params);
                    this.savePatrolledId(edit.rcid || edit.logid || edit.revid);

                    const index = this.edits.findIndex(e => e.id === edit.id);
                    if (index !== -1) {
                        this.edits[index] = Object.freeze({ ...this.edits[index], unpatrolled: false });
                    }
                }
                mw.notify('Группа правок отпатрулирована.', { type: 'success' });
            } catch (e) {
                mw.notify(`Ошибка при патрулировании группы: ${e.info || 'Нет прав.'}`, { type: 'error' });
            }
        },

        async patrolAll() {
            const unpatrolled = this.edits.filter(e => e.unpatrolled && e.category === this.activeTab);
            if (!unpatrolled.length) return;
            if (!confirm(`Найдено действий для патрулирования на текущей вкладке: ${unpatrolled.length}. Начать процесс?`)) return;

            this.isPatrolling = true;
            let successCount = 0;
            let errorCount = 0;

            // ES2024 Object.groupBy
            const byDomain = Object.groupBy(unpatrolled, edit => edit.wikiDomain);

            for (const [domain, items] of Object.entries(byDomain)) {
                const api = this.getForeignApi(domain, false);

                for (let i = 0; i < items.length; i += 4) {
                    const chunk = items.slice(i, i + 4);
                    await Promise.all(chunk.map(async (edit) => {
                        try {
                            const params = { action: 'patrol', formatversion: 2 };
                            if (edit.rcid) params.rcid = edit.rcid;
                            else if (edit.revid) params.revid = edit.revid;
                            else return;

                            await api.postWithToken('patrol', params);
                            this.savePatrolledId(edit.rcid || edit.logid || edit.revid);

                            const index = this.edits.findIndex(e => e.id === edit.id);
                            if (index !== -1) {
                                this.edits[index] = Object.freeze({ ...this.edits[index], unpatrolled: false });
                            }
                            successCount++;
                        } catch {
                            errorCount++;
                        }
                    }));
                    await new Promise(r => setTimeout(r, 250));
                }
            }

            this.isPatrolling = false;
            mw.notify(
                `Готово! Успешно: ${successCount}${errorCount > 0 ? `, Ошибок: ${errorCount}` : ''}`,
                { type: errorCount > 0 ? 'warn' : 'success' }
            );
        },

        async doRollback(edit) {
            if (!confirm(`Откатить правки участника ${edit.user} на странице "${edit.title}"?`)) return;
            try {
                const api = this.getForeignApi(edit.wikiDomain, false);
                await api.postWithToken('rollback', {
                    action: 'rollback',
                    title: edit.title,
                    user: edit.user,
                    formatversion: 2
                });
                mw.notify(`Правки участника ${edit.user} успешно откачены.`, { type: 'success' });
                this.edits = this.edits.filter(e => e.id !== edit.id);
            } catch (e) {
                mw.notify(`Ошибка при откате: ${e.info || 'Недостаточно прав или правка уже откачена.'}`, { type: 'error' });
            }
        },

        cleanUpRemoteResources() {
            for (const id of ['cwa-remote-styles', 'cwa-remote-inline', 'cwa-remote-styles-preload']) {
                document.getElementById(id)?.remove();
            }
        },

        closeModal() {
            this.cleanUpRemoteResources();
            this.modal.isOpen = false;
            this.modal.content = '';
        },

        openDiffModal(wikiDomain, fromRev, toRev, title) {
            this.cleanUpRemoteResources();
            this.modal.isOpen = true;
            this.modal.isLoading = true;
            this.modal.title = `Сравнение версий: ${title}`;

            const siteStylesUrl = `https://${wikiDomain}/load.php?lang=ru&modules=mediawiki.diff.styles|site.styles&only=styles&skin=fandomdesktop`;
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'style';
            preloadLink.href = siteStylesUrl;
            preloadLink.id = 'cwa-remote-styles-preload';
            document.head.appendChild(preloadLink);

            const api = this.getForeignApi(wikiDomain, true);
            api.get({
                action: 'compare',
                fromrev: fromRev,
                torev: toRev,
                prop: 'diff|ids|title|user|timestamp|parsedcomment',
                formatversion: 2
            }).then(data => {
                if (data?.compare?.body) {
                    const c = data.compare;
                    const serverUrl = `https://${wikiDomain}`;
                    const articleUrl = mw.html.escape(`${serverUrl}/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`);

                    const formatTime = (ts) => {
                        if (!ts) return '';
                        const d = new Date(ts);
                        const time = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                        const date = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');
                        return mw.html.escape(`${time}, ${date}`);
                    };

                    const fromTs = formatTime(c.fromtimestamp);
                    const toTs = formatTime(c.totimestamp);
                    const rawFromUser = c.fromuser || 'Аноним';
                    const rawToUser = c.touser || 'Аноним';
                    const fromUser = mw.html.escape(rawFromUser);
                    const toUser = mw.html.escape(rawToUser);
                    const fromRevId = Number(c.fromrevid) || 0;
                    const toRevId = Number(c.torevid) || 0;

                    const headerHtml = `
                        <tr class="diff-header" valign="top">
                            <td class="diff-otitle" colspan="2">
                                <div class="mw-diff-otitle1"><strong><a href="${articleUrl}?oldid=${fromRevId}" target="_blank" rel="noopener noreferrer" data-action="revision-link-before">Версия от ${fromTs}</a> <span class="mw-rev-head-action">(<a href="${articleUrl}?oldid=${fromRevId}&action=edit" target="_blank" rel="noopener noreferrer" data-action="edit-revision-before">править</a>)</span></strong></div>
                                <div class="mw-diff-otitle2"><span class="mw-usertoollinks"><a href="${serverUrl}/wiki/User:${encodeURIComponent(rawFromUser)}" target="_blank" rel="noopener noreferrer" data-username="${fromUser}">${fromUser}</a> (<a href="${serverUrl}/wiki/User_talk:${encodeURIComponent(rawFromUser)}" target="_blank" rel="noopener noreferrer">обсуждение</a> | <a href="${serverUrl}/wiki/Special:Contributions/${encodeURIComponent(rawFromUser)}" target="_blank" rel="noopener noreferrer">вклад</a>)</span></div>
                                <div class="mw-diff-otitle3 cwa-rc__summary">${c.fromparsedcomment || ''}</div>
                            </td>
                            <td class="diff-ntitle" colspan="2">
                                <div class="mw-diff-ntitle1"><strong><a href="${articleUrl}?oldid=${toRevId}" target="_blank" rel="noopener noreferrer" data-action="revision-link-after">Версия от ${toTs}</a> <span class="mw-rev-head-action">(<a href="${articleUrl}?oldid=${toRevId}&action=edit" target="_blank" rel="noopener noreferrer" data-action="edit-revision-after">править</a>)</span><span class="mw-rev-head-action">(<a href="${articleUrl}?action=edit&undoafter=${fromRevId}&undo=${toRevId}" target="_blank" rel="noopener noreferrer" data-action="undo">отменить</a>)</span></strong></div>
                                <div class="mw-diff-ntitle2"><span class="mw-usertoollinks"><a href="${serverUrl}/wiki/User:${encodeURIComponent(rawToUser)}" target="_blank" rel="noopener noreferrer" data-username="${toUser}">${toUser}</a> (<a href="${serverUrl}/wiki/User_talk:${encodeURIComponent(rawToUser)}" target="_blank" rel="noopener noreferrer">обсуждение</a> | <a href="${serverUrl}/wiki/Special:Contributions/${encodeURIComponent(rawToUser)}" target="_blank" rel="noopener noreferrer">вклад</a>)</span></div>
                                <div class="mw-diff-ntitle3 cwa-rc__summary">${c.toparsedcomment || ''}</div>
                            </td>
                        </tr>
                    `;

                    const linkNode = document.createElement('link');
                    linkNode.id = 'cwa-remote-styles';
                    linkNode.rel = 'stylesheet';
                    linkNode.href = siteStylesUrl;

                    const finishLoading = () => {
                        this.modal.content = `
                            <div class="cwa-remote-container skin-fandomdesktop theme-fandomdesktop-dark sitedir-ltr">
                                <table class="diff"><colgroup><col class="diff-marker"><col class="diff-content"><col class="diff-marker"><col class="diff-content"></colgroup><tbody>${headerHtml}${data.compare.body}</tbody></table>
                            </div>
                        `;
                        this.modal.isLoading = false;
                    };

                    linkNode.onload = finishLoading;
                    linkNode.onerror = finishLoading;
                    document.body.appendChild(linkNode);
                } else {
                    this.modal.content = '<em>Изменения скрыты или не найдены.</em>';
                    this.modal.isLoading = false;
                }
            }).catch(() => {
                this.modal.content = '<em>Не удалось загрузить изменения.</em>';
                this.modal.isLoading = false;
            });
        },

        parseProseMirror(jsonString, fallbackText) {
            if (!jsonString) {
                return fallbackText ? `<p>${mw.html.escape(fallbackText)}</p>` : '<em>Нет содержимого</em>';
            }
            try {
                const doc = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

                const renderMarks = (text, marks) => {
                    let res = mw.html.escape(text ?? '');
                    if (!marks?.length) return res;
                    for (const m of marks) {
                        if (m.type === 'strong') res = `<strong>${res}</strong>`;
                        else if (m.type === 'em') res = `<em>${res}</em>`;
                        else if (m.type === 'code') res = `<code>${res}</code>`;
                        else if (m.type === 'underline') res = `<u>${res}</u>`;
                        else if (m.type === 'strike') res = `<s>${res}</s>`;
                        else if (m.type === 'link') {
                            res = `<a href="${this.sanitizeUrl(m.attrs?.href)}" target="_blank" rel="noopener noreferrer">${res}</a>`;
                        }
                    }
                    return res;
                };

                const renderNode = (n) => {
                    if (!n || typeof n !== 'object') return '';
                    if (n.type === 'text') return renderMarks(n.text, n.marks);
                    if (n.type === 'hardBreak') return '<br>';

                    const innerHTML = Array.isArray(n.content) ? n.content.map(renderNode).join('') : '';

                    switch (n.type) {
                        case 'doc': return innerHTML;
                        case 'paragraph': return `<p>${innerHTML}</p>`;
                        case 'blockquote': return `<blockquote>${innerHTML}</blockquote>`;
                        case 'bulletList': return `<ul>${innerHTML}</ul>`;
                        case 'orderedList': return `<ol>${innerHTML}</ol>`;
                        case 'listItem': return `<li>${innerHTML}</li>`;
                        case 'heading': {
                            const lvl = Math.min(Math.max(parseInt(n.attrs?.level, 10) || 2, 1), 6);
                            return `<h${lvl}>${innerHTML}</h${lvl}>`;
                        }
                        case 'code_block': return `<pre><code>${innerHTML}</code></pre>`;
                        case 'mention': return `<em>@${mw.html.escape(n.attrs?.text ?? 'User')}</em>`;
                        default: return innerHTML;
                    }
                };

                return renderNode(doc);
            } catch {
                return fallbackText ? `<p>${mw.html.escape(fallbackText)}</p>` : '<em>Ошибка обработки содержимого</em>';
            }
        },

        openPreviewModal(edit) {
            this.cleanUpRemoteResources();
            this.modal.isOpen = true;
            this.modal.isLoading = true;
            this.modal.title = `Предпросмотр: ${edit.title}`;

            if (edit.type === 'discussion') {
                const parsedHtml = this.parseProseMirror(edit.jsonModel, edit.rawContent);
                const siteStylesUrl = `https://${edit.wikiDomain}/load.php?lang=ru&modules=site.styles&only=styles&skin=fandomdesktop`;
                const linkNode = document.createElement('link');
                linkNode.id = 'cwa-remote-styles';
                linkNode.rel = 'stylesheet';
                linkNode.href = siteStylesUrl;

                const finishLoading = () => {
                    this.modal.content = `
                        <div class="cwa-remote-container skin-fandomdesktop theme-fandomdesktop-dark sitedir-ltr">
                            <div class="mw-parser-output">${parsedHtml}</div>
                        </div>
                    `;
                    this.modal.isLoading = false;
                };

                linkNode.onload = finishLoading;
                linkNode.onerror = finishLoading;
                document.body.appendChild(linkNode);
                return;
            }

            if (edit.ns === 6) {
                const api = this.getForeignApi(edit.wikiDomain, true);
                api.get({
                    action: 'query',
                    titles: edit.title,
                    prop: 'imageinfo',
                    iiprop: 'url',
                    formatversion: 2
                }).then(data => {
                    const imgUrl = data?.query?.pages?.[0]?.imageinfo?.[0]?.url;
                    if (imgUrl) {
                        this.modal.content = `<div class="cwa-modal__img-wrap"><img src="${this.sanitizeUrl(imgUrl)}" class="cwa-modal__img" loading="lazy" /></div>`;
                    } else {
                        this.modal.content = '<em>Не удалось загрузить изображение. Возможно, файл удалён.</em>';
                    }
                    this.modal.isLoading = false;
                }).catch(() => {
                    this.modal.content = '<em>Ошибка при загрузке файла.</em>';
                    this.modal.isLoading = false;
                });
                return;
            }

            const siteStylesUrl = `https://${edit.wikiDomain}/load.php?lang=ru&modules=site.styles&only=styles&skin=fandomdesktop`;
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'style';
            preloadLink.href = siteStylesUrl;
            preloadLink.id = 'cwa-remote-styles-preload';
            document.head.appendChild(preloadLink);

            const api = this.getForeignApi(edit.wikiDomain, true);
            const parseParams = edit.pageid ? { pageid: edit.pageid } : { page: edit.title };

            api.get({
                action: 'parse',
                ...parseParams,
                prop: 'text|modules|headhtml',
                useskin: 'fandomdesktop',
                disabletoc: true,
                formatversion: 2
            }).then(data => {
                if (!data?.parse?.text) throw new Error('No content');

                const html = data.parse.text.replace(/(href|src)="(\/(?!\/).*?)"/g, `$1="https://${edit.wikiDomain}$2"`);

                if (data.parse.headhtml) {
                    const doc = new DOMParser().parseFromString(data.parse.headhtml, 'text/html');
                    const inlineStyles = Array.from(doc.querySelectorAll('style'), st => st.textContent).join('\n');
                    if (inlineStyles) {
                        const styleNode = document.createElement('style');
                        styleNode.id = 'cwa-remote-inline';
                        styleNode.textContent = inlineStyles;
                        document.body.appendChild(styleNode);
                    }
                }

                const linkNode = document.createElement('link');
                linkNode.id = 'cwa-remote-styles';
                linkNode.rel = 'stylesheet';
                linkNode.href = siteStylesUrl;

                const finishLoading = () => {
                    this.modal.content = `
                        <div class="cwa-remote-container skin-fandomdesktop theme-fandomdesktop-dark sitedir-ltr">
                            <div class="mw-parser-output">${html}</div>
                        </div>
                    `;
                    this.modal.isLoading = false;

                    this.$nextTick(() => {
                        const safeModules = [
                            ...(data.parse.modules ?? []),
                            ...(data.parse.modulestyles ?? [])
                        ].filter(m => m.startsWith('ext.') || m.startsWith('mediawiki.'));

                        if (safeModules.length > 0) mw.loader.load(safeModules);

                        setTimeout(() => {
                            const contentElement = document.querySelector('.cwa-remote-container .mw-parser-output');
                            if (contentElement && window.mw?.hook && window.$) {
                                window.mw.hook('wikipage.content').fire(window.$(contentElement));
                            }
                        }, 100);
                    });
                };

                linkNode.onload = finishLoading;
                linkNode.onerror = finishLoading;
                document.body.appendChild(linkNode);
            }).catch(() => {
                const authApi = this.getForeignApi(edit.wikiDomain, false);
                authApi.get({
                    action: 'query',
                    prop: 'deletedrevisions',
                    titles: edit.title,
                    drvprop: 'content',
                    drvlimit: 1,
                    formatversion: 2
                }).then(data => {
                    const content = data?.query?.pages?.[0]?.deletedrevisions?.[0]?.content;
                    if (content) {
                        authApi.post({
                            action: 'parse',
                            text: content,
                            contentmodel: 'wikitext',
                            disabletoc: true,
                            formatversion: 2
                        }).then(parseData => {
                            this.modal.content = `<div class="cwa-modal__alert">Внимание: Это содержимое удалённой страницы</div>` +
                                (parseData?.parse?.text ?? '').replaceAll('href="/', `target="_blank" rel="noopener noreferrer" href="https://${edit.wikiDomain}/`);
                            this.modal.isLoading = false;
                        }).catch(() => {
                            this.modal.content = `<div class="cwa-modal__alert">Внимание: Это содержимое удалённой страницы</div><div class="cwa-modal__pre-wrap">${mw.html.escape(content)}</div>`;
                            this.modal.isLoading = false;
                        });
                    } else {
                        this.modal.content = '<em>Страница удалена или у вас нет прав для её просмотра.</em>';
                        this.modal.isLoading = false;
                    }
                }).catch(() => {
                    this.modal.content = '<em>Ошибка при загрузке. Страница не существует или удалена.</em>';
                    this.modal.isLoading = false;
                });
            });
        }
    };

/* === LAYER: 07_mount.js === */
const App = {
        template: AppTemplate,
        data: AppState.data,
        computed: AppState.computed,
        methods: Object.assign({}, AppMethodsApi, AppMethodsUi),

        mounted() {
            this.fetchData();
        },
        beforeUnmount() {
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }
            this.cleanUpRemoteResources();
        }
    };

    document.body.classList.add('CrossWikiActivity');
    Vue.createMwApp(App).mount(targetContainer);
})();