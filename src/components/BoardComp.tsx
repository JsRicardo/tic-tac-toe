import React from "react"
import { ChessType } from "../types/enums";
import { ChessDiv } from "./ChessComp";
import "./BoardComp.css"

/**
 * 棋盘组件，由棋子组件组成
 */

interface IProps {
  chesses: ChessType[],
  isGameOver: boolean,
  handleClick?: (index: number) => void
}

/**
 * @param chesses: 棋子数组
 * @param isGameOver: 游戏是否结束
 * @param handleClick: 点击棋子空间处理函数，可选
 */

export const BoardComp: React.FC<IProps> = (props: IProps) => {
  const chessList = props.chesses.map((type, index) => 
    <ChessDiv key={index} 
              type={type} 
              handleClick={() => { 
                if(props.handleClick && !props.isGameOver){
                  props.handleClick(index) 
                } 
              }} />)
  return (
    <div className="board">
      {chessList}
    </div>
  )
}