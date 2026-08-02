import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const PublicLayout = ({ children, isAuth, user }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      <Header isAuth={isAuth} user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
