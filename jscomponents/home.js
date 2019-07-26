class HomeDisplay {
  constructor(boardArray, currentPlayerPosition){
    this.boardArray = boardArray;
    this.currentPlayerPosition = currentPlayerPosition;
    console.log(this.boardArray);
  }
  createHomeDisplay(){
    this.displayDiv = $("<div>").addClass("home");
    $("#buildingContainer").append(this.displayDiv)
  }
}
