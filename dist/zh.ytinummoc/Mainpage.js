/* Main page */
/** General **/
.mainpage-box {
     font-family: "Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif;
     margin: 20px 0px 30px;
}
 
.mainpage-box h2 {
     border: medium none;
     color: #656e78;
     font-size: 26px;
     font-weight: bold;
     line-height: normal;
     margin: 85px 0 20px;
     overflow: hidden;
     padding: 0;
     text-align: center;
     text-transform: uppercase;
}
 
.mainpage-box h2::before, .mainpage-box h2::after {
     background-color: #707070;
     content: "";
     display: inline-block;
     height: 1px;
     position: relative;
     vertical-align: middle;
     width: 50%;
}
 
.mainpage-box h2::before {
     margin-left: -50%;
     right: 0.5em;
}
 
.mainpage-box h2::after {
     left: 0.5em;
     margin-right: -50%;
}
 
.mainpage-box h3 {
     color: #333333;
     font-weight: bold;
     font-size: 22px;
     line-height: normal;
     margin: 15px 0px 20px;
}
 
.mainpage-more {
     margin-top: 20px;
}
 
.mainpage-more a, .mainpage-more .recent a:active, .mainpage-more .recent a:visited {
     color: #4a90e2;
     font-size: 18px;
     text-decoration: none;
}
 
.mainpage-more a:hover {
     color: #6aaefc;
}
 
.mainpage-more a::after {
     background-size: cover;
     background-image: url("https://vignette.wikia.nocookie.net/central/images/4/45/Mainpage_Arrows.png/revision/latest?cb=20160711222557");
     background-position: 0px 0px;
     background-repeat: no-repeat;
     content: "";
     display: inline-block;
     height: 16px;
     left: 8px;
     position: relative;
     top: 3px;
     width: 22px;
}
 
.mainpage-more a:hover::after {
     background-position: -23px 0px;
}
 
@media screen and (max-width: 1023px) {
     .page-Community_Central .WikiaRail, .page-Community_Central .main-page-tag-rcs {
          -moz-column-count: 1;
          -webkit-column-count: 1;
          column-count: 1;
     }
}
 
/** Blogs **/
.mainpage-blogs {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -ms-flex-wrap: wrap;
     flex-wrap: wrap;
     -webkit-box-pack: justify;
     -ms-flex-pack: justify;
     justify-content: space-between;
}
 
.mainpage-blogs .blog {
     margin: 10px 0px;
     width: calc(50% - 10px);
}
 
.mainpage-blogs .blog.featured {
     width: 100%;
}
 
.mainpage-blogs .hero-image img {
     height: auto;
     width: 100%;
}
 
.mainpage-blogs .blog-info {
     -webkit-box-align: center;
     -ms-flex-align: center;
     -ms-grid-row-align: center;
     align-items: center;
     border-bottom: 1px solid #e5e9f4;
     border-left: 1px solid #e5e9f4;
     border-radius: 0px 0px 4px 4px;
     border-right: 1px solid #e5e9f4;
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     height: 64px;
}
 
.mainpage-blogs .blog .blog-info {
     padding: 15px 15px 10px 10px;
}
 
.mainpage-blogs .blog.featured .blog-info {
     padding-bottom: 10px;
}
 
.mainpage-blogs .details {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-flex: 1;
     -ms-flex: 1;
     flex: 1;
     -webkit-box-orient: vertical;
     -webkit-box-direction: normal;
     -ms-flex-direction: column;
     flex-direction: column;
     -webkit-box-pack: center;
     -ms-flex-pack: center;
     justify-content: center;
     line-height: 18px;
}
 
.mainpage-blogs .blog-info .avatar {
     height: 55px;
     margin: 0px 20px 0px 0px;
}
 
.mainpage-blogs .blog-info .avatar img {
     border-radius: 50%;
     height: 100%;
     width: auto;
}
 
.mainpage-blogs .blog-info .author a, .mainpage-blogs .blog-info .author a:active, .mainpage-blogs .blog-info .author a:visited {
     color: #000000;
     text-decoration: none;
}
 
.mainpage-blogs .blog-info .author a:hover {
     color: #545454;
}
 
.mainpage-blogs .blog-info .timestamp {
     color: #999999;
     font-size: 14px;
}
 
.mainpage-blogs .blog-info .timestamp::before {
     content: "\00a0\00a0•\00a0";
     font-size: 10px;
}
 
.mainpage-blogs .blog .blog-info .title {
     font-size: 16px;
     font-weight: bold;
     margin-top: 4px;
}
 
.mainpage-blogs .blog.featured .blog-info .title {
     font-size: 23px;
}
 
.mainpage-blogs .blog-info .title a, .mainpage-blogs .blog-info .title a:active, .mainpage-blogs .blog-info .title a:visited {
     color: #4a90e2;
     text-decoration: none;
}
 
.mainpage-blogs .blog .title a:hover {
     color: #6aaefc;
}
 
@media screen and (min-width: 1024px) and (max-width: 1083px) {
     .mainpage-blogs .blog .blog-info .title {
          font-size: 14px;
     }
}
 
/** Wikia University **/
.mainpage-wikiauniversity h2 {
     margin-bottom: 5px;
     margin-top: 40px;
}
 
.mainpage-wikiauniversity h2::before, .mainpage-wikiauniversity h2::after {
     background: #b3b8bc none repeat scroll 0% 0%;
}
 
.mainpage-wikiauniversity .description {
     color: #656e78;
     font-size: 12px;
     font-weight: bold;
     margin-bottom: 5px;
     position: relative;
     text-align: center;
     text-transform: uppercase;
}
 
.mainpage-wikiauniversity .description .youtube-button {
     bottom: 0;
     margin: auto;
     position: absolute;
     right: 0;
     top: 0;
}
 
.mainpage-wikiauniversity .videos {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -ms-flex-wrap: wrap;
     flex-wrap: wrap;
     -webkit-box-pack: justify;
     -ms-flex-pack: justify;
     justify-content: space-between;
     list-style: outside none none;
     margin: 0px;
}
 
.mainpage-wikiauniversity .videos li {
     margin: 10px 0;
     width: calc(50% - 10px);
}
 
.mainpage-wikiauniversity .videos .article-thumb, .mainpage-wikiauniversity .videos .article-thumb .thumbimage {
     height: auto ! important;
     width: 100% ! important;
}
 
.mainpage-wikiauniversity .videos .article-thumb {
     margin: 0px;
}
 
.mainpage-wikiauniversity .videos .inline-video {
     display: block;
     height: 0px;
     padding-bottom: 56%;
     position: relative;
     width: 100%;
}
 
.mainpage-wikiauniversity .videos .inline-video iframe {
     height: 100% ! important;
     left: 0px;
     position: absolute;
     top: 0px;
     width: 100% ! important;
}
 
.mainpage-wikiauniversity .videos figcaption .title, .mainpage-wikiauniversity .videos .article-thumb .duration {
     display: none;
}
 
.mainpage-wikiauniversity .videos figcaption .title {
     color: #4a90e2;
     font-size: 18px;
     line-height: 22px;
}
 
.mainpage-wikiauniversity .videos .details {
     margin: 10px 0px 0px;
     padding-left: 10px;
}
 
.mainpage-wikiauniversity .videos .details .title {
     color: #4a90e2;
     font-size: 18px;
     line-height: 22px;
}
 
.mainpage-wikiauniversity .videos .details .title a, .mainpage-wikiauniversity .videos .details .title a:active, .mainpage-wikiauniversity .videos .details .title a:visited {
     color: #4a90e2;
     text-decoration: none;
}
 
.mainpage-wikiauniversity .videos .details .title a:hover {
     color: #6aaefc;
}
 
.mainpage-wikiauniversity .videos .details .duration {
     color: #c5ceda;
     font-size: 12px;
}
 
/** FAQ **/
.mainpage-faq .faqs {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -ms-flex-wrap: wrap;
     flex-wrap: wrap;
     -webkit-box-pack: justify;
     -ms-flex-pack: justify;
     justify-content: space-between;
}
 
.mainpage-faq .faq-section {
     margin: 10px 0px;
     width: calc(50% - 10px);
}
 
.mainpage-faq h4 {
     background: #f2f6fa none repeat scroll 0% 0%;
     color: #656e78;
     font-size: 18px;
     font-weight: bold;
     line-height: normal;
     margin: 0px;
     padding: 20px 10px 15px;
}
 
.mainpage-faq .faq-list {
     background-color: #fcfdff;
     border-bottom: 1px solid #e5e9f4;
     border-left: 1px solid #e5e9f4;
     border-right: 1px solid #e5e9f4;
     padding: 10px;
}
 
.mainpage-faq .faq-list a, .mainpage-faq .faq-list a:active, .mainpage-faq .faq-list a:visited {
     color: #4a90e2;
     text-decoration: none;
}
 
.mainpage-faq .faq-list a:hover {
     color: #6aaefc;
}
 
.mainpage-faq ul {
     list-style: outside none none;
     margin: 0px;
}
 
.mainpage-faq li {
     margin: 0px 0px 10px;
}
 
.mainpage-faq .faq-section .mainpage-more {
     font-weight: bold;
}
 
/** Connect **/
.mainpage-connect .staff {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-orient: horizontal;
     -webkit-box-direction: normal;
     -ms-flex-direction: row;
     flex-direction: row;
     -ms-flex-wrap: wrap;
     flex-wrap: wrap;
     -webkit-box-pack: justify;
     -ms-flex-pack: justify;
     justify-content: space-between;
     list-style: outside none none;
     margin: 0px;
}
 
.mainpage-connect .staff li {
     border-radius: 4px;
     border: 1px solid #e5e9f4;
     box-sizing: border-box;
     margin: 0px 0px 20px;
     padding: 15px 20px;
     text-align: center;
     width: calc(50% - 10px);
}
 
.mainpage-connect .staff img {
     border-radius: 50%;
     height: auto;
     width: 95px;
}
 
.mainpage-connect .staff .name {
     line-height: 18px;
     margin-top: 10px;
}
 
.mainpage-connect .staff .name a, .mainpage-connect .staff .name a:active, .mainpage-connect .staff .name a:visited {
     color: #000000;
     font-weight: bold;
     text-decoration: none;
}
 
.mainpage-connect .staff .name a:hover {
     color: #545454;
}
 
.mainpage-connect .mainpage-more {
     margin-top: 10px; 
}
 
@media screen and (max-width: 1023px) {
     .mainpage-connect .staff li {
          width: auto;
     }
 
     .mainpage-connect .staff .notablet {
          display: none;
     }
}
 
/** Social **/
.mainpage-social {
     background-color: #f6f6f6;
     padding: 30px 0px 35px;
     text-align: center;
}
 
.mainpage-social h3 {
     font-size: 25px;
     font-weight: bold;
     margin: 0px 0px 15px;
}
 
.mainpage-social .social-button {
     display: inline-block;
     vertical-align: top;
}
 
.mainpage-social .social-button.facebook span {
     vertical-align: top ! important;
}
 
.mainpage-social .twitter-follow-button {
     height: 20px ! important;
     position: static ! important;
     visibility: visible ! important;
     width: 64px ! important;
}
 
/** Custom Sections **/
.mainpage-sec .secs {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -ms-flex-wrap: wrap;
     flex-wrap: wrap;
     -webkit-box-pack: justify;
     -ms-flex-pack: justify;
     justify-content: space-between;
}
 
.mainpage-sec h2 {
    margin-top: 20px;
}
 
.mainpage-sec .sec-section {
     margin: 10px 0px;
     width: 100%;
}
 
.mainpage-sec h3 {
     background: #f2f6fa none repeat scroll 0% 0%;
     color: #656e78;
     font-size: 18px;
     font-weight: bold;
     line-height: normal;
     margin: 0px;
     padding: 20px 10px 15px;
}
 
.mainpage-sec .sec-list {
     background-color: #fcfdff;
     border-bottom: 1px solid #e5e9f4;
     border-left: 1px solid #e5e9f4;
     border-right: 1px solid #e5e9f4;
     padding: 10px;
}
 
.mainpage-sec a, .mainpage-sec a:active, .mainpage-sec a:visited {
     color: #4a90e2;
     text-decoration: none;
}
 
.mainpage-sec a:hover {
     color: #6aaefc;
}
 
.mainpage-sec ul {
     list-style: outside none none;
     margin: 0px;
}
 
.mainpage-sec li {
     margin: 0px 0px 10px;
}
 
.mainpage-sec .sec-section .mainpage-more {
     font-weight: bold;
}
 
.mainpage-sec .chat-headline:before, .mainpage-sec .chat-headline:after {
     display: none;
}
 
.main-page-tag-rcs .mainpage-box h2 {
 margin-top: 20px; 
}