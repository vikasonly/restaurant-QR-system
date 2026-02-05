import Session from '../models/session.js';
import Table from '../models/table.js';
import crypto from 'crypto';
import { successResponse } from '../utils/successResponse.js';
export const session = async (req, res, next) => {
  try {
    const { deviceId, qrSlug } = req.body;

    let tableNumber = null;
    
    // If qrSlug is provided, find the table
    if (qrSlug) {
      const table = await Table.findOne({ qrSlug });
      if (table) {
        tableNumber = table.tableNumber;
      }
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    console.log(sessionToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    console.log(expiresAt.toLocaleString());
    
    // Create session - tableNumber is optional (for guest without QR scan)
    const session = new Session({
      deviceId,
      tableNumber: tableNumber || null,
      sessionToken,
      expiresAt,
    });
    await session.save();

    successResponse(res, 201, { session, sessionToken });
  } catch (error) {
    next(error);
  }
};
