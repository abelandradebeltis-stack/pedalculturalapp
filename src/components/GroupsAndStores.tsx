
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
      className="bg-white dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Grupos e Lojas na Vila Leopoldina</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((group, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-xl font-bold text-green-600 dark:text-green-400">{group.name}</h4>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{group.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center p-6 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Como encontrar mais pedais?</h4>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">Procure por grupos no Instagram e Facebook, como o &quot;Pedal noturno toda terça-feira&quot;. As lojas e oficinas da região, como a do &quot;Madruga&quot;, também são ótimas fontes de informação!</p>
        </div>
      </div>
    </motion.div>
  );
};
