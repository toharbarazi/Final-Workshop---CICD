pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials')
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
        DOCKER_IMAGE = 'your-dockerhub-username/your-image-name'  // שם התמונה שתדחוף ל-Docker Hub
        DOCKER_TAG = 'latest'  // תווית התמונה, כמו latest או תווית מותאמת אישית
        GIT_REPO = 'https://github.com/toharbarazi/Final-Workshop---CICD.git' // ה-repo שלך
        GIT_BRANCH = 'main'  // הסניף שאתה רוצה למשוך ממנו (הגדר את זה לפי הצורך)
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // שלב זה מבצע checkout מה-repository שלך ב-GitHub
                    echo 'Cloning repository from GitHub'
                    // גורם ל-Jenkins למשוך את הקוד מה-repository שלך ב-GitHub
                    git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
                }
            }
        }

        stage('Create Infrastructure') {
            steps {
                script {
                    // הפעלת playbook של Ansible להקמת התשתית
                    echo 'Running Ansible Playbook to create infrastructure on AWS'
                    sh 'ansible-playbook ansible/create-infra.yml -i ansible/inventory'
                }
            }
        }

        stage('Install Docker and App') {
            steps {
                script {
                    // הפעלת Playbook של Ansible להתקנת Docker והפעלת האפליקציה
                    echo 'Running Ansible Playbook to setup Docker and deploy app'
                    sh 'ansible-playbook ansible/setup-docker.yml -i ansible/inventory'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // בניית Docker image מה-Dockerfile שנמצא בתיקיית docker
                    echo 'Building Docker Image'
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", "docker")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials')
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
        DOCKER_IMAGE = 'your-dockerhub-username/your-image-name'  // שם התמונה שתדחוף ל-Docker Hub
        DOCKER_TAG = 'latest'  // תווית התמונה, כמו latest או תווית מותאמת אישית
        GIT_REPO = 'https://github.com/toharbarazi/Final-Workshop---CICD.git' // ה-repo שלך
        GIT_BRANCH = 'main'  // הסניף שאתה רוצה למשוך ממנו (הגדר את זה לפי הצורך)
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // שלב זה מבצע checkout מה-repository שלך ב-GitHub
                    echo 'Cloning repository from GitHub'
                    // גורם ל-Jenkins למשוך את הקוד מה-repository שלך ב-GitHub
                    git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
                }
            }
        }

        stage('Create Infrastructure') {
            steps {
                script {
                    // הפעלת playbook של Ansible להקמת התשתית
                    echo 'Running Ansible Playbook to create infrastructure on AWS'
                    sh 'ansible-playbook ansible/create-infra.yml -i ansible/inventory'
                }
            }
        }

        stage('Install Docker and App') {
            steps {
                script {
                    // הפעלת Playbook של Ansible להתקנת Docker והפעלת האפליקציה
                    echo 'Running Ansible Playbook to setup Docker and deploy app'
                    sh 'ansible-playbook ansible/setup-docker.yml -i ansible/inventory'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // בניית Docker image מה-Dockerfile שנמצא בתיקיית docker
                    echo 'Building Docker Image'
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", "docker")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // דחיפת התמונה ל-Docker Hub
                    echo 'Pushing Docker Image to Docker Hub'
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy Docker Image') {
            steps {
                script {
                    // פריסת התמונה על השרת
                    echo 'Deploying Docker Image to the infrastructure'
                    sh 'docker run -d -p 5000:5000 ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }

        stage('Destroy Infrastructure') {
            steps {
                script {
                    // אם נרצה להרוס את התשתית בסיום העבודה, נוכל להפעיל את ה-playbook הזה
                    echo 'Running Ansible Playbook to destroy infrastructure'
                    sh 'ansible-playbook ansible/destroy-infra.yml -i ansible/inventory'
                }
            }
        }
    }

    post {
        always {
            // תמיד לנקות, במקרה של הצלחה או כישלון
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}
                    // דחיפת התמונה ל-Docker Hub
                    echo 'Pushing Docker Image to Docker Hub'
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy Docker Image') {
            steps {
                script {
                    // פריסת התמונה על השרת
                    echo 'Deploying Docker Image to the infrastructure'
                    sh 'docker run -d -p 5000:5000 ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }

        stage('Destroy Infrastructure') {
            steps {
                script {
                    // אם נרצה להרוס את התשתית בסיום העבודה, נוכל להפעיל את ה-playbook הזה
                    echo 'Running Ansible Playbook to destroy infrastructure'
                    sh 'ansible-playbook ansible/destroy-infra.yml -i ansible/inventory'
                }
            }
        }
    }

    post {
        always {
            // תמיד לנקות, במקרה של הצלחה או כישלון
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}

