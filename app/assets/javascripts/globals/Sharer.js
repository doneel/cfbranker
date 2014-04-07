function Sharer(dataManager, runCode, algorithmId, submitUrl, allWeeksMap){
	var context = this;
        
        this.algorithmId = algorithmId;

	this.dm = dataManager;
	this.dmPrevFunc = dm.getDataReturnFunction();
	console.log(runCode);
	this.rankingFunction = eval('(' + runCode + ')');
	console.log('rankingFunction: ', this.rankingFunction);

	this.allMade = false;
	this.requestsMade = 0;
	this.requestsFilled = 0;

	this.dmPrevFunc = dm.setDataReturnFunction(function(newData, dateObj){
                var year = dateObj['year'];
                var week = dateObj['week'][0];
		var runnableData = context.dm.updateData(newData, dateObj['year'], dateObj['week']);

		if(context.rankMap[dateObj['year']] === undefined){
			context.rankMap[dateObj['year']] = {};
		}
		context.rankMap[dateObj['year']][dateObj['week']] = context.frame.contentWindow.runOnWeek(dateObj['year'], dateObj['week'], runnableData, context.rankingFunction);
                console.log('Wrote in: ', week);
		context.requestsFilled += 1;
		if(context.allMade && context.requestsFilled === context.requestsMade){
			context.submit();
		}
                else{
                    console.log('All requests made: ', context.allMade, ' Filled: ' +  context.requestsMade  + '/' + context.requestsFilled );
                }
	});



	this.run = runCode;
	this.submitUrl = submitUrl;
	this.map = allWeeksMap;

	this.rankMap = {};


	this.frame = document.createElement('iframe');
	this.frame.id = 'sFrame';
        this.frame.style.display = 'none';
	/* TODO: Add sandbox property */


	$(this.frame).load(function(){

		var runScript = document.createElement('script');
		runScript.type = 'text/javascript';
		runScript.text = 'var runOnWeek = ' + context.runOnWeek.toString();
		context.frame.contentWindow.document.open('text/html', 'replace');
		context.frame.contentWindow.document.write('<script>' + runScript.text + '</script>');
		context.frame.contentWindow.document.close();

		console.log('JUST ADDED THE SCRIPT');

		context.runAll();
	});
	$('body').append(this.frame);

}

Sharer.prototype.submit = function(){
	console.log(this.rankMap);
	$.post(this.submitUrl, {map: this.rankMap, algorithm_id: this.algorithmId})
		.done(function(data){
			console.log('submit worked correctly yayyy!');
			console.log(data);
		})
		.fail(function(err){
			console.log('error: ', err);
		});
};

var runWrapperForFrame = function(){

}

Sharer.prototype.runAll = function(){
        console.log('beggingin runAll');
        var requestBuffer = [];
	for(var year in this.map){
		if(this.map.hasOwnProperty(year)){
                    for(var i = 0; i < this.map[year].length; i++){
                        var week = this.map[year][i];
//			for(var week = 1; week <= this.map[year]; week++){
                        var dateObj = {};
                        dateObj['year']= year;
                        dateObj['week']= week;
                        console.log('Requestiong: ' + week);
                        this.requestsMade += 1;
                        requestBuffer.push({year: year, week: week, dateObj: dateObj});
		    }
		}
	}
        
        /* Request data can have callbacks or not. Put requests in buffer so
         *  we know when we are done making all requests before we make the
         *  last one.
         */
        for(var i = 0; i < requestBuffer.length; i++){
            var req = requestBuffer[i];
	    if(i == requestBuffer.length - 1) this.allMade = true;
            this.dm.requestData(req.year, req.week, req.dateObj);
        }
};

Sharer.prototype.runOnWeek = function(year, week, data, runFunc){
	/*
	console.log('its working!')
	console.log(this);
	console.log(window);
	console.log(runFunc);
	console.log(data)
	*/
	var fullData = runFunc(data);
	var teamCodeArr = [];
	for(var i = 0; i < fullData.length; i++){
		teamCodeArr[i] = fullData[i].team_code;
	}
	return teamCodeArr;
	/* Put just ids into an array, store in this object's map */
};

