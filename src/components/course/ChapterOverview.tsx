import React from 'react';
import { Play, BookOpen, FileText, Brain, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Chapter, Module } from '../../types/course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

interface ChapterOverviewProps {
  chapter: Chapter;
  onModuleStart: (moduleId: string) => void;
  onHomeworkStart: (homeworkId: string) => void;
}

const moduleIcons = {
  video: Play,
  reading: BookOpen,
  interactive: Brain,
  quiz: FileText
};

const moduleColors = {
  video: 'bg-red-100 text-red-700 border-red-200',
  reading: 'bg-blue-100 text-blue-700 border-blue-200',
  interactive: 'bg-purple-100 text-purple-700 border-purple-200',
  quiz: 'bg-green-100 text-green-700 border-green-200'
};

export function ChapterOverview({ chapter, onModuleStart, onHomeworkStart }: ChapterOverviewProps) {
  const completedModules = chapter.modules.filter(m => m.completed).length;
  const completedHomework = chapter.homework.filter(h => h.completed).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Chapter Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <BookOpen className="w-4 h-4" />
          Chapter {chapter.id.split('-')[1]}
        </div>
        <h1 className="text-3xl font-bold">{chapter.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{chapter.description}</p>
        
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{chapter.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span>{chapter.modules.length} modules</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span>{chapter.homework.length} assignments</span>
          </div>
        </div>

        {chapter.progress > 0 && (
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(chapter.progress)}%</span>
            </div>
            <Progress value={chapter.progress} className="h-2" />
          </div>
        )}
      </div>

      <Separator />

      {/* Learning Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Learning Modules</h2>
        <div className="grid gap-4">
          {chapter.modules.map((module, index) => {
            const Icon = moduleIcons[module.type];
            return (
              <Card key={module.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${moduleColors[module.type]}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription className="mt-1">{module.content}</CardDescription>
                      </div>
                    </div>
                    {module.completed && (
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {module.type}
                      </Badge>
                      {module.resources.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {module.resources.length} resources
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={() => onModuleStart(module.id)}
                      variant={module.completed ? "outline" : "default"}
                      size="sm"
                    >
                      {module.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                  
                  {module.resources.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Related Resources:</p>
                      <div className="flex flex-wrap gap-2">
                        {module.resources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            {resource.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Homework Assignments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Homework Assignments</h2>
        <div className="grid gap-4">
          {chapter.homework.map((homework) => (
            <Card key={homework.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{homework.title}</CardTitle>
                    <CardDescription className="mt-1">{homework.description}</CardDescription>
                  </div>
                  {homework.completed && (
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      Due: {new Date(homework.dueDate).toLocaleDateString()}
                    </Badge>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {homework.type.replace('-', ' ')}
                    </Badge>
                    {homework.grade && (
                      <Badge variant="default" className="text-xs">
                        Grade: {homework.grade}%
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => onHomeworkStart(homework.id)}
                    variant={homework.completed ? "outline" : "default"}
                    size="sm"
                  >
                    {homework.completed ? "Review" : "Start Assignment"}
                  </Button>
                </div>
                
                {homework.feedback && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Instructor Feedback:</p>
                    <p className="text-sm text-muted-foreground">{homework.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}