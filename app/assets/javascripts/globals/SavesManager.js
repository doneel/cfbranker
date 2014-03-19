function SavesManager(containingDiv, preLoadFunction, postLoadFunction, saveAsFunction, canSaveFlag, initialList){
	this.div = containingDiv;
	this.canSaveFlag = canSaveFlag;
	this.preLoadFunction = preLoadFunction;
	this.postLoadFunction = postLoadFunction;
	this.saveAsFunction = saveAsFunction;

	this.initAreas();

	if (!(typeof initialList === 'undefined')){
		for(var i = 0; i < initialList.length; i++){
			this.addEntry(initialList[i]);
		}
	}
	$(this.savesList.firstChild).trigger('click');

	this.displayingNewSave = false;
}

SavesManager.prototype.canSave = function(){
	return this.canSaveFlag;
};

SavesManager.prototype.setCanSave = function(flag){
	this.canSaveFlag = flag;
};

SavesManager.prototype.initAreas = function(){
	this.div.style.position = 'relative';

	this.appendNewButton();


	this.savesList = document.createElement('div');
	this.savesList.className = 'saveList'

	this.sLWrapper = document.createElement('div');
	this.sLWrapper.appendChild(this.savesList);
	this.sLWrapper.className = 'saveListWrapper'

	this.div.appendChild(this.sLWrapper);

};

SavesManager.prototype.createNewSave = function(){
	/* We're already showing this, don't show multiple */
	if(this.displayingNewSave || !this.canSaveFlag) return;

	this.displayingNewSave = true;

	var newDiv = document.createElement('div');
	newDiv.className = 'newSaveEntryButton';
	$(newDiv).css('position', 'absolute');
	$(newDiv).css('bottom', '1px');

	var newName = document.createElement('input');
	newName.className = 'saveEntryNewName';

	var context = this;
	newName.onkeydown = function(event){
		/* Only do this if they hit enter */
		if (event.keyCode != 13) return;

		context.saveAsFunction($(newName).val());
		newDiv.parentNode.removeChild(newDiv);
		context.displayingNewSave = false;
		document.querySelector('#newSaveButton').style.display = '';
	};

	newDiv.appendChild(newName);
	this.div.insertBefore(newDiv, document.querySelector('#newSaveButton'));
	document.querySelector('#newSaveButton').style.display = 'none';

	newName.focus();
};

SavesManager.prototype.appendNewButton = function(){
	var newDiv = document.createElement('div');
	newDiv.className = 'newSaveEntryButton';
	newDiv.id = 'newSaveButton';
	$(newDiv).css('bottom', '1px');
	$(newDiv).css('position', 'absolute');

	var context = this;
	newDiv.onclick = function(){context.createNewSave();}

	var newSaveName = document.createElement('p');
	newSaveName.innerHTML = 'New Save';
	newSaveName.className = 'newSaveName';

	var newSaveIcon = document.createElement('i');
	newSaveIcon.className = 'icon-plus-circled newSaveIcon';

	newDiv.appendChild(newSaveName);
	newDiv.appendChild(newSaveIcon);

	this.div.appendChild(newDiv);

};

SavesManager.prototype.setSelected = function(div){
	$(this.currentSelected).removeClass('selected');
	$(div).addClass('selected');

	this.currentSelected = div;
};

SavesManager.prototype.addEntry = function(entryData){
	var context = this;
	var loadFunc = function(){
		context.preLoadFunction();
		context.setSelected(this);
		$.get(entryData.load_url, function(data, status){
			context.postLoadFunction(data, status);
		});
	};


	var container = $('<div/>', {
		class: 'saveEntry',
		click: loadFunc
	});

	$('<p/>', {
		class: 'saveEntryName',
		text: entryData.name
	}).appendTo(container);

	$('<p/>', {
		class: 'saveEntryDate',
		text: entryData.timestamp
	}).appendTo(container);

	var delFunc = function(event){
		$.get(entryData.delete_url, function(data, status){
			var prev = container[0].previousSibling;
			if(!prev){
				prev = container[0].nextSibling;
			}
			container[0].parentNode.removeChild(container[0]);
			$(prev).trigger('click');
		});
		event.stopPropagation();

	};

	$('<i/>', {
		class: 'icon-ios7-trash bigTrashIcon',
		click: delFunc
	}).appendTo(container);


	$(this.savesList).prepend(container[0]);
	this.setSelected(container[0]);
};
