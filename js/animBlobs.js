function randomPosition(maxX, maxY) {
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY
  };
}

function isPositionUnique(pos, positions, minDist = 100) {
  return !positions.some(p => {
    const dx = p.x - pos.x;
    const dy = p.y - pos.y;
    return Math.sqrt(dx * dx + dy * dy) < minDist;
  });
}

function generateUniquePositions(count, maxX, maxY, minDist = 200) {
  const positions = [];
  let attempts = 0;
  while (positions.length < count && attempts < 10000) {
    attempts++;
    const pos = randomPosition(maxX, maxY);
    if (isPositionUnique(pos, positions, minDist)) {
      positions.push(pos);
    }
  }
  if (positions.length < count) {
    console.warn('Could not generate enough unique positions with given minDist.');
  }
  return positions;
}

function animateBlobs() {
  const blobs = document.querySelectorAll('.blob');
  const { innerWidth: w, innerHeight: h } = window;
  const margin = 400;
  const minDist = 100;

  // Generate unique target positions
  const targetPositions = generateUniquePositions(blobs.length, w - margin, h - margin, minDist);

  blobs.forEach((blob, i) => {
    const chaosX = (Math.random() - 0.5) * 0.324523 * 100;
    const chaosY = (Math.random() - 0.5) * 0.324523 * 100;

    const { x, y } = targetPositions[i];
    blob.style.transform = `translate(${x + chaosX}px, ${y + chaosY}px)`;
  });

  setTimeout(animateBlobs, 8000);
}

window.addEventListener('load', () => {
  const blobs = document.querySelectorAll('.blob');
  const { innerWidth: w, innerHeight: h } = window;
  const margin = 400;
  const minDist = 100;

  // Generate unique starting positions with spacing
  const startPositions = generateUniquePositions(blobs.length, w - margin, h - margin, minDist);

  blobs.forEach((blob, i) => {
    const chaosX = (Math.random() - 0.5) * 0.324523 * 100;
    const chaosY = (Math.random() - 0.5) * 0.324523 * 100;

    const { x, y } = startPositions[i];
    blob.style.transform = `translate(${x + chaosX}px, ${y + chaosY}px)`;
  });

  animateBlobs();

  window.addEventListener('resize', debounce(() => {
    // On resize regenerate positions
    const newStartPositions = generateUniquePositions(blobs.length, w - margin, h - margin, minDist);
    blobs.forEach((blob, i) => {
      const chaosX = (Math.random() - 0.5) * 0.324523 * 100;
      const chaosY = (Math.random() - 0.5) * 0.324523 * 100;

      const { x, y } = newStartPositions[i];
      blob.style.transform = `translate(${x + chaosX}px, ${y + chaosY}px)`;
    });

    animateBlobs();
  }, 50));
});

// Debounce helper
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
