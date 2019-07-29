class Player {
  constructor(boardArray,currentPosition){
    this.boardArray = boardArray;
    console.log(boardArray, currentPosition)
    this.currentPosition = currentPosition
    this.bigX = this.currentPosition.largeX;
    this.bigY = this.currentPosition.largeY;
    console.log(this.bigX)
    this.currentPlayer = $("<div>").addClass("player");

    // $(this.boardArray[this.bigY][this.bigX][this.smallY][this.smallX].domElement.contents).append(this.currentPlayer);
  }

  updatePlayerVisuals(){
    this.current
  }

}
