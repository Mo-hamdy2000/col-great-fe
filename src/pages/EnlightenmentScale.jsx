import { useState } from "react";

function EnlightenmentScale() {
  return (
    <>
    <div className="text-center">
      <a href="https://forms.office.com/r/D4PR1szRqH" style={{
            display: 'inline-block',
            padding: '2rem 1rem',
            margin: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #4ade80, #86efac)', 
            borderRadius: '9999px',
            transition: 'all 0.3s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #22c55e, #4ade80)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #4ade80, #86efac)'
            e.currentTarget.style.transform = 'scale(1)'
          }}>
        مقياس التجول العقلي القبلي
      </a>
    </div>
  <div className="text-center">
      <a href="https://forms.office.com/r/giN48NduF4" style={{
            display: 'inline-block',
            padding: '2rem 1rem',
            margin: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #4ade80, #86efac)', 
            borderRadius: '9999px',
            transition: 'all 0.3s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #22c55e, #4ade80)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #4ade80, #86efac)'
            e.currentTarget.style.transform = 'scale(1)'
          }}>
        مقياس الإجهاد الرقمي القبلي
      </a>
    </div>
    <div className="text-center">
      <a href="https://forms.office.com/r/ckArMUuNmn" style={{
            display: 'inline-block',
            padding: '2rem 1rem',
            margin: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #4ade80, #86efac)', 
            borderRadius: '9999px',
            transition: 'all 0.3s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #22c55e, #4ade80)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #4ade80, #86efac)'
            e.currentTarget.style.transform = 'scale(1)'
          }}>
        اختبار تحصيل الجانب المعرفي لمهارات تطوير الواقع المعزز القبلي
      </a>
    </div>
    <div className="text-center">
      <a href="https://forms.office.com/r/V3y8s7Ef43" style={{
            display: 'inline-block',
            padding: '2rem 1rem',
            margin: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #4ade80, #86efac)', 
            borderRadius: '9999px',
            transition: 'all 0.3s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #22c55e, #4ade80)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #4ade80, #86efac)'
            e.currentTarget.style.transform = 'scale(1)'
          }}>
        مقياس الإجهاد الرقمي البعدي
      </a>
    </div>
    <div className="text-center">
      <a href="https://forms.office.com/r/1TWzHG5sQE" style={{
            display: 'inline-block',
            padding: '2rem 1rem',
            margin: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #4ade80, #86efac)', 
            borderRadius: '9999px',
            transition: 'all 0.3s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #22c55e, #4ade80)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #4ade80, #86efac)'
            e.currentTarget.style.transform = 'scale(1)'
          }}>
        مقياس التجول العقلي البعدي
      </a>
    </div>
    <div className="text-center">
      <a href="https://forms.office.com/r/T0ExBYs7XZ" style={{
            display: 'inline-block',
            padding: '2rem 1rem',
            margin: '0.5rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(to right, #4ade80, #86efac)', 
            borderRadius: '9999px',
            transition: 'all 0.3s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1)',
          }} onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #22c55e, #4ade80)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }} onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #4ade80, #86efac)'
            e.currentTarget.style.transform = 'scale(1)'
          }}>
        اختبار تحصيل الجانب المعرفي لمهارات تطوير الواقع المعزز البعدي
      </a>
    </div>
  </>
  );
}

export default EnlightenmentScale;
