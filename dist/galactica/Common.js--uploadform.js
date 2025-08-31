/**
 * Uploadform.js
 *
 * Modifies the Special:Upload page by adding a custom
 * module which enforces categorization of any new files
 *
 * @author slyst at inazuma-eleven.fandom.com/
 * @modified NepsterCZ at galactica.fandom.com/
 */

;(function(document, mw) {
    var upload = {
        elem: 0,
        categories: {
            '1978': {
                'S01E01': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E01 - Battlestar Galactica 1978'],
                'S01E02': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E02 - Battlestar Galactica 1978'],
                'S01E03': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E03 - Battlestar Galactica 1978'],
                'S01E04': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E04 - Battlestar Galactica 1978'],
                'S01E05': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E05 - Battlestar Galactica 1978'],
                'S01E06': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E06 - Battlestar Galactica 1978'],
                'S01E07': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E07 - Battlestar Galactica 1978'],
                'S01E08': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E08 - Battlestar Galactica 1978'],
                'S01E09': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E09 - Battlestar Galactica 1978'],
                'S01E10': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E10 - Battlestar Galactica 1978'],
                'S01E11': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E11 - Battlestar Galactica 1978'],
                'S01E12': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E12 - Battlestar Galactica 1978'],
                'S01E13': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E13 - Battlestar Galactica 1978'],
                'S01E14': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E14 - Battlestar Galactica 1978'],
                'S01E15': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E15 - Battlestar Galactica 1978'],
                'S01E16': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E16 - Battlestar Galactica 1978'],
                'S01E17': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E17 - Battlestar Galactica 1978'],
                'S01E18': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E18 - Battlestar Galactica 1978'],
                'S01E19': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E19 - Battlestar Galactica 1978'],
                'S01E20': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E20 - Battlestar Galactica 1978'],
                'S01E21': ['Images - Battlestar Galactica 1978', 'Season 1 - Battlestar Galactica 1978', 'S01E21 - Battlestar Galactica 1978'],
            },
            '1980': {
                'S01E01': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E01 - Battlestar Galactica 1980'],
                'S01E02': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E02 - Battlestar Galactica 1980'],
                'S01E03': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E03 - Battlestar Galactica 1980'],
                'S01E04': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E04 - Battlestar Galactica 1980'],
                'S01E05': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E05 - Battlestar Galactica 1980'],
                'S01E06': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E06 - Battlestar Galactica 1980'],
                'S01E07': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E07 - Battlestar Galactica 1980'],
                'S01E08': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E08 - Battlestar Galactica 1980'],
                'S01E09': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E09 - Battlestar Galactica 1980'],
                'S01E10': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E10 - Battlestar Galactica 1980'],
                'S01E11': ['Images - Battlestar Galactica 1980', 'Season 1 - Battlestar Galactica 1980', 'S01E11 - Battlestar Galactica 1980'],
            },
            '2004': {
              

'S01E01': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E01 - Battlestar Galactica 2004'],
'S01E02': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E02 - Battlestar Galactica 2004'],
'S01E03': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E03 - Battlestar Galactica 2004'],
'S01E04': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E04 - Battlestar Galactica 2004'],
'S01E05': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E05 - Battlestar Galactica 2004'],
'S01E06': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E06 - Battlestar Galactica 2004'],
'S01E07': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E07 - Battlestar Galactica 2004'],
'S01E08': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E08 - Battlestar Galactica 2004'],
'S01E09': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E09 - Battlestar Galactica 2004'],
'S01E10': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E10 - Battlestar Galactica 2004'],
'S01E11': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E11 - Battlestar Galactica 2004'],
'S01E12': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E12 - Battlestar Galactica 2004'],
'S01E13': ['Images - Battlestar Galactica 2004', 'Season 1 - Battlestar Galactica 2004', 'S01E13 - Battlestar Galactica 2004'],

'S02E01': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E01 - Battlestar Galactica 2004'],
'S02E02': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E02 - Battlestar Galactica 2004'],
'S02E03': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E03 - Battlestar Galactica 2004'],
'S02E04': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E04 - Battlestar Galactica 2004'],
'S02E05': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E05 - Battlestar Galactica 2004'],
'S02E06': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E06 - Battlestar Galactica 2004'],
'S02E07': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E07 - Battlestar Galactica 2004'],
'S02E08': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E08 - Battlestar Galactica 2004'],
'S02E09': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E09 - Battlestar Galactica 2004'],
'S02E10': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E10 - Battlestar Galactica 2004'],
'S02E11': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E11 - Battlestar Galactica 2004'],
'S02E12': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E12 - Battlestar Galactica 2004'],
'S02E13': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E13 - Battlestar Galactica 2004'],
'S02E14': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E14 - Battlestar Galactica 2004'],
'S02E15': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E15 - Battlestar Galactica 2004'],
'S02E16': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E16 - Battlestar Galactica 2004'],
'S02E17': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E17 - Battlestar Galactica 2004'],
'S02E18': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E18 - Battlestar Galactica 2004'],
'S02E19': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E19 - Battlestar Galactica 2004'],
'S02E20': ['Images - Battlestar Galactica 2004', 'Season 2 - Battlestar Galactica 2004', 'S02E20 - Battlestar Galactica 2004'],

'S03E01': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E01 - Battlestar Galactica 2004'],
'S03E02': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E02 - Battlestar Galactica 2004'],
'S03E03': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E03 - Battlestar Galactica 2004'],
'S03E04': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E04 - Battlestar Galactica 2004'],
'S03E05': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E05 - Battlestar Galactica 2004'],
'S03E06': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E06 - Battlestar Galactica 2004'],
'S03E07': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E07 - Battlestar Galactica 2004'],
'S03E08': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E08 - Battlestar Galactica 2004'],
'S03E09': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E09 - Battlestar Galactica 2004'],
'S03E10': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E10 - Battlestar Galactica 2004'],
'S03E11': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E11 - Battlestar Galactica 2004'],
'S03E12': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E12 - Battlestar Galactica 2004'],
'S03E13': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E13 - Battlestar Galactica 2004'],
'S03E14': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E14 - Battlestar Galactica 2004'],
'S03E15': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E15 - Battlestar Galactica 2004'],
'S03E16': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E16 - Battlestar Galactica 2004'],
'S03E17': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E17 - Battlestar Galactica 2004'],
'S03E18': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E18 - Battlestar Galactica 2004'],
'S03E19': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E19 - Battlestar Galactica 2004'],
'S03E20': ['Images - Battlestar Galactica 2004', 'Season 3 - Battlestar Galactica 2004', 'S03E20 - Battlestar Galactica 2004'],

'S04E01': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E01 - Battlestar Galactica 2004'],
'S04E02': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E02 - Battlestar Galactica 2004'],
'S04E03': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E03 - Battlestar Galactica 2004'],
'S04E04': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E04 - Battlestar Galactica 2004'],
'S04E05': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E05 - Battlestar Galactica 2004'],
'S04E06': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E06 - Battlestar Galactica 2004'],
'S04E07': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E07 - Battlestar Galactica 2004'],
'S04E08': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E08 - Battlestar Galactica 2004'],
'S04E09': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E09 - Battlestar Galactica 2004'],
'S04E10': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E10 - Battlestar Galactica 2004'],
'S04E11': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E11 - Battlestar Galactica 2004'],
'S04E12': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E12 - Battlestar Galactica 2004'],
'S04E13': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E13 - Battlestar Galactica 2004'],
'S04E14': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E14 - Battlestar Galactica 2004'],
'S04E15': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E15 - Battlestar Galactica 2004'],
'S04E16': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E16 - Battlestar Galactica 2004'],
'S04E17': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E17 - Battlestar Galactica 2004'],
'S04E18': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E18 - Battlestar Galactica 2004'],
'S04E19': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E19 - Battlestar Galactica 2004'],
'S04E20': ['Images - Battlestar Galactica 2004', 'Season 4 - Battlestar Galactica 2004', 'S04E20&21 - Battlestar Galactica 2004'],

            },
  'Movies': {
  'Miniseries, Night I': ['Images - Battlestar Galactica 2004', 'Miniseries - Battlestar Galactica 2004', 'S00E01 - Battlestar Galactica 2004'],
  'Miniseries, Night II': ['Images - Battlestar Galactica 2004', 'Miniseries - Battlestar Galactica 2004', 'S00E02 - Battlestar Galactica 2004'],
  'Razor': ['Images - Battlestar Galactica 2004', 'Movies - Battlestar Galactica 2004', 'S04E00 - Battlestar Galactica 2004'],
  'The Plan': ['Images - Battlestar Galactica 2004', 'Movies - Battlestar Galactica 2004', 'S05E01 - Battlestar Galactica 2004'],
  'Blood & Chrome': ['Images - Battlestar Galactica 2004', 'Movies - Battlestar Galactica 2004', 'Blood & Chrome - Battlestar Galactica 2004'],
            },
           'Caprica': {
    'S01E01': ['Images - Caprica', 'Season 1 - Caprica', 'S01E01 - Caprica'],
    'S01E02': ['Images - Caprica', 'Season 1 - Caprica', 'S01E02 - Caprica'],
    'S01E03': ['Images - Caprica', 'Season 1 - Caprica', 'S01E03 - Caprica'],
    'S01E04': ['Images - Caprica', 'Season 1 - Caprica', 'S01E04 - Caprica'],
    'S01E05': ['Images - Caprica', 'Season 1 - Caprica', 'S01E05 - Caprica'],
    'S01E06': ['Images - Caprica', 'Season 1 - Caprica', 'S01E06 - Caprica'],
    'S01E07': ['Images - Caprica', 'Season 1 - Caprica', 'S01E07 - Caprica'],
    'S01E08': ['Images - Caprica', 'Season 1 - Caprica', 'S01E08 - Caprica'],
    'S01E09': ['Images - Caprica', 'Season 1 - Caprica', 'S01E09 - Caprica'],
    'S01E10': ['Images - Caprica', 'Season 1 - Caprica', 'S01E10 - Caprica'],
    'S01E11': ['Images - Caprica', 'Season 1 - Caprica', 'S01E11 - Caprica'],
    'S01E12': ['Images - Caprica', 'Season 1 - Caprica', 'S01E12 - Caprica'],
    'S01E13': ['Images - Caprica', 'Season 1 - Caprica', 'S01E13 - Caprica'],
    'S01E14': ['Images - Caprica', 'Season 1 - Caprica', 'S01E14 - Caprica'],
    'S01E15': ['Images - Caprica', 'Season 1 - Caprica', 'S01E15 - Caprica'],
    'S01E16': ['Images - Caprica', 'Season 1 - Caprica', 'S01E16 - Caprica'],
    'S01E17': ['Images - Caprica', 'Season 1 - Caprica', 'S01E17 - Caprica'],
    'S01E18': ['Images - Caprica', 'Season 1 - Caprica', 'S01E18 - Caprica'],

},
 'Other': {
    "Other": ["Images - Other"],
    "I don't know": ["Images - I don't know"],
    "FanArt": ["Images - FanArt"],
    "Unofficial Render": ["Images - Unofficial Render"],
},
   
        },
        addCSS: function() {
            mw.util.addCSS(
                '.category-outer-container, #category-list {' +
                    'max-width: 1100px;' +
                '}' +
                '.category-outer-container li {' +
                    'cursor: pointer;' +
                '}' +
                '#main-categories {' +
                    'display: inline-block;' +
                    'margin: 0;' +
                '}' +
                '#main-categories .main-category, #sub-categories .sub-category {' +
                    'background-color: #454b51 ;' +
                    'border-radius: 0px;' +
                    'display: inline-block;' +
                    'margin: 2px 2px 0 2px;' +
                    'padding: 2px 7px;' +
                '}' +
               '#main-categories .main-category {' +
    'margin: 0 2px;' +
    'background-color: #454b51 ;' +
    'color: #fff;' +
'}' +
'#main-categories .main-category.selected {' +
    'border-color: #aaa;' +
    'font-weight: bold;' +
    'background-color: #737d88 ;' +
    'color: #fff;' +
'}' +
'#main-categories .main-category.passive {' +
    'opacity: 1.0;' +
    'background-color: #454b51 ;' +
    'color: #fff;' +
'}' +

                '.addcat-outer {' +
                    'background-color: #454b51 !important;' +
                    'border-color: transparent !important;' +
                '}' +
                '.subcat-outer {' +
                    'background-color: #737d88 !important;' +
                    'border-color: transparent !important;' +
                '}' +
                '.addcat, .subcat {' +
                    'font-weight: bold;' +
                    'margin: 0 2px;' +
                '}' +
                '#sub-categories {' +
                    'margin: 0;' +
                '}' +
                '#sub-categories .sub-category {' +
                    'transition: .1s all linear;' +
                '}' +
                '#remove-all {' +
                    'cursor: pointer;' +
                    'font-size: 15px;' +
                    'margin: 0 5px;' +
                '}' +
                '.upload-warning {' +
                    'background-color: #541b22;' +
                    'padding: 3px 5px;' +
                '}' +
                'label.help {' +
                    'border-bottom: 1px dotted #aaa;' +
                    'cursor: help;' +
                '}'
            );
        },
        current: [],
        build: function() {
            var ul = document.createElement('ul'),
                sub = document.createElement('ul'),
                div = document.createElement('div'),
                input = document.createElement('td'),
                label = document.createElement('td'),
                tr = document.createElement('tr');
            ul.id = 'main-categories';
            sub.id = 'sub-categories';
            input.classList.add('mw-input');
            input.classList.add('category-outer-container');
            label.classList.add('mw-label');
            var name = mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' ? '<label class="help" title="Selected categories will be added to all files being uploaded.">Categories</label>' : '<label>Categories:</label>';
            label.innerHTML = name + '<br><span id="remove-all" title="Remove all categories">[Clear]</span>';
            for (var i in upload.categories) {
                var li = document.createElement('li'),
                    ar = document.createElement('div');
                li.classList.add('main-category');
                ar.classList.add('expand');
                li.appendChild(ar);
                li.innerHTML += i;
                ul.appendChild(li);
            }
            input.appendChild(div.appendChild(ul));
            input.appendChild(sub);
            tr.appendChild(label).appendChild(input);
            var desc = document.getElementById('wpUploadDescription');
            desc.setAttribute('rows', 3);
            desc.style.resize = 'none';
            var llabel = document.createElement('td'),
                list = document.createElement('td'),
                ltr = document.createElement('tr');
            llabel.classList.add('mw-label');
            llabel.innerHTML = '<label>Categories added:</label>';
            list.id = 'category-list';
            list.classList.add('mw-input');
            ltr.appendChild(llabel).appendChild(list);
            desc.parentNode.parentNode.insertAdjacentHTML('afterend', tr.innerHTML + ltr.outerHTML);
            upload.update();
            upload.subcat();
            document.getElementsByClassName('main-category')[upload.elem].click();
        },
        subcat: function() {
            [].forEach.call(document.getElementsByClassName('expand'), function(elem) {
                elem.parentNode.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.target.classList.remove('passive');
                    e.target.classList.add('selected');
                    Array.prototype.filter.call(e.target.parentNode.children, function(child) {
                        if (child !== e.target) {
                            child.classList.remove('selected');
                            child.classList.add('passive');
                        }
                    });
                    upload.elem = [].indexOf.call(elem.parentNode.parentNode.children, elem.parentNode);
                    var container = document.getElementById('sub-categories'),
                        ul = document.createElement('ul'),
                        main = e.target.innerText;
                    var keys = Object.keys(upload.categories[main]).sort();
var seasonTracker = null;

keys.forEach(function(i) {
    var seasonMatch = i.match(/S(\d{2})E\d{2}/);
    if (seasonMatch) {
        var season = seasonMatch[1];
        if (season !== seasonTracker) {
            seasonTracker = season;

            var header = document.createElement('li');
            header.textContent = 'Season ' + parseInt(season, 10) + '';
            header.style.fontWeight = 'bold';
            header.style.color = '#ccc';
            header.style.margin = '6px 0 2px 0';
            header.style.pointerEvents = 'none';
            header.style.listStyle = 'none';
            ul.appendChild(header);
        }
    }

    var li = document.createElement('li');
    li.classList.add('sub-category');
    li.setAttribute('category', i);

    var span = document.createElement('span');
    var catVal = upload.categories[main][i];
    var cats = Array.isArray(catVal) ? catVal : [i];

    var selected = cats.some(function(cat) {
        return upload.current.indexOf(cat) > -1;
    });

    if (selected) {
        span.classList.add('subcat');
        span.innerHTML = '-';
        li.classList.add('subcat-outer');
    } else {
        span.classList.add('addcat');
        span.innerHTML = '+';
        li.classList.add('addcat-outer');
    }

    li.appendChild(span);
    span.insertAdjacentHTML('afterend', ' ');
    var label = Array.isArray(catVal) ? i : catVal;
    li.innerHTML += label;
    ul.appendChild(li);
});

                    container.innerHTML = ul.innerHTML;
                });
            });
            document.addEventListener('click', function(e) {
                var target = e.target;
               if (/addcat(-outer|)/.test(target.className)) {
    e.preventDefault();
    target = target.className == 'addcat' ? target.parentNode : e.target;

    // Clear previous selection:
    upload.current.length = 0;

    // Reset all previously selected category elements to unselected
    var selectedElems = document.querySelectorAll('.subcat-outer');
    selectedElems.forEach(function(elem) {
        elem.classList.remove('subcat-outer');
        elem.classList.add('addcat-outer');
        elem.className = elem.className.replace('subcat', 'addcat');
        if (elem.children[0]) {
            elem.children[0].className = 'addcat';
            elem.children[0].innerText = '+';
        }
    });

    // Add new selection
    target.classList.remove('addcat-outer');
    target.classList.add('subcat-outer');
    target.className = target.className.replace(/addcat/, 'subcat');
    target.children[0].className = 'subcat';
    target.children[0].innerText = '-';

    var mainCat = document.querySelector('#main-categories .selected').innerText;
var catKey = target.getAttribute('category');
var catVal = upload.categories[mainCat][catKey];
var catsToModify = Array.isArray(catVal) ? catVal : [catKey];

// Add categories
catsToModify.forEach(function(cat) {
    if (upload.current.indexOf(cat) === -1) {
        upload.current.push(cat);
    }
});

    upload.update();

} else if (/subcat(-outer|)/.test(target.className)) {
    e.preventDefault();
    // For single select, you might want to disable unselecting by clicking again,
    // or keep the original logic if unselecting is allowed.
    // Here, keep original logic to allow unselecting:
    target = target.className == 'subcat' ? target.parentNode : e.target;
    target.className = target.className.replace(/subcat/, 'addcat');
    target.children[0].className = 'addcat';
    target.children[0].innerText = '+';
   upload.current = upload.current.filter(function(elem) {
    return catsToModify.indexOf(elem) === -1;
});
    upload.update();
} else if (target.id == 'remove-all') {
                    upload.current.length = 0;
                    document.getElementsByClassName('main-category')[upload.elem].click();
                    upload.update('All categories have been removed.');
                } else {
                    return;
                }
            });
        },
        update: function(m) {
            var target = document.getElementById('category-list');
            if (!upload.current.length) {
                target.innerHTML = m || 'None.';
            } else {
                var str = '';
                for (var i = 0; i < upload.current.length; i++) {
                    var a = document.createElement('a');
                    a.href = '/wiki/Category:' + mw.util.wikiUrlencode(upload.current[i]);
                    a.target = '_blank';
                    a.innerText = upload.current[i];
                    str += a.outerHTML + (i !== upload.current.length - 1 ? ', ' : '');
                }
                target.innerHTML = str;
            }
        },
        submit: function(e) {
            if (!upload.current.length) {
                e.preventDefault();
                var list = document.getElementById('category-list'),
                    br = document.createElement('br'),
                    span = document.createElement('span');
                span.classList.add('upload-warning');
                span.innerHTML = 'Please categorize the file.';
                list.appendChild(br);
                list.appendChild(span);
                return false;
            }
            var cats = '';
            for (var i = 0; i < upload.current.length; i++) {
                cats += '[[Category:' + upload.current[i] + ']]\n';
            }
            var desc = document.getElementById('wpUploadDescription');
            desc.value = desc.value ? desc.value + '\n\n' + cats : cats;
        },
        init: function() {
            upload.addCSS();
            upload.build();
            var form = document.getElementById('mw-upload-form');
            form.addEventListener('submit', upload.submit, false);
            form.submit = upload.submit;
        }
    };
    if (!mw.util.getParamValue('wpForReUpload')) {
        upload.init();
    }
}) (window.document, window.mediaWiki);