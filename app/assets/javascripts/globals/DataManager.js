function DataManager(yearBox, weekBox, selectBoxMap, reqDataFunc, afterReqCallback, processDataFunc, trimFunc, changeCallBack, dataMapDiv){
	this.yearBox = yearBox;
	this.weekBox = weekBox;
	this.map = selectBoxMap;
	this.getDataFunc = reqDataFunc;
	this.afterGetCallback = afterReqCallback;
	this.processDataFunc = processDataFunc;
        this.changeCallBack = changeCallBack;
        this.trimmingFunction = trimFunc
        this.dataMapDiv = dataMapDiv;

        this.expectAllData = false;
        this.haveAllData = false;


	this.dataCache = {};

	var context = this;
	$(this.yearBox).change(function(){
                context.resetWeeks($(this).val());
                context.requestData();
                context.changeCallBack();
	});
	$(this.weekBox).change(function(){
		context.requestData();
                context.changeCallBack();
	});

	$(yearBox).on('mouseover', function(event){
		event.stopPropagation();
	});
        
	this.addOptions();
        this.loadData();
}

DataManager.prototype.waitForAllData = function(dataPauser){
    this.expectAllData = true;
    this.allLoadedFunction = null;
    if(typeof dataPauser != 'undefined'){
        this.allDataWaitPauser = dataPauser;
    }else{
        this.allDataWaitPauser = null;
    }
    console.log(this.allDataWaitPauser);
}

DataManager.prototype.loadedAllData = function(){
    this.haveAllData = true;
    if(this.allLoadedFunction){
        this.allLoadedFunction();
        if(this.allDataWaitPauser){
            this.allDataWaitPauser.off();
        }
    }
}

DataManager.prototype.loadData = function(){
    this.allDataMap = JSON.parse($(this.dataMapDiv).val());
    console.log(this.allDataMap);
    for(var year in this.allDataMap){
        var lastWeek = this.map[year][this.map[year].length - 1][1];
        this.updateData(this.allDataMap[year], year, lastWeek);
    }
}

DataManager.prototype.getRawData = function(){
	return this.rawData;
};

DataManager.prototype.getSelectedValue = function(){
    return {year: $(this.yearBox).val(), week: $(this.weekBox).val()};
}

DataManager.prototype.getSelectedString = function(){
    return {year: $(this.yearBox).find('option:selected').text(),  week: $(this.weekBox).find('option:selected').text()};
}

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

        var optionsArr = Object.keys(this.map);
        optionsArr.sort();
	
        var largest = 0;
        for(var i = 0; i < optionsArr.length; i++){
            var opt = optionsArr[i];
            var newOpt = document.createElement('option');
            newOpt.innerHTML = opt;
            $(newOpt).val(opt);
            this.yearBox.appendChild(newOpt);
            if(opt > largest){
                largest = opt;
            }
        }

	$(this.yearBox).val(largest);
        this.resetWeeks(largest);

/*        

	for(var i = 1; i < this.map[largest]; i++){
		var newOpt = document.createElement('option');
		newOpt.innerHTML = i;
		newOpt.className = 'selectBoxOption';
		$(newOpt).val(i);
		this.weekBox.appendChild(newOpt);
		$(this.weekBox).val(i);
	}
        */
};

DataManager.prototype.resetWeeks = function(year){
    this.weekBox.innerHTML = "";
    if (this.map[year] == null){
        return;
    }
    var optsArray = this.map[year];
    for(var i = 0; i < optsArray.length; i++){
        var newOpt = document.createElement('option');
        newOpt.innerHTML = optsArray[i][0];
        newOpt.className = 'selectBoxOption';
        $(newOpt).val(optsArray[i][1]);
        this.weekBox.appendChild(newOpt);
    }
    $(this.weekBox).val(optsArray[optsArray.length - 1][1]);
    
}


DataManager.prototype.fixSelects = function(){
	if($(weekBox).val() > this.map[$(this.yearBox).val()]){
		$(weekBox).val(this.map[$(this.yearBox).val()]);
	}
};

DataManager.prototype.requestData = function(yearNum, weekNum, exData){
        //console.log('Requesting:', yearNum, weekNum);

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
		extraData = {};
	}
        extraData.week = week;
        extraData.year = season;
       
        /* Plan
         * When requesting a new year, we need to cache the full year data
         *  in the last week slot.
         *  We later assume there is data there cause the array exists but it doesn't.
         */

        /*
         * function cacheAndTrimYear
         * When requesting data for a whole year, cache that data first,
         *  then trim it.
         * LastWeek represents the week this data actually responds to - 
         *      the last week of the year.
         *  targetWeek is the week we want to trim to.
         */
        var cacheAndTrimYear = function(rawData, extraData){
                /* could already exist in cache but just overwrite it. */
                context.updateData(rawData, extraData.year, extraData.lastWeek);
                //console.log('cache', context.dataCache);
                giveTrimmed(rawData, extraData);
        }
        var context = this;
        var giveTrimmed = function(rawData, extraData){
            data = $.extend(true, [], rawData)
            var trimmed = context.trimmingFunction(data, extraData.week);
            context.afterGetCallback(trimmed, extraData);
        }
	if(this.dataCache[season] && this.dataCache[season][week]){
		this.afterGetCallback(this.dataCache[season][week], extraData);
	}else{
                var lastWeek = this.map[season][this.map[season].length-1][1];
                /* Never requested anything */
		if(!this.dataCache[season]){
                    if(this.expectAllData){
                        if(this.allDataWaitPauser) this.allDataWaitPauser.on();
                        this.allLoadedFunction = function(){
                            this.requestData(yearNum, weekNum, exData);
                        }
                        return;
                    }
                        //console.log('requesting new year, data cache doesnt have', season);
			//this.dataCache[season] = [];
                        var lastWeek = this.map[season][this.map[season].length-1][1];
                        //console.log('last week: ', lastWeek);
                        extraData.lastWeek = lastWeek;
                        var doubleArr = [season, lastWeek];
		        this.getDataFunc([season, lastWeek], cacheAndTrimYear/*this.afterGetCallback*/, extraData);
		}
                else{
                    /* Have the season's data, just trim down */
                    giveTrimmed(this.dataCache[season][lastWeek], extraData);
		}
	}
};

function compressSchedule(schedule){
    var smaller = [];
    for(var i = 0; i < schedule.length; i++){
        smaller[i] = compressObject(schedule[i]);
    }
    return smaller;
}

function compressObject(team){
        var keys = Object.keys(team);
        var vals = [];
        for(var i = 0; i < keys.length; i++){
            if(keys[i] == 'schedule'){
                vals.push(compressSchedule(team[keys[i]]));
            }else{
                vals.push(team[keys[i]]);
            }
        }
        return vals;
}


DataManager.prototype.updateData = function(newData, year, week){
	this.rawData = newData;
        
	this.processedData = this.processDataFunc($.extend(true, [], this.rawData));

        //console.log('caching ', year, week, newData);        
	if(! this.dataCache[year]){
            this.dataCache[year] = [];
        }
	this.dataCache[year][week] = newData;

        //console.log('processed data', this.processedData);
	return this.processedData;
};
