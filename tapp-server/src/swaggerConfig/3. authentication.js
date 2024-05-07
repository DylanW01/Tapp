/**
 * @swagger
 * components:
 *   schemas:
 *     New User:
 *       type: object
 *       required:
 *         - email
 *         - blocked
 *         - email_verified
 *         - given_name
 *         - family_name
 *         - name
 *         - picture
 *         - password
 *         - verify_email
 *       properties:
 *         email:
 *           type: string
 *           description: The users email address
 *         blocked:
 *           type: boolean
 *           description: Is the account locked
 *         email_verified:
 *           type: boolean
 *           description: Is the users email verified
 *         given_name:
 *           type: string
 *           description: The users first name
 *         family_name:
 *           type: string
 *           format: date
 *           description: The users surname
 *         name:
 *           type: string
 *           format: date
 *           description: The users full name
 *         picture:
 *           type: string
 *           description: URL of the user's profile picture
 *         password:
 *           type: string
 *           description: The users password
 *         verify_email:
 *           type: boolean
 *           description: Should send verification email
 *       example:
 *         email: demoemail@email.com
 *         blocked: false
 *         email_verified: false
 *         given_name: Dylan
 *         family_name: Warrell
 *         name: Dylan Warrell
 *         picture: https://via.placeholder.com/250
 *         password: $Test1234!   
 *         verify_email: true
 */

/**
 * @swagger
 * tags:
 *   name: User Accounts
 *   description: Account management
 * /users:
 *   post:
 *     security:
 *       - Tapp: []
 *     summary: Create a new user
 *     tags: [User Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/New User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error
 * /users/{id}:
 *   delete:
 *     security:
 *       - Tapp: []
 *     summary: Delete user account by id
 *     tags: [User Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: User deleted successfully
 *     404:
 *       description: User not found
 * /users/role/admin:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: Lists all the users with admin privileges
 *     tags: [User Accounts]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 * /tawktohash:
 *   post:
 *     summary: Gets hash for support widget
 *     tags: [User Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "email@email.com"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hash:
 *                   type: string
 *                   example: "abcde12345"
 *       500:
 *         description: Internal server error
 */