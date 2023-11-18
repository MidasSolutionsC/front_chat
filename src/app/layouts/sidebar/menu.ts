import { MenuItem } from './menu.model';

let aMenu: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true,
        roles: ['ADMINISTRADOR', 'VENDEDOR', 'COORDINADOR', 'BACKOFFICE']
    },
    {
        id: 2,
        label: 'MENUITEMS.MAIN.TEXT',
        icon: 'bx-home-circle',
        link: '/main',
        roles: ['ADMINISTRADOR', 'VENDEDOR', 'COORDINADOR', 'BACKOFFICE']

    },
    // {
    //     id: 4,
    //     label: 'MENUITEMS.CALL.TEXT',
    //     icon: 'bx bxs-phone-call ',
    //     link: '/call',
    //     roles: ['ADMINISTRADOR', 'VENDEDOR', 'COORDINADOR', 'BACKOFFICE']

    // },
    {
        id: 5,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true,
        // roles: ['ADMINISTRADOR', 'VENDEDOR', 'COORDINADOR', 'BACKOFFICE']

    },
    {
        id: 7,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx bx-chat',
        badge: {
            variant: 'primary',
            text: 'MENUITEMS.CHAT.BADGE',
        },
        link: '/chat',
        roles: ['ADMINISTRADOR', 'VENDEDOR', 'COORDINADOR', 'BACKOFFICE']
    },
    {
        id: 8,
        label: 'MENUITEMS.MAINTENANCE.TEXT',
        isTitle: true,
        roles: ['ADMINISTRADOR', 'COORDINADOR', 'BACKOFFICE']

    },
    {
        id: 11,
        label: 'MENUITEMS.MAINTENANCE.LIST.CAMPUS',
        icon: 'bx bx-buildings',
        link: '/maintenances/campus',
        roles: ['ADMINISTRADOR']

    },
    {
        id: 12,
        label: 'MENUITEMS.MAINTENANCE.LIST.USER',
        icon: 'bx bx-user',
        link: '/maintenances/user',
        roles: ['ADMINISTRADOR']
    },
    {
        id: 13,
        label: 'MENUITEMS.MAINTENANCE.LIST.COORDINATION',
        icon: 'mdi mdi-account-group',
        link: '/maintenances/coordination',
        roles: ['ADMINISTRADOR', 'COORDINADOR']
    },
    {
        id: 21,
        label: 'MENUITEMS.MAINTENANCE.LIST.TYPES.LABEL',
        icon: 'bx bxs-cog ',
        link: '/',
        roles: ['ADMINISTRADOR'],
        subItems: [
            {
                id: 23,
                parentId: 21,
                label: 'MENUITEMS.MAINTENANCE.LIST.TYPES.LIST.TYPE_DOCUMENT',
                link: '/maintenances/types/typeDocument',
                roles: ['ADMINISTRADOR']
            },
            {
                id: 24,
                parentId: 21,
                label: 'MENUITEMS.MAINTENANCE.LIST.TYPES.LIST.TYPE_USER',
                link: '/maintenances/types/typeUser',
                roles: ['ADMINISTRADOR']
            },
            {
                id: 25,
                parentId: 21,
                label: 'MENUITEMS.MAINTENANCE.LIST.TYPES.LIST.TYPE_STATUS',
                link: '/maintenances/types/typeStatus',
                roles: ['ADMINISTRADOR']
            },

        ]
    },
    {
        id: 30,
        label: 'MENUITEMS.SETTINGS.TEXT',
        isTitle: true,
        roles: ['ADMINISTRADOR']
    },
    {
        id: 31,
        label: 'MENUITEMS.SETTINGS.LIST.ALLOWED_IPS',
        icon: 'bx bx-link-external  ',
        link: '/allowed-ip',
        roles: ['ADMINISTRADOR']
    },
    {
        id: 32,
        label: 'MENUITEMS.SETTINGS.LIST.PERMISSION',
        icon: 'bx bx-shield-quarter',
        link: '/settings/permission',
        roles: ['ADMINISTRADOR']
    },
    {
        id: 33,
        label: 'MENUITEMS.SETTINGS.LIST.PERMISSION_ACCOUNT',
        icon: 'bx bx-shield-quarter',
        link: '/settings/type_user_permission',
        roles: ['ADMINISTRADOR']
    },

]


export const MENU: MenuItem[] = aMenu;
