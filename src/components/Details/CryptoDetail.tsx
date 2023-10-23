import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { CryptoData, CryptoInterval } from "../../types";
import PriceChart from "./PriceChart";
import "./CryptoDetail.css"
import APIService from "../../API/APIService";
import preloader from "../../Preloader.gif"
import { format } from "../Table/Row"
import Button from "../Button";

const CryptoDetail: React.FC<{handleAddCoin: (id: string) => void }> =
  ({ handleAddCoin }) => {
    const [selectedPeriod, setSelectedPeriod] = useState("m1");
    const [intervals, setIntervals] = useState<CryptoInterval[]>([])
    const { id } = useParams();
    const [cryptoData, setCryptoData] = useState<CryptoData>()
    const [error, setError] = useState<string>();

    useEffect(() => {
      if (id) {
        APIService.fetchCoin(id.toLowerCase())
          .then((response) => {
            setCryptoData(response);
          })
          .catch(() => {
            setError("Криптовалюта не найдена");
          });
  
        APIService.fetchInterval(id.toLowerCase(), selectedPeriod)
          .then((response) => {
            setIntervals(response);
          });
      }
    }, [selectedPeriod]);
  
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/">Вернуться к таблице</Link>
        </div>
      );
    }

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPeriod(event.target.value);
    };

    const addCoin = () => {
      if (id)
        handleAddCoin(id)
    }

    if (!cryptoData) {
      return <div className="centered-image-container">
        <img className="centered-image" src={preloader} alt="loading..." />
      </div>;
    }
  
    return (
      <div className="crypto-detail-container">
        <Link to="/">Вернуться к таблице</Link>
        <h2>{cryptoData.name}</h2>
        <Button onClick={() => addCoin()} text = "Add to portfolio" color = "aquamarine"/>
        <img src={"https://assets.coincap.io/assets/icons/" + cryptoData.symbol.toLowerCase() + "@2x.png"}
          alt={cryptoData.name} width={"50px"} />
        <p>Символ монеты: {cryptoData.symbol}</p>
        <p>Rank: {cryptoData.rank}</p>
        <p>Supply: {format(cryptoData.supply * 1)}$</p>
        <p>Цена в USD: {format(cryptoData.priceUsd * 1)}$</p>
        <p>Рыночная капитализация в USD: {format(cryptoData.marketCapUsd * 1)}$</p>
        <p>maxSupply: {format(cryptoData.maxSupply * 1)}$</p>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="m1">1 день</option>
          <option value="m15">7 дней</option>
          <option value="h1">1 месяц</option>
        </select>
        <PriceChart intervals={intervals}></PriceChart>
      </div>
    );
  };
export default CryptoDetail;
