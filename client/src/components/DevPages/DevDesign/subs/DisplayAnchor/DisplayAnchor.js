import Div from "@/baseComponents/reusableComps/Div";
import Anchor from "@/baseComponents/reusableComps/Anchor";

const DisplayAnchor = () => {
  return (
    <>
      <Div>
        <Div>
          <Anchor to="https://google.com" anchorType="no-effect">
            Anchor Type no-effect
          </Anchor>
        </Div>

        <Div>
          <Anchor to="https://google.com" anchorType="internal-routing">
            Anchor Type internal-routing
          </Anchor>
        </Div>

        <Div>
          <Anchor to="https://google.com" anchorType="scale">
            Anchor Type scale
          </Anchor>
        </Div>
      </Div>
    </>
  );
};

export default DisplayAnchor;
