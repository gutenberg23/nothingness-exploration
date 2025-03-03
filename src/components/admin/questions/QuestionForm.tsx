import React from "react";
import QuestionIdField from "./form/QuestionIdField";
import QuestionMetadataFields from "./form/QuestionMetadataFields";
import QuestionTextFields from "./form/QuestionTextFields";
import QuestionOptions from "./form/QuestionOptions";
import FormSection from "./form/FormSection";
import SubmitButton from "./form/SubmitButton";
import { QuestionOption } from "./types";
interface QuestionFormProps {
  questionId: string;
  year: string;
  setYear: (value: string) => void;
  institution: string;
  setInstitution: (value: string) => void;
  organization: string;
  setOrganization: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  discipline: string;
  setDiscipline: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  questionType: string;
  setQuestionType: (value: string) => void;
  questionText: string;
  setQuestionText: (value: string) => void;
  teacherExplanation: string;
  setTeacherExplanation: (value: string) => void;
  options: QuestionOption[];
  setOptions: (options: QuestionOption[]) => void;
  institutions: string[];
  setInstitutions: (value: string[]) => void;
  organizations: string[];
  setOrganizations: (value: string[]) => void;
  roles: string[];
  setRoles: (value: string[]) => void;
  disciplines: string[];
  setDisciplines: (value: string[]) => void;
  levels: string[];
  setLevels: (value: string[]) => void;
  difficulties: string[];
  setDifficulties: (value: string[]) => void;
  questionTypes: string[];
  setQuestionTypes: (value: string[]) => void;
  years: string[];
  setYears: (value: string[]) => void;
  onSubmit: () => void;
  submitButtonText: string;
  isEditing?: boolean;
}
const QuestionForm: React.FC<QuestionFormProps> = ({
  questionId,
  year,
  setYear,
  institution,
  setInstitution,
  organization,
  setOrganization,
  role,
  setRole,
  discipline,
  setDiscipline,
  level,
  setLevel,
  difficulty,
  setDifficulty,
  questionType,
  setQuestionType,
  questionText,
  setQuestionText,
  teacherExplanation,
  setTeacherExplanation,
  options,
  setOptions,
  institutions,
  setInstitutions,
  organizations,
  setOrganizations,
  roles,
  setRoles,
  disciplines,
  setDisciplines,
  levels,
  setLevels,
  difficulties,
  setDifficulties,
  questionTypes,
  setQuestionTypes,
  years,
  setYears,
  onSubmit,
  submitButtonText,
  isEditing = false
}) => {
  const {
    copyToClipboard
  } = useClipboard();
  return <div className="space-y-6">
      {/* Question ID Field */}
      <QuestionIdField questionId={questionId} copyToClipboard={copyToClipboard} />

      {/* Question Metadata - First Row */}
      <FormSection cols={3}>
        <QuestionMetadataFields institution={institution} setInstitution={setInstitution} institutions={institutions} setInstitutions={setInstitutions} organization={organization} setOrganization={setOrganization} organizations={organizations} setOrganizations={setOrganizations} year={year} setYear={setYear} years={years} setYears={setYears} role={role} setRole={setRole} roles={roles} setRoles={setRoles} discipline={discipline} setDiscipline={setDiscipline} disciplines={disciplines} setDisciplines={setDisciplines} level={level} setLevel={setLevel} levels={levels} setLevels={setLevels} difficulty={difficulty} setDifficulty={setDifficulty} difficulties={difficulties} setDifficulties={setDifficulties} questionType={questionType} setQuestionType={setQuestionType} questionTypes={questionTypes} setQuestionTypes={setQuestionTypes} />
      </FormSection>

      {/* Question Text */}
      <div className="Acima de 'Texto da quest\xE3o', adicione mais um rich text input editor. O t\xEDtulo ser\xE1 'Conte\xFAdo expans\xEDvel'">
        <label htmlFor="question-text" className="block text-sm font-medium text-[#272f3c] mb-1">
          Texto da Questão
        </label>
        <QuestionTextFields questionText={questionText} setQuestionText={setQuestionText} teacherExplanation={null} setTeacherExplanation={null} />
      </div>

      {/* Question Options */}
      {questionType && <QuestionOptions questionType={questionType} options={options} setOptions={setOptions} />}

      {/* Teacher Explanation */}
      <div>
        <label htmlFor="teacher-explanation" className="block text-sm font-medium text-[#272f3c] mb-1">
          Explicação do Professor
        </label>
        <QuestionTextFields questionText={null} setQuestionText={null} teacherExplanation={teacherExplanation} setTeacherExplanation={setTeacherExplanation} />
      </div>

      {/* Submit Button */}
      <SubmitButton onClick={onSubmit} text={submitButtonText} />
    </div>;
};

// Add missing import
import { useClipboard } from "./form/useClipboard";
export default QuestionForm;