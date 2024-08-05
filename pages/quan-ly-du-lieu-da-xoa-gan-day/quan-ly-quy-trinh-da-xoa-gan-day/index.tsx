

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Input, Segmented } from "antd";
import DuLieuDaXoa from "./DuLieuDaXoa";
import DuLieuDaXoaCot from "./DuLieuDaXoaCot";
import { POST } from "@/pages/api/auth";
import Image from "next/image";
export interface NavbarProp { }

export default function QuyTrinhDaXoaGanDay({ setActiveKey, selectedColor }: { setActiveKey: Function, selectedColor: string }) {
  const [selectedOption, setSelectedOption] = useState("List");
  const [apiData, setApiData] = useState();
  const [reload,setReLoad] = useState(false);

  const renderApplyKey = () => {
    setActiveKey("du-lieu-da-xoa-gan-day");
  };
  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
  };
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const fetchApiData = () => {
    POST("deleted-data/quan-ly-quy-trinh-da-xoa-gan-day?keywords", {}).then(
      (response) => {
        setApiData(response?.data);
      }
    );
  };
  useEffect(() => {
    fetchApiData();
  }, [reload]);
  
  return (
    <div className={styles.box_setting}>
      <div className={styles.meeting_all}>
        <div className={`${styles.dau_1} ${selectedColor}`} onClick={renderApplyKey}>

          Quy trình đã xóa</div>
        <div className={styles.creart_meeting}>
          <div
            className={`${styles.creartm_one} ${styles.deta_delete_one} d-flex`}
          >
            <Segmented
              options={[
                {
                  value: "List",
                  icon: <BarsOutlined />,
                },
                {
                  value: "Kanban",
                  icon: <AppstoreOutlined />,
                },
              ]}
              onChange={handleOptionChange}
            />
          </div>
          <div className={`form_search_file ${styles.background}`}>
            <p></p>

            <div className="search_doc_file">
              <div className="searchcv">

                <Search placeholder="Tìm kiếm nhanh" onSearch={onSearch} />

              </div>
            </div>
          </div>
        </div>
        {selectedOption === "List" && <DuLieuDaXoa data={apiData} setDataSource={setApiData} reload={reload} setReLoad= {setReLoad} />}
        {selectedOption === "Kanban" && <DuLieuDaXoaCot data={apiData} setDataSource={setApiData} reload={reload} setReLoad= {setReLoad} />}
      </div>
    </div>
  );
}
