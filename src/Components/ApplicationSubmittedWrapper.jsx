
import { useLocation } from "react-router";
import ApplicationSubmittedPage from "../pages/jobs/ApplicationSubmitted";

const ApplicationSubmittedWrapper = () => {
  const location = useLocation();
  const email = location.state?.email || "your@email.com";
  return <ApplicationSubmittedPage email={email} />;
}
export default ApplicationSubmittedWrapper;
