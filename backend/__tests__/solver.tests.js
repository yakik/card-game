import {
    getCleanGrid,
    getGridWithUpdatedSolution, getSolutionFromGrid
} from "../modules/gridUtils";
  
import {
    getPossibleSolutions, getPossibleSolutionsGrid
  } from "../modules/solver";
  
describe("validation tests", () => {
    let grid;
    beforeEach(() => {
        grid = getCleanGrid(2);
    })
      
    test("get possible solutions", () => {

        grid = getGridWithUpdatedSolution(grid,0, 0, "2");
        grid = getGridWithUpdatedSolution(grid, 0, 1, "3");


        expect(getPossibleSolutions(grid,1,1)).toBe('14')
    });

    test("get possible solutions II", () => {

        grid = getGridWithUpdatedSolution(grid,0, 0, "2");
        grid = getGridWithUpdatedSolution(grid, 0, 1, "3");


        expect(getPossibleSolutions(grid, 3, 1)).toBe('124')
    });

    test("get possible solutions III", () => {

        grid = getGridWithUpdatedSolution(grid,0, 0, "2");
        grid = getGridWithUpdatedSolution(grid, 0, 1, "3");


        expect(getPossibleSolutions(grid,3,2)).toBe('1234')
    });

    test("get possible solutions solution with two digits", () => {

        grid = getGridWithUpdatedSolution(grid,0, 0, "23");


        expect(getPossibleSolutions(grid,0,1)).toBe('1234')
    });
    
    test("get possible solutions grid", () => {

        grid = getGridWithUpdatedSolution(grid,0, 0, "2");
        grid = getGridWithUpdatedSolution(grid, 0, 1, "3");

let possibleSolutionsGrid = getPossibleSolutionsGrid(grid)
        expect(getSolutionFromGrid(possibleSolutionsGrid, 0, 0)).toBe('')
        expect(getSolutionFromGrid(possibleSolutionsGrid, 1, 0)).toBe('14')
        expect(getSolutionFromGrid(possibleSolutionsGrid, 2, 2)).toBe('1234')
      });



})