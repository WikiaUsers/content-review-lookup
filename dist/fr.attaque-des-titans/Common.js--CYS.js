/***************************************************
 * Author : @Think D. Solucer                   ****
 * Name: CYS (color your staff !)               ****
 * Idea : Emperor Jarjarkine                    ****
 **************************************************/
 console.log('CYS V1.03');
(function(mw) {
var 
    sysops=[],
    rollbacks=[],
    bots=[],
    groups=['sysop','rollback','bot'],
    BotColor='#F6E497',
    SysColor='#00FF00',
    RollColor='#990099',
    k=0,
    j=0,
    i=0;

function setUserColor(user,color_user)
    {
        var styles = { 
          color: color_user,
          fontWeight: "bold",
        };
        $("a:contains("+user+")").css(styles);
    }

function setColorGroup(group)
  {
    var list=[];
    new mw.Api().get({
          action: 'query',
          list: 'allusers',
          augroup: group,
        })
        .done(function(d)
        {
          if( !d.error )
            {
              var data=d.query;
              for(i in data.allusers)
                  list[i]=data.allusers[i].name;
              switch(group)
                {
                    case 'sysop':
                        for(j=0;j<=i;j++)
                          setUserColor(list[j],SysColor);
                        break;
                    case 'rollback':
                        for(j=0;j<=i;j++)
                          setUserColor(list[j],RollColor);
                        break;
                    case 'bot':
                        //for(j=0;j<=i;j++)
                          //setUserColor(list[j],BotColor);
                        break;
                      default:
                        break;
                }
            }
        })
        .fail(function()
        {
          console.log('Echec script CYS: Pas pu récuperer les '+group);
        });
        return list;
      }

for(k in groups)
  setColorGroup(groups[k]);
  
// Pour les autres utilisateurs (impossible à récuperer correctement depuis l'api)

setUserColor('To bot or not to bot',BotColor);
  
})(this.mediaWiki);