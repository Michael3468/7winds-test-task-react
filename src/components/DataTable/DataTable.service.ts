import { eID } from '../../assets/constants';
import request from '../../utils/request';
import {
  IEditableRows,
  ITableData,
  TTableDataItemKey,
} from './DataTable.types';

function changeRow(
  value: string,
  row: ITableData,
  rowKey: TTableDataItemKey,
  tableData: ITableData[],
  setTableData: React.Dispatch<React.SetStateAction<ITableData[]>>,
) {
  const valueWithoutSpaces = value.replace(/ /g, '');
  const isNumberType = !Number.isNaN(Number(valueWithoutSpaces));

  const isInputValueTypeCorrect = () =>
    (rowKey !== 'rowName' && isNumberType) || rowKey === 'rowName';

  let updatedRows: ITableData[] = [];

  if (isInputValueTypeCorrect()) {
    const updateRow = (arr: ITableData[]) => {
      updatedRows = arr.filter((dataItem) => {
        if (dataItem.total) {
          updateRow(dataItem.child);
        }

        if (dataItem.id === row.id) {
          // eslint-disable-next-line no-param-reassign
          dataItem[rowKey] = isNumberType
            ? (Number(valueWithoutSpaces) as never)
            : (value as never);
        }
        return dataItem;
      });

      return updatedRows;
    };

    updateRow(tableData);

    setTableData(() => updatedRows);
  }
}

function checkIsRowFinishedEditing(updatedRows: IEditableRows[], rowId: number): boolean {
  const editedRows = updatedRows.filter((row) => row.id === rowId);
  return !editedRows[0].isEditable;
}

function countNestedElements(arr: ITableData): number {
  let count = 0;

  function getCount(dataArr: ITableData) {
    for (let i = 0; i < dataArr.child.length; i += 1) {
      if (dataArr.child.length) {
        count += 1;
        getCount(dataArr.child[i]);
      } else {
        count += 1;
      }
    }

    return count;
  }

  const rez = getCount(arr);
  return rez;
}

function findUpdatedRow(tableData: ITableData[], itemId: number): ITableData {
  const updatedRow: ITableData[] = [];

  const findRow = (arr: ITableData[]): void => {
    arr.forEach((item) => {
      if (item.total) {
        findRow(item.child);
      }

      if (item.id === itemId) updatedRow.push(item);
    });
  };

  findRow(tableData);

  return updatedRow[0];
}

function formattedNumber(num: number, separator?: string): string {
  return num.toLocaleString().replace(/,/g, separator ?? ' ');
}

function isRowEditable(itemId: number, rows: IEditableRows[]): boolean {
  const filteredRows = rows.filter((row) => row.id === itemId);

  return filteredRows[0].isEditable;
}

function updateEditableRowsStatus(rows: IEditableRows[], rowId: number) {
  return rows.map((row) => {
    if (row.id === rowId) {
      return { ...row, isEditable: !row.isEditable };
    }
    return row;
  });
}

async function updateRowOnServer(updatedRow: ITableData, rowId: number) {
  try {
    await request.post(`/v1/outlay-rows/entity/${eID}/row/${rowId}/update`, updatedRow);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function updateRowsDataFromServer(
  setTableData: React.Dispatch<React.SetStateAction<ITableData[]>>,
) {
  const response = await request.get(`v1/outlay-rows/entity/${eID}/row/list`);
  setTableData(response.data);
}

// function updateRow

export {
  changeRow,
  checkIsRowFinishedEditing,
  countNestedElements,
  findUpdatedRow,
  formattedNumber,
  isRowEditable,
  updateEditableRowsStatus,
  updateRowsDataFromServer,
  updateRowOnServer,
};
