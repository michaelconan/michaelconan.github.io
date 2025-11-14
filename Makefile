# Default target
.DEFAULT_GOAL := help

## Help
.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)


.PHONY: serve
serve: ## Serve the Jekyll site locally
	cd docs && bundle exec jekyll serve

.PHONY: preview
preview: ## Serve the Jekyll site with drafts and future posts
	cd docs && bundle exec jekyll serve --drafts --future

.PHONY: build
build: ## Build the Jekyll site
	cd docs && bundle exec jekyll build

.PHONY: clean
clean: ## Clean the Jekyll build cache
	cd docs && bundle exec jekyll clean

.PHONY: install
install: ## Install Jekyll dependencies
	cd docs && bundle install

.PHONY: test
test: ## Run Apps Script unit tests
	cd subscription && npm test

.PHONY: test-watch
test-watch: ## Run Apps Script tests in watch mode
	cd subscription && npm run test:watch

.PHONY: test-coverage
test-coverage: ## Run Apps Script tests with coverage report
	cd subscription && npm run test:coverage

.PHONY: deps-install
deps-install: ## Install all project dependencies
	cd docs && bundle install
	cd subscription && npm install
