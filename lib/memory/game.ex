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

  def tileStruct(el) do
  %{show: false, value: el}
  end

  def update_tile(game, index) do
    updated_index = Enum.map game.tiles, fn %{show: bool, value: val} = letter ->
    if letter === Enum.at(game.tiles, index) do
      Map.put(letter, :show, true)
    else
      letter
    end
    end
    IO.inspect(updated_index)
  end

  def click(game, index) do
    new_clicks = game.clicks + 1
    new_tiles = update_tile(game, index)
    %{
        tiles: new_tiles,
        clicks: new_clicks,
    }
  end

  def generate_tiles do
    "AABBCCDDEEFFGGHH"
    |> String.graphemes
    |> Enum.map(fn arg -> tileStruct(arg) end)
    |> Enum.shuffle
  end
end
