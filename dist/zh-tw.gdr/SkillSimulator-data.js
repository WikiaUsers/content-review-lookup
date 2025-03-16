var jobSkillData = [];

//replace #JOBNAME# to get data from Lua Modules
var DBUrl = "模組:【資料庫】技能/#JOBNAME#?action=raw&ctype=application/json";

function GetJobSkillDataFromDb(jobpos, jobValue) {
    return $.ajax({
        url: DBUrl.replace("#JOBNAME#", jobValue),
        dataType: "TEXT",
        success: function(data) {
        	//data: start with local tDataBasic....and end with return tDataBasic in lua format
        	data = data.replace(/^local tDataBasic = {}[\s\S]*tDataBasic.Data =/, '').replace(/return tDataBasic[\s\S]*$/, ''); //remove begin and end
        	parseToJobSkillData(jobpos, parseLuaToJson(data));
        	//jobSkillData[jobpos] = JSON.parse()
        }
    });
}

function parseToJobSkillData(jobpos, jobData){
	jobSkillData[jobpos] = jobData;
}

function parseLuaToJson(luaDataString) {
	var iContents = convert(luaDataString, 0, []);
	var i = iContents[0];
	var contents = iContents[1];

    function isValue(element) {
        var idx = contents.indexOf(element) + 1;
        for (var i = idx; i < contents.length; i++) {
            if (["SPACE", "TAB", "RETURN"].indexOf(contents[i].type) > -1) continue;
            if (contents[i].type == "SPLIT") return 0;
            if (contents[i].type == "BRKT_F") return 2;
            if (["BRKT_S", "BRKT_W", "BREAK", "FBREAK"].indexOf(contents[i].type) > -1) return 1;

        }
    }
    var converted = "";
    contents.forEach(function(element, index) {
        switch (element.type) {
            case "NUMBER": {
                converted += element.content;
                break;
            }
            case "UNKNOWN": {
                if (isValue(element) == 1) {
                    if (element.content == "return") {

                    } else if (["true", "false"].indexOf(element.content) > -1) {
                        converted += element.content;
                    } else {
                        converted += '"' + element.content + '"';
                    }
                } else if (isValue(element) == 2) {
                    converted += element.content;
                } else {
                    converted += '"' + element.content + '"';
                }
                break;
            }
            case "STR_S":
            case "STR_D": {
                converted += element.content;
                break;
            }
            case "BRKT_S": {
                converted += element.content;
                break;
            }
            case "BRKT_W": {
                converted += element.content;
                break;
            }
            case "BRKT_F": {
                converted += element.content;
                break;
            }
            case "SPACE": {
                converted += element.content;
                break;
            }
            case "TAB": {
                converted += element.content;
                break;
            }
            case "RETURN": {
                converted += element.content;
                break;
            }
            case "BREAK": {
                converted += ",";
                break;
            }
            case "FBREAK": {
                converted += ".";
                break;
            }
            case "SPLIT": {
                converted += ":";
                break;
            }
        }
    });
    var data = {};
    try{
    	if(converted != null && converted != ""){
    		data = JSON.parse(converted);
    	}
    } catch (e) {
        console.error('Lua to json object error: ', e);
        return null;
    }
    return data;
}


function getBracketSurfaceInner(contents, element) {
    if (["BRKT_S", "BRKT_W", "BRKT_F"].indexOf(element.type) == -1 || "]})".indexOf(element.content) == -1) return "";
    var idx = contents.indexOf(element);
    var innerElements = [];
    var nest = 1;
    for (var i = idx - 1; i >= 1; i--) {
        if (["BRKT_S", "BRKT_W", "BRKT_F"].indexOf(contents[i].type) >= 0) {
            if ("]})".indexOf(contents[i].content) >= 0) {
                nest++
            }
            if ("[{(".indexOf(contents[i].content) >= 0) {
                nest--
            }
        }
        if (nest == 0 && contents[i].type == element.type) {
            return innerElements;
        }
        if (nest == 1) {
            innerElements.unshift(contents[i]);
        }
    }
    return innerElements;
}

function removeLastCamma(contents, element) {
    var idx = contents.indexOf(element);
    var last = -1;
    for (var i = idx - 1; i >= 1; i--) {
        if (["NUMBER", "UNKNOWN", "STR_S", "STR_D"].indexOf(contents[i].type) >= 0) return;
        if (contents[i].type == "BREAK") {
            last = i;
            break;
        }
    }
    contents.splice(last, 1);
}

function convert(text, pos, contents) {
    var MODE = undefined;
    // NUMBER
    // UNKNOWN
    // SPLIT
    // BREAK
    // FBREAK
    // STR_S
    // STR_D
    // BRKT_S
    // BRKT_W
    // BRKT_F
    // CTRL
    // RETURN
    var MODES = [MODE];
    var content = "",
        currentElement;
    var i, c;

    function PUSH_BEFORE(replace) {
        if (content.length > 1) {
            contents.push({
                type: MODE,
                content: content.slice(0, content.length - 1),
            });
        }
        content = "" + (replace ? replace : c);
        currentElement = contents[contents.length - 1];
        MODE = MODES.shift();
    }

    function PUSH_AFTER(replace) {
        if (content.length > 0) {
            var str = (replace ? content.slice(0, content.length - 1) + replace : content.slice(0, content.length));
            contents.push({
                type: MODE,
                content: str,
            });
        }
        content = "";
        currentElement = contents[contents.length - 1];
        MODE = MODES.shift();
    }
    for (i = pos; i < text.length; i++) {
        c = text.charAt(i);
        content = content + c;
        if (MODE == "ESCAPE") {
            MODE = MODES.shift();
        } else
        if (MODE == "STR_S") {
            if (c == "'") {
                PUSH_AFTER('"');
            }
        } else
        if (MODE == "STR_D") {
            if (c == '"') {
                PUSH_AFTER();
            }
        } else
        if (MODE == "BRKT_S") {
            if (c == ']') {
                PUSH_BEFORE();
            }
        } else
        if (MODE == "BRKT_F") {
            if (c == ')') {
                PUSH_BEFORE();
            }
        } else
        if (MODE == "BRKT_W") {
            if (c == '}') {
                PUSH_BEFORE();
            }
        } else {
            switch (c) {
                case "{": {
                    PUSH_BEFORE();
                    MODE = "BRKT_W";
                    var begin_idx = contents.length;
                    contents.push({
                        type: MODE,
                        content: c,
                    });
                    MODES.push(MODE);
                    var fInnerContents = convert.call(this, text, i + 1, contents);
					var f = fInnerContents[0];
					var innerContents = fInnerContents[1];
                    removeLastCamma(contents, contents[contents.length - 1]);
                    var surface = getBracketSurfaceInner(innerContents, innerContents[innerContents.length - 1]);
                    var d = 0;
                    for (var l = 0; l < surface.length; l++) {
                        if (surface[l].type == "SPLIT") {
                            d = 1;
                            break;
                        }
                    }
                    i = f;
                    content = "";
                    if (d == 0) {
                        contents[begin_idx].type = "BRKT_S";
                        contents[begin_idx].content = "[";
                        contents[contents.length - 1].type = "BRKT_S";
                        contents[contents.length - 1].content = "]";
                        MODE = MODES.shift() | "BRKT_S";
                    } else {
                        MODE = MODES.shift() | "BRKT_W";
                    }
                    break;
                }
                case "}": {
                    PUSH_BEFORE();
                    contents.push({
                        type: "BRKT_W",
                        content: c,
                    });
                    return [i, contents];
                    break;
                }
                case "[": {
                    PUSH_BEFORE();
                    MODE = "BRKT_S";
                    var begin_idx = contents.length;
                    contents.push({
                        type: MODE,
                        content: c,
                    });
                    MODES.push(MODE);
                    var fInnerContents = convert.call(this, text, i + 1, contents);
					var f = fInnerContents[0];
					var innerContents = fInnerContents[1];
                    removeLastCamma(contents, contents[contents.length - 1]);
                    innerContents = getBracketSurfaceInner(contents, contents[contents.length - 1]);
                    var d = 0;
                    for (var l = 0; l < innerContents.length; l++) {
                        if (["BREAK", "BRKT_F"].indexOf(innerContents[l].type) > -1) {
                            d = 1;
                            break;
                        }
                    }
                    if (d == 0) {
                        contents[begin_idx].type = "NOP";
                        contents[begin_idx].content = "";
                        contents[contents.length - 1].type = "NOP";
                        contents[contents.length - 1].content = "";
                    }
                    i = f;
                    content = "";
                    MODE = MODES.shift() | "BRKT_S";
                    break;
                }
                case "]": {
                    PUSH_BEFORE();
                    contents.push({
                        type: "BRKT_S",
                        content: c,
                    });
                    return [i, contents]
                    break;
                }
                case "(": {
                    PUSH_BEFORE()
                    MODE = "BRKT_F"
                    var begin_idx = contents.length;
                    contents.push({
                        type: MODE,
                        content: c,
                    });
                    MODES.push(MODE);
                    var fInnerContents = convert.call(this, text, i + 1, contents);
					var f = fInnerContents[0];
					var innerContents = fInnerContents[1];
                    removeLastCamma(contents, contents[contents.length - 1]);

                    innerContents = getBracketSurfaceInner(contents, contents[contents.length - 1]);

                    contents[begin_idx].type = "BRKT_F";
                    contents[begin_idx].content = "(";
                    contents[contents.length - 1].type = "BRKT_F";
                    contents[contents.length - 1].content = ")";

                    i = f
                    content = ""
                    MODE = MODES.shift() | "BRKT_F"
                    break;
                }
                case ")": {
                    PUSH_BEFORE()
                    contents.push({
                        type: "BRKT_F",
                        content: c,
                    });
                    return [i, contents]
                    break;
                }
                case "'": {
                    if (MODE == "STR_D") {
                        break;
                    }
                    PUSH_BEFORE('"')
                    MODE = "STR_S"
                    break;
                }
                case '"': {
                    if (MODE == "STR_S") {
                        break;
                    }
                    PUSH_BEFORE()
                    MODE = "STR_D"
                    break;
                }
                case "\\": {
                    MODES.push(MODE)
                    MODE = "ESCAPE"
                    break;
                }
                case ",": {
                    PUSH_BEFORE()
                    MODE = "BREAK"
                    break;
                }
                case ".": {
                    PUSH_BEFORE()
                    MODE = "FBREAK"
                    break;
                }
                case "=": {
                    PUSH_BEFORE(":")
                    MODE = "SPLIT"
                    break;
                }
                case ":": {
                    PUSH_BEFORE()
                    MODE = "SPLIT"
                    break;
                }
                case " ": {
                    if (MODE != "SPACE") {
                        PUSH_BEFORE()
                        MODE = "SPACE"
                    }
                    break;
                }
                case "\t": {
                    if (MODE != "TAB") {
                        PUSH_BEFORE()
                        MODE = "TAB"
                    }
                    break;
                }
                case "\n": {
                    PUSH_BEFORE()
                    MODE = "RETURN"
                    break;
                }
                default: {
                    if (" SPACE TAB RETURN BREAK FBREAK SPLIT ".indexOf(" " + MODE + " ") > -1) {
                        PUSH_BEFORE()
                    }

                    if (!isNaN(content)) {
                        MODE = "NUMBER"
                    } else {
                        MODE = "UNKNOWN"
                    }

                    break;
                }
            }
        }
    }
    return [i, contents]
}