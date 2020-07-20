/**
 * LW editor tools - templates (LW-specific data)
 *
 * See also: [[MediaWiki:EditorTools-templates.js]]
 * <nowiki>
 */

/*jslint browser, long */
/*global jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    // make global
    window.lw = window.lw || {};

    /**
     * Notes on format:
     *
     * Key = template name
     * Value = an array of all available parameters for the template
     *
     * A prefix of '?' indicates an optional parameter.
     *  - This allows a parameter to be sorted when it's present, but if it's not present, it won't be added automatically.
     * A prefix of '|' indicates an anonymous parameter.
     *  - This identifies anonymous parameters in the template sorting code at [[MediaWiki:EditorTools-templates.js]].
     * If the parameter is both optional and anonymous, use a '?|' prefix.
     */
    lw.defaultParameters = {
        "ArtistHeader": [
            "star",
            "?artist",
            "?roman",
            "?pic",
            "?caption",
            "homepage",
            "facebook",
            "myspace",
            "twitter",
            "?wikia",
            "wikipedia",
            "?wikipedia2",
            "country",
            "state",
            "hometown"
        ],
        "ArtistFooter": [
            "fLetter",
            "asin",
            "iTunes",
            "allmusic",
            "discogs",
            "musicbrainz",
            "spotify",
            "youtube"
        ],
        "AlbumHeader": [
            "artist",
            "?alias",
            "?artist1",
            "?split1",
            "?alias1",
            "?artist2",
            "?split2",
            "?alias2",
            "?artist3",
            "?split3",
            "?alias3",
            "?artist4",
            "?split4",
            "?alias4",
            "?artist5",
            "?split5",
            "?alias5",
            "album",
            "?roman",
            "?type",
            // soundtrack/work type are added to defaults dynamically (based on type)
            //"?stype",
            //"?wtype",
            "genre",
            "length",
            "cover",
            "wikipedia",
            "star",
            "?aotw-from",
            "?aotw-to"
        ],
        "AlbumFooter": [
            "fLetter",
            "asin",
            "iTunes",
            "allmusic",
            "discogs",
            "musicbrainz",
            "spotify"
        ],
        "FilmHeader": [
            "artist",
            "?alias",
            "film",
            "?roman",
            "genre",
            "length",
            "cover",
            "wikipedia",
            "star"
        ],
        "FilmFooter": [
            "asin",
            "imdb",
            "rtname",
            "rym",
            "iTunes",
            "allmusic",
            "discogs",
            "musicbrainz"
        ],
        "SongHeader": [
            "song",
            "?roman",
            "artist",
            "?alias",
            "?artist1",
            "?alias1",
            "?artist2",
            "?alias2",
            "?artist3",
            "?alias3",
            "?artist4",
            "?alias4",
            "?artist5",
            "?alias5",
            "?artist6",
            "?alias6",
            "?artist7",
            "?alias7",
            "?artist8",
            "?alias8",
            "?artist9",
            "?alias9",
            "?feat1",
            "?feat2",
            "?feat3",
            "album1",
            "?type1",
            "?album2",
            "?type2",
            "?album3",
            "?type3",
            "?album4",
            "?type4",
            "?album5",
            "?type5",
            "?album6",
            "?type6",
            "?album7",
            "?type7",
            "?album8",
            "?type8",
            "?album9",
            "?type9",
            "?album10",
            "?type10",
            "?album11",
            "?type11",
            "?album12",
            "?type12",
            "?album13",
            "?type13",
            "?album14",
            "?type14",
            "?album15",
            "?type15",
            "?album16",
            "?type16",
            "?album17",
            "?type17",
            "?album18",
            "?type18",
            "?album19",
            "?type19",
            "?album20",
            "?type20",
            // albumN + typeN are looped over in the template
            // hopefully 20 is enough for most songs…
            "language",
            "star"
        ],
        "SongFooter": [
            "fLetter",
            "asin",
            "iTunes",
            "allmusic",
            "musicbrainz",
            "spotify",
            "?youtube"
        ],
        "ArtistInfo": [
            "?info",
            "?realname",
            "?active",
            "?alias",
            "?awards",
            "?members",
            "?fmembers",
            "?memberof",
            "?fmemberof",
            "?collabs",
            "?related",
            "?header1",
            "?text1",
            "?header2",
            "?text2",
            "?header3",
            "?text3",
            "?|1"
        ],
        "CreditBox": [
            "?title",
            "?artists",
            "?writer",
            "?composer",
            "?lyricist",
            "?arranger",
            "?producer",
            "?coproducer",
            "?recorded",
            "?engineer",
            "?musicians",
            "?orchestra",
            "?conductor",
            "?featured",
            "?awards",
            "?copyright",
            "?header1",
            "?text1",
            "?header2",
            "?text2",
            "?header3",
            "?text3",
            "?header4",
            "?text4",
            "?header5",
            "?text5",
            "?trivia"
        ],
        "Artist Info": [
            "homepage",
            "mySpace",
            "wikipedia",
            "hometown",
            "cover",
            "other",
            "related",
            "genre",
            "iTunes",
            "allmusic",
            "discogs",
            "musicbrainz",
            "allsongs",
            "everyalbum"
        ],
        "Album Info": [
            "genre",
            "length",
            "cover",
            "asin",
            "iTunes",
            "allmusic",
            "discogs",
            "musicbrainz",
            "wikipedia",
            "allsongs"
        ],
        "Song Info": [
            "album",
            "video",
            "audio",
            "language",
            "asin",
            "iTunes",
            "wikipedia",
            "credits"
        ],
        "AlbumCover": [
            "page",
            "info",
            "source"
        ],
        "ArtistPhoto": [
            "artist",
            "site",
            "url",
            "dirurl",
            "info"
        ],
        "GenreCat": [
            "description",
            "origin",
            "subgenre",
            "allmusic",
            "discogs",
            "rateyourmusic",
            "wikipedia"
        ],
        "LabelCat": [
            "?name",
            "description",
            "logo",
            "website",
            "wikipedia",
            "discogs",
            "musicbrainz"
        ]
    };

    lw.sortableParameters = {
        "Covered": {
            prefix: "song",
            dataPrefixes: ["addtext"]
        }
    };
    lw.sortableParameters["Covered (long)"] = lw.sortableParameters["Covered"];

    lw.updateParameters = function (defaults, params, name) {
        // function to check if a particular parameter exists
        var hasParam = Object.prototype.hasOwnProperty.bind(params);

        // function to replace/remove a parameter name in defaults
        var changeDefaultParam = function (param, newParam) {
            var paramIndex = defaults.indexOf(param);
            if (paramIndex > -1) {
                if (newParam) {
                    defaults[paramIndex] = newParam;
                } else {
                    defaults.splice(paramIndex, 1);
                }
            }
        };

        // officialSite -> homepage
        if ((name === "ArtistHeader" || name === "Artist Info") && hasParam("officialSite")) {
            params.homepage = params.officialSite;
            delete params.officialSite;
        }

        // if album is a soundtrack, change genre parameter to stype
        if (name === "AlbumHeader" && hasParam("type") && params.type.toLowerCase() === "soundtrack") {
            changeDefaultParam("genre", "stype");
            delete params.genre;
        }

        // if album is a work, change genre parameter to wtype
        if (name === "AlbumHeader" && hasParam("type") && params.type.toLowerCase() === "work") {
            changeDefaultParam("genre", "wtype");
            delete params.genre;
        }

        // if album is a collab./split, remove default artist parameter
        if (name === "AlbumHeader" && (hasParam("artist1") || hasParam("split1"))) {
            changeDefaultParam("artist", null);
        }

        // if song is instrumental, remove language parameter
        if (name === "SongHeader" && (/\{\{[Ii]nstrumental\}\}/.test(lw.editbox.value))) {
            changeDefaultParam("language", null);
            delete params.language;
        }

        // if song is a collab., remove default artist parameter
        if (name === "SongHeader" && hasParam("artist1")) {
            changeDefaultParam("artist", null);
        }

        // fa# -> feat#
        if (name === "SongHeader" && hasParam("fa1")) {
            params.feat1 = params.fa1;
            delete params.fa1;
        }
        if (name === "SongHeader" && hasParam("fa2")) {
            params.feat2 = params.fa2;
            delete params.fa2;
        }
        if (name === "SongHeader" && hasParam("fa3")) {
            params.feat3 = params.fa3;
            delete params.fa3;
        }
    };

    function tidyAndUpdateTemplate(text, name) {
        return lw.tidyTemplate(text, name, lw.updateParameters);
    }

    function tidyAndSortTemplate(text, name) {
        // if this is a Covered template without "song2" then don't change it
        if (name === "Covered" && text.indexOf("song2") === -1) {
            return text;
        }

        return lw.tidyTemplate(text, name, lw.sortParameters);
    }

    lw.tidyTemplatesLW = function (pageText) {
        // template tidiers
        pageText = pageText
            .replace(lw.templateMatch("ArtistHeader"), tidyAndUpdateTemplate)
            .replace(lw.templateMatch("ArtistFooter"), lw.tidyTemplate)
            .replace(lw.templateMatch("AlbumHeader"), tidyAndUpdateTemplate)
            .replace(lw.templateMatch("AlbumFooter"), lw.tidyTemplate)
            .replace(lw.templateMatch("FilmHeader"), lw.tidyTemplate)
            .replace(lw.templateMatch("FilmFooter"), lw.tidyTemplate)
            .replace(lw.templateMatch("SongHeader"), tidyAndUpdateTemplate)
            .replace(lw.templateMatch("SongFooter"), lw.tidyTemplate)
            .replace(lw.templateMatch("ArtistInfo"), lw.tidyTemplate)
            .replace(lw.templateMatch("CreditBox"), lw.tidyTemplate)
            .replace(lw.templateMatch("Artist Info"), tidyAndUpdateTemplate)
            .replace(lw.templateMatch("Album Info"), lw.tidyTemplate)
            .replace(lw.templateMatch("Song Info"), lw.tidyTemplate)
            .replace(lw.templateMatch("AlbumCover"), lw.tidyTemplate)
            .replace(lw.templateMatch("ArtistPhoto"), lw.tidyTemplate)
            .replace(lw.templateMatch("GenreCat"), tidyAndUpdateTemplate)
            .replace(lw.templateMatch("LabelCat"), lw.tidyTemplate);

        // template prefix sorters
        var newPageText = pageText
            .replace(lw.templateMatch("Covered"), tidyAndSortTemplate)
            .replace(lw.templateMatch("Covered (long)"), tidyAndSortTemplate);

        // add edit summary if template prefix sorters made
        // any changes, as their changes can be more drastic
        if (pageText !== newPageText) {
            lw.addToEditSummary(
                window.codeLoad
                    && window.codeLoad.getScriptPrefs("TidyTemplates")["sort-summary"]
                    || "sort template params"
            );
        }

        return newPageText;
    };
}(jQuery, mediaWiki));