# Virtual Contacts - Frontend

Frontend da aplicação de contatos, o mesmo foi feito utilizando o VueJS como framework para construção da interface.

## Variáveis de ambiente

Para utilizar a aplicação da forma correta você deve definir as seguintes variáveis de ambiente no arquivo .env na raiz da pasta frontend:

```
VUE_APP_ROOT_API_URL={URL da API REST que fornecerá os dados para a aplicação}
```

## Dependências

Antes de executar a aplicação devemos primeiro instalar suas dependências, para fazer isso basta executar o comando a seguir na raiz do projeto:

```
yarn
```

## Execução

Depois de todos os requisitos cumpridos podemos executar a aplicação com o seguinte comando:

```
yarn serve
```

## Produção

Para fazer o deploy da aplicação em uma plataforma você deve executar o seguinte comando:

```
yarn build
```

Os arquivos gerados vão para a pasta **dist**.
