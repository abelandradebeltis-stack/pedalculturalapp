
'use client';

import { motion } from 'framer-motion';

const questions = [
    "Além de ser um meio de transporte, a bicicleta assume outros significados na sua vida? Você se identifica com a ideia de fazer parte de uma 'tribo urbana' ou de um movimento cultural específico por ser ciclista?",
    "Como você percebe o conflito cultural no espaço viário? Na sua experiência, a relação entre ciclistas, motoristas e pedestres é marcada mais pela disputa ou pela possibilidade de coexistência pacífica?",
    "Na sua opinião, o ato de pedalar é uma forma de ativismo ambiental no contexto urbano? De que maneira o uso da bicicleta pode desafiar a lógica dominante do consumo de combustíveis fósseis e do individualismo?",
    "A 'sustentabilidade' para o ciclista urbano vai além da emissão zero de poluentes? Que outros elementos (como saúde, economia pessoal e qualidade de vida) se conectam a essa ideia de vida sustentável na cidade?",
    "A sensação de insegurança no trânsito é o maior impeditivo para o uso da bicicleta? Ou fatores como a falta de infraestrutura de apoio (vestiários, bicicletários seguros) e a cultura do automóvel têm peso igual ou maior?",
    "Como a presença de mais ciclistas nas ruas influencia a sua própria sensação de segurança? Você acredita que há um 'ponto de virada' cultural em que a bicicleta deixa de ser vista como um modal de risco para se tornar uma parte natural e respeitada do trânsito?",
    "Na sua avaliação, as atuais políticas de mobilidade urbana na nossa cidade tratam a bicicleta como um modal de lazer ou de transporte? O que essa distinção representa em termos de efetividade e inclusão social?",
    "A bicicleta pode ser entendida como uma ferramenta de 'desaceleração' e reapropriação do tempo e do espaço urbano? Como essa experiência contrasta com a lógica de velocidade e eficiência máxima do transporte motorizado?",
    "Como a promoção do uso da bicicleta se conecta com outras pautas urbanistas, como a luta por mais áreas verdes, comércio local e contra a especulação imobiliária? Você vê a mobilidade ativa como parte de um projeto maior de cidade?",
    "A sensação de segurança para pedalar é a mesma para todos? Como fatores como gênero, idade ou etnia influenciam na experiência e na percepção de vulnerabilidade no espaço viário?"
];

export const CulturalMatter = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Matéria Cultural: Reflexões sobre a Bicicleta</h3>
            <div className="space-y-6">
                {questions.map((question, index) => (
                    <motion.div 
                        key={index} 
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <p className="text-gray-700 dark:text-gray-200 italic">{question}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
