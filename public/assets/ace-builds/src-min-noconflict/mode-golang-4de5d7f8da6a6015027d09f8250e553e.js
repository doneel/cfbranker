ace.define("ace/mode/golang",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/golang_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./golang_highlight_rules").GolangHighlightRules),i=e("./matching_brace_outdent").MatchingBraceOutdent,a=(e("./behaviour/cstyle").CstyleBehaviour,e("./folding/cstyle").FoldMode),s=function(){this.HighlightRules=o,this.$outdent=new i,this.foldingRules=new a};n.inherits(s,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){{var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens;o.state}if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var a=t.match(/^.*[\{\(\[]\s*$/);a&&(r+=n)}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/golang"}.call(s.prototype),t.Mode=s}),ace.define("ace/mode/golang_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,i=function(){var e="else|break|case|return|goto|if|const|select|continue|struct|default|switch|for|range|func|import|package|chan|defer|fallthrough|go|interface|map|range|select|type|var",t="string|uint8|uint16|uint32|uint64|int8|int16|int32|int64|float32|float64|complex64|complex128|byte|rune|uint|int|uintptr|bool|error",n="make|close|new|panic|recover",o="nil|true|false|iota",i=this.createKeywordMapper({keyword:e,"constant.language":o,"support.function":n,"support.type":t},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},r.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"[`](?:[^`]*)[`]"},{token:"string",merge:!0,regex:"[`](?:[^`]*)$",next:"bqstring"},{token:"constant.numeric",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^="},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"invalid",regex:"\\s+$"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],bqstring:[{token:"string",regex:"(?:[^`]*)`",next:"start"},{token:"string",regex:".+"}]},this.embedRules(r,"doc-",[r.getEndRule("start")])};n.inherits(i,o),t.GolangHighlightRules=i}),ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};n.inherits(o,r),o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),s)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),r=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,i=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],s=["text","paren.rparen","punctuation.operator","comment"],u=0,c=-1,l="",g=0,d=-1,h="",f="",m=function(){m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new o(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var i=new o(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",s)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,l[0])||(u=0),c=r.row,l=n+o.substr(r.column),u++},m.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(g=0),d=r.row,h=o.substr(0,r.column)+n,f=o.substr(r.column),g++},m.isAutoInsertedClosing=function(e,t,n){return u>0&&e.row===c&&n===l[0]&&t.substr(e.column)===l},m.isMaybeInsertedClosing=function(e,t){return g>0&&e.row===d&&t.substr(e.column)===f&&t.substr(0,e.column)==h},m.popAutoInsertedClosing=function(){l=l.substr(1),u--},m.clearMaybeInsertedClosing=function(){g=0,d=-1},this.add("braces","insertion",function(e,t,n,r,o){var a=n.getCursorPosition(),s=r.doc.getLine(a.row);if("{"==o){var u=n.getSelectionRange(),c=r.doc.getTextRange(u);if(""!==c&&"{"!==c&&n.getWrapBehavioursEnabled())return{text:"{"+c+"}",selection:!1};if(m.isSaneInsertion(n,r))return/[\]\}\)]/.test(s[a.column])||n.inMultiSelectMode?(m.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){var l=s.substring(a.column,a.column+1);if("}"==l){var d=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==d&&m.isAutoInsertedClosing(a,s,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){var h="";m.isMaybeInsertedClosing(a,s)&&(h=i.stringRepeat("}",g),m.clearMaybeInsertedClosing());var l=s.substring(a.column,a.column+1);if("}"===l){var f=r.findMatchingBracket({row:a.row,column:a.column+1},"}");if(!f)return null;var p=this.$getIndent(r.getLine(f.row))}else{if(!h)return;var p=this.$getIndent(s)}var x=p+r.getTabString();return{text:"\n"+x+"\n"+p+h,selection:[1,x.length,1,x.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.end.column,o.end.column+1);if("}"==s)return o.end.column++,o;g--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),c=u.substring(s.column,s.column+1);if(")"==c){var l=r.$findOpeningBracket(")",{column:s.column+1,row:s.row});if(null!==l&&m.isAutoInsertedClosing(s,u,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(")"==s)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){var s=n.getCursorPosition(),u=r.doc.getLine(s.row),c=u.substring(s.column,s.column+1);if("]"==c){var l=r.$findOpeningBracket("]",{column:s.column+1,row:s.row});if(null!==l&&m.isAutoInsertedClosing(s,u,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if("]"==s)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){var i=o,a=n.getSelectionRange(),s=r.doc.getTextRange(a);if(""!==s&&"'"!==s&&'"'!=s&&n.getWrapBehavioursEnabled())return{text:i+s+i,selection:!1};var u=n.getCursorPosition(),c=r.doc.getLine(u.row),l=c.substring(u.column-1,u.column);if("\\"==l)return null;for(var g,d=r.getTokens(a.start.row),h=0,f=-1,p=0;p<d.length&&(g=d[p],"string"==g.type?f=-1:0>f&&(f=g.value.indexOf(i)),!(g.value.length+h>a.start.column));p++)h+=d[p].value.length;if(!g||0>f&&"comment"!==g.type&&("string"!==g.type||a.start.column!==g.value.length+h-1&&g.value.lastIndexOf(i)===g.value.length-1)){if(!m.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(g&&"string"===g.type){var x=c.substring(u.column,u.column+1);if(x==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){var a=r.doc.getLine(o.start.row),s=a.substring(o.start.column+1,o.start.column+2);if(s==i)return o.end.column++,o}})};n.inherits(m,r),t.CstyleBehaviour=m}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n),i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),i=t,a=n.length;t+=1;for(var s=t,u=e.getLength();++t<u;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(o>c)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=i)break;if(l.isMultiLine())t=l.end.row;else if(o==c)break}s=t}}return new r(i,a,s,e.getLine(s).length)}}.call(i.prototype)});