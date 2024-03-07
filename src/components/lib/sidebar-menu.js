import {
  AiFillDashboard,
  AiFillSchedule,
  AiFillSecurityScan,
} from 'react-icons/ai'
import { SiPerforce } from 'react-icons/si'
import { BsFillInfoCircleFill, BsWebcamFill } from 'react-icons/bs'
import {
  FaArchive,
  FaCog,
  FaFolderOpen,
  FaHistory,
  FaVirus,
} from 'react-icons/fa'
import { MdSupportAgent } from 'react-icons/md'

export const SIDER_MENU_USER = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <AiFillDashboard size={18} />,
  },
  {
    title: 'Scan Schedule',
    url: '/schedule-scan',
    icon: <AiFillSchedule size={18} />,
  },
  {
    title: 'Web Vuln',
    url: '/web-vuln',
    icon: <BsWebcamFill size={18} />,
  },
  {
    title: 'Exploitation Tools',
    url: '/exploitation-tools',
    icon: <SiPerforce size={18} />,
  },
  {
    title: 'Info Gathering',
    url: '/info-gathering',
    icon: <BsFillInfoCircleFill size={18} />,
  },
  {
    title: 'History Scan',
    url: '/history-scan',
    icon: <FaHistory size={18} />,
  },
  {
    title: 'Agent Based',
    url: '/agent-based',
    icon: <MdSupportAgent size={18} />,
  },
  {
    title: 'Scan with Credential',
    url: '/scan-credential',
    icon: <AiFillSecurityScan size={18} />,
  },
  {
    title: 'Vulnerability',
    url: '',
    icon: <FaVirus size={18} />,
    subMenu: [
      {
        title: 'CVE',
        url: '/vuln/cve',
      },
      {
        title: 'CWE',
        url: '/vuln/cwe',
      },
    ],
  },
  {
    title: 'Internet Archive',
    url: '/internet-archive',
    icon: <FaArchive size={18} />,
  },
  // {
  //   title: 'API Docs',
  //   url: '',
  //   icon: <FaFolderOpen size={18} />,
  //   subMenu: [
  //     {
  //       title: 'Login',
  //       url: '/api-docs/login',
  //     },
  //     {
  //       title: 'Webapp',
  //       url: '/api-docs/webapp',
  //     },
  //     {
  //       title: 'Vulnscan',
  //       url: '/api-docs/vulnscan',
  //     },
  //     {
  //       title: 'History Scan',
  //       url: '/api-docs/history-scan',
  //     },
  //   ],
  // },
]

export const SIDER_MENU_ADMIN = [
  {
    title: 'Dashboard',
    url: '/',
    icon: <AiFillDashboard size={18} />,
  },
  {
    title: 'Scan Schedule',
    url: '/schedule-scan',
    icon: <AiFillSchedule size={18} />,
  },
  {
    title: 'Web Vuln',
    url: '/web-vuln',
    icon: <BsWebcamFill size={18} />,
  },
  {
    title: 'Exploitation Tools',
    url: '/exploitation-tools',
    icon: <SiPerforce size={18} />,
  },
  {
    title: 'Info Gathering',
    url: '/info-gathering',
    icon: <BsFillInfoCircleFill size={18} />,
  },
  {
    title: 'History Scan',
    url: '/history-scan',
    icon: <FaHistory size={18} />,
  },
  {
    title: 'Agent Based',
    url: '/agent-based',
    icon: <MdSupportAgent size={18} />,
  },
  {
    title: 'Scan with Credential',
    url: '/scan-credential',
    icon: <AiFillSecurityScan size={18} />,
  },
  {
    title: 'Vulnerability',
    url: '',
    icon: <FaVirus size={18} />,
    subMenu: [
      {
        title: 'CVE',
        url: '/vuln/cve',
      },
      {
        title: 'CWE',
        url: '/vuln/cwe',
      },
    ],
  },
  {
    title: 'Internet Archive',
    url: '/internet-archive',
    icon: <FaArchive size={18} />,
  },
  // {
  //   title: 'API Docs',
  //   url: '',
  //   icon: <FaFolderOpen size={18} />,
  //   subMenu: [
  //     {
  //       title: 'Login',
  //       url: '/api-docs/login',
  //     },
  //     {
  //       title: 'Webapp',
  //       url: '/api-docs/webapp',
  //     },
  //     {
  //       title: 'Vulnscan',
  //       url: '/api-docs/vulnscan',
  //     },
  //     {
  //       title: 'History Scan',
  //       url: '/api-docs/history-scan',
  //     },
  //   ],
  // },
  {
    title: 'Setting',
    url: '',
    icon: <FaCog size={18} />,
    subMenu: [
      {
        title: 'API Key',
        url: '/setting/api-key',
      },
      {
        title: 'Update Tools',
        url: '/setting/update-tools',
      },
      {
        title: 'Update CVE Version',
        url: '/setting/update-cve',
      },
      {
        title: 'Upgrade Tools',
        url: '/setting/upgrade-tools',
      },
    ],
  },
]
