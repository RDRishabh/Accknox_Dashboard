import React from 'react';

const Widget = ({ widget, onRemove }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        onClick={onRemove}
      >
        ✕
      </button>
      <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
      <p className="text-gray-700">{widget.text}</p>
    </div>
  );
};

export default Widget;
