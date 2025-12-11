pipeline {
    agent any

    tools {
        nodejs "node22"
    }

    environment {
        CI = "true"
        PLAYWRIGHT_BROWSERS_PATH = "0"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run E2E Tests') {
            steps {
                bat 'npx playwright test --reporter=list'
            }
        }
    }
}
