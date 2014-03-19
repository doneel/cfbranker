ace.define("ace/mode/livescript",["require","exports","module","ace/tokenizer","ace/mode/matching_brace_outdent","ace/range","ace/mode/text"],function(e,t){function n(e,t){function n(){}return n.prototype=(e.superclass=t).prototype,(e.prototype=new n).constructor=e,"function"==typeof t.extended&&t.extended(e),e}function r(e,t){var n={}.hasOwnProperty;for(var r in t)n.call(t,r)&&(e[r]=t[r]);return e}var o,a,i,g;o="(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*",t.Mode=a=function(t){function a(){var t;this.$tokenizer=new(e("../tokenizer").Tokenizer)(a.Rules),(t=e("../mode/matching_brace_outdent"))&&(this.$outdent=new t.MatchingBraceOutdent)}var i,g=n((r(a,t).displayName="LiveScriptMode",a),t).prototype;return i=RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*"+o+")?))\\s*$"),g.getNextLineIndent=function(e,t,n){var r,o;return r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e).tokens,o.length&&"comment"===o[o.length-1].type||"start"===e&&i.test(t)&&(r+=n),r},g.toggleCommentLines=function(t,n,r,o){var a,i,g,s,c,x;for(a=/^(\s*)#/,i=new(e("../range").Range)(0,0,0,0),g=r;o>=g;++g)s=g,x=(c=a.test(x=n.getLine(s)))?x.replace(a,"$1"):x.replace(/^\s*/,"$&#"),i.end.row=i.start.row=s,i.end.column=x.length+1,n.replace(i,x);return 1-2*c},g.checkOutdent=function(e,t,n){var r;return null!=(r=this.$outdent)?r.checkOutdent(t,n):void 0},g.autoOutdent=function(e,t,n){var r;return null!=(r=this.$outdent)?r.autoOutdent(t,n):void 0},a}(e("../mode/text").Mode),i="(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))",g={token:"string",regex:".+"},a.Rules={start:[{token:"keyword",regex:"(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)"+i},{token:"constant.language",regex:"(?:true|false|yes|no|on|off|null|void|undefined)"+i},{token:"invalid.illegal",regex:"(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)"+i},{token:"language.support.class",regex:"(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)"+i},{token:"language.support.function",regex:"(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)"+i},{token:"variable.language",regex:"(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)"+i},{token:"identifier",regex:o+"\\s*:(?![:=])"},{token:"variable",regex:o},{token:"keyword.operator",regex:"(?:\\.{3}|\\s+\\?)"},{token:"keyword.variable",regex:"(?:@+|::|\\.\\.)",next:"key"},{token:"keyword.operator",regex:"\\.\\s*",next:"key"},{token:"string",regex:"\\\\\\S[^\\s,;)}\\]]*"},{token:"string.doc",regex:"'''",next:"qdoc"},{token:"string.doc",regex:'"""',next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',next:"qqstring"},{token:"string",regex:"`",next:"js"},{token:"string",regex:"<\\[",next:"words"},{token:"string.regex",regex:"//",next:"heregex"},{token:"comment.doc",regex:"/\\*",next:"comment"},{token:"comment",regex:"#.*"},{token:"string.regex",regex:"\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",next:"key"},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"},{token:"lparen",regex:"[({[]"},{token:"rparen",regex:"[)}\\]]",next:"key"},{token:"keyword.operator",regex:"\\S+"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:".*?//[gimy$?]{0,4}",next:"start"},{token:"string.regex",regex:"\\s*#{"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",regex:"\\S+"}],key:[{token:"keyword.operator",regex:"[.?@!]+"},{token:"identifier",regex:o,next:"start"},{token:"text",regex:".",next:"start"}],comment:[{token:"comment.doc",regex:".*?\\*/",next:"start"},{token:"comment.doc",regex:".+"}],qdoc:[{token:"string",regex:".*?'''",next:"key"},g],qqdoc:[{token:"string",regex:'.*?"""',next:"key"},g],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",next:"key"},g],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',next:"key"},g],js:[{token:"string",regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"key"},g],words:[{token:"string",regex:".*?\\]>",next:"key"},g]}}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),o=r.match(/^(\s*\})/);if(!o)return 0;var a=o[1].length,i=e.findMatchingBracket({row:t,column:a});if(!i||i.row==t)return 0;var g=this.$getIndent(e.getLine(i.row));e.replace(new n(t,0,t,a-1),g)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r});