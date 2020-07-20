/* 
* "ClaimGuide" for Camp Half-Blood Roleplay Wiki
* @description Provides a guide to create a claim for users that are new to the wiki. 
* @author Kevin Mo
* @TODO Add the Claim Guide module while in Oasis edit mode
*/

/* Gets the href to the user's Special:EditCount. */
var SpecialEditCount = '/Special:EditCount/',
UserName = wgUserName.replace(" ", "_"),
UserEditCountLink =  SpecialEditCount+UserName,
UserEditCount = UserEditCountLink;

/* Creates a placeholder element for the user's edit count; the div element is set to display:none and will be removed after its required use is fulfilled. */
$("div.wpSummaryFields").after('<div class="claim-guide-edit-count" style="display:none;"></div>');

/* Loads the user's edit count from the user's Special:EditCount Link. */    
$.ajax({
    url: UserEditCount,
    success: function(EditCountData) {
        var EditCount = $(EditCountData).find("table.TablePager > tbody > tr:nth-of-type(2) > th.ecrowright:first-of-type").text().replace(",", "").toString();
       console.log('<<:: Testing ::>> Your edit count is' + EditCount);
       
        if (EditCount > 4000) {
            ClaimGuideCheckPageName();
        }
    }
});

function ClaimGuideCheckPageName() {
    /* Checks if the page the user is editting is a claiming page (checking for the Claiming namespace and "Camp/" in the page title. If conditions are met, executes function. */
    if (/* wgCanonicalNamespace === "Claiming" && */ wgTitle.indexOf("Camp/") !== -1 && wgAction === "edit") {
        ClaimGuideConfirmInitiate();
    }
     /* Display a module confirming/asking if the user wants to enable Claim Guide */ 
    function ClaimGuideConfirmInitiate() {
        /* HTMl code for the Claim Guide Confirmation module */
        $.showCustomModal('Initiate Claim Guide?', "The claim guide system has noticed that you are new or relatively new to our wiki! While this is completely optional, would you like to enable our claim guide? With our claim guide, we aim to provide a method to guide new users through creating their first claim. If you follow along the guide, your claim should have everything that's necessary in order to ensure that your claim gets approved as quickly as possible. That way, new users will be less intimidated by our claim guidelines and they can get right onto roleplay.<br /><br /> \
        <i>This script is written by <a href='/wiki/User:Kevin_Mo' title='User:Kevin Mo'>Kevin Mo</a>. To report any bugs or issues with the claim guide, please message <a href='/wiki/User_talk:Kevin_Mo' title='User:Kevin Mo'>Kevin</a>.</i><br /> \
        <div style='float:right; font-size:65%;'>Ver. 1.0.0 (2016-4-10)</div>", {
            id: 'claim-guide-initiate-confirmation',
            width: 300,
            buttons: [{
                message: 'Yes',
                defaultButton: true,
                handler: function() {
                    /* When the "Yes" button is pressed, the Claim Guide Module is closed and function executes. */
                    $('#claim-guide-initiate-confirmation').closeModal();
                    ClaimGuideInitiate();
                }
            }, {
                id: 'startButton',
                    message: 'No',
                    handler: function () {
                        /* When the "No" button is pressed, the Claim Guide Module is closed and function is terminated. */
                        $('#claim-guide-initiate-confirmation').closeModal();
                        return;
                    }
                }]
        });
    }
    
    function ClaimGuideInitiate() {
        /* Determines the Claim Guide module based on the difference of the document's body width and the width of WikiaMainContent class element, divided by two because of the two spaces (showing the Wikia's background) around the WikiaMainContent. */
        var ClaimGuide = '<div class="claim-guide" id="claim-guide"> \
        <div class="claim-guide-next">Next</div> \
        </div>',
        ClaimGuideModuleWidth = (document.body.offsetWidth - document.getElementById("WikiaMainContent").offsetWidth) / 2,
        GlobalNavigationHeight = document.getElementById("globalNavigation").offsetHeight,
        ClaimGuideNextWidth = (document.body.offsetWidth - document.getElementById("WikiaMainContent").offsetWidth) / 6;
        
        /* Sets Claim Guide Module to width determined from above. */
        $(".WikiaSiteWrapper").prepend(ClaimGuide)
        mw.util.addCSS(' \
            .claim-guide { \
                position: absolute; \
                top: ' + GlobalNavigationHeight + 'px; \
                left: 0px; \
                width: ' + ClaimGuideModuleWidth + 'px; \
                height: 300px; \
                background-color: rgba(255, 255, 255, 0.35); \
                color: #000000; \
                font-family: century gothic; \
                font-size: 14px; \
                padding: 30px 10px; \
                box-sizing: border-box; \
            } \
            .claim-guide-next { \
                position: absolute; \
                bottom: 20px; \
                right: 20px; \
                width: ' + ClaimGuideNextWidth + 'px; \
                height: 25px; \
                background-color: rgba(0, 0, 0, 0.65); \
                color: rgba(255, 255, 255, 0.7); \
                line-height: 25px; \
                text-align: center; \
                border-radius: 7px 7px; \
            } \
        ');
        
        $(window).on("resize", function() {
            ClaimGuideModuleWidth = (document.body.offsetWidth - document.getElementById("WikiaMainContent").offsetWidth) / 2,
            ClaimGuideNextWidth = (document.body.offsetWidth - document.getElementById("WikiaMainContent").offsetWidth) / 6;
                
            $(".claim-guide").css("width", ClaimGuideModuleWidth + "px");
            $(".claim-guide-next").css("width", ClaimGuideNextWidth + "px");
        });
        
        $(".claim-guide-next").on("click", function() {
            console.log('<<:: Testing ::>> You clicked "Next"!');
        
            $(this).parent().animate({
                height: 0,
                opacity: 0,
            }, {
                duration: 250,
                queue: false,
                complete: function() {
                    $(this).remove();
                }
            });
        });
    }
}