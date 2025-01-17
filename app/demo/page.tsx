import ClientComponent from "../components/demo/clientComponent";
import ServerComponent from "../components/demo/serverComponent";

const Demo = () => {
  return (
    <div>
      <ServerComponent>
        <ClientComponent />
      </ServerComponent>
    </div>
  );
};

export default Demo;
