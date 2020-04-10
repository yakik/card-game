export function getSolutionFromGrid(grid, row, col) {
  return grid[row][col].solution;
}

export function getSubgridOfCell(grid, cellRow, cellCol) {
  let root = Math.sqrt(grid.length);
  for (let subgrid = 0; subgrid < root * root; subgrid++)
    if (
      cellRow >= Math.floor(subgrid / root) * root &&
      cellRow < Math.floor(subgrid / root) * root + root &&
      cellCol >= (subgrid % root) * root &&
      cellCol < (subgrid % root) * root + root
    )
      return subgrid;
}

export function getCleanGrid(root) {
  let grid = [];

  for (let row = 0; row < Math.pow(root, 2); row++) {
    grid[row] = [];
    for (let col = 0; col < Math.pow(root, 2); col++) {
      grid[row][col] = { given: false, solution: "" };
    }
  }
  return grid;
}

function getGridCopy(grid) {
  return grid.map(function(row) {
    return row.slice();
  });
}

export function getGridWithUpdatedSolution(grid, row, col, solution) {
  let newGrid = getGridCopy(grid);
  newGrid[row][col].solution = solution;
  return newGrid;
}

export function getGridWithToggledGiven(grid, row, col) {
  let newGrid = getGridCopy(grid);
  newGrid[row][col].given = !newGrid[row][col].given;
  return newGrid;
}

export function getDuplicates(cellGroup) {
  const allDigits = "0123456789".split("");
  let allDuplicates = [];
  for (let digitIndex = 0; digitIndex < allDigits.length; digitIndex++) {
    let duplicates = cellGroup.filter(
      item => item.solution == allDigits[digitIndex]
    );
    if (duplicates.length > 1) allDuplicates = allDuplicates.concat(duplicates);
  }
  return allDuplicates;
}

export function getRowNoSplitSolution(grid, row) {
  let returnedRow = [];
  for (let col = 0; col < grid.length; col++)
  returnedRow.push({
    row: row,
    col: col,
    solution:  getSolutionFromGrid(grid, row, col)
  });
  return returnedRow; 
}

export function getColumnNoSplitSolution(grid, col) {
  let returnedColumn = [];
  for (let row = 0; row < grid.length; row++)
  returnedColumn.push({
    row: row,
    col: col,
    solution:  getSolutionFromGrid(grid, row, col)
  });
  return returnedColumn; 
}

export function getSubgridNoSplitSolution(grid, subgrid, root) {
  let returnedSubgrid = [];
  for (
    let row = Math.floor(subgrid / root) * root;
    row < Math.floor(subgrid / root) * root + root;
    row++
  )
    for (
      let col = (subgrid % root) * root;
      col < (subgrid % root) * root + root;
      col++
    ) {
        returnedSubgrid.push({
          row: row,
          col: col,
          solution: getSolutionFromGrid(grid, row, col)
        });
    }
  return returnedSubgrid;
}

export function getRow(grid, row) {
  let returnedRow = [];
  for (let col = 0; col < grid.length; col++) {
    let solutions = getSolutionFromGrid(grid, row, col).split("");
    for (
      let solutionIndex = 0;
      solutionIndex < solutions.length;
      solutionIndex++
    )
      returnedRow.push({
        row: row,
        col: col,
        solution: solutions[solutionIndex]
      });
  }
  return returnedRow;
}

export function getColumn(grid, col) {
  let returnedCol = [];
  for (let row = 0; row < grid.length; row++) {
    let solutions = getSolutionFromGrid(grid, row, col).split("");
    for (
      let solutionIndex = 0;
      solutionIndex < solutions.length;
      solutionIndex++
    )
      returnedCol.push({
        row: row,
        col: col,
        solution: solutions[solutionIndex]
      });
  }
  return returnedCol;
}

export function getSubgrid(grid, subgrid, root) {
  let returnedSubgrid = [];
  for (
    let row = Math.floor(subgrid / root) * root;
    row < Math.floor(subgrid / root) * root + root;
    row++
  )
    for (
      let col = (subgrid % root) * root;
      col < (subgrid % root) * root + root;
      col++
    ) {
      let solutions = getSolutionFromGrid(grid, row, col).split("");
      for (
        let solutionIndex = 0;
        solutionIndex < solutions.length;
        solutionIndex++
      )
        returnedSubgrid.push({
          row: row,
          col: col,
          solution: solutions[solutionIndex]
        });
    }
  return returnedSubgrid;
}

export function getValidationCheck(grid) {
  let duplicates = [];
  for (let row = 0; row < grid.length; row++)
    duplicates = duplicates.concat(getDuplicates(getRow(grid, row)));

  for (let col = 0; col < grid.length; col++)
    duplicates = duplicates.concat(getDuplicates(getColumn(grid, col)));

  let root = Math.sqrt(grid.length);
  for (let subgrid = 0; subgrid < root * root; subgrid++)
    duplicates = duplicates.concat(
      getDuplicates(getSubgrid(grid, subgrid, root))
    );

  return {
    isValid: duplicates.length == 0 ? true : false,
    invalidityDetails: duplicates
  };
}
