import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../features/counter/counterSlice';
import { RootState } from '../store';

const Counter = () => {
    const counterValue = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
  const handlePlusCounter = () => dispatch(increment());
  const handleMinusCounter = () => dispatch(decrement());
	return (
		<>
			<p>counterValue : {counterValue}</p>
            <button onClick={handlePlusCounter}>counter 증가</button>
            <button onClick={handleMinusCounter}>counter 감소</button>
		</>
	);
};

export default Counter;

