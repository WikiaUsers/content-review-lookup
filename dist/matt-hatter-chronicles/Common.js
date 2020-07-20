/* Any JavaScript here will be loaded for all users on every page load. */
// The tags themselves.
/**
 * Page format checking
 *
 * Maintainers: [[User:Falzar FZ]]
 */
var mNamespace       = mw.config.get('wgCanonicalNamespace'),
    mNamespaceNumber = mw.config.get('wgNamespaceNumber'),
    mAction          = mw.util.getParamValue('action'),
    mSection         = mw.util.getParamValue('section');

/**
 * Add Template:Talk if it's not there.
 */
if (mNamespaceNumber % 2 == 1 && mNamespaceNumber != 3 && !mSection && mAction !== 'submit') {
    var vText = $('#wpTextbox1').val().replace(/{\{[Tt]alk/, '{\{Talk');
    if (!vText.match('{\{Talk') && !vText.match('{\{Delete')) {
        $('#wpTextbox1').val('{\{Talk}}\n\n' + vText);
    } else {
        $('#wpTextbox1').val(vText);
    }
}

window.UserTagsJS = {
    metafilter: {
        sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
    }
};

// AjaxRC
window.ajaxPages = ["Special:WikiActivity","Special:Log","Special:RecentChanges"];

// MessageWallUserTags config
// Use underscores to substitute for spaces in long usernames
window.MessageWallUserTags = {
    tagColor: 'purple',  //Tag color – The color of the tag's text
    glow: false,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '1px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'white', //Glow color
    users: {
        'Luma.dash': 'Bureaucrat',
        'C00KIEB0YY': 'Administrator',
    }
};
var el ='~~' + '~~';
window.SignatureCheckJS = {
    noSignature: '1. It looks like you forgot to sign your reply. Use ' + el + ' to sign.\n',
    epilogue: '2. If you are just correcting your already signed post or fixing an issue in the talkpage, do not bother with this message.'
};
// our config is stored in an array
window.lessOpts = window.lessOpts || [];
 
// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Common.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-common.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Common.css',
        'MediaWiki:Custom-common.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Custom-Css-header/common'
} );