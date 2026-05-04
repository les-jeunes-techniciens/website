import { onMounted, onUnmounted } from 'vue'

const cardSelector = '.service-card, .project-card, .hero-panel'
const tiltMaxDegrees = 8
const liftPx = 6
const liftScale = 1.012
const stiffness = 180
const damping = 18
const settleThreshold = 0.001
const styleNodeId = 'card-tilt-styles'

const tiltStyles = `
  .service-card,
  .project-card,
  .hero-panel {
    position: relative;
    isolation: isolate;
    --cursor-x: 50%;
    --cursor-y: 50%;
    --cursor-opacity: 0;
    --tilt-x: 0;
    --tilt-y: 0;
    will-change: transform;
  }

  .service-card::before,
  .project-card::before,
  .hero-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    z-index: 1;
    background:
      radial-gradient(
        220px circle at var(--cursor-x) var(--cursor-y),
        rgba(255, 255, 255, calc(0.28 * var(--cursor-opacity))),
        transparent 70%
      ),
      radial-gradient(
        ellipse 90% 70% at
          calc(50% + var(--tilt-y) * 55%)
          calc(50% - var(--tilt-x) * 55%),
        rgba(255, 255, 255, 0.14),
        rgba(255, 255, 255, 0.04) 45%,
        transparent 75%
      ),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.04) 30%,
        rgba(255, 255, 255, 0.1) 42%,
        rgba(255, 255, 255, 0.02) 55%,
        transparent 75%
      );
  }

  :root[data-theme='dark'] .service-card::before,
  :root[data-theme='dark'] .project-card::before,
  :root[data-theme='dark'] .hero-panel::before {
    background:
      radial-gradient(
        220px circle at var(--cursor-x) var(--cursor-y),
        rgba(201, 255, 241, calc(0.17 * var(--cursor-opacity))),
        transparent 70%
      ),
      radial-gradient(
        ellipse 90% 70% at
          calc(50% + var(--tilt-y) * 55%)
          calc(50% - var(--tilt-x) * 55%),
        rgba(201, 255, 241, 0.085),
        rgba(201, 255, 241, 0.025) 45%,
        transparent 75%
      ),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.025) 30%,
        rgba(255, 255, 255, 0.06) 42%,
        rgba(255, 255, 255, 0.012) 55%,
        transparent 75%
      );
  }

  .service-card > *,
  .project-card > *,
  .hero-panel > * {
    position: relative;
    z-index: 2;
  }

  .projects-grid .project-card::after {
    z-index: 3;
  }
`

function injectStyles() {
  if (document.getElementById(styleNodeId)) return null
  const styleNode = document.createElement('style')
  styleNode.id = styleNodeId
  styleNode.textContent = tiltStyles
  document.head.appendChild(styleNode)
  return styleNode
}

function springStep(current, target, velocity, dt) {
  const acceleration = stiffness * (target - current) - damping * velocity
  const nextVelocity = velocity + acceleration * dt
  const nextValue = current + nextVelocity * dt
  return [nextValue, nextVelocity]
}

function attachTilt(card) {
  const state = {
    targetTiltX: 0,
    targetTiltY: 0,
    targetLift: 0,
    targetScale: 1,
    tiltX: 0,
    tiltY: 0,
    lift: 0,
    scale: 1,
    velocityTiltX: 0,
    velocityTiltY: 0,
    velocityLift: 0,
    velocityScale: 0,
    rafId: null,
    lastTime: 0,
  }

  function applyTransform() {
    card.style.setProperty('--tilt-x', (state.tiltX / tiltMaxDegrees).toFixed(3))
    card.style.setProperty('--tilt-y', (state.tiltY / tiltMaxDegrees).toFixed(3))
    card.style.transform = `perspective(1000px) rotateX(${state.tiltX.toFixed(3)}deg) rotateY(${state.tiltY.toFixed(3)}deg) translateY(${state.lift.toFixed(3)}px) scale(${state.scale.toFixed(4)})`
  }

  function isSettled() {
    return (
      Math.abs(state.targetTiltX - state.tiltX) < settleThreshold &&
      Math.abs(state.velocityTiltX) < settleThreshold &&
      Math.abs(state.targetTiltY - state.tiltY) < settleThreshold &&
      Math.abs(state.velocityTiltY) < settleThreshold &&
      Math.abs(state.targetLift - state.lift) < settleThreshold &&
      Math.abs(state.velocityLift) < settleThreshold &&
      Math.abs(state.targetScale - state.scale) < settleThreshold &&
      Math.abs(state.velocityScale) < settleThreshold
    )
  }

  function step(now) {
    if (!state.lastTime) state.lastTime = now
    const dt = Math.min((now - state.lastTime) / 1000, 0.032)
    state.lastTime = now

    ;[state.tiltX, state.velocityTiltX] = springStep(
      state.tiltX,
      state.targetTiltX,
      state.velocityTiltX,
      dt,
    )
    ;[state.tiltY, state.velocityTiltY] = springStep(
      state.tiltY,
      state.targetTiltY,
      state.velocityTiltY,
      dt,
    )
    ;[state.lift, state.velocityLift] = springStep(
      state.lift,
      state.targetLift,
      state.velocityLift,
      dt,
    )
    ;[state.scale, state.velocityScale] = springStep(
      state.scale,
      state.targetScale,
      state.velocityScale,
      dt,
    )

    applyTransform()

    if (isSettled()) {
      state.tiltX = state.targetTiltX
      state.tiltY = state.targetTiltY
      state.lift = state.targetLift
      state.scale = state.targetScale
      state.velocityTiltX = 0
      state.velocityTiltY = 0
      state.velocityLift = 0
      state.velocityScale = 0
      state.rafId = null
      state.lastTime = 0
      if (
        state.targetTiltX === 0 &&
        state.targetTiltY === 0 &&
        state.targetLift === 0 &&
        state.targetScale === 1
      ) {
        card.style.transform = ''
        card.style.removeProperty('--tilt-x')
        card.style.removeProperty('--tilt-y')
      } else {
        applyTransform()
      }
      return
    }

    state.rafId = requestAnimationFrame(step)
  }

  function ensureRunning() {
    if (state.rafId != null) return
    state.lastTime = 0
    state.rafId = requestAnimationFrame(step)
  }

  function onEnter(event) {
    card.style.setProperty('--cursor-opacity', '1')
    card.dispatchEvent(
      new CustomEvent('card-tracking-start', {
        bubbles: true,
        detail: { x: event.clientX, y: event.clientY },
      }),
    )
  }

  function onMove(event) {
    const rect = card.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width
    const offsetY = (event.clientY - rect.top) / rect.height
    state.targetTiltX = (0.5 - offsetY) * 2 * tiltMaxDegrees
    state.targetTiltY = (0.5 - offsetX) * 2 * tiltMaxDegrees
    state.targetLift = -liftPx
    state.targetScale = liftScale
    card.style.setProperty('--cursor-x', `${(offsetX * 100).toFixed(2)}%`)
    card.style.setProperty('--cursor-y', `${(offsetY * 100).toFixed(2)}%`)
    card.classList.add('is-tilting')
    ensureRunning()
  }

  function onLeave() {
    state.targetTiltX = 0
    state.targetTiltY = 0
    state.targetLift = 0
    state.targetScale = 1
    card.style.setProperty('--cursor-opacity', '0')
    card.classList.remove('is-tilting')
    card.dispatchEvent(new CustomEvent('card-tracking-end', { bubbles: true }))
    ensureRunning()
  }

  card.addEventListener('mouseenter', onEnter)
  card.addEventListener('mousemove', onMove)
  card.addEventListener('mouseleave', onLeave)

  return () => {
    card.removeEventListener('mouseenter', onEnter)
    card.removeEventListener('mousemove', onMove)
    card.removeEventListener('mouseleave', onLeave)
    if (state.rafId != null) cancelAnimationFrame(state.rafId)
  }
}

export default function useCardTilt() {
  const styleNode = injectStyles()
  let cleanups = []

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const cards = Array.from(document.querySelectorAll(cardSelector))
    cleanups = cards.map(attachTilt)
  })

  onUnmounted(() => {
    cleanups.forEach((cleanup) => cleanup())
    cleanups = []
    styleNode?.remove()
  })
}
