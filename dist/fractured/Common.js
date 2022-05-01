/* CSS placed here will be applied to all skins */
/* This governs the sections on the Community portal */
.cpbox {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
}

.cpbox #admins {
    box-sizing: border-box;
    width: calc(33% - 10px);
    margin: 5px;
    flex-grow: 1;
    min-width: 300px;
}

.cpbox #help {
    box-sizing: border-box;
    width: calc(67% - 10px);
    margin: 5px;
    flex-grow: 1;
}

/* Template documentation styles */
/* If modifying these styles, be sure to update the mobile skin! */
.doc {
    margin: 0em auto 1em;
    background-color: rgba(var(--theme-body-background-color--rgb), 0.1);
    border: 2px solid #BDCAC3;
    border-radius: 1em;
    padding: 1em;
}

.doc-header {
    padding-bottom: 3px;
    border-bottom: 1px solid #BDCAC3;
    margin-bottom: 1ex;
}

.doc-footer {
    margin: 0;
    background-color: rgba(var(--theme-body-background-color--rgb), 0.1);
    border: 2px solid #BDCAC3;
    border-radius: 1em;
    padding: 1em;
}

/* Classes permitting setting of alignment on desktop only or differently on desktop and mobile */
/* (See .mobileleft, .mobilecenter, .mobileright in MediaWiki:Mobile.css for the mobile equivalents */
.desktopleft {
    text-align: left;
}

.desktopcenter {
    text-align: center;
}

.desktopright {
    text-align: right;
}

/* Front page structure */
.fpbox {
    margin: 5px;
    padding: 5px;
    overflow: auto;
    width: calc(100% - 2px);
}

.fpbox.plain {
    background: transparent;
    border: none;
    box-shadow: none;
}

.fpbox .heading,
.fpbox .mainheading,
.fpbox .welcome {
    margin: 0 0 10px;
    padding: 0 0 5px;
    overflow: auto;
}

.fpbox .mainheading,
.fpbox .welcome {
    font-size: 150%;
    font-weight: bold;
}

.fpbox .heading {
    text-align: center;
    font-size: 132%;
}

.linkslabel {
    margin: 15px 5px 5px;
    padding: 0 0 5px;
}

/* Template:FP links styles */
.fplinks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: stretch;
    text-align: center;
}

.fplink-outer {
    padding: 5px;
    flex-basis: calc(25% - 10px);
    width: calc(25% - 15px);
    min-width: 115px;
    display: inline-block;
    vertical-align: middle;
}

.fplink-wide {
    flex-basis: calc(33% - 10px);
    width: calc(33% - 15px);
}

.fplink-fullwidth {
    flex-basis: 100%;
    width: calc(100% - 15px);
    font-weight: bold;
}

.fplink {
    padding: 0.5em;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: table;
}

.fplink-plain {
    background: transparent;
    border-radius: 0;
    border: 0;
    box-shadow: none;
}

.fplink-inner {
    display: table-row;
}

.fplink a {
    display: table-cell;
    vertical-align: middle;
}

.fplink img {
    max-width: 150px;
    width: 100%;
    height: auto;
}
/* Auto-resize front page video to fit smaller columns */
.fpbox .embedvideowrap {
    width: 100% !important;
    max-width: 480px;
    margin: 0 auto;
}

.fpbox .embedvideowrap iframe {
    width: 100%!important;
}

/* Multi-column box support */
.fp-container main .columns .leftcol,
.fp-container .columns .rightcol {
    width: 100%;
    margin: 0;
    padding: 0;
}

@media (min-width: 990px) {
    .fp-container .columns .leftcol {
        float: left;
        width: 50%;
    }

    .fp-container .columns .rightcol {
        float: right;
        width: 50%;
    }
}

.fp-section {
    display: flex;
    flex-wrap: wrap;
}

/* this CSS governs the responsive 2 column main page layout */
#fp-2column.fp-container {
    display: grid;
    grid-template-areas: "a" "b" "c";
    grid-template-columns: 100%;
}
@media screen and (min-width:990px) {
    #fp-2column.fp-container {
        grid-template-areas: "a b" "c c";
        grid-template-columns: 50% 50%;
    }
}
@media screen and (min-width:1350px) {
    #fp-2column.fp-container {
        grid-template-areas: "a b" "c b";
        grid-template-columns: auto 520px;
    }
}

#fp-top {
    grid-area: a;
}

#fp-flex {
    grid-area: b;
}

#fp-bottom {
    grid-area: c;
}

/* end responsive 2 column main page layout */

/* ******************** */
/* End main page layout */
/* ******************** */
/* CSS placed here will be applied to all skins */


window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'wShqyYe3gM',
    prependToRail: true
    noRail: false
};