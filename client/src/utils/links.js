import { MdQueryStats } from "react-icons/md";
import {
  FaWpforms,
  FaHome,
  FaBookmark,
  FaBook,
  FaUserEdit,
} from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { AiFillClockCircle } from "react-icons/ai";
const links = [
  {
    id: 1,
    text: "home",
    path: "/",
    icon: <FaHome />,
  },
  {
    id: 2,
    text: "todo",
    path: "/todo",
    icon: <RiTodoFill />,
  },
  {
    id: 3,
    text: "logger",
    path: "/log",
    icon: <FaBook />,
  },
  {
    id: 4,
    text: "pomodoro clock",
    path: "/pomodoro",
    icon: <AiFillClockCircle />,
  },
  {
    id: 5,
    text: "jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 6,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 7,
    text: "add bookmark",
    path: "add-bookmark",
    icon: <FaBookmark />,
  },
  {
    id: 8,
    text: "profile",
    path: "profile",
    icon: <FaUserEdit />,
  },
];

export default links;
