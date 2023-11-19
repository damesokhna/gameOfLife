const container = document.getElementById('grid');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('columns');
const cellColorInput = document.getElementById('cellColor');
const speedInput = document.getElementById('speed');
const cellShapeSelect = document.getElementById('cellShape');
const statsGeneration = document.getElementById('generation');
const statsPopulation = document.getElementById('population');
let rows = 25;
let cols = 50;
let interval;
let running = false;
let editMode = false;
let generation = 0;
let grid = createEmptyGrid();

function createEmptyGrid() {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

function resetGrid() {
  grid = createEmptyGrid();
  drawGrid();
  updateStats();
}

function startGame() {
  if (!running) {
    const selectedSpeed = speedInput.value;
    interval = setInterval(updateGrid, selectedSpeed);
    running = true;
    updateStartStopButton();
  }
}

function stopGame() {
  clearInterval(interval);
  running = false;
  updateStartStopButton();
}

function toggleStartStop() {
  if (running) {
    stopGame();
  } else {
    startGame();
  }
}

function initializeGame() {
  grid = createRandomGrid();
  drawGrid();
  updateStats();
}

function createRandomGrid() {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() < 0.5));
}

function drawGrid() {
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
  container.style.gridTemplateRows = `repeat(${rows}, 20px)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (cellShapeSelect.value === 'circle') {
        cell.classList.add('circle');
      }
      cell.style.backgroundColor = grid[i][j] ? cellColorInput.value : 'white';

      container.appendChild(cell);
    }
  }
}

function toggleCell(event) {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const cellSizeX = container.clientWidth / cols;
  const cellSizeY = container.clientHeight / rows;

  const col = Math.floor(x / cellSizeX);
  const row = Math.floor(y / cellSizeY);

  grid[row][col] = !grid[row][col];
  drawGrid();
  updateStats();
}

function updateGrid() {
  const newGrid = createEmptyGrid();
  let isGameAlive = false;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = countNeighbors(i, j);
      const isAlive = grid[i][j];

      if (isAlive && (neighbors < 2 || neighbors > 3)) {
        newGrid[i][j] = false;
      } else if (!isAlive && neighbors === 3) {
        newGrid[i][j] = true;
      } else {
        newGrid[i][j] = isAlive;
      }

      if (newGrid[i][j]) {
        isGameAlive = true;
      }
    }
  }

  grid = newGrid;
  drawGrid();
  updateStats();

  if (!isGameAlive) {
    stopGame();
  }

  generation++;
}

function countNeighbors(row, col) {
  const neighborsIndex = [
    [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
    [row, col - 1], [row, col + 1],
    [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
  ];

  return neighborsIndex.filter(([i, j]) => i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j]).length;
}

function toggleEditMode() {
  editMode = !editMode;
}

function updateStats() {
  let population = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        population++;
      }
    }
  }

  statsGeneration.textContent = generation;
  statsPopulation.textContent = population;
}

function updateStartStopButton() {
  const startStopButton = document.getElementById('startStopButton');

  if (running) {
    startStopButton.textContent = 'Stop';
  } else {
    startStopButton.textContent = 'Start';
  }
}

rowsInput.addEventListener('input', function () {
  rows = parseInt(this.value);
  grid = createEmptyGrid();
  drawGrid();
  updateStats();
});

colsInput.addEventListener('input', function () {
  cols = parseInt(this.value);
  grid = createEmptyGrid();
  drawGrid();
  updateStats();
});

cellColorInput.addEventListener('input', function () {
  drawGrid();
  updateStats();
});

speedInput.addEventListener('input', function () {
  const inverseSpeed = 1000 - parseInt(this.value);

  if (running) {
    stopGame();
    startGame(inverseSpeed);
  }
  updateStats();
});

cellShapeSelect.addEventListener('change', function () {
  drawGrid();
  updateStats();
});

container.addEventListener('click', toggleCell);
container.addEventListener('mousemove', function (event) {
  if (editMode) {
    toggleCell(event);
  }
});

// Initialiser la valeur de speed au maximum (1000) et lancer le jeu
speedInput.value = '1000';
startGame();

drawGrid();
updateStats();
