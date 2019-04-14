defmodule Memory.Game do
  def new do
    %{
        tiles: generate_tiles(),
        clicks: 0,
        flipped_tile: nil,
    }
  end

  def client_view(game) do
    %{
        tiles: game.tiles,
        clicks: game.clicks,
        flipped_tile: game.flipped_tile,
    }
  end

  def update_tiles(game, index) do
    update = Map.put(Enum.at(game.tiles, index), :show, true)
    List.delete_at(game.tiles, index)
    |> List.insert_at(index, update)
  end

#  def update_flip(tiles, index) do
#      Enum.at(tiles, index)
#  end

  def click(game, index) do
    if (Enum.at(game.tiles, index).show) do
        game
    else
    new_clicks = game.clicks + 1
    new_tiles = update_tiles(game, index)
    new_flip = 
    if (game.flipped_tile == nil) do
      Enum.at(new_tiles, index)
    else
      game.flipped_tile
    end
    %{
        tiles: new_tiles,
        clicks: new_clicks,
        flipped_tile: new_flip,
    }
    end
  end

  def build_from_letter(ll) do
  %{show: false, value: ll}
  end

  def generate_tiles do
    "AABBCCDDEEFFGGHH"
    |> String.graphemes
    |> Enum.map(fn ll -> build_from_letter(ll) end)
    |> Enum.shuffle
  end
end
