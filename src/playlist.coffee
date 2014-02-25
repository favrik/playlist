class Playlist
  constructor: (items) ->
    this.initialize items
    this.configure if arguments.length > 1 then arguments[1] else {}

  initialize: (items) -> @items = items

  get: -> @items

  configure: (options) ->
    @conf = @conf ? {}
    for property, value of options
      @conf[property] = value
    @index = @index ? 0

  setCurrent: (index) -> @index = index

  current: -> @index

  count: -> @items.length

  add: (item) -> @items.push item

  remove: (index) ->
    if index > -1
      @items.splice index, 1

  insert: (index, item) -> @items.splice(index, 0, item)

  clear: -> @items = []

  play: ->
    if @conf.hasOwnProperty('player')
      @conf.player.play @items[@index]

  playAt: (index) ->
    if @conf.hasOwnProperty('player') and @items[index]?
      @conf.player.play @items[index]

  next: ->
    nextIndex = @index + 1
    if nextIndex > @items.length - 1
      nextIndex = 0

    @index = nextIndex

    if @conf.hasOwnProperty('player')
      @conf.player.play @items[@index]

