(function () {
    'use strict';

    // 1. Define your staff members and their respective roles
    const staffRegistry = {
        "Alankid123": { text: "Founder", tag: "Bureaucrat" },
        "RomanescoGAG": { text: "Co-Founder", tag: "Co-Founder" },
        "Username3": { text: "Elite Administrator", tag: "Elite Admin" }
    };

    // 2. Function to inject tags into the profile header
    function addStaffTags() {
        // Target the main username heading on MediaWiki/Fandom profiles
        const profileHeader = document.querySelector('#firstHeading, .UserProfileMasthead .masthead-info h1');
        if (!profileHeader) return;

        const username = profileHeader.textContent.trim();
        const staffData = staffRegistry[username];

        // If the user is in our registry, create and append the tag
        if (staffData && !document.querySelector('.custom-staff-tag')) {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'custom-staff-tag';
            tagSpan.textContent = `${staffData.text} (${staffData.tag})`;
            
            // Apply basic styling
            Object.assign(tagSpan.style, {
                backgroundColor: '#007bff',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '3px 8px',
                borderRadius: '4px',
                marginLeft: '10px',
                verticalAlign: 'middle',
                display: 'inline-block'
            });

            profileHeader.appendChild(tagSpan);
        }
    }

    // 3. Run the function when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addStaffTags);
    } else {
        addStaffTags();
    }
})();