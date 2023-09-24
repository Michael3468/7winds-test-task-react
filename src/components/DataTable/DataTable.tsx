import './DataTable.styles.scss';

const DataTable = () => {
  const a = 0;

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

          <tbody className="data-table__table-body">
            <tr className="data-table__table-body-row">
              <td className="data-table__table-body-cell">val1</td>
              <td className="data-table__table-body-cell">val2</td>
              <td className="data-table__table-body-cell">val3</td>
              <td className="data-table__table-body-cell">val4</td>
              <td className="data-table__table-body-cell">val5</td>
              <td className="data-table__table-body-cell">val6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
