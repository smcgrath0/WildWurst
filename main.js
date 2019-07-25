$(document).ready(initializeApp);

// var tileConfig = {
//   height: 3,
//   width: 3,
// }
// var squareConfig = {
//   height: 4,
//   width: 4
// }
function initializeApp(){
  var game = new firstTown({height: 5,width:5},{height:5,width:5});
  console.log(game);
  game.makeGameBoard();
}
