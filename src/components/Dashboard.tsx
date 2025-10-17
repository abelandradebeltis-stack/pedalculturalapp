
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, Users, Zap } from 'lucide-react';

const initialMetrics = {
  totalParticipants: 1250,
  engagementRate: '85%',
  eventsHeld: 42,
  satisfactionRate: '95%',
};

const chartData = {
  participants: [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 70 },
    { name: 'Jun', value: 85 },
  ],
  engagement: [
    { name: 'Week 1', value: 70 },
    { name: 'Week 2', value: 75 },
    { name: 'Week 3', value: 80 },
    { name: 'Week 4', value: 85 },
  ],
};

const MetricCard = ({ title, value, icon: Icon, onClick, isSelected }: { title: string; value: string | number; icon: React.ElementType; onClick: () => void; isSelected: boolean; }) => (
  <motion.div
    layout
    onClick={onClick}
    className={`group p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
      isSelected ? 'bg-jardim-noturno text-white' : 'bg-white hover:bg-gray-100'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center">
      <Icon className={`w-8 h-8 mr-4 ${isSelected ? 'text-white' : 'text-jardim-noturno group-hover:text-jardim-noturno'}`} />
      <div>
        <h3 className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-600'}`}>{title}</h3>
        <p className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      </div>
    </div>
  </motion.div>
);

const BarChart = ({ data }: { data: { name: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const chartHeight = 200; // Max height for bars in pixels

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">Participantes por Mês</h3>
      <div className="h-64 bg-gray-100 rounded-md flex items-end justify-around p-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * chartHeight}px` }}
              transition={{ duration: 0.5 }}
              className="bg-jardim-noturno rounded-t-md"
              style={{ width: '2rem' }}
            ></motion.div>
            <span className="text-sm mt-2 text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const LineChart = ({ data }: { data: { name: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartWidth = 500;
  const chartHeight = 250;
  const padding = 40;

  const points = data.map((point, i) => {
      const x = (i / (data.length - 1)) * (chartWidth - 2 * padding) + padding;
      const y = chartHeight - padding - ((point.value / maxValue) * (chartHeight - 2 * padding));
      return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800">Taxa de Engajamento Semanal</h3>
      <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center p-4">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full">
          <motion.polyline
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
            fill="none"
            stroke="#DB2777"
            strokeWidth="3"
            points={points}
          />
          {data.map((point, i) => {
            const x = (i / (data.length - 1)) * (chartWidth - 2 * padding) + padding;
            return <text key={i} x={x} y={chartHeight - padding + 20} textAnchor="middle" fontSize="12" className="fill-current text-gray-600">{point.name}</text>
          })}
        </svg>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('totalParticipants');
  const [metrics, setMetrics] = useState(initialMetrics);

  const handleMetricSelect = (metric: string) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="relative z-30 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen pt-24">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-cinza-urbano"
      >
        Painel Interativo
      </motion.h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <MetricCard
          title="Total de Participantes"
          value={metrics.totalParticipants}
          icon={Users}
          onClick={() => handleMetricSelect('totalParticipants')}
          isSelected={selectedMetric === 'totalParticipants'}
        />
        <MetricCard
          title="Taxa de Engajamento"
          value={metrics.engagementRate}
          icon={Zap}
          onClick={() => handleMetricSelect('engagementRate')}
          isSelected={selectedMetric === 'engagementRate'}
        />
        <MetricCard
          title="Eventos Realizados"
          value={metrics.eventsHeld}
          icon={BarChartIcon}
          onClick={() => {}} // Placeholder for future functionality
          isSelected={false}
        />
        <MetricCard
          title="Taxa de Satisfação"
          value={metrics.satisfactionRate}
          icon={LineChartIcon}
          onClick={() => {}} // Placeholder for future functionality
          isSelected={false}
        />
      </div>

      <AnimatePresence mode="wait">
        <div className="mt-8">
          {selectedMetric === 'totalParticipants' && (
            <BarChart key="participants" data={chartData.participants} />
          )}
          {selectedMetric === 'engagementRate' && (
            <LineChart key="engagement" data={chartData.engagement} />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
