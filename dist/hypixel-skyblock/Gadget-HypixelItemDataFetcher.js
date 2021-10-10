//<pre>
(function(mw){
  var LUA_DATA_PAGE = 'Module:Item/ApiData';
  var HYPIXEL_ITEMS_API_URL = 'https://api.hypixel.net/resources/skyblock/items';

  function start() {
    Promise.all([
      fetchHypixelItems(),
      fetchLuaDataAsJson()
    ])
    .then(function(responses){
      var hypixelData = responses[0], oldLuaData = responses[1];
      if(hypixelData.lastUpdated <= oldLuaData.lastUpdated) {
        mw.notify("Skipping update", { title:"No new updates", type:"info" });
        reEnableButton();
        return;
      }

      var newItemsMap = hypixelData.items.reduce(function(obj, item){ obj[item.id] = item; return obj; }, {});
      var oldItemsMap = oldLuaData.items;

      // Detect new items and set dates
      var newItemDate = hypixelData.lastUpdated, newCount = 0;
      Object.keys(newItemsMap).forEach(function(key){
        if(!oldItemsMap[key]) {
          newCount++;
          newItemsMap[key].date = newItemDate;
        } else {
          newItemsMap[key].date = oldItemsMap[key].date;
        }
      });

      mw.notify("Found "+newCount+" new items - now saving new data", { title:"Fetch Successful", type:"info" });

      // Save fetched data
      saveToWiki({ lastUpdated:hypixelData.lastUpdated, items:newItemsMap }, newCount)
    })
    // Fandom doesn't like catch as a method name
    ["catch"](function(err){
      mw.notify("Unhandled Error - check web console", { title:"Error", type:"error" });
      console.error(err);
      reEnableButton();
    });
  }

  function fetchHypixelItems() {
    return fetch(HYPIXEL_ITEMS_API_URL).then(function(response){ return response.json(); });
  }

  function fetchLuaDataAsJson() {
  	return luaTableDataModuleToJson(LUA_DATA_PAGE);
    // return api().parse('{{'+LUA_DATA_PAGE+'}}').then(function(response){
    //   var luastr = response.match(new RegExp('<pre>(.*)<\/pre>', 'ms'))[1];
    //   return luaTableToJson(luastr);
    // });
  }

  function saveToWiki(json, newCount) {
    var lua = '-- <pre>\nreturn '+jsonToLuaTable(json);
    console.log(lua);

    api().postWithEditToken({
      action: "edit",
      text: lua,
      title: LUA_DATA_PAGE,
      summary: "Updating data"+(newCount > 0 ? ' - adding '+newCount+' new items' : ''),
      minor: true,
    })
    .then(function(){
      mw.notify("Refreshing page..", { title:"Save Successful!", type:"info" });
      window.location.reload();
    })
    // Fandom doesn't like catch as a method name
    ["catch"](function(err){
      mw.notify("Uncaught error! Check web console", { title:"Error", type:"error" });
      console.error(err);
      reEnableButton();
    });
  }

  /////////////////////
  // Helper Functions
  /////////////////////

  var _api;
  function api() {
    return _api ? _api : (_api = new mw.Api());
  }

  // Recursive json to lua conversion function
  function jsonToLuaTable(json, space, depth) {
  	space = typeof space === 'undefined' ? "  " : space;
  	depth = typeof depth === 'undefined' ? -1 : depth;
    depth++;
    if(Array.isArray(json)) {
      return "{ "+json.map(function(o){ return jsonToLuaTable(o, space, depth) }).join(", ")+" }";
    }
    else if(typeof json === "object") {
      var indent = "  ".repeat(depth);
      return "{\n"
        +Object.entries(json).map(function(data){
          return indent+space+"['"+data[0]+"']="+jsonToLuaTable(data[1], space, depth);
        }).join(",\n")
      +"\n"+indent+"}";
    }
    // Otherwise seems to be normal value; done on this branch!
    else {
      return typeof json === "string" ? "\""+json.replaceAll("\"", "\\\"")+"\"" : json;
    }
  }

  //function luaTableToJson(lua) {
  //  return api().post({
  //    action: "scribunto-console",
  //    title: mw.config.get("wgPageName"),
  //    question: "=mw.text.jsonEncode(p)",
  //    content: lua,
  //  })
  //  .then(function(response){ return response.return })
  //  .then(function(data){
  //    return JSON.parse(data);
  //  });
  //}

  function luaTableDataModuleToJson(moduleName) {
    return api().post({
      action: "scribunto-console",
      title: mw.config.get("wgPageName"),
      question: "=mw.text.jsonEncode(require('"+moduleName+"'))"
    })
    .then(function(response){ return response.return })
    .then(function(data){
      return JSON.parse(data);
    });
  }
  
  function reEnableButton() {
  	$("#hswUpdateItemData").attr('disabled', false).text("Try Again");
  }

  $("#hswUpdateItemData").on("click", function(){
  	$(this).attr('disabled', true).text("Fetching Data...")
  	start();
  });
})(mediaWiki);
//</pre>