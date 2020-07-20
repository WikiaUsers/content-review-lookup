/**
 * @title           ListGroupMembers
 * @version         v1.1
 * @author          Ultimate Dark Carnage
 * @description     Shows a list of members in each user group
 **/

require([
    "wikia.window",
    "mw",
    "jquery",
    require.optional("ext.wikia.design-system.loading-spinner")
], function(wk, mw, $, Spinner){
    let CONFIG = Object.assign({}, wk.LGMConfig);
    
    const CLASSNAMES = Object.freeze({
        MAIN: "lgm-wrapper",
        HEADER: "lgm-header",
        DROPDOWN: "lgm-dropdown",
        DROPDOWN_LABEL: "lgm-dropdown__label",
        DROPDOWN_CHEVRON: "lgm-dropdown__chevron",
        DROPDOWN_LIST: "lgm-dropdown__list",
        DROPDOWN_ITEM: "lgm-dropdown__item",
        SELECT: 'lgm-select',
        SORT: 'lgm-sort',
        FILTER: 'lgm-filter'
    });
});