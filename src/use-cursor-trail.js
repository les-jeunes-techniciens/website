import { onMounted, onUnmounted } from 'vue'

const maxPathLength = 15
const trailDurationMs = 650
const headWidth = 1.6
const tailWidth = 0.2
const haloWidthMultiplier = 4.5
const headAlpha = 0.90
const haloAlpha = 0.1

export default function useCursorTrail() {
  const cursorPath = []
  let state = null
  let trailRgb = '21,207,192'
  let themeObserver = null

  function hexToRgbTriplet(hex) {
    const value = hex.replace('#', '')
    const red = parseInt(value.slice(0, 2), 16)
    const green = parseInt(value.slice(2, 4), 16)
    const blue = parseInt(value.slice(4, 6), 16)
    return `${red},${green},${blue}`
  }

  function readTrailRgb() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--turquoise').trim()
    if (raw.startsWith('#')) return hexToRgbTriplet(raw)
    return raw.replace(/[^\d,]/g, '')
  }

  function refreshTrailColor() {
    trailRgb = readTrailRgb()
  }

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1
    state.canvas.width = window.innerWidth * ratio
    state.canvas.height = window.innerHeight * ratio
    state.canvas.style.width = `${window.innerWidth}px`
    state.canvas.style.height = `${window.innerHeight}px`
    state.context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function onMouseMove(event) {
    cursorPath.push({ x: event.clientX, y: event.clientY, time: performance.now() })
    if (cursorPath.length > maxPathLength) cursorPath.shift()
  }

  function dropExpiredPoints(now) {
    while (cursorPath.length > 0 && now - cursorPath[0].time > trailDurationMs) {
      cursorPath.shift()
    }
  }

  function strokeSegment(previous, current, next, freshness) {
    const context = state.context
    const startX = (previous.x + current.x) / 2
    const startY = (previous.y + current.y) / 2
    const endX = (current.x + next.x) / 2
    const endY = (current.y + next.y) / 2
    const width = tailWidth + (headWidth - tailWidth) * freshness

    context.beginPath()
    context.moveTo(startX, startY)
    context.quadraticCurveTo(current.x, current.y, endX, endY)

    context.lineWidth = width * haloWidthMultiplier
    context.strokeStyle = `rgba(${trailRgb},${haloAlpha * freshness})`
    context.stroke()

    context.lineWidth = width
    context.strokeStyle = `rgba(${trailRgb},${headAlpha * freshness})`
    context.stroke()
  }

  function drawTrail(now) {
    const context = state.context
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    if (cursorPath.length < 3) return

    context.lineCap = 'butt'
    context.lineJoin = 'round'
    for (let i = 1; i < cursorPath.length - 1; i++) {
      const point = cursorPath[i]
      const freshness = 1 - (now - point.time) / trailDurationMs
      if (freshness <= 0) continue
      strokeSegment(cursorPath[i - 1], point, cursorPath[i + 1], freshness)
    }
  }

  function tick() {
    const now = performance.now()
    dropExpiredPoints(now)
    drawTrail(now)
    state.frameId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = document.createElement('canvas')
    canvas.className = 'cursor-trail'
    document.body.prepend(canvas)
    state = { canvas, context: canvas.getContext('2d'), frameId: null }
    refreshTrailColor()
    resizeCanvas()
    themeObserver = new MutationObserver(refreshTrailColor)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    state.frameId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    if (!state) return
    window.removeEventListener('resize', resizeCanvas)
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(state.frameId)
    themeObserver?.disconnect()
    state.canvas.remove()
    cursorPath.length = 0
    state = null
    themeObserver = null
  })
}
