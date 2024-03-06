import {
  HeartFilled,
  IdcardOutlined,
  TrophyFilled,
} from '@ant-design/icons';
import CalenderSVG from "/public/icons/calendar-icon.svg"
import { Image } from 'antd';
import React from 'react';
import { Paths } from '@routes/index';

const items = [
  {
    icon: CalenderSVG,
    name: 'Календарь',
    href: Paths.Calendar,
  },
  {
    icon: HeartFilled,
    name: 'Тренировки',
    href: '',
  },
  {
    icon: TrophyFilled,
    name: 'Достижения',
    href: '',
  },
  {
    icon: IdcardOutlined,
    name: 'Профиль',
    href: '',
  },
]

export const navItems = items.map(
  (item, index) => ({
    key: String(index + 1),
    icon: (item?.icon !== CalenderSVG) ? React.createElement(item.icon) : React.createElement(Image, {
      src: item.icon,
      alt: 'Calendar',
    }),
    label: item.name,
    href: item.href,
  }),
);