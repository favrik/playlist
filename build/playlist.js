var Playlist;

Playlist = (function() {
  function Playlist(items, configuration) {
    if (items == null) {
      items = [];
    }
    if (configuration == null) {
      configuration = {};
    }
    this.initialize(items);
    this.configure(configuration);
  }

  Playlist.prototype.initialize = function(items) {
    return this.items = items;
  };

  Playlist.prototype.get = function() {
    return this.items;
  };

  Playlist.prototype.configure = function(options) {
    var property, value, _ref, _ref1;
    this.conf = (_ref = this.conf) != null ? _ref : {};
    for (property in options) {
      value = options[property];
      this.conf[property] = value;
    }
    return this.index = (_ref1 = this.index) != null ? _ref1 : 0;
  };

  Playlist.prototype.setCurrent = function(index) {
    return this.index = index;
  };

  Playlist.prototype.current = function() {
    return this.index;
  };

  Playlist.prototype.count = function() {
    return this.items.length;
  };

  Playlist.prototype.add = function(item) {
    return this.items.push(item);
  };

  Playlist.prototype.remove = function(index) {
    if (index > -1) {
      return this.items.splice(index, 1);
    }
  };

  Playlist.prototype.insert = function(index, item) {
    return this.items.splice(index, 0, item);
  };

  Playlist.prototype.clear = function() {
    return this.items = [];
  };

  Playlist.prototype.play = function() {
    if (this.conf.hasOwnProperty('player')) {
      return this.conf.player.play(this.items[this.index]);
    }
  };

  Playlist.prototype.playAt = function(index) {
    if (this.conf.hasOwnProperty('player') && (this.items[index] != null)) {
      return this.conf.player.play(this.items[index]);
    }
  };

  Playlist.prototype.next = function() {
    var nextIndex;
    nextIndex = this.index + 1;
    if (nextIndex > this.items.length - 1) {
      nextIndex = 0;
    }
    this.index = nextIndex;
    if (this.conf.hasOwnProperty('player')) {
      return this.conf.player.play(this.items[this.index]);
    }
  };

  return Playlist;

})();
