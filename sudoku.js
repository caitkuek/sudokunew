
let numSelected = "";

const game = {
  puzzle1: [
    ["?", "8", "?", "7", "?", "1", "?", "3", "?"],
    ["4", "?", "9", "?", "?", "?", "?", "?", "?"],
    ["?", "5", "?", "?", "6", "?", "4", "1", "8"],
    ["7", "?", "?", "?", "?", "9", "?", "?", "?"],
    ["8", "?", "?", "6", "1", "?", "5", "?", "?"],
    ["?", "3", "5", "?", "?", "?", "?", "2", "9"],
    ["?", "6", "?", "4", "?", "7", "?", "9", "?"],
    ["1", "?", "?", "?", "?", "8", "?", "?", "4"],
    ["?", "2", "?", "?", "5", "?", "?", "7", "?"],
  ],
  solution1: [
    ["2", "8", "6", "7", "4", "1", "9", "3", "5"],
    ["4", "1", "9", "3", "8", "5", "7", "6", "2"],
    ["3", "5", "7", "9", "6", "2", "4", "1", "8"],
    ["7", "4", "1", "5", "2", "9", "3", "8", "6"],
    ["8", "9", "2", "6", "1", "3", "5", "4", "7"],
    ["6", "3", "5", "8", "7", "4", "1", "2", "9"],
    ["5", "6", "8", "4", "3", "7", "2", "9", "1"],
    ["1", "7", "3", "2", "9", "8", "5", "6", "4"],
    ["9", "2", "4", "1", "5", "6", "8", "7", "3"],
  ],
};
let tileID = "";

// creates the 9x9 sudoku grid & appends it to the puzzle class
const setBoard = () => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      tileID = [r] + "-" + [c];
      $tile = $("<div>").addClass("tile").attr("id", tileID);
      $tile.on("click", selectNumButt);
        // console.log(tileID
    
    // puzzle to show up once game has started
        if (game.puzzle1[r][c] !== "?") {
            $tile.text(game.puzzle1[r][c]);
            $tile.addClass("tile-start")
        }

        if (r === 2 || r === 5) {
            $tile.addClass("horizontal")
        }
        if (c === 2 || c === 5) {
            $tile.addClass("vertical")
        }

      $(".puzzle").append($tile);
    }
  }
  // to have nums show up on tile  
  $(".tile").on("click", function(){
    $(this).text(numSelected)
    })
};

// creates buttons 1 - 9
const setButts = () => {
  for (let i = 1; i <= 9; i++) {
    const buttonID = [i];
    const $numSelect = $("<button>")
      .addClass("number")
      .attr("id", buttonID)
      .text(i);

    $numSelect.on("click", selectNumButt); // to click the button!

    $(".num-butts").append($numSelect);
  }
};

// select numbers - make sure no double clicking
const selectNumButt = (event) => {

  if (numSelected === "") {
    numSelected = $(event.target).text()
    $(event.target).addClass("num-select");

    // console.log("numSelected",numSelected)
  } else if (numSelected === $(event.target).text()) {
    numSelected = "";
    $(event.target).removeClass("num-select");
  } 
  // console.log($(event.target))
};

const startGame = () => {
  $("#start").hide("slow");
  $(".puzzle").show("slow");
  $(".num-butts").show("slow");
  $(".submit-butt").show("slow");
};

const endGame = () => {
  let coords = tileID.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // console.log($("#1-0").text())
  for (let r = 0; r < game.solution1.length; r ++) {
    for (let c = 0; c < game.solution1[r].length; c ++) {
      x = "#" + r + "-" + c;
      if (game.solution1[r][c] !== $(x).text()) {
        console.log("lose", r, c)
        $(".win-div").hide();
        $(".lose-div").show();
        $(".submit-butt").hide();
        $(".restart-butt").on("click", restartSudoku)
        return;
      }
    }
  } 
  $(".win-div").show();
  $(".submit-butt").hide();
  $(".restart-butt").on("click", restartSudoku)
}

const restartSudoku = () => {
  location.reload()
}

$(() => {
  $(".puzzle").hide();
  $(".num-butts").hide();
  $(".submit-butt").hide();
  $(".win-div").hide();
  $(".lose-div").hide();

  $("#startGame").on("click", startGame);
  $("#submit").on("click", endGame);

  setButts();
  setBoard();
});
