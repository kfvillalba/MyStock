import React from 'react'

const EyeIcon = ({ clases }) => {
  return (
    <svg
      className={`inline-block ${clases}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path d='M12 3C7.03 3 2.73 7.33 2.08 7.93a1 1 0 0 0 0 1.14C2.73 8.67 7.03 13 12 13s9.27-4.33 9.92-4.93a1 1 0 0 0 0-1.14C21.27 7.33 16.97 3 12 3zM12 11a3 3 0 1 1 3-3 3 3 0 0 1-3 3z' />
    </svg>
  )
}

export default EyeIcon
