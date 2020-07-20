// HTML TO LOAD IN SIDEBAR NAVBOX
var content = '\
<style>\
    table#sidebarTable {\
        width:100%;\
        text-align:center;\
        font-size:large;\
        border-collapse:separate;\
        border-spacing:1.25em;\
    }\
    table#sidebarTable th {\
        background-color:#245400;\
        color:#FFFFFF;\
        font-weight:bold;\
    }\
</style>\
\
<section class="module">\
    <table id="sidebarTable">\
        <tr>\
            <td colspan = "2">\
                <p style="font-size:x-large">\
                    <b>Navigation</b><br>\
                </p>\
                <p style="font-size:large; line-height:200%">\
                    <a href="http://fort-muny.wikia.com/wiki/Fort_Muny_Wikia">Home</a>\
                </p>\
            </td>\
        </tr>\
        <tr>\
            <th colspan = "2">\
                    Muny Reworks\
            </th>\
        </tr>\
        <tr>\
            <td>\
                <a href="http://fort-muny.wikia.com/wiki/Muny_Reworks">Rules</a>\
            </td>\
            <td>\
                <a href="http://fort-muny.wikia.com/wiki/Lucid\'s_Magic_Rules">Magic</a>\
            </td>\
        </tr>\
        <tr>\
            <td>\
                <a href="http://fort-muny.wikia.com/wiki/Perk_List_%28Muny%29">Perks</a>\
            </td>\
            <td>\
                <a href="http://fort-muny.wikia.com/wiki/Item_List_(Muny)">Items</a>\
            </td>\
        </tr>\
        <tr>\
            <th colspan = "2">\
                Freeform Magic\
            </th>\
        </tr>\
        <tr>\
            <td>\
                <a href="http://fort-muny.wikia.com/wiki/Muny_Freeform_Magic_System">Rules</a>\
            </td>\
            <td>\
                <a href="http://fort-muny.wikia.com/wiki/Freeform_Magic_Perks_and_Traits">Perks</a>\
            </td>\
        </tr>\
        <tr>\
            <td colspan = "2">\
                <a href="http://fort-muny.wikia.com/wiki/Freeform_Magic_Racial_Spells">Racial Spells</a>\
            </td>\
        </tr>\
        <tr>\
            <th colspan = "2">\
                Campaigns\
            </th>\
        </tr>\
        <tr>\
            <td colspan = "2">\
                <a href="http://fort-muny.wikia.com/wiki/Game_Roster">Games Roster</a>\
            </td>\
        </tr>\
    </table>\
</section>'


// SCRIPT TO LOAD THE NAVBOX
$(window).load(function(){
    // Called after the entire page (DOM + images + iframes) is loaded.
            $('.WikiaActivityModule').before(content);
    });