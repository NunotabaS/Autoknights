var Map = (function () {
  function Tile(tileData) {
    this.type = tileData['tileKey'];
    this.height = tileData['heightType'];
    this.buildable = tileData['buildableType'];
  }

  Tile.prototype.getEdgeColor = function () {
    switch(this.type) {
      case 'tile_end':
        return 'rgb(113, 189, 242)';
      case 'tile_start':
        return 'rgb(209, 44, 54)';
      default:
        return '#ffffff';
    };
  }
  
  Tile.prototype.getFill = function () {
    switch(this.type) {
      case 'tile_end':
        return 'rgb(133, 209, 255)';
      case 'tile_start':
        return 'rgb(229, 64, 74)';
      default: 
        return '#000000';
    }
  }

  Tile.prototype.render = function (ctx, x, y, edgeLen) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.getEdgeColor();
    ctx.strokeRect(x + 2, y + 2, edgeLen - 8, edgeLen - 8);
    ctx.fillStyle = this.getFill();
    ctx.fillRect(x + 4, y + 4, edgeLen - 12, edgeLen - 12);
    ctx.restore();
  }

  function Map(mapData) {
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.tiles = [];
    this.load(mapData);
  }
  
  Map.prototype.load = function (mapData) {
    this.tiles = [];
    this.tileHeight = mapData['map'].length;
    this.tileWidth = mapData['map'][0].length;
    // Create tiles
    for (var h = 0; h < this.tileHeight; h++) {
      this.tiles.push([]);
      for (var w = 0; w < this.tileWidth; w++) {
        var line = this.tiles[this.tiles.length - 1];
        line.push(new Tile(mapData['tiles'][mapData['map'][h][w]]))
      }
    }
    
  }
  
  Map.prototype.render = function (ctx, x, y, width, height) {
    // Figure out the size we can fit
    var edgeLen = Math.round(Math.min(width / this.tileWidth, 
        height / this.tileHeight));
    for (var h = 0; h < this.tileHeight; h++) {
      for (var w = 0; w < this.tileWidth; w++) {
        this.tiles[h][w].render(ctx, x + edgeLen * w, y + edgeLen * h, edgeLen);
      }
    }
  }

  Map.prototype.asRenderable = function (x, y, width, height) {
    var self = this;
    return {
      render: function (ctx) {
        self.render(ctx, x, y, width, height);
      }
    };
  }
  return Map;
})();