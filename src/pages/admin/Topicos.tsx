import React, { useState, useEffect } from "react";
import { 
  TopicosFilter, 
  TopicosTable, 
  AdicionarAula,
  EditTopicoModal,
  DeleteTopicoModal,
  TopicosHeader
} from "./components/topicos";
import { 
  useTopicosState,
  useTopicosFiltrados,
  useTopicosActions
} from "./components/topicos/hooks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Topico } from "./components/topicos/TopicosTypes";
import { QuestionsManager } from "./components/topicos/modals/components/QuestionsManager";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";

interface TeacherData {
  id: string;
  nomeCompleto: string;
  disciplina: string;
}

const Topicos = () => {
  const {
    topicos,
    setTopicos,
    loading,
    searchTerm,
    setSearchTerm,
    disciplinaFiltro,
    setDisciplinaFiltro,
    professorFiltro,
    setProfessorFiltro,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    tituloNovaAula,
    setTituloNovaAula,
    descricaoNovaAula,
    setDescricaoNovaAula,
    isOpenEdit,
    setIsOpenEdit,
    isOpenDelete,
    setIsOpenDelete,
    currentTopico,
    setCurrentTopico
  } = useTopicosState();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTopico, setNewTopico] = useState({
    titulo: "",
    disciplina: "",
    patrocinador: "",
    questoesIds: [] as string[],
    professor_id: "",
    videoUrl: "",
    pdfUrl: "",
    mapaUrl: "",
    resumoUrl: "",
    musicaUrl: ""
  });
  const [disciplinas, setDisciplinas] = useState<string[]>([]);
  const [loadingDisciplinas, setLoadingDisciplinas] = useState(false);
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  
  const [newQuestaoId, setNewQuestaoId] = useState("");

  const { topicosFiltrados, todosSelecionados, totalPages, totalItems } = useTopicosFiltrados(
    topicos,
    searchTerm,
    disciplinaFiltro,
    professorFiltro,
    currentPage,
    itemsPerPage
  );

  const {
    handleSelecaoTodos,
    handleSelecaoTopico,
    openEditModal,
    openDeleteModal,
    handleSaveTopico,
    handleDeleteTopico,
    handleAdicionarAula
  } = useTopicosActions(
    topicos,
    setTopicos,
    setIsOpenEdit,
    setIsOpenDelete,
    setCurrentTopico,
    setTituloNovaAula,
    setDescricaoNovaAula
  );

  useEffect(() => {
    if (isCreateModalOpen) {
      fetchDisciplinas();
      fetchTeachers();
    }
  }, [isCreateModalOpen]);

  const fetchDisciplinas = async () => {
    setLoadingDisciplinas(true);
    try {
      const { data, error } = await supabase
        .from('questoes')
        .select('discipline')
        .order('discipline');
      
      if (error) throw error;
      
      const uniqueDisciplinas = [...new Set(data?.map(item => item.discipline) || [])];
      setDisciplinas(uniqueDisciplinas);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
      toast.error("Erro ao carregar as disciplinas.");
    } finally {
      setLoadingDisciplinas(false);
    }
  };

  const fetchTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const mockTeachers = [
        {
          id: "1",
          nomeCompleto: "Ana Silva",
          email: "ana.silva@email.com",
          linkYoutube: "https://youtube.com/c/anasilva",
          disciplina: "Português",
          instagram: "https://instagram.com/anasilva",
          twitter: "https://twitter.com/anasilva",
          facebook: "https://facebook.com/anasilva",
          fotoPerfil: "https://i.pravatar.cc/150?img=1",
          status: "aprovado",
          dataCadastro: "12/05/2023",
          ativo: true,
          rating: 4.5
        },
        {
          id: "2",
          nomeCompleto: "Carlos Oliveira",
          email: "carlos.oliveira@email.com",
          linkYoutube: "https://youtube.com/c/carlosoliveira",
          disciplina: "Matemática",
          instagram: "https://instagram.com/carlosoliveira",
          fotoPerfil: "https://i.pravatar.cc/150?img=2",
          status: "pendente",
          dataCadastro: "03/07/2023",
          ativo: false,
          rating: 3.8
        },
        {
          id: "3",
          nomeCompleto: "Juliana Mendes",
          email: "juliana.mendes@email.com",
          linkYoutube: "https://youtube.com/c/julianamendes",
          disciplina: "Direito Constitucional",
          twitter: "https://twitter.com/julianamendes",
          facebook: "https://facebook.com/julianamendes",
          fotoPerfil: "https://i.pravatar.cc/150?img=3",
          status: "rejeitado",
          dataCadastro: "28/09/2023",
          ativo: false,
          rating: 2.5
        },
        {
          id: "4",
          nomeCompleto: "Roberto Almeida",
          email: "roberto.almeida@email.com",
          linkYoutube: "https://youtube.com/c/robertoalmeida",
          disciplina: "Contabilidade",
          instagram: "https://instagram.com/robertoalmeida",
          twitter: "https://twitter.com/robertoalmeida",
          fotoPerfil: "https://i.pravatar.cc/150?img=4",
          status: "aprovado",
          dataCadastro: "15/01/2023",
          ativo: true,
          rating: 5.0
        },
        {
          id: "5",
          nomeCompleto: "Fernanda Costa",
          email: "fernanda.costa@email.com",
          linkYoutube: "https://youtube.com/c/fernandacosta",
          disciplina: "Direito Administrativo",
          facebook: "https://facebook.com/fernandacosta",
          fotoPerfil: "https://i.pravatar.cc/150?img=5",
          status: "pendente",
          dataCadastro: "07/04/2023",
          ativo: true,
          rating: 4.2
        }
      ];

      const formattedTeachers: TeacherData[] = mockTeachers.map(teacher => ({
        id: teacher.id,
        nomeCompleto: teacher.nomeCompleto,
        disciplina: teacher.disciplina
      }));

      setTeachers(formattedTeachers);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      toast.error("Erro ao carregar professores. Tente novamente.");
    } finally {
      setLoadingTeachers(false);
    }
  };

  const addQuestaoId = () => {
    if (!newQuestaoId.trim()) {
      toast.error("Digite um ID de questão válido");
      return;
    }

    if (newTopico.questoesIds.includes(newQuestaoId)) {
      toast.error("Esta questão já foi adicionada");
      return;
    }

    setNewTopico({
      ...newTopico,
      questoesIds: [...newTopico.questoesIds, newQuestaoId]
    });
    setNewQuestaoId("");
  };

  const removeQuestaoId = (index: number) => {
    const updatedQuestoes = [...newTopico.questoesIds];
    updatedQuestoes.splice(index, 1);
    setNewTopico({
      ...newTopico,
      questoesIds: updatedQuestoes
    });
  };

  const handleCreateTopico = async () => {
    if (!newTopico.titulo || !newTopico.disciplina) {
      toast.error("Título e disciplina são obrigatórios");
      return;
    }

    try {
      let professor_nome = "";
      if (newTopico.professor_id) {
        const selectedTeacher = teachers.find(t => t.id === newTopico.professor_id);
        if (selectedTeacher) {
          professor_nome = selectedTeacher.nomeCompleto;
        }
      }

      const { data, error } = await supabase
        .from('topicos')
        .insert([
          { 
            nome: newTopico.titulo,
            disciplina: newTopico.disciplina,
            patrocinador: newTopico.patrocinador,
            questoes_ids: newTopico.questoesIds,
            professor_id: newTopico.professor_id,
            professor_nome: professor_nome,
            video_url: newTopico.videoUrl,
            pdf_url: newTopico.pdfUrl,
            mapa_url: newTopico.mapaUrl,
            resumo_url: newTopico.resumoUrl,
            musica_url: newTopico.musicaUrl
          }
        ])
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const newCreatedTopico: Topico = {
          id: data[0].id,
          titulo: data[0].nome,
          thumbnail: "",
          patrocinador: data[0].patrocinador || "Não informado",
          disciplina: data[0].disciplina,
          videoUrl: data[0].video_url || "",
          pdfUrl: data[0].pdf_url || "",
          mapaUrl: data[0].mapa_url || "",
          resumoUrl: data[0].resumo_url || "",
          musicaUrl: data[0].musica_url || "",
          questoesIds: data[0].questoes_ids || [],
          professor_id: data[0].professor_id || "",
          professor_nome: data[0].professor_nome || "",
          selecionado: false
        };
        
        setTopicos([...topicos, newCreatedTopico]);
        toast.success("Tópico criado com sucesso!");
        
        setNewTopico({
          titulo: "",
          disciplina: "",
          patrocinador: "",
          questoesIds: [],
          professor_id: "",
          videoUrl: "",
          pdfUrl: "",
          mapaUrl: "",
          resumoUrl: "",
          musicaUrl: ""
        });
        
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Erro ao criar tópico:", error);
      toast.error("Erro ao criar o tópico. Tente novamente.");
    }
  };

  const temTopicosSelecionados = topicos.some(topico => topico.selecionado);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TopicosHeader />
        <Button 
          onClick={() => setIsCreateModalOpen(true)} 
          className="bg-[#ea2be2] hover:bg-[#ea2be2]/90 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Criar Tópico
        </Button>
      </div>
      
      <TopicosFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        disciplinaFiltro={disciplinaFiltro}
        setDisciplinaFiltro={setDisciplinaFiltro}
        professorFiltro={professorFiltro}
        setProfessorFiltro={setProfessorFiltro}
      />
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <TopicosTable 
            topicos={topicosFiltrados}
            todosSelecionados={todosSelecionados}
            handleSelecaoTodos={() => handleSelecaoTodos(topicosFiltrados, todosSelecionados)}
            handleSelecaoTopico={handleSelecaoTopico}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
          />
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </>
      )}
      
      <AdicionarAula 
        tituloNovaAula={tituloNovaAula}
        setTituloNovaAula={setTituloNovaAula}
        descricaoNovaAula={descricaoNovaAula}
        setDescricaoNovaAula={setDescricaoNovaAula}
        handleAdicionarAula={() => handleAdicionarAula(tituloNovaAula, descricaoNovaAula)}
        temTopicosSelecionados={temTopicosSelecionados}
      />
      
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Tópico</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="topico-titulo">Título</Label>
              <Input
                id="topico-titulo"
                value={newTopico.titulo}
                onChange={(e) => setNewTopico({ ...newTopico, titulo: e.target.value })}
                placeholder="Digite o título do tópico"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-disciplina">Disciplina</Label>
              {loadingDisciplinas ? (
                <div className="text-sm text-[#67748a] p-2 border rounded flex items-center">
                  Carregando disciplinas...
                </div>
              ) : (
                <Select 
                  value={newTopico.disciplina} 
                  onValueChange={(value) => setNewTopico({ ...newTopico, disciplina: value })}
                >
                  <SelectTrigger id="topico-disciplina">
                    <SelectValue placeholder="Selecione uma disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinas.map((disciplina) => (
                      <SelectItem key={disciplina} value={disciplina}>
                        {disciplina}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-professor">Professor</Label>
              {loadingTeachers ? (
                <div className="text-sm text-[#67748a] p-2 border rounded flex items-center">
                  Carregando professores...
                </div>
              ) : (
                <Select 
                  value={newTopico.professor_id} 
                  onValueChange={(value) => setNewTopico({ ...newTopico, professor_id: value })}
                >
                  <SelectTrigger id="topico-professor">
                    <SelectValue placeholder="Selecione um professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.nomeCompleto} - {teacher.disciplina}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-patrocinador">Patrocinador</Label>
              <Input
                id="topico-patrocinador"
                value={newTopico.patrocinador}
                onChange={(e) => setNewTopico({ ...newTopico, patrocinador: e.target.value })}
                placeholder="Digite o nome do patrocinador"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-video-url">Link da Videoaula</Label>
              <Input
                id="topico-video-url"
                value={newTopico.videoUrl}
                onChange={(e) => setNewTopico({ ...newTopico, videoUrl: e.target.value })}
                placeholder="https://exemplo.com/video"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-pdf-url">Link da Aula em PDF</Label>
              <Input
                id="topico-pdf-url"
                value={newTopico.pdfUrl}
                onChange={(e) => setNewTopico({ ...newTopico, pdfUrl: e.target.value })}
                placeholder="https://exemplo.com/aula.pdf"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-mapa-url">Link do Mapa Mental</Label>
              <Input
                id="topico-mapa-url"
                value={newTopico.mapaUrl}
                onChange={(e) => setNewTopico({ ...newTopico, mapaUrl: e.target.value })}
                placeholder="https://exemplo.com/mapa"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-resumo-url">Link do Resumo</Label>
              <Input
                id="topico-resumo-url"
                value={newTopico.resumoUrl}
                onChange={(e) => setNewTopico({ ...newTopico, resumoUrl: e.target.value })}
                placeholder="https://exemplo.com/resumo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topico-musica-url">Link da Música</Label>
              <Input
                id="topico-musica-url"
                value={newTopico.musicaUrl}
                onChange={(e) => setNewTopico({ ...newTopico, musicaUrl: e.target.value })}
                placeholder="https://exemplo.com/musica"
              />
            </div>
            
            <QuestionsManager
              questoesIds={newTopico.questoesIds}
              newQuestaoId={newQuestaoId}
              setNewQuestaoId={setNewQuestaoId}
              addQuestaoId={addQuestaoId}
              removeQuestaoId={removeQuestaoId}
              label="Questões"
            />
            
            <Button onClick={handleCreateTopico} className="w-full">Cadastrar Tópico</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <EditTopicoModal 
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        topico={currentTopico}
        onSave={handleSaveTopico}
      />
      
      <DeleteTopicoModal 
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        topico={currentTopico}
        onDelete={handleDeleteTopico}
      />
    </div>
  );
};

export default Topicos;
