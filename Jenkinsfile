pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Poojabajjuri/Library_Management.git'
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

        stage('Build Complete') {
            steps {
                echo 'Library Management project built successfully!'
            }
        }
    }
}