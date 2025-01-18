import dayjs from 'dayjs';

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

export const LineChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { price, date } = payload[0].payload;

    const fill = payload[0]?.color;

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
          <span style={{ color: fill, fontWeight: 'bold' }}>Date</span>
        </p>

        <p>
          <span style={{ color: fill, fontWeight: 'bold' }}>●</span>{' '}
          {dayjs(date).format('MMM DD, YYYY')}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Value:</strong> ${price?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};
