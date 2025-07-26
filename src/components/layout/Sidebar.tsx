import React from 'react';
import { BookOpen, CheckCircle, Clock, FileText, Award, ExternalLink } from 'lucide-react';
import { Chapter } from '../../types/course';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

interface SidebarProps {
  chapters: Chapter[];
  currentChapter: string;
  onChapterSelect: (chapterId: string) => void;
  overallProgress: number;
}

export function Sidebar({ chapters, currentChapter, onChapterSelect, overallProgress }: SidebarProps) {
  const completedChapters = chapters.filter(ch => ch.completed).length;

  return (
    <div className="w-80 bg-card border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 course-gradient rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Tax Preparation Course</h1>
            <p className="text-sm text-muted-foreground">Professional Certification</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{completedChapters}/{chapters.length} chapters</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{Math.round(overallProgress)}% complete</p>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Course Chapters</h2>
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => onChapterSelect(chapter.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                currentChapter === chapter.id ? 'bg-primary/10 border border-primary/20' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {chapter.completed ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-tight mb-1">{chapter.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{chapter.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {chapter.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {chapter.modules.length} modules
                    </Badge>
                  </div>
                  {chapter.progress > 0 && !chapter.completed && (
                    <Progress value={chapter.progress} className="h-1 mt-2" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick Links</h2>
          <a
            href="https://www.irs.gov/forms-pubs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            IRS Forms & Publications
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
          <a
            href="https://www.aicpa.org/resources/download/tax-practice-guides"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
          >
            <Award className="w-4 h-4" />
            AICPA Tax Guides
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}