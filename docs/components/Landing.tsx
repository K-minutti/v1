import { useEffect, useRef } from 'react'

const SPACING = 28
const RADIUS = 140

function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const color = getComputedStyle(canvas).color
    const target = { x: -9999, y: -9999 }
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let frame = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduceMotion) draw(0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      const offsetX = (width % SPACING) / 2
      const offsetY = (height % SPACING) / 2

      for (let x = offsetX; x <= width; x += SPACING) {
        for (let y = offsetY; y <= height; y += SPACING) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const influence = Math.exp(-(dist * dist) / (2 * RADIUS * RADIUS))
          const wave = reduceMotion ? 0 : Math.sin(t * 0.0008 + x * 0.012 + y * 0.009)
          const push = influence * 14

          ctx.globalAlpha = Math.min(1, 0.14 + wave * 0.06 + influence * 0.8)
          ctx.beginPath()
          ctx.arc(x + (dx / dist) * push, y + (dy / dist) * push, 1 + influence * 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (t: number) => {
      mouse.x += (target.x - mouse.x) * 0.12
      mouse.y += (target.y - mouse.y) * 0.12
      draw(t)
      frame = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      // Jump instead of easing in from off-screen on first contact.
      if (target.x < -999) {
        mouse.x = e.clientX - rect.left
        mouse.y = e.clientY - rect.top
      }
      target.x = e.clientX - rect.left
      target.y = e.clientY - rect.top
    }

    const onLeave = () => {
      target.x = -9999
      target.y = -9999
      mouse.x = -9999
      mouse.y = -9999
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    if (reduceMotion) {
      window.addEventListener('pointermove', onMove)
      document.addEventListener('pointerleave', onLeave)
      frame = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="landing-field" aria-hidden="true" />
}

export function Landing() {
  return (
    <section className="landing">
      <DotField />
      <div className="landing-content">
        <h1 className="landing-title">Kevin Minutti</h1>
        <p className="landing-subtitle">
          AI/ML Software Engineer<span className="landing-caret" aria-hidden="true" />
        </p>
        <nav className="landing-links">
          <a href="/blog">Blog</a>
          <a href="https://github.com/K-minutti" target="_blank" rel="noreferrer noopener">
            GitHub ↗
          </a>
        </nav>
      </div>
    </section>
  )
}
