import Seo from "@/components/wrappers/Seo";
import PageContainer from "@/components/wrappers/PageContainer";
import PdfTranslator from "@/components/PdfTranslator";

const Index = () => {
  return (
    <Seo>
      <PageContainer>
        <PdfTranslator />
      </PageContainer>
    </Seo>
  );
};

export default Index;
