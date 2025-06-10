import Seo from "@/components/wrappers/Seo";
import PageContainer from "@/components/wrappers/PageContainer";
import Dashboard from "@/components/adminPages/Dashboard";

const Index = () => {
  return (
    <Seo hidden_to_search_engines={true}>
      <PageContainer pageIdentifier="admin">
        <Dashboard />
      </PageContainer>
    </Seo>
  );
};

export default Index;
