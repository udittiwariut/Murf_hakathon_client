function MyCheckbox({ handleChange, isChecked, children }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="myCheckbox"
        className="form-checkbox h-5 w-5 border border-black transition duration-150 ease-in-out"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor="myCheckbox" className="ml-2 text-gray-700">
        {children}
      </label>
    </div>
  );
}
export default MyCheckbox;
