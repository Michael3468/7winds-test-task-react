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

// eslint-disable-next-line import/prefer-default-export
export type { ITableData };
