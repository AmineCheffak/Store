export default function Button({ styleClass,text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styleClass || ''} rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950/30 `}
    >
      {text}
    </button>
  );
}