defmodule Memory.Game do
  def new do
    %{
        tiles: generate_tiles(),
        clicks: 0,
    }
  end

  def client_view(game) do
    %{
        tiles: game.tiles,
        clicks: game.clicks,
    }
  end

  def build_from_letter(ll) do
  %{show: false, matched: false, value: ll}
  end

  def update_tile(game, index) do
    update = Map.put(Enum.at(game.tiles, index), :show, true)
    List.delete_at(game.tiles, index)
    |> List.insert_at(index, update)
  end

  def click(game, index) do
    if (Enum.at(game.tiles, index).show) do
        game
    else
    new_clicks = game.clicks + 1
    new_tiles = update_tile(game, index)
    %{
        tiles: new_tiles,
        clicks: new_clicks,
    }
    end
  end

  def generate_tiles do
    "AABBCCDDEEFFGGHH"
    |> String.graphemes
    |> Enum.map(fn ll -> build_from_letter(ll) end)
    |> Enum.shuffle
  end
end
