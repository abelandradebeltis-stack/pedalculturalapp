
'use client';

import { motion } from 'framer-motion';

const groups = [
  {
    name: "Pedal da Vila",
    description: "Uma loja e bicicletaria na Vila Leopoldina que organiza pedais semanais para diversos públicos.",
  },
  {
    name: "Bikeweb",
    description: "Localizada na Av. Imperatriz Leopoldina, 1287, esta loja participa de um pedal noturno toda terça-feira e oferece serviços de bike fit.",
  },
  {
    name: "Bike Leopoldina",
    description: "Além da venda de produtos, esta loja organiza grupos de pedal em dias específicos.",
  },
  {
    name: "Pedal De Boinha",
    description: "Grupo organizado através de redes sociais para pedais em São Paulo.",
  },
];

export const GroupsAndStores = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grupos e Lojas na Vila Leopoldina</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((group, index) => (
          <motion.div 
            key={index} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <h4 className="text-xl font-bold text-green-600 dark:text-green-400">{group.name}</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{group.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Como encontrar mais pedais?</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Procure por grupos no Instagram e Facebook, como o &quot;Pedal noturno toda terça-feira&quot;. As lojas e oficinas da região, como a do &quot;Madruga&quot;, também são ótimas fontes de informação!</p>
      </div>
    </motion.div>
  );
};
