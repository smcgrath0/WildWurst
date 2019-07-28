class FirstTown {
  constructor(options){
    this.options = options;
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
      }
    }
    for (var i = 55; i < 145; i+=25){
      for (var j = 0; j<4; j+=1){
        $(".square:nth-child(" + (i+j) + ") .squareContainer").addClass("backOfTile");
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
