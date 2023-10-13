VERSION := $(shell cat manifest.json | jq .version)


.PHONY: firefox
firefox:
	# ifneq (,$(wildcard checkpoint-firefox-$(VERSION).zip))
	# 	rm "checkpoint-firefox-${VERSION}.zip"
	# endif

	mv manifest.json chrome-manifest.json
	mv firefox-manifest.json manifest.json
	zip "checkpoint-firefox-${VERSION}.zip" manifest.json LICENSE readme.md style.css inject.js shared.js assets/* firefox/*
	mv manifest.json firefox-manifest.json
	mv chrome-manifest.json manifest.json

.PHONY: chrome
chrome:
	# ifneq (,$(wildcard checkpointchrome-$(VERSION).zip))
	# 	rm "checkpoint-chrome-${VERSION}.zip"
	# endif
	zip "checkpoint-chrome-${VERSION}.zip" manifest.json LICENSE readme.md style.css inject.js shared.js assets/* chrome/*