const calculateGoals = (home: any, away: any) => {
  const goalsDone = home.goalsFavor + away.goalsFavor;
  const goalsTaken = home.goalsOwn + away.goalsOwn;
  const goalsBalance = goalsDone - goalsTaken;
  return { goalsFavor: goalsDone, goalsOwn: goalsTaken, goalsBalance };
};

const calculateMatchResults = (home: any, away: any) => {
  const results = {
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    totalPoints: home.totalPoints + away.totalPoints,
  };
  return results;
};

const calculateEfficiency = (home: any, away: any) => {
  const totalPoints = (home.totalPoints + away.totalPoints);
  const totalGames = (home.totalGames + away.totalGames);
  return Number(((totalPoints / (totalGames * 3)) * 100)).toFixed(2);
};

const generateMainLeaderboard = (home: any, away: any) => {
  const leaderboard = [] as any;
  home.forEach((teamHome: any, index: number) => {
    const teamAway = away[index];
    const totalGames = teamHome.totalGames + teamAway.totalGames;
    const goals = calculateGoals(teamHome, teamAway);
    const result = calculateMatchResults(teamHome, teamAway);
    const efficiency = calculateEfficiency(teamHome, teamAway);
    leaderboard.push({
      name: teamHome.name,
      totalGames,
      ...goals,
      ...result,
      efficiency,
    });
  });
  return leaderboard;
};

const sortTeamName = (a: any, b: any) => {
  if (a.name < b.name) { return 1; }
  if (a.name > b.name) { return -1; }
};

export { generateMainLeaderboard, sortTeamName };
