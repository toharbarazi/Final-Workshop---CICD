pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials')
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/toharbarazi/Final-Workshop---CICD.git', credentialsId: 'your-git-credentials-id'
            }
        }
        stage('Launch EC2') {
            steps {
                script {
                    def instanceInfo = sh(script: '''
                        aws ec2 describe-instances --filters "Name=tag:Name,Values=production-tohar" --query "Reservations[*].Instances[*].PublicIpAddress" --output text
                    ''', returnStdout: true).trim()
                    env.TARGET_HOST = instanceInfo
                }
            }
        }
        stage('Check SSH Connectivity') {
            steps {
                script {
                    // ניסוי להתחבר לשרת דרך SSH כדי לבדוק אם ההתחברות מצליחה
                    def sshCheck = sh(script: """
                        ssh -o StrictHostKeyChecking=no -i ${EC2_SSH_KEY_PATH} ec2-user@${TARGET_HOST} 'echo "SSH connection successful"'
                    """, returnStdout: true, returnStatus: true)

                    // אם לא הצליח להתחבר, יוחזר קוד שגיאה 1
                    if (sshCheck != 0) {
                        error "Failed to connect to EC2 instance via SSH"
                    } else {
                        echo "SSH connection successful"
                    }
                }
            }
        }
        stage('Run Ansible Playbook') {
            steps {
                sshagent(['ec2-key']) {
                    sh "ansible-playbook -u ec2-user -i ${TARGET_HOST}, ansible/create-infra.yml --extra-vars 'target_host=${TARGET_HOST}'"
                }
            }
        }
    }
    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
