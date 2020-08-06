$(document).ready(function() {
  var redScore = 0;
  var blackScore = 0;
  var turn = 'red';

  const startGame = function() {
    turn = 'red';
    $('#turn').css('color', 'red').text(`RED'S TURN`);
    //builds up board
    $board = $('#board');
    $board.empty();
    for (row = 0; row < 6; row++) {
      for (col = 0; col < 7; col++) {
        $block = $('<span></span>');
        $block.addClass(`block row${row} col${col}`);
        $block.appendTo($board);
      }
      $('<br></br>').appendTo($board);
    }
  };

  const dropPiece = function() {
    //white outline over where the piece will drop when hovering
    $('.block').mouseover(function() {
      let column = $(this).attr('class').split(' ')[2][3];
      let dropRow = lowestRow(column);
      $(`.col${column}.row${dropRow}`).css('border', '10px white solid');
    });

    $('.block').mouseout(function() {
      let column = $(this).attr('class').split(' ')[2][3];

      $(`.col${column}`).css('border', '1px gray solid');
    });

    //drops piece when player clicks
    $('.block').click(function() {
      let column = $(this).attr('class').split(' ')[2][3];
      let dropRow = lowestRow(column);

      if (dropRow !== undefined) {
        if (turn === 'red') {
          $(`.col${column}.row${dropRow}`).css('background-color', 'red');
          if (!checkWinner(turn)) {
            turn = 'black';
            $('#turn').css('color', 'black').text(`BLACK'S TURN`);
          } else {
            $('#turn').css('border', '5px white dashed').text(`RED WINS`);
            redScore++;
            $('#redScore').text(redScore);
            $('#popup').css('display', 'block');
          }
        } else if (turn === 'black') {
          $(`.col${column}.row${dropRow}`).css('background-color', 'black');
          if (!checkWinner(turn)) {
            turn = 'red';
            $('#turn').css('color', 'red').text(`RED'S TURN`);
          } else {
            $('#turn').css('border', '5px white dashed').text(`BLACK WINS`);
            blackScore++;
            $('#blackScore').text(blackScore);
            $('#popup').css('display', 'block');
          }
        }
      }
    });
  };

  //calculate which row piece will drop to
  const lowestRow = function(column) {
    for (i = 5; i >= 0; i--) {
      if (
        $(`.col${column}.row${i}`).css('background-color') ===
        'rgb(210, 180, 140)'
      ) {
        return i;
      }
    }
  };

  startGame();
  dropPiece();

  $('#newGame').click(function() {
    startGame();
    dropPiece();
    $('#turn').css('border', 'none');
    $('#popup').css('display', 'none');
  });

  $('#startOver').click(function() {
    startGame();
    dropPiece();
    $('#turn').css('border', 'none');
    $('#popup').css('display', 'none');
    redScore = 0;
    blackScore = 0;
  });
});