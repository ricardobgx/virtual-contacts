# Virtual Contacts - Backend

Backend da aplicação de contatos, o mesmo foi feito utilizando o PostgreSQL como base de dados e o Sequelize para permanência no banco.

## Variáveis de ambiente

Para utilizar a aplicação da forma correta você deve definir as seguintes variáveis de ambiente no arquivo .env na raiz da pasta do backend:

```
HOST={Endereco da maquina onde a API esta sendo executada. (ex: http://localhost:3000 ou www.api.com)}
PORT={Porta em que a API será executada}
DATABASE_URL={URL de conexão com o banco postgres em que serão armazenados os dados. ex: postgres://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME}
SENDGRID_API_KEY={Chave da API na plataforma SendGrid para envio de e-mails de verificação}
TOKEN_SECRET={Texto encriptado que serve como base para geração dos tokens de acesso}
```

## Dependências

Antes de executar a aplicação devemos primeiro instalar suas dependências, para fazer isso basta executar o comando a seguir na raiz da pasta backend:

```
npm install
```

## Execução

Depois de todos os requisitos cumpridos podemos executar a aplicação com o seguinte comando:

```
npm start
```
