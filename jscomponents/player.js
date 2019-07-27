class Player {
  constructor(boardArray,currentPosition){
    this.boardArray = boardArray;
    console.log(boardArray, currentPosition)
    this.currentPosition = currentPosition
    this.bigX = this.currentPosition.largeX;
    this.bigY = this.currentPosition.largeY;
    this.smallX = this.currentPosition.smallX;
    this.smallY = this.currentPosition.smallY;
    console.log(this.bigX)
    this.currentPlayer = $("<div>").addClass("player");
    this.currentImage = this.currentPlayer.css("background-image");
    // $(this.boardArray[this.bigY][this.bigX][this.smallY][this.smallX].domElement.contents).append(this.currentPlayer);
  }

  updatePlayerVisuals(){
    this.current
  }

}
