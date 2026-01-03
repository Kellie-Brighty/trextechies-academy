import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import {
  Save,
  Plus,
  GripVertical,
  Trash2,
  Video,
  FileText,
  Code,
  HelpCircle,
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'exercise' | 'quiz';
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default function CurriculumEditor() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'm1',
      title: 'Introduction to React',
      description: 'Understanding the basics of React and components.',
      lessons: [
        { id: 'l1', title: 'What is React?', type: 'video', description: 'Brief overview' },
      ],
    },
  ]);

  const addModule = () => {
    const newModule: Module = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Module',
      description: '',
      lessons: [],
    };
    setModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [
            ...m.lessons,
            {
              id: Math.random().toString(36).substr(2, 9),
              title: 'New Lesson',
              type: 'video',
              description: '',
            },
          ],
        };
      }
      return m;
    }));
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId),
        };
      }
      return m;
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Curriculum Editor
            </h1>
            <p className="text-gray-600">
              Design and structure your learning paths.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-shadow">
            <Save className="w-5 h-5" />
            Publish Changes
          </button>
        </div>

        <div className="space-y-6 mb-12">
          {modules.map((module, mIdx) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-4">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                <div className="flex-1">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => {
                      const newModules = [...modules];
                      newModules[mIdx].title = e.target.value;
                      setModules(newModules);
                    }}
                    className="bg-transparent border-none text-lg font-bold text-gray-900 focus:ring-0 w-full p-0"
                    placeholder="Module Title"
                  />
                </div>
                <button
                  onClick={() => removeModule(module.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <textarea
                  value={module.description}
                  onChange={(e) => {
                    const newModules = [...modules];
                    newModules[mIdx].description = e.target.value;
                    setModules(newModules);
                  }}
                   className="w-full text-sm text-gray-600 border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                   placeholder="Module description..."
                   rows={2}
                />

                <div className="space-y-3">
                  {module.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg group hover:border-primary-200 transition-colors">
                      <GripVertical className="w-4 h-4 text-gray-300" />
                      
                      <div className="p-2 bg-gray-50 rounded text-gray-500">
                        {lesson.type === 'video' && <Video className="w-4 h-4" />}
                        {lesson.type === 'article' && <FileText className="w-4 h-4" />}
                        {lesson.type === 'exercise' && <Code className="w-4 h-4" />}
                        {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4" />}
                      </div>

                      <div className="flex-1">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => {
                            const newModules = [...modules];
                            newModules[mIdx].lessons[lIdx].title = e.target.value;
                            setModules(newModules);
                          }}
                          className="bg-transparent border-none text-sm font-medium text-gray-900 focus:ring-0 w-full p-0"
                          placeholder="Lesson Title"
                        />
                      </div>

                      <select
                        value={lesson.type}
                        onChange={(e) => {
                          const newModules = [...modules];
                          newModules[mIdx].lessons[lIdx].type = e.target.value as any;
                          setModules(newModules);
                        }}
                        className="text-xs bg-gray-50 border-gray-200 rounded p-1"
                      >
                        <option value="video">Video</option>
                        <option value="article">Article</option>
                        <option value="exercise">Exercise</option>
                        <option value="quiz">Quiz</option>
                      </select>

                      <button
                        onClick={() => removeLesson(module.id, lesson.id)}
                        className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addLesson(module.id)}
                  className="flex items-center gap-2 text-sm text-primary-600 font-bold hover:text-primary-700 transition-colors pt-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addModule}
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:border-primary-300 hover:text-primary-500 hover:bg-primary-50 transition-all"
          >
            + Add New Module
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
