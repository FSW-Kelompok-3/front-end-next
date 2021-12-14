const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isGamePlayed: false,
  isGamePlayedDummy: [],
  allGame: [],
  gameDetailPosition: 0,
  currentUserId: [],
  round: 1,
  score: 0,
  history: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'USER_LOG_IN':
      return { ...state, isLoggedIn: true };
    case 'USER_LOG_OUT':
      return { ...state, isLoggedIn: false };
    case 'BUTTON_LOADING':
      return { ...state, isLoading: true };
    case 'BUTTON_NOT_LOADING':
      return { ...state, isLoading: false };
    case 'Is_Game_Played':
      return { ...state, isGamePlayed: action.payload };
    case 'Is_Game_Played_Dummy':
      return { ...state, isGamePlayedDummy: [...state.isGamePlayedDummy, action.payload] };
    case 'Reset_Game_Played_Dummy':
      return { ...state, isGamePlayedDummy: [] };
    case 'Loaded_All_Game':
      return { ...state, allGame: action.payload };
    case 'Game_Detail_Position':
      return { ...state, gameDetailPosition: action.payload };
    case 'Get_Current_User_Id':
      return { ...state, currentUserId: action.payload };
    case 'ROUND_INCREMENT':
      return { ...state, round: state.round + 1 }
    case 'SCORE_INCREMENT':
      return { ...state, score: state.score + 1 }
    case 'SCORE_DECREMENT':
      return { ...state, score: state.score - 1 }
    case 'PUSH':
      return { ...state, history: [...state.history, action.payload] }
    default:
      return { ...state };
  }
}