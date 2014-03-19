ace.define("ace/mode/textile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/textile_highlight_rules","ace/mode/matching_brace_outdent"],function(e,t){var n=e("../lib/oop"),i=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./textile_highlight_rules").TextileHighlightRules),r=e("./matching_brace_outdent").MatchingBraceOutdent,c=function(){this.HighlightRules=o,this.$outdent=new r};n.inherits(c,i),function(){this.getNextLineIndent=function(e,t,n){return"intag"==e?n:""},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/textile"}.call(c.prototype),t.Mode=c}),ace.define("ace/mode/textile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:function(e){return"h"==e.charAt(0)?"markup.heading."+e.charAt(1):"markup.heading"},regex:"h1|h2|h3|h4|h5|h6|bq|p|bc|pre",next:"blocktag"},{token:"keyword",regex:"[\\*]+|[#]+"},{token:"text",regex:".+"}],blocktag:[{token:"keyword",regex:"\\. ",next:"start"},{token:"keyword",regex:"\\(",next:"blocktagproperties"}],blocktagproperties:[{token:"keyword",regex:"\\)",next:"blocktag"},{token:"string",regex:"[a-zA-Z0-9\\-_]+"},{token:"keyword",regex:"#"}]}};n.inherits(o,i),t.TextileHighlightRules=o}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var i=e.getLine(t),o=i.match(/^(\s*\})/);if(!o)return 0;var r=o[1].length,c=e.findMatchingBracket({row:t,column:r});if(!c||c.row==t)return 0;var h=this.$getIndent(e.getLine(c.row));e.replace(new n(t,0,t,r-1),h)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i});