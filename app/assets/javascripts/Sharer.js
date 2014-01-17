function Sharer(dataManager, runCode, submitUrl, allWeeksMap){
	var context = this;


	this.dm = dataManager;
	this.dmPrevFunc = dm.getDataReturnFunction();
	console.log(runCode);
	this.rankingFunction = eval('(' + runCode + ')');
	console.log('rankingFunction: ', this.rankingFunction);

	this.allMade = false;
	this.requestsMade = 0;
	this.requestsFilled = 0;

	this.dmPrevFunc = dm.setDataReturnFunction(function(newData, dateObj){
		var runnableData = context.dm.updateData(newData);
		if(context.rankMap[dateObj['year']] === undefined){
			context.rankMap[dateObj['year']] = {};
		}
		context.rankMap[dateObj['year']][dateObj['week']] = context.frame.contentWindow.runOnWeek(dateObj['year'], dateObj['week'], runnableData, context.rankingFunction);
		context.requestsFilled += 1;
		if(context.allMade && context.requestsFilled === context.requestsMade){
			context.submit();
		}
	});



	this.run = runCode;
	this.submitUrl = submitUrl;
	this.map = allWeeksMap;

	this.rankMap = {};


	this.frame = document.createElement('iframe');
	this.frame.id = 'sFrame';
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
	$.post(this.submitUrl, {map: this.rankMap, code: this.run})
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
	console.log('go go go');
	for(var year in this.map){
		if(this.map.hasOwnProperty(year)){
			for(var week = 1; week <= this.map[year]; week++){
				var dateObj = {};
				console.log(year);
				dateObj['year']= year;
				dateObj['week']= week;
				this.dm.requestData(year, week, dateObj);
				this.requestsMade += 1;
			}
		}
	}
	this.allMade = true;
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
	var teamCodeArr = {};
	for(var i = 0; i < fullData.length; i++){
		teamCodeArr[i] = fullData[i].team_code;
	}
	return teamCodeArr;
	/* Put just ids into an array, store in this object's map */
};

