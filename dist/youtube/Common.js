(function(window) {
    window.wiki = window.wiki || {}
    window.wiki._locks = window.wiki._locks || {}
    window.wiki._locks.loadSubscribeButton = false

    /**
     * Fire Google's platform script to display the YouTube subscribe button
     * @param retries 
     */
    window.loadSubscribeButton = function(retries) {
        if (window.wiki._locks.loadSubscribeButton) return
        window.wiki._locks.loadSubscribeButton = true

        const platformJS = 'https://apis.google.com/js/platform.js'

        console.debug("[Wikitubia] Running subscribe button loader...")

        // Check if the `.g-ytsubscribe` element exists
        if (
            !document.querySelector("div.g-ytsubscribe")
        ) return

        let i = 0;
        
        const handler = setInterval(function() {
            i++
            mw.loader.load(platformJS);
            console.count("[Wikitubia] Firing payload");

            if (
                !document.querySelector("div.g-ytsubscribe")
                || i > retries
            ) {
                console.debug("[Wikitubia] Stopping retries")

                // Change PI label
                document.querySelector("[data-source='username'] > h3.pi-data-label.pi-secondary-font")
                    .innerText = "Subscribers"

                clearInterval(handler)
            }
        }, 1000)

        window.wiki._locks.loadSubscribeButton = false
        return
    }
})(this)

/**
 * ==== Invocation line ====
 * Scripts from above should be called below this marker
 */
window.loadSubscribeButton(10)