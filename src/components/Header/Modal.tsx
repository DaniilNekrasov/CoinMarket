import React, { useState } from "react";
import { CryptoData } from "../../types";
import "./Modal.style.css"
import { format } from "../Table/Row";
import Button from "../Button";

interface ModalProps {
    portfolio: CryptoData[];
    onRemoveCoin: (id: string) => void;
    onClose: () => void;
    addCoin: (id: string) => void;
    removeCoin: (id: string) => void;
}

const Modal: React.FC<ModalProps> = ({ portfolio, onRemoveCoin, onClose, addCoin, removeCoin }) => {
    const addCoinHandler = (id: string) => {
        addCoin(id)
    }

    const removeCoinHandler = (id: string) => {
        removeCoin(id)
    }

    const removeCryptoHandler = (id: string) => {
        onRemoveCoin(id)
    }

    const closeHandler = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={closeHandler}>
            <div className="modal-content" >
            <Button onClick={closeHandler} text = "close" color = "#db6b6b"/>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>logo</th>
                            <th>Symbol</th>
                            <th>Buy price (USD)</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((x) =>
                            <tr key={x.id} className="row">
                                <td>{x.rank}</td>
                                <td>{x.name}</td>
                                <td><img src={"https://assets.coincap.io/assets/icons/"
                                    + x.symbol.toLowerCase() + "@2x.png"}
                                    alt={x.name} width={"50px"} /></td>
                                <td>{x.symbol}</td>
                                <td>{format(x.priceUsd*1)}</td>
                                <td>
                                    {x.number * 1 > 0 && <Button onClick={() => removeCoinHandler(x.id)} text = "-" color = "white"/>}
                                    <span> {x.number} </span>
                                    {x.number * 1 < 100 && <Button onClick={() => addCoinHandler(x.id)} text = "+" color = "white"/>}
                                </td>
                                <td><Button onClick={() => removeCryptoHandler(x.id)} text = "delete" color = "white"/></td>
                            </tr>
                        )}                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Modal;
