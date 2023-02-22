import { FunctionComponent } from "https://esm.sh/v106/preact@10.11.0/src/index";

interface props {
    color: string
    pieceClicked: boolean
    legalSquares: boolean[][]
    rank: number
    file: number
    setPieceClicked: (foo: boolean) => void
    movePiece: (startRank: number, startFile: number, endRank: number, endFile: number) => void
    clickedPieceCoords: number[]
}

export default function Square({ color, pieceClicked, legalSquares, rank, file, setPieceClicked, movePiece, clickedPieceCoords }: props) {
    return (
        <div
            className={`${color} ${!pieceClicked ? '' : (legalSquares[rank][file] ? 'clickable' : 'illegal')}`}
            onClick={() => {
                if(!pieceClicked) return
                setPieceClicked(false)
                movePiece(clickedPieceCoords[0], clickedPieceCoords[1], rank, file)
            }}
        />
    )
}