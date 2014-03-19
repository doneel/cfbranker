ace.define("ace/mode/jack",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/jack_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,i=(e("../tokenizer").Tokenizer,e("./jack_highlight_rules").JackHighlightRules),o=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("./behaviour/cstyle").CstyleBehaviour,s=e("./folding/cstyle").FoldMode,u=function(){this.HighlightRules=i,this.$outdent=new o,this.$behaviour=new a,this.foldingRules=new s};n.inherits(u,r),function(){this.lineCommentStart="--",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);if("start"==e){var i=t.match(/^.*[\{\(\[]\s*$/);i&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/jack"}.call(u.prototype),t.Mode=u}),ace.define("ace/mode/jack_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"string",regex:'"',next:"string2"},{token:"string",regex:"'",next:"string1"},{token:"constant.numeric",regex:"-?0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"(?:0|[-+]?[1-9][0-9]*)\\b"},{token:"constant.binary",regex:"<[0-9A-Fa-f][0-9A-Fa-f](\\s+[0-9A-Fa-f][0-9A-Fa-f])*>"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"constant.language.null",regex:"null\\b"},{token:"storage.type",regex:"(?:Integer|Boolean|Null|String|Buffer|Tuple|List|Object|Function|Coroutine|Form)\\b"},{token:"keyword",regex:"(?:return|abort|vars|for|delete|in|is|escape|exec|split|and|if|elif|else|while)\\b"},{token:"language.builtin",regex:"(?:lines|source|parse|read-stream|interval|substr|parseint|write|print|range|rand|inspect|bind|i-values|i-pairs|i-map|i-filter|i-chunk|i-all\\?|i-any\\?|i-collect|i-zip|i-merge|i-each)\\b"},{token:"comment",regex:"--.*$"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"storage.form",regex:"@[a-z]+"},{token:"constant.other.symbol",regex:":+[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"},{token:"variable",regex:"[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"},{token:"keyword.operator",regex:"\\|\\||\\^\\^|&&|!=|==|<=|<|>=|>|\\+|-|\\*|\\/|\\^|\\%|\\#|\\!"},{token:"text",regex:"\\s+"}],string1:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\\/bfnrt])/},{token:"string",regex:"[^'\\\\]+"},{token:"string",regex:"'",next:"start"},{token:"string",regex:"",next:"start"}],string2:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\\/bfnrt])/},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:'"',next:"start"},{token:"string",regex:"",next:"start"}]}};n.inherits(i,r),t.JackHighlightRules=i}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;var o=i[1].length,a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,o-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),r=e("../behaviour").Behaviour,i=e("../../token_iterator").TokenIterator,o=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],s=["text","paren.rparen","punctuation.operator","comment"],u=0,l=-1,c="",g=0,d=-1,f="",h="",m=function(){m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new i(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var o=new i(t,n.row,n.column+1);if(!this.$matchTokenType(o.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",s)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,i,c[0])||(u=0),l=r.row,c=n+i.substr(r.column),u++},m.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),i=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,i)||(g=0),d=r.row,f=i.substr(0,r.column)+n,h=i.substr(r.column),g++},m.isAutoInsertedClosing=function(e,t,n){return u>0&&e.row===l&&n===c[0]&&t.substr(e.column)===c},m.isMaybeInsertedClosing=function(e,t){return g>0&&e.row===d&&t.substr(e.column)===h&&t.substr(0,e.column)==f},m.popAutoInsertedClosing=function(){c=c.substr(1),u--},m.clearMaybeInsertedClosing=function(){g=0,d=-1},this.add("braces","insertion",function(e,t,n,r,i){var a=n.getCursorPosition(),s=r.doc.getLine(a.row);if("{"==i){var u=n.getSelectionRange(),l=r.doc.getTextRange(u);if(""!==l&&"{"!==l&&n.getWrapBehavioursEnabled())return{text:"{"+l+"}",selection:!1};if(m.isSaneInsertion(n,r))return/[\]\}\)]/.test(s[a.column])||n.inMultiSelectMode?(m.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==i){var c=s.substring(a.column,a.column+1);if("}"==c){var d=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==d&&m.isAutoInsertedClosing(a,s,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==i||"\r\n"==i){var f="";m.isMaybeInsertedClosing(a,s)&&(f=o.stringRepeat("}",g),m.clearMaybeInsertedClosing());var c=s.substring(a.column,a.column+1);if("}"===c){var h=r.findMatchingBracket({row:a.row,column:a.column+1},"}");if(!h)return null;var p=this.$getIndent(r.getLine(h.row))}else{if(!f)return;var p=this.$getIndent(s)}var x=p+r.getTabString();return{text:"\n"+x+"\n"+p+f,selection:[1,x.length,1,x.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&"{"==o){var a=r.doc.getLine(i.start.row),s=a.substring(i.end.column,i.end.column+1);if("}"==s)return i.end.column++,i;g--}}),this.add("parens","insertion",function(e,t,n,r,i){if("("==i){var o=n.getSelectionRange(),a=r.doc.getTextRange(o);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==i){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),l=u.substring(s.column,s.column+1);if(")"==l){var c=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==c&&m.isAutoInsertedClosing(s,u,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&"("==o){var a=r.doc.getLine(i.start.row),s=a.substring(i.start.column+1,i.start.column+2);if(")"==s)return i.end.column++,i}}),this.add("brackets","insertion",function(e,t,n,r,i){if("["==i){var o=n.getSelectionRange(),a=r.doc.getTextRange(o);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==i){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),l=u.substring(s.column,s.column+1);if("]"==l){var c=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==c&&m.isAutoInsertedClosing(s,u,i))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&"["==o){var a=r.doc.getLine(i.start.row),s=a.substring(i.start.column+1,i.start.column+2);if("]"==s)return i.end.column++,i}}),this.add("string_dquotes","insertion",function(e,t,n,r,i){if('"'==i||"'"==i){var o=i,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:o+s+o,selection:!1};var u=n.getCursorPosition(),l=r.doc.getLine(u.row),c=l.substring(u.column-1,u.column);if("\\"==c)return null;for(var g,d=r.getTokens(a.start.row),f=0,h=-1,p=0;p<d.length&&(g=d[p],"string"==g.type?h=-1:0>h&&(h=g.value.indexOf(o)),!(g.value.length+f>a.start.column));p++)f+=d[p].value.length;if(!g||0>h&&"comment"!==g.type&&("string"!==g.type||a.start.column!==g.value.length+f-1&&g.value.lastIndexOf(o)===g.value.length-1)){if(!m.isSaneInsertion(n,r))return;return{text:o+o,selection:[1,1]}}if(g&&"string"===g.type){var x=l.substring(u.column,u.column+1);if(x==o)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,i){var o=r.doc.getTextRange(i);if(!i.isMultiLine()&&('"'==o||"'"==o)){var a=r.doc.getLine(i.start.row),s=a.substring(i.start.column+1,i.start.column+2);if(s==o)return i.end.column++,i}})};n.inherits(m,r),t.CstyleBehaviour=m}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),r=e("../../range").Range,i=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(o,i),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n),o=i.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,a);var s=e.getCommentFoldRange(n,a+o[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var o=i.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),i=n.search(/\S/),o=t,a=n.length;t+=1;for(var s=t,u=e.getLength();++t<u;){n=e.getLine(t);var l=n.search(/\S/);if(-1!==l){if(i>l)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=o)break;if(c.isMultiLine())t=c.end.row;else if(i==l)break}s=t}}return new r(o,a,s,e.getLine(s).length)}}.call(o.prototype)});