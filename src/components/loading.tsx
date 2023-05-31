import Lozenge from "@atlaskit/lozenge";
import Spinner from "@atlaskit/spinner";
import { token } from "@atlaskit/tokens";


const Loading = () => (
  <div style={{
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: token("space.100", "8px"),
    flexDirection: "column",
    backgroundColor: token("color.skeleton", "rgba(9, 30, 66, 0.04)")
  }}>
    <Spinner interactionName="load" size="xlarge"/>
    <Lozenge appearance="new">loading</Lozenge>
  </div>
)

export default Loading
