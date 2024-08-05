'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Detail.module.css';
import Thongtinchung from './Thongtinchung';
import Boss from './Ngchutri/Nguoichutri';
import Secretary from './Thuky/Thukycuochop';
import Prepare from './Ngchuanbi/Nguoichuabijcuochop';
import Participants from './Ngthamgia/Participants';
import CMT from './Commment';
import Report from './Report';
import EditMeeting from './Modal/EditMeeting';
import Bacham from './Modal/Bacham';
import {
  POST,
  POST_QLC,
  POST_QLC_NoCom,
  POST_QLTS,
  getCurrentID,
} from '@/pages/api/auth';

export default function DetailMeeting({
  setActiveKey,
  selectedColor,
}: {
  setActiveKey: Function;
  selectedColor: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData]: any = useState({});
  const [listDep, setListDep]: any = useState([]);
  const [listEmp, setListEmp]: any = useState([]);
  const [listRoom, setListRoom]: any = useState([]);
  const [reload, setReload] = useState<boolean>(true);
  const [meetingRole, setMeetingRole]: any = useState([]);
  useEffect(() => {
    POST('meetings/quan-ly-cuoc-hop', {}).then((res) => {
      if (res) {
        setListRoom(res?.data?.listMeetingRoom);
      }
    });
    POST_QLC_NoCom('department/list', {}).then((res) => {
      if (res) {
        setListDep(res?.items);
      }
    });
    // POST_QLTS('DanhSach/dep',{})
    // .then(res => {
    //   if(res){
    //     setListDep(res?.data)
    //   }
    // })
    POST_QLC_NoCom('managerUser/listAll', {}).then((res) => {
      if (res) {
        setListEmp(res?.items);
      }
    });
  }, []);
  useEffect(() => {
    if (reload) {
      POST(
        `meetings/chi-tiet-cuoc-hop/${Number(
          window.sessionStorage.getItem('id_chi_tiet_cuoc_hop')
        )}`,
        {}
      ).then((res) => {
        setData(res?.data?.meetingDetails);
        setMeetingRole(res?.data?.meetingRole);
      });
      setReload(false);
    }
  }, [reload]);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const renderApplyKey = () => {
    setActiveKey('quan-ly-cuoc-hop');
  };
  return (
    <div>
      <div className={`margin_x `}>
        <div className="detail_work">
          <div className={`text_name_work ${selectedColor}`}>
            <div className="name_detail" onClick={renderApplyKey}>
              <div>
                <Image
                  unoptimized
                  width={20}
                  height={15}
                  alt=""
                  className="img_back"
                  src="https://hungha365.com/storageimage/GV/img15.png"
                />
                {data?.name_meeting}
              </div>
            </div>
            <Bacham
              data={data}
              meetingRole={meetingRole}
              setActiveKey={setActiveKey}
              listDep={listDep}
              listEmp={listEmp}
              listRoom={listRoom}
              setReload={setReload}
            />
            <div>
              <div className={styles.info_meet}>
                <Thongtinchung dataChitiet={data} setReload={setReload} />
                <div className={styles.meet_ifmt_tv}>
                  <div className={styles.title_detl_meet}>
                    <h4>BỘ PHẬN THAM GIA</h4>
                  </div>
                  <div className={styles.detl_infm_meet}>
                    <div className={styles.avt_inf_meet}>
                      <p className={styles.bptg_met}>
                        <Image
                          unoptimized
                          className={styles.bptg}
                          src="https://hungha365.com/storageimage/GV/bophtg.png"
                          width={22}
                          height={22}
                          alt="icon"
                        />
                        Biên Tập
                      </p>
                    </div>
                  </div>
                </div>
                <Boss data={data} setReload={setReload} />
                <Secretary data={data} setReload={setReload} />
                <Prepare data={data} setReload={setReload} />
                <Participants data={data} setReload={setReload} />
                <CMT
                  dataAll={data}
                  data={data?.meetingComment}
                  setReload={setReload}
                />
                <Report
                  dataAll={data}
                  data={data?.meetingProtocol}
                  setReload={setReload}
                  meetingRole={meetingRole}
                />
              </div>
            </div>
          </div>
          <div className={styles.content_detail}></div>
        </div>
      </div>
    </div>
  );
}