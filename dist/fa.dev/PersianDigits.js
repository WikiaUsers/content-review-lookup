(function () {

    function replaceDigits(node) {

        if (node.nodeType === Node.TEXT_NODE) {

            if (!/[۰-۹٠-٩]/.test(node.nodeValue)) {
                return;
            }

            var span = document.createElement("span");
            span.className = "fa-digits";

            var fragment = document.createDocumentFragment();

            node.nodeValue.split(/([۰-۹٠-٩]+)/).forEach(function (part) {

                if (/[۰-۹٠-٩]/.test(part)) {
                    var digit = document.createElement("span");
                    digit.className = "fa-digits";
                    digit.textContent = part;
                    fragment.appendChild(digit);
                } else {
                    fragment.appendChild(document.createTextNode(part));
                }

            });

            node.parentNode.replaceChild(fragment, node);
            return;
        }


        if (
            node.nodeType !== Node.ELEMENT_NODE ||
            node.classList.contains("fa-digits") ||
            ["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "INPUT"].includes(node.tagName)
        ) {
            return;
        }

        Array.from(node.childNodes).forEach(replaceDigits);
    }


    function start() {
        replaceDigits(document.body);
    }


    $(start);


    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                replaceDigits(node);
            });
        });
    }).observe(document.body, {
        childList: true,
        subtree: true
    });

})();