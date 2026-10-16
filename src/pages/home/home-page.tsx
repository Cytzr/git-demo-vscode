// import { reduxStore } from "../../redux/store";
import { ClearPersistMicrosoftToken, GetPersistMicrosoftToken, SetPersistMicrosoftToken } from "../../utilities/store-handling";
import HomeButton from "./home-components/home-button";
import { useNavigate } from "react-router-dom";
import "./home-style.css"

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = GetPersistMicrosoftToken();

  // console.log(reduxStore.getState().root["token-microsoft-redux"]);

  return (
    <div>
      <div className="home-button-container">
        <HomeButton isLoggedIn={isLoggedIn == undefined || isLoggedIn == null} />
      </div>
      <div className="navigation-container">
        <div className="binus-logo-container">
          <img src="src\assets\binus-logo.jpeg" alt="" />
        </div>
        <div className="navigation-button-container">
          {/* Code is included inside the navigation for example purposes, remove the code and it will return an error since this route is protected with a middleware*/}
          <button type="button" onClick={() => navigate("/auth/success?code=1.AVQAY7mFNLqCb0qBD7XMIm_4mAEWwACV2npCsTwGicj58keiABZUAA.AgABBAIAAABVrSpeuWamRam2jAF1XRQEAwDs_wUA9P9MQ0MMXn5bAYOA4eX5Bt2kRsxPk8RZoOPDpRqMys5vcbDytz_bOVOVm4ZBpZicFxAnE8EjukQ-PEzWGcnmti_8nt6rZxbvDaVqJPODjsqVKfzfVOUyNaENw1rLf8yl_1jcJZ7doKv7dEzme25ju4cK4oWrRmAZ2h50Ui7og8VVI345b2fyIUYsAwNbK7PEv87NlOVJa8d5KfawDb-w2TbjGJVCpL6Wubdea9sak_Z8nNOgOujE68WgJi-Yg6I3Dgn0EL3TqnhS7DbZfwSMpGMc1zL3EOzq9OOKlWk6rnNfNp8hJH9w2dosJ9QuVo1Vu3dw34_Fpu1OrPw1zZRWQKrS2qjX0z1iD_1_sqPbo4F2gVRXP-A6kiwjmNG8Kj79tqF3lmEPcdnCiRF0CdSXF22nZDJJDxP0wJKPGwbbin9KbXi32eSAaT2oKJfUNPuB_X1lco4_rc1mnnPGuvk0XgFAwjDgUZWsVbA0nl54mXy8RUa5nfNn2FJlz3TNwweqG_lRoEhuNPw2go0QvRGVvdyl2pAK8THExfeyCTn2ey5aW_cyIuvSFKI6ygK4kZCEwBz5ScspChtecNy4bamR9N_OC4ssrntyl8LQ7RUjodInZWTI3eqBfGISgVegg2i97bKcMImpkI3PzIzEPF71DrtaYbqIStGq0zR9NLh7rrGPOzyah3na0IVsjRcUXhbi0SNAao97M3JdaN3H-hFDzgAa5wDYp2cxDLUiyewT0RHmH1-pCYFYB2Yh0zFDbt1iNWHcRlPpYJRs7oW4u9G4QtKJcD-t0nQIOT-EOvjMvRTsK4d0eMvzykfuSEw0l7HjDvRaAo1VCyf0Flb-1Ip342SNIQfZ9wr5ECobTBONJF0IfYf03lt-6N_4BKu471jnzd1EKT23cHJwTuVEhHvNZXzq6D9-Gb53S5KzLCwvzpsZHKqJh7DooDw_&state=e27ed2b9-6bdb-4da8-ba06-b7770456815f&session_state=f7e83441-ddb4-49d3-a58c-fa1ecc09c576")}>Auth Success Page</button>
          <button type="button" onClick={() => navigate("/error")}>Error Page</button>
          <button type="button" onClick={
            () => {
              SetPersistMicrosoftToken({ code: "some code", state: "some state", sessionState: "some session state" });
              window.location.reload();
            }
          }>Set Token</button>
          <button type="button" onClick={
            () => {
              ClearPersistMicrosoftToken()
              window.location.reload();
            }
          }>Clear Token</button>
        </div>
      </div>
    </div >
  )
}

export default HomePage;