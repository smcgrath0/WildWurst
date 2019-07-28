class HomeDisplay {
  constructor(boardArray, currentPlayerPosition, homePosition){
    this.boardArray = boardArray;
    this.currentPlayerPosition = currentPlayerPosition;
    this.house = homePosition;
    console.log(this.boardArray);
    this.hide = this.hide.bind(this);
    this.shadow = $("#buildingContainers");
    this.displayDiv = null;
    // this.message = $(message);
    onClose: null;
    this.createHomeDisplay();
  }
  createHomeDisplay(){
    this.displayDiv = $("<div>").addClass("home");
    $("#buildingContainer").append(this.displayDiv)
    // console.log(this.boardArray)
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
    $("#modalShadow").on("click", this.hide)

    $("#modalShadow").on("click", this.onClose)

  }
}
