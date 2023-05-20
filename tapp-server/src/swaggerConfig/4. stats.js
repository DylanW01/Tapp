/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Statistics for info cards
 * /bowserscount:
 *   get:
 *     summary: The number of bowsers
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
 *     summary: The number of active bowsers
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
 *     summary: The number of pending support tickets
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
 *     summary: The number of active support tickets
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
 *     summary: The number of bowsers unavailable
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