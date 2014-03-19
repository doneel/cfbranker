ace.define("ace/mode/html_completions",["require","exports","module","ace/token_iterator"],function(e,t){function o(e,t){var o=e.type.split(".");return t.split(".").every(function(e){return-1!==o.indexOf(e)})}function a(e,t){var a=new n(e,t.row,t.column),r=a.getCurrentToken();if(!(r&&(o(r,"tag")||o(r,"text")&&r.value.match("/"))))do r=a.stepBackward();while(r&&(o(r,"string")||o(r,"operator")||o(r,"attribute-name")||o(r,"text")));return r&&o(r,"tag-name")&&!a.stepBackward().value.match("/")?r.value:void 0}var n=e("../token_iterator").TokenIterator,r=["accesskey","class","contenteditable","contextmenu","dir","draggable","dropzone","hidden","id","lang","spellcheck","style","tabindex","title","translate"],i=["onabort","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onscroll","onseeked","onseeking","onselect","onshow","onstalled","onsubmit","onsuspend","ontimeupdate","onvolumechange","onwaiting"],l=r.concat(i),s={html:["manifest"],head:[],title:[],base:["href","target"],link:["href","hreflang","rel","media","type","sizes"],meta:["http-equiv","name","content","charset"],style:["type","media","scoped"],script:["charset","type","src","defer","async"],noscript:["href"],body:["onafterprint","onbeforeprint","onbeforeunload","onhashchange","onmessage","onoffline","onpopstate","onredo","onresize","onstorage","onundo","onunload"],section:[],nav:[],article:["pubdate"],aside:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],footer:[],address:[],main:[],p:[],hr:[],pre:[],blockquote:["cite"],ol:["start","reversed"],ul:[],li:["value"],dl:[],dt:[],dd:[],figure:[],figcaption:[],div:[],a:["href","target","ping","rel","media","hreflang","type"],em:[],strong:[],small:[],s:[],cite:[],q:["cite"],dfn:[],abbr:[],data:[],time:["datetime"],code:[],"var":[],samp:[],kbd:[],sub:[],sup:[],i:[],b:[],u:[],mark:[],ruby:[],rt:[],rp:[],bdi:[],bdo:[],span:[],br:[],wbr:[],ins:["cite","datetime"],del:["cite","datetime"],img:["alt","src","height","width","usemap","ismap"],iframe:["name","src","height","width","sandbox","seamless"],embed:["src","height","width","type"],object:["param","data","type","height","width","usemap","name","form","classid"],param:["name","value"],video:["src","autobuffer","autoplay","loop","controls","width","height","poster"],audio:["src","autobuffer","autoplay","loop","controls"],source:["src","type","media"],track:["kind","src","srclang","label","default"],canvas:["width","height"],map:["name"],area:["shape","coords","href","hreflang","alt","target","media","rel","ping","type"],svg:[],math:[],table:["summary"],caption:[],colgroup:["span"],col:["span"],tbody:[],thead:[],tfoot:[],tr:[],td:["headers","rowspan","colspan"],th:["headers","rowspan","colspan","scope"],form:["accept-charset","action","autocomplete","enctype","method","name","novalidate","target"],fieldset:["disabled","form","name"],legend:[],label:["form","for"],input:["type","accept","alt","autocomplete","checked","disabled","form","formaction","formenctype","formmethod","formnovalidate","formtarget","height","list","max","maxlength","min","multiple","pattern","placeholder","readonly","required","size","src","step","width","files","value"],button:["autofocus","disabled","form","formaction","formenctype","formmethod","formnovalidate","formtarget","name","value","type"],select:["autofocus","disabled","form","multiple","name","size"],datalist:[],optgroup:["disabled","label"],option:["disabled","selected","label","value"],textarea:["autofocus","disabled","form","maxlength","name","placeholder","readonly","required","rows","cols","wrap"],keygen:["autofocus","challenge","disabled","form","keytype","name"],output:["for","form","name"],progress:["value","max"],meter:["value","min","max","low","high","optimum"],details:["open"],summary:[],command:["type","label","icon","disabled","checked","radiogroup","command"],menu:["type","label"],dialog:["open"]},d=Object.keys(s),c=function(){};(function(){this.getCompletions=function(e,t,a,n){var r=t.getTokenAt(a.row,a.column);return r?o(r,"tag-name")||"<"==r.value&&o(r,"text")?this.getTagCompletions(e,t,a,n):o(r,"text")||o(r,"attribute-name")?this.getAttributeCompetions(e,t,a,n):[]:[]},this.getTagCompletions=function(e,t,o,a){var n=d;return a&&(n=n.filter(function(e){return 0===e.indexOf(a)})),n.map(function(e){return{value:e,meta:"tag"}})},this.getAttributeCompetions=function(e,t,o,n){var r=a(t,o);if(!r)return[];var i=l;return r in s&&(i=i.concat(s[r])),n&&(i=i.filter(function(e){return 0===e.indexOf(n)})),i.map(function(e){return{caption:e,snippet:e+'="$0"',meta:"attribute"}})}}).call(c.prototype),t.HtmlCompletions=c});