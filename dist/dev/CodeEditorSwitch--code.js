/**
 * CodeEditorSwitch
 * 
 * Switches VisualEditor to Classic editor on .js and .css pages.
 * (PERSONAL USE ONLY)
 * 
 * @author User:Blaster Niceshot
 */
;(function(window, $, mw) {
    
    // Double run protection; only run on article pages
    window.codeEditorSwitch = window.codeEditorSwitch || {};
    
    if (typeof window.codeEditorSwitch.loaded !== 'undefined' || mw.config.get('wgIsArticle') === false) {
        return;
    }
    
    window.codeEditorSwitch.loaded = true;
    
    /* Languages other than English that use "VisualEditor" text
    for the VisualEditor button do not need to be included here,
    as the script uses that text by default. */
    var i18n = {
        af: 'Visueel',
        ar: 'المحرر المرئي',
        be: 'Візуальны рэдактар',
        bn: 'ভিজ্যুয়ালএডিটর',
        ca: 'Editor visual',
        en: 'VisualEditor',
        es: 'Editor Visual',
        fa: 'ویرایشگر دیداری',
        fi: 'Visuaalinen muokkain',
        fr: 'ÉditeurVisuel',
        gl: 'Editor visual',
        ja: 'ビジュアルエディタ',
        ko: '시각편집기',
        li: 'Visuele tekstverwerker',
        lv: 'Vizuālais redaktors',
        nl: 'Visuele tekstverwerker',
        pl: 'Edytor wizualny',
        pt: 'Editor Visual',
        'pt-br': 'Editor visual',
        ro: 'EditorVizual',
        ru: 'Визуальный редактор',
        'sr-ec': 'Визуелни уређивач',
        'sr-el': "Vizuelni uređivač",
        uk: 'Візуальний редактор',
        tr: 'Görsel Düzenleyici',
        vi: 'Soạn thảo trực quan',
        zh:'视效编辑器'
    };
    
    var setLanguage = typeof i18n[mw.config.get('wgUserLanguage')] === 'string' ? mw.config.get('wgUserLanguage') : 'en';
    
    var codeEditorSwitch = $.extend({
        changeEditBtn: true,
        redirectToClassic: true,
        lang: setLanguage,
        loaded: true,
    }, window.codeEditorSwitch),
        
        url = window.location.href.toString();
    
    /**
     * Switches VisualEditor and Classic editor buttons
     * 
     * @returns {void}
     */
    function switchEditorBtns() {
        
        url = url.split(/[#?]/)[0];
        
        if ((url.endsWith(".js") || url.endsWith(".css")) === true) {
            var classicBtn = $('.page-header__contribution .wds-dropdown #ca-edit'),
                classicParams = classicBtn.attr('href').split(/[#?]/)[1],
                visualBtn = $('.page-header__contribution #ca-ve-edit'),
                visualParams = visualBtn.attr('href').split(/[#?]/)[1];
            
            // Change classic button
            classicBtn.text(i18n[codeEditorSwitch.lang]);
            classicBtn.attr('href', url + '?' + visualParams + '&cesredirect=false');
            classicBtn.off('click');
            classicBtn.attr('id', 'ca-ve-edit');
            
            // Change visual button
            visualBtn.attr('href', url + '?'  + classicParams);
            visualBtn.off('click');
            visualBtn.attr('id', 'ca-edit');
        }
        
    }
    
    // Switch editor buttons
    if (mw.config.get('wgVisualEditorPreferred') === true && codeEditorSwitch.changeEditBtn === true) {
        switchEditorBtns();
    }
    
    // Redirect VisualEditor to Classic Editor
    if (codeEditorSwitch.redirectToClassic === true && (url.includes('.css?') || url.includes('.js?')) === true && url.includes('veaction') === true && url.includes('cesredirect=false') === false) {
        location.replace(url.replace('veaction','action'));
    }
    
}) (this, this.jQuery, this.mediaWiki);