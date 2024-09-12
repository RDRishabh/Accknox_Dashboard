import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage or use default values
const loadInitialState = () => {
  const savedState = localStorage.getItem('dashboardState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    categories: [
      {
        name: 'CSPM Executive Dashboard',
        widgets: [
          // { id: 1, name: 'Widget 1', text: 'Random text for Widget 1' },
          // { id: 2, name: 'Widget 2', text: 'Random text for Widget 2' },
        ],
      },
    ],
  };
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: loadInitialState(),
  reducers: {
    addCategory: (state, action) => {
      const { categoryName } = action.payload;
      const newCategory = {
          name: categoryName,
          widgets: [],
      };
      state.categories.push(newCategory);
    },
    removeCategory: (state, action) => {
        const { categoryName } = action.payload;
        state.categories = state.categories.filter(
            (category) => category.name !== categoryName
        );
    },
    addWidget: (state, action) => {
      const { categoryName, widgetName, widgetText, widgetImage } = action.payload; // Added widgetImage
      console.log(widgetImage);

      const category = state.categories.find(
        (cat) => cat.name === categoryName
      );
      
      if (category) {
        const newWidget = {
          id: new Date().getTime(),
          name: widgetName,
          text: widgetText,
          image: widgetImage ? widgetImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png", // Added image property to store the widget image
        };
        
        category.widgets.push(newWidget);
        saveStateToLocalStorage(state);
      }
    },    
    updateWidget: (state,action) => {
      // Add code to update widget
      const { categoryName, widgetId, newName, newText } = action.payload;
      const category = state.categories.find(
        (cat) => cat.name === categoryName
      );
      if (category) {
        const widget = category.widgets.find((widget) => widget.id === widgetId);
        if (widget) {
          widget.name = newName;
          widget.text = newText;
          saveStateToLocalStorage(state);
        }
      }
    },
    removeWidget: (state, action) => {
      const { categoryName, widgetId } = action.payload;
      const category = state.categories.find(
        (cat) => cat.name === categoryName
      );
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
        saveStateToLocalStorage(state);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      saveStateToLocalStorage(state);
    },
  },
});

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('dashboardState', JSON.stringify(state));
};

export const { addCategory, removeCategory, addWidget, updateWidget, removeWidget, setSearchQuery } = dashboardSlice.actions;
export default dashboardSlice.reducer;
