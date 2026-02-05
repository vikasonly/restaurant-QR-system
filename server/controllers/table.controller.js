import crypto from 'crypto';
import QRCode from 'qrcode'; // FIXED IMPORT
import Table from '../models/table.js';
import { successResponse } from '../utils/successResponse.js';
import os from 'os';

export const createTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    // Generate QR slug
    const qrSlug = crypto.randomBytes(6).toString('hex');

    //Note added on 16-12-2025 for fetching dynamic ip address for development environment
    const data = os.networkInterfaces()['Wi-Fi'];
    let ipAddress = null;
    for (const el of data) {
      if (el.family === 'IPv4') ipAddress = el.address;
    }
    console.log(ipAddress);
    // Generate QR  using the current ip
    const qrCodeURL = `http://${ipAddress}:5173/welcome?qr=${qrSlug}`;

    // Generate QR image (Data URL)
    QRCode.toDataURL(qrCodeURL, async (err, url) => {
      console.log(url);
      const qrImage = url;
      const table = new Table({
        tableNumber,
        capacity,
        qrImage,
        qrCodeURL,
        qrSlug,
      });

      await table.save();

      res.status(201).json({
        success: true,
        data: table,
      });
    });

    // Save table
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get table by slug ;
// http://localhost:3000/table/qr/:slug
export const getTableBySlug = async (req, res, next) => {
  try {
    //params //query params //req.body ;
    const { slug } = req.params;
    console.log(typeof slug);
    const filterObject = { qrSlug: slug, isActive: true };
    console.log(filterObject);

    const table = await Table.findOne({ qrSlug: slug, isActive: true });
    console.log(table);
    if (!table) {
      const error = new Error('No Table found with this slug');
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

//NOTE  task => getAlltables => admin verfiyToken ,checkRole(['admin'])
export const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    if (tables.length <= 0) {
      const error = new Error('No tables found');
      error.status = 404;
      throw error;
    }
    successResponse(res, 200, tables);
  } catch (error) {
    next(error);
  }
};

