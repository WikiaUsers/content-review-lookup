/********************* this comment is 80 characters long *********************/

(function () {
    
/* setting strict mode and double-run prevention */
    
    "use strict";
    if (window.andrewds1021 && window.andrewds1021.tabber_default
        && window.andrewds1021.tabber_default.has_run) return;
    if (!window.andrewds1021) {
        window.andrewds1021 = {
            tabber_default: {}
        };
    } else if (!window.andrewds1021.tabber_default) {
        window.andrewds1021.tabber_default = {};
    }
    window.andrewds1021.tabber_default.has_run = true;
    
/* find instances of Tabber */
    
    var tabbers = Array.prototype.slice.call(document.getElementsByClassName("tabber"));
    if (tabbers.length) tabbers.forEach(setTabberDefault);
    
/*
 * process a Tabber instance with the following procedure
 * if there should not be any remaining instances, return
 * find instance in pre-collected instances list
   * if not found, return
   * else remove instance from list and proceed
   * this ensures an instance is processed at most once
 * retrieve fragment from URL
 * find tab labels, content boxes, first hash-matching descendant, and first descendant
   with default marker
 * if a tab label hash-matches, return
   * this prevents the default tab from overriding a tab specified by fragment
 * find index of content box to display
   * if hash-matching descendant was found, find the content box it is inside
   * if no hash-matching descendant or content box not found, find first content
     box with default marker
     * to account for potential nesting, marker must be either a direct
       descendant or a direct descendant of the wrapper paragraph tag
   * if still no content box found and descendant with default marker was found,
     find the content box the descendant is inside
 * if no content box found for display, return
 * set the display and class for each pair of content box and navigation link
 * NOTE: when editing this procedure, remember that instances may be nested
*/
    
    function setTabberDefault(tabs) {
        if (!tabbers.length) return;
        var index = tabbers.indexOf(tabs);
        if (index == -1) return;
        tabbers.splice(index, 1);
        var hash = location.hash.substring(1);
        var labels = [];
        var content = [];
        var nested_hash, nested_mark, iter;
        Array.prototype.slice.call(tabs.getElementsByClassName("wds-tabs__tab"))
            .forEach(function (val) {
            if (tabs == val.parentElement.parentElement.parentElement) {
                labels.push(val);
            } else if (!nested_hash && hash && (hash == val.getAttribute("data-hash"))) {
                nested_hash = val;
            }
        });
        Array.prototype.slice.call(tabs.getElementsByClassName("wds-tab__content"))
            .forEach(function (val1) {
            if (tabs == val1.parentElement) {
                content.push(val1);
            } else if (!nested_mark && val1.getElementsByClassName("TabberDefault")
                .length) {
                nested_mark = val1;
            }
        });
        if (hash && labels.some(function (val) {
            return hash == val.getAttribute("data-hash");
        })) return;
        index = -1;
        while ((index == -1) && nested_hash) {
            nested_hash = nested_hash.parentElement;
            index = content.indexOf(nested_hash);
        }
        for (iter = 0; (index == -1) && (iter < content.length); iter++) {
            if (Array.prototype.slice.call(content[iter]
                .getElementsByClassName("TabberDefault")).filter(function (val) {
                while (!val.classList.contains("wds-tab__content"))
                    val = val.parentElement;
                return content[iter] == val;
            }).length) index = iter;
        }
        while ((index == -1) && nested_mark) {
            nested_mark = nested_mark.parentElement;
            index = content.indexOf(nested_mark);
        }
        if (index == -1) return;
        content.forEach(function (val, idx) {
            if (index == idx) {
                val.classList.add("wds-is-current");
                labels[index].classList.add("wds-is-current");
            } else {
                val.classList.remove("wds-is-current");
                labels[idx].classList.remove("wds-is-current");
            }
        });
    }
    
})();