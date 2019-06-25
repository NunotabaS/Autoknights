import json

class Tile:
    def __init__(self, type, height_type, buildable, passable):
        self.type = type
        self.height = height_type
        self.buildable = buildable
        self.passable = passable

    def __repr__(self):
        if self.type == 'tile_forbidden':
            return 'X'
        elif self.type == 'tile_wall':
            return '^'
        elif self.type == 'tile_road':
            return ' '
        elif self.type == 'tile_start':
            return 'S'
        elif self.type == 'tile_end':
            return 'T'
        elif self.type == 'tile_flystart':
            return '%'
        else:
            return '?'

class Map:
    def __init__(self, width, height, tiles):
        self.width = width
        self.height = height
        self.tiles = {}
        for h in range(self.height):
            for w in range(self.width):
                self.tiles[(w, h)] = tiles[h][w]

    def itercoords():
        for x in range(self.width):
            for y in range(self.height):
                yield (x, y)

    def get_buildable(self, pos):
        return self.tiles[pos].buildable

    def __repr__(self):
        rows = []
        for y in range(self.height):
            tiles = [str(self.tiles[(x, y)]) for x in range(self.width)]
            row = ' '.join(tiles)
            rows.append(row)
        return '\n'.join(rows)

class OverlayMap:
    def __init__(self, map):
        self.map = map
        # Build the placements
        self.placements = {}

    def is_empty(self, pos):
        return not pos in self.placements
    
    def can_place(self, pos, character):
        # Check if we can build this kind of chara here
        if self.map.get_buildable(pos) == 2:
            return False
        return True

    def placeable_tiles(self, character):
        for pos in self.map.itercoords():
            if self.is_empty(pos) and self.can_place(pos, character):
                yield pos                

    def taken_tiles(self):
        for pos in self.map.itercoords():
            if not self.is_empty(pos):
                yield (pos, self.placements[pos])

class Level:
    def __init__(self, map, enemies, routes):
        self.layable_map = OverlayMap(map)
        self.enemies = enemies
        self.routes = routes
    
    def execute_strategy():
        pass

def _build_map(map_data):
    # Build the tiles
    tiles = []
    for tile in map_data['tiles']:
        tiles.append(Tile(
            tile['tileKey'], 
            tile['heightType'], 
            tile['buildableType'], 
            tile['passableMask']))
    height, width = len(map_data['map']), len(map_data['map'][0])
    map = []
    for y in range(height):
        row = []
        map.append(row)
        for x in range(width):
            row.append(tiles[map_data['map'][y][x]])
    return Map(width, height, map)

def load_level_from_json(filename):
    with open(filename, 'r') as f:
        level_data = json.load(f)
        map = _build_map(level_data['mapData'])
        print(map)
        # Build the tiles
        

if __name__ == '__main__':
    # Try to load a level
    import argparse, os

    parser = argparse.ArgumentParser(
        description='Read a level')
    parser.add_argument('data', action='store', 
        default='game_data/levels/obt/main/level_main_00-01.json',
        help='Path to JSON level definition')

    args = parser.parse_args()
    
    if os.path.isfile(args.data):
        level = load_level_from_json(args.data)
        repr(level)
    