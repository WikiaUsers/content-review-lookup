/*Add 'blocked' notice into the message walls of those who cannot reply to messages*/
/*In order to drive away incoming messages*/
/*By Luma.dash using original and dev-wiki inspired coding*/
(function() {
    var obj = {
        getBlocked: function () { //get blocked user info.
        return mw.loader.using( "mediawiki.api" ).then(function () {
            return ( new mw.Api( ) ).get( { 
                    action : "query",
                    list: 'blocks',
                    bkusers: mw.config.get('wgTitle'),
                    bkprop: 'user|expiry|reason|flags',
                    format: 'json',
                } );
            });
        },
        getTemplate: function() { //get template html.
            return mw.loader.using( "mediawiki.api" ).then(function () {
                return ( new mw.Api( ) ).get( {   
                action : "parse",
                page : "Template:Blocked",
                prop : "text",
                disabletoc : true,
                formatversion : 2
                });
            });
        }, 
        reformatExpiry: function(expiry) {
        	if (expiry === "infinity") 
        		return expiry;
        	expiry = expiry.split('T');
			var date = expiry[0], time = expiry[1].replace('Z',''); //get rid of 'Z'
			date = date.split('-'); //split date elements
			var result = ""; //store the formatted expiry
			switch (date[1]) {
    			case "01":
        		result += time + " GMT, " + date[2] + " " + "January" + " " + date[0];
    			break;
    			case "02":
        		result += time + " GMT, " + date[2] + " " + "Feburary" + " " + date[0];
    			break;
    			case "03":
        		result += time + " GMT, " + date[2] + " " + "March" + " " + date[0];
    			break;
				case "04":
        		result += time + " GMT, " + date[2] + " " + "April" + " " + date[0];
        		break;
    			case "05":
        		result += time + " GMT, " + date[2] + " " + "May" + " " + date[0];
        		break;
    			case "06":
        		result += time + " GMT, " + date[2] + " " + "June" + " " + date[0];
        		break;
    			case "07":
    			result += time + " GMT, " + date[2] + " " + "July" + " " + date[0];
        		break;
    			case "08":
        		result += time + " GMT, " + date[2] + " " + "August" + " " + date[0];
        		break;
    			case "09":
        		result += time + " GMT, " + date[2] + " " + "September" + " " + date[0];
        		break;
    			case "10":
        		result += time + " GMT, " + date[2] + " " + "October" + " " + date[0];
        		break;
    			case "11":
        		result += time + " GMT, " + date[2] + " " + "November" + " " + date[0];
        		break;
    			case "12":
        		result += time + " GMT, " + date[2] + " " + "December" + " " + date[0];
        		break;
 }
			return result;
        },
        setTemplate: function() { //set the template on the message wall
            if (mw.config.get('wgCanonicalNamespace') !== "Message_Wall")  { //check if it's the message wall namespace
                return;
            }
            var strExpiry, strReason, strUser, blkuserObj;
            fetchedData = obj.getBlocked(); 
            fetchedData.then(function (blkuser) { //get block user info.
                blkuserObj = blkuser.query.blocks[0];
                if (blkuserObj === undefined || blkuserObj['allowusertalk'] !== undefined)  //if the user is not blocked, variable is not defined, throw an error
                    throw new Error("not blocked /or can use message wall.");
                strExpiry = obj.reformatExpiry(blkuserObj['expiry']), strReason = blkuserObj['reason'], strUser = blkuserObj['user'];
                }).then(function () { //if the error does not occur
                        obj.getTemplate().then( function( response ) {   //get template info for the handler
                                         var $parsedHTML = $(response.parse.text.split("<h2>")[0]);
                                         $parsedHTML.find('.duration').text(strExpiry);
                                         $parsedHTML.find('.reason').text(strReason);
                                         $parsedHTML.find('.link a').attr('href', '/wiki/Special:Log/block?page=User:'+ strUser);
                                         $('#mw-content-text').prepend($parsedHTML);
                                          
                             })}).catch(function (error) { //catch to the error in the first 'then'
                                importArticles({    type: 'script',    articles: [        'u:dev:MediaWiki:WallGreeting.js',    ]});
         });
        }
    };//end of object declaration
        obj.setTemplate(); //run the script
    })();