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

var levelThree = {
	kittyPlacement: [2, 2],
	robotPlacement: [4, 0],
	board: [['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'mountain', 'mountain', 'mountain', 'empty'], ['empty', 'empty', 'empty', 'mountain', 'empty'], ['mountain', 'mountain', 'mountain', 'mountain', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty']]
}

var levelFour = {
	kittyPlacement: [0, 1],
	robotPlacement: [4, 4],
	board: [['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ["river", "river", "river", "river", "river"], ["empty", "empty", "empty", "empty", "empty"]]
}

var levelFive = {
	kittyPlacement: [0, 1],
	robotPlacement: [4, 4],
	board: [['empty', 'empty', 'empty', 'empty', 'empty'], ["river", "river", "river", "river", "river"], ['empty', 'empty', 'empty', 'empty', 'empty'], ["river", "river", "river", "river", "river"], ["empty", "empty", "empty", "empty", "empty"]]
}

var levelSix = {
	kittyPlacement: [4, 0],
	robotPlacement: [0, 4],
	board: [['mountain', 'mountain', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['empty', 'empty', 'empty', 'empty', 'empty'], ['river', 'river', 'empty', 'empty', 'empty'], ['empty', 'mountain', 'mountain', 'empty', 'empty']]
}


var levels = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix];

function Game(levels, robot, kitty) {
	this.levels = levels;
	this.start = start;
	this.generateBoard = generateBoard;

	function start() {
		generateBoard(levels[2]);
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
		var robotOrKittySpan = document.createElement("span");
		robotOrKittySpan.classList.add(robotOrKitty.name);
		document.getElementsByClassName("row")[placeRow].getElementsByTagName("div")[placeColumn].append(robotOrKittySpan);
		robotOrKitty.element = robotOrKittySpan;
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
	this.element,
	this.coords;

	this.move = move;

	function move(direction, amount) {
		var currentLeft = parseInt(this.element.style["left"].split("px")[0]) || 0;
		var currentTop = parseInt(this.element.style["top"].split("px")[0]) || 0;
		switch(direction) {
			case "left":
			console.log(this.coords[1] - amount)
				for (var i = this.coords[1] - 1; i > this.coords[1] - 1 - amount; i-- ) {
					var checkSquare = document.getElementsByClassName("row")[this.coords[0]].getElementsByTagName("div")[i];
					if (!checkSquare || !checkSquare.classList.contains("empty")) {
						alert("Sorry");
						return;
					}

				}
				this.element.style["left"] = currentLeft - (amount * 75 + (amount * 2)) + "px";
				console.log(this.element.style["left"])
				this.coords[1] -= amount;
				break;
			case "right":
				for (let i = this.coords[1] + 1; i < this.coords[1] + 1 + amount; i++ ) {

					let checkSquare = document.getElementsByClassName("row")[this.coords[0]].getElementsByTagName("div")[i];
					if (!checkSquare || !checkSquare.classList.contains("empty")) {
						alert("Sorry");
						return;
						break;
					}

				}
				this.element.style["left"] = currentLeft + (amount * 75 + (amount * 2)) + "px";
				this.coords[1] += amount;
				break;
			case "up":
				for (var i = this.coords[0] - 1; i > this.coords[0] - 1 - amount; i-- ) {
					let checkRow = document.getElementsByClassName("row")[i];
					console.log(checkRow);
					if (checkRow) {
						let checkSquare = checkRow.getElementsByTagName("div")[this.coords[1]];
							if (!checkSquare || !checkSquare.classList.contains("empty")) {
								alert("Sorry");
								return;
							}
						} else {
						alert("Sorry");
						return;
					}
				}
				this.element.style["top"] = currentTop - (amount * 75 + (amount * 2)) + "px";
				this.coords[0] -= amount;
				break;
			case "down":
				for (var i = this.coords[0] + 1; i < this.coords[0] + 1 + amount; i++ ) {
					let checkRow = document.getElementsByClassName("row")[i];
					console.log(checkRow);
					if (checkRow) {
						let checkSquare = checkRow.getElementsByTagName("div")[this.coords[1]];
							if (!checkSquare || !checkSquare.classList.contains("empty")) {
								alert("Sorry");
								return;
							}
						} else {
						alert("Sorry");
						return;
					}
				}
				this.element.style["top"] = currentTop + (amount * 75 + (amount * 2)) + "px";
				this.coords[0] += amount;
				break;
		}
	}
}

function Kitty() {
	this.name = "kitty";
}

function initializeListeners() {
	document.getElementsByClassName('add-line')[0].addEventListener("click", addLine);
	document.getElementsByClassName('go-btn')[0].addEventListener("click", checkCommands);
	var commandDiv = document.getElementsByClassName("command")[0];
	enterAddLine(commandDiv);
	commandDiv.focus();
}

function addLine() {
	var newLine = document.createElement("div");
	newLine.contentEditable = "true";
	newLine.classList.add("command");
	document.getElementsByClassName("command-input-container")[0].append(newLine);
	enterAddLine(newLine);
	newLine.focus();
}

function checkCommands() {
	var commands = document.getElementsByClassName("command");
	for (let i = 0; i < commands.length; i++) {
		console.log(commands[i].innerHTML);
	}
}

function enterAddLine(commandDiv) {
	commandDiv.addEventListener("keypress", function(event) {
		var keyCode = event.which || event.keyCode;
		if (keyCode === 13) {
			event.preventDefault();
			addLine();
		}
	})
}

var robot = new Robot();
var kitty = new Kitty();

var myGame = new Game(levels, robot, kitty);

myGame.start();
initializeListeners();
