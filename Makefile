VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')

SHELL = /usr/bin/env bash

default: build
.PHONY: default build install tag jquery material

version:
	@echo $(VERSION)
	
jquery:
	grunt build:full:*:-deprecated:-manipulation/_evalUrl:-exports/amd:-exports/global:-ajax/jsonp:-ajax/load:-ajax/parseXML:-ajax/script:-ajax/var/location:-ajax/var/nonce:-ajax/var/rquery
	grunt build:min:*:-deprecated:-manipulation/_evalUrl:-exports/amd:-exports/global:-ajax/jsonp:-ajax/load:-ajax/parseXML:-ajax/script:-ajax/var/location:-ajax/var/nonce:-ajax/var/rquery

jquery_es6:
	grunt build:es6:*:-deprecated:-manipulation/_evalUrl:-exports/amd:-exports/global:-ajax/jsonp:-ajax/load:-ajax/parseXML:-ajax/script:-ajax/var/location:-ajax/var/nonce:-ajax/var/rquery
	#-effects:-effects/Tween:-effects/animatedSelector
	jspm build src/jquery_shim dist/jquery.esm.js --skip-source-maps --skip-encode-names --format esm


build: jquery jquery_es6 material

material:	
	grunt concat
	cp src/libs/materialize.js src/jquery_ui_es6
	cp src/libs/velocity.js src/jquery_ui_es6
	jspm build src/jquery_ui dist/jquery_helper.js --skip-source-maps --skip-encode-names
	jspm build src/jquery_ui_es6 dist/jquery_helper.esm.js  --format esm --skip-source-maps --skip-encode-names
	jspm build src/jquery_ui dist/jquery_helper.min.js  -m --global-deps '{"jquery":"jQuery"}'
	#mjspm build src/jquery_ui dist/jquery_helper.esm.min.js  --format esm -m --global-deps '{"jquery":"jQuery"}'


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
		