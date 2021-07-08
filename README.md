# githubsearcher
------------------------------------------------------------------------
------------------------------------------------------------------------
INSTALAÇÃO
Aplicação roda em um container docker

------------------------------------------------------------------------
Necessário ter instalado docker e docker compose

Para instalação em servidor linux Ubuntu
  apt-get docker.io docker-compose
------------------------------------------------------------------------

------------------------------------------------------------------------
------------------------------------------------------------------------
CONFIGURANDO A APLICAÇÃO
  VARIÁVEIS DE CONFIGURAÇÃO
    Criar arquivo .env.deployment no root da aplicação
    Alterar os valores de [user],[password],[database]
    Criar um github token acessando https://github.com >> account >> settings >> Developer Settings >> Personal access tokens >> Generate new token e colar o valor em [gitHubToken]
-------------------------------------------------------------------------------
.env.deployment
-------------------------------------------------------------------------------
    APP_ENV=deployment
    #=====================================================================
    #=====================================================================
    #                       DATABASE CREDENTIALS
    DB_USER=[user]
    DB_PASSWORD=[password]
    DB_DATABASE=[database]
    DB_HOST=localhost

    DB_QUEUELIMIT=0
    DB_CONNECTIONLIMIT=100
    #=====================================================================
    #=====================================================================
    #                       GITHUB CREDENTIALS
    GITHUB_TOKEN=[gitHubToken]
    GITHUB_USER=[gitUser]
-------------------------------------------------------------------------------
.env.test
-------------------------------------------------------------------------------
    APP_ENV=test
    #=====================================================================
    #=====================================================================
    #                       DATABASE CREDENTIALS
    DB_USER=githubSearcherTest
    DB_PASSWORD=githubSearcherTest
    DB_DATABASE=githubSearcherTest
    DB_HOST=localhost

    DB_QUEUELIMIT=0
    DB_CONNECTIONLIMIT=100
    #=====================================================================
    #=====================================================================
    #                       GITHUB CREDENTIALS
    GITHUB_TOKEN=[gitHubToken]
    GITHUB_USER=[gitUser]
    
CONFIGURANDO MYSQL DATABASE
  INICIAL
    executar o comando docker-compose up

  CONFIGURANDO BASE DE DADOS
    Configuração do MySQL
      MYSQL_HOST -> localhost
      MYSQL_PORT -> 3306
      MYSQL_USER= root e 
      MYSQL_PASSWORD = (defaults root. Para alterar, acessar docker-compose.yml >> db >> environment >>  MYSQL_ROOT_PASSWORD=[newPassword]

    Abra o mysql na linha de comando
      mysql -u[user] -p[MYSQL_PASSWORD]
      BASE NORMAL (alterar DB_USER, DB_PASSWORD, DB_DATABASE)
        
      BASE TEST (valores padrão para DB_USER, DB_PASSWORD, DB_DATABASE = githubSearcherTest)

        exit;
      
CONFIGURAÇÃO DE EXECUÇÃO
    comando -> deployment -> npm run-script runAPP
    
MODO DEPLOYMENT
  Após o comando docker-compose up e a configuração da base, a aplicação já estará rodando em modo deployment
  Para alterar a applicação novamente para modo deployment, altere o command em docker-compose.yml e CMD em Dockerfile para npm run-scritp runApp

MODO TESTE
  Interromper a execução da applicação no docker
  Alterar o valor de command em command em docker-compose.yml e CMD em Dockerfile para npm run-scritp runApp
  Executar docker-compose up
