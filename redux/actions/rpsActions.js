export const setHistory = (pChoice, cChoice, result) => ({
    type: 'PUSH',
    payload: {
        playerChoice: pChoice,
        comChoice: cChoice,
        result: result
    }
});

export const roundIncrement=()=>({
    type:'ROUND_INCREMENT'
});
export const scoreIncrement=()=>({
    type:'SCORE_INCREMENT'
});
export const scoreDecrement=()=>({
    type:'SCORE_DECREMENT'
});