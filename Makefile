
SHELL = /usr/bin/env bash

default: build
.PHONY: default build build-extended install all

build:
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.min.js --format amd --skip-source-maps -m

build-extended:
	jspm bundle-sfx src/jquery_extended_helper dist/jquery_extended_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_extended_helper dist/jquery_extended_helper.min.js --format amd --skip-source-maps -m

install:
	jspm install

all:
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.min.js --format amd --skip-source-maps -m
	jspm bundle-sfx src/jquery_extended_helper dist/jquery_extended_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_extended_helper dist/jquery_extended_helper.min.js --format amd --skip-source-maps -m