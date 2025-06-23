import React, { useEffect } from "react"
import ReactDOM from "react-dom"

const modalRoot =
  typeof document !== "undefined"
    ? document.getElementById("modal-root") ||
      (() => {
        const el = document.createElement("div")
        el.id = "modal-root"
        document.body.appendChild(el)
        return el
      })()
    : null            // during SSR document is undefined

export default function Modal({ isOpen, onClose, children }) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = e => e.key === "Escape" && onClose()
    if (isOpen) window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  if (!isOpen || !modalRoot) return null

  return ReactDOM.createPortal(
    (
      <div
        role="dialog"
        aria-modal="true"
        className="modal-overlay"
        onClick={onClose}
      >
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()} // keep clicks inside modal
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
          {children}
        </div>
      </div>
    ),
    modalRoot
  )
}
