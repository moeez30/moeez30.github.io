import { Link } from "react-router-dom";

function Table({ url, columns, data, setKeywordId}) {
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
        {data.map((row) => (
          <tr key={row.id}>
            {Object.keys(row).map((key) => {
              if (key === "id") {
                return (
                  <td key={key}>
<Link to={`${url}/${row.id}`}>View</Link>
                  </td>
                );
              }
              if (key === "keywordId") {
                return (
                  <td key={key}>
<button onClick={()=>{setKeywordId({"id":row.keywordId,"bid":row.bid})}}>Day Part</button>
                  </td>
                );
              }
              return <td key={key}>{row[key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;