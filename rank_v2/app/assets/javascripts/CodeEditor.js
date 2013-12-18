function CodeEditor(divId, language, saveFunction){
	this.containerId = divId;


    ace.config.set("workerPath", "javascript/ace-builds/src-noconflict");
    this.aceEditor = ace.edit(this.containerId);
	this.aceEditor.getSession().setUseWorker(false);
    this.aceEditor.setTheme("ace/theme/monokai");
    this.aceEditor.setValue('');
    this.setLanguage(language);


	/* Setup the calling of the ajax saving function if they give one */
	if (!(typeof saveFunction === 'undefined')){
		this.setSaveFunction(saveFunction);
	}

    this.aceEditor.onFocus(function(){
		this.resize();
    });

    this.loadText(unescape('/**%0A%20*%20Sort%20teams%20by%20a%20chosen%20ranking%20criteria.%0A%20*%20%0A%20*%20@param%20%7BArray%7D%20teams%20%3A%20unsorted%20array%20of%20all%20team%20objects%0A%20*%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20containing%20schedules%20and%20games%0A%20*%20@return%20%7BArray%7D%20teams%3A%20sorted%20array%0A%20*/%0Afunction%20main%28teams%29%7B%0A%20%20%20%20%0A%20%20%20%20/*%20Calculates%20and%20adds%20a%20two%20new%20fields%20to%20each%20individual%20teams%3A%0A%20%20%20%20%20*%20%20the%20number%20of%20wins%20their%20opponents%20collectively%20have%20and%20the%0A%20%20%20%20%20*%20%20the%20number%20of%20total%20games%20their%20opponents%20collectively%20have.%0A%20%20%20%20%20*/%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0A%20%20%20%20%20%20%20%20opp_wins%20%3D%200%3B%0A%20%20%20%20%20%20%20%20opp_games%20%3D%200%3B%0A%20%20%20%20%20%20%20%20for%28var%20j%20%3D%200%3B%20j%20%3C%20teams%5Bi%5D.schedule.length%3B%20j++%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20opp_wins%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.wins%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20opp_games%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.games%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.opp_wins%20%3D%20opp_wins%3B%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.opp_games%20%3D%20opp_games%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20%0A%20%20%20%20/*%20Using%20the%20two%20fields%20added%20above%2C%20we%20now%20calculate%20all%20the%20wins%0A%20%20%20%20%20*%20%20of%20our%20opponents%27%20opponents%20and%20the%20total%20number%20of%20games%20of%0A%20%20%20%20%20*%20%20our%20opponents%27%20opponents.%0A%20%20%20%20%20*/%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0A%20%20%20%20%20%20%20%20d2_wins%20%3D%200%3B%0A%20%20%20%20%20%20%20%20d2_games%20%3D%200%3B%0A%20%20%20%20%20%20%20%20for%28var%20j%20%3D%200%3B%20j%20%3C%20teams%5Bi%5D.schedule.length%3B%20j++%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20d2_wins%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.opp_wins%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20d2_games%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.opp_games%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.d2_wins%20%3D%20d2_wins%3B%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.d2_games%20%3D%20d2_games%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0A%20%20%20%20%20%20%20%20/*%20We%20generate%20a%20new%20field%20for%20each%20team%3A%20rankPoints%0A%20%20%20%20%20%20%20%20%20*%20It%27s%20a%20weighted%20average%20of%20a%20teams%20win%20percentage%2C%20their%0A%20%20%20%20%20%20%20%20%20*%20%20opponents%27%20win%20percentage%2C%20and%20their%20opponents%27%20opponents%27%0A%20%20%20%20%20%20%20%20%20*%20%20win%20percentage%2C%20weighted%202%2C%201%2C%201%20respectively.%0A%20%20%20%20%20%20%20%20%20*/%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20%3D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%202*teams%5Bi%5D.win_pct%0A%20%20%20%20%20%20%20%20%20%20%20%20+%201*teams%5Bi%5D.opp_wins/teams%5Bi%5D.opp_games%0A%20%20%20%20%20%20%20%20%20%20%20%20+%201*teams%5Bi%5D.d2_wins/teams%5Bi%5D.d2_games%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20/*%20We%20now%20give%20a%20point%20bonus%20to%20teams%20that%20are%20in%20the%20FBS%0A%20%20%20%20%20%20%20%20%20*%20%20division%20%28FCS%20teams%20are%20included%20here%21%29%20and%20for%20teams%0A%20%20%20%20%20%20%20%20%20*%20%20in%20automatic%20qualifier%20conferences.%0A%20%20%20%20%20%20%20%20%20*/%0A%20%20%20%20%20%20%20%20if%28teams%5Bi%5D.fbs%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20*%3D%201.1%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20if%28teams%5Bi%5D.aq%20%7C%7C%20teams%5Bi%5D.name%20%3D%3D%20%22Notre%20Dame%22%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20*%3D%201.1%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20/*%20We%27re%20going%20to%20punish%20teams%20extra%20for%20losing.%0A%20%20%20%20%20*%20%20Here%20we%20take%20off%20an%20amount%20of%20points%20inversely%20proportional%0A%20%20%20%20%20*%20%20to%20the%20%27rankPoints%27%20of%20an%20opponent%20they%20lost%20to%21%0A%20%20%20%20%20*/%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0A%20%20%20%20%20%20%20%20for%28var%20g%20%3D%200%3B%20g%20%3C%20teams%5Bi%5D.schedule.length%3B%20g++%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%28%21teams%5Bi%5D.schedule%5Bg%5D.win%29%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20teams%5Bi%5D.lossPenalty%20%3D%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.05%20*%201/teams%5Bi%5D.schedule%5Bg%5D.opp.rankPoints%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20/*%20We%20didn%27t%20just%20subtract%20the%20penalty%20off%20right%20away%20when%20we%0A%20%20%20%20%20*%20%20%20calculated%20it.%20Why%20would%20that%20have%20been%20a%20bad%20idea%3F%0A%20%20%20%20%20*/%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20-%3D%20teams%5Bi%5D.lossPenalty%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20/*%20We%27ve%20done%20all%20the%20hard%20work%2C%20now%20just%20sort%20the%20teams%20according%0A%20%20%20%20%20*%20%20to%20the%20number%20of%20points%20they%27ve%20earned%20in%20our%20ranking.%0A%20%20%20%20%20*/%0A%20%20%20%20teams.sort%28function%28a%2Cb%29%7B%0A%20%20%20%20%20%20%20%20return%20b.rankPoints%20-%20a.rankPoints%3B%0A%20%20%20%20%7D%29%3B%0A%20%20%20%20%0A%20%20%20%20/*%20Might%20be%20interesting%20to%20check%20out%20the%20gap%20in%20points%20between%0A%20%20%20%20%20*%20%20our%20top%20ranked%20teams.%0A%20%20%20%20%20*/%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%2025%3B%20i++%29%7B%0A%20%20%20%20%20%20%20%20console.log%28teams%5Bi%5D.rankPoints%29%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20return%20teams%3B%0A%7D'));
}

CodeEditor.prototype.getText = function(){
	return this.aceEditor.getValue();
};

CodeEditor.prototype.resize = function(){
	this.aceEditor.resize();
};


CodeEditor.prototype.loadText = function(newText){
	this.aceEditor.setValue(newText);
};

/**
 * Sets callbacks so the save function will be automatically be called once a minute if changes have been made.
 * @param{function} saveFunc
 */
CodeEditor.prototype.setSaveFunction = function(saveFunc){
	try{
		saveFunc(this.aceEditor.getValue());
	}catch(err){
		console.log('Could not execute the save function!');
	}
	this.lastSave = new Date();
	this.hasChanged = false;

	var context = this;
	function checkIfShouldSave(){
		if(context.hasChanged && (new Date()).getMinutes() != context.lastSave.getMinutes()){
			saveFunc(context.aceEditor.getValue());
			context.lastSave = new Date();
			context.hasChanged = false;
		}
	}

	timeoutId = setInterval(function(){checkIfShouldSave();}, 60*1000);

    this.aceEditor.getSession().on('change', function(e) {
		context.hasChanged = true;
    });
};

/**
 * Changes the language for codehilighting
 * @param{String} language
 */

CodeEditor.prototype.setLanguage = function(language){
    if(language === 'javascript'){
		this.aceEditor.getSession().setMode("ace/mode/javascript");
		this.language =language;

		return true;
	}

	return false;
};