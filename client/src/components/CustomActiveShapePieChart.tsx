import { PieChart, Pie, Cell, LabelList, Label } from 'recharts';
import '../styles/CustomPieChart.css'

const data = [
  { name: 'Stock A', value: 400 },
  { name: 'Stock B', value: 300 },
  { name: 'Stock C', value: 300 },
  { name: 'Stock D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      innerRadius={100}
      outerRadius={140}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      <LabelList
        dataKey="name"
        position="outside"
        style={{
          fill: '#000 !important',  // Check that this is correctly applied
          fontSize: '14px',
		  stroke: 'none'
        }}
      />
      <Label
        value="Portfolio"
        position="center"
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          fill: '#111',
        }}
      />
    </Pie>
  </PieChart>
);

export default CustomPieChart;
