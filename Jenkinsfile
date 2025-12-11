pipeline {
    agent any
    
    tools { 
        nodejs "node22" 
    }
    
    environment { 
        CI = "true"
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/ms-playwright"
    }

    stages {
        stage('Checkout') {
            steps { 
                echo '📥 Obteniendo código del repositorio...'
                checkout scm 
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                bat 'npm ci'
                bat 'npx playwright install --with-deps chromium'
            }
        }
        
        stage('Run E2E Tests') {
            steps { 
                echo 'Ejecutando tests de Playwright...'
                bat 'npm test'
            }
        }
        
        stage('Generate Serenity Report') {
            steps { 
                echo 'Generando reporte de Serenity BDD...'
                bat 'npm run report'
            }
        }
    }
    
    post {
        always {
            echo 'Archivando artefactos...'
            
            archiveArtifacts artifacts: 'target/site/serenity/**/*', 
                           fingerprint: true, 
                           allowEmptyArchive: true
            
            archiveArtifacts artifacts: 'test-results/**/*', 
                           fingerprint: true, 
                           allowEmptyArchive: true
            
            archiveArtifacts artifacts: 'playwright-report/**/*', 
                           fingerprint: true, 
                           allowEmptyArchive: true
            
            echo 'Publicando reporte HTML de Serenity...'
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'target/site/serenity',
                reportFiles: 'index.html',
                reportName: 'Serenity BDD Report',
                reportTitles: 'Serenity E2E Test Report'
            ])
        }
        
        success {
            echo 'Ejecutado exitosamente - Todos los tests pasaron'
        }
        
        failure {
            echo 'Falló - Revisa los tests y el reporte'
        }
        
        unstable {
            echo 'Inestable - Algunos tests fallaron'
        }
    }
}