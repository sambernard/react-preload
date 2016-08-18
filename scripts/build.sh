#!/bin/bash -e

# Config
build_dir=lib

webpack=node_modules/.bin/webpack
babel=node_modules/.bin/babel

rm -rf $build_dir

echo "Building react-preload"

echo "Transpile modules"
$babel ./modules -d $build_dir

echo "Create dist version for script tags"
$webpack
