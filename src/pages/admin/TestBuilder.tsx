import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  Save,
  Trash2,
  Settings,
  Layout,
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'checkbox' | 'essay';
  options?: string[];
}

export default function TestBuilder() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q1',
      text: 'What is React?',
      type: 'multiple-choice',
      options: ['A Library', 'A Framework', 'A Language', 'A Database'],
    },
  ]);

  const addQuestion = () => {
    const newQ: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
    };
    setQuestions([...questions, newQ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Test Builder
            </h1>
            <p className="text-gray-600">
              Create assessments to verify student knowledge.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-shadow">
            <Save className="w-5 h-5" />
            Save Test
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {questions.map((q, qIdx) => (
              <div key={q.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Question {qIdx + 1}</label>
                    <textarea
                      value={q.text}
                      onChange={(e) => {
                        const newQs = [...questions];
                        newQs[qIdx].text = e.target.value;
                        setQuestions(newQs);
                      }}
                      className="w-full text-lg font-medium text-gray-900 border-none focus:ring-0 p-0 placeholder-gray-300"
                      placeholder="Enter your question here..."
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-4 border-t border-gray-50 pt-4">
                  <select
                    value={q.type}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[qIdx].type = e.target.value as any;
                      setQuestions(newQs);
                    }}
                    className="text-sm bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:ring-primary-500"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="essay">Essay</option>
                  </select>
                </div>

                {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                  <div className="space-y-2 pl-4 border-l-2 border-primary-100">
                    {q.options?.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${q.type === 'multiple-choice' ? 'rounded-full' : 'rounded'} border-gray-200`} />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newQs = [...questions];
                            if (newQs[qIdx].options) {
                              newQs[qIdx].options![optIdx] = e.target.value;
                              setQuestions(newQs);
                            }
                          }}
                          className="flex-1 text-sm text-gray-600 border-none focus:ring-0 p-1 placeholder-gray-300"
                          placeholder={`Option ${optIdx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addQuestion}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-primary-300 hover:text-primary-500 hover:bg-primary-50 transition-all"
            >
              + Add Question
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                Test Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (minutes)</label>
                  <input type="number" defaultValue={45} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pass Percentage</label>
                  <input type="number" defaultValue={80} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="shuffle" className="rounded text-primary-600" />
                  <label htmlFor="shuffle" className="text-sm text-gray-600">Shuffle questions</label>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
              <h3 className="font-bold text-primary-900 mb-2 flex items-center gap-2">
                <Layout className="w-5 h-5 text-primary-500" />
                Tips
              </h3>
              <p className="text-sm text-primary-800 leading-relaxed">
                Aim for a mix of multiple choice and essay questions to thoroughly assess student knowledge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
