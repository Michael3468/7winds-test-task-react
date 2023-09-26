import { ITableData } from './DataTable.types';

function formattedNumber(num: number, separator?: string): string {
  return num.toLocaleString().replace(/,/g, separator ?? ' ');
}

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

export { countNestedElements, formattedNumber };
