/*import {
    getCleanGrid,
    getGridWithUpdatedSolution,
    getGridWithToggledGiven
  } from "../utils/gridUtils";
  
*/  
  
  //const sudokuRoot = 3;
  
  export function getInitialState() {
    return {
     
    };
  }
  
  export function rootReducer(state, action) {
      let newState;
      switch (action.type) {
        case "RESET_STORE":
          return getInitialState(action.root );
        case "TOGGLE_INITIAL":
          newState = Object.assign({}, state);
         
          return newState;
        default:
          return state;
      }
  }