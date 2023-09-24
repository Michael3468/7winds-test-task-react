import { useEffect, useState } from 'react';

import { eID } from '../../assets/constants';
import useFetch from '../../hooks/useFetch';
import formattedNumber from './DataTable.service';
import { ITableData } from './DataTable.types';
import './DataTable.styles.scss';

const DataTable = () => {
  const { data, isLoading, error } = useFetch(`v1/outlay-rows/entity/${eID}/row/list`);
  const [tableData, setTableData] = useState<ITableData[]>([]);

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
            <tbody className="data-table__table-body">
              {tableData?.map((item) => (
                <tr key={item.id} className="data-table__table-body-row">
                  <td className="data-table__table-body-cell">{item.id}</td>
                  <td className="data-table__table-body-cell">{item.rowName}</td>
                  <td className="data-table__table-body-cell">
                    {formattedNumber(item.salary, ' ')}
                  </td>
                  <td className="data-table__table-body-cell">
                    {formattedNumber(item.equipmentCosts)}
                  </td>
                  <td className="data-table__table-body-cell">{formattedNumber(item.overheads)}</td>
                  <td className="data-table__table-body-cell">
                    {formattedNumber(item.estimatedProfit)}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DataTable;
