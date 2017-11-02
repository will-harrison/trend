(function() {
  var timestamp = null;
  var poll = 500;
  function refresh() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 200) {
          newVersion = req.responseText;
          if (timestamp !== null && timestamp !== newVersion) {
            return document.location.reload();
          }
          timestamp = newVersion;
        }
        setTimeout(refresh, poll);
      }
    };
    req.open("GET", "/timestamp", true);
    try {
      req.send();
    }
    catch (e) { }
  }
  setTimeout(refresh, poll);
})();