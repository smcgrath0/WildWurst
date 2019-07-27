class HomeDisplay {
  constructor(boardArray, currentPlayerPosition){
    this.boardArray = boardArray;
    this.currentPlayerPosition = currentPlayerPosition;
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

class Modal {
  //constructor takes in 3 arguments: the modal shadow dom element, the modal body dom element, and the modal message dom element
  //Modal will have a property called onClose that will eventually be set to a callback set by the outside
  constructor(shadow, body, message) {

  }
  //takes in no arguments.
  //returns nothing
  //shows the given modal shadow and the given modal body

  //takes in no arguments
  //returns nothing
  //hides the given modal shadow and the given modal body

  //takes in a string that it then puts inside the text of the modal message element
  //returns nothing

  //takes in no arguments
  //returns nothing
  //hides the modal, removes all existing click handlers from the modal shadow
  //and adds 2 click handlers to the modal shadow:
  //one that calls whatever callback was assigned to this object's onClose handler
  //calls this object's hide method.  Make sure to use bind to make it correctly bind to the object
  //this.FUNCTIONNAME.bind( this )
  //otherwise it won't work correctly


}
