
import React, { useEffect } from "react";
import Card from "@/components/admin/questions/Card";
import SearchQuestion from "@/components/admin/questions/SearchQuestion";
import QuestionFilters from "@/components/admin/questions/QuestionFilters";
import QuestionList from "@/components/admin/questions/QuestionList";
import QuestionForm from "@/components/admin/questions/QuestionForm";
import { useQuestionsState } from "@/components/admin/questions/hooks/useQuestionsState";
import { useQuestionActions } from "@/components/admin/questions/hooks/useQuestionActions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { QuestionItemType } from "@/components/admin/questions/types";

const Questoes: React.FC = () => {
  const state = useQuestionsState();
  const actions = useQuestionActions(state);
  const { user } = useAuth();
  
  const filteredQuestions = actions.getFilteredQuestions();

  // Carregar questões do banco de dados ao montar o componente
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from('questoes')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        // Transformar os dados para o formato esperado pelo componente
        const formattedQuestions: QuestionItemType[] = data.map(q => ({
          id: q.id,
          year: q.year,
          institution: q.institution,
          organization: q.organization,
          role: q.role,
          discipline: q.discipline,
          level: q.level,
          difficulty: q.difficulty,
          questionType: q.questiontype,
          content: q.content,
          teacherExplanation: q.teacherexplanation,
          aiExplanation: q.aiexplanation || "",
          expandableContent: q.expandablecontent || "",
          options: Array.isArray(q.options) ? q.options : [],
          topicos: Array.isArray(q.topicos) ? q.topicos : []
        }));
        
        state.setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
        toast.error('Erro ao carregar questões. Tente novamente.');
      }
    };
    
    fetchQuestions();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold text-[#272f3c]">Questões</h1>
        <p className="text-[#67748a]">Gerenciamento de questões</p>
      </div>

      <Card title="Buscar Questão" description="Pesquise e edite questões pelo ID" defaultOpen={true}>
        <SearchQuestion 
          searchId={state.searchId} 
          setSearchId={state.setSearchId} 
          handleSearchQuestion={actions.handleSearchQuestion} 
        />
      </Card>

      {state.isEditQuestionCardOpen && (
        <Card title="Editar Questão" description="Edite os dados da questão" defaultOpen={true}>
          <QuestionForm
            questionId={state.questionId}
            year={state.year}
            setYear={state.setYear}
            institution={state.institution}
            setInstitution={state.setInstitution}
            organization={state.organization}
            setOrganization={state.setOrganization}
            role={state.role}
            setRole={state.setRole}
            discipline={state.discipline}
            setDiscipline={state.setDiscipline}
            level={state.level}
            setLevel={state.setLevel}
            difficulty={state.difficulty}
            setDifficulty={state.setDifficulty}
            questionType={state.questionType}
            setQuestionType={state.setQuestionType}
            questionText={state.questionText}
            setQuestionText={state.setQuestionText}
            teacherExplanation={state.teacherExplanation}
            setTeacherExplanation={state.setTeacherExplanation}
            expandableContent={state.expandableContent}
            setExpandableContent={state.setExpandableContent}
            aiExplanation={state.aiExplanation}
            setAIExplanation={state.setAIExplanation}
            options={state.options}
            setOptions={state.setOptions}
            topicos={state.topicos}
            setTopicos={state.setTopicos}
            institutions={state.institutions}
            setInstitutions={state.setInstitutions}
            organizations={state.organizations}
            setOrganizations={state.setOrganizations}
            roles={state.roles}
            setRoles={state.setRoles}
            disciplines={state.disciplines}
            setDisciplines={state.setDisciplines}
            levels={state.levels}
            setLevels={state.setLevels}
            difficulties={state.difficulties}
            setDifficulties={state.setDifficulties}
            questionTypes={state.questionTypes}
            setQuestionTypes={state.setQuestionTypes}
            years={state.years}
            setYears={state.setYears}
            onSubmit={actions.handleUpdateQuestion}
            submitButtonText="Salvar Modificações"
            isEditing={true}
          />
        </Card>
      )}

      <Card title="Questões Cadastradas" description="Visualize e gerencie as questões cadastradas" defaultOpen={false}>
        <QuestionFilters
          filters={state.filters}
          setFilters={state.setFilters}
          showFilters={state.showFilters}
          setShowFilters={state.setShowFilters}
          resetFilters={actions.resetFilters}
        />
        
        <QuestionList
          filteredQuestions={filteredQuestions}
          selectedQuestions={state.selectedQuestions}
          toggleQuestionSelection={actions.toggleQuestionSelection}
          handleCreateSimulado={actions.handleCreateSimulado}
          handleRemoveQuestion={actions.handleRemoveQuestion}
          handleEditQuestion={(question) => actions.handleEditQuestion(question.id)}
          copyToClipboard={actions.copyToClipboard}
        />
      </Card>

      <Card title="Nova Questão" description="Crie uma nova questão para suas listas" defaultOpen={false}>
        <QuestionForm
          questionId={state.questionId}
          year={state.year}
          setYear={state.setYear}
          institution={state.institution}
          setInstitution={state.setInstitution}
          organization={state.organization}
          setOrganization={state.setOrganization}
          role={state.role}
          setRole={state.setRole}
          discipline={state.discipline}
          setDiscipline={state.setDiscipline}
          level={state.level}
          setLevel={state.setLevel}
          difficulty={state.difficulty}
          setDifficulty={state.setDifficulty}
          questionType={state.questionType}
          setQuestionType={state.setQuestionType}
          questionText={state.questionText}
          setQuestionText={state.setQuestionText}
          teacherExplanation={state.teacherExplanation}
          setTeacherExplanation={state.setTeacherExplanation}
          expandableContent={state.expandableContent}
          setExpandableContent={state.setExpandableContent}
          aiExplanation={state.aiExplanation}
          setAIExplanation={state.setAIExplanation}
          options={state.options}
          setOptions={state.setOptions}
          topicos={state.topicos}
          setTopicos={state.setTopicos}
          institutions={state.institutions}
          setInstitutions={state.setInstitutions}
          organizations={state.organizations}
          setOrganizations={state.setOrganizations}
          roles={state.roles}
          setRoles={state.setRoles}
          disciplines={state.disciplines}
          setDisciplines={state.setDisciplines}
          levels={state.levels}
          setLevels={state.setLevels}
          difficulties={state.difficulties}
          setDifficulties={state.setDifficulties}
          questionTypes={state.questionTypes}
          setQuestionTypes={state.setQuestionTypes}
          years={state.years}
          setYears={state.setYears}
          onSubmit={actions.handleSaveQuestion}
          submitButtonText="Salvar Questão"
        />
      </Card>
    </div>
  );
};

export default Questoes;
