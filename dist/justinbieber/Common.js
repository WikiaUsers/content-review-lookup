/* Any JavaScript here will be loaded for all users on every page load. */

/* PreloadTemplates */
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
preloadTemplates_namespace = "Justin Bieber Wiki";

/* BackToTopButton */
window.BackToTopModern = true;

/* Awards (gold, silver, bronze) */
function applyAwardMasks() {
    const imagePromises = Array.from(document.querySelectorAll('.award-tier img')).map(img => {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                resolve(img);  // Image is already loaded
            } else {
                img.onload = () => resolve(img);  // Resolve when the image is loaded
                img.onerror = () => reject(img);  // Reject on error if the image fails to load
            }
        });
    });

    // Wait for all images to load
    Promise.all(imagePromises)
        .then((images) => {
            images.forEach(img => {
                const wrapper = img.closest('.award-tier');
                if (wrapper) {
                    wrapper.style.webkitMaskImage = `url(${img.src})`;
                    wrapper.style.maskImage = `url(${img.src})`;
                }
            });
        })
        .catch((error) => {
            console.error("Error loading image:", error);
        });
}

if (document.readyState === 'complete') {
    applyAwardMasks();
} else {
    window.addEventListener('load', applyAwardMasks);
}

/* Calendar */
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var date = new Date();
var currentMonth = date.getMonth();
var currentDay = date.getDate() - 1;
var viewMonth = currentMonth;

function initCalendar() {
    // Parse month and day, not implemented
    loadMonth(currentMonth);
}

function loadMonth(month) {
    $('#cal #month').text(months[month]);
    var newMonth = '';
    for (var i = 0; i < days[month]; i++) {
        var classes = (month == currentMonth && i == currentDay) ? "day current" : "day";
        newMonth = newMonth + '<a href="/wiki/' + (i+1) + '_' + months[month] + '"><div class="' + classes + '">' + (i+1) + '</div></a>';
    }
    $('#cal #cal-frame').fadeOut('fast', function() {
        $('#cal #cal-frame').html(newMonth).fadeIn('fast');
    });
    viewMonth = month;
}

mw.hook('AddRailModule.module').add(function () {
    initCalendar();
    $('#cal #prev').click(function() {
        loadMonth((viewMonth - 1 + 12) % 12);
    });
    $('#cal #next').click(function() {
        loadMonth((viewMonth + 1) % 12);
    });
});