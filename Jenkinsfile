pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Node Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Generate Prisma Client') {
            steps {
                sh 'npx prisma generate'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t library-management:latest .'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Library Management Docker image built successfully!'
            }
        }
    }
}