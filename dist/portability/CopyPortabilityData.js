/**
* @module CopyPortabilityData
* @author DuckeyD
* @version 2.0.0
* @description Adds a button to Special:PortablityDashboard that is used to copy portablity data of a wiki with a single click.
* Please note that this script uses DOM API instead of jQuery so you should omit using jQuery functions when modifying this script for your own use.
* Written using JavaScript Standard Style, that's why you don't see any semicolons.
*/

(function (f, opts) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    f(opts)
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      f(opts)
    })
  }
})(function (opts) {
  // On document ready
  var table = document.querySelector('.portability-dashboard-table')
  // If visiting Special:PortabilityDashboard
  if (table) {
    var rows = document.querySelectorAll('.portability-dashboard-table tbody tr') // All table body rows

    var button = document.createElement('button') // Create the button
    button.textContent = opts.buttonText
    // Reset default button styling and add float
    Object.assign(button.style, {
      float: opts.buttonFloat,
      background: 'transparent',
      border: '0',
      padding: '0',
      cursor: 'pointer',
      fontSize: '0.75em'
    })

    rows.forEach(function (row, index) {
      // Append a copy of the button (and its child - the text node) to each row
      var clone = button.cloneNode(true)
      clone.title = '#' + (index + 1) // Current row number
      row.children[opts.buttonColumn].appendChild(clone)
    })

    // Button click event using event delegation
    table.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'BUTTON') { // There are no other buttons inside of the table
        var tds = e.target.parentNode.parentNode.querySelectorAll('td') // All tds in the row
        var community = tds[0].textContent.trim() // Wiki name
        var CP = opts.percentSpace ? tds[2].textContent : tds[2].textContent.replace(' ', '') // Content Portability
        var IP = opts.percentSpace ? tds[3].textContent : tds[3].textContent.replace(' ', '') // Infobox Portability
        var PV = tds[4].textContent // Page Views
        var UT = tds[5].textContent.trim() // Unclassified Templates
        var nPI = tds[6].textContent.trim() // Non-Portable Infoboxes
        var MI = tds[7].textContent // Migration Impact
        var content = 'CP: ' + CP + '\nIP: ' + IP + '\nPV: ' + PV + '\nUT: ' + UT + '\nnPI: ' + nPI + '\nMI: ' + MI

        // Copying to clipboard using a temporary textarea element
        var temp = document.createElement('textarea')
        document.body.appendChild(temp)
        temp.value = content
        temp.select()
        document.execCommand('copy', false)
        temp.remove()
        // Display a BannerNotification on copy
        new window.BannerNotification(opts.bannerText.replace('$WIKI', community), undefined, undefined, opts.bannerTimeout).show()
      }
    })
  }
},
{ // Configuration
  buttonText: '📋',
  buttonFloat: 'right',
  buttonColumn: 1,
  percentSpace: false,
  bannerText: 'Copied portability data for $WIKI.',
  bannerTimeout: 1000
})

/*
Changelog:
- 1.0.0:
  - Initial version
- 2.0.0:
  - Replace the ">" link with a copy button
  - Use event delegation (one click handler is better than 500 click handlers)
  - Add basic configuration (button's position, content and BannerNotification config)
  - Execute the script even if it is imported after page load
  - Button displays current row number on hover
  - Minor optimizations, some comments added
*/