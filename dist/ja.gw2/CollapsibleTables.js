/**** CollapsibleTables.js
 * (c) 2007–2014 by Patrick Westerhoff [poke]
 *
 * This class allows to make tables collapsible and adds a show/hide button to
 * affected tables. Tables which class attribute contains 'collapsible' or
 * 'expandable' are affected by this class and can be collapsed; the latter
 * automatically hides the content of all sections.
 * Header rows are used to divide the table into sections which can be collapsed
 * separately. By default the first row of the table is interpreted as a header
 * row, however this can be overwritten by adding 'collapsible' to the class
 * attribute of header rows. You can also hide a section individually by default
 * when in 'collapsible' mode by using 'expandable' as the row's class name
 * instead.
 */

(function (document, $) {
  if (!mw.config.get('wgIsArticle') && window.location.href.indexOf('action=submit') < 0 && mw.config.get('wgNamespaceNumber') == -1)
    return;

  var classCollapsible = 'collapsible';
  var classExpandable = 'expandable';
  var linkTextShow = '[show]';
  var linkTextHide = '[hide]';

  var reClassName = new RegExp('(?:\\s|^)(' + classCollapsible + '|' + classExpandable + ')(?:\\s|$)');
  var sections = [];

  // link element
  var linkElement = document.createElement('a');
  linkElement.className = 'collapsible-toggle';
  linkElement.href = 'javascript:void(0);';

  /** private void initHeaderRow ( headerRow, sectionId, sectionStatus ) :: adds show/hide button **/
  function initHeaderRow (headerRow, sectionId, sectionStatus) {
    headerRow.id = 'collapsible-section_' + sectionId;
    var lastCell = headerRow.cells[headerRow.cells.length - 1];
    var link = linkElement.cloneNode(false);
    link.appendChild(document.createTextNode(sectionStatus ? linkTextHide : linkTextShow));
    $(link).click(toggleSection);

    lastCell.insertBefore(link, lastCell.firstChild);
  }

  /** private void toggleSection () :: onclick event handler **/
  function toggleSection () {
    var trHead = this.parentNode.parentNode;
    var section = sections[trHead.id.substr(20)];
    var content = section.content;

    // Update the stored visibility state
    section.status = !section.status;

    // If true, remove the hide class. If false, add the hide class.
    if ( section.status ) {
      for (var i = 0, n = content.length; i < n; i++) {
        content[i].className = content[i].className.replace(' hide ','');
      }
    } else {
      for (var i = 0, n = content.length; i < n; i++) {
        content[i].className += ' hide ';
      }
    }
    this.firstChild.data = section.status ? linkTextHide : linkTextShow;
  }

  // initialize
  var docContent = document.getElementById('bodyContent') || document.getElementById('article') || document.getElementById('mw_contentholder');
  var tables = docContent.getElementsByTagName('table');
  var sectionId = -1;

  for (var i = 0, n = tables.length; i < n; i++) {
    var classMatch = tables[i].className.match(reClassName);

    // Skip the table if it doesn't use the right class, or there are no rows
    if (!classMatch || tables[i].rows.length == 0) {
      continue;
    }

    var defaultStatus = classMatch[1] == classCollapsible;
    var tableRows = tables[i].rows;
    var sectionFound = false;

    for (var j = 0, m = tableRows.length; j < m; j++) {
      var classMatch = tableRows[j].className.match(reClassName);
      if (classMatch) {
        // Found a new collapsible section
        var section = {
          header: tableRows[j],
          content: [],
          status: defaultStatus ? classMatch[1] == classCollapsible : false
        };

        sectionFound = true;
        sections[++sectionId] = section;
        initHeaderRow(tableRows[j], sectionId, section.status);
      } else {
        // Add to an existing collapsible section
        if (sectionFound) {
          sections[sectionId].content.push(tableRows[j]);
          if (!sections[sectionId].status) {
            tableRows[j].className += ' hide ';
          }
        }
      }
    }

    // No collapsible sections found, collapse the entire table
    if (!sectionFound) {
      var section = {
        header: tableRows[0],
        content: [],
        status: defaultStatus
      };

      for (var j = 1; j < tableRows.length; j++) {
        section.content.push(tableRows[j]);
        if (!section.status) {
          tableRows[j].className += ' hide ';
        }
      }

      sections[++sectionId] = section;
      initHeaderRow(tableRows[0], sectionId, defaultStatus);
    }
  }
})(document, $);