function ExpandingDiv(i,n,a,t,e){this.div=i,this.minWidth=n,this.minHeight=a,this.isExpanded=!0,this.callbackGiven=!1,"undefined"!=typeof t&&(this.callbackGiven=!0,this.callback=t),this.dataGiven=!1,"undefined"!=typeof e&&(this.dataGiven=!0,this.callbackData=e),this.bindTrigger()}ExpandingDiv.triggerMargin=10,ExpandingDiv.animationTime=500,ExpandingDiv.prototype.callCallback=function(){this.callbackGiven&&(this.dataGiven&&this.callback(this.callbackData),this.callback())},ExpandingDiv.prototype.bindTrigger=function(){var i=this;$(document).on("mousemove",function(n){if(0===n.screenY)return!1;var a=i.div.getBoundingClientRect();i.isExpanded?n.clientX-a.right>ExpandingDiv.triggerMargin&&($(i.div).width(i.minWidth),i.isExpanded=!1,i.callCallback()):n.clientX-(a.right+a.width)<ExpandingDiv.triggerMargin&&($(i.div).width(""),i.isExpanded=!0,i.callCallback())})};