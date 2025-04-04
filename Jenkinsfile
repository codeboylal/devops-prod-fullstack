// V1- Updated

pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/codeboylal/devops-prod-fullstack.git'
        BRANCH_NAME = 'devops'
        CREDENTIALS_ID = 'git-jenkins-token'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Code Fetch') {
            steps {
                echo 'Fetching code from GitHub'
                checkout([$class: 'GitSCM', 
                    branches: [[name: "*/${BRANCH_NAME}"]], 
                    userRemoteConfigs: [[url: REPO_URL, credentialsId: CREDENTIALS_ID]]
                ])
            }
        }

        stage('Build and Deploy') {
            steps {
                echo 'Using the secret `.env` file from Jenkins'

                withCredentials([file(credentialsId: 'env-file', variable: 'SECRET_ENV_FILE')]) {
                    echo 'Stopping existing containers and cleaning up unused Docker objects'

                    sh script: """
                        docker-compose down --volumes || true
                        docker system prune -a -f --volumes || true
                        docker-compose --env-file \$SECRET_ENV_FILE up --build -d
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
