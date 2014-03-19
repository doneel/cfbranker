define("ace/mode/ada",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/ada_highlight_rules","ace/range"],function(e,t){var r=e("../lib/oop"),a=e("./text").Mode,i=(e("../tokenizer").Tokenizer,e("./ada_highlight_rules").AdaHighlightRules),n=(e("../range").Range,function(){this.HighlightRules=i});r.inherits(n,a),function(){this.lineCommentStart="--",this.$id="ace/mode/ada"}.call(n.prototype),t.Mode=n}),define("ace/mode/ada_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var r=e("../lib/oop"),a=e("./text_highlight_rules").TextHighlightRules,i=function(){var e="abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|body|private|then|if|procedure|type|case|in|protected|constant|interface|until||is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor",t="true|false|null",r="count|min|max|avg|sum|rank|now|coalesce|main",a=this.createKeywordMapper({"support.function":r,keyword:e,"constant.language":t},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:a,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};r.inherits(i,a),t.AdaHighlightRules=i});