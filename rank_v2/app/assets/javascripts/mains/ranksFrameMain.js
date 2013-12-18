window.onload = function(){
	if(window.addEventListener){
		addEventListener("message", getMessage, false);
    } else{
		attachEvent("onmessage", getMessage);
    }
    ranker = new Ranker(document.querySelector('.rankings'), null, null, buildTeamTile, remap);

    $('.banner').css('display', 'none');

};

function getMessage(event){
	ranker.updateCode(event.data.newCode);
	ranker.updateData(event.data.rawData);
	ranker.run();
}

function buildTeamTile(rank, team){


    var teamTile = document.createElement('div');
    teamTile.className = 'teamTile';

    var numberingDiv = document.createElement('div');
    numberingDiv.className = 'numberingDiv';
    teamTile.appendChild(numberingDiv);

    var rankNumber = document.createElement('p');
    rankNumber.className = 'rankNumber';
    rankNumber.innerHTML = rank + 1;
    numberingDiv.appendChild(rankNumber);

    var teamSide = document.createElement('div');
    teamSide.className = 'teamSide';
    teamTile.appendChild(teamSide);

    var teamLogo = document.createElement('img');
    teamLogo.className = 'teamLogo';
    try{
        teamLogo.src = '/assets/team_logos/' + team.team_code + '.png';
    }catch(error){}

    teamSide.appendChild(teamLogo);

    var teamName = document.createElement('p');
    teamName.className = 'teamName';
    teamName.innerHTML = team.name;
    teamSide.appendChild(teamName);

    return teamTile;

}


function remap(jsonData){
    var namesMap = {};
    for(var k = 0; k < jsonData.length; k++){
        namesMap[jsonData[k].name] = jsonData[k];
    }

    var gameMap = {};
    for(var i = 0; i < jsonData.length; i++){
        var team = jsonData[i];
        for(var j = 0; j < jsonData[i].schedule.length; j++){
            var game = team.schedule[j];
            game.opp = namesMap[game.opp];
            game.team = jsonData[i];
            var mirror = gameMap[game.game_code];
            if(!mirror){
                gameMap[game.game_code] = game;
            }
            else{
                game.opp_game = mirror;
                mirror.opp_game = game;
            }
        }
    }

    return jsonData;
}

