/**
 * Popup Generator Module (Enhanced)
 * Ensure jQuery is loaded before use
 */
(function(global, $) {
    // Check required dependency
    if (!$) {
        throw new Error('PopupGenerator requires jQuery');
    }

    // Create namespace
    var PopupGenerator = {
        /**
         * Create and display a popup
         * @param {Object} options Configuration object
         * @param {string} [options.introText="View Details"] Intro text
         * @param {string} [options.headerText="Details"] Header text
         * @param {string} [options.frameCSS=""] CSS class for the frame
         * @param {string} [options.content=""] Content HTML/text
         * @param {jQuery|string} [options.appendTo="body"] Container to append popup to
         * @param {function} [options.onOpen] Callback when popup opens
         * @param {function} [options.onClose] Callback when popup closes
         * @param {"create"|"add"} [options.mode="create"] Mode for creation
         * @returns { {triggerElement: jQuery, popupElement: jQuery, contentElement: jQuery} }
         */
        createPopup: function(options) {
            options = options || {};
            var mode = options.mode || 'create';
            
            // Create basic popup structure
            var $popupFrame = $("<div>").addClass("popup-box-frame").addClass(options.frameCSS || "").hide();
            var $popupSublayer = $("<div>").addClass("popup-box-sublayer");
            var $popupBox = $("<div>").addClass("popup-box");
            var $popupHeader = $("<div>").addClass("popup-box-header");
            var $closeLabel = $("<span>")
                .addClass("close-label")
                .attr("title", "Close")
                .html("&times;");
            var $headerText = $("<span>")
                .addClass("popup-box-header-text")
                .text(options.headerText || "Details");
            var $popupContent = $("<div>")
                .addClass("popup-box-content")
                .html(options.content || "");

            // Assemble popup structure
            $popupHeader.append($closeLabel, $headerText);
            $popupBox.append($popupHeader, $popupContent);
            $popupFrame.append($popupSublayer, $popupBox);

            // Determine container
            var $container = typeof options.appendTo === 'string' 
                ? $(options.appendTo) 
                : (options.appendTo || $('.main-container'));
            
            // Create trigger element
            var $triggerElement;
            if (mode === 'add') {
                // Mode 1: use appendTo element as trigger
                $triggerElement = $container;
                $container.after($popupFrame); // append popup after target
            } else {
                // Mode 2: create a new introText element as trigger
                $triggerElement = $("<div>")
                    .addClass("rating-popup-intro")
                    .text(options.introText || "View Details");
                $container.after($triggerElement).after($popupFrame); // add trigger first, then popup
            }

            // Set initial styles
            $popupFrame.css({
                'opacity': 0,
                'transition': 'opacity 0.3s ease'
            });

            // Close popup function
            var closePopup = function() {
                $popupFrame.css('opacity', 0);
                $popupFrame.removeClass('is-open');
                setTimeout(function() {
                    $popupFrame.hide();
                    if (typeof options.onClose === 'function') {
                        options.onClose();
                    }
                }, 300); // match CSS transition time
            };

            // Open popup function
            var openPopup = function() {
                $popupFrame.show().css('opacity', 1);
                $popupFrame.addClass('is-open');
                if (typeof options.onOpen === 'function') {
                    options.onOpen();
                }
            };

            // Event handling
            $closeLabel.on("click", closePopup);
            
            // Click on overlay closes popup
            $popupSublayer.on("click", function(e) {
                if (e.target === this) { // ensure overlay itself was clicked
                    closePopup();
                }
            });

            $triggerElement.on("click", openPopup);

            // Return operable elements
            return {
                triggerElement: $triggerElement,
                popupElement: $popupFrame,
                contentElement: $popupContent,
                close: closePopup,
                open: openPopup
            };
        }
    };

    // Expose to global object
    if (typeof global.PopupGenerator === 'undefined') {
        global.PopupGenerator = PopupGenerator;
    } else {
        console.warn('PopupGenerator is already defined');
    }
})(window, jQuery);