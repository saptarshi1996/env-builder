help: 
	@echo "Available commands"

setup:
	@echo "Setting up development environment"
	npm install

start:
	npm run start

deploy:
	npm install
	npm run build
	npm publish
