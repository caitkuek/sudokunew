let numSelected = "";
let tileSelected = "";

const game = {
  puzzle1: [
    ["2", "8", "6", "7", "4", "1", "9", "3", "5"],
    ["?", "1", "9", "3", "8", "5", "7", "6", "2"],
    ["3", "5", "7", "9", "6", "2", "4", "1", "8"],
    ["7", "4", "1", "5", "2", "9", "3", "8", "6"],
    ["8", "9", "2", "6", "1", "3", "5", "4", "7"],
    ["?", "3", "5", "8", "7", "4", "1", "2", "9"],
    ["?", "6", "8", "4", "3", "7", "2", "9", "1"],
    ["1", "7", "3", "2", "9", "8", "5", "6", "4"],
    ["9", "2", "4", "1", "5", "6", "8", "7", "3"],
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
    console.log("tile clicked")
    $(this).text(numSelected)
    console.log($(this))
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
  console.log("click", numSelected); // to check hehe
//   console.log(tileID)

  if (numSelected === "") {
    numSelected = $(event.target).text()
    $(event.target).addClass("num-select");
    // $(".tile-select").text(numSelected) . 

    console.log("numSelected",numSelected)
  } else if (numSelected === $(event.target).text()) {
    numSelected = "";
    $(event.target).removeClass("num-select");
  } 
  console.log($(event.target))
};

const startGame = () => {
  $("#start").hide("slow");
  $(".puzzle").show("slow");
  $(".num-butts").show("slow");
  $(".submit-butt").show("slow");
};

// attempt 2 
// const endGame = () => {
//     // game.solution1.map((number => {

//     // }))
//     // let $tile = $(".tile").text(numSelected);
//     let coords = tileID.split("-");
//     console.log(tileID, "tileID")
//     console.log(coords[1], "coords")
//     let r = parseInt(coords[0]);
//     let c = parseInt(coords[1]);

//     if (game.solution1[r][c] === numSelected.id) {
//         $(this).text(numSelected.id)
//         alert("win")
//     } else {
//         alert("lose :(")
//     }
//     console.log(game.solution1)
// } 

// attempt 3
// const endGame = () => {
//   let coords = tileID.split("-");
//   console.log(tileID, "tileID")
//   console.log(coords[1], "coords")
//   let r = parseInt(coords[0]);
//   let c = parseInt(coords[1]);

//   let results = "";
//   if (game.solution1.length !== game.puzzle1.length) {
//     alert("?");
//   }
//   for (let i = 0; i < game.solution1.length; i++) {
//     for (let j = 0; j < game.solution1[i].length; j++) {
//       if (game.solution1[i][j] !== (game.puzzle1[i][j])) {
//         results = "lose"
//         return results;
//       }
//     }
//   }
//   results = "win"
//   return results;
// }

const endGame = () => {
  let coords = tileID.split("-");
  // console.log(tileID.split("-"))
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  console.log(r)
  console.log(c)

// s = "joseph"
// x = "hi " + s
// console.log(x)

  const $tileSelected = $(".tile").attr(tileID)
  console.log($("#1-0").text())
  for (let r = 0; r < game.solution1.length; r ++) {
    for (let c = 0; c < game.solution1[r].length; c ++) {
      x = "#" + r + "-" + c;
      
      // console.log(r)
      // console.log(x)
      if (game.solution1[r][c] !== $(x).text()) {
        console.log("lose", r, c)
      }
    }
  }
  console.log("win")
}

$(() => {
  $(".puzzle").hide();
  $(".num-butts").hide();
  $(".submit-butt").hide();

  $("#startGame").on("click", startGame);
  $("#submit").on("click", endGame);

  setButts();
  setBoard();
});
