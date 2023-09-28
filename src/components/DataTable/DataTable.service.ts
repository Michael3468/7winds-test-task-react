import { IEditableRows, ITableData } from './DataTable.types';

function countNestedElements(arr: ITableData) {
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

function formattedNumber(num: number, separator?: string): string {
  return num.toLocaleString().replace(/,/g, separator ?? ' ');
}

const isRowEditable = (itemId: number, rows: IEditableRows[]): boolean => {
  const filteredRows = rows.filter((row) => row.id === itemId);

  return filteredRows[0].isEditable;
};

export { countNestedElements, formattedNumber, isRowEditable };
