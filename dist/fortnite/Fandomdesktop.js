/* Random backgrounds for Fortnitemares 2022 Item Shop History pages */

var backgrounds = [
	'url("https://static.wikia.nocookie.net/fortnite/images/6/65/Fortnitemares_2022_%28Red%29_-_Item_Shop_Background_-_Fortnite.png/revision/latest")',
	'url("https://static.wikia.nocookie.net/fortnite/images/9/98/Fortnitemares_2022_%28Blue%29_-_Item_Shop_Background_-_Fortnite.png/revision/latest")',
	];

var randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

$('.page-Item_Shop_History_October_19th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_20th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_21st_2022_-_Part_1 .fandom-community-header__background, .page-Item_Shop_History_October_21st_2022_-_Part_2 .fandom-community-header__background, .page-Item_Shop_History_October_22nd_2022 .fandom-community-header__background, .page-Item_Shop_History_October_23rd_2022 .fandom-community-header__background, .page-Item_Shop_History_October_24th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_25th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_26th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_27th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_28th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_29th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_30th_2022 .fandom-community-header__background, .page-Item_Shop_History_October_31st_2022 .fandom-community-header__background, .page-Item_Shop_History_November_1st_2022_-_Part_1 .fandom-community-header__background	, .page-Item_Shop_History_November_1st_2022_-_Part_2 .fandom-community-header__background, .page-Item_Shop_History_November_2nd_2022 .fandom-community-header__background, .page-Item_Shop_History_November_3rd_2022 .fandom-community-header__background, .page-Item_Shop_History_November_4th_2022 .fandom-community-header__background').css({
   'background-image' : randomBackground
});