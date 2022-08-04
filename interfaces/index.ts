import { StripeShippingAddressElement } from "@stripe/stripe-js";

export interface LecturerResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
}
export interface Lecturer {
  name: string;
  email: string;
  phone: string;
}

export interface CourseResponse2 {
  id: string;
  name: string;
  description: string;
}
export interface CourseResponse1 {
  id: string;
  lecturer: LecturerResponse;
  name: string;
  code: string;
  description: string;
  credits: number;
  semester: number;
  status: string;
}

export interface Course {
  lecturer: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  semester: string;
  status: string;
}

export enum Semester {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
}
export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
export interface CourseResponse {
  course: CourseResponse1;
}
export interface CourseResponseList {
  courses: CourseResponse2[];
}
export interface LecturerResponseList {
  lecturers: LecturerResponse[];
}
