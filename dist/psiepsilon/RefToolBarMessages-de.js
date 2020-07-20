// All user-facing messages
// TODO: Document usage
mw.usability.addMessages( { 
'cite-section-label' : 'Quellangabe',
'cite-template-list' : 'Vorlagen',
'cite-named-refs-label' : 'Benannte Referenz', //TODO
'cite-named-refs-title' : 'Benannte Referenz einfügen', //TODO
'cite-named-refs-button' : 'Benannte Referenzen',
'cite-named-refs-dropdown' : 'Benannte Referenzen', // Used on the top of the named refs list dropdown
'cite-errorcheck-label' : 'Fehlerprüfung',
'cite-errorcheck-button' : 'Auf Fehler prüfen',
'cite-dialog-web' : 'Web-Quelle',
'cite-dialog-news' : 'News-Quelle',
'cite-dialog-book' : 'Buchquelle',
'cite-dialog-journal' : 'Fachjournal',
'cite-form-submit' : 'Einfügen',
'cite-form-showhide' : 'Zusätzliche Felder anzeigen/verbergen',
'cite-no-namedrefs' : 'Keine Quellangaben auf dieser Seite gefunden',
'cite-namedrefs-intro' : "Name auswählen, um die Quellangabe zu sehen. \"Einfügen\" anklicken, um sie in den Text einzufügen.", //TODO: could use imparative form / formal version
'cite-raw-preview' : 'Wikitext:',
'cite-parsed-label' : 'Geparster Wikitext:',
'cite-form-parse' : 'Vorschau für Wikitext',
'cite-refpreview' : 'Vorschau',
'cite-name-label' : 'Referenz-Name', //TODO
'cite-group-label' : 'Referenzgruppe', //TODO
'cite-errorcheck-submit' : 'Prüfen',
'cite-errorcheck-heading' : 'Behebe die folgenden Fehler:', //TODO: needs formal!
'cite-error-unclosed' : 'Schlißendes <span style="font-family:monospace">&lt;/ref&gt;</span>-Tag fehlt.',
'cite-error-samecontent' : 'Mehrere Quellangaben mit gleichem Inhalt',
'cite-error-templates' : 'Quellangabe verwendet keine <a href="//en.wikipedia.org/wiki/Wikipedia:Citation_templates">Vorlage</a>',
'cite-error-repeated' : 'Mehrere Referenzen mit dem selben Namen',
'cite-error-undef' : 'Verwendung eines unbekannten Referenz-Namens',
'cite-error-samecontent-msg' : 'Mehrere Quellangaben haben den selben Inhalt: $1',
'cite-error-repeated-msg' : 'Mehrere Quellangaben haben den selben Namen: \'$1\'',
'cite-error-templates-msg' : 'Verwendet keine Vorlage: $1',
'cite-form-reset' : 'Formular zurücksetzen',
'cite-loading' : 'Daten werden geladen', // Shown while pagetext is being downloaded from the API
'cite-insert-date' : 'Aktuelles Datum einfügen', // Alt/title text for 'insert date' icon
'cite-err-report-heading' : 'Fehlerbericht für Quellangaben', // Heading for error report table
'cite-err-report-close' : 'Schließen', // Alt/title text for 'close' icon on error report
'cite-err-report-empty' : 'Keine Fehler gefunden', // Message displayed in the error report list if there are no errors
'cite-autofill-alt' : 'Automatisch ausfüllen', // Alt text for autofill button image
'cite-work-tooltip' : 'Teil welches größeren Werkes',
'cite-authorlink-tooltip' : 'Name der Wiki-Seite über den Autor, falls vorhanden',
'cite-at-tooltip' : 'Position innerhalb der Quelle, falls keine Seite angegeben werden kann',
'cite-ref-tooltip' : 'Anker-ID (Zum erstellen einer verknüpften Referenz)',
'cite-postscript-tooltip' : 'Keinen Punkt an die Quellangabe anfügen',
'cite-samecontent-desc' : 'Prüfe auf Quellangaben mit dem selben Inhalt',
'cite-samecontent-error' : 'Mehrere Quellangaben haben den selben Inhalt',
'cite-repeated-desc' : 'Mehrere Quellangaben haben den selben Namen', //TODO: compare below
'cite-repeated-error' : 'Mehrere Quellangaben haben den selben Namen', //TODO: compare above??
'cite-undefined-desc' : 'Verwendung unbekannter benannter Referenzen', //TODO: desc vs. error!
'cite-undefined-error' : 'Verwendung unbekannter benannter Referenzen', //TODO: desc vs. error!
'cite-first-label' : 'Vorname',
'cite-last-label' : 'Nachname',
'cite-title-label' : 'Titel',
'cite-work-label' : 'Werk',
'cite-newspaper-label' : 'Zeitschrift',
'cite-journal-label' : 'Fachjournal',
'cite-publisher-label' : 'Verlag',
'cite-accessdate-label' : 'Zugriffsdatum',
'cite-author-label' : 'Autor',
'cite-authorlink-label' : "Wikiseite über den Autor",
'cite-coauthors-label' : 'Coautoren',
'cite-archiveurl-label' : 'Archiv-URL',
'cite-archivedate-label' : 'Archivdatum',
'cite-location-label' : 'Ort',
'cite-page-label' : 'Seite',
'cite-pages-label' : 'Seiten',
'cite-at-label' : 'An',
'cite-chapter-label' : 'Kapitel',
'cite-volume-label' : 'Band',
'cite-series-label' : 'Serie',
'cite-issue-label' : 'Ausgabe',
'cite-language-label' : 'Sprache',
'cite-format-label' : 'Format',
'cite-date-label' : 'Datum',
'cite-month-label' : 'Monat',
'cite-year-label' : 'Jahr',
'cite-quote-label' : 'Zitat',
'cite-author2-label' : 'Zweiter Autor',
'cite-author3-label' : 'Dritter Autor',
'cite-author4-label' : 'Vierter Autor',
'cite-author5-label' : 'Fünfter Autor',
'cite-agency-label' : 'Einrichtung',
'cite-editor-label' : 'Herausgeber',
'cite-editor1-first-label' : "Vorname der Hg.",
'cite-editor1-last-label' : "Nachname des Hg.",
'cite-editor1-link-label' : "Wikiseite über den Hg.",
'cite-edition-label' : 'Herausgeber',
'cite-trans_title-label' : 'Übersetzer Titel',
'cite-ref-label' : 'Ref', //TODO: kontext??
'cite-postscript-label' : 'Postscript',
'cite-url-label' : 'URL',
'cite-doi-label' : 'DOI',
'cite-isbn-label' : 'ISBN',
'cite-pmid-label' : 'PMID',
'cite-issn-label' : 'ISSN',
'cite-pmc-label' : 'PMC',
'cite-oclc-label' : 'OCLC',
'cite-bibcode-label' : 'Bibcode',
'cite-id-label' : 'ID'
});

// Load configuration for site
var RefToolbarLocal = importScript('MediaWiki:RefToolbarConfig.js');