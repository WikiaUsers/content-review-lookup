//collapsibles
const collapsibles = document.getElementsByClassName("collapsible");
const collapsibleArray = [...collapsibles];

for (let i in collapsibleArray) {

    const collapsible = collapsibleArray[i];
    const collapsedCheck = "data-opened";
    const elementsArray = [...collapsible.getElementsByTagName("span")];

    elementsArray[2].style.display = "none";

    collapsible.setAttribute(collapsedCheck, null);

    for (let v = 0; v < 2; v++) {

        if (elementsArray[v].innerText != "") {

            elementsArray[v].addEventListener("click", () => {

                if (collapsible.getAttribute("data-opened")) {

                    elementsArray[0].style.opacity = 0;
                    elementsArray[1].style.opacity = 1;

                    elementsArray[2].style.display = "inline";
                    elementsArray[2].style.opacity = 1;

                    collapsible.removeAttribute(collapsedCheck);

                } else {

                    elementsArray[0].style.opacity = 1;
                    elementsArray[1].style.opacity = 0;

                    elementsArray[2].style.display = "none";
                    elementsArray[2].style.opacity = 1;

                    collapsible.setAttribute(collapsedCheck, null);

                }

            });

        }
    }

}