import {
   
} from "../modules/pack";
  
describe("engine integration tests", () => {
    let engine;
    beforeEach(() => {
        engine = getNewEngine();
    })
      
    skip.test("get possible solutions", () => {

        engineDispatch(createNewGame(TAKESIX,respondToGameManagerWithID))
        grid = getGridWithUpdatedSolution(grid,0, 0, "2");
        grid = getGridWithUpdatedSolution(grid, 0, 1, "3");


        expect(getPossibleSolutions(grid,1,1)).toBe('14')
    });

  


})