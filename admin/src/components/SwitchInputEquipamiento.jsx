export const SwitchInputEquipamiento = ({
  name,
  value,
  formData,
  handleCheckboxChange,
  view,
  text
}) => {
  return (
    <div>
      <label className='inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          name={name}
          value={value}
          checked={formData || false}
          onChange={handleCheckboxChange}
          className='sr-only peer'
          disabled={view}
        />

        <div className="relative w-9 h-5 bg-gray-500 cursor-pointer peer-disabled:bg-gray-300 peer-disabled:cursor-auto peer-focus:outline-0 outline-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
        <span className='ms-3 text-sm font-medium text-gray-900'>{text}</span>
      </label>
    </div>
  )
}
