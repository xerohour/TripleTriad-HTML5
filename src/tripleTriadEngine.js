// Triple Triad Game Engine Logic

import { ELEMENTS } from './cardsData.js';

export const DIRECTIONS = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
};

export const OPPOSITE_DIRECTION = {
  0: 2, // Top <-> Bottom
  1: 3, // Right <-> Left
  2: 0, // Bottom <-> Top
  3: 1  // Left <-> Right
};

export class TripleTriadEngine {
  constructor() {
    this.board = Array(9).fill(null);
    this.boardElements = Array(9).fill(ELEMENTS.NONE);
    this.blueHand = [];
    this.redHand = [];
    this.currentTurn = 'blue'; // 'blue' or 'red'
    this.rules = {
      open: true,
      same: true,
      plus: true,
      sameWall: true,
      elemental: true
    };
    this.moveHistory = [];
    this.isGameOver = false;
    this.winner = null; // 'blue', 'red', or 'draw'
  }

  initMatch(blueDeck, redDeck, rulesConfig = {}, generateElements = false) {
    this.rules = { ...this.rules, ...rulesConfig };
    this.board = Array(9).fill(null);
    this.boardElements = Array(9).fill(ELEMENTS.NONE);

    if (this.rules.elemental || generateElements) {
      const allElements = Object.values(ELEMENTS).filter(e => e !== ELEMENTS.NONE);
      // Place 2 to 4 random elements on the board
      const elementCount = 2 + Math.floor(Math.random() * 3);
      const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
      for (let i = 0; i < elementCount; i++) {
        const randElement = allElements[Math.floor(Math.random() * allElements.length)];
        this.boardElements[slots[i]] = randElement;
      }
    }

    this.blueHand = blueDeck.map((card, idx) => ({
      ...card,
      instanceId: `blue_${idx}_${card.id}`,
      owner: 'blue',
      used: false
    }));

    this.redHand = redDeck.map((card, idx) => ({
      ...card,
      instanceId: `red_${idx}_${card.id}`,
      owner: 'red',
      used: false
    }));

    this.currentTurn = Math.random() < 0.5 ? 'blue' : 'red';
    this.moveHistory = [];
    this.isGameOver = false;
    this.winner = null;
  }

  getNeighbors(slotIndex) {
    const row = Math.floor(slotIndex / 3);
    const col = slotIndex % 3;
    const neighbors = [];

    // Top
    if (row > 0) neighbors.push({ slot: slotIndex - 3, dir: DIRECTIONS.TOP, oppDir: DIRECTIONS.BOTTOM });
    else neighbors.push({ wall: true, dir: DIRECTIONS.TOP, oppDir: DIRECTIONS.BOTTOM });

    // Right
    if (col < 2) neighbors.push({ slot: slotIndex + 1, dir: DIRECTIONS.RIGHT, oppDir: DIRECTIONS.LEFT });
    else neighbors.push({ wall: true, dir: DIRECTIONS.RIGHT, oppDir: DIRECTIONS.LEFT });

    // Bottom
    if (row < 2) neighbors.push({ slot: slotIndex + 3, dir: DIRECTIONS.BOTTOM, oppDir: DIRECTIONS.TOP });
    else neighbors.push({ wall: true, dir: DIRECTIONS.BOTTOM, oppDir: DIRECTIONS.TOP });

    // Left
    if (col > 0) neighbors.push({ slot: slotIndex - 1, dir: DIRECTIONS.LEFT, oppDir: DIRECTIONS.RIGHT });
    else neighbors.push({ wall: true, dir: DIRECTIONS.LEFT, oppDir: DIRECTIONS.RIGHT });

    return neighbors;
  }

  calculateModifiedStats(card, slotIndex) {
    const stats = [...card.stats];
    if (!this.rules.elemental) return stats;

    const slotElement = this.boardElements[slotIndex];
    if (slotElement === ELEMENTS.NONE) return stats;

    const modifier = card.element === slotElement ? 1 : -1;
    return stats.map(s => Math.max(1, Math.min(10, s + modifier)));
  }

  placeCard(handIndex, slotIndex) {
    if (this.isGameOver) return null;
    const hand = this.currentTurn === 'blue' ? this.blueHand : this.redHand;
    const cardObj = hand[handIndex];

    if (!cardObj || cardObj.used || this.board[slotIndex] !== null) {
      return null;
    }

    cardObj.used = true;
    const modifiedStats = this.calculateModifiedStats(cardObj, slotIndex);

    const placedTile = {
      card: cardObj,
      owner: this.currentTurn,
      stats: modifiedStats,
      slotIndex
    };

    this.board[slotIndex] = placedTile;

    // Evaluate captures (Same, Plus, Same Wall, Basic & Combos)
    const result = this.evaluateRules(slotIndex);

    this.moveHistory.push({
      player: this.currentTurn,
      card: cardObj,
      slotIndex,
      flips: result.flips,
      combos: result.combos
    });

    // Check game over condition
    const openSlots = this.board.filter(cell => cell === null).length;
    if (openSlots === 0) {
      this.isGameOver = true;
      const score = this.getScore();
      if (score.blue > score.red) this.winner = 'blue';
      else if (score.red > score.blue) this.winner = 'red';
      else this.winner = 'draw';
    } else {
      this.currentTurn = this.currentTurn === 'blue' ? 'red' : 'blue';
    }

    return {
      placedTile,
      flips: result.flips,
      reasons: result.reasons,
      isGameOver: this.isGameOver,
      winner: this.winner
    };
  }

  evaluateRules(slotIndex) {
    const placedTile = this.board[slotIndex];
    const player = placedTile.owner;
    const flippedSlots = new Set();
    const reasons = {};

    const neighbors = this.getNeighbors(slotIndex);

    // 1. SAME & SAME WALL CHECK
    const sameMatches = [];
    if (this.rules.same) {
      neighbors.forEach(nbr => {
        if (nbr.wall) {
          if (this.rules.sameWall && placedTile.stats[nbr.dir] === 10) { // 10 is 'A' (wall value)
            sameMatches.push(nbr);
          }
        } else {
          const neighborTile = this.board[nbr.slot];
          if (neighborTile && placedTile.stats[nbr.dir] === neighborTile.stats[nbr.oppDir]) {
            sameMatches.push(nbr);
          }
        }
      });

      if (sameMatches.length >= 2) {
        sameMatches.forEach(match => {
          if (!match.wall) {
            const enemyTile = this.board[match.slot];
            if (enemyTile && enemyTile.owner !== player) {
              flippedSlots.add(match.slot);
              reasons[match.slot] = 'SAME!';
            }
          }
        });
      }
    }

    // 2. PLUS CHECK
    if (this.rules.plus) {
      const sumMap = new Map();
      neighbors.forEach(nbr => {
        if (nbr.wall) {
          if (this.rules.sameWall) {
            const wallSum = placedTile.stats[nbr.dir] + 10;
            if (!sumMap.has(wallSum)) sumMap.set(wallSum, []);
            sumMap.get(wallSum).push(nbr);
          }
        } else {
          const neighborTile = this.board[nbr.slot];
          if (neighborTile) {
            const sum = placedTile.stats[nbr.dir] + neighborTile.stats[nbr.oppDir];
            if (!sumMap.has(sum)) sumMap.set(sum, []);
            sumMap.get(sum).push(nbr);
          }
        }
      });

      sumMap.forEach((matches, sum) => {
        if (matches.length >= 2) {
          matches.forEach(match => {
            if (!match.wall) {
              const enemyTile = this.board[match.slot];
              if (enemyTile && enemyTile.owner !== player) {
                flippedSlots.add(match.slot);
                reasons[match.slot] = reasons[match.slot] ? `${reasons[match.slot]} + PLUS!` : 'PLUS!';
              }
            }
          });
        }
      });
    }

    // Flip Same / Plus cards and prepare for Combo
    const comboQueue = [];
    flippedSlots.forEach(s => {
      this.board[s].owner = player;
      comboQueue.push(s);
    });

    // 3. BASIC CAPTURES (if not already captured by Same/Plus)
    neighbors.forEach(nbr => {
      if (!nbr.wall) {
        const neighborTile = this.board[nbr.slot];
        if (neighborTile && neighborTile.owner !== player && !flippedSlots.has(nbr.slot)) {
          if (placedTile.stats[nbr.dir] > neighborTile.stats[nbr.oppDir]) {
            neighborTile.owner = player;
            flippedSlots.add(nbr.slot);
            reasons[nbr.slot] = 'BASIC';
          }
        }
      }
    });

    // 4. COMBO RECURSION
    // Cards flipped by Same or Plus can trigger basic captures recursively
    let comboIndex = 0;
    while (comboIndex < comboQueue.length) {
      const currentComboSlot = comboQueue[comboIndex];
      const comboTile = this.board[currentComboSlot];
      const comboNeighbors = this.getNeighbors(currentComboSlot);

      comboNeighbors.forEach(nbr => {
        if (!nbr.wall) {
          const enemyTile = this.board[nbr.slot];
          if (enemyTile && enemyTile.owner !== player) {
            if (comboTile.stats[nbr.dir] > enemyTile.stats[nbr.oppDir]) {
              enemyTile.owner = player;
              flippedSlots.add(nbr.slot);
              reasons[nbr.slot] = 'COMBO!';
              comboQueue.push(nbr.slot);
            }
          }
        }
      });

      comboIndex++;
    }

    return {
      flips: Array.from(flippedSlots),
      reasons
    };
  }

  getScore() {
    let blue = this.blueHand.filter(c => !c.used).length;
    let red = this.redHand.filter(c => !c.used).length;

    this.board.forEach(tile => {
      if (tile) {
        if (tile.owner === 'blue') blue++;
        if (tile.owner === 'red') red++;
      }
    });

    return { blue, red };
  }
}
