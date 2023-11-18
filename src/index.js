import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Ads from "./pages/Ads";
import Support from "./pages/Support";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Dashboard";
import Account from "./pages/Account";
import { AuthProvider } from "./utils/AuthContext";
import Layout from "./layouts/Layout";
import Calendar from "./pages/Calendar";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import Privacy from "./pages/Privacy";
import ErrorPage from "./pages/ErrorPage";
import NewEvent from "./pages/NewEvent";
import User from "./pages/User";
import ViewEvent from "./pages/Event";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" index element={<App />} />
          <Route
            path="*"
            index
            element={
              <Layout>
                <ErrorPage />
              </Layout>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
              exact
            />

            <Route
              path="/me"
              element={
                <Layout>
                  <Account />
                </Layout>
              }
              exact
            />

            <Route
              path="/calendar"
              element={
                <Layout>
                  <Calendar />
                </Layout>
              }
              exact
            />
            <Route
              path="/chat/*"
              element={
                <Layout>
                  <Chat />
                </Layout>
              }
              exact
            >
              <Route path=":id" element={<Chat />} />
            </Route>
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
              exact
            />
            <Route
              path="/create"
              element={
                <Layout>
                  <NewEvent />
                </Layout>
              }
              exact
            />
            <Route
              path="user/:id"
              element={
                <Layout>
                  <User />
                </Layout>
              }
              exact
            />
            <Route
              path="event/:id"
              element={
                <Layout>
                  <ViewEvent />
                </Layout>
              }
              exact
            />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
