__ace_shadowed__.define("ace/ext/language_tools",["require","exports","module","ace/snippets","ace/autocomplete","ace/config","ace/autocomplete/text_completer","ace/editor"],function(e,t){var n=e("../snippets").snippetManager,i=e("../autocomplete").Autocomplete,r=e("../config"),o=e("../autocomplete/text_completer"),s={getCompletions:function(e,t,n,i,r){var o=e.session.getState(n.row),s=t.$mode.getCompletions(o,t,n,i);r(null,s)}},a={getCompletions:function(e,t,i,r,o){var s=n.snippetMap,a=[];n.getActiveScopes(e).forEach(function(e){for(var t=s[e]||[],n=t.length;n--;){var i=t[n],r=i.name||i.tabTrigger;r&&a.push({caption:r,snippet:i.content,meta:i.tabTrigger&&!i.name?i.tabTrigger+"⇥ ":"snippet"})}},this),o(null,a)}},c=[a,o,s];t.addCompleter=function(e){c.push(e)};var h={name:"expandSnippet",exec:function(e){var t=n.expandWithTab(e);t||e.execCommand("indent")},bindKey:"tab"},l=function(e,t){p(t.session.$mode)},p=function(e){var t=e.$id;n.files||(n.files={}),u(t),e.modes&&e.modes.forEach(p)},u=function(e){if(e&&!n.files[e]){var t=e.replace("mode","snippets");n.files[e]={},r.loadModule(t,function(t){t&&(n.files[e]=t,t.snippets=n.parseSnippetFile(t.snippetText),n.register(t.snippets,t.scope),t.includeScopes&&(n.snippetMap[t.scope].includeScopes=t.includeScopes,t.includeScopes.forEach(function(e){u("ace/mode/"+e)})))})}},d=e("../editor").Editor;e("../config").defineOptions(d.prototype,"editor",{enableBasicAutocompletion:{set:function(e){e?(this.completers=c,this.commands.addCommand(i.startCommand)):this.commands.removeCommand(i.startCommand)},value:!1},enableSnippets:{set:function(e){e?(this.commands.addCommand(h),this.on("changeMode",l),l(null,this)):(this.commands.removeCommand(h),this.off("changeMode",l))},value:!1}})}),__ace_shadowed__.define("ace/snippets",["require","exports","module","ace/lib/lang","ace/range","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom"],function(e,t){var n=e("./lib/lang"),i=e("./range").Range,r=e("./keyboard/hash_handler").HashHandler,o=e("./tokenizer").Tokenizer,s=i.comparePoints,a=function(){this.snippetMap={},this.snippetNameMap={}};(function(){this.getTokenizer=function(){function e(e,t,n){return e=e.substr(1),/^\d+$/.test(e)&&!n.inFormatString?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}return a.$tokenizer=new o({start:[{regex:/:/,onMatch:function(e,t,n){return n.length&&n[0].expectIf?(n[0].expectIf=!1,n[0].elseBranch=n[0],[n[0]]):":"}},{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return"}"==i&&n.length?e=i:-1!="`$\\".indexOf(i)?e=i:n.inFormatString&&("n"==i?e="\n":"t"==i?e="\n":-1!="ulULE".indexOf(i)&&(e={changeCase:i,local:i>"a"})),[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,n,i){var r=e(t.substr(1),n,i);return i.unshift(r[0]),r},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,n){n[0].choices=e.slice(1,-1).split(",")},next:"start"},{regex:"/("+t("/")+"+)/(?:("+t("/")+"*)/)(\\w*):?",onMatch:function(e,t,n){var i=n[0];return i.fmtString=e,e=this.splitRegex.exec(e),i.guard=e[1],i.fmt=e[2],i.flag=e[3],""},next:"start"},{regex:"`"+t("`")+"*`",onMatch:function(e,t,n){return n[0].code=e.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(e,t,n){n[0]&&(n[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+t("/")+"+)/",token:"regex"},{regex:"",onMatch:function(e,t,n){n.inFormatString=!0},next:"start"}]}),a.prototype.getTokenizer=function(){return a.$tokenizer},a.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.$getDefaultValue=function(e,t){if(/^[A-Z]\d+$/.test(t)){var n=t.substr(1);return(this.variables[t[0]+"__"]||{})[n]}if(/^\d+$/.test(t))return(this.variables.__||{})[t];if(t=t.replace(/^TM_/,""),e){var i=e.session;switch(t){case"CURRENT_WORD":var r=i.getWordRange();case"SELECTION":case"SELECTED_TEXT":return i.getTextRange(r);case"CURRENT_LINE":return i.getLine(e.getCursorPosition().row);case"PREV_LINE":return i.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return i.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return i.getTabSize();case"FILENAME":case"FILEPATH":return"ace.ajax.org";case"FULLNAME":return"Ace"}}},this.variables={},this.getVariableValue=function(e,t){return this.variables.hasOwnProperty(t)?this.variables[t](e,t)||"":this.$getDefaultValue(e,t)||""},this.tmStrFormat=function(e,t,n){var i=t.flag||"",r=t.guard;r=new RegExp(r,i.replace(/[^gi]/,""));var o=this.tokenizeTmSnippet(t.fmt,"formatString"),s=this,a=e.replace(r,function(){s.variables.__=arguments;for(var e=s.resolveVariables(o,n),t="E",i=0;i<e.length;i++){var r=e[i];if("object"==typeof r)if(e[i]="",r.changeCase&&r.local){var a=e[i+1];a&&"string"==typeof a&&(e[i]="u"==r.changeCase?a[0].toUpperCase():a[0].toLowerCase(),e[i+1]=a.substr(1))}else r.changeCase&&(t=r.changeCase);else"U"==t?e[i]=r.toUpperCase():"L"==t&&(e[i]=r.toLowerCase())}return e.join("")});return this.variables.__=null,a},this.resolveVariables=function(e,t){function n(t){var n=e.indexOf(t,r+1);-1!=n&&(r=n)}for(var i=[],r=0;r<e.length;r++){var o=e[r];if("string"==typeof o)i.push(o);else{if("object"!=typeof o)continue;if(o.skip)n(o);else{if(o.processed<r)continue;if(o.text){var s=this.getVariableValue(t,o.text);s&&o.fmtString&&(s=this.tmStrFormat(s,o)),o.processed=r,null==o.expectIf?s&&(i.push(s),n(o)):s?o.skip=o.elseBranch:n(o)}else null!=o.tabstopId?i.push(o):null!=o.changeCase&&i.push(o)}}}return i},this.insertSnippet=function(e,t){function n(e){for(var t=[],n=0;n<e.length;n++){var i=e[n];if("object"==typeof i){if(l[i.tabstopId])continue;var r=e.lastIndexOf(i,n-1);i=t[r]||{tabstopId:i.tabstopId}}t[n]=i}return t}var i=e.getCursorPosition(),r=e.session.getLine(i.row),o=r.match(/^\s*/)[0],s=e.session.getTabString(),a=this.tokenizeTmSnippet(t);a=this.resolveVariables(a,e),a=a.map(function(e){return"\n"==e?e+o:"string"==typeof e?e.replace(/\t/g,s):e});var h=[];a.forEach(function(e,t){if("object"==typeof e){var n=e.tabstopId,i=h[n];if(i||(i=h[n]=[],i.index=n,i.value=""),-1===i.indexOf(e)){i.push(e);var r=a.indexOf(e,t+1);if(-1!==r){var o=a.slice(t+1,r),s=o.some(function(e){return"object"==typeof e});s&&!i.value?i.value=o:!o.length||i.value&&"string"==typeof i.value||(i.value=o.join(""))}}}}),h.forEach(function(e){e.length=0});for(var l={},p=0;p<a.length;p++){var u=a[p];if("object"==typeof u){var d=u.tabstopId,g=a.indexOf(u,p+1);if(l[d]!=u){var f=h[d],m="string"==typeof f.value?[f.value]:n(f.value);m.unshift(p+1,Math.max(0,g-p)),m.push(u),l[d]=u,a.splice.apply(a,m),-1===f.indexOf(u)&&f.push(u)}else l[d]=null}}var v=0,b=0,x="";a.forEach(function(e){"string"==typeof e?("\n"===e[0]?(b=e.length-1,v++):b+=e.length,x+=e):e.start?e.end={row:v,column:b}:e.start={row:v,column:b}});var w=e.getSelectionRange(),S=e.session.replace(w,x),y=new c(e);y.addTabstops(h,w.start,S),y.tabNext()},this.$getScope=function(e){var t=e.session.$mode.$id||"";if(t=t.split("/").pop(),"html"===t||"php"===t){"php"===t&&(t="html");var n=e.getCursorPosition(),i=e.session.getState(n.row);"object"==typeof i&&(i=i[0]),i.substring&&("js-"==i.substring(0,3)?t="javascript":"css-"==i.substring(0,4)?t="css":"php-"==i.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),n=[t],i=this.snippetMap;return i[t]&&i[t].includeScopes&&n.push.apply(n,i[t].includeScopes),n.push("_"),n},this.expandWithTab=function(e){var t,n=e.getCursorPosition(),i=e.session.getLine(n.row),r=i.substring(0,n.column),o=i.substr(n.column),s=this.snippetMap;return this.getActiveScopes(e).some(function(e){var n=s[e];return n&&(t=this.findMatchingSnippet(n,r,o)),!!t},this),t?(e.session.doc.removeInLine(n.row,n.column-t.replaceBefore.length,n.column+t.replaceAfter.length),this.variables.M__=t.matchBefore,this.variables.T__=t.matchAfter,this.insertSnippet(e,t.content),this.variables.M__=this.variables.T__=null,!0):!1},this.findMatchingSnippet=function(e,t,n){for(var i=e.length;i--;){var r=e[i];if(!(r.startRe&&!r.startRe.test(t)||r.endRe&&!r.endRe.test(n)||!r.startRe&&!r.endRe))return r.matchBefore=r.startRe?r.startRe.exec(t):[""],r.matchAfter=r.endRe?r.endRe.exec(n):[""],r.replaceBefore=r.triggerRe?r.triggerRe.exec(t)[0]:"",r.replaceAfter=r.endTriggerRe?r.endTriggerRe.exec(n)[0]:"",r}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,t){function i(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function r(e,t,n){return e=i(e),t=i(t),n?(e=t+e,e&&"$"!=e[e.length-1]&&(e+="$")):(e+=t,e&&"^"!=e[0]&&(e="^"+e)),new RegExp(e)}function o(e){e.scope||(e.scope=t||"_"),t=e.scope,s[t]||(s[t]=[],a[t]={});var i=a[t];if(e.name){var o=i[e.name];o&&c.unregister(o),i[e.name]=e}s[t].push(e),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=n.escapeRegExp(e.tabTrigger)),e.startRe=r(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger,"",!0),e.endRe=r(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger,"",!0)}var s=this.snippetMap,a=this.snippetNameMap,c=this;e.content?o(e):Array.isArray(e)&&e.forEach(o)},this.unregister=function(e,t){function n(e){var n=r[e.scope||t];if(n&&n[e.name]){delete n[e.name];var o=i[e.scope||t],s=o&&o.indexOf(e);s>=0&&o.splice(s,1)}}var i=this.snippetMap,r=this.snippetNameMap;e.content?n(e):Array.isArray(e)&&e.forEach(n)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,n=[],i={},r=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=r.exec(e);){if(t[1])try{i=JSON.parse(t[1]),n.push(i)}catch(o){}if(t[4])i.content=t[4].replace(/^\t/gm,""),n.push(i),i={};else{var s=t[2],a=t[3];if("regex"==s){var c=/\/((?:[^\/\\]|\\.)*)|$/g;i.guard=c.exec(a)[1],i.trigger=c.exec(a)[1],i.endTrigger=c.exec(a)[1],i.endGuard=c.exec(a)[1]}else"snippet"==s?(i.tabTrigger=a.match(/^\S*/)[0],i.name||(i.name=a)):i[s]=a}}return n},this.getSnippetByName=function(e,t){var n,i=this.snippetNameMap;return this.getActiveScopes(t).some(function(t){var r=i[t];return r&&(n=r[e]),!!n},this),n}}).call(a.prototype);var c=function(e){return e.tabstopManager?e.tabstopManager:(e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=n.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e),void 0)};(function(){this.attach=function(e){this.index=-1,this.ranges=[],this.tabstops=[],this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){var t=e.data.range,n="r"==e.data.action[0],i=t.start,r=t.end,o=i.row,a=r.row,c=a-o,h=r.column-i.column;if(n&&(c=-c,h=-h),!this.$inChange&&n){var l=this.selectedTabstop,p=!l.some(function(e){return s(e.start,i)<=0&&s(e.end,r)>=0});if(p)return this.detach()}for(var u=this.ranges,d=0;d<u.length;d++){var g=u[d];g.end.row<i.row||(s(i,g.start)<0&&s(r,g.end)>0?(this.removeRange(g),d--):(g.start.row==o&&g.start.column>i.column&&(g.start.column+=h),g.end.row==o&&g.end.column>=i.column&&(g.end.column+=h),g.start.row>=o&&(g.start.row+=c),g.end.row>=o&&(g.end.row+=c),s(g.start,g.end)>0&&this.removeRange(g)))}u.length||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e.hasLinkedRanges){this.$inChange=!0;for(var n=this.editor.session,i=n.getTextRange(e.firstNonLinked),r=e.length;r--;){var o=e[r];if(o.linked){var s=t.snippetManager.tmStrFormat(i,o.original);n.replace(o,s)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,n=this.editor.selection.isEmpty(),i=this.ranges.length;i--;)if(!this.ranges[i].linked){var r=this.ranges[i].contains(e.row,e.column),o=n||this.ranges[i].contains(t.row,t.column);if(r&&o)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length-1,n=this.index+(e||1);n=Math.min(Math.max(n,0),t),this.selectTabstop(n),n==t&&this.detach()},this.selectTabstop=function(e){var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,t=this.tabstops[this.index],t&&t.length){if(this.selectedTabstop=t,this.editor.inVirtualSelectionMode)this.editor.selection.setRange(t.firstNonLinked);else{var n=this.editor.multiSelect;n.toSingleRange(t.firstNonLinked.clone());for(var i=t.length;i--;)t.hasLinkedRanges&&t[i].linked||n.addRange(t[i].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}},this.addTabstops=function(e,t,n){if(!e[0]){var r=i.fromPoints(n,n);l(r.start,t),l(r.end,t),e[0]=[r],e[0].index=0}{var o=this.index,s=[o,0],a=this.ranges;this.editor}e.forEach(function(e){for(var n=e.length;n--;){var r=e[n],o=i.fromPoints(r.start,r.end||r.start);h(o.start,t),h(o.end,t),o.original=r,o.tabstop=e,a.push(o),e[n]=o,r.fmtString?(o.linked=!0,e.hasLinkedRanges=!0):e.firstNonLinked||(e.firstNonLinked=o)}e.firstNonLinked||(e.hasLinkedRanges=!1),s.push(e),this.addTabstopMarkers(e)},this),s.push(s.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,s)},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);e.tabstop.splice(t,1),t=this.ranges.indexOf(e),this.ranges.splice(t,1),this.editor.session.removeMarker(e.markerId)},this.keyboardHandler=new r,this.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||e.tabstopManager.tabNext(1)},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1)},Esc:function(e){e.tabstopManager.detach()},Return:function(){return!1}})}).call(c.prototype);var h=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},l=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),t.snippetManager=new a}),__ace_shadowed__.define("ace/autocomplete",["require","exports","module","ace/keyboard/hash_handler","ace/autocomplete/popup","ace/autocomplete/util","ace/lib/event","ace/lib/lang","ace/snippets"],function(e,t){var n=e("./keyboard/hash_handler").HashHandler,i=e("./autocomplete/popup").AcePopup,r=e("./autocomplete/util"),o=e("./lib/event"),s=e("./lib/lang"),a=e("./snippets").snippetManager,c=function(){this.autoInsert=!0,this.keyboardHandler=new n,this.keyboardHandler.bindKeys(this.commands),this.blurListener=this.blurListener.bind(this),this.changeListener=this.changeListener.bind(this),this.mousedownListener=this.mousedownListener.bind(this),this.mousewheelListener=this.mousewheelListener.bind(this),this.changeTimer=s.delayedCall(function(){this.updateCompletions(!0)}.bind(this))};(function(){this.$init=function(){this.popup=new i(document.body||document.documentElement),this.popup.on("click",function(e){this.insertMatch(),e.stop()}.bind(this))},this.openPopup=function(e,t,n){this.popup||this.$init(),this.popup.setData(this.completions.filtered);var i=e.renderer;if(!n){this.popup.setRow(0),this.popup.setFontSize(e.getFontSize());var r=i.layerConfig.lineHeight,o=i.$cursorLayer.getPixelPosition(this.base,!0);o.left-=this.popup.getTextLeftOffset();var s=e.container.getBoundingClientRect();o.top+=s.top-i.layerConfig.offset,o.left+=s.left-e.renderer.scrollLeft,o.left+=i.$gutterLayer.gutterWidth,this.popup.show(o,r)}},this.detach=function(){this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.off("changeSelection",this.changeListener),this.editor.off("blur",this.changeListener),this.editor.off("mousedown",this.mousedownListener),this.editor.off("mousewheel",this.mousewheelListener),this.changeTimer.cancel(),this.popup&&this.popup.hide(),this.activated=!1,this.completions=this.base=null},this.changeListener=function(){var e=this.editor.selection.lead;(e.row!=this.base.row||e.column<this.base.column)&&this.detach(),this.activated?this.changeTimer.schedule():this.detach()},this.blurListener=function(){document.activeElement!=this.editor.textInput.getElement()&&this.detach()},this.mousedownListener=function(){this.detach()},this.mousewheelListener=function(){this.detach()},this.goTo=function(e){var t=this.popup.getRow(),n=this.popup.session.getLength()-1;switch(e){case"up":t=0>t?n:t-1;break;case"down":t=t>=n?-1:t+1;break;case"start":t=0;break;case"end":t=n}this.popup.setRow(t)},this.insertMatch=function(e){if(e||(e=this.popup.getData(this.popup.getRow())),!e)return!1;if(e.completer&&e.completer.insertMatch)e.completer.insertMatch(this.editor);else{if(this.completions.filterText)for(var t,n=this.editor.selection.getAllRanges(),i=0;t=n[i];i++)t.start.column-=this.completions.filterText.length,this.editor.session.remove(t);e.snippet?a.insertSnippet(this.editor,e.snippet):this.editor.execCommand("insertstring",e.value||e)}this.detach()},this.commands={Up:function(e){e.completer.goTo("up")},Down:function(e){e.completer.goTo("down")},"Ctrl-Up|Ctrl-Home":function(e){e.completer.goTo("start")},"Ctrl-Down|Ctrl-End":function(e){e.completer.goTo("end")},Esc:function(e){e.completer.detach()},Space:function(e){e.completer.detach(),e.insert(" ")},Return:function(e){e.completer.insertMatch()},"Shift-Return":function(e){e.completer.insertMatch(!0)},Tab:function(e){e.completer.insertMatch()},PageUp:function(e){e.completer.popup.gotoPageUp()},PageDown:function(e){e.completer.popup.gotoPageDown()}},this.gatherCompletions=function(e,t){var n=e.getSession(),i=e.getCursorPosition(),o=n.getLine(i.row),s=r.retrievePrecedingIdentifier(o,i.column);this.base=e.getCursorPosition(),this.base.column-=s.length;var a=[];return r.parForEach(e.completers,function(t,r){t.getCompletions(e,n,i,s,function(e,t){e||(a=a.concat(t)),r()})},function(){t(null,{prefix:s,matches:a})}),!0},this.showPopup=function(e){this.editor&&this.detach(),this.activated=!0,this.editor=e,e.completer!=this&&(e.completer&&e.completer.detach(),e.completer=this),e.keyBinding.addKeyboardHandler(this.keyboardHandler),e.on("changeSelection",this.changeListener),e.on("blur",this.blurListener),e.on("mousedown",this.mousedownListener),e.on("mousewheel",this.mousewheelListener),this.updateCompletions()},this.updateCompletions=function(e){if(e&&this.base&&this.completions){var t=this.editor.getCursorPosition(),n=this.editor.session.getTextRange({start:this.base,end:t});if(n==this.completions.filterText)return;return this.completions.setFilter(n),this.completions.filtered.length?(this.openPopup(this.editor,n,e),void 0):this.detach()}this.gatherCompletions(this.editor,function(t,n){var i=n&&n.matches;if(!i||!i.length)return this.detach();this.completions=new h(i),this.completions.setFilter(n.prefix);var r=this.completions.filtered;return r.length?this.autoInsert&&1==r.length?this.insertMatch(r[0]):(this.openPopup(this.editor,n.prefix,e),void 0):this.detach()}.bind(this))},this.cancelContextMenu=function(){var e=function(t){this.editor.off("nativecontextmenu",e),t&&t.domEvent&&o.stopEvent(t.domEvent)}.bind(this);setTimeout(e,10),this.editor.on("nativecontextmenu",e)}}).call(c.prototype),c.startCommand={name:"startAutocomplete",exec:function(e){e.completer||(e.completer=new c),e.completer.showPopup(e),e.completer.cancelContextMenu()},bindKey:"Ctrl-Space|Ctrl-Shift-Space|Alt-Space"};var h=function(e,t){this.all=e,this.filtered=e,this.filterText=t||""};(function(){this.setFilter=function(e){if(e.length>this.filterText&&0===e.lastIndexOf(this.filterText,0))var t=this.filtered;else var t=this.all;this.filterText=e,t=this.filterCompletions(t,this.filterText),t=t.sort(function(e,t){return t.exactMatch-e.exactMatch||t.score-e.score});var n=null;t=t.filter(function(e){var t=e.value||e.caption||e.snippet;return t===n?!1:(n=t,!0)}),this.filtered=t},this.filterCompletions=function(e,t){var n=[],i=t.toUpperCase(),r=t.toLowerCase();e:for(var o,s=0;o=e[s];s++){var a=o.value||o.caption||o.snippet;if(a){for(var c,h,l=-1,p=0,u=0,d=0;d<t.length;d++){var g=a.indexOf(r[d],l+1),f=a.indexOf(i[d],l+1);if(c=g>=0?0>f||f>g?g:f:f,0>c)continue e;h=c-l-1,h>0&&(-1===l&&(u+=10),u+=h),p|=1<<c,l=c}o.matchMask=p,o.exactMatch=u?0:1,o.score=(o.score||0)-u,n.push(o)}}return n}}).call(h.prototype),t.Autocomplete=c,t.FilteredList=h}),__ace_shadowed__.define("ace/autocomplete/popup",["require","exports","module","ace/edit_session","ace/virtual_renderer","ace/editor","ace/range","ace/lib/event","ace/lib/lang","ace/lib/dom"],function(e,t){var n=(e("../edit_session").EditSession,e("../virtual_renderer").VirtualRenderer),i=e("../editor").Editor,r=e("../range").Range,o=e("../lib/event"),s=e("../lib/lang"),a=e("../lib/dom"),c=function(e){var t=new n(e);t.$maxLines=4;var r=new i(t);return r.setHighlightActiveLine(!1),r.setShowPrintMargin(!1),r.renderer.setShowGutter(!1),r.renderer.setHighlightGutterLine(!1),r.$mouseHandler.$focusWaitTimout=0,r},h=function(e){var t=a.createElement("div"),n=new c(t);e&&e.appendChild(t),t.style.display="none",n.renderer.content.style.cursor="default",n.renderer.setStyle("ace_autocomplete"),n.setOption("displayIndentGuides",!1);var i=function(){};n.focus=i,n.$isFocused=!0,n.renderer.$cursorLayer.restartTimer=i,n.renderer.$cursorLayer.element.style.opacity=0,n.renderer.$maxLines=8,n.renderer.$keepTextAreaAtCursor=!1,n.setHighlightActiveLine(!1),n.session.highlight(""),n.session.$searchHighlight.clazz="ace_highlight-marker",n.on("mousedown",function(e){var t=e.getDocumentPosition();n.moveCursorToPosition(t),n.selection.clearSelection(),p.start.row=p.end.row=t.row,e.stop()});var h,l=new r(-1,0,-1,1/0),p=new r(-1,0,-1,1/0);p.id=n.session.addMarker(p,"ace_active-line","fullLine"),n.setSelectOnHover=function(e){e?l.id&&(n.session.removeMarker(l.id),l.id=null):l.id=n.session.addMarker(l,"ace_line-hover","fullLine")},n.setSelectOnHover(!1),n.on("mousemove",function(e){if(!h)return h=e,void 0;if(h.x!=e.x||h.y!=e.y){h=e,h.scrollTop=n.renderer.scrollTop;var t=h.getDocumentPosition().row;l.start.row!=t&&(l.id||n.setRow(t),d(t))}}),n.renderer.on("beforeRender",function(){if(h&&-1!=l.start.row){h.$pos=null;var e=h.getDocumentPosition().row;l.id||n.setRow(e),d(e,!0)}}),n.renderer.on("afterRender",function(){var e=n.getRow(),t=n.renderer.$textLayer,i=t.element.childNodes[e-t.config.firstRow];i!=t.selectedNode&&(t.selectedNode&&a.removeCssClass(t.selectedNode,"ace_selected"),t.selectedNode=i,i&&a.addCssClass(i,"ace_selected"))});var u=function(){d(-1)},d=function(e,t){e!==l.start.row&&(l.start.row=l.end.row=e,t||n.session._emit("changeBackMarker"),n._emit("changeHoverMarker"))};n.getHoveredRow=function(){return l.start.row},o.addListener(n.container,"mouseout",u),n.on("hide",u),n.on("changeSelection",u),n.session.doc.getLength=function(){return n.data.length},n.session.doc.getLine=function(e){var t=n.data[e];return"string"==typeof t?t:t&&t.value||""};var g=n.session.bgTokenizer;return g.$tokenizeRow=function(e){var t=n.data[e],i=[];if(!t)return i;"string"==typeof t&&(t={value:t}),t.caption||(t.caption=t.value);for(var r,o,s=-1,e=0;e<t.caption.length;e++)o=t.caption[e],r=t.matchMask&1<<e?1:0,s!==r?(i.push({type:t.className||""+(r?"completion-highlight":""),value:o}),s=r):i[i.length-1].value+=o;if(t.meta){var a=n.renderer.$size.scrollerWidth/n.renderer.layerConfig.characterWidth;t.meta.length+t.caption.length<a-2&&i.push({type:"rightAlignedText",value:t.meta})}return i},g.$updateOnChange=i,g.start=i,n.session.$computeWidth=function(){return this.screenWidth=0},n.isOpen=!1,n.isTopdown=!1,n.data=[],n.setData=function(e){n.data=e||[],n.setValue(s.stringRepeat("\n",e.length),-1),n.setRow(0)},n.getData=function(e){return n.data[e]},n.getRow=function(){return p.start.row},n.setRow=function(e){e=Math.max(-1,Math.min(this.data.length,e)),p.start.row!=e&&(n.selection.clearSelection(),p.start.row=p.end.row=e||0,n.session._emit("changeBackMarker"),n.moveCursorTo(e||0,0),n.isOpen&&n._signal("select"))},n.on("changeSelection",function(){n.isOpen&&n.setRow(n.selection.lead.row)}),n.hide=function(){this.container.style.display="none",this._signal("hide"),n.isOpen=!1},n.show=function(e,t,i){var r=this.container,o=window.innerHeight,s=window.innerWidth,a=this.renderer,c=a.$maxLines*t*1.4,l=e.top+this.$borderSize;l+c>o-t&&!i?(r.style.top="",r.style.bottom=o-l+"px",n.isTopdown=!1):(l+=t,r.style.top=l+"px",r.style.bottom="",n.isTopdown=!0),r.style.display="",this.renderer.$textLayer.checkForSizeChanges();var p=e.left;p+r.offsetWidth>s&&(p=s-r.offsetWidth),r.style.left=p+"px",this._signal("show"),h=null,n.isOpen=!0},n.getTextLeftOffset=function(){return this.$borderSize+this.renderer.$padding+this.$imageSize},n.$imageSize=0,n.$borderSize=1,n};a.importCssString(".ace_autocomplete.ace-tm .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_autocomplete.ace-tm .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);}.ace_autocomplete .ace_line-hover {    position: absolute;    z-index: 2;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_autocomplete .ace_completion-highlight{    color: #000;    text-shadow: 0 0 0.01em;}.ace_autocomplete {    width: 280px;    z-index: 200000;    background: #fbfbfb;    color: #444;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;}"),t.AcePopup=h}),__ace_shadowed__.define("ace/autocomplete/util",["require","exports","module"],function(e,t){t.parForEach=function(e,t,n){var i=0,r=e.length;0===r&&n();for(var o=0;r>o;o++)t(e[o],function(e,t){i++,i===r&&n(e,t)})};var n=/[a-zA-Z_0-9\$-]/;t.retrievePrecedingIdentifier=function(e,t,i){i=i||n;for(var r=[],o=t-1;o>=0&&i.test(e[o]);o--)r.push(e[o]);return r.reverse().join("")},t.retrieveFollowingIdentifier=function(e,t,i){i=i||n;for(var r=[],o=t;o<e.length&&i.test(e[o]);o++)r.push(e[o]);return r}}),__ace_shadowed__.define("ace/autocomplete/text_completer",["require","exports","module","ace/range"],function(e,t){function n(e,t){var n=e.getTextRange(r.fromPoints({row:0,column:0},t));return n.split(o).length-1}function i(e,t){var i=n(e,t),r=e.getValue().split(o),s=Object.create(null),a=r[i];return r.forEach(function(e,t){if(e&&e!==a){var n=Math.abs(i-t),o=r.length-n;s[e]=s[e]?Math.max(o,s[e]):o}}),s}var r=e("ace/range").Range,o=/[^a-zA-Z_0-9\$\-]+/;t.getCompletions=function(e,t,n,r,o){var s=i(t,n,r),a=Object.keys(s);o(null,a.map(function(e){return{name:e,value:e,score:s[e],meta:"local"}}))}});