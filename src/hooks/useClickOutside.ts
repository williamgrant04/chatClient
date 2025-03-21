import { RefObject, useEffect } from "react"

export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (e: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref?.current || ref?.current.contains(e.target as Node) || (e.target as HTMLElement)?.id === "dropdownWrapper") return // I could not come up with a better solution
      handler(e)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
