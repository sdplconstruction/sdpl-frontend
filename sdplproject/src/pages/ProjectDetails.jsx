import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProjectDetails() {
  return (
    <>
      <Header />

      <div
        style={{
          padding: "120px 8%",
          minHeight: "70vh",
        }}
      >
        <h1>Project Details</h1>
        <p>This page will display complete information about the selected project.</p>
      </div>

      <Footer />
    </>
  );
}