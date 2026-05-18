import React, { useState, createContext, useContext } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = createContext({
  isBuyWindowOpen: false,
  isSellWindowOpen: false,
  selectedStockUID: "",
  openBuyWindow: (uid) => { },
  closeBuyWindow: () => { },
  openSellWindow: (uid) => { },
  closeSellWindow: () => { },
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const openBuyWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsSellWindowOpen(false); // close sell if open
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const openSellWindow = (uid) => {
    setSelectedStockUID(uid);
    setIsBuyWindowOpen(false); // close buy if open
    setIsSellWindowOpen(true);
  };

  const closeSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider value={{
      isBuyWindowOpen,
      isSellWindowOpen,
      selectedStockUID,
      openBuyWindow,
      closeBuyWindow,
      openSellWindow,
      closeSellWindow,
    }}>
      {children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => useContext(GeneralContext);

export default GeneralContext;