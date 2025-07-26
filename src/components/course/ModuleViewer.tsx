import React, { useState } from 'react';
import { Play, BookOpen, Brain, FileText, CheckCircle, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { Module } from '../../types/course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

interface ModuleViewerProps {
  module: Module;
  onComplete: () => void;
  onBack: () => void;
  onNext?: () => void;
  hasNext?: boolean;
}

const moduleIcons = {
  video: Play,
  reading: BookOpen,
  interactive: Brain,
  quiz: FileText
};

export function ModuleViewer({ module, onComplete, onBack, onNext, hasNext }: ModuleViewerProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(module.completed);
  
  const Icon = moduleIcons[module.type];

  const handleComplete = () => {
    setIsCompleted(true);
    setProgress(100);
    onComplete();
  };

  const simulateProgress = () => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  React.useEffect(() => {
    if (!isCompleted) {
      simulateProgress();
    } else {
      setProgress(100);
    }
  }, [isCompleted]);

  const renderModuleContent = () => {
    switch (module.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
              <div className="text-center space-y-4 p-8">
                <div className="relative">
                  <Play className="w-20 h-20 text-primary mx-auto drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">HD</span>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">Professional Video Lesson</p>
                  <p className="text-gray-600 mt-2 max-w-md mx-auto">{module.content}</p>
                  <p className="text-sm text-gray-500 mt-1">Duration: {module.duration}</p>
                </div>
                <Button onClick={simulateProgress} size="lg" className="mt-4 shadow-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Start Video Lesson
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Understand the fundamental concepts covered in this module</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Apply knowledge to real-world tax preparation scenarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Identify key resources and reference materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Master professional best practices and standards</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📝 What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {module.id === 'mod-1-1' && (
                      <ul className="space-y-2 text-sm">
                        <li>• Structure of the U.S. federal tax system</li>
                        <li>• Key tax principles and concepts</li>
                        <li>• Role of tax professionals in the system</li>
                        <li>• Overview of major tax forms and schedules</li>
                      </ul>
                    )}
                    {module.id === 'mod-2-1' && (
                      <ul className="space-y-2 text-sm">
                        <li>• Single vs. Married Filing Jointly/Separately</li>
                        <li>• Head of Household qualifications</li>
                        <li>• Qualifying Widow(er) status</li>
                        <li>• Impact of filing status on tax liability</li>
                      </ul>
                    )}
                    {module.id === 'mod-3-1' && (
                      <ul className="space-y-2 text-sm">
                        <li>• Standard deduction amounts by filing status</li>
                        <li>• When itemizing provides greater benefit</li>
                        <li>• Common itemized deductions</li>
                        <li>• Strategies for maximizing deductions</li>
                      </ul>
                    )}
                    {!['mod-1-1', 'mod-2-1', 'mod-3-1'].includes(module.id) && (
                      <ul className="space-y-2 text-sm">
                        <li>• Core concepts and terminology</li>
                        <li>• Practical application techniques</li>
                        <li>• Common mistakes to avoid</li>
                        <li>• Professional tips and strategies</li>
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {progress > 0 && progress < 100 && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Video in progress...</p>
                      <p className="text-xs text-blue-700">Continue watching to complete this module</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'reading':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>📖 Reading Material</CardTitle>
                <CardDescription>{module.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none space-y-4">
                  {module.id === 'mod-1-2' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">AICPA Code of Professional Conduct</h4>
                      <p>The AICPA Code of Professional Conduct establishes the fundamental principles that guide tax professionals:</p>
                      <ul className="space-y-2">
                        <li><strong>Integrity:</strong> Be honest and candid within the constraints of client confidentiality</li>
                        <li><strong>Objectivity:</strong> Maintain impartiality and intellectual honesty</li>
                        <li><strong>Professional Competence:</strong> Maintain knowledge and skill at required levels</li>
                        <li><strong>Due Care:</strong> Act diligently and in accordance with applicable standards</li>
                        <li><strong>Professional Behavior:</strong> Comply with relevant laws and regulations</li>
                      </ul>
                      
                      <h4 className="text-lg font-semibold">IRS Circular 230 Requirements</h4>
                      <p>Circular 230 governs practice before the IRS and establishes standards for:</p>
                      <ul className="space-y-2">
                        <li>Who may practice before the IRS</li>
                        <li>Duties and restrictions relating to practice</li>
                        <li>Sanctions for violations</li>
                        <li>Rules applicable to disciplinary proceedings</li>
                      </ul>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-900">Key Takeaway</h5>
                        <p className="text-blue-800">Professional ethics are not just guidelines—they are legal requirements that protect both you and your clients. Violations can result in penalties, suspension, or loss of practice privileges.</p>
                      </div>
                    </div>
                  )}
                  
                  {module.id === 'mod-2-2' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Types of Income for Individual Taxpayers</h4>
                      
                      <div className="grid gap-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-semibold text-green-700">Earned Income</h5>
                          <ul className="mt-2 space-y-1">
                            <li>• Wages, salaries, tips (Form W-2)</li>
                            <li>• Self-employment income (Schedule C)</li>
                            <li>• Partnership income (Schedule K-1)</li>
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h5 className="font-semibold text-blue-700">Investment Income</h5>
                          <ul className="mt-2 space-y-1">
                            <li>• Interest income (Form 1099-INT)</li>
                            <li>• Dividend income (Form 1099-DIV)</li>
                            <li>• Capital gains/losses (Form 1099-B)</li>
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h5 className="font-semibold text-purple-700">Other Income</h5>
                          <ul className="mt-2 space-y-1">
                            <li>• Retirement distributions (Form 1099-R)</li>
                            <li>• Unemployment compensation (Form 1099-G)</li>
                            <li>• Rental income (Schedule E)</li>
                            <li>• Gambling winnings (Form W-2G)</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-yellow-900">Pro Tip</h5>
                        <p className="text-yellow-800">Always verify that all income sources are reported. Missing income is one of the most common causes of IRS notices and audits.</p>
                      </div>
                    </div>
                  )}
                  
                  {module.id === 'mod-3-3' && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Major Tax Credits Overview</h4>
                      
                      <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                          <h5 className="font-semibold">Child Tax Credit</h5>
                          <p>Up to $2,000 per qualifying child under 17. Partially refundable up to $1,600.</p>
                          <p className="text-sm text-gray-600">Income limits: Begins phasing out at $200,000 (single) / $400,000 (married filing jointly)</p>
                        </div>
                        
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h5 className="font-semibold">Earned Income Tax Credit (EITC)</h5>
                          <p>Refundable credit for low-to-moderate income working individuals and families.</p>
                          <p className="text-sm text-gray-600">Maximum credit varies by number of qualifying children and filing status</p>
                        </div>
                        
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h5 className="font-semibold">American Opportunity Tax Credit</h5>
                          <p>Up to $2,500 per student for qualified education expenses. 40% refundable.</p>
                          <p className="text-sm text-gray-600">Available for first 4 years of post-secondary education</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Default content for other modules */}
                  {!['mod-1-2', 'mod-2-2', 'mod-3-3'].includes(module.id) && (
                    <div className="space-y-4">
                      <p className="text-lg">{module.content}</p>
                      <p>This comprehensive reading module covers essential concepts that every tax professional must understand. The material is sourced from authoritative publications including IRS guidelines and AICPA standards.</p>
                      
                      <h4>Key Learning Objectives:</h4>
                      <ul className="space-y-2">
                        <li>• Understand regulatory requirements and compliance standards</li>
                        <li>• Learn best practices for professional tax preparation</li>
                        <li>• Identify common scenarios and their proper handling</li>
                        <li>• Master documentation and record-keeping requirements</li>
                      </ul>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold">Study Tips:</h5>
                        <ul className="mt-2 space-y-1">
                          <li>• Take detailed notes on key concepts and definitions</li>
                          <li>• Review the linked resources for additional context</li>
                          <li>• Consider how these concepts apply to real client situations</li>
                          <li>• Complete the practice exercises to reinforce learning</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'interactive':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Interactive Exercise
                </CardTitle>
                <CardDescription>{module.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Scenario:</h4>
                    <p className="text-sm">A client comes to you with multiple income sources including W-2 wages, freelance income, and rental property. They want to know the best way to organize their tax documents and maximize their deductions.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Your Task:</h4>
                    <div className="grid gap-3">
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="text-left">
                          <div className="font-medium">Step 1: Document Organization</div>
                          <div className="text-sm text-muted-foreground">Categorize income sources and supporting documents</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="text-left">
                          <div className="font-medium">Step 2: Deduction Analysis</div>
                          <div className="text-sm text-muted-foreground">Identify potential deductions for each income type</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="text-left">
                          <div className="font-medium">Step 3: Tax Strategy</div>
                          <div className="text-sm text-muted-foreground">Recommend optimal filing approach</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <FileText className="w-5 h-5" />
                  Knowledge Assessment
                </CardTitle>
                <CardDescription className="text-green-700">{module.content}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">Question 1 of 5</Badge>
                    <div className="text-sm text-muted-foreground">5 minutes remaining</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-lg mb-3">
                        {module.id === 'mod-1-4' ? 
                          'Which of the following is a fundamental principle of the AICPA Code of Professional Conduct?' :
                          module.id === 'mod-2-4' ?
                          'A married couple wants to file separately. In which situation would this be most beneficial?' :
                          module.id === 'mod-3-4' ?
                          'A taxpayer has $8,000 in itemized deductions and the standard deduction is $13,850. What should they do?' :
                          'Which of the following is NOT a requirement for claiming the home office deduction?'
                        }
                      </h4>
                      
                      <div className="space-y-3">
                        {(module.id === 'mod-1-4' ? [
                          'Always maximize client deductions regardless of documentation',
                          'Maintain integrity and objectivity in all professional services',
                          'Charge the highest possible fees for tax preparation',
                          'Only work with high-income clients'
                        ] : module.id === 'mod-2-4' ? [
                          'When both spouses have similar high incomes',
                          'When one spouse has significant medical expenses',
                          'When they want to split their refund equally',
                          'When they file in different states'
                        ] : module.id === 'mod-3-4' ? [
                          'Take the standard deduction since it is higher',
                          'Itemize deductions to get the $8,000',
                          'Split the difference and claim $10,925',
                          'File an amended return later'
                        ] : [
                          'The space must be used regularly and exclusively for business',
                          'The space must be your principal place of business',
                          'The space must be at least 200 square feet',
                          'The space must be used to meet clients or customers'
                        ]).map((option, index) => (
                          <Button key={index} variant="outline" className="justify-start h-auto p-4 w-full hover:bg-blue-50 hover:border-blue-300 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center font-semibold">
                                <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                              </div>
                              <span className="text-left text-sm">{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">💡 Study Tip</h5>
                      <p className="text-blue-800 text-sm">
                        {module.id === 'mod-1-4' ? 
                          'Remember that professional ethics are legally binding requirements, not just suggestions.' :
                          module.id === 'mod-2-4' ?
                          'Consider each spouse\'s individual tax situation when determining optimal filing status.' :
                          module.id === 'mod-3-4' ?
                          'Always choose the option that results in the lowest tax liability for the client.' :
                          'The home office deduction has specific IRS requirements - there is no minimum square footage requirement.'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button variant="outline" disabled>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline">Skip Question</Button>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Submit Answer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Assessment Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Questions Completed</span>
                    <span className="font-medium">0 of 5</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Passing Score: 80%</span>
                    <span>Time Limit: 15 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Module content not available</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter
        </Button>
        <div className="flex items-center gap-2">
          {isCompleted && <CheckCircle className="w-5 h-5 text-accent" />}
          <Badge variant={isCompleted ? "default" : "secondary"}>
            {isCompleted ? "Completed" : "In Progress"}
          </Badge>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
          module.type === 'video' ? 'bg-red-100 text-red-700' :
          module.type === 'reading' ? 'bg-blue-100 text-blue-700' :
          module.type === 'interactive' ? 'bg-purple-100 text-purple-700' :
          'bg-green-100 text-green-700'
        }`}>
          <Icon className="w-4 h-4" />
          {module.type.charAt(0).toUpperCase() + module.type.slice(1)} Module
        </div>
        <h1 className="text-3xl font-bold">{module.title}</h1>
        <p className="text-lg text-muted-foreground">{module.duration}</p>
        
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Separator />

      {/* Module Content */}
      {renderModuleContent()}

      {/* Resources */}
      {module.resources.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Additional Resources</h2>
            <div className="grid gap-3">
              {module.resources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {resource.type.toUpperCase()}
                        </Badge>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline text-sm"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chapter
        </Button>
        <div className="flex items-center gap-3">
          {!isCompleted && (
            <Button onClick={handleComplete}>
              Mark as Complete
            </Button>
          )}
          {hasNext && (
            <Button onClick={onNext} variant="outline">
              Next Module
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}