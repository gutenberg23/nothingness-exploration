
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { CourseHeader } from "./CourseHeader";
import { CourseNavigation } from "./CourseNavigation";
import { SubjectsList } from "./SubjectsList";
import { ProgressPanel } from "./ProgressPanel";
import { EditorializedView } from "./EditorializedView";

export const CourseLayout = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState<'disciplinas' | 'edital' | 'simulados'>('disciplinas');
  const [isProgressVisible, setIsProgressVisible] = useState(true);
  const progressRef = React.useRef<HTMLDivElement>(null);
  
  // Efeito para carregar os dados do curso com base no ID
  useEffect(() => {
    if (courseId) {
      console.log("Carregando curso com ID:", courseId);
      // Aqui seria feita a chamada para API para buscar os detalhes do curso
      // Por enquanto vamos apenas logar o ID
    }
  }, [courseId]);
  
  const handleProgressClick = () => {
    setIsProgressVisible(!isProgressVisible);
    if (!isProgressVisible) {
      setTimeout(() => {
        progressRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };
  
  return <div className="min-h-screen bg-[#f6f8fa]">
      <Header />
      <main className="pt-[88px]">
        <CourseHeader courseId={courseId} />
        <CourseNavigation activeTab={activeTab} setActiveTab={setActiveTab} onProgressClick={handleProgressClick} isProgressVisible={isProgressVisible} />
        {activeTab === 'disciplinas' && <div className="bg-[rgba(246,248,250,1)] flex w-full gap-5 py-0 flex-col xl:flex-row px-[10px] md:px-[32px]">
            <div className="flex-1">
              <SubjectsList courseId={courseId} />
            </div>
            {isProgressVisible && <div ref={progressRef} className="w-full xl:min-w-[300px] xl:max-w-[400px] mb-10">
                <ProgressPanel courseId={courseId} />
              </div>}
          </div>}
        {(activeTab === 'edital' || activeTab === 'simulados') && <div className="bg-[rgba(246,248,250,1)] w-full">
            <EditorializedView activeTab={activeTab} courseId={courseId} />
          </div>}
      </main>
      <Footer />
    </div>;
};
