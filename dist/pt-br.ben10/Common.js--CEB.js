/***** O CSS colocado aqui vai ser aplicado à nova skin. Por favor, garanta que você não viola os Termos de Uso da Wikia, obscurecendo ou removendo a publicidade. *****/

@import "http://dev.wikia.com/index.php?title=Highlight/code.css&action=raw&ctype=text/css";

/*-------------Wiki-navigation subnavs - novo estilo---------------- */
/*----------ATUALMENTE TESTANDO CODIFICAÇÃO DIFERENTE---------------------- */
/*-------------Wiki-navigation subnavs - novo estilo--------------------- */
 

.wikia-menu-button ul, 
.wikia-menu-button.secondary ul, 
.modalWrapper, 
.skin-oasis #ImageUpload, 
.skin-oasis #VideoEmbed, 
.AccountNavigation .subnav, 
.WikiaSpotlight, 
.WikiaPageHeader .history.hover, 
.WikiaSearch .autocomplete, 
.WikiaFooter .my-tools-menu {
  background: rgba(0, 0, 0, 0.77);
  border: #222222 !important;
  -moz-border-radius: 0 0 6px 6px;
  -webkit-border-radius: 0 0 6px 6px;
}
 
.GlobalNavigation .subnav {
  background: rgba(0, 0, 0, 0.77);
  border: #008000  !important;
  -moz-border-radius: 0 0 16px 16px;
  -webkit-border-radius: 0 0 16px 16px;
}  
 
.WikiaPageHeader details {
  background: transparent;
}
 
.WikiaSearch input[type="text"] {
  background: rgba(0, 0, 0, 0.77);
  border: 1px solid #252525;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  color: #DDDDDD;
}
 
.WikiHeader li:hover {
  background: rgba(0, 0, 0, 0.77);
  -moz-border-radius: 6px 6px 0 0;
  -webkit-border-radius: 6px 6px 0 0;
}
 
.WikiaPagesOnWikiModule, 
.WikiaActivityModule, 
.WikiaImageModule, 
#WikiaSpotlightsModule, 
.WikiaArticle .thumbinner, 
.WikiaBlogListingBox, 
.HotSpotsModule, 
.CommunityCornerModule, 
.LatestPhotosModule, 
.WikiaArticle pre, 
.WikiaArticleCategories {
  background: rgba(0, 0, 0, 0.77) !important;
  border: 1px solid #008000 !important;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
}



/*------Módulos Ferroviários-------*/
 
.activityfeed-inserted-media li {
  border:1px solid #19E602;
        -moz-border-radius: 0.4em 0.4em 0.4em 0.4em;
        -webkit-border-radius: 0.4em 0.4em 0.4em 0.4em;
        border-radius: 0.4em 0.4em 0.4em 0.4em;
}
 
 
.WikiaPagesOnWikiModule,
.WikiaActivityModule,
.WikiaBlogListingBox,
.LatestPhotosModule,
#WikiaSpotlightsModule,
.HotSpotsModule,
.ChatModule,
.LatestQuestionsModule,
.UserProfileAchievementsModule,
.WikiaLatestEarnedBadgesModule,
.FollowedPagesModule { 
  line-height:90%;
  text-align:left;
  background-image:none !important;
  border:1px solid #19E602 !important;
        -moz-border-radius: 0.4em 0.4em 0.4em 0.4em;
        -webkit-border-radius: 0.4em 0.4em 0.4em 0.4em;
        border-radius: 0.4em 0.4em 0.4em 0.4em;
}

/* Ver também: [[MediaWiki:Monobook.css]] */
/* <pre> */
table.wikitable,
table.prettytable {
  margin: 1em 1em 1em 0;
  background: #000000;
  border: 1px #aaa solid;
  border-collapse: collapse;
}
 
table.wikitable th, table.wikitable td,
table.prettytable th, table.prettytable td {
  border: 1px #aaa solid;
  padding: 0.2em;
}
 
table.wikitable th,
table.prettytable th {
  background: #008000;
  text-align: center;
}
 
table.wikitable caption,
table.prettytable caption {
  margin-left: inherit;
  margin-right: inherit;
  font-weight: bold;
}
 
/* Bartek */
div.videobox {
	background-color: #09101D;
}

#wikia_page table.toc,
#catlinks,
#wikia_page table.gallery td,
ul#filetoc,
#preferences,
.prefsection table,
.prefsection legend
{
	background-color: #09101D;
	color: #FFF;
}

table.gallery {
	background-color: #09101D;
}
table.gallery td {
	border: 0;
}

#pagehistory li.selected,
#toc,
.toc,
.toccolours,
.mw-warning {
    background-color: #1E293D;
    color: #fff
}
#pagehistory li {
	border-color: #0E192D;
}

table.diff,
td.diff-otitle,
td.diff-ntitle,
td.diff-article {
    background-color: #0e192d;
}

td.diff-context {
    background-color: #3e495d;
    color: #000;
}

td.diff-deletedline {
	background-color: #FFFFAA;
	color: #000;
}

td.diff-addedline {
    background-color: #2e594d;
    color: #000;
}

.mw-plusminus-pos { color: #00FF00 !important; }
.mw-plusminus-neg { color: #FF0000 !important; }

/* Special pages */
#lu-result .TablePager a {
	color:blue;
}
#lu-result .TablePager a.new {
	color:red;
}

/* Esconder "Imagem adicionada por" nos artigos */
div.picture-attribution { display:none !important; }

/* Cabeçalhos em negrito */
h2, h3, h4, h5, h6 { font-weight: bold }


/* Cabeçalho */ 
.codonstream { 
font-size:18px; 
padding:1px; 
background:#00FF04; 
border:2px solid #004001; 
color:#FFFFFF; 
text-align:center; 
-moz-border-radius:7px; /* Firefox */ 
border-radius:7px; /* Chrome, Safari, Opera */ 
}

/* Cabeçalho */ 
.codonstream2 { 
font-size:18px; 
padding:1px; 
background:#000000; 
border:2px solid #00FF04; 
color:#00FF04; 
text-align:center; 
-moz-border-radius:7px; /* Firefox */ 
border-radius:7px; /* Chrome, Safari, Opera */ 
}


/**** E, então, use isto para adicionar uma caixa pura pequena de informação para as páginas.
/****
/**** {| class="codonstream" style="wdith:250px" | style="color:black" | '''Codon Stream''' | style="color:black" | '''Home Planet''' |- | class="codonstream2"|'''To'kustar''' | class="codonstream2"|'''Cosmic Storms''' |} ****/

a[href="/wiki/Usu%C3%A1rio:Ruk2."] {color:#FF0000; !important}
a[href="/wiki/Usu%C3%A1rio:Enormossauro_Supremo"] {color:#008080; !important}
a[href="/wiki/Usu%C3%A1rio:Artuaii"] {color: #008080; !important}
a[href="/wiki/Usu%C3%A1rio:Periett"] {color: #008080; !important}
a[href="/wiki/Usu%C3%A1rio:DemonBoyMaster"] {color: #008080; !important}
a[href="/wiki/Usu%C3%A1rio:AnoditeForever"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Chase_Matthews"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Cook_Me_Plox"] {color: #007FFF; !important}
a[href="/wiki/Usu%C3%A1rio:FrostyRider"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Gabriel_malta"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Grandãox"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Jugleii"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Megawhattônico"] {color: #4682B4; !important}
a[href="/wiki/Usu%C3%A1rio:Ruk2.Bot"] {color: #00009C; !important}
a[href="/wiki/Usu%C3%A1rio:ChatBotPB10"] {color: #00009C; !important}
a[href="/wiki/Usu%C3%A1rio:Bot_de_manutenção_PB10"] {color: #00009C; !important}
a[href="/wiki/Usu%C3%A1rio:CVU_Bot_PB10"] {color: #00009C; !important}


.co/*** Comentários de Artigo - Destacar Administrador ***/
 
.comments li.article-comment-staff > blockquote {
   background: #075b00 !important;
}
.comments li.article-comment-staff > blockquote:after {
   border-color: transparent #075b00 #075b00 transparent !important;
}
.comments li.article-comment-staff > blockquote div {
   background: transparent !important;
}
 
.comments li[data-user="Ruk2."] > blockquote {
   background: #075b00 !important;
}
.comments li[data-user="Ruk2."] > blockquote:after {
   border-color: transparent #075b00 #075b00 transparent !important;
}
.comments li[data-user="Ruk2."] > blockquote div {
   background: transparent !important;
}
 
.comments li[data-user="Enormossauro Supremo"] > blockquote {
   background: #075b00 !important;
}
.comments li[data-user="Enormossauro Supremo"] > blockquote:after {
   border-color: transparent #075b00 #075b00 transparent !important;
}
.comments li[data-user="Enormossauro Supremo"] > blockquote div {
   background: transparent !important;
}
 
.comments li[data-user="Artuaii"] > blockquote {
   background: #075b00 !important;
}
.comments li[data-user="Artuaii"] > blockquote:after {
   border-color: transparent #075b00 #075b00 transparent !important;
}
.comments li[data-user="Artuaii"] > blockquote div {
   background: transparent !important;
}
 
.comments li[data-user="Periett"] > blockquote {
   background: #075b00 !important;
}
.comments li[data-user="Periett"] > blockquote:after {
   border-color: transparent #075b00 #075b00 transparent !important;
}
.comments li[data-user="Periett"] > blockquote div {
   background: transparent !important;
}
 
.comments li[data-user="DemonBoyMaster"] > blockquote {
   background: #075b00 !important;
}
.comments li[data-user="DemonBoyMaster"] > blockquote:after {
   border-color: transparent #075b00 #075b00 transparent !important;
}
.comments li[data-user="DemonBoyMaster"] > blockquote div {
   background: transparent !important;


/* New Infoboxes */

table.bubble {
   border:1px solid #98e1ee;
   background:black; 
  -khtml-border-radius: 5px 5px 5px 5px;
  -moz-border-radius: 5px 5px 5px 5px;
  -webkit-border-radius: 5px 5px 5px 5px;
  -o-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}