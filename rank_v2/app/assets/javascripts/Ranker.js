function loadPage(){
    editor = ace.edit("codeEditor");
    ace.config.set("workerPath", "javascript/ace-builds/src-noconflict");
	editor.getSession().setUseWorker(false);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    var loadWheelDiv = document.getElementById("loadWheelDiv");//$("#loadWheelDiv");

    pendingDataRequest = pendingSaveRequest = null;
    dataCache = {};
//    console.log(loadWheelDiv);
    $("#week").change(function(){
        getData(loadWheelDiv);
    });

    weekSelectOptions = getSelectBoxValues(document.getElementById('week'));
    $("#season").change(function(){
        adjustWeekValue();
        getData(loadWheelDiv);
    });
    adjustWeekValue();


    $(window).resize(function(){
//        $('#interfacePane').css('height', $(window).height() - $('#interfacePane').offset().top);
        $('.mainContentContainer').height($(window).height() - $('.mainContentContainer').offset().top + 25);
        $('.leftContainer').height($(window).height() - $('.leftContainer').offset().top - 10);
        $('#codeEditor').height( $('.leftContainer').height() - $('.bottomBar').height());
        $('.rightContainer').height($(window).height() - $('.rightContainer').offset().top);
        $('.sideContentContainer').height($(window).height() - $('.leftContainer').offset().top - 10);
        console.log("resisizing" + $('#codeEditor').height());
        editor.resize();
        //$('#codeEditor').css('height', $(window).height() - vertSpaceNeeded - 20);
//        document.getElementById('codeEditor').height = $(window).height()/20;
    });
    $(window).resize();

    var lastSaveTime = new Date();
    /* Bind auto-saving */
    editor.getSession().on('change', function(e) {
        // e.type, etc
        var now = new Date();
        if(now.getMinutes() != lastSaveTime.getMinutes()){
            $('#saveForm').submit();
            lastSaveTime = now;
        }
    });

    $("#saveAsForm")
        .submit(function(){
            console.log(document.getElementById("saveas_form_name").value);
            document.getElementById("saveas_form_code").value = editor.getValue();
        })
        .bind('ajax:complete', function(){
        })
        .bind('ajax:success', function(xhr, data, status){
            appendSaveOpt(data);
            //$("#saveAsDialog").dialog('close');
        })
        .bind('ajax:failure', function(xhr, status, error){
            console.log('error!: ' + error);
        });

    $("#saveForm")
        .submit(function(){
            if(state.signed_in === false){
                $("#loginDialog,#loginBackground").toggleClass("active");
                return false;
            }
            document.getElementById('save_form_code').value = editor.getValue();
            $('#saveButton').text('Saving...');
        });
    $('#saveForm').bind('ajax:complete',function(json){
            $('#saveButton').text('Save');
            flashMessage($('#saveButton'), 'Saved!');
    });

    //buildIFrame();
    var savePaneActive = false; //we expand it to start with
    $('#savesPaneContainer').css('width', '75%');
    var savesPaneDefaultWidth = $('#savesPaneContainer').width();
    savePaneActive = showHideSavesContainer(null, savePaneActive, savesPaneDefaultWidth);

    $('#savesPaneContainer').resize(function(){
        alert('resize');
        $('.mainContentContainer').width($('.rightContainer').offset().left - $('.leftContainer').offset().left - $('#savesPaneContainer').width);
    });

    $(document).bind('mousemove',function(e){
        savePaneActive = showHideSavesContainer(e, savePaneActive, savesPaneDefaultWidth);
    });

    $("#loginDialog, #loginBackground").click(function () {
        $("#loginDialog, #loginBackground").toggleClass("active");
    });

    document.getElementById('prevSavesPane').appendChild(getSaveAsBox());

    document.getElementById('helpIcon').style.display = 'block';
    initMessageButton(document.getElementById('helpIcon'), document.getElementById('helpDialog'), document.getElementById('helpBackground'),'active');

    document.getElementById('infoIcon').style.display = 'block';
    initMessageButton(document.getElementById('infoIcon'), document.getElementById('infoDialog'), document.getElementById('infoBackground'),'active');
}

function initMessageButton(domObjButton, messageDiv, backgroundDiv, classToggle){
    $(domObjButton).click(function(){
        $(backgroundDiv).toggleClass(classToggle);
        $(messageDiv).toggleClass(classToggle);
    });

   $(messageDiv).click(function(){
        $(backgroundDiv).toggleClass(classToggle);
        $(messageDiv).toggleClass(classToggle);
        return false;
    });

   $(backgroundDiv).click(function(){
        $(backgroundDiv).toggleClass(classToggle);
        $(messageDiv).toggleClass(classToggle);
        return false;
    });
}

function flashMessage(jqObj, message){
    var prevMess = jqObj.text();
    jqObj.text(message);
    window.setTimeout(function(){
        jqObj.text(prevMess);
    }, 1000);
}

function buildDropDownBoxes(seasonArr, weekArr){
    for(var i = 0; i < seasonArr.length; i++){
       $('#season_dd');
    }
}

function showHideSavesContainer(e, savePaneActive, savesPaneDefaultWidth){
    /* For when page first loads */
    if(e === null){
        e = {};
        e.pageX = 0;
        e.pageY = document.height/2;
    }
    if(!savePaneActive && e.pageX < 20 && e.pageY > document.getElementsByClassName('banner')[0].getBoundingClientRect().bottom){
        $('#savesPaneContainer').animate({width: savesPaneDefaultWidth}, {duration: 300, step: fillWidth});
        savePaneActive = true;
        console.log('filling')
    } else if(savePaneActive && e.pageX - 10 /* a little buffer so it doesn't catch when it's loading */ > document.getElementById('savesPaneContainer').getBoundingClientRect().right && e.pageY > document.getElementsByClassName('banner')[0].getBoundingClientRect().bottom){
        $('#savesPaneContainer').animate({width: 0}, {duration: 300, queue: false, step: fillWidth});
        savePaneActive = false;
        console.log('retracting')
    }
    return savePaneActive;
}

function fillWidth(num, tween){
    $('.mainContentContainer').width($('.rightContainer').offset().left - $('.leftContainer').offset().left - Math.ceil(tween.now));
    editor.resize();
}

function adjustWeekValue(){
    var seasonSelect = document.getElementById("season");
    var weekSelect = document.getElementById('week');
    for(var i = 0; i < weekSelectOptions.length; i++){
        if(weekSelectOptions[i].value > numWeeksMap[seasonSelect.value]){
            weekSelectOptions[i].style.display = 'none';
        }else{
            weekSelectOptions[i].style.display = '';
        }
    }
    if(weekSelect.value > numWeeksMap[seasonSelect.value]){
        weekSelect.value = numWeeksMap[seasonSelect.value];
    }
}

function getSelectBoxValues(selectBox){
    //console.log(selectBox);
    var allOptions = selectBox.children;
    //console.log(allOptions);
    var returnOpts = [];
    for(var i = 0; i < allOptions.length; i++){
        //console.log(allOptions[i].tagName);
        if(allOptions[i].tagName == 'OPTION'){
            returnOpts.push(allOptions[i]);
        }
    }
    //console.log(returnOpts);
    return returnOpts;
}

function saveAsDialouge(){
    if (state.signed_in){
        showSaveAsBox();
    }else{
        var SM = new SimpleModal({"btn_ok":"Alert button"});
        SM.show({
            "title":"Title",
            "contents":"Your message..."
        });
    }
}


function getSaveAsBox(){
    var container = document.createElement('div');
    container.className = 'newSaveOption';

    var textContainer = document.createElement('span');
    var text = $('<p/>', {
        class: 'newSaveTitle',
        text: 'New Save'
    }).appendTo(textContainer);

    var nameInput = document.createElement('input');
    nameInput.className = 'styledTextInput'
    $(nameInput).bind('keypress', function handler(event){
       // if the key is ENTER
       console.log(event.charCode);
            console.log(nameInput);
       if(event.which == 13){
           // your code here
            document.getElementById('saveas_form_name').value = $(nameInput).val();
            console.log($(nameInput).text());
            console.log(document.getElementById('saveas_form_name').value);
            $('#saveAsForm').submit();
            buttonSpan.style.display = '';
            nameInput.style.display = 'none';
       }
    });
    nameInput.style.display = 'none';
    textContainer.appendChild(nameInput);

    textContainer.style.float = 'left';

    container.appendChild(textContainer);
    var buttonSpan = document.createElement('span');
    buttonSpan.style.float = 'right';
    var button = document.createElement('i');
    button.className = 'icon-plus-circled';
    button.className += ' ' + 'bigIcon';

    buttonSpan.appendChild(button);
    container.appendChild(buttonSpan);

    container.onclick = function(){
        if($(nameInput).is(':visible')){
            /* Moved to the enter key handler */
        } else{
            /* Show it! */
            if (state.signed_in){
                showSaveAsBox();
                buttonSpan.style.display = 'none';
                nameInput.style.display = '';
                $(nameInput).focus();
            }else{
                console.log('not loggeed in brah');
                $("#loginDialog,#loginBackground").toggleClass("active");
            }
        }
    };
    console.log(container);
    return container;
}

function getSave(id, requestDiv){

    var spinner2 = makeSpinner().spin(requestDiv);
    requestDiv.appendChild(spinner2.el);
    //console.log(requestDiv);
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
        editor.setValue(unescape("function%20main%28teams%29%7B%0D%0A%20%20%20%20%0D%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0D%0A%20%20%20%20%20%20%20%20opp_wins%20%3D%200%3B%0D%0A%20%20%20%20%20%20%20%20opp_games%20%3D%200%3B%0D%0A%20%20%20%20%20%20%20%20for%28var%20j%20%3D%200%3B%20j%20%3C%20teams%5Bi%5D.schedule.length%3B%20j++%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20opp_wins%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.wins%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20opp_games%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.games%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.opp_wins%20%3D%20opp_wins%3B%0D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.opp_games%20%3D%20opp_games%3B%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%20%0D%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0D%0A%20%20%20%20%20%20%20%20d2_wins%20%3D%200%3B%0D%0A%20%20%20%20%20%20%20%20d2_games%20%3D%200%3B%0D%0A%20%20%20%20%20%20%20%20for%28var%20j%20%3D%200%3B%20j%20%3C%20teams%5Bi%5D.schedule.length%3B%20j++%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20d2_wins%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.opp_wins%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20d2_games%20+%3D%20teams%5Bi%5D.schedule%5Bj%5D.opp.opp_games%3B%0D%0A%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.d2_wins%20%3D%20d2_wins%3B%0D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.d2_games%20%3D%20d2_games%3B%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%20%0D%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0D%0A%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20%3D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%201*teams%5Bi%5D.win_pct%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20+%201*teams%5Bi%5D.opp_wins/teams%5Bi%5D.opp_games%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20+%201*teams%5Bi%5D.d2_wins/teams%5Bi%5D.d2_games%3B%0D%0A%20%20%20%20%20%20%20%20if%28teams%5Bi%5D.fbs%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20*%3D%201.1%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20if%28teams%5Bi%5D.aq%20%7C%7C%20teams%5Bi%5D.name%20%3D%3D%20%22Notre%20Dame%22%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20*%3D%201.1%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20if%28teams%5Bi%5D.win_pct%20%3D%3D%201%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20console.log%28teams%5Bi%5D%29%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%20teams.length%3B%20i++%29%7B%0D%0A%20%20%20%20%20%20%20%20for%28var%20g%20%3D%200%3B%20g%20%3C%20teams%5Bi%5D.schedule.length%3B%20g++%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%28%21teams%5Bi%5D.schedule%5Bg%5D.win%29%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20teams%5Bi%5D.rankPoints%20-%3D%20%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.05%20*%201/teams%5Bi%5D.schedule%5Bg%5D.opp.rankPoints%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20teams.sort%28function%28a%2Cb%29%7B%0D%0A%20%20%20%20%20%20%20%20return%20b.rankPoints%20-%20a.rankPoints%3B%0D%0A%20%20%20%20%7D%29%3B%0D%0A%20%20%20%20%0D%0A%20%20%20%20for%28var%20i%20%3D%200%3B%20i%20%3C%2025%3B%20i++%29%7B%0D%0A%20%20%20%20%20%20%20%20console.log%28teams%5Bi%5D.name%20+%20%27%3A%27%20+%20teams%5Bi%5D.rankPoints%29%3B%0D%0A%20%20%20%20%7D%0D%0A%20%20%20%20return%20teams%3B%0D%0A%7D"), -1);
        getData(loadWheelDiv);
        return;
    }
    $("#saveForm").css('display', 'block');
    editor.setValue(save.code, -1);

    var prevSave = document.getElementById('saveOption-' + document.getElementById("save_form_id").value);
    if(prevSave){
        prevSave.className = 'saveOption'; //style.background= ''; //Reset background color to css default
    }
    document.getElementById("save_form_id").value = save.id;
    document.getElementById('saveOption-' + save.id).className = 'saveOptionLoaded';//style.background = "#AAA";
    getData(loadWheelDiv);
}


/* checkForSaves
 * params: adding: boolean signifying whether or not you intend to immediately add save
 */
function checkForSaves(adding){

    //console.log('checking...');
    //console.log(document.getElementById('prevSavesPane').childNodes.length);
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
    //console.log(request);
}

function appendSaveOpt(save){
    checkForSaves(true);
    var container = document.createElement('div');
    container.className = 'saveOption';
    container.id = 'saveOption-' + save.id;

    var textContainer = document.createElement('div');
    textContainer.className = 'saveOptionLeftBox';
    container.onclick = function(){
        getSave(save.id, loadWheelDiv);
    };

    container.appendChild(textContainer);


    var nameContainer = document.createElement('div');
    $('<p/>', {
        class: 'saveOptionName',
        text: save.name
    }).appendTo(nameContainer);
    textContainer.appendChild(nameContainer);

    var rightBox = document.createElement('div');
    rightBox.className = 'saveOptionRightBox';
    var button = document.createElement('i');
    button.className = 'icon-ios7-trash';
    button.className += ' ' + 'bigIcon';
    button.className += ' ' + 'bigTrashIcon';
    button.onclick = function(event){
        deleteSave(save.id);
        /* Stop propagation */
        event.stopPropagation();
        return false;
    };

    rightBox.appendChild(button);
    container.appendChild(rightBox);

    var dateContainer = document.createElement('div');
    dateContainer.style.float = 'right';
    $('<p/>', {
        class: 'saveOptionDate',
        text: save.timestamp
    }).appendTo(dateContainer);
    textContainer.appendChild(dateContainer);
/*

    var rightSaveDiv = document.createElement('div');




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

    container.onclick = function(){
        getSave(save.id, loadWheelDiv);
    };

    topContainer.appendChild(textContainer);
    topContainer.appendChild(loadWheelDiv);
    topContainer.appendChild(clearDiv);

    container.appendChild(topContainer);

    var delButton = $('<button class="deleteButton" onclick="deleteSave(' + save.id + ')">Delete</button>');
    delButton.appendTo(container);
*/
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
    var userAlgorithm = editor.getValue();

    var season = $("#season").val();
    var week = $("#week").val();
    var rawTeamsData = null;
    if(dataCache[season] && dataCache[season][week]){
        rawTeamsData = dataCache[season][week];
        runUserAlgorithm(userAlgorithm, rawTeamsData);
    }else{
        if(!dataCache[season]){
            dataCache[season] = [];
        }
        makeDataRequest(season, week, loadWheelDiv, userAlgorithm);
    }
};

function makeDataRequest(season, week, loadWheelDiv, userAlgorithm){
    var spinner2 = makeSpinner().spin(loadWheelDiv);
    loadWheelDiv.appendChild(spinner2.el);

    if (pendingDataRequest){
        pendingDataRequest.abort();
    }
    var rawTeamsData = null;
    var request = $.get("/req_data?year=" + season + "&week=" + week , function(data, status){
        rawTeamsData = data;
        spinner2.stop();
        dataCache[season][week] = rawTeamsData;
        runUserAlgorithm(userAlgorithm, rawTeamsData);
    })
    .fail(function(){
        spinner2.stop();
        //getting data failed!
    });

    pendingDataRequest = request;

    return rawTeamsData;
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


function runUserAlgorithm(userAlgorithm, data){
    teams = remap($.extend(true, [], data)); //deep copy of data to be accessible from the console
    if(userAlgorithm === null){
        userAlgorithm = editor.getValue();
    }
    var iframeWin = document.getElementById('resultsPane').contentWindow;
//    console.log(iframeWin);//.contentWindow;
    iframeWin.postMessage({userAlgorithm: userAlgorithm, rawData: data}, window.location.protocol + "//" + window.location.host);
    return;
}

/* todo
    X Logos for teams
    X Header logo for site
    X error handling for their bad code
    * about/login/intro links at top of page
    * auto saving? status on saving Server:
    X basic caching
    X auto .csv parsing
*/


