function Sharer(dataManager,runCode,submitUrl,allWeeksMap){var context=this;this.dm=dataManager,this.dmPrevFunc=dm.getDataReturnFunction(),console.log(runCode),this.rankingFunction=eval("("+runCode+")"),console.log("rankingFunction: ",this.rankingFunction),this.allMade=!1,this.requestsMade=0,this.requestsFilled=0,this.dmPrevFunc=dm.setDataReturnFunction(function(t,e){var n=context.dm.updateData(t);void 0===context.rankMap[e.year]&&(context.rankMap[e.year]={}),context.rankMap[e.year][e.week]=context.frame.contentWindow.runOnWeek(e.year,e.week,n,context.rankingFunction),context.requestsFilled+=1,context.allMade&&context.requestsFilled===context.requestsMade&&context.submit()}),this.run=runCode,this.submitUrl=submitUrl,this.map=allWeeksMap,this.rankMap={},this.frame=document.createElement("iframe"),this.frame.id="sFrame",$(this.frame).load(function(){var t=document.createElement("script");t.type="text/javascript",t.text="var runOnWeek = "+context.runOnWeek.toString(),context.frame.contentWindow.document.open("text/html","replace"),context.frame.contentWindow.document.write("<script>"+t.text+"</script>"),context.frame.contentWindow.document.close(),console.log("JUST ADDED THE SCRIPT"),context.runAll()}),$("body").append(this.frame)}Sharer.prototype.submit=function(){console.log(this.rankMap),$.post(this.submitUrl,{map:this.rankMap,code:this.run}).done(function(t){console.log("submit worked correctly yayyy!"),console.log(t)}).fail(function(t){console.log("error: ",t)})};var runWrapperForFrame=function(){};Sharer.prototype.runAll=function(){console.log("go go go");for(var t in this.map)if(this.map.hasOwnProperty(t))for(var e=1;e<=this.map[t];e++){var n={};console.log(t),n.year=t,n.week=e,this.dm.requestData(t,e,n),this.requestsMade+=1}this.allMade=!0},Sharer.prototype.runOnWeek=function(t,e,n,o){for(var r=o(n),a={},i=0;i<r.length;i++)a[i]=r[i].team_code;return a};