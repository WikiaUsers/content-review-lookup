<?php
/**
 * EmailForm.php
 * This extension inserts a form mailer into a page
 * written by Eric Hartwell http://www.ehartwell.com/About
 * To activate the functionality of this extension include the following in your
 * LocalSettings.php file:
 * require_once("$IP/extensions/EmailForm.php");
 *
 * Minor adjustments made by John Adams
 */
 
###### Name used for the extension, tag, and settings page name #######
define("EMAILFORM_NAME",  "EmailForm");            # Name of tag
define("POST_IDENTIFIER", "sendEmailForm");        # Name of POST identifier flag
 
if(! defined( 'MEDIAWIKI' ) ) {
    echo( "This is an extension to the MediaWiki package and cannot be run standalone.\n" );
    die( -1 );
} else {
 
    $wgExtensionCredits['parserhook'][] = array(
         'name' => EMAILFORM_NAME,
         'version' => '0.8a',
         'author' =>'Eric Hartwell (Minor fixes by John Adams)', 
         'url' => 'http://www.mediawiki.org/wiki/Extension:EmailForm',
         'description' => 'Inserts a form mailer into a page'
         );
}
 
# EmailForm MediaWiki extension
$wgExtensionFunctions[] = "wfEmailFormExtension";
 
function wfEmailFormExtension() {
     global $wgParser;
     global $wgHooks;
     # register the extension with the WikiText parser
     # the first parameter is the name of the new tag.
     # In this case it defines the tag <EmailForm> ... </EmailForm>
     # the second parameter is the callback function for
     # processing the text between the tags
     $wgParser->setHook( /*Default: <EmailForm>*/    EMAILFORM_NAME, "renderEmailForm" );
}
 
# The callback function for converting the input text to HTML output
# On a normal invocation, this tag builds a mail input form. The submit button
# redirects to the same page, where the tag detects the parameters in $_GET
# and processes the actual email send. It then outputs the result message
# There are two main blocks: <emailform form> and <emailform result>
function renderEmailForm( $input, $argv, $parser ) {
 
    #######################
    ##### Custom Code #####
    #######################

    reset($_POST);                      #This code eliminates an error related to referencing the $_POST array by 'sendEmailForm'
    $ispost = current($_POST);
 
    ##############################
    ##### End of Custom Code #####
    ##############################

    #ORIGINAL# $ispost = $_POST[POST_IDENTIFIER];
 
    # Cases:
    # <emailform> wikitext with <emailform fields /> for each field </emailform>
    # <emailform field1= field2= /> Basic inline form e.g. [text field][submit button]
    # <emailform field= /> Single field - assume it's inside a bracketing <emailform></emailform>
    # <emailform results> for results output
 
     $keys = array_keys($argv);
 
    #######################
    ##### Custom Code #####
    #######################

    $mode = strtolower(key($keys));             #This code eliminates an error related to referencing the $keys array by numerical keys

    ##############################
    ##### End of Custom Code #####
    ##############################

    #ORIGINAL# $mode = strtolower($keys[0]);    # See if first argument is 'form' or 'result'

    if ( $mode=='form' )    $argv = array_shift( $argv );    # Drop 'form' or 'result' for now
    else                    $mode = 'form';                    # Empty or a field type
 
    # Process form field(s)
    # Put this in a loop to allow multiple fields in one tag, 
    # e.g. <emailform name=60 email=60 comment=60x15 action=purge />
    $output = '';
    foreach ($argv as $arg => $value) {
        $output .= render_email_field($arg, $value, $ispost, $input, $parser, '');
    }
 
    # Render the outer tag as <form>input text<fields></form>
    if ( count($keys) != 1 )
        $output = render_email_field( $mode, '', $ispost, $input, $parser, $output );
    return( $output );
}
 
# This function translates one field
# Returns string for output
# How do I disable caching for pages using my extension?
# http://www.mediawiki.org/wiki/Extensions_FAQ#Recent_versions
# In MediaWiki 1.7.0 and upwards, the following should be sufficient:
function render_email_field($arg, $value, $ispost, $input, &$parser, $extra) {
    global $wgTitle;
 
     switch ( strtolower($arg) ) {
 
    case 'result':    # Wrapper for results display
        if ( $ispost )
        {
            $parser->disableCache();     #### Important: Disable Cache ####
            return ( render_wikitext($parser, $input) );    # Show the results
        }
        return ( '' );        # Hide the results when showing the form 
 
    case 'form':    # Form wrapper
        # See if we're building the form
        if ( $ispost ) {
            # Get the remaining settings from [[MediaWiki:EmailForm]]
            $settings = get_MediaWikiEmailForm_settings ( $wgTitle->getText() );
            if ( $settings ) {
                 send_email($settings);        # Send the email message
                return ( '' );                # Hide the input form when showing results
            } else {
                return ( EMAILFORM_NAME . ': [[MediaWiki:' . EMAILFORM_NAME . ']] has no settings for [[' . $wgTitle->getText() . ']]' );
            }
        } else {
            if ( !($wgTitle->isProtected ('edit')) )
                return ( EMAILFORM_NAME . " is only active on protected pages." );
            $parser->disableCache();     #### Important: Disable Cache ####
            return (
                      '<form action="'. $wgTitle->getFullURL() . '" method="post">'
                    . '<input type="hidden" name="action" value="purge" />'
                    . '<input type="hidden" name="' . POST_IDENTIFIER . '" value="send" />'
                    . render_wikitext($parser, $input) . $extra
                    . '</form>' 
            );
        }
 
    case 'submit':        return( ' <input type="submit" name="submit" value="' . $value . '"/> ' );
 
    default:
        # Result: Display contents of corresponding field
        if ($ispost)     return( $_POST[$arg] );
        # Build other form fields
        # If the argument is numeric, it's a text field size
        if ( $value > 0 ) {
            $size = explode( 'x', $value );
 
            #######################
            ##### Custom Code #####
            #######################

                if(count($size)>1) {    #This code eliminates an error related to referencing the $size array by numerical keys
                        reset($size);
                        $firstpiece = ('<textarea name="'.$arg.'" cols="'.current($size).'"');
                        next($size);
                        $secondpiece = (' rows="'.current($size).'" ></textarea>' );
                        return($firstpiece.$secondpiece);
                }
 
            ##############################
            ##### End of Custom Code #####
            ##############################

            #ORIGINAL# if ( $size[1] ) return( '<textarea name="'.$arg.'" cols="'.$size[0].'" rows="'.$size[1].'" ></textarea>' );
            else            return( '<input type="text" name="'. $arg.'" size="'.$value.'" />' );
        }
 
        # Arbitrary hidden fields
        return( '<input type="hidden" name="'.$arg.'" value="'.$value.'" />' );
    }
}
 
# This function formats and sends the email
# Message parameters come from the global $_POST arguments
# $settings: parameters come from the [[MediaWiki:EmailForm]] page
# Returns true if the message was accepted for output
function send_email( $settings ) {
 
     # Wrap the form's fields into a message string
     $message = $name = $from = "";
 
    foreach ($_POST as $arg => $value) {
        switch ( strtolower($arg) ) {
        # Ignore framework fields
        case strtolower(POST_IDENTIFIER):
        case 'action': case 'submit':            break;
        case 'name':        $name = $value;        break;
        case 'from':        $from = $value;        break;
        default:            $message .= $arg . ": " . $value . "\n";    break;
        }
    }
 
    # The name and email address are optional. Format as "Name <email>" or "Name" or "email"
    if ( $name ) {
        if ( $from )    $from = $name . ' <' . $from . '>';
        else            $from = $name;
    }
    if ( !$from )        $from = $settings['prefix'];
 
     # GoDaddy: If you use the mail() function in your PHP, you do not need to specify
    # an outgoing mail server. If you are are using some other method besides mail() 
    # in your PHP code, use relay-hosting.secureserver.net for your relay server.
    # mail() returns TRUE if the mail was successfully accepted for delivery, FALSE otherwise. 
 
    #######################
    ##### Custom Code #####
    #######################

    $subject = $settings['prefix'] . $name;     #This reduces the subject line to just the prefix and the name

    ##############################
    ##### End of Custom Code #####
    ##############################

    #ORIGINAL# $subject = $settings['prefix'] . str_replace("\n", " ", substr( $message, stripos($message,":")+1, 60) );

    $sent = mail ( $settings['to'], $subject, "From: " . $from . "\n" . $message);
    return( $sent );
}
 
# How do I render wikitext in my extension?
# http://www.mediawiki.org/wiki/Extensions_FAQ#Parser_hooks
function render_wikitext($parser, $input) {
 
# Uncomment these lines if you are running MediaWiki prior to 1.14:
#    $lparse = clone $parser;
#    $output = $lparse->parse( $input, $parser->mTitle, $parser->mOptions, true, false );
#   return( $output->getText() );

# Otherwise use these lines:
    $output = $parser->recursiveTagParse( $input );
    return( $output );
}
 
# Load the email form settings from a special page MediaWiki:EmailForm
# $pagetitle is the name of the page with the form on it
function get_MediaWikiEmailForm_settings ( $pagetitle ) {
    $settingpage= new Article( Title::newFromText('MediaWiki:' . EMAILFORM_NAME) );
    if ( !$settingpage)    return(null);
 
    $content = $settingpage->fetchContent(0,false,false);
    if ( $content )    {
         # Find the settings for this particular form
        $lines = explode ( "\n", $content );
        foreach ( $lines as $line ) {
            $settings = explode( '|', $line );
            if ( trim(strtolower($settings[0])) == strtolower($pagetitle) )
                return( array( 'to'=>trim($settings[1]), 'prefix'=>trim($settings[2] ) ) );
        }
    }
    # Default: No data
    return( null );
}