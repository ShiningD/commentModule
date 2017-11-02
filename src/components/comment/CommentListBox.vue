
<template>

  <div class="listBox" v-if="commentList.length > 0">

    <ul class="commentList" v-for="(commentItem, index) in commentList">

        <li>
            <!-- [[댓글 헤더]] -->
            <div class="commentHeader">
                <div class="commenterImg">
                    <img :src="commentItem.userProfileImage" />
                </div>
                <div class="commentHeaderDetail">
                    <div class="btnGroupArea">
                        <div class="btnLeftGroup">
                            <p class="">{{commentItem.userName}}</p>
                            <span class="date sub-text-3">{{commentItem.calcWrittenDate}}</span>
                        </div>
                        <div class="btnRightGroup" v-if="isOwner(commentItem.userId)">
                            <span><a href="#" class="modifyBtn" @click.prevent.stop="modifyComment(commentItem)">수정</a></span>
                            <span><a href="#" class="deleteBtn" @click="deleteComment(commentItem)">삭제</a></span>
                            |
                            <span><a href="#" class="replyBtn" @click="replyComment(commentItem)">답글</a></span>
                        </div>
                        <div class="btnRightGroup" v-else>
                            <span><a href="#" class="likeBtn" @click="likeComment(commentItem)">좋아요</a></span>
                            <span><a href="#" class="replyBtn" @click="replyComment(commentItem)">답글</a></span>
                        </div>

                    </div>                    
                </div>
            </div>

            <!-- [[댓글 바디]] -->
            <div class="commentBody">
                <div class="commentText">
                    <!-- TextArea로 변경 필요 -->
                    <textarea class="" :readonly="commentItem.isEditingComment" >{{commentItem.commentText}}</textarea>
                    <template v-if="commentItem.attachList.length > 0">
                        <div v-for="(attachItem, index) in commentItem.attachList">
                            <img width="100%" :src="attachItem.attachUrl" >
                        </div>
                    </template>
                </div>
            </div>

            <!-- [[댓글 푸터]] -->
            <div class="commentFooter">
                <div class="btnGroupArea">
                    <div class="btnLeftGroup">
                        <span class="date sub-text-2">좋아요 {{commentItem.likeList.length}}</span>
                        <span class="date sub-text"><a href="#" >답글 {{commentItem.replyList.length}}개</a></span>
                    </div>
                    <div class="btnRightGroup">
                        <span><a href="#" class="commentMenuBtn" @click="contextMenu(commentItem)">메뉴</a></span>
                    </div>
                </div>
            </div>

            <!-- [[댓글 세부 목록 상자]] -->
            <div class="subListBox">
            <!-- <div class="subListBox" v-if="commentItem.replyList.length > 0"> -->

              <!-- [[댓글 쓰기 상자]] -->
              <reply-write-box v-if="commentModuleConfig.orderType === 'desc'"/>
              
              <!-- [[댓글 목록 상자]] -->
              <reply-list-box />

              <!-- [[댓글 쓰기 상자]] -->
              <reply-write-box v-if="commentModuleConfig.orderType === 'asc'"/>

            </div>
            <!-- // [[댓글 세부 목록 상자]] -->

          </li>
      </ul>
  </div>

</template>

<script>

import ReplyWriteBox from '@/components/reply/ReplyWriteBox'
import ReplyListBox from '@/components/reply/ReplyListBox'

export default {
  components: {
    ReplyWriteBox,
    ReplyListBox,
  },
  name: 'CommentListBox',
  data() {
    return {
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
  },
  computed: {
    totalDataCount() {
      return this.commentList.length;
    },
    toggleVal(val) {
      return !(val);
    },
  },
  methods: {
    calcWrittenDate(writtenDate) {
      const calcWrittenDateText = writtenDate;
      // calcWrittenDateText
      return calcWrittenDateText;
    },
    isOwner(ownerId) {
      return (this.userInfo.userId === ownerId);
    },
    // WriteBox -----------------------------
    addComment() {
      // [[this.newComment.commentText 값이 null or undefined or length < 1 이면, 실행 안함]]
      const newOne = {
        commnetId: 0, // DB값으로
        commentText: this.newComment.commentText,
        userId: this.userInfo.userId, // 사용자 정보(login info) 값으로
        userName: this.userInfo.userName, // 사용자 정보(login info) 값으로
        userProfileImage: this.userInfo.userProfileImage, // 사용자 정보(login info) 값으로
        calcWrittenDate: '2017년 00월 00일 17:23:48', // DB값으로(처음엔 regDate값, 이후엔 modDate값)
        attachList: [],
        likeList: [],
        replyList: [],
        regDate: '2017-10-23 17:00:30', // DB값으로
        modDate: '2017-10-23 17:00:30', // DB값으로
        isEditingComment: true,
        isEditingReply: false,
      };

      // [TODO] 서버 호출(값 저장) 후 데이터 정상 저장 시,
      // hash값을 비교 하여 새로운 반영 안된 데이터가 있는지 확인
      // 1. 만약 갱신되지 않은 새로운 데이터가 없다면, "현재 리스트에 입력 값 추가"
      // 2. 만약 갱신되지 않은 새로운 데이터가 존재한다면, "새로고침 요청"

      // 현재 리스트에 입력 값 추가
      if(this.commentModuleConfig.orderType === 'desc') {
        this.commentList.unshift(newOne);
      } else if (this.commentModuleConfig.orderType === 'asc') {
        this.commentList.push(newOne);
      }

      // 입력값 초기화
      this.newComment.commentText = '';
      this.newComment.attachList = [];

      return false;
    },
    addAttachComment() {
      alert('addAttach Click!!\n 댓글 첨부파일 등록');
      // this.checked = !this.checked;
    },
    
    // ListBox

    // CommentList ------------------------------
    modifyComment(cmtTarget) {
      const target = cmtTarget;
      target.isEditingComment = false;

      alert('modifyComment Click!!\n 댓글 수정을 위해 textarea readonly 속성 해제!');
    },
    deleteComment(cmtTarget) {
      const target = cmtTarget;
      alert(JSON.stringify(target));
      alert('deleteComment Click!!\n 서버에 삭제 요청 이후 정상 제거 되면, 모델 객체에서 해당 객체 제거! 갱신 동작 안함');
    },
    likeComment(cmtTarget) {
      const target = cmtTarget;
      alert(JSON.stringify(target));
      alert('likeComment Click!!\n 서버에 좋아요 요청 이후 정상 처리 되면, 해당 모델 객체만 갱신');
    },
    replyComment(cmtTarget) {
      const target = cmtTarget;
      target.isEditingReply = !(target.isEditingReply);
    },
    contextMenu(cmtTarget) {
      const target = cmtTarget;
      alert(JSON.stringify(target));
      alert('contextMenu Click!!\n 댓글 신고 및 SNS 공유');
    },
  },

};
</script>
