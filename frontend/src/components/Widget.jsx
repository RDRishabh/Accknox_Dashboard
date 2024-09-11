import React from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Widget = ({ widget, onRemove, onEdit }) => {
  
  
  return (
    <div className="bg-white shadow-md rounded-lg px-4 py-2 relative">
      <div className="absolute top-2 right-2 flex justify-end space-x-2">
        <button 
          className=""
          onClick={onEdit}
        >
          <CiEdit/>
        </button>
        <button
          className=""
          onClick={onRemove}
        >
          <MdDelete/>
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
      <p className="text-gray-700">{widget.text}</p>
    </div>
  );
};

export default Widget;
