import cloudinary from '../config/cloudinary.js';
import Menu from '../models/menu.js';

export const createMenu = async (req, res) => {
  // how can i access the image path here
  console.log(req.file);

  try {
    const filePath = req?.file?.path || null;
    console.log(filePath);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'menu',
    });
    console.log(result);
    const menuItem = await Menu.create({
      ...req.body,
      image: result.secure_url,
    });
    res.status(201).json({
      data: menuItem,
      message: 'New menu item addedd',
    });
  } catch (error) {}
};

//name ,description ,  price = {req.body};

// Get all menu items
export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 100 } = req.query;
    console.log(limit);
    // Build filter object
    const filter = { isAvailable: true };
    if (category) {
      filter.category = category;
    }

    const menuItems = await Menu.find(filter)
      .sort({ category: 1, name: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalDocument = await Menu.countDocuments();
    console.log(totalDocument);
    res.status(200).json({
      success: true,
      length: menuItems.length,
      data: menuItems,
      count: menuItems.length,
      pagination: {
        page,
        limit,
        totalDocument,
        totalPages: Math.ceil(totalDocument / limit),
        hasNextPage: page < Math.ceil(totalDocument / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

