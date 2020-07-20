//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>

LIR.i18n.en= {
	queueModalTitle: 'File Usage Updating Queue',
	fileNamespace: 'File',
	imageNamespace: 'Image',
	videoNamespace: 'Video',
	using: 'Using',
	queue: 'Queue',
	userBlogCommentNamespace: 'User blog comment', // Will always use the translated version because it's returned from the API (hopefully)
	editSummary: 'Updating file links (automatic)',
	filesInQueue: 'Files in queue',
	oldFileName: 'Old file name',
	newFileName: 'New file name',
	addToQueue: 'Add to queue',
	nameInUse: 'Destination name is already queued to be used or is currently in use.',
	alreadyInQueue: 'File already added to queue.',
	invalidExtension: 'Invalid file extension.',
	blogComment: 'File used in blog comment. Unable to update blog comments.',
	fileNotUsed: 'File not being used on any pages.',
	noQueueExists: 'No queue exists to be executed',
	itemRemoved: 'Item removed',
	destInUse: 'Destination name already in use.',
	processing: 'Processing...',
	successful: 'Successful.',
	varsUndef: 'Variables undefined, check code.',
	queueComplete: 'Queue execution completed',
	queueStarted: 'Queue execution started',
	queueExecuted: 'Queue executed',
	contentsRetrieved: 'Page contents retrieved and saved',
	queueUpdate: 'Listing updated',
	nothingInQueue: 'There is currently nothing in the queue.',
	tryDiffName: 'Please enter a file name.',
	waitCleared: 'List of waiting pages cleared',
	toUndef: 'The "To" variable is not set.',
	fileNameBlank: 'File names cannot be left blank',
	submittingContent: 'Submitting page content',
	namespaceCheckbox: 'Include <span style="font-weight: bold">links</span> in all namespaces eg: [[:File:File.png]] <span style="font-size: 9px;">(only includes Main by default)</span>',
	failedDescription: 'Failed items appear here after execution. Note that pages that the file is transcluded through a template on will also appear here falsely.',
	pagesWaiting: 'Pages are still waiting to be added to the queue.  If this is not the case, please use the "Reset waiting pages" button to be able to execute the queue.',
	unableToMoveChoose: 'Please enter another destination name for this file.',
	unableToMoveFail: /* Image name */ 'has been removed from the queue.',
	singleButtonText: 'Rename and update',
	queueButtonText: 'Add to queue',
	fileInQueue: 'This file is currently in your queue to be renamed!',
	removeFromQueue: 'Remove from queue',
	queueModalClose: 'Close',
	queueModalManual: 'Add manually',
	queueModalReset: 'Reset wait list',
	queueModalUpdate: 'Refresh',
	queueModalExecute: 'Execute',
	queueAddition: 'Queue Addition',
	manualModalDescription: 'Input the name of a file (or previous name) with broken links to update manually.  Note that the old file does not have to exist, this will only pay attention to links.  If the old file does exist it will <span style="font-weight: bold">not</span> be renamed.',
	
	queueModalWaitConfirm: [
		'This will reset the list of pages waiting to be added to the queue in-case there was a problem processing a page that\'s preventing you from executing the queue.',
		'Note that there are still',
		/* Number of pages */
		'page(s) waiting to be added to the queue.  If you are absolutely positive that you currently have no pages open that are waiting in line to be processed or a problem has occured that has halted page processing, then press OK to clear the list of waiting pages.',
		'If you do have any pages waiting to be processed, you will have to reload and resubmit those pages to the queue to add them.'
	],
	waitList: [
		'Number',
		/* number on waitlist */
		'on wait list'
	],
	unableToFind: [
		'Unable to find',
		/* Image Name */
		'on page',
		/* Page Name */
		'it may be transcluded through a template. Please check and rename manually if needed.'
	],
	unableToMove: [
		'The file',
		/* Image Name */
		'was unable to be moved to',
		/* Image Name */
		'for reason:'
		/* error code */
	],
	unableToSubmit: [
		'The page',
		/* Page Name */
		'could not be submitted because of error code:',
		/* Image Name */
		'Please update the link(s) on that page manually.'
	],
	movePageNamespaceSelect: [
		'only affects',
		/* Single button name */
		'option'
	],
	movePageDescription: [
		'The',
		/* Single button name */
		'button updates file usages across pages for a single image, while the',
		/* Multi button name */
		'button adds the file usages of the image to a queue to be updated at one time as a group. When updating file usages using the queue, usages located on like pages are grouped together into one edit, rather than one edit per usage. The queue can be accessed and executed through any file page inside the "Edit" drop-down. Please note that a saved queue is local to the browser being used, and does not carry over to other browsers/computers.'
	],
	
	movePageInfo: [
		'Script updated',
		/* date */
		'More information about updates and functionality can be found <a href="http://dev.wikia.com/wiki/FileUsageAuto-update">here</a>.  Please report bugs or missed replacements on the Talk Page in detail.'
	]
}

//</nowiki>
//</source>