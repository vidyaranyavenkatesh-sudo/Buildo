// Draws four small crosshair marks in the corners of whatever element this
// sits inside. The parent must have `relative` positioning. This is the one
// motif repeated across cards, panels, and frames throughout the app - like
// registration marks on a drafting sheet.
export default function CornerMarks({ color = 'border-blueprint-lineBright/60' }) {
  const base = `absolute w-3 h-3 ${color}`;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}
