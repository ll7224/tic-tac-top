class RandomStrategy {
    _randomChoose(cells) {
        // console.log(cells)
        return cells[Math.floor(Math.random() * cells.length)]
    }
    _log(board, piece, position) {
        console.log(position)
        const logs = [
            'Random',
            `当前落子: ${board.displayFor(piece)}`,
            `选择了(${Math.floor(position / board.deimension)}, ${position % board.deimension})`
        ]
        console.log(logs.join('\n'))
    }
    calculatePosition(board, piece) {
        const position = this._randomChoose(board.getEmptyCells())
        this._log(board, piece, position)
        return position
    }
}
// 极小化极大策略
class MinimaxStrategy {
    constructor() {
        this.WIN_SCORES = {
            [PIECE_O]: -1,
            [PIECE_X]: 1,
            [DRAW]: 0
        }
    }
    _isWin(piece, score) {
        return this.WIN_SCORES[piece] === score
    }
    _isBetter(piece, score, bestScore) {
        if (piece === PIECE_O) {
            return score <= bestScore
        } else if (piece === PIECE_X) {
            return score >= bestScore
        } else {
            throw TypeError('Invalid piece type')
        }
    }
    _getBestChoise(board, piece) {
        const winner = board.checkWin()
        if (winner !== null) {
            return {
                score: this.WIN_SCORES[winner],
                position: -1
            }
        }

        const adversary = board.switchPiece(piece)

        let best = {
            score: this.WIN_SCORES[adversary],
            position: -1
        }
        for (const position of board.getEmptyCells()) {
            board.move(position, piece)
            const {
                score
            } = this._getBestChoise(board, adversary)
            board.clearCell(position)
            if (this._isWin(piece, score)) {
                return {
                    score,
                    position
                }
            } else if (this._isBetter(piece, score, best.score)) {
                best = {
                    score,
                    position
                }
            }
        }
        return best
    }
    _log(board, piece, position) {
        console.log(position)
        const logs = [
            'minmax',
            `当前落子: ${board.displayFor(piece)}`,
            `选择了(${Math.floor(position / board.deimension)}, ${position % board.deimension})`
        ]
        console.log(logs.join('\n'))
    }

    calculatePosition(board, piece) {
        if (board.isEmpty()) {
            return Math.floor(board.cells.length / 2)
        }
        const {
            position
        } = this._getBestChoise(board, piece)
        // this._log(board, piece, position)
        if (position === -1) {
            throw Error('returned illegal move position (-1)')
        }
        this._log(board, piece, position)
        return position
    }

}