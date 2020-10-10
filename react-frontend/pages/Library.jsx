import React, { useState } from 'react';

import AlertMessage from './components/AlertMessage.jsx';
import ResultLibrary from './components/ResultLibrary.jsx';
import SearchLibraryForm from './components/SearchLibraryForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelect from './components/DeckSelect.jsx';

function Library(props) {
  const [results, setResults] = useState(undefined);
  const [sortMethod, setSortMethod] = useState('Default');

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-3">
          {Object.keys(props.decks).length > 0 && (
            <DeckSelect
              preview={true}
              decks={props.decks}
              activeDeck={props.activeDeck}
              setActiveDeck={props.setActiveDeck}
            />
          )}

          {props.activeDeck && (
            <DeckPreview
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deck={props.decks[props.activeDeck]}
              getDecks={props.getDecks}
              deckCardChange={props.deckCardChange}
            />
          )}
        </div>

        <div className="col-md-12 col-lg-6">
          {results != undefined && results != null && (
            <ResultLibrary
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deckCardAdd={props.deckCardAdd}
              cards={results}
              activeDeck={props.activeDeck}
              showSort={true}
              showTotal={true}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          )}
          {results === null && (
            <AlertMessage className="error-message">
              <>
                <div />
                <b>NO CARDS FOUND</b>
                <div />
              </>
            </AlertMessage>
          )}
        </div>

        <div className="col-md-12 col-lg-3">
          <SearchLibraryForm setResults={setResults} />
        </div>
      </div>
    </div>
  );
}

export default Library;
