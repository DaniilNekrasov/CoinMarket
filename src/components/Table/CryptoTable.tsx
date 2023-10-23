import React, { useState } from "react";
import Row from "./Row";
import Paginator from "./Paginator";
import Search from "./Search";
import { CryptoData } from "../../types";
import "./CryptoTable.css"

interface CryptoCurrencyI {
  cryptos: CryptoData[],
  handleAddCoin: (id: string) => void,
}

const CryptoTable: React.FC<CryptoCurrencyI> = ({ cryptos, handleAddCoin }) => {
  const [nullValues, setNullValues] = useState(false);
  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState<CryptoData[]>([]);
  const [sortField, setSortField] = useState<string>("#");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = [...searchRes.length ? searchRes : cryptos].sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === "price") {
      return sortOrder === "asc" ? a.priceUsd - b.priceUsd : b.priceUsd - a.priceUsd;
    }
    else if (sortField === "#") {
      return sortOrder === "asc" ? a.rank - b.rank : b.rank - a.rank;
    }
    else if (sortField === "cap") {
      return sortOrder === "asc" ? a.marketCapUsd - b.marketCapUsd : b.marketCapUsd - a.marketCapUsd;
    }
    else if (sortField === "change") {
      return sortOrder === "asc" ? a.changePercent24Hr - b.changePercent24Hr : b.changePercent24Hr - a.changePercent24Hr;
    }
    return 0;
  });

  // Функция для выполнения поиска данных
  const handleSearch = (query: string) => {
    setQuery(query)
    const filteredData = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchRes(filteredData);
  };

  //функция для сортировки данных
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <h2>Crypto Data</h2>
      <Search onSearch={handleSearch} />
      <label>
        <input
          type="checkbox"
          checked={nullValues}
          onChange={() => setNullValues(!nullValues)}
        />
        Show null values
      </label>      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("#")}>#</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th>logo</th>
            <th>Symbol</th>
            <th onClick={() => handleSort("price")}>Price (USD)</th>
            <th onClick={() => handleSort("cap")}>Market Cap (USD)</th>
            <th onClick={() => handleSort("change")}>ChangePercent24hrs</th>
            <th>ADD</th>
          </tr>
        </thead>
        <tbody>
          {(!searchRes.length && query) ? <span>No results</span>
            : sortedData.map((x) => nullValues ?
            <Row key={x.rank} data={x} handleAddCoin={handleAddCoin}/>
            : ((x.priceUsd*1).toFixed(2) !== "0.00" && 
            (x.changePercent24Hr*1).toFixed(2) !== "0.00" && 
            (x.marketCapUsd*1).toFixed(2) !== "0.00"
               && <Row key={x.rank} data={x} handleAddCoin={handleAddCoin}/>)
            )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;