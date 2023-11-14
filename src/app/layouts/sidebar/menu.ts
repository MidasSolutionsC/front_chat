import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
   
    {
        id: 1,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true
    },
    
    {
        id: 2,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx-chat',
        link: '/chat',
        
    },
    {
        id: 2,
        label: 'MENUITEMS.COORDINATIONS.TEXT',
        icon: 'bx-chat',
        link: '/chat',
        
    },
    
    {
        id: 3,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 4,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/contacts/grid',
                parentId: 49
            },
            {
                id: 5,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/contacts/list',
                parentId: 49
            },
            {
                id: 6,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/contacts/profile',
                parentId: 49
            }
        ]
    },
    
    {
        id: 7,
        label: 'MENUITEMS.GROUPS.TEXT',
        icon: 'bx-briefcase-alt',
        subItems: [
            {
                id: 8,
                label: 'MENUITEMS.GROUPS.LIST.GROUPSLIST',
                link: '/jobs/list',
                parentId: 57
            },
            
        ]
    },
    
];

