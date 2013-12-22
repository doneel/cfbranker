function Sharer(requestDataFunction, runFunction, submitUrl){
	this.requestData = requestDataFunction;
	this.run = runFunction;
	this.submitUrl = submitUrl;

	this.frame = document.createElement('iframe');
}