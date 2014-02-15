"use strict";

var Playlist = function (items) {
  this.initialize(items);
  this.configure(arguments.length > 1 ? arguments[1] : {});
};

Playlist.prototype = {
  initialize: function (items) {
    this.items = items;
  },

  get: function () {
    return this.items;
  },

  configure: function (options) {
    this.conf = this.conf || { };
    for (var property in options) {
      this.conf[property] = options[property];
    }

    this.index = this.conf.index ? this.conf.index : 0;
  },

  setCurrent: function (index) {
    this.index = index;
  },

  current: function () {
    return this.index;
  },

  count: function () {
    return this.items.length;
  },

  add: function (item) {
    this.items.push(item);
  },

  remove: function (index) {
    if (index > -1) {
      this.items.splice(index, 1);
    }
  },

  insert: function (index, item) {
    this.items.splice(index, 0, item);
  },

  clear: function () {
    this.items = [];
  },

  play: function () {
    if (this.conf.hasOwnProperty('player')) {
      this.conf.player.play(this.items[this.index]);
    }
  },

  playAt: function (index) {
    if (this.conf.hasOwnProperty('player') && this.items[index] !== 'undefined') {
      this.conf.player.play(this.items[index]);
    }
  },

  next: function () {
    var nextIndex = this.index + 1;
    if (nextIndex > (this.items.length - 1)) {
      nextIndex = 0;
    }
    this.index = nextIndex;

    if (this.conf.hasOwnProperty('player')) {
      this.conf.player.play(this.items[this.index]);
    }
  }
};
