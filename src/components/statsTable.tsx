import { calculateStats, classes, tableArray } from "./statisticsUtils";

const StatsTable: React.FC = () => {
  return (
    <div>
      {tableArray.map((table, i) => {
        return (
          <table key={i}>
            <thead>
              <tr>
                <th>Measure</th>
                {classes.map((classKey, index) => (
                  <th key={index}>Class {classKey}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bolt">{table.name} Mean</td>
                {classes.map((classKey, index) => (
                  <td key={index}>
                    {calculateStats(table.property, classKey).mean}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="fw-bolt">{table.name} Median</td>
                {classes.map((classKey, index) => (
                  <td key={index}>
                    {calculateStats(table.property, classKey).median}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="fw-bolt">{table.name} Mode</td>
                {classes.map((classKey, index) => (
                  <td key={index}>
                    {calculateStats(table.property, classKey).mode}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default StatsTable;
