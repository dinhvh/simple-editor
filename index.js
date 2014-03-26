var fs = null;

var main = function() {
  console.log('start');
  load();
  
  document.addEventListener('keypress', function(e) {
    if (e.keyCode == 19) {
      save();
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

var load = function() {
  fs.root.getFile('content.txt', {}, function(fileEntry) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        console.log('read ' + this.result);
        document.querySelector('#main').innerHTML = this.result;
      };
      reader.readAsText(file);
    }, function() {
      console.log('nothing to read');
    });
  }, function() {
    console.log('nothing to read');
  });
}

var save = function() {
  var data = document.querySelector('#main').innerHTML;
  fs.root.getFile('content.txt', {create: true}, function(fileEntry) {
    fileEntry.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };
      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };
      console.log('write ' + data);
      var blob = new Blob([data], {type: 'text/plain'});
      fileWriter.write(blob);
    }, function() {
      console.log('could not write');
    });
  }, function() {
    console.log('could not write');
  });
}

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function(resultFS) {
  fs = resultFS;
  
  main();
})
