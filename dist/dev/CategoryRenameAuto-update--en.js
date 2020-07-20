//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>

CRA.i18n.en= {
	pageTitle: 'CategoryRenameAuto-update',
	categoryNamespace: 'Category',
	rename: 'Rename',
	reason: 'Reason',
	automatic: 'automatic',
	failedItems: 'Failed items',
	renameFieldset: 'Rename category',
	currentName: 'Current name',
	leaveRedir: 'Leave a redirect behind',
	replaceOldContents: 'Replace contents',
	deleteOldCat: 'Delete the old category',
	doNothing: 'Do none of the above',
	checkingNewTitle: 'Checking if new title exists',
	gettingCatMembers: 'Getting category members',
	fetchingContents: 'Fetching page contents from API',
	creatingNewPage: 'Creating new page',
	submittingPages: 'Begin submitting pages',
	renameComplete: 'Rename complete. New category',
	catNotUsed: 'Category not used on any pages, rename manually.',
	destExists: 'Destination name already exists.',
	renamingCat: 'Renaming Category',
	createdNewCat: 'Created new category page',
	unableToCreate: 'Unable to create category',
	updating: 'Updating',
	redirToNew: 'Redirecting to new category',
	submittedPage: 'Submitted page',
	mainDescription: 'Using the form below will rename a category by changing the category names on pages that the category is used on. You can decide what to do with the old category pages, and a new category page will be created with the content from the old category. Be sure to check <a href="' + mw.util.getUrl('Special:WantedCategories') + '">wanted categories</a>. You are responsible for making sure that links continue to point where they are supposed to go.<br /><br />Note that the page will <strong>not</strong> be moved if there is already a page at the new title.<br /><br /><strong>Warning!</strong> This can be drastic and unexpected for a popular category; please be sure you understand the consequences of this before proceeding.',
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