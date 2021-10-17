/*
This is the code for the "Compage Page List" gadget (MediaWiki:Gadget-comparePageList).

The gadget compares a set of pages from this wiki ("local") to a set of pages on
another wiki ("foreign"). It displays all edits of the foreign pages that have been
made after the last edit to the respective local pages.
The set of pages can be selected via a category or a namespace, or only a single
page can be selected. The connection to the foreign wiki can be via interwiki links
or direct page title matching. All of this is entered using a form displayed by
the gadget.

The gadget expects a <div> element with an "id" attribute of "cpl-app", which it
will use to fill with its content. If not present, it appends this element itself
at the bottom of the page.

The gadget was designed for the Terraria Wiki, but it can be used on other wikis
as well. Some tweaking might be necessary; see the very bottom of the code.
*/


/*

==============================
Internationalization data
==============================

*/

const l10nTable = {
  en: {
    // Strings in the input area
    'cpl-input-pagelist-heading': 'Pages to compare',
    'cpl-input-pagelist-cateplaceholder': 'Enter the category name',
    'cpl-input-pagelist-catelabel': 'Category:',
    'cpl-input-pagelist-nslabel': 'Namespace:',
    'cpl-input-pagelist-singleplaceholder': 'Enter the page name',
    'cpl-input-pagelist-singlelabel': 'Page:',
    'cpl-input-pagelist-radiocate': 'All pages in a category',
    'cpl-input-pagelist-radions': 'All pages in a namespace',
    'cpl-input-pagelist-radiosingle': 'Single page',

    'cpl-input-foreign-heading': 'Foreign wiki to compare pages to',
    'cpl-input-foreign-iwlabel': 'Interwiki prefix',
    'cpl-input-foreign-radiolabel': 'Matching method:',
    'cpl-input-foreign-radioiw': 'Interwiki link',
    'cpl-input-foreign-radiotitle': 'Page title',
    'cpl-input-foreign-helpintro': 'Select how to determine the pairs of pages to compare between this wiki and the foreign wiki.',
    'cpl-input-foreign-helpiw': '<em>Interwiki link</em> means that the interwiki links from the pages on ' +
      'this wiki are the connection to the pages on the foreign wiki. ' +
      'For instance, if a page "Foo" on this wiki contained the interwiki link <code>en:Bar</code>, ' +
      'then it would be compared to the page "Bar" on the foreign wiki. ' +
      'This is mostly useful for articles in the mainspace. Note that pages without an interwiki link to ' +
      'the foreign wiki are disregarded when selecting this option.',
    'cpl-input-foreign-helptitle': '<em>Page title</em> means that the titles of the pages on this wiki are ' +
      'compared to their identically named counterparts on the foreign wiki. ' +
      'For instance, the page "Foo" on this wiki would be compared to the page "Foo" on the foreign wiki. ' +
      'This is useful when the set of pages does not contain interwiki links, e.g. most templates. ' +
      'Pages in namespaces that do not exist on the foreign wiki are ignored.',

    'cpl-input-submit-label': 'Compare pages',
    'cpl-input-submit-title': 'Compare the specified set of pages on this wiki with their equivalents on the foreign wiki',
    'cpl-input-submit-debug': 'Debug mode',

    'cpl-input-language': 'Language',

    'cpl-input-error-radiomissing': 'Field is required! Please select an option.',
    'cpl-input-error-textinputmissing': 'Field is required! Please enter a value.',
    'cpl-input-error-invalidcate': 'This category does not exist! Please enter the name of an existing category.',
    'cpl-input-error-invalidpage': 'This page does not exist! Please enter the title of an existing page.',

    'cpl-mainspace': '(Main)',

    // Strings in the logging area
    'cpl-log-proc-start': 'Started the process.',
    'cpl-log-proc-endsuccess': 'Terminated the process successfully.',
    'cpl-log-proc-enderror': 'Terminated the process due to an error.',
    'cpl-log-proc-enduser': 'Terminated the process because confirmation to continue was not given.',

    'cpl-log-foreignwiki': 'Located the foreign wiki (<code>$1</code>) at $2.',
    'cpl-log-fetchingpages': 'Fetching the pages... ',
    'cpl-log-fetchingpages-done': 'Done. ',
    'cpl-log-fetchingpage': 'Fetching information about the page... ',
    'cpl-log-fetchingpage-done': 'Done. ',
    'cpl-log-emptycate': 'There are no pages to compare in the category.',
    'cpl-log-emptyns': 'There are no pages to compare in the namespace.',
    'cpl-log-foundpagescate': 'Found $1 {{plural:$1|page|pages}} in the category.',
    'cpl-log-foundpagesns': 'Found $1 {{plural:$1|page|pages}} in the namespace.',
    'cpl-log-foundpage': 'Found the page.',
    'cpl-log-cutoff': ' (There are more pages, but $1 is the internal limit.)',
    'cpl-log-removeinvalidiw': 'Removing pages that do not have an interwiki link to the <code>$1</code> wiki... ',
    'cpl-log-removeinvalidtitle': 'Removing pages that do not have a counterpart on the <code>$1</code> wiki... ',
    'cpl-log-removeinvalidiw-done': 'Done. ',
    'cpl-log-removeinvalidtitle-done': 'Done. ',
    'cpl-log-remainingpages': 'There {{plural:$1|is $1 page|are $1 pages|0=are no pages}} remaining.',
    'cpl-log-fetchingrevs': 'Fetching revisions about {{plural:$1|it|them}}... ',
    'cpl-log-fetchingrevs-done': 'Done. ',
    'cpl-log-outdatedpages': 'There {{plural:$1|is $1 outdated page|are $1 outdated pages|0=are no outdated pages}}.',
    'cpl-log-displayingresult': 'Displaying {{plural:$1|it|them}} in a table... ',
    'cpl-log-displayingresult-done': 'Done.',

    // Strings in the error area
    'cpl-error-details': 'Error details: ',
    'cpl-error-fetchingpages': 'Error while fetching pages!',
    'cpl-error-foreignwiki': 'Couldn\'t locate the foreign wiki (<code>$1</code>)! Might need to fix the interwiki link at $2.',
    'cpl-error-canonicalns': 'Error while getting the canonical names of the local namespaces!',
    'cpl-error-foreignpages': 'Error while checking whether the pages of this wiki have a counterpart on the <code>$1</code> wiki!',
    'cpl-error-foreigndiff': 'Error while attempting to fetch the size of a diff on the <code>$1</code> wiki!',
    'cpl-error-collapse': 'Couldn\'t load the library that enables table collapsing!',
    'cpl-error-sorter': 'Couldn\'t load the library that enables table sorting!',
    'cpl-error-messages': 'Couldn\'t load strings for the recent changes-style output!',
    'cpl-error-makingoutput': 'Error while displaying the output!',

    // Strings in the output area
    'cpl-output-nothingtodisplay': 'All pages are up-to-date!',
    'cpl-output-nothingtodisplay-single': 'The page "$1" is up-to-date!',
    'cpl-output-tableheadlocal': 'Latest edit on this wiki',
    'cpl-output-tableheadforeign': 'Latest edits on <code>$1</code>',
    'cpl-output-timezone': 'Note: All timestamps are in UTC.',

    'cpl-output-warningdialog-title': 'Warning!',
    'cpl-output-warningdialog-text': 'The list of pages is very long, hence the process might take some time or fail entirely. ' +
      'Moreover, it might fill up your computer\'s memory (RAM) and consequently slow it down severely. Reloading the page ' +
      'afterwards should free up your RAM again. Do you wish to continue?'
  },

  de: {
    'cpl-input-pagelist-heading': 'Zu vergleichende Seiten',
    'cpl-input-pagelist-cateplaceholder': 'Kategorienamen eingeben',
    'cpl-input-pagelist-catelabel': 'Kategorie:',
    'cpl-input-pagelist-nslabel': 'Namensraum:',
    'cpl-input-pagelist-singleplaceholder': 'Seitennamen eingeben',
    'cpl-input-pagelist-singlelabel': 'Seite:',
    'cpl-input-pagelist-radiocate': 'Alle Seiten in einer Kategorie',
    'cpl-input-pagelist-radions': 'Alle Seiten in einem Namensraum',
    'cpl-input-pagelist-radiosingle': 'Einzelne Seite',

    'cpl-input-foreign-heading': 'Fremdes Wiki zum Vergleichen der Seiten',
    'cpl-input-foreign-iwlabel': 'Interwiki-Präfix',
    'cpl-input-foreign-radiolabel': 'Zuordnung:',
    'cpl-input-foreign-radioiw': 'Interwiki-Link',
    'cpl-input-foreign-radiotitle': 'Seitentitel',
    'cpl-input-foreign-helpintro': 'Wähle aus, auf welche Weise im fremden Wiki die Äquivalente zu den Seiten in diesem Wiki ermittelt werden sollen.',
    'cpl-input-foreign-helpiw': 'long helptext iwlink',
    'cpl-input-foreign-helptitle': 'long helptext pagetitle',

    'cpl-input-submit-label': 'Seiten vergleichen',
    'cpl-input-submit-title': 'Vergleiche die ausgewählte Menge an Seiten dieses Wikis mit ihren Äquivalenten im fremden Wiki',
    'cpl-input-submit-debug': 'Debug-Modus',

    'cpl-input-language': 'Sprache',

    'cpl-input-error-radiomissing': 'Erforderliches Feld! Wähle eine Option aus.',
    'cpl-input-error-textinputmissing': 'Erforderliches Feld! Bitte gib einen Wert ein.',
    'cpl-input-error-invalidcate': 'Diese Kategorie existiert nicht! Bitte gib den Namen einer existierenden Kategorie ein.',
    'cpl-input-error-invalidpage': 'Diese Seite existiert nicht! Bitte gib den Namen einer existierenden Seite ein.',

    'cpl-mainspace': '(Seiten)',

    'cpl-log-proc-start': 'Prozess gestartet.',
    'cpl-log-proc-endsuccess': 'Prozess erfolgreich beendet.',
    'cpl-log-proc-enderror': 'Prozess aufgrund eines Fehlers beendet.',
    'cpl-log-proc-enduser': 'Prozess aufgrund nicht erfolgter Bestätigung beendet.',

    'cpl-log-foreignwiki': 'Fremdes Wiki (<code>$1</code>) gefunden: $2.',
    'cpl-log-fetchingpages': 'Sammle Seiten... ',
    'cpl-log-fetchingpages-done': 'Fertig. ',
    'cpl-log-fetchingpage': 'Sammle Informationen über die Seite... ',
    'cpl-log-fetchingpage-done': 'Fertig. ',
    'cpl-log-emptycate': 'Es gibt keine Seiten zum Vergleichen in der Kategorie.',
    'cpl-log-emptyns': 'Es gibt keine Seiten zum Vergleichen in dem Namensraum.',
    'cpl-log-foundpagescate': 'Es {{plural:$1|wurde $1 Seite|wurden $1 Seiten}} in der Kategorie gefunden.',
    'cpl-log-foundpagesns': 'Es {{plural:$1|wurde $1 Seite|wurden $1 Seiten}} in dem Namensraum gefunden.',
    'cpl-log-foundpage': 'Die Seite wurde gefunden.',
    'cpl-log-cutoff': ' (Es gibt noch mehr Seiten, aber $1 ist das interne Limit.)',
    'cpl-log-removeinvalidiw': 'Entferne Seiten, die keinen Interwiki-Link zum <code>$1</code>-Wiki haben... ',
    'cpl-log-removeinvalidtitle': 'Entferne Seiten, die im <code>$1</code>-Wiki kein Pendant haben... ',
    'cpl-log-removeinvalidiw-done': 'Fertig. ',
    'cpl-log-removeinvalidtitle-done': 'Fertig. ',
    'cpl-log-remainingpages': 'Es {{plural:$1|bleibt $1 Seite|bleiben $1 Seiten|0=bleiben keine Seiten}} übrig.',
    'cpl-log-fetchingrevs': 'Sammle Informationen zu {{plural:$1|ihrer Versionsgeschichte|ihren Versionsgeschichten}}... ',
    'cpl-log-fetchingrevs-done': 'Fertig. ',
    'cpl-log-outdatedpages': 'Es {{plural:$1|gibt $1 veraltete Seite|gibt $1 veraltete Seiten|0=gibt keine veraltete Seiten}}.',
    'cpl-log-displayingresult': 'Stelle sie in einer Tabelle dar... ',
    'cpl-log-displayingresult-done': 'Fertig.',

    'cpl-error-details': 'Fehlerdetails: ',
    'cpl-error-fetchingpages': 'Fehler beim Sammeln der Informationen!',
    'cpl-error-foreignwiki': 'Konnte das fremde Wiki (<code>$1</code>) nicht finden! Womöglich muss der Interwiki-Link bei $2 behoben werden.',
    'cpl-error-canonicalns': 'Fehler beim Sammeln der englischen Namen der Namensräume dieses Wikis!',
    'cpl-error-foreignpages': 'Fehler beim Prüfen, ob die Seiten in diesem Wiki Pendants im <code>$1</code>-Wiki haben!',
    'cpl-error-foreigndiff': 'Fehler beim Abrufen der Größe des Unterschieds zwischen zwei Versionen im <code>$1</code>-Wiki!',
    'cpl-error-collapse': 'Konnte die Bibliothek nicht einbinden, die das Einklappen von Tabellen ermöglicht!',
    'cpl-error-messages': 'Konnte Texte für die Ausgabe im Letzte-Änderungen-Stil nicht laden!',
    'cpl-error-makingoutput': 'Fehler beim Anzeigen des Resultats!',

    'cpl-output-nothingtodisplay': 'Alle Seiten sind aktuell!',
    'cpl-output-nothingtodisplay-single': 'Die Seite „$1“ ist aktuell!',
    'cpl-output-tableheadlocal': 'Letzte Bearbeitung in diesem Wiki',
    'cpl-output-tableheadforeign': 'Letzte Bearbeitungen im <code>$1</code>-Wiki',
    'cpl-output-timezone': 'Hinweis: Alle Zeitstempel sind in koordinierter Weltzeit (UTC) angegeben.',

    'cpl-output-warningdialog-title': 'Warnung!',
    'cpl-output-warningdialog-text': 'Die Liste der Seiten ist sehr lang, daher kann der Vorgang mehr Zeit in Anspruch nehmen ' +
      'oder sogar fehlschlagen. Darüber hinaus kann er große Mengen des Arbeitsspeichers deines Computers belegen und ' +
      'den Computer infolgedessen bedeutend verlangsamen. Ein Neuladen der Seite gibt den Arbeitsspeicher meist wieder frei. ' +
      'Möchtest du fortfahren?'
  }
}

/*

==============================
Global variables
==============================

*/

// enum
const MatchingMethod = Object.freeze({
  Iwlink: 'Iwlink',
  Pagetitle: 'Pagetitle'
})

// enum
const PagelistMethod = Object.freeze({
  Cate: 'Cate',
  Ns: 'Ns',
  SinglePage: 'SinglePage'
})

const apiLimitKeyName = {
  Cate: 'categorymembers',
  Ns: 'allpages'
}

const articlePath = mw.config.get('wgArticlePath')
const userLanguage = mw.config.get('wgUserLanguage')

let foreignUrl
const getLocalUrl = page => articlePath.replace('$1', page)
// fallback: use the local URL for foreign links
// (this is not wanted behavior, of course, and it is overwritten if the connection
// to the foreign wiki can be established successfully)
let getForeignUrl = getLocalUrl

let formInput,

  debug,

  pagelist,
  pagelistForOutput,

  nsData,
  interwikiMap,

  logElement,
  outputElement,
  progressbar,

  msgWidget

/*

==============================
Internationalization utilities
==============================

*/

// see https://gerrit.wikimedia.org/g/mediawiki/core/%2B/HEAD/resources/lib/jquery.i18n/
// for documentation on jquery.i18n

const reparseUponLocalization = {}
const timestampsToLocalize = { _count: 0 }
const attributesToPrepareForI18n = []

for (const lang in l10nTable) {
  // add the ⧼ ⧽ braces around each l10n key so that unregistered keys are displayed
  // in the format that is familiar from normal MediaWiki system messages
  for (const key in l10nTable[lang]) {
    l10nTable[lang]['⧼' + key + '⧽'] = l10nTable[lang][key]
  }
  // register the translated language names of all registered languages
  // (e.g., if "en" and "de" are registered:
  // "English", "German" for "en", and "Englisch", "Deutsch" for "de")
  for (const langcode in l10nTable) {
    try {
      const translatedLanguage = new Intl.DisplayNames(lang, {type: 'language', fallback: 'none'}).of(langcode)
      if (translatedLanguage === undefined) {
        throw new Error()
      }
      l10nTable[lang][`⧼cpl-lang-${langcode}⧽`] = translatedLanguage
    } catch (e) {
      // either "RangeError: Incorrect locale information provided" from the Intl.DisplayNames constructor
      // or manual throw
      l10nTable[lang][`⧼cpl-lang-${langcode}⧽`] = `⧼cpl-lang-${langcode}⧽`
    }
  }
}

// system messages used in the output,
// will be added to the l10nTable later on
const msgs = [
  'brackets',
  'contribslink',
  'cur',
  'diff',
  'enhancedrc-history',
  'hist',
  'last',
  'minoreditletter',
  'nchanges',
  'newpageletter',
  'ntimes',
  'parentheses',
  'pipe-separator',
  'rc-change-size-new',
  'recentchanges-label-minor',
  'recentchanges-label-newpage',
  'semicolon-separator',
  'talkpagelinktext'
]

function getCurrentLang () {
  return $.i18n().locale
}

function changeLang (newLang) {
  $.i18n().locale = newLang
  $('#cpl-app').attr('lang', getCurrentLang())
  localizeAll()
}

function localizeAll (selector = '') {
  // if selector is empty, localize every single string in the DOM
  // regular localization
  localizeAllSimple(selector + '[data-i18n]')
  // reparse upon localization
  localizeAllReparse(selector + '[data-i18n-function]')
}

function localizeAllSimple (selector) {
  // localize all elements which have a "data-i18n" attribute set
  $(selector).each((_, elem) => {
    const l10nData = $(elem).data('i18n')
    const l10nParams = $(elem).data('i18n-parameters') || []
    if (l10nData.startsWith('⧼') || l10nData.startsWith('[html]⧼')) {
      // this element needs localization of its HTML content
      const l10nKey = l10nData
      $(elem).html($.i18n(l10nKey, ...l10nParams))
    } else {
      // this element needs localization of one of its attributes
      const attrName = l10nData.slice(1, l10nData.indexOf(']'))
      const l10nKey = l10nData.slice(l10nData.indexOf('⧼'))
      $(elem).attr(attrName, $.i18n(l10nKey, ...l10nParams))
    }
  })
}

function localizeAllReparse (selector) {
  // some elements have nested localization and need to be "re-parsed" after
  // having been localized, so a simple localization key is not sufficient
  // for them. therefore, instead of simply setting a "data-i18n"
  // attribute, they set a function that is to be executed upon
  // localization, i.e. here
  $(selector).each((_, elem) => {
    const fullFunctionName = $(elem).data('i18n-function')
    const [functionName, index] = fullFunctionName.split('/')
    $(elem).html(reparseUponLocalization[functionName][index]())
    localizeAll('[data-i18n-function="' + fullFunctionName + '"] ')
  })
}

function localizedTextRaw (key, ...parameters) {
  return $.i18n(`⧼${key}⧽`, ...parameters)
}

function localizedText (key, ...parameters) {
  const spanElem = $('<span>').attr('data-i18n', `⧼${key}⧽`)
  if (parameters.length > 0) {
    spanElem.attr('data-i18n-parameters', JSON.stringify(parameters))
  }
  return spanElem
}

function localizedHtmlSnippet (key, ...parameters) {
  return new OO.ui.HtmlSnippet(localizedText(key, ...parameters)[0].outerHTML)
}

function localizedAttribute (attrName, key, ...parameters) {
  // $.i18n recognizes arbitrary HTML attribute names in the brackets
  // (not just the string "html"; this is not mentioned in the documentation),
  // see https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/core/+/HEAD/resources/lib/jquery.i18n/src/jquery.i18n.js#242
  // attributes cannot be localized immediately if their elements
  // don't exist in the DOM yet (which is often the case with OOUI),
  // so the l10n information gets stored to a global array first, and
  // the function that transfers it from that array to the element
  // needs to be called when the element exists in the DOM
  if (!attributesToPrepareForI18n.includes(attrName)) {
    attributesToPrepareForI18n.push(attrName)
  }
  return `[${attrName}]⧼${key}⧽${JSON.stringify(parameters)}`
}

function prepareAttributesForI18n () {
  // take the information stored in the global array and transfer
  // it to each element
  attributesToPrepareForI18n.forEach(attrName => {
    $(`[${attrName}^="[${attrName}]⧼"]`).each((_, elem) => {
      const l10nData = $(elem).attr(attrName)
      // split the l10n information into key and parameters
      const splitpos = l10nData.indexOf('⧽') + 1
      const l10nKey = l10nData.slice(0, splitpos)
      const l10nParams = l10nData.slice(splitpos)
      $(elem).attr('data-i18n', l10nKey)
      if (l10nParams !== '[]') {
        $(elem).attr('data-i18n-parameters', l10nParams)
      }
    })
  })
}

function localizedTextWithReparse (elemName, func) {
  if (reparseUponLocalization[elemName] === undefined) {
    reparseUponLocalization[elemName] = []
  }
  const index = reparseUponLocalization[elemName].length
  reparseUponLocalization[elemName].push(func)
  const funcName = elemName + '/' + index
  const span = $('<span>')
    .attr('data-i18n-function', funcName)
    .html(func())
  return span[0].outerHTML
}

function localizedTimestamp (timestamps) {
  const newI18nKey = `⧼timestamp-${++timestampsToLocalize['_count']}⧽`
  for (const lang of Object.keys(timestamps)) {
    if (timestampsToLocalize[lang] === undefined) {
      timestampsToLocalize[lang] = {}
    }
    timestampsToLocalize[lang][newI18nKey] = timestamps[lang]
  }
  return $('<span>')
    .attr('data-i18n', newI18nKey)
}

function localizedNumber (number, numberformat) {
  return localizedTextWithReparse('formatNumber', () => {
    let numformat
    switch (numberformat) {
      case 'withsign':
        numformat = new Intl.NumberFormat(getCurrentLang(), { signDisplay: 'exceptZero' })
        break
      default:
        numformat = new Intl.NumberFormat(getCurrentLang())
        break
    }
    // return number
    return numformat.format(number)
  })
}

/*

==============================
Parameters for API queries
==============================

*/

class ApiQueryParams {
  static allCates () {
    return {
      action: 'query',
      list: 'allcategories',
      aclimit: 'max'
    }
  }

  static localInterwikis () {
    return {
      action: 'query',
      meta: 'siteinfo',
      siprop: 'interwikimap',
      sifilteriw: 'local'
    }
  }

  static siteinfo () {
    return {
      action: 'query',
      meta: 'siteinfo'
    }
  }

  static localNamespaces () {
    // use mw.config.get("wgFormattedNamespaces") for localized namespaces,
    // this API call should be used for getting the canonical names
    return {
      action: 'query',
      meta: 'siteinfo',
      siprop: 'namespaces'
    }
  }

  static parseTemplate (text) {
    return {
      action: 'parse',
      text: text,
      contentmodel: 'wikitext',
      disablelimitreport: true,
      wrapoutputclass: '',
      prop: 'text'
    }
  }

  static pagesExistence (titles) {
    return {
      action: 'query',
      titles: titles,
      prop: 'info'
    }
  }

  static cateMembers (lllang, gcmtitle) {
    return {
      action: 'query',
      prop: 'langlinks|revisions',
      lllang: lllang,
      lllimit: 'max',
      generator: 'categorymembers',
      gcmtitle: gcmtitle,
      gcmlimit: 'max',
      gcmsort: 'timestamp',
      gcmdir: 'older',
      rvprop: 'ids|timestamp|flags|parsedcomment|user|size'
    }
  }

  static allPagesInNamespace (lllang, gapnamespace) {
    return {
      action: 'query',
      prop: 'langlinks|revisions',
      lllang: lllang,
      lllimit: 'max',
      generator: 'allpages',
      gapnamespace: gapnamespace,
      gaplimit: 'max',
      rvprop: 'ids|timestamp|flags|parsedcomment|user|size'
    }
  }

  static singlePage (lllang, title) {
    return {
      action: 'query',
      prop: 'langlinks|revisions',
      lllang: lllang,
      lllimit: 'max',
      titles: title,
      rvprop: 'ids|timestamp|flags|parsedcomment|user|size'
    }
  }

  static diffSize (fromrev, torev) {
    return {
      action: 'compare',
      fromrev: fromrev,
      torev: torev,
      prop: 'size'
    }
  }

  static revisions (rvend, titles) {
    return {
      action: 'query',
      prop: 'revisions',
      rvprop: 'ids|timestamp|flags|parsedcomment|user|size',
      rvstart: 'now',
      rvend: rvend,
      titles: titles,
      rvlimit: 'max'
    }
  }
}

/*

==============================
Initializing
==============================

*/

// class that provides a function to load local categories and interwiki links
// these are required to load before making the input form, which gives cates and iwlinks as input options
class InputFormPreparer {
  makeCateAndIwList () {
    return new Promise((resolve, reject) => {
      Promise.all([
        new mw.Api().get(ApiQueryParams.allCates()),
        new mw.Api().get(ApiQueryParams.localInterwikis())
      ]).then(apiresults => {
        resolve({
          cateList: InputFormPreparer._catenameArrayFromApiresult(apiresults[0]),
          iwList: InputFormPreparer._iwlinkObjectFromApiresult(apiresults[1])
        })
      })
    })
  }

  static _catenameArrayFromApiresult (apiResult) {
    if (apiResult.query !== undefined && apiResult.query.allcategories !== undefined) {
      return apiResult.query.allcategories.map(cateObj => cateObj['*'])
    }
    return []
  }

  static _iwlinkObjectFromApiresult (apiResult) {
    if (apiResult.query === undefined || apiResult.query.interwikimap === undefined) {
      return []
    }

    const localUrl = mw.config.get('wgServer') + mw.config.get('wgArticlePath')

    const iwList = []
    apiResult.query.interwikimap.forEach(iwObj => {
      // skip interwiki links that are not interlanguage links
      // and skip interwiki links that point to the local wiki
      if (iwObj.language !== undefined && iwObj.url !== localUrl) {
        iwList.push({ prefix: iwObj.prefix, url: iwObj.url })
      }
    })
    return iwList
  }
}

// hide the "no JS" text and prepare the DOM structure
$(document).ready(() => {
  $('.cpl-nojs').hide()
  if (document.getElementById('cpl-app') === null) {
    $('.page #content > #mw-content-text > .mw-parser-output').append(
      $('<div>').attr('id', 'cpl-app')
    )
  }
  $('#cpl-app')
    .html('') // empty the element
    .append(
      $('<div>').attr('id', 'comparepagelist-langbutton'),
      $('<div>').attr('id', 'comparepagelist-inputarea'),
      $('<div>').attr('id', 'progresslogarea-progresslogarea').append(
        $('<div>').attr('id', 'comparepagelist-progressbar'),
        $('<div>').attr('id', 'comparepagelist-progresslog')
      ),
      $('<div>').attr('id', 'comparepagelist-outputarea')
    )
})

// load dependencies
Promise.all([
  // load OOUI
  mw.loader.using('oojs-ui'),
  // load jquery.i18n and initialize the l10n table
  mw.loader.using('jquery.i18n').done(() => $.i18n().load(l10nTable)),
  // get the local result of {{lang|}} (terraria-specific, will be skipped on other wikis)
  new mw.Api().get(ApiQueryParams.parseTemplate('{{lang|}}')),
  // load the category and interwiki lists
  new InputFormPreparer().makeCateAndIwList().then(cateAndIwList => {
    console.log(`[Compare page list v${cplVersion}] Category and interwiki list on this wiki:`, cateAndIwList)
    return cateAndIwList
  })
]).then(data => {
  // when done, set the language and start making the input form
  // (data is an array of the results of the promises above)
  let initialLang
  if (data[2].parse !== undefined && data[2].parse.text !== undefined && data[2].parse.text['*'] !== undefined) {
    let langFromTemplate = $(data[2].parse.text['*']).html().trim()
    initialLang = (langFromTemplate in l10nTable ? langFromTemplate : '')
  }
  $.i18n().locale = initialLang || userLanguage
  makeInputsAndAddThemToPage(data[3].cateList, data[3].iwList)
}).catch(error => {
  console.error(error)
})

/*

==============================
Making the input form
==============================

*/

// entry function
function makeInputsAndAddThemToPage (cateList, iwList) {
  InputHelper.loadCSS()

  /*
  * Import source of MessageWidget and ButtonMenuSelectWidget.
  * These widgets are not included in Fandom's OOUI fork, apparently
  * (though the styles for the MessageWidget are, for some reason).
  * Sources are minified from:
  * https://doc.wikimedia.org/mediawiki-core/master/js/source/oojs-ui-core.html#OO-ui-MessageWidget
  * https://doc.wikimedia.org/mediawiki-core/master/js/source/oojs-ui-widgets.html#OO-ui-ButtonMenuSelectWidget
  */
  OO.ui.MessageWidget=function(e){e=e||{},OO.ui.MessageWidget.super.call(this,e),OO.ui.mixin.IconElement.call(this,e),OO.ui.mixin.LabelElement.call(this,e),OO.ui.mixin.TitledElement.call(this,e),OO.ui.mixin.FlaggedElement.call(this,e),this.setType(e.type),this.setInline(e.inline),e.icon&&this.setIcon(e.icon),this.$element.append(this.$icon,this.$label).addClass("oo-ui-messageWidget")},OO.inheritClass(OO.ui.MessageWidget,OO.ui.Widget),OO.mixinClass(OO.ui.MessageWidget,OO.ui.mixin.IconElement),OO.mixinClass(OO.ui.MessageWidget,OO.ui.mixin.LabelElement),OO.mixinClass(OO.ui.MessageWidget,OO.ui.mixin.TitledElement),OO.mixinClass(OO.ui.MessageWidget,OO.ui.mixin.FlaggedElement),OO.ui.MessageWidget.static.iconMap={notice:"infoFilled",error:"error",warning:"alert",success:"check"},OO.ui.MessageWidget.prototype.setInline=function(e){e=!!e,this.inline!==e&&(this.inline=e,this.$element.toggleClass("oo-ui-messageWidget-block",!this.inline))},OO.ui.MessageWidget.prototype.setType=function(e){-1===Object.keys(this.constructor.static.iconMap).indexOf(e)&&(e="notice"),this.type!==e&&(this.clearFlags(),this.setFlags(e),this.setIcon(this.constructor.static.iconMap[e]),this.$icon.removeClass("oo-ui-image-"+this.type),this.$icon.addClass("oo-ui-image-"+e),"error"===e?(this.$element.attr("role","alert"),this.$element.removeAttr("aria-live")):(this.$element.removeAttr("role"),this.$element.attr("aria-live","polite")),this.type=e)}
  OO.ui.ButtonMenuSelectWidget=function(e){e=e||{},OO.ui.ButtonMenuSelectWidget.super.call(this,e),this.$overlay=(!0===e.$overlay?OO.ui.getDefaultOverlay():e.$overlay)||this.$element,this.clearOnSelect=!1!==e.clearOnSelect,this.menu=new OO.ui.MenuSelectWidget($.extend({widget:this,$floatableContainer:this.$element},e.menu)),this.connect(this,{click:"onButtonMenuClick"}),this.getMenu().connect(this,{select:"onMenuSelect",toggle:"onMenuToggle"}),this.$button.attr({"aria-expanded":"false","aria-haspopup":"true","aria-owns":this.menu.getElementId()}),this.$element.addClass("oo-ui-buttonMenuSelectWidget"),this.$overlay.append(this.menu.$element)},OO.inheritClass(OO.ui.ButtonMenuSelectWidget,OO.ui.ButtonWidget),OO.ui.ButtonMenuSelectWidget.prototype.getMenu=function(){return this.menu},OO.ui.ButtonMenuSelectWidget.prototype.onMenuSelect=function(e){this.clearOnSelect&&e&&this.getMenu().selectItem()},OO.ui.ButtonMenuSelectWidget.prototype.onMenuToggle=function(e){this.$element.toggleClass("oo-ui-buttonElement-pressed",e)},OO.ui.ButtonMenuSelectWidget.prototype.onButtonMenuClick=function(){this.menu.toggle()};

  // make fieldsets and buttons
  const langButton = InputHelper.makeLangButton()
  const pagelistFieldset = new PagelistFieldset(cateList)
  const foreignwikiFieldset = new ForeignwikiFieldset(iwList)
  const debugButtonFieldset = InputHelper.makeDebugButtonFieldset()
  const submitButton = InputHelper.makeSubmitButton()

  debugButtonFieldset.toggle(false) // hide initially

  // display the input form on the page
  $('#comparepagelist-langbutton').append(langButton.$element)
  $('#comparepagelist-inputarea').append(
    pagelistFieldset.fieldset.$element,
    foreignwikiFieldset.fieldset.$element,
    debugButtonFieldset.$element,
    new OO.ui.FieldsetLayout({ items: [submitButton] }).$element
  )
  prepareAttributesForI18n()
  localizeAll()

  makeInterwikiMap(iwList)

  // define logic for the submit button
  submitButton.on('click', () => {
    onSubmit(pagelistFieldset, foreignwikiFieldset, debugButtonFieldset)
  })
}

class InputHelper {
  static loadCSS () {
    // load CSS used on Special:RecentChanges
    // TODO: Move to gadget definition
    const modules = [
      'jquery.tablesorter.styles',
      'mediawiki.feedlink', // the short form "mediawiki.feedlink,helplink,icon" doesn't seem to work ("Unknown module")
      'mediawiki.helplink',
      'mediawiki.icon',
      'mediawiki.interface.helpers.styles',
      'mediawiki.rcfilters.filters.base.styles',
      'mediawiki.special.changeslist',
      'mediawiki.special.changeslist.enhanced',
      'oojs-ui.styles.icons-location'
    ]
    mw.loader.load(modules, 'text/css')

    const skin = mw.config.get('skin')

    // construct URL for logging the load() action above
    const urlParams = {
      only: 'styles',
      modules: modules.join('|'),
      lang: userLanguage,
      skin: skin
    }
    const url = mw.config.get('wgServer') + mw.config.get('wgLoadScript') + '?' + $.param(urlParams)
    console.log(`[Compare page list v${cplVersion}] Loaded modules:`, url)
  }

  // get the value of a radiobutton group
  static getSelectedInfoOfRadiobuttons (radiobuttons) {
    let data
    radiobuttons.items.forEach(item => {
      if (item.isSelected()) {
        data = item.data
      }
    })
    return data
  }

  static makeLangButton () {
    let currentLangOption
    const langOptions = []
    for (const lang in l10nTable) {
      const langOptionLabel = localizedTextWithReparse('langButton', () => {
        const labelHtml = $('<span>')
          .append($('<span>')
            .attr('lang', lang)
            .text(l10nTable[lang][`⧼cpl-lang-${lang}⧽`])
          )
        if (getCurrentLang() !== lang) {
          labelHtml.append(
            '&emsp;',
            $('<small>')
              .addClass(noteClasses)
              .html(localizedText(`cpl-lang-${lang}`))
          )
        }
        return labelHtml[0].outerHTML
      })
      const newLangOption = new OO.ui.MenuOptionWidget({
        data: lang,
        label: new OO.ui.HtmlSnippet(langOptionLabel)
      })
      if (lang == getCurrentLang()) {
        currentLangOption = newLangOption
      }
      langOptions.push(newLangOption)
    }

    const langButtonWidget = new OO.ui.ButtonMenuSelectWidget({
      icon: 'language',
      label: localizedText('cpl-input-language'),
      invisibleLabel: true,
      clearOnSelect: false,
      menu: {
        horizontalPosition: 'end',
        items: langOptions.sort((a, b) => (a.getData() < b.getData() ? -1 : 1))
      }
    })

    langButtonWidget.getMenu().on('select', (selectedItem) => {
      const newLang = selectedItem.getData()
      if (debug) { console.log('Changed language to ' + newLang) }
      changeLang(newLang)
    })
    langButtonWidget.getMenu().selectItem(currentLangOption)
    return langButtonWidget
  }

  static makeDebugButtonFieldset () {
    return new OO.ui.FieldsetLayout({
      items: [
        new OO.ui.ToggleButtonWidget({
          label: localizedHtmlSnippet('cpl-input-submit-debug'),
          invisibleLabel: true,
          title: localizedHtmlSnippet('cpl-input-submit-debug'),
          icon: 'robot'
        })
      ]
    })
  }

  static makeSubmitButton () {
    return new OO.ui.ButtonWidget({
      label: localizedHtmlSnippet('cpl-input-submit-label'),
      title: localizedHtmlSnippet('cpl-input-submit-title'),
      flags: ['primary', 'progressive']
    })
  }
}

// class that makes the "Pages to compare" section
class PagelistFieldset {
  constructor (cateList) {
    this.makeCateInput(cateList) // the category selection text input field
    this.makeNsInput() // the namespace selection dropdown menu
    this.makeSinglePageInput() // the page selection text input field
    this.makeRadioButtons(cateList) // the radio buttons to select "category", "namespace", or "single page"
    this.combineAll()
  }

  makeCateInput (cateList) {
    // see https://www.mediawiki.org/wiki/OOUI/Elements/Lookup
    function LookupTextInputWidget (config) {
      OO.ui.TextInputWidget.call(this,
        $.extend({
          placeholder: localizedAttribute('placeholder', 'cpl-input-pagelist-cateplaceholder'),
          validate: catename => cateList.indexOf(catename) != -1
        }, config)
      )
      OO.ui.mixin.LookupElement.call(this, config)
    }

    OO.inheritClass(LookupTextInputWidget, OO.ui.TextInputWidget)
    OO.mixinClass(LookupTextInputWidget, OO.ui.mixin.LookupElement)

    LookupTextInputWidget.prototype.getLookupRequest = function () {
      const value = this.getValue()
      const deferred = $.Deferred()
      const response = []

      cateList.forEach(cateName => {
        if (cateName.toLowerCase().startsWith(value.toLowerCase())) {
          response.push(cateName)
        }
      })
      deferred.resolve(response)

      return deferred.promise({ abort: function () {} })
    }

    LookupTextInputWidget.prototype.getLookupCacheDataFromResponse = function (response) {
      return response || []
    }

    LookupTextInputWidget.prototype.getLookupMenuOptionsFromData = function (data) {
      const items = []
      data.forEach(cateName => {
        const newItem = new OO.ui.MenuOptionWidget({
          data: cateName,
          label: cateName
        })
        items.push(newItem)
      })
      return items
    }

    this.cateInput = new LookupTextInputWidget()
    this.cateInputWrapper = new OO.ui.HorizontalLayout({
      items: [
        new OO.ui.LabelWidget({ label: localizedHtmlSnippet('cpl-input-pagelist-catelabel') }),
        this.cateInput
      ]
    })
    this.cateInputWrapper.toggle(false) // hide initially
  }

  makeNsInput () {
    const nsOptions = []
    const data = mw.config.get('wgFormattedNamespaces')
    for (const nsIndex in data) {
      if (nsIndex >= 0) {
        nsOptions.push({
          data: nsIndex,
          label: (nsIndex === 0 || nsIndex === '0' ? localizedHtmlSnippet('cpl-mainspace') : data[nsIndex])
        })
      }
    }
    this.nsInput = new OO.ui.DropdownInputWidget({ options: nsOptions })

    this.nsInputWrapper = new OO.ui.HorizontalLayout({
      items: [
        new OO.ui.LabelWidget({ label: localizedHtmlSnippet('cpl-input-pagelist-nslabel') }),
        this.nsInput
      ]
    })
    this.nsInputWrapper.toggle(false) // hide initially
  }

  static checkPageExistence (pagename) {
    if (debug) { console.log(`Checking existence of the page ${pagename}...`) }
    const deferred = $.Deferred()
    // check if the page exists on the wiki
    new mw.Api().get(ApiQueryParams.pagesExistence(pagename))
      .done(result => {
        deferred.resolve(result.query && result.query.pages && Object.keys(result.query.pages)[0] > -1)
      })
      .fail(() => {
        deferred.resolve(false)
      })
    return deferred
  }

  makeSinglePageInput () {
    this.singlePageInput = new OO.ui.TextInputWidget({
      icon: 'articleNotFound',
      required: true,
      placeholder: localizedAttribute('placeholder', 'cpl-input-pagelist-singleplaceholder'),
      validate: pagename => PagelistFieldset.checkPageExistence(pagename)
    })

    this.singlePageInputWrapper = new OO.ui.HorizontalLayout({
      items: [
        new OO.ui.LabelWidget({ label: localizedHtmlSnippet('cpl-input-pagelist-singlelabel') }),
        this.singlePageInput
      ]
    })
    this.singlePageInputWrapper.toggle(false) // hide initially

    // change the icon that is displayed at the beginning of the input
    this.singlePageInput.on('change', () => {
      this.singlePageInput.getValidity()
        .then(() => {
          this.singlePageInput.setIcon('articleCheck') // input is a valid page name
        })
        .catch(() => {
          this.singlePageInput.setIcon('articleNotFound')// input is not a valid page name
        })
    })
  }

  makeRadioButtons (cateList) {
    const radioButtonCate = new OO.ui.RadioOptionWidget({
      data: PagelistMethod.Cate,
      label: localizedHtmlSnippet('cpl-input-pagelist-radiocate')
    })
    const radioButtonNs = new OO.ui.RadioOptionWidget({
      data: PagelistMethod.Ns,
      label: localizedHtmlSnippet('cpl-input-pagelist-radions')
    })
    const radioButtonSinglePage = new OO.ui.RadioOptionWidget({
      data: PagelistMethod.SinglePage,
      label: localizedHtmlSnippet('cpl-input-pagelist-radiosingle')
    })

    this.radiobuttons = new OO.ui.RadioSelectWidget({ items: [radioButtonCate, radioButtonNs, radioButtonSinglePage] })
    this.radiobuttons.on('select', () => {
      // when the radio button selection changes:
      this.nsInputWrapper.toggle(radioButtonNs.isSelected()) // show/hide the namespace selection dropdown menu
      this.cateInputWrapper.toggle(radioButtonCate.isSelected()) // show/hide the category selection text input field
      this.cateInput.setRequired(radioButtonCate.isSelected()) // set the category selection text input field to required/optional
      this.cateInput.setValidation((radioButtonCate.isSelected() ? catename => cateList.indexOf(catename) != -1 : null))
      this.singlePageInputWrapper.toggle(radioButtonSinglePage.isSelected()) // show/hide the single page selection text input field
      this.singlePageInput.setRequired(radioButtonSinglePage.isSelected()) // set the single page selection text input field to required/optional
      this.singlePageInput.setValidation((radioButtonSinglePage.isSelected() ? pagename => PagelistFieldset.checkPageExistence(pagename) : null))
    })
  }

  combineAll () {
    const combineRadioLookupAndDropdown = new OO.ui.Widget({
      content: [this.radiobuttons, this.cateInputWrapper, this.nsInputWrapper, this.singlePageInputWrapper]
    })
    this.fieldlayout = new OO.ui.FieldLayout(combineRadioLookupAndDropdown, {
      align: 'inline' // to make potential errors appear properly at the bottom
    })
    this.radiobuttons.on('select', () => {
      // when the radio button selection changes, remove potentially set error message about missing radio buttion selection
      // because now a radio button is selected for sure
      this.fieldlayout.setErrors((this.pagelistInput.method === undefined ? [localizedText('cpl-input-error-radiomissing')] : []))
      localizeAll(this.fieldlayout.id)
    })
    this.fieldset = new OO.ui.FieldsetLayout({
      label: localizedHtmlSnippet('cpl-input-pagelist-heading'),
      items: [this.fieldlayout]
    })
  }

  get pagelistInput () {
    const method = InputHelper.getSelectedInfoOfRadiobuttons(this.radiobuttons)
    let details

    if (method !== undefined) {
      const inputElemBasedOnPagelistMethod = {}
      inputElemBasedOnPagelistMethod[PagelistMethod.Cate] = this.cateInput
      inputElemBasedOnPagelistMethod[PagelistMethod.Ns] = this.nsInput
      inputElemBasedOnPagelistMethod[PagelistMethod.SinglePage] = this.singlePageInput

      details = inputElemBasedOnPagelistMethod[method].value
    }

    return {
      method: method,
      details: details
    }
  }
}

// class that makes the "Foreign wiki to compare pages to" section
class ForeignwikiFieldset {
  constructor (iwList) {
    this.makeIwInput(iwList)
    this.makeRadioButtons()
    this.combineAll()
  }

  makeIwInput (iwList) {
    const iwOptions = []
    iwList.forEach(iwObj => {
      iwOptions.push({
        data: iwObj.prefix,
        label: iwObj.prefix
      })
    })

    this.iwInput = new OO.ui.DropdownInputWidget({
      options: iwOptions,
      value: 'en' // select "en" by default, will fallback to the first option if "en" is not available
    })

    this.iwInputWrapper = new OO.ui.HorizontalLayout({
      items: [
        new OO.ui.LabelWidget({
          label: $('<a>')
            .attr('href', getLocalUrl('Special:Interwiki'))
            .append(localizedText('cpl-input-foreign-iwlabel'))
        }),
        this.iwInput
      ]
    })
  }

  makeRadioButtons () {
    const radioButtonIwlink = new OO.ui.RadioOptionWidget({
      data: MatchingMethod.Iwlink,
      label: localizedHtmlSnippet('cpl-input-foreign-radioiw')
    })
    const radioButtonPagetitle = new OO.ui.RadioOptionWidget({
      data: MatchingMethod.Pagetitle,
      label: localizedHtmlSnippet('cpl-input-foreign-radiotitle')
    })
    this.radiobuttons = new OO.ui.RadioSelectWidget({
      items: [radioButtonIwlink, radioButtonPagetitle]
    })
  }

  combineAll () {
    const helptext = $('<span>')
    const helptextkeys = [
      'cpl-input-foreign-helpintro',
      'cpl-input-foreign-helpiw',
      'cpl-input-foreign-helptitle'
    ]
    for (const key of helptextkeys) {
      helptext.append($('<p>').html(localizedText(key)))
    }

    this.fieldlayout = new OO.ui.FieldLayout(this.radiobuttons, {
      label: localizedHtmlSnippet('cpl-input-foreign-radiolabel'),
      help: new OO.ui.HtmlSnippet(helptext[0].outerHTML),
      align: 'inline'
    })

    this.radiobuttons.on('select', () => {
      // when the radio button selection changes, remove potentially set error message about missing radio buttion selection
      // because now a radio button is selected for sure
      this.fieldlayout.setErrors((this.foreignwikiInput.matchmethod === undefined ? [localizedText('cpl-input-error-radiomissing')] : []))
      localizeAll(this.fieldlayout.id)
    })
    this.fieldset = new OO.ui.FieldsetLayout({
      label: localizedHtmlSnippet('cpl-input-foreign-heading'),
      items: [this.iwInputWrapper, this.fieldlayout]
    })
  }

  get foreignwikiInput () {
    return {
      iwprefix: this.iwInput.value,
      matchmethod: InputHelper.getSelectedInfoOfRadiobuttons(this.radiobuttons)
    }
  }
}

function makeInterwikiMap (iwList) {
  interwikiMap = {}
  iwList.forEach(iwObj => {
    interwikiMap[iwObj.prefix] = iwObj.url
  })
}

function updateErrors (pagelistFieldset, foreignwikiFieldset) {
  // display error messages if the radio buttons are not selected
  pagelistFieldset.fieldlayout.setErrors((pagelistFieldset.pagelistInput.method === undefined ? [localizedText('cpl-input-error-radiomissing')] : []))
  foreignwikiFieldset.fieldlayout.setErrors((foreignwikiFieldset.foreignwikiInput.matchmethod === undefined ? [localizedText('cpl-input-error-radiomissing')] : []))
  localizeAll(pagelistFieldset.fieldlayout.id)
  localizeAll(foreignwikiFieldset.fieldlayout.id)

  // make an additional check if pagelistMethod is "Cate" or "SinglePage"
  // to see if the input is valid
  return new Promise((resolve, reject) => {
    switch (pagelistFieldset.pagelistInput.method) {
      case PagelistMethod.Cate:
        pagelistFieldset.cateInput.getValidity()
          .fail(() => {
            pagelistFieldset.cateInput.setValidityFlag(false)
            let errortext = 'cpl-input-error-textinputmissing'
            if (pagelistFieldset.cateInput.getValue() !== '') {
              errortext = 'cpl-input-error-invalidcate'
            }
            pagelistFieldset.fieldlayout.setErrors([localizedText(errortext)])
            localizeAll(pagelistFieldset.fieldlayout.id)
            pagelistFieldset.cateInput.scrollElementIntoView()
            reject()
          })
          .done(() => { resolve() })
        break

      case PagelistMethod.SinglePage:
        pagelistFieldset.singlePageInput.getValidity()
          .fail(() => {
            pagelistFieldset.singlePageInput.setValidityFlag(false)
            let errortext = 'cpl-input-error-textinputmissing'
            if (pagelistFieldset.singlePageInput.getValue() !== '') {
              errortext = 'cpl-input-error-invalidpage'
            }
            pagelistFieldset.fieldlayout.setErrors([localizedHtmlSnippet(errortext)])
            localizeAll(pagelistFieldset.fieldlayout.id)
            pagelistFieldset.singlePageInput.scrollElementIntoView()
            reject()
          })
          .done(() => { resolve() })
        break

      default:
        // the pagelistMethod that was selected does not require additional validation
        resolve()
        break
    }
  })
}

function onSubmit (pagelistFieldset, foreignwikiFieldset, debugButtonFieldset) {
  updateErrors(pagelistFieldset, foreignwikiFieldset)
    .then(() => {
      // input is valid
      if (pagelistFieldset.pagelistInput.method !== undefined && foreignwikiFieldset.foreignwikiInput.matchmethod !== undefined) {
        const dataForCompare = {
          foreignWiki: foreignwikiFieldset.foreignwikiInput.iwprefix,
          matchingMethod: foreignwikiFieldset.foreignwikiInput.matchmethod,
          pagelistMethod: pagelistFieldset.pagelistInput.method,
          debug: debugButtonFieldset.items[0].getValue()
        }
        dataForCompare[dataForCompare.pagelistMethod] = pagelistFieldset.pagelistInput.details
        if (dataForCompare.debug) { console.log('Starting to compare. Data:', dataForCompare) }
        startCompare(dataForCompare) // start actions
      }
    })
    .catch(() => {}) // input is not valid, do not start actions
}

/*

==============================
Doing the comparison
==============================

*/

function startCompare (data) {
  // initialize the global variables
  logElement = document.getElementById('comparepagelist-progresslog')
  outputElement = document.getElementById('comparepagelist-outputarea')

  // reset output
  logElement.innerHTML = ''
  outputElement.innerHTML = ''

  // reset progressbar
  document.getElementById('comparepagelist-progressbar').innerHTML = '' // clear the wrapper of the actual progressbar
  progressbar = new OO.ui.ProgressBarWidget({ progress: 0 }) // make new progressbar
  $('#comparepagelist-progressbar').append(progressbar.$element) // display new progressbar
  // progressbar.pushPending(); // doesn't seem to have any effect

  // display new log box
  msgWidget = new OO.ui.MessageWidget({
    type: 'notice',
    label: localizedHtmlSnippet('cpl-log-proc-start')
  })
  $(logElement).append(msgWidget.$element)

  // initialize the global variables
  formInput = data
  debug = data.debug
  pagelist = new Pagelist()
  pagelistForOutput = []
  nsData = {}

  // start actions
  doCompare()
    .then(() => outputLog(localizedText('cpl-log-proc-endsuccess')))
    .catch(errReason => outputLog(localizedText(errReason)))
    .finally(() => {
      if (debug) {
        console.log($.i18n().messageStore.messages)
        console.log(timestampsToLocalize)
        console.log(reparseUponLocalization)
      }
    })
}

// function with the full flow of actions, as a chain of promises
function doCompare () {
  return new Promise((resolve, reject) => {
    pingForeignWiki()

      // (1) when successfully connected to foreign wiki:
      .then(foreignMainpage => {
        try {
          outputLog(localizedText('cpl-log-foreignwiki', formInput.foreignWiki, `<a href="${foreignMainpage}">${foreignMainpage}</a>`))

          outputLog(localizedText((formInput.pagelistMethod === PagelistMethod.SinglePage ? 'cpl-log-fetchingpage' : 'cpl-log-fetchingpages')))

          progressbar.setProgress(10)

          return pagelist.getLocalPages()
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (2) when successfully fetched list of local pages:
      .then(() => {
        try {
          progressbar.setProgress(20)
          if (debug) { console.log(`Got list of local pages (${pagelist.localPagesCount}):`, pagelist) }

          outputLog(localizedText((formInput.pagelistMethod === PagelistMethod.SinglePage ? 'cpl-log-fetchingpage-done' : 'cpl-log-fetchingpages-done')))

          if (pagelist.localPagesCount <= 0) {
            switch (formInput.pagelistMethod) {
              case PagelistMethod.Cate:
                addToLastLog(localizedText('cpl-log-emptycate'))
                break
              case PagelistMethod.Ns:
                addToLastLog(localizedText('cpl-log-emptyns'))
                break
              default:
                break
            }
            return breakOutOfPromiseChain()
          }

          switch (formInput.pagelistMethod) {
            case PagelistMethod.Cate:
              addToLastLog(localizedText('cpl-log-foundpagescate', pagelist.localPagesCount))
              break
            case PagelistMethod.Ns:
              addToLastLog(localizedText('cpl-log-foundpagesns', pagelist.localPagesCount))
              break
            case PagelistMethod.SinglePage:
              addToLastLog(localizedText('cpl-log-foundpage'))
              break
            default:
              break
          }
          addToLastLog(stringAboutLimitIfNecessary())

          progressbar.setProgress(25)

          switch (formInput.matchingMethod) {
            case MatchingMethod.Iwlink:
              outputLog(localizedText('cpl-log-removeinvalidiw', formInput.foreignWiki))
              break
            case MatchingMethod.Pagetitle:
              outputLog(localizedText('cpl-log-removeinvalidtitle', formInput.foreignWiki))
              break
            default:
              break
          }

          return loadNamespaces()
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (3) when successfully fetched list of local canonical namespaces:
      .then(() => {
        try {
          progressbar.setProgress(30)
          if (debug) { console.log('Namespace list on this wiki:', nsData) }

          return pagelist.addForeignTitles() // this is a pretty brief operation, no API requests
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (4) when successfully added the foreign titles to the pagelist:
      .then(() => {
        try {
          if (debug) { console.log(`Added foreign titles. pagelist (${pagelist.localPagesCount}):`, pagelist) }

          let canContinue = Promise.resolve()
          if (pagelist.localPagesCount > 200) {
            // if there are many pages, then only continue after user gives confirmation
            canContinue = confirmationDialog(localizedTextRaw('cpl-output-warningdialog-text'), localizedTextRaw('cpl-output-warningdialog-title'))
          }

          return canContinue.then(() => pagelist.filterOutPagesWithInvalidForeignTitles())
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (5) when successfully removed pages without interwiki links/foreign counterparts:
      .then(() => {
        try {
          progressbar.setProgress(40)
          if (debug) { console.log(`Filtered out PagesWithInvalidForeignTitles. pagelist (${pagelist.localPagesCount}):`, pagelist) }

          switch (formInput.pagelistMethod) {
            case PagelistMethod.Cate:
              addToLastLog(localizedText('cpl-log-removeinvalidiw-done'))
              break
            case PagelistMethod.Ns:
              addToLastLog(localizedText('cpl-log-removeinvalidtitle-done'))
              break
            default:
              break
          }

          if (pagelist.localPagesCount <= 0) {
            addToLastLog(localizedText('cpl-log-remainingpages', 0))
            return breakOutOfPromiseChain()
          }

          addToLastLog(localizedText('cpl-log-remainingpages', pagelist.localPagesCount))
          outputLog(localizedText('cpl-log-fetchingrevs', pagelist.localPagesCount))

          return pagelist.addForeignRevsAndLocalDiffsizes(new PerPageProgress(40, 75))
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (6) when successfully fetched diffsizes of the local pages and revisions for the foreign pages:
      .then(() => {
        try {
          if (debug) { console.log(`Added foreign revisions and local diff sizes. pagelist (${pagelist.localPagesCount}):`, pagelist) }

          return pagelist.dropNonOutdatedPages() // this is a pretty brief operation, no API requests
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (7) when successfully removed pages whose foreign pages have no newer revisions:
      .then(() => {
        try {
          progressbar.setProgress(80)
          if (debug) { console.log(`Dropped non-outdated pages. pagelist (${pagelist.localPagesCount}):`, pagelist) }

          addToLastLog(localizedText('cpl-log-fetchingrevs-done'))
          if (pagelist.localPagesCount <= 0) {
            addToLastLog(localizedText('cpl-log-outdatedpages', 0))
            if (formInput.pagelistMethod !== PagelistMethod.SinglePage) {
              outputSuccess(localizedText('cpl-output-nothingtodisplay'))
            } else {
              outputSuccess(localizedText('cpl-output-nothingtodisplay-single', formInput.SinglePage))
            }
            return breakOutOfPromiseChain()
          }

          addToLastLog(localizedText('cpl-log-outdatedpages', pagelist.localPagesCount))
          outputLog(localizedText('cpl-log-displayingresult', pagelist.localPagesCount))

          return pagelist.prepareForOutput(new PerPageProgress(80, 90))
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (8) when successfully formatted the information that is specifically needed for output:
      .then(() => {
        try {
          if (debug) { console.log('Prepared pagelist for output. pagelistForOutput:', pagelistForOutput) }

          return displayOutput()
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      // (9) when successfully created the HTML for the table:
      .then(() => {
        try {
          if (debug) { console.log('Made output HTML.') }

          addToLastLog(localizedText('cpl-log-displayingresult-done'))

          return breakOutOfPromiseChain() // successfully finished all operations
        } catch (e) { return breakOutOfPromiseChain(e) }
      })

      .catch(error => {
        // progressbar.popPending(); // doesn't seem to have any effect
        if (error !== undefined) {
          if (debug) { console.error(error) }
          progressbar.setDisabled(true)
          reject(error instanceof FailedConfirmationError ? 'cpl-log-proc-enduser' : 'cpl-log-proc-enderror')
        } else {
          progressbar.setProgress(100)
          resolve()
        }
      })
  })
}

// class that holds the list of pages, which is altered as part of the comparison process
class Pagelist {
  constructor () {
    this.rawApiResult = {}
    this.pages = {} // a copy of rawApiResult that will be modified and extended (e.g. with foreign revisions etc.)
  }

  // for comparison part 1
  getLocalPages () {
    return new Promise((resolve, reject) => {
      const apiParams = {
        Cate: ApiQueryParams.cateMembers(formInput.foreignWiki, 'Category:' + formInput.Cate),
        Ns: ApiQueryParams.allPagesInNamespace(formInput.foreignWiki, formInput.Ns),
        SinglePage: ApiQueryParams.singlePage(formInput.foreignWiki, formInput.SinglePage)
      }

      if (formInput.pagelistMethod in apiParams) {
        if (debug) {
          console.log(
            'API query for getting list of local pages:',
            mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/api.php?' + $.param(apiParams[formInput.pagelistMethod])
          )
        }

        new mw.Api().get(apiParams[formInput.pagelistMethod]).then(pagelistGetterResult => {
          this.rawApiResult = pagelistGetterResult
          if (pagelistGetterResult.query !== undefined && pagelistGetterResult.query.pages !== undefined) {
            this.pages = pagelistGetterResult.query.pages
          }
          resolve()
        })
      } else {
        errorDuringProcess(`The pagelistMethod "${formInput.pagelistMethod}" is not a valid pagelistMethod.`, localizedText('cpl-error-fetchingpages'))
        reject(Error(`pagelistMethod "${formInput.pagelistMethod}" is not in ${Object.keys(apiParams)}!`))
      }
    })
  }

  // for comparison part 2
  isCutOffByLimit () {
    if (this.rawApiResult.continue === undefined || this.rawApiResult.limits === undefined) {
      return false
    }
    return this.rawApiResult.limits[apiLimitKeyName[formInput.pagelistMethod]] !== undefined
  }

  // for comparison part 3
  addForeignTitles () {
    return new Promise((resolve, reject) => {
      for (const pageid in pagelist.pages) {
        if (Object.hasOwnProperty.call(pagelist.pages, pageid)) {
          const localPageData = pagelist.pages[pageid]

          switch (formInput.matchingMethod) {
            case MatchingMethod.Iwlink:
              // we defined lllang in the API query that returned the initial pagelist,
              // so the langlinks section will either contain only our foreignWiki langlink, or no langlinks at all.
              // all other langlinks are disregarded
              pagelist.pages[pageid].foreignTitle = (localPageData.langlinks === undefined ? undefined : localPageData.langlinks[0]['*'])
              break

            case MatchingMethod.Pagetitle:
              // the namespace part of localPageData.title is localized, so remove it
              const titleWithoutNs = localPageData.title.slice(nsData.localNamespacesLocalized[localPageData.ns].length)
              // and then prepend the canonical namespace
              const normalizedTitle = nsData.localNamespacesCanonical[localPageData.ns] + titleWithoutNs

              pagelist.pages[pageid].foreignTitle = normalizedTitle
              break

            default:
              // don't add the foreign title, because it is unknown
              break
          }
        }
      }
      resolve()
    })
  }

  // for comparison part 4
  filterOutPagesWithInvalidForeignTitles () {
    return ValidLocalPageFilterer.filter()
  }

  // for comparison part 5
  addForeignRevsAndLocalDiffsizes (perPageProgress) {
    const promisesForAllPages = []

    perPageProgress.pagecount = pagelist.localPagesCount
    // iterate over all pages
    for (const localPageId in pagelist.pages) {
      if (Object.hasOwnProperty.call(pagelist.pages, localPageId)) {
        const localPageData = pagelist.pages[localPageId]

        // make a promise for this page that will be added to the Promise.all array of all pages
        const addDataToThisPage = new Promise((resolve, reject) => {
          // for this page, get the local diffsize and the foreign revisions
          const promisesForThisPage = [
            getLocalDiffsizeForOnePage(localPageData.revisions[0].parentid, localPageData.revisions[0].revid),
            getForeignRevsSinceCutoff(localPageData.foreignTitle, localPageData.revisions[0].timestamp)
          ]
          Promise.all(promisesForThisPage)
          // when successfully gotten the local diffsize and the foreign revisions for this page:
            .then(promisesResult => {
              // if diffsize is undefined, then it means the page is a new page, so we just take its size as the diffsize
              const localDiffsize = (promisesResult[0] !== undefined ? promisesResult[0] : localPageData.revisions[0].size)
              const foreignrevs = promisesResult[1]

              let apiRequestDelay = 0
              if (true) {
                // activating the delay helps spreading out the requests,
                // which improves performance and sometimes prevents errors caused by rate limits.
                apiRequestDelay = 1000 + Math.random() * 1500 // between 1 and 2.5 seconds
              }
              setTimeout(() => {
                getDiffSizesForAllForeignRevsOfOnePage(foreignrevs)
                  .then(foreignrevsWithDiffsizes => {
                    pagelist.pages[localPageId].revisions[0].diffsize = localDiffsize
                    pagelist.pages[localPageId].foreignRevisions = foreignrevsWithDiffsizes

                    perPageProgress.increment()

                    resolve()
                  })
                  .catch(error => { reject(error) })
              }, apiRequestDelay)
            })
            .catch(error => { reject(error) })
        })
        promisesForAllPages.push(addDataToThisPage)
      }
    }

    return new Promise((resolve, reject) => {
      Promise.all(promisesForAllPages)
        .then(() => { resolve() })
        .catch(error => { reject(error) })
    })
  }

  // for comparison part 6
  dropNonOutdatedPages () {
    return new Promise((resolve, reject) => {
      for (const pageid in pagelist.pages) {
        if (Object.hasOwnProperty.call(pagelist.pages, pageid)) {
          if (pagelist.pages[pageid].foreignRevisions === undefined) {
            // there are no foreign revisions, which means the latest local revision is after the latest foreign revision.
            // hence, we can remove this local page
            delete pagelist.pages[pageid]
          }
        }
      }
      resolve()
    })
  }

  // for comparison part 7
  prepareForOutput (perPageProgress) {
    // fill the pagelistForOutput array with objects that contain the information
    // needed for the output, e.g.:
    /*
    {
      local: {
        revid: x,
        timestamp: x,
        isnew: x,
        username: x
      },
      foreign: [
        {
          revid: x,
          timestamp: x,
          isnew: x,
          username: x
        },
        {
          revid: x,
          timestamp: x,
          isnew: x,
          username: x
        }
      ]
    */

    // this info also includes timestamps, which require localization like everything else.
    // we're localizing them differently, though: we're registering the localized format for each
    // language here, then later (in the output maker functions) store each timestamp instance
    // (i.e. a specific date or time) as a separate l10n key to the l10nTable
    const dateformats = {}
    const dateformatsDate = {}
    const dateformatsTime = {}

    for (const lang of Object.keys(l10nTable)) {
      dateformats[lang] = new Intl.DateTimeFormat(lang, {
        timeZone: 'UTC',
        hourCycle: 'h23',
        dateStyle: 'short',
        timeStyle: 'short'
      })
      dateformatsDate[lang] = new Intl.DateTimeFormat(lang, {
        timeZone: 'UTC',
        dateStyle: 'short'
      })
      dateformatsTime[lang] = new Intl.DateTimeFormat(lang, {
        timeZone: 'UTC',
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    perPageProgress.pagecount = pagelist.localPagesCount
    for (const pageid in pagelist.pages) {
      if (Object.hasOwnProperty.call(pagelist.pages, pageid)) {
        const pagedata = pagelist.pages[pageid]

        const pagedataForOutput = {
          local: preparePagedataLocalForOutput(pagedata, dateformatsDate, dateformatsTime),
          foreign: preparePagedataForeignForOutput(pagedata, dateformats, dateformatsDate, dateformatsTime)
        }

        pagelistForOutput.push(pagedataForOutput)

        perPageProgress.increment()
      }
    }
    pagelistForOutput.sort((a, b) => a.local.timestampMillis - b.local.timestampMillis) // sort by last edit on local wiki

    return Promise.resolve()
  }

  get localPagesCount () {
    if (this.pages !== undefined && Object.keys(this.pages).length !== undefined) {
      return Object.keys(this.pages).length
    }
    return -1
  }
}

/*

==============================
General comparison helper functions
==============================

*/

function errorDuringProcess (errordata, errortext) {
  let details
  if (errordata !== undefined) {
    // the errordata parameter can be anything,
    // try to get useful information from it
    if (errordata.promise !== undefined && (errordata.responseText !== undefined || errordata.status !== undefined)) {
      details = (errordata.status || '') + ' ' + (errordata.responseText || '')
    } else {
      if (errordata.error !== undefined) {
        if (errordata.error.constructor === Function) {
          details = errordata.error()
        } else {
          if (errordata.error.info !== undefined) {
            details = errordata.error.info
          } else {
            details = errordata.error
          }
        }
      } else {
        if (errordata.constructor === Function) {
          details = errordata()
        } else {
          details = errordata
        }
      }
    }
  }
  outputError(errortext, details)
}

function breakOutOfPromiseChain (error) {
  return Promise.reject(error)
}

function padDateTime (n) {
  return (n < 10 ? '0' + n : n)
}

function mapForObject (obj, mapFn) {
  // example usage:
  /*
  let originalObj = { 'a': 1, 'b': 2, 'c': 3 }
  let newObj = mapForObject( originalObj, ([k, v]) => ({[k]: v * v}) )
  console.log(newObj) // { 'a': 1, 'b': 4, 'c': 9 }
  */
  return Object.assign(...Object.entries(obj).map(mapFn))
}

class PerPageProgress {
  // some functions have a certain amount of progress allotted to them.
  // split this progress evenly across the pages

  constructor (progressStart, progressEnd, pagecount) {
    this.progressStart = progressStart
    this.progressEnd = progressEnd
    this.pagecount = (pagecount === undefined ? 0 : pagecount)
    this.debug = false
  }

  increment () {
    const progressPercentPerPage = (this.progressEnd - this.progressStart) / this.pagecount
    let newProgress = progressbar.getProgress() + progressPercentPerPage
    newProgress = Math.min(newProgress, this.progressEnd) // never increment over the target (shouldn't happen, but this is way it's failsafe)
    progressbar.setProgress(newProgress)
    if (this.debug) {
      console.log('Incremented progressbar to ' + newProgress + ' via PerPageProgress.increment().', progressbar.getProgress())
    }
  }
}

/*

==============================
Specific comparison helper functions
==============================

*/

// for comparison part 0
function pingForeignWiki () {
  const errortext = localizedText('cpl-error-foreignwiki', formInput.foreignWiki, `<a href="${getLocalUrl('Special:Interwiki')}">Special:Interwiki</a>`)

  return new Promise((resolve, reject) => {
    foreignUrl = interwikiMap[formInput.foreignWiki]
    if (foreignUrl.endsWith('/wiki/$1')) {
      foreignUrl = foreignUrl.slice(0, -8)
      getForeignUrl = page => interwikiMap[formInput.foreignWiki].replace('$1', page) // define global function
    }

    const urlParams = $.param(ApiQueryParams.siteinfo())
    const foreignApiUrl = foreignUrl + '/api.php?format=json&' + urlParams

    $.getJSON(foreignApiUrl)

      .done(siteinfo => {
        if (siteinfo.query !== undefined && siteinfo.query.general !== undefined && siteinfo.query.general.base !== undefined) {
          resolve(siteinfo.query.general.base)
        } else {
          errorDuringProcess({}, errortext)
          reject(Error('siteinfo has an unexpected format!'))
        }
      })

      .fail(errordata => {
        errorDuringProcess(errordata, errortext)
        reject(Error('getting JSON of siteinfo API query from foreign wiki failed! URL: ' + foreignApiUrl))
      })
  })
}

// for comparison part 2
function stringAboutLimitIfNecessary () {
  if (pagelist.isCutOffByLimit()) {
    return localizedText('cpl-log-cutoff', pagelist.rawApiResult.limits[apiLimitKeyName[formInput.pagelistMethod]])
  }
  return ''
}

// for comparison part 2
function loadNamespaces () {
  return new Promise((resolve, reject) => {
    const localNamespacesLocalized = mw.config.get('wgFormattedNamespaces')
    let localNamespacesCanonical = {}

    new mw.Api().get(ApiQueryParams.localNamespaces())

      .done(namespacesInfo => {
        if (namespacesInfo.query === undefined || namespacesInfo.query.namespaces === undefined) {
          // couldn't get any info about the canonical names of local namespaces
          // so just assume they are the same as the localized ones
          localNamespacesCanonical = localNamespacesLocalized
        } else {
          for (const nsId in namespacesInfo.query.namespaces) {
            const nsInfo = namespacesInfo.query.namespaces[nsId]
            // fallback to localized name if canonical unavailable
            localNamespacesCanonical[nsId] = nsInfo.canonical || nsInfo['*']
          }
        }
        nsData.localNamespacesLocalized = localNamespacesLocalized
        nsData.localNamespacesCanonical = localNamespacesCanonical
        resolve()
      })

      .fail(errordata => {
        errorDuringProcess(errordata, localizedText('cpl-error-canonicalns'))
        reject(Error('getting local namespaces failed!'))
      })
  })
}

// for comparison part 4
class ValidLocalPageFilterer {
  static filter () {
    let filterPromise
    switch (formInput.matchingMethod) {
      case MatchingMethod.Iwlink:
        filterPromise = ValidLocalPageFilterer._filterBasedOnIwlinks()
        break
      case MatchingMethod.Pagetitle:
        filterPromise = ValidLocalPageFilterer._filterBasedOnPagetitle()
        break

      default:
        filterPromise = Promise.resolve() // no filtering
        break
    }

    return new Promise((resolve, reject) => {
      filterPromise
        .then(() => { resolve() })
        .catch(error => { reject(error) })
    })
  }

  static _filterBasedOnIwlinks () {
    // iterate over all pages and only keep those that have an interwiki link to the foreign wiki
    return new Promise((resolve, reject) => {
      for (const pageid in pagelist.pages) {
        if (Object.hasOwnProperty.call(pagelist.pages, pageid)) {
          // we already checked langlinks in pagelist.addForeignTitles.
          // pages with no langlinks got an undefined foreignTitle there
          if (pagelist.pages[pageid].foreignTitle === undefined) {
            delete pagelist.pages[pageid]
          }
        }
      }
      resolve()
    })
  }

  static _filterBasedOnPagetitle () {
    // make an API call on the foreign wiki with all page titles of the local wiki
    return new Promise((resolve, reject) => {
      // get the foreign titles of all local pages and connect them to the local page IDs
      const foreignTitleToLocalPageId = {} // object to combine
      const foreignTitles = []
      for (const pageid in pagelist.pages) {
        if (Object.hasOwnProperty.call(pagelist.pages, pageid)) {
          const localPageData = pagelist.pages[pageid]
          if (localPageData.foreignTitle !== undefined) {
            foreignTitles.push(localPageData.foreignTitle)
            foreignTitleToLocalPageId[localPageData.foreignTitle] = pageid
          }
        }
      }
      if (debug) { console.log('Foreign titles:', foreignTitles) }

      // check the existence of each page, via an API request to the foreign wiki.
      // the list of pages may be too long for a single API request (Error 414 URI Too Long),
      // so split it up into groups, which are short enough to avoid the error when concatenated
      const urilengthHardLimit = 8000 // character limit to avoid the error

      // array where each element is a list of pages ("group") that will be used in the same API request
      const titles = [[]]
      let groupIndex = 0
      // iterate over the page list
      foreignTitles.forEach(foreignTitle => {
        // check: has the current group reached the limit?
        const urlParamTitle = $.param({ title: titles[groupIndex].join('|') })
        if (urlParamTitle.length > urilengthHardLimit - 200) {
          // it has, so start a new group
          groupIndex++
          titles.push([])
        }
        // add the current page to the last group
        titles[groupIndex].push(foreignTitle)
      })
      // titles is now e.g.: [ ['page1', 'page2', 'page3'], ['page4'] ]
      if (debug) { console.log('Title groups:', titles) }

      const promises = []

      // now make the API request for each group
      titles.forEach(foreignTitles => {
        const urlParams = $.param(ApiQueryParams.pagesExistence(foreignTitles.join('|')))
        const foreignApiUrl = foreignUrl + '/api.php?format=json&' + urlParams

        promises.push(
          new Promise((resolve, reject) => {
            $.getJSON(foreignApiUrl)
              .done(foreignPagesExistence => {
                if (debug) { console.log('Foreign API result:', foreignPagesExistence) }

                let localPageIdsToDelete = []

                if (foreignPagesExistence.query !== undefined && foreignPagesExistence.query.pages !== undefined) {
                  // iterate over the pages in the foreign API result
                  for (const foreignPageId in foreignPagesExistence.query.pages) {
                    if (foreignPageId >= 0) {
                      // skip pages with positive IDs (which denote existence)
                      continue
                    }

                    // based on the title of the current page, get the ID of the local page
                    const foreignTitle = foreignPagesExistence.query.pages[foreignPageId].title
                    const localPageId = foreignTitleToLocalPageId[foreignTitle]
                    // add this to the list of local page IDs that should be deleted in the pagelist
                    localPageIdsToDelete.push(localPageId)
                  }
                } else {
                  // cannot get info about page existence on the foreign wiki,
                  // so assume that no pages in this group are valid
                  localPageIdsToDelete = foreignTitles.map(foreignTitle => foreignTitleToLocalPageId[foreignTitle])
                }
                resolve(localPageIdsToDelete)
              })

              .fail(errordata => {
                errorDuringProcess(errordata, localizedText('cpl-error-foreignpages', formInput.foreignWiki))
                reject(Error('getting JSON of foreign page existence API query failed! URL: ' + foreignApiUrl))
              })
          })
        )
      })

      Promise.all(promises)
        .then(localPageIdsToDeleteArray => {
          // in the localPageIdsToDeleteArray, each element is a list of local page IDs to delete,
          // from each of the API requests
          localPageIdsToDeleteArray = [].concat(...localPageIdsToDeleteArray) // combine them all into one array
          if (debug) { console.log('Deleting the following local page IDs from the pagelist:', localPageIdsToDeleteArray) }
          localPageIdsToDeleteArray.forEach(localPageId => {
            delete pagelist.pages[localPageId]
          })
          resolve()
        })
        .catch(error => { reject(error) }) // an error occurred in any of the API requests, just pass it through
    })
  }
}

// for comparison part 5
function getLocalDiffsizeForOnePage (parentid, revid) {
  return new Promise((resolve, reject) => {
    if (parentid === 0) {
      // this is a new page, revid is the first revision ID of the page
      resolve()
    }

    const apiparams = ApiQueryParams.diffSize(parentid, revid)
    new mw.Api().get(apiparams)
      .done(apiresult => {
        let diffSize
        if (apiresult.compare !== undefined && apiresult.compare.fromsize !== undefined && apiresult.compare.tosize !== undefined) {
          diffSize = apiresult.compare.tosize - apiresult.compare.fromsize
        }
        resolve(diffSize)
      })
      .fail(errordata => {
        resolve()
      })
  })
}

// for comparison part 5
function getForeignDiffsizeForOnePage (parentid, revid) {
  return new Promise((resolve, reject) => {
    if (parentid === 0) {
      // this is a new page, revid is the first revision ID of the page
      resolve()
    }

    const urlParams = $.param(ApiQueryParams.diffSize(parentid, revid))
    const foreignApiUrl = foreignUrl + '/api.php?format=json&' + urlParams

    $.getJSON(foreignApiUrl)

      .done(apiresult => {
        let diffSize
        if (apiresult.compare !== undefined && apiresult.compare.fromsize !== undefined && apiresult.compare.tosize !== undefined) {
          diffSize = apiresult.compare.tosize - apiresult.compare.fromsize
        }
        resolve(diffSize)
      })

      .fail(errordata => {
        errorDuringProcess(errordata, localizedText('cpl-error-foreigndiff', formInput.foreignWiki))
        reject(Error('getting JSON of foreign compare API query failed! URL: ' + foreignApiUrl))
      })
  })
}

// for comparison part 5
function getForeignRevsSinceCutoff (foreignPagename, latestLocalTimestamp) {
  return new Promise((resolve, reject) => {
    const apiparams = ApiQueryParams.revisions(latestLocalTimestamp, foreignPagename)
    const foreignApiUrl = foreignUrl + '/api.php?format=json&' + $.param(apiparams)

    $.getJSON(foreignApiUrl, foreignData => {
      if (foreignData.query === undefined || foreignData.query.pages === undefined) {
        resolve()
        return
      }

      const foreignPageData = foreignData.query.pages[Object.keys(foreignData.query.pages)[0]]

      if (foreignPageData.revisions === undefined) {
        resolve()
        return
      }

      const foreignRevs = []
      foreignPageData.revisions.forEach(foreignPageRev => {
        foreignRevs.push(foreignPageRev)
      })
      resolve(foreignRevs)
    })
  })
}

// for comparison part 5
function getDiffSizesForAllForeignRevsOfOnePage (foreignrevs) {
  return new Promise((resolve, reject) => {
    if (foreignrevs === undefined || foreignrevs.length === 0) {
      resolve()
    }

    const allRevsWithoutLastRev = foreignrevs.slice(0, -1)
    const lastrev = foreignrevs[foreignrevs.length - 1]

    // we can get the diffsizes for all revs easily, because we have the array of consecutive revs
    allRevsWithoutLastRev.forEach((rev, index) => {
      foreignrevs[index].diffsize = foreignrevs[index].size - foreignrevs[index + 1].size
    })

    // we can't get it for the last rev, though, so we get that one via the API
    getForeignDiffsizeForOnePage(lastrev.parentid, lastrev.revid)
      .then(diffSize => {
        foreignrevs[foreignrevs.length - 1].diffsize = (diffSize !== undefined ? diffSize : foreignrevs[foreignrevs.length - 1].size)
        resolve(foreignrevs)
      })
      .catch(error => { reject(error) })
  })
}

// for comparison part 7
function preparePagedataLocalForOutput (pagedata, dateformatsDate, dateformatsTime) {
  const localLatestRev = pagedata.revisions[0]
  const localTimestamp = new Date(localLatestRev.timestamp)

  return {
    timestampMillis: localTimestamp.getTime(), // timestamp in milliseconds since epoch, for sorting
    revid: localLatestRev.revid,
    timestamp: [
      localTimestamp.getUTCFullYear(),
      padDateTime(localTimestamp.getUTCMonth() + 1),
      padDateTime(localTimestamp.getUTCDate()),
      padDateTime(localTimestamp.getUTCHours()),
      padDateTime(localTimestamp.getUTCMinutes()),
      padDateTime(localTimestamp.getUTCSeconds())
    ].join(''), // 20210610085405
    isnew: localLatestRev.parentid === 0,
    isminor: localLatestRev.minor !== undefined,
    timestampsDateFormatted: doFormat(dateformatsDate, localTimestamp), // 07/07/2020
    timestampsTimeFormatted: doFormat(dateformatsTime, localTimestamp), // 21:15
    pagename: pagedata.title,
    pagelink: getLocalUrl(pagedata.title),
    difflink: getLocalUrl(`${pagedata.title}?diff=${localLatestRev.revid}`),
    histlink: getLocalUrl(`${pagedata.title}?action=history`),
    isBigEdit: Math.abs(localLatestRev.diffsize) > 500,
    diffsize: localLatestRev.diffsize,
    newsize: localLatestRev.size,
    userlink: getLocalUrl(`User:${localLatestRev.user}`),
    username: localLatestRev.user,
    usertalklink: getLocalUrl(`User_talk:${localLatestRev.user}`),
    usercontribslink: getLocalUrl(`Special:Contributions/${localLatestRev.user}`),
    summary: localLatestRev.parsedcomment
  }
}

// for comparison part 7
function preparePagedataForeignForOutput (pagedata, dateformats, dateformatsDate, dateformatsTime) {
  const foreignRevData = []

  for (const foreignRevIndex in pagedata.foreignRevisions) {
    if (Object.hasOwnProperty.call(pagedata.foreignRevisions, foreignRevIndex)) {
      const foreignRev = pagedata.foreignRevisions[foreignRevIndex]

      const revTimestamp = new Date(foreignRev.timestamp)

      foreignRevData.push({
        timestampMillis: revTimestamp.getTime(), // timestamp in milliseconds since epoch, for sorting
        revid: foreignRev.revid,
        timestamp: [
          revTimestamp.getUTCFullYear(),
          padDateTime(revTimestamp.getUTCMonth() + 1),
          padDateTime(revTimestamp.getUTCDate()),
          padDateTime(revTimestamp.getUTCHours()),
          padDateTime(revTimestamp.getUTCMinutes()),
          padDateTime(revTimestamp.getUTCSeconds())
        ].join(''), // 20210610085405
        isnew: foreignRev.parentid === 0,
        isminor: foreignRev.minor !== undefined,
        pagename: pagedata.foreignTitle,
        permalink: getForeignUrl(`${pagedata.foreignTitle}?oldid=${foreignRev.revid}`),
        timestampsDateFormatted: doFormat(dateformatsDate, revTimestamp), // 07/07/2020
        timestampsTimeFormatted: doFormat(dateformatsTime, revTimestamp), // 21:15
        timestampsFormatted: doFormat(dateformats, revTimestamp), // 07/07/20, 21:15
        curdifflink: getForeignUrl(`${pagedata.foreignTitle}?diff=0&oldid=${foreignRev.revid}`),
        pagelink: getForeignUrl(pagedata.foreignTitle),
        difflink: getForeignUrl(`${pagedata.foreignTitle}?diff=${foreignRev.revid}`),
        histlink: getForeignUrl(`${pagedata.foreignTitle}?action=history`),
        isBigEdit: Math.abs(foreignRev.diffsize) > 500,
        diffsize: foreignRev.diffsize,
        newsize: foreignRev.size,
        userlink: getForeignUrl(`User:${foreignRev.user}`),
        username: foreignRev.user,
        usertalklink: getForeignUrl(`User_talk:${foreignRev.user}`),
        usercontribslink: getForeignUrl(`Special:Contributions/${foreignRev.user}`),
        summary: foreignRev.parsedcomment
      })
    }
  }

  const foreignInfo = {
    isGroup: foreignRevData.length > 1,
    revisions: foreignRevData,
    firstLine: {} // data about the line that combines all revisions
  }

  if (foreignInfo.isGroup) {
    let totalDiffSize = 0
    const usersCount = {}
    foreignRevData.forEach(revdata => {
      totalDiffSize += revdata.diffsize
      if (usersCount[revdata.username] !== undefined) {
        usersCount[revdata.username]++
      } else {
        usersCount[revdata.username] = 1
      }
    })
    const users = []
    for (const username in usersCount) {
      if (Object.hasOwnProperty.call(usersCount, username)) {
        users.push({
          userlink: getForeignUrl(`User:${username}`),
          username: username,
          userRevcount: usersCount[username]
        })
      }
    }
    foreignInfo.firstLine = {
      timestamp: foreignRevData[0].timestamp, // 20210610085405
      isminor: foreignRevData.every(revdata => revdata.isminor), // are all edits minor?
      timestampsDateFormatted: foreignRevData[0].timestampsDateFormatted, // 07/07/2020
      timestampsTimeFormatted: foreignRevData[0].timestampsTimeFormatted, // 21:15
      pagelink: getForeignUrl(pagedata.foreignTitle),
      pagename: pagedata.foreignTitle,
      isnew: foreignRevData.some(revdata => revdata.isnew), // is any edit a new page?
      difflink: getForeignUrl(`${pagedata.foreignTitle}?diff=${foreignRevData[0].revid}&oldid=${pagedata.foreignRevisions[pagedata.foreignRevisions.length - 1].parentid}`),
      changesCount: foreignRevData.length,
      histlink: getForeignUrl(`${pagedata.foreignTitle}?action=history`),
      isBigEdit: Math.abs(totalDiffSize) > 500,
      diffsize: totalDiffSize,
      newsize: foreignRevData[0].newsize,
      users: users
    }
  }

  return foreignInfo
}

function doFormat (formatsObject, dataToFormat) {
  return mapForObject(
    formatsObject,
    ([lang, format]) => ({[lang]: format.format(dataToFormat)})
  )
}

class FailedConfirmationError extends Error {
  constructor () {
    super('Process was terminated because the user did not confirm a dialog.')
  }
}

/*

==============================
Display output
==============================

*/

function jQueryToString (possibleJqueryElement) {
  if (possibleJqueryElement instanceof jQuery) {
    return possibleJqueryElement[0].outerHTML
  }
  return possibleJqueryElement
}

function outputLog (logtext) {
  logtext = jQueryToString(logtext)
  msgWidget.setLabel(new OO.ui.HtmlSnippet(msgWidget.getLabel() + '<br/>' + logtext))
  localizeAll(msgWidget.id)
}

function addToLastLog (logtext) {
  logtext = jQueryToString(logtext)
  msgWidget.setLabel(new OO.ui.HtmlSnippet(msgWidget.getLabel() + logtext))
  localizeAll(msgWidget.id)
}

function outputError (errortext, additionaltext) {
  errortext = jQueryToString(errortext)
  additionaltext = jQueryToString(additionaltext)
  const newMsgWidget = new OO.ui.MessageWidget({
    type: 'error',
    label: new OO.ui.HtmlSnippet(errortext + (additionaltext === undefined ? '' : '<br/>' + localizedText('cpl-error-details')[0].outerHTML + additionaltext))
})
  $(logElement).append(newMsgWidget.$element)
  localizeAll(newMsgWidget.id)
}

function outputSuccess (successtext) {
  successtext = jQueryToString(successtext)
  const newMsgWidget = new OO.ui.MessageWidget({
    type: 'success',
    label: new OO.ui.HtmlSnippet(successtext)
  })
  $(logElement).append(newMsgWidget.$element)
  localizeAll(newMsgWidget.id)
}

function confirmationDialog (text, dialogtitle) {
  text = jQueryToString(text)
  dialogtitle = jQueryToString(dialogtitle)
  return new Promise((resolve, reject) => {
    OO.ui.confirm(text, { title: dialogtitle }).done(confirmed => {
      if (confirmed) {
        resolve()
      } else {
        reject(new FailedConfirmationError())
      }
    })
  })
}

function loadMessagesInAllLanguages () {
  const apiPromises = []
  for (const lang in l10nTable) {
    apiPromises.push(
      new mw.Api().getMessages(msgs, { amlang: lang })
        .fail(errordata => {
          errorDuringProcess(errordata, localizedText('cpl-error-messages'))
          reject(Error('getMessages failed for ' + lang + '!'))
        })
    )
  }
  return apiPromises
}

function loadTablesorter () {
  return mw.loader.using('jquery.tablesorter')
    .fail(errordata => {
      errorDuringProcess(errordata, localizedText('cpl-error-sorter'))
      reject(Error('loading jquery.tablesorter failed!'))
    })
}

function loadMakeCollapsible () {
  return mw.loader.using('jquery.makeCollapsible')
    .fail(errordata => {
      errorDuringProcess(errordata, localizedText('cpl-error-collapse'))
      reject(Error('loading jquery.makeCollapsible failed!'))
    })
}

function registerMessagesToL10n (messagesData) {
  const mwL10nTable = {}
  let langIndex = -1
  for (const lang of Object.keys(l10nTable)) {
    langIndex++
    mwL10nTable[lang] = {}
    for (const key in messagesData[langIndex]) {
      mwL10nTable[lang]['⧼' + key + '⧽'] = messagesData[langIndex][key]
    }
  }
  return $.i18n().load(mwL10nTable)
}

function registerTimestampsToL10n () {
  return $.i18n().load(timestampsToLocalize)
}

function displayOutput () {
  return new Promise((resolve, reject) => {
    // load "MediaWiki:" system messages (i18n) and libraries that enables table sorting and collapsing
    Promise.all([
      ...loadMessagesInAllLanguages(),
      loadTablesorter(), // TODO: Move to gadget definition
      loadMakeCollapsible() // TODO: Move to gadget definition
    ])
    .then(data => registerMessagesToL10n(data.slice(0, -2))) // remove the last array elements, which are the promise results of loadTablesorter() and loadMakeCollapsible()

    // with the loaded messages and table sortability, make the output
    .then(() => OutputMaker.make(new PerPageProgress(90, 96)))

    // add output to DOM in order to localize it
    .then(outputNodes => {
      $(outputElement)
        .hide() // hide it at first, still need to localize it
        .append(...outputNodes)
      prepareAttributesForI18n()
      return registerTimestampsToL10n()
    })
    .then(() => {
      localizeAll()
      $(outputElement).show() // display the output now
      progressbar.setProgress(98)
      $('.comparepagelist-makeCollapsible').makeCollapsible()
      resolve()
    })
    .catch(errordata => {
      errorDuringProcess(errordata, localizedText('cpl-error-makingoutput'))
      reject(errordata)
    })
  })
}

class OutputMaker {
  static make (perPageProgress) {
    const bigWrapperTable = $('<table>')
      .addClass(wrapperTableClasses)
      .append(
        $('<thead>').append(
          $('<tr>').append(
            $('<th>').html(localizedText('cpl-output-tableheadlocal')),
            $('<th>').html(localizedText('cpl-output-tableheadforeign', formInput.foreignWiki))
          )
        )
      )
    const bigWrapperTBody = $('<tbody>')
    bigWrapperTable.append(bigWrapperTBody)

    perPageProgress.pagecount = pagelistForOutput.length
    pagelistForOutput.forEach(pagedata => {
      const tableRow = $('<tr>').attr('valign', 'top')

      // each page row has two cells: local and foreign

      // local cell
      // the "expand" arrow cell is not needed for the local page, because there is only one revision in all rows there
      tableRow.append(OutputMaker.cellForSingleRevision(pagedata.local, true))

      // foreign cell
      if (pagedata.foreign.isGroup) {
        // there are multiple revisions to display
        tableRow.append(OutputMaker.cellForRevisionGroup(pagedata.foreign))
      } else {
        // there is only one revision to display
        tableRow.append(OutputMaker.cellForSingleRevision(pagedata.foreign.revisions[0], false))
      }

      perPageProgress.increment()

      bigWrapperTBody.append(tableRow)
    })
    bigWrapperTable.tablesorter() // make the table sortable

    const note = $('<span>')
      .addClass(noteClasses)
      .html(localizedText('cpl-output-timezone'))

    return [bigWrapperTable, note]
  }

  static expandArrow (hideCell, showArrow) {
    const expandArrowClasses = ['mw-enhancedchanges-arrow-space']
    if (showArrow) {
      expandArrowClasses.push(
        'mw-collapsible-toggle',
        'mw-collapsible-arrow',
        'mw-enhancedchanges-arrow',
        'mw-collapsible-toggle-collapsed'
      )
    }

    const cell = $('<td>')
      .append(
        $('<span>')
          .addClass(expandArrowClasses)
          .attr('tabIndex', 0)
      )

    if (hideCell) {
      cell.hide()
    }

    return cell
  }

  static flagsCell (isnew, isminor) {
    let flagNew, flagMinor

    if (isnew) {
      flagNew = $('<abbr>')
        .addClass('newpage')
        .html(localizedText('newpageletter')) // 'N'
        .attr('title', localizedAttribute('title', 'recentchanges-label-newpage')) // 'This edit created a new page'
    } else {
      flagNew = nbsp()
    }

    if (isminor) {
      flagMinor = $('<abbr>')
        .addClass('minoredit')
        .html(localizedText('minoreditletter')) // 'm'
        .attr('title', localizedAttribute('title', 'recentchanges-label-minor')) // 'This is a minor edit'
    } else {
      flagMinor = nbsp()
    }

    const cell = $('<td>')
      .addClass('mw-enhanced-rc')
      .append(flagNew, flagMinor, nbsp(), nbsp())

    return cell
  }

  static flagsAndTimestamp (isnew, isminor, datesFormatted, timesFormatted) {
    const cell = OutputMaker.flagsCell(isnew, isminor)[0]

    // remove the last nbsp in the flags cell
    cell.childNodes[cell.childNodes.length - 1].remove()

    $(cell).append(
      localizedTimestamp(datesFormatted),
      nbsp(),
      br(),
      nbsp(), nbsp(), nbsp(),
      localizedTimestamp(timesFormatted),
      nbsp()
    )

    return cell
  }

  static articleLink (pagelink, pagename, noWrapper) {
    const articleLink = $('<span>')
      .addClass('mw-title')
      .append(
        $('<a>')
          .addClass(['mw-changeslist-title', 'extiw'])
          .text(pagename)
          .attr({
            href: pagelink,
            title: pagename
          })
      )

    if (noWrapper) {
      return articleLink
    }

    const articleLinkWrapper = $('<span>')
      .addClass('mw-changeslist-line-inner-articleLink')
      .append(' ', articleLink)

    return articleLinkWrapper
  }

  static revisionLink (permalink, pagename, timestampsFormatted) {
    const revisionLink = $('<span>')
      .addClass('mw-enhanced-rc-time')
      .append(
        $('<a>')
          .html(localizedTimestamp(timestampsFormatted))
          .attr({
            href: permalink,
            title: pagename
          })
      )

    return revisionLink
  }

  static historyLinks (isnew, difflink, histlink, pagename) {
    // diff link
    const diffLink = $('<span>')
    const diffText = localizedText('diff') // 'diff'
    if (isnew) {
      // new page, no link necessary
      diffLink.html(diffText)
    } else {
      diffLink.append($('<a>')
        .addClass(['mw-changeslist-diff', 'extiw'])
        .html(diffText)
        .attr('href', difflink)
      )
    }

    // hist link
    const histLink = $('<span>')
      .append(
        $('<a>')
          .addClass('mw-changeslist-history')
          .html(localizedText('hist')) // 'hist'
          .attr({
            href: histlink,
            title: pagename
          })
      )

    // diff link and hist link combined
    const historyLinks = $('<span>')
      .addClass('mw-changeslist-line-inner-historyLink')
      .append(
        ' ',
        $('<span>')
          .addClass('mw-changeslist-links')
          .append(diffLink, histLink)
      )

    return historyLinks
  }

  static curPrevLinks (curdifflink, isnew, difflink, pagename) {
    // cur link
    const curLink = $('<a>')
      .addClass('mw-changeslist-diff-cur')
      .html(localizedText('cur')) // 'cur'
      .attr('href', curdifflink)

    // prev link
    const prevText = localizedText('last') // 'prev'
    let prevLink
    if (isnew) {
      prevLink = prevText
    } else {
      prevLink = $('<a>')
        .addClass('mw-changeslist-diff')
        .html(prevText)
        .attr({
          href: difflink,
          title: pagename
        })
      prevLink = prevLink[0].outerHTML
    }

    const textInParen = localizedTextWithReparse('textInParen', () => {
      return localizedTextRaw('parentheses').replace('$1',
        curLink[0].outerHTML +
        localizedTextRaw('pipe-separator') +
        prevLink
      )
    })

    const separator = $('<span>').addClass('mw-changeslist-separator')

    const parsedhtml = $.parseHTML(
      ' ' +
      textInParen +
      ' ' +
      separator[0].outerHTML +
      ' '
    )

    return parsedhtml
  }

  static groupHistoryLinks (isnew, difflink, pagename, changesCount, histlink) {
    // changes link
    const changesLinkWrapper = $('<span>')
    const changesLinkText = localizedText('nchanges', changesCount)
    if (isnew) {
      changesLinkWrapper.append(changesLinkText)
    } else {
      changesLinkWrapper.append(
        $('<a>')
          .addClass('mw-changeslist-groupdiff')
          .html(changesLinkText)
          .attr({
            href: difflink,
            title: pagename
          })
      )
    }

    // history link
    const historyLink = $('<a>')
      .addClass('mw-changeslist-history')
      .html(localizedText('enhancedrc-history')) // 'history'
      .attr({
        href: histlink,
        title: pagename
      })

    // changes link and history link combined
    const groupHistoryLinks = $('<span>')
      .addClass('mw-changeslist-links')
      .append(
        changesLinkWrapper,
        ' ',
        $('<span>').append(historyLink)
      )

    return groupHistoryLinks
  }

  static separator (classname) {
    const separatorWrapper = $('<span>')
      .addClass(classname)
      .append(
        ' ',
        $('<span>').addClass('mw-changeslist-separator'),
        ' '
      )

    return separatorWrapper
  }

  static characterDiff (isBigEdit, diffsize, newsize, noWrapper) {
    const characterDiff = $(isBigEdit ? '<strong>' : '<span>')
      .addClass('mw-diff-bytes')
      .html(localizedNumber(diffsize, 'withsign'))
      .attr({
        dir: 'ltr',
        // the newsize number is not localized here because localization would get too convoluted:
        // a localized number that is the parameter for a localization of an attribute
        title: localizedAttribute('title', 'rc-change-size-new', newsize)
      })

    let diffClass = 'mw-plusminus-'
    diffClass += (diffsize === 0 ? 'null' : (diffsize > 0 ? 'pos' : 'neg'))
    characterDiff.addClass(diffClass)

    if (noWrapper) {
      return characterDiff
    }

    const characterDiffWrapper = $('<span>')
      .addClass('mw-changeslist-line-inner-characterDiff')
      .append(characterDiff)

    return characterDiffWrapper
  }

  static userLink (userlink, username, noWrapper) {
    const userLink = $('<a>')
      .addClass(['mw-userlink', 'userlink'])
      .attr({
        href: userlink,
        title: `${nsData.localNamespacesLocalized[2]}:${username}`
      })
      .append(
        $('<bdi>').text(username)
      )

    if (noWrapper) {
      return userLink
    }

    const userLinkWrapper = $('<span>')
      .addClass('mw-changeslist-line-inner-userLink')
      .append(userLink)

    return userLinkWrapper
  }

  static groupUsers (users) {
    const groupUsersArray = []

    users.forEach(userinfo => {
      const userLink = $('<a>')
        .addClass(['mw-userlink', 'userlink'])
        .attr({
          href: userinfo.userlink,
          title: `${nsData.localNamespacesLocalized[2]}:${userinfo.username}`
        })
        .append(
          $('<bdi>').text(userinfo.username)
        )

      let groupUser = userLink[0].outerHTML

      if (userinfo.userRevcount > 1) {
        groupUser +=
          ' ' +
          localizedTextWithReparse('userNtimes', () => {
            return localizedTextRaw('parentheses',
              localizedTextRaw('ntimes', userinfo.userRevcount)
            )
          })
      }

      groupUsersArray.push(groupUser)
    })

    const textInBrackets = localizedTextWithReparse('textInBrackets', () => {
      return localizedTextRaw('brackets').replace('$1',
        groupUsersArray.join(localizedTextRaw('semicolon-separator'))
      )
    })

    const groupUsersWrapper = $('<span>')
      .addClass('changedby')
      .append($.parseHTML(textInBrackets))

    return groupUsersWrapper
  }

  static userToolLinks (username, usertalklink, usercontribslink, noWrapper) {
    // user talk link
    const talkLink = $('<span>')
      .append(
        $('<a>')
          .addClass('mw-usertoollinks-talk')
          .html(localizedText('talkpagelinktext'))
          .attr({
            href: usertalklink,
            title: `${nsData.localNamespacesLocalized[3]}:${username}` // TODO: localize
          })
      )

    // user contribs link
    const userContribsLinkWrapper = $('<span>')
      .append(
        $('<a>')
          .addClass('mw-usertoollinks-contribs')
          .html(localizedText('contribslink'))
          .attr({
            href: usercontribslink,
            title: `Special:Contributions/${username}` // TODO: localize
          })
      )

    // user talk link and contribs link combined
    const userToolLinks = $('<span>')
      .addClass(['mw-usertoollinks', 'mw-changeslist-links'])
      .append(talkLink, ' ', userContribsLinkWrapper)

    if (noWrapper) {
      return userToolLinks
    }

    const userToolLinksWrapper = $('<span>')
      .addClass('mw-changeslist-line-inner-userTalkLink')
      .append(' ', userToolLinks)

    return userToolLinksWrapper
  }

  static comment (summary) {
    const comment = $('<span>')
      .addClass('mw-changeslist-line-inner-comment')

    if (summary !== '') {
      comment.append(
        ' ',
        $('<span>')
          .addClass(['comment', 'comment--without-parentheses'])
          .append(
            $('<span>')
              .html(summary)
              .attr({
                dir: 'auto'
              })
          )
      )
    }

    return comment
  }

  static commentSimple (summary) {
    if (summary) {
      const comment = $('<span>')
        .addClass(['comment', 'comment--without-parentheses'])
        .html(summary)

      return comment
    }
  }

  static cellForSingleRevision (revdata, hideExpandArrowCell) {
    // ====== First column ======
    const firstColumn = OutputMaker.expandArrow(hideExpandArrowCell)

    // ====== Second column ======
    // flags and timestamp
    const secondColumn = OutputMaker.flagsAndTimestamp(
      revdata.isnew, revdata.isminor,
      revdata.timestampsDateFormatted, revdata.timestampsTimeFormatted
    )

    // ====== Third column ======
    // all other information about the page
    const thirdColumn = $('<td>')
      .addClass('mw-changeslist-line-inner')
      .attr('data-target-page', revdata.pagename)

    thirdColumn.append(
      // article link
      OutputMaker.articleLink(revdata.pagelink, revdata.pagename),

      // history links
      OutputMaker.historyLinks(
        revdata.isnew, revdata.difflink,
        revdata.histlink, revdata.pagename
      ),

      // separator after links
      OutputMaker.separator('mw-changeslist-line-inner-separatorAfterLinks'),

      // character diff
      OutputMaker.characterDiff(
        revdata.isBigEdit, revdata.diffsize,
        revdata.newsize
      ),

      // separator after character diff
      OutputMaker.separator('mw-changeslist-line-inner-separatorAftercharacterDiff'),

      // user link
      OutputMaker.userLink(revdata.userlink, revdata.username),

      // user talk and contribs links
      OutputMaker.userToolLinks(revdata.username, revdata.usertalklink, revdata.usercontribslink),

      // edit summary
      OutputMaker.comment(revdata.summary)
    )

    const tableInCell = $('<table>')
      .addClass([
        'mw-enhanced-rc',
        'mw-changeslist-line',
        'mw-changeslist-edit'
      ])
      .attr({
        'data-mw-revid': revdata.revid,
        'data-mw-ts': revdata.timestamp
      })

    const cell = $('<td>')
      .append(
        tableInCell.append(
          $('<tbody>').append(
            $('<tr>').append(firstColumn, secondColumn, thirdColumn)
          )
        )
      )
      .css('vertical-align', 'top')
      .attr('data-sort-value', revdata.timestamp)

    return cell
  }

  static firstRowOfRevisionGroup (revgroupdata) {
    // ====== First column ======
    const firstColumn = OutputMaker.expandArrow(false, true)

    // ====== Second column ======
    // flags and timestamp
    const secondColumn = OutputMaker.flagsAndTimestamp(
      revgroupdata.isnew, revgroupdata.isminor,
      revgroupdata.timestampsDateFormatted, revgroupdata.timestampsTimeFormatted
    )

    // ====== Third column ======
    // all other information about the page
    const thirdColumn = $('<td>')
      .addClass('mw-changeslist-line-inner')
      .attr('data-target-page', revgroupdata.pagename)

    thirdColumn.append(
      // article link
      OutputMaker.articleLink(revgroupdata.pagelink, revgroupdata.pagename, true),
      ' ',

      // history links
      OutputMaker.groupHistoryLinks(
        revgroupdata.isnew, revgroupdata.difflink,
        revgroupdata.pagename, revgroupdata.changesCount,
        revgroupdata.histlink
      ),

      // separator after links
      $('<span>').addClass('mw-changeslist-separator'),

      // character diff
      OutputMaker.characterDiff(
        revgroupdata.isBigEdit, revgroupdata.diffsize,
        revgroupdata.newsize
      ),

      // separator after character diff
      ' ',
      $('<span>').addClass('mw-changeslist-separator'),

      // user link
      OutputMaker.userLink(revgroupdata.userlink, revgroupdata.username),

      // user talk and contribs links
      OutputMaker.groupUsers(revgroupdata.users)
    )

    const row = $('<tr>').append(firstColumn, secondColumn, thirdColumn)

    return row
  }

  static rowOfRevisionGroup (revdata) {
    // ====== First column ======
    // the "expand" arrow
    const firstColumn = OutputMaker.expandArrow(false)

    // ====== Second column ======
    // flags and timestamp
    const secondColumn = OutputMaker.flagsCell(revdata.isnew, revdata.isminor)

    // ====== Third column ======
    // all other information about the page
    const thirdColumn = $('<td>')
      .addClass('mw-enhanced-rc-nested')
      .attr('data-target-page', revdata.pagename)

    thirdColumn.append(
      // revision link
      OutputMaker.revisionLink(
        revdata.permalink, revdata.pagename,
        revdata.timestampsFormatted
      ),

      // cur-prev links
      OutputMaker.curPrevLinks(
        revdata.curdifflink, revdata.isnew,
        revdata.difflink, revdata.pagename
      ),

      // character diff
      OutputMaker.characterDiff(
        revdata.isBigEdit, revdata.diffsize,
        revdata.newsize, true
      ),

      // separator after character diff
      ' ',
      $('<span>').addClass('mw-changeslist-separator'),
      ' ',

      // user link
      OutputMaker.userLink(revdata.userlink, revdata.username, true),
      ' ',

      // user talk and contribs links
      OutputMaker.userToolLinks(
        revdata.username, revdata.usertalklink,
        revdata.usercontribslink, true
      ),
      ' ',

      // edit summary
      OutputMaker.commentSimple(revdata.summary)
    )

    const row = $('<tr>')
      .addClass([
        'mw-enhanced-rc',
        'mw-changeslist-line',
        'mw-changeslist-edit'
      ])
      .attr({
        'data-mw-revid': revdata.revid,
        'data-mw-ts': revdata.timestamp
      })
      .append(firstColumn, secondColumn, thirdColumn)

    return row
  }

  static cellForRevisionGroup (foreignpagedata) {
    const tableInCell = $('<table>')
      .addClass([
        'comparepagelist-makeCollapsible',
        'mw-collapsed',
        'mw-enhanced-rc',
        'mw-changeslist-line',
        'mw-changeslist-edit'
      ])
      .attr('data-mw-ts', foreignpagedata.firstLine.timestamp)

    const tbody = $('<tbody>')
      .append(OutputMaker.firstRowOfRevisionGroup(foreignpagedata.firstLine))

    foreignpagedata.revisions.forEach(foreignRev => {
      tbody.append(OutputMaker.rowOfRevisionGroup(foreignRev))
    })

    const cell = $('<td>')
      .append(tableInCell.append(tbody))
      .css('vertical-align', 'top')
      .attr('data-sort-value', foreignpagedata.firstLine.timestamp)

    return cell
  }
}

const nbsp = () => document.createTextNode(String.fromCodePoint(0x00A0))
const br = () => document.createElement('br')

const cplVersion = '3'


/*

==============================
Wiki-specific code
==============================

*/

// CSS classes for the output table
const wrapperTableClasses = ['terraria', 'lined']

// CSS classes for an element to make it appear as a less important note
const noteClasses = ['note-text']