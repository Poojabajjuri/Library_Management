pipeline {

    agent any

    tools {
        nodejs 'Node26'
    }

    environment {
        IMAGE_NAME = "pooja9989/library-management:latest"
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
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Docker image pushed successfully!'
            }
        }
        stage('Deploy Container') {
    steps {
        sh '''
        docker stop library-management || true
        docker rm library-management || true

        docker run -d \
        --name library-management \
        -p 3000:3000 \
        -e DATABASE_URL="postgresql://postgres:Iampooja@123@host.docker.internal:5432/library_db" \
        pooja9989/library-management:latest
        '''
    }
}

stage('Deployment Complete') {
    steps {
        echo 'Application deployed successfully!'
    }
}
    }
}