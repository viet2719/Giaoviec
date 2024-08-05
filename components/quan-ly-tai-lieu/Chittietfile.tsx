import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import styles from './Chitiet.module.css';
import { POST } from '@/pages/api/auth';
import { convertTimestamp } from '@/utils/dataUtils';
import BtnEdit from './BtnEdit';
import { getCurrentID, getType } from '@/pages/api/auth';

interface Comment {
  id: number;
  staff_name: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export default function Chitietfile({
  setActiveKey,
  setOpenKeys,
  selectedColor,
}: {
  selectedColor: string;
  setActiveKey: Function;
  setOpenKeys: Function;
}) {
  // hiện bình luận
  const file = JSON.parse(String(localStorage.getItem('file')));
  const [reload, setReload] = useState(false);
  const [isIframeFullscreen, setIsIframeFullscreen] = useState(false); // Thêm trạng thái
  const [isCommentVisible, setIsCommentVisible] = useState(true); // Thêm trạng thái
  const [comments, setComments]: any = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const admin = getType() === '1';
  const employee = getCurrentID();
  useEffect(() => {
    POST(`files/chi-tiet-tai-lieu/${file.id}`).then((response) => {
      setComments(response?.data?.fileComment);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const onClick = (info: any) => {
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const renderApplyKey = () => {
    setActiveKey('tai-lieu-cong-viec');
  };
  const toggleFullscreen = () => {
    setIsIframeFullscreen(!isIframeFullscreen);
    setIsCommentVisible(!isIframeFullscreen); // Ẩn bình luận khi phóng to, hiển thị khi thu nhỏ
  };
  const addComment = (content: string) => {
    if (content.trim() !== '') {
      POST(`files/chi-tiet-tai-lieu/${file.id}/add-comment`, { content }).then(
        (res) => {
          setReload(!reload);
        }
      );
      setCommentInput('');
    }
  };

  const handleEditComment = () => {
    // Thực hiện chỉnh sửa bình luận tại đây
    alert('Chỉnh sửa bình luận thành công!');
  };
  return (
    <div>
      <div className="box_document">
        <div id="list_document" className={styles.lit_document}>
          <div
            className={`text_document1  
                    ${selectedColor}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '15px',
              }}
            >
              <Image
                unoptimized
                width={33}
                height={34}
                alt=""
                src="https://hungha365.com/storageimage/GV/doc_detal.png"
                className={styles.img}
              />
              <h4
                className={`name_document ${styles.name_document}`}
                style={{ margin: '0', paddingLeft: '10px' }}
              >
                {file?.name_file}
              </h4>
            </div>
            <div style={{ display: 'flex' }}>
              {/* Thêm nút để phóng to iframe */}
              <p
                onClick={toggleFullscreen}
                style={{
                  padding: '16px 20px 0px 0px',
                  alignItems: 'center',
                }}
                className={styles.tonho}
              >
                {isIframeFullscreen ? (
                  <Image
                    unoptimized
                    width={20}
                    height={20}
                    alt=""
                    src="https://hungha365.com/storageimage/GV/morong.png"
                  />
                ) : (
                  <Image
                    unoptimized
                    width={20}
                    height={20}
                    alt=""
                    src="https://hungha365.com/storageimage/GV/thunho.png"
                  />
                )}
              </p>
              <div onClick={renderApplyKey}>
                <p
                  style={{
                    textAlign: 'center',
                    color: '#ffffff',
                    float: 'right',
                    padding: '12px 20px 0px 0px',
                    margin: '0px',
                    cursor: 'pointer',
                  }}
                  className={styles.daux}
                >
                  X
                </p>
              </div>
            </div>
          </div>

          <div className={`scrollmobile2 `} style={{ width: '100%' }}>
            <div
              style={{ width: '100%', height: '800px' }}
              className={styles.scroll}
            >
              <div
                style={{
                  width: isIframeFullscreen ? '100%' : '640px',
                  height: '700px',
                  background: '#cccccc',
                }}
              >
                <iframe
                  src={`https://docs.google.com/viewerng/viewer?url=https://phanmemgiaoviec.timviec365.vn/resources/docs/1694512014_hamc.docx`}
                  width={isIframeFullscreen ? '100%' : 1040}
                  height={isIframeFullscreen ? '100%' : 900}
                />
                {/* <iframe width={isIframeFullscreen ? '100%' : 1040}
                                    height={isIframeFullscreen ? '100%' : 900} src="https://docs.google.com/viewer?embedded=true&amp;url=https://phanmemgiaoviec.timviec365.vn//resources/docs/1694226761_cautruc.docx"></iframe> */}
                {/* <DocViewer documents={[{url:`http://210.245.108.202:3012/base365/giaoviec365/Job/1694224931_Day24.docx`}]}  
                                    width={isIframeFullscreen ? '100%' : 1040}
                                    height={isIframeFullscreen ? '100%' : 900}
                                 />  */}
              </div>

              {/* Hiển thị bình luận dựa trên trạng thái isCommentVisible */}
              {isCommentVisible && (
                <div>
                  <label className={styles.comment}>Bình luận</label>
                  <div
                    className={`all_cmt ${styles.all_cmt}`}
                    style={{ margin: '10px' }}
                  >
                    {comments.map((comment: any) => (
                      <div
                        key={comment?.id}
                        className="ach_cmt"
                        style={{ display: 'flex' }}
                      >
                        <div
                          className="tnbl_cmt"
                          style={{ display: 'flex', width: '50%' }}
                        >
                          <div className="avt_nbl">
                            <Image
                              unoptimized
                              width={33}
                              height={33}
                              src={comment?.avatar}
                              alt=""
                              style={{ borderRadius: '50%' }}
                            />
                          </div>
                          <div
                            className="name_nbl"
                            style={{ paddingLeft: '10px' }}
                          >
                            <p
                              style={{
                                fontWeight: 'bold',
                                color: '#4c5bd4',
                                margin: '0 0 4px',
                              }}
                            >
                              {comment?.staff_name}
                            </p>
                            <p style={{ margin: '0' }}>
                              {convertTimestamp(comment?.created_at)}
                            </p>
                          </div>
                        </div>

                        <div className="vt_cmt">
                          <p
                            className="vt_cmt_nd"
                            style={{
                              paddingLeft: '10px',
                              margin: '0',
                            }}
                          >
                            {comment?.content}
                          </p>
                        </div>
                        <div>
                          {(employee === comment.staff_id || admin) && (
                            <BtnEdit
                              setReload={setReload}
                              reload={reload}
                              file={file}
                              comment={comment}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <input
                    className={styles.ipcmt}
                    type="text"
                    placeholder="Nhập bình luận và nhấn Enter để đăng"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addComment(commentInput);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
