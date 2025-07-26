import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChapterOverview } from './components/course/ChapterOverview';
import { ModuleViewer } from './components/course/ModuleViewer';
import { HomeworkViewer } from './components/course/HomeworkViewer';
import { ProgressDashboard } from './components/course/ProgressDashboard';
import { courseChapters } from './data/courseData';
import { Chapter, Module, HomeworkAssignment, UserProgress } from './types/course';

type ViewType = 'dashboard' | 'chapter' | 'module' | 'homework';

interface ViewState {
  type: ViewType;
  chapterId?: string;
  moduleId?: string;
  homeworkId?: string;
}

function App() {
  const [chapters, setChapters] = useState<Chapter[]>(courseChapters);
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'dashboard' });
  
  // Calculate dynamic user progress
  const calculateOverallProgress = () => {
    const totalModules = chapters.reduce((sum, chapter) => sum + chapter.modules.length, 0);
    const completedModules = chapters.reduce((sum, chapter) => 
      sum + chapter.modules.filter(m => m.completed).length, 0
    );
    return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  };

  const userProgress: UserProgress = {
    userId: 'user-1',
    chaptersCompleted: chapters.filter(ch => ch.completed).map(ch => ch.id),
    modulesCompleted: chapters.flatMap(ch => ch.modules.filter(m => m.completed).map(m => m.id)),
    homeworkCompleted: chapters.flatMap(ch => ch.homework.filter(h => h.completed).map(h => h.id)),
    overallProgress: calculateOverallProgress(),
    certificateEarned: false,
    lastAccessed: new Date().toISOString()
  };

  const handleChapterSelect = (chapterId: string) => {
    setCurrentView({ type: 'chapter', chapterId });
  };

  const handleModuleStart = (moduleId: string) => {
    const chapter = chapters.find(ch => ch.modules.some(m => m.id === moduleId));
    if (chapter) {
      setCurrentView({ type: 'module', chapterId: chapter.id, moduleId });
    }
  };

  const handleHomeworkStart = (homeworkId: string) => {
    const chapter = chapters.find(ch => ch.homework.some(h => h.id === homeworkId));
    if (chapter) {
      setCurrentView({ type: 'homework', chapterId: chapter.id, homeworkId });
    }
  };

  const handleModuleComplete = () => {
    if (currentView.moduleId && currentView.chapterId) {
      setChapters(prev => prev.map(chapter => {
        if (chapter.id === currentView.chapterId) {
          const updatedModules = chapter.modules.map(module => 
            module.id === currentView.moduleId ? { ...module, completed: true } : module
          );
          const completedCount = updatedModules.filter(m => m.completed).length;
          const progress = (completedCount / updatedModules.length) * 100;
          
          return {
            ...chapter,
            modules: updatedModules,
            progress,
            completed: progress === 100
          };
        }
        return chapter;
      }));
    }
  };

  const handleHomeworkSubmit = (submission: any) => {
    if (currentView.homeworkId && currentView.chapterId) {
      setChapters(prev => prev.map(chapter => {
        if (chapter.id === currentView.chapterId) {
          const updatedHomework = chapter.homework.map(hw => 
            hw.id === currentView.homeworkId 
              ? { 
                  ...hw, 
                  completed: true, 
                  submittedAt: new Date().toISOString(),
                  grade: Math.floor(Math.random() * 20) + 80 // Mock grade 80-100
                } 
              : hw
          );
          
          return {
            ...chapter,
            homework: updatedHomework
          };
        }
        return chapter;
      }));
    }
  };

  const handleBackToChapter = () => {
    if (currentView.chapterId) {
      setCurrentView({ type: 'chapter', chapterId: currentView.chapterId });
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView({ type: 'dashboard' });
  };

  const handleResetCourse = () => {
    // Reset all chapters to initial state
    setChapters(courseChapters.map(chapter => ({
      ...chapter,
      completed: false,
      progress: 0,
      modules: chapter.modules.map(module => ({
        ...module,
        completed: false
      })),
      homework: chapter.homework.map(homework => ({
        ...homework,
        completed: false,
        submittedAt: undefined,
        grade: undefined
      }))
    })));
    
    // Return to dashboard
    setCurrentView({ type: 'dashboard' });
  };

  const getCurrentChapter = () => {
    return chapters.find(ch => ch.id === currentView.chapterId);
  };

  const getCurrentModule = () => {
    const chapter = getCurrentChapter();
    return chapter?.modules.find(m => m.id === currentView.moduleId);
  };

  const getCurrentHomework = () => {
    const chapter = getCurrentChapter();
    return chapter?.homework.find(h => h.id === currentView.homeworkId);
  };

  const getNextModule = () => {
    const chapter = getCurrentChapter();
    if (!chapter || !currentView.moduleId) return null;
    
    const currentIndex = chapter.modules.findIndex(m => m.id === currentView.moduleId);
    return currentIndex < chapter.modules.length - 1 ? chapter.modules[currentIndex + 1] : null;
  };

  const handleNextModule = () => {
    const nextModule = getNextModule();
    if (nextModule) {
      setCurrentView({ 
        type: 'module', 
        chapterId: currentView.chapterId, 
        moduleId: nextModule.id 
      });
    }
  };

  const renderMainContent = () => {
    switch (currentView.type) {
      case 'dashboard':
        return (
          <ProgressDashboard 
            chapters={chapters} 
            userProgress={userProgress}
            onResetCourse={handleResetCourse}
          />
        );
      
      case 'chapter': {
        const chapter = getCurrentChapter();
        if (!chapter) return <div>Chapter not found</div>;
        return (
          <ChapterOverview
            chapter={chapter}
            onModuleStart={handleModuleStart}
            onHomeworkStart={handleHomeworkStart}
          />
        );
      }
      
      case 'module': {
        const module = getCurrentModule();
        if (!module) return <div>Module not found</div>;
        const nextModule = getNextModule();
        return (
          <ModuleViewer
            module={module}
            onComplete={handleModuleComplete}
            onBack={handleBackToChapter}
            onNext={nextModule ? handleNextModule : undefined}
            hasNext={!!nextModule}
          />
        );
      }
      
      case 'homework': {
        const homework = getCurrentHomework();
        if (!homework) return <div>Homework not found</div>;
        return (
          <HomeworkViewer
            homework={homework}
            onSubmit={handleHomeworkSubmit}
            onBack={handleBackToChapter}
          />
        );
      }
      
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        chapters={chapters}
        currentChapter={currentView.chapterId || ''}
        onChapterSelect={handleChapterSelect}
        overallProgress={userProgress.overallProgress}
      />
      <main className="flex-1 overflow-y-auto">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;