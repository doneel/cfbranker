ace.define("ace/mode/svg",["require","exports","module","ace/lib/oop","ace/mode/xml","ace/mode/javascript","ace/tokenizer","ace/mode/svg_highlight_rules","ace/mode/folding/mixed","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),o=e("./xml").Mode,r=e("./javascript").Mode,i=(e("../tokenizer").Tokenizer,e("./svg_highlight_rules").SvgHighlightRules),a=e("./folding/mixed").FoldMode,s=e("./folding/xml").FoldMode,l=e("./folding/cstyle").FoldMode,u=function(){o.call(this),this.HighlightRules=i,this.createModeDelegates({"js-":r}),this.foldingRules=new a(new s({}),{"js-":new l})};n.inherits(u,o),function(){this.getNextLineIndent=function(e,t){return this.$getIndent(t)},this.$id="ace/mode/svg"}.call(u.prototype),t.Mode=u}),ace.define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],function(e,t){var n=e("../lib/oop"),o=e("./text").Mode,r=(e("../tokenizer").Tokenizer,e("./xml_highlight_rules").XmlHighlightRules),i=e("./behaviour/xml").XmlBehaviour,a=e("./folding/xml").FoldMode,s=function(){this.HighlightRules=r,this.$behaviour=new i,this.foldingRules=new a};n.inherits(s,o),function(){this.blockComment={start:"<!--",end:"-->"},this.$id="ace/mode/xml"}.call(s.prototype),t.Mode=s}),ace.define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=(e("./xml_util"),e("./text_highlight_rules").TextHighlightRules),r=function(){this.$rules={start:[{token:"punctuation.string.begin",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:["punctuation.instruction.begin","keyword.instruction"],regex:"(<\\?)(xml)(?=[\\s])",next:"xml_declaration"},{token:["punctuation.instruction.begin","keyword.instruction"],regex:"(<\\?)([-_a-zA-Z0-9]+)",next:"instruction"},{token:"comment",regex:"<\\!--",next:"comment"},{token:["punctuation.doctype.begin","meta.tag.doctype"],regex:"(<\\!)(DOCTYPE)(?=[\\s])",next:"doctype"},{include:"tag"},{include:"reference"}],xml_declaration:[{include:"attributes"},{include:"instruction"}],instruction:[{token:"punctuation.instruction.end",regex:"\\?>",next:"start"}],doctype:[{include:"space"},{include:"string"},{token:"punctuation.doctype.end",regex:">",next:"start"},{token:"xml-pe",regex:"[-_a-zA-Z0-9:]+"},{token:"punctuation.begin",regex:"\\[",push:"declarations"}],declarations:[{token:"text",regex:"\\s+"},{token:"punctuation.end",regex:"]",next:"pop"},{token:["punctuation.begin","keyword"],regex:"(<\\!)([-_a-zA-Z0-9]+)",push:[{token:"text",regex:"\\s+"},{token:"punctuation.end",regex:">",next:"pop"},{include:"string"}]}],cdata:[{token:"string.end",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:"-->",next:"start"},{defaultToken:"comment"}],tag:[{token:["meta.tag.punctuation.begin","meta.tag.name"],regex:"(<)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",next:[{include:"attributes"},{token:"meta.tag.punctuation.end",regex:"/?>",next:"start"}]},{token:["meta.tag.punctuation.begin","meta.tag.name"],regex:"(</)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",next:[{include:"space"},{token:"meta.tag.punctuation.end",regex:">",next:"start"}]}],space:[{token:"text",regex:"\\s+"}],reference:[{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{token:"text",regex:"&"}],string:[{token:"string",regex:"'",push:"qstring_inner"},{token:"string",regex:'"',push:"qqstring_inner"}],qstring_inner:[{token:"string",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string"}],qqstring_inner:[{token:"string",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string"}],attributes:[{token:"entity.other.attribute-name",regex:"(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"},{token:"keyword.operator.separator",regex:"="},{include:"space"},{include:"string"}]},this.constructor===r&&this.normalizeRules()};(function(){this.embedTagRules=function(e,t,n){this.$rules.tag.unshift({token:["meta.tag.punctuation.begin","meta.tag.name."+n],regex:"(<)("+n+")",next:[{include:"space"},{include:"attributes"},{token:"meta.tag.punctuation.end",regex:"/?>",next:t+"start"}]}),this.$rules[n+"-end"]=[{include:"space"},{token:"meta.tag.punctuation.end",regex:">",next:"start",onMatch:function(e,t,n){return n.splice(0),this.token}}],this.embedRules(e,t,[{token:["meta.tag.punctuation.begin","meta.tag.name."+n],regex:"(</)("+n+")",next:n+"-end"},{token:"string.begin",regex:"<\\!\\[CDATA\\["},{token:"string.end",regex:"\\]\\]>"}])}}).call(o.prototype),n.inherits(r,o),t.XmlHighlightRules=r}),ace.define("ace/mode/xml_util",["require","exports","module"],function(e,t){function n(e){return[{token:"string",regex:'"',next:e+"_qqstring"},{token:"string",regex:"'",next:e+"_qstring"}]}function o(e,t){return[{token:"string",regex:e,next:t},{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{defaultToken:"string"}]}t.tag=function(e,t,r,i){e[t]=[{token:"text",regex:"\\s+"},{token:i?function(e){return i[e]?"meta.tag.tag-name."+i[e]:"meta.tag.tag-name"}:"meta.tag.tag-name",regex:"[-_a-zA-Z0-9:]+",next:t+"_embed_attribute_list"},{token:"empty",regex:"",next:t+"_embed_attribute_list"}],e[t+"_qstring"]=o("'",t+"_embed_attribute_list"),e[t+"_qqstring"]=o('"',t+"_embed_attribute_list"),e[t+"_embed_attribute_list"]=[{token:"meta.tag.r",regex:"/?>",next:r},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(n(t))}}),ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(e,t){function n(e,t){var n=e.type.split(".");return t.split(".").every(function(e){return-1!==n.indexOf(e)})}var o=e("../../lib/oop"),r=e("../behaviour").Behaviour,i=e("./cstyle").CstyleBehaviour,a=e("../../token_iterator").TokenIterator,s=function(){this.inherit(i,["string_dquotes"]),this.add("autoclosing","insertion",function(e,t,o,r,i){if(">"==i){var s=o.getCursorPosition(),l=new a(r,s.row,s.column),u=l.getCurrentToken();if(u&&n(u,"string")&&l.getCurrentTokenColumn()+u.value.length>s.column)return;var g=!1;if(u&&(n(u,"meta.tag")||n(u,"text")&&u.value.match("/")))g=!0;else do u=l.stepBackward();while(u&&(n(u,"string")||n(u,"keyword.operator")||n(u,"entity.attribute-name")||n(u,"text")));if(!u||!n(u,"meta.tag.name")||l.stepBackward().value.match("/"))return;var c=u.value;if(g)var c=c.substring(0,s.column-u.start);return{text:"></"+c+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,o,r){if("\n"==r){var i=n.getCursorPosition(),a=o.getLine(i.row),s=a.substring(i.column,i.column+2);if("</"==s){var l=this.$getIndent(a),u=l+o.getTabString();return{text:"\n"+u+"\n"+l,selection:[1,u.length,1,u.length]}}}})};o.inherits(s,r),t.XmlBehaviour=s}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),o=e("../behaviour").Behaviour,r=e("../../token_iterator").TokenIterator,i=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],s=["text","paren.rparen","punctuation.operator","comment"],l=0,u=-1,g="",c=0,d=-1,m="",h="",p=function(){p.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),o=new r(t,n.row,n.column);if(!this.$matchTokenType(o.getCurrentToken()||"text",a)){var i=new r(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",a))return!1}return o.stepForward(),o.getCurrentTokenRow()!==n.row||this.$matchTokenType(o.getCurrentToken()||"text",s)},p.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},p.recordAutoInsert=function(e,t,n){var o=e.getCursorPosition(),r=t.doc.getLine(o.row);this.isAutoInsertedClosing(o,r,g[0])||(l=0),u=o.row,g=n+r.substr(o.column),l++},p.recordMaybeInsert=function(e,t,n){var o=e.getCursorPosition(),r=t.doc.getLine(o.row);this.isMaybeInsertedClosing(o,r)||(c=0),d=o.row,m=r.substr(0,o.column)+n,h=r.substr(o.column),c++},p.isAutoInsertedClosing=function(e,t,n){return l>0&&e.row===u&&n===g[0]&&t.substr(e.column)===g},p.isMaybeInsertedClosing=function(e,t){return c>0&&e.row===d&&t.substr(e.column)===h&&t.substr(0,e.column)==m},p.popAutoInsertedClosing=function(){g=g.substr(1),l--},p.clearMaybeInsertedClosing=function(){c=0,d=-1},this.add("braces","insertion",function(e,t,n,o,r){var a=n.getCursorPosition(),s=o.doc.getLine(a.row);if("{"==r){var l=n.getSelectionRange(),u=o.doc.getTextRange(l);if(""!==u&&"{"!==u&&n.getWrapBehavioursEnabled())return{text:"{"+u+"}",selection:!1};if(p.isSaneInsertion(n,o))return/[\]\}\)]/.test(s[a.column])||n.inMultiSelectMode?(p.recordAutoInsert(n,o,"}"),{text:"{}",selection:[1,1]}):(p.recordMaybeInsert(n,o,"{"),{text:"{",selection:[1,1]})}else if("}"==r){var g=s.substring(a.column,a.column+1);if("}"==g){var d=o.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==d&&p.isAutoInsertedClosing(a,s,r))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==r||"\r\n"==r){var m="";p.isMaybeInsertedClosing(a,s)&&(m=i.stringRepeat("}",c),p.clearMaybeInsertedClosing());var g=s.substring(a.column,a.column+1);if("}"===g){var h=o.findMatchingBracket({row:a.row,column:a.column+1},"}");if(!h)return null;var f=this.$getIndent(o.getLine(h.row))}else{if(!m)return;var f=this.$getIndent(s)}var x=f+o.getTabString();return{text:"\n"+x+"\n"+f+m,selection:[1,x.length,1,x.length]}}p.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"{"==i){var a=o.doc.getLine(r.start.row),s=a.substring(r.end.column,r.end.column+1);if("}"==s)return r.end.column++,r;c--}}),this.add("parens","insertion",function(e,t,n,o,r){if("("==r){var i=n.getSelectionRange(),a=o.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(p.isSaneInsertion(n,o))return p.recordAutoInsert(n,o,")"),{text:"()",selection:[1,1]}}else if(")"==r){var s=n.getCursorPosition(),l=o.doc.getLine(s.row),u=l.substring(s.column,s.column+1);if(")"==u){var g=o.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==g&&p.isAutoInsertedClosing(s,l,r))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"("==i){var a=o.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if(")"==s)return r.end.column++,r}}),this.add("brackets","insertion",function(e,t,n,o,r){if("["==r){var i=n.getSelectionRange(),a=o.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(p.isSaneInsertion(n,o))return p.recordAutoInsert(n,o,"]"),{text:"[]",selection:[1,1]}}else if("]"==r){var s=n.getCursorPosition(),l=o.doc.getLine(s.row),u=l.substring(s.column,s.column+1);if("]"==u){var g=o.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==g&&p.isAutoInsertedClosing(s,l,r))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&"["==i){var a=o.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if("]"==s)return r.end.column++,r}}),this.add("string_dquotes","insertion",function(e,t,n,o,r){if('"'==r||"'"==r){var i=r,a=n.getSelectionRange(),s=o.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var l=n.getCursorPosition(),u=o.doc.getLine(l.row),g=u.substring(l.column-1,l.column);if("\\"==g)return null;for(var c,d=o.getTokens(a.start.row),m=0,h=-1,f=0;f<d.length&&(c=d[f],"string"==c.type?h=-1:0>h&&(h=c.value.indexOf(i)),!(c.value.length+m>a.start.column));f++)m+=d[f].value.length;if(!c||0>h&&"comment"!==c.type&&("string"!==c.type||a.start.column!==c.value.length+m-1&&c.value.lastIndexOf(i)===c.value.length-1)){if(!p.isSaneInsertion(n,o))return;return{text:i+i,selection:[1,1]}}if(c&&"string"===c.type){var x=u.substring(l.column,l.column+1);if(x==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,o,r){var i=o.doc.getTextRange(r);if(!r.isMultiLine()&&('"'==i||"'"==i)){var a=o.doc.getLine(r.start.row),s=a.substring(r.start.column+1,r.start.column+2);if(s==i)return r.end.column++,r}})};n.inherits(p,o),t.CstyleBehaviour=p}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t){var n=e("../../lib/oop"),o=e("../../lib/lang"),r=e("../../range").Range,i=e("./fold_mode").FoldMode,a=e("../../token_iterator").TokenIterator,s=t.FoldMode=function(e){i.call(this),this.voidElements=e||{}};n.inherits(s,i),function(){this.getFoldWidget=function(e,t,n){var o=this._getFirstTagInLine(e,n);return o.closing?"markbeginend"==t?"end":"":!o.tagName||this.voidElements[o.tagName.toLowerCase()]?"":o.selfClosing?"":-1!==o.value.indexOf("/"+o.tagName)?"":"start"},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),r="",i=0;i<n.length;i++){var a=n[i];r+=0===a.type.lastIndexOf("meta.tag",0)?a.value:o.stringRepeat(" ",a.value.length)}return this._parseTag(r)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=e.match(this.tagRe),n=0;return{value:e,match:t?t[2]:"",closing:t?!!t[3]:!1,selfClosing:t?!!t[5]||"/>"==t[2]:!1,tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,o="";do if(0===t.type.lastIndexOf("meta.tag",0)){if(!n)var n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};if(o+=t.value,-1!==o.indexOf(">")){var r=this._parseTag(o);return r.start=n,r.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),r}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,o="";do if(0===t.type.lastIndexOf("meta.tag",0)&&(n||(n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),o=t.value+o,-1!==o.indexOf("<"))){var r=this._parseTag(o);return r.end=n,r.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),r}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(this.voidElements[t.tagName])return;{if(!this.voidElements[n.tagName])return null;e.pop()}}},this.getFoldWidgetRange=function(e,t,n){var o=this._getFirstTagInLine(e,n);if(!o.match)return null;var i,s=o.closing||o.selfClosing,l=[];if(s){for(var u=new a(e,n,o.column+o.match.length),g={row:n,column:o.column};i=this._readTagBackward(u);)if(i.selfClosing){if(!l.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,r.fromPoints(i.start,i.end)}else if(i.closing)l.push(i);else if(this._pop(l,i),0==l.length)return i.start.column+=i.tagName.length+2,r.fromPoints(i.start,g)}else for(var u=new a(e,n,o.column),c={row:n,column:o.column+o.tagName.length+2};i=this._readTagForward(u);)if(i.selfClosing){if(!l.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,r.fromPoints(i.start,i.end)}else if(i.closing){if(this._pop(l,i),0==l.length)return r.fromPoints(c,i.start)}else l.push(i)}}.call(s.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),o=e("./text").Mode,r=(e("../tokenizer").Tokenizer,e("./javascript_highlight_rules").JavaScriptHighlightRules),i=e("./matching_brace_outdent").MatchingBraceOutdent,a=(e("../range").Range,e("../worker/worker_client").WorkerClient),s=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/cstyle").FoldMode,u=function(){this.HighlightRules=r,this.$outdent=new i,this.$behaviour=new s,this.foldingRules=new l};n.inherits(u,o),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e),i=r.tokens,a=r.state;if(i.length&&"comment"==i[i.length-1].type)return o;if("start"==e||"no_regex"==e){var s=t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);s&&(o+=n)}else if("doc-start"==e){if("start"==a||"no_regex"==a)return"";var s=t.match(/^\s*(\/?)\*/);s&&(s[1]&&(o+=" "),o+="* ")}return o},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new a(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return t.attachToDocument(e.getDocument()),t.on("jslint",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t},this.$id="ace/mode/javascript"}.call(u.prototype),t.Mode=u}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=e("./doc_comment_highlight_rules").DocCommentHighlightRules,r=e("./text_highlight_rules").TextHighlightRules,i=function(){var e=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier"),t="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",n="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b",r="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={no_regex:[{token:"comment",regex:"\\/\\/",next:"line_comment"},o.getStartRule("doc-start"),{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+n+")(\\.)(prototype)(\\.)("+n+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+n+")(\\.)("+n+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+n+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+n+")(\\.)("+n+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+n+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+n+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"(?:"+t+")\\b",next:"start"},{token:["punctuation.operator","support.function"],regex:/(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:["punctuation.operator","support.function.dom"],regex:/(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:["punctuation.operator","support.constant"],regex:/(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},{token:e,regex:n},{token:"keyword.operator",regex:/--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,next:"start"},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"keyword.operator",regex:/\/=?/,next:"start"},{token:"comment",regex:/^#!.*$/}],start:[o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/",next:"line_comment_regex_allowed"},{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:n},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],comment_regex_allowed:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],comment:[{token:"comment",regex:"\\*\\/",next:"no_regex"},{defaultToken:"comment"}],line_comment_regex_allowed:[{token:"comment",regex:"$|^",next:"start"},{defaultToken:"comment"}],line_comment:[{token:"comment",regex:"$|^",next:"no_regex"},{defaultToken:"comment"}],qqstring:[{token:"constant.language.escape",regex:r},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:r},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},this.embedRules(o,"doc-",[o.getEndRule("no_regex")])};n.inherits(i,r),t.JavaScriptHighlightRules=i}),ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};n.inherits(r,o),r.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},r.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=r}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,o=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var o=e.getLine(t),r=o.match(/^(\s*\})/);if(!r)return 0;var i=r[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(o.prototype),t.MatchingBraceOutdent=o}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),o=e("../../range").Range,r=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,r),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,o){var r=e.getLine(n),i=r.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);return s&&!s.isMultiLine()&&(o?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var i=r.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),i=t,a=n.length;t+=1;for(var s=t,l=e.getLength();++t<l;){n=e.getLine(t);var u=n.search(/\S/);if(-1!==u){if(r>u)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=i)break;if(g.isMultiLine())t=g.end.row;else if(r==u)break}s=t}}return new o(i,a,s,e.getLine(s).length)}}.call(i.prototype)}),ace.define("ace/mode/svg_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules"],function(e,t){var n=e("../lib/oop"),o=e("./javascript_highlight_rules").JavaScriptHighlightRules,r=e("./xml_highlight_rules").XmlHighlightRules,i=function(){r.call(this),this.embedTagRules(o,"js-","script"),this.normalizeRules()};n.inherits(i,r),t.SvgHighlightRules=i}),ace.define("ace/mode/folding/mixed",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),o=e("./fold_mode").FoldMode,r=t.FoldMode=function(e,t){this.defaultMode=e,this.subModes=t};n.inherits(r,o),function(){this.$getMode=function(e){"string"!=typeof e&&(e=e[0]);for(var t in this.subModes)if(0===e.indexOf(t))return this.subModes[t];return null},this.$tryMode=function(e,t,n,o){var r=this.$getMode(e);return r?r.getFoldWidget(t,n,o):""},this.getFoldWidget=function(e,t,n){return this.$tryMode(e.getState(n-1),e,t,n)||this.$tryMode(e.getState(n),e,t,n)||this.defaultMode.getFoldWidget(e,t,n)},this.getFoldWidgetRange=function(e,t,n){var o=this.$getMode(e.getState(n-1));return o&&o.getFoldWidget(e,t,n)||(o=this.$getMode(e.getState(n))),o&&o.getFoldWidget(e,t,n)||(o=this.defaultMode),o.getFoldWidgetRange(e,t,n)}}.call(r.prototype)});