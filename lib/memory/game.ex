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

  def generate_tiles do
    tiles = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]
    |> Enum.shuffle
  end
end
