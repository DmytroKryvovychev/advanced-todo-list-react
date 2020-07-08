import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge';
import closeSvg from '../../assets/img/close.svg';

import './AddListButton.scss';

function AddButtonList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputvalue, setInputvalue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputvalue('');
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputvalue) {
      alert('Input list name');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputvalue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Error at list adding');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список',
            alt: 'New folder',
          },
        ]}></List>
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close"
            className="add-list__popup-close-btn"></img>

          <input
            value={inputvalue}
            onChange={(e) => setInputvalue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название списка"></input>

          <div className="add-list__popup-colors">
            <ul>
              <li>
                {colors.map((color) => (
                  <Badge
                    onClick={() => setSelectedColor(color.id)}
                    key={color.hex}
                    color={color.name}
                    className={selectedColor === color.id && 'active'}></Badge>
                ))}
              </li>
            </ul>
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddButtonList;
