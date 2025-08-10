import { useRouter } from "next/router";

import Seo from "@/components/wrappers/Seo";
import AppContainer from "@/components/wrappers/AppContainer";
import RoleBasedRoute from "@/components/wrappers/RoleBasedRoute";
import UserProjectDetail from "@/components/appPages/userPages/UserProjectDetail";

const Index = () => {
  const router = useRouter();
  const { uuid } = router.query;

  return (
    <Seo>
      <AppContainer
        pageIdentifier="dashboard"
        hasHeader={false}
        hasFooterNavigation={false}
        hasSideBarDashboard={false}
      >
        <RoleBasedRoute authorizedRoles={["CLIENT"]}>
          <UserProjectDetail uuid={uuid} />
        </RoleBasedRoute>
      </AppContainer>
    </Seo>
  );
};

export default Index;
