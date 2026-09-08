export function calculateResult(answers, questions, types) {
  const totals = Object.fromEntries(types.map((type) => [type.id, 0]));
  const perQuestion = Object.fromEntries(types.map((type) => [type.id, []]));

  answers.forEach((optionIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[optionIndex];

    types.forEach((type) => {
      const points = option?.scores[type.id] ?? 0;
      totals[type.id] += points;
      perQuestion[type.id].push(points);
    });
  });

  const winner = [...types].sort((a, b) => {
    const totalDifference = totals[b.id] - totals[a.id];
    if (totalDifference !== 0) return totalDifference;

    for (let i = 0; i < answers.length; i += 1) {
      const questionDifference = perQuestion[b.id][i] - perQuestion[a.id][i];
      if (questionDifference !== 0) return questionDifference;
    }

    return types.findIndex((type) => type.id === a.id) - types.findIndex((type) => type.id === b.id);
  })[0];

  return {
    type: winner,
    totals,
    perQuestion
  };
}

export function getTypeById(types, id) {
  return types.find((type) => type.id === id);
}
