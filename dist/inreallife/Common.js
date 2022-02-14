/* Any JavaScript here will be loaded for all users on every page load. */

/* QUIZ */
var quizName = "How well do you know the band, In Real Life?";
var quizLang = "en";
var resultsTextArray = [
	"You can do better than that!",
	"You're not a full-fledged Lifeline yet, but you're getting there.",
	"You must be a huge fan of In Real Life!",
	"You're an expert when it comes to the band. You could be the sixth member!"
	];
var questions = [
 
	["What were the options for the fandom name on the Twitter poll?",
	"Lifelines, Realists, and Other",
	"Lifelines and Realists",
	"Lifelines, Realists, and Lifers",
	"Lifelines, Realists, Lifers, and Other"], 
 
	["When is Sergio’s birthday?",
	"October 7, 2000",
	"October 17, 2000",
	"October 6, 2000",
	"October 16, 2000",
	"October 20, 2000"],
 
	["Brady played the main lead in the movie, 'The Rocket'. What was his character's name?",
	"Joshua Davis",
	"Joshua Davey",
	"Joshua Davies",
	"None of these"],
 
	["Chance Perez has five tattoos",
	"False",
	"True"],
 
	["For Halloween, when they dressed as Superheroes, Drew was",
	"Deadpool",
	"Batman",
	"Spiderman",
	"Captain America"],
 
	["Michael’s pet dog, Addison, is what type of breed?",
	"Cavapoo",
	"King Charles Spaniel",
	"Cocker Spaniel",
	"Labradoodle",
	"Poodle"],
 
	["Here's a easy one. Finish the lyric: 'All I do is think of, you ___'",
	"lady",
	"lately",
	"girl",
	"man"],
 
	["Drew's breakout performance on Boy Band was",
	"Can't Take My Eyes Off Of You",
	"Earned It",
	"Despacito",
	"I Don't Want To Miss A Thing"],
 
	["Brady dislike pigs, thinking they are 'too messy'",
	"False",
	"True"],
 
	["Which performance was Sergio NOT in?",
	"Livin' On A Prayer",
	"Can't Take My Eyes Off of You",
	"How Far I'll Go",
	"Edge of Glory",
	"Uptown Girl"]
 
	];
 
/* REPLACES {{USERNAME}} WITH THE NAME OF THE USER BROWSING THE PAGE */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

    /* --- Template:Portal/navigation slider --- */
    $(".portal.navigation").addClass("hub");
    $(".portal__navigation__aux a").on("click", function(e) {
        e.preventDefault();
        var id = $(this).parent().attr("id");
        $(".portal__navigation__slide.active").removeClass("active");
        $(".portal__navigation__slide#" + id).addClass("active");
        $(".portal.navigation").removeClass("hub");
        $(".portal.navigation").removeClass("IRL");
        $(".portal.navigation").removeClass("Solo");
        $(".portal.navigation").addClass(id);
    });
    
    $(".portal__navigation__navigator .previous").on("click", function() {
        if( $(".portal__navigation__slide.active").attr("id") == "hub" ) {
            console.log("Attempted to access previous slide when none exists in the stack (no operation).");
        } else {
            var active = $(".portal__navigation__slide.active");
            active.removeClass("active");
            active.prev().addClass("active");
            var newid = active.prev().attr("id");
            $(".portal.navigation").removeClass().addClass("portal navigation " + newid);
        }
    });
    
    $(".portal__navigation__navigator .next").on("click", function() {
        if( $(".portal__navigation__slide.active").attr("id") == "Solo" ) {
            console.log("Attempted to access next slide when none exists in the stack (recycled back to slide 1).");
            var active = $(".portal__navigation__slide.active");
            active.removeClass("active");
            $(".portal__navigation__slide#hub").addClass("active");
            $(".portal.navigation").removeClass().addClass("portal navigation hub");
        } else {
            var active = $(".portal__navigation__slide.active");
            active.removeClass("active");
            active.next().addClass("active");
            var newid = active.next().attr("id");
            $(".portal.navigation").removeClass().addClass("portal navigation " + newid);
        }
    });
    
    $(".portal__navigation__navigator .index").on("click", function() {
       $(".portal__navigation__slide.active").removeClass("active");
       $(".portal__navigation__slide#hub").addClass("active");
       $(".portal.navigation").removeClass().addClass("portal navigation hub");
    });