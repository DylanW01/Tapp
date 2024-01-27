/**
 * @swagger
 * components:
 *   schemas:
 *     Tickets:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - type
 *         - status
 *         - priority
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the ticket
 *         title:
 *           type: string
 *           description: The title of the ticket
 *         description:
 *           type: string
 *           description: The ticket description
 *         type:
 *           type: string
 *           description: The type of support ticket
 *         status:
 *           type: string
 *           description: The date the book was added
 *         lat:
 *           type: number
 *           description: The latitude attached to the ticket
 *         lng:
 *           type: number
 *           description: The longitude attached to the ticket
 *         priority:
 *           type: string
 *           description: The ticket priority
 *       example:
 *         id: 1
 *         title: New bowser request
 *         description: Can you please add a water bowser to GCHQ Cheltenham?
 *         type: New Location
 *         status: Closed
 *         lat: 51.89853718014855
 *         lng: -2.1236882805782957
 *         priority: High   
 */


/**
 * @swagger
 * tags:
 *   name: Support Tickets
 *   description: Customer support tickets
 * /tickets:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: Lists all the tickets
 *     tags: [Support Tickets]
 *     responses:
 *       200:
 *         description: The list of the tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tickets'
 *   post:
 *     security:
 *       - Tapp: []
 *     summary: Create a new ticket
 *     tags: [Support Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tickets'
 *     responses:
 *       200:
 *         description: The created ticket.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tickets'
 *       500:
 *         description: Internal server error
 * /tickets/{id}:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: Get the ticket by id
 *     tags: [Support Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket id
 *     responses:
 *       200:
 *         description: The ticket response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tickets'
 *       404:
 *         description: The ticket was not found
 *   put:
 *     security:
 *       - Tapp: []
 *    summary: Update the ticket by the id
 *    tags: [Support Tickets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ticket id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tickets'
 *    responses:
 *      200:
 *        description: The ticket was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tickets'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     security:
 *       - Tapp: []
 *     summary: Soft delete the ticket by id
 *     tags: [Support Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket id
 *
 *     responses:
 *       200:
 *         description: The ticket was deleted
 *       404:
 *         description: The ticket was not found
 */