VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install tag

version:
	@echo $(VERSION)
	
build:
	jspm bundle src/jquery_helper dist/jquery_helper_jspm.js --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.js --format amd --skip-source-maps 
	jspm bundle-sfx src/jquery_helper dist/jquery_helper.min.js --format amd --skip-source-maps -m


install:
	jspm install

update_version:
	@echo "Current version is " ${VERSION}
	@echo "Next version is " $(v)
	sed -i s/"$(VERSION)"/"$(v)"/g package.json

tag_and_push:
		git add --all
		git commit -a -m "Tag v $(v) $(m)"
		git tag v$(v)
		git push
		git push --tags

tag: update_version build tag_and_push		
		