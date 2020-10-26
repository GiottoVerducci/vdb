import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

import AlertMessage from './components/AlertMessage.jsx';
import DeckImport from './components/DeckImport.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckShowInfo from './components/DeckShowInfo.jsx';
import DeckShowButtons from './components/DeckShowButtons.jsx';
import DeckShowCrypt from './components/DeckShowCrypt.jsx';
import DeckShowLibrary from './components/DeckShowLibrary.jsx';
import ChevronExpand from '../assets/images/icons/chevron-expand.svg';

function Deck(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeck, setSharedDeck] = useState(undefined);
  const sharedDeckId = query.get('id');
  const [showInfo, setShowInfo] = useState(false);

  const getDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setSharedDeck(data);
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => props.getDecks());
  };

  useEffect(() => {
    props.getDecks();
  }, [props.activeDeck]);

  useEffect(() => {
    sharedDeckId && getDeck(sharedDeckId);
  }, [sharedDeckId]);

  if (!props.username && !sharedDeckId) {
    return <Redirect to="/account" />;
  }

  let isAuthor;
  if (props.decks[props.activeDeck]) {
    isAuthor = props.username == props.decks[props.activeDeck].owner;
  }

  return (
    <Container className="main-container px-0">
      <Row>
        <Col lg={2}>
          <Row>
            <Col>
              {Object.keys(props.decks).length > 0 && (
                <DeckSelect
                  decks={props.decks}
                  activeDeck={props.activeDeck}
                  setActiveDeck={props.setActiveDeck}
                />
              )}
            </Col>
            <Col>
              {(props.decks[props.activeDeck] || sharedDeck) && props.isMobile &&
               <Button
                 variant="outline-secondary"
                 onClick={() => setShowInfo(!showInfo)}
               >
                 <ChevronExpand />
               </Button>
              }
              {props.username && (
                <DeckImport
                  setActiveDeck={props.setActiveDeck}
                  getDecks={props.getDecks}
                  isMobile={props.isMobile}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col lg={8}>
          { (showInfo || !props.isMobile) &&
            <>
              {(props.decks[props.activeDeck] || sharedDeck) &&
               <DeckShowInfo
                 deck={
                   props.activeDeck
                     ? props.decks[props.activeDeck]
                     : sharedDeck[sharedDeckId]
                 }
                 deckUpdate={deckUpdate}
                 username={props.username}
                 isAuthor={isAuthor}
               />
              }
            </>
          }
        </Col>
        <Col lg={2}>
          {(props.decks[props.activeDeck] || sharedDeck) && !props.isMobile &&
           <DeckShowButtons
             isAuthor={isAuthor}
             username={props.username}
             deck={
               props.activeDeck
                 ? props.decks[props.activeDeck]
                 : sharedDeck[sharedDeckId]
             }
             getDecks={props.getDecks}
             activeDeck={
               props.activeDeck
                 ? props.activeDeck
                 : sharedDeckId
             }
             setActiveDeck={props.setActiveDeck}
           />
          }
        </Col>
      </Row>
      {(props.decks[props.activeDeck] || sharedDeck) && (
        <Row>
          <Col lg={7}>
            <DeckShowCrypt
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              deckid={props.activeDeck ? props.activeDeck : sharedDeckId}
              cards={
                props.activeDeck
                  ? props.decks[props.activeDeck].crypt
                  : sharedDeck[sharedDeckId].crypt
              }
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              isAuthor={isAuthor}
            />
          </Col>
          <Col lg={5}>
            <DeckShowLibrary
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              deckid={props.activeDeck ? props.activeDeck : sharedDeckId}
              cards={
                props.activeDeck
                  ? props.decks[props.activeDeck].library
                  : sharedDeck[sharedDeckId].library
              }
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              isAuthor={isAuthor}
            />
          </Col>
        </Row>
      )}
      {sharedDeck && sharedDeck ? (
        <AlertMessage
          className="error-message"
          value={<b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>}
        />
      ) : null}
    </Container>
  );
}

export default Deck;
