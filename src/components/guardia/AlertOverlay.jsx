// Placeholder for future AI detection overlays (bounding boxes, alert badges, toasts).
// Wire real detections in via the `alerts` prop — e.g. [{ type: 'fire', box: [x,y,w,h], confidence }].
// Intentionally renders nothing until AI inference is connected.
export default function AlertOverlay({ alerts = [] }) {
  if (!alerts.length) return null;
  return null;
}
