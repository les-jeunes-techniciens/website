import { onMounted, onUnmounted } from 'vue'

const revealSelector = [
  '.reveal',
  '.about-copy',
  '.about-card',
  '.values-row',
  '.site-footer',
].join(', ')
const visibleClass = 'is-visible'
const fromLeftClass = 'reveal-from-left'
const fromRightClass = 'reveal-from-right'
const styleNodeId = 'scroll-reveal-styles'
const visibilityThreshold = 0.18
const rootMargin = '0px 0px -8% 0px'

const revealStyles = `
  .reveal,
  .about-copy,
  .about-card,
  .values-row,
  .site-footer {
    animation: none !important;
    opacity: 0;
    transition:
      opacity 720ms ease,
      transform 720ms cubic-bezier(0.2, 0.85, 0.28, 1);
    will-change: opacity, transform;
  }

  .reveal-from-left {
    transform: translate(clamp(-96px, -8vw, -40px), 0);
  }

  .reveal-from-right {
    transform: translate(clamp(40px, 8vw, 96px), 0);
  }

  .is-visible {
    opacity: 1;
    transform: translate(0, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal,
    .about-copy,
    .about-card,
    .values-row,
    .site-footer {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`

function injectStyles() {
  if (document.getElementById(styleNodeId)) return null
  const styleNode = document.createElement('style')
  styleNode.id = styleNodeId
  styleNode.textContent = revealStyles
  document.head.appendChild(styleNode)
  return styleNode
}

function pickDirectionClass(index) {
  if (index % 2 === 0) return fromLeftClass
  return fromRightClass
}

function assignDirections(targets) {
  targets.forEach((element, index) => {
    element.classList.add(pickDirectionClass(index))
  })
}

export default function useScrollReveal() {
  const styleNode = injectStyles()
  let observer = null

  function revealEntry(entry) {
    if (!entry.isIntersecting) return
    entry.target.classList.add(visibleClass)
    observer.unobserve(entry.target)
  }

  function onIntersection(entries) {
    entries.forEach(revealEntry)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = Array.from(document.querySelectorAll(revealSelector))
    if (targets.length === 0) return
    assignDirections(targets)
    observer = new IntersectionObserver(onIntersection, {
      threshold: visibilityThreshold,
      rootMargin,
    })
    targets.forEach((element) => observer.observe(element))
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
    styleNode?.remove()
  })
}
