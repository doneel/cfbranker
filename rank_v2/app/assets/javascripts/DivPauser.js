function DivPauser(div){
	this.div = div;

	this.isOn = false;
}

DivPauser.prototype.on = function(){
	if(this.isOn){
		return;
	}

	this.cover = document.createElement('div');
	this.cover.className = 'cover';

	$(this.div).css('position', 'relative');

	$(this.cover).css('position', 'absolute');
	$(this.cover).css('top', '0');
	$(this.cover).css('width', '100%');
	$(this.cover).css('height', '100%');
	$(this.cover).css('background', 'rgba(100, 100, 100, .3)');

	this.spinner = this.makeSpinner();
	this.spinner.spin(this.div);

	this.div.appendChild(this.cover);
	this.isOn = true;
};

DivPauser.prototype.off = function(){
	if(!this.isOn){
		return;
	}
	$(this.div).css('position', '');

	this.spinner.stop();
	this.div.removeChild(this.cover);

	this.isOn = false;

};

DivPauser.prototype.makeSpinner = function(){

	var dim = $(this.div).width();
	if($(this.div).height() < dim){
		dim = $(this.div).height();
	}
    var opts = {
		lines: 9, // The number of lines to draw
		length: dim/8, // The length of each line
		width: dim/40, // The line thickness
		radius: dim/20, // The radius of the inner circle
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

	var spinner = new Spinner(opts);//.spin(target);
	return spinner;

};