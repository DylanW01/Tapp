/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Tapp:
 *       type: oauth2
 *       flows:
 *         implicit:
 *          authorizationUrl: https://tapp.uk.auth0.com/authorize?audience=tapp
 *          scopes:
 *            update:users: Can update any user
 *            update:current-user: Can update own user
 *            read:users: Can read users
 *         authorizationCode:
 *           authorizationUrl: https://tapp.uk.auth0.com/authorize?audience=tapp
 *           tokenUrl: https://tapp.uk.auth0.com/oauth/token
 *           scopes:
 *             update:users: Can update any user
 *             update:current-user: Can update own user
 *             read:users: Can read users
 * */