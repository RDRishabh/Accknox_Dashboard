import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Widget from './Widget';
import HandleAppWidget from './Handleappwidget'; // Import the widget overlay
import { removeWidget } from '../features/dashboardSlice';

const Dashboard = () => {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('CSPM Executive Dashboard');
  const [query, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  //  console.log(categories[0].widgets)

  const handleRemoveWidget = (categoryName, widgetId) => {
    dispatch(removeWidget({ categoryName, widgetId }));
  };

  const handleAddWidget = (categoryName) => {
    setCurrentCategory(categoryName);
    setShowWidgetPanel(true);
  };

  const handleCloseWidgetPanel = () => {
    setShowWidgetPanel(false);
  };

  useEffect(() => {
    const filtered = categories.map(category => ({
      ...category,
      widgets: category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(query.toLowerCase())
      ),
    }));
    setFilteredCategories(filtered);
  }, [query, categories]);

  return (
    <div className="px-8 relative">
      <div className="w-full flex justify-between items-center mb-6 px-6 py-4 bg-gray-50 shadow-md rounded-lg">
        <h4 className="font-semibold text-3xl text-gray-800">CNAPP Dashboard</h4>
        <div className="flex items-center space-x-4">
          <input 
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder='Search...'
          />
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all"
            onClick={() => setShowWidgetPanel(true)}
          >
            + Add Widget
          </button>
        </div>
      </div>


      {filteredCategories.map((category, idx) => (
        <div key={idx} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="flex-shrink-0 w-[450px]">
                  <Widget
                    widget={widget}
                    onRemove={() => handleRemoveWidget(category.name, widget.id)}
                  />
                </div>
              ))}
              <div className="flex-shrink-0 w-[250px]">
                <button
                  onClick={() => handleAddWidget(category.name)}
                  className="border-dashed text-black border-black border-2 bg-[#d9d9d9] px-4 py-2 rounded w-full h-full"
                >
                  + Add Widget
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {showWidgetPanel && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 z-40">
          <HandleAppWidget
            category={currentCategory}
            categories={categories}
            onClose={handleCloseWidgetPanel}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
