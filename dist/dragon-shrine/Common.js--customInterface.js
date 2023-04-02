//====================================
//            Random image
//====================================
/* Display a random image in the    */
/* Wikia Rail (Oasis)               */
 
/* Images list */
var WikiaRailImageArray = new Array();
    WikiaRailImageArray[0] = "<img src='https://images.wikia.nocookie.net/__cb20110422181831/shipoffools/images/thumb/6/6b/Anime_Warrior_by_chaotixwolf.jpg/143px-Anime_Warrior_by_chaotixwolf.jpg' alt='Nova Blade'>";
    WikiaRailImageArray[1] = "<img src='https://images.wikia.nocookie.net/__cb20110303050452/shipoffools/images/thumb/3/3b/Snapshot_20110303_1.jpg/185px-Snapshot_20110303_1.jpg' alt='Subarashi'>";
    WikiaRailImageArray[2] = "<img src='https://images.wikia.nocookie.net/__cb20110617205158/shipoffools/images/thumb/1/12/Soarian_post_time_skip.jpg/119px-Soarian_post_time_skip.jpg' alt='Marcus Saorian'>";
    WikiaRailImageArray[3] = "<img src='https://images.wikia.nocookie.net/__cb20110706061226/shipoffools/images/thumb/a/ae/Goods_1445_1.jpg/185px-Goods_1445_1.jpg' alt='Guddo Raku'>";
    WikiaRailImageArray[4] = "<img src='https://images.wikia.nocookie.net/__cb20120215165424/onepiece/it/images/thumb/2/29/Sanji_Color_Walk_4.jpg/300px-Sanji_Color_Walk_4.jpg' alt='Sanji'>";
    WikiaRailImageArray[5] = "<img src='https://images.wikia.nocookie.net/__cb20110629190707/shipoffools/images/thumb/6/60/Senshi_Wanted.jpg/130px-Senshi_Wanted.jpg' alt='Roronoa Senshi'>";
    WikiaRailImageArray[6] = "<img src='https://images.wikia.nocookie.net/__cb20110515224221/shipoffools/images/thumb/5/58/Lucifer.jpg/185px-Lucifer.jpg' alt='Lucifer'>";
    WikiaRailImageArray[7] = "<img src='https://images.wikia.nocookie.net/__cb20110712235220/shipoffools/images/thumb/4/4d/1_-_Jolly_D._-_Stinky_-_Chris_-_Captain_and_Entertainer.jpg/185px-1_-_Jolly_D._-_Stinky_-_Chris_-_Captain_and_Entertainer.jpg' alt='Jolly D. Chris'>";
    WikiaRailImageArray[8] = "<img src='https://images.wikia.nocookie.net/__cb20110624200114/shipoffools/images/thumb/c/c4/John_Swift_Captain.jpg/185px-John_Swift_Captain.jpg' alt='Jonathan D. swift'>";
 
/* Choosing the image */
var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));
 
/* Adding the image */
$('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);