import { onMounted, onUnmounted } from 'vue'

const revealSelector = '.reveal'
const visibleClass = 'is-visible'
const fromLeftClass = 'reveal-from-left'
const fromRightClass = 'reveal-from-right'
const styleNodeId = 'scroll-reveal-styles'
const visibilityThreshold = 0.08
const rootMargin = '0px 0px -12% 0px'

const revealStyles = `
  .reveal {
    animation: none !important;
    opacity: 0;
    transform: translateY(18px) scale(0.96);
    transition:
      opacity 620ms ease,
      transform 620ms cubic-bezier(0.2, 0.85, 0.28, 1);
    will-change: opacity, transform;
  }

  .reveal-from-left {
    transform: translateX(clamp(-96px, -8vw, -40px)) translateY(12px) scale(0.96);
  }

  .reveal-from-right {
    transform: translateX(clamp(40px, 8vw, 96px)) translateY(12px) scale(0.96);
  }

  .reveal-from-bottom {
    transform: translateY(clamp(48px, 6vw, 72px)) scale(0.96);
  }

  .is-visible {
    opacity: 1;
    transform: translate(0, 0) scale(1);
    animation: popIn 560ms ease both;
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.96);
    }

    60% {
      opacity: 1;
      transform: translateY(-4px) scale(1.01);
    }

    100% {
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      transition: none;
      animation: none;
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

function getServiceDirection(target, globalIndex) {
  const serviceItem = target.closest('.services-grid > *')
  if (!serviceItem) return null

  const gridItems = Array.from(serviceItem.parentElement.querySelectorAll('.reveal'))
  const itemIndex = gridItems.indexOf(target)
  if (itemIndex === -1) return null

  if (itemIndex === 1 || itemIndex === 4 || itemIndex === 6) {
    return 'reveal-from-bottom'
  }

  return itemIndex % 2 === 0 ? fromLeftClass : fromRightClass
}

function pickDirectionClass(index, element) {
  return getServiceDirection(element, index) || (index % 2 === 0 ? fromLeftClass : fromRightClass)
}

function assignDirections(targets) {
  targets.forEach((element, index) => {
    element.classList.add(pickDirectionClass(index, element))
  })
}

export default function useScrollReveal() {
  const styleNode = injectStyles()
  let observer = null

  function revealEntry(entry) {
    if (!entry.target.classList.contains(visibleClass)) {
      entry.target.style.animation = 'none'
    }

    if (!entry.isIntersecting) {
      entry.target.classList.remove(visibleClass)
      return
    }

    entry.target.classList.remove(visibleClass)
    requestAnimationFrame(() => {
      entry.target.classList.add(visibleClass)
      entry.target.style.animation = ''
    })
  }

  function onIntersection(entries) {
    entries.forEach(revealEntry)
  }

  onMounted(() => {
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