export const increment = state => {
  state.count++;
  state.history.push('increment');
};

export const decrement = state => {
  state.count--;
  state.history.push('decrement');
};

export const addComment = (state, payload) {
  // 현재 리스트에 입력 값 추가
  if(state.commentModuleConfig.orderType === 'desc') {
    cmtTarget.commentList.unshift(payload);
  } else if(state.commentModuleConfig.orderType === 'asc') {
    cmtTarget.commentList.push(payload);
  }
};

