export const PieChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0];

    return (
      <div
        style={{
          background: '#fff',
          border: `1px solid ${fill}`,
          borderRadius: '5px',
          padding: '10px',
          color: '#333',
          fontSize: '14px',
        }}
      >
        <p>
          <span style={{ color: fill, fontWeight: 'bold' }}>●</span> {name}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Value:</strong> {value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};
