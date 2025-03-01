
import React, { useState } from "react";
import { DashboardSummary } from "./components/DashboardSummary";
import { SubjectTable } from "./components/SubjectTable";
import { SimuladosTable } from "./components/SimuladosTable";
import { Subject, Topic } from "./types/editorialized";
import { calculateOverallStats } from "./utils/statsCalculations";
import { StatisticsCard } from "./components/StatisticsCard";

const subjects: Subject[] = [
  {
    id: 1,
    name: "Língua Portuguesa",
    topics: [{
      id: 0,
      name: "Ortografia.",
      topic: "Conceitos básicos de ortografia e suas aplicações.",
      isDone: true,
      isReviewed: false,
      importance: 5,
      difficulty: "Muito Difícil",
      exercisesDone: 10,
      hits: 8,
      errors: 2,
      performance: 80
    }, {
      id: 1,
      name: "Morfologia. Classes de palavras: substantivos, adjetivos, artigos, numerais, advérbios e interjeições.",
      topic: "Estudo das classes gramaticais e suas funções na construção do texto.",
      isDone: false,
      isReviewed: false,
      importance: 3,
      difficulty: "Fácil",
      exercisesDone: 5,
      hits: 3,
      errors: 2,
      performance: 60
    }]
  }, {
    id: 2,
    name: "Direito Constitucional",
    topics: [{
      id: 0,
      name: "Aplicabilidade das Normas Constitucionais.",
      topic: "Análise dos tipos de normas constitucionais e sua aplicação prática.",
      isDone: true,
      isReviewed: false,
      importance: 4,
      difficulty: "Médio",
      exercisesDone: 15,
      hits: 12,
      errors: 3,
      performance: 80
    }]
  }
];

export const EditorializedView = ({ activeTab = 'edital' }) => {
  const [localSubjects, setLocalSubjects] = useState<Subject[]>(subjects);
  const [performanceGoal, setPerformanceGoal] = useState<number>(70);

  const handleTopicChange = (subjectId: number, topicId: number, field: keyof Topic, value: any) => {
    setLocalSubjects(prevSubjects => prevSubjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          topics: subject.topics.map(topic => {
            if (topic.id === topicId) {
              return {
                ...topic,
                [field]: value
              };
            }
            return topic;
          })
        };
      }
      return subject;
    }));
  };

  const overallStats = calculateOverallStats(localSubjects);

  return (
    <div className="bg-[#f6f8fa] rounded-[10px] pb-5 px-[10px] md:px-5">
      <DashboardSummary 
        overallStats={overallStats} 
        performanceGoal={performanceGoal} 
        setPerformanceGoal={setPerformanceGoal}
        activeTab={activeTab}
        subjects={localSubjects}
      />

      {activeTab === 'edital' && (
        <>
          <StatisticsCard subjects={localSubjects} />
          
          {localSubjects.map(subject => (
            <SubjectTable
              key={subject.id}
              subject={subject}
              performanceGoal={performanceGoal}
              onTopicChange={handleTopicChange}
            />
          ))}
        </>
      )}

      {activeTab === 'simulados' && (
        <SimuladosTable performanceGoal={performanceGoal} />
      )}
    </div>
  );
};
