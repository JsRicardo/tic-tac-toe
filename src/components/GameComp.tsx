import React from "react"
import { ChessType, GameStatus } from "../types/enums";
import { BoardComp } from "./BoardComp";
import "./GameComp.css"

interface IState {
  chesses: ChessType[],
  gameStatus: GameStatus,
  nextChess: ChessType.black | ChessType.red
}

export class GameComp extends React.Component<{}, IState> {
  state: IState = {
    chesses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <div className="game">
        <div className="notice">{this.gameNotice()}</div>
        <BoardComp
          chesses={this.state.chesses}
          isGameOver={this.state.gameStatus !== GameStatus.gaming}
          handleClick={this.handleClickd}
        />
        <div className="reWrapper">
          <button className="reStart" onClick={() => this.init()}>重新开始</button>
        </div>
      </div>
    )
  }
  /**
   * 初始化棋盘
   */
  init = () => {
    const chessArr: ChessType[] = [];
    for (let i = 0; i < 9; i++) {
      chessArr.push(ChessType.none)
    }
    this.setState({
      chesses: chessArr,
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }

  /**
   * 棋子点击处理函数
   * @param index: 点击的棋盘的位置
   */
  handleClickd = (index: number) => {
    const chesses = [...this.state.chesses];
    chesses[index] = this.state.nextChess;
    this.setState(prevState => ({
      chesses,
      nextChess: prevState.nextChess === ChessType.black ? ChessType.red : ChessType.black,
      gameStatus: this.getStatus(chesses, index)
    }))
  }
  /**
   * 判断游戏状态
   */
  getStatus = (chesses: ChessType[], index: number): GameStatus => {
    const henMin = Math.floor(index / 3) * 3;
    const verMin = index % 3;
    //游戏胜利结束
    if (
      // eslint-disable-next-line
      chesses[henMin] === chesses[henMin + 1] && chesses[henMin] === chesses[henMin + 2] || chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6] || chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none || chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none
    ) {
      if (chesses[henMin] === ChessType.black) {
        return GameStatus.blackWin;
      } else {
        return GameStatus.redWin
      }
    }
    //游戏平局
    if (!chesses.includes(ChessType.none)) {
      return GameStatus.equal
    }
    //游戏进行中
    return GameStatus.gaming
  }

  gameNotice = () => {
    const { gameStatus } = this.state
    switch (gameStatus) {
      case GameStatus.blackWin:
        return "黑方获胜！游戏结束！"
      case GameStatus.equal:
        return "平局！游戏结束！"
      case GameStatus.redWin:
        return "红方获胜！游戏结束！"
    }
  }
}