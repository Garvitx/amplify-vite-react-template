import { FaBriefcase, FaSave, FaClipboardList, FaBuilding, FaUserCircle } from 'react-icons/fa';

const navConfig = [
  {
    title: 'Job Search',
    path: '/job-search',
    icon: <FaBriefcase />,
  },
  {
    title: 'Saved Jobs',
    path: '/saved-jobs',
    icon: <FaSave />,
  },
  {
    title: 'Applications',
    path: '/applications',
    icon: <FaClipboardList />,
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: <FaBuilding />,
  },
  {
    title: 'My Account',
    path: '/my-account',
    icon: <FaUserCircle />,
  },
  {
    title: 'NFT',
    path: '/nft-page',
    icon: <FaUserCircle />,
  },
];

export default navConfig;
