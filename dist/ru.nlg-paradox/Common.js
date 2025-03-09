/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Полоска чтения сверху (активирирует для статей)
window.enableReadProgressBarOnArticles = true

// Конфигурации MapsExtended
window.mapsExtendedConfig = {
		openPopupsOnHover: true,
		enableSidebar: true,
		sidebarBehaviour: "manual",
		sidebarInitialState: "show",
		enableSearch: true,
		enableTooltips: true,
	};

// Prepare i18n overrides object
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};

// Add custom content instead of default messages
window.dev.i18n.overrides["MapsExtended"]["category-collected-label"] = "$1 из $2 просмотрен";
window.dev.i18n.overrides["MapsExtended"]["clear-collected-button"] = "Очистить просмотренное";
window.dev.i18n.overrides["MapsExtended"]["clear-collected-confirm"] = "Очистить все просмотренные маркеры?";
window.dev.i18n.overrides["MapsExtended"]["clear-collected-banner"] = "Очищено $1 собранных маркеров на карте $2.";
window.dev.i18n.overrides["MapsExtended"]["collected-all-banner"] = "Поздравляем! Вы собрали все &lt;b&gt;$1&lt;/b&gt; из &lt;b&gt;$2&lt;/b&gt; маркеров в категории \"$3\" на карте $4.";
window.dev.i18n.overrides["MapsExtended"]["search-placeholder"] = "Поиск";
window.dev.i18n.overrides["MapsExtended"]["search-hint-noresults"] = "Нет результатов для \"$1\"";
window.dev.i18n.overrides["MapsExtended"]["search-hint-results"] = "$1 маркер(ов) в $2 категориях";
window.dev.i18n.overrides["MapsExtended"]["search-hint-resultsfiltered"] = "$1 маркер(ов) в $2 категориях ($3 отфильтровано)";
window.dev.i18n.overrides["MapsExtended"]["fullscreen-enter-tooltip"] = "Полноэкранный режим";
window.dev.i18n.overrides["MapsExtended"]["fullscreen-exit-tooltip"] = "Выйти из полноэкранного режима";
window.dev.i18n.overrides["MapsExtended"]["copy-link-banner-success"] = "Скопировано";
window.dev.i18n.overrides["MapsExtended"]["copy-link-banner-failure"] = "Не удалось скопировать ссылку";
window.dev.i18n.overrides["MapsExtended"]["sidebar-header"] = "$1 - Интерактивная карта";
window.dev.i18n.overrides["MapsExtended"]["sidebar-categories-header"] = "Категории";
window.dev.i18n.overrides["MapsExtended"]["sidebar-show-all-button"] = "Показать всё";
window.dev.i18n.overrides["MapsExtended"]["sidebar-hide-all-button"] = "Скрыть всё";
window.dev.i18n.overrides["MapsExtended"]["sidebar-hide-tooltip"] = "Скрыть боковую панель";
window.dev.i18n.overrides["MapsExtended"]["sidebar-show-tooltip"] = "Показать боковую панель";