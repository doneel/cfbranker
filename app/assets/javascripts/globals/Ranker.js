/* s = new Sharer(dm, editor.getText(), '/shares/create', numWeeksMap) */

function Ranker(div, rawData, rankingCode, representFunc, dataProcessFunction){
	this.div = div;
	this.rawData = rawData;
	this.rankingFunction = eval(rankingCode);
	this.representFunc = representFunc;

	this.shouldProcess = true;
	if (typeof dataProcessFunction === 'undefined'){
		this.shouldProcess = false;
	}else{
		this.processData = dataProcessFunction;
	}
}

Ranker.prototype.updateData = function(newRaw){
	this.rawData = newRaw;
	if(this.shouldProcess){
		this.data = this.processData(newRaw);
	}else{
		this.data = newRaw;
	}
};

Ranker.prototype.updateCode = function(newCode){
	this.rankingFunction = eval('this.rankingFunction = ' + newCode);
};

Ranker.prototype.run = function(){
	while (this.div.firstChild ){
		this.div.removeChild( this.div.firstChild );
	}

	result = this.rankingFunction(this.data);
	for(var i = 0; i < result.length; i++){
		this.div.appendChild(this.representFunc(i, result[i]));
	}
};
