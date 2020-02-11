define([
  'core/js/adapt',
  'handlebars'
],function(Adapt, Handlebars) {

  // mini csv to json parser
  function csvToJSON(data) {
    var rows = [['']];
    rows.rowspans = [[1]];
    rows.colspans = [[1]];
    for (var i = 0, l = data.length, char = data[i], wasInSpeechMarks = false, isInSpeechMarks = false, isInSquares = false; i < l; char = data[++i]) {
      if (wasInSpeechMarks && char !== "," && char !== "\n" && char !== "\r") { // skip after speech mark waiting for new column or row
      } else if (isInSpeechMarks && char === '"' && data[i+1] !== '"') { // at end of speechmark block
        isInSpeechMarks = false;
        wasInSpeechMarks = true;
      } else if (isInSquares && char === "]") { // at end of square brackets
        isInSquares = false;
        try {
          var row = (rows.length-1);
          var col = (rows[rows.length-1].length-1);
          var size = rows[row][col].split(':');
          rows.colspans[row][col] = size[0];
          rows.rowspans[row][col] = size[1];
        } catch(e) {}
        rows[rows.length-1][rows[rows.length-1].length-1] = '';
      } else if (isInSquares) {
        rows[rows.length-1][rows[rows.length-1].length-1] += char
      } else if (isInSpeechMarks || char !== "[" && char !== '"' && char !== "," && char !== "\n" && char !== "\r") { // is in speechmarks or not a new colum or row
        if (isInSpeechMarks && char === '"' && data[i+1] === '"') i++; // is in speechmarks at a double quote
        rows[rows.length-1][rows[rows.length-1].length-1] += char; // add character to current cell
      } else if (char === '[') { // is at start of square brackets
        isInSquares = true;
      } else if (char === '"') { // is at the start of speechmarks
        rows[rows.length-1][rows[rows.length-1].length-1] = ''; // remove everything before opening speechmark
        isInSpeechMarks = true;
      } else { // new colum or row
        wasInSpeechMarks = false;
        if (char === '\r' && data[i+1] === '\n') i++; // as new colum in windows format, skip character
        if (char === ',') {
          var row = rows.length-1;
          rows.colspans[row].push(1);
          rows.rowspans[row].push(1);
          rows[row].push(''); // add new column
        } else {
          rows.colspans.push([1]);
          rows.rowspans.push([1]);
          rows.push(['']); // add new row
        }
      }
    }
    return rows;
  };

  Handlebars.registerHelper("csvToTable", function(options) {
    var csv = options.fn(this);
    var stylesCSV = options.inverse(this);
    var rows = csvToJSON(csv);
    var styles = csvToJSON(stylesCSV);
    var columns = rows[0];
    var maxColCount = columns.length;
    rows.forEach(function (columns) {
      if (columns.length <= maxColCount) return;
      maxColCount = columns.length;
    });
    var data = _.extend({}, options.hash, {
      columns: columns,
      colCount: maxColCount,
      rows: rows,
      styles: styles,
      rowspans: styles.rowspans,
      colspans: styles.colspans,
    });
    return new Handlebars.SafeString(Handlebars.templates.csvToTableOutput(data));
  });

  Handlebars.registerHelper("lookup2d", function(obj, d1, d2, options) {
    try {
      return obj[d1] && obj[d1][d2] || '';
    } catch(err) {
      return '';
    }
  });

});
