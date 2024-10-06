var items = document.querySelectorAll(".text-container");

    items.forEach(function (item) {
      var textSpan = item.querySelector("span");

      textSpan.style.fontSize = "1px";
      textSpan.style.display = "inline-block";
      var fontSize = 1;
      var i = 0;

      var spanStyles = window.getComputedStyle(textSpan);

      while (
        textSpan.clientWidth <= item.clientWidth &&
        textSpan.clientHeight <= item.clientHeight &&
        i < 100
      ) {
        fontSize++;
        textSpan.style.fontSize = fontSize+("px");
        i++;

        if (
          textSpan.scrollWidth > item.clientWidth ||
          textSpan.scrollHeight > item.clientHeight
        ) {
          break;
        }
      }

      textSpan.style.fontSize = (fontSize - 1)+("px");
    });