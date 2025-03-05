
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Youtube, Award, BarChart } from "lucide-react";
import { TeacherSignupDialog } from "./TeacherSignupDialog";
export const Hero = () => {
  const [teacherDialogOpen, setTeacherDialogOpen] = useState(false);
  return <div className="w-full min-h-screen relative overflow-hidden bg-white">
      {/* Background Effect - Degradê Radial Moderno */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Primeiro círculo de degradê - maior, mais suave */}
        <div className="absolute w-[800px] h-[800px] rounded-full 
          bg-gradient-to-r from-[#ea2be2]/40 via-[#ea2be2]/20 to-transparent 
          -top-[200px] -left-[200px] blur-[60px]">
        </div>
        
        {/* Segundo círculo de degradê - médio */}
        <div className="absolute w-[600px] h-[600px] rounded-full 
          bg-gradient-to-r from-[#ea2be2]/30 via-[#ea2be2]/15 to-transparent 
          top-[40%] -right-[200px] blur-[50px]">
        </div>
        
        {/* Terceiro círculo de degradê - menor, mais intenso */}
        <div className="absolute w-[400px] h-[400px] rounded-full 
          bg-gradient-to-r from-[#ea2be2]/25 via-[#ea2be2]/10 to-transparent 
          bottom-[10%] left-[20%] blur-[40px]">
        </div>
        
        {/* Overlay para suavizar a transição */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-white/90 pointer-events-none"></div>
        
        {/* Pontos decorativos com animação */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-2 h-2 bg-[#ea2be2] rounded-full top-[20%] left-[30%] animate-pulse" style={{
          animationDelay: "0.5s"
        }}></div>
          <div className="absolute w-2 h-2 bg-[#ea2be2] rounded-full top-[50%] left-[70%] animate-pulse" style={{
          animationDelay: "0.7s"
        }}></div>
          <div className="absolute w-2 h-2 bg-[#ea2be2] rounded-full top-[70%] left-[20%] animate-pulse" style={{
          animationDelay: "1s"
        }}></div>
          <div className="absolute w-2 h-2 bg-[#ea2be2] rounded-full top-[30%] left-[80%] animate-pulse" style={{
          animationDelay: "1.2s"
        }}></div>
          <div className="absolute w-2 h-2 bg-[#ea2be2] rounded-full top-[80%] left-[50%] animate-pulse" style={{
          animationDelay: "0.8s"
        }}></div>
          <div className="absolute w-2 h-2 bg-[#ea2be2] rounded-full top-[40%] left-[40%] animate-pulse" style={{
          animationDelay: "1.5s"
        }}></div>
          
          {/* Adicionando mais pontos para melhorar o efeito visual */}
          <div className="absolute w-1 h-1 bg-[#ea2be2] rounded-full top-[25%] left-[55%] animate-pulse" style={{
          animationDelay: "1.8s"
        }}></div>
          <div className="absolute w-1 h-1 bg-[#ea2be2] rounded-full top-[65%] left-[35%] animate-pulse" style={{
          animationDelay: "2s"
        }}></div>
          <div className="absolute w-1 h-1 bg-[#ea2be2] rounded-full top-[45%] left-[85%] animate-pulse" style={{
          animationDelay: "1.3s"
        }}></div>
        </div>
      </div>
      
      {/* Conteúdo centralizado */}
      <div className="mx-auto px-4 min-h-screen flex flex-col justify-center items-center relative z-20 py-16 bg-white">
        <div className="text-center space-y-6 max-w-3xl px-4">
          <h1 className="text-3xl sm:text-4xl leading-tight md:text-7xl font-thin text-[#272f3c]">
            <span className="px-0 text-[272f3c] text-[#272f3c] font-thin">Conectando Alunos a Professores</span> e <span className="text-black font-extrabold">Professores</span>
          </h1>
          
          <p className="text-base sm:text-lg text-[#67748a] max-w-2xl mx-auto leading-relaxed md:text-xl font-light">
            Estude de graça com os melhores professores do YouTube e utilize ferramentas avançadas para potencializar seus estudos para concursos públicos.
          </p>
          
          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 sm:py-6 max-w-2xl mx-auto">
            {[{
            icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#ea2be2]" />,
            label: "Cursos Gratuitos"
          }, {
            icon: <Youtube className="h-5 w-5 sm:h-6 sm:w-6 text-[#ea2be2]" />,
            label: "Professores YouTubers"
          }, {
            icon: <BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-[#ea2be2]" />,
            label: "Estatísticas Detalhadas"
          }, {
            icon: <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#ea2be2]" />,
            label: "Acompanhamento Completo"
          }].map((item, index) => <div key={index} className="flex flex-col items-center gap-2 p-2 sm:p-4">
                <div className="p-2 bg-white rounded-full shadow-none">
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm text-[#67748a] font-normal">{item.label}</span>
              </div>)}
          </div>
          
          {/* Botões com design melhorado */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/login" className="w-full sm:w-auto">
              <Button className="text-white rounded-lg text-sm sm:text-lg tracking-wider hover:bg-opacity-90 transition-all px-8 sm:px-10 py-6 sm:py-7 bg-gradient-to-r from-[#ea2be2] to-[#f952ec] hover:shadow-lg hover:shadow-[#ea2be2]/30 hover:-translate-y-1 w-full border-b-4 border-[#c71dc0] font-normal">
                QUERO ESTUDAR GRÁTIS
              </Button>
            </Link>
            <Button onClick={() => setTeacherDialogOpen(true)} className="rounded-lg text-sm sm:text-lg tracking-wider transition-all px-8 sm:px-10 py-6 sm:py-7 bg-white border-2 border-[#ea2be2] text-[#ea2be2] hover:bg-[#ea2be2]/5 hover:shadow-lg hover:shadow-[#ea2be2]/20 hover:-translate-y-1 w-full sm:w-auto font-normal">
              QUERO SER PROFESSOR
            </Button>
          </div>
        </div>
      </div>
      
      {/* Diálogo de cadastro de professor */}
      <TeacherSignupDialog open={teacherDialogOpen} onOpenChange={setTeacherDialogOpen} />
    </div>;
};
