ace.define("ace/ext/statusbar",["require","exports","module","ace/lib/dom","ace/lib/lang"],function(e,t){var n=e("ace/lib/dom"),a=e("ace/lib/lang"),i=function(e,t){this.element=n.createElement("div"),this.element.className="ace_status-indicator",this.element.style.cssText="display: inline-block;",t.appendChild(this.element);var i=a.delayedCall(function(){this.updateStatus(e)}.bind(this));e.on("changeStatus",function(){i.schedule(100)}),e.on("changeSelection",function(){i.schedule(100)})};(function(){this.updateStatus=function(e){function t(e,t){e&&n.push(e,t||"|")}var n=[];e.$vimModeHandler?t(e.$vimModeHandler.getStatusText()):e.commands.recording&&t("REC");var a=e.selection.lead;if(t(a.row+":"+a.column," "),!e.selection.isEmpty()){var i=e.getSelectionRange();t("("+(i.end.row-i.start.row)+":"+(i.end.column-i.start.column)+")")}n.pop(),this.element.textContent=n.join("")}}).call(i.prototype),t.StatusBar=i});