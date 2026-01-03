import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { mockCurricula } from '../../data/mockData';
import {
  ChevronRight,
  ChevronLeft,
  Timer,
  CheckCircle2,
} from 'lucide-react';

// Mock Test Data
const mockTestData = {
  id: 'test-1',
  curriculumId: 'curr-1',
  title: 'Fullstack Web Development Final Assessment',
  durationMinutes: 45,
  questions: [
    {
      id: 'q1',
      text: 'What is the purpose of the `useEffect` hook in React?',
      options: [
        'To manage global state',
        'To perform side effects in functional components',
        'To styling components',
        'To navigate between pages',
      ],
      type: 'multiple-choice',
    },
    {
      id: 'q2',
      text: 'Explain the difference between SQL and NoSQL databases.',
      type: 'essay',
    },
    {
      id: 'q3',
      text: 'Which of the following are CSS layout modules? (Select all that apply)',
      options: [
        'Flexbox',
        'Redux',
        'Grid',
        'Prisma',
      ],
      type: 'checkbox',
    },
  ],
};

export default function TakeTest() {
  const { curriculumId } = useParams<{ curriculumId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mockTestData.durationMinutes * 60);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const curriculum = mockCurricula.find((c) => c.id === curriculumId);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your test?')) {
      setIsSubmitted(true);
      // In a real app, send answers to server
    }
  };

  if (isSubmitted) {
    return (
      <StudentLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Your assessment has been received. Our instructors will review your essay questions and provide feedback within 48 hours.
          </p>
          <button
            onClick={() => navigate('/student/dashboard')}
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </StudentLayout>
    );
  }

  const currentQuestion = mockTestData.questions[currentQuestionIndex];

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {mockTestData.title}
            </h1>
            <p className="text-gray-600">{curriculum?.title}</p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xl font-bold ${
            timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-900'
          }`}>
            <Timer className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {mockTestData.questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / mockTestData.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / mockTestData.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {currentQuestion.text}
          </h3>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    answers[currentQuestion.id] === option
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    className="w-5 h-5 text-primary-600"
                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                    checked={answers[currentQuestion.id] === option}
                  />
                  <span className="text-gray-900 font-medium">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'essay' && (
            <textarea
              className="w-full h-48 p-4 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none font-medium text-gray-900"
              placeholder="Type your answer here..."
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              value={answers[currentQuestion.id] || ''}
            />
          )}

          {currentQuestion.type === 'checkbox' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    (answers[currentQuestion.id] || []).includes(option)
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-600 rounded"
                    onChange={(e) => {
                      const current = answers[currentQuestion.id] || [];
                      const next = e.target.checked
                        ? [...current, option]
                        : current.filter((i: string) => i !== option);
                      handleAnswerChange(currentQuestion.id, next);
                    }}
                    checked={(answers[currentQuestion.id] || []).includes(option)}
                  />
                  <span className="text-gray-900 font-medium">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          {currentQuestionIndex < mockTestData.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Next Question
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
