import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "components/common/button";
import Comment from "components/common/comment";
import getBoardDetail from "quires/board/getBoardDetail";
import Input from "components/Input/Input";
import getComments from "quires/comment/getComment";

const Detail: FC = () => {
  const param = useParams();
  const img = process.env.PUBLIC_URL;
  const { data: detail } = getBoardDetail(Number(param.id));
  const [info, setInfo] = useState({
    name: "test",
    title: "test",
    contents: "test",
  });
  const [text, setText] = useState("dd");
  const [reply, setReply] = useState("");
  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const editComplete = (e: any) => e.target.value;
  // comment 가져오는 query 작성
  const { data: getComment } = getComments(Number(155));
  // 디테일
  useEffect(() => {
    if (detail) {
      console.log(detail.data);
      setInfo({
        name: detail.data.writer,
        title: detail.data.title,
        contents: detail.data.contents,
      });
    }
  }, [detail]);
  // 댓글조회
  useEffect(() => {
    if (getComment) console.log(getComment);
  }, [getComment]);
  return (
    <>
      <div className="board">
        <Link to="/board" className="back-button">
          <img src={`${img}/common/ChevronLeftOutline.png`} alt="" />
        </Link>
        <div className="board-content">
          <h2>{info.title}</h2>
          <div className="user">
            <span>
              <img src={`${img}/common/join-1.png`} alt="" />
            </span>
            <div>
              <h3>{info.name}</h3>
              <p>1시간 전</p>
            </div>
          </div>
          <div className="board-detail">
            <p dangerouslySetInnerHTML={{ __html: info.contents }} />
            <Button text="좋아요" handler={() => console.log("test")} />
          </div>
        </div>
      </div>
      <Comment
        myComment
        writer="이하영"
        text={text}
        date="2023-03-25"
        editHandler={textHandler}
        editCompleteHanler={editComplete}
      />
      <div className="reply">
        <span>
          <img src="/common/join-1.png" alt="유저 프로필 이미지" />
        </span>
        <Input value={reply} setValue={setReply} />
      </div>
    </>
  );
};

export default Detail;
