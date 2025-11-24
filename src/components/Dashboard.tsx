
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart as BarChartIcon, Users, PieChart, Bike, MapPin, Globe } from 'lucide-react';
import Papa from 'papaparse';

// Tipos para os dados da planilha
interface SheetData {
    'Carimbo de data/hora': string;
    'Nome:': string;
    'Cidade e bairro onde mora:': string;
    'Idade:': string;
    'Com que frequência você utiliza a bicicleta?': string;
    'Identidade e Pertencimento': string;
}

const MetricCard = ({ title, value, icon: Icon, onClick, isSelected }: { title: string; value: string | number; icon: React.ElementType; onClick?: () => void; isSelected?: boolean; }) => (
    <motion.div
        layout
        onClick={onClick}
        className={`group p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${isSelected ? 'bg-jardim-noturno text-white' : 'bg-white hover:bg-gray-100'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <div className="flex items-center">
            <Icon className={`w-6 h-6 mr-3 ${isSelected ? 'text-white' : 'text-jardim-noturno group-hover:text-jardim-noturno'}`} />
            <div>
                <h3 className={`text-md font-semibold ${isSelected ? 'text-white' : 'text-gray-600'}`}>{title}</h3>
                {value && <p className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{value}</p>}
            </div>
        </div>
    </motion.div>
);

const BarChart = ({ data, title }: { data: { name: string; value: number }[], title: string }) => {
    const maxValue = data.length > 0 ? Math.max(...data.map(item => item.value)) : 1;
    const chartHeight = 200;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
            <div className="h-80 bg-gray-100 rounded-md flex items-end justify-around p-4 overflow-x-auto">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center mx-2 flex-shrink-0">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.value / maxValue) * chartHeight}px` }}
                            transition={{ duration: 0.5 }}
                            className="bg-jardim-noturno rounded-t-md"
                            style={{ width: '2rem' }}
                        ></motion.div>
                        <span className="text-xs mt-2 text-gray-600 w-20 break-words">{item.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const LocationList = ({ data, title }: { data: string[], title: string }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
        <div className="space-y-2 h-80 overflow-y-auto p-2">
            {data.map((location, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 bg-gray-100 rounded-md shadow-sm"
                >
                    <p className="text-gray-800">{location}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [selectedMetric, setSelectedMetric] = useState('monthlyParticipants');
    const [metrics, setMetrics] = useState({ totalParticipants: 0, uniqueLocations: 0 });
    const [chartData, setChartData] = useState<{
        monthlyParticipants: { name: string; value: number }[];
        ageDistribution: { name: string; value: number }[];
        bikeUsage: { name: string; value: number }[];
        location: { name: string; value: number }[];
    }>({ monthlyParticipants: [], ageDistribution: [], bikeUsage: [], location: [] });
    const [locationList, setLocationList] = useState<string[]>([]);

    useEffect(() => {
        Papa.parse<SheetData>("https://docs.google.com/spreadsheets/d/e/2PACX-1vSxodOlZc_MSKFbIVWHvGypWw5z059ART5j3uknn0j0Fs03hdt9PU6dhaXniYpr2MMjkC8DhZLdLkFD/pub?output=csv", {
            download: true,
            header: true,
            complete: (results) => {
                const data = results.data.filter(item => item['Carimbo de data/hora'] && item['Carimbo de data/hora'].trim() !== '');
                if (data.length === 0) return;
                
                const locations = data.map(item => (item['Cidade e bairro onde mora:'] || '').trim()).filter(Boolean);
                const uniqueLocations = Array.from(new Set(locations)).sort();

                setMetrics({ totalParticipants: data.length, uniqueLocations: uniqueLocations.length });
                setLocationList(uniqueLocations);

                const processData = (columnName: keyof SheetData) => {
                    const counts = data.reduce((acc, item) => {
                        const value = item[columnName]?.trim() || "N/A";
                        if (value !== "N/A") acc[value] = (acc[value] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>);
                    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 10);
                };

                const parseBrazillianDate = (dateString: string) => {
                    const datePart = dateString.split(' ')[0];
                    const parts = datePart.split('/');
                    return parts.length === 3 ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}`) : null;
                };

                const monthlyParticipants = data.reduce((acc, item) => {
                    const date = parseBrazillianDate(item['Carimbo de data/hora']);
                    if (date && !isNaN(date.getTime())) {
                        const month = date.toLocaleString('default', { month: 'short' });
                        acc[month] = (acc[month] || 0) + 1;
                    }
                    return acc;
                }, {} as Record<string, number>);

                const sortedMonths = Object.keys(monthlyParticipants).sort((a, b) => new Date(Date.parse(a + " 1, 2022")).getMonth() - new Date(Date.parse(b + " 1, 2022")).getMonth());
                const monthlyParticipantsData = sortedMonths.map(month => ({ name: month, value: monthlyParticipants[month] }));
                
                const ageGroups = {
                    "18-24": 0, "25-34": 0, "35-44": 0,
                    "45-54": 0, "55+": 0
                };
                data.forEach(item => {
                    const age = parseInt(item['Idade:'], 10);
                    if (isNaN(age)) return;
                    if (age <= 24) { ageGroups["18-24"]++; }
                    else if (age <= 34) { ageGroups["25-34"]++; }
                    else if (age <= 44) { ageGroups["35-44"]++; }
                    else if (age <= 54) { ageGroups["45-54"]++; }
                    else { ageGroups["55+"]++; }
                });
                const ageDistributionData = Object.entries(ageGroups).map(([name, value]) => ({ name, value }));

                setChartData({
                    monthlyParticipants: monthlyParticipantsData,
                    ageDistribution: ageDistributionData,
                    bikeUsage: processData('Com que frequência você utiliza a bicicleta?'),
                    location: processData('Cidade e bairro onde mora:'),
                });
            }
        });
    }, []);

    return (
        <div className="relative z-30 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen pt-24">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6 text-cinza-urbano">
                Painel Interativo
            </motion.h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <MetricCard title="Participantes" value={metrics.totalParticipants} icon={Users} onClick={() => setSelectedMetric('monthlyParticipants')} isSelected={selectedMetric === 'monthlyParticipants'} />
                <MetricCard title="Localidades" value={metrics.uniqueLocations} icon={Globe} onClick={() => setSelectedMetric('locations')} isSelected={selectedMetric === 'locations'} />
                <MetricCard title="Idade" icon={PieChart} value="" onClick={() => setSelectedMetric('ageDistribution')} isSelected={selectedMetric === 'ageDistribution'} />
                <MetricCard title="Uso da Bicicleta" icon={Bike} value="" onClick={() => setSelectedMetric('bikeUsage')} isSelected={selectedMetric === 'bikeUsage'} />
                <MetricCard title="Localização" icon={MapPin} value="" onClick={() => setSelectedMetric('location')} isSelected={selectedMetric === 'location'} />
            </div>

            <AnimatePresence mode="wait">
                <div className="mt-8">
                    {selectedMetric === 'monthlyParticipants' && <BarChart key="participants" data={chartData.monthlyParticipants} title="Participantes por Mês" />}
                    {selectedMetric === 'ageDistribution' && <BarChart key="age" data={chartData.ageDistribution} title="Distribuição de Idade" />}
                    {selectedMetric === 'bikeUsage' && <BarChart key="usage" data={chartData.bikeUsage} title="Frequência de Uso da Bicicleta" />}
                    {selectedMetric === 'location' && <BarChart key="location" data={chartData.location} title="Distribuição Geográfica (Top 10)" />}
                    {selectedMetric === 'locations' && <LocationList key="locations" data={locationList} title="Localidades dos Participantes (Bairro/Cidade/Estado)" />}
                </div>
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
