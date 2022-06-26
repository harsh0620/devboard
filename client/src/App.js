import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, Error, ProtectedRoute } from "./pages";

import {
  Stats,
  Profile,
  AllJobs,
  AddJob,
  SharedLayout,
  Todo,
  Log,
  Pomodoro,
  AddBookMark,
} from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="add-bookmark" element={<AddBookMark />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="todo" element={<Todo />}></Route>
          <Route path="log" element={<Log />}></Route>
          <Route path="pomodoro" element={<Pomodoro />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
