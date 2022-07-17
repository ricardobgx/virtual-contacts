# Contacts

Repositório para o Mini-Projeto 2 da disciplina de Programação para a Web 2. A aplicação foi feita utilizando o VueJS como framework front-end.

## Variáveis de ambiente

Para utilizar a aplicação da forma correta você deve definir as seguintes variáveis de ambiente no arquivo .env na raiz do projeto:

```
VUE_APP_ROOT_API_URL={URL da API REST que fornecerá os dados para a aplicação}
```

## Dependências

Antes de executar o projeto devemos primeiro instalar suas dependências, para fazer isso basta executar o comando a seguir na raiz do projeto:

```
yarn install
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

Os arquivos gerados devem ir para a pasta dist.
