// WRITTEN BY USER:RAPPY_4187 from WoWWiki
 
$(function() { var rights = {};
 
// BEGINNING OF LIST using this format:
// rights["User Name"] = ["Tag1","Tag2","Tag3","etc ..."],
 

     // Founder

rights["Aere Perennius"] = ["Founder"],

     // Bureaucrats

rights["Polytherion"]        = ["Bureaucrat","Administrator"],

rights["Warrior fr"]      = ["Bureaucrat","Administrator"],


     // Administrators (Sysops)

// rights["Tank Master"] = ["Inactive Administrator (Sysop)","Inactive Chat Moderator","Ikariam Test Wiki (en) - Founder"],
// rights["Crythias"]    = ["Inactive Administrator (Sysop)","Inactive Chat Moderator"],
// rights["Rmedic"]      = ["Inactive Administrator (Sysop)","Inactive Chat Moderator"],

// rights["Jeahra"]      = ["Administrator (Sysop)","Chat Moderator"],
// rights["Warrior fr"]  = ["Administrator (Sysop)","Chat Moderator","Ikariam (fr) - Bureaucrat"],

     // Rollback Only



     // Moderators Only



     // Other Wikis Only

rights["Jrooksjr"]  = ["Ikariam (en) - Bureaucrat"],
// rights["Daviinho"]     = ["Ikariam (pt-br) - Administrator (Sysop)"],
// rights["Emanuel_Luis"] = ["Ikariam (ro) - Bureaucrat"],
// rights["Ilkea"]        = ["Ikariam (fi) - Bureaucrat"],
// rights["Jorghex"]      = ["Ikariam (es) - Bureaucrat"],
// rights["Martin_G"]     = ["Ikariam (bg) - Bureaucrat"],
// rights["Polytherion"]  = ["Ikariam (fr) - Bureaucrat"],
// rights["Softclean"]    = ["Ikariam (pt) - Bureaucrat"],
// rights["Tabos"]        = ["Ikariam (ar) - Bureaucrat"],
// rights["The_fighter2"] = ["Ikariam (ar) - Bureaucrat"],
// rights["TOBBE"]        = ["Ikariam (de) - Bureaucrat"],

     // Wikia Staff (all variations)

// rights["Avatar"]         = ["Wikia Staff","Wikia Utilities"],
// rights["Dopp"]           = ["Wikia Staff","Wikia Utilities"],
// rights["Eulalia459678"]  = ["Volunteer Spam Task Force (VSTF)"],
// rights["Jimbo Wales"]    = ["Wikia Staff"],
// rights["Kirkburn"]       = ["Wikia Staff","Wikia Utilities"],
// rights["KyleH"]          = ["Wikia Staff","Wikia Utilities"],
// rights["MerryStar"]      = ["Wikia Staff","Wikia Utilities"],
// rights["Minerva Titani"] = ["Wikia Helper","Ikariam (it) - Founder"],
// rights["Moli.wikia"]     = ["Wikia Staff","Wikia Utilities"],
// rights["Randomtime"]     = ["Volunteer Spam Task Force (VSTF)"],
// rights["Rappy 4187"]     = ["Volunteer Spam Task Force (VSTF)"],
// rights["Sannse"]         = ["Wikia Staff","Wikia Utilities"],
// rights["Sarah Manley"]   = ["Wikia Staff","Wikia Utilities"],
// rights["Sulfur"]         = ["Volunteer Spam Task Force (VSTF)"],
// rights["Toughpigs"]      = ["Wikia Staff","Wikia Utilities"],

     // Wikia bots

rights["Default"]           = ["Wikia Setup Bot"],
rights["MediaWiki default"] = ["Wikia MediaWiki bot"],
rights["QATestsBot"]        = ["Wikia Quality Assurance Test Bot"], 
rights["WikiaBot"]          = ["Wikia Bot"], 
rights["Wikia"]             = ["Wikia User Bot"];

// END OF LIST
 
if (typeof rights[wgTitle] != "undefined") {

     // remove old rights

$('.UserProfileMasthead .masthead-info span.group').remove();
for( var i=0, len=rights[wgTitle].length; i < len; i++) {

     // add new rights

$('<span class="group">' + rights[wgTitle][i] +
'</span>').appendTo('.masthead-info hgroup');
}
}
});