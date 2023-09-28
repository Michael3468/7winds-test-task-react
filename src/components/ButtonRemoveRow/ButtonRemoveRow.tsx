import { FC } from 'react';

import { eID } from '../../assets/constants';
import request from '../../utils/request';
import { IButtonRemoveProps } from './ButtonRemoveRow.types';
import trashIcon from './img/trash-icon.svg';

import './ButtonRemoveRow.styles.scss';

const ButtonRemove: FC<IButtonRemoveProps> = ({ rowId, setTableData }) => {
  const handleRemoveIconClick = async (rId: number) => {
    try {
      const response = await request.delete(`/v1/outlay-rows/entity/${eID}/row/${rId}/delete`);

      if (response.status === 200) {
        const res = await request.get(`v1/outlay-rows/entity/${eID}/row/list`);

        if (res.data) {
          setTableData(() => res.data);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <button aria-label="remove row" className="button-remove-row" type="button" onClick={() => handleRemoveIconClick(rowId)}>
      <img alt="remove row icon" className="button-remove-row-icon" src={trashIcon} />
    </button>
  );
};

export default ButtonRemove;
