// origin es+ version of [[MediaWiki:PttHighlight.js]]
void function () {

    const pttArticleId = {
        decodeB64(b64) {
            let bitString = ''
            for (let i=0; i<b64.length; i++) {
                const charCode = b64.codePointAt(i)
                let bcode
                if (charCode == 45) bcode = 62 // -
                else if (charCode == 95) bcode = 63 // _
                else if (charCode <= 57) bcode = charCode - 48 // 0-9
                else if (charCode <= 90) bcode = charCode - 65 + 10 // A-Z
                else if (charCode <= 122) bcode = charCode - 97 + 36 // a-z
                else throw new Error('not ptt b64 string: ' + b64)
                bitString += this.formatPadBit(bcode)
            }
            return bitString
        },
        formatPadBit(value) {
            let string = value.toString(2)
            while (string.length < 6) string = '0' + string
            return string
        },
        toFileName(aid) {
            const bitString = this.decodeB64(aid)
            const time = parseInt(bitString.slice(0, -12), 2)
            const random = parseInt(bitString.slice(-12), 2)
            return `M.${time.toString(10)}.A.${random.toString(16)}`.toUpperCase()
        }
    }

    function r(stringSegment) {
        const regexpList = arguments
        let resultString = stringSegment[0]
        for (let i=1; i<stringSegment.length; i++) {
            const regexp = regexpList[i]
            if (typeof regexp == 'string') resultString += regexp
            else resultString += regexp.source
            resultString += stringSegment[i]
        }
        return new RegExp(resultString)
    }
    r.board = /\w[-_\w]*/
    r.aid = /#([-_\w]{8})/

class Parser {
    processRegexp(text, regexp, command) {
        if (!regexp.global) {
            regexp = new RegExp(regexp.source, regexp.flags + 'g')
        }
        const result = []
        let index = 0
        let scan
        while (scan = regexp.exec(text)) {
            const beforeMatch = text.slice(index, scan.index)
            result.push(beforeMatch)
            result.push(command(Array.from(scan)))
            index = regexp.lastIndex
        }
        result.push(text.slice(index))
        return result
    }
    token(text, type) {
        const node = document.createElement('span')
        node.textContent = text
        node.classList.add(type)
        return node
    }
    line(line, type) {
        const lineNode = document.createElement('div')
        lineNode.classList.add('line')
        line.shift() // match()[0] is useless
        for (const token of line) {
            if (typeof token == 'string') {
                const textNode = document.createTextNode(token)
                lineNode.appendChild(textNode)
            }
            else if (token instanceof Node) {
                lineNode.appendChild(token)
            }
            else {
                console.error('unknown token: ', token)
            }
        }
        if (type) lineNode.classList.add(type)
        return lineNode
    }
    static rule(regexp, command) {
        const copy = new this()
        copy.regexp = regexp
        copy.command = command
        return copy
    }
}

    Parser.aidParser = {
        __proto__: Parser.prototype,
        processAid(text) {
            return this.processRegexp(text, this.aidRegexp, this.aidToNode)
        },
        aidRegexp: r`${r.aid}(?:\\s*\\((${r.board})\\))?`,
        aidToNode(scan) {
            const aid = scan[1]
            const board = scan[2] || 'not-found'
            const anchor = document.createElement('a')
            const fileName = pttArticleId.toFileName(aid)
            anchor.href = `https://www.ptt.cc/bbs/${board}/${fileName}.html`
            anchor.textContent = scan[0]
            anchor.classList.add('ptt-aid')
            return anchor
        }
    }
    Parser.statusParser = {
        __proto__: Parser.prototype,
        keyRegexp: /\([^()]+\)/,
        keyCommand(scan) {
            return this.token(scan[0], 'key')
        },
        processKey(text) {
            return this.processRegexp(
                text, this.keyRegexp, this.keyCommand.bind(this)
            )
        }
    }
const pttHighlight = {
    r, Parser, pttArticleId,
    matchCommand: [
        Parser.rule(
                // /^(\s*作者 )( *)(\w[\w\d]*)( *\()(.*)(\) *)( 看板 ?)( ?)([-\d\w_]+)( *)$/,
                /^(\s*作者 )(.*)( 看板 )(.*)$/,
            function command(match) {
                match[1] = this.token(match[1], 'head')
                match[3] = this.token(match[3], 'head')
                return this.line(match, 'head')
            }
        ),
        Parser.rule(
                /^(\s*(?:標題|時間|轉信|作者|看板) )(.*)$/,
            function command(match) {
                match[1] = this.token(match[1], 'head')
                return this.line(match, 'head')
            }
        ),
        {
            __proto__: Parser.aidParser,
            // → illumi:要去 op 板啊^^                                 推 140.123.225.127 12/19
            // → TomRiddle: 五樓厲害了                            61.216.122.103 06/21 18:18
            // 放棄詭異的格式 /^\s*([推噓→])( +)(\w[\w\d]*)(:.*?)((?:\s[推噓→]\s{0,8})?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
            //regexp: /^\s*([推噓→])( +)(\w[\w\d]*)(:.*?)((?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
            regexp: /^\s*([推噓→])( +)([^:\n]+)(:.*?)((?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
            command(match) {
                switch (match[1]) {
                case '推':
                    match[1] = this.token(match[1], 'push')
                    break
                case '噓':
                    match[1] = this.token(match[1], 'boo')
                    break
                case '→':
                    match[1] = this.token(match[1], 'arrow')
                    break
                }
                match[3] = this.token(match[3], 'username')
                if (match[5]) match[5] = this.token(match[5], 'date')
                match.splice(4, 1, ...this.processAid(match[4]))
                return this.line(match, 'comment')
            }
        },
        {
            __proto__: Parser.statusParser,
            // 瀏覽 第 1/7 頁 ( 11%)  目前顯示: 第 01~22 行  (y)回應(X%)推文(h)說明(← )離開
            regexp: /^(\s*瀏覽 第 \d+(?:\/\d+)? 頁 \(\s*\d+%\)\s)(.*?)(\(.*)$/,
            markPageRange(match) {
                let range = 'page-middle'
                if (/第\s*01~/.test(match[2].textContent)) range = 'page-first'
                else if (/100%/.test(match[1].textContent)) range = 'page-last'
                match[1].classList.add(range)
            },
            command(match) {
                match[1] = this.token(match[1], 'percent')
                match[2] = this.token(match[2], 'line-number')
                this.markPageRange(match)
                match.splice(3,1, ...this.processKey(match[3]))
                return this.line(match, 'status')
            }
        },
        Parser.rule(
                /^─+$/,
            function (match) {
                match.push(match[0])
                return this.line(match, 'hr')
            }
        ),
        {
            __proto__: Parser.aidParser,
            regexp: /^※.*$/,
            aidRegexp: r`(?:(${r.board})\\s*看板\\s*)?${r.aid}`,
            aidToNode(scan) {
                let text, aid, board
                [text, board, aid] = scan
                return super.aidToNode([text, aid, board])
            },
            command(match) {
                const parseAid = this.processAid(match[0])
                match.push(...parseAid)
                return this.line(match, 'system')
            }
        },
        Parser.rule(
            /^(\s*▄+\s*)(請按任意鍵繼續)(\s*▄+\s*)$/,
            function command(match) {
                match[1] = this.token(match[1], 'back-wall')
                match[3] = this.token(match[3], 'back-wall')
                return this.line(match, 'anykey')
            }
        ),
        Parser.rule(
            /^(\s*◆.*)(\s\[按任意鍵繼續\]\s*)$/,
            function match(match) {
                match[1] = this.token(match[1], 'action')
                match[2] = this.token(match[2], 'prompt')
                return this.line(match, 'anykey')
            }
        ),
        Parser.rule(
            /^(【.*?】)(\s*.*\s*)((?:看板|系列|文摘)《.*》\s*)$/,
            function command(match) {
                match[2] = this.token(match[2], 'center')
                return this.line(match, 'info-board')
            }
        ),
        Parser.rule(
                /^\s+編號\s+.\s*.\s*.*\s+人氣.*$/,
            function command(match) {
                match.push(match[0])
                return this.line(match, 'field-head')
            }
        ),
        {
            __proto__: Parser.statusParser,
            regexp: /^(\s*(?:文章選讀|選擇看板)\s?)(.*)$/,
            command(match) {
                match[1] = this.token(match[1], 'status-name')
                match.splice(2,1, ...this.processKey(match[2]))
                return this.line(match, 'status')
            }
        },
        {
            __proto__: Parser.prototype,
            regexp: /^([>●]?)(\s*)(\d+\s|★\s*)(.)( \d|\d\d|爆|X.|  )(..\/.*$)$/,
            command(match) {
                if (match[3].charAt(0) == '★') {
                    match[3] = this.token(match[3], 'announcement')
                }
                match[5] = this.markPushCount(match[5])
                return this.line(match, 'list-entry')
            },
            markPushCount(symbol) {
                const count = Number(symbol)
                let type = 'low'
                if (Number.isNaN(count)) {
                    if (symbol == '爆') type = 'high'
                    else if (symbol.charAt(0) == 'X') type = 'bad'
                }
                else {
                    if (count < 10) type = 'ones'
                    else if (count < 100) type = 'tens'
                }
                return this.token(symbol, type)
            }
        },
        {
            __proto__: Parser.aidParser,
            regexp: /^[:>](?:|\s.*)$/,
            command(match) {
                const parseAid = this.processAid(match[0])
                match.push(...parseAid)
                return this.line(match, 'quote')
            }
        },
        {
            __proto__: Parser.aidParser,
            regexp: /^.*$/,
            command(match) {
                const parseAid = this.processAid(match[0])
                match.push(...parseAid)
                return this.line(match)
            }
        }
    ],

    textToNode(text) {
        const node = document.createElement('pre')
        for (let line of text.split(/\n/g)) {
            if (line.slice(-1) == '\r') line = line.slice(0,-1)
            for (const match of this.matchCommand) {
                const scan = line.match(match.regexp)
                if (scan) {
                    const lineNode = match.command(Array.from(scan))
                    node.appendChild(lineNode)
                    break
                }
            }
        }
        return node
    },

    processTemplate(root = document) {
        return this.processRootSelector(root, '.ptt-format-text.raw')
    },
    processRootSelector(root = document, selector = '.ptt-format-text.raw') {
        const rawList = root.querySelectorAll(selector)
        for (const raw of rawList) {
            const node = this.textToNode(raw.textContent)
            node.className = raw.className
            node.classList.remove('raw')
            raw.parentNode.classList.remove('raw')
            if (this.debug) raw.after(node)
            else raw.replaceWith(node)
        }
        return rawList
    },
    processMarkdownLang(root = document) {
        const markdownNodeList = root.querySelectorAll('.lang-ptt')
        markdownNodeList.forEach(node => {
            node.classList.add('ptt-format-text', 'raw')
        })
        return this.processRootSelector(root)
    }
}
    if (typeof exports == 'object') {
        exports.pttHighlight = pttHighlight
    }
    else if (typeof window == 'object') {
        window.pttHighlight = pttHighlight
    }
    else if (typeof this == 'object') {
        this.pttHighlight = pttHighlight
    }

    pttHighlight.processTemplate()
}()