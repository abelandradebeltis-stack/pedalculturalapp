'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, orderBy } from 'firebase/firestore';

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

const answerOptions = ["Concordo", "Não concordo", "Nem concordo nem discordo"];

interface ApprovedComment {
    id: string;
    comment: string;
}

const QuestionCard = ({ question }: { question: string }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [customComment, setCustomComment] = useState('');
    const [approvedComments, setApprovedComments] = useState<ApprovedComment[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const answersCollection = collection(db, 'respostas_culturais');
        const q = query(
            answersCollection,
            where('question', '==', question),
            where('status', '==', 'approved'),
            orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsData: ApprovedComment[] = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().comment) {
                    commentsData.push({ id: doc.id, comment: doc.data().comment });
                }
            });
            setApprovedComments(commentsData);
        });

        return () => unsubscribe();
    }, [question]);

    const handleSendResponse = async () => {
        if (!selectedOption || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'respostas_culturais'), {
                question: question,
                option: selectedOption,
                comment: customComment,
                status: customComment.trim() !== '' ? 'pending' : 'approved',
                timestamp: serverTimestamp()
            });
            
            setSelectedOption(null);
            setCustomComment('');
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error("Erro ao adicionar resposta: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-gray-700 dark:text-gray-200 italic mb-4 text-base md:text-lg">{question}</p>
            
            {submitted ? (
                <div className="text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
                    Obrigado pela sua contribuição!
                </div>
            ) : (
                <div>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {answerOptions.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setSelectedOption(option)}
                                className={`px-4 py-2 text-sm rounded-full transition-colors ${selectedOption === option ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                                {option}
                            </button>
                        ))}
                    </div>

                    {selectedOption && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                            <textarea
                                value={customComment}
                                onChange={(e) => setCustomComment(e.target.value)}
                                placeholder="Deseja adicionar um comentário? (opcional)"
                                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none mt-2"
                                rows={3}
                                disabled={isSubmitting}
                            />
                             <button
                                type="button"
                                onClick={handleSendResponse}
                                className="w-full mt-3 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:bg-gray-400 shadow-md hover:shadow-lg transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Resposta'}
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

            {approvedComments.length > 0 && (
                <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
                    <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-3">Comentários da Comunidade:</h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {approvedComments.map((item) => (
                            <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md text-gray-600 dark:text-gray-400 text-sm italic">
                                &quot;{item.comment}&quot;
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export const CulturalMatter = () => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Matéria Cultural: Reflexões sobre a Bicicleta</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
                        Este é um espaço para diálogo. Escolha uma das opções e, se desejar, compartilhe um comentário. Suas respostas anônimas ajudam a construir um panorama sobre a cultura da bicicleta em nossa cidade.
                    </p>
                </div>
                <div className="space-y-8">
                    {questions.map((question, index) => (
                        <QuestionCard key={index} question={question} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
