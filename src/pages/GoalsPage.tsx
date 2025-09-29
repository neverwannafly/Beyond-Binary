import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MDRenderer } from '@/components/markdown/MDRenderer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { FadeInView } from '@/components/animations/FadeInView';
import { 
  lifeGoals, 
  getTotalGold, 
  getCompletedGoals, 
  getPendingGoals,
  getGoalByIdWithJournal,
  getTimelineData
} from '@/data/goals';
import { 
  Coins, 
  CheckCircle, 
  Circle, 
  Calendar,
  Target,
  TrendingUp,
  Star,
  Clock
} from 'lucide-react';

export const GoalsPage = () => {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
  const totalGold = getTotalGold();
  const completedGoals = getCompletedGoals();
  const pendingGoals = getPendingGoals();
  const timelineData = getTimelineData();
  
  const selectedGoal = selectedGoalId ? getGoalByIdWithJournal(selectedGoalId) : null;

  const categoryColors = {
    travel: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    adventure: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    learning: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    achievement: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    experience: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    medium: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
  };

  return (
    <PageLayout>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <FadeInView className="text-center mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Life Goals & Gold Tracking 🎯
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Every completed goal earns real gold coins. Click on any goal to explore the journey.
            </motion.p>
          </FadeInView>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-center mb-2">
                  <Coins className="text-yellow-500 mr-2" size={20} />
                  <span className="text-2xl font-bold text-yellow-600">
                    <AnimatedCounter to={totalGold} duration={2} />
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">Gold Coins</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600 mb-2">{completedGoals.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">{pendingGoals.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {Math.round((completedGoals.length / lifeGoals.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Completion</div>
              </CardContent>
            </Card>
          </div>

          {/* Three-Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
            {/* Left Panel - Goals List */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2" size={20} />
                    Life Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto">
                    {lifeGoals.map((goal) => (
                      <motion.div
                        key={goal.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-secondary/50 transition-colors ${
                          selectedGoalId === goal.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                        } ${goal.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                        onClick={() => setSelectedGoalId(goal.id)}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {goal.completed ? (
                              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                            ) : (
                              <Circle className="text-muted-foreground flex-shrink-0" size={20} />
                            )}
                            <h3 className={`font-medium text-sm line-clamp-2 ${
                              goal.completed ? 'line-through text-muted-foreground' : ''
                            }`}>
                              {goal.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Coins size={14} className="text-yellow-500" />
                            <span className="text-sm font-medium">{goal.coinReward}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={categoryColors[goal.category]} variant="secondary">
                            {goal.category}
                          </Badge>
                          <Badge className={priorityColors[goal.priority]} variant="outline">
                            {goal.priority}
                          </Badge>
                        </div>
                        
                        {goal.completed && goal.completedDate && (
                          <div className="flex items-center space-x-1 text-xs text-green-600">
                            <Calendar size={12} />
                            <span>{new Date(goal.completedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center Panel - Content */}
            <div className="lg:col-span-8">
              <Card className="h-full">
                <CardContent className="p-6 h-full">
                  {selectedGoal ? (
                    <div className="h-full">
                      {selectedGoal.blogContent ? (
                        <div className="max-h-[500px] overflow-y-auto">
                          <MDRenderer content={selectedGoal.blogContent} />
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold mb-4">{selectedGoal.title}</h2>
                            <p className="text-muted-foreground mb-4">{selectedGoal.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Coins className="text-yellow-500" size={16} />
                                <span className="font-medium">Gold Reward:</span>
                                <span>{selectedGoal.coinReward} coins</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <TrendingUp size={16} />
                                <span className="font-medium">Priority:</span>
                                <Badge className={priorityColors[selectedGoal.priority]}>
                                  {selectedGoal.priority}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Star size={16} />
                                <span className="font-medium">Difficulty:</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={i < selectedGoal.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {selectedGoal.location && (
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">Location:</span>
                                  <span className="text-muted-foreground">{selectedGoal.location}</span>
                                </div>
                              )}
                              
                              {selectedGoal.estimatedCost && selectedGoal.estimatedCost > 0 && (
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">Est. Cost:</span>
                                  <span className="text-muted-foreground">${selectedGoal.estimatedCost}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {selectedGoal.tags.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Tags:</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedGoal.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {!selectedGoal.completed && (
                            <div className="pt-4">
                              <Button className="w-full">
                                <Clock size={16} className="mr-2" />
                                Track Progress
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">Select a Goal</h3>
                        <p className="text-muted-foreground">
                          Click on any goal from the left panel to explore the details and journey.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timeline Chart */}
          <FadeInView className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  Gold Earning Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineData.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-secondary/30 rounded-lg"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                        <Coins className="text-yellow-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{entry.goal?.title}</h4>
                        <p className="text-sm text-muted-foreground">{entry.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-600">+{entry.amount}</div>
                        <div className="text-xs text-muted-foreground">gold</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInView>
        </div>
      </section>
    </PageLayout>
  );
};
