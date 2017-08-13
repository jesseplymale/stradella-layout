function sharp(note) {
  return note + '♯';
}

function flat(note) {
  return note + '♭';
}

var naturals = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
var sharps = naturals.map(sharp);
var doubleSharps = sharps.map(sharp).slice(0,2);
var flats = naturals.map(flat);
var doubleFlats = flats.map(flat).slice(-1);

var notes = doubleFlats.concat(flats, naturals, sharps, doubleSharps);

// The 20 root notes, one row for each on a
// 120 bass accordion
var rootNotes = notes.slice(0, 20);
var dimpleNotes = ['F♭', 'A♭', 'C', 'E', 'G♯']

var layoutWidth = 300;
var padding = 15;
var verticalSpacing = 12;
var numButtonsInRow = 6;

var buttonWidth = (layoutWidth - (padding*(numButtonsInRow+1))) / numButtonsInRow;

var layoutHeight = (buttonWidth+verticalSpacing) * (rootNotes.length+2);

var draw = SVG('drawing').size(layoutWidth, layoutHeight);
//draw.rect(layoutWidth,layoutHeight).fill('none').stroke({width:3});


for(var i=0; i<rootNotes.length; i++) {
  var rootNote = rootNotes[i];
  var rowSvg = drawRow(rootNote);
  rowSvg.move(0, i*(buttonWidth+verticalSpacing));
}

function drawRow(rootNote) {
  var indexOfRootNote = notes.indexOf(rootNote);
  var third = notes[indexOfRootNote+4];
  var rowNotes = [
    rootNote + "°",
    rootNote + "7",
    rootNote + "-",
    rootNote + "Δ",
    rootNote,
    third
  ];
  
  var rowSvg = draw.nested();

  for(var i=0; i<rowNotes.length; i++) {
    var circleX = padding*(i+1) + buttonWidth*i;
    var circleY = verticalSpacing * (rowNotes.length - i); 
    var button = rowSvg.circle(buttonWidth).move(circleX,circleY).attr('shape-rendering',"optimizeQuality");
    
    if(i==4) {
      button.fill('lightgray');
    } else {
      button.fill('none');
    }
    
    if(i==4 && dimpleNotes.indexOf(rootNote) !== -1) {
      button.stroke({width:5, color: 'black'});
    } else {
      button.stroke({width:2, color: 'black'});
    }
    
    rowSvg.text(rowNotes[i]).attr({
      'font-weight': 'bold', 
      x: circleX+(buttonWidth/2), 
      y: circleY+3,
      'text-anchor': 'middle',
      'font-size': 14
    });
  }
  
  return rowSvg;
}
