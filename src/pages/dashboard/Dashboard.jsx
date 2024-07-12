import React, { useState } from "react";
import styles from "./dashboard.module.css";

import ManageNotices from "@/components/manageNotices/ManageNotices";
import ManageTimetables from "@/components/manageTimetables/ManageTimetables";
import ManageUsers from "@/components/manageUsers/ManageUsers";

const Dashboard = () => {
  const sideNavigation = {
    notices: <ManageNotices />,
    timetables: <ManageTimetables />,
    users: <ManageUsers />,
  };

  const [activeTab, setActiveTab] = useState();

  return (
    <div className={styles.body}>
      <div className={styles.leftNavbar}>
        <div className={styles.navGrid}>
          <div
            className={`${styles.navItem} ${
              activeTab === "timetables" ? styles.activeNavItem : ""
            } rounded-t-xl`}
            onClick={() => setActiveTab("timetables")}
          >
            <span>Timetables</span>
          </div>
          <div
            className={`${styles.navItem} ${
              activeTab === "notices" ? styles.activeNavItem : ""
            }`}
            onClick={() => setActiveTab("notices")}
          >
            <span>Notices</span>
          </div>
          <div
            className={`${styles.navItem} ${
              activeTab === "users" ? styles.activeNavItem : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <span>Users</span>
          </div>
        </div>
      </div>
      <div className={styles.selectionViewer}>
        {sideNavigation[activeTab] || <div>Hi! This is your dashboard!</div>}
      </div>
    </div>
  );
};

export default Dashboard;
