/* ==========================================================
   MOBILE DESKTOP-SITE REDIRECT / WARNING POPUP (FORCED)
   ========================================================== */
(function() {
    // Force execution even if DOM is already loaded
    function showDesktopWarning() {
        // Detect mobile user agent or small screen width
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 900;
        var dismissed = sessionStorage.getItem('desktop_warning_dismissed');

        if (isMobile && !dismissed) {
            // Check if popup already exists to prevent duplicates
            if ($('#desktop-warning-overlay').length > 0) return;

            // Create the overlay container
            var overlay = $('<div id="desktop-warning-overlay"></div>').css({
                'position': 'fixed !important',
                'top': '0 !important',
                'left': '0 !important',
                'width': '100vw !important',
                'height': '100vh !important',
                'background-color': 'rgba(0, 0, 40, 0.9) !important',
                'backdrop-filter': 'blur(8px) !important',
                '-webkit-backdrop-filter': 'blur(8px) !important',
                'z-index': '2147483647 !important', // Highest possible layer
                'display': 'flex !important',
                'justify-content': 'center !important',
                'align-items': 'center !important',
                'padding': '20px !important',
                'box-sizing': 'border-box !important'
            });

            // Create the central modal card
            var modal = $('<div></div>').css({
                'background-color': 'rgba(0, 0, 60, 0.98) !important',
                'border': '2px solid rgba(255, 255, 255, 0.4) !important',
                'border-radius': '20px !important',
                'padding': '25px !important',
                'width': '100% !important',
                'max-width': '340px !important',
                'text-align': 'center !important',
                'color': '#ffffff !important',
                'font-family': "'Fredoka One', sans-serif !important",
                'box-shadow': '0 0 25px rgba(0, 110, 255, 0.9) !important',
                'box-sizing': 'border-box !important'
            });

            // Content elements
            var title = '<h2 style="color: rgb(0, 110, 255) !important; -webkit-text-stroke: 1px #ffffff !important; text-stroke: 1px #ffffff !important; margin-top: 0 !important; font-size: 20px !important;">Desktop Site Recommended!</h2>';
            var message = '<p style="font-size: 13px !important; line-height: 1.5 !important; color: #ffffff !important; text-shadow: 1px 1px 0px rgb(0,80,255) !important; margin-bottom: 20px !important;">The mobile version of Fandom lacks full customization support. Please switch to <b>"Desktop Site"</b> in your browser settings for the best experience!</p>';

            var dismissBtn = $('<button>Continue Anyway</button>').css({
                'background': 'transparent !important',
                'color': '#aaa !important',
                'border': '1px solid #aaa !important',
                'padding': '8px 14px !important',
                'border-radius': '15px !important',
                'cursor': 'pointer !important',
                'font-family': "'Fredoka One', sans-serif !important",
                'font-size': '12px !important',
                'margin-right': '10px !important'
            });

            var helpBtn = $('<button>How to Enable</button>').css({
                'background': 'rgb(0, 110, 255) !important',
                'color': '#ffffff !important',
                'border': 'none !important',
                'padding': '8px 14px !important',
                'border-radius': '15px !important',
                'cursor': 'pointer !important',
                'font-family': "'Fredoka One', sans-serif !important",
                'font-size': '12px !important',
                'box-shadow': '0 0 8px rgba(255,255,255,0.6) !important'
            });

            // Event bindings
            dismissBtn.on('click', function() {
                sessionStorage.setItem('desktop_warning_dismissed', 'true');
                overlay.fadeOut(200, function() { $(this).remove(); });
            });

            helpBtn.on('click', function() {
                alert('To turn on Desktop Site in Chrome: Tap the three dots menu at the top right of your browser and check the box next to "Desktop site".');
            });

            modal.append(title, message, dismissBtn, helpBtn);
            overlay.append(modal);
            
            // Append directly to the root html/body so nothing hides it
            $('body').append(overlay);
        }
    }

    // Run immediately and also bind to window load to catch dynamic mobile rendering
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        showDesktopWarning();
    } else {
        $(document).ready(showDesktopWarning);
    }
    window.onload = showDesktopWarning;
})();