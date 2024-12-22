/* Any JavaScript here will be loaded for all users on every page load. */

switch (mw.config.get('wgPageName')) {
    case 'Dragon_Elements':
    case 'Table_of_Dragons':
    case 'Category:Trophy_Type_Dragons':
    case 'Category:Zoomer_Type_Dragons':
    case 'Category:Worker_Type_Dragons':
    case 'Category:Harvester_Type_Dragons':
    case 'Category:Builder_Type_Dragons':
    case 'Category:Defender_Type_Dragons':
    case 'Category:Bronze_Rank_Dragons':
    case 'Category:Platinum_Rank_Dragons':
    case 'Category:Gold_Rank_Dragons':
    case 'Category:Silver_Rank_Dragons':
    case 'Category:Arcadia_Dragons':
    case 'Category:Coin_Dragons':
    case 'Category:Shiny_Dragons':
    case 'Category:Breeding_Exclusive_Dragons':
         $(document).ready(function(){
             const myNodelist = document.querySelectorAll('[id$="Table"]');
             var text="";
             myNodelist.forEach(function(node,index){
                const rowCount = node.rows.length - 1;
                const cap = node.querySelector('Caption');
                cap.innerHTML = cap.innerHTML + " (" + rowCount + " Entries)";
             }); 
        });
        break;
}