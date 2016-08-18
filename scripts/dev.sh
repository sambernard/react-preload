#!/bin/bash -e

webpackDevServer=node_modules/.bin/webpack-dev-server

$webpackDevServer --content-base examples/
