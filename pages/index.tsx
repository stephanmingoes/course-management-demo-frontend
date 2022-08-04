import type { NextPage } from "next";
import Head from "next/head";
import AddLecturerModal from "../components/AddLecturerModal";
import Lecturers from "../components/Lecturers";
import Courses from "../components/Courses";
import AddCourseModal from "../components/AddCourseModal";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Course Management Demo📚</title>
      </Head>
      <AddLecturerModal />
      <AddCourseModal />
      <Courses />
      <Lecturers />
    </>
  );
};

export default Home;
