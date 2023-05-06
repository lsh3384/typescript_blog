import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../features/counter/counterSlice';
import { RootState } from '../store';

const Counter = () => {
    const counterValue = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
  const handlePluseCounter = () => dispatch(increment());
	return (
		<>
			<p>counterValue : {counterValue}</p>
            <button onClick={handlePluseCounter}>counter 증가</button>
		</>
	);
};

export default Counter;
