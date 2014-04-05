function ExpandingDiv(div, minWidth, minHeight, callback, data){
	this.div = div;

	this.minWidth = minWidth;
	this.minHeight = minHeight;

	/*
	this.maxWidth = div.width;
	this.maxHeight = div.height;
	*/

	this.isExpanded = true;

	this.callbackGiven = false;
	if (!(typeof callback === 'undefined')){
		this.callbackGiven = true;
		this.callback = callback;
	}

	this.dataGiven = false;
	if (typeof data !== 'undefined'){
		this.dataGiven = true;
		this.callbackData = data;
	}

	this.bindTrigger();
}

/* Distance in pixels from the div's edges to place the triggering threshold */
ExpandingDiv.triggerMargin = 1;

/* Milliseconds to spend growing/shrinking */
ExpandingDiv.animationTime = 500;

ExpandingDiv.prototype.callCallback = function(){
	if(this.callbackGiven){
		if(this.dataGiven){
			this.callback(this.callbackData);
		}
		this.callback();
	}
};

ExpandingDiv.prototype.bindTrigger = function(){
	var context = this;
	$(document).on('mousemove', function(event){

		/* Clicking on select boxes makes some sort of virtual screen. Normally the top of the screen page is like screenY = 109
		 * What if they fullscren ?!?!?!
		 */
		if(event.screenY === 0){
			return false;
		}
		var rect = context.div.getBoundingClientRect();
		if(context.isExpanded){
			if(event.clientX - (rect.right) > ExpandingDiv.triggerMargin ){
				$(context.div).width(context.minWidth);
				context.isExpanded = false;
				context.callCallback();
			}
		}else{
			if(event.clientX - (rect.right + rect.width) < ExpandingDiv.triggerMargin ){
				$(context.div).width('');
				context.isExpanded = true;
				context.callCallback();
			}
		}
	});
};
