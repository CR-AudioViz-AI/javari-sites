// [JAVARI-FIX] .github/workflows/e2e-tests.yml
name: Henderson Standards E2E Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  e2e-tests:
    runs-on: ubuntu-latest

    services:
      db:
        image: postgres:13
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
        ports:
          - 5432:5432
        options: >-
          --health-cmd="pg_isready -U user"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run database migrations
        run: npm run migrate

      - name: Start application
        run: npm start &
        
      - name: Wait for application to be ready
        run: |
          echo "Waiting for application to start..."
          sleep 15

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgres://user:password@localhost:5432/test_db
          NODE_ENV: test

      - name: Shut down application
        run: kill $(jobs -p) || true