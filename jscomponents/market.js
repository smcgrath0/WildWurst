class MarketDisplay {
  constructor(currentPlayerPosition, marketPosition) {
    this.options = {
      height: 6,
      width: 14
    }
    this.boardArray = [];
    this.currentPlayerPosition = currentPlayerPosition;
    this.MarketDisplay = marketPosition;
    console.log(this.boardArray);
    this.hide = this.hide.bind(this);
    this.shadow = $(".buildingContainers");
    this.displayDiv = null;
    // this.message = $(message);
    onClose: null;
    this.createMarketDisplay();
  }
  createMarketDisplay() {
    this.displayDiv = $("<div>").addClass("market");
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
