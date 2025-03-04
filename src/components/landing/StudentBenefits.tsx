import React from "react";
import { FileText, BarChart, BookOpen, Award, CheckCircle, Target } from "lucide-react";
export const StudentBenefits = () => {
  return <div className="w-full px-2.5 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#272f3c] mb-4 font-extrabold">
            Por que estudar no <span className="text-[#ea2be2]">BomEstudo</span>?
          </h2>
          <p className="text-[#67748a] max-w-2xl mx-auto leading-none">
            Nossa plataforma foi desenvolvida pensando exclusivamente em quem deseja ser aprovado em concursos públicos
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
          icon: <BookOpen className="w-10 h-10 text-[#ea2be2]" />,
          title: "Acesso Gratuito",
          description: "Estude com videoaulas de qualidade dos melhores professores do YouTube, totalmente grátis"
        }, {
          icon: <CheckCircle className="w-10 h-10 text-[#ea2be2]" />,
          title: "Questões Comentadas",
          description: "Pratique com nossa base de questões comentadas pelos professores e pela inteligência artificial"
        }, {
          icon: <BarChart className="w-10 h-10 text-[#ea2be2]" />,
          title: "Estatísticas Detalhadas",
          description: "Acompanhe seu desempenho por banca, disciplina e assunto com gráficos interativos"
        }, {
          icon: <Target className="w-10 h-10 text-[#ea2be2]" />,
          title: "Simulados Personalizados",
          description: "Crie simulados focados nos tópicos que você mais precisa estudar para maximizar seu aprendizado"
        }, {
          icon: <FileText className="w-10 h-10 text-[#ea2be2]" />,
          title: "Edital Verticalizado",
          description: "Organize seu estudo seguindo a estrutura do edital do seu concurso para uma preparação eficiente"
        }, {
          icon: <Award className="w-10 h-10 text-[#ea2be2]" />,
          title: "Acompanhamento Contínuo",
          description: "Receba feedbacks e sugestões para melhorar seu desempenho e aumentar suas chances de aprovação"
        }].map((benefit, index) => <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <div className="p-3 bg-white rounded-full w-fit shadow-sm mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-[#272f3c] mb-3">{benefit.title}</h3>
                <p className="text-[#67748a] flex-grow">{benefit.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};