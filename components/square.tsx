import { FunctionComponent, ComponentChildren } from "https://esm.sh/v106/preact@10.11.0/src/index";
import { useEffect, useState } from "https://esm.sh/v106/preact@10.11.0/hooks"
import { team } from "../islands/board.tsx"

interface props {
    color: string
    pieceHeld: boolean
    rank: number
    file: number
    setPieceClicked: (foo: boolean) => void
    movePiece: (startRank: number, startFile: number, endRank: number, endFile: number) => void
    heldPieceCoords: number[]
    isMoveLegal: (startRank: number, startFile: number, endRank: number, endFile: number) => boolean
    turn: team
    setTurn: (team: team) => void
    children: ComponentChildren
}

export const Square: FunctionComponent<props> = (props: props) => {
    const [legal, setLegal] = useState(true)

    useEffect(() => {
        if(props.pieceHeld) {
            setLegal(props.isMoveLegal(props.heldPieceCoords[0], props.heldPieceCoords[1], props.rank, props.file))
            return
        }
        setLegal(true)
    }, [props.pieceHeld])
    
    const getClassNameString = (color: string, pieceHeld: boolean, isLegal: boolean) => {
        const _clickable = 'clickable';
        const _illegal = 'illegal';
        const _square = 'square';

        return `${_square} ${color} ${pieceHeld 
            ? isLegal 
                ? _clickable 
                : _illegal 
            : ''}`
    }
 
    return (
        <div>
            <div
                className={`${getClassNameString(props.color, props.pieceHeld, legal)}`}
                onClick={() => {
                    if(!props.pieceHeld) return
                    props.setPieceClicked(false)
                    if(props.isMoveLegal(props.heldPieceCoords[0], props.heldPieceCoords[1], props.rank, props.file)) {
                        props.movePiece(props.heldPieceCoords[0], props.heldPieceCoords[1], props.rank, props.file)
                        props.setTurn(props.turn == 'white' ? 'black' : 'white')
                    }
                }}
            >
                {props.children}
            </div>
        </div>
    )
}