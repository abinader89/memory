defmodule Memory.Game do
  def new do
    %{
        tiles: generate_tiles(),
        clicks: 0,
        flipped_tile: nil,
    }
  end

  def get_client_tiles(tiles) do
      Enum.map tiles, fn %{} = letter ->
        if (letter.show == false and letter.matched == false) do
          Map.put(letter, :value, "?")
        else
          letter
        end
      end
  end

  def client_view(game) do
    client_tiles = get_client_tiles(game.tiles)
    %{
        tiles: client_tiles,
        clicks: game.clicks,
        flipped_tile: game.flipped_tile,
    }
  end

  def update_tiles(game, index, flip) when flip == nil do
    update = Map.put(Enum.at(game.tiles, index), :show, true)
    List.delete_at(game.tiles, index)
    |> List.insert_at(index, update)
  end

  def update_tiles(game, index, flip) do
    update = 
      if (Enum.at(game.tiles, index).value == flip.value) do
        Map.put(Enum.at(game.tiles, index), :matched, true)
      else
        Map.put(Enum.at(game.tiles, index), :show, false)
      end
    List.delete_at(game.tiles, index)
    |> List.insert_at(index, update)
    |> Enum.map(fn %{} = letter ->
      if (Enum.at(game.tiles, index).value == letter.value and flip.value == letter.value) do
         Map.put(letter, :matched, true)
      else
         Map.put(letter, :show, false)
      end
      end
)
  end

  def show_clicked(game, index) do
    update = Map.put(Enum.at(game.tiles, index), :show, true)

    List.delete_at(game.tiles, index)
    |> List.insert_at(index, update)
    end

  def click(game, index) do
    if ((Enum.at(game.tiles, index).show or Enum.at(game.tiles, index).matched) and game.flipped_tile == nil) do
      game
    else
      new_clicks = game.clicks + 1
      new_tiles = update_tiles(game, index, game.flipped_tile)
      new_flip = 
    if (game.flipped_tile == nil) do
      Enum.at(game.tiles, index)
    else
      nil
    end
    %{
        tiles: new_tiles,
        clicks: new_clicks,
        flipped_tile: new_flip,
    }
    end
  end

  def delay(game, index) do
    if (Enum.at(game.tiles, index).show or Enum.at(game.tiles, index).matched) do
      game
    else
    new_tiles = show_clicked(game, index)
    %{
        tiles: new_tiles,
        clicks: game.clicks,
        flipped_tile: game.flipped_tile,
    }
    end
  end

  def build_from_letter(ll) do
  %{show: false, value: ll, matched: false}
  end

  def generate_tiles do
    "AABBCCDDEEFFGGHH"
    |> String.graphemes
    |> Enum.map(fn ll -> build_from_letter(ll) end)
    |> Enum.shuffle
  end
end
