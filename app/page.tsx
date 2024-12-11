"use client";

import React from "react";
import styles from "./page.module.css";
import Chat from "./components/chat";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Chat />
      </div>
    </Layout>
  );
}
