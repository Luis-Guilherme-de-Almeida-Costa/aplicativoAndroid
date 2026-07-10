import { useState } from 'react';
import { ChevronLeft, Play, BookOpen, Clock, Users, Star, ChevronRight, Lock, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import type { NavProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

type Level = 'Iniciante' | 'Intermediário' | 'Avançado';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string | null; // Substitua null por uma URL do YouTube embed para ativar
}

// ─────────────────────────────────────────────────────────────────────────────
// ESTRUTURA DE EXERCÍCIOS — EDITE AQUI PARA ADICIONAR/ALTERAR QUESTÕES
// Cada questão possui:
//   question     → texto da pergunta
//   options      → array com exatamente 4 alternativas (índices 0, 1, 2, 3)
//   correctAnswer → índice da alternativa correta (0 = A, 1 = B, 2 = C, 3 = D)
//   explanation  → explicação exibida quando o aluno erra
// ─────────────────────────────────────────────────────────────────────────────

interface Exercise {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
}

interface Subject {
  id: number;
  name: string;
  code: string;
  description: string;
  level: Level;
  area: string;
  hours: number;
  students: number;
  rating: number;
  icon: string;
  color: string;
  bg: string;
  topics: string[];
  lessons: Lesson[];
  exercises: Exercise[]; // ← adicione ou edite os exercícios de cada matéria aqui
}

// ─────────────────────────────────────────────────────────────────────────────
// DADOS DAS DISCIPLINAS
// Para adicionar exercícios: edite o array `exercises` de cada subject abaixo.
// ─────────────────────────────────────────────────────────────────────────────

const subjects: Subject[] = [
  {
    id: 1,
    name: 'Cálculo 1',
    code: 'MAT0025',
    description: 'Fundamentos do cálculo diferencial e integral de funções reais de uma variável. Abrange limites, continuidade, derivadas e integrais, com aplicações em problemas físicos e de engenharia.',
    level: 'Iniciante',
    area: 'Matemática',
    hours: 90,
    students: 1240,
    rating: 4.3,
    icon: '∫',
    color: '#1d4ed8',
    bg: '#eff6ff',
    topics: ['Limites e Continuidade', 'Derivadas', 'Regras de Derivação', 'Integrais', 'Teorema Fundamental'],
    lessons: [
      { id: 1, title: 'Introdução ao Cálculo e Limites',       duration: '42min', videoUrl: 'https://www.youtube.com/embed/sjssQaCNnYg' },
      { id: 2, title: 'Continuidade de Funções',               duration: '38min', videoUrl: 'https://www.youtube.com/embed/iiOrtGZVqnk' },
      { id: 3, title: 'Derivadas — Conceito e Notação',        duration: '51min', videoUrl: 'https://www.youtube.com/embed/cWBEMN75IMc' },
      { id: 4, title: 'Regra da Cadeia e Derivação Implícita', duration: '47min', videoUrl: 'https://www.youtube.com/embed/vmOuU7Fz0cg' },
      { id: 5, title: 'Integral Definida e Área',              duration: '55min', videoUrl: 'https://www.youtube.com/embed/wv23YefHGJA' },
    ],
    // ── EXERCÍCIOS — CÁLCULO 1 ──────────────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'Qual é o limite de f(x) = (x² - 1) / (x - 1) quando x tende a 1?',
        options: ['0', '1', '2', 'Indefinido'],
        correctAnswer: 2,
        explanation: 'Fatorando: (x²-1)/(x-1) = (x+1)(x-1)/(x-1) = x+1. Quando x→1, o resultado é 1+1 = 2.',
      },
      {
        id: 2,
        question: 'A derivada de f(x) = x³ + 2x² - 5 é:',
        options: ['3x² + 4x', '3x² + 4x - 5', 'x² + 4x', '3x + 4'],
        correctAnswer: 0,
        explanation: 'Aplicando a regra da potência: d/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5) = 0. Logo, f\'(x) = 3x² + 4x.',
      },
      {
        id: 3,
        question: 'A integral de ∫ 3x² dx é:',
        options: ['6x + C', 'x³ + C', '3x³ + C', 'x² + C'],
        correctAnswer: 1,
        explanation: 'Pela regra da potência para integrais: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. Logo ∫ 3x² dx = 3·x³/3 + C = x³ + C.',
      },
      {
        id: 4,
        question: 'Uma função f é contínua em x = a se e somente se:',
        options: [
          'f(a) existe',
          'lim(x→a) f(x) existe',
          'f(a) existe, lim(x→a) f(x) existe e são iguais',
          'f\'(a) existe',
        ],
        correctAnswer: 2,
        explanation: 'Continuidade exige três condições simultaneamente: f(a) definido, limite existindo e ambos iguais.',
      },
      {
        id: 5,
        question: 'Pelo Teorema Fundamental do Cálculo, d/dx [∫₀ˣ f(t) dt] é igual a:',
        options: ['∫₀ˣ f\'(t) dt', 'F(x) - F(0)', 'f(x)', 'f\'(x)'],
        correctAnswer: 2,
        explanation: 'O TFC afirma que a derivada de uma integral com limite superior variável é simplesmente o integrando avaliado no limite: d/dx[∫₀ˣ f(t) dt] = f(x).',
      },
    ],
  },
  {
    id: 2,
    name: 'Cálculo 2',
    code: 'MAT0026',
    description: 'Extensão do Cálculo 1 para funções de várias variáveis. Estudo de derivadas parciais, integrais múltiplas, séries de Taylor e equações diferenciais ordinárias elementares.',
    level: 'Intermediário',
    area: 'Matemática',
    hours: 90,
    students: 980,
    rating: 4.1,
    icon: '∂',
    color: '#7c3aed',
    bg: '#f5f3ff',
    topics: ['Funções de Várias Variáveis', 'Derivadas Parciais', 'Integrais Duplas', 'Séries', 'EDO'],
    lessons: [
      { id: 1, title: 'Funções de Várias Variáveis',          duration: '44min', videoUrl: 'https://www.youtube.com/embed/LmmPho49tDc' },
      { id: 2, title: 'Derivadas Parciais e Gradiente',       duration: '49min', videoUrl: 'https://www.youtube.com/embed/eWzGNlFic4I' },
      { id: 3, title: 'Máximos e Mínimos Locais',             duration: '41min', videoUrl: 'https://www.youtube.com/embed/dDwWaoJlSlA' },
      { id: 4, title: 'Integrais Duplas — Método de Fubini',  duration: '58min', videoUrl: 'https://www.youtube.com/embed/nLdwgvvsvd8' },
      { id: 5, title: 'Introdução às EDOs',                   duration: '52min', videoUrl: 'https://www.youtube.com/embed/wYLJBsaHHqY' },
    ],
    // ── EXERCÍCIOS — CÁLCULO 2 ──────────────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'Dada f(x, y) = x²y + y³, qual é ∂f/∂x?',
        options: ['2xy + 3y²', '2xy', 'x² + 3y²', '2x + y'],
        correctAnswer: 1,
        explanation: 'Ao derivar em relação a x, tratamos y como constante. d/dx(x²y) = 2xy e d/dx(y³) = 0. Logo ∂f/∂x = 2xy.',
      },
      {
        id: 2,
        question: 'O gradiente de f(x,y) = x² + y² aponta sempre em qual direção?',
        options: ['Para o mínimo local', 'Perpendicular à curva de nível', 'Paralelo ao eixo x', 'Para a origem'],
        correctAnswer: 1,
        explanation: 'O gradiente é sempre perpendicular (normal) às curvas de nível da função, apontando na direção de maior crescimento.',
      },
      {
        id: 3,
        question: 'Uma EDO de primeira ordem separável dy/dx = g(x)·h(y) é resolvida por:',
        options: ['Integrar ambos os lados em x', 'Separar dy/h(y) = g(x)dx e integrar', 'Substituição y = vx', 'Fator integrante'],
        correctAnswer: 1,
        explanation: 'Nas EDOs separáveis, reorganizamos para dy/h(y) = g(x)dx e integramos cada lado independentemente.',
      },
      {
        id: 4,
        question: '∬_R dA sobre a região R = [0,2]×[0,3] é igual a:',
        options: ['5', '6', '8', '12'],
        correctAnswer: 1,
        explanation: '∬_R dA representa a área da região R. Para um retângulo de lados 2 e 3, a área é 2×3 = 6.',
      },
      {
        id: 5,
        question: 'A série de Taylor de eˣ em torno de x=0 começa com:',
        options: ['1 + x + x²/2! + ...', 'x + x³/3! + ...', '1 + x² + x⁴ + ...', '1 - x + x²/2! - ...'],
        correctAnswer: 0,
        explanation: 'A série de Taylor de eˣ = Σ xⁿ/n! = 1 + x + x²/2! + x³/3! + ... com raio de convergência infinito.',
      },
    ],
  },
  {
    id: 3,
    name: 'Física 1',
    code: 'FIS0110',
    description: 'Mecânica clássica newtoniana: cinemática, dinâmica, trabalho e energia, impulso e momento linear. Base fundamental para engenharia mecânica, elétrica e civil.',
    level: 'Iniciante',
    area: 'Física',
    hours: 75,
    students: 1380,
    rating: 4.0,
    icon: 'F',
    color: '#0891b2',
    bg: '#ecfeff',
    topics: ['Cinemática', 'Leis de Newton', 'Trabalho e Energia', 'Momento Linear', 'Colisões'],
    lessons: [
      { id: 1, title: 'Grandezas Físicas e Vetores',  duration: '36min', videoUrl: 'https://www.youtube.com/embed/MLEZI03kUkE' },
      { id: 2, title: 'Cinemática — MRU e MRUV',      duration: '43min', videoUrl: 'https://www.youtube.com/embed/C93tQjswQgU' },
      { id: 3, title: 'Segunda Lei de Newton',         duration: '50min', videoUrl: 'https://www.youtube.com/embed/OgTVFIykPEI' },
      { id: 4, title: 'Trabalho, Potência e Energia', duration: '48min', videoUrl: 'https://www.youtube.com/embed/3ESkxyY9qio' },
      { id: 5, title: 'Colisões e Conservação',       duration: '45min', videoUrl: 'https://www.youtube.com/embed/s9odquXGzuQ' },
    ],
    // ── EXERCÍCIOS — FÍSICA 1 ───────────────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'Um objeto parte do repouso com aceleração constante de 4 m/s². Qual sua velocidade após 5 segundos?',
        options: ['10 m/s', '16 m/s', '20 m/s', '25 m/s'],
        correctAnswer: 2,
        explanation: 'Pelo MRUV: v = v₀ + at = 0 + 4×5 = 20 m/s.',
      },
      {
        id: 2,
        question: 'A Segunda Lei de Newton afirma que a força resultante é:',
        options: ['F = mv', 'F = ma', 'F = m/a', 'F = mv²'],
        correctAnswer: 1,
        explanation: 'A Segunda Lei de Newton: F = ma, onde F é a força resultante, m a massa e a a aceleração do corpo.',
      },
      {
        id: 3,
        question: 'O trabalho realizado por uma força de 10 N ao deslocar um objeto 3 m na direção da força é:',
        options: ['3 J', '10 J', '30 J', '13 J'],
        correctAnswer: 2,
        explanation: 'W = F·d·cos(θ). Como a força é paralela ao deslocamento (θ=0°): W = 10×3×1 = 30 J.',
      },
      {
        id: 4,
        question: 'Em uma colisão perfeitamente elástica entre dois corpos, o que se conserva?',
        options: ['Apenas quantidade de movimento', 'Apenas energia cinética', 'Quantidade de movimento e energia cinética', 'Nenhuma das anteriores'],
        correctAnswer: 2,
        explanation: 'Em colisões perfeitamente elásticas, tanto a quantidade de movimento (momento linear) quanto a energia cinética são conservadas.',
      },
      {
        id: 5,
        question: 'A unidade do Impulso (J = F·Δt) no SI é equivalente a:',
        options: ['kg·m/s²', 'N·m', 'kg·m/s', 'J/s'],
        correctAnswer: 2,
        explanation: 'Impulso = F·Δt = [N]·[s] = [kg·m/s²]·[s] = kg·m/s, que é a mesma unidade da quantidade de movimento.',
      },
    ],
  },
  {
    id: 4,
    name: 'Algoritmos e Programação',
    code: 'CIC0004',
    description: 'Introdução ao pensamento algorítmico e programação estruturada em C. Aborda variáveis, condicionais, laços, funções, vetores e ponteiros. Pré-requisito para Estruturas de Dados.',
    level: 'Iniciante',
    area: 'Computação',
    hours: 60,
    students: 1560,
    rating: 4.5,
    icon: '{ }',
    color: '#16a34a',
    bg: '#f0fdf4',
    topics: ['Variáveis e Tipos', 'Estruturas Condicionais', 'Laços de Repetição', 'Funções', 'Ponteiros'],
    lessons: [
      { id: 1, title: 'Lógica de Programação — Introdução', duration: '40min', videoUrl: null },
      { id: 2, title: 'Variáveis, Tipos e Operadores',       duration: '38min', videoUrl: null },
      { id: 3, title: 'If-Else e Switch-Case',               duration: '35min', videoUrl: null },
      { id: 4, title: 'For, While e Do-While',               duration: '42min', videoUrl: null },
      { id: 5, title: 'Funções e Recursividade',             duration: '54min', videoUrl: null },
    ],
    // ── EXERCÍCIOS — ALGORITMOS ─────────────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'Em C, qual o valor de x após: int x = 10; x = x % 3;',
        options: ['0', '1', '3', '10'],
        correctAnswer: 1,
        explanation: '% é o operador de módulo (resto da divisão). 10 dividido por 3 = 3 com resto 1. Portanto x = 1.',
      },
      {
        id: 2,
        question: 'Quantas vezes o bloco abaixo é executado?\nfor(int i=0; i<5; i++) { ... }',
        options: ['4', '5', '6', 'Infinito'],
        correctAnswer: 1,
        explanation: 'O laço começa em i=0 e executa enquanto i<5 (i=0,1,2,3,4), logo 5 iterações no total.',
      },
      {
        id: 3,
        question: 'Em C, o que um ponteiro armazena?',
        options: ['O valor de uma variável', 'O endereço de memória de uma variável', 'O tamanho de um vetor', 'O tipo de dado de uma variável'],
        correctAnswer: 1,
        explanation: 'Um ponteiro é uma variável especial que armazena o endereço de memória de outra variável, não seu valor diretamente.',
      },
      {
        id: 4,
        question: 'Qual estrutura condicional é mais adequada para testar muitos valores distintos de uma variável inteira?',
        options: ['if-else aninhado', 'while', 'switch-case', 'do-while'],
        correctAnswer: 2,
        explanation: 'O switch-case é projetado para comparar uma variável com múltiplos valores constantes de forma eficiente e legível.',
      },
      {
        id: 5,
        question: 'Uma função recursiva SEMPRE precisa de:',
        options: ['Um laço for interno', 'Um caso base para parar a recursão', 'Variáveis globais', 'Dois parâmetros'],
        correctAnswer: 1,
        explanation: 'Sem um caso base, a função se chamaria infinitamente, causando estouro de pilha (stack overflow). O caso base é essencial.',
      },
    ],
  },
  {
    id: 5,
    name: 'Álgebra Linear',
    code: 'MAT0031',
    description: 'Estudo de espaços vetoriais, transformações lineares, matrizes, sistemas de equações lineares e autovalores. Ferramenta essencial para computação gráfica, IA e engenharia.',
    level: 'Intermediário',
    area: 'Matemática',
    hours: 75,
    students: 820,
    rating: 4.2,
    icon: '[A]',
    color: '#b45309',
    bg: '#fef3c7',
    topics: ['Sistemas Lineares', 'Matrizes', 'Determinantes', 'Espaços Vetoriais', 'Autovalores'],
    lessons: [
      { id: 1, title: 'Sistemas de Equações Lineares', duration: '46min', videoUrl: null },
      { id: 2, title: 'Operações com Matrizes',        duration: '40min', videoUrl: null },
      { id: 3, title: 'Determinantes e Inversa',       duration: '44min', videoUrl: null },
      { id: 4, title: 'Espaço Nulo e Imagem',          duration: '49min', videoUrl: null },
      { id: 5, title: 'Autovalores e Autovetores',     duration: '56min', videoUrl: null },
    ],
    // ── EXERCÍCIOS — ÁLGEBRA LINEAR ─────────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'O determinante da matriz identidade 3×3 é:',
        options: ['0', '3', '1', '-1'],
        correctAnswer: 2,
        explanation: 'A matriz identidade tem 1 na diagonal principal e 0 nos demais elementos. Seu determinante é sempre 1.',
      },
      {
        id: 2,
        question: 'Se Av = λv, então v é chamado de:',
        options: ['Vetor nulo', 'Autovetor de A associado ao autovalor λ', 'Vetor coluna de A', 'Transposta de A'],
        correctAnswer: 1,
        explanation: 'A equação Av = λv define v como autovetor da matriz A e λ como o autovalor correspondente.',
      },
      {
        id: 3,
        question: 'Um sistema Ax = b tem infinitas soluções quando:',
        options: ['det(A) ≠ 0', 'det(A) = 0 e b = 0', 'det(A) = 0 e o sistema é compatível', 'A é invertível'],
        correctAnswer: 2,
        explanation: 'Infinitas soluções ocorrem quando o sistema é indeterminado: det(A) = 0 (A singular) e o sistema possui ao menos uma solução.',
      },
      {
        id: 4,
        question: 'O produto de duas matrizes A (m×n) e B (n×p) resulta em uma matriz de dimensão:',
        options: ['m×p', 'n×n', 'm×n', 'p×m'],
        correctAnswer: 0,
        explanation: 'Para o produto AB ser definido, o nº de colunas de A deve igualar o nº de linhas de B. O resultado tem dimensão m×p.',
      },
      {
        id: 5,
        question: 'Vetores linearmente independentes são aqueles em que:',
        options: ['Nenhum é múltiplo dos outros', 'A combinação linear nula só ocorre com coeficientes todos zero', 'Formam ângulo de 90°', 'Possuem o mesmo módulo'],
        correctAnswer: 1,
        explanation: 'A definição formal de independência linear: c₁v₁+...+cₙvₙ=0 implica c₁=...=cₙ=0. Ser múltiplo é um caso especial (n=2).',
      },
    ],
  },
  {
    id: 6,
    name: 'Estruturas de Dados',
    code: 'CIC0004',
    description: 'Análise e implementação de estruturas de dados fundamentais: listas, pilhas, filas, árvores e grafos. Complexidade de algoritmos com notação Big-O. Pré-requisito para Algoritmos.',
    level: 'Avançado',
    area: 'Computação',
    hours: 90,
    students: 740,
    rating: 4.6,
    icon: '🌲',
    color: '#dc2626',
    bg: '#fef2f2',
    topics: ['Listas Encadeadas', 'Pilhas e Filas', 'Árvores Binárias', 'Grafos', 'Complexidade'],
    lessons: [
      { id: 1, title: 'Revisão de Ponteiros em C',       duration: '38min', videoUrl: null },
      { id: 2, title: 'Listas Simplesmente Encadeadas',  duration: '52min', videoUrl: null },
      { id: 3, title: 'Pilhas e Aplicações',             duration: '43min', videoUrl: null },
      { id: 4, title: 'Árvores Binárias de Busca',       duration: '60min', videoUrl: null },
      { id: 5, title: 'Grafos — BFS e DFS',              duration: '65min', videoUrl: null },
    ],
    // ── EXERCÍCIOS — ESTRUTURAS DE DADOS ────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'Qual estrutura segue o princípio LIFO (Last In, First Out)?',
        options: ['Fila', 'Lista encadeada', 'Pilha', 'Deque'],
        correctAnswer: 2,
        explanation: 'Pilha (Stack) segue LIFO: o último elemento inserido é o primeiro a ser removido. Fila segue FIFO.',
      },
      {
        id: 2,
        question: 'A complexidade de busca em uma Árvore Binária de Busca balanceada é:',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Em uma ABB balanceada com n nós, a busca percorre no máximo a altura da árvore ≈ log₂(n), logo O(log n).',
      },
      {
        id: 3,
        question: 'O algoritmo BFS (Breadth-First Search) usa internamente qual estrutura?',
        options: ['Pilha', 'Árvore', 'Fila', 'Lista de prioridade'],
        correctAnswer: 2,
        explanation: 'BFS explora nível por nível e utiliza uma Fila (FIFO) para guardar os vértices a visitar. DFS usa Pilha.',
      },
      {
        id: 4,
        question: 'Em uma lista encadeada simples, qual operação tem complexidade O(1)?',
        options: ['Busca por valor', 'Inserção no início', 'Acesso pelo índice k', 'Remoção do último'],
        correctAnswer: 1,
        explanation: 'Inserir no início é O(1): cria-se o novo nó e ajusta-se apenas o ponteiro head. Demais operações podem ser O(n).',
      },
      {
        id: 5,
        question: 'O(n²) descreve a complexidade do pior caso de qual algoritmo de ordenação?',
        options: ['Merge Sort', 'Quick Sort (pior caso)', 'Heap Sort', 'Counting Sort'],
        correctAnswer: 1,
        explanation: 'Quick Sort tem pior caso O(n²) quando o pivô escolhido é sempre o maior ou menor elemento. Merge e Heap Sort são O(n log n) garantido.',
      },
    ],
  },
  {
    id: 7,
    name: 'Circuitos Elétricos',
    code: 'ENE0008',
    description: 'Análise de circuitos de corrente contínua e alternada. Lei de Ohm, Kirchhoff, Thévenin, Norton e resposta em frequência. Essencial para engenharia elétrica e mecatrônica.',
    level: 'Intermediário',
    area: 'Engenharia Elétrica',
    hours: 75,
    students: 610,
    rating: 3.9,
    icon: '⚡',
    color: '#d97706',
    bg: '#fffbeb',
    topics: ['Lei de Ohm', 'Kirchhoff', 'Thévenin e Norton', 'Capacitores', 'Fasores'],
    lessons: [
      { id: 1, title: 'Grandezas Elétricas Básicas', duration: '37min', videoUrl: null },
      { id: 2, title: 'Leis de Kirchhoff',            duration: '45min', videoUrl: null },
      { id: 3, title: 'Teorema de Thévenin',          duration: '48min', videoUrl: null },
      { id: 4, title: 'Capacitores e Indutores',      duration: '51min', videoUrl: null },
      { id: 5, title: 'Circuitos em CA e Fasores',    duration: '58min', videoUrl: null },
    ],
    // ── EXERCÍCIOS — CIRCUITOS ELÉTRICOS ────────────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'Um resistor de 10 Ω é conectado a uma fonte de 5 V. Qual a corrente?',
        options: ['0,2 A', '0,5 A', '2 A', '50 A'],
        correctAnswer: 1,
        explanation: 'Pela Lei de Ohm: I = V/R = 5/10 = 0,5 A.',
      },
      {
        id: 2,
        question: 'A Lei de Kirchhoff de Correntes (KCL) afirma que:',
        options: ['A tensão em um nó é zero', 'A soma das correntes que entram em um nó é igual à soma das que saem', 'A potência dissipada é sempre zero', 'A resistência total é a soma das partes'],
        correctAnswer: 1,
        explanation: 'KCL: a soma algébrica de todas as correntes em um nó é zero, ou seja, correntes que entram = correntes que saem (conservação de carga).',
      },
      {
        id: 3,
        question: 'Resistores em série têm resistência equivalente:',
        options: ['1/Req = 1/R1 + 1/R2', 'Req = R1 + R2', 'Req = R1 × R2', 'Req = R1 - R2'],
        correctAnswer: 1,
        explanation: 'Em série a corrente é a mesma em todos os elementos. A resistência equivalente é a soma: Req = R1 + R2 + ... + Rn.',
      },
      {
        id: 4,
        question: 'O Teorema de Thévenin substitui um circuito complexo por:',
        options: ['Uma fonte de corrente com resistor em paralelo', 'Uma fonte de tensão com resistor em série', 'Dois resistores em série', 'Uma fonte ideal'],
        correctAnswer: 1,
        explanation: 'Thévenin: qualquer circuito linear com fontes pode ser representado por Vth (tensão de circuito aberto) em série com Rth (resistência equivalente).',
      },
      {
        id: 5,
        question: 'A reatância capacitiva Xc é:',
        options: ['Xc = ωC', 'Xc = 1/(ωC)', 'Xc = ωL', 'Xc = C/ω'],
        correctAnswer: 1,
        explanation: 'Xc = 1/(ωC) = 1/(2πfC). Quanto maior a frequência ou a capacitância, menor a reatância capacitiva.',
      },
    ],
  },
  {
    id: 8,
    name: 'Resistência dos Materiais',
    code: 'ENM0025',
    description: 'Comportamento mecânico de sólidos sob cargas. Tensão, deformação, flexão, torção e flambagem. Crucial para dimensionamento de estruturas e componentes mecânicos.',
    level: 'Avançado',
    area: 'Engenharia Mecânica',
    hours: 90,
    students: 490,
    rating: 4.0,
    icon: '🔩',
    color: '#475569',
    bg: '#f8fafc',
    topics: ['Tensão e Deformação', 'Flexão Pura', 'Torção', 'Flambagem', 'Fadiga'],
    lessons: [
      { id: 1, title: 'Conceitos de Tensão Normal',  duration: '41min', videoUrl: null },
      { id: 2, title: 'Deformação e Lei de Hooke',   duration: '39min', videoUrl: null },
      { id: 3, title: 'Vigas sob Flexão',            duration: '53min', videoUrl: null },
      { id: 4, title: 'Torção em Eixos Circulares',  duration: '46min', videoUrl: null },
      { id: 5, title: 'Flambagem de Colunas',        duration: '50min', videoUrl: null },
    ],
    // ── EXERCÍCIOS — RESISTÊNCIA DOS MATERIAIS ──────────────────────────────
    exercises: [
      {
        id: 1,
        question: 'A tensão normal σ em uma barra sujeita a uma força axial F com seção transversal A é:',
        options: ['σ = F·A', 'σ = F/A', 'σ = A/F', 'σ = F²/A'],
        correctAnswer: 1,
        explanation: 'Tensão normal σ = F/A (força por unidade de área). Unidade no SI: Pa (Pascal) = N/m².',
      },
      {
        id: 2,
        question: 'A Lei de Hooke para materiais elásticos relaciona:',
        options: ['Força e aceleração', 'Tensão e deformação (σ = E·ε)', 'Pressão e volume', 'Temperatura e dilatação'],
        correctAnswer: 1,
        explanation: 'Lei de Hooke: σ = E·ε, onde E é o Módulo de Young (rigidez) e ε = ΔL/L₀ é a deformação específica.',
      },
      {
        id: 3,
        question: 'Em uma viga submetida à flexão pura, a tensão máxima ocorre:',
        options: ['No centroide da seção', 'Na linha neutra', 'Nas fibras mais distantes da linha neutra', 'No ponto de aplicação da carga'],
        correctAnswer: 2,
        explanation: 'σ = M·y/I, onde y é a distância à linha neutra. A tensão máxima ocorre nas fibras extremas (maior y), em compressão ou tração.',
      },
      {
        id: 4,
        question: 'Flambagem é um fenômeno associado principalmente a:',
        options: ['Barras tracionadas longas', 'Colunas esbeltas sob compressão axial', 'Vigas sob carga transversal', 'Eixos sob torção'],
        correctAnswer: 1,
        explanation: 'Flambagem (instabilidade de Euler) ocorre em colunas esbeltas comprimidas axialmente, quando a carga crítica Pcr = π²EI/L² é atingida.',
      },
      {
        id: 5,
        question: 'A tensão de cisalhamento máxima em um eixo circular sólido sob torque T com raio R é:',
        options: ['τ = T·R / J', 'τ = T / (R·J)', 'τ = J / (T·R)', 'τ = T·J / R'],
        correctAnswer: 0,
        explanation: 'τmax = T·R/J, onde J = πR⁴/2 é o momento polar de inércia. Quanto maior o raio, maior a tensão máxima para um mesmo torque.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const levelConfig: Record<Level, { bg: string; color: string }> = {
  'Iniciante':     { bg: '#dcfce7', color: '#16a34a' },
  'Intermediário': { bg: '#fef9c3', color: '#ca8a04' },
  'Avançado':      { bg: '#fef2f2', color: '#dc2626' },
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className="w-2.5 h-2.5"
          style={{ color: i <= Math.round(value) ? '#f59e0b' : '#e2e8f0', fill: i <= Math.round(value) ? '#f59e0b' : '#e2e8f0' }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO PLAYER
// Para ativar: troque videoUrl de null para uma URL de embed do YouTube
// Ex: "https://www.youtube.com/embed/sjssQaCNnYg"
// ─────────────────────────────────────────────────────────────────────────────

function VideoPlayer({ videoUrl, lessonTitle }: { videoUrl: string | null; lessonTitle: string }) {
  if (videoUrl) {
    return (
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        <iframe src={videoUrl} title={lessonTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px', border: 'none' }}
        />
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '14px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(255,0,0,0.5)' }}>
          <Play style={{ width: '20px', height: '20px', color: '#fff', marginLeft: '3px', fill: '#fff' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '500', textAlign: 'center', padding: '0 16px' }}>{lessonTitle}</p>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px' }}>
          Aula em breve — videoUrl não definido
        </span>
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '2px', height: '3px' }}>
          <div style={{ width: '0%', height: '3px', background: '#ff0000', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ — componente reutilizável
// ─────────────────────────────────────────────────────────────────────────────

function QuizSection({ exercises, accentColor, accentBg }: {
  exercises: Exercise[];
  accentColor: string;
  accentBg: string;
}) {
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [selected, setSelected]       = useState<number | null>(null);
  const [confirmed, setConfirmed]     = useState(false);
  const [score, setScore]             = useState(0);
  const [finished, setFinished]       = useState(false);

  const question = exercises[currentIdx];
  const total    = exercises.length;
  const isCorrect = confirmed && selected === question.correctAnswer;
  const isWrong   = confirmed && selected !== null && selected !== question.correctAnswer;

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === question.correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
  };

  // ── Results screen ────────────────────────────────────────────────────────
  if (finished) {
    const pct  = Math.round((score / total) * 100);
    const pass = pct >= 60;
    return (
      <div className="flex flex-col items-center p-6 gap-5">
        {/* Trophy */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '24px',
          background: pass ? '#f0fdf4' : '#fef2f2', border: `2px solid ${pass ? '#bbf7d0' : '#fecaca'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Trophy className="w-8 h-8" style={{ color: pass ? '#16a34a' : '#dc2626' }} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '22px', fontWeight: '800', color: pass ? '#15803d' : '#b91c1c' }}>
            {pass ? 'Parabéns!' : 'Continue praticando!'}
          </p>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>
            Você acertou <strong>{score}</strong> de <strong>{total}</strong> questões
          </p>
        </div>

        {/* Score ring */}
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="10" />
            <circle cx="50" cy="50" r="42" fill="none"
              stroke={pass ? '#16a34a' : '#dc2626'} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 42 * pct / 100} ${2 * Math.PI * 42 * (1 - pct / 100)}`}
              strokeDashoffset={2 * Math.PI * 42 * 0.25}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: pass ? '#16a34a' : '#dc2626' }}>{pct}%</span>
          </div>
        </div>

        {/* Per-question summary */}
        <div style={{ width: '100%', background: '#f8fafc', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          {exercises.map((ex, i) => {
            const correct = i < currentIdx + 1;
            return (
              <div key={ex.id} className="flex items-center gap-3" style={{ padding: '10px 14px', borderBottom: i < exercises.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b' }}>{i + 1}</span>
                </div>
                <p style={{ flex: 1, fontSize: '11px', color: '#475569', lineHeight: 1.4 }} className="text-left truncate">{ex.question}</p>
                <div style={{ flexShrink: 0 }}>
                  {correct
                    ? <CheckCircle className="w-4 h-4" style={{ color: '#16a34a' }} />
                    : <XCircle className="w-4 h-4" style={{ color: '#dc2626' }} />
                  }
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-2 w-full justify-center py-3 rounded-2xl"
          style={{ background: accentColor, color: '#fff', fontSize: '14px', fontWeight: '700' }}
        >
          <RotateCcw className="w-4 h-4" />
          Refazer exercícios
        </button>
        <div style={{ height: '8px' }} />
      </div>
    );
  }

  // ── Question screen ───────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4 p-4">

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>Pergunta {currentIdx + 1} de {total}</span>
          <span style={{ color: accentColor, fontSize: '11px', fontWeight: '700' }}>{score} acerto{score !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '5px' }}>
          <div style={{
            width: `${((currentIdx) / total) * 100}%`,
            height: '5px', borderRadius: '999px',
            background: accentColor,
            transition: 'width 0.4s ease',
          }} />
        </div>
        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-2 justify-center">
          {exercises.map((_, i) => (
            <div key={i} style={{
              width: i === currentIdx ? '16px' : '6px',
              height: '6px', borderRadius: '999px',
              background: i < currentIdx ? accentColor : i === currentIdx ? accentColor : '#e2e8f0',
              opacity: i < currentIdx ? 0.4 : 1,
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div style={{ background: accentBg, borderRadius: '20px', padding: '18px 16px', border: `1.5px solid ${accentColor}22` }}>
        <p style={{ color: accentColor, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Questão {currentIdx + 1}
        </p>
        <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: '600', lineHeight: 1.6 }}>
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => {
          let bg      = '#fff';
          let border  = '1.5px solid #e2e8f0';
          let textClr = '#0f172a';
          let labelBg = '#f1f5f9';
          let labelClr = '#64748b';

          if (!confirmed) {
            if (selected === i) {
              bg      = accentBg;
              border  = `2px solid ${accentColor}`;
              textClr = accentColor;
              labelBg = accentColor;
              labelClr = '#fff';
            }
          } else {
            if (i === question.correctAnswer) {
              bg      = '#f0fdf4';
              border  = '2px solid #16a34a';
              textClr = '#15803d';
              labelBg = '#16a34a';
              labelClr = '#fff';
            } else if (i === selected && selected !== question.correctAnswer) {
              bg      = '#fef2f2';
              border  = '2px solid #dc2626';
              textClr = '#b91c1c';
              labelBg = '#dc2626';
              labelClr = '#fff';
            }
          }

          return (
            <button
              key={i}
              disabled={confirmed}
              onClick={() => setSelected(i)}
              className="flex items-center gap-3 w-full rounded-2xl"
              style={{ background: bg, border, padding: '12px 14px', textAlign: 'left', transition: 'all 0.15s ease' }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '10px', flexShrink: 0,
                background: labelBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: labelClr }}>{OPTION_LABELS[i]}</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: selected === i && !confirmed ? '600' : '400', color: textClr, lineHeight: 1.4 }}>
                {opt}
              </span>
              {confirmed && i === question.correctAnswer && (
                <CheckCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#16a34a' }} />
              )}
              {confirmed && i === selected && selected !== question.correctAnswer && (
                <XCircle className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: '#dc2626' }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm button — shown before confirmation */}
      {!confirmed && (
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className="w-full py-3.5 rounded-2xl"
          style={{
            background: selected !== null ? accentColor : '#f1f5f9',
            color: selected !== null ? '#fff' : '#94a3b8',
            fontSize: '14px', fontWeight: '700',
            transition: 'all 0.2s ease',
          }}
        >
          {selected === null ? 'Selecione uma alternativa' : 'Confirmar resposta'}
        </button>
      )}

      {/* Feedback — shown after confirmation */}
      {confirmed && (
        <div style={{
          borderRadius: '16px', padding: '14px 16px',
          background: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: `1.5px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
        }}>
          <div className="flex items-center gap-2 mb-1.5">
            {isCorrect
              ? <CheckCircle className="w-4 h-4" style={{ color: '#16a34a', flexShrink: 0 }} />
              : <XCircle    className="w-4 h-4" style={{ color: '#dc2626', flexShrink: 0 }} />
            }
            <p style={{ fontSize: '13px', fontWeight: '800', color: isCorrect ? '#15803d' : '#b91c1c' }}>
              {isCorrect ? 'Correto!' : 'Errado!'}
            </p>
          </div>
          {isWrong && (
            <p style={{ color: '#475569', fontSize: '12px', lineHeight: 1.6 }}>
              {question.explanation}
            </p>
          )}
        </div>
      )}

      {/* Next button */}
      {confirmed && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2"
          style={{ background: accentColor, color: '#fff', fontSize: '14px', fontWeight: '700' }}
        >
          {currentIdx + 1 < total ? 'Próxima pergunta' : 'Ver resultado'}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      <div style={{ height: '8px' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL SCREEN
// ─────────────────────────────────────────────────────────────────────────────

type DetailTab = 'aulas' | 'exercicios';

function SubjectDetail({ subject, onBack }: { subject: Subject; onBack: () => void }) {
  const [activeLesson, setActiveLesson] = useState<Lesson>(subject.lessons[0]);
  const [tab, setTab]                   = useState<DetailTab>('aulas');
  const lc = levelConfig[subject.level];

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: subject.color, padding: '14px 16px 16px', flexShrink: 0 }}>
        <button onClick={onBack} className="flex items-center gap-1.5 mb-3"
          style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '600', paddingLeft: '30px' }}>
          <ChevronLeft className="w-4 h-4" />
          Cursos
        </button>
        <div className="flex items-start gap-3">
          <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>
            {subject.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '10px', fontWeight: '700' }}>{subject.area}</span>
              <span className="px-2 py-0.5 rounded-full" style={{ background: lc.bg, color: lc.color, fontSize: '10px', fontWeight: '700' }}>{subject.level}</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', lineHeight: 1.1 }}>{subject.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', marginTop: '2px' }}>{subject.code}</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0, display: 'flex' }}>
        {(['aulas', 'exercicios'] as DetailTab[]).map(t => {
          const active = tab === t;
          const label  = t === 'aulas' ? '  Aulas' : 'Exercícios';
          return (
            <button key={t} onClick={() => setTab(t)} className="flex-1 py-3"
              style={{
                fontSize: '13px', fontWeight: active ? '700' : '500',
                color: active ? subject.color : '#94a3b8',
                borderBottom: active ? `2.5px solid ${subject.color}` : '2.5px solid transparent',
                background: 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── AULAS TAB ── */}
        {tab === 'aulas' && (
          <>
            {/* Video zone */}
            <div style={{ background: '#0f172a', padding: '14px' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                 AULA ATUAL
              </p>
              <VideoPlayer videoUrl={activeLesson.videoUrl} lessonTitle={activeLesson.title} />
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: '700', marginTop: '10px' }}>{activeLesson.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginTop: '3px' }}>{subject.name} · {activeLesson.duration}</p>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* About */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Sobre a disciplina</p>
                <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.65 }}>{subject.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" style={{ color: '#94a3b8' }} /><span style={{ color: '#64748b', fontSize: '11px' }}>{subject.hours}h</span></div>
                  <div className="flex items-center gap-1.5"><Users className="w-3 h-3" style={{ color: '#94a3b8' }} /><span style={{ color: '#64748b', fontSize: '11px' }}>{subject.students.toLocaleString()}</span></div>
                  <div className="flex items-center gap-1.5"><StarRating value={subject.rating} /><span style={{ color: '#64748b', fontSize: '11px' }}>{subject.rating}</span></div>
                </div>
              </div>


              {/* Lessons list */}
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #f1f5f9' }}>
                  <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700' }}>Aulas ({subject.lessons.length})</p>
                </div>
                {subject.lessons.map((lesson, idx) => {
                  const isActive = lesson.id === activeLesson.id;
                  return (
                    <button key={lesson.id} onClick={() => setActiveLesson(lesson)}
                      className="w-full flex items-center gap-3"
                      style={{ padding: '12px 16px', borderBottom: idx < subject.lessons.length - 1 ? '1px solid #f8fafc' : 'none', background: isActive ? subject.bg : 'transparent', textAlign: 'left' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '10px', flexShrink: 0, background: isActive ? subject.color : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {lesson.videoUrl
                          ? <Play className="w-3.5 h-3.5" style={{ color: isActive ? '#fff' : '#64748b', fill: isActive ? '#fff' : '#64748b', marginLeft: '1px' }} />
                          : <Lock className="w-3 h-3" style={{ color: isActive ? '#fff' : '#94a3b8' }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ color: isActive ? subject.color : '#0f172a', fontSize: '12px', fontWeight: isActive ? '700' : '500' }}>{lesson.title}</p>
                        <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px' }}>{lesson.duration}</p>
                      </div>
                      {isActive && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: subject.color, flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>

              <div style={{ height: '8px' }} />
            </div>
          </>
        )}

        {/* ── EXERCÍCIOS TAB ── */}
        {tab === 'exercicios' && (
          <>
            {/* Banner */}
            <div style={{ background: subject.color, padding: '12px 16px' }}>
              <div className="flex items-center gap-2">
                <div>
                  <p style={{ color: '#fff', fontSize: '13px', fontWeight: '700' }}>Exercícios — {subject.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px' }}>{subject.exercises.length} questões de múltipla escolha</p>
                </div>
              </div>
            </div>

            <QuizSection
              exercises={subject.exercises}
              accentColor={subject.color}
              accentBg={subject.bg}
            />
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIST SCREEN
// ─────────────────────────────────────────────────────────────────────────────

const areaFilters = ['Todos', 'Matemática', 'Física', 'Computação', 'Engenharia Elétrica', 'Engenharia Mecânica'];

export default function Courses({ onNavigate }: NavProps) {
  const [selected, setSelected] = useState<Subject | null>(null);
  const [activeArea, setActiveArea] = useState('Todos');

  if (selected) {
    return <SubjectDetail subject={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = subjects.filter(s => activeArea === 'Todos' || s.area === activeArea);

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px', flexShrink: 0 }}>
        <div className="flex items-center gap-3 mb-1" style={{ paddingLeft: '44px' }}>
          <div>
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '20px' }}>Cursos de Engenharia</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Disciplinas com aulas e exercícios — UnB 2026/1</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {[
            { label: 'Disciplinas', count: subjects.length,                                                         color: '#60a5fa' },
            { label: 'Horas',       count: subjects.reduce((s, x) => s + x.hours, 0),                              color: '#34d399' },
            { label: 'Alunos',      count: `${(subjects.reduce((s, x) => s + x.students, 0) / 1000).toFixed(1)}k`, color: '#fbbf24' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p style={{ color, fontSize: '16px', fontWeight: '700' }}>{count}</p>
              <p style={{ color: '#93c5fd', fontSize: '10px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Area filter */}
      <div className="overflow-x-auto px-4 py-3" style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {areaFilters.map(area => (
            <button key={area} onClick={() => setActiveArea(area)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ background: activeArea === area ? '#1d4ed8' : '#f1f5f9', color: activeArea === area ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '600' }}>
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.map(subject => {
          const lc = levelConfig[subject.level];
          return (
            <button key={subject.id} onClick={() => setSelected(subject)}
              className="w-full text-left"
              style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start gap-3">
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: subject.bg, border: `1.5px solid ${subject.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: subject.color, flexShrink: 0, fontFamily: 'monospace' }}>
                  {subject.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full" style={{ background: lc.bg, color: lc.color, fontSize: '10px', fontWeight: '700' }}>{subject.level}</span>
                    <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '600' }}>{subject.area}</span>
                  </div>
                  <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px' }}>{subject.name}</p>
                  <p style={{ color: '#64748b', fontSize: '11px', marginTop: '1px' }}>{subject.code}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {subject.topics.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full" style={{ background: '#f1f5f9', color: '#475569', fontSize: '9px', fontWeight: '600' }}>{t}</span>
                    ))}
                    {subject.topics.length > 3 && <span style={{ color: '#94a3b8', fontSize: '9px', fontWeight: '600', padding: '2px 0' }}>+{subject.topics.length - 3}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1"><BookOpen className="w-3 h-3" style={{ color: '#94a3b8' }} /><span style={{ color: '#64748b', fontSize: '10px' }}>{subject.lessons.length} aulas</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" style={{ color: '#94a3b8' }} /><span style={{ color: '#64748b', fontSize: '10px' }}>{subject.hours}h</span></div>
                      <div className="flex items-center gap-1" style={{ borderRadius: '6px', padding: '2px 6px' }}>
                        <span style={{ color: subject.color, fontSize: '9px', fontWeight: '700' }}>{subject.exercises.length} exerc.</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: subject.color, flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
