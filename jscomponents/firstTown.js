class FirstTown {
  constructor(options, pawnOptions){
    this.options = options;
    this.pawnOptions = pawnOptions;
    this.boardArray = [];
    this.squareArray = [];
    this.realArray = [];
    this.gameBoardDom = $("#gameBoard");
    this.tileDomObject = null;
    this.row = null;
    this.col = null;
    this.makeGameBoard = this.makeGameBoard.bind(this)
  }
  makeGameBoard() {
    for (this.row = 0; this.row < this.options.height; this.row++) {
      this.boardArray[this.row] = [];
      for (this.col = 0; this.col < this.options.width; this.col++) {
        var location = {
          x: this.col, y: this.row
        }
        var tile = new Tile(location);
        this.boardArray[this.row][this.col] = tile;
        this.tileDomObject = tile.render();
        this.gameBoardDom.append(this.tileDomObject);
        // $('.squareContainer').addClass('backOfTile')
        this.makePawnSquares();
      }
    }
    for (var i = 7; i < 20; i+=10){
      for (var j = 0; j<4; j+=2){
        $(".square:nth-child(" + (i+j) + ") .squareContainer").addClass("backOfTile");
      }
    }

  }
  makePawnSquares() {
    for (var row2 = 0; row2 < this.pawnOptions.height; row2++) {
      this.boardArray[this.row][this.col][row2] = [];
      for (var col2 = 0; col2 < this.pawnOptions.width; col2++) {
        var location = {
          x: col2, y: row2
        }
        var square = new Square(location);
        this.boardArray[this.row][this.col][row2][col2] = square;
        var squareDomObject = square.render();
        this.tileDomObject.append(squareDomObject);
      }
    }
  }
}
class Tile {
  constructor(location) {
    this.location = location;
    this.domElement = {
      container: null,
      contents: null
    };
  }
  render() {
    this.domElement.container = $("<div>").addClass('square');
    this.domElement.contents = $("<div>").addClass('squareContainer');
    this.domElement.container.append(this.domElement.contents);
    return this.domElement.container;
  }
}
class Square {
  constructor(location) {
    this.location = location;
    this.domElement = {
      container: null,
      contents: null
    };
  }
  render() {
    this.domElement.container = $("<div>").addClass('pawn');
    this.domElement.contents = $("<div>").addClass('pawnContainer');
    this.domElement.container.append(this.domElement.contents);
    return this.domElement.container;
  }
}
