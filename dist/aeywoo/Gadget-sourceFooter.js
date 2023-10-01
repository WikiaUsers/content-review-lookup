// SourceEditorFooter.js, by Aeywoo with help from: Sophiedp, Arashiryuu0 and Caburum
mw.loader.using(["mediawiki.api","mediawiki.jqueryMsg"]).then(function() {
    "use strict";
    return new mw.Api().loadMessagesIfMissing(["wds-fandom-homepage-aria-label","global-footer-fandom-overview-header","global-footer-follow-us-header","global-footer-follow-us-aria-label-facebook","global-footer-follow-us-aria-label-twitter","global-footer-follow-us-aria-label-youtube","global-footer-follow-us-aria-label-instagram","global-footer-follow-us-aria-label-linkedin","global-footer-company-overview-header","global-footer-company-overview-link-what-is-fandom","global-footer-company-overview-link-about","global-footer-company-overview-link-careers","global-footer-company-overview-link-press","global-footer-company-overview-link-contact","global-footer-site-overview-link-terms-of-use","global-footer-site-overview-link-privacy-policy","global-footer-site-overview-link-global-sitemap","global-footer-site-overview-link-local-sitemap","global-footer-community-header","global-footer-community-link-community-central","global-footer-community-link-support","global-footer-community-link-help","global-footer-advertise-header","global-footer-advertise-link-media-kit","global-footer-community-apps-header","global-footer-community-apps-description","global-footer-fandom-appstore-link-aria-label","global-footer-fandom-googleplay-link-aria-label","global-footer-licensing-and-vertical-description","global-footer-licensing-and-vertical-description-param-vertical-anime","global-footer-licensing-and-vertical-description-param-vertical-books","global-footer-licensing-and-vertical-description-param-vertical-comics","global-footer-licensing-and-vertical-description-param-vertical-games","global-footer-licensing-and-vertical-description-param-vertical-lifestyle","global-footer-licensing-and-vertical-description-param-vertical-movies","global-footer-licensing-and-vertical-description-param-vertical-music","global-footer-licensing-and-vertical-description-param-vertical-tv","global-footer-mobile-site-link"]);
}).then(function() {
    // Checks if you're in edit or submit mode of the 2010 Source Editor
    if (($(document.body).hasClass("action-edit") || $(document.body).hasClass("action-submit")) !== true ) {
        return;
    }
    // Prevent double loading
    if ($(document.body).hasClass("source-editor-footer")) {
        return;
    }
    var editorFooterClass = $(document.body).addClass("source-editor-footer");
    
    // Creating the variables
    /// Footer Bottom Bar Text
    var footerDivText = "Fandom Sucks";
    var output = mw.config.get("wikiVertical");
    if ($.isEmptyObject(output)) {
        // The output is null, so display a message to the user
        footerDivText = mw.message("global-footer-licensing-and-vertical-description", mw.config.get("wgSiteName"), "");
        mw.log.error("The wikiVertical variable is not defined for this MediaWiki installation, please report this to Fandom Staff immediately, defaulting to an empty string");
    } else if (typeof output == "string") {
        output = output.replace("other", mw.message("global-footer-licensing-and-vertical-description-param-vertical-lifestyle"));
        output = output.replace("anime", mw.message("global-footer-licensing-and-vertical-description-param-vertical-anime"));
        output = output.replace("books", mw.message("global-footer-licensing-and-vertical-description-param-vertical-books"));
        output = output.replace("comics", mw.message("global-footer-licensing-and-vertical-description-param-vertical-comics"));
        output = output.replace("games", mw.message("global-footer-licensing-and-vertical-description-param-vertical-games"));
        output = output.replace("lifestyle", mw.message("global-footer-licensing-and-vertical-description-param-vertical-lifestyle"));
        output = output.replace("movies", mw.message("global-footer-licensing-and-vertical-description-param-vertical-movies"));
        output = output.replace("music", mw.message("global-footer-licensing-and-vertical-description-param-vertical-music"));
        output = output.replace("tv", mw.message("global-footer-licensing-and-vertical-description-param-vertical-tv"));
        var capitalizedOutput = output.charAt(0).toUpperCase() + output.slice(1);
        footerDivText = mw.msg("global-footer-licensing-and-vertical-description", mw.config.get("wgSiteName"), capitalizedOutput);
    } else {
        return;
    }
    var footerBottomCommunityDiv = $("<div>")
        .text(footerDivText);
    
    /// Division Group 1 (Logo // Explore)
    var globalFooterLogo = $("<h2>")
        .addClass("global-footer__header");
    var globalFooterLogoA = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .attr("data-tracking-label", "logo")
        .attr("title", "Fandom")
        .attr("aria-label", mw.message("wds-fandom-homepage-aria-label"));
    var globalFooterLogoSvg = $("<svg class=\"global-footer__header-logo\"><use xlink:href=\"#wds-brand-fandom-logo-light\"></use></svg>");
    //// Explore Section
    var globalFooterExploreSection = $("<section>")
        .addClass("global-footer__section global-footer__section-fandom-overview");
    var globalFooterExploreHeader = $("<h3>")
        .addClass("global-footer__section-header")
        .text(mw.message("global-footer-fandom-overview-header"));
    var globalFooterExploreList = $("<ul>")
        .addClass("global-footer__links");
    var globalFooterExploreLink1 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "explore.fandom")
        .attr("aria-label", "Fandom")
        .text("Fandom");
    var globalFooterExploreLink2 = $("<a>")
        .attr("href", "https://www.cortexrpg.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "explore.cortexrpg")
        .attr("aria-label", "CortexRPG")
        .text("Cortex RPG");
    var globalFooterExploreLink3 = $("<a>")
        .attr("href", "https://www.muthead.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "explore.muthead")
        .attr("aria-label", "Muthead")
        .text("Muthead");
    var globalFooterExploreLink4 = $("<a>")
        .attr("href", "https://www.futhead.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "explore.futhead")
        .attr("aria-label", "Futhead")
        .text("Futhead");
    var globalFooterExploreLink5 = $("<a>")
        .attr("href", "https://www.fanatical.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "explore.fanatical")
        .attr("aria-label", "Fanatical")
        .text("Fanatical");
    //// Follow Us Section
    var globalFooterFollowUsSection = $("<section>")
        .addClass("global-footer__section global-footer__section-social-links");
    var globalFooterFollowUsHeader = $("<h3>")
        .addClass("global-footer__section-header")
        .text(mw.message("global-footer-follow-us-header"));
    var globalFooterFollowUsList = $("<ul>")
        .addClass("global-footer__links");
    var globalFooterFollowUsFacebook = $("<a>")
        .attr("href", "https://www.facebook.com/getfandom")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "follow-us.facebook")
        .attr("aria-label", mw.message("global-footer-follow-us-aria-label-facebook"));
    var globalFooterFollowUsTwitter = $("<a>")
        .attr("href", "https://twitter.com/getfandom")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "follow-us.twitter")
        .attr("aria-label", mw.message("global-footer-follow-us-aria-label-twitter"));
    var globalFooterFollowUsYouTube = $("<a>")
        .attr("href", "https://www.youtube.com/fandomentertainment")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "follow-us.youtube")
        .attr("aria-label", mw.message("global-footer-follow-us-aria-label-youtube"));
    var globalFooterFollowUsInstagram = $("<a>")
        .attr("href", "https://www.instagram.com/getfandom/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "follow-us.instagram")
        .attr("aria-label", mw.message("global-footer-follow-us-aria-label-instagram"));
    var globalFooterFollowUsLinkedIn = $("<a>")
        .attr("href", "https://www.linkedin.com/company/157252")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "follow-us.linkedin")
        .attr("aria-label", mw.message("global-footer-follow-us-aria-label-linkedin"));
    var globalFooterIconFacebook = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-facebook\"></use></svg>");
    var globalFooterIconTwitter = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-twitter\"></use></svg>");
    var globalFooterIconYouTube = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-youtube\"></use></svg>");
    var globalFooterIconInstagram = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-instagram\"></use></svg>");
    var globalFooterIconLinkedIn = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-linkedin\"></use></svg>");
    /// Division Group 2 (Overview)
    var globalFooterOverviewSection = $("<section>")
        .addClass("global-footer__section global-footer__section-site-overview");
    var globalFooterOverviewHeader = $("<h3>")
        .addClass("global-footer__section-header")
        .text(mw.message("global-footer-company-overview-header"));
    var globalFooterOverviewList = $("<ul>")
        .addClass("global-footer__links");
    var globalFooterSiteOverviewLink1 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "company-overview.what-is-fandom")
        .attr("aria-label", mw.message("global-footer-company-overview-link-what-is-fandom"))
        .text(mw.message("global-footer-company-overview-link-what-is-fandom"));
    var globalFooterSiteOverviewLink2 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "company-overview.about")
        .attr("aria-label", mw.message("global-footer-company-overview-link-about"))
        .text(mw.message("global-footer-company-overview-link-about"));
    var globalFooterSiteOverviewLink3 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "company-overview.careers")
        .attr("aria-label", mw.message("global-footer-company-overview-link-careers"))
        .text(mw.message("global-footer-company-overview-link-careers"));
    var globalFooterSiteOverviewLink4 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "company-overview.press")
        .attr("aria-label", mw.message("global-footer-company-overview-link-press"))
        .text(mw.message("global-footer-company-overview-link-press"));
    var globalFooterSiteOverviewLink5 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "company-overview.contact")
        .attr("aria-label", "global-footer-company-overview-link-contact")
        .text(mw.message("global-footer-company-overview-link-contact"));
    var globalFooterSiteOverviewLink6 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "site-overview.terms-of-use")
        .attr("aria-label", mw.message("global-footer-site-overview-link-terms-of-use"))
        .text(mw.message("global-footer-site-overview-link-terms-of-use"));
    var globalFooterSiteOverviewLink7 = $("<a>")
        .attr("href", "https://www.fandom.com/")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "site-overview.privacy-policy")
        .attr("aria-label", mw.message("global-footer-site-overview-link-privacy-policy"))
        .text(mw.message("global-footer-site-overview-link-privacy-policy"));
    var globalFooterSiteOverviewLink8 = $("<a>")
        .attr("href", "https://community.fandom.com/wiki/Sitemap")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "site-overview.global-sitemap")
        .attr("aria-label", mw.message("global-footer-site-overview-link-global-sitemap"))
        .text(mw.message("global-footer-site-overview-link-global-sitemap"));
    var globalFooterSiteOverviewLink9 = $("<a>")
        .attr("href", mw.util.getUrl("Local_Sitemap"))
        .addClass("global-footer__link")
        .attr("data-tracking-label", "site-overview.local-sitemap")
        .attr("aria-label", mw.message("global-footer-site-overview-link-local-sitemap"))
        .text(mw.message("global-footer-site-overview-link-local-sitemap"));
    /// Division Group 3 (Community // Advertise)
    //// Community Section
    var globalFooterCommunitySection = $("<section>")
        .addClass("global-footer__section global-footer__section-community");
    var globalFooterCommunityHeader = $("<h3>")
        .addClass("global-footer__section-header")
        .text(mw.message("global-footer-community-header"));
    var globalFooterCommunityList = $("<ul>")
        .addClass("global-footer__links");
    var globalFooterCommunityLink1 = $("<a>")
        .attr("href", "https://community.fandom.com/wiki/Community_Central")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "community.community-central")
        .attr("aria-label", mw.message("global-footer-community-link-community-central"))
        .text(mw.message("global-footer-community-link-community-central"));
    var globalFooterCommunityLink2 = $("<a>")
        .attr("href", "https://fandom.zendesk.com")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "community.support")
        .attr("aria-label", mw.message("global-footer-community-link-support"))
        .text(mw.message("global-footer-community-link-support"));
    var globalFooterCommunityLink3 = $("<a>")
        .attr("href", "https://community.fandom.com/wiki/Help:Contents")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "community.help")
        .attr("aria-label", mw.message("global-footer-community-link-help"))
        .text(mw.message("global-footer-community-link-help"));
    //// Advertise Section
    var globalFooterAdvertiseSection = $("<section>")
        .addClass("global-footer__section global-footer__section-advertise");
    var globalFooterAdvertiseHeader = $("<h3>")
        .addClass("global-footer__section-header")
        .text(mw.message("global-footer-advertise-header"));
    var globalFooterAdvertiseList = $("<ul>")
        .addClass("global-footer__links");
    var globalFooterAdvertiseLink1 = $("<a>")
        .attr("href", "https://about.fandom.com/mediakit")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "advertise.media-kit")
        .attr("aria-label", mw.message("global-footer-advertise-link-media-kit"))
        .text(mw.message("global-footer-advertise-link-media-kit"));
    var globalFooterAdvertiseLink2 = $("<a>")
        .attr("href", "https://www.fandomatic.com")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "advertise.fandomatic")
        .attr("aria-label", "Fandomatic")
        .text("Fandomatic");
    var globalFooterAdvertiseLink3 = $("<a>")
        .attr("href", "https://about.fandom.com/mediakit#contact")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "advertise.contact")
        .attr("aria-label", mw.message("global-footer-company-overview-link-contact"))
        .text(mw.message("global-footer-company-overview-link-contact"));
    /// Division Group 4 (Fandom Apps)
    var globalFooterFandomAppsSection = $("<section>")
        .addClass("global-footer__section global-footer__section-fandom-apps");
    var globalFooterFandomAppsHeader = $("<h3>")
        .addClass("global-footer__section-header")
        .text(mw.message("global-footer-community-apps-header"));
    var globalFooterFandomAppsP = $("<p>")
        .text(mw.message("global-footer-community-apps-description"));
    var globalFooterStoreAppsSection = $("<section>")
        .addClass("global-footer__section global-footer__section-fandom-stores");
    var globalFooterStoreAppsList = $("<ul>")
        .addClass("global-footer__links");
    var globalFooterStoreAppsLink1 = $("<a>")
        .attr("href", "https://apps.apple.com/us/app/fandom-videos-news-reviews/id1230063803")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "community-apps.app-store")
        .attr("aria-label", mw.message("global-footer-fandom-appstore-link-aria-label"));
    var globalFooterStoreAppsLink2 = $("<a>")
        .attr("href", "https://play.google.com/store/apps/details?id=com.fandom.app&referrer=utm_source%3Dwikia%26utm_medium%3Dglobalfooter")
        .addClass("global-footer__link")
        .attr("data-tracking-label", "community-apps.google-play")
        .attr("aria-label", mw.message("global-footer-fandom-googleplay-link-aria-label"));
    var globalFooterFandomLogoSvg = $("<svg class=\"global-footer__icon\"><use xlink:href=\"#wds-brand-fandom-logo-store\"></use></svg>");
    var globalFooterAppleStoreSvg = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-brand-other-appstore\"></use></svg>");
    var globalFooterGooglePlaySvg = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-brand-other-googleplay\"></use></svg>");
    
    // Time to build it!
    $(".main-container").append($("<footer class=\"global-footer\">"));
    $(".main-container footer.global-footer").append($("<div class=\"global-footer__content\">"),$("<div class=\"global-footer__bottom\">"));
    $("footer.global-footer .global-footer__content").append($("<div class=\"global-footer__content-explore-follow-us\">"),$("<div class=\"global-footer__content-overview\">"),$("<div class=\"global-footer__content-community-advertise\">"),$("<div class=\"global-footer__content-fandom-apps\">"));
    /// Division Group 1 (Logo // Explore)
    $("footer.global-footer .global-footer__content-explore-follow-us").append(globalFooterLogo,globalFooterExploreSection,globalFooterFollowUsSection);
    $(globalFooterLogo).append(globalFooterLogoA);
    $(globalFooterLogoA).append(globalFooterLogoSvg);
    //// Explore Section
    $(globalFooterExploreSection).append(globalFooterExploreHeader,globalFooterExploreList);
    $(globalFooterExploreList).append($("<li class=\"explore-fandom\">"),$("<li class=\"explore-cortex-rpg\">"),$("<li class=\"explore-muthead\">"),$("<li class=\"explore-futhead\">"),$("<li class=\"explore-fanatical\">"));
    $(".global-footer__section.global-footer__section-fandom-overview .explore-fandom").append(globalFooterExploreLink1);
    $(".global-footer__section.global-footer__section-fandom-overview .explore-cortex-rpg").append(globalFooterExploreLink2);
    $(".global-footer__section.global-footer__section-fandom-overview .explore-muthead").append(globalFooterExploreLink3);
    $(".global-footer__section.global-footer__section-fandom-overview .explore-futhead").append(globalFooterExploreLink4);
    $(".global-footer__section.global-footer__section-fandom-overview .explore-fanatical").append(globalFooterExploreLink5);
    // So, it's time to get Schwifty with it
    //// Follow Us Section
    $(globalFooterFollowUsSection).append(globalFooterFollowUsHeader,globalFooterFollowUsList);
    $(globalFooterFollowUsList).append($("<li class=\"follow-us-facebook\">"),$("<li class=\"follow-us-twitter\">"),$("<li class=\"follow-us-youtube\">"),$("<li class=\"follow-us-instagram\">"),$("<li class=\"follow-us-linkedin\">"));
    $(".global-footer__section-social-links .follow-us-facebook").append(globalFooterFollowUsFacebook);
    $(globalFooterFollowUsFacebook).append(globalFooterIconFacebook);
    $(".global-footer__section-social-links .follow-us-twitter").append(globalFooterFollowUsTwitter);
    $(globalFooterFollowUsTwitter).append(globalFooterIconTwitter);
    $(".global-footer__section-social-links .follow-us-youtube").append(globalFooterFollowUsYouTube);
    $(globalFooterFollowUsYouTube).append(globalFooterIconYouTube);
    $(".global-footer__section-social-links .follow-us-instagram").append(globalFooterFollowUsInstagram);
    $(globalFooterFollowUsInstagram).append(globalFooterIconInstagram);
    $(".global-footer__section-social-links .follow-us-linkedin").append(globalFooterFollowUsLinkedIn);
    $(globalFooterFollowUsLinkedIn).append(globalFooterIconLinkedIn);
    /// Division Group 2 (Overview)
    $("footer.global-footer .global-footer__content-overview").append(globalFooterOverviewSection);
    $(globalFooterOverviewSection).append(globalFooterOverviewHeader,globalFooterOverviewList);
    $(globalFooterOverviewList).append($("<li class=\"site-overview-what-is-fandom\">"),$("<li class=\"site-overview-about\">"),$("<li class=\"site-overview-careers\">"),$("<li class=\"site-overview-press\">"),$("<li class=\"site-overview-contact\">"),$("<li class=\"site-overview-terms-of-use\">"),$("<li class=\"site-overview-privacy-policy\">"),$("<li class=\"site-overview-global-sitemap\">"),$("<li class=\"site-overview-local-sitemap\">"));
    $(".global-footer__section.global-footer__section-site-overview .site-overview-what-is-fandom").append(globalFooterSiteOverviewLink1);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-about").append(globalFooterSiteOverviewLink2);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-careers").append(globalFooterSiteOverviewLink3);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-press").append(globalFooterSiteOverviewLink4);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-contact").append(globalFooterSiteOverviewLink5);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-terms-of-use").append(globalFooterSiteOverviewLink6);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-privacy-policy").append(globalFooterSiteOverviewLink7);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-global-sitemap").append(globalFooterSiteOverviewLink8);
    $(".global-footer__section.global-footer__section-site-overview .site-overview-local-sitemap").append(globalFooterSiteOverviewLink9);
    /// Division Group 3 (Community // Advertise)
    $("footer.global-footer .global-footer__content-community-advertise").append(globalFooterCommunitySection,globalFooterAdvertiseSection);
    //// Community Section
    $(globalFooterCommunitySection).append(globalFooterCommunityHeader,globalFooterCommunityList);
    $(globalFooterCommunityList).append($("<li class=\"community-central\">"),$("<li class=\"community-support\">"),$("<li class=\"community-help\">"));
    $(".global-footer__section.global-footer__section-community .community-central")
        .append(globalFooterCommunityLink1);
    $(".global-footer__section.global-footer__section-community .community-support")
        .append(globalFooterCommunityLink2);
    $(".global-footer__section.global-footer__section-community .community-help")
        .append(globalFooterCommunityLink3);
    //// Advertise Section
    $(globalFooterAdvertiseSection).append(globalFooterAdvertiseHeader,globalFooterAdvertiseList);
    $(globalFooterAdvertiseList).append($("<li class=\"advertise-media-kit\">"),$("<li class=\"advertise-fandomatic\">"),$("<li class=\"advertise-contact\">"));
    $(".global-footer__section.global-footer__section-advertise .advertise-media-kit")
        .append(globalFooterAdvertiseLink1);
    $(".global-footer__section.global-footer__section-advertise .advertise-fandomatic")
        .append(globalFooterAdvertiseLink2);
    // Since Fandom doesn't want other languages to have this link, might as well continue the parity, fucking Americans.
    if (mw.config.get("wgUserLanguage") == "en") {
    	$(".global-footer__section.global-footer__section-advertise .advertise-contact")
    	    .append(globalFooterAdvertiseLink3);
    }
    /// Division Group 4 (Fandom Apps)
    $("footer.global-footer .global-footer__content-fandom-apps").append(globalFooterFandomAppsSection,globalFooterStoreAppsSection);
    $(globalFooterFandomAppsSection).append(globalFooterFandomAppsHeader,globalFooterFandomAppsP);
    $(globalFooterStoreAppsSection).append(globalFooterFandomLogoSvg,globalFooterStoreAppsList);
    $(globalFooterStoreAppsList).append($("<li class=\"fandom-apps-app-store\">"),$("<li class=\"fandom-apps-google-play\">"));
    $(".global-footer__section.global-footer__section-fandom-stores .fandom-apps-app-store").append(globalFooterStoreAppsLink1);
    $(globalFooterStoreAppsLink1).append(globalFooterAppleStoreSvg);
    $(".global-footer__section.global-footer__section-fandom-stores .fandom-apps-google-play").append(globalFooterStoreAppsLink2);
    $(globalFooterStoreAppsLink2).append(globalFooterGooglePlaySvg);
    $("footer.global-footer .global-footer__bottom").append(footerBottomCommunityDiv);
    
    // Language Specific Edits
    /// Deutsch
    if (mw.config.get("wgUserLanguage") == "de") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook)
            .attr("href", "https://www.facebook.com/de.fandom");
        $(globalFooterFollowUsTwitter)
            .attr("href", "https://twitter.com/fandom_deutsch");
        $(globalFooterFollowUsInstagram)
            .attr("href", "https://www.instagram.com/de_fandom");
    }
    /// Espanol (es - español)
    if (mw.config.get("wgUserLanguage") == "es") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/Fandom.espanol");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/es_fandom");
    }
    /// Francais (fr - français)
    if (mw.config.get("wgUserLanguage") == "fr") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/fandom.fr");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/fandom_fr");
    }
    /// Italiano (it - italiano)
    if (mw.config.get("wgUserLanguage") == "it") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/fandom.italy");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/fandom_italy");
    }
    /// Japanese (ja - 日本語)
    if (mw.config.get("wgUserLanguage") == "ja") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/FandomJP");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/FandomJP");
    }
    /// Polish (pl - polski)
    if (mw.config.get("wgUserLanguage") == "pl") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/pl.fandom");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/pl_fandom");
    }
    /// Portuguese (pt-BR - português do Brasil)
    if (mw.config.get("wgUserLanguage") == "pt-BR") {
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/getfandom.br");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/getfandom_br");
    }
    /// Russian (ru - русский)
    if (mw.config.get("wgUserLanguage") == "ru") {
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        $(globalFooterFollowUsYouTube).remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/ru.fandom");
        $(globalFooterFollowUsTwitter).attr("href", "https://twitter.com/ru_fandom");
        // Adding the VK Link and Icon
        var globalFooterFollowUsVK = $("<a>")
            .attr("href", "https://vk.com/ru_fandom")
            .addClass("global-footer__link")
            .attr("data-tracking-label", "follow-us.vkontakte")
            .attr("aria-label", "Подпишитесь на Фэндом в ВК");
        var globalFooterIconVK = $("<svg class=\"global-footer__link-icon wds-icon wds-icon-small\"><use xlink:href=\"#wds-icons-vkontakte\"></use></svg>");
        $($(".global-footer__section.global-footer__section-social-links .follow-us-youtube")).append(globalFooterFollowUsVK);
        $(globalFooterFollowUsVK).append(globalFooterIconVK);
    }
    /// Chinese (zh - 中文)
    if ((mw.config.get("wgUserLanguage") == "zh") || (mw.config.get("wgUserLanguage") == "zh-Hant-HK") || (mw.config.get("wgUserLanguage") == "zh-Hant-TW")) {
        // Removes globalFooterFollowUsTwitter
        $(".global-footer__section.global-footer__section-social-links .follow-us-twitter").remove();
        // Removes globalFooterFollowUsYouTube
        $(".global-footer__section.global-footer__section-social-links .follow-us-youtube").remove();
        // Removes globalFooterFollowUsInstagram
        $(".global-footer__section.global-footer__section-social-links .follow-us-instagram").remove();
        // Removes globalFooterFollowUsLinkedIn
        $(".global-footer__section.global-footer__section-social-links .follow-us-linkedin").remove();
        // Changing URLs
        $(globalFooterFollowUsFacebook).attr("href", "https://www.facebook.com/fandom.zh");
    }
});