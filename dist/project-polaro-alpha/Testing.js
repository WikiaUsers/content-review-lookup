function initializeLoadMoreButton() {
    var currentGen = 1;
    var totalGens = 9;

    function createLoadMoreButton() {
        if (document.getElementById("load-more")) return;

        var loadMoreButton = document.createElement("div");
        loadMoreButton.id = "load-more";
        loadMoreButton.className = "load-more-button";
        loadMoreButton.textContent = "Load more";

        var gen1Container = document.getElementById("gen1");
        if (gen1Container && gen1Container.parentNode) {
            gen1Container.parentNode.insertBefore(loadMoreButton, gen1Container.nextSibling);

            loadMoreButton.addEventListener("click", function() {
                currentGen++;
                var nextGen = document.getElementById("gen" + currentGen);
                if (nextGen) {
                    nextGen.style.display = "block";
                }

                if (nextGen && nextGen.parentNode) {
                    nextGen.parentNode.insertBefore(loadMoreButton, nextGen.nextSibling);
                }

                if (currentGen >= totalGens) {
                    loadMoreButton.style.display = "none";
                }
            });
        } else {
            setTimeout(createLoadMoreButton, 100);
        }
    }

    function showFirstGen() {
        var firstGen = document.getElementById("gen1");
        if (firstGen) {
            firstGen.style.display = "block";
            createLoadMoreButton();
        } else {
            setTimeout(showFirstGen, 100);
        }
    }

    showFirstGen();
}

// Initialize the load more button function once the page content is loaded
mw.hook('wikipage.content').add(initializeLoadMoreButton);