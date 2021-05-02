import React from 'react';

function Counter({
  count,
  diff,
  onIncrease,
  onDecrease,
  onSetDiffer,
}) {
  const onChange = event => {
    onSetDiffer(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;