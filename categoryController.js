const Category = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.create({ name, description });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category', error: error.message });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };
