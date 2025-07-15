const { useState } = React;

const winningCombinations = [[0,1,2], [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[3,6,9]];

export function Board() {
  const [state, setState] = useState({selections: Array(9).fill(null), activePlayer: "X"});
  const [msg, setMsg] = useState("");
  const handleClick = (key) => {
    if (state.selections[key] || msg !== "") return;
    setState(s => {
      const cp = [...s.selections];
      cp[key] = s.activePlayer;
      const draw = cp.every(x => x !== null);
      const winner = winningCombinations.some(combo => combo.every(key => cp[key] === s.activePlayer));
      if (winner) {
        setMsg("Winner: " + s.activePlayer);
      } else if (draw) {
        setMsg("It's a Draw");
      }
      return {
        activePlayer: s.activePlayer === "X" ? "O" : "X",
        selections: cp
      };
    });

  }

  const reset = () => {
    setState({
      selections: Array(9).fill(null),
      activePlayer: "X"
    });
    setMsg("");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="msg status">{msg}</div>
      <div className="squares">{state.selections.map((x,i) => <button className="square" onClick={() => handleClick(i)} key={i}>{x}</button>)}</div>
      <button type="reset" id="reset" onClick={reset}>Reset</button>

    </div>
  )


}
