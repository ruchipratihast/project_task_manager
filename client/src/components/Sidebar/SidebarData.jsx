import React from 'react';
import layoutImage from '../../assets/icons/layout.png'
import dbImage from '../../assets/icons/database.png'
import settingsImage from '../../assets/icons/settings.png'

export const SidebarData = [
   {
    title: "Board",
    icon: layoutImage,
    link: '/board'
   },
   {
    title: "Analytics",
    icon: dbImage,
    link: '/analytics'
   },
   {
    title: "Setting",
    icon: settingsImage,
    link: '/setting'
   }
]
