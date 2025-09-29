import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { coinTransactions, getTotalCoins } from '@/data/bucket-list';
import { Coins, TrendingUp, Calendar, Gift } from 'lucide-react';

export const CoinSystem = () => {
  const totalCoins = getTotalCoins();
  const recentTransactions = coinTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const typeIcons = {
    earned: TrendingUp,
    spent: Coins,
    bonus: Gift,
  };

  const typeColors = {
    earned: 'text-green-500',
    spent: 'text-red-500',
    bonus: 'text-blue-500',
  };

  return (
    <div className="space-y-6">
      {/* Coin Balance */}
      <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Coins className="text-yellow-500" size={24} />
            Adventure Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            <AnimatedCounter to={totalCoins} duration={2} />
          </div>
          <p className="text-muted-foreground">
            Earned through completing bucket list adventures
          </p>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => {
              const Icon = typeIcons[transaction.type];
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-background ${typeColors[transaction.type]}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.reason}</p>
                      {transaction.description && (
                        <p className="text-sm text-muted-foreground">
                          {transaction.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar size={12} className="mr-1" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold ${typeColors[transaction.type]}`}>
                      {transaction.type === 'spent' ? '-' : '+'}
                      {transaction.amount}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${typeColors[transaction.type]}`}
                    >
                      {transaction.type}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Coin Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-500">
              {coinTransactions.filter(t => t.type === 'earned').length}
            </div>
            <div className="text-sm text-muted-foreground">Goals Completed</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-500">
              {coinTransactions
                .filter(t => t.type === 'earned')
                .reduce((sum, t) => sum + t.amount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Coins Earned</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-500">
              {coinTransactions
                .filter(t => t.type === 'bonus')
                .reduce((sum, t) => sum + t.amount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Bonus Coins</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
