
class GameMaster {
  constructor(){
    this.game = new FirstTown({ height: 25, width: 25 })
    // this.game.boardArray
    console.log(this.game);
    this.game.makeGameBoard();

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
    this.playerBuildingX = 5;
    this.playerBuildingY = 10;
    this.homeCounter = 0;
    this.newBuildingContainer =null;
    this.homePosition = {
      x: [4, 5, 6, 7],
      y: [2, 3, 4, 5],
    }

    //market
    this.marketCounter = 0;
    this.marketPosition = {
      x: [3,17],
      y: [12,17],
    }

    this.player = new Player(this.game.boardArray, this.currentPlayerPosition);
    this.movementAll = this.movementAll.bind(this);
    window.addEventListener('keydown', this.movementAll);

    this.consoleScroll = this.consoleScroll.bind(this);
    this.checkIfPlayerEntersHouse = this.checkIfPlayerEntersHouse.bind(this);
    this.checkIfPlayerLeavesHouse = this.checkIfPlayerLeavesHouse.bind(this);

    // this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX][this.currentPlayerPosition.smallY][this.currentPlayerPosition.smallX].domElement.contents
    this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    $(this.accessCurrentContent).append(this.player.currentPlayer);

  }
  consoleScroll(event){
    console.log(event)
  }
  movementAll(event) {
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
          $(this.accessCurrentContent).append(this.player.currentPlayer);
          this.yScreenCounter += 25;
          $(".gameBoard").css("top", this.yScreenCounter + "px")

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
          this.movementDown();
          $(this.accessCurrentContent).append(this.player.currentPlayer);
          this.yScreenCounter -= 25;
          // console.log(xScreenCounter, yScreenCounter);
          $(".gameBoard").css("top", this.yScreenCounter + "px");
          $(".player").css("background-image", "url('./assets/images/playerImages/NormanWurst-front.png')");
          break;
      }
  }
  movementUp() {
      this.currentPlayerPosition.largeY--;

      //checks for outer walls
      if (this.currentPlayerPosition.largeY < 0) {
        this.currentPlayerPosition.largeY++;
        this.yScreenCounter -= 25;
        return this.currentPlayerPosition.largeY;
      }
      if(!$(".gameContainer").hasClass("hidden")){

        //checks for home building
          if (this.currentPlayerPosition.largeY <= this.homePosition.y[3] && this.currentPlayerPosition.largeX <= this.homePosition.x[3] && this.currentPlayerPosition.largeY >= this.homePosition.y[0] && this.currentPlayerPosition.largeX >= this.homePosition.x[0]) {
            this.currentPlayerPosition.largeY++;
            //door
            if (this.currentPlayerPosition.largeX === this.homePosition.x[2]) {
              this.checkIfPlayerEntersHouse();
              if (!this.homeCounter) {
                this.homeDisplay = new HomeDisplay(this.currentPlayerPosition, this.homePosition);
                this.homeCounter++;
              }
              $(".home").removeClass("hidden");
              this.currentPlayerPosition.largeY = 9;
              this.currentPlayerPosition.largeX = 5;
              this.currentPlayerPosition.largeY--;
              this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents;
              $(".square:nth-child(96)").addClass("door");
              $(".square").removeClass("firstTownSquares");
              $(".square").addClass("homeSquares");

              $("body").css({"zoom": "1.2"})
              return this.currentPlayerPosition.largeX;
            }

            this.yScreenCounter -= 25;
            return this.currentPlayerPosition.largeY
          }

        //checks for market building
        if (this.currentPlayerPosition.largeY <= this.marketPosition.y[1] && this.currentPlayerPosition.largeX <= this.marketPosition.x[1] && this.currentPlayerPosition.largeY >= this.marketPosition.y[0] && this.currentPlayerPosition.largeX >= this.marketPosition.x[0]) {
          this.currentPlayerPosition.largeY++;
          //door
          if (this.currentPlayerPosition.largeX === 10) {
            this.checksIfPlayerEntersMarket();
            if (!this.marketCounter) {
              this.marketDisplay = new MarketDisplay(this.currentPlayerPosition, this.marketPosition);
              this.marketCounter++;
            }
            $(".market").removeClass("hidden");
            this.currentPlayerPosition.largeY = 10;
            this.currentPlayerPosition.largeX = 7;
            this.currentPlayerPosition.largeY--;
            this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents;

            $(".square").removeClass("firstTownSquares");
            $(".square").addClass("marketSquares");
            $(".buildingContainer").css({"width": "100vmax", "height": "100vmax"})
            $("body").css({ "zoom": "0.5" })
            return this.currentPlayerPosition.largeX;
          }

          this.yScreenCounter -= 25;
          return this.currentPlayerPosition.largeY
        }
        // this.yScreenCounter -= 25;
        this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents

      }
      if(!$(".buildingContainer").hasClass("hidden") && !$(".home").hasClass("hidden")){
        if (!$(".market").hasClass("hidden") && $(".buildingContainer > div").hasClass("market")) {
          this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
          return this.currentPlayerPosition
        }
        this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }

      if(!$(".buildingContainer").hasClass("hidden") && !$(".market").hasClass("hidden")){
        if (!$(".home").hasClass("hidden")) {
          this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
          return this.currentPlayerPosition
        }
        this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }
    return this.currentPlayerPosition;
  }
  movementDown() {
    this.currentPlayerPosition.largeY++;

    if (!$(".gameContainer").hasClass("hidden")) {

      //checks for outer walls
      if (this.currentPlayerPosition.largeY >= 25) {
        this.currentPlayerPosition.largeY = 24;
        this.yScreenCounter += 25;
        return this.currentPlayerPosition.largeY;
      }
      //checks for first building
        if (this.currentPlayerPosition.largeY <= this.homePosition.y[3] && this.currentPlayerPosition.largeX <= this.homePosition.x[3] && this.currentPlayerPosition.largeY >= this.homePosition.y[0] && this.currentPlayerPosition.largeX >= this.homePosition.x[0]) {
          this.currentPlayerPosition.largeY--;
          this.yScreenCounter += 25;
          return this.currentPlayerPosition.largeY
        }

      //checks for market building
      if (this.currentPlayerPosition.largeY <= this.marketPosition.y[1] && this.currentPlayerPosition.largeX <= this.marketPosition.x[1] && this.currentPlayerPosition.largeY >= this.marketPosition.y[0] && this.currentPlayerPosition.largeX >= this.marketPosition.x[0]) {
        this.currentPlayerPosition.largeY--;
        this.yScreenCounter += 25;
        return this.currentPlayerPosition.largeX
      }

      this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    if (!$(".buildingContainer").hasClass("hidden") && !$(".home").hasClass("hidden")) {
      if (!$(".market").hasClass("hidden") && $(".buildingContainer > div").hasClass("market")) {
        this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }


      //checks for home outside
      for (var xindex = 0; xindex < 10; xindex++){
        if(this.currentPlayerPosition.largeY === 10 && this.currentPlayerPosition.largeX === 5){
          this.checkIfPlayerLeavesHouse();
          // this.buildingCounter--;
          this.currentPlayerPosition.largeX = 6;
          this.currentPlayerPosition.largeY = 6;
          this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents;
          this.yScreenCounter += 25;
          this.xScreenCounter +=25;
          $(".square:nth-child(96)").removeClass("door")
          $(".square").removeClass("homeSquares")
          $(".square").addClass("firstTownSquares");
          $(".home").addClass("hidden");
          $("body").css({ "zoom": "3" })
          return this.accessCurrentContent;
        }
      }
      //checks for home outer walls
      if (this.currentPlayerPosition.largeY >= 10) {
        this.currentPlayerPosition.largeY--;
        this.yScreenCounter += 25;
        return this.currentPlayerPosition.largeY;
      }
      this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents

    }
    if (!$(".buildingContainer").hasClass("hidden") && !$(".market").hasClass("hidden")) {
      if (!$(".home").hasClass("hidden")) {
        this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }

      //checks for market outer walls
      if (this.currentPlayerPosition.largeY === 15 && this.currentPlayerPosition.largeX === 7) {
        this.checkIfPlayerLeavesHouse();
        // this.buildingCounter--;
        this.currentPlayerPosition.largeX = 20;
        this.currentPlayerPosition.largeY = 20;
        this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents;
        this.yScreenCounter += 25;
        this.xScreenCounter += 25;
        $(".square:nth-child(96)").removeClass("door")
        $(".square").removeClass("homeSquares")
        $(".square").addClass("firstTownSquares");
        $(".home").addClass("hidden");
        $("body").css({ "zoom": "3" })
        return this.accessCurrentContent;
      }

      //checks for outer walls
      if (this.currentPlayerPosition.largeX >= 15) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX;
      }

      this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      return this.currentPlayerPosition
    }
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

    if (!$(".gameContainer").hasClass("hidden")) {

      //checks for first building
      if (this.currentPlayerPosition.largeY <= this.homePosition.y[3] && this.currentPlayerPosition.largeX <= this.homePosition.x[3] && this.currentPlayerPosition.largeY >= this.homePosition.y[0] && this.currentPlayerPosition.largeX >= this.homePosition.x[0]){
        this.currentPlayerPosition.largeX++;
        this.xScreenCounter -= 25;
        return this.currentPlayerPosition.largeX
      }

      //checks for market building
      if (this.currentPlayerPosition.largeY <= this.marketPosition.y[1] && this.currentPlayerPosition.largeX <= this.marketPosition.x[1] && this.currentPlayerPosition.largeY >= this.marketPosition.y[0] && this.currentPlayerPosition.largeX >= this.marketPosition.x[0]) {
        this.currentPlayerPosition.largeX++;
        this.xScreenCounter -= 25;
        return this.currentPlayerPosition.largeX
      }
      this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    if (!$(".buildingContainer").hasClass("hidden") && !$(".home").hasClass("hidden")) {
      if (!$(".market").hasClass("hidden") && $(".buildingContainer > div").hasClass("market")) {
        this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }
      this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      return this.currentPlayerPosition
    }

    if (!$(".buildingContainer").hasClass("hidden") && !$(".market").hasClass("hidden")) {
      if (!$(".home").hasClass("hidden")) {
        this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }
      this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      return this.currentPlayerPosition
    }
    return this.currentPlayerPosition
  }
  movementRight() {

    this.currentPlayerPosition.largeX++;

    if (!$(".gameContainer").hasClass("hidden")) {
      //checks for outer walls
      if (this.currentPlayerPosition.largeX >= 25) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX;
      }

      //checks for first building
      if (this.currentPlayerPosition.largeY <= this.homePosition.y[3] && this.currentPlayerPosition.largeX <= this.homePosition.x[3] && this.currentPlayerPosition.largeY >= this.homePosition.y[0] && this.currentPlayerPosition.largeX >= this.homePosition.x[0]){
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX
      }

      //checks for market building
      if (this.currentPlayerPosition.largeY <= this.marketPosition.y[1] && this.currentPlayerPosition.largeX <= this.marketPosition.x[1] && this.currentPlayerPosition.largeY >= this.marketPosition.y[0] && this.currentPlayerPosition.largeX >= this.marketPosition.x[0]) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX
      }

      this.accessCurrentContent = this.game.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
    }
    if (!$(".buildingContainer").hasClass("hidden") && !$(".home").hasClass("hidden")) {
      if (!$(".market").hasClass("hidden") && $(".buildingContainer > div").hasClass("market")) {
        this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }
      //checks for outer walls
      if (this.currentPlayerPosition.largeX >= 10) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX;
      }

      this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      return this.currentPlayerPosition
    }

    if (!$(".buildingContainer").hasClass("hidden") && !$(".market").hasClass("hidden")) {
      if (!$(".home").hasClass("hidden")) {
        this.accessCurrentContent = this.homeDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
        return this.currentPlayerPosition
      }
      //checks for outer walls
      if (this.currentPlayerPosition.largeX >= 15) {
        this.currentPlayerPosition.largeX--;
        this.xScreenCounter += 25;
        return this.currentPlayerPosition.largeX;
      }
      this.accessCurrentContent = this.marketDisplay.boardArray[this.currentPlayerPosition.largeY][this.currentPlayerPosition.largeX].domElement.contents
      return this.currentPlayerPosition
    }
    return this.currentPlayerPosition;
  }
  checkIfPlayerEntersHouse() {
      $(".gameContainer").addClass("hidden");
      $(".buildingContainer").removeClass("hidden").append(this.homeDisplay);
    }
  checkIfPlayerLeavesHouse(){
    // $(".buildingContainer").remove();
    // this.newBuildingContainer = $("<div>").addClass(".buildingContainer .hidden")
    $(".buildingContainer").addClass("hidden");
    $(".gameContainer").removeClass("hidden").append(this.game)
    $(".gameContainer").append(this.newBuildingContainer);
  }
  checksIfPlayerEntersMarket(){
    $(".gameContainer").addClass("hidden");
    $(".buildingContainer").removeClass("hidden").append(this.marketDisplay);
  }
  checksIfPlayerLeavesMarket(){
    $(".buildingContainer").addClass("hidden");
    $(".gameContainer").removeClass("hidden").append(this.game)
    // $(".gameContainer").append(this.newBuildingContainer);
  }
  }
