
import { Aula } from "../AulasTypes";
import { supabase } from "@/integrations/supabase/client";

export const useAulasFiltrados = (
  aulas: Aula[],
  searchTerm: string,
  descricaoFiltro: string,
  currentPage: number,
  itemsPerPage: number
) => {
  // Filtrar aulas com base nos termos de pesquisa
  const aulasFiltradas = aulas.filter((aula) => {
    const matchesTitulo = aula.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDescricao = aula.descricao.toLowerCase().includes(descricaoFiltro.toLowerCase());
    
    return matchesTitulo && matchesDescricao;
  });

  // Paginar as aulas filtradas
  const totalPages = Math.max(1, Math.ceil(aulasFiltradas.length / itemsPerPage));
  const paginatedAulas = aulasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Verificar se todas as aulas na página atual estão selecionadas
  const todasSelecionadas = paginatedAulas.length > 0 && paginatedAulas.every(aula => aula.selecionada);

  return {
    aulasFiltradas: paginatedAulas,
    todasSelecionadas,
    totalPages,
    totalItems: aulasFiltradas.length
  };
};

// Função para calcular o total de questões de uma aula, incluindo questões de seus tópicos
export const calcularTotalQuestoes = async (aula: Aula): Promise<number> => {
  try {
    // Contar questões diretamente associadas à aula
    let totalQuestoes = aula.questoesIds.length;
    
    // Buscar os tópicos associados a esta aula
    if (aula.topicosIds && aula.topicosIds.length > 0) {
      const { data: topicos, error } = await supabase
        .from("topicos")
        .select("questoes_ids")
        .in("id", aula.topicosIds);
      
      if (error) throw error;
      
      // Somar questões de cada tópico
      if (topicos) {
        topicos.forEach(topico => {
          if (topico.questoes_ids) {
            totalQuestoes += topico.questoes_ids.length;
          }
        });
      }
    }
    
    return totalQuestoes;
  } catch (error) {
    console.error("Erro ao calcular total de questões:", error);
    return 0;
  }
};
