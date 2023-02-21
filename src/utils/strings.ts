export default {
  // DB 와 통신 중 발생하는 메시지
  db: {
    err: {
      unknown: 'DB에 문제가 발생했습니다.'
    },
  },
  // 서버와 통신 중 발생하는 메시지
  server: {
    posts: {
      addSuccess: '글 작성이 완료되었습니다.',
      addFail:    '글 작성에 실패했습니다.',
    },
  },
  // 브라우저에 보여지는 메시지
  page: {
    ph: { // placeholder
      title: '제목을 입력해주세요.',
      topic: '토픽을 입력해주세요.',
    },
  },
}