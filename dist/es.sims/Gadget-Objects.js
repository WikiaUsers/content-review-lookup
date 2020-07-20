//--------------------------------------------------------------------------------------------objAJAX
function objAJAX() {
        // AJAX taken from http://jibbering.com/2002/4/httprequest.html. Thanx :)
        this.conn = false
        /*@cc_on @*/
        /*@if (@_jscript_version >= 5)
        // JScript gives us Conditional compilation, we can cope with old IE versions.
        // and security blocked creation of the objects.
        try {
                this.conn = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
                try {
                        this.conn = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (E) {
                        this.conn = false
                }
        }
        @end @*/
        if (!this.conn && typeof XMLHttpRequest != 'undefined') {
                try {
                        this.conn = new XMLHttpRequest()
                } catch (e) {
                        this.conn = false
                }
        }
        if (!this.conn && window.createRequest) {
                try {
                        this.conn = window.createRequest()
                } catch (e) {
                        this.conn = false
                }
        }

        this.url = null
        this.requestType = "GET"
        this.unsync = true
        this.parser = new objHTMLparser()
}

objAJAX.prototype.sendRequest = function (url, type, unsync, data) {
        if (!this.conn)
                return null
        if (this.conn.readyState != 0 && this.conn.readyState != 4)
                return "busy"
        if (url)
                this.url = url
        if (type)
                this.requestType = type
        if (unsync != null)
                this.unsync = unsync
//alert(this.requestType + " ++ " + this.url + " ++ " + this.unsync)
        this.conn.open(this.requestType, this.url, this.unsync)
        this.conn.send(data)
}

objAJAX.prototype.getResult = function () {
        if (!this.conn)
                return null
        return this.conn.responseText
}

objAJAX.prototype.abort = function () {
        this.conn.onreadystatechange = null
        this.conn.abort()
}

//------------------------------------------------------------------------------------------ObjCookie

function objCookies() {
        this.value = null
        this.name = null
        this.expires = null
}

objCookies.prototype.get = function (which) {
        this.allcookies = document.cookie
        var start = this.allcookies.indexOf("; " + which + "=")
        if (start == -1) {
                start = this.allcookies.indexOf(which + "=")
                if (start != 0)
                        return null
        } else
                start += "; ".length
        this.name = which
        var end = this.allcookies.indexOf(";", start)
        if (end == -1)
                end = this.allcookies.length
        this.value = this.allcookies.substring(start + which.length + 1, end)
        var arr = this.allcookies.substring(start, this.allcookies.length).split("; ")
        this.expires = null
        if (arr.length > 0)
                if (/expires=/.test(arr[1]))
                        this.expires = arr[1].substring("expires=".length, arr[1].length)
        return decodeURIComponent(this.value)
}

objCookies.prototype.set = function (name, value, expires) {
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + (expires ? "expires=" + expires + ";" : "") + "path=/;" + "domain=es.wikipedia.org;"
        this.allcookies = document.cookie
}

objCookies.prototype.setWithDelay = function (name, value, delay) {
// delay is in millisecond
        var d = new Date()
        d.setTime(d.getTime() + delay)
        this.set(name, value, d.toGMTString())
}

objCookies.prototype.kill = function (which) {
        if (this.get(which))
                this.set(which, null, "Thu, 01-Jan-70 00:00:01 GMT")
}

//--------------------------------------------------------------------------------------objHTMLparser

function objHTMLparser(str) {
        this.html = str
}

objHTMLparser.prototype.parse = function (elmt, str) {
	if (str !== null)
		this.html = str
	if (this.html.indexOf("<" + elmt) == -1 || this.html.indexOf("</" + elmt + ">") == -1)
		return null
	var arr1 = this.html.split("<" + elmt)
	var elmts = new Array()
	for (var cpt = 1 ; cpt < arr1.length ; cpt++) {
		var el = new Object()
		el.innerHTML = arr1[cpt].substring(arr1[cpt].indexOf(">"), arr1[cpt].length).split("</" + elmt)[0]
		var prop = arr1[cpt].split(">")[0].split(/\s/g)
		for (var cpt1 = 1 ; cpt1 < prop.length ; cpt1++) {
			if (prop[cpt1].indexOf("=") != -1)
				el[prop[cpt1]] = true
			else
				el[prop[cpt1].split("=")[0]] = prop[cpt1].substring(prop[cpt1].indexOf("="), prop[cpt1].length)
		}
		elmts[cpt - 1] = el
	}
	this.elmts[elmt] = elmts
}

var ajax = new objAJAX()
var cookies = new objCookies()