import React, { useState, useEffect } from 'react';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import AlertMessage from './AlertMessage.jsx';
import ResultCryptTable from './ResultCryptTable.jsx';
import ResultCryptTotal from './ResultCryptTotal.jsx';
import resultCryptSort from './resultCryptSort.js';

function ResultCrypt(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const className = 'search-crypt-table';

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultCryptSort(props.cards, method));
  };

  const handleClear = () => {
    props.setResults(undefined);
    props.setShowSearch(!props.showSearch);
  };

  useEffect(() => {
    setSortedCards(() => resultCryptSort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      {!props.isMobile && props.cards.length == 0 && (
        <AlertMessage className="error-message">
          <b>NO CARDS FOUND</b>
        </AlertMessage>
      )}
      {props.cards.length > 0 &&
       <>
         <ResultCryptTotal
           cards={props.cards}
           value={props.sortMethod}
           handleChange={handleChange}
         />
         <ResultCryptTable
           className={className}
           showImage={props.showImage}
           setShowImage={props.setShowImage}
           crypt={props.crypt}
           activeDeck={props.activeDeck}
           cardAdd={props.cardAdd}
           resultCards={sortedCards}
           isMobile={props.isMobile}
           isWide={true}
           addMode={props.addMode}
           inventoryMode={props.inventoryMode}
           inventoryCrypt={props.inventoryCrypt}
           usedCards={props.usedCards}
           decks={props.decks}
         />
       </>
      }
      {props.isMobile && !props.hideFloatingButtons && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
          {props.inventoryMode ? (
            <div
              onClick={() => props.setInventoryMode(!props.inventoryMode)}
              className="float-left-bottom inventory-on"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => props.setInventoryMode(!props.inventoryMode)}
              className="float-left-bottom inventory-off"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          )}
          {props.addMode ? (
            <div
              onClick={() => props.setAddMode(!props.addMode)}
              className="float-left-middle add-on"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => props.setAddMode(!props.addMode)}
              className="float-left-middle add-off"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ResultCrypt;
