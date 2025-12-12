import cloudinary from '../config/cloudinary.js';
import Menu from '../models/menu.js'

export const createMenu = async (req, res) => {
  
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


export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    
  
    const filter = { isAvailable: true };
    if (category) {
      filter.category = category;
    }
    
    const menuItems = await Menu.find(filter).sort({ category: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      data: menuItems,
      count: menuItems.length
    });
  } catch (error) {
    next(error);
  }
};


  