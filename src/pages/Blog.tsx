
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogPost } from "@/components/blog/types";

// Dados fictícios para demonstração
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Dicas para provas de Português em concursos públicos",
    summary: "Confira nossas dicas essenciais para se destacar nas provas de língua portuguesa em concursos públicos e aumentar suas chances de aprovação.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Maria Silva",
    commentCount: 15,
    likesCount: 32,
    createdAt: "2023-10-15T14:30:00Z",
    slug: "dicas-para-provas-de-portugues",
    category: "blog"
  },
  {
    id: "2",
    title: "Como estudar para concursos jurídicos",
    summary: "Aprenda métodos eficientes para estudar direito e conquistar sua aprovação em concursos jurídicos, com planejamento e técnicas de estudo.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Carlos Mendes",
    commentCount: 8,
    likesCount: 24,
    createdAt: "2023-10-10T09:45:00Z",
    slug: "como-estudar-para-concursos-juridicos",
    category: "blog"
  },
  {
    id: "3",
    title: "Calendário de concursos 2023",
    summary: "Fique por dentro dos principais concursos previstos para 2023 e organize seus estudos com antecedência para maximizar suas chances.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Ana Oliveira",
    commentCount: 20,
    likesCount: 45,
    createdAt: "2023-10-05T11:20:00Z",
    slug: "calendario-de-concursos-2023",
    category: "blog"
  },
  {
    id: "4",
    title: "Saúde mental e concursos públicos",
    summary: "A importância de cuidar da saúde mental durante a preparação para concursos públicos e estratégias para gerenciar o estresse.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Pedro Santos",
    commentCount: 17,
    likesCount: 38,
    createdAt: "2023-09-28T16:15:00Z",
    slug: "saude-mental-e-concursos-publicos",
    category: "blog"
  },
  {
    id: "5",
    title: "Técnicas de memorização para concurseiros",
    summary: "Conheça técnicas eficientes de memorização que podem ajudar nos seus estudos para concursos públicos e melhorar seu desempenho.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Júlia Ferreira",
    commentCount: 12,
    likesCount: 29,
    createdAt: "2023-09-20T13:50:00Z",
    slug: "tecnicas-de-memorizacao-para-concurseiros",
    category: "blog"
  },
  {
    id: "6",
    title: "Experiências de aprovados em concursos difíceis",
    summary: "Relatos de candidatos aprovados em concursos considerados difíceis, com dicas e estratégias que fizeram a diferença na preparação.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Ricardo Almeida",
    commentCount: 25,
    likesCount: 52,
    createdAt: "2023-09-15T10:30:00Z",
    slug: "experiencias-de-aprovados-em-concursos-dificeis",
    category: "blog"
  },
  {
    id: "7",
    title: "Como organizar o tempo de estudo",
    summary: "Dicas práticas para organizar seu tempo de estudo de forma eficiente, conciliando trabalho, família e preparação para concursos.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Fernanda Lima",
    commentCount: 14,
    likesCount: 31,
    createdAt: "2023-09-08T14:45:00Z",
    slug: "como-organizar-o-tempo-de-estudo",
    category: "blog"
  },
  {
    id: "8",
    title: "Materiais essenciais para estudar para concursos",
    summary: "Lista de materiais e recursos fundamentais para uma preparação completa para concursos públicos, desde livros até plataformas online.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Gustavo Martins",
    commentCount: 9,
    likesCount: 27,
    createdAt: "2023-09-01T09:20:00Z",
    slug: "materiais-essenciais-para-estudar",
    category: "blog"
  },
  {
    id: "9",
    title: "O papel dos simulados na preparação",
    summary: "Como os simulados podem ajudar na sua preparação para concursos públicos e como extrair o máximo de informações úteis deles.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Roberta Souza",
    commentCount: 11,
    likesCount: 34,
    createdAt: "2023-08-25T15:10:00Z",
    slug: "papel-dos-simulados-na-preparacao",
    category: "blog"
  },
  {
    id: "10",
    title: "Novidades legislativas importantes para concursos",
    summary: "Atualização sobre as principais mudanças legislativas que podem ser cobradas em concursos públicos nos próximos meses.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Rafael Costa",
    commentCount: 16,
    likesCount: 39,
    createdAt: "2023-08-18T11:30:00Z",
    slug: "novidades-legislativas-importantes",
    category: "blog"
  },
  {
    id: "11",
    title: "Direito Administrativo: tópicos mais cobrados",
    summary: "Análise dos tópicos de Direito Administrativo mais frequentemente cobrados em concursos públicos nos últimos anos.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Luciana Menezes",
    commentCount: 18,
    likesCount: 42,
    createdAt: "2023-08-10T13:40:00Z",
    slug: "direito-administrativo-topicos-cobrados",
    category: "blog"
  },
  {
    id: "12",
    title: "Exercícios físicos e desempenho nos estudos",
    summary: "Como a prática regular de exercícios físicos pode melhorar seu desempenho cognitivo e ajudar na preparação para concursos.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Bruno Campos",
    commentCount: 7,
    likesCount: 23,
    createdAt: "2023-08-05T10:15:00Z",
    slug: "exercicios-fisicos-e-desempenho",
    category: "blog"
  }
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  
  // Filtrar apenas posts da categoria 'blog'
  const blogPosts = MOCK_BLOG_POSTS.filter(post => post.category === 'blog');
  
  // Calcular o número total de páginas
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  // Obter os posts da página atual
  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return blogPosts.slice(startIndex, endIndex);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Rolar para o topo da página ao mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f8fa]">
      <Header />
      <main className="flex-grow pt-[120px] px-4 md:px-8 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl mb-6 md:text-4xl font-extrabold text-[#272f3c]">Blog</h1>
        
        <div className="mb-8">
          <p className="text-[#67748a] text-lg">
            Fique por dentro das últimas novidades, dicas e estratégias para sua preparação para concursos públicos.
          </p>
        </div>
        
        <div className="space-y-6">
          {getCurrentPagePosts().map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <BlogPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
