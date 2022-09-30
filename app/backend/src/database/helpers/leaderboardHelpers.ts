const calculateGoals = (matches: any) => {
  const goalsDone = matches.reduce((currM: number, nextM: any) => currM + nextM.homeTeamGoals, 0);
  const goalsTaken = matches.reduce((currM: number, nextM: any) => currM + nextM.awayTeamGoals, 0);
  const goalsBalance = goalsDone - goalsTaken;
  return [goalsDone, goalsTaken, goalsBalance];
};

const calculateMatchResults = (matches: any) => {
  let wins = 0;
  let draws = 0;
  let losses = 0;
  let total = 0;

  matches.forEach((match: any) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      wins += 1; total += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    } else {
      draws += 1; total += 1;
    }
  });
  return [wins, draws, losses, total];
};

const calculateEfficiency = (allPoints: number, allMatches: number) => {
  const efficiency = (allPoints / (allMatches * 3)) * 100;
  return efficiency;
};

const generateLeaderboard = ({ teamName, matchesHome }: any) => {
  const [goalsDone, goalsTaken, balance] = calculateGoals(matchesHome);
  const [wins, draws, losses, total] = calculateMatchResults(matchesHome);
  const teamEfficiency = calculateEfficiency(total, matchesHome.length);

  return {
    name: teamName,
    totalPoints: total,
    totalGames: matchesHome.length,
    totalVictories: wins,
    totalDraws: draws,
    totalLosses: losses,
    goalsFavor: goalsDone,
    goalsOwn: goalsTaken,
    goalsBalance: balance,
    efficiency: Number(teamEfficiency).toFixed(2),
  };
};

const sortLeaderboard = (leaderboard: any) => {
  const sort = leaderboard.sort((a: any, b: any) => {
    if (a.totalPoints < b.totalPoints) { return 1; }
    if (a.totalPoints > b.totalPoints) { return -1; }
    if (a.totalVictories < b.totalVictories) { return 1; }
    if (a.totalVictories > b.totalVictories) { return -1; }
    if (a.goalsBalance < b.goalsBalance) { return 1; }
    if (a.goalsBalance > b.goalsBalance) { return -1; }
    if (a.goalsFavor < b.goalsFavor) { return 1; }
    if (a.goalsFavor > b.goalsFavor) { return -1; }
    if (a.goalsOwn < b.goalsOwn) { return 1; }
    if (a.goalsOwn > b.goalsOwn) { return -1; }
    return 0;
  });
  return sort;
};

export { generateLeaderboard, sortLeaderboard };
