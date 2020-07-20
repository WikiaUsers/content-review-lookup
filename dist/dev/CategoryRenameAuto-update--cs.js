//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>
 
CRA.i18n.cs = {
	pageTitle: 'CategoryRenameAuto-update',
	categoryNamespace: 'Kategorie',
	rename: 'Přejmenovat',
	reason: 'Důvod',
	automatic: 'automaticky',
	failedItems: 'Chybné položky',
	renameFieldset: 'Přejmenovat kategorii',
	currentName: 'Současný název',
	leaveRedir: 'Zanechat přesměrování',
	replaceOldContents: 'Nahradit obsahy',
	deleteOldCat: 'Smazat původní kategorie',
	doNothing: 'Neprovádět nic výše uvedeného',
	checkingNewTitle: 'Kontrola zda nový název již existuje',
	gettingCatMembers: 'Získávání členů kategorie',
	fetchingContents: 'Získávání obsahu stránky pomocí API',
	creatingNewPage: 'Vytváření nové stránky',
	submittingPages: 'Zahájení odesílání',
	renameComplete: 'Přejmenování dokončeno. Nová kategorie',
	catNotUsed: 'Kategorie není použita na žádné stránce. Přejmenujte ji manuálně.',
	destExists: 'Cílový název již existuje.',
	renamingCat: 'Přejmenovávání kategorie',
	createdNewCat: 'Nová stránka kategorie vytvořena',
	unableToCreate: 'Chyba při vytváření kategorie',
	updating: 'Aktualizace',
	redirToNew: 'Přesměrovávání na novou kategorii',
	submittedPage: 'Odesílání stránky',
	mainDescription: 'Použitím tohoto formuláře lze přejmenovat kategorii tím, že dojde ke přejmenování všech výskytů této kategorie. Je možné si vybrat, co bude provedeno s původními kategoriemi. Obsah původní stránky kategorie bude přemístěn na stránku nové kategorie. Zkontrolujte <a href="' + mw.util.getUrl('Special:WantedCategories') + '">požadované kategorie</a>. Jste zodpovědní na to, aby odkazy směřovaly tam, kam mají.<br /><br /> Stránka <strong>nebude</strong> přemístěna, pokud už existuje stránka se stejným názvem.<br /><br /><strong>Warning!</strong> To může mít velké a nečekané následky pro populární kategorie. Ujistěte se, že chápete následky přesunu před jeho zahájením.',
	failedDescription: 'Failed items appear here after execution. Note that pages that the category is transcluded through a template on will also appear here falsely.',
	chooseOldPage: 'Choose what to do with the old category page',
	includeLinks: 'Include <span style="font-weight: bold">links</span> in all namespaces eg: [[:Category:Category name]] <span style="font-size: 9px;">(only includes Main by default)</span>',
	pageNotCreated: [
		'The page',
		/* New Category Name */ 
		'could not be created because of error code'
		/* Error Code */
	],
	pageNotSubmitted: [
		'The page',
		/* Page Name */ 
		'could not be submitted because of error code',
		/* Error Code */
		'Please update the link(s) on that page manually'
	],
	pageNotDeleted: [
		'The page',
		/* Page Name */ 
		'could not be deleted because of error code',
		/* Error Code */
		'Please delete page manually'
	],
	unableToFind: [
		'Unable to find',
		/* Old Category Name */
		'on page',
		/* Page Name */
		'; it may be transcluded through a template. Please check and update manually if needed.'
	]
}
 
//</nowiki>
//</source>