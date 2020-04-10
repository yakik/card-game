import {
  getValidationCheck,
  getCleanGrid,
  getGridWithUpdatedSolution,
  getDuplicates
} from "../modules/gridUtils";

describe("validation tests", () => {
  let grid;
  beforeEach(() => {
    grid = getCleanGrid(2);
  });

  test("get duplicates no duplicates", () => {
    expect(
      getDuplicates([
        { row: 1, col: 0, solution: 5 },
        { row: 1, col: 0, solution: 4 }
      ])
    ).toStrictEqual([]);
  });

  test("get duplicates with duplicates", () => {
    expect(
      getDuplicates([
        { row: 1, col: 0, solution: 5 },
        { row: 1, col: 0, solution: 4 },
        { row: 1, col: 5, solution: 5 }
      ])
    ).toStrictEqual([
      { row: 1, col: 0, solution: 5 },
      { row: 1, col: 5, solution: 5 }
    ]);
  });

  test(" double solution in row", () => {
    grid = getGridWithUpdatedSolution(grid, 1, 1, "2");
    grid = getGridWithUpdatedSolution(grid, 1, 3, "2");
    expect(getValidationCheck(grid)).toStrictEqual({
      isValid: false,
      invalidityDetails: [
        { row: 1, col: 1, solution: "2" },
        { row: 1, col: 3, solution: "2" }
      ]
    });
  });

  test(" double solution in colums", () => {
    grid = getGridWithUpdatedSolution(grid, 1, 1, "2");
    grid = getGridWithUpdatedSolution(grid, 3, 1, "2");
    expect(getValidationCheck(grid)).toStrictEqual({
      isValid: false,
      invalidityDetails: [
        { row: 1, col: 1, solution: "2" },
        { row: 3, col: 1, solution: "2" }
      ]
    });
  });

  test(" double solution in subgrid", () => {
    grid = getGridWithUpdatedSolution(grid, 0,0, "2");
    grid = getGridWithUpdatedSolution(grid, 1, 1, "2");
    expect(getValidationCheck(grid)).toStrictEqual({
      isValid: false,
      invalidityDetails: [
        { row: 0, col: 0, solution: "2" },
        { row: 1, col: 1, solution: "2" }
      ]
    });
  });

  test("no double solution in columns, solution more than one digit", () => {
    grid = getGridWithUpdatedSolution(grid, 1, 1, "2");
    grid = getGridWithUpdatedSolution(grid, 3, 1, "23");
    grid = getGridWithUpdatedSolution(grid, 3, 3, "2");
    expect(getValidationCheck(grid).isValid).toBe(false)
    expect(getValidationCheck(grid).invalidityDetails.length).toBe(4)
  });

  test("valid solution", () => {
    grid = getGridWithUpdatedSolution(grid, 1, 1, "2");
    grid = getGridWithUpdatedSolution(grid, 3, 1, "3");
    expect(getValidationCheck(grid)).toStrictEqual({
      isValid: true,
      invalidityDetails: []
    });
  });
});
