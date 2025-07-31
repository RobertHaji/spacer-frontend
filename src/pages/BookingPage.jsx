import React from "react";
import AdminHeader from "@/components/adminsHeader";
import Footer from "@/components/ui/Footer";
import  BookingsHistory from "@/components/Bookingshistory";
function BookingsPage() {
  return (
    <>
      <AdminHeader/>
      <BookingsHistory />
      <Footer />
    </>
  );
}

export default BookingsPage;
