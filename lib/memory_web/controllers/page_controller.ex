defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
  def game(conn, %{"name" => name}) do
    render conn, "game.html", name: name
  end
  def join(conn, params) do
    path = "/game/" <> params["params"]["name"]
    redirect(conn, to: path)
  end
end
