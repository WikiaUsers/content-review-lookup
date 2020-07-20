/**
 * Name:        Global edit count script
 * Author:      Noreplyz
 *              KockaAdmiralac <1405223@gmail.com> (smaller modifications)
 * Description: Adds a global edit count to user's masthead.
 */
 
var mwApiCounter1291238 = setInterval(function()
{
    if(typeof mw.Api !== 'undefined')
    {
        if ($("#UserProfileMasthead").length === 0) return;
        else
        {
            var username = $("h1").text();
            new mw.Api().get({
                action: "query",
                list: "users",
                ususers: username,
                usprop: "editcount"
            }).done(function(data)
            {
                if(data.error) new BannerNotification("Error while fetching user edit count: " + data.error.code, 'error').show();
                else if(typeof data.query.users[0].editcount !== 'undefined') $(".tally").first().after('<div class="tally" style="margin:-7px 0 5px 0"><em id="globaleditcount">' + data.query.users[0].editcount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</em><span>global edits</span></div>');
                $("#globaleditcount").click(function(){ window.location.href = "/wiki/Special:Editcount/" + username; });
            }).fail(function(){ new BannerNotification("Error while fetching user edit count", 'error').show(); });
        }
        clearInterval(mwApiCounter1291238);
    }
}, 100);