
'use client';

import { BrainCircuit, MessageSquare, BookOpen } from "lucide-react";
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-12 h-12 text-green-600 dark:text-green-400" />,
      title: "Pergunte",
      description: "Faça qualquer pergunta sobre sustentabilidade, desde reciclagem a energias renováveis.",
    },
    {
      icon: <BrainCircuit className="w-12 h-12 text-green-600 dark:text-green-400" />,
      title: "Aprenda",
      description: "Receba respostas claras e personalizadas da nossa IA, baseadas em conhecimentos atualizados.",
    },
    {
      icon: <BookOpen className="w-12 h-12 text-green-600 dark:text-green-400" />,
      title: "Aja",
      description: "Utilize as nossas dicas e recursos para tomar ações concretas e positivas no seu dia a dia.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  return (
    <motion.section 
      className="py-20 px-4 bg-gray-50 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Como Funciona</h2>
      <div className="container mx-auto grid md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            variants={cardVariants}
            custom={index}
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;
