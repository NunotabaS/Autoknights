(function () {
  var $ = function (e) { return document.getElementById(e);};
  var _fpsTimer = null;
  var _renderQueue = [];
  var renderFrame = function (context) {
    // Draw the background
    context.fillStyle = '#000000';
    context.fillRect(0, 0, 1280, 720)

    // Render the field
    for (var i = 0; i < _renderQueue.length; i++) {
      context.save();
      _renderQueue[i].render(context);
      context.restore();
    }

    if (_fpsTimer != null) {
      context.font = '16px sans-serif';
      context.fillStyle = '#ffffff';
      var fps = Math.round(10000/(Date.now() - _fpsTimer)) / 10;
      context.fillText('FPS: ' + fps, 0, 16);
    }
    _fpsTimer = Date.now();
  }

  window.addEventListener('load', function () {
    // Set up an raf main loop
    var context = $('main').getContext('2d');
    var _frame = function () {
      renderFrame(context);
      
      window.requestAnimationFrame(_frame);
    };
    _frame();
    
    var url = '../game_data/levels/obt/main/level_main_00-01.json';
    fetch(url).then(function (resp) {
        return resp.json();
    }).then(function (levelData) {
      var map = new Map(levelData['mapData']);
      _renderQueue.push(map.asRenderable(0, 0, 1280, 720));
    });
  })
})();