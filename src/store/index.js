import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  count: 0,
  history: [],

  // 댓글 모듈 설정 정보
  commentModuleConfig: {
    orderType: 'desc', // desc or asc
    LangType: 'kr',
  },
  // 언어 유형별 메뉴 글자 변경
  menuText: {
    notificationBox: {
      titleText: '댓글',
      reloadBtnText: '새로고침',
    },
    writeBox: {
      commentInputPlaceholderText: '댓글 달기',
      addNewBtnText: '등록',
    },
  },
  // 회원 정보 (연동 필요)
  userInfo: {
    userId: 'bruce_oh',
    userName: '브루스',
    userProfileImage: 'http://placekitten.com/g/45/45',
  },
  // 새로운 댓글 정보 (연동 필요)
  newComment: {
    commentText: '',
    attachList: [],
  },
  // 새로운 답글 정보 (연동 필요)
  newReply: {
    replyText: '',
    attachList: [],
  },
  commentList: [
    // {
    //   commnetId: 0,
    //   commentText: '',
    //   userId: '',
    //   userName: '',
    //   userProfileImage: '',
    //   calcWrittenDate: '',
    // (computed? methods?) OO 초전, OO 분전, OO 시간전, O 일전, 2017년 00월 00일 17:23:48
    //   attachList: [
    //     {
    //       attachSeq: 0,
    //       attachUrl: '',
    //       attachTypeCode: '',
    //     },
    //   ],
    //   likeList: [],
    //   replyList: [
    //     {
    //       replyId: 5,
    //       replyText: '',
    //       userId: '',
    //       userName: '',
    //       userProfileImage: '',
    //       calcWrittenDate: '',
    //       attachList: [
    //         {
    //           attachSeq: 0,
    //           attachUrl: '',
    //           attachTypeCode: '',
    //         },
    //       ],
    //       likeList: [],
    //       regDate: '2017-10-23 17:00:30',
    //       modDate: '2017-10-23 17:00:30',
    //     },
    //   ],
    //   regDate: '2017-10-23 17:00:30',
    //   modDate: '2017-10-23 17:00:30',
    // },
  ],
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

// if (module.hot) {
//   module.hot.accept([
//     './getters',
//     './actions',
//     './mutations',
//   ], () => {
//     store.hotUpdate({
//       getters: require('./getters'),
//       actions: require('./actions'),
//       mutations: require('./mutations'),
//     });
//   });
// }

export default store;
