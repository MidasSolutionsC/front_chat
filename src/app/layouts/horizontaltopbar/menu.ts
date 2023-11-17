import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    
       
    {
        id: 30,
        label: 'MENUITEMS.APPS.TEXT',
        icon: 'bx-customize',
        subItems: [
           
            {
                id: 31,
                label: 'MENUITEMS.CHAT.TEXT',
                link: '/chat',
                parentId: 30
            },
            
            {
                id: 32,
                label: 'MENUITEMS.CONTACTS.TEXT',
                icon: 'bxs-user-detail',
                subItems: [
                   
                    {
                        id: 69,
                        label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                        link: '/contacts/list',
                        parentId: 67
                    },
                    {
                        id: 70,
                        label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                        link: '/contacts/profile',
                        parentId: 67
                    }
                ]
            },
            {
                id: 71,
                label: 'MENUITEMS.GROUPS.TEXT',
                subItems: [
                    {
                        id: 72,
                        label: 'MENUITEMS.GROUPS.LIST.GROUPSLIST',
                        link: '/groups/list',
                        parentId: 71
                    }
                    
                ]
            },
            {
                id: 75,
                label: 'MENUITEMS.COORDINATIONS.TEXT',
                icon: 'bx-briefcase-alt',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.JOBS.BADGE',
                },
                link: '/coordinations',
            },
        ]
    },
    
           
];

