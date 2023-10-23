import React from "react";
import Button from "../Button";

interface Crypt {
  id: string,
  rank: number,
  name: string,
  symbol: string,
  priceUsd: number,
  marketCapUsd: number,
  changePercent24Hr: number,
  volumeUsd24Hr: number,
}

const format = (value: number) => {
  if (value>=1e9) {
    value /= 1e9
    return value.toFixed(2) + "B"
  }
  else if (value >=1e6) {
    value /= 1e6
    return value.toFixed(2) + "M"
  }
  else if (value>=1e3) {
    value /= 1e3
    return value.toFixed(2) + "k"
  }
  else if(value.toFixed(2) === "0.00"){
    return ("~" + value.toFixed(2))
  }
    return value.toFixed(2)
}

const Row: React.FC<{ data: Crypt, handleAddCoin: (id: string) => void}> = ({ data, handleAddCoin }) => {
  const addCoin = () => {
    handleAddCoin(data.id);
  }
  return (
    <tr>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>{data.rank}</td>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>{data.name}</td>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>
        <img src={"https://assets.coincap.io/assets/icons/"+data.symbol.toLowerCase()+"@2x.png"}
      alt={data.name} width={"50px"}/></td>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>{data.symbol}</td>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>{format(data.priceUsd*1)}</td>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>{format(data.marketCapUsd*1)}</td>
      <td onClick={() => window.location.href = `/crypto/${data.id}`}>{format(data.changePercent24Hr*1)}</td>
      <td><Button onClick={() => addCoin()} text = "Add to portfolio" color = "white"/></td>
    </tr>   
  );
  
};

export {format};
export default Row;
