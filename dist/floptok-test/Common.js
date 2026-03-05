/* Any JavaScript here will be loaded for all users on every page load. */window.lockOldComments = (window.lockOldComments || {});
  window.lockOldComments.limit = 7;
  window.lockOldComments.addNoteAbove = true;
  window.lockOldComments.namespaceNumbers = [0];

//Adds a icon to the page tools module
// getting the module heading
const pageToolsModuleHeading = document.querySelector(".page-tools-module .rail-module__header");
// making it empty
pageToolsModuleHeading.innerHTML = "";

// creating an icon
const pageToolsModuleIcon = document.createElement("span");
pageToolsModuleIcon.classList.add("fandom-icons");
pageToolsModuleIcon.classList.add("wds-icon");

// adding the name of the icon that we want to add. I chose the "pencil" icon for this example
pageToolsModuleIcon.textContent = "pencil";

// heading text
const pageToolsModuleText = document.createTextNode(" Page Tools");

// adding both elements to the heading
pageToolsModuleHeading.append(pageToolsModuleIcon, pageToolsModuleText);

$(function () {
    var $ul      = $('#SliderWrapper').find('ul').first();
    var $slides  = $ul.find('.Sld');
    var $navBtns = $('#NavBtns').find('li');
    var total    = $slides.length;
    var current  = 0;

    if (total === 0) return;

    function goTo(index) {
        current = (index + total) % total;
        $ul.css('transform', 'translateX(-' + (current * 670) + 'px)');
        $navBtns.removeClass('nbActiveRight');
        $navBtns.eq(current).addClass('nbActiveRight');
    }

    $navBtns.each(function (i) {
        $(this).on('click', function () { goTo(i); });
    });

    goTo(0);
});