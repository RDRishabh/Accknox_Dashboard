import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWidget } from '../features/dashboardSlice'; // Import updateWidget

const Editwidgetmodal = ({ category, widget, onClose }) => {
  const [widgetName, setWidgetName] = useState(widget.name);
  const [widgetText, setWidgetText] = useState(widget.text);
  const dispatch = useDispatch();

  const handleUpdateWidget = () => {
    dispatch(updateWidget({ 
      categoryName: category, 
      widgetId: widget.id, 
      newName: widgetName, 
      newText: widgetText 
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Widget</h2>
        <input
          type="text"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          placeholder={"Widget Name"}
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
          placeholder="Widget Description"
          className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            onClick={handleUpdateWidget}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Update
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

export default Editwidgetmodal;
