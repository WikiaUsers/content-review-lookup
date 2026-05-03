mw.hook('wikipage.content').add(function() {
    var configEl = document.createElement('div');
    configEl.className = 'custom-theme';
    configEl.style.display = 'none';
    document.body.appendChild(configEl);

    var styles = getComputedStyle(configEl);

    function getProp(prop) {
        return styles.getPropertyValue(prop).trim();
    }

    var isDark = document.body.classList.contains('theme-fandomdesktop-dark');
    var prefix = isDark ? '--ct-dark-' : '--ct-light-';

    function get(name) {
        return getProp(prefix + name);
    }

    function getShared(name) {
        return getProp('--ct-' + name);
    }

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return r + ', ' + g + ', ' + b;
    }

    var overrides = {};

    var bgColor = get('background-color');
    if (bgColor) {
        overrides['--theme-body-background-color'] = bgColor;
        overrides['--theme-body-background-color--rgb'] = hexToRgb(bgColor);
        overrides['--fandom-primary-color'] = bgColor;
        overrides['--fandom-primary-background-color'] = bgColor;
    }

    var articleBg = get('article-background');
    if (articleBg) {
        overrides['--theme-page-background-color'] = articleBg;
        overrides['--theme-page-background-color--rgb'] = hexToRgb(articleBg);
        overrides['--theme-page-background-color--secondary'] = 'color-mix(in srgb, ' + articleBg + ' 70%, white)';
        overrides['--fandom-secondary-color'] = articleBg;
        overrides['--fandom-dropdown-background-color'] = articleBg;
        overrides['--fandom-widget-primary-background-color'] = articleBg;
        overrides['--fandom-widget-arrow-background-color'] = articleBg;
    }

    var stickyNav = get('sticky-nav-color');
    if (stickyNav) {
        overrides['--theme-sticky-nav-background-color'] = stickyNav;
        overrides['--theme-sticky-nav-background-color--rgb'] = hexToRgb(stickyNav);
    }

    var headerColor = get('header-color');
    if (headerColor) {
        overrides['--theme-community-header-color'] = headerColor;
        overrides['--theme-community-header-color--hover'] = 'color-mix(in srgb, ' + headerColor + ' 80%, black)';
    }

    var link = get('link-color');
    if (link) {
        overrides['--theme-link-color'] = link;
        overrides['--theme-link-color--rgb'] = hexToRgb(link);
        overrides['--theme-link-color--hover'] = 'color-mix(in srgb, ' + link + ' 80%, white)';
        overrides['--fandom-link-color'] = link;
        overrides['--fandom-link-color--rgb'] = hexToRgb(link);
        overrides['--fandom-link-color--hover'] = 'color-mix(in srgb, ' + link + ' 80%, white)';
        overrides['--fandom-link-color--fadeout'] = 'color-mix(in srgb, ' + link + ' 30%, transparent)';
    }

    var accent = get('accent-color');
    if (accent) {
        overrides['--theme-accent-color'] = accent;
        overrides['--theme-accent-color--rgb'] = hexToRgb(accent);
        overrides['--theme-accent-color--hover'] = 'color-mix(in srgb, ' + accent + ' 80%, black)';
        overrides['--fandom-accent-color'] = accent;
        overrides['--fandom-accent-color--rgb'] = hexToRgb(accent);
        overrides['--fandom-accent-color--hover'] = 'color-mix(in srgb, ' + accent + ' 80%, black)';
        overrides['--fandom-accent-color--secondary'] = accent;
    }

    var font = getShared('font');
    if (font) {
        overrides['--theme-page-headings-font'] = font;
    }

    var opacity = get('image-opacity');
    if (opacity) {
        overrides['--theme-background-image-opacity'] = opacity;
    }

    var css = ':root {\n';
    for (var prop in overrides) {
        css += '    ' + prop + ': ' + overrides[prop] + ';\n';
    }
    css += '}\n';

    var bgImage = get('background-image');
    var bgDisplay = get('image-display');
    var bgStyle = get('image-style');

    if (bgImage) {
        css += ':root {\n';
        css += '    --theme-body-background-image-full: url(' + bgImage + ');\n';
        css += '    --theme-body-background-image-desktop: url(' + bgImage + ');\n';
        css += '    --theme-body-background-image-large-desktop: url(' + bgImage + ');\n';
        css += '    --theme-body-background-image-mobile: url(' + bgImage + ');\n';
        css += '    --theme-body-background-image-tablets: url(' + bgImage + ');\n';
        css += '    --theme-body-background-image-tablets-2x: url(' + bgImage + ');\n';
        css += '}\n';

        var bodyCSS = 'body {\n';

        switch (bgDisplay) {
            case 'header':
                bodyCSS += '    background-attachment: local;\n';
                bodyCSS += '    background-size: 100% auto;\n';
                break;
            case 'fullscreen':
                bodyCSS += '    background-attachment: fixed;\n';
                break;
        }

        switch (bgStyle) {
            case 'cover':
                bodyCSS += '    background-size: cover;\n';
                bodyCSS += '    background-repeat: no-repeat;\n';
                break;
            case 'tile-x':
                bodyCSS += '    background-repeat: repeat-x;\n';
                break;
            case 'tile-y':
                bodyCSS += '    background-repeat: repeat-y;\n';
                break;
            case 'tile-both':
                bodyCSS += '    background-repeat: repeat;\n';
                break;
            case 'top-left':
                bodyCSS += '    background-size: contain;\n';
                bodyCSS += '    background-repeat: no-repeat;\n';
                bodyCSS += '    background-position: top left;\n';
                break;
            case 'center':
                bodyCSS += '    background-size: contain;\n';
                bodyCSS += '    background-repeat: no-repeat;\n';
                bodyCSS += '    background-position: center;\n';
                break;
            case 'top-right':
                bodyCSS += '    background-size: contain;\n';
                bodyCSS += '    background-repeat: no-repeat;\n';
                bodyCSS += '    background-position: top right;\n';
                break;
        }

        bodyCSS += '}\n';
        css += bodyCSS;
    }

    mw.util.addCSS(css);
});