VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install tag publish concat_jquery build_jquery

version:
	@echo $(VERSION)
	
concat_jquery:
	#grunt custom:-effects,-deprecated,-manipulation/_evalUrl,-exports/amd,-exports/global
	grunt custom:-effects,-deprecated,-manipulation/_evalUrl,-exports/amd,-exports/global,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-event/ajax,-effects,-effects/Tween,-effects/animatedSelector,-deprecated
	grunt concat:velocity
	


build_jquery:
	jspm build jquery_shim dist/jquery.js --format esm --skip-source-maps --skip-encode-names 
	jspm build libs/jquery.es6.js dist/jquery.js  --skip-source-maps --skip-encode-names --global-name jQuery
	jspm build libs/jquery.es6.js dist/jquery.min.js  -m --global-name jQuery

build: concat_jquery build_jquery

material:	
	jspm build jquery_ui dist/jquery_helper.js  --skip-source-maps --skip-encode-names --global-deps '{"jquery":"jQuery"}'
	jspm build jquery_ui dist/jquery_helper.esm.js  --format esm --skip-source-maps --skip-encode-names --global-deps '{"jquery":"jQuery"}'
	jspm build jquery_ui dist/jquery_helper.min.js  -m


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
		