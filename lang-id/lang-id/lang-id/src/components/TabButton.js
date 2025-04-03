import React from 'react';

function TabButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`tab-button ${active ? 'active' : ''}`}
    >
      {icon}
      <span className="tab-label">{label}</span>
    </button>
  );
}

export default TabButton;