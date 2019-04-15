#!/bin/bash

export MIX_ENV=prod
export PORT=4792
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get
mix compile
(cd assets && npm install)
(cd assets && webpack --mode production)
mix phx.digest

echo "Generating release..."
mix release

#echo "Stopping old copy of app, if any..."

echo "Starting app..."

_build/prod/rel/memory/bin/memory foreground
#MIX_ENV=prod PORT=4792 mix phx.server

