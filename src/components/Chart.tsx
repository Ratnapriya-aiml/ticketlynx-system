
import { useState, useEffect } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ChartProps = {
  type: 'area' | 'bar' | 'pie';
  data: any[];
  height?: number;
  title?: string;
  subTitle?: string;
  colors?: string[];
  dataKey?: string;
  nameKey?: string;
  xAxisDataKey?: string;
  tooltipFormatter?: (value: any) => string;
};

const Chart = ({
  type,
  data,
  height = 350,
  title,
  subTitle,
  colors = ['#0071e3', '#5ac8fa', '#30c8b9', '#a2845e', '#ff9500'],
  dataKey = 'value',
  nameKey = 'name',
  xAxisDataKey = 'name',
  tooltipFormatter = (value) => `${value}`,
}: ChartProps) => {
  const [chartData, setChartData] = useState(data);
  
  useEffect(() => {
    // Create a smooth animation effect by gradually updating the data
    const targetData = data;
    const transitionData = chartData.map((item, index) => ({
      ...item,
      [dataKey]: 0
    }));
    
    setChartData(transitionData);
    
    const timeout = setTimeout(() => {
      setChartData(targetData);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [data]);

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey={xAxisDataKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a3a3a3', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a3a3a3', fontSize: 12 }}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333333" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#333333',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                }}
                formatter={tooltipFormatter}
                labelStyle={{ color: '#ffffff' }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]}
                fillOpacity={1}
                fill="url(#colorGradient)"
                strokeWidth={2}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey={xAxisDataKey} 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a3a3a3', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a3a3a3', fontSize: 12 }}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333333" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#333333',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                }}
                formatter={tooltipFormatter}
                labelStyle={{ color: '#ffffff' }}
              />
              <Bar 
                dataKey={dataKey} 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey={dataKey}
                nameKey={nameKey}
                animationDuration={1000}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e1e', 
                  borderColor: '#333333',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                }}
                formatter={tooltipFormatter}
                labelStyle={{ color: '#ffffff' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span style={{ color: '#a3a3a3' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 h-full">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          {subTitle && <p className="text-sm text-muted-foreground">{subTitle}</p>}
        </div>
      )}
      {renderChart()}
    </div>
  );
};

export default Chart;
