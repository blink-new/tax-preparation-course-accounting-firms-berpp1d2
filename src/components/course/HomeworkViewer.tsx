import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { HomeworkAssignment } from '../../types/course';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

interface HomeworkViewerProps {
  homework: HomeworkAssignment;
  onSubmit: (submission: any) => void;
  onBack: () => void;
}

export function HomeworkViewer({ homework, onSubmit, onBack }: HomeworkViewerProps) {
  const [submission, setSubmission] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(homework.completed);

  const handleSubmit = () => {
    const submissionData = {
      text: submission,
      files: files,
      submittedAt: new Date().toISOString()
    };
    onSubmit(submissionData);
    setIsSubmitted(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const renderAssignmentContent = () => {
    switch (homework.type) {
      case 'form-practice':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Form Practice Exercise</CardTitle>
                <CardDescription>
                  Complete the following tax forms using the provided scenarios. Upload your completed forms and provide explanations for your decisions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Scenario 1: Single Filer with W-2 Income</h4>
                  <p className="text-sm text-muted-foreground">
                    Client: Sarah Johnson, Age 28, Single<br/>
                    W-2 Income: $65,000<br/>
                    Federal Tax Withheld: $8,500<br/>
                    Student Loan Interest Paid: $2,400<br/>
                    State Tax Withheld: $3,200
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="form-explanation">Explain your approach to completing Form 1040:</Label>
                  <Textarea
                    id="form-explanation"
                    placeholder="Describe your step-by-step process, including how you determined filing status, calculated deductions, and applied credits..."
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Upload Completed Forms:</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your completed Form 1040 and supporting schedules
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files:</Label>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'case-study':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ethics Case Study Analysis</CardTitle>
                <CardDescription>
                  Analyze the following ethical scenarios and provide your professional recommendations based on AICPA guidelines and IRS Circular 230.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Case 1: Conflicting Client Interests</h4>
                    <p className="text-sm text-muted-foreground">
                      You are preparing tax returns for a married couple who are in the process of divorce. The husband asks you to maximize his deductions while minimizing the wife's, even though this would result in a higher overall tax liability for the family. How do you handle this situation?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case1-analysis">Your Analysis and Recommendation:</Label>
                    <Textarea
                      id="case1-analysis"
                      placeholder="Analyze the ethical considerations, cite relevant professional standards, and provide your recommended course of action..."
                      rows={4}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Case 2: Questionable Deductions</h4>
                    <p className="text-sm text-muted-foreground">
                      A long-time client provides you with receipts for business expenses that seem excessive and potentially personal in nature. When questioned, the client becomes defensive and threatens to find another tax preparer. What is your professional obligation?
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case2-analysis">Your Analysis and Recommendation:</Label>
                    <Textarea
                      id="case2-analysis"
                      placeholder="Consider due diligence requirements, professional skepticism, and client relationship management..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overall-reflection">Overall Reflection:</Label>
                  <Textarea
                    id="overall-reflection"
                    placeholder="Reflect on how these scenarios relate to your professional development and the importance of ethical decision-making in tax practice..."
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'calculation':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Exercise</CardTitle>
                <CardDescription>
                  Perform detailed tax calculations for the given scenarios. Show your work and explain your methodology.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Investment Portfolio Analysis</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Client:</strong> Investment Portfolio with Multiple Transactions</p>
                    <p><strong>Stock A:</strong> Purchased 100 shares at $50/share on 1/15/2023, Sold 100 shares at $75/share on 6/15/2023</p>
                    <p><strong>Stock B:</strong> Purchased 200 shares at $25/share on 3/1/2023, Sold 50 shares at $30/share on 11/1/2023</p>
                    <p><strong>Mutual Fund:</strong> Purchased $10,000 on 2/1/2023, Sold $3,000 on 12/1/2023 (FIFO method)</p>
                    <p><strong>Dividends Received:</strong> $1,200 qualified dividends</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calculations">Show Your Calculations:</Label>
                    <Textarea
                      id="calculations"
                      placeholder="Calculate capital gains/losses for each transaction, determine short-term vs long-term treatment, and compute the net capital gain/loss..."
                      value={submission}
                      onChange={(e) => setSubmission(e.target.value)}
                      rows={8}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="short-term">Short-term Capital Gain/Loss:</Label>
                      <Input id="short-term" placeholder="$0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="long-term">Long-term Capital Gain/Loss:</Label>
                      <Input id="long-term" placeholder="$0.00" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'research':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Portfolio Development</CardTitle>
                <CardDescription>
                  Create a comprehensive professional portfolio that demonstrates your tax preparation competencies and commitment to professional development.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Portfolio Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                    <li>• Professional resume highlighting tax preparation skills</li>
                    <li>• Sample tax returns demonstrating various scenarios</li>
                    <li>• Research paper on a current tax law change</li>
                    <li>• Professional development plan for continuing education</li>
                    <li>• Client communication templates and best practices</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio-description">Portfolio Description and Reflection:</Label>
                  <Textarea
                    id="portfolio-description"
                    placeholder="Describe your portfolio contents, explain how each component demonstrates your professional competency, and reflect on your learning journey throughout this course..."
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Upload Portfolio Files:</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your complete professional portfolio
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Assignment content not available</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter
        </Button>
        <div className="flex items-center gap-2">
          {isSubmitted && <CheckCircle className="w-5 h-5 text-accent" />}
          <Badge variant={isSubmitted ? "default" : "secondary"}>
            {isSubmitted ? "Submitted" : "In Progress"}
          </Badge>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
          <FileText className="w-4 h-4" />
          Homework Assignment
        </div>
        <h1 className="text-3xl font-bold">{homework.title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{homework.description}</p>
        
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Due: {new Date(homework.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Type: {homework.type.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Assignment Content */}
      {renderAssignmentContent()}

      {/* Submission Status */}
      {homework.completed && homework.grade && (
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">Assignment Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span>Grade: {homework.grade}%</span>
              <span>Submitted: {homework.submittedAt ? new Date(homework.submittedAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            {homework.feedback && (
              <div>
                <h4 className="font-medium mb-2">Instructor Feedback:</h4>
                <p className="text-sm text-muted-foreground">{homework.feedback}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="flex justify-center pt-6 border-t">
          <Button onClick={handleSubmit} size="lg" className="px-8">
            Submit Assignment
          </Button>
        </div>
      )}
    </div>
  );
}