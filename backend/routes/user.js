// Definição dos esquemas a serem usados pela documentação Swagger.
/**
 * @swagger
 * components:
 *  schemas:
 *    NewUser:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: Nome do usuário.
 *          example: José Ricardo
 *        email:
 *          type: string
 *          description: E-mail do usuário.
 *          example: example@email.com
 *        password:
 *          type: string
 *          description: Senha de acesso do usuário ao sistema.
 *          example: example123
 *        isAdmin:
 *          type: boolean
 *          description: Identifica usuários administradores no sistema
 *          example: true
 *          required: false
 *    User:
 *      allOf:
 *        - $ref: '#/components/schemas/NewUser'
 *        - type: object
 *          properties:
 *            id:
 *              type: integer
 *              description: ID do usuário.
 *              example: 1
 *            isVerified:
 *              type: boolean
 *              description: Situação da verificação do e-mail do usuário.
 *              example: false
 *            isAdmin:
 *              type: boolean
 *              description: Identifica usuários administradores no sistema
 *              example: true
 *              required: true
 *    LoginUser:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: E-mail do usuário.
 *          example: example@email.com
 *        password:
 *          type: string
 *          description: Senha de acesso do usuário ao sistema.
 *          example: example123
 * */

const express = require("express");
const router = express.Router();
const verify = require("../utils/verifyToken");

// Importa o controller
const userController = require("../controllers/userController");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags:
 *      - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Os dados do usuário foram armazenados na base de dados.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Informa que o usuário foi cadastrado na aplicação
 *                   example: User created
 *       400:
 *         description: O e-mail informado já existe na base de dados.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Informa que o usuário já está cadastrado na aplicação
 *                   example: E-mail already registered
 */
router.post("/", userController.create);

/**
 * @swagger
 * /users/verify:
 *   get:
 *     summary: Faz a verificação de e-mails.
 *     tags:
 *      - users
 *     description: >
 *      Quando um novo usuário é cadastrado a aplicação envia um e-mail para ele, no e-mail tem um link para essa rota com um token que servirá para identificá-lo.
 *     parameters:
 *      - in: query
 *        name: token
 *        schema:
 *          type: string
 *          example: >
 *            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2IiwiaWF0IjoxNjQwNTMxOTY1LCJleHAiOjE2NDExMzY3NjV9.9PQYFzeMyHXW4pl0LhIiHxZj_ymvZUsbexFqjKdrgrY
 *        required: true
 *     responses:
 *       200:
 *         description: Mensagem de sucesso na verificação.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem informando que o e-mail foi verificado.
 *                   example: E-mail verified
 *       404:
 *         description: >
 *          Usuário não encontrado. Os dados do usuário fornecidos pelo token não condizem com os dados de nenhum usuário cadastrado na base de dados.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro na busca pelo usuário.
 *                   example: User not found
 */
router.get("/verify", userController.verifyEmail);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Recupera a lista de usuários.
 *     tags:
 *      - users
 *     parameters:
 *       - in: header
 *         name: Auth-Token
 *         schema:
 *           type: string
 *         required: true
 *     description: Recupera a lista de usuários cadastrados na agenda. Somente usuários administradores tem acesso.
 *     responses:
 *       200:
 *         description: Uma lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/", verify, userController.list);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Recupera um único usuário.
 *     tags:
 *      - users
 *     description: Recupera um único usuário cadastrado no banco pelo ID.
 *     parameters:
 *       - in: header
 *         name: Auth-Token
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do usuário a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Um único usuário.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
router.get("/:id", verify, userController.show);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuario.
 *     tags:
 *      - users
 *     description: Modifica os valores de um usuário já armazenado na base de dados, recuperado pelo ID.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     parameters:
 *       - in: header
 *         name: Auth-Token
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do usuário a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User updated
 */
router.patch("/:id", verify, userController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um único usuário.
 *     tags:
 *      - users
 *     description: Exclui um único usuário cadastrado no banco pelo ID.
 *     parameters:
 *       - in: header
 *         name: Auth-Token
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérico do usuário a ser excluido.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 */
router.delete("/:id", verify, userController.destroy);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Cria um token de acesso ao sistema para o usuário.
 *     tags:
 *      - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login realizado
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acesso ao sistema.
 *                   example: >
 *                     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2IiwiaWF0IjoxNjQwNTMxOTY1LCJleHAiOjE2NDExMzY3NjV9.9PQYFzeMyHXW4pl0LhIiHxZj_ymvZUsbexFqjKdrgrY
 *                 id:
 *                   type: string
 *                   description: Id do usuário logado.
 *                   example: 1
 *       404:
 *         description: E-mail ou senha inválidos. O e-mail ou a senha não condizem com os dados presentes no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro na autenticação.
 *                   example: Invalid e-mail or password
 *       400:
 *         description: E-mail não verificado. E-mail não foi verificado pelo usuário.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de e-mail não verificado.
 *                   example: E-mail is not verified
 */
router.post("/login", userController.login);

module.exports = router;
