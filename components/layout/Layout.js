import Navbar from "./Navbar";
import { Fragment } from "react";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      <main className="h-[90vh] p-5">{children}</main>
    </Fragment>
  );
}
