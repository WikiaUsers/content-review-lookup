$(document).ready(function () {
    /**
     * Fetches category members from the MediaWiki API.
     * @param {mw.Api} api - The MediaWiki API instance.
     * @param {string} categoryName - The name of the category to fetch members for.
     * @returns {Promise<Array>} - A promise that resolves to an array of category members.
     */
    function fetchCategoryMembers(api, categoryName) {
        return new Promise(function (resolve, reject) {
            api.get({
                action: "query",
                list: "categorymembers",
                cmtitle: `Category:${categoryName}`,
                cmlimit: "max", // Maximum number of results per request
                format: "json"
            }).done(function (data) {
                if (!data || !data.query || !data.query.categorymembers) {
                    reject("Failed to fetch category members.");
                    return;
                }

                // Extract page titles from the API response
                const members = data.query.categorymembers.map(member => member.title);
                resolve(members);
            }).fail(function (error) {
                reject("API request failed:", error);
            });
        });
    }

    /**
     * Initializes the script when the target div is ready.
     * @param {string} id - The ID of the target div.
     * @param {Function} callback - The callback function to execute when the div is found.
     */
    function initializeWhenDivIsReady(id, callback) {
        var observer = new MutationObserver(function (mutations, observerInstance) {
            var element = document.getElementById(id);
            if (element) {
                observerInstance.disconnect(); // Stop observing once the element is found
                callback(element);
            }
        });

        // Start observing the DOM for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Load the MediaWiki API module
    mw.loader.using('mediawiki.api', function () {
        var api = new mw.Api();

        // Hook into the wikipage.content event to ensure the DOM is ready
        mw.hook('wikipage.content').add(function () {
            initializeWhenDivIsReady('categoryList', function (categoryListDiv) {
                // Determine the category name
                let categoryName;

                // Check if the current page is a category page
                const canonicalNamespace = mw.config.get('wgCanonicalNamespace');
                if (canonicalNamespace === 'Category') {
                    // Use the current page's title as the category name
                    categoryName = mw.config.get('wgTitle');
                } else {
                    // Use the data-name attribute from the categoryListDiv
                    categoryName = categoryListDiv.getAttribute('data-name');
                    if (!categoryName) {
                        console.error("Not a category page and no valid data-name attribute found.");
                        categoryListDiv.textContent = "Error: No category name found.";
                        return;
                    }
                }

                console.log(`Fetching members for category: ${categoryName}`);

                // Fetch category members and populate the div
                fetchCategoryMembers(api, categoryName)
                    .then(function (members) {
                        const jsonBlob = JSON.stringify({ members }, null, 2);
                        categoryListDiv.textContent = jsonBlob;
                    })
                    .catch(function (error) {
                        console.error(error);
                        categoryListDiv.textContent = "Error loading category members.";
                    });
            });
        });
    });
});