'use client';

import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertCircle, X, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizAssessment, AssessmentResult } from '@/types';
import { learningEngine } from '@/lib/learning-engine';
import { assessmentEngine } from '@/lib/assessment-engine';

interface AssessmentModalProps {
  quiz: QuizAssessment;
  studentId: string;
  onClose: () => void;
  onSuccess: (result: AssessmentResult) => void;
}

export function AssessmentModal({ quiz, studentId, onClose, onSuccess }: AssessmentModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const res = assessmentEngine.submitAssessment(studentId, quiz.day, answers);
      setResult(res);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };


  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!result ? (
          /* Active Quiz Form */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white">{quiz.title}</h4>
              </div>
              <Badge variant="amber">
                Question {currentQuestionIndex + 1} / {quiz.questions.length}
              </Badge>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-slate-100">{currentQuestion.question}</h5>

              <div className="space-y-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Passing score threshold: 70%</span>
              <Button
                size="sm"
                disabled={selectedAnswer === undefined}
                onClick={handleNext}
                className="font-bold gap-1 px-6"
              >
                <span>{isLastQuestion ? 'Submit Assessment' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          /* Quiz Results View */
          <div className="text-center space-y-4 py-2">
            <div className="flex justify-center">
              <div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center animate-bounce shadow-xl ${
                  result.passed
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-emerald-500/20'
                    : 'bg-rose-500/20 border-rose-400 text-rose-400 shadow-rose-500/20'
                }`}
              >
                {result.passed ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
              </div>
            </div>

            <div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                result.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {result.passed ? '✓ Assessment Passed!' : 'Assessment Retake Needed'}
              </span>
              <h3 className="text-3xl font-black text-white mt-2 font-mono">{result.scorePercent}%</h3>
              <p className="text-xs text-slate-300 mt-1">
                {result.correctCount} of {result.totalQuestions} questions correct (70% required to pass)
              </p>
            </div>

            {result.passed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>BUILD TASK UNLOCKED!</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Great job! You have unlocked today’s TaskFlow project milestone build task.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">
                Not quite yet. Review the highlighted concepts and retake the assessment. Note: Quiz failure does not break your streak!
              </div>
            )}

            <div className="pt-2 flex justify-center gap-3">
              {result.passed ? (
                <Button
                  size="md"
                  onClick={() => onSuccess(result)}
                  className="font-bold px-8 bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg"
                >
                  <span>Proceed to Build Task</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => {
                    setResult(null);
                    setCurrentQuestionIndex(0);
                    setAnswers({});
                  }}
                  className="font-bold gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" /> Retake Assessment
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
