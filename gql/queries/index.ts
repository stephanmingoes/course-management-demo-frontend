import { gql } from "@apollo/client";

export const GET_LECTURERS = gql`
  query getLecturers {
    lecturers {
      id
      name
      email
      phone
    }
  }
`;

export const GET_COURSES = gql`
  query getCourses {
    courses {
      id
      name
      description
    }
  }
`;

export const GET_COURSE = gql`
  query getCourse($id: ID!) {
    course(id: $id) {
      id
      lecturer {
        id
        name
        email
        phone
      }
      name
      code
      description
      credits
      semester
      status
    }
  }
`;
