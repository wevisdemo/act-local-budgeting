(window.webpackJsonp=window.webpackJsonp||[]).push([[10,5],{290:function(t,e,n){var content=n(294);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(50).default)("506980bd",content,!0,{sourceMap:!1})},291:function(t,e,n){t.exports=n.p+"img/logo.01e9896.svg"},292:function(t,e,n){t.exports=n.p+"img/box_light.216070f.svg"},293:function(t,e,n){"use strict";n(290)},294:function(t,e,n){var r=n(49)(!1);r.push([t.i,".menu[data-v-d04cfa82]{background:#000;color:#bfc5cb;padding:0 10px;position:fixed;width:100%;top:0;z-index:10;transition:.5s}.menu .box[data-v-d04cfa82]{border:1px solid #3a3a42;padding:5px;color:#bfc5cb;margin:0 5px;display:inline-block}@media (max-width:600px){.menu .box[data-v-d04cfa82]{margin-bottom:2px;font-size:11px}}",""]),t.exports=r},297:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{logo:n(291),lastScrollTop:0}},created:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop;t>this.lastScrollTop?document.getElementById("menu-wrapper").style.top="-100px":document.getElementById("menu-wrapper").style.top="0",this.lastScrollTop=t<=0?0:t}}},o=(n(293),n(62)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"menu d-flex justify-content-between align-items-center",attrs:{id:"menu-wrapper"}},[n("div",[n("a",{attrs:{href:"http://actai.co",target:"_blank",rel:"noopener noreferrer"}},[n("img",{staticClass:"logo",attrs:{src:t.logo,alt:"",width:"70"}})])]),t._v(" "),n("div",{staticClass:"text-right text-sm-left"},[n("NuxtLink",{staticClass:"box text-3",attrs:{to:"/"}},[t._v("หน้าหลัก")]),t._v(" "),n("NuxtLink",{staticClass:"box text-3",attrs:{to:"/dashboard"}},[t._v("สำรวจข้อมูล")]),t._v(" "),n("NuxtLink",{staticClass:"box text-3",attrs:{to:"/story"}},[t._v("งบ อบจ. สำคัญอย่างไร")]),t._v(" "),n("NuxtLink",{staticClass:"box text-3",attrs:{to:"/conclusion"}},[t._v("สรุปภาพรวม")])],1)])])}),[],!1,null,"d04cfa82",null);e.default=component.exports},356:function(t,e,n){var content=n(506);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(50).default)("56f5a12a",content,!0,{sourceMap:!1})},501:function(t,e,n){"undefined"!=typeof self&&self,t.exports=function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){t.exports=i(1)},function(t,e,i){"use strict";i.r(e),i.d(e,"ShareNetwork",(function(){return o}));var n={baidu:"http://cang.baidu.com/do/add?iu=@u&it=@t",buffer:"https://bufferapp.com/add?text=@t&url=@u",email:"mailto:?subject=@t&body=@u%0D%0A@d",evernote:"https://www.evernote.com/clip.action?url=@u&title=@t",facebook:"https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d&quote=@q&hashtag=@h",flipboard:"https://share.flipboard.com/bookmarklet/popout?v=2&url=@u&title=@t",hackernews:"https://news.ycombinator.com/submitlink?u=@u&t=@t",instapaper:"http://www.instapaper.com/edit?url=@u&title=@t&description=@d",line:"http://line.me/R/msg/text/?@t%0D%0A@u%0D%0A@d",linkedin:"https://www.linkedin.com/sharing/share-offsite/?url=@u",messenger:"fb-messenger://share/?link=@u",odnoklassniki:"https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=@u&st.comments=@t",pinterest:"https://pinterest.com/pin/create/button/?url=@u&media=@m&description=@t",pocket:"https://getpocket.com/save?url=@u&title=@t",quora:"https://www.quora.com/share?url=@u&title=@t",reddit:"https://www.reddit.com/submit?url=@u&title=@t",skype:"https://web.skype.com/share?url=@t%0D%0A@u%0D%0A@d",sms:"sms:?body=@t%0D%0A@u%0D%0A@d",stumbleupon:"https://www.stumbleupon.com/submit?url=@u&title=@t",telegram:"https://t.me/share/url?url=@u&text=@t%0D%0A@d",tumblr:"https://www.tumblr.com/share/link?url=@u&name=@t&description=@d",twitter:"https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h@tu",viber:"viber://forward?text=@t%0D%0A@u%0D%0A@d",vk:"https://vk.com/share.php?url=@u&title=@t&description=@d&image=@m&noparse=true",weibo:"http://service.weibo.com/share/share.php?url=@u&title=@t&pic=@m",whatsapp:"https://api.whatsapp.com/send?text=@t%0D%0A@u%0D%0A@d",wordpress:"https://wordpress.com/press-this.php?u=@u&t=@t&s=@d&i=@m",xing:"https://www.xing.com/social/share/spi?op=share&url=@u&title=@t",yammer:"https://www.yammer.com/messages/new?login=true&status=@t%0D%0A@u%0D%0A@d"},r="undefined"!=typeof window?window:null,o={name:"ShareNetwork",props:{network:{type:String,required:!0},url:{type:String,required:!0},title:{type:String,required:!0},description:{type:String,default:""},quote:{type:String,default:""},hashtags:{type:String,default:""},twitterUser:{type:String,default:""},media:{type:String,default:""},tag:{type:String,default:"a"},popup:{type:Object,default:function(){return{width:626,height:436}}}},data:function(){return{popupTop:0,popupLeft:0,popupWindow:void 0,popupInterval:null}},computed:{networks:function(){return this.$SocialSharing?this.$SocialSharing.options.networks:n},key:function(){return this.network.toLowerCase()},rawLink:function(){var t=navigator.userAgent.toLowerCase();return"sms"===this.key&&(t.indexOf("iphone")>-1||t.indexOf("ipad")>-1)?this.networks[this.key].replace(":?",":&"):this.networks[this.key]},shareLink:function(){var t=this.rawLink;return"twitter"===this.key&&(this.hashtags.length||(t=t.replace("&hashtags=@h","")),this.twitterUser.length||(t=t.replace("@tu",""))),t.replace(/@tu/g,"&via="+encodeURIComponent(this.twitterUser)).replace(/@u/g,encodeURIComponent(this.url)).replace(/@t/g,encodeURIComponent(this.title)).replace(/@d/g,encodeURIComponent(this.description)).replace(/@q/g,encodeURIComponent(this.quote)).replace(/@h/g,this.encodedHashtags).replace(/@m/g,encodeURIComponent(this.media))},encodedHashtags:function(){return"facebook"===this.key&&this.hashtags.length?"%23"+this.hashtags.split(",")[0]:this.hashtags}},render:function(t){var e=this;if(!this.networks.hasOwnProperty(this.key))throw new Error("Network "+this.key+" does not exist");var i={class:"share-network-"+this.key,on:{click:function(){return e["http"===e.rawLink.substring(0,4)?"share":"touch"]()}}};return"a"===this.tag&&(i.attrs={href:"javascript:void(0)"}),t(this.tag,i,this.$slots.default)},methods:{resizePopup:function(){var t=r.innerWidth||document.documentElement.clientWidth||r.screenX,e=r.innerHeight||document.documentElement.clientHeight||r.screenY,i=t/r.screen.availWidth;this.popupLeft=(t-this.popup.width)/2/i+(void 0!==r.screenLeft?r.screenLeft:r.screenX),this.popupTop=(e-this.popup.height)/2/i+(void 0!==r.screenTop?r.screenTop:r.screenY)},share:function(){var t=this;this.resizePopup(),this.popupWindow&&this.popupInterval&&(clearInterval(this.popupInterval),this.popupWindow.close(),this.emit("change")),this.popupWindow=r.open(this.shareLink,"sharer-"+this.key,",height="+this.popup.height+",width="+this.popup.width+",left="+this.popupLeft+",top="+this.popupTop+",screenX="+this.popupLeft+",screenY="+this.popupTop),this.popupWindow&&(this.popupWindow.focus(),this.popupInterval=setInterval((function(){t.popupWindow&&!t.popupWindow.closed||(clearInterval(t.popupInterval),t.popupWindow=null,t.emit("close"))}),500),this.emit("open"))},touch:function(){window.open(this.shareLink,"_blank"),this.emit("open")},emit:function(t){this.$root.$emit("share_network_"+t,this.key,this.url),this.$emit(t,this.key,this.url)}}};e.default={install:function(t,e){t.component(o.name,o),t.prototype.$SocialSharing={options:{networks:e&&e.hasOwnProperty("networks")?Object.assign(n,e.networks):n}}}}}])},502:function(t,e,n){t.exports=n.p+"img/facebook.638f7a6.svg"},503:function(t,e,n){t.exports=n.p+"img/line.cb45975.svg"},504:function(t,e,n){t.exports=n.p+"img/twitter.ebdeb79.svg"},505:function(t,e,n){"use strict";n(356)},506:function(t,e,n){var r=n(49)(!1);r.push([t.i,".wrapper[data-v-844ce79e]{padding:112px 20px}.content-box[data-v-844ce79e]{max-width:842px;margin:auto}.content-box .head[data-v-844ce79e]{background-color:#e0fd6a;padding:10px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.content-box .content[data-v-844ce79e]{padding:25px}.content-box .content span[data-v-844ce79e]{color:#e0fd6a}.share-box[data-v-844ce79e]{max-width:650px;margin:auto}.credit-box[data-v-844ce79e]{max-width:900px;margin:auto}.credit-box a[data-v-844ce79e]{color:#e5fbff}.header-box[data-v-844ce79e]{border:1px solid #fffef5;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin:auto}.header-box[data-v-844ce79e],.header-box .content[data-v-844ce79e]{padding:10px}",""]),t.exports=r},567:function(t,e,n){"use strict";n.r(e);var r=n(7),o=n(501),c=n.n(o);r.default.use(c.a);var l={data:function(){return{box_light:n(292),logo:n(291),facebook:n(502),line:n(503),twitter:n(504)}}},d=(n(505),n(62)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header"),t._v(" "),n("div",{staticClass:"wrapper bg-blue-a min-h-screen"},[n("div",{staticClass:"content-box black mb-sm-5"},[t._m(0),t._v(" "),n("div",{staticClass:"content bg-black white-a text-1 text-center text-sm-left"},[t._m(1),t._v(" "),n("b-row",{staticClass:"align-items-center"},[n("b-col",{staticClass:"text-center text-sm-left mb-3",attrs:{sm:"2"}},[n("img",{attrs:{src:t.box_light,alt:"",width:"70"}})]),t._v(" "),n("b-col",{attrs:{sm:"10"}},[n("p",{staticClass:"text-1 m-0"},[t._v("\n              โดยโปรเจกต์ชิ้นนี้เป็นหนึ่งในเครื่องมือที่จะช่วยให้การ"),n("span",{},[t._v("ตรวจสอบ")]),t._v("การใช้งบประมาณของแต่ละ อบจ. ง่ายดายยิ่งขึ้น\n            ")])])],1),t._v(" "),n("b-row",{staticClass:"align-items-center mt-3"},[n("b-col",{staticClass:"text-center text-sm-left mb-3",attrs:{sm:"2"}},[n("img",{attrs:{src:t.logo,alt:"",width:"70"}})]),t._v(" "),n("b-col",{attrs:{sm:"10"}},[n("p",{staticClass:"text-1 m-0"},[t._v("\n              ควบคู่ไปกับการใช้ ACT Ai ที่จะ"),n("span",{},[t._v("ติดตาม")]),t._v("กระบวนการใช้จ่ายงบประมาณ ตั้งแต่ขั้นตอนการของบ\n              ไปจนจบที่โครงการจัดซื้อจัดจ้าง ทั้งหมดนี้เพื่อช่วยให้การจัดสรรงบ\n              อบจ. เป็นไปอย่างโปร่งใสมากยิ่งขึ้น\n            ")])])],1)],1)]),t._v(" "),n("div",{staticClass:"share-box text-center white-a py-5"},[n("p",{staticClass:"header-4"},[t._v("\n        แชร์เพื่อชวนเพื่อน ๆ มาช่วยกันตรวจสอบงบ อบจ.\n        และทำให้งบบ้านเราเป็นเรื่องที่ทุกคนตรวจสอบได้…\n      ")]),t._v(" "),n("div",{staticClass:"d-flex justify-content-center py-sm-5"},[n("ShareNetwork",{staticClass:"share-btn pointer text-1 mx-2",attrs:{network:"facebook",title:"",url:"https://wevisdemo.github.io/act-local-budgeting/"}},[n("img",{attrs:{src:t.facebook,alt:"facebook"}})]),t._v(" "),n("ShareNetwork",{staticClass:"share-btn pointer text-1 mx-2",attrs:{network:"twitter",title:"",url:"https://wevisdemo.github.io/act-local-budgeting/"}},[n("img",{attrs:{src:t.twitter,alt:"twitter"}})]),t._v(" "),n("ShareNetwork",{staticClass:"share-btn pointer text-1 mx-2",attrs:{network:"line",title:"",url:"https://wevisdemo.github.io/act-local-budgeting/"}},[n("img",{attrs:{src:t.line,alt:"line"}})])],1)]),t._v(" "),t._m(2),t._v(" "),n("NuxtLink",{staticClass:"box text-3",attrs:{to:"/"}},[n("div",{staticClass:"header-box mb-5"},[n("div",{staticClass:"content bg-white"},[n("p",{staticClass:"text-1 font-weight-bold m-0 blue-a"},[t._v("กลับหน้าหลัก")])])])])],1)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"head"},[n("h3",{staticClass:"header-3 m-0 font-weight-bold"},[t._v("สรุปภาพรวมงบ อบจ.")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("\n          สำหรับการจัดสรรงบ อบจ. ของไทย แม้ประชาชนอย่างเรา\n          จะมีส่วนในการผลักดันความคิดเข้าในขั้นตอนก่อนการจัดสรรได้ไม่เต็มที่นัก\n          แต่เรายังคง"),n("span",{staticClass:"lime font-weight-bold"},[t._v("มีบทบาทในการช่วยติดตาม ตรวจสอบ รายจ่ายของแต่ละจังหวัด")]),t._v("\n          ว่าเป็นไปอย่างสมเหตุสมผลหรือไม่\n        ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"py-5 credit-box white-a"},[n("p",{staticClass:"header-5"},[t._v("ขอบคุณข้อมูลจาก")]),t._v(" "),n("ul",[n("li",[t._v("\n          รศ.ดร.วีระศักดิ์ เครือเทพ อาจารย์ประจำภาควิชารัฐประศาสนศาสตร์\n          คณะรัฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย\n        ")]),t._v(" "),n("li",[t._v("สถาบันพระปกเกล้า")]),t._v(" "),n("li",[t._v("กรมส่งเสริมการปกครองท้องถิ่น กระทรวงมหาดไทย")]),t._v(" "),n("li",[t._v("\n          สำนักงานคณะกรรมการป้องกันและปราบปรามการทุจริตแห่งชาติ (สำนักงาน\n          ป.ป.ช.)\n        ")]),t._v(" "),n("li",[t._v("องค์การบริหารส่วนจังหวัด 76 แห่ง")]),t._v(" "),n("li",[t._v("สำนักบริหารการทะเบียน กรมการปกครอง")]),t._v(" "),n("li",[t._v("\n          ดร.มานะ นิมิตรมงคล เลขาธิการองค์กรต่อต้านคอร์รัปชัน (ประเทศไทย)\n        ")]),t._v(" "),n("li",[n("a",{attrs:{href:"https://www.gov.uk/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.gov.uk/")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://transparencia.gov.br",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://transparencia.gov.br")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://www.usaspending.gov/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.usaspending.gov/")])])])])}],!1,null,"844ce79e",null);e.default=component.exports;installComponents(component,{Header:n(297).default})}}]);