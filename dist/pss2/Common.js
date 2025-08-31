$(document).ready(function () {
    // Replace "Expand" with "See All"
    $('.mw-collapsible-toggle a').each(function () {
        if ($(this).text().trim() === 'Expand') {
            $(this).text('See All');
        }
    });

    // Watch for clicks and swap to "See Less"
    $(document).on('click', '.mw-collapsible-toggle a', function () {
        var linkText = $(this).text().trim();
        if (linkText === 'See All') {
            $(this).text('See Less');
        } else if (linkText === 'See Less') {
            $(this).text('See All');
        }
    });
});
$(function () {
    if ($('#video-bg').length === 0) {
        $('body').prepend(`
            <div id="video-bg">
                <iframe src="https://www.youtube.com/embed/iqGVXkH8ZhI?autoplay=1&mute=1&loop=1&playlist=iqGVXkH8ZhI&controls=0&showinfo=0&modestbranding=1"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen>
                </iframe>
            </div>
        `);
    }
});

// Make custom dropdowns visible and functional on mobile
$(document).ready(function() {
    // Ensure dropdowns are visible
    $('.custom-dropdown').css({
        'display': 'inline-block',
        'visibility': 'visible'
    });

    // Toggle dropdown menu when clicking the title
    $('.custom-dropdown > span').off('click').on('click', function() {
        var $ul = $(this).siblings('ul.WikiaMenuElement');
        $ul.slideToggle(200); // Smooth expand/collapse
    });

    // Optional: hide dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.custom-dropdown').length) {
            $('.custom-dropdown ul.WikiaMenuElement').slideUp(200);
        }
    });
});

$(document).ready(function() {
    // Find all custom dropdowns
    $('.custom-dropdown').each(function() {
        var $dropdown = $(this);

        // Move dropdown to body to prevent clipping on mobile
        $dropdown.css({
            'position': 'relative',
            'z-index': 9999,
            'display': 'inline-block'
        });

        // Ensure the menu is hidden initially
        $dropdown.find('ul.WikiaMenuElement').hide();

        // Toggle dropdown when tapping the title
        $dropdown.find('span').off('click').on('click', function(e) {
            e.stopPropagation(); // Prevent document click handler
            $dropdown.find('ul.WikiaMenuElement').slideToggle(200);
        });
    });

    // Hide dropdown if tapping outside
    $(document).on('click', function() {
        $('.custom-dropdown ul.WikiaMenuElement').slideUp(200);
    });
});

$(function() {
    // Toggle dropdown on click
    $('.custom-dropdown span').click(function(e) {
        e.stopPropagation();
        var menu = $(this).siblings('ul.WikiaMenuElement');
        menu.toggle(); // show/hide the dropdown
    });

    // Close dropdown if clicking outside
    $(document).click(function() {
        $('.custom-dropdown ul.WikiaMenuElement').hide();
    });
});

// Load Dev dropdown CSS on mobile
if (mw.config.get('skin') === 'minerva') {
    mw.util.addCSS('@import "/load.php?mode=articles&articles=u:dev:MediaWiki:DropdownMenu.css&only=styles";');
}

// Mobile-friendly dropdown for Items page
document.addEventListener('DOMContentLoaded', function () {
    // Check if dropdown exists
    const dropdownContainer = document.querySelector('.custom-dropdown');
    if (!dropdownContainer) return;

    const select = document.createElement('select');
    select.style.backgroundColor = '#241104'; // Background color
    select.style.color = '#ffffff'; // Text color
    select.style.border = '1px solid #ffffff'; // Optional border
    select.style.width = '100%';
    select.style.padding = '5px';
    select.style.fontSize = '14px';
    select.style.borderRadius = '4px';

    // Add options
    const options = [
        { name: 'Ship Modules', link: '/wiki/Ship_Modules' },
        { name: 'Resources', link: '/wiki/Resources' },
        { name: 'Currency', link: '/wiki/Currency' },
        { name: 'Aircraft', link: '/wiki/Aircraft' },
        { name: 'Missiles', link: '/wiki/Missiles' },
        { name: 'Ammunition', link: '/wiki/Ammunition' },
        { name: 'AI', link: '/wiki/AI' },
        { name: 'Misc', link: '/wiki/Misc' }
    ];

    options.forEach(opt => {
        const option = document.createElement('option');
        option.textContent = opt.name;
        option.value = opt.link;
        select.appendChild(option);
    });

    // Navigate to page on selection
    select.addEventListener('change', function () {
        const url = select.value;
        if (url) window.location.href = url;
    });

    // Replace original dropdown with this mobile-friendly one
    dropdownContainer.innerHTML = '';
    dropdownContainer.appendChild(select);
});