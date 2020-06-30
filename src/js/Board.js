const PIECE_X = 1
const PIECE_O = -1
const EMPTY = 0
const DRAW = 0

class Board {
    constructor(deimension = 3, cells = null) {
        if (cells && Array.isArray(cells)) {
            this.cells = cells.flat()
            this.deimension = Math.sqrt(this.cells.length)
        } else {
            this.deimension = deimension
            this.clear()
        }
    }


    displayFor(cell) {
        return {
            [EMPTY]: '⬜',
            [PIECE_X]: '❌',
            [PIECE_O]: '⭕'
        } [cell]
    }
    winnerFor(display) {
        return {
            '❌': PIECE_X,
            '⭕': PIECE_O
        } [display]
    }
    switchPiece(piece) {
        if (![PIECE_X, PIECE_O].includes(piece)) {
            throw TypeError('Invaild piece type')
        }
        return PIECE_O + PIECE_X - piece
    }
    getEmptyCells() {
        return this.cells.map((cell, idx) => this.isEmptyCell(cell) ? idx : -1).filter(idx => ~idx)
    }
    getDimension() {
        return this.deimension
    }

    cellFor(position) {
        return this.cells[position]
    }

    move(position, piece) {
        if (this.isEmptyCell(this.cellFor(position))) {
            // console.log(this.cells[position])
            this.cells[position] = piece
            // console.log(piece)
        }
    }

    _checkWinByAxis(start, step) {
        const piece = this.cellFor(start)
        if (this.isEmptyCell(piece)) {
            return null
        }
        let pos = start + step * (this.deimension - 1)
        while (start < pos && this.cellFor(pos) === piece) {
            pos -= step
        }
        return (start === pos) ? piece : null
    }

    checkWin() {
        let winner = null
        //横轴
        for (let i = 0; i < this.cells.length; i += this.deimension) {
            winner = this._checkWinByAxis(i, 1)
            if (winner) {
                return winner
            }
        }

        //纵轴
        for (let i = 0; i < this.deimension; i++) {
            winner = this._checkWinByAxis(i, this.deimension)
            if (winner) {
                return winner
            }
        }

        winner = this._checkWinByAxis(0, this.deimension + 1)
        if (winner) {
            return winner
        }

        winner = this._checkWinByAxis(this.deimension - 1, this.deimension - 1)
        if (winner) {
            return winner
        }

        return this.isFull() ? DRAW : null
    }

    isEmptyCell(cell) {
        return cell === EMPTY
    }

    clear() {
        this.cells = new Array(this.deimension * this.deimension).fill(EMPTY)
    }

    clearCell(position) {
        this.cells[position] = EMPTY
    }

    isEmpty() {
        return this.cells.every(cell => this.isEmptyCell(cell))
    }

    isFull() {
        return this.cells.every(cell => !this.isEmptyCell(cell))
    }
}