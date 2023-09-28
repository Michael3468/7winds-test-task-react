import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { eID } from '../../assets/constants';
import useFetch from '../../hooks/useFetch';
import request from '../../utils/request';
import {
  changeRow,
  checkIsRowFinishedEditing,
  countNestedElements,
  findUpdatedRow,
  formattedNumber,
  isRowEditable,
  updateEditableRowsStatus,
  updateRowOnServer,
  updateRowsDataFromServer,
} from './DataTable.service';
import { IEditableRows, ITableData, TTableDataItemKey } from './DataTable.types';
import levelIcon from './img/level-icon.svg';
import trashIcon from './img/trash-icon.svg';

import './DataTable.styles.scss';

const DataTable = () => {
  const { data, isLoading, error } = useFetch(`v1/outlay-rows/entity/${eID}/row/list`);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [editableRows, setEditableRows] = useState<IEditableRows[]>([]);

  const handleRemoveIconClick = async (rowId: number) => {
    try {
      const response = await request.delete(`/v1/outlay-rows/entity/${eID}/row/${rowId}/delete`);

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

  const handleRowClick = async (rowId: number) => {
    const editableRowsStatus = updateEditableRowsStatus(editableRows, rowId);

    setEditableRows(() => editableRowsStatus);

    const isRowFinishedEdited = checkIsRowFinishedEditing(editableRowsStatus, rowId);

    if (isRowFinishedEdited) {
      try {
        const updatedRow = findUpdatedRow(tableData, rowId);

        await updateRowOnServer(updatedRow, rowId);
        await updateRowsDataFromServer(setTableData);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  const initEditableRowsStatus = useCallback(
    (arr: ITableData[]) => {
      const initRows = (dataArr: ITableData[]) => {
        dataArr.forEach((item) => {
          if (item.total) {
            initRows(item.child);
          }

          const isRowIdExist = editableRows.some((row) => row.id === item.id);
          if (!isRowIdExist) {
            setEditableRows((prev) => [...prev, { id: item.id, isEditable: false }]);
          }
        });
      };

      initRows(arr);
    },
    [editableRows],
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    row: ITableData,
    rowKey: TTableDataItemKey,
  ) => {
    const { value } = event.target;
    changeRow(value, row, rowKey, tableData, setTableData);
  };

  function renderNestedArr(arr: ITableData[], level: number = 0) {
    return arr.map((item) => (
      <React.Fragment key={item.id}>
        <tr
          key={item.id}
          className="data-table__table-body-row"
          onDoubleClick={() => handleRowClick(item.id)}
        >
          {/* level cell */}
          <td className="data-table__table-body-cell">
            <div
              className="data-table__table-body-cell-level-icons"
              style={{ marginLeft: `${level * 1.2}rem` }}
            >
              <img
                alt="level icon"
                className="data-table__table-body-cell-level-icons-level"
                src={levelIcon}
              />
              <img
                alt="remove row icon"
                className="data-table__table-body-cell-level-icons-trash"
                src={trashIcon}
                onClick={() => handleRemoveIconClick(item.id)}
              />
            </div>

            {/* horizontal line */}
            {level > 0 && (
              <div
                className="data-table__table-body-cell-line_horizontal"
                style={{ marginLeft: `${level * 1.2 - 0.4}rem` }}
              />
            )}
            {/* horizontal line */}

            {/* vertical lines */}
            {item.child.length > 0 &&
              Array.from({ length: countNestedElements(item) }).map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="data-table__table-body-cell-line_vertical"
                  style={{
                    marginLeft: `${level * 1.2 + 0.8}rem`,
                    marginTop: `${index > 0 ? index * 3.7 - 0.38 : index * 3.3}rem`,
                    height: `${index > 0 ? 4 : 3.3}rem`,
                  }}
                />
              ))}
            {/* vertical lines */}
          </td>
          {/* level cell */}

          {isRowEditable(item.id, editableRows) ? (
            <>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={item.rowName}
                  onChange={(e) => handleInputChange(e, item, 'rowName')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(item.salary)}
                  onChange={(e) => handleInputChange(e, item, 'salary')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(item.equipmentCosts)}
                  onChange={(e) => handleInputChange(e, item, 'equipmentCosts')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(item.overheads)}
                  onChange={(e) => handleInputChange(e, item, 'overheads')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(item.estimatedProfit)}
                  onChange={(e) => handleInputChange(e, item, 'estimatedProfit')}
                />
              </td>
            </>
          ) : (
            <>
              <td className="data-table__table-body-cell">{item.rowName}</td>
              <td className="data-table__table-body-cell">{formattedNumber(item.salary)}</td>
              <td className="data-table__table-body-cell">
                {formattedNumber(item.equipmentCosts)}
              </td>
              <td className="data-table__table-body-cell">{formattedNumber(item.overheads)}</td>
              <td className="data-table__table-body-cell">
                {formattedNumber(item.estimatedProfit)}
              </td>
            </>
          )}
        </tr>
        {Array.isArray(item.child) && renderNestedArr(item.child, level + 1)}
      </React.Fragment>
    ));
  }

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setTableData(() => data as ITableData[]);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      initEditableRowsStatus(data as ITableData[]);
    }
  }, [data, initEditableRowsStatus]);

  return (
    <div className="data-table">
      <div className="data-table__header">
        <h3 className="data-table__header-caption">Строительно-монтажные работы</h3>
      </div>

      <div className="data-table__table-container">
        <table className="data-table__table">
          <thead className="data-table__table-header">
            <tr className="data-table__table-header-row">
              <th className="data-table__table-header-cell cell-1">Уровень</th>
              <th className="data-table__table-header-cell cell-2">Наименование работ</th>
              <th className="data-table__table-header-cell cell-3">Основная з/п</th>
              <th className="data-table__table-header-cell cell-4">Оборудование</th>
              <th className="data-table__table-header-cell cell-5">Накладные расходы</th>
              <th className="data-table__table-header-cell cell-6">Сметная прибыль</th>
            </tr>
          </thead>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <tbody className="data-table__table-body">{renderNestedArr(tableData)}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DataTable;
