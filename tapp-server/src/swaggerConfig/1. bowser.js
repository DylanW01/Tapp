/**
 * @swagger
 * components:
 *   schemas:
 *     Bowsers:
 *       type: object
 *       required:
 *         - size
 *         - status
 *         - capacityPercentage
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the bowser
 *         lat:
 *           type: number
 *           description: The bowser latitude
 *         lng:
 *           type: number
 *           description: The bowser longitude
 *         size:
 *           type: string
 *           description: The size of the bowser
 *         createdOn:
 *           type: string
 *           format: date
 *           description: The auto-generated date the bowser was added
 *         lastTopUp:
 *           type: string
 *           format: date
 *           description: The last time the bowser was refilled
 *         status:
 *           type: string
 *           description: The current status of the bowser
 *         capacityPercentage:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           description: Current capacity of the bowser
 *       example:
 *         id: 1
 *         lat: 51.89853718014855
 *         lng: -2.1236882805782957
 *         size: Large
 *         createdOn: 2023-05-16 17:13:16
 *         lastTopUp: 2023-05-16 17:13:16
 *         status: Active
 *         capacityPercentage: 69   
 */



/**
 * @swagger
 * tags:
 *   name: Water Bowsers
 *   description: Bowser management
 * /bowsers:
 *   get:
 *     summary: Lists all the bowsers
 *     tags: [Water Bowsers]
 *     responses:
 *       200:
 *         description: The list of the bowsers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bowsers'
 *   post:
 *     summary: Create a new bowser
 *     tags: [Water Bowsers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bowsers'
 *     responses:
 *       200:
 *         description: The created bowser.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bowsers'
 *       500:
 *         description: Internal server error
 * /bowsers/{id}:
 *   get:
 *     summary: Get the bowser by id
 *     tags: [Water Bowsers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bowser id
 *     responses:
 *       200:
 *         description: The bowser response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bowsers'
 *       404:
 *         description: The bowser was not found
 *   put:
 *    summary: Update the bowser by the id
 *    tags: [Water Bowsers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The bowser id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bowsers'
 *    responses:
 *      200:
 *        description: The bowser was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bowsers'
 *      404:
 *        description: The bowser was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Soft delete the bowser by id
 *     tags: [Water Bowsers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bowser id
 *
 *     responses:
 *       200:
 *         description: The bowser was deleted
 *       404:
 *         description: The bowser was not found
 */