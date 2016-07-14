VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install tag build_jquery build_material

version:
	@echo $(VERSION)
	
jquery:
	grunt custom:-effects,-deprecated,-css/showHide,-manipulation/_evalUrl --amd

build: build_jquery build_material

	

build_jquery:
	jspm build src_jquery/jquery_helper.js dist/jquery_helper.js --skip-source-maps --global-name jQuery --skip-encode-names
	jspm build src_jquery/jquery_helper.js dist/jquery_helper.min.js --minify --global-name jQuery --skip-encode-names


build_material:
	jspm build src_material/material_helper.js dist/material_helper.js --skip-source-maps --global-name jQuery --skip-encode-names
	jspm build src_material/material_helper.js dist/material_helper.min.js --minify --global-name jQuery --skip-encode-names



install:
	npm install
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
		