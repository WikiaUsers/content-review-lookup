/**
 * WikiaURL
 * 
 * A library dedicated to manipulating links from FANDOM.
 * Note: This library can also work on external links.
 * 
 * @author  Ultimate Dark Carnage
 * @version v1.31
 **/
window.dev = window.dev || { };
window.dev.url = window.dev.url || ( function( window, mw ) { 
    "use strict";
    // Cache for URLs
    const URL_CACHE = { };
    // Cache for URL queries
    const URL_QUERY_CACHE = new Map( );
    // Script version
    const VERSION = 1.31;
    // Supported top-level domains
    const SUPPORTED_TLDS = Object.freeze( [
        "\\.com",
        "\\.org",
        "\\.net",
        "\\.edu",
        "\\.gov"
    ] );
    // Wildcard
    const WILDCARD = ".*";
    // Wildcard (1 or more characters)
    const WILDCARD_S = ".+";
    // Approved protocols
    const PROTOCOLS = "https?:\\/\\/";
    // Fandom domain
    const FANDOM_DOMAIN = "(?:wikia\\.(?:com|org)|fandom\\.com)";
    // Accepted subdomain characters
    const SUBDOMAIN_CHARS = "[\w\d\-\_]+";
    // Wiki directpry
    const WIKI_DIRECTORY = "\\/wiki\\/";
    // Index directory
    const INDEX_DIRECTORY = "\\/index\\.php";
    // API directory
    const API_DIRECTORY = "\\/api\\.php";
    // Nirvana directory
    const NIRVANA_DIRECTORY = "\\/wikia\\.php";
    // No query string
    const NO_QUERY = "[^?&]+";
    // No slash string
    const NO_SLASH = "[^\\/]+";
    // Absolute Fandom URL pattern
    const FULL_WIKIA_URL_PATTERN = new RegExp( "^" + PROTOCOLS + "(?:" +
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "(?:\\/" +
        WILDCARD + "|)$", "g" );
    // Absolute Fandom URL pattern (no protocol)
    const FULL_WIKIA_URL_PATTERN_2 = new RegExp( "^(?:\\/\\/|)(?:" + 
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "(?:\\/" + 
        WILDCARD + "|)$", "g" );
    // Absolute external URL pattern
    const FULL_EXT_URL_PATTERN = new RegExp( "^" + PROTOCOLS + "(?:" +
        NO_SLASH + ")(?:" + SUPPORTED_TLDS.join( "|" ) + ")" +
        "(?:\\/" + WILDCARD + "|)$", "g" );
    // Absolute external URL (no protocol)
    const FULL_EXT_URL_PATTERN_2 = new RegExp( "^(?:\\/\\/|)(?:" +
        NO_SLASH + ")(?:" + SUPPORTED_TLDS.join( "|" ) + ")" +
        "(?:\\/" + WILDCARD + "|)$", "g" );
    // Wiki subdomain name capture
    const DBNAME_CAPTURE = new RegExp( "^" + PROTOCOLS + "(" + 
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "(?:\\/" +
        WILDCARD + "|)$", "g" );
    // Wiki subdomain name capture (no protocol)
    const DBNAME_CAPTURE_2 = new RegExp( "^(?:\\/\\/|)(" +
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "(?:\\/" +
        WILDCARD + "|)$", "g" );
    // Wiki title capture
    const TITLE_CAPTURE = new RegExp( "^(?:" + PROTOCOLS + "(?:" +
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "|)" +
        WIKI_DIRECTORY + "(" + NO_QUERY + ")" + WILDCARD + "$", "g" );
    // Wiki title capture (no protocol)
    const TITLE_CAPTURE_2 = new RegExp( "^(?:\\/\\/|)(?:" +
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "|)" +
        WIKI_DIRECTORY + "(" + NO_QUERY + ")" + WILDCARD + "$", "g" );
    // Wiki title capture (/index.php)
    const TITLE_CAPTURE_3 = new RegExp( "^(?:" + PROTOCOLS + "(?:" +
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "|)" + 
        INDEX_DIRECTORY + "\\?(?:" + WILDCARD + "&|)title=(" +
        NO_QUERY + ")" + WILDCARD + "$", "g" );
    // Wiki title capture (/index.php, no protocol)
    const TITLE_CAPTURE_4 = new RegExp( "^(?:\\/\\/|)(?:" +
        SUBDOMAIN_CHARS + ")\\." + FANDOM_DOMAIN + "|)" + 
        INDEX_DIRECTORY + "\\?(?:" + WILDCARD + "&|)title=(" +
        NO_QUERY + ")" + WILDCARD + "$", "g" );
    // URL properties
    const URL_PROPS = Object.freeze( [ 
        "host",
        "protocol",
        "path",
        "hash",
        "origin",
        "href"
    ] );
    // Origin list
    const FANDOM_ORIGIN_PATTERN = new RegExp( "\\." + FANDOM_DOMAIN +
        "$", "g" );
    // toString shortcut
    const ts = function( o ) { 
        return Object.prototype.toString.call( o );
    };
    // Checks if an object is a plain object
    const isPlainObject = function( o ) { 
        return ts( o ) === "[object Object]";
    };
} )( this, mediaWiki );