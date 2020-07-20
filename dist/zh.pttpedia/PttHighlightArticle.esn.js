// origin es+ version of [[MediaWiki:PttHighlightArticle.js]]

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

class Parser {
    processRegexp(text, regexp, command) {
        let leftText = text
        let scan
        const result = []
        while (scan = leftText.match(regexp)) {
            const beforeMatch = leftText.slice(0, scan.index)
            result.push(beforeMatch)
            result.push(command(Array.from(scan)))

            leftText = leftText.slice(scan.index + scan[0].length)
        }
        result.push(leftText)
        return result
    }
    processAid(text) {
        return this.processRegexp(text, this.aidRegexp, this.aidToNode)
    }
    get aidRegexp() {
        return /#([-0-9A-Za-z_]{8})\b(?: \(([-\w]+)\))?/
    }
    aidToNode(scan) {
        const aid = scan[1]
        const board = scan[2] || 'not-found'
        const anchor = document.createElement('a')
        const fileName = pttArticleId.toFileName(aid)
        anchor.href = `https://www.ptt.cc/bbs/${board}/${fileName}.html`
        anchor.textContent = `#${aid} (${board})`
        anchor.classList.add('ptt-aid')
        return anchor
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

const pttHighlightArticle = {
    Parser, pttArticleId,
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
        Parser.rule(
            // → illumi:要去 op 板啊^^                                 推 140.123.225.127 12/19
            // → TomRiddle: 五樓厲害了                            61.216.122.103 06/21 18:18
            // 放棄詭異的格式 /^\s*([推噓→])( +)(\w[\w\d]*)(:.*?)((?:\s[推噓→]\s{0,8})?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
            /^\s*([推噓→])( +)(\w[\w\d]*)(:.*?)((?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\ )?\d{2}\/\d{2}(?: \d{2}:\d{2})?)?( *)$/,
            function command(match) {
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
                match.splice(4, 1, ...this.processAid(match[4]))
                if (match[5]) match[5] = this.token(match[5], 'date')
                return this.line(match, 'comment')
            }
        ),
        {
            __proto__: Parser.prototype,
            // 瀏覽 第 1/7 頁 ( 11%)  目前顯示: 第 01~22 行  (y)回應(X%)推文(h)說明(← )離開
            regexp: /^(\s*瀏覽.*\d+%\)\s)(.*?)(\(.*)$/,
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
                match.splice(3,1,
                    ...this.processRegexp(
                        match[3], this.keyRegexp, this.keyCommand.bind(this)
                    )
                )
                return this.line(match, 'status')
            },
            keyRegexp: /\([^()]+\)/,
            keyCommand(scan) {
                return this.token(scan[0], 'key')
            }
        },
        Parser.rule(
                /^─+$/,
            function (match) {
                match.push(match[0])
                return this.line(match, 'hr')
            }
        ),
        Parser.rule(
                /^※.*$/,
            function command(match) {
                const parseAid = this.processAid(match[0])
                match.push(...parseAid)
                return this.line(match, 'system')
            }
        ),
        Parser.rule(
                /^[:>](?:|\s.*)$/,
            function command(match) {
                const parseAid = this.processAid(match[0])
                match.push(...parseAid)
                return this.line(match, 'quote')
            }
        ),
        Parser.rule(
                /^.*$/,
            function command(match) {
                const parseAid = this.processAid(match[0])
                match.push(...parseAid)
                return this.line(match)
            }
        )
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
        const rawList = root.querySelectorAll('.ptt-article.raw')
        for (const raw of rawList) {
            const node = this.textToNode(raw.textContent)
            node.className = raw.className
            node.classList.remove('raw')
            raw.parentNode.classList.remove('raw')
            raw.replaceWith(node)
        }
    }
}
    if (typeof exports == 'object') {
        exports.pttHighlightArticle = pttHighlightArticle
    }
    else if (typeof window == 'object') {
        window.pttHighlightArticle = pttHighlightArticle
    }
    else if (typeof this == 'object') {
        this.pttHighlightArticle = pttHighlightArticle
    }

    pttHighlightArticle.processTemplate()
}()