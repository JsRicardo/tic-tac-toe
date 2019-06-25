import React from "react"
import { ChessType } from "../types/enums";
import "./ChessComp.css"

/**
 * 棋子组件
 */

interface IProps {
  type: ChessType,
  handleClick?: () => void
}

/**
 * @param type:棋子类型
 * @param handleClick:如果此处没有棋子，处理事件回调函数
 */

export const ChessDiv: React.FC<IProps> = ({ type, handleClick }: IProps) => {
  let chess;
  if (type === ChessType.black) {
    chess = <div className='chess black'></div>;
  } else if (type === ChessType.red) {
    chess = <div className='chess red'></div>;
  }
  return (
    <div className="chessDiv" onClick={() => {
      if (type === ChessType.none && handleClick) {
        handleClick()
      }
    }} >
      {chess}
    </div>
  )
}