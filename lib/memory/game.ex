defmodule Memory.Game do
  def new do
    %{
        tiles: generate_tiles(),
        clicks: 0,
    }
  end

  def flip(game, index) do
    tiles = game.tiles
    new_clicks = game.clicks + 1
  end

  def client_view(game) do
    state = new
    state
  end

  def tileStruct(el) do
  %{show: false, value: el}
  end

  def generate_tiles do
    "AABBCCDDEEFFGGHH"
    |> String.graphemes
    |> Enum.map(fn arg -> tileStruct(arg) end)
    |> Enum.shuffle
  end
end
