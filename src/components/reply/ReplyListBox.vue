<template>

    <!-- [[답글 목록]] -->
    <ul class="replyList" v-for="(replyItem, index) in commentItem.replyList">
        <li>
            <div class="replyHeader">
                <div class="replyerImg">
                    <img :src="replyItem.userProfileImage" />
                </div>
                <div class="replyHeaderDetail">
                    <div class="btnGroupArea">
                        <div class="btnLeftGroup">
                            <p class="">{{replyItem.userName}}</p>
                            <span class="date sub-text-3">{{replyItem.calcWrittenDate}}</span>
                        </div>
                        <div class="btnRightGroup" v-if="isOwner(replyItem.userId)">
                            <span><a href="#" class="modifyBtn" @click="modifyReply(replyItem)">수정</a></span>
                            <span><a href="#" class="deleteBtn" @click="deleteReply(replyItem)">삭제</a></span>
                        </div>
                        <div class="btnRightGroup" v-else>
                            <span><a href="#" class="likeBtn" @click="likeReply(replyItem)">좋아요</a></span>
                        </div>

                    </div>                    
                </div>
            </div>

            <div class="replyBody">
                <div class="replyText">
                    <p class="">{{replyItem.replyText}}</p>
                    <div v-for="(attachItem, index) in replyItem.attachList">
                        <img width="100%" :src="attachItem.attachUrl" >
                    </div>                    
                </div>
            </div>

            <div class="replyFooter">
                <div class="btnGroupArea">
                    <div class="btnLeftGroup">
                        <span class="date sub-text-2">좋아요 {{replyItem.likeList.length}}</span>
                    </div>
                    <div class="btnRightGroup">
                        <span><a href="#" class="replyMenuBtn" @click="replyContextMenu(replyItem)">메뉴</a></span>
                    </div>
                </div>                    
            </div>
        </li>
    </ul>
    <!-- // [[답글 목록]] -->              

</template>

<script>

export default {
  name: 'ReplyListBox',
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
      // 새로운 답글 정보 (연동 필요)
      newReply: {
        replyText: '',
        attachList: [],
      },
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
    addReply(cmtTarget) {
      // [[this.newReply.replyText 값이 null or undefined or length < 1 이면, 실행 안함]]
      const newOne = {
        replyId: 0, // DB값으로
        replyText: this.newReply.replyText,
        userId: this.userInfo.userId, // 사용자 정보(login info) 값으로
        userName: this.userInfo.userName, // 사용자 정보(login info) 값으로
        userProfileImage: this.userInfo.userProfileImage, // 사용자 정보(login info) 값으로
        calcWrittenDate: '2017년 00월 00일 17:23:48', // DB값으로(처음엔 regDate값, 이후엔 modDate값)
        attachList: [],
        likeList: [],
        regDate: '2017-10-23 17:00:30', // DB값으로
        modDate: '2017-10-23 17:00:30', // DB값으로
      };

      // [TODO] 서버 호출(값 저장) 후 데이터 정상 저장 시,
      // hash값을 비교 하여 새로운 반영 안된 데이터가 있는지 확인
      // 1. 만약 갱신되지 않은 새로운 데이터가 없다면, "현재 리스트에 입력 값 추가"
      // 2. 만약 갱신되지 않은 새로운 데이터가 존재한다면, "새로고침 요청"

      // 현재 리스트에 입력 값 추가
      if(this.commentModuleConfig.orderType === 'desc') {
        cmtTarget.replyList.unshift(newOne);
      } else if(this.commentModuleConfig.orderType === 'asc') {
        cmtTarget.replyList.push(newOne);
      }
      

      // 입력값 초기화
      this.newReply.replyText = '';
      this.newReply.attachList = [];

      return false;
    },
    addAttachReply() {
      alert('addAttach Click!!\n 답글 첨부파일 등록');
      // this.checked = !this.checked;
    },

    // ListBox

    // ReplyList ------------------------------
    modifyReply(rplTarget) {
      const target = rplTarget;
      alert(JSON.stringify(target));
      alert('modifyReply Click!!\n 답글 수정을 위해 textarea readonly 속성 해제!');
    },
    deleteReply(rplTarget) {
      const target = rplTarget;
      alert(JSON.stringify(target));
      alert('deleteReply Click!!\n 서버에 삭제 요청 이후 정상 제거 되면, 모델 객체에서 해당 객체 제거! 갱신 동작 안함');
    },
    likeReply(rplTarget) {
      const target = rplTarget;
      alert(JSON.stringify(target));
      alert('likeReply Click!!\n 서버에 좋아요 요청 이후 정상 처리 되면, 해당 모델 객체만 갱신');
    },
    replyContextMenu(rplTarget) {
      const target = rplTarget;
      alert(JSON.stringify(target));
      alert('replyContextMenu Click!!\n 답글 신고 및 SNS 공유');
    },
  },

};

</script>