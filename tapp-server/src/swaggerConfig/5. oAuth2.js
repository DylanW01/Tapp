/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Tapp:
 *       type: oauth2
 *       flows:
 *         authorizationCode:
 *           authorizationUrl: https://tapp.uk.auth0.com/oauth/authorize
 *           tokenUrl: https://tapp.uk.auth0.com/oauth/token
 *           scopes:
 *             update:users: update any user
 *             read:users: read user accounts
 *             update:current-user: update current user
 *         oAuth2Implicit:
 *          authorizationUrl: https://tapp.uk.auth0.com/oauth/authorize
 *         scopes:
 *           update:users: update any user
 *           read:users: read user accounts
 *           update:current-user: update current user
 * */