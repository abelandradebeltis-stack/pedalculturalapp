'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';

// Hook to check for mobile screen size
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

const COLUMN_MAP = {
  frequency: 'Com que frequência você utiliza a bicicleta?',
  age: 'Idade:',
  activism:
    'Bicicleta e Ativismo Ambiental\nNa sua opinião, o ato de pedalar é uma forma de ativismo ambiental no contexto urbano?',
  challenge_insecurity: 'Sensação de insegurança no trânsito:',
  challenge_infra:
    'Falta de infraestrutura cicloviária (ciclovias, ciclofaixas):',
  challenge_support:
    'Falta de infraestrutura de apoio (vestiários, bicicletários seguros):',
  challenge_car_culture: 'Cultura predominante do automóvel:',
  challenge_topography: 'Topografia da cidade (muitas ladeiras):',
  challenge_climate: 'Clima (muito calor/frio, chuva):',
};

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Dashboard = () => {
  const [frequencyData, setFrequencyData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [challengesData, setChallengesData] = useState([]);
  const [activismData, setActivismData] = useState([]);
  const [insecurityDistributionData, setInsecurityDistributionData] = useState(
    []
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxodOlZc_MSKFbIVWHvGypWw5z059ART5j3uknn0j0Fs03hdt9PU6dhaXniYpr2MMjkC8DhZLdLkFD/pub?output=csv'
        );

        Papa.parse(response.data, {
          header: true,
          complete: (result) => {
            const rawData = result.data.filter((row) => row[COLUMN_MAP.age]);
            
            const frequencyLabelMap = {
                'diariamente': 'Diário',
                'algumas vezes por semana': 'Semanal',
                'uma vez por semana': 'Semanal',
                'algumas vezes por mês': 'Mensal',
                'raramente': 'Raro',
                'não uso, mas tenho interesse': 'Interessado',
                'não uso e não tenho interesse': 'N/ Interessado',
            };
            const frequencyCounts = rawData.reduce((acc, row) => {
                const freq = row[COLUMN_MAP.frequency]?.trim().toLowerCase();
                const shortName = frequencyLabelMap[freq];
                if (shortName) {
                    acc[shortName] = (acc[shortName] || 0) + 1;
                }
                return acc;
            }, {});
            setFrequencyData(
              Object.entries(frequencyCounts).map(([name, value]) => ({ name, quantidade: value }))
            );

            const ageGroups = {
              '<20': 0, '20-29': 0, '30-39': 0, '40-49': 0, '50-59': 0, '60+': 0,
            };
            rawData.forEach((row) => {
              const ageStr = row[COLUMN_MAP.age]?.match(/\d+/);
              if (ageStr) {
                const age = parseInt(ageStr[0], 10);
                if (age < 20) ageGroups['<20']++;
                else if (age <= 29) ageGroups['20-29']++;
                else if (age <= 39) ageGroups['30-39']++;
                else if (age <= 49) ageGroups['40-49']++;
                else if (age <= 59) ageGroups['50-59']++;
                else ageGroups['60+']++;
              }
            });
            setAgeData(
              Object.entries(ageGroups).map(([name, value]) => ({ name, quantidade: value }))
            );

            const activismCounts = rawData.reduce((acc, row) => {
              const res = row[COLUMN_MAP.activism]?.trim().toLowerCase();
              if (res) {
                const key = res.charAt(0).toUpperCase() + res.slice(1);
                acc[key] = (acc[key] || 0) + 1;
              }
              return acc;
            }, {});
            setActivismData(
              Object.entries(activismCounts).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }))
            );

            const challenges = {
              Insegurança: [], Infra: [], Apoio: [], 'Carro': [], Topografia: [], Clima: [],
            };
            rawData.forEach((row) => {
              const collectChallengeData = (col, key) => {
                  const val = parseInt(row[col], 10);
                  if (!isNaN(val)) challenges[key].push(val);
              }
              collectChallengeData(COLUMN_MAP.challenge_insecurity, 'Insegurança');
              collectChallengeData(COLUMN_MAP.challenge_infra, 'Infra');
              collectChallengeData(COLUMN_MAP.challenge_support, 'Apoio');
              collectChallengeData(COLUMN_MAP.challenge_car_culture, 'Carro');
              collectChallengeData(COLUMN_MAP.challenge_topography, 'Topografia');
              collectChallengeData(COLUMN_MAP.challenge_climate, 'Clima');
            });
            setChallengesData(
              Object.entries(challenges).map(([name, values]) => ({
                name,
                avaliacaoMedia: values.length > 0 ? parseFloat((values.reduce((s, v) => s + v, 0) / values.length).toFixed(2)) : 0,
              }))
            );
            
            const insecurityCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            rawData.forEach((row) => {
              const rating = row[COLUMN_MAP.challenge_insecurity];
              if (rating && insecurityCounts.hasOwnProperty(rating)) {
                insecurityCounts[rating]++;
              }
            });
            setInsecurityDistributionData(
              Object.entries(insecurityCounts).map(([name, value]) => ({ name: `Nota ${name}`, quantidade: value }))
            );
          },
        });
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 md:pb-8 bg-gray-50 text-gray-800">
      <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center text-gray-900">
        Análise da Cultura da Pedalada
      </h1>
      <p className="text-center text-sm sm:text-lg text-gray-600 mb-8 md:mb-12">
        Resultados da pesquisa 'Pedal Cultural'
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-center">
            Frequência de Uso
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={frequencyData}
              layout="vertical"
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={isMobile ? 70 : 100}
                interval={0}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="quantidade" fill="#8884d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-center">
            Perfil de Idade
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis tick={{ fontSize: 10 }}/>
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="quantidade" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-center">
            Principais Desafios
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={challengesData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={isMobile ? 60 : 100}
                interval={0}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="avaliacaoMedia" fill="#FF8042" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-center">
            Pedalar é Ativismo?
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activismData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 80 : 100}
                fill="#8884d8"
                labelLine={false}
                label={!isMobile}
              >
                {activismData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: isMobile ? '11px' : '13px', lineHeight: '1.5' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg md:col-span-2">
          <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-4 text-center">
            Níveis de Insegurança
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={insecurityDistributionData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip wrapperStyle={{ fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: isMobile ? '11px' : '13px' }} />
              <Bar dataKey="quantidade" fill="#d9534f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
