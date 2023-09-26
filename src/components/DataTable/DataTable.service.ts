import { ITableData } from './DataTable.types';

function formattedNumber(num: number, separator?: string): string {
  return num.toLocaleString().replace(/,/g, separator ?? ' ');
}

// function countNestedElements(arr: ITableData) {
//   let count = 0;
//   // console.log(count);
//   // console.log(arr);
//   // console.log(arr.total);

//   for (let i = 0; i < arr.child.length; i += 1) {
//     console.log(arr.child[i]);
//     if (Array.isArray(arr.child[i])) {
//       console.log('if');
//       count += countNestedElements(arr.child[i]);
//     } else {
//       console.log('else');
//       count += 1;
//     }
//   }

//   return count;
// }

// function countNestedElements(arr: ITableData) {
//   let count = 0;
//   // console.log(count);
//   // console.log(arr);
//   // console.log(arr.total);

//   function getCount(dataArr: ITableData) {
//     for (let i = 0; i < dataArr.child.length; i += 1) {
//       console.log('child elem:');
//       console.log(dataArr.child[i]);
//       // console.log(dataArr.child.length);
//       // console.log(typeof dataArr.child[0]);
//       if (Array.isArray(dataArr.child[i])) {
//         console.log('if');
//         count += getCount(dataArr.child[i]);
//       } else {
//         console.log('else');
//         count += 1;
//       }
//     }

//     return count;
//   }

//   const rez = getCount(arr);
//   console.log(`rez: ${rez}`);
//   return rez;
// }

function countNestedElements(arr: ITableData) {
  let count = 0;
  // console.log(count);
  // console.log(arr);
  // console.log(arr.total);

  function getCount(dataArr: ITableData) {
    for (let i = 0; i < dataArr.child.length; i += 1) {
      // console.log('child elem:');
      // console.log(dataArr.child[i]);
      // console.log(dataArr.child.length);
      // console.log(typeof dataArr.child[0]);
      if (dataArr.child.length) {
        // console.log('if');
        // console.log(dataArr.child[i]);
        count += 1;
        getCount(dataArr.child[i]);
        // console.log(`count: ${count}`);
      } else {
        // console.log('else');
        count += 1;
      }
    }

    return count;
  }

  const rez = getCount(arr);
  // console.log(`rez: ${rez}`);
  return rez;
}

// function countNestedElements(item: ITableData) {
//   const res = item.total;
//   console.log(res);
//   return res;
// }

export { countNestedElements, formattedNumber };
