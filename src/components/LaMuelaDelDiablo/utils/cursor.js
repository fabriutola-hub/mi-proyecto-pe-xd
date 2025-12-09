export const initCursor = () => {
  const cursor = document.getElementById('cursor-dot');
  if (!cursor) return;

  const moveCursor = (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  };

  const hoverEffect = () => cursor.classList.add('hovered');
  const removeHoverEffect = () => cursor.classList.remove('hovered');

  window.addEventListener('mousemove', moveCursor);

  document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
    el.addEventListener('mouseenter', hoverEffect);
    el.addEventListener('mouseleave', removeHoverEffect);
  });

  // Clean up function not fully implemented here as this is a quick script,
  // but in React we'd use useEffect.
};
