class Playlist
  constructor: (items = [], configuration = {}) ->
    this.initialize items
    this.configure configuration

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

  remove: (index) -> if index > -1 then  @items.splice index, 1

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
    if nextIndex > @items.length - 1 then nextIndex = 0

    @index = nextIndex

    if @conf.hasOwnProperty('player') then @conf.player.play @items[@index]
