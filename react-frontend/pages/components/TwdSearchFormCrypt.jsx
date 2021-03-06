import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptPopover from './ResultCryptPopover.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function TwdSearchFormCrypt(props) {
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event] = 1;
    props.setState((prevState) => ({
      ...prevState,
      crypt: newState,
    }));
  };

  const cryptCardsList = Object.keys(props.state)
    .filter((id) => props.state[id] > 0)
    .map((id, index) => {

      const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
        return (
          <Popover ref={ref} {...props}>
            <Popover.Content>
              <ResultCryptPopover card={props.card} showImage={children} />
            </Popover.Content>
          </Popover>
        );
      });
      CardPopover.displayName = 'CardPopover';

      return (
        <div key={index} className="d-flex align-items-center">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id]}
            target="crypt"
          />
          <OverlayTrigger
            placement='left'
            overlay={
              <CardPopover card={props.cardBase[id]}>{props.showImage}</CardPopover>
            }
          >
            <div onClick={() => setModalCard(props.cardBase[id])}>
              <ResultCryptName card={props.cardBase[id]}/>
            </div>
          </OverlayTrigger>
        </div>
      );
    });

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}search/crypt`;
    const input = { name: inputValue };
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    if (inputValue.length > 2) {
      return fetch(url, options).then((response) => response.json());
    } else {
      return null;
    }
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        autoFocus={false}
        value={null}
        placeholder="Add Crypt Card"
        loadOptions={loadOptions}
        onChange={handleAdd}
        getOptionLabel={(card) => {
          return (
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <ResultCryptCapacity value={props.cardBase[card]['Capacity']} />
                <span className="px-2">
                  {props.cardBase[card]['Banned'] ? (
                    <>
                      <strike>{props.cardBase[card]['Name']}</strike>
                      {props.cardBase[card]['Adv'] && (
                        <span className="pl-1">
                          <img
                            className="advanced-image-results"
                            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                            title="Advanced"
                          />
                        </span>
                      )}
                      <span className="pl-1">
                        <Hammer />
                      </span>
                    </>
                  ) : (
                    <>
                      {props.cardBase[card]['Name']}
                      {props.cardBase[card]['Adv'] && (
                        <span className="pl-1">
                          <img
                            className="advanced-image-results"
                            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                            title="Advanced"
                          />
                        </span>
                      )}
                    </>
                  )}
                </span>
                <ResultCryptClan value={props.cardBase[card]['Clan']} />
              </div>
              <div className="d-flex flex-nowrap">
                <ResultCryptDisciplines
                  value={props.cardBase[card]['Disciplines']}
                />
              </div>
            </div>
          );
        }}
      />
      {cryptCardsList}
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
          isMobile={props.isMobile}
        />
      )}
    </>
  );
}

export default TwdSearchFormCrypt;
