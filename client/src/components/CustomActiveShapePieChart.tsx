import { PieChart, Pie, Cell, LabelList, Label, Tooltip } from 'recharts';
import '../styles/CustomPieChart.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="custom-tooltip">
        <p className="label">{`${name} : ${value.toFixed(2)}$`}</p>
      </div>
    );
  }
  return null;
};

const CustomActiveShapePieChart = ({ data }: { data: any[] }) => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx={200}
      cy={200}
      innerRadius={100}
      outerRadius={140}
      isAnimationActive={true}
      animationDuration={800}
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
          fill: '#000',
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
    <Tooltip content={<CustomTooltip />} />
  </PieChart>
);

export default CustomActiveShapePieChart;
