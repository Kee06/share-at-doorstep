function FormSelect({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={onChange} required>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export default FormSelect;