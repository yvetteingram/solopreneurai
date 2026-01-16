import React, { useState } from 'react';
import { UserResponses } from '../types';

interface QuestionnaireProps {
  onComplete: (responses: UserResponses) => void;
}

const questions = [
  {
    id: 'userType',
    text: 'Which best describes you?',
    options: [
      'Solopreneur', 
      'Freelancer', 
      'Small business owner', 
      'Agency owner', 
      'Coach or consultant', 
      'E-commerce founder', 
      'Content creator'
    ]
  },
  {
    id: 'focusArea',
    text: 'What do you want help with right now?',
    options: ['Content & marketing', 'Business operations', 'Learning AI basics', 'Clarifying what to build']
  },
  {
    id: 'aiLevel',
    text: 'How comfortable are you with AI tools today?',
    options: ['New to AI', 'Tried a few tools', 'Comfortable but unfocused']
  },
  {
    id: 'priority',
    text: 'What matters most for you this month?',
    options: ['Save time', 'Reduce confusion', 'Launch something', 'Learn AI efficiently']
  }
];

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserResponses>>({});

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [questions[step].id]: option };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers as UserResponses);
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="max-w-xl mx-auto w-full py-12">
      <div className="mb-12">
        <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-slate-900 transition-all duration-500" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Question {step + 1} of 4</p>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">
        {questions[step].text}
      </h2>

      <div className="space-y-3">
        {questions[step].options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="w-full text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all font-medium text-slate-700 shadow-sm"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;