
SHELL = /usr/bin/env bash

default: build
.PHONY: default build install 

build:
	jspm bundle src/jquery_helper dist/jquery_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery_helper_sfx.min.js --format amd --skip-source-maps -m


install:
	jspm install

