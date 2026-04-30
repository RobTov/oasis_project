.PHONY: help install setup migrate run run-sqlite frontend-install frontend-run frontend-build test lint clean

help:
	@echo "Oasis Promotions Agency - Available commands:"
	@echo ""
	@echo "  make install           Install backend dependencies"
	@echo "  make setup             Initial project setup (install + migrate)"
	@echo "  make migrate           Run database migrations"
	@echo "  make migrate-make      Create new migrations"
	@echo "  make seed              Populate database with sample data"
	@echo "  make run               Run backend server (SQLite)"
	@echo "  make run-postgres      Run backend server (PostgreSQL)"
	@echo "  make superuser         Create admin superuser"
	@echo "  make frontend-install  Install frontend dependencies"
	@echo "  make frontend-run      Run frontend dev server"
	@echo "  make frontend-build    Build frontend for production"
	@echo "  make test              Run backend tests"
	@echo "  make lint              Run linting"
	@echo "  make clean             Remove build artifacts"
	@echo "  make db-reset          Reset database (SQLite only)"

install:
	pip install -r requirements.txt

requirements.txt:
	@echo "Creating requirements.txt..."
	@pip freeze | grep -E "^(Django|djangorestframework|djoser|rest_framework_simplejwt|psycopg2|corsheaders)" > requirements.txt

setup: install migrate

migrate:
	USE_SQLITE=true python3 manage.py migrate

migrate-make:
	USE_SQLITE=true python3 manage.py makemigrations

seed:
	USE_SQLITE=true python3 manage.py seed

run:
	USE_SQLITE=true python3 manage.py runserver

run-postgres:
	python3 manage.py runserver

superuser:
	USE_SQLITE=true python3 manage.py createsuperuser

frontend-install:
	cd web && npm install

frontend-run:
	cd web && npm run dev

frontend-build:
	cd web && npm run build

test:
	USE_SQLITE=true python3 manage.py test

lint:
	cd web && npm run lint 2>/dev/null || echo "No linter configured"

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
	rm -rf web/node_modules web/dist web/.turbo
	rm -rf .pytest_cache htmlcov
	rm -f db.sqlite3

db-reset:
	rm -f db.sqlite3
	USE_SQLITE=true python3 manage.py migrate
	USE_SQLITE=true python3 manage.py createsuperuser --noinput || true
