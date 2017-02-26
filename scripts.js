var board = document.getElementsByClassName('board-container')[0];

var levelOne = {
	kittyPlacement: [0, 1],
	robotPlacement: [4, 4],
	board: [['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty']]
}

var levelTwo = {
	kittyPlacement: [1, 1],
	robotPlacement: [4, 4],
	board: [['empty', 'empty', 'empty'], ['empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ["offset 2", "offset-2", "empty", "empty", "empty"], ["offset 2", "offset-2", "empty", "empty", "empty"]]
}

var levels = [levelOne, levelTwo];

function Game(levels, robot, kitty) {
	this.levels = levels;
	this.start = start;
	this.generateBoard = generateBoard;

	function start() {
		generateBoard(levels[1]);
		// place(robot);
		// place(kitty);
	}

	function generateBoard(level) {
		for (var i = 0; i < level.board.length; i++) {
			var row = document.createElement('div');
			row.classList.add('row');
			board.appendChild(row);
			generateRow(level.board[i], row);
		}

		[robot, kitty].map(function(robotOrKitty) {
			place(robotOrKitty, level);
		});

	}

	function place(robotOrKitty, level) {
		robotOrKitty.coords = level[robotOrKitty.name + "Placement"];
		var placeRow = robotOrKitty.coords[0];
		var placeColumn = robotOrKitty.coords[1];
		var robotOrKittyDiv = document.createElement("div");
		robotOrKittyDiv.classList.add(robotOrKitty.name);
		document.getElementsByClassName("row")[placeRow].getElementsByTagName("div")[placeColumn].append(robotOrKittyDiv);
		robotOrKitty.element = robotOrKittyDiv;
	}

	function generateRow(innerMapArray, row) {
		var splitString = innerMapArray[0].split(" ");
		if (splitString[0] === "offset") {
			row.classList.add("offset-" + splitString[1]);
			for (var i = 0; i < splitString.length; i++) {
				var space = document.createElement("div");
				space.classList.add("space");
				row.append(space);
			}
		}
		for (var i = splitString[1] || 0; i < innerMapArray.length; i++) {
			var tile = document.createElement('div');
			tile.classList.add("square", innerMapArray[i]);
			row.appendChild(tile);
		}
	}
}

function Robot() {
	this.name = "robot";
	this.move = move;

	function move(direction, amount) {
		console.log(this.element.style[direction]);
		this.element.style[direction] = -(amount * 75 + (amount * 2)) + "px";
	}
}

function Kitty() {
	this.name = "kitty";
}

var robot = new Robot();
var kitty = new Kitty();

var myGame = new Game(levels, robot, kitty);

myGame.start();
