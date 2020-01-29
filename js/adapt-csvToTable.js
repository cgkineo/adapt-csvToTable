define([
  'core/js/adapt',
  'handlebars'
],function(Adapt, Handlebars) {

  // mini csv to json parser
  function csvToJSON(data) {
    var rows = [['']];
    for (var i = 0, l = data.length, char = data[i], wasInSpeechMarks = false, isInSpeechMarks = false; i < l; char = data[++i]) {
      if (wasInSpeechMarks && char !== "," && char !== "\n" && char !== "\r") { // skip after speech mark waiting for new column or row
      } else if (isInSpeechMarks && char === '"' && data[i+1] !== '"') { // at end of speechmark block
        isInSpeechMarks = false;
        wasInSpeechMarks = true;
      } else if (isInSpeechMarks || char !== '"' && char !== "," && char !== "\n" && char !== "\r") { // is in speechmarks or not a new colum or row
        if (isInSpeechMarks && char === '"' && data[i+1] === '"') i++; // is in speechmarks at a double quote
        rows[rows.length-1][rows[rows.length-1].length-1] += char; // add character to current cell
      } else if (char === '"') { // is at the start of speechmarks
        rows[rows.length-1][rows[rows.length-1].length-1] = ''; // remove everything before opening speechmark
        isInSpeechMarks = true;
      } else { // new colum or row
        wasInSpeechMarks = false;
        if (char === '\r' && data[i+1] === '\n') i++; // as new colum in windows format, skip character
        if (char === ',') rows[rows.length-1].push(''); // add new column
        else rows.push(['']); // add new row
      }
    }
    var colCount = 0;
    rows.forEach(function(cols) {
      if (colCount >= cols.length) return;
      colCount = cols.length;
    });
    rows.forEach(function(cols) {
      if (cols.length === colCount) return;
      var currentColCount = cols.length;
      cols.length = colCount;
      for (var i = currentColCount-1; i < colCount; i++) {
        cols[i] = '';
      }
    });
    return rows;
  };

  Handlebars.registerHelper("csvToTable", function(options) {
    var csv = options.fn();
    var rows = csvToJSON(csv);
    var columns = rows[0];
    var data = _.extend({}, options.hash, {
      columns: columns, 
      rows: rows
    });
    return new Handlebars.SafeString(Handlebars.templates.csvToTableOutput(data));
  });

});
