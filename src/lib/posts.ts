
export interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "onu-decada-acao",
    title: "A Década de Ação da ONU",
    description: "Saiba mais sobre os Objetivos de Desenvolvimento Sustentável e o que pode fazer para ajudar.",
    content: `
      <h2 class="text-2xl font-bold mb-4">Compreender a Década de Ação</h2>
      <p class="mb-4">A Década de Ação apela à aceleração de soluções sustentáveis para os maiores desafios do mundo, desde a pobreza e o género à alterações climáticas e à desigualdade. Os Objetivos de Desenvolvimento Sustentável (ODS) são o roteiro para um futuro melhor para todos.</p>
      <img src="/images/ods.png" alt="Objetivos de Desenvolvimento Sustentável" class="rounded-lg my-6" />
      <h3 class="text-xl font-bold mb-2">O que pode fazer</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Reduzir o seu consumo de plástico de utilização única.</li>
        <li>Apoiar empresas locais e sustentáveis.</li>
        <li>Educar-se e sensibilizar os outros sobre os ODS.</li>
        <li>Participar em limpezas comunitárias e outros eventos locais.</li>
      </ul>
    `,
  },
  {
    slug: "reducao-pegada-carbono",
    title: "Como Reduzir a sua Pegada de Carbono",
    description: "Dicas práticas para reduzir o seu impacto no ambiente.",
    content: `
      <h2 class="text-2xl font-bold mb-4">Passos para um Menor Impacto</h2>
      <p class="mb-4">Reduzir a sua pegada de carbono é uma das formas mais eficazes de combater as alterações climáticas. Pequenas mudanças no seu dia a dia podem fazer uma grande diferença.</p>
      <h3 class="text-xl font-bold mb-2">Dicas de Estilo de Vida</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><span class="font-semibold">Transporte:</span> Opte por andar a pé, de bicicleta ou de transportes públicos sempre que possível.</li>
        <li><span class="font-semibold">Dieta:</span> Reduza o consumo de carne, especialmente de carne vermelha.</li>
        <li><span class="font-semibold">Energia:</span> Mude para um fornecedor de energia renovável e use aparelhos energeticamente eficientes.</li>
        <li><span class="font-semibold">Consumo:</span> Compre menos, escolha produtos em segunda mão e apoie marcas sustentáveis.</li>
      </ul>
    `,
  },
  {
    slug: "economia-circular",
    title: "Os Princípios da Economia Circular",
    description: "Descubra como a economia circular está a remodelar o nosso futuro.",
    content: `
      <h2 class="text-2xl font-bold mb-4">Para Além do Reciclar</h2>
      <p class="mb-4">A economia circular é um modelo de produção e consumo que envolve a partilha, o aluguer, a reutilização, a reparação, a renovação e a reciclagem de materiais e produtos existentes durante o maior tempo possível. Na prática, implica reduzir o desperdício ao mínimo.</p>
      <h3 class="text-xl font-bold mb-2">Princípios Fundamentais</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Eliminar o desperdício e a poluição desde o início.</li>
        <li>Manter os produtos e materiais em uso.</li>
        <li>Regenerar os sistemas naturais.</li>
      </ul>
    `,
  },
  {
    slug: "energias-renovaveis",
    title: "O Futuro é das Energias Renováveis",
    description: "Explore o potencial da energia solar, eólica e de outras fontes de energia limpa.",
    content: `
      <h2 class="text-2xl font-bold mb-4">Potenciar um Planeta Mais Limpo</h2>
      <p class="mb-4">As energias renováveis são fontes de energia limpa que estão disponíveis em abundância na natureza. A transição para energias renováveis é crucial para combater as alterações climáticas e reduzir a nossa dependência dos combustíveis fósseis.</p>
      <h3 class="text-xl font-bold mb-2">Fontes de Energia Limpa</h3>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><span class="font-semibold">Energia Solar:</span> Aproveitar a luz solar para gerar eletricidade.</li>
        <li><span class="font-semibold">Energia Eólica:</span> Utilizar a força do vento para mover turbinas.</li>
        <li><span class="font-semibold">Energia Hídrica:</span> Gerar energia a partir do movimento da água.</li>
        <li><span class="font-semibold">Energia Geotérmica:</span> Utilizar o calor do interior da Terra.</li>
      </ul>
    `,
  },
];

export const getPostBySlug = (slug: string) => {
  return posts.find(post => post.slug === slug);
};
