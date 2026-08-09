/* Any JavaScript here will be loaded for all users on every page load. */
// Configure the Custom "Bureaucat" Tag
window.UserTagsJS = {
    modules: {},
    tags: {
        founder: { u: 'Bureaucat', link: 'Project:Bureaucrats' }
    }
};

/* custom staff ranks */
// Custom Moderator Rank Script for Skybox Escape Industry's Santernal Nation Wiki
// This script applies custom visual tags to designated community members and gives them quick access to moderation tools.

(function () {
    'use strict';

    // 1. CHOOSE YOUR MODERATORS: Add the exact wiki usernames of your staff members to this list
    const registeredModerators = [
        "Mrfloorisalava", 
        "TrustedStaffMember1", 
        "TrustedStaffMember2"
    ];

    // Safely extract the target user's name from the page URL path or query string
    function getTargetWikiUser() {
        const pageName = mw.config.get('wgPageName');
        if (!pageName) return null;

        // Matches common Fandom user spaces: User, Message_Wall, and User_blog
        const match = pageName.match(/^(?:User|Message_Wall|User_blog):([^/]+)/i);
        if (match && match[1]) {
            return decodeURIComponent(match[1]).replace(/_/g, ' ');
        }
        return null;
    }

    const currentTargetUser = getTargetWikiUser();
    if (!currentTargetUser) return;

    // 2. APPLY VISUAL STAFF BADGES
    if (registeredModerators.includes(currentTargetUser)) {
        mw.hook('wikipage.content').add(function () {
            // Prevent duplicate badges from rendering during dynamic page loads
            if ($('.santernal-mod-badge').length === 0) {
                const badgeStyle = 'background: #00d2ff; color: #fff; font-weight: bold; padding: 3px 8px; margin-left: 10px; border-radius: 4px; font-size: 11px; letter-spacing: 0.5px; vertical-align: middle; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);';
                const modBadge = $('<span class="santernal-mod-badge" style="' + badgeStyle + '">MODERATOR</span>');
                
                // Mounts badge next to the main header username on both standard profiles and Message Walls
                $('.page-header__title, #firstHeading, .MessageWallHeader__title').first().append(modBadge);
            }
        });
    }

    // 3. EXECUTE MODERATION TOOLKIT (Only loads for active Admin/Bureaucrat/Moderator accounts)
    const clientGroups = mw.config.get('wgUserGroups') || [];
    const executionAuthorized = clientGroups.some(role => ['sysop', 'bureaucrat', 'content-moderator', 'discussions-moderator'].includes(role));

    if (executionAuthorized) {
        mw.hook('wikipage.content').add(function () {
            // Ensure toolkit UI isn't duplicated
            if ($('#santernal-mod-toolkit').length > 0) return;

            // Generate actionable HUD right under the profile header area
            const toolkitLayout = $(
                '<div id="santernal-mod-toolkit" style="margin: 15px 0; padding: 12px; border-left: 4px solid #00d2ff; background: rgba(0, 210, 255, 0.04); border-radius: 0 6px 6px 0; font-family: sans-serif;">' +
                    '<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">' +
                        '<span><strong>Santernal Staff Actions for <span style="color:#00d2ff;">' + currentTargetUser + '</span>:</strong></span>' +
                        '<div style="display: flex; gap: 8px;">' +
                            '<button id="modActionBlockSpam" style="background: #ff3860; color: #fff; border: none; padding: 5px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">Quick Block (Spam/Vandalism)</button>' +
                            '<button id="modActionWarnUser" style="background: #ffdd57; color: #363636; border: none; padding: 5px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 12px;">Issue Warning</button>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );

            // Hook the panel onto the Fandom desktop layout interface structure
            $('.page-header__bottom, .profile-wrapper, #mw-content-text').first().before(toolkitLayout);

            // ACTION HANDLER A: Interactive User Blocking via underlying MediaWiki core API tokens
            $('#modActionBlockSpam').on('click', function () {
                const verificationPrompt = confirm("Are you sure you want to block " + currentTargetUser + " for 3 days? This will revoke their wiki editing access instantly.");
                if (!verificationPrompt) return;

                new mw.Api().postWithToken('csrf', {
                    action: 'block',
                    user: currentTargetUser,
                    expiry: '3 days',
                    reason: 'Vandalism / Disruptive behaviour on Skybox Escape Industry\'s Santernal Nation Wiki',
                    nocreate: true, // Prevents sockpuppet alternate accounts from being made while blocked
                    autoblock: true  // Automatically catches IP shifts
                }).done(function () {
                    alert("Account " + currentTargetUser + " successfully restricted for 3 days.");
                    location.reload();
                }).fail(function (errorCode) {
                    alert("Action Rejected: " + errorCode + ". Make sure this account is explicitly granted Content Moderator or Administrator rights at Special:UserRights.");
                });
            });

            // ACTION HANDLER B: Quick automated posting to user Message Walls
            $('#modActionWarnUser').on('click', function () {
                const trackingReason = prompt("Enter the warning reason (e.g., Unofficial leaks, page blanking):");
                if (!trackingReason) return;

                new mw.Api().postWithToken('csrf', {
                    action: 'edit',
                    title: 'Message_Wall:' + currentTargetUser,
                    section: 'new',
                    sectiontitle: 'Official Staff Warning: Community Guidelines',
                    text: '{{subst:Welcome}}\n\nHello. You are receiving this official warning from the Santernal Nation Wiki moderation team for: **' + trackingReason + '**. Please review our community rule listings before continuing to update pages. [[User:RomanescoGAG|RomanescoGAG]] ([[User talk:RomanescoGAG|talk]]) 23:39, 2 August 2026 (UTC)',
                    summary: 'Publishing staff administrative warning notice'
                }).done(function () {
                    alert("Warning successfully logged to " + currentTargetUser + "'s message wall.");
                    location.reload();
                }).fail(function (errorCode) {
                    alert("Failed to leave warning message: " + errorCode);
                });
            });
        });
    }
}());
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Follow.js',
    ]
});