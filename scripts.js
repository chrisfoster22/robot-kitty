var board = document.getElementsByClassName('board-container')[0];

var levelOne = {
	kittyPlacement: [0, 1],
	robotPlacement: [4, 4],
	board: [['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty']]
}

var levelTwo = {
	kittyPlacement: [0, 1],
	robotPlacement: [4, 4],
	board: [['empty', 'empty', 'empty'], ['empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ["offset 2", "offset-2", "empty", "empty", "empty"], ["offset 2", "offset-2", "empty", "empty", "empty"]]
}

var levels = [levelOne, levelTwo];

function Game(levels) {
	this.levels = levels;
	this.start = start;
	this.generateBoard = generateBoard;

	function start() {
		generateBoard(levels[1].board);
	}

	function generateBoard(mapArray) {
		for (var i = 0; i < mapArray.length; i++) {
			var rowContainer = document.createElement('div');
			rowContainer.classList.add('row-container');
			var row = document.createElement('div');
			row.classList.add('row');
			// board.appendChild(rowContainer);
			board.appendChild(row);
			generateRow(mapArray[i], row);
		}
	}

	function generateRow(innerMapArray, row) {
		var splitString = innerMapArray[0].split(" ");
		if (splitString[0] === "offset") {
			row.classList.add("offset-" + splitString[1]);
			for (var i = 0; i <= splitString.length; i++) {
				var empty = document.createElement("div");
				empty.classList.add("space");
			}
		}
		for (var i = splitString[1] || 0; i < innerMapArray.length; i++) {
			var tile = document.createElement('div');
			tile.classList.add("square", innerMapArray[i]);
			row.appendChild(tile);
		}
	}
}

var myGame = new Game(levels);

myGame.start();
