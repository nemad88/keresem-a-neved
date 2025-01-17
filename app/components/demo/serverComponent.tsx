import { ReactNode } from "react";

const ServerComponent = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1>ServerComponent</h1>
      {children}
    </div>
  );
};

export default ServerComponent;
