/**
 * Popup Generator Module (Enhanced)
 * Make sure jQuery is loaded before using
 */
(function(global, $) {
    // Check for necessary dependency
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
         * @param {string} [options.content=""] Content HTML
         * @param {jQuery|string} [options.appendTo="body"] Container to append to
         * @param {function} [options.onOpen] Callback when popup opens
         * @param {function} [options.onClose] Callback when popup closes
         * @param {"create"|"add"} [options.mode="create"] Creation mode
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

            // Handle container parameter
            var $container = typeof options.appendTo === 'string' 
                ? $(options.appendTo) 
                : (options.appendTo || $('body'));
            
            // Create trigger element
            var $triggerElement;
            if (mode === 'add') {
                // Mode 1: Use appendTo element as trigger
                $triggerElement = $container;
                $container.after($popupFrame); // Add popup after target element
            } else {
                // Mode 2: Create new introText element as trigger
                $triggerElement = $("<div>")
                    .addClass("rating-popup-intro")
                    .text(options.introText || "View Details");
                $container.after($triggerElement).after($popupFrame); // Add trigger then popup
            }

            // Initial styling
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
                }, 300); // Match CSS transition time
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
            
            // Click on overlay to close
            $popupSublayer.on("click", function(e) {
                if (e.target === this) { // Ensure click is on overlay itself
                    closePopup();
                }
            });

            $triggerElement.on("click", openPopup);

            // Return elements for further manipulation
            return {
                triggerElement: $triggerElement,
                popupElement: $popupFrame,
                contentElement: $popupContent,
                close: closePopup,
                open: openPopup
            };
        }
    };

    // Expose globally
    if (typeof global.PopupGenerator === 'undefined') {
        global.PopupGenerator = PopupGenerator;
    } else {
        console.warn('PopupGenerator is already defined');
    }
})(window, jQuery);