
import React from "react";
import { Book, FileText, Activity, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

type CourseNavigationProps = {
  activeTab: 'disciplinas' | 'edital' | 'simulados';
  setActiveTab: (tab: 'disciplinas' | 'edital' | 'simulados') => void;
  onProgressClick: () => void;
  isProgressVisible: boolean;
};

export const CourseNavigation = ({ activeTab, setActiveTab, onProgressClick, isProgressVisible }: CourseNavigationProps) => {
  return (
    <nav className="bg-[rgba(246,248,250,1)] flex min-h-[92px] w-full items-center justify-between gap-5 text-[17px] text-slate-500 px-2.5 overflow-x-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-slate-100
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-slate-300
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:hover:bg-slate-400
    ">
      <div className="flex items-center gap-5">
        <button 
          onClick={() => setActiveTab('disciplinas')}
          className={cn(
            "flex items-center gap-2.5 px-5 py-4 rounded-[10px] hover:bg-white transition-colors whitespace-nowrap",
            activeTab === 'disciplinas' && "bg-white text-[#f11ce3]"
          )}
        >
          <Book className="w-6 h-6" />
          <span className={cn(
            "md:inline text-xs md:text-base",
            activeTab === 'disciplinas' ? "inline flex flex-col sm:flex-row" : "hidden"
          )}>
            <span className="sm:hidden">Todas as</span>
            <span className="sm:hidden">Disciplinas</span>
            <span className="hidden sm:inline">Todas as Disciplinas</span>
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('edital')}
          className={cn(
            "flex items-center gap-2.5 px-5 py-4 rounded-[10px] hover:bg-white transition-colors whitespace-nowrap",
            activeTab === 'edital' && "bg-white text-[#f11ce3]"
          )}
        >
          <FileText className="w-6 h-6" />
          <span className={cn(
            "md:inline text-xs md:text-base",
            activeTab === 'edital' ? "inline flex flex-col sm:flex-row" : "hidden"
          )}>
            <span className="sm:hidden">Edital</span>
            <span className="sm:hidden">Verticalizado</span>
            <span className="hidden sm:inline">Edital Verticalizado</span>
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('simulados')}
          className={cn(
            "flex items-center gap-2.5 px-5 py-4 rounded-[10px] hover:bg-white transition-colors whitespace-nowrap",
            activeTab === 'simulados' && "bg-white text-[#f11ce3]"
          )}
        >
          <Activity className="w-6 h-6" />
          <span className={cn(
            "md:inline text-xs md:text-base",
            activeTab === 'simulados' ? "inline" : "hidden"
          )}>Simulados</span>
        </button>
      </div>

      {activeTab === 'disciplinas' && (
        <button 
          onClick={onProgressClick}
          className={cn(
            "hidden md:flex items-center gap-2.5 px-5 py-4 rounded-[10px] hover:bg-white transition-colors whitespace-nowrap ml-auto",
            isProgressVisible && "bg-white text-[#f11ce3]"
          )}
        >
          <LineChart className="w-6 h-6" />
          <span className="hidden md:inline">Meu Progresso</span>
        </button>
      )}
    </nav>
  );
};
