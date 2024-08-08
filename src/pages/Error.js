import { useRouteError, useNavigate } from "react-router-dom";

import PageContent from "../components/Layout/PageContent";
import MainNavigation from "../components/Layout/MainNavigation";
import Button from "../components/UI/Button";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "An error occured!";
  let message = "Something went wrong";

  if (error.status === 500 || error.status === 422) {
    title = error.data.title;
    message = error.data.message;
  } else if (error.status === 404) title = "Could not find a page";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
        <Button onClick={goBack}>Ok</Button>
      </PageContent>
    </>
  );
}

export default ErrorPage;
