import { IEditableRows } from '../DataTable/DataTable.types';
import { ITableData } from '../types';

interface IButtonAddRowProps {
  parentId: number;
  tableData: ITableData[];
  setTableData: React.Dispatch<React.SetStateAction<ITableData[]>>;
  setEditableRows: React.Dispatch<React.SetStateAction<IEditableRows[]>>;
  setParentId: React.Dispatch<React.SetStateAction<number | null>>;
  editableRows: IEditableRows[];
}

// eslint-disable-next-line import/prefer-default-export
export type { IButtonAddRowProps };
