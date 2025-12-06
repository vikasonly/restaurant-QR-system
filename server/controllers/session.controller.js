import Table from '../models/table.js';
import crypto from 'crypto';
export const session = async (req, res) => {
  try {
    const { devideId, qrSlug } = req.body;

    //using this qrSlug i will find the tables where the user scans the qr
    const table = await Table.findOne({ qrSlug });
    console.log(table);

    const tableNumber = table.tableNumber;
    const sessionToken = crypto.randomBytes(32).toString('hex');
    console.log(sessionToken);
  } catch (error) {}
};