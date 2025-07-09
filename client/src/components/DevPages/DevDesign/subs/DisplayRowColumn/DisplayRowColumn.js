import Div from "@/baseComponents/reusableComps/Div";
import Row from "@/baseComponents/reusableComps/Row";
import Column from "@/baseComponents/reusableComps/Column";

const DisplayRowColumn = () => {
  return (
    <>
      <Row className="width-per-100">
        <Column xs={12} sm={6} md={4} lg={3}>
          <Div className="width-per-100 m-all-16 bg-red text-white text-center">
            Column 1
          </Div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <Div className="width-per-100 m-all-16 bg-red text-white text-center">
            Column 2
          </Div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <Div className="width-per-100 m-all-16 bg-red text-white text-center">
            Column 3
          </Div>
        </Column>
        <Column xs={12} sm={6} md={4} lg={3}>
          <Div className="width-per-100 m-all-16 bg-red text-white text-center">
            Column 4
          </Div>
        </Column>
      </Row>
    </>
  );
};

export default DisplayRowColumn;
