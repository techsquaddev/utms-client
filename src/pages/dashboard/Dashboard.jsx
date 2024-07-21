import React, { useState } from "react";
import styles from "./dashboard.module.css";

import ManageNotices from "@/components/manageNotices/ManageNotices";
import ManageTimetables from "@/components/manageTimetables/ManageTimetables";
import ManageUsers from "@/components/manageUsers/ManageUsers";
import ManageSessions from "@/components/manageSessions/ManageSessions";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState();
  const [sessionProps, setSessionProps] = useState({});

  const handleSetActiveTab = (tab, props = {}) => {
    setActiveTab(tab);
    if (tab === "sessions") {
      setSessionProps(props);
    }
  };

  const sideNavigation = {
    notices: <ManageNotices />,
    timetables: <ManageTimetables setActiveTab={handleSetActiveTab} />,
    users: <ManageUsers />,
    // sessions: (props) => <ManageSessions id={props.id} name={props.name} />,
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.leftNavbar} shadow-xl`}>
        <div className={styles.navGrid}>
          <div
            className={`${styles.navItem} ${
              activeTab === "timetables" ? styles.activeNavItem : ""
            } rounded-t-xl`}
            onClick={() => handleSetActiveTab("timetables")}
          >
            <span>Timetables</span>
          </div>
          <div
            className={`${styles.navItem} ${
              activeTab === "notices" ? styles.activeNavItem : ""
            }`}
            onClick={() => handleSetActiveTab("notices")}
          >
            <span>Notices</span>
          </div>
          <div
            className={`${styles.navItem} ${
              activeTab === "users" ? styles.activeNavItem : ""
            }`}
            onClick={() => handleSetActiveTab("users")}
          >
            <span>Users</span>
          </div>
        </div>
      </div>
      <div className={`${styles.selectionViewer} shadow-xl`}>
        {activeTab === "sessions" ? (
          <ManageSessions id={sessionProps.id} name={sessionProps.name} />
        ) : (
          sideNavigation[activeTab] || <div>Hi! This is your dashboard!</div>
        )}
        {/* {sideNavigation[activeTab] || <div>Hi! This is your dashboard!</div>} */}
      </div>
    </div>
  );
};

export default Dashboard;
