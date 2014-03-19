define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./xml_highlight_rules").XmlHighlightRules),i=e("./behaviour/xml").XmlBehaviour,a=e("./folding/xml").FoldMode,s=function(){this.HighlightRules=o,this.$behaviour=new i,this.foldingRules=new a};n.inherits(s,r),function(){this.blockComment={start:"<!--",end:"-->"},this.$id="ace/mode/xml"}.call(s.prototype),t.Mode=s}),define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=(e("./xml_util"),e("./text_highlight_rules").TextHighlightRules),o=function(){this.$rules={start:[{token:"punctuation.string.begin",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:["punctuation.instruction.begin","keyword.instruction"],regex:"(<\\?)(xml)(?=[\\s])",next:"xml_declaration"},{token:["punctuation.instruction.begin","keyword.instruction"],regex:"(<\\?)([-_a-zA-Z0-9]+)",next:"instruction"},{token:"comment",regex:"<\\!--",next:"comment"},{token:["punctuation.doctype.begin","meta.tag.doctype"],regex:"(<\\!)(DOCTYPE)(?=[\\s])",next:"doctype"},{include:"tag"},{include:"reference"}],xml_declaration:[{include:"attributes"},{include:"instruction"}],instruction:[{token:"punctuation.instruction.end",regex:"\\?>",next:"start"}],doctype:[{include:"space"},{include:"string"},{token:"punctuation.doctype.end",regex:">",next:"start"},{token:"xml-pe",regex:"[-_a-zA-Z0-9:]+"},{token:"punctuation.begin",regex:"\\[",push:"declarations"}],declarations:[{token:"text",regex:"\\s+"},{token:"punctuation.end",regex:"]",next:"pop"},{token:["punctuation.begin","keyword"],regex:"(<\\!)([-_a-zA-Z0-9]+)",push:[{token:"text",regex:"\\s+"},{token:"punctuation.end",regex:">",next:"pop"},{include:"string"}]}],cdata:[{token:"string.end",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:"-->",next:"start"},{defaultToken:"comment"}],tag:[{token:["meta.tag.punctuation.begin","meta.tag.name"],regex:"(<)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",next:[{include:"attributes"},{token:"meta.tag.punctuation.end",regex:"/?>",next:"start"}]},{token:["meta.tag.punctuation.begin","meta.tag.name"],regex:"(</)((?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+)",next:[{include:"space"},{token:"meta.tag.punctuation.end",regex:">",next:"start"}]}],space:[{token:"text",regex:"\\s+"}],reference:[{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{token:"text",regex:"&"}],string:[{token:"string",regex:"'",push:"qstring_inner"},{token:"string",regex:'"',push:"qqstring_inner"}],qstring_inner:[{token:"string",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string"}],qqstring_inner:[{token:"string",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string"}],attributes:[{token:"entity.other.attribute-name",regex:"(?:[-_a-zA-Z0-9]+:)?[-_a-zA-Z0-9]+"},{token:"keyword.operator.separator",regex:"="},{include:"space"},{include:"string"}]},this.constructor===o&&this.normalizeRules()};(function(){this.embedTagRules=function(e,t,n){this.$rules.tag.unshift({token:["meta.tag.punctuation.begin","meta.tag.name."+n],regex:"(<)("+n+")",next:[{include:"space"},{include:"attributes"},{token:"meta.tag.punctuation.end",regex:"/?>",next:t+"start"}]}),this.$rules[n+"-end"]=[{include:"space"},{token:"meta.tag.punctuation.end",regex:">",next:"start",onMatch:function(e,t,n){return n.splice(0),this.token}}],this.embedRules(e,t,[{token:["meta.tag.punctuation.begin","meta.tag.name."+n],regex:"(</)("+n+")",next:n+"-end"},{token:"string.begin",regex:"<\\!\\[CDATA\\["},{token:"string.end",regex:"\\]\\]>"}])}}).call(r.prototype),n.inherits(o,r),t.XmlHighlightRules=o}),define("ace/mode/xml_util",["require","exports","module"],function(e,t){function n(e){return[{token:"string",regex:'"',next:e+"_qqstring"},{token:"string",regex:"'",next:e+"_qstring"}]}function r(e,t){return[{token:"string",regex:e,next:t},{token:"constant.language.escape",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{defaultToken:"string"}]}t.tag=function(e,t,o,i){e[t]=[{token:"text",regex:"\\s+"},{token:i?function(e){return i[e]?"meta.tag.tag-name."+i[e]:"meta.tag.tag-name"}:"meta.tag.tag-name",regex:"[-_a-zA-Z0-9:]+",next:t+"_embed_attribute_list"},{token:"empty",regex:"",next:t+"_embed_attribute_list"}],e[t+"_qstring"]=r("'",t+"_embed_attribute_list"),e[t+"_qqstring"]=r('"',t+"_embed_attribute_list"),e[t+"_embed_attribute_list"]=[{token:"meta.tag.r",regex:"/?>",next:o},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(n(t))}}),define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle","ace/token_iterator"],function(e,t){function n(e,t){var n=e.type.split(".");return t.split(".").every(function(e){return-1!==n.indexOf(e)})}var r=e("../../lib/oop"),o=e("../behaviour").Behaviour,i=e("./cstyle").CstyleBehaviour,a=e("../../token_iterator").TokenIterator,s=function(){this.inherit(i,["string_dquotes"]),this.add("autoclosing","insertion",function(e,t,r,o,i){if(">"==i){var s=r.getCursorPosition(),u=new a(o,s.row,s.column),l=u.getCurrentToken();if(l&&n(l,"string")&&u.getCurrentTokenColumn()+l.value.length>s.column)return;var g=!1;if(l&&(n(l,"meta.tag")||n(l,"text")&&l.value.match("/")))g=!0;else do l=u.stepBackward();while(l&&(n(l,"string")||n(l,"keyword.operator")||n(l,"entity.attribute-name")||n(l,"text")));if(!l||!n(l,"meta.tag.name")||u.stepBackward().value.match("/"))return;var c=l.value;if(g)var c=c.substring(0,s.column-l.start);return{text:"></"+c+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,o){if("\n"==o){var i=n.getCursorPosition(),a=r.getLine(i.row),s=a.substring(i.column,i.column+2);if("</"==s){var u=this.$getIndent(a),l=u+r.getTabString();return{text:"\n"+l+"\n"+u,selection:[1,l.length,1,l.length]}}}})};r.inherits(s,o),t.XmlBehaviour=s}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),r=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,i=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],s=["text","paren.rparen","punctuation.operator","comment"],u=0,l=-1,g="",c=0,d=-1,m="",f="",x=function(){x.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new o(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var i=new o(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",s)},x.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},x.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,g[0])||(u=0),l=r.row,g=n+o.substr(r.column),u++},x.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(c=0),d=r.row,m=o.substr(0,r.column)+n,f=o.substr(r.column),c++},x.isAutoInsertedClosing=function(e,t,n){return u>0&&e.row===l&&n===g[0]&&t.substr(e.column)===g},x.isMaybeInsertedClosing=function(e,t){return c>0&&e.row===d&&t.substr(e.column)===f&&t.substr(0,e.column)==m},x.popAutoInsertedClosing=function(){g=g.substr(1),u--},x.clearMaybeInsertedClosing=function(){c=0,d=-1},this.add("braces","insertion",function(e,t,n,r,o){var a=n.getCursorPosition(),s=r.doc.getLine(a.row);if("{"==o){var u=n.getSelectionRange(),l=r.doc.getTextRange(u);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return{text:"{"+l+"}",selection:!1};if(x.isSaneInsertion(n,r))return/[\]\}\)]/.test(s[a.column])||n.inMultiSelectMode?(x.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(x.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){var g=s.substring(a.column,a.column+1);if("}"==g){var d=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==d&&x.isAutoInsertedClosing(a,s,o))return x.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){var m="";x.isMaybeInsertedClosing(a,s)&&(m=i.stringRepeat("}",c),x.clearMaybeInsertedClosing());var g=s.substring(a.column,a.column+1);if("}"===g){var f=r.findMatchingBracket({row:a.row,column:a.column+1},"}");if(!f)return null;var h=this.$getIndent(r.getLine(f.row))}else{if(!m)return;var h=this.$getIndent(s)}var p=h+r.getTabString();return{text:"\n"+p+"\n"+h+m,selection:[1,p.length,1,p.length]}}x.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.end.column,o.end.column+1);if("}"==s)return o.end.column++,o;c--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(x.isSaneInsertion(n,r))return x.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),l=u.substring(s.column,s.column+1);if(")"==l){var g=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==g&&x.isAutoInsertedClosing(s,u,o))return x.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(x.isSaneInsertion(n,r))return x.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),l=u.substring(s.column,s.column+1);if("]"==l){var g=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==g&&x.isAutoInsertedClosing(s,u,o))return x.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var u=n.getCursorPosition(),l=r.doc.getLine(u.row),g=l.substring(u.column-1,u.column);if("\\"==g)return null;for(var c,d=r.getTokens(a.start.row),m=0,f=-1,h=0;h<d.length&&(c=d[h],"string"==c.type?f=-1:0>f&&(f=c.value.indexOf(i)),!(c.value.length+m>a.start.column));h++)m+=d[h].value.length;if(!c||0>f&&"comment"!==c.type&&("string"!==c.type||a.start.column!==c.value.length+m-1&&c.value.lastIndexOf(i)===c.value.length-1)){if(!x.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(c&&"string"===c.type){var p=l.substring(u.column,u.column+1);if(p==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}})};n.inherits(x,r),t.CstyleBehaviour=x}),define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,t){var n=e("../../lib/oop"),r=e("../../lib/lang"),o=e("../../range").Range,i=e("./fold_mode").FoldMode,a=e("../../token_iterator").TokenIterator,s=t.FoldMode=function(e){i.call(this),this.voidElements=e||{}};n.inherits(s,i),function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r.closing?"markbeginend"==t?"end":"":!r.tagName||this.voidElements[r.tagName.toLowerCase()]?"":r.selfClosing?"":-1!==r.value.indexOf("/"+r.tagName)?"":"start"},this._getFirstTagInLine=function(e,t){for(var n=e.getTokens(t),o="",i=0;i<n.length;i++){var a=n[i];o+=0===a.type.lastIndexOf("meta.tag",0)?a.value:r.stringRepeat(" ",a.value.length)}return this._parseTag(o)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=e.match(this.tagRe),n=0;return{value:e,match:t?t[2]:"",closing:t?!!t[3]:!1,selfClosing:t?!!t[5]||"/>"==t[2]:!1,tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,r="";do if(0===t.type.lastIndexOf("meta.tag",0)){if(!n)var n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};if(r+=t.value,-1!==r.indexOf(">")){var o=this._parseTag(r);return o.start=n,o.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),o}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n,r="";do if(0===t.type.lastIndexOf("meta.tag",0)&&(n||(n={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),r=t.value+r,-1!==r.indexOf("<"))){var o=this._parseTag(r);return o.end=n,o.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),o}while(t=e.stepBackward());return null},this._pop=function(e,t){for(;e.length;){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(this.voidElements[t.tagName])return;{if(!this.voidElements[n.tagName])return null;e.pop()}}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r.match)return null;var i,s=r.closing||r.selfClosing,u=[];if(s){for(var l=new a(e,n,r.column+r.match.length),g={row:n,column:r.column};i=this._readTagBackward(l);)if(i.selfClosing){if(!u.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,o.fromPoints(i.start,i.end)}else if(i.closing)u.push(i);else if(this._pop(u,i),0==u.length)return i.start.column+=i.tagName.length+2,o.fromPoints(i.start,g)}else for(var l=new a(e,n,r.column),c={row:n,column:r.column+r.tagName.length+2};i=this._readTagForward(l);)if(i.selfClosing){if(!u.length)return i.start.column+=i.tagName.length+2,i.end.column-=2,o.fromPoints(i.start,i.end)}else if(i.closing){if(this._pop(u,i),0==u.length)return o.fromPoints(c,i.start)}else u.push(i)}}.call(s.prototype)});