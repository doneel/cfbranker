__ace_shadowed__.define("ace/mode/lucene",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/lucene_highlight_rules"],function(e,t){var r=e("../lib/oop"),n=e("./text").Mode,o=e("../tokenizer").Tokenizer,i=e("./lucene_highlight_rules").LuceneHighlightRules,a=function(){this.$tokenizer=new o((new i).getRules())};r.inherits(a,n),t.Mode=a}),__ace_shadowed__.define("ace/mode/lucene_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(e,t){var r=e("../lib/oop"),n=(e("../lib/lang"),e("./text_highlight_rules").TextHighlightRules),o=function(){this.$rules={start:[{token:"constant.character.negation",regex:"[\\-]"},{token:"constant.character.interro",regex:"[\\?]"},{token:"constant.character.asterisk",regex:"[\\*]"},{token:"constant.character.proximity",regex:"~[0-9]+\\b"},{token:"keyword.operator",regex:"(?:AND|OR|NOT)\\b"},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"keyword",regex:"[\\S]+:"},{token:"string",regex:'".*?"'},{token:"text",regex:"\\s+"}]}};r.inherits(o,n),t.LuceneHighlightRules=o});