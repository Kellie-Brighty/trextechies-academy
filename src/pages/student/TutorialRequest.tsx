import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { currentUser } from '../../data/mockData';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Target,
  Calendar,
} from 'lucide-react';

type Step = 1 | 2 | 3;

export default function TutorialRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    learningGoals: [''],
    skillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    preferredSchedule: '',
    additionalNotes: '',
  });

  const steps = [
    { number: 1, title: 'Basic Info', icon: FileText },
    { number: 2, title: 'Learning Goals', icon: Target },
    { number: 3, title: 'Schedule', icon: Calendar },
  ];

  const handleAddGoal = () => {
    setFormData({
      ...formData,
      learningGoals: [...formData.learningGoals, ''],
    });
  };

  const handleRemoveGoal = (index: number) => {
    const newGoals = formData.learningGoals.filter((_, i) => i !== index);
    setFormData({ ...formData, learningGoals: newGoals });
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.learningGoals];
    newGoals[index] = value;
    setFormData({ ...formData, learningGoals: newGoals });
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the backend
    console.log('Submitting request:', formData);
    navigate('/student/requests');
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.title.trim() !== '' && formData.description.trim() !== '';
    }
    if (currentStep === 2) {
      return formData.learningGoals.some((goal) => goal.trim() !== '');
    }
    return formData.preferredSchedule.trim() !== '';
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/student/requests')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Requests
          </button>
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Submit Tutorial Request
          </h1>
          <p className="text-gray-600">
            Tell us what you want to learn and we'll create a personalized curriculum for you
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold mb-2 ${
                        isCompleted
                          ? 'bg-green-100 text-green-600'
                          : isActive
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 rounded ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Learn Backend Development"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what you want to learn and why..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Skill Level
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, skillLevel: level })}
                      className={`px-4 py-3 rounded-lg border-2 font-medium capitalize transition-all ${
                        formData.skillLevel === level
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Learning Goals */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to achieve? *
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  List your specific learning goals (at least one required)
                </p>
                <div className="space-y-3">
                  {formData.learningGoals.map((goal, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => handleGoalChange(index, e.target.value)}
                        placeholder={`Goal ${index + 1}: e.g., Build REST APIs`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                      />
                      {formData.learningGoals.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveGoal(index)}
                          className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddGoal}
                  className="mt-3 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
                >
                  + Add Another Goal
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Schedule *
                </label>
                <textarea
                  value={formData.preferredSchedule}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredSchedule: e.target.value })
                  }
                  placeholder="e.g., Evenings and weekends, 10-15 hours per week"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, additionalNotes: e.target.value })
                  }
                  placeholder="Any other information you'd like to share..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Request Summary</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>
                    <p className="font-medium text-gray-900">{formData.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Skill Level:</span>
                    <p className="font-medium text-gray-900 capitalize">
                      {formData.skillLevel}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Learning Goals:</span>
                    <ul className="list-disc list-inside mt-1">
                      {formData.learningGoals
                        .filter((g) => g.trim())
                        .map((goal, i) => (
                          <li key={i} className="text-gray-900">
                            {goal}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((currentStep - 1) as Step)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep((currentStep + 1) as Step)}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Request
            </button>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
