// AI Opponent Solver for Triple Triad

export class AIEngine {
  static getBestMove(engine, difficulty = 'Medium') {
    const redHand = engine.redHand;
    const availableCardIndices = [];
    redHand.forEach((card, idx) => {
      if (!card.used) availableCardIndices.push(idx);
    });

    const emptySlots = [];
    engine.board.forEach((cell, idx) => {
      if (cell === null) emptySlots.push(idx);
    });

    if (availableCardIndices.length === 0 || emptySlots.length === 0) {
      return null;
    }

    if (difficulty === 'Easy') {
      const cardIdx = availableCardIndices[Math.floor(Math.random() * availableCardIndices.length)];
      const slotIdx = emptySlots[Math.floor(Math.random() * emptySlots.length)];
      return { handIndex: cardIdx, slotIndex: slotIdx };
    }

    let bestMove = null;
    let maxScore = -999;

    // Evaluate all valid (cardIndex, slotIndex) pairs
    availableCardIndices.forEach(handIndex => {
      emptySlots.forEach(slotIndex => {
        const score = this.evaluateMove(engine, handIndex, slotIndex, difficulty);
        if (score > maxScore) {
          maxScore = score;
          bestMove = { handIndex, slotIndex };
        }
      });
    });

    return bestMove;
  }

  static evaluateMove(engine, handIndex, slotIndex, difficulty) {
    const cardObj = engine.redHand[handIndex];
    const modifiedStats = engine.calculateModifiedStats(cardObj, slotIndex);

    let score = 0;
    const neighbors = engine.getNeighbors(slotIndex);

    let flipsCount = 0;
    let comboBonus = 0;

    // Simulate basic flips & Same/Plus opportunities
    neighbors.forEach(nbr => {
      if (!nbr.wall) {
        const neighborTile = engine.board[nbr.slot];
        if (neighborTile) {
          if (neighborTile.owner === 'blue') {
            if (modifiedStats[nbr.dir] > neighborTile.stats[nbr.oppDir]) {
              flipsCount++;
              score += 15; // Point gain for capture
            }
          } else {
            // Defense / Support score
            score += 2;
          }
        } else {
          // Open neighbor slot: penalize if weak exposed stat
          const exposedStat = modifiedStats[nbr.dir];
          if (difficulty === 'Hard' || difficulty === 'Expert') {
            if (exposedStat <= 3) score -= 6;
            else if (exposedStat >= 8) score += 5;
          }
        }
      }
    });

    // Check Same / Plus potential if rule active
    if (engine.rules.same || engine.rules.plus) {
      let sameMatchCount = 0;
      neighbors.forEach(nbr => {
        if (nbr.wall && engine.rules.sameWall && modifiedStats[nbr.dir] === 10) {
          sameMatchCount++;
        } else if (!nbr.wall && engine.board[nbr.slot]) {
          if (modifiedStats[nbr.dir] === engine.board[nbr.slot].stats[nbr.oppDir]) {
            sameMatchCount++;
          }
        }
      });

      if (sameMatchCount >= 2) {
        score += 30; // High priority for SAME combo
      }
    }

    // Corner control bonus
    const corners = [0, 2, 6, 8];
    if (corners.includes(slotIndex)) {
      score += 5;
    }

    // Center control bonus
    if (slotIndex === 4) {
      score += 4;
    }

    return score + (Math.random() * 2); // Micro randomness to avoid deterministic loops
  }
}
