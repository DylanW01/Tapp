/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       properties:
 *         bowsersCount:
 *           type: integer
 *           description: The total number of bowsers
 *         activeBowsersCount:
 *           type: integer
 *           description: The number of active water bowsers
 *         pendingTicketCount:
 *           type: integer
 *           description: The number of pending support tickets
 *         activeTicketCount:
 *           type: integer
 *           description: The number of active support tickets
 *         bowserDownCount:
 *           type: integer
 *           format: date
 *           description: The number of bowsers unavailable
 *       example:
 *         bowsersCount: 68
 *         activeBowsersCount: 56
 *         pendingTicketCount: 0
 *         activeTicketCount: 0
 *         bowserDownCount: 6
 */

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Statistics for info cards
 * /bowserticketstats:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: Stats for bowsers and support tickets
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Current system statistics
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Stats'
 * /bowserscount:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: The number of bowsers
 *     deprecated: true
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: The number of bowsers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 * /activebowserscount:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: The number of active bowsers
 *     deprecated: true
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: The number of active bowsers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 * /pendingticketcount:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: The number of pending support tickets
 *     deprecated: true
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: The number of pending support tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 * /activeticketcount:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: The number of active support tickets
 *     deprecated: true
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: The number of active support tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 * /bowserdowncount:
 *   get:
 *     security:
 *       - Tapp: []
 *     summary: The number of bowsers unavailable
 *     deprecated: true
 *     description: Returns the number of bowsers with the status "Problematic", "Down", "Out of Service", "Maintenance", or "Needs Attention"
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: The number of unavailable bowsers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */