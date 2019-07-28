class HomeDisplay {
  constructor(currentPlayerPosition, homePosition){
    this.options= {
      height: 10,
      width: 10
    }
    this.boardArray = [];
    this.currentPlayerPosition = currentPlayerPosition;
    this.house = homePosition;
    console.log(this.boardArray);
    this.hide = this.hide.bind(this);
    this.shadow = $(".buildingContainers");
    this.displayDiv = null;
    // this.message = $(message);
    onClose: null;
    this.createHomeDisplay();
  }
  createHomeDisplay(){
    this.displayDiv = $("<div>").addClass("home");
    $(".buildingContainer").append(this.displayDiv)
    for (this.row = 0; this.row < this.options.height; this.row++) {
      this.boardArray[this.row] = [];
      for (this.col = 0; this.col < this.options.width; this.col++) {
        var location = {
          x: this.col, y: this.row
        }
        var tile = new Tile(location);
        this.boardArray[this.row][this.col] = tile;
        this.tileDomObject = tile.render();
        this.displayDiv.append(this.tileDomObject);
      }
    }
    $(".square").css({"width":"10%","height":"10%","background-color":"green"});
  }
  show() {
    console.log(this.shadow)
    this.shadow.show();
    this.body.show();
    // this.message.show();
  }
  hide() {
    this.shadow.hide();
    this.body.hide();
    // this.message.hide();
  }
  // updateContents(message) {
  //   this.message.text(message);
  // }
  init() {
    this.hide();
    this.shadow.off();
    // $("#modalShadow").on("click", this.hide)

    // $("#modalShadow").on("click", this.onClose)

  }
}
