import { onMounted, onUnmounted } from 'vue'

export default function useCursorGrid() {
  let state = null
  const dotSpacing = 40
  const mouseRadius = 350
  const persistenceMs = 1500 // Full intensity for 1.5s
  const fadeOutMs = 2000 // Fade out over 2s
  
  const mouse = { x: -1000, y: -1000 }
  let lastMoveTime = 0
  let intensity = 0

  function resizeCanvas() {
    if (!state) return
    const ratio = window.devicePixelRatio || 1
    state.canvas.width = window.innerWidth * ratio
    state.canvas.height = window.innerHeight * ratio
    state.canvas.style.width = `${window.innerWidth}px`
    state.canvas.style.height = `${window.innerHeight}px`
    state.ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  function onMouseMove(e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
    lastMoveTime = performance.now()
  }

  function tick() {
    if (!state) return
    const { ctx, canvas } = state
    const now = performance.now()
    const timeSinceMove = now - lastMoveTime

    let targetIntensity = 0
    if (timeSinceMove < persistenceMs) {
      targetIntensity = 1
    } else if (timeSinceMove < persistenceMs + fadeOutMs) {
      targetIntensity = 1 - (timeSinceMove - persistenceMs) / fadeOutMs
    }

    // Smoothly interpolate current intensity
    intensity += (targetIntensity - intensity) * 0.05

    if (intensity < 0.005) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      state.frameId = requestAnimationFrame(tick)
      return
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    
    // Get accent color from CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#34d399'
    ctx.fillStyle = primaryColor

    const scrollX = window.scrollX || 0
    const scrollY = window.scrollY || 0
    const offsetX = scrollX % dotSpacing
    const offsetY = scrollY % dotSpacing
    
    // Draw dots in a grid around the mouse
    const columns = Math.ceil(window.innerWidth / dotSpacing) + 2
    const rows = Math.ceil(window.innerHeight / dotSpacing) + 2

    for (let i = -1; i < columns; i++) {
      for (let j = -1; j < rows; j++) {
        const x = (i * dotSpacing) - offsetX
        const y = (j * dotSpacing) - offsetY
        
        const dx = x - mouse.x
        const dy = y - mouse.y
        const distSq = dx * dx + dy * dy
        const radiusSq = mouseRadius * mouseRadius

        if (distSq < radiusSq) {
          const distFactor = 1 - Math.sqrt(distSq) / mouseRadius
          const opacity = distFactor * intensity
          
          ctx.globalAlpha = opacity
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    state.frameId = requestAnimationFrame(tick)
  }

  onMounted(() => {
    const canvas = document.createElement('canvas')
    canvas.id = 'cursor-grid-canvas'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '0'
    document.body.appendChild(canvas)

    state = {
      canvas,
      ctx: canvas.getContext('2d'),
      frameId: null
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', onMouseMove)
    state.frameId = requestAnimationFrame(tick)
  })

  onUnmounted(() => {
    if (!state) return
    window.removeEventListener('resize', resizeCanvas)
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(state.frameId)
    state.canvas.remove()
    state = null
  })
}
