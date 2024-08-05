import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';
import DropdownData from './dropdown_data';
export default function Select({ data, onIdChange }) {
  const [selectValue, setSelectValue] = useState([]);
  useEffect;
  const buttonRef = useRef(null);
  useEffect(() => {
    //lấy giá trị id truyền lên component cha
    if (!_.isNil(data)) {
      onIdChange(selectValue[0]);
    }

    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        event.target.getAttribute('class') !== 'input-box'
      ) {
        setOpenSelectInput(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [data, onIdChange, selectValue]);
  const [openSelectInput, setOpenSelectInput] = useState(false);

  return (
    <div>
      <div
        className={styles.selectWrap}
        ref={buttonRef}
        onClick={() => {
          setOpenSelectInput(!openSelectInput);
        }}
      >
        <span className={styles.select}>
          <span
            className={styles.input}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {(selectValue[0] && `(${selectValue[0]}) - ${selectValue[1]}`) ||
              'Chọn người thực hiện'}
          </span>

          <span className={styles.arrow}></span>
        </span>
      </div>
      {openSelectInput && (
        <DropdownData data={data} setSelectValue={setSelectValue} />
      )}
    </div>
  );
}