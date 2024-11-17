(function() {
    function hexToRGBA(hex, alpha) {
        try {
            console.log('Converting color:', hex, 'with alpha:', alpha);
            hex = hex.replace('#', '');
            
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            
            var result = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
            console.log('Successfully converted to RGBA:', result);
            return result;
        } catch (e) {
            console.error('Error in hexToRGBA:', e);
            return null;
        }
    }

    function injectCSS(backgroundColor) {
        try {
            console.log('Starting CSS injection with:', backgroundColor);
            
            var css = 
                '.page__main { background-color: ' + backgroundColor + ' !important; }' +
                '.page { background-color: ' + backgroundColor + ' !important;  color: white !important; }' +
                '.global-navigation { background-color: ' + backgroundColor + ' !important; }' +
                '.global-navigation__nav { background-color: ' + backgroundColor + ' !important; }' +
                '.global-navigation__top { background-color: ' + backgroundColor + ' !important; }' +
                '.global-navigation__bottom { background-color: ' + backgroundColor + ' !important; }' +
                '.global-footer { background-color: ' + backgroundColor + ' !important; }' +
                '.global-footer__content { background-color: ' + backgroundColor + ' !important; }' +
                '.right-rail-wrapper WikiaRail wds-viewability-slider { background-color: ' + backgroundColor + ' !important; }' +
                '.rail-boxad-wrapper {background-color: ' + backgroundColor + '!important; }' +
                '.rail-module recent-images-module { background-color: ' + backgroundColor + '!important; }' +
                '.global-footer__bottom { background-color: ' + backgroundColor + ' !important; }' +
                '.fandom-community-header__background { background-color: ' + backgroundColor.replace('0.6', '0.2') + ' !important; }' +
                '.community-header-wrapper { background-color: ' + backgroundColor.replace('0.6', '0') + ' !important; }' +
                '.fandom-community-header { background-color: ' + backgroundColor.replace('0.6', '0') + ' !important; }' +
                '.main-container { background-color: ' + backgroundColor + ' !important; }' +
                '.fandom-sticky-header { background-color: ' + backgroundColor.replace('0.6', '0.9') + ' !important; }' +
                '.album-tabs { color: #ffffff !important; }' +
                // infobox styling
                '.portable-infobox { background-color: ' + backgroundColor.replace('0.6', '0.3') + ' !important; color: white !important; }' +
                '.pi-background { background-color: ' + backgroundColor.replace('0.6', '0.3') + ' !important; }' +
                '.pi-secondary-background { background-color: ' + backgroundColor.replace('0.6', '0.9') + ' !important; border-bottom: 2px solid rgba(255,255,255,0.2) !important; color: white !important; }' +
                '.pi-header:contains("Streaming Services") { background-color: ' + backgroundColor.replace('0.6', '0.8') + ' !important; border-bottom: 2px solid rgba(255,255,255,0.2) !important; }' +
                '.pi-header { margin-bottom: 2px !important; padding: 8px !important; transition: background-color 0.2s ease !important; }' +
                '.pi-header:hover { filter: brightness(1.1) !important; }' +
                '.pi-item { background-color: ' + backgroundColor.replace('0.6', '0.4') + ' !important; margin: 1px 0 !important; }';

            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css; // For IE8 and below
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.head.appendChild(style);
            console.log('CSS injection successful');
            console.log('Injected styles:', css);
            return true;
        } catch (e) {
            console.error('Error in injectCSS:', e);
            return false;
        }
    }

    function initialize() {
        try {
            console.log('Starting initialization...');
            
            var colorElement = document.querySelector('[data-bg]');
            console.log('Found element:', colorElement);
            
            if (colorElement) {
                var hexColor = colorElement.getAttribute('data-bg');
                console.log('Found hex color:', hexColor);
                
                var rgbaColor = hexToRGBA(hexColor, '0.6');
                console.log('Converted to RGBA:', rgbaColor);
                
                if (rgbaColor) {
                    var success = injectCSS(rgbaColor);
                    console.log('Injection success:', success);
                }
            }
        } catch (e) {
            console.error('Error in initialize:', e);
        }
    }

    // Execute immediately and also on DOMContentLoaded
    initialize();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    }
})();