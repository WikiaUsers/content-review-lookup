(function(window, $, mw){
    const LIMIT = 6,
          LINE_PATTERN = /^([\*]+)(?:\s|)(.*)$/,
          SUBNAV_PARENT_CLASS = "wds-dropdown-level-$l",
          SUBNAV_TOGGLE_CLASS = "wds-dropdown-level-$l__toggle",
          SUBNAV_DROPDOWN_CLASS = "wds-dropdown-level-$l__content",
          NAVIGATION = "MediaWiki:Wiki-navigation";
          
    let Navigation = {};
    
    Navigation.API = new mw.Api();
    
    Navigation.getText = new Promise(function(resolve, reject){
        Navigation.API.get({
            action: "query",
            prop: "revisions",
            rvprop: "content",
            titles: NAVIGATION,
            indexpageids: true,
            format: "json"
        }).done(resolve).fail(reject);
    });
    
    Navigation.load = new Promise(function(resolve, reject){
        Navigation.getText.then(function(result){
            if ("error" in result && result.error){ reject(result.error); return }
            
            let query = result.query, pageids = query.pageids, pageid = pageids[0];
            
            if (pageid === "-1"){ reject("The page has not been found."); return; }
            
            let page = query.pages[pageid], rev = page.revisions[0], content = rev["*"];
            
            let lines = content.split(/\r|\r\n|\n/);
            if (!lines.length){ reject("There are no lines on this text file!"); return; }
            
            resolve(lines);
        })["catch"](reject);
    });
    
    Navigation.process = function(){
        Navigation.load.then(function(lines){
            let line, index = 0, currentLevel = 1;
            while ((line = lines[index])){
                if (!LINE_PATTERN.test(line)) continue;
                let ex = Array.from(LINE_PATTERN.exec(line)).slice(1);
                let level = ex[0], name = ex[1] || "";
                
                if (name === "") continue;
                name = name.trim();
                level = level.trim();
                
                level = level.length;
                
                if (index === 0 && level > 1) throw new ReferenceError("The first item must be on the first level.");
                if ((level - currentLevel) > 1) continue;
                
            }
        })["catch"](console.error);
    };
}(window, $, mediaWiki));