import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./Components/Chats/NavigationBar";
import Chats from "./Components/Chats/Chats";
import ChatScreen from "./Components/Chats/ChatScreen";
// import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import UserProfile from "./Components/UserProfile/UserProfile";
import SwipePage from "./Components/SwipePage";
import ProfileCard from "./Components/ProfileCard";
import FindYourTechStar from "./pages/FindYourTechStar";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        {<NavBar />}
        <Routes>
          <Route
            path="/chatscreen"
            element={
              <>
                {/* <NavigationBar backButton="/chats" /> */}
                <ChatScreen />
              </>
            }
          />
          <Route
            path="/chats"
            element={
              <>
                {/* <NavigationBar backButton="/" /> */}
                <Chats />
              </>
            }
          />
          <Route
            path="/profile"
            element={<UserProfile />}
          />
          <Route
            path="/"
            element={<FindYourTechStar />}
          />
          <Route path="/home" element={<FindYourTechStar />} />

          <Route path="/signUp" element={<SignUp />} />

          <Route path="/swipe" element={<ProfileCard />} />
          <Route path="/swipefilter" element={<SwipePage />} />
          <Route
            exact
            path="/findyourtechstar"
            element={<FindYourTechStar />}
          />
        </Routes>
      </Router>
      {/* NavigationBar*/}
      {/* User Cards with React Tinder Card*/}
      {/* Chat Screen */}
      {/* Individual Chat Screen */}
    </div>
  );
}

export default App;
