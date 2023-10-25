import React, { MouseEventHandler, useEffect, useState } from "react";
import Modal from "./Modal";
import { CryptoData } from "../../types";
import "./Header.css"; 
import APIService from "../../API/APIService";

interface HeaderProps {
  cryptos: CryptoData[];
  portfolio: CryptoData[];
  onRemoveCoin: (name: string) => void;
  addCoin: (name: string) => void;
  removeCoin: (name: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cryptos, portfolio, onRemoveCoin, addCoin, removeCoin }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [purchased, setPurchased] = useState<CryptoData[]>([])

  const updateCryptoPrices = async () => {
    const updatedPurchased = [];
    for (const element of portfolio) {
      try {
        const response = await APIService.fetchCoin(element.id);
        updatedPurchased.push(response);
      } catch (error) {
        alert(`Failed to fetch data for coin with ID ${element.id}:`);
      }
    }
    setPurchased(updatedPurchased);
  };

  useEffect(() => {
    updateCryptoPrices()
  }, [portfolio])

  if(!cryptos.length){
    return(
      <div>loading...</div>
    )
  }

  // Функция для открытия и закрытия модального окна
  const toggleModal = () => {
    if(portfolio.length)
    setModalOpen(!modalOpen);
  };

  // Функция для подсчета стоимости портфеля пользователя
  const calculatePortfolioValue = () => {
    let portfolioValue = 0;
    if(purchased.length === portfolio.length){
      portfolioValue = portfolio.reduce((total, coin) => {
      const crypto = purchased.find((crypto) => crypto.id === coin.id);
      return total + coin.number * (crypto!.priceUsd) ;
    }, 0);
  }
  return (portfolioValue);
  };

  // Функция для расчета изменения стоимости портфеля в процентах
  const calculatePortfolioChange = () => {
    const initialPortfolioValue = portfolio.reduce((total, coin) => {
      const crypto = portfolio.find((crypto) => crypto.name === coin.name);
      return total + coin.number * crypto!.priceUsd;
    }, 0);; 
    const currentPortfolioValue = calculatePortfolioValue();
    const change = currentPortfolioValue - initialPortfolioValue;
    return (change);
  };

  return (
    <div className="header">
      <div className="crypto-info">
        <div className="crypto-item">
          <span>{cryptos[0].name}:</span>
          <span>{(cryptos[0].priceUsd*1).toFixed(2)} USD</span>
        </div>
        <div className="crypto-item">
          <span>{cryptos[1].name}:</span>
          <span>{(cryptos[1].priceUsd*1).toFixed(2)} USD</span>
        </div>
        <div className="crypto-item">
          <span>{cryptos[2].name}:</span>
          <span>{(cryptos[2].priceUsd*1).toFixed(2)} USD</span>
        </div>
      </div>
      {<div className="portfolio-info" onClick={toggleModal}>
        <p style={{paddingLeft: 45}}>
          <div>Portfolio cost: {calculatePortfolioValue().toFixed(2)} $</div>
          <div>Portfolio change: {calculatePortfolioChange()>=0 ? "+" : ""}
          {(calculatePortfolioChange()).toFixed(2)} 
          ({(calculatePortfolioChange()/(calculatePortfolioValue() - 
          calculatePortfolioChange())*100 || 0).toFixed(2)} %)</div>
        </p>
      </div>}
      {modalOpen && portfolio.length>0 &&(
        <Modal
          portfolio={portfolio}
          onRemoveCoin={onRemoveCoin}
          onClose={toggleModal}
          addCoin = {addCoin}
          removeCoin = {removeCoin}
        />
      )}
    </div>
  );
};

export default Header