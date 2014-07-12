function ExpandingDiv(div, minWidth, minHeight, callback, data){
	this.div = div;

	this.minWidth = minWidth;
	this.minHeight = minHeight;

	this.maxWidth = $(div).css('width');
	/*
	this.maxHeight = div.height;
	*/

	this.isExpanded = true;
        this.currentlyAnimating = false;

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
ExpandingDiv.animationTime = 100;

ExpandingDiv.prototype.callCallback = function(){
	if(this.callbackGiven){
		if(this.dataGiven){
			this.callback(this.callbackData);
		}
		this.callback();
	}
};

ExpandingDiv.prototype.expand = function(){
    thisContext = this;
    console.log(ExpandingDiv.animationTime);
    this.currentlyAnimating = true;
    $(this.div).animate({width: this.maxWidth}, ExpandingDiv.animationTime, function(){thisContext.currentlyAnimating = false});
}

ExpandingDiv.prototype.contract = function(){
    console.log('Contracting!', this);
    thisContext = this;
    this.currentlyAnimating = true;
    $(this.div).animate({width: this.minWidth}, ExpandingDiv.animationTime, function(){ thisContext.currentlyAnimating = false; console.log('finished contracting', thisContext.currentlyAnimating, thisContext);});
}

ExpandingDiv.prototype.bindTrigger = function(){
	var context = this;
	$(document).on('mousemove', function(event){

		/* Clicking on select boxes makes some sort of virtual screen. Normally the top of the screen page is like screenY = 109
		 * What if they fullscren ?!?!?!
		 */
		if(event.screenY === 0){
			return false;
		}

                console.log(context.currentlyAnimating, context);
    
                if(context.currentlyAnimating){
                    return false;
                }

		var rect = context.div.getBoundingClientRect();
		if(context.isExpanded){
			if(event.clientX - (rect.right) > ExpandingDiv.triggerMargin ){
                                context.contract();
				context.isExpanded = false;
				context.callCallback();
			}
		}else{
			if(event.clientX - (rect.right + rect.width) < ExpandingDiv.triggerMargin ){
                                context.expand();
				context.isExpanded = true;
				context.callCallback();
			}
		}
	});
};
