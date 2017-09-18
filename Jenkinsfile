pipeline {
    agent any
    parameters {
        choice(
            choices: 'ACS\nHamilton API\nWeb UI\nAll',
            description: 'Choose any type',
            name: 'TESTS')
        choice(
            choices: 'Agent1\nAgent2',
            description: 'Choose any agent',
            name: 'AGENT')
        choice(
            choices: 'Target1\nTarget2',
            description: 'Choose any target',
            name: 'TARGET')
        choice(
            choices: 'Chrome\nFirefox\nIE\nAll',
            description: 'Choose any browser',
            name: 'BROWSER')
    }
    stages {
        stage('ACS Tests') {
            when {
                expression { params.TESTS == 'ACS' || params.TESTS == 'All'}
            }
            steps {
                echo "ACS tests triggered"
                sh 'python tests/acs/test.py'
            }
        }
        stage('Hamilton API Tests') {
            when {
                expression { params.TESTS == 'Hamilton API' || params.TESTS == 'All'}
            }
            steps {
                echo "Hamilton API tests triggered"
                sh 'python tests/hamiltonapi/test.py'
            }
        }
        stage('Web UI Tests') {
            when {
                expression { params.TESTS == 'Web UI' || params.TESTS == 'All'}
            }
            steps {
                echo "Web UI tests triggered"
                sh 'python tests/webui/test.py'
            }
        }
    }
}