window.onload = function(){
    editor = ace.edit("codeEditor");
    ace.config.set("workerPath", "javascript/ace-builds/src-noconflict");
	editor.getSession().setUseWorker(false);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    var loadWheelDiv = document.getElementById("loadWheelDiv");//$("#loadWheelDiv");

    pendingDataRequest = pendingSaveRequest = null;
    console.log(loadWheelDiv);
    getData(loadWheelDiv);
    $("select").change(function(){
        getData(loadWheelDiv);
    });

    var spaceNeeded = $('.mainContentWrapper').offset().top + $('.mainContentWrapper').height();
    $(window).resize(function(){
        console.log("resisizing" + $(window).height()/3);
//        $('#interfacePane').css('height', $(window).height() - $('#interfacePane').offset().top);
        $('#codeEditor').css('height', $(window).height() - spaceNeeded);
//        document.getElementById('codeEditor').height = $(window).height()/20;
    });

    $(window).resize();
    $("#saveAsForm")
        .submit(function(){
            document.getElementById("saveas_form_code").value = editor.getValue();
        })
        .bind('ajax:complete', function(){
        })
        .bind('ajax:success', function(xhr, data, status){
            appendSaveOpt(data);
            $("#saveAsDialog").dialog('close');
        })
        .bind('ajax:failure', function(xhr, status, error){
            console.log('error!: ' + error);
        });

    $("#saveForm")
        .submit(function(){
            document.getElementById('save_form_code').value = editor.getValue();
        });
};

function getSave(id, requestDiv){

    var spinner2 = makeSpinner().spin(requestDiv);
    requestDiv.appendChild(spinner2.el);
    console.log(requestDiv);
    if (pendingSaveRequest){
        pendingSaveRequest.abort();
    }
    var request = $.get("/algorithm/load?id=" + id, function(data, status){
        loadSave(data);
        spinner2.stop();
    })
    .fail(function(){
        spinner2.stop();
    });
    pendingSaveRequest = request;
}

function loadSave(save){
    if(save === null){
        editor.setValue("function main(teams){\r\n    for(var i = 0; i < teams.length; i++){\r\n        opp_wins = 0;\r\n        opp_games = 0;\r\n        //console.log(teams[i]);\r\n        for(var j = 0; j < teams[i].schedule.length; j++){\r\n           // console.log(teams[i].schedule[j].opp);\r\n            //console.log(teams[i].schedule[j].opp.wins);\r\n            opp_wins += teams[i].schedule[j].opp.wins;\r\n            opp_games += teams[i].schedule[j].opp.games;\r\n        }\r\n        teams[i].opp_win_pct = opp_wins/opp_games;\r\n        teams[i].points = teams[i].schedule.length*teams[i].wins*teams[i].win_pct *\r\n            .5*opp_wins*teams[i].opp_win_pct - (teams[i].games - teams[i].wins);\r\n    }\r\n\r\n    teams.sort(function(a,b){\r\n        return b.points - a.points;\r\n    });\r\n\r\n    return teams;\r\n}");
        return;
    }
    $("#saveForm").css('display', 'block');
    editor.setValue(save.code);
    var prevSave = document.getElementById('saveOption-' + document.getElementById("save_form_id").value);
    if(prevSave){
        prevSave.style.background= ''; //Reset background color to css default
    }
    document.getElementById("save_form_id").value = save.id;
    document.getElementById('saveOption-' + save.id).style.background = "#AAA";
}


/* checkForSaves
 * params: adding: boolean signifying whether or not you intend to immediately add save
 */
function checkForSaves(adding){

    console.log('checking...');
    console.log(document.getElementById('prevSavesPane').childNodes.length);
    if(typeof(noSavesDisplay) === 'undefined'){
        noSavesDisplay = false;
    }
    if(noSavesDisplay && adding){
        document.getElementById('prevSavesPane').innerHTML = "";
        noSavesDisplay = false;
    }
    if(!adding && document.getElementById('prevSavesPane').childNodes.length === 1){
        noSavesDisplay = true;
        document.getElementById('prevSavesPane').innerHTML = "<p>No previous saves!<p>";
    }
}

function deleteSave(id){
    var request = $.get("/algorithm/delete?id=" + id, function(data, status){
        var oldDiv = document.getElementById('saveOption-' + id);//$('saveOption-' + id);
        oldDiv.parentNode.removeChild(oldDiv);
        checkForSaves(false);
    })
    .fail(function(){
    });
    console.log(request);
}

function appendSaveOpt(save){
    checkForSaves(true);
    var container = document.createElement('div');
    container.className = 'saveOption';
    container.id = 'saveOption-' + save.id;

    var clearContainer = document.createElement('div');
    clearContainer.className = 'clear';
    container.appendChild(clearContainer);

    var topContainer = document.createElement('div');
    topContainer.className = 'saveControlsBox';

    var loadWheelDiv = document.createElement('div');
    loadWheelDiv.className = 'saveLoadWheelDiv';

    var clearDiv = document.createElement('div');
    clearDiv.className = 'clear';

    var textContainer = document.createElement('div');
    textContainer.className = 'saveTextBox';
    $('<p/>', {
        class: 'saveOptionName',
        text: save.name
    }).appendTo(textContainer);
    $('<p/>', {
        class: 'saveOptionDate',
        text: save.timestamp
    }).appendTo(textContainer);

    textContainer.onclick = function(){
        getSave(save.id, loadWheelDiv);
    };

    topContainer.appendChild(textContainer);
    topContainer.appendChild(loadWheelDiv);
    topContainer.appendChild(clearDiv);

    container.appendChild(topContainer);

    var delButton = $('<button class="deleteButton" onclick="deleteSave(' + save.id + ')">Delete</button>');
    delButton.appendTo(container);

    $("#prevSavesPane").prepend(container);
}

function notLoggedInDialog(){
    $("#notLoggedInDialog").dialog({
        height: 100,
        modal: false,
        dialogClass: 'popupDialogContainer'
    });
}

function saveAsDialog(){
    $("#saveAsDialog").dialog({
            height: 100,
            modal: true,
            open: function(event, ui){
            },
            dialogClass: 'popupDialogContainer'
        });
}

var makeSpinner = function(){
    var opts = {
      lines: 9, // The number of lines to draw
      length: 6, // The length of each line
      width: 2, // The line thickness
      radius: 3, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 68, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1.2, // Rounds per second
      trail: 20, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    //var target = document.getElementById('foo');
    var spinner = new Spinner(opts);//.spin(target);
    return spinner;
};

var getData = function(loadWheelDiv){
    console.log(loadWheelDiv);
    var spinner2 = makeSpinner().spin(loadWheelDiv);
    console.log(spinner2.el);
    loadWheelDiv.appendChild(spinner2.el);

    if (pendingDataRequest){
        pendingDataRequest.abort();
    }
    var request = $.get("/req_data?year=" + $("#season").val() + "&week=" + $("#week").val() , function(data, status){
        currentData = data;
        runUserAlgorithm(currentData);
        spinner2.stop();
    })
    .fail(function(){
        spinner2.stop();
        //getting data failed!
    });
    pendingDataRequest = request;
};





function runUserAlgorithm(data){
    //console.log(data);
    data = JSON.stringify(data);
    var docTop = '<!DOCTYPE html>\n<html lang="en-US">\n\t<head>';
    var dataVar = "\n\t\t<script type='text/javascript'>\n\t\t\t" + "var data = " + data + ";\n\t\t</script>";
    var userFunc = "\n\t\t<script type='text/javascript'>\n\t\t\t" + editor.getValue() + "\n\t\t</script>";
    function displayResults(toDisplay, urlheader){
        for(var i = 0; i < 25; i++){ //toDisplay.length; i++){
            var teamCont = document.createElement('div');
            var logo = document.createElement('img');
            logo.src =  urlheader + '/assets/team_logos/' + toDisplay[i].team_code + '.png';
            logo.width='40';
            teamCont.appendChild(logo);
            teamCont.innerHTML += "<p>" + (i+1) + ': ' + toDisplay[i].name + '</p>' + '</br>' ;//+ '<img alt="maybe" src="http://do-book.stanford.edu:3000/assets/team_logos/' + toDisplay[i].team_code + '.png">';
            document.getElementById("resultsPane").appendChild(teamCont);
        }
    }

    function runFunction(urlheader){
        window.onload = function(){
            var rankArray = remap(data);
            try{
                var toDisplay = main(rankArray);
                displayResults(toDisplay, urlheader);
            }
            catch(err){
                document.getElementById("resultsPane").parentNode.style.background = "#AA0000";
                document.getElementById("resultsPane").innerHTML = "<p>" +  err.toString() + "</br>" + "Check the JS console!</p>";
            }
        };
    }
    var remap = function(jsonData){
        var namesMap = {};
        for(var i = 0; i < jsonData.length; i++){
            namesMap[jsonData[i].name] = jsonData[i];
        }

        for(var i = 0; i < jsonData.length; i++){
            for(var j = 0; j < jsonData[i].schedule.length; j++){
                jsonData[i].schedule[j].opp = namesMap[jsonData[i].schedule[j].opp];
                jsonData[i].schedule[j].team = jsonData[i];
            }
        }
        return jsonData;
    };

    var onloadFunc = "" +
        "\n\t\t<script type='text/javascript'>" +
        "\n\t\t\t var remap = " + remap.toString() +
        "\n\t\t\t var displayResults = " + displayResults.toString() +
        "\n\t\t\t" + runFunction.toString() +
        "\n\t\t\t\t runFunction('" + window.location.protocol + '//' + window.location.host+ "')" +
        "\n\t\t</script>";


    var body = "" +
            "\n\t</head>" +
            "\n\t<body>" +
                "\n\t\t<div id='resultsPane'>" +
                "\n\t\t</div>" +
            "\n\t</body>";
    var close = "\n</html>";

    content = docTop + dataVar + userFunc + onloadFunc + body + close;
    iframeContainer = document.getElementById('rankPane');
    iframe = document.createElement('iframe');
    iframe.id = "resultsPane";
    iframe.src = "data:text/html;charset=utf-8," + escape(content);// 'javascript:window["contents"]';
    iframeContainer.innerHTML = "";
    iframeContainer.appendChild(iframe);
}


/* todo
    X Logos for teams
    * Header logo for site
    * error handling for their bad code
    * about/login/intro links at top of page
    * auto saving? status on saving

    Server:
    X basic caching
    * auto .csv parsing
*/