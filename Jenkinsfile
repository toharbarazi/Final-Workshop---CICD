pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-credentials')
        AWS_SECRET_ACCESS_KEY = credentials('aws-credentials')
    }
    stages {
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
        stage('Run Ansible Playbook') {
            steps {
                sshagent(['ec2-key']) {
                    sh "ansible-playbook -u ec2-user -i ${TARGET_HOST}, ansible/create-infra.yml --extra-vars 'target_host=${TARGET_HOST}'"
                }
            }
        }
    }
}

