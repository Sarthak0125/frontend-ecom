export default function Button({ children, ...props }) {
  return (
    <button {...props} className="btn btn-primary w-100">
      {children}
    </button>
  );
}
