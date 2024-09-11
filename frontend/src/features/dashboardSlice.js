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
      {
        name: 'CWPP Dashboard',
        widgets: [
          // { id: 3, name: 'Widget 3', text: 'Random text for Widget 3' },
          // { id: 4, name: 'Widget 4', text: 'Random text for Widget 4' },
        ],
      },
      {
        name: 'Registry Scan',
        widgets: [
          // { id: 5, name: 'Widget 5', text: 'Random text for Widget 5' },
          // { id: 6, name: 'Widget 6', text: 'Random text for Widget 6' },
        ],
      }
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
      const { categoryName, widgetName, widgetText } = action.payload;
      console.log(categoryName,widgetName,widgetText);
      const category = state.categories.find(
        (cat) => cat.name === categoryName
      );
      if (category) {
        const newWidget = {
          id: new Date().getTime(),
          name: widgetName,
          text: widgetText,
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
