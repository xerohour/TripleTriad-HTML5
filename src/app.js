// Main Application Controller for Triple Triad HTML5

import { CARDS, OPPONENTS } from './cardsData.js';
import { TripleTriadEngine } from './tripleTriadEngine.js';
import { AIEngine } from './aiEngine.js';
import { soundEngine } from './audioEngine.js';
import { EffectsEngine } from './effectsEngine.js';
import { createCardElement, getElementEmoji } from './uiEngine.js';

class TripleTriadApp {
  constructor() {
    this.engine = new TripleTriadEngine();
    this.fx = new EffectsEngine(document.getElementById('fx-canvas'));
    
    this.userInventory = [];
    this.userDeck = [];
    this.selectedHandIndex = null;
    this.currentOpponent = OPPONENTS[0];
    this.isAiThinking = false;

    this.initLocalStorage();
    this.initDOMReferences();
    this.initEventListeners();
    this.renderOpponentSelect();
    this.startNewMatch();
    this.renderDeckBuilder();
    this.renderCollection();
  }

  initLocalStorage() {
    const savedInventory = localStorage.getItem('tt_user_inventory');
    const savedDeck = localStorage.getItem('tt_user_deck');

    if (savedInventory) {
      try { this.userInventory = JSON.parse(savedInventory); } catch (e) { this.userInventory = []; }
    }
    if (this.userInventory.length === 0) {
      // Default starter cards (Squall starter deck + initial collection)
      this.userInventory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 17, 18, 44, 66];
      localStorage.setItem('tt_user_inventory', JSON.stringify(this.userInventory));
    }

    if (savedDeck) {
      try { this.userDeck = JSON.parse(savedDeck); } catch (e) { this.userDeck = []; }
    }
    if (this.userDeck.length !== 5) {
      // Starter 5-card deck
      this.userDeck = [1, 2, 3, 4, 66]; // Includes Squall card!
      localStorage.setItem('tt_user_deck', JSON.stringify(this.userDeck));
    }
  }

  initDOMReferences() {
    this.boardGridEl = document.getElementById('triple-triad-board');
    this.blueHandEl = document.getElementById('blue-hand');
    this.redHandEl = document.getElementById('red-hand');
    this.blueScoreEl = document.getElementById('blue-score');
    this.redScoreEl = document.getElementById('red-score');
    this.turnIndicatorEl = document.getElementById('turn-indicator');
    this.rulesPillsEl = document.getElementById('active-rules-pills');
    this.oppSelectEl = document.getElementById('opponent-select');

    // Modals
    this.resultModalEl = document.getElementById('result-modal');
    this.resultTitleEl = document.getElementById('result-title');
    this.resultSubtitleEl = document.getElementById('result-subtitle');
    this.tradeRewardAreaEl = document.getElementById('trade-reward-area');
    this.oppTradeCardsEl = document.getElementById('opp-trade-cards');

    this.rulesModalEl = document.getElementById('rules-modal');
  }

  initEventListeners() {
    // Navigation Tabs
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundEngine.playSelect();
        const targetId = btn.getAttribute('data-target');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');

        if (targetId === 'deck-view') this.renderDeckBuilder();
        if (targetId === 'collection-view') this.renderCollection();
      });
    });

    // Sound Controls
    document.getElementById('btn-sound-toggle').addEventListener('click', (e) => {
      const isMuted = soundEngine.toggleMute();
      e.target.textContent = isMuted ? '🔇' : '🔊';
    });

    document.getElementById('btn-music-toggle').addEventListener('click', () => {
      if (soundEngine.musicPlaying) {
        soundEngine.stopMusic();
      } else {
        soundEngine.startMusic();
      }
    });

    // Rules Modal
    document.getElementById('btn-rules-modal').addEventListener('click', () => {
      soundEngine.playSelect();
      this.rulesModalEl.classList.add('active');
    });

    document.getElementById('btn-rules-save').addEventListener('click', () => {
      soundEngine.playSelect();
      this.rulesModalEl.classList.remove('active');
      this.startNewMatch();
    });

    // Opponent Selector
    this.oppSelectEl.addEventListener('change', (e) => {
      soundEngine.playSelect();
      const oppId = e.target.value;
      this.currentOpponent = OPPONENTS.find(o => o.id === oppId) || OPPONENTS[0];
      this.startNewMatch();
    });

    // Restart Match
    document.getElementById('btn-restart-match').addEventListener('click', () => {
      soundEngine.playSelect();
      this.startNewMatch();
    });

    // Modal Close
    document.getElementById('btn-modal-close').addEventListener('click', () => {
      soundEngine.playSelect();
      this.resultModalEl.classList.remove('active');
      this.startNewMatch();
    });

    // Deck Filter
    document.getElementById('filter-level').addEventListener('change', () => {
      this.renderDeckBuilder();
    });

    document.getElementById('btn-save-deck').addEventListener('click', () => {
      soundEngine.playSelect();
      if (this.userDeck.length === 5) {
        localStorage.setItem('tt_user_deck', JSON.stringify(this.userDeck));
        alert('Deck saved successfully!');
      } else {
        alert('Please select exactly 5 cards for your deck.');
      }
    });
  }

  renderOpponentSelect() {
    this.oppSelectEl.innerHTML = '';
    OPPONENTS.forEach(opp => {
      const opt = document.createElement('option');
      opt.value = opp.id;
      opt.textContent = `${opp.name} (${opp.difficulty})`;
      if (opp.id === this.currentOpponent.id) opt.selected = true;
      this.oppSelectEl.appendChild(opt);
    });
  }

  startNewMatch() {
    this.selectedHandIndex = null;
    this.isAiThinking = false;

    // Get blue player deck cards
    const blueDeckCards = this.userDeck.map(id => CARDS.find(c => c.id === id) || CARDS[0]);
    // Get opponent deck cards
    const redDeckCards = this.currentOpponent.deck.map(id => CARDS.find(c => c.id === id) || CARDS[0]);

    // Active Rules from Modal Checkboxes
    const rulesConfig = {
      open: document.getElementById('rule-open').checked,
      same: document.getElementById('rule-same').checked,
      plus: document.getElementById('rule-plus').checked,
      sameWall: document.getElementById('rule-samewall').checked,
      elemental: document.getElementById('rule-elemental').checked
    };

    // Update Opponent Header Info
    document.getElementById('opp-avatar').textContent = this.currentOpponent.avatar;
    document.getElementById('opp-name').textContent = this.currentOpponent.name;
    document.getElementById('opp-title').textContent = this.currentOpponent.title;

    this.engine.initMatch(blueDeckCards, redDeckCards, rulesConfig, rulesConfig.elemental);

    this.renderActiveRulesPills();
    this.renderBoard();
    this.renderHands();
    this.updateScoresAndTurn();

    if (this.engine.currentTurn === 'red') {
      this.triggerAiTurn();
    }
  }

  renderActiveRulesPills() {
    this.rulesPillsEl.innerHTML = '';
    const r = this.engine.rules;
    const activeRules = [];
    if (r.open) activeRules.push('Open');
    if (r.same) activeRules.push('Same');
    if (r.plus) activeRules.push('Plus');
    if (r.sameWall) activeRules.push('Same Wall');
    if (r.elemental) activeRules.push('Elemental');

    activeRules.forEach(ruleName => {
      const pill = document.createElement('div');
      pill.className = 'rule-pill';
      pill.textContent = ruleName;
      this.rulesPillsEl.appendChild(pill);
    });
  }

  renderBoard() {
    this.boardGridEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.dataset.slot = i;

      const element = this.engine.boardElements[i];
      if (element && element !== 'none') {
        cell.classList.add('cell-elemental', `cell-element-${element}`);
        const elemIcon = document.createElement('div');
        elemIcon.className = 'elemental-icon';
        elemIcon.textContent = getElementEmoji(element);
        cell.appendChild(elemIcon);
      }

      const boardTile = this.engine.board[i];
      if (boardTile) {
        const cardNode = createCardElement(boardTile.card, {
          owner: boardTile.owner,
          modifiedStats: boardTile.stats,
          showFront: true,
          isSelectable: false
        });
        cell.appendChild(cardNode);
      } else {
        cell.addEventListener('click', () => this.handleCellClick(i));
      }

      this.boardGridEl.appendChild(cell);
    }
  }

  renderHands() {
    // Blue Hand
    this.blueHandEl.innerHTML = '';
    this.engine.blueHand.forEach((cardObj, idx) => {
      if (!cardObj.used) {
        const cardNode = createCardElement(cardObj, {
          owner: 'blue',
          showFront: true,
          isSelected: this.selectedHandIndex === idx,
          onClick: () => {
            if (this.engine.currentTurn !== 'blue' || this.isAiThinking) return;
            soundEngine.playSelect();
            this.selectedHandIndex = idx;
            this.renderHands();
          }
        });
        this.blueHandEl.appendChild(cardNode);
      }
    });

    // Red Hand (AI)
    this.redHandEl.innerHTML = '';
    this.engine.redHand.forEach((cardObj, idx) => {
      if (!cardObj.used) {
        const cardNode = createCardElement(cardObj, {
          owner: 'red',
          showFront: this.engine.rules.open,
          isSelectable: false
        });
        this.redHandEl.appendChild(cardNode);
      }
    });
  }

  handleCellClick(slotIndex) {
    if (this.engine.currentTurn !== 'blue' || this.selectedHandIndex === null || this.isAiThinking) {
      return;
    }

    const moveResult = this.engine.placeCard(this.selectedHandIndex, slotIndex);
    if (!moveResult) return;

    soundEngine.playCardPlace();
    this.selectedHandIndex = null;
    this.processMoveResult(slotIndex, moveResult);
  }

  processMoveResult(slotIndex, moveResult) {
    this.renderBoard();
    this.renderHands();
    this.updateScoresAndTurn();

    // Trigger visual particle effects & combo badges
    const cellEl = this.boardGridEl.children[slotIndex];
    if (cellEl) {
      const rect = cellEl.getBoundingClientRect();
      this.fx.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, moveResult.placedTile.owner === 'blue' ? '#00f0ff' : '#ff3366');
    }

    if (moveResult.flips.length > 0) {
      setTimeout(() => soundEngine.playFlip(), 150);

      moveResult.flips.forEach((flippedSlot, idx) => {
        const flippedCell = this.boardGridEl.children[flippedSlot];
        const reason = moveResult.reasons[flippedSlot] || 'BASIC';
        if (flippedCell) {
          if (reason.includes('SAME') || reason.includes('PLUS') || reason.includes('COMBO')) {
            soundEngine.playCombo();
            this.fx.showFloatingBadge(flippedCell, reason, reason.includes('SAME') ? 'same' : (reason.includes('PLUS') ? 'plus' : 'combo'));
          }
        }
      });
    }

    if (moveResult.isGameOver) {
      this.handleGameOver(moveResult.winner);
    } else if (this.engine.currentTurn === 'red') {
      this.triggerAiTurn();
    }
  }

  triggerAiTurn() {
    this.isAiThinking = true;
    setTimeout(() => {
      const bestMove = AIEngine.getBestMove(this.engine, this.currentOpponent.difficulty);
      this.isAiThinking = false;

      if (bestMove) {
        const moveResult = this.engine.placeCard(bestMove.handIndex, bestMove.slotIndex);
        if (moveResult) {
          soundEngine.playCardPlace();
          this.processMoveResult(bestMove.slotIndex, moveResult);
        }
      }
    }, 750);
  }

  updateScoresAndTurn() {
    const scores = this.engine.getScore();
    this.blueScoreEl.textContent = scores.blue;
    this.redScoreEl.textContent = scores.red;

    if (this.engine.currentTurn === 'blue') {
      this.turnIndicatorEl.textContent = 'YOUR TURN';
      this.turnIndicatorEl.className = 'turn-indicator blue-turn';
    } else {
      this.turnIndicatorEl.textContent = `${this.currentOpponent.name.toUpperCase()}'S TURN`;
      this.turnIndicatorEl.className = 'turn-indicator red-turn';
    }
  }

  handleGameOver(winner) {
    setTimeout(() => {
      this.resultModalEl.classList.add('active');
      this.tradeRewardAreaEl.style.display = 'none';

      if (winner === 'blue') {
        soundEngine.playVictory();
        this.resultTitleEl.textContent = 'VICTORY!';
        this.resultSubtitleEl.textContent = `You defeated ${this.currentOpponent.name}!`;

        // Trade Rule Card Reward
        this.tradeRewardAreaEl.style.display = 'block';
        this.oppTradeCardsEl.innerHTML = '';
        this.engine.redHand.forEach(cardObj => {
          const cardNode = createCardElement(cardObj, {
            owner: 'red',
            showFront: true,
            onClick: () => {
              soundEngine.playSelect();
              if (!this.userInventory.includes(cardObj.id)) {
                this.userInventory.push(cardObj.id);
                localStorage.setItem('tt_user_inventory', JSON.stringify(this.userInventory));
              }
              alert(`Claimed ${cardObj.name} card! Added to your collection.`);
              this.resultModalEl.classList.remove('active');
              this.startNewMatch();
            }
          });
          this.oppTradeCardsEl.appendChild(cardNode);
        });

      } else if (winner === 'red') {
        soundEngine.playDefeat();
        this.resultTitleEl.textContent = 'DEFEAT';
        this.resultSubtitleEl.textContent = `${this.currentOpponent.name} won the match. Better luck next time!`;
      } else {
        soundEngine.playDraw();
        this.resultTitleEl.textContent = 'DRAW MATCH!';
        this.resultSubtitleEl.textContent = 'It is a draw!';
      }
    }, 600);
  }

  renderDeckBuilder() {
    const catalogGrid = document.getElementById('catalog-cards-grid');
    const selectedDeckGrid = document.getElementById('selected-deck-slots');
    const levelFilter = document.getElementById('filter-level').value;

    catalogGrid.innerHTML = '';
    selectedDeckGrid.innerHTML = '';

    const filteredCards = CARDS.filter(c => {
      if (!this.userInventory.includes(c.id)) return false;
      if (levelFilter === 'all') return true;
      return c.level === parseInt(levelFilter);
    });

    filteredCards.forEach(card => {
      const isEquipped = this.userDeck.includes(card.id);
      const cardNode = createCardElement(card, {
        owner: 'blue',
        showFront: true,
        isSelected: isEquipped,
        onClick: () => {
          soundEngine.playSelect();
          if (isEquipped) {
            this.userDeck = this.userDeck.filter(id => id !== card.id);
          } else {
            if (this.userDeck.length < 5) {
              this.userDeck.push(card.id);
            } else {
              alert('Deck is full (5 cards max)! Click an equipped card to remove it first.');
            }
          }
          this.renderDeckBuilder();
        }
      });
      catalogGrid.appendChild(cardNode);
    });

    this.userDeck.forEach(cardId => {
      const card = CARDS.find(c => c.id === cardId);
      if (card) {
        const cardNode = createCardElement(card, {
          owner: 'blue',
          showFront: true,
          onClick: () => {
            soundEngine.playSelect();
            this.userDeck = this.userDeck.filter(id => id !== cardId);
            this.renderDeckBuilder();
          }
        });
        selectedDeckGrid.appendChild(cardNode);
      }
    });
  }

  renderCollection() {
    const fullCollectionGrid = document.getElementById('full-collection-grid');
    const unlockedCountEl = document.getElementById('unlocked-count');
    fullCollectionGrid.innerHTML = '';

    let unlockedCount = 0;

    CARDS.forEach(card => {
      const isUnlocked = this.userInventory.includes(card.id);
      if (isUnlocked) unlockedCount++;

      const cardNode = createCardElement(card, {
        owner: isUnlocked ? 'blue' : 'red',
        showFront: isUnlocked,
        isSelectable: false
      });
      fullCollectionGrid.appendChild(cardNode);
    });

    unlockedCountEl.textContent = unlockedCount;
    const totalCountEl = document.getElementById('total-count');
    if (totalCountEl) totalCountEl.textContent = CARDS.length;
  }
}

// Initialize App on DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
  window.app = new TripleTriadApp();
});
