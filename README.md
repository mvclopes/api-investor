# Investor API

API REST desenvolvida para matéria de Desenvolvimento de Microsserviços e APIs da MBA em Mobile Development utilizando NodeJS e ExpressJS.

**OBS.:** Para rodar esse projeto, será necessário adicionar as seguintes variáveis de ambiente no arquivo `.env`: chave secreta para criptografia (`SECRET`) e url de conexão com banco de dados (`URLDB`).

### Tecnologias utilizadas

- Aplicação web com [Express](https://www.npmjs.com/package/express)
- Persistência de dados com [MongoDB](https://www.mongodb.com/pt-br) e [Mongoose](https://www.npmjs.com/package/mongoose)
- Autenticação com JWT Token com [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- Encriptado dados sensíveis com [Bcrypt](https://www.npmjs.com/package/bcrypt)
- Cliente gRPC com [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js) e [@grpc/proto-loader](https://www.npmjs.com/package/@grpc/proto-loader)
- Configuração das variáveis do projeto com [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)
- Logs das requisições HTTPs com [Morgan](https://www.npmjs.com/package/morgan)
- Configuração segura dos headers com [Helmet](https://www.npmjs.com/package/helmet)

### Endpoints disponíveis

* #### Cadastrar novo investidor

```
  POST /register
```

*Exemplo de request*
```
{
	"username": "user_name",
	"email": "email@email.com",
	"password": "admin",
	"fullname": "Full Name",
	"telephone": "1199999999"
}
```

* #### Logar 

```
  POST /login
```

*Exemplo de request*
```
{
	"username": "user_name",
	"password": "admin"
}
```

* #### Atualizar informações do investidor 

```
  PUT /update/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do investidor que deseja atualizar as informações **(Obrigatório)**. |

*Exemplo de request*
```
{
	"username": "user_name",
	"email": "email@email.com",
	"password": "admin",
	"fullname": "Full Name",
	"telephone": "1199999999"
}
```

* #### Atualizar senha do investidor 

```
  PUT /update-password/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | O ID do investidor que deseja atualizar as informações **(Obrigatório)**.|

*Exemplo de request*
```
{
	"password": "newpassword"
}
```

* #### Obter todos os investidores cadastrados

```
  GET /investors
```

* #### Obter todas informações bancárias do investidor

```
  POST /investor-banks-info
```

*Exemplo de request*
```
{
	"username": "username"
}
```

* #### Cadastrar nova informação bancária ao investidor

```
  POST /new-investor-bank-info
```

*Exemplo de request*
```
{
	"bankname": "bank name",
	"accounttype": "account type",
	"limitcard": "R$ 00,00"
}
```

* #### Atualizar informações bancárias do investidor

```
  POST /update-bank-info
```

*Exemplo de request*
```
{
	"id": "id",
	"bankInfo": {
		"bankname": "bank name",
		"accounttype": "account type",
		"limitcard": "R$ 00,00"
	}
}
```