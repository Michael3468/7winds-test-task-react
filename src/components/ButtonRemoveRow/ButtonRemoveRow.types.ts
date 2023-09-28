import { ITableData } from '../../types';

interface IButtonRemoveProps {
  rowId: number;
  setTableData: React.Dispatch<React.SetStateAction<ITableData[]>>;
}

// eslint-disable-next-line import/prefer-default-export
export type { IButtonRemoveProps };
