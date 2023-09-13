type Move = [number, number];

export interface Player {
  id: string;
  name: string;
  sign: string;
}

export interface GameState {
  currentPlayerId: Player["id"];
  players: Record<Player["id"], Player>;
  field: String[][];
  winner: Player["id"] | null;
  isDraw: boolean;
  winCobination: Array<Move> | null;
}

export class Tictactoe {
  constructor(players: Player[]) {
    this.playersArray = players;

    this.players = players.reduce((a, c) => {
      a[c.id] = c;
      return a;
    }, {} as Record<Player["id"], Player>);

    this.currentPlayerIndex = 0;

    this.field = new Array(3).fill(null).map(() => new Array(3).fill(null));
    this.winner = null;
    this.winCombination = null;
  }

  private playersArray: Player[];

  private players: Record<Player["id"], Player>;

  private currentPlayerIndex: number;

  private field: String[][];

  private winner: Player["id"] | null;

  private winCombination: Array<Move> | null;

  private isDraw = false;

  public getState(): GameState {
    return {
      currentPlayerId: this.playersArray[this.currentPlayerIndex].id,
      players: this.players,
      field: this.field,
      winner: this.winner,
      isDraw: this.isDraw,
      winCobination: this.winCombination,
    };
  }

  public makeMove(id: Player["id"], [x, y]: Move): GameState {
    if (this.playersArray[this.currentPlayerIndex].id !== id) {
      throw new Error("Move Error: Forbidden player");
    }

    if (!this.players[id]) {
      throw new Error("Move Error: Unknown player");
    }

    if (this.field[x][y] === undefined) {
      throw new Error("Move Error: Out of field");
    }

    if (this.field[x][y] !== null) {
      throw new Error("Move Error: Cell is not empty");
    }

    this.field[x][y] = this.players[id].sign;

    const win = this.checkWinnerByLastMove([x, y]);

    if (win) {
      this.winner = this.players[this.currentPlayerIndex].id;

      this.winCombination = [
        ...win,
        [x,y]
      ];
    } else {
      const isDraw = this.checkIsDraw();
      if (isDraw) this.isDraw = true;
    }

    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.playersArray.length;

    return this.getState();
  }

  public restart() {
    this.currentPlayerIndex = 0;

    this.field = new Array(3).fill(null).map(() => new Array(3).fill(null));
    this.winner = null;
    this.isDraw = false;
    this.winCombination = null;

    return this.getState();
  }

  private checkWinnerByLastMove([x, y]: Move) {
    const sign = this.field[x][y];

    const possibleWins: Array<Array<Move>> = [
      [
        [x - 2, y],
        [x - 1, y],
      ],
      [
        [x - 1, y],
        [x + 1, y],
      ],
      [
        [x + 1, y],
        [x + 2, y],
      ],

      [
        [x, y - 2],
        [x, y - 1],
      ],
      [
        [x, y - 1],
        [x, y + 1],
      ],
      [
        [x, y + 1],
        [x, y + 2],
      ],

      [
        [x - 2, y - 2],
        [x - 1, y - 1],
      ],
      [
        [x - 1, y - 1],
        [x + 1, y + 1],
      ],
      [
        [x + 1, y + 1],
        [x + 2, y + 2],
      ],

      [
        [x + 2, y - 2],
        [x + 1, y - 1],
      ],
      [
        [x + 1, y - 1],
        [x + 1, y + 1],
      ],
      [
        [x - 1, y + 1],
        [x - 2, y + 2],
      ],
    ];

    const win = possibleWins.find(([[x1, y1], [x2, y2]]) => {
      return this.field[x1]?.[y1] === sign && this.field[x2]?.[y2] === sign;
    });

    return win;
  }

  private checkIsDraw() {
    return !this.winner && !this.field.some((r) => r.some((c) => c === null));
  }
}
