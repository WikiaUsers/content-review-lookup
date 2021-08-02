/*
 * Potential ideas for the future:
 * - add option to automatically create nested tabbers from heading structure
 */
(function() {
  "use strict";

  console.log("Executing StructuredTabber v0.1.0");

  const tabberNames = {
    wdsIsCurrent: "wds-is-current",
    wdsTabber: "wds-tabber",
    wdsTabsTab: "wds-tabs__tab",
    wdsTabsTabLabel: "wds-tabs__tab-label",
    wdsTabsWrapper: "wds-tabs__wrapper",
    wdsTabContent: "wds-tab__content",
  };

  /* 
   * Oasis is going away in the forseeable future and probably barely anyone is using it.
   * So we just don't care. If someone wants to add support though, such a change would be welcome.
   */
  if (mw.config.get("skin") === "fandomdesktop") {

    window.addEventListener("hashchange", function() {
      adjustTabSelectionToAnchor(document);
    }, false);

    mw.hook("wikipage.content").add(function($content) {
      const divs = $content[0].getElementsByTagName("div");
      /* Iterate tabbers bottom to top to ensure the elemenst we operate on are always visible */
      for (var i = divs.length - 1; i >= 0; --i) {
        const div = divs[i];
        if (div.classList.contains("structured-tabber")) {
          convertToTabber(div);
        }
      }
    });
  }

  function convertToTabber(container) {
    var i, j;
    const initialUntouchedChildren = Array();
    const tabs = [];
    const tabHeaders = [];
    var currentTab;
    var tabCount = 0;
    var defaultTabFound = false;
    var defaultTabIndex = 0;
    var selectedNodeName;

    function isHeading(nodeName) {
      return nodeName === "H1" || nodeName === "H2" || nodeName === "H3" ||
        nodeName === "H4" || nodeName === "H5" || nodeName === "H6";
    }

    /* Gather necessary data without DOM modifications */
    const childNodes = container.childNodes;
    const childNodesCount = childNodes.length;
    for (i = 0; i < childNodesCount; ++i) {
      var node = childNodes[i];
      const currentNodeName = node.nodeName;
      if (isHeading(currentNodeName) &&
        (selectedNodeName === undefined || currentNodeName === selectedNodeName)) {
        selectedNodeName = currentNodeName;
        tabHeaders.push({
          text: node.innerText,
          id: findId(node),
        });
        currentTab = [];
        tabs.push(currentTab);
        if (!defaultTabFound && isDefaultTab(node)) {
          defaultTabIndex = tabCount;
          defaultTabFound = true;
        }
        ++tabCount;
      } else {
        if (currentTab === undefined) {
          initialUntouchedChildren.push(node);
        } else {
          currentTab.push(node);
        }
      }
    }

    const sourceFragment = document.createDocumentFragment();
    const targetFragment = document.createDocumentFragment();

    /*
     * Only remove the elements from the DOM after gathering the headings.
     * Otherwise innerText gives wrong result because it includes things made invisble with CSS.
     */
    for (i = 0; i < childNodesCount; ++i) {
      sourceFragment.append(childNodes[i]);
    }

    const initialChildrenCount = initialUntouchedChildren.length;
    for (i = 0; i < initialChildrenCount; ++i) {
      var untouched = initialUntouchedChildren[i];
      targetFragment.appendChild(untouched);
    }

    const tabberDiv = document.createElement("div");
    const tabsWrapperDiv = document.createElement("div");
    const ul = document.createElement("ul");

    tabberDiv.className = "tabber " + tabberNames.wdsTabber;
    tabsWrapperDiv.className = "wds-tabs__wrapper with-bottom-border";
    ul.className = "wds-tabs";

    tabberDiv.appendChild(tabsWrapperDiv);
    tabsWrapperDiv.appendChild(ul);

    /* Create tab headers */
    for (i = 0; i < tabCount; ++i) {
      const headerData = tabHeaders[i];
      const li = document.createElement("li");
      const div = document.createElement("div");
      const a = document.createElement("a");
      li.className = tabberNames.wdsTabsTab;
      if (i == defaultTabIndex) {
        li.classList.add(tabberNames.wdsIsCurrent);
      }
      li.setAttribute("data-hash", headerData.id);
      div.className = tabberNames.wdsTabsTabLabel;
      a.className = "text";
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer noopener");
      a.setAttribute("href", "#");
      a.id = headerData.id;
      a.innerText = headerData.text;

      li.appendChild(div);
      div.appendChild(a);
      ul.appendChild(li);
    }

    /* Create tab content */
    for (i = 0; i < tabCount; ++i) {
      const tabElements = tabs[i];
      const tabContentDiv = document.createElement("div");
      tabContentDiv.className = tabberNames.wdsTabContent;
      if (i == defaultTabIndex) {
        tabContentDiv.classList.add(tabberNames.wdsIsCurrent);
      }
      const tabElementCount = tabElements.length;
      for (j = 0; j < tabElementCount; ++j) {
        tabContentDiv.appendChild(tabElements[j]);
      }
      tabberDiv.appendChild(tabContentDiv);
    }

    targetFragment.appendChild(tabberDiv);
    adjustTabSelectionToAnchor(targetFragment);

    container.replaceChildren(targetFragment);
  }

  function findId(element) {
    if (element.id) {
      return element.id;
    }
    const children = element.children;
    const childCount = children.length;
    for (var i = 0; i < childCount; ++i) {
      const result = findId(children[i]);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }

  function isDefaultTab(element) {
    const defaultTabClassName = "structured-tabber-default";
    return element.classList.contains(defaultTabClassName) ||
      element.getElementsByClassName(defaultTabClassName).length !== 0;
  }

  function adjustTabSelectionToAnchor(root) {
    var i;
    const anchor = location.hash.substring(1);
    const element = root.getElementById(anchor);
    const focussedTabHeader = element && element.parentElement &&
      element.parentElement.parentElement;
    var tabberOfElement;
    if (focussedTabHeader &&
      focussedTabHeader.classList.contains(tabberNames.wdsTabsTab) &&
      !focussedTabHeader.classList.contains(tabberNames.wdsIsCurrent)) {
      /*
       * Adjust the tabber that directly belongs to the anchor.
       */
      var newTabIndex = 0;
      const headerList = focussedTabHeader.parentElement;
      if (!headerList) {
        return;
      }
      const allTabHeaders = headerList.children;
      const headerCount = allTabHeaders.length;
      for (i = 0; i < headerCount; ++i) {
        const header = allTabHeaders[i];
        if (header === focussedTabHeader) {
          newTabIndex = i;
          break;
        }
      }
      tabberOfElement = headerList && headerList.parentElement &&
        headerList.parentElement.parentElement;
      if (!tabberOfElement) {
        return;
      }
      setTabberToIndex(tabberOfElement, newTabIndex);
    }

    /*
     * Find all the parent tabbers and adjust them as well
     * if they don't show the correct tab already.
     */
    var parent = tabberOfElement ? tabberOfElement.parentElement : element;
    var tabIndexOfParent = 0;
    while (parent) {
      if (parent.classList.contains(tabberNames.wdsTabContent)) {
        const parentTabContent = parent;
        const parentTabber = parentTabContent.parentElement;
        if (parentTabber) {
          var currentTabIndex = 0;
          const children = parentTabber.children;
          const childCount = children.length;
          for (i = 0; i < childCount; ++i) {
            const element = children[i];
            if (element.classList.contains(tabberNames.wdsTabContent)) {
              if (element === parentTabContent) {
                tabIndexOfParent = currentTabIndex;
                break;
              }
              ++currentTabIndex;
            }
          }
        }
      }
      if (parent.classList.contains(tabberNames.wdsTabber)) {
        setTabberToIndex(parent, tabIndexOfParent);
        tabIndexOfParent = 0;
      }
      parent = parent.parentElement;
    }

  }

  function setTabberToIndex(tabber, indexToSelect) {
    var i, j;
    const elements = tabber.children;
    var tabIndex = 0;
    const elementCount = elements.length;
    for (i = 0; i < elementCount; ++i) {
      const element = elements[i];
      if (element.classList.contains(tabberNames.wdsTabsWrapper)) {
        const tabHeaders = element.getElementsByClassName(tabberNames.wdsTabsTab);
        const headerCount = tabHeaders.length;
        for (j = 0; j < headerCount; ++j) {
          const header = tabHeaders[j];
          if (header.classList.contains(tabberNames.wdsIsCurrent)) {
            header.classList.remove(tabberNames.wdsIsCurrent);
          }
          if (j == indexToSelect) {
            header.classList.add(tabberNames.wdsIsCurrent);
          }
        }
      } else if (element.classList.contains(tabberNames.wdsTabContent)) {
        if (element.classList.contains(tabberNames.wdsIsCurrent)) {
          element.classList.remove(tabberNames.wdsIsCurrent);
        }
        if (tabIndex == indexToSelect) {
          element.classList.add(tabberNames.wdsIsCurrent);
        }
        ++tabIndex;
      }
    }
  }
})();