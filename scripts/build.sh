#!/bin/bash -e

babel=node_modules/.bin/babel
build_dir=lib

rm -rf $build_dir

$babel ./modules -d $build_dir --ignore "__tests__"
