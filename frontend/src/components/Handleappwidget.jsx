import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiDelete } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import AddCategoryModal from './Addwidgetmodal'; // Fixed import name
import { removeCategory, addWidget } from '../features/dashboardSlice';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Editwidgetmodal from './Editwidgetmodal';

const HandleAppWidget = ({ category, categories, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [widgetName, setWidgetName] = useState('');
  const [showModalWidgetEdit, setShowModalWidgetEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [widgetDescription, setWidgetDescription] = useState('');

  const dispatch = useDispatch();

  // Updated to handle cases where `dashboard.categories` might not be present
  const cate = useSelector((state) => state.dashboard.categories || []);
  const widgets = cate.find((cat) => cat.name === selectedCategory)?.widgets || [];
  console.log(widgets);

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const handleEditWidget = (widgetN) => {
    console.log(widgetN)
    setWidgetName(widgetN)
    setShowModalWidgetEdit(true);
  }

  // Removed unused code
  // const handleRemoveCategory = (idx) => {
  //   dispatch(removeCategory({ categoryName: categories[idx] }));
  // };

  const handleCategorySwitch = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleAddWidget = () => {
    if (widgetName.trim() && widgetDescription.trim()) {
      dispatch(addWidget({ categoryName: selectedCategory, widgetName, widgetText: widgetDescription }));
      setWidgetName('');
      setWidgetDescription('');
    }
    // onClose(); 
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 p-6 transition-all duration-500 ease-in-out">
      {/* Close button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Widget</h2>
        <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700 transition-all">
          <IoClose />
        </button>
      </div>

      {/* Category Switch */}
      <div className="mb-5">
        <label className="block text-lg text-gray-600 font-medium mb-2">Select Category:</label>
        <div className="flex overflow-x-auto space-x-2 py-3 whitespace-nowrap scrollbar-hide">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
                selectedCategory === cat.name ? 'bg-blue-100 text-blue-600 border-b-4' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => handleCategorySwitch(cat.name)}
            >
              {cat.name.split(' ')[0]}
              {/* <div 
                className='pl-2'
                onClick={() => handleRemoveCategory(idx)}
              >
                <FiDelete/>
              </div> */}
            </div>
          ))}
          <button 
            className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-all"
            onClick={handleAddCategory}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Display Widgets */}
      <div className="mb-5">
        {widgets.length > 0 ? (
          <ul className="space-y-2">
            {widgets.map((widget, index) => (
              <li key={index} className="flex px-4 py-2 border border-gray-200 rounded-lg shadow-sm justify-between">
                
                <div className="flex">
                  <input type="checkbox" className='' />
                  <h6 className="text-sm pl-2 font-semibold text-gray-800">{widget.name}</h6>
                </div>
                <div onClick={()=>handleEditWidget(widget)} className="flex cursor-pointer">
                  <MdDelete className='w-8' />
                  <CiEdit className='w-8'/> 
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No widgets available for this category.</p>
        )}
      </div>

      {/* Widget Input Fields */}
      <div className="mb-4">
        <label className="block text-lg text-gray-600 font-medium mb-2">Widget Name:</label>
        <input
          type="text"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 transition-all duration-300"
          placeholder="Enter widget name"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg text-gray-600 font-medium mb-2">Widget Description:</label>
        <textarea
          value={widgetDescription}
          onChange={(e) => setWidgetDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-200 transition-all duration-300"
          placeholder="Enter widget description"
        />
      </div>

      {/* Add Widget Button */}
      <div className="mt-8">
        <button
          onClick={handleAddWidget}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-medium px-4 py-3 rounded-lg hover:shadow-lg hover:bg-blue-700 transition-all w-full"
        >
          Add Widget
        </button>
      </div>

      {showModal && (
        <AddCategoryModal
          category={selectedCategory}
          onClose={() => setShowModal(false)}
        />
      )}

      {showModalWidgetEdit && (
        <Editwidgetmodal
          category={selectedCategory}
          widget = {widgetName}
          onClose={() => setShowModalWidgetEdit(false)}
        />
      )}
    </div>
  );
};

export default HandleAppWidget;
