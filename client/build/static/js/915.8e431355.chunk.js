"use strict";(self.webpackChunkmy_ocr_friend_client=self.webpackChunkmy_ocr_friend_client||[]).push([[915],{915:function(e,t,r){r.r(t),r.d(t,{default:function(){return z}});var n=r(885),s=r(413),a=r(791),o=r(373),c=r(856),i=r(982),l=r(164),d=r(820),u=r(184),x=function(e){var t=e.type,r=e.message,s=e.id,o=(0,a.useState)({headline:"Success",style:"w-42 bg-green-200 border-green-400 text-green-600 border-l-4 p-4"}),c=(0,n.Z)(o,2),i=c[0],l=c[1],x=f().removeToast;return(0,a.useEffect)((function(){switch(t){case"danger":l({headline:"Danger",style:"w-full relative bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-2"});break;case"success":l({headline:"Success",style:"w-full relative bg-green-200 border-green-600 text-green-600 border-l-4 p-2"});break;case"error":l({headline:"Error",style:"w-full relative bg-red-200 border-red-600 text-red-600 border-l-4 p-2"})}var e=setTimeout((function(){x(s)}),5e3);return function(){return clearTimeout(e)}}),[s,x,t]),(0,u.jsx)("div",{className:"w-80 mb-4 font-sans break-words",children:(0,u.jsxs)("div",{className:i.style,children:[(0,u.jsx)(d.oHP,{onClick:function(){return x(s)},className:"absolute top-0 right-0 m-2 cursor-pointer"}),(0,u.jsx)("p",{className:"text-xl font-bold pb-3",children:i.headline}),(0,u.jsx)("p",{className:"text-md",children:r})]})})},h=function(e){var t=e.toasts;return(0,l.createPortal)((0,u.jsx)("div",{className:"absolute m-4 right-0 top-0 z-40 overflow-hidden",children:t.map((function(e){return(0,u.jsx)(x,{id:e.id,type:e.type,message:e.content},e.id)}))}),document.getElementById("toast-root"))},m=1,g=a.createContext({addToast:function(e,t){return console.log("Addming toast with message: ".concat(e," and type ").concat(t))},removeToast:function(e){return console.log("Removing toast id: ".concat(e))}}),f=function(){return(0,a.useContext)(g)},p=function(e){var t=e.children,r=(0,a.useState)([]),s=(0,n.Z)(r,2),o=s[0],c=s[1],l=(0,a.useCallback)((function(e,t){c((function(r){return[].concat((0,i.Z)(r),[{id:m++,content:e,type:t}])}))}),[c]),d=(0,a.useCallback)((function(e){c((function(t){return t.filter((function(t){return t.id!==e}))}))}),[c]);return(0,u.jsxs)(g.Provider,{value:{addToast:l,removeToast:d},children:[(0,u.jsx)(h,{toasts:o}),t]})},v=r(861),b=r(757),y=r.n(b),w=function(){var e=(0,v.Z)(y().mark((function e(t,r){var n;return y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://my-ocr-friend.herokuapp.com/tesseract/read-image",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 3:return n=e.sent,e.abrupt("return",n.json());case 7:e.prev=7,e.t0=e.catch(0),r(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,r){return e.apply(this,arguments)}}(),j=function(){return(0,u.jsxs)("footer",{className:"my-12 w-full",children:[(0,u.jsx)("p",{className:"max-w-3xl text-xs font-thin mx-auto dark:text-gray-400 text-gray-500 text-center pb-2 pt-1",children:(0,u.jsx)("span",{children:"The application doesn't store user photos on the server."})}),(0,u.jsx)("p",{className:"max-w-3xl text-xs font-thin mx-auto dark:text-gray-400 text-gray-500 text-center pb-2 pt-1",children:(0,u.jsx)("span",{children:(0,u.jsxs)("a",{href:"https://github.com/JakubMaslanka",children:["\xa9 Jakub Maslanka ",new Date(Date.now()).getFullYear()]})})}),(0,u.jsx)("p",{className:"max-w-3xl text-xs font-thin mx-auto dark:text-gray-400 text-gray-500 text-center pb-2 pt-1",children:(0,u.jsxs)("span",{children:["API created by ",(0,u.jsx)("a",{href:"https://github.com/thi-days",children:"@thi-days"})]})})]})},k=r(126),N=function(e){var t=e.onclick,r=e.text;return(0,u.jsx)("div",{className:"flex items-center justify-center",children:(0,u.jsx)("button",{onClick:t,className:"uppercase py-2 my-2 px-4 md:mt-16 bg-transparent dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white text-md cursor-pointer",children:r})})},T=r(925),C=["tooltipText","children"],E=function(e){var t=e.tooltipText,r=e.children,o=(0,T.Z)(e,C),c=(0,a.useState)(!1),i=(0,n.Z)(c,2),l=i[0],d=i[1];return(0,u.jsxs)("div",(0,s.Z)((0,s.Z)({className:"relative cursor-default",onMouseEnter:function(){return d(!0)},onMouseLeave:function(){return d(!1)}},o),{},{children:[l&&(0,u.jsx)("div",{className:"absolute w-24 text-sm text-center bg-gray-600 dark:bg-gray-200 text-gray-200 dark:text-gray-900 -top-14 -left-8 p-1 border overflow-hidden border-gray-300 rounded-lg shadow-md",children:t}),r]}))},S=function(e){var t=e.progress;return(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{className:"text-center",children:(0,u.jsx)("span",{className:"text-xs font-light inline-block py-1 px-2 uppercase rounded-full text-white bg-fuchsia-400 ",children:"Converting in progress"})}),(0,u.jsx)("div",{className:"w-full h-4 bg-gray-300 rounded-full mt-3",children:(0,u.jsxs)("div",{style:{width:"".concat(t,"%")},className:"h-full text-center text-xs text-white bg-fuchsia-400 rounded-full",children:[t,"%"]})})]})},Z=r(355),I=function(){if("undefined"!==typeof window&&window.localStorage){var e=window.localStorage.getItem("color-theme");if("string"===typeof e)return e;if(window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark"}return"light"},R=a.createContext({theme:"light",setTheme:function(){return console.log("test")}}),P=function(e){var t=e.initialTheme,r=e.children,s=a.useState(I),o=(0,n.Z)(s,2),c=o[0],i=o[1],l=function(e){var t=window.document.documentElement,r="dark"===e;t.classList.remove(r?"light":"dark"),t.classList.add(e),localStorage.setItem("color-theme",e)};return t&&l(t),a.useEffect((function(){l(c)}),[c]),(0,u.jsx)(R.Provider,{value:{theme:c,setTheme:i},children:r})},F=function(){var e=(0,a.useContext)(R),t=e.theme,r=e.setTheme;return(0,u.jsx)("div",{className:"transition duration-500 ease-in-out rounded-full p-2",children:(0,u.jsxs)("div",{className:"flex cursor-pointer",onClick:function(){return r("dark"===t?"light":"dark")},children:[(0,u.jsxs)("div",{className:"relative inline-block w-10 mr-2 align-middle select-none",children:[(0,u.jsx)("input",{onChange:function(){return r("dark"===t?"light":"dark")},checked:"dark"===t,type:"checkbox",name:"toggle",id:"Blue",className:"checked:bg-fuchsia-400 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"}),(0,u.jsx)("label",{onClick:function(){return r("dark"===t?"light":"dark")},htmlFor:"Blue",className:"block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"})]}),(0,u.jsx)("span",{className:"text-gray-400 font-medium",children:(0,u.jsx)("div",{className:"text-gray-500 dark:text-gray-400 text-2xl cursor-pointer",children:"dark"===t?(0,u.jsx)(Z.Mei,{}):(0,u.jsx)(Z.TLr,{})})})]})})},M=function(){return(0,u.jsx)("header",{className:"h-24 sm:h-32 flex items-center z-30 w-full",children:(0,u.jsxs)("div",{className:"container mx-auto px-6 flex items-center justify-between",children:[(0,u.jsxs)("div",{className:"uppercase text-gray-800 dark:text-white font-black text-3xl flex items-center",children:[(0,u.jsx)(k.Q2q,{size:"32px",color:"#E879F9"}),(0,u.jsx)("span",{className:"text-xs ml-3 mt-1",children:"MY-OCR-FRIEND"})]}),(0,u.jsx)(F,{})]})})};function O(e,t){switch(t.type){case"request":return(0,s.Z)((0,s.Z)({},e),{},{isConverting:!0});case"progressIncrease":return(0,s.Z)((0,s.Z)({},e),{},{convertingProgress:t.percent});case"success":return{isConverting:!1,convertingProgress:100,ocrText:t.result};case"reset":return{isConverting:!1,convertingProgress:0,ocrText:null};default:return e}}var _=function(){var e=(0,a.useReducer)(O,{isConverting:!1,convertingProgress:0,ocrText:null}),t=(0,n.Z)(e,2),r=t[0],s=t[1],i=(0,a.useRef)(void 0),l=(0,a.useRef)(null),d=r.ocrText,x=r.isConverting,h=r.convertingProgress,m=f().addToast;return(0,a.useEffect)((function(){return x&&(i.current=window.setInterval((function(){return s({type:"progressIncrease",percent:h<100?h+1:100})}),250)),function(){return clearInterval(i.current)}}),[x,h]),(0,u.jsxs)("main",{className:"dark:bg-gray-800 font-mono bg-white relative",children:[(0,u.jsx)(M,{}),(0,u.jsx)("section",{className:"flex relative z-20 items-center",children:(0,u.jsx)("div",{className:"container mx-auto px-6 flex flex-col justify-between items-center relative py-4",children:(0,u.jsxs)("div",{className:"flex flex-col",children:[(0,u.jsxs)("h2",{className:"max-w-3xl text-2xl md:text-3xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2",children:[(0,u.jsx)("span",{className:"text-fuchsia-400",children:"MY-OCR-FRIEND"})," is a web app allowing you to convert image into text.",(0,u.jsx)("br",{}),(0,u.jsx)("span",{className:"text-fuchsia-300",children:"Try it out, just paste image!"})]}),(0,u.jsx)("p",{className:"text-lg my-8 font-medium text-center dark:text-white",children:"Your image needs to be on your's clipboard!"}),(0,u.jsx)("p",{className:"text-sm -mt-8 font-extralight text-center dark:text-white",children:"The written text should be in English."}),(0,u.jsxs)("div",{className:"my-8",children:[(0,u.jsx)("label",{className:"text-xs font-extrabold text-fuchsia-400 py-2",htmlFor:"content",children:"Paste image here:"}),(0,u.jsx)("div",{id:"content",className:"h-28 max-w-3xl mb-8 mt-0 p-4 border border-fuchsia-500 shadow-lg outline-none overflow-y-scroll",contentEditable:!0,ref:l})]}),x?(0,u.jsx)(S,{progress:h}):!d&&(0,u.jsx)(N,{onclick:function(){if(l.current.hasChildNodes()){var e=l.current.children[0];e&&e.src?(s({type:"request"}),w({imageUrl:e.src},(function(e){return m("Internal server error, message: ".concat(e),"error")})).then((function(e){m("The photo was converted correctly!","success"),s({type:"success",result:e})})).catch((function(e){return m("Something went wrong, error message: ".concat(e),"error")}))):m("Content to convert is invalid. Change it!","danger")}else m("There is no picture in the zone!","danger")},text:"CONVERT"}),(null===d||void 0===d?void 0:d.result)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"flex flex-row justify-between items-center",children:[(0,u.jsx)("label",{className:"text-md font-extrabold text-fuchsia-400 pt-2",htmlFor:"content",children:"Result:"}),(0,u.jsxs)("div",{className:"flex flex-row gap-4",children:[(0,u.jsx)(E,{tooltipText:"Copy to clipboard",children:(0,u.jsx)("div",{onClick:function(){if(d){if(!navigator.clipboard)return void m("The result was not copied to the clipboard. Error occured.","danger");navigator.clipboard.writeText(d.result).then((function(){m("The text was successfully copied to the clipboard!","success")})).catch((function(e){m("Something went wrong while copying the result!","error")}))}else m("The result text is not converted yet!","danger")},className:"bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300 transition-all duration-100 p-2 rounded-lg shadow-md cursor-pointer",children:(0,u.jsx)("span",{className:"text-gray-800 dark:text-gray-200",children:(0,u.jsx)(o.Odh,{})})})}),(0,u.jsx)(E,{tooltipText:"Translate text",children:(0,u.jsx)("div",{onClick:function(){d?window.open("https://www.deepl.com/translator#en/pl/".concat(encodeURIComponent(d.result)),"_blank"):m("The result text is not converted yet!","danger")},className:"bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300 transition-all duration-100 p-2 rounded-lg shadow-md cursor-pointer",children:(0,u.jsx)("span",{className:"text-gray-800 dark:text-gray-200",children:(0,u.jsx)(c.wd6,{})})})})]})]}),(0,u.jsx)("div",{className:"max-w-3xl my-4 p-2 border border-fuchsia-500 shadow-lg outline-none relative",children:(0,u.jsx)("span",{className:"font-medium text-lg text-black dark:text-white",children:d.result})}),(0,u.jsx)(N,{onclick:function(){null!==i.current&&clearInterval(i.current),l.current.hasChildNodes()&&Array.from(l.current.children).forEach((function(e){return e.remove()})),s({type:"reset"})},text:"START OVER"})]})]})})}),(0,u.jsx)(j,{})]})},z=function(){return(0,u.jsx)(p,{children:(0,u.jsx)(P,{initialTheme:"light",children:(0,u.jsx)(_,{})})})}}}]);
//# sourceMappingURL=915.8e431355.chunk.js.map