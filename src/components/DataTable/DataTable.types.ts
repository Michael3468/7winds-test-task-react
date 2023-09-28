interface IEditableRows {
  id: number;
  isEditable: boolean;
}

interface ITableData {
  id: number;
  rowName: string;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: ITableData[];
  total?: number;
  machineOperatorSalary?: number;
  mainCosts?: number;
  materials?: number;
  mimExploitation?: number;
  supportCosts?: number;
}

type TTableDataItemKey = 'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit';

export type { IEditableRows, ITableData, TTableDataItemKey };
