VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install tag jquery material test release

version:
	@echo $(VERSION)
	
jquery:
	grunt build:full:*:-deprecated:-manipulation/_evalUrl:-exports/amd:-ajax/jsonp:-ajax/load:-ajax/parseXML:-ajax/script:-ajax/var/location:-ajax/var/nonce:-ajax/var/rquery:-ajax/xhr:-manipulation/_evalUrl
	grunt build:min:*:-deprecated:-manipulation/_evalUrl:-exports/amd:-ajax/jsonp:-ajax/load:-ajax/parseXML:-ajax/script:-ajax/var/location:-ajax/var/nonce:-ajax/var/rquery:-ajax/xhr:-manipulation/_evalUrl
	


jquery_es6:
	grunt build:es6:*:-deprecated:-manipulation/_evalUrl:-exports/amd:-exports/global:-ajax/jsonp:-ajax/load:-ajax/parseXML:-ajax/script:-ajax/var/location:-ajax/var/nonce:-ajax/var/rquery
	#-effects:-effects/Tween:-effects/animatedSelector
	jspm build jquery_shim dist/jquery.esm.js --skip-source-maps --skip-encode-names --format esm

build: jquery jquery_es6 material material_helper bootstrap_helper

material:	
	grunt concat

test:
	grunt test:fast
	

material_helper:	
	jspm build jquery_ui/material_helper.js dist/material_helper.js --skip-source-maps --skip-encode-names --global-name material_helper
	jspm build jquery_ui/material_helper.js dist/material_helper.min.js  -m --global-deps '{"jquery":"jQuery"}' --global-name material_helper
	jspm build jquery_ui_es6/material_helper.js dist/material_helper.esm.js  --format esm --skip-source-maps --skip-encode-names

bootstrap_helper:	
	jspm build jquery_ui/bootstrap_helper.js dist/bootstrap_helper.js --skip-source-maps --skip-encode-names --global-name bootstrap_helper
	jspm build jquery_ui/bootstrap_helper.js dist/bootstrap_helper.min.js  -m --global-deps '{"jquery":"jQuery"}' --global-name bootstrap_helper
	jspm build jquery_ui_es6/bootstrap_helper.js dist/bootstrap_helper.esm.js  --format esm --skip-source-maps --skip-encode-names
	


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
		
release: update_version tag_and_push				