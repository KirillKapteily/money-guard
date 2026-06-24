// export default function StatisticsItem({item}) {
// const {category, amount, color} = item;

//     return (
//         <li>
//             <div>
//                 <span></span>
//             </div>
//         </li>
//     )
// }


import React from 'react';

export default function StatisticsItem({ item }) {
  const { category, amount, color } = item;

  return (
    <li className="statistics-item">
      <div className="category-info">
        <span 
          className="color-marker" 
          style={{ backgroundColor: color }}
        ></span>
        <span className="category-name">{category}</span>
      </div>
      <span className="amount-value">
        {amount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
      </span>
    </li>
  );
}