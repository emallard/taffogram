var player = [];
var colSize = 50;
var rowSize = 50;
var numColumns = 10;
var numRows = 10;
var marginForNumbers = 50;

function init() {
	initPlayer();
	initEvents();
	initTargets();
	draw();
}

function initPlayer() {
	for (var i = 0; i < numRows; ++i) {
		player[i] = [];
		for (var j = 0; j < numColumns; ++j) {
			player[i][j] = 0;
		}
	}
}

function initEvents() {
	var c = document.getElementById("canvas");
	c.addEventListener('mousedown', e => {

		var rect = canvas.getBoundingClientRect()
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;

		x -= marginForNumbers;
		y -= marginForNumbers;

		var i = Math.floor(y / rowSize);
		var j = Math.floor(x / colSize);

		if (i < 0 || i >= numRows)
			return;
		if (j < 0 || j >= numColumns)
			return;

		player[i][j] = 1 - player[i][j];
		draw();
	})
}


function draw() {
	var c = document.getElementById("canvas");

	const ctx = canvas.getContext('2d');

	// set line stroke and line width
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;

	// draw a red line
	ctx.beginPath();

	c.width = 2 * marginForNumbers + numColumns * colSize;
	c.height = 2 * marginForNumbers + numRows * rowSize;

	ctx.clearRect(0, 0, c.width, c.height);

	// lines
	for (var i = 0; i < numColumns + 1; ++i) {
		ctx.moveTo(i * colSize + marginForNumbers, marginForNumbers);
		ctx.lineTo(i * colSize + marginForNumbers, marginForNumbers + numRows * rowSize);
	}


	for (var j = 0; j < numRows + 1; ++j) {
		ctx.moveTo(marginForNumbers, j * rowSize + marginForNumbers);
		ctx.lineTo(marginForNumbers + numColumns * colSize, j * rowSize + marginForNumbers);
	}


	ctx.stroke();

	// blocks
	ctx.fillStyle = 'black';
	for (var i = 0; i < numRows; ++i) {
		for (var j = 0; j < numColumns; ++j) {
			if (player[i][j] == 1) {
				ctx.fillRect(marginForNumbers + j * colSize, marginForNumbers + i * rowSize, colSize, rowSize);
			}
		}
	}

	// numbers
	ctx.font = '15px serif';
	var dx = colSize / 3;
	var dy = rowSize / 4;

	for (var i = 0; i < numRows; ++i) {
		ctx.fillText(targetRows[i], 0 + dx, marginForNumbers + (i + 1) * rowSize - dy);
	}


	for (var j = 0; j < numColumns; ++j) {
		ctx.fillText(targetColumns[j], marginForNumbers + j * colSize + dx, marginForNumbers - dy);
	}

}


var target = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var targetColumns = [];
var targetRows = [];

function initTargets() {

	var count = 0;
	for (var i = 0; i < numRows; ++i) {
		var text = "";
		for (var j = 0; j < numColumns; ++j) {
			if (target[i][j] == 1)
				count++;
			else {
				if (count != 0)
					text += "" + count;
				count = 0;
			}
		}
		targetRows[i] = text;
	}

	var count = 0;
	for (var j = 0; j < numColumns; ++j) {

		var text = "";
		for (var i = 0; i < numRows; ++i) {
			if (target[i][j] == 1)
				count++;
			else {
				if (count != 0)
					text += "" + count;
				count = 0;
			}
		}
		targetColumns[j] = text;
	}
}

