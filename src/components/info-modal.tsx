import { type ReactNode, useEffect, useRef } from "react";

type InfoModalProps = {
  open: boolean;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  onClose: () => void;
};

export function InfoModal({ open, eyebrow, title, children, action, onClose }: InfoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;
  return <div className="info-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
      <button ref={closeRef} className="info-modal-close" type="button" onClick={onClose} aria-label="Fechar explicação">×</button>
      {eyebrow && <p className="info-modal-eyebrow">{eyebrow}</p>}
      <h2 id="info-modal-title">{title}</h2>
      <div className="info-modal-content">{children}</div>
      {action && <div className="info-modal-action">{action}</div>}
    </section>
  </div>;
}
