
import React, { useState, useEffect } from "react";
import { SimuladosTable, VincularCursoModal } from "./components/simulados";
import { Simulado } from "./components/simulados/SimuladosTypes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQuestionSelectionActions } from "@/components/admin/questions/hooks/actions/useQuestionSelectionActions";
import { useQuestionsState } from "@/components/admin/questions/hooks/useQuestionsState";

const Simulados = () => {
  const questionsState = useQuestionsState();
  const { handleCreateSimulado } = useQuestionSelectionActions(questionsState);
  
  // Estado para os simulados
  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [selectedSimulados, setSelectedSimulados] = useState<string[]>([]);
  
  // Estado para o modal de vincular curso
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false);
  const [currentSimuladoId, setCurrentSimuladoId] = useState("");

  // Monitorar quando um simulado é criado (questões selecionadas)
  useEffect(() => {
    // Criar uma cópia da função original de criar simulado
    const originalHandleCreateSimulado = handleCreateSimulado;
    
    // Definir uma nova função para criar simulado
    const createSimuladoWithState = () => {
      if (questionsState.selectedQuestions.length === 0) {
        toast.error("Selecione pelo menos uma questão para criar o simulado.");
        return;
      }

      // Gerar um ID único
      const id = `sim_${Date.now()}`;
      
      // Criar um novo simulado
      const novoSimulado: Simulado = {
        id,
        titulo: `Simulado ${simulados.length + 1}`,
        descricao: `Simulado com ${questionsState.selectedQuestions.length} questões`,
        questoesIds: [...questionsState.selectedQuestions],
        cursosIds: [],
        ativo: true
      };
      
      // Adicionar à lista de simulados
      setSimulados(prevSimulados => [...prevSimulados, novoSimulado]);
      
      // Limpar as questões selecionadas
      questionsState.setSelectedQuestions([]);
      
      toast.success(`Simulado criado com ${questionsState.selectedQuestions.length} questões!`);
    };

    // Substituir temporariamente a função de criar simulado original
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).tempCreateSimulado = createSimuladoWithState;

    return () => {
      // Remover a função temporária ao desmontar
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).tempCreateSimulado;
    };
  }, [simulados.length, questionsState, handleCreateSimulado]);

  // Toggle seleção de simulado
  const handleToggleSelection = (id: string) => {
    setSelectedSimulados(prev => {
      if (prev.includes(id)) {
        return prev.filter(simId => simId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Vincular simulado a um curso
  const handleVincularCurso = (simuladoId: string) => {
    setCurrentSimuladoId(simuladoId);
    setIsVincularModalOpen(true);
  };

  const onVincular = (simuladoId: string, cursoId: string) => {
    setSimulados(prevSimulados => 
      prevSimulados.map(simulado => {
        if (simulado.id === simuladoId) {
          // Verificar se o curso já está vinculado
          if (simulado.cursosIds.includes(cursoId)) {
            toast.info(`O curso ${cursoId} já está vinculado a este simulado.`);
            return simulado;
          }
          // Adicionar o curso à lista de cursos vinculados
          return {
            ...simulado, 
            cursosIds: [...simulado.cursosIds, cursoId]
          };
        }
        return simulado;
      })
    );
    toast.success(`Simulado vinculado ao curso ${cursoId} com sucesso!`);
  };

  // Ativar/desativar simulado
  const handleToggleAtivo = (simuladoId: string) => {
    setSimulados(prevSimulados => 
      prevSimulados.map(simulado => {
        if (simulado.id === simuladoId) {
          const novoStatus = !simulado.ativo;
          toast.success(`Simulado ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`);
          return {...simulado, ativo: novoStatus};
        }
        return simulado;
      })
    );
  };

  // Excluir simulado
  const handleExcluir = (simuladoId: string) => {
    setSimulados(prevSimulados => 
      prevSimulados.filter(simulado => simulado.id !== simuladoId)
    );
    setSelectedSimulados(prev => prev.filter(id => id !== simuladoId));
    toast.success('Simulado excluído com sucesso!');
  };

  // Excluir simulados selecionados
  const handleExcluirSelecionados = () => {
    if (selectedSimulados.length === 0) {
      toast.error('Selecione pelo menos um simulado para excluir.');
      return;
    }
    
    setSimulados(prevSimulados => 
      prevSimulados.filter(simulado => !selectedSimulados.includes(simulado.id))
    );
    setSelectedSimulados([]);
    toast.success(`${selectedSimulados.length} simulado(s) excluído(s) com sucesso!`);
  };

  // Função para criar simulado com as questões selecionadas
  const createSimulado = () => {
    // Usar a função temporária se disponível, ou a original
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).tempCreateSimulado) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).tempCreateSimulado();
    } else {
      handleCreateSimulado();
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#272f3c]">Simulados</h1>
      <p className="text-[#67748a]">Gerenciamento de simulados</p>
      
      {selectedSimulados.length > 0 && (
        <div className="flex justify-end">
          <Button 
            variant="destructive" 
            onClick={handleExcluirSelecionados}
          >
            Excluir Selecionados ({selectedSimulados.length})
          </Button>
        </div>
      )}
      
      <SimuladosTable 
        simulados={simulados}
        handleToggleSelection={handleToggleSelection}
        handleVincularCurso={handleVincularCurso}
        handleToggleAtivo={handleToggleAtivo}
        handleExcluir={handleExcluir}
        selectedSimulados={selectedSimulados}
      />
      
      <VincularCursoModal 
        isOpen={isVincularModalOpen}
        onClose={() => setIsVincularModalOpen(false)}
        simuladoId={currentSimuladoId}
        onVincular={onVincular}
      />

      <div className="mt-4">
        <Button 
          onClick={createSimulado}
          className="bg-[#ea2be2] hover:bg-[#ea2be2]/90 text-white"
        >
          Criar Simulado com Questões Selecionadas ({questionsState.selectedQuestions.length})
        </Button>
      </div>
    </div>
  );
};

export default Simulados;
