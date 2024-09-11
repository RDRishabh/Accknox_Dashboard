import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../features/dashboardSlice'; // Only import addCategory

const AddCategoryModal = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      dispatch(addCategory({ categoryName })); // Dispatch only the categoryName
      onClose(); // Close the modal after adding the category
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
