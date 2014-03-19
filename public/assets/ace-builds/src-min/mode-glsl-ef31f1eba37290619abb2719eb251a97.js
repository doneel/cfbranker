define("ace/mode/glsl",["require","exports","module","ace/lib/oop","ace/mode/c_cpp","ace/tokenizer","ace/mode/glsl_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),r=e("./c_cpp").Mode,o=(e("../tokenizer").Tokenizer,e("./glsl_highlight_rules").glslHighlightRules),i=e("./matching_brace_outdent").MatchingBraceOutdent,a=(e("../range").Range,e("./behaviour/cstyle").CstyleBehaviour),l=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=o,this.$outdent=new i,this.$behaviour=new a,this.foldingRules=new l};n.inherits(s,r),t.Mode=s}),define("ace/mode/c_cpp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/c_cpp_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./c_cpp_highlight_rules").c_cppHighlightRules),i=e("./matching_brace_outdent").MatchingBraceOutdent,a=(e("../range").Range,e("./behaviour/cstyle").CstyleBehaviour),l=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=o,this.$outdent=new i,this.$behaviour=new a,this.foldingRules=new l};n.inherits(s,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e),i=o.tokens,a=o.state;if(i.length&&"comment"==i[i.length-1].type)return r;if("start"==e){var l=t.match(/^.*[\{\(\[]\s*$/);l&&(r+=n)}else if("doc-start"==e){if("start"==a)return"";var l=t.match(/^\s*(\/?)\*/);l&&(l[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/c_cpp"}.call(s.prototype),t.Mode=s}),define("ace/mode/c_cpp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,i=t.cFunctions="\\s*\\bhypot(?:f|l)?|s(?:scanf|ystem|nprintf|ca(?:nf|lb(?:n(?:f|l)?|ln(?:f|l)?))|i(?:n(?:h(?:f|l)?|f|l)?|gn(?:al|bit))|tr(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?)|error|pbrk|ftime|len|rchr|xfrm)|printf|et(?:jmp|vbuf|locale|buf)|qrt(?:f|l)?|w(?:scanf|printf)|rand)|n(?:e(?:arbyint(?:f|l)?|xt(?:toward(?:f|l)?|after(?:f|l)?))|an(?:f|l)?)|c(?:s(?:in(?:h(?:f|l)?|f|l)?|qrt(?:f|l)?)|cos(?:h(?:f)?|f|l)?|imag(?:f|l)?|t(?:ime|an(?:h(?:f|l)?|f|l)?)|o(?:s(?:h(?:f|l)?|f|l)?|nj(?:f|l)?|pysign(?:f|l)?)|p(?:ow(?:f|l)?|roj(?:f|l)?)|e(?:il(?:f|l)?|xp(?:f|l)?)|l(?:o(?:ck|g(?:f|l)?)|earerr)|a(?:sin(?:h(?:f|l)?|f|l)?|cos(?:h(?:f|l)?|f|l)?|tan(?:h(?:f|l)?|f|l)?|lloc|rg(?:f|l)?|bs(?:f|l)?)|real(?:f|l)?|brt(?:f|l)?)|t(?:ime|o(?:upper|lower)|an(?:h(?:f|l)?|f|l)?|runc(?:f|l)?|gamma(?:f|l)?|mp(?:nam|file))|i(?:s(?:space|n(?:ormal|an)|cntrl|inf|digit|u(?:nordered|pper)|p(?:unct|rint)|finite|w(?:space|c(?:ntrl|type)|digit|upper|p(?:unct|rint)|lower|al(?:num|pha)|graph|xdigit|blank)|l(?:ower|ess(?:equal|greater)?)|al(?:num|pha)|gr(?:eater(?:equal)?|aph)|xdigit|blank)|logb(?:f|l)?|max(?:div|abs))|di(?:v|fftime)|_Exit|unget(?:c|wc)|p(?:ow(?:f|l)?|ut(?:s|c(?:har)?|wc(?:har)?)|error|rintf)|e(?:rf(?:c(?:f|l)?|f|l)?|x(?:it|p(?:2(?:f|l)?|f|l|m1(?:f|l)?)?))|v(?:s(?:scanf|nprintf|canf|printf|w(?:scanf|printf))|printf|f(?:scanf|printf|w(?:scanf|printf))|w(?:scanf|printf)|a_(?:start|copy|end|arg))|qsort|f(?:s(?:canf|e(?:tpos|ek))|close|tell|open|dim(?:f|l)?|p(?:classify|ut(?:s|c|w(?:s|c))|rintf)|e(?:holdexcept|set(?:e(?:nv|xceptflag)|round)|clearexcept|testexcept|of|updateenv|r(?:aiseexcept|ror)|get(?:e(?:nv|xceptflag)|round))|flush|w(?:scanf|ide|printf|rite)|loor(?:f|l)?|abs(?:f|l)?|get(?:s|c|pos|w(?:s|c))|re(?:open|e|ad|xp(?:f|l)?)|m(?:in(?:f|l)?|od(?:f|l)?|a(?:f|l|x(?:f|l)?)?))|l(?:d(?:iv|exp(?:f|l)?)|o(?:ngjmp|cal(?:time|econv)|g(?:1(?:p(?:f|l)?|0(?:f|l)?)|2(?:f|l)?|f|l|b(?:f|l)?)?)|abs|l(?:div|abs|r(?:int(?:f|l)?|ound(?:f|l)?))|r(?:int(?:f|l)?|ound(?:f|l)?)|gamma(?:f|l)?)|w(?:scanf|c(?:s(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?|mbs)|pbrk|ftime|len|r(?:chr|tombs)|xfrm)|to(?:b|mb)|rtomb)|printf|mem(?:set|c(?:hr|py|mp)|move))|a(?:s(?:sert|ctime|in(?:h(?:f|l)?|f|l)?)|cos(?:h(?:f|l)?|f|l)?|t(?:o(?:i|f|l(?:l)?)|exit|an(?:h(?:f|l)?|2(?:f|l)?|f|l)?)|b(?:s|ort))|g(?:et(?:s|c(?:har)?|env|wc(?:har)?)|mtime)|r(?:int(?:f|l)?|ound(?:f|l)?|e(?:name|alloc|wind|m(?:ove|quo(?:f|l)?|ainder(?:f|l)?))|a(?:nd|ise))|b(?:search|towc)|m(?:odf(?:f|l)?|em(?:set|c(?:hr|py|mp)|move)|ktime|alloc|b(?:s(?:init|towcs|rtowcs)|towc|len|r(?:towc|len)))\\b",a=function(){var e="break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using",t="asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void|class|wchar_t|template",n="const|extern|register|restrict|static|volatile|inline|private:|protected:|public:|friend|explicit|virtual|export|mutable|typename",o="and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eqconst_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",a="NULL|true|false|TRUE|FALSE",l=this.$keywords=this.createKeywordMapper({"keyword.control":e,"storage.type":t,"storage.modifier":n,"keyword.operator":o,"variable.language":"this","constant.language":a},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},r.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"keyword",regex:"#\\s*(?:include|import|pragma|line|define|undef|if|ifdef|else|elif|ifndef)\\b",next:"directive"},{token:"keyword",regex:"(?:#\\s*endif)\\b"},{token:"support.function.C99.c",regex:i},{token:l,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",regex:".+"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(r,"doc-",[r.getEndRule("start")])};n.inherits(a,o),t.c_cppHighlightRules=a}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};n.inherits(o,r),o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var i=o[1].length,a=e.findMatchingBracket({row:t,column:i});if(!a||a.row==t)return 0;var l=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,i-1),l)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),r=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,i=e("../../lib/lang"),a=["text","paren.rparen","punctuation.operator"],l=["text","paren.rparen","punctuation.operator","comment"],s=0,c=-1,u="",g=0,f=-1,d="",h="",m=function(){m.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),r=new o(t,n.row,n.column);if(!this.$matchTokenType(r.getCurrentToken()||"text",a)){var i=new o(t,n.row,n.column+1);if(!this.$matchTokenType(i.getCurrentToken()||"text",a))return!1}return r.stepForward(),r.getCurrentTokenRow()!==n.row||this.$matchTokenType(r.getCurrentToken()||"text",l)},m.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},m.recordAutoInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isAutoInsertedClosing(r,o,u[0])||(s=0),c=r.row,u=n+o.substr(r.column),s++},m.recordMaybeInsert=function(e,t,n){var r=e.getCursorPosition(),o=t.doc.getLine(r.row);this.isMaybeInsertedClosing(r,o)||(g=0),f=r.row,d=o.substr(0,r.column)+n,h=o.substr(r.column),g++},m.isAutoInsertedClosing=function(e,t,n){return s>0&&e.row===c&&n===u[0]&&t.substr(e.column)===u},m.isMaybeInsertedClosing=function(e,t){return g>0&&e.row===f&&t.substr(e.column)===h&&t.substr(0,e.column)==d},m.popAutoInsertedClosing=function(){u=u.substr(1),s--},m.clearMaybeInsertedClosing=function(){g=0,f=-1},this.add("braces","insertion",function(e,t,n,r,o){var a=n.getCursorPosition(),l=r.doc.getLine(a.row);if("{"==o){var s=n.getSelectionRange(),c=r.doc.getTextRange(s);if(""!==c&&"{"!==c&&n.getWrapBehavioursEnabled())return{text:"{"+c+"}",selection:!1};if(m.isSaneInsertion(n,r))return/[\]\}\)]/.test(l[a.column])||n.inMultiSelectMode?(m.recordAutoInsert(n,r,"}"),{text:"{}",selection:[1,1]}):(m.recordMaybeInsert(n,r,"{"),{text:"{",selection:[1,1]})}else if("}"==o){var u=l.substring(a.column,a.column+1);if("}"==u){var f=r.$findOpeningBracket("}",{column:a.column+1,row:a.row});if(null!==f&&m.isAutoInsertedClosing(a,l,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==o||"\r\n"==o){var d="";m.isMaybeInsertedClosing(a,l)&&(d=i.stringRepeat("}",g),m.clearMaybeInsertedClosing());var u=l.substring(a.column,a.column+1);if("}"===u){var h=r.findMatchingBracket({row:a.row,column:a.column+1},"}");if(!h)return null;var p=this.$getIndent(r.getLine(h.row))}else{if(!d)return;var p=this.$getIndent(l)}var x=p+r.getTabString();return{text:"\n"+x+"\n"+p+d,selection:[1,x.length,1,x.length]}}m.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==i){var a=r.doc.getLine(o.start.row),l=a.substring(o.end.column,o.end.column+1);if("}"==l)return o.end.column++,o;g--}}),this.add("parens","insertion",function(e,t,n,r,o){if("("==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"("+a+")",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,")"),{text:"()",selection:[1,1]}}else if(")"==o){var l=n.getCursorPosition(),s=r.doc.getLine(l.row),c=s.substring(l.column,l.column+1);if(")"==c){var u=r.$findOpeningBracket(")",{column:l.column+1,row:l.row});if(null!==u&&m.isAutoInsertedClosing(l,s,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"("==i){var a=r.doc.getLine(o.start.row),l=a.substring(o.start.column+1,o.start.column+2);if(")"==l)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,r,o){if("["==o){var i=n.getSelectionRange(),a=r.doc.getTextRange(i);if(""!==a&&n.getWrapBehavioursEnabled())return{text:"["+a+"]",selection:!1};if(m.isSaneInsertion(n,r))return m.recordAutoInsert(n,r,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){var l=n.getCursorPosition(),s=r.doc.getLine(l.row),c=s.substring(l.column,l.column+1);if("]"==c){var u=r.$findOpeningBracket("]",{column:l.column+1,row:l.row});if(null!==u&&m.isAutoInsertedClosing(l,s,o))return m.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&"["==i){var a=r.doc.getLine(o.start.row),l=a.substring(o.start.column+1,o.start.column+2);if("]"==l)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,r,o){if('"'==o||"'"==o){var i=o,a=n.getSelectionRange(),l=r.doc.getTextRange(a);if(""!==l&&"'"!==l&&'"'!=l&&n.getWrapBehavioursEnabled())return{text:i+l+i,selection:!1};var s=n.getCursorPosition(),c=r.doc.getLine(s.row),u=c.substring(s.column-1,s.column);if("\\"==u)return null;for(var g,f=r.getTokens(a.start.row),d=0,h=-1,p=0;p<f.length&&(g=f[p],"string"==g.type?h=-1:0>h&&(h=g.value.indexOf(i)),!(g.value.length+d>a.start.column));p++)d+=f[p].value.length;if(!g||0>h&&"comment"!==g.type&&("string"!==g.type||a.start.column!==g.value.length+d-1&&g.value.lastIndexOf(i)===g.value.length-1)){if(!m.isSaneInsertion(n,r))return;return{text:i+i,selection:[1,1]}}if(g&&"string"===g.type){var x=c.substring(s.column,s.column+1);if(x==i)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,r,o){var i=r.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==i||"'"==i)){var a=r.doc.getLine(o.start.row),l=a.substring(o.start.column+1,o.start.column+2);if(l==i)return o.end.column++,o}})};n.inherits(m,r),t.CstyleBehaviour=m}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),r=e("../../range").Range,o=e("./fold_mode").FoldMode,i=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(i,o),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n),i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var l=e.getCommentFoldRange(n,a+i[0].length,1);return l&&!l.isMultiLine()&&(r?l=this.getSectionRange(e,n):"all"!=t&&(l=null)),l}if("markbegin"!==t){var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],n,a):e.getCommentFoldRange(n,a,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),i=t,a=n.length;t+=1;for(var l=t,s=e.getLength();++t<s;){n=e.getLine(t);var c=n.search(/\S/);if(-1!==c){if(o>c)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=i)break;if(u.isMultiLine())t=u.end.row;else if(o==c)break}l=t}}return new r(i,a,l,e.getLine(l).length)}}.call(i.prototype)}),define("ace/mode/glsl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/c_cpp_highlight_rules"],function(e,t){var n=e("../lib/oop"),r=e("./c_cpp_highlight_rules").c_cppHighlightRules,o=function(){var e="attribute|const|uniform|varying|break|continue|do|for|while|if|else|in|out|inout|float|int|void|bool|true|false|lowp|mediump|highp|precision|invariant|discard|return|mat2|mat3|mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler2D|samplerCube|struct",t="radians|degrees|sin|cos|tan|asin|acos|atan|pow|exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|faceforward|reflect|refract|matrixCompMult|lessThan|lessThanEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|not|dFdx|dFdy|fwidth|texture2D|texture2DProj|texture2DLod|texture2DProjLod|textureCube|textureCubeLod|gl_MaxVertexAttribs|gl_MaxVertexUniformVectors|gl_MaxVaryingVectors|gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|gl_MaxTextureImageUnits|gl_MaxFragmentUniformVectors|gl_MaxDrawBuffers|gl_DepthRangeParameters|gl_DepthRange|gl_Position|gl_PointSize|gl_FragCoord|gl_FrontFacing|gl_PointCoord|gl_FragColor|gl_FragData",n=this.createKeywordMapper({"variable.language":"this",keyword:e,"constant.language":t},"identifier");this.$rules=(new r).$rules,this.$rules.start.forEach(function(e){"function"==typeof e.token&&(e.token=n)})};n.inherits(o,r),t.glslHighlightRules=o});