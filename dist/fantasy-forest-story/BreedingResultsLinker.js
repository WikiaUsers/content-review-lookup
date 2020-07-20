$(document).ready(function()
{     
   if (skin == "oasis")
   {          
        eval(document.getElementById("breedingresultslinkerdata").innerHTML);
  	setMenuOptions();
   }        
});

function setMenuOptions()
{
	var menu1 = document.getElementById("breedanimals_animal1choices");
	var menu2 = document.getElementById("breedanimals_animal2choices");
	
	for (var i = 0; i < dragon_ids.length; i++)
	{
		var animalName = animal_data[animal_ids[i].toLowerCase()].name;
		
		var newOption1 = document.createElement("option");
		newOption1.text = animalName;
		menu1.add(newOption1);
		
		var newOption2 = document.createElement("option");		
		newOption2.text = animalName;
		menu2.add(newOption2);		
	}
	
	$('form#breedanimals').toggle(); 
}

function linkButtonClicked()
{
	linkToColorPool();
}

function linkToColorPool()
{
	var menu1 = document.getElementById("breedanimals_animal1choices");	
	var menu2 = document.getElementById("breedanimals_animal2choices");
	
	var animal1_colors = animal_data[animal_ids[menu1.selectedIndex]].colors;	
	var animal2_colors = animal_data[animal_ids[menu2.selectedIndex]].colors;	
	var combined_colors = getSortedColors(getMergedList(animal1_colors, animal2_colors));
	
	var key = "";
	
	for (var i = 0; i < combined_colors.length; i++)
	{
		key += combined_colors[i].substring(0, 1).toUpperCase() + 
		       combined_colors[i].substring(1, combined_colors[i].length).toLowerCase();
	}		

        
        var scroll_coord = document.getElementById("jumplink_" + key).offsetTop;
        scrollWithOffsets(scroll_coord);
}

function scrollWithOffsets(offset)
{
        // Unfortunate required hack, watch out for id or element changes by Wikia in the future 

        var scroll_coord = offset;

        // Wikia's top navigation bar
        var element_topnav = document.getElementById("WikiaHeader");
        
        if (element_topnav != null)
        {
           scroll_coord += element_topnav.offsetHeight;
        }

        // Wiki header with the wiki's banner etc.
        var element_header = document.getElementById("WikiHeader");

        if (element_header != null)
        {
            scroll_coord += element_header.offsetHeight;
        }

        // Wikia ads, if visible
        var element_ads = document.getElementById("WikiaTopAds");

        if (element_ads != null)
        {
            scroll_coord += element_ads.offsetHeight;
        }

        // Wikia page header, with the page title
        var element_title = document.getElementById("WikiaPageHeader");

        if (element_title != null)
        {
            scroll_coord += element_title.offsetHeight;
        }

	window.scroll(0, scroll_coord);     
}

function getMergedList(list1, list2)
{	
	var data = "";
		
	for (var i = 0; i < list1.length; i++)
	{
		data += data == "" ? list1[i] : "_" + list1[i];
	}

	for (var i = 0; i < list2.length; i++)
	{
		if (!(data.indexOf("_" + list2[i] + "_") > -1 ||
		      data.indexOf(list2[i]) > -1 && data.indexOf(list2[i]) == 0 ||
			  data.indexOf("_" + list2[i]) > -1 && data.indexOf("_" + list2[i]) + list2[i].length + 1 == data.length))			  
		{
			data += "_" + list2[i];
		}		
	}
	
	return data.split("_");		
}

function getSortedColors(colors)
{	
	var sorted_colors = new Array();		
	
	for (var i = 0; i < color_list.length; i++)
	{
		for (var j = 0; j < colors.length; j++)
		{						
			if (colors[j] == color_list[i])
			{				
				sorted_colors.push(colors[j]);	
				break;				
			}
		}
	}		
	
	return sorted_colors;
}