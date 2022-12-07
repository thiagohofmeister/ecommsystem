
all: help

help:
	echo help

up:
	docker-compose -f docker/docker-compose.yml up -d --force-recreate manager-panel

logs:
	docker-compose -f docker/docker-compose.yml logs -f api
