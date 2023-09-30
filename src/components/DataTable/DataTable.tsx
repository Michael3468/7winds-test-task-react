import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { defaultRow, eID } from '../../assets/constants';
import useFetch from '../../hooks/useFetch';
import {
  changeRow,
  checkIsRowFinishedEditing,
  countNestedElements,
  createNewRowOnServer,
  findUpdatedRow,
  formattedNumber,
  isRowEditable,
  updateEditableRowsStatus,
  updateRowOnServer,
  updateRowsDataFromServer,
} from './DataTable.service';
import { IEditableRows, INewRow, ITableData, TTableDataItemKey } from './DataTable.types';

import { ButtonAddRow, ButtonRemoveRow } from '..';

import './DataTable.styles.scss';

const DataTable = () => {
  const { data, isLoading, error } = useFetch(`v1/outlay-rows/entity/${eID}/row/list`);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [editableRows, setEditableRows] = useState<IEditableRows[]>([]);
  const [parentId, setParentId] = useState<number | null>(null);

  const handleRowClick = async (rowId: number) => {
    const editableRowsStatus = updateEditableRowsStatus(editableRows, rowId);

    setEditableRows(() => editableRowsStatus);

    const isRowFinishedEdited = checkIsRowFinishedEditing(editableRowsStatus, rowId);

    if (isRowFinishedEdited) {
      try {
        const updatedRow = findUpdatedRow(tableData, rowId);

        if (parentId) {
          const newRow: INewRow = { ...defaultRow, ...updatedRow, parentId };
          delete newRow.id;
          delete newRow.total;

          setParentId(() => null);

          await createNewRowOnServer(newRow);
        } else {
          await updateRowOnServer(updatedRow, rowId);
        }
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
          if (item.child.length) {
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
    return arr.map((row) => (
      <React.Fragment key={row.id}>
        <tr
          key={row.id}
          className="data-table__table-body-row"
          onDoubleClick={() => handleRowClick(row.id)}
        >
          {/* level cell */}
          <td className="data-table__table-body-cell">
            <div
              className="data-table__table-body-cell-level-icons"
              style={{ marginLeft: `${level ? level * 1.15 : -0.2}rem` }}
              onDoubleClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ButtonAddRow
                editableRows={editableRows}
                parentId={row.id}
                setEditableRows={setEditableRows}
                setParentId={setParentId}
                setTableData={setTableData}
                tableData={tableData}
              />

              <ButtonRemoveRow rowId={row.id} setTableData={setTableData} />
            </div>

            {/* horizontal line */}
            {level > 0 && (
              <div
                className="data-table__table-body-cell-line_horizontal"
                style={{ marginLeft: `${level * 1.2 - 0.55}rem` }}
              />
            )}
            {/* horizontal line */}

            {/* vertical lines */}
            {row.child.length > 0 &&
              Array.from({ length: countNestedElements(row) }).map((_, index: number) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="data-table__table-body-cell-line_vertical"
                  style={{
                    marginLeft: `${level * 1.2 + 0.65}rem`,
                    marginTop: `${index > 0 ? index * 3.7 - 0.4 + index * 0.04 : 0}rem`,
                    height: `${index > 0 ? 3.75 : 3.3}rem`,
                  }}
                />
              ))}
            {/* vertical lines */}
          </td>
          {/* level cell */}

          {isRowEditable(row.id, editableRows) ? (
            <>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={row.rowName}
                  onChange={(e) => handleInputChange(e, row, 'rowName')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(row.salary)}
                  onChange={(e) => handleInputChange(e, row, 'salary')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(row.equipmentCosts)}
                  onChange={(e) => handleInputChange(e, row, 'equipmentCosts')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(row.overheads)}
                  onChange={(e) => handleInputChange(e, row, 'overheads')}
                />
              </td>
              <td className="data-table__table-body-cell">
                <input
                  className="data-table__table-body-cell-input"
                  value={formattedNumber(row.estimatedProfit)}
                  onChange={(e) => handleInputChange(e, row, 'estimatedProfit')}
                />
              </td>
            </>
          ) : (
            <>
              <td className="data-table__table-body-cell">{row.rowName}</td>
              <td className="data-table__table-body-cell">{formattedNumber(row.salary)}</td>
              <td className="data-table__table-body-cell">{formattedNumber(row.equipmentCosts)}</td>
              <td className="data-table__table-body-cell">{formattedNumber(row.overheads)}</td>
              <td className="data-table__table-body-cell">
                {formattedNumber(row.estimatedProfit)}
              </td>
            </>
          )}
        </tr>
        {Array.isArray(row.child) && renderNestedArr(row.child, level + 1)}
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
