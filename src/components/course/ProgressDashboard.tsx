import React from 'react';
import { Trophy, BookOpen, FileText, Clock, CheckCircle, Award, TrendingUp, RotateCcw } from 'lucide-react';
import { Chapter, UserProgress } from '../../types/course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ProgressDashboardProps {
  chapters: Chapter[];
  userProgress: UserProgress;
  onResetCourse: () => void;
}

export function ProgressDashboard({ chapters, userProgress, onResetCourse }: ProgressDashboardProps) {
  const totalModules = chapters.reduce((sum, chapter) => sum + chapter.modules.length, 0);
  const completedModules = chapters.reduce((sum, chapter) => 
    sum + chapter.modules.filter(m => m.completed).length, 0
  );
  
  const totalHomework = chapters.reduce((sum, chapter) => sum + chapter.homework.length, 0);
  const completedHomework = chapters.reduce((sum, chapter) => 
    sum + chapter.homework.filter(h => h.completed).length, 0
  );

  const completedChapters = chapters.filter(ch => ch.completed).length;
  
  // Calculate average grade from completed homework
  const allHomework = chapters.flatMap(ch => ch.homework);
  const gradedHomework = allHomework.filter(hw => hw.completed && hw.grade);
  const averageGrade = gradedHomework.length > 0 
    ? Math.round(gradedHomework.reduce((sum, hw) => sum + (hw.grade || 0), 0) / gradedHomework.length)
    : 0;

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first module', earned: completedModules > 0 },
    { id: 2, title: 'Dedicated Learner', description: 'Completed 3 chapters', earned: completedChapters >= 3 },
    { id: 3, title: 'Assignment Master', description: 'Submitted 5 homework assignments', earned: completedHomework >= 5 },
    { id: 4, title: 'Tax Professional', description: 'Completed all 8 chapters', earned: completedChapters === 8 },
  ];

  const recentActivity = [
    { type: 'module', title: 'Completed "Tax System Overview"', time: '2 hours ago' },
    { type: 'homework', title: 'Submitted "Ethics Case Study Analysis"', time: '1 day ago' },
    { type: 'module', title: 'Started "Professional Ethics & Standards"', time: '2 days ago' },
    { type: 'chapter', title: 'Completed Chapter 1', time: '3 days ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          Progress Dashboard
        </div>
        <h1 className="text-3xl font-bold">Your Learning Journey</h1>
        <p className="text-lg text-muted-foreground">Track your progress through the Professional Tax Preparation Course</p>
        
        {/* Reset Button */}
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onResetCourse}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Course Progress
          </Button>
        </div>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <BookOpen className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{Math.round(userProgress.overallProgress)}%</div>
              <Progress value={userProgress.overallProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedChapters} of {chapters.length} chapters completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
              <CheckCircle className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{completedModules}</div>
              <Progress value={(completedModules / totalModules) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedModules} of {totalModules} modules
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{completedHomework}</div>
              <Progress value={(completedHomework / totalHomework) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {completedHomework} of {totalHomework} submitted
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Trophy className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{averageGrade}%</div>
              <Progress value={averageGrade} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Excellent performance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chapter Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Chapter Progress</CardTitle>
            <CardDescription>Your progress through each chapter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <div key={chapter.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {chapter.completed ? (
                        <CheckCircle className="w-4 h-4 text-accent" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                      )}
                      <span className="text-sm font-medium">{chapter.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(chapter.progress)}%
                    </span>
                  </div>
                  <Progress value={chapter.progress} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones you've unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-accent/5 border-accent/20' 
                      : 'bg-muted/30 border-muted-foreground/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.earned 
                      ? 'bg-accent text-white' 
                      : 'bg-muted-foreground/20 text-muted-foreground'
                  }`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${
                      achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Badge variant="default" className="text-xs">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'module' ? 'bg-blue-100 text-blue-700' :
                  activity.type === 'homework' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {activity.type === 'module' ? <BookOpen className="w-4 h-4" /> :
                   activity.type === 'homework' ? <FileText className="w-4 h-4" /> :
                   <CheckCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificate Status */}
      {userProgress.certificateEarned ? (
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Award className="w-5 h-5" />
              Congratulations!
            </CardTitle>
            <CardDescription>You have earned your Professional Tax Preparation Certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm">
                You have successfully completed all course requirements and demonstrated proficiency in professional tax preparation.
              </p>
              <Badge variant="default" className="ml-4">
                Certificate Earned
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certificate Progress
            </CardTitle>
            <CardDescription>Complete all requirements to earn your certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Complete all 8 chapters</span>
                <span className={completedChapters === 8 ? 'text-accent' : 'text-muted-foreground'}>
                  {completedChapters}/8 {completedChapters === 8 && '✓'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Submit all homework assignments</span>
                <span className={completedHomework === totalHomework ? 'text-accent' : 'text-muted-foreground'}>
                  {completedHomework}/{totalHomework} {completedHomework === totalHomework && '✓'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Maintain 80% average grade</span>
                <span className={averageGrade >= 80 ? 'text-accent' : 'text-muted-foreground'}>
                  {averageGrade}% {averageGrade >= 80 && '✓'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}