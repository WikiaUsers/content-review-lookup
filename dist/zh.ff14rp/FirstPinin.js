mw.hook("wikipage.content").add(function($content) {
	function getFirstPinyin(char) {
		var pinyin = "YDKQSXHWZSSXQBYMGCCZQPSSQBYCDSCDQLDYLYBSGJGYPZJJFGCCLZZBWDWZJLJPFYYNWJJTMYYZWZHFLYPPQHGCCYHYMJQYXXGJX#SDSJNJJSMHML#RXYFSNQSYZZQZGQLLYJLGYZSSECYKYYHQWJSSGGYXYQYJTWKDJHYCHMYXJTLXJYQBYXDLDWRRJJWYSRLDZJPCBZJJBRCFJLBCZSTZFXXTHTRQGYBDLYCCSCYMMRFCYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXJPDFTZYHHYCYSWCCYQSCLCXXWZCXNBGNNXBXLZSQSBSQPYSYZDHMDZBQBZCWDZZYYTZHBTSYYFZGNTNXQYWQYKBPHGLXGYBFMJEBJHHGQTJCYSXSTKZGLYCKGLYSMZXYALMELDCCXGZYRCXSDLTJZCQKCNNJWHJCZZHQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHJQSPSFXLFPBYSXXXYDCCZYLLLSJXFHJXPJBCFFYABYXBHCZBJYCLWLCZGGBTSSMDTJCXPTHYQTGLJSCJFZKJZJQNLZWLSLHDZBWJNCJZYZSQNYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBXHYZCAYJXZCFBZZMJYXXCDCZOTTBZLJWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXRYTSYFBJDZTGBCNCLCYZZPSACYZQSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQCZWJBHCTDJJSFXYEJJTLBGXSXJMYJJQPFZASYJNCYDJXKJCDJSZCBARTCCLNJQMWNQNCLLLKBYBZZSYHQCLTWLCCRSHLLZNTYLNEWYZYXCZXXGDKDMTCEDEQTSYYS#D#D##SD#J#HRWNQLYBGLXHLGTGXBQJDZ#YJSJYJCJMRNYMGRCJCZGJMZMGXMMRYXKJNYMSGMZZYMKLFXMBDTGFBHCJYKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPKXKTACJDHHZDDDRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJLLZYCXKLQCCGJCLTFPCQCZGWBJDQYDJJBYJHSJDZWGFSJGDKCCCTLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMCLKMDXXKWYXWSLMLPSJQJJQXYQFJTJDXMXXLLCRQBSYJBGWY#XGGBCYXPJTGPEPFGDJGBHBNCFJYZJKJKHXQFGQZKFHYGKHDKLLSDJJXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNDJBSBGBBZKLYLXGWXJJWYQZMYWSJQLCJXXJQWJEQXSCWETLZHLYYYSDZPYQYZCMTLSHTZCFYCYXYLJSDCJJAGYSLCQLYYYSGLRQQ#LDXZSCCCCADYCJYSFSGBFRLSZQSBXJPSJWSDRCKGJLGTKZJZBDKTCSYQPYHSTCLDJ#HMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFPQQJBFBDFEHTHSQHZYWWCNXXCDWHHWGYJLEGWDQCWGFJHCSNTFYDOLBYWHQWESJPWNMLRYDZSZTXYQPZGZWXHNXPYXSHMDQJXZTDPPBFYHZHHJYFDZWKGKZBLDNTSXHQEEGZDYLZMMZYJZKSZXKHKHTXEXXWYLYAPSTHXDWHZYDPXAGKYDXBYNHXKD#JNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGCGYYGGBHSCYAJTDWLXTZQCWZYDQDQM#GD#LLSZHLSJZWFJHQSWSCELQAJYNYTLSXTHAZGKZZSDHLACQZWWCSGQQTDDYZBCCHYQZFLXPSLZQGPZSZNGLYDQTBDLXJTCTAJDKYWNSYZLJHHDZCWNHYZYOMHYCHHHXHJKZWSXHDYXLYSCQYDPCLYZWMYP#KXYJLKZHTYHSXQSYSGXYSMCHKTSCRSWJBWXSGZJLWWSCHS#HSQNHZSNGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGOXZCXPDMMHLDGTYBYSJMXHMRZPLXJZCKZXSHFLQXCTDHXEZFCHZCCDJTCJYXQHLXDHYPJQXNLSYYDZOZJNYXQEZYSJYAYJKYPDGXDDXSPPYZNDLTHRHHYDXZJJHTCXMCTLHBYNYHMHZLLXNXMYLLLPDCPPXHMXDKYCYRDLTXJCHHZNXZLCCLYLNZSXZJYZLNN#LWHYQSNJHXYNTTDKYJPYCHHYEGKCWTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZWGYWGPYDQQZZDQXSKCQNMJJZZBXYQMJRTFBBTKHZKBJDJJKDJJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXFDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXCCGABDQYJXDMLJCYQZLLPCHBSXGJYNDYBYQSPQWJLZKCDDTACCBXZDYZYPJZQSJNKKTKNJDJGYEPGTLFYQKASDNTCYHBLGDZHBBYDMJREGKZYHEYYBJMCDTYFZJJFGCJPLJHLDWXJJKYTCYKSSSMTWCTTQZLPBSZDTWZXGZAGYXTYWXLHLCPBCLLOQMMZSSLCMBJQSZZKYDCZXGQJDSMCYTZQQLWZQZXSSFPKTFQMDDZDSDDTDWFHTDYZJAQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMCSYZGCJFBZBSQLFCXXXNXKXWYMSDDYQ#GGQMMYHCDCTTFGYYHGSTTTYBYKJDHKYJBELHDYPJQNFXFDQKZHQKSBYJTZBXHFDXBDASWPAWAJLDYJSFHBLDNNDNQJTJNCHXFJSRFWHZFMDRFJYHWZPDJKZYJYMFCYZNYNXFBYTFWFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRSYMJGSXWZJSPRYDJSJGXHJJGMJJYNZZJXHGJKYMLPEYYCSYSGQZSWHWLYRJLPXSLCXMFSWWKCCTNXNYNPNJSZHDZEPTMMWYWXYYSYWLXJQZQXZDCLAEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZCFJLNLHYYJLDXHHYCSTDYWNRJTXYWDRMDRQHWQCMFJDYZMHMAYXJWMYZQTXTLMRSPWWCHAJBXTGCYPXYYRRCLMPAMGKQJSZYJRMYJSNXTPLNBAPPYPYLXMYZKYNLDGYJZCZHNLMZHHANQMPGWQTZMXXMLLHGDZXYHXKRXYCJMFFXYHJFSBSSQLHXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJNLXYSXHMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLSNMCQSCYZNFZLXBRNNNYLMNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTSXGCQGXZZBHYXJSCRHMKKBSCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCJGQHWLSNZSWXKHLJHYYBQCBFCDSXDLDSPFZFSKJJZWZXSDDXJSEEEGJSCSSMGCLXXHYWYLLYLWWWGYDKZJGGGTGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXWMELPTFSXTLLXCLJXJJLJSXCTNSWXLAHHHYQRWHSYCSQRYBYAYWJEJQFWQCQQCJQGXALDBZZYJGKGXPLTJYFXJLTPADKYQHPMATLDPDZKXMTXYBHKLEFXDLEEGQTYMSAWHZMLFTWYQXLYJZLJEEYXBQQFFNLYXRDSCTGJGXYWLKLLXQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZJDZGYZZHYWYFQYTYZSZYEZKLYMHJJHTSMQWYZLKYYWZCSRKQYQLTCXWCDRJKLWSKZWBDCQYNCJSRSZJLKCDCDTLZZZACQQWZDDXYPLXCBQJYLZLLLQDTZJJYJYJZYXNYYYNXJXKGDAZWYRDLJYYYRJLGLLDYXJCYKYWNQCCLDDNYYYKYCKCZHJXCCLGZQJGJWGGCQQJYSBZZXYJXJ#XJFZBSBDSFNSFPZXHDWZTDMPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZJWDWCSQZGMZHZZMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZHFCBBZMQCFMBCMCJXLGPNJBBXGYHYYJGPTZGZMQBQDCGYBJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSCXFJEGLSLLSZBQJJJAKLYLDLYCCTSXMCWFGKKBQXLLLLJYXTYLTYXYTDPJHNHGNKBYQNFJYYZBYYESSESSGDYHFHWTCJBSDZJTFDMXHCNJZYMJWSRXJDZJQPDQBBSDJGGFBKJBXDGQHMGWJJJGDLLTHZHHYYYYHHSXWTYYYCCBDBPYPZYCCZTJPZYWCBDLFWZCWJDXXHYHLHWCZXJTCCLCDPXDJCZCZLYXJJSJBHFXWPYWXZPTDZZBDZCJHJHMLXBQXXBYLRDDGJRRCTTTGYSCZWMXFYTMMZCWJWXJYWCSKYBZQCCTTQNHXNKXXKHKFHTSWOCCJYBCMPZZYKBNNZPBTHHCDLSYDDYTYFJPXYNGFXBYQXCBHXCBSXTYZDM#YSNXSXLHKMZXLTHDHKGHXXSSHQYHHCJYXGLHZXCSNHEKDTGQXQYPKDHEQTYKCNYMYYYPKQYYTJXZLTHHQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHJTTTNWCHHXCXWHESZJYDJCCDBQCDGDNYXZDHCQRXCBMZTQCBXWGQWYYBXHMBYMYQDYECMKKYAQYNGYCSLFYKKQGYSSQYSHJGJCNXKZYCXSBKYXHYYLCTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMQSYQKDZLJQQYPLCYCZTCQQPBBQJZCLPKHQCYYXXDTDDDSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJCKXYAMYLSJHMLALYGXCYYDMAMDQMLMCZNNYYBZKKYFLMCHCMLHXRCJJHSYLNMTJGGGGYWJXSRXCWJGJQHQZDQJDZJJZKJKGDZQGJJYJYLXZXXCDQHHHESTMHLFSBDJSYYSHFYSSCZQLPBDRFRZTZDKYYHSCTGKWDQZRKMSYNBCRXQBJYFBXPZZEDZCJYKBCJWHYJBQDZYWNYSZPTDKZPFPBAZTKLQYHBBZPNBPTYZZYBHNYDCPJMMCYCQMZJFZZDCMNLFPBPLNGQJTBTTAJZPZBBDNJKLJQYLNBZQHKSJZNGGQSCZKYXCHPZSNBCGZKDDZQANZGJKDRTLZLDWJLJZLYZTXNDJZJHXYATNCBGTZCSSKMNJBJYTSRWXCPJWJJTKHTZPLBHSNJZSYJBWBZYZLSTLSBJHDWWQPSLMMFBJDWAJYZCCJTBNNRZWQXCDSLQGDSDPDZHJTQQPSQLYYJZLGNHSZLCTCBJTKTYCZJTQKBPJLGMJZDMCSGPYNJZJJYYKNHRPWSZXMTNCSZZYXHBYHYZAXYWKCJTLLCKJJTJHGCXSXYQYCZBYWBLWQCGLZGJGQRQCCZSSBCRBCSKYDZNLJSQGXSSJMECNSTJTPBDLTHZWHQWQTZEXNQCZGWESGSSBYBSTSCSJCCGBFSDQSZLCCGLLLZGHZQTHCZMJGYZAZNMCKCSTJMMZCKBJYGQLJYJPPLDXRGZYXCCSNHSHHDZNLZHZJJCDDCBCJXLBFQBCZZWPQDNHXLJCTHQZJGYLNLSZZPCJDSCQQHJQKDXQPBAJYEMSMJTZDXLCJYRYYNHJBNGZZKMJXLTBSLLRTPYLCSZNXJHLLHYLLQQZQLXYMRCWCXSLJMCZLTZLDWDJJLLNZGGQXPPSKYGYGGBFZPDKMWGHCXMCGDXJMCJSDYCABXJDLNBCDDYGSKYDQTXDJJYXMSAQAZDCFSLQXYJSJZYLBLXXWXQQZBJZLFBBLYLWDSLJHXJYZJWTDJCYFQZQZZDZSXZZQLZCDZFCHYSPLMPQZMLPPLFFXJJNZZYLSJ#YQZFPFZKSYWJJJHRDJZZXTXXGLGHTDXCSKYSWMMTCWYBAZBJKSHFHGCXMHFQHYXXYZFTSJYZBXYXPZLCHMZMBXHZZSSYFDMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWWHHCWTZZZPJXSNXQQJGZYZAWLLCWXZFXXYXYHXMKYYSWSQMNJNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDLYHLXRLNLLSTYZYYQYGYHHSCCSMZZTZCXHYQFBYYRPFFLFQTNTSZLLJMHWTZJQYZWTLLMLM#WMBZSS#ZRBPDDDLQJJBXCCSRZQQYGWCSXFWZLXCCRSTDZMCYGGDYQSGTJMWLJMYMMSYHFBJDGYXCCPSHXNZCSBSJWJGJMPPWAFFYFNXHYDXZYLREMZGZCYHSSZDLLJCSQFZXXKPSXZGXJJJBMYYYSNBTYLBNLHPFZDCYFBMGQRRMSSZXYSGTZNNYDZZCDGBJAFJBDKNZBLCSSZBSGCYCJSZLMLRZZBZZLDL#LLYSXSQCQLYXZLSGKBRXBRBZCYCXZJZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZ#YJLZYRZDQQHGJZXSSCBTGJBBFRTJXLLFQWJGSLQTYMBLPZDXTZAGBDHZZRBGJHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFCZLLJZLLQBLCQMQQCGCDFPBBHZCZJLPYYGJDTGWDQFCZQYYYQYSRCLQZFKLZZZGFFCQNWGLHJYCJJCZLQZZYJBJZZBPDCCMHJGXDQDGDLZQ#FGPSYTSDYFWWDJZJYZXYYCJCYHZWPBYGXRYLYBHKJKSFXTJJMMCKHLLTNYYMSXXYZPDJJYCSYCWMDJJKQYRHLLQXPSGTLWYCLJSCBXJYZFNMLRGJJTYZBSYZMSJYJHGFZQMSYXRSZCWTLRTQZSSTKXGQGGSPTGCDNJSGCQCQHMXGGZTQYDJJZDLBZSXJLHRQGGGTHQSCPYHJHHGNYGKGGCMJDZLLCCLXQSFTGZSLLLMLCSKCTBLJZZSZMMNYTPZSXQHJCJYQXYEXZQZCPSHGZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCSJJTHJNXTNRZTZFQRHQGLLGCXSZZJDJLXCYTSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZGJJJQZJQDYBSSLLCMYCTMQTBHJQNNYGJYNQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYLFZSLJCQZLYLZCJESHNYLLQXGJXLYJYYYXNBCLJSSWCQQCJYLLCLDQYLLZLLBNYLGQCHXYYQOXCCQKYJXXHYKLKSXEQQXCQKKKKCSGYXXYQXYGWTJOHTHXPXXXXSLCYEYCHZZCBWQBBWJQZSCSZSSLZYLGDESJZMMYMCYTSDSXXSCJPQQSQYLYFZYCHDJDZYWCBTJSYCJKCYDDJLBDJJSODZYQYSKKXXDHHGQJYOHDYXWGMMMAJDYBBBPPBCMHCBLJZSMTXERXJMHQDSTPJDCBSSMSSSTHJTSLMMTRCPLZSZMLQDSDMJMQPNQDXCFYNNFSDQQYXHYAYKQYDDLQYYYSSZBYDSLNTFGTZQBZMCHDHCZCWFTXTMQQSPHQWWXSRGJCWTJTZZQMGWJJRJHTTJBBGWZFXJHNQFXXQYWYYHYSCDYDHHQMNMTMMCHBSZPPZZGPMZFOLLCFWHMMSJZTTTHLMYFFYTZZGZYSKJJXQYJZQBHMBZCLYGHGFMSHPCFZSNCLPBQSNJYZSLXJFPMTYJYGBXLLDLXPZJYPJYHHZCYWHJYLSJEXFSSZYWXKZJLLADYSLYMQJPWXXHXSKTQJEZRPXXZGHMHWQPWQLYJJQJJZSZCFKJLCHHNXJLQWZJHBMZYXBDHHYPYLHLHLGFWLCFYYTLHJJCJMSCPXSTKPNHJXSNTYXXTESTJCTLSSLSTDLLLWWYHDHRJZSFGXSSYCZYKWHTDHWJSLHTZDQDJZXXQGGYLTZPHCSQFZLNJTCLZPFSTPDYNYLGMJLLYCQHYNSBCHYLHQYQTMZYBBYWRFQYKJSYSLZDYJMPXYYSSRHZJNYQTQDFZBWWTWWRXCWHGYHXMKMYYYHMSMZHNGCEPMLQQMTCWCTMHPXJPJJHFXYYZSJZHTYBMSTSYJDTQQQYTLHYNBYQZLCXCNZWSMYLKFJXLWGBYPJYTYSYLYMZCKTDWLGSMZSYLMPWLZWXWQZSSAZSYXYRHSSNTSRAPCCPWCMGDHHQZDZXFJHGZTTSBJHGYZLZYSMYCLLLYBTYXHBBZJKSSDMALHHYCFYGMQYPJYCQXJLLLJGCLZGQLYCJCCTOTYXMTMSHLLWCGFXYMZMKLBSZZCXHHJYSLCTYJCYHXSGYXCKXLZWPYJPDHJWPJPWSQQXLXXDHMRSLZCYZWTTCXKYSTZSHBSCCSTPLWSSCJCHJLCGCJSSPHYLHFHHXJSXALLNYLMZDHZXYLSXLWZYKCLDYAHZCMGDYSPJTQJZLNGJFSJSHCTSDSZLBLMSSMNYYMJQBJHRCWTYYDCHQLJAPZWBGQYBKFCMJWLZLLYYLSZYDWHXPSBCMLJPSCGBHXLQHYRLJXYSWXHXZLLDFHLSLYMJLJYFLYJYCDRJLFSYZFSLLCQYQFGJYHYSZLYLMSTDJCYHBZLLNWLXXYGYYHHMGDHXXHHLZZJZXCZZZCYQZFNJWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTJXHQLHYXXXYWZYSWTMZKHLXZXZPYHGCHKJFSYH#TJRLXFJXPTZTWHPLYXFCRHXSHXKJXXYHZQDXJWYLHYHMJDBFLKHTXCWHCFWJZFPQRXQXZYYYJYGRPXGSCSXNGQCHKZDXHFLXXHJJBYZWTSXNNCYJJYMSWYJQRMHXZWFQSYLZJZGBHYNSHBGTTCSEBHXXWXYHHXYXXSQYXMLYWRGYQLXBBCLJSYLPSYTJZYHYZAWLHORJMKSCZJXXXYXCHCYTRYXQJDDSJFSLYLTSFFYXLMTYJMZJYYYXLTZCSXQZLHZXLWYXZHDNLXXHXJCDYHLBRLMBRLLAXKSLLLJLYXXLYCRYLCJCGQCMTLZLLCYZZPZPCYAWHJJFYBDYYZSEPCKZDQYQPBPCJPDCYZBDBBCYYDYCNNPJMTMLRMFMMGWYGBSJGYKSMDQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWKCQQQFQJCZHGZGMYKPHYYHZYKNDKZMBPJYSPXTHLFPNYYGXJDBKXNHHJHZJXSTRSTLDXSKZYSYBMXJLXYSLBZYSLHXJPFXBQNBYLLJQKYGZMCYZZYMCCSL#LHZGWFWYXZMWCXTYNXJHBYYMCYSBMHYSMHDYSHQYZCHMJJMZCAAHSFJBBHPLXTYLSXSDJGJDHKXXTXXNBHNMLNGSLTXMRHNLXQJXMZSLYSWQGDLBJHDCGJYQYCMHWFMJYBBBYJMJWJMDPWHXQLDYAPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWECDWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZCMYJCLMSWTSZBCHQEKCQBWLCGYDBLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZCLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYYYZLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTHHSSTCYJLBSWZLXJXRWGLDLZRLZQTGSLLLLZLYMXQGDZHGBDBHZPBRLW#X#BPFDWO###HLYPCBJCC#DWBZPBZZ#CYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBBNTYJSYDFNDPTHTZZMBBMXLCMYFFGTJJQWFTMDPJWDNLBZXMMCZGBDZLQLFYFHSSMJYLSDCHDZJWJCCTLJCLDTLJJCPDDPJDSSZYNNDBJLGGJZXSXNLYCYBJJQYCBYLZCFZPPGKCXZDZFZTJJFGSJXZBNZYJQTTYJWHTYZZHYMDJXTTMPXSPLZCDWSLSHXYBZGTFMMCJTACBBMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBHLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFLLQLLXFDYHABXGGNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBBGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZGZDMQYYBDZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXJPGALXZDAGLMDGXMMZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKJSYSMMZZZMSYDNZZCZXBPLGTMDDNMXCKJMZTYYMZMZZMSQHHDCCJEMXXKLJSTGWLSQLYJZLLSJSHDBBMHNLYJCZYHMXXHHZCJMDHXTKGRMXFWMCGMWKDCKSXQMMMFZZYDKMSCLCMPCGMWRPXQPZDSSLCXKYXTWLGJYAHZJGZQWCSNXYHMMPMLKJXMHLMLGMXCTKZMJJYSZJSYSZHSYJZJCDAJZYBSDQJZGWZKGXFKDMSDJLFMEXKZQKJPEYPZYSZCDWYJFFMZJYKTTDZZEFMZLBNPPLPLPBPSZALLTYLKCKQZKGENQLWALKXYDPXLHSXQQWQ#KXQCLHYXXMLYCCWLYMQYSKY#HLCJNSZKPYZKCQZQLJBDMDJHLASQLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNSECLSTBHPKSLCTXXLPAYDZKLZYGZCQAPLLKCCYLBQMQCZQCLJSLQZDJXLDDHPJQDLJJXZQDJYZHKZLJCYQDYJPPYPEAKJYRMPCBYMCXKLLZLLFQPYLLLMBSGJCYSSLRSYSQTMXYXZQZBDZRYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYXXSTYMSDBZZYJGTSMTFXQYXJSSDGSLNMDLRYTZLRYYLXQHTXSRTZCGYXBNQQZFHYKMZJBZYMKBPNLYZPBLMCNQYZZDSJZHJCTSHHYZZJRDYZHNFXGLFXSLKGJTCTSSYLLGZRZBBJZZKLPKBCZYSLXYXBJFPNJZZXCDWXZYJXZZDJJGGGRSRJKMCMZJLSJYWQS#YHQJSXPJZTZLSNSHRNYPJTWCHKLBSRZLCXWJQXQKYSJYCZTLQZYBBYBWZJQDWWYZCYTJCJXCKCWDKKZHSGKDZYWWYYJQYYTCYTDJLXWKCCKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLLBJJZBSJHTSJDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXCPBJYDSSDDZNCGLQMBTSFCBFDZDLZNFGFJGFSMPTJQLMBLGQCYYXBQKDJJQSRFKZTJDHCZKLBSDZCFYTPLLJGJHTXZCSSZZXSTCYGKGCKGYOQXJPLZPBBGTGYJZGCZQSZLBJLSJFZGKQQJCGWCZPZQTLDXRJXBSXXPZXHSZYCLWDSJJHXMFCZPFZHQHQMQGKYLYHTYCGFRZGNQXCGPDLBZCSCZQLLJBLHBZCYPCZPPDYMTZSGYHCKCPZJGSLCLNSCDSLDZXBMSDLDDFJMKDJDHSLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNCJYQTZZFSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZBBWSKRFBCYZMTHBLGJPYCNZCSTLXSHTZCYZLZBLFEQHLXFLCJLYLJQCBZLZJGHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSZXNTNLZDNTLMSJXGZJGJCZXYHYHWRWWQNZTNFJSCPZSHZJFYRDJSFSCJZHJFZQZCHZLXFXSBZQLZSGYFTZDCSZXZJBQMSZKJRHXJZCGBJKHCHGTXKJQGLXBXFGTRTYLXJXGDTSJXHJZJJCMZLCQSBTXHQGXTXXHXFTSDKFJHZYJFJXRZLDLLJCQSQQZJWQXSWQTWGWBZCGCLLQZBCLMQJTZGZXZXLJFRMYZFLXYSZXXJKXRMJDCDMMYXBSQBHGZMWFWTGMXLZBGYTGZYCCDXYZXSWG#YJYZNBGPZJCQSYXCXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJSSFLBYSMYQSXJZXRXSQZZZSSLJFLCZJRCRXHHZXQWDSHXSJJHQCXJBDYNSYSRJBQLPXZZPYMLXZKYXLXCJLCYCXXZZLLDLLLSJYHZXHYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFCGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWWWWHWLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLBFLCWBJZCLJJMZLPJJLYMQDMYLYFBGYGQZMLYZDXQYXRQQQHSXYYQQYGJTYXFSFSLLGNQCYHYCWFHCCCFXBYLYPLLZQXXXXXKQHHXSHJDCFDSCZJXCPZWHHHHHAPYLHALPQAFYHXDYLLKMZQGGGDDESRENDLTZGCHYBPSSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZPNDZCLZYWLLZNTEYTGXLHSLPJJBDGWXPCDNTJCKLKCLWKLLCASSTKNZDNQNTTLYYZSSYSSZZRYLJQKCGBHHCRXRZYDGRGCWCGZQFFBPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBQTBGTZFZNPZFPZXZPJSZBMQHQCYXYLDKLJNYPKYGHGDCJXXEAHPNZGZTZCMXCXMMJXNKSZQNMNLWBWWXJJRHCLSTMCSJTJCXXTPCNFDTNNPGLLLZCJLSPBLPGJCDTNJNLYARSZFFJFQWDPGZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBQLWSTSZGYBLJPXGLBOCLGPCBJFTMXZLJYLZXCLTPNCLCKXTFZJSHCRXSFYSZDKNTLBYJCYJLLSTGQCBXNWZXBXKLYLHZLQZLNZCQWGZLGZJNCJGCMNZZGJDZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGHTCSXWZDCSYFPTFBCHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTYWBMNJHSKBMDDBCYSCCLDXYCDDQLYJJHMQLLCSGLJJSYFPYYCAYLDJANTQJPWYCMMGQYYSXDHQMZHSZXBFTWWZQSWQRFKJLXJQQYFBRXJHLFWJGZYQACMYFRHCCYBYQWLPEXCCZSDYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGBWFZMFQMMBZMZZCJJLCNYXYQGMLRYGQCCYHZLWJGCJCHGMCJJFYZZJHYCFRRCMTZQZXHFQGDJXCCJEAQCRJYHPLJLSZDJRBCQHJDZRHXLYQJSYMHZYDWLDFRYHBBYDTSSCCWBXGLPZMLZZTQSSCPJMMXJCSJYTYCGHYCJWSNSXLFEMWJNMKLLSWTXHYYY#CMMCWJDQDJZGLLJWJNKHPZGGFLCCSCZMCBLTBHBQJXQDJPDJQTGHGLFQAWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZTJTLBYPBPDYYYXSQKXWYYFLXXNCWCSYBMAELYKKJMZZZBRXYAQJFLJPFHHHXTZZXSGQQMHSPGDZQWBWPJHZJDYJCQWZKTHXSQLZYYMYSDZGRXCKKHJLWPYSYSCSYZLRMLQSYLJXBCXTLHDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBYGBZGZTCPLDJLSLYLYMDTMTZPALCXPQJCJWTCYYZLBLXBZLQMYLJBGHDSLSSDMHMBDCZSXWHAMLCZCPJMCNHJYJNSYGCHSKQMZZQDLLKABLWJQSFMOCDXJRRLYQZHJMYBYQLRHETFJZFRFKSRYXFJDWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJCXWMYLJCSQLKYDTTXBZSXFDXGXSJHHSXXYBSSXDPYNCMRPTJZCZENYGCXQFJXKJBDMLJCMQQXLOXSLYXXLYLLJDZBTYMHBFSTTQQWLHOGYBLSZALZXQLHTWRRQHLSTMYPYXJJXMQSJPNBRYXYJLLYQYLTHYLQYFMLGLJDMLLHFZWKZHLJMLHLJKLJ#TLQXYLMBHHLNLSXQCHXCFXXLHYHJJGBYZZKBXSCQDJQDSXJZSYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYQCYJHQQZYHMWFFHGZFRJFCDBXNDQYZPCYKHJLFRZGPPXZDBBGZQSTLGDTYLCQMGCHHMFYWLZYXKJLYPJGSYWMQQGQZMLZJNSQXJQXYJTCBEHSXFSSFXZWFLLBCYYJDYTDTHWZZFJMQQYJLMQSXLLDTTKHHYBFPWDYYSQQRNQWLGWDEBDWCYYGCDLKJXTMXMYJSXHYBRWFYMWFRXYQMXYSCTZZDFYKMLDHQDLWYQNLCRYJTLPSXCXYWLSBRRJWXHQYBHTYDNHHGMMYWYTZCSQMDSSCCDALWDTCPQPYCLLQZYJSWXWZZMMGLMXCLMXCZMXMZSQTZPPJQBLPGXJZHFLJJHYCJSNXWCXSCCDLXSYJDCQCXSLQYCLZXLZZXMXQRJMHRHZJPHMFLJLMLCLQNLDXZLLLFYPNGJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJXYHWDCWDZHQYYBGYBCYSCFGFSJNZDRZZJZXRZRQJJYMCANHRJTLDBPYZBSTJHXXZYPFDWFGZZRPYMTNGXZQBYXMBBFCCKRPJJBJEGRZGYCLKHZDXKKNSJKCLJSPGYYZLQQJYBZSSQLLLKJBCBKTYLCCCDBLCPPFYLGYDXZJYQGGKQTTFCXBDKDXXHYBBFYTYHBZLPDYTGDHRYRNJSBTCSNYJQHKLLLZSLYDXXWBCJQSBXBFJZJCJDZFBXXBRMLAZGCSNCLBJDSTBLFRZ#SWSBXBCLLXXLZDJZSJPYLYXYYFTFFFBHJJJGBYGJPMMMPSSCZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSDGJGYGMSCLJJXDTYGJQJQJCJZCJGDZDSHQGSJGGCJHQXSNJJZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJDRXYSQTJXYEFYYSSYXJXNCYZXFXCSYSZXYYSCHSHXZZZGZZZGFJDLDYLNPZGYJYZTYQZPBXQBDZTZCZYXXYHHSCXSHCGGQHJHGXWSCTMZMLHYXGEBTYLZKKWYTJZRCLEKESTDBCYKQQSAYXCJXWWGSBHJSZSDHCSJKQCXSWXFCTYNYDPZCCZJQTZWJQDZZZQZLJCXLSBHBYDXPSXSHHEZDXFPTJQYZZXHYAXNCFZYYHXGNXMYWXTZSJBKHHGYMXMXQCXTSBCQSJYXHTYYLYBCQLMMSZMJZJLLCOGXZAAJZYHJMCHHCXZSXZDZNLEYJJZJBHZWZZSQTJPSXZTDSXJJJZNYAZPHHYYSRRQDTHZHAYJYJHDZJZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHHXXHLHDLDJQCLDWBSXFZZYYSCHTYTYJBHECXHJKGJFXBHYZJFXHWHBDZFYZBCAPNPGNYDMSXHKHHMAMLNBYJTMPXYJMCTHJBZYFCGDYHWPHFTGZZEZSBZEGPBMDSKFTYCMHBLLHGPZJXZJGZJYJZSBBQSCZZLZCCSTPGXMJSFDCCZJZDJXCYBZLFCJSAZFGSZLYBCWZZBYZDZYPSWYJGXZBDSYSXLGZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNTXCHCZXTZZLJFZGQSQYXZJQCCCCDQCDXZJYQJQCGXZTDLGSCXZSYJJQTCCLQDQZTQCHQQJZTEZZZPBKKDJFCJFZTYBQYQTTYJLMBDKTJCPQZJDZFPJSBNJLGYJDXJDZQKZGQKXDLPZJTCJDQBXDJJJSTCJNXBXCMSLYJCQMTJJWWCJJNJNLLLHJCWQTBZQQCZCZPZZDZYDDCYZDZCCJGTJFCDPRNTCTJDCQTQNDTJNPLZBCLLCTDSXKJZQDPZLBZNBTJDCXFCZDBCCJJLTQQPLDCGZTBBZJCQDCJWYNLLZLZCCDWLLXWZLXRSNTQJCZXKJLSGDFQTDDGLRLAJJTKLYMKQLLDZYTDYYCYGJWYXDXFRSKSTCDENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKYQSPEGJJGLKQZZZSLYSYWYZWFQZNLZHLZHWCGKYPQGNPGBLPLRRJYXCCCGYHSFZFWFZYWTGZXYLJCZWHXZJZBLFFLGSKHYJDEYJHLPLLLLCYGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJWSPYXZLZLXGCCBZBLLCXBBBBXBBCBBCRNNZCCYRBDSYLDCGQYYQXYGMQZWTZYDYJHYFWDEHZDJYWLCCCTZYJJCDEDPZDZTSY#JHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYZTGWSCSZQFLSHLGLBCZBHDLYZJYCKWTYDYLBNYDSDSYCCDYSZYYEBGEXHQDDWNYGYCLXTDCYSTQMYGZASCCSZZDDLCCLZRQXYYELJSBYMXSHZTEMBBLLYYLLYTDQYSHYMRQXKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYGHQZJXHXJXGNLJKZLYYCDXLFWFGHLJGJYBXBLYBXQPQGZTZPLNCYBXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYHYBMCFLYZHQYZMQXDBXBZWZMSLPDMYCKFMZKLZCYQYCCLHXFCLYDQZPZYGYJYZMDXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNWLLYTPZCTZZCKTXDHXXTQCYPKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXCYLMMNXJSMYBCSYSSLZYLLJJGYLDZDPQHFZZBLFNDSQKCZFHHHGQMRDSXYCSTXNQQRPYJBFCXDYQFBNXEJDGYQBSRCNFYYQPGHYJDYZXGRHTKYLEQDZNTSMGKLBSGBPYSZBYDJZSSTJZSTXZBHBSCSBZCZPTQFZMQFLYPYBBJGSZMXXDJMTSYSKKBJTXHJCEGBSMHYJZCXTMLJYXRZZQSCXXQPTZHMKDXXXJCLJPRMYYGADYSKQLSADHRSKQXZXZTCXHZTLMLWXYBWSYCTBHJHJFCWZSXHWTKZLXQSHLYCZJXEMPLPRCGLTBZZTLZJCYJGDTSLKLPLLQPJMZPAPXYZLAKTKDNCZZBNCCTDQQZJYJGMCTXLDGCSZLMLHBGLKFBNWZHDXPHLFMKYCLGXDTWZFRJEJCTZHYDXYKSHWFZCQSHKNMQQHTCHYMJDJSKHXZJZBZZXYMPAJQMCDBXLSKLYYNWRTSQGSCBPDBSGZWYHTLKSSSWGZZLYYTNXJGMJSZSXFWNLSOZTXGXLSAMMLBWLDSCYLAKQCQSTMYCFJBSLXCLZJCLXXKSBZQZLHJPHQPLSXSCGSLNHPSFQQXTXJJZLQLDXZJJZDYYDJNZPTFCDSKJFSLJHYLZQJZLBTHYDGDJFDBYAZXDZHZJNHHQBYGNXJJQCZMLLJZKSPLDSCLBBLXKLELXJLBJYCXJXGCNLCQPLZLZNJTZLJGYZDZPLTQCSSFDMNYCXGBTJDCZNBGBQYQJWGKFHDNBYQZQGBKPBBYZMTJDYTBLSQMBSXTBNPDXKLEMYYCJYNZDTLDYKZZXTDXHQSHDGMZSJYCCTAYRZLPWLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBQDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLXJLPLDLPCQDHLHZLYCBLCXCCJADJLMCMMSSHMYBHBSKKBHRSXXJMXSDZNZPXLBBRHGGHFCHGMSKLLTSJYYCQLCSKYWYEHYWHBHQYWBAWYKQLDQ#TNTKHQCGDQKTGPKXHCPDHTWTMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLDYYCXWHYECLQHKQHTTQKHFFLDXQWYTYYDESBPKYRZPJFYYZJCEQDZZDLATTBBFJLLCXDLMJSDXEGYGSJQXCWBXSSZPDYZCXDNYXPFZQDLYJCCPLTXLSXYZYRXCYYYDYLWWNDSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSAXFNEJDXYZHLXLLLZHZSJNYQYQJXYJGHZGJCYJCHZLYCDSHHSGCZYJGCLLNYZCJYYXNFSMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNSTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWFXJMMMLLHAFDLLAFLBHHHBQQJTZJCQJJDJTFFKMMMPYMHYGDCJRDDWRQJXNBYSNMZDBXYTBJHPYBYGTJXAAHGQDQTMBSTQXKBTSBKJLXRBEQQHQMJJBDJWTGTBXPGBKTLGQXJJJCDHXQDWJLWRFMQGWQHCKRYSWGBTGYGBWSDWDWRFHWYTJJXXXJYZYSLPHYYPAYXHYDQQXSHXYXESKQHYWBDDDPPLCJLHQEEWJKSYYKDYPLFJTHKJLTCYJHHJTTBLTZZCDLTHQKCJQYSTEEYWKYZYXXYYSDDJKLLPWMCYHQGXYHCRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPHTHYYKTYEZYENMDSHLCRPQFBGFXZBSBTLGXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXTRYYCYFFSYZYZBJTBCTSBSDHRTJHBYTCXYJEYLXCBNEBJDSYSYHGSJCBXBYDFZWGENYHHTHJHAXFWGCSTBGXKLSTYWMTMBYXJSKZSXDYJRCYTWXZFHMYMCXLZNSDJTXTXRYCFYJSBSDYERXHGJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBBTHFJAAFXYXFPXMYFHDTTCXZZPXRSYWZDLYBBJTYQWQJPZYPZJZNJPZJLZTFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTGSQCZLPTXCDYYZSSQZSLXLZMACPCQBZYXHBSXLZDLTCDJTYLZJYYTPZYLLTXJSJXHLBMYTXCQRBLZSSFJZZTNJYTXMYJHLHPBLCYXQJQQKZZSCPZKSWALQSPLCCZJSXGWWWYGYATJBBCTDKHQHKGTGPBKQYSLBXBBCKBMLLXDZSTBKLGGQKQLSBKKDFXRMDKBFTPZFRTBBMFEEQGXKJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNHXDKDDJCYYGYFZGZLGSYGMJQGKHBPMXYXLYTQWLWGCPBMJXCYZYDRJBHTDJYEJSHTMJSBYPLWHLZFFNYPMHXQHPLTBQPFBCWJDBYGPNXTBFZJGSDCTJSHXEAWZZYLLTYYBWJKGXGHLFKXTJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQQXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHXZLZJBBHQZWWYCRDHLYQQJBEYFSJXTHSRXWJHWPSLMSSGZTTYEYQQWRSLALHMJTQJSMXQPJJZJXZYZKXBYQXBJXSHZSSFGLXYXZXFGHKZSZGGYLCLSARJXHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPJLBXBMMYWXGSLZHGLZGNYFLJBYFDJFRGSFMBYZHQFBWJSYFYJJPHZBYYZFFWODJRLMFTMLBZGYCQXCDJYGZYYYYDYTYDWEGAZYHXJLZYYHLRMGRJXZCLHNELJJTHTBWJYBJJBXJJTJTEEKHWSLZPLPSFAZPQQBDLQJJTYYQLYZKDKSQJYYJZLDQCGJQYZJSYCMRAQTHTEJMFCTYHYPKMHYCWJDCFHYYXWSHCTXRLJGJSHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYGQLLNJJYMSOYCBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCJLNQLJJJLXXJMLSZLJQLYCMMHCFMMFPQQMFXLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYDYXYQMYQYLDDCYYYDAZDCYMDYDLZFFFMMYCQCWZZMABTBYCTDMNDZGGDFTYPCGCYTTSSFFWBDTZQSSYSTWJJHJYTSXXYLBYQHWWHXEZXWZNNQZJZJJQJCCCHYYXBZXZCYJTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWLPGPYLLGKDLDLGKGQBGYCHJX#CSH#ZG##JYZSK##S#G#JZL#######SL#######L###################################################";
		var letter=pinyin.charAt(char.charCodeAt(0)-0x4E00);
		if(letter) return letter;
		return char.charAt(0).toUpperCase();
	}
	var forms = document.querySelectorAll("form[name='createbox']");
	for(var i = 0; i < forms.length; i++) {
		forms[i].addEventListener("submit", function(event) {
			// 阻止默认的表单提交行为
			event.preventDefault();
			// 在提交前添加新元素到表单中
			var newInput = document.createElement("input");
			newInput.type = "hidden";
			newInput.name = "preloadparams[]";
			var value = this.querySelector("input[name='title']").value;
			value = getFirstPinyin(value);
			newInput.value = value;
			var submitButton = this.querySelector("input[type='submit']");
			this.insertBefore(newInput, submitButton);
			// 执行其他提交操作，例如提交表单
			this.submit();
		});
	}
});