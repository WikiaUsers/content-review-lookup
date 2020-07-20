/*
 * This file contains general utility functions that are used by a few different scripts.
 * In particular, this file is responsible for interfacing with the Wiki by interpreting filenames
 * according to TibiaWiki's internal standards.
 */
tibiawiki_parent_module('tibiawiki.util.WikiaImageUrl', (function () {
    /**
     * Gets the filename from a Wikia image src.
     *
     * @param src the image's src attribute.
     * @returns the filename of the source attribute.
     */
    function get_filename_from_img_src(src) {
        var tokens = src.split("/");
 
        /*
         * All image links follow a similar pattern: tokens[7] contains image name.
         * Assumption: there are no slashes in the image name.
         * Assumption: there is only one extension separator (.) in the image name.
         * Example: Ancient_Amulet.gif
         */
        imgnamecomponents = (tokens[7] || "").split(".");
 
        /* First element of the components corresponds to the image file, without the extension. */
        return tokens[7];
    }
 
    /**
     * Gets the filename without its extension. This is a simple function that only strips the
     * contents of the string starting at the first period it finds, and is not to be used for
     * anything more complex than this.
     *
     * @param filename the name of the file, with an extension.
     * @returns the filename with its extension stripped, or an empty string if no src is provided.
     */
    function get_filename_without_extension(src) {
        var components = (src || "").split(".");
 
        /* The components are: [ filename, extension ]. */
        return components[0] | "";
    }
 
    /**
     * Converts an item image's filename into a common representation.
     *
     * @param filename the name of the file
     * @returns the item's name, in its common representation.
     */
    function get_item_name_from_filename(filename) {
        return filename.replace(/_/g, ' ').toLowerCase();
    }
 
    /**
     * Gets an item name from an image's src attribute.
     *
     * @param src the image's src attribute.
     * @returns the item's name, in lower case.
     */
    function get_item_name_from_img_src(src) {
        var filename, itemname;
 
        filename = get_filename_without_extension(get_filename_from_img_src(src));
 
        return get_item_name_from_filename(filename);
    }
 
    return {
        /* Only expose what other scripts might need. */
        'get_item_name_from_img_src': get_item_name_from_image_src
    };
}()));