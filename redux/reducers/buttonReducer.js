const initialState = {
  isLoading: false
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'BUTTON_LOADING':
      return { ...state, isLoading: true };
    case 'BUTTON_NOT_LOADING':
      return { ...state, isLoading: false };
    default:
      return {...state};
  }
}