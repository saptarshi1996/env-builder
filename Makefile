help: 
	@echo "Available commands"

setup:
	@echo "Setting up development environment"
	npm install

deploy:
	npm install
	npm run build
	rm -rf node_modules/
	npm install --omit=dev
	npm publish
