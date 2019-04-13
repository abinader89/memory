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

  def update_tiles(game, index, new_flip, new_clicks) do
    IO.inspect("clicks is odd")
    update = Map.put(Enum.at(game.tiles, index), :show, true)
    List.delete_at(game.tiles, index)
    |> List.insert_at(index, update)
  end

  def update_flip(tiles, index) do
      IO.inspect("nothing to match")
      Enum.at(tiles, index)
  end

  def click(game, index) do
    if (Enum.at(game.tiles, index).show) do
        game
    else
    new_clicks = game.clicks + 1
    new_flip = 
      if (rem(new_clicks, 2) != 0) do
        update_flip(game.tiles, index)
      else
        game.flipped_tile
      end
    new_tiles = update_tiles(game, index, new_flip, new_clicks)
    IO.inspect(new_tiles)
    IO.inspect(new_flip)
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
