/* s = new Sharer(dm, editor.getText(), '/shares/create', numWeeksMap) */

function Ranker(div, rawData, rankingCode, representFunc, dataProcessFunction){
	this.div = div;
	this.rawData = rawData;
	//this.rankingFunction = eval(rankingCode);
        this.updateCode(rankingCode);
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
	this.rankingFunctionCode = "runFunction = function(teams){try{" + newCode + " return main(teams);}catch(error){throw error;}}";
};

Ranker.prototype.run = function(){

        /* Remove displayed and stored traces of last run*/
	while (this.div.firstChild ){
		this.div.removeChild( this.div.firstChild );
	}
        var result = null;

        try{
            var newScript = document.createElement('script');
            newScript.innerHTML = this.rankingFunctionCode;
            document.getElementsByTagName('head')[0].appendChild(newScript);
            var result = runFunction(this.data);
            //result = this.rankingFunction(this.data);
        }catch(err){
            return err;
        }

	for(var i = 0; i < result.length; i++){
		this.div.appendChild(this.representFunc(i, result[i]));
	}
};
