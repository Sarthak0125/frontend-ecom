export default function Input({ label, ...props }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input {...props} className="form-control" />
    </div>
  );
}
