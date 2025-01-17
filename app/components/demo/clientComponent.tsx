"use client";

import { getUserById } from "@/data/user";
import { useEffect } from "react";

const ClientComponent = () => {
  console.log("ClientComponent");
  useEffect(() => {
    getUserById("cm5tx3ujc0002gvknz4zylp5p");
  }, []);
  return <div>ClientComponent</div>;
};

export default ClientComponent;
