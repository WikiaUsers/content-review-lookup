/* BannerNotification
 *
 * Wraps around the good ol' BannerNotification interface, currently hidden under many layers of mw.loader bullshit
 * Brings back behavior of appearing on top of $.showCustomModal modals automagically. Modal-js compatible!
 * But [[ShowCustomModal]] is better
 *
 * @author Dorumin
 */

(function() {
    if (window.dev && window.dev.banners) return;

    window.dev = window.dev || {};
    window.dev.banners = {};

	var typeAliases = {
		success: 'confirm',
		info: 'notify',
		warning: 'warn'
	};

    function getUCPBannerModuleName() {
        var modules = mw.loader.getModuleNames();
        var prefix = 'BannerNotifications-';
        var len = prefix.length;
        var bannerModule = modules.find(function(mod) {
            return mod.slice(0, len) === prefix;
        });

        return bannerModule;
    }

    // your gold standard create class utility. yes. this will fuck up the display name in the console.
    // The alternative is passing a named constructor as its own parameter, but I just think this looks better
    // Eh... it also lets you omit the instanceof check in your own code
    // If only displayName wasn't non-standard! Oh well
    function createClass(props) {
        // No, it's really not
        var constructoid = props['constructor'];

        function Class() {
            if (!(this instanceof Class)) {
                throw new TypeError('Cannot call a class as a function');
            }

            constructoid.apply(this, arguments);
        }

        for (var name in props) {
            if (name === 'constructor') continue;

            var method = props[name];

            Class.prototype[name] = method;
        }

        return Class;
    }

    function getVisibleModals() {
        // OG BannerNotification used :visible, I would've gone for .oo-ui-element-hidden,
        // but this might not be such a bad idea if the class changes
        return $('.oo-ui-windowManager-modal .oo-ui-dialog').filter(':visible');
    }

    function createBannerNotificationWrapper(BannerNotification) {
        return createClass({
            constructor: function(content, type, $parent, timeout) {
            	var mappedType = typeAliases[type] || type;
            	
                this._inner = new BannerNotification(content, mappedType, $parent, timeout);
                this.type = this._inner.type;
                this.content = this._inner.content;
                this.hidden = this._inner.hidden;
                this.$element = this._inner.$element;
                this.$parent = this._inner.$parent;
                this.onCloseHandler = this._inner.onCloseHandler;
            },
            show: function() {
                // PATCH: Here we check if we have a modal that would be a better target
                var $modal = getVisibleModals().first();
                if ($modal.length && !this._inner.$parent) {
                    var $frame = $modal.find('.oo-ui-window-frame');
                    var $content = $frame.find('.oo-ui-window-content');
                    var height = $frame.height();

                    this._inner.$parent = $frame;
                    var v = this._inner.show();

                    var $banner = this._inner.$element;
                    var $bannerContainer = $banner.parent();

                    var bannerHeight = $banner.height();
                    var bannerContainerHeight = $bannerContainer.height();

                    // TODO: Smoother animation, perhaps?
                    // Honestly OOUI is just dumb for not having auto height in the first place
                    $frame.css('height', (height + bannerHeight + 1).toString() + 'px');
                    $content.css('top', bannerContainerHeight.toString() + 'px');

                    var handler = this._inner.onCloseHandler;
                    this.onClose(function(e) {
                        var height = $frame.height();
                        var bannerContainerHeight = $bannerContainer.height();

                        $frame.css('height', (height - bannerHeight - 1).toString() + 'px');
                        $content.css('top', (bannerContainerHeight - bannerHeight).toString() + 'px');

                        if (handler) {
                            handler(e);
                        }
                    });

                    // Update props
                    this.hidden = this._inner.hidden;

                    return v;
                } else {
                    var v = this._inner.show();

                    this.hidden = this._inner.hidden;

                    return v;
                }
            },
            hide: function() {
                var v = this._inner.hide();

                this.hidden = this._inner.hidden;

                return v;
            },
            setContent: function(content) {
                var v = this._inner.setContent(content);

                this.content = this._inner.content;

                return v;
            },
            setType: function(type) {
                var v = this._inner.setType(type);

                this.type = this._inner.type;

                return v;
            },
            onClose: function(handler) {
                var v = this._inner.onClose(handler);

                this.onCloseHandler = this._inner.onCloseHandler;

                return v;
            },
            showConnectionError: function() {
                var v = this._inner.showConnectionError();

                this.type = this._inner.type;
                this.content = this._inner.content;
                this.hidden = this._inner.hidden;

                return v;
            }
        });
    }

    function patchStyles() {
        mw.util.addCSS('.wds-banner-notification.wds-alert.error { color: var(--wds-banner-notification-text-color); }');
    }

    var isUCP = parseFloat(mw.config.get('wgVersion')) > 1.19;
    var bannerModule = isUCP
        ? getUCPBannerModuleName()
        : 'BannerNotification';

    if (isUCP) {
        mw.loader.using(bannerModule).then(function(require) {
            var mod = require(bannerModule);
            var Wrapper = createBannerNotificationWrapper(mod.BannerNotification);

            window.dev.banners.BannerNotification = Wrapper;

            mw.hook('dev.banners').fire(Wrapper);

            patchStyles();
        });
    } else {
        require([bannerModule], function(BannerNotification) {
            window.dev.banners.BannerNotification = BannerNotification;

            mw.hook('dev.banners').fire(BannerNotification);

            patchStyles();
        });
    }
})();