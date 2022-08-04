import { gql } from "@apollo/client";

export const DELETE_LECTURER = gql`
  mutation deleteLecturer($id: ID!) {
    deleteLecturer(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_LECTURER = gql`
  mutation addLecturer($name: String!, $email: String!, $phone: String!) {
    addLecturer(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse(
    $lecturer: ID!
    $name: String!
    $code: String!
    $description: String!
    $credits: Int!
    $semester: Semester!
    $status: Status!
  ) {
    addCourse(
      lecturer: $lecturer
      name: $name
      code: $code
      description: $description
      credits: $credits
      semester: $semester
      status: $status
    ) {
      id
      name
      description
    }
  }
`;
export const UPDATE_COURSE = gql`
  mutation updateCourse(
    $id: ID!
    $name: String
    $code: String
    $description: String
    $credits: Int
    $semester: SemesterUpdate
    $status: StatusUpdate
  ) {
    updateCourse(
      id: $id
      name: $name
      code: $code
      description: $description
      credits: $credits
      semester: $semester
      status: $status
    ) {
      id
    }
  }
`;
export const DELETE_COURSE = gql`
  mutation deleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
    }
  }
`;
