/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Tapp:
 *       type: oauth2
 *       flows:
 *         implicit:
 *          authorizationUrl: https://tapp.uk.auth0.com/authorize?audience=tapp
 *         authorizationCode:
 *           authorizationUrl: https://tapp.uk.auth0.com/authorize?audience=tapp
 *           tokenUrl: https://tapp.uk.auth0.com/oauth/token
 * */