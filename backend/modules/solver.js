import {
  getRowNoSplitSolution,
  getColumnNoSplitSolution,
  getSubgridNoSplitSolution,
  getSubgridOfCell,
  getCleanGrid,
    getSolutionFromGrid,
    getGridWithUpdatedSolution
} from "./gridUtils";

export function getPossibleSolutionsGrid(grid) {
    let solutionGrid = getCleanGrid(Math.sqrt(grid.length));

  for (let row = 0; row < grid.length; row++)
    for (let col = 0; col < grid.length; col++) {
        if (getSolutionFromGrid(grid, row, col).length === 0) {
        solutionGrid = getGridWithUpdatedSolution(
            solutionGrid,
          row,
          col,
          getPossibleSolutions(grid, row, col)
        );
      }
        }
  return solutionGrid;
}

export function getPossibleSolutions(grid, row, col) {
  let allCellsOneDigit = getRowNoSplitSolution(grid, row).
    concat(getColumnNoSplitSolution(grid, col).
    concat(
      getSubgridNoSplitSolution(
        grid,
        getSubgridOfCell(grid, row, col),
        Math.sqrt(grid.length)
      )
    ))
  
  let possibleSolutions = [];
    let allDigits = []
    for (let digit = 1; digit <= Math.sqrt(grid.length) * Math.sqrt(grid.length);digit++)
        allDigits.push(digit)
  for (let digitIndex = 0; digitIndex < allDigits.length; digitIndex++) {
    let digitInSolution = false;
    for (
      let solutionIndex = 0;
      solutionIndex < allCellsOneDigit.length;
      solutionIndex++
    ) {
      if (allCellsOneDigit[solutionIndex].solution == allDigits[digitIndex]) {
        digitInSolution = true;
      }
    }
    if (!digitInSolution) possibleSolutions.push(allDigits[digitIndex]);
  }

  return possibleSolutions.join("");
}
