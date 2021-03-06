import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EyeFill from '../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../assets/images/icons/eye-slash-fill.svg';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckSelectMy from './components/DeckSelectMy.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';

function Crypt(props) {
  const [sortMethod, setSortMethod] = useState('Capacity - Min to Max');

  return (
    <Container className={props.isMobile ? "main-container" : "main-container py-3"}>
      <Row>
        {!props.isMobile && (
          <Col md={12} xl={props.username ? 4 : 3} className="px-0">
            {Object.keys(props.decks).length > 0 && (
              <Row>
                <Col className="pr-0">
                  <DeckSelectMy
                    decks={props.decks}
                    activeDeck={props.activeDeck}
                    setActiveDeck={props.setActiveDeck}
                    inventoryMode={props.inventoryMode}
                  />
                </Col>
                <Col xs="auto" className="d-flex pl-0">
                  <Button
                    variant="outline-secondary"
                    onClick={() => props.setShowDeck(!props.showDeck)}
                  >
                    {props.showDeck ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </Col>
              </Row>
            )}
            {props.deckRouter(props.activeDeck) && props.showDeck && (
              <>
                <div className="pt-4">
                  <DeckCrypt
                    changeTimer={props.changeTimer}
                    cardAdd={props.cardAdd}
                    cardChange={props.cardChange}
                    deckid={props.activeDeck.deckid}
                    cards={props.deckRouter(props.activeDeck).crypt}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isAuthor={true}
                    isMobile={props.isMobile}
                    isWide={props.isWide}
                    cardBase={props.cryptCardBase}
                    inventoryMode={props.inventoryMode}
                    inventoryCrypt={props.inventory.crypt}
                    usedCards={{
                      soft: props.usedCards.softCrypt,
                      hard: props.usedCards.hardCrypt,
                    }}
                    decks={props.decks}
                    inSearch={true}
                  />
                </div>
                <div className="pt-4">
                  <DeckLibrary
                    cardAdd={props.cardAdd}
                    cardChange={props.cardChange}
                    deckid={props.activeDeck.deckid}
                    cards={props.deckRouter(props.activeDeck).library}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isAuthor={true}
                    isMobile={props.isMobile}
                    cardBase={props.libraryCardBase}
                    inventoryMode={props.inventoryMode}
                    inventoryLibrary={props.inventory.library}
                    usedCards={{
                      soft: props.usedCards.softLibrary,
                      hard: props.usedCards.hardLibrary,
                    }}
                    decks={props.decks}
                    inSearch={true}
                  />
                </div>
              </>
            )}
          </Col>
        )}
        <Col
          md={12}
          xl={5}
          className={
            !(props.isMobile && props.showSearch)
              ? 'px-0 px-lg-4'
              : 'col-hide px-0 lx-lg-4'
          }
        >
          {props.results && (
            <ResultCrypt
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              cardAdd={props.cardAdd}
              cards={props.results}
              crypt={props.deckRouter(props.activeDeck) && props.deckRouter(props.activeDeck).crypt}
              activeDeck={props.activeDeck}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              isMobile={props.isMobile}
              isWide={props.isWide}
              addMode={props.addMode}
              setAddMode={props.setAddMode}
              showSearch={props.showSearch}
              setShowSearch={props.setShowSearch}
              setResults={props.setResults}
              inventoryMode={props.inventoryMode}
              setInventoryMode={props.setInventoryMode}
              inventoryCrypt={props.inventory.crypt}
              usedCards={{
                soft: props.usedCards.softCrypt,
                hard: props.usedCards.hardCrypt,
              }}
              decks={props.decks}
            />
          )}
        </Col>
        <Col
          md={12}
          xl={3}
          className={
            !props.isMobile || (props.isMobile && props.showSearch)
              ? 'px-0'
              : 'col-hide px-0'
          }
        >
          <SearchCryptForm
            results={props.results}
            setResults={props.setResults}
            showSearch={props.showSearch}
            setShowSearch={props.setShowSearch}
            formState={props.formState}
            setFormState={props.setFormState}
            isMobile={props.isMobile}
            cardBase={props.cryptCardBase}
            inventoryMode={props.inventoryMode}
            setInventoryMode={props.setInventoryMode}
          />
        </Col>
        {!props.username && !props.isMobile && <Col xl={1} />}
      </Row>
    </Container>
  );
}

export default Crypt;
