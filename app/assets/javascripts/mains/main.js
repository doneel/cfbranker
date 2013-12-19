$(document).ready(function(){
	initializeSaveForm();
    initializeSaveAsForm();
	editor = new CodeEditor('codeEditorContainer', 'javascript', saveCode);

	expandingDiv = new ExpandingDiv(document.querySelector('.saveBar'), '0%', '100%', function(){
        editor.resize();
    });

    $(function(){
        $('select').selectric();
    });

    initPausers();
    sm = new SavesManager(document.querySelector('.saveBar'), preLoad, loadSave, saveAs, true, savesArr);

    (function(){
        savePauser = new DivPauser(document.querySelector('.saveList'));
    })();

    cw = document.querySelector('.resultsPanel').contentWindow;
    dm = new DataManager(document.querySelector('#yearBox'), document.querySelector('#weekBox'), numWeeksMap, getData, updateData, remap);

    hD = new MessageButton(document.getElementById('helpIcon'), document.getElementById('helpDialog'), document.getElementById('helpBackground'), 'active');
    iD = new MessageButton(document.getElementById('infoIcon'), document.getElementById('infoDialog'), document.getElementById('infoBackground'), 'active');

    if(!state.signed_in){
        sm.setCanSave(false);
        hD1 = new MessageButton(document.getElementById('newSaveButton'), document.getElementById('loginDialog'), document.getElementById('loginBackground'), 'active');

        hD2 = new MessageButton(document.getElementById('saveButton'), document.getElementById('loginDialog'), document.getElementById('loginBackground'), 'active');

    }
    $('#helpIcon').css('display','block');
   // select the target node


   dataPauser.on();
   $('iframe.resultsPanel').load(function(){
        dm.requestData();
   });

});

var getData = function(optArray, callback){
    dataPauser.on();
    var request = $.get('/req_data?' + 'year=' + optArray[0] + '&week=' + optArray[1], function(data, status){
        callback(data);
    });
};

function initPausers(){
    (function(){
       dataPauser = new DivPauser(document.querySelector('.rightSide'));
       codePauser = new DivPauser(document.querySelector('.workPane'));
    })();
}

function updateData(newData){
    /* Don't switch order */
    //cw.postMessage({newCode: editor.getText(), rawData: newData}, '*');//window.location.protocol + '//' + window.location.host);

    /* Make available to user in teams array */
    teams = dm.updateData(newData);
    dataPauser.off();
    runAlgorithm();
}

function runAlgorithm(){
    cw.postMessage({newCode: editor.getText(), rawData: dm.getRawData()}, '*');//window.location.protocol + '//' + window.location.host);
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


var preLoad = function(){
    (function(){
        codePauser.on();
    })();
};


var loadSave = function(data, status){
    console.log(data);
    codePauser.off();
    editor.loadText(data.code);
    $('#save_form_id').val(data.id);
    runAlgorithm();
};

var saveAs = function(name){
    editor.setDefaultText();
    document.getElementById('saveas_form_name').value = name;
    $('#saveAsForm').submit();
};


function initializeSaveAsForm(){
   $("#saveAsForm")
        .submit(function(){
            savePauser.on();
            document.getElementById('saveas_form_code').value = editor.getText();
            console.log(editor.getText());
            console.log(document.getElementById('saveas_form_code').value);
        })
        .bind('ajax:complete', function(){
            savePauser.off();
        })
        .bind('ajax:success', function(xhr, data, status){
                sm.addEntry(data);
                $('#save_form_id').val(data.id);
        })
        .bind('ajax:failure', function(xhr, status, error){
            console.log('error!: ' + error);
        });
}




/**
 * Set up actions to run when the saveform is submitted.
 */
function initializeSaveForm(){
    var context = this;
    $("#saveForm")
        .submit(function(){
            context.savePauser.on();
        });
    $('#saveForm').bind('ajax:success',function(json){
        context.savePauser.off();
    });
}


/**
 * Checks if the user is signed in and sends the updated text to be saved if they are.
 * @param{String} userText
 */
var saveCode = function(userText){
    /* Ensure user is signed in before trying to save. */
    if(!state.signed_in){
        return false;
    }

    if (typeof userText === 'undefined'){
        userText = editor.getText();
    }

	document.getElementById('save_form_code').value = userText;
    $('#saveForm').submit();
};