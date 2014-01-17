function DataManager(yearBox, weekBox, selectBoxMap, reqDataFunc, afterReqCallback, processDataFunc){
	this.yearBox = yearBox;
	this.weekBox = weekBox;
	this.map = selectBoxMap;
	this.getDataFunc = reqDataFunc;
	this.afterGetCallback = afterReqCallback;
	this.processDataFunc = processDataFunc;

	this.dataCache = {};

	var context = this;
	$(this.yearBox).change(function(){
			context.fixSelects();
			context.requestData();
	});
	$(this.weekBox).change(function(){
		context.requestData();
	});

	$(yearBox).on('mouseover', function(event){
		event.stopPropagation();
	});

	this.addOptions();
}

DataManager.prototype.getRawData = function(){
	return this.rawData;
};

DataManager.prototype.setDataReturnFunction = function(newFunc){
	this.afterGetCallback = newFunc;
};

DataManager.prototype.getDataReturnFunction = function(){
	return this.afterGetCallback;
};

DataManager.prototype.addOptions = function(){
	while(this.yearBox.hasChildNodes() ){
		this.yearBox.removeChild(this.yearBox.lastChild);
	}

	while(this.weekBox.hasChildNodes() ){
		this.weekBox.removeChild(this.weekBox.lastChild);
	}
	var largest = 0;
	for(var opt in this.map){
		if(this.map.hasOwnProperty(opt)){
			var newOpt = document.createElement('option');
			newOpt.innerHTML = opt;
			$(newOpt).val(opt);
			this.yearBox.appendChild(newOpt);
			if(opt > largest){
					largest = opt;
			}
		}
	}
	$(this.yearBox).val(largest);

	for(var i = 1; i < this.map[largest]; i++){
		var newOpt = document.createElement('option');
		newOpt.innerHTML = i;
		newOpt.className = 'selectBoxOption';
		$(newOpt).val(i);
		this.weekBox.appendChild(newOpt);
		$(this.weekBox).val(i);
	}
};

DataManager.prototype.fixSelects = function(){
	if($(weekBox).val() > this.map[$(this.yearBox).val()]){
		$(weekBox).val(this.map[$(this.yearBox).val()]);
	}
};

DataManager.prototype.requestData = function(yearNum, weekNum, exData){

	var season;
	if (typeof yearNum === 'undefined'){
		season = $(this.yearBox).val();
	} else{
		season = yearNum;
	}
	var week;
	if (typeof weekNum === 'undefined'){
		week = $(this.weekBox).val();
	} else{
		week = weekNum;
	}

	var extraData = exData;
	if (typeof exData === 'undefined'){
		extraData = null;
	}


	if(this.dataCache[season] && this.dataCache[season][week]){
		this.afterGetCallback(this.dataCache[season][week], extraData);
	}else{
		if(!this.dataCache[season]){
			this.dataCache[season] = [];
		}
		this.getDataFunc([season, week], this.afterGetCallback, extraData);
	}
};

DataManager.prototype.updateData = function(newData){
	this.rawData = newData;
	this.processedData = this.processDataFunc($.extend(true, [], this.rawData));

	this.dataCache[$(this.yearBox).val()][$(this.weekBox).val()] = newData;

	return this.processedData;
};