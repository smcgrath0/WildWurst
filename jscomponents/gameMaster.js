
class GameMaster {
  constructor(){
    this.game = new FirstTown({ height: 25, width: 25 })
    // this.game.boardArray
    console.log(this.game);
    this.game.makeGameBoard();
    this.homePosition = {
      x: [4,5,6,7],
      y: [2,3,4,5],
    }
    //player Position
    this.largeSquareX = 0;
    this.largeSquareY = 0;
    this.currentPlayerPosition = {
      largeX: this.largeSquareX,
      largeY: this.largeSquareY,
    }
    //screen movement with player movement
    this.xScreenCounter = 0;
    this.yScreenCounter = 0;

    //home
    // this.homeDisplay = new HomeDisplay(this.game.boardArray, this.currentPlayerPosition,this.homePosition);
    this.playerBuildingX = 5;
    this.playerBuildingY = 10;
    this.buildingCounter = 0;


    this.player = new Player(this.game.boardArray, this.currentPlayerPosition);
    this.movementAll = this.movementAll.bind(this);
    window.addEventListener('keydown', this.movementAll);
    // .addEventListener()
    // document.addEventListener('scroll', this.consoleScroll);
    // this.movementDown = this.movementDown.bind(this);
    this.movementUp = this.movementUp.bind(this);
    this.consoleScroll = this.consoleScroll.bind(this);
    this.checkIfPlayerEntersHouse = this.checkIfPlayerEntersHouse.bind(this);
    // this.movementLeft = this.movementLeft.bind(this);
    // this.movementRight = this.movementRight.bind(this);
    // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX][this.currentPlayerPosition.smallY][this.currentPlayerPosition.smallX].domElement.contents
    this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    $(this.accessCurrentContent).append(this.player.currentPlayer);

    // this.buildingChecker = {
    //   up: $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).addClass("door zdex"),
    //   down: $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).addClass("door zdex"),
    //   left: $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).addClass("door zdex"),
    //   right: $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).addClass("door zdex")
    // }
  }
  consoleScroll(event){
    console.log(event)
  }
  movementAll(event) {
    // if (this.winTheGame === false) {]
    console.log(event)

      event.preventDefault();
      switch (event.keyCode) {
        case 37:
          this.movementLeft();
          $(this.accessCurrentContent).append(this.player.currentPlayer);
          this.xScreenCounter += 25;
          $(".gameBoard").css("left", this.xScreenCounter + "px")
          // console.log(xScreenCounter, yScreenCounter);
          $(".player").css("background-image", "url('./assets/images/playerImages/NormanWurst-sideL.png')");
          break;
        case 38:
          this.movementUp();
          // if (!$(".gameContainer").hasClass("hidden")){
            $(this.accessCurrentContent).append(this.player.currentPlayer);
            $(".gameBoard").css("top", this.yScreenCounter + "px")
          // }else if($(".gameContainer").hasClass("hidden")){
          //   $(this.homeDisplay.boardArray[this.playerBuildingY][this.playerBuildingX].domElement.contents).append(this.player.currentPlayer);
          // }

          this.yScreenCounter += 25;
          console.log(this.xScreenCounter, this.yScreenCounter);


          $(".player").css("background-image", "url('./assets/images/playerImages/NormanWurst-back.png')");
          break;
        case 39:
          this.movementRight();
          $(this.accessCurrentContent).append(this.player.currentPlayer);
          this.xScreenCounter -= 25;
          console.log(this.xScreenCounter,this.yScreenCounter);
          $(".gameBoard").css("left", this.xScreenCounter + "px");
          $(".player").css("background-image", "url('./assets/images/playerImages/NormanWurst-sideR.png')");
          break;
        case 40:
          // if (
          this.movementDown();
          $(this.accessCurrentContent).append(this.player.currentPlayer);
          this.yScreenCounter -= 25;
          // console.log(xScreenCounter, yScreenCounter);
          $(".gameBoard").css("top", this.yScreenCounter + "px");
          $(".player").css("background-image", "url('./assets/images/playerImages/NormanWurst-front.png')");
          break;
      }
    // // this.checkIfPlayerEntersHouse();
    // if (this.currentPlayerPosition.largeX === 1 && this.currentPlayerPosition.largeY === 1) {
    //   $("#gameContainer").addClass("hidden");
    //   $("#buildingContainer").removeClass("hidden");
    // }
    // // }
  }
  movementUp() {
      this.currentPlayerPosition.largeY--;

      //checks for outer walls
      if (this.currentPlayerPosition.largeY < 0) {
        this.currentPlayerPosition.largeY = 0;
        this.yScreenCounter -= 25;
        return this.currentPlayerPosition.largeY;
      }

      //checks for home building
      for (var xindex = 0; xindex < this.homePosition.x.length; xindex++){
          if (this.currentPlayerPosition.largeY === this.homePosition.y[this.homePosition.y.length-1] && this.currentPlayerPosition.largeX === this.homePosition.x[xindex]) {
            this.currentPlayerPosition.largeY++;
            //door
            if (this.currentPlayerPosition.largeX === this.homePosition.x[2]){
              this.checkIfPlayerEntersHouse();
              if (!this.buildingCounter){
                this.homeDisplay = new HomeDisplay(this.currentPlayerPosition, this.homePosition);
                this.buildingCounter++;
                this.currentPlayerPosition.largeY = 9;
                this.currentPlayerPosition.largeX = 4;
              }
              this.currentPlayerPosition.largeY--;
              this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
              // $().append(this.player.currentPlayer);

              return this.currentPlayerPosition.largeX;
            }

            this.yScreenCounter -= 25;
            return this.currentPlayerPosition.largeY
          }
        }



    // }
    // this.upandDownIndex--;
    // if (this.upandDownIndex <= -1 && this.leftandRightIndex == 2) {
    //   this.largeSquareY--;
    //   if (this.largeSquareY <= -1) {
    //     this.largeSquareY = 0;
    //     ++this.upandDownIndex
    //     return this.largeSquareY;
    //   }
    //   this.upandDownIndex = 3;
    //   this.leftandRightIndex = 2;
    //   this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location;
    //   $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);

    //   this.gameBoard = $(this.doorChecker.up).closest("#gameBoard").find(".square:nth-child(2) .pawn:nth-child(16) .pawnContainer");
    //   $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).addClass("door")
    //   $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).removeClass('backOfTile');
    // } else if (this.upandDownIndex <= -1 && this.leftandRightIndex != 2) {
    //   this.upandDownIndex++
    // } else {
      if(!$(".gameContainer").hasClass("hidden")){
        this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        if (this.currentPlayerPosition.largeY < 0) {
          this.currentPlayerPosition.largeY = 0;
          this.yScreenCounter -= 25;
          return this.currentPlayerPosition.largeY;
        }
      }
      if(!$(".buildingContainer").hasClass("hidden")){
        this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      }
    // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX][this.currentPlayerPosition.smallY][this.currentPlayerPosition.smallX].domElement.contents
    //   $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);
    // }
    // this.stealItem();
    // if (this.currentPosition == game.boardArray[this.randomItemBigIndexY][this.randomItemBigIndexX][this.randomItemLittleIndexY][this.randomItemLittleIndexX].location) {
    //   this.stolenItem1 = true;
    //   console.log("the stolen item1 was picked up", this.stolenItem1);
    //   this.retrieveItem1.addClass("retrieveItem");
    //   $(".item").removeClass("redItem1");
    // }
    // if (this.currentPosition == game.boardArray[this.randomItemBigIndexX][this.randomItemBigIndexY][this.randomItemLittleIndexX][this.randomItemLittleIndexY].location) {
    //   this.stolenItem2 = true;
    //   console.log("the stolen item2 was picked up", this.stolenItem2);
    //   this.retrieveItem2.addClass("retrieveItem");
    //   $(".item").removeClass("redItem2");
    // }
    // if (this.currentPosition === game.boardArray[this.randomExitY][this.randomExitX][this.randomExity][this.randomExitx].location && $("#timer").text() > 1 && this.stolenItem1 == true && this.stolenItem2 == true) {
    //   this.winTheGame = true;
    //   $(".youWin").removeClass('hidden');

    // }
    return this.currentPlayerPosition;
  }
  movementDown() {
      this.currentPlayerPosition.largeY++;

    // //checks for outer walls
    // if (this.currentPlayerPosition.largeY >= 25) {
    //   this.currentPlayerPosition.largeY = 24;
    //   this.yScreenCounter += 25;
    //   return this.currentPlayerPosition.largeY;
    // }

      //checks for first building
    for (var xindex = 0; xindex < this.homePosition.x.length; xindex++) {
      if (this.currentPlayerPosition.largeY === this.homePosition.y[0] && this.currentPlayerPosition.largeX === this.homePosition.x[xindex]) {
        this.currentPlayerPosition.largeY--;
        this.yScreenCounter += 25;
        return this.currentPlayerPosition.largeY
      }
    }
    // }
  //   if (this.upandDownIndex >= 4 && this.leftandRightIndex == 2) {
  //     this.largeSquareY++;
  //     if (this.largeSquareY >= 3) {
  //       this.largeSquareY = 2;
  //       --this.upandDownIndex
  //       return this.largeSquareY;
  //     }
  //     this.upandDownIndex = 0;
  //     this.leftandRightIndex = 2;
  //     this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location;
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);

  //     this.gameBoard = $(this.doorChecker.down).closest("#gameBoard").find(".square:nth-child(8) .pawn:nth-child(4) .pawnContainer");
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).addClass("door")
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).removeClass('backOfTile');
  //   } else if (this.upandDownIndex >= 4 && this.leftandRightIndex != 2) {
  //     this.upandDownIndex--;
  //   } else {
    if (!$(".gameContainer").hasClass("hidden")) {

      //checks for outer walls
      if (this.currentPlayerPosition.largeY >= 25) {
        this.currentPlayerPosition.largeY = 24;
        this.yScreenCounter += 25;
        return this.currentPlayerPosition.largeY;
      }

      this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    if (!$(".buildingContainer").hasClass("hidden")) {

      //checks for outer walls
      if (this.currentPlayerPosition.largeY >= 10) {
        this.currentPlayerPosition.largeY = 9;
        this.yScreenCounter += 25;
        return this.currentPlayerPosition.largeY;
      }

      this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
  // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX][this.currentPlayerPosition.smallY][this.currentPlayerPosition.smallX].domElement.contents
  //     this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);
  //   }
  //   // this.stealItem();
  //   if (this.currentPosition == game.boardArray[this.randomItemBigIndexY][this.randomItemBigIndexX][this.randomItemLittleIndexY][this.randomItemLittleIndexX].location) {
  //     this.stolenItem1 = true;
  //     console.log("the stolen item1 was picked up", this.stolenItem1);
  //     this.retrieveItem1.addClass("retrieveItem");
  //     $(".item").removeClass("redItem1");
  //   }
  //   if (this.currentPosition == game.boardArray[this.randomItemBigIndexX][this.randomItemBigIndexY][this.randomItemLittleIndexX][this.randomItemLittleIndexY].location) {
  //     this.stolenItem2 = true;
  //     console.log("the stolen item2 was picked up", this.stolenItem2);
  //     this.retrieveItem2.addClass("retrieveItem");
  //     $(".item").removeClass("redItem2");
  //   }
  //   if (this.currentPosition === game.boardArray[this.randomExitY][this.randomExitX][this.randomExity][this.randomExitx].location && $("#timer").text() > 1 && this.stolenItem1 == true && this.stolenItem2 == true) {
  //     this.winTheGame = true;
  //     $(".youWin").removeClass('hidden');

  //   }
    return this.currentPlayerPosition;
  }
  movementLeft() {
      this.currentPlayerPosition.largeX--;

      //checks for outer walls
      if (this.currentPlayerPosition.largeX < 0) {
        this.currentPlayerPosition.largeX = 0;
        this.xScreenCounter -= 25;
        return this.currentPlayerPosition.largeX;
      }

    //checks for first building
    for (var yindex = 0; yindex < this.homePosition.y.length; yindex++) {
      if (this.currentPlayerPosition.largeX === this.homePosition.x[this.homePosition.x.length - 1] && this.currentPlayerPosition.largeY === this.homePosition.y[yindex]) {
        this.currentPlayerPosition.largeX++;
        this.xScreenCounter -= 25;
        return this.currentPlayerPosition.largeX
      }
    }
    // }
  //   if (this.leftandRightIndex <= -1 && this.upandDownIndex == 1) {
  //     this.largeSquareX--;
  //     if (this.largeSquareX <= -1) {
  //       this.largeSquareX = 0;
  //       ++this.leftandRightIndex
  //       return this.largeSquareY;
  //     };
  //     this.upandDownIndex = 1;
  //     this.leftandRightIndex = 3;
  //     this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location;
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);

  //     this.gameBoard = $(this.doorChecker.left).closest("#gameBoard").find(".square:nth-child(4) .pawn:nth-child(9) .pawnContainer");
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).addClass("door");
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).removeClass('backOfTile');
  //   } else if (this.leftandRightIndex <= -1 && this.upandDownIndex != 1) {
  //     this.leftandRightIndex++;
  //   } else {
    if (!$(".gameContainer").hasClass("hidden")) {
      this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    if (!$(".buildingContainer").hasClass("hidden")) {
      this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX][this.currentPlayerPosition.smallY][this.currentPlayerPosition.smallX].domElement.contents
  //     this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location;
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);
  //   }
  //   // this.stealItem();
  //   if (this.currentPosition == game.boardArray[this.randomItemBigIndexY][this.randomItemBigIndexX][this.randomItemLittleIndexY][this.randomItemLittleIndexX].location) {
  //     this.stolenItem1 = true;
  //     console.log("the stolen1 item was picked up", this.stolenItem1);
  //     this.retrieveItem1.addClass("retrieveItem");
  //     $(".item").removeClass("redItem1");
  //   }
  //   if (this.currentPosition == game.boardArray[this.randomItemBigIndexX][this.randomItemBigIndexY][this.randomItemLittleIndexX][this.randomItemLittleIndexY].location) {
  //     this.stolenItem2 = true;
  //     console.log("the stolen item2 was picked up", this.stolenItem2);
  //     this.retrieveItem2.addClass("retrieveItem");
  //     $(".item").removeClass("redItem2");
  //   }
  //   if (this.currentPosition === game.boardArray[this.randomExitY][this.randomExitX][this.randomExity][this.randomExitx].location && $("#timer").text() > 1 && this.stolenItem1 == true && this.stolenItem2 == true) {
  //     this.winTheGame = true;
  //     $(".youWin").removeClass('hidden');

  //   }
    return this.currentPlayerPosition
  }
  movementRight() {

      this.currentPlayerPosition.largeX++;

    // //checks for outer walls
    // if (this.currentPlayerPosition.largeX >= 25) {
    //   this.currentPlayerPosition.largeX--;
    //   this.xScreenCounter += 25;
    //   return this.currentPlayerPosition.largeX;
    // }

    //checks for first building
    for (var yindex = 0; yindex < this.homePosition.y.length; yindex++) {
      if (this.currentPlayerPosition.largeX === this.homePosition.x[0] && this.currentPlayerPosition.largeY === this.homePosition.y[yindex]) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX
      }
    }



  //     this.upandDownIndex = 1;
  //     this.currentPlayerPosition.smallX = 0;
  //     this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location;
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);

  //     this.gameBoard = $(this.doorChecker.right).closest("#gameBoard").find(".square:nth-child(6) .pawn:nth-child(6) .pawnContainer");
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).addClass("door");
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX].domElement.contents).removeClass('backOfTile');
  //   } else if (this.leftandRightIndex >= 4 && this.upandDownIndex != 1) {
  //     this.leftandRightIndex--;
  //   } else {
    if (!$(".gameContainer").hasClass("hidden")) {
      //checks for outer walls
      if (this.currentPlayerPosition.largeX >= 25) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX;
      }


      this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    if (!$(".buildingContainer").hasClass("hidden")) {

      //checks for outer walls
      if (this.currentPlayerPosition.largeX >= 10) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX;
      }

      this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX][this.currentPlayerPosition.smallY][this.currentPlayerPosition.smallX].domElement.contents
  //     this.currentPosition = game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].location;
  //     $(game.boardArray[this.largeSquareY][this.largeSquareX][this.upandDownIndex][this.leftandRightIndex].domElement.contents).append(this.player);
  //   }
  //   // this.stealItem();
  //   if (this.currentPosition == game.boardArray[this.randomItemBigIndexY][this.randomItemBigIndexX][this.randomItemLittleIndexY][this.randomItemLittleIndexX].location) {
  //     this.stolenItem1 = true;
  //     console.log("the stolen1 item was picked up", this.stolenItem1);
  //     this.retrieveItem1.addClass("retrieveItem");
  //     $(".item").removeClass("redItem1");
  //   }
  //   if (this.currentPosition == game.boardArray[this.randomItemBigIndexX][this.randomItemBigIndexY][this.randomItemLittleIndexX][this.randomItemLittleIndexY].location) {
  //     this.stolenItem2 = true;
  //     console.log("the stolen item2 was picked up", this.stolenItem2);
  //     this.retrieveItem2.addClass("retrieveItem");
  //     $(".item").removeClass("redItem2");
  //   }
  //   if (this.currentPosition === game.boardArray[this.randomExitY][this.randomExitX][this.randomExity][this.randomExitx].location && $("#timer").text() > 1 && this.stolenItem1 == true && this.stolenItem2 == true) {
  //     this.winTheGame = true;
  //     $(".youWin").removeClass('hidden');

  //   }
    return this.currentPlayerPosition;
  }
  checkIfPlayerEntersHouse() {
      $(".gameContainer").addClass("hidden");

      $(".buildingContainer").removeClass("hidden").append(this.homeDisplay);
    }
  }
