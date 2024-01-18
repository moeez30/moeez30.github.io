function Table({ columns, data}) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            <tr key = {data.id}>
                <td key={key}>{row[key]}</td>;
            </tr>
        </tbody>
      </table>
    );
  }
  
  export default Table;