# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Useful development scripts
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

help:
	@echo "================================================================"
	@echo "| PIS-project | dev scripts for easy work w/ Docker containers |"
	@echo "================================================================"
	@echo "  make dev \t\tRun (& build) all services (containers)"
	@echo "  make dev-build \tJust build (or rebuild) all images"
	@echo "  make dev-restart \tRestart all services (containers)"
	@echo "  make ps \t\tShow running containers"
	@echo "  make clean \t\tStop & remove running containers/images"
	@echo "  ..."
	@echo "  (for more info, look at the Makefile)"

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

dev-build: # Build all services in dev configuration.
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml build --no-cache

dev-restart: # Restart all services in dev configuration.
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml restart

dev: # Run all services
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml up --detach
	open http://localhost:3000
	open http://localhost:4000
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

dev-frontend:
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml up --detach --no-deps --force-recreate frontend

dev-backend:
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml up --detach --no-deps --force-recreate backend

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

log: # Show logs from all services in a single output stream
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml logs --follow

log-backend: # Show logs only from 'backend' service container
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml logs --follow backend

log-frontend: # Show logs only from 'frontend' service container
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml logs --follow frontend

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ps: # Show running containers from this Docker Bundle
	@echo "DOCKER-COMPOSE IN \033[1mDEV\033[0m CONFIGURATION IS RUNNING THESE CONTAINERS:"
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml ps

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

clean: # Remove all services with development configuration
	docker-compose -f docker-compose.common.yml -f docker-compose.dev.yml down --rmi all

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
