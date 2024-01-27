import {
  PresentationChartBarIcon,
  // CalendarIcon,
  DocumentChartBarIcon,
  UserCircleIcon,
  // Squares2X2Icon,
} from "@heroicons/react/24/solid";

export const links = [
  {
    links: [
      {
        name: "dashboard",
        icon: <PresentationChartBarIcon className="h-5 w-5" />,
      },
    ],
  },

  {
    links: [
      {
        name: "teachers",
        icon: <UserCircleIcon className="h-5 w-5" />,
      },
      {
        name: "students",
        icon: <UserCircleIcon className="h-5 w-5" />,
      },
      {
        name: "report",
        icon: <DocumentChartBarIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Apps",
    links: [
      // {
      //   name: "calender",
      //   icon: <CalendarIcon className="h-5 w-5" />,
      // },
      // {
      //   name: "kanban",
      //   icon: <Squares2X2Icon className="h-5 w-5" />,
      // },
    ],
  },
];
