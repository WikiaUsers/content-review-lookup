let count = 0;
const interv = setInterval(() => {
    count++;
    if ($("#WikiaAdInContentPlaceHolder .rail-module__header").length != 0) {
        $("#WikiaAdInContentPlaceHolder .rail-module__header").text("熱門頁面");
        clearInterval(interv);
    }
    if (count > 5) {
        clearInterval(interv);
    }
}, 500);