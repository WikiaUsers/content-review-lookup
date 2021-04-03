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
    if (!tabbers.length) return;
    
/*
 * create observer to process Tabber instances only after the extension is done
   with the instances' initial set-up
*/
    
    var observer_target = document.getElementById("WikiaMainContent");
    if (!observer_target) return;
    observer_target = observer_target.parentElement;
    var observer = new MutationObserver(function (records) {
        records.forEach(function (rec) {
            if ((rec.type == "attributes") && (rec.attributeName == "class")
                && rec.target.classList && rec.target.classList.contains("tabberlive")
                && rec.oldValue && !rec.oldValue.match(/\btabberlive\b/))
                setTabberDefault(rec.target);
        });
    });
    observer.observe(
        observer_target,
        {
            subtree: true,
            attributeFilter: [
                "class"
            ],
            attributeOldValue: true
        }
    );
    
/* process Tabber instances set-up prior to start of observation */
    
    Array.prototype.slice.call(document.getElementsByClassName("tabberlive"))
        .forEach(setTabberDefault);
    
/*
 * process a Tabber instance with the following procedure
 * if there should not be any remaining instances, stop observer and return
 * find instance in pre-collected instances list
   * if not found, return
   * else remove instance from list and proceed
   * this ensures an instance is processed at most once
 * retrieve fragment from URL
 * find content boxes, first hash-matching descendant, and first descendant with
   default marker
 * if a content box hash-matches, return
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
 * find navigation links for instance
 * if number of content boxes and number of navigation links do not match, return
   * if this happens, it means something has gone wrong
 * set the display and class for each pair of content box and navigation link
 * NOTE: when editing this procedure, remember that instances may be nested
*/
    
    function setTabberDefault(tabs) {
        if (!tabbers.length) {
            observer.disconnect();
            return;
        }
        var index = tabbers.indexOf(tabs);
        if (index == -1) return;
        tabbers.splice(index, 1);
        var hash = location.hash.substring(1);
        var content = [];
        var nested_hash, nested_mark, iter;
        Array.prototype.slice.call(tabs.getElementsByClassName("tabbertab"))
            .forEach(function (val1) {
            if (tabs == val1.parentElement) {
                content.push(val1);
            } else if (!nested_hash && hash && (hash == val1.getAttribute("data-hash"))) {
                nested_hash = val1;
            } else if (!nested_mark && Array.prototype.slice.call(
                val1.getElementsByClassName("TabberDefault")).filter(function (val2) {
                if (val2.parentElement.tagName == "P")
                    return val1 == val2.parentElement.parentElement;
                return val1 == val2.parentElement;
            }).length) {
                nested_mark = val1;
            }
        });
        if (hash && content.some(function (val) {
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
                if (val.parentElement.tagName == "P")
                    return content[iter] == val.parentElement.parentElement;
                return content[iter] == val.parentElement;
            }).length) index = iter;
        }
        while ((index == -1) && nested_mark) {
            nested_mark = nested_mark.parentElement;
            index = content.indexOf(nested_mark);
        }
        if (index == -1) return;
        var navigation = Array.prototype.slice.call(tabs.querySelectorAll(
            ".tabbernav > li > a")).filter(function (val) {
            return tabs == val.parentElement.parentElement.parentElement;
        });
        if (content.length != navigation.length) return;
        content.forEach(function (val, idx) {
            if (index == idx) {
                val.style.display = "";
                navigation[index].parentElement.classList.add("tabberactive");
            } else {
                val.style.display = "none";
                navigation[idx].parentElement.classList.remove("tabberactive");
            }
        });
    }
    
})();