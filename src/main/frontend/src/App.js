import "./App.css";

import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Inquiry } from "./pages/Inquiry";
import { TeamRegistration } from "./pages/TeamRegistration";
import { Footer } from "./components/Footer";
import { MatchRegistration } from "./pages/MatchRegistration";
import { User } from "./pages/User";
import { MatchList } from "./pages/MatchList";
import { MatchDetailModal } from "./components/MatchDetailModal";

function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/inquiry" element={<Inquiry />}></Route>
                  <Route
                      path="/team/registration"
                      element={<TeamRegistration />}
                  ></Route>
                  <Route
                      path="/match/registration"
                      element={<MatchRegistration />}
                  ></Route>
                  <Route path="/match/list" element={<MatchList/>}></Route>
                  <Route path="/user/info" element={<User />}></Route>
                  <Route path="/match/detail/:id" element={<MatchDetailModal/>}></Route>
              </Routes>
              <Footer />
          </BrowserRouter>
      </>
  );
}

export default App;
