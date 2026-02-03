import { gsap } from 'gsap'

export const useScrollTo = () => {
  const scrollToElement = (elementId: string) => {
    if (!process.client) return

    const id = elementId.replace('#', '')
    const element = document.getElementById(id)
    
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element,
          offsetY: 80,
          autoKill: false
        },
        ease: 'power2.inOut'
      })
      
      history.pushState(null, '', elementId)
    }
  }

  return {
    scrollToElement
  }
} 