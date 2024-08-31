'use client'
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useState } from "react";
export default function Home() {
  const winning_combo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]
  const[xTurn,setxTurn] = useState(true);
  const[modeltitle,setmodeltitle] = useState("")
  const[draw,setdraw] = useState(false)
  const[woncombo,setwonCombo] = useState<number[]>([])
  const[won,setwon] = useState(false);
   const [boardData,setboardData] = useState({
    0:"",
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:"",
    7:"",
    8:"",
});
useEffect(()=>{
checkwinner();
checkdraw()
},[boardData]);
   const updateBoardData =(idx:number) =>{
    if(!boardData[idx as keyof typeof boardData ] && !won){let value =xTurn === true ? 'x' : 'o'
    setboardData({...boardData,[idx]:value})
    setxTurn(!xTurn)
  }
  };
  const checkdraw = () => {
let check = Object.values(boardData).every((v) => v !== "")
setdraw(check);
if(check)setmodeltitle("Match Draw!!!");
  }

  const checkwinner = ()=>{
   winning_combo.forEach((combo)=>{
    const [a,b,c] = combo;
    if(
      boardData[a as keyof typeof boardData] && 
      boardData[a as keyof typeof boardData] === boardData[b as keyof typeof boardData] && 
      boardData[a as keyof typeof boardData] === boardData[c as keyof typeof boardData]){
      setwon(true);
      setwonCombo(combo)
      setmodeltitle(`Player ${!xTurn ? 'x' : 'o'} won`)
    
    }
   });
     };
     const reset = () => {
  setboardData({ 0:"",
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:"",
    7:"",
    8:"",})
    setwon(false);
    setxTurn(true);
    setwonCombo([]);
    setdraw(false);
    setmodeltitle("")
     }
  
    return(
    <><h1 className="text-5xl flex justify-center text-green-950 font-extrabold shadow-xl shadow-current">
      Tic-Tac-Toe
      </h1>
<br />
    <div className="game">
    <div className="game_menu">
      <p>{xTurn === true ? 'X Turn' : 'O Turn'}</p>
      {/*<p>{`Game won: ${won} Draw :${draw}`} </p>*/}
    </div>
    <br />
    <div className="game_board">
      {[...Array(9)].map((v,idx:number)=>{
        return<div onClick={()=>{
          updateBoardData(idx)
        }} key={idx} className={`square ${woncombo.includes(idx) ? 'h' : ''} hover:bg-gradient-to-b from-blue-950 to-slate-50`}>
          {boardData[idx as keyof typeof boardData]}
          </div>
      })}
          </div>
          </div>
          <div className={`Model ${modeltitle ? "show" : ""} hover:bg-gradient-to-b from-rose-400 to-sky-400`}> 
            <div className="Model_title">{modeltitle}</div>
            <Button onClick={reset} >New Game</Button>
          </div>
          </>
  );
}