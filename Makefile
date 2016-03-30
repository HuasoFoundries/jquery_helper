VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install 

version:
	@echo $(VERSION)
	
build:
	jspm bundle src/jquery_helper dist/jquery_helper_jspm.js --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery.js --format cjs --skip-source-maps
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.min.js --format amd --skip-source-maps -m


install:
	jspm install

