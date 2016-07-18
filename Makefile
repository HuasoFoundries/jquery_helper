VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install tag publish

version:
	@echo $(VERSION)
	
jquery:
	grunt custom:-effects,-deprecated,-manipulation/_evalUrl,-exports/amd,-exports/global
	grunt concat:jquery
	jspm build jquery_shim dist/jquery.js  --skip-source-maps --skip-encode-names --global-name jQuery
	jspm build jquery_shim dist/jquery.min.js --global-name jQuery -m

build: jquery material

material:	
	grunt publish



install:
	npm install
	jspm install

update_version:
	@echo "Current version is " ${VERSION}
	@echo "Next version is " $(v)
	sed -i s/'"$(VERSION)"'/'"$(v)"'/ package.json

tag_and_push:
		git add --all
		git commit -a -m "Tag v $(v) $(m)"
		git tag v$(v)
		git push
		git push --tags

tag: update_version build tag_and_push		
		