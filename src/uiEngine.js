// UI Component Renderer & Helper Functions

import { formatStat } from './cardsData.js';

export function createCardElement(card, options = {}) {
  const {
    owner = 'blue',
    isFlipped = false,
    showFront = true,
    modifiedStats = null,
    isSelected = false,
    onClick = null,
    isSelectable = true
  } = options;

  const cardContainer = document.createElement('div');
  cardContainer.className = `tt-card owner-${owner} ${isSelected ? 'selected' : ''} ${isFlipped ? 'flipped' : ''}`;
  if (card.level >= 6) {
    cardContainer.classList.add('rarity-gf');
  }

  const statsToDisplay = modifiedStats || card.stats;

  const cardInner = document.createElement('div');
  cardInner.className = 'tt-card-inner';

  // FRONT FACE
  const frontFace = document.createElement('div');
  frontFace.className = `card-face card-front owner-${owner}`;

  // Stat Cross
  const statsCross = document.createElement('div');
  statsCross.className = 'card-stats-cross';
  statsCross.innerHTML = `
    <div class="stat-val stat-top">${formatStat(statsToDisplay[0])}</div>
    <div class="stat-val stat-left">${formatStat(statsToDisplay[3])}</div>
    <div class="stat-val stat-right">${formatStat(statsToDisplay[1])}</div>
    <div class="stat-val stat-bottom">${formatStat(statsToDisplay[2])}</div>
  `;

  // Top Bar (Level & Element)
  const topBar = document.createElement('div');
  topBar.className = 'card-top-bar';
  const levelText = document.createElement('div');
  levelText.className = 'card-level';
  levelText.textContent = `Lv${card.level}`;
  topBar.appendChild(levelText);

  if (card.element && card.element !== 'none') {
    const elemIcon = document.createElement('div');
    elemIcon.className = 'card-element-icon';
    elemIcon.textContent = getElementEmoji(card.element);
    topBar.appendChild(elemIcon);
  }

  // Card Art / Icon
  const cardArt = document.createElement('div');
  cardArt.className = 'card-art';
  cardArt.textContent = card.icon || '🎴';

  // Card Footer Name
  const footer = document.createElement('div');
  footer.className = 'card-footer';
  const nameSpan = document.createElement('div');
  nameSpan.className = 'card-name';
  nameSpan.textContent = card.name;
  footer.appendChild(nameSpan);

  frontFace.appendChild(statsCross);
  frontFace.appendChild(topBar);
  frontFace.appendChild(cardArt);
  frontFace.appendChild(footer);

  // BACK FACE
  const backFace = document.createElement('div');
  backFace.className = 'card-face card-back';
  const emblem = document.createElement('div');
  emblem.className = 'card-back-emblem';
  emblem.textContent = '⚔️';
  backFace.appendChild(emblem);

  cardInner.appendChild(frontFace);
  cardInner.appendChild(backFace);
  cardContainer.appendChild(cardInner);

  if (!showFront) {
    cardContainer.classList.add('flipped');
  }

  if (onClick && isSelectable) {
    cardContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick(card, cardContainer);
    });
  }

  return cardContainer;
}

export function getElementEmoji(element) {
  switch (element) {
    case 'fire': return '🔥';
    case 'ice': return '❄️';
    case 'thunder': return '⚡';
    case 'earth': return '🌿';
    case 'poison': return '☠️';
    case 'holy': return '✨';
    case 'wind': return '🌪️';
    case 'water': return '🌊';
    default: return '';
  }
}
