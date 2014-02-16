module('Playlist');

function getItems() {
  return [
    { title: 'Title 1', id: 1 },
    { title: 'Title 2', id: 2 },
    { title: 'Title 3', id: 3 },
    { title: 'Title 4', id: 4 },
    { title: 'Title 5', id: 5 }
  ];
}

test('Is set', function() {
  ok(Playlist, 'Playlist');
});

test('Constructor', function () {
  var playlist = new Playlist(getItems(), { searchBy: 'title' });
  ok(playlist.get(), 'items set');
  ok(playlist.conf.searchBy, 'initial configuration set');
});

test('Configuration', function () {
  var playlist = new Playlist(getItems(), { original: 1 });

  playlist.configure({ searchBy: 'id' });
  deepEqual(playlist.conf, { original: 1, searchBy: 'id' }, 'configuration option set');

  playlist.configure({ index: 1, searchBy: 'title' });
  deepEqual(playlist.conf, { original: 1, index: 1, searchBy: 'title' }, 'configure() overrides existing');
});

test('Index (current item)', function () {
  var playlist = new Playlist(getItems());
  equal(playlist.current(), 0, "default index is 0");

  playlist.setCurrent(3);
  equal(playlist.current(), 3, "index initialized");
});

test('List manipulation', function () {
  var playlist = new Playlist(getItems());

  equal(playlist.count(), 5, 'there are ' + playlist.get().length +  ' items');

  playlist.add({ title: 'Something', id: 6 });
  equal(playlist.count(), 6, 'item added');

  playlist.remove(1);
  equal(playlist.count(), 5, 'item removed');

  playlist.insert(1, { title: 'yoyo', id: 234234 });
  equal(playlist.get()[1].title, 'yoyo', 'item inserted at index');

  playlist.play();
  equal(playlist.current(), 0, 'index is 0');
  playlist.next();
  equal(playlist.current(), 1, 'index incremented by one');

  playlist.clear();
  equal(playlist.get().length, 0, 'list cleared');
});

// This is just a theoretical integration. A work in progress.
test('Player integration', function () {
  var mockPlayer = (function () {
    var current;

    return {
      play: function (item) {
        current = item;
      },

      next: function (item) {
        current = item;
      },

      current: function () {
        return current;
      }
    };
  })();

  var playlist = new Playlist(getItems(), { player: mockPlayer });
  playlist.play();
  equal(mockPlayer.current().id, 1, 'player is playing correct item');

  playlist.next();
  equal(mockPlayer.current().id, 2, 'player is playing next item');
});
