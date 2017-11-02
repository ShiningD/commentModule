// https://source.unsplash.com/daily
// https://source.unsplash.com/category/buildings/
// https://source.unsplash.com/category/nature/

// //api.aic.com/comment/add
// //api.aic.com/comment/del

<template>
  <div class="comment">
    <h3>{{ msg }}</h3>
    <h4>Comment Module Compoent</h4>

    <!-- // [Start]commentModule -->
    <div class="commentModule">

        <!-- [[댓글 상자 정보]] -->
        <div class="notiBox">
            <label>{{menuText.notificationBox.titleText}} ({{totalDataCount}})</label>
            <span><a href="#" class="reloadBtn" @click.prevent.stop="reloadComment">{{menuText.notificationBox.reloadBtnText}}</a></span>
        </div>


        <!-- [[댓글 쓰기 상자]] -->
        <div class="writeBox" v-if="commentModuleConfig.orderType === 'desc'">
            <form id="commentAdd" method="post">
                <div class="writerImg">
                    <img :src="userInfo.userProfileImage" />
                </div>
                <div class="writerNote">
                    <div class="formGroupBox">
                        <textarea class="noteText" type="text" placeholder="댓글 달기" v-model="newComment.commentText" />
                    </div>
                    <!-- {{menuText.writeBox.commentInputPlaceholderText}} -->

                    <div class="btnGroupArea">
                        <div class="btnLeftGroup">
                            <span><a href="#" class="addPictureBtn" @click.prevent.stop="addAttachComment">사진</a></span>
                        </div>
                        <div class="btnRightGroup">
                            <!-- <button type="submit" @click="addComment">등록</button> -->
                            <span><a href="#" class="addNewBtn" @click.prevent.stop="addComment">{{menuText.writeBox.addNewBtnText}}</a></span>
                        </div>
                    </div>
                </div>
                
                <input type="hidden" name="" v-model="newComment.attachList">

            </form>
        </div>  


        <!-- [[댓글 목록 상자]] -->
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
                                  <div v-show="commentItem.isEditing">
                                    <span><a href="#" class="modifyBtn" @click.prevent.stop="goModifyComment(commentItem)">수정</a></span>
                                    <span><a href="#" class="deleteBtn" @click.prevent.stop="deleteComment(commentItem, index)">삭제</a></span>
                                    <span>|</span>
                                    <span><a href="#" class="replyBtn" @click.prevent.stop="replyComment(commentItem)">답글</a></span>
                                  </div>
                                  <div v-show="!(commentItem.isEditing)">
                                    <span><a href="#" class="modifyBtn" @click.prevent.stop="cancleModifyReply(replyItem, index)">취소</a></span>
                                    <span><a href="#" class="modifyBtn" @click.prevent.stop="updateComment(commentItem, index)">저장</a></span>
                                  </div>
                                </div>
                                <div class="btnRightGroup" v-else>
                                  <span><a href="#" class="likeBtn" @click.prevent.stop="likeComment(commentItem)">좋아요</a></span>
                                  <span><a :href="'#reply-write-'+index" class="replyBtn" @click.stop="replyComment(commentItem, index)">답글</a></span>
                                </div>

                            </div>                    
                        </div>
                    </div>

                    <!-- [[댓글 바디]] -->
                    <div class="commentBody">
                        <div class="commentText">
                            <!-- TextArea로 변경 필요 -->
                            <textarea :id="'comment-'+index" class="" :readonly="commentItem.isEditing" v-model="commentItem.commentText"></textarea>
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
                                <span class="date sub-text"><a href="#" @click.prevent.stop="toggleRelies(commentItem)">답글 {{commentItem.replyList.length}}개</a></span>
                            </div>
                            <div class="btnRightGroup">
                                <span><a href="#" class="commentMenuBtn" @click.prevent.stop="contextMenu(commentItem)">메뉴</a></span>
                            </div>
                        </div>
                    </div>

                

<!-- =================================================================================================================== -->
<!-- =================================================================================================================== -->
<!-- =================================================================================================================== -->

                    <!-- [[댓글 세부 목록 상자]] -->
                    <div class="subListBox" v-show="commentItem.isShowReplies">
                    <!-- <div class="subListBox" v-if="commentItem.replyList.length > 0"> -->

                      <template v-if="commentModuleConfig.orderType === 'desc'">
                        <!-- [[답글 쓰기 상자]] -->
                        <div class="writeBox" v-show="commentItem.isEditingReply">
                            <form id="replyAdd" method="post">
                                <div class="writerImg sub">
                                    <img :src="userInfo.userProfileImage" />
                                </div>
                                <div class="writerNote">
                                    <div class="formGroupBox">
                                        <textarea :id="'reply-write-'+index" class="noteText" type="text" placeholder="답글 달기" v-model="newReply.replyText" />
                                    </div>
                                    <!-- {{menuText.writeBox.commentInputPlaceholderText}} -->

                                    <div class="btnGroupArea">
                                        <div class="btnLeftGroup">
                                            <span><a href="#" class="addPictureBtn" @click.prevent.stop="addAttachReply">사진</a></span>
                                        </div>
                                        <div class="btnRightGroup">
                                            <!-- <button type="submit" @click="addComment">등록</button> -->
                                            <span><a href="#" class="addNewBtn" @click.prevent.stop="addReply(commentItem)">{{menuText.writeBox.addNewBtnText}}</a></span>
                                        </div>
                                    </div>
                                </div>
                                
                                <input type="hidden" name="" v-model="newReply.attachList">

                            </form>
                        </div>                        
                      </template>
                        

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
                                              <div v-show="replyItem.isEditing">
                                                <span><a href="#" class="modifyBtn" @click.prevent.stop="goModifyReply(replyItem)">수정</a></span>
                                                <span><a href="#" class="deleteBtn" @click.prevent.stop="deleteReply(replyItem, index, commentItem)">삭제</a></span>
                                              </div>
                                              <div v-show="!(replyItem.isEditing)">
                                                <span><a href="#" class="modifyBtn" @click.prevent.stop="cancleModifyReply(replyItem, index)">취소</a></span>
                                                <span><a href="#" class="modifyBtn" @click.prevent.stop="updateReply(replyItem, index)">저장</a></span>
                                              </div>
                                            </div>
                                            <div class="btnRightGroup" v-else>
                                                <span><a href="#" class="likeBtn" @click.prevent.stop="likeReply(replyItem)">좋아요</a></span>
                                            </div>

                                        </div>                    
                                    </div>
                                </div>

                                <div class="replyBody">
                                    <div class="replyText">
                                        <textarea :id="'reply-'+index" class="" :readonly="replyItem.isEditing" v-model="replyItem.replyText"></textarea>
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
                                            <span><a href="#" class="replyMenuBtn" @click.prevent.stop="replyContextMenu(replyItem)">메뉴</a></span>
                                        </div>
                                    </div>                    
                                </div>
                            </li>
                        </ul>
                        <!-- // [[답글 목록]] -->


                        <template v-if="commentModuleConfig.orderType === 'asc'">
                        <!-- [[답글 쓰기 상자]] -->
                        <div class="writeBox" v-show="commentItem.isEditingReply">
                            <form id="replyAdd" method="post">
                                <div class="writerImg sub">
                                    <img :src="userInfo.userProfileImage" />
                                </div>
                                <div class="writerNote">
                                    <div class="formGroupBox">
                                        <text class="noteText" type="text" placeholder="답글 달기" v-model="newReply.replyText" />
                                    </div>
                                    <!-- {{menuText.writeBox.commentInputPlaceholderText}} -->

                                    <div class="btnGroupArea">
                                        <div class="btnLeftGroup">
                                            <span><a href="#" class="addPictureBtn" @click.prevent.stop="addAttachReply">사진</a></span>
                                        </div>
                                        <div class="btnRightGroup">
                                            <!-- <button type="submit" @click="addComment">등록</button> -->
                                            <span><a href="#" class="addNewBtn" @click.prevent.stop="addReply(commentItem)">{{menuText.writeBox.addNewBtnText}}</a></span>
                                        </div>
                                    </div>
                                </div>
                                
                                <input type="hidden" name="" v-model="newReply.attachList">

                            </form>
                        </div>                        
                      </template>


                    </div>
                    <!-- // [[댓글 세부 목록 상자]] -->

<!-- =================================================================================================================== -->
<!-- =================================================================================================================== -->
<!-- =================================================================================================================== -->

                </li>
            </ul>
        </div>










        <!-- [[댓글 쓰기 상자]] -->
        <div class="writeBox" v-if="commentModuleConfig.orderType === 'asc'">
            <form id="commentAdd" method="post">
                <div class="writerImg">
                    <img :src="userInfo.userProfileImage" />
                </div>
                <div class="writerNote">
                    <div class="formGroupBox">
                        <textarea class="noteText" type="text" placeholder="댓글 달기" v-model="newComment.commentText" />
                    </div>
                    <!-- {{menuText.writeBox.commentInputPlaceholderText}} -->

                    <div class="btnGroupArea">
                        <div class="btnLeftGroup">
                            <span><a href="#" class="addPictureBtn" @click.prevent.stop="addAttachComment">사진</a></span>
                        </div>
                        <div class="btnRightGroup">
                            <!-- <button type="submit" @click="addComment">등록</button> -->
                            <span><a href="#" class="addNewBtn" @click.prevent.stop="addComment">{{menuText.writeBox.addNewBtnText}}</a></span>
                        </div>
                    </div>
                </div>
                
                <input type="hidden" name="" v-model="newComment.attachList">

            </form>
        </div>  

    </div>
    <!-- // [End]commentModule -->


    
  </div> <!-- // 바깥 껍데기 div -->
</template>
<script>
// const bruceAlert = function bruceAlert(str) {
//   alert(str);
// };
export default {
  name: 'Comment',
  data() {
    return {
      msg: 'Bruce\'s Component Test',
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
    drawComment() {
      alert('called by any method.   Draw!! Comments!');
    },
    // NotificationBox ----------------------
    reloadComment() {
      // bruceAlert('draw Comment Click!!');
      alert('reload Comment Click!!');
    },
    // WriteBox -----------------------------
    addComment() {
      // [[this.newComment.commentText 값이 null or undefined or length < 1 이면, 실행 안함]]
      const newOne = {
        commentId: 0, // DB값으로
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
        isEditing: true,
        isEditingReply: false,
        isShowReplies: false,
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
        isEditing: true,
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

    // CommentList ------------------------------
    goModifyComment(cmtTarget) {
      const target = cmtTarget;
      target.isEditing = false;
    },
    updateComment(cmtTarget, index) {
      const target = cmtTarget;
      target.isEditing = true;

      // [[TODO]] Ajax 호출로 서버에 데이터 갱신 후 목록에서 수정 처리
      // 단, 서버로 호출할 경우, index 말고 commentId 값으로 변경한다.
      target.commentText = document.getElementById('comment-'+index).value;
    },
    deleteComment(cmtTarget, index) {
      const target = cmtTarget;

      // [[TODO]] Ajax 호출로 서버에 데이터 삭제 후 목록에서 삭제 처리
      this.commentList.splice(index, 1);
    },
    likeComment(cmtTarget) {
      const target = cmtTarget;
      
      let isLiekedComment = false;
      let index = -1;
      for (let key in target.likeList) {
        if (target.likeList[key].userId === this.userInfo.userId) {
           isLiekedComment = true;
           index = key;
           break;
        }
      }
      
      if(!isLiekedComment) {
        const newOne = {
          userId: this.userInfo.userId, // 사용자 정보(login info) 값으로
          userName: this.userInfo.userName, // db값
          userProfileImage: this.userInfo.userProfileImage, // db값
        };

        // [[TODO]] Ajax 호출로 서버에 데이터 갱신 후 목록에서 수정 처리
        target.likeList.push(newOne);

      } else {
        
        // [[TODO]] Ajax 호출로 서버에 데이터 갱신 후 목록에서 수정 처리
        if(index > -1){
          target.likeList.splice(index, 1);
        }
      }
      
    },
    replyComment(cmtTarget) {
      const target = cmtTarget;
      target.isEditingReply = !(target.isEditingReply);
      // 답글을 달기 위한 편집 창을 열면 답글 목록을 보여준다.
      if(target.isEditingReply === true){
        target.isShowReplies = true;
      }
      
    },
    contextMenu(cmtTarget, index) {
      const target = cmtTarget;
      alert(JSON.stringify(target));
      alert('contextMenu Click!!\n 댓글 신고 및 SNS 공유');
    },
    toggleRelies(cmtTarget) {
      const target = cmtTarget;
      target.isShowReplies = !(target.isShowReplies);
    },

    // ReplyList ------------------------------
    goModifyReply(rplTarget) {
      const target = rplTarget;
      target.isEditing = false;
    },
    updateReply(rplTarget, index) {
      const target = rplTarget;
      target.isEditing = true;

      // [[TODO]] Ajax 호출로 서버에 데이터 갱신 후 목록에서 수정 처리
      // 단, 서버로 호출할 경우, index 말고 replyId 값으로 변경한다.
      target.replyText = document.getElementById('reply-'+index).value;
    },
    deleteReply(rplTarget, index, cmtTarget) {
      const target = rplTarget;
      
      // [[TODO]] Ajax 호출로 서버에 데이터 삭제 후 목록에서 삭제 처리
      cmtTarget.replyList.splice(index, 1);
    },
    likeReply(rplTarget) {
      const target = rplTarget;
      
      let isLiekedReply = false;
      let index = -1;
      for (let key in target.likeList) {
        if (target.likeList[key].userId === this.userInfo.userId) {
           isLiekedReply = true;
           index = key;
           break;
        }
      }
      
      if(!isLiekedReply) {
        const newOne = {
          userId: this.userInfo.userId, // 사용자 정보(login info) 값으로
          userName: this.userInfo.userName, // db값
          userProfileImage: this.userInfo.userProfileImage, // db값
        };

        // [[TODO]] Ajax 호출로 서버에 데이터 갱신 후 목록에서 수정 처리
        target.likeList.push(newOne);

      } else {
        
        // [[TODO]] Ajax 호출로 서버에 데이터 갱신 후 목록에서 수정 처리
        if(index > -1){
          target.likeList.splice(index, 1);
        }
      }
      
    },
    replyContextMenu(rplTarget) {
      const target = rplTarget;
      alert(JSON.stringify(target));
      alert('replyContextMenu Click!!\n 답글 신고 및 SNS 공유');
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css);

/* h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
 */
.comment {
  margin: 20px;
}

.commentModule {
  width: 360px;
  border: 1px solid #bbb;
  margin: auto;
  text-align: initial;
}


/* 댓글 안내 영역 */

.notiBox {
  background-color: #fdfdfd;
  padding: 10px;
}

.notiBox label {
  color: #444;
  margin: 0;
  display: inline-block;
}

.notiBox span {
  color: #444;
  margin: 0;
  float: right;
}

/* 댓글 작성 영역 */

.writeBox {
  padding: 10px;
  border-top: 1px dotted #bbb;
}

.writeBox .writerImg {
  display: table-cell;
  width: 60px;
  margin-right: 5px;
  height: 100%;
  float: left;
}

.writeBox .writerImg.sub{
  width: 40px;
}

.writeBox .writerImg img {
  width: 100%;
  border-radius: 50%;
}

.writeBox .writerNote {
  width: 100%;
  position: relative;
}

.writeBox .formGroupBox {
  margin-bottom: 7px;
}

.writeBox .formGroupBox .noteText {
  padding: 4px 4px;
  font-size: 14px;
}



/* 댓글 목록 영역 */

.listBox {
  border-top: 1px dotted #bbb;
  padding: 10px;
  display: block;
}

.subListBox {
  padding-left: 40px;
  list-style: none;
  overflow: auto;
}

.commentList {
  padding: 0;
  list-style: none;
  overflow: auto;
}

.replyList {
  border-top: 1px dotted #bbb;
  padding: 10px;
  display: block;
}

.commentList li,
.replyList li {
  margin: 0;
  margin-top: 10px;
}

.commentList li > .commentHeader > .commenterImg,
.replyList li > .commentHeader > .commenterImg {
  display: table-cell;
}

.commentHeader,
.replyHeader {
}

.commentBody,
.replyBody {
  padding-top: 5px;
  padding-bottom: 2px;
}

.commentFooter,
.replyFooter {
}

.commenterImg,
.replyerImg {
  width: 40px;
  margin-right: 5px;
  height: 100%;
  float: left;
}

.commenterImg img,
.replyerImg img {
  width: 100%;
  border-radius: 50%;
}

.commentHeaderDetail,
.replyHeaderDetail {
  width: 100%;
  position: relative;
}

.commentHeaderDetail p,
.replyHeaderDetail p {
  margin: 0;
  text-align: left;
}

.commentText,
.replyText {
  width: 100%;
  position: relative;
}

.commentText p,
.replyText p {
  margin: 0;
  text-align: left;
}

.sub-text {
  color: #007dc3;
  font-family: "돋움", Dotum, "굴림", Gulim, arial;
  font-size: 12px;
  margin-right: 10px;
}

.sub-text-2 {
  color: #42b983;
  font-family: "돋움", Dotum, "굴림", Gulim, arial;
  font-size: 12px;
  margin-right: 10px;
}

.sub-text-3 {
  color: #999;
  font-family: "돋움", Dotum, "굴림", Gulim, arial;
  font-weight: bold;
  font-size: 12px;
  margin-right: 10px;
  margin-left: 0px;
}


.btnGroupArea {
  overflow: hidden;
}

.btnGroupArea p {
  margin: 0;
}

.btnLeftGroup {
  float: left;
}

.btnRightGroup {
  float: right;
}



.reloadBtn {
  background: url(/static/reloadBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

.addNewBtn {

}

.deleteBtn {
  background: url(/static/deleteBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

.modifyBtn {
  background: url(/static/editBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

.likeBtn {
  background: url(/static/likeBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

.replyBtn {
  background: url(/static/commentBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

.commentMenuBtn,
.replyMenuBtn {
  background: url(/static/menuBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

.addPictureBtn {
  background: url(/static/pictureBtn.png) no-repeat center;
  background-size: contain;
  vertical-align: middle;
}

</style>