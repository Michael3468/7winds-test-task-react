import { FC } from 'react';

import { ITableData } from '../types';
import { IButtonAddRowProps } from './ButtonAddRow.types';
import levelIcon from './img/level-icon.svg';

const ButtonAddRow: FC<IButtonAddRowProps> = ({
  parentId,
  tableData,
  setTableData,
  setEditableRows,
  editableRows,
  setParentId,
}) => {
  const temporaryId = Date.now();

  const addNewRow = (tData: ITableData[]) => {
    const addRow = (dataArr: ITableData[]) =>
      dataArr.map((row) => {
        if (row.child.length && row.id !== parentId) {
          addRow(row.child);
        }

        if (row.id === parentId) {
          row.child.push({
            id: temporaryId,
            rowName: '',
            salary: 0,
            equipmentCosts: 0,
            overheads: 0,
            estimatedProfit: 0,
            child: [],
            total: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            supportCosts: 0,
          });
        }

        return row;
      });

    const result = addRow(tData);
    setTableData(() => result);

    setParentId(() => parentId);
    setEditableRows((prev) => [...prev, { id: temporaryId, isEditable: true }]);
  };

  const handleButtonClick = () => {
    const isRowEditable = editableRows.some((row) => row.isEditable);

    if (!isRowEditable) {
      addNewRow(tableData);
    }
  };

  return (
    <button aria-label="add row" type="button" onClick={handleButtonClick}>
      <img alt="level icon" className="level-icon" src={levelIcon} />
    </button>
  );
};

export default ButtonAddRow;
