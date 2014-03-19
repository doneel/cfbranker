define("ace/mode/properties",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/properties_highlight_rules"],function(e,t){var i=e("../lib/oop"),r=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./properties_highlight_rules").PropertiesHighlightRules),n=function(){this.HighlightRules=o};i.inherits(n,r),t.Mode=n}),define("ace/mode/properties_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var i=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,o=function(){var e=/\\u[0-9a-fA-F]{4}|\\/;this.$rules={start:[{token:"comment",regex:/[!#].*$/},{token:"keyword",regex:/[=:]$/},{token:"keyword",regex:/[=:]/,next:"value"},{token:"constant.language.escape",regex:e},{defaultToken:"variable"}],value:[{regex:/\\$/,token:"string",next:"value"},{regex:/$/,token:"string",next:"start"},{token:"constant.language.escape",regex:e},{defaultToken:"string"}]}};i.inherits(o,r),t.PropertiesHighlightRules=o});