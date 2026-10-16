const N = 8;
const QUEEN_DOT = '<span class="queen"></span>';

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let queens = createEmpty();
const cells = [];

function createEmpty() {
  return Array.from({ length: N }, () => Array(N).fill(false));
}

function attacks(r1, c1, r2, c2) {
  return r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2);
}

function findConflicts() {
  const placed = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (queens[r][c]) placed.push([r, c]);
    }
  }

  const conflicts = new Set();
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const [r1, c1] = placed[i];
      const [r2, c2] = placed[j];
      if (attacks(r1, c1, r2, c2)) {
        conflicts.add(`${r1},${c1}`);
        conflicts.add(`${r2},${c2}`);
      }
    }
  }
  return conflicts;
}

function render() {
  const conflicts = findConflicts();

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cell = cells[r][c];
      cell.innerHTML = queens[r][c] ? QUEEN_DOT : "";
    }
  }

  const pass = conflicts.size === 0;
  statusEl.textContent = pass ? "PASS" : "FAIL";
  statusEl.className = `status ${pass ? "pass" : "fail"}`;
}

function buildBoard() {
  boardEl.style.setProperty("--size", N);

  for (let r = 0; r < N; r++) {
    cells[r] = [];
    for (let c = 0; c < N; c++) {
      const cell = document.createElement("div");
      cell.className = `cell ${(r + c) % 2 === 0 ? "light" : "dark"}`;
      cell.addEventListener("click", () => {
        queens[r][c] = !queens[r][c];
        render();
      });
      boardEl.appendChild(cell);
      cells[r][c] = cell;
    }
  }
}

resetBtn.addEventListener("click", () => {
  queens = createEmpty();
  render();
});

buildBoard();
render();
