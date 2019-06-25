import React from 'react';
import { ChessType } from './types/enums';
import { BoardComp } from './components/BoardComp';


const arr: ChessType[] = [
  ChessType.none,
  ChessType.red,
  ChessType.black,
  ChessType.black,
  ChessType.red,
  ChessType.black,
  ChessType.none,
  ChessType.red,
  ChessType.none
]
export class App extends React.Component {
  render() {
    return (
      <div>
        <BoardComp chesses={arr} isGameOver={false} handleClick={i => console.log(i)} />
      </div>
    )
  }
}
