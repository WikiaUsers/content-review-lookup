/*{{Protected}}
/*jslint browser: true, devel: true*/
(function (window) {
    "use strict";
    /* Utilities */
    function proxy(fn, ctx, arg) {
        return function () {
            fn.call(ctx, arg);
        };
    }
    function addClass(e, cls) {
        var out = e.className + " " + cls;
        e.className = out.replace(/(^\s+|\s+$)/g, '');
    }
    function removeClass(e, cls) {
        var out = e.className.replace(new RegExp("(^|\\s)" + cls + "(\\s|$)"), " ");
        e.className = out;
    }
    function arrayIsEqual(arr1, arr2) {
        // Determine if arr1 is arr2 for all elements
        var i, len = arr1.length;
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (i = 0; i < len; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
    function copyArray(arr) {
        var ret = [], i, len = arr.length;
        for (i = 0; i < len; i += 1) {
            ret[i] = arr[i];
        }
        return ret;
    }

    /* QueryString */
    function QueryStringParameter(name, value) {
        this.name = name;
        this.value = value;
    }
    QueryStringParameter.prototype.set = function (value) {
        this.value = value;
    };
    QueryStringParameter.prototype.toString = function () {
        if (this.name === undefined) {
            throw new Error("QueryStringParameter has no name.");
        }
        return this.name + "=" + (this.value || "");
    };
    function QueryString(q) {
        this.push.apply(this, QueryString.parse(q));
    }
    QueryString.prototype.push = Array.prototype.push;
    QueryString.prototype.length = 0;
    QueryString.parse = function (str) {
        var qString, i, len, fpos, ret = [], cParam, cParamName, cParamValue;
        if (typeof str !== 'string') {
            return ret;
        }
        qString = str.substr(1);
        qString = qString.split("&");
        for (i = 0, len = qString.length; i < len; i += 1) {
            cParam = qString[i];
            fpos = cParam.indexOf('=');
            cParamName = cParam.substr(0, fpos);
            cParamValue = cParam.substr(fpos + 1);
            ret.push(new QueryStringParameter(cParamName, cParamValue));
        }
        return ret;
    };
    QueryString.prototype.toString = function () {
        var ret = '?', i, arr = [], len;
        for (i = 0, len = this.length; i < len; i += 1) {
            arr.push(String(this[i]));
        }
        ret += arr.join('&');
        return ret;
    };
    QueryString.prototype.get = function (p) {
        var i, len = this.length;
        for (i = 0; i < len; i += 1) {
            if (this[i].name === p) {
                return this[i];
            }
        }
        return;
    };
    QueryString.prototype.getValue = function (p) {
        var queryParam = this.get(p);
        if (queryParam) {
            return queryParam.value;
        }
        return;
    };
    QueryString.prototype.set = function (p, v) {
        var queryParam = this.get(p);
        if (queryParam === undefined) {
            queryParam = new QueryStringParameter(p);
            this.push(queryParam);
        }
        queryParam.set(v);
    };
    QueryString.prototype.eq = function (p, v) {
        var queryParam = this.get(p);
        return queryParam && queryParam.value === v;
    };
    QueryString.prototype.neq = function (p, v) {
        return !this.eq(p, v);
    };

    /* BasinMonitor */
    function Basin(e) {
        // Basin data container
        this.container = e;
        this.timeElement = e.children[0];
        this.history = [];
        this.timeLit = 0;
        this.active = false;
        // set time to now - 3h
        this.setTime(+new Date() - Basin.TIME_FILL);
    }
    // Statics used for calculations
    Basin.TIME_SEC = 1000;
    Basin.TIME_MIN = 60 * Basin.TIME_SEC;
    Basin.TIME_HR = 60 * Basin.TIME_MIN;
    Basin.TIME_FILL = 3 * Basin.TIME_HR;
    Basin.pad = function (subj, str, len) {
        subj = String(subj);
        str = String(str);
        while (subj.length < len) {
            subj = str + subj;
        }
        return subj;
    };
    Basin.prototype.getTimestamp = function (mins) {
        var timeStr = [];
        // Push hours, minutes and convert to string with colon separator
        timeStr.push(Basin.pad(Math.floor(mins / 60), "0", 1));
        timeStr.push(Basin.pad(mins % 60, "0", 2));
        timeStr = timeStr.join(":");
        return timeStr;
    };
    Basin.prototype.displayTime = function () {
        var timeElement = this.timeElement, timestamp = this.getTimestamp(this.getMinutes());
        if (this.timestamp !== timestamp) {
            while (timeElement.lastChild !== null) {
                timeElement.removeChild(timeElement.lastChild);
            }
            timeElement.appendChild(document.createTextNode(timestamp));
            this.timestamp = timestamp;
        }
        return true;
    };
    Basin.prototype.isActive = function () {
        return !!this.active;
    };
    Basin.prototype.setActive = function () {
        if (!this.active) {
            this.active = true;
            return true;
        }
        return false;
    };
    Basin.prototype.clearActive = function () {
        if (this.active) {
            this.active = false;
            return true;
        }
        return false;
    };
    Basin.prototype.getMinutes = function () {
        // Return the number of minutes until the basin expires
        var tExpiry, tDiff;
        tExpiry = this.timeLit + Basin.TIME_FILL;
        tDiff = (tExpiry - +new Date());
        return Math.max(0, Math.floor(tDiff / Basin.TIME_MIN));
    };
    Basin.prototype.setTime = function (t) {
        this.history.push(t);
        this.timeLit = t;
    };
    Basin.prototype.getTime = function () {
        return (this.timeLit + Basin.TIME_FILL) - +new Date();
    };
    Basin.states = [
        // 90 <= x <= 120
        70,
        // 60 <= x < 90
        40,
        // 30 <= x < 60
        20,
        // 15 <= x < 30
        10,
        // 0 <= x < 15
        0
    ];
    Basin.stateNames = [
        'lb-01',
        'lb-02',
        'lb-03',
        'lb-04',
        'lb-05'
    ];
    Basin.prototype.setState = function (i) {
        var pState = this.state;
        this.state = i;
        removeClass(this.container, Basin.stateNames[pState]);
        addClass(this.container, Basin.stateNames[this.state]);
        return true;
    };
    Basin.prototype.updateState = function () {
        var time = this.getMinutes(), states = Basin.states, i, len = states.length;
        for (i = 0; i < len; i += 1) {
            if (time >= states[i]) {
                if (this.state === i) {
                    return false;
                }
                this.setState(i);
                return true;
            }
        }
        return true;
    };
    Basin.prototype.update = function () {
        this.displayTime();
        this.updateState();
    };
    function BasinMonitor(basinContainer) {
        this.container = basinContainer;
        // Update tick for scheduling updates
        this.tick = 0;
        // Basin name/id mapping
        this.names = [];
        // Query string for the current state
        this.query = new QueryString();
        this.query.set("use_query", "1");
        // None start as active
        this.active = -1;
        // Add the basins (not reusable)
        // TODO make reusable
        this.addBasin("Svargrond", "basin-svargrond");
        this.addBasin("PlainsOfHavoc", "basin-plainsofhavoc");
        this.addBasin("ForbiddenLands", "basin-forbiddenlands");
        this.addBasin("Kazordoon", "basin-kazordoon");
        this.addBasin("Ramoa", "basin-ramoa");
        this.addBasin("Edron", "basin-edron");
        this.addBasin("Drefia", "basin-drefia");
        this.addBasin("Hellgate", "basin-hellgate");
        this.addBasin("Tarpit", "basin-tarpit");
        this.addBasin("Yalahar", "basin-yalahar");
        // Container for time input, only 1 can be active at once
        this.timeInputElementContainer = document.createElement("div");
        this.timeInputElementContainer.className = "lb-input-container";
        this.timeInputElement = document.createElement("input");
        this.timeInputElementContainer.appendChild(this.timeInputElement);
        this.timeInputElementContainer.appendChild(document.createTextNode(" minutes ago"));
        // Basin tools (link to share)
        this.basinTools = document.getElementById("basin-tools");
        // Static URL description
        this.staticurlDescription = document.createElement("span");
        this.staticurlDescription.className = "static-url-desc";
        this.staticurlDescription.appendChild(document.createTextNode("Share these times:"));
        // Static URL output
        this.staticurl = document.createElement("input");
        this.staticurl.id = "basin-tools-url";
        this.staticurl.readonly = "readonly";
        // Add to container
        this.basinTools.appendChild(this.staticurlDescription);
        this.basinTools.appendChild(document.createElement("br"));
        this.basinTools.appendChild(this.staticurl);
    }
    BasinMonitor.prototype.push = Array.prototype.push;
    BasinMonitor.prototype.length = 0;
    BasinMonitor.prototype.addBasin = function (name, id) {
        var basin, element = document.getElementById(id);
        if (!element) {
            throw new Error("No timer element with id " + id);
        }
        basin = new Basin(element);
        this.names[this.length] = name;
        this.push(basin);
    };
    BasinMonitor.prototype.getBasinIndex = function (name) {
        return this.names.indexOf(name);
    };
    BasinMonitor.prototype.update = function () {
        var i, len = this.length;
        for (i = 0; i < len; i += 1) {
            this[i].update();
        }
    };
    BasinMonitor.prototype.getBasin = function (name) {
        return this[this.getBasinIndex(name)];
    };
    BasinMonitor.prototype.getActiveBasin = function () {
        if (this.active === -1) {
            return null;
        }
        return this[this.active] || null;
    };
    BasinMonitor.prototype.clearActive = function () {
        this[this.active].clearActive();
        this[this.active].container.removeChild(this.timeInputElementContainer);
        this.active = -1;
        return true;
    };
    BasinMonitor.prototype.setActive = function (basinId) {
        if (isNaN(basinId)) {
            throw new Error("Invalid basinId: expected number and instead found " + (typeof basinId));
        }
        if (basinId === -1) {
            return this.clearActive();
        }
        if (this[basinId]) {
            if (this.active !== -1) {
                this.clearActive();
            }
            this.active = basinId;
            this[basinId].setActive();
            this[basinId].container.appendChild(this.timeInputElementContainer);
            return true;
        }
        return false;
    };
    BasinMonitor.prototype.updateTime = function () {
        // Update each 5 iterations
        if (!(this.tick % 1)) {
            this.update();
        }
        // Normally we do this when time is set, but check anyway infrequently
        if (!(this.tick % 60)) {
            this.showStaticUrl();
            this.sort();
        }
        // Advance the tick for the next update
        this.tick += 1;
    };
    BasinMonitor.prototype.setBasinTimeRelative = function (basin, rtime) {
        return this.setBasinTime(basin, +new Date() + rtime);
    };
    BasinMonitor.prototype.showStaticUrl = function () {
        var loc = window.location, SHORT_URL = '';
        SHORT_URL = 'tibia.wikia.com/wiki/Project:Tools/Lightbearer_Basin_Monitor';
        if (this.staticurl) {
            this.staticurl.value = (SHORT_URL || (loc.protocol + (loc.port !== '' ? ':' + loc.port : '') + "//" + loc.host + loc.pathname)) + this.query.toString();
            return true;
        }
        return false;
    };
    BasinMonitor.prototype.setBasinTime = function (basin, time) {
        var b = this[basin];
        if (!b) {
            throw new Error("Cannot find basin " + basin);
        }
        if (isNaN(time)) {
            // Assume 2h ago
            time = +new Date() - Basin.TIME_FILL;
        }
        b.setTime(time);
        this.query.set("t-" + basin, Math.floor(time / 1000));
        this.showStaticUrl();
        this.sort();
    };
    BasinMonitor.prototype.testTimes = function () {
        var time = new Date(), i, len, t = +time;
        len = this.length;
        for (i = 0; i < len; i += 1) {
            this.setBasinTime(i, t - Basin.TIME_FILL + i * 12 * Basin.TIME_MIN);
        }
    };
    BasinMonitor.prototype.loadFromQuery = function () {
        var qString = new QueryString(window.location.search), i, len, names = this.names;
        if (qString.getValue("use_query") === "1") {
            for (i = 0, len = names.length; i < len; i += 1) {
                this.setBasinTime(i, +(qString.getValue("t-" + i) || 0) * 1000);
            }
        }
    };
    BasinMonitor.prototype.setClickEvent = function (basinId) {
        var input = this.timeInputElement, basin = this[basinId];
        input.addEventListener("keypress", function (e) {
            var txt;
            // Enter = submit
            if (e.keyCode === 13) {
                e.preventDefault();
                txt = this.value;
                if (isNaN(txt)) {
                    alert("Expected a number input, instead found " + txt);
                    return false;
                }
                basin.setTime(+new Date() - Basin.TIME_MIN * parseInt(txt, 10));
                input.value = '';
                return true;
            }
        });
        basin.container.appendChild(input);
    };
    BasinMonitor.prototype.sort = function () {
        var init, sorted = [], i, len = this.length, ctx = this;
        if (!this.order) {
            init = [];
            for (i = 0; i < len; i += 1) {
                init[i] = i;
            }
            this.order = init;
        }
        init = this.order;
        sorted = copyArray(init);
        sorted.sort(function (a, b) {
            return ctx[a].timeLit - ctx[b].timeLit;
        });
        if (!arrayIsEqual(init, sorted)) {
            for (i = 0; i < len; i += 1) {
                this.container.appendChild(this[sorted[i]].container);
            }
            this.order = sorted;
        }
    };
    BasinMonitor.prototype.setGlobalEvents = function () {
        var ctx = this;
        document.addEventListener("click", function () {
            if (ctx.active !== -1) {
                ctx.clearActive();
            }
            return true;
        });
        this.container.addEventListener("click", function (e) {
            e.stopPropagation();
            return false;
        });
        this.timeInputElement.addEventListener("keypress", function (e) {
            var txt;
            // Enter = submit
            if (ctx.active === -1) {
                throw new Error("Invalid active (? should never occur).");
            }
            if (e.keyCode === 13) {
                txt = this.value;
                if (isNaN(txt)) {
                    alert("Expected a number input, instead found " + txt);
                    return false;
                }
                ctx.setBasinTime(ctx.active, +new Date() - Basin.TIME_MIN * parseInt(+txt, 10));
                this.value = '';
                return true;
            }
        });
        this.staticurl.addEventListener("click", function () {
            this.select();
        });
    };
    BasinMonitor.prototype.setTimeClickEvent = function (basinId) {
        var ctx = this, basin = this[basinId];
        basin.timeElement.addEventListener("click", function (e) {
            // Cancel immediate refocus
            e.preventDefault();
            e.stopPropagation();
            ctx.setActive(basinId);
            // Focus on the time element to be shown
            ctx.timeInputElement.focus();
            return false;
        });
    };
    BasinMonitor.prototype.setEvents = function () {
        var i = 0, len = this.length;
        this.setGlobalEvents();
        for (i = 0; i < len; i += 1) {
            this.setTimeClickEvent(i);
        }
    };
    // Initial setup
    (function (ns) {
        var lbmonitor = new BasinMonitor(document.getElementById("lb-basin-list"));
        lbmonitor.setEvents();
        lbmonitor.loadFromQuery();
        lbmonitor.loopTimer = setInterval(proxy(lbmonitor.updateTime, lbmonitor), 1000);
        ns.basins = lbmonitor;
    }(window));
}(window));