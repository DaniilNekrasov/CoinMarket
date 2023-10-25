import React, { useEffect, useState } from "react";
import CryptoTable from "./components/Table/CryptoTable";
import Header from "./components/Header/Header";
import APIService from "./API/APIService";
import { CryptoData } from "./types";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CryptoDetail from "./components/Details/CryptoDetail";
import Paginator from "./components/Table/Paginator";
import "./App.css"
import Modal from "./components/Header/Modal";

const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [portfolio, setPortfolio] = useState<CryptoData[]>([]);
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedPortfolio = localStorage.getItem("portfolio");
    if (storedPortfolio) {
      const parsedPortfolio: CryptoData[] = JSON.parse(storedPortfolio);
      setPortfolio(parsedPortfolio);
    }
    APIService.fetchData(page).then((response) => {
      setCryptos(response);
    })
  }, [page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleAddCoin = async (id: string) => {
    let arr = [...portfolio];
    let newEl = await APIService.fetchCoin(id)
    if (newEl && !portfolio.find((x) => x.id === newEl!.id)) {
      newEl.number = 0
      arr.push(newEl)
      localStorage.setItem("portfolio", JSON.stringify(arr));
    }
    setModalOpen(true)
    setPortfolio(arr)
  }

  const addCoin = (id: string) => {
    portfolio.find((x) => x.id === id)!.number++
    let arr = [...portfolio];
    setPortfolio(arr)
    localStorage.setItem("portfolio", JSON.stringify(arr));
  }
  const removeCoin = (id: string) => {
    portfolio.find((x) => x.id === id)!.number--
    let arr = [...portfolio];
    setPortfolio(arr)
    localStorage.setItem("portfolio", JSON.stringify(arr));
  }

  const handleDeleteCoin = (id: string) => {
    const updatedPortfolio = [...portfolio];
    const coinIndex = updatedPortfolio.findIndex((coin) => coin.id === id);
    const coinInCryptos = cryptos.find((crypto) => crypto.id === id);
    if (coinInCryptos) {
      coinInCryptos.number = 0;
    }
    if (coinIndex !== -1) {
      updatedPortfolio.splice(coinIndex, 1);
      setPortfolio(updatedPortfolio);
      localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
    }
  };

  const toggleModal = () => {
    if(portfolio.length)
    setModalOpen(!modalOpen);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <h1>Crypto Currency</h1>
        <Header cryptos={cryptos} portfolio={portfolio}
          addCoin={addCoin}
          removeCoin={removeCoin} onRemoveCoin={handleDeleteCoin} />
        <Routes>
          <Route path="/" Component={() =>
            <div>
              <CryptoTable cryptos={cryptos} handleAddCoin={handleAddCoin} />
              <Paginator
                currentPage={page}
                totalPages={10}
                onPageChange={handlePageChange} />
            </div>
          } />
          <Route path='/crypto/:id' Component={() =>
            <CryptoDetail handleAddCoin={handleAddCoin} />} />
        </Routes>
        {modalOpen && portfolio.length > 0 && (
            <Modal
              portfolio={portfolio}
              onRemoveCoin={handleDeleteCoin}
              onClose={toggleModal}
              addCoin={addCoin}
              removeCoin={removeCoin}
            />)}
      </BrowserRouter>
    </div>
  );
};
export default App;
