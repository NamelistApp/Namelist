import { CloseButton, Divider, Group } from '@mantine/core'
import classes from '../styles/AppNavigation.module.scss'
import { A } from 'kea-router';
import { useActions, useValues } from 'kea';
import { userLogic } from '../../../auth/userLogic';
import { sceneLogic } from '../../sceneLogic';
import AppLogo from './AppLogo';
import { IconHome, IconLifebuoy, IconLogout, IconUsers } from '@tabler/icons-react'
import { urls } from '../../../domain/urls';
import { addPortalIdIfMissing } from '../../../lib/router-utils';
import navigationLogic from './navigationLogic';

export default function AppNavigation() {
    const { activeScene } = useValues(sceneLogic)
    const { logout } = useActions(userLogic)
    const { setOpened } = useActions(navigationLogic)

    const tabs = [
        { link: addPortalIdIfMissing(urls.dashboard()), label: 'Dashboard', scenes: ['Dashboard'], icon: IconHome },
        { link: addPortalIdIfMissing(urls.contacts()), label: 'People', scenes: ['Contacts', 'Contact'], icon: IconUsers }
    ]

    const links = tabs.map((item) => (
        <A
            className={classes.link}
            href={item.link}
            key={item.label}
            {...(activeScene && item.scenes.includes(activeScene) && { 'data-active': true })}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </A>
    ));

    return (
        <nav className={classes.navbar}>
            <Group justify="space-between">
                <AppLogo />
                <CloseButton hiddenFrom="sm" onClick={() => { setOpened(false) }} />
            </Group>

            <Divider my={10} />

            <div className={classes.navbarMain}>{links}</div>

            <div className={classes.footer}>
                <Divider my={10} />
                <a hrefApp="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLifebuoy className={classes.linkIcon} stroke={1.5} />
                    <span>Support</span>
                </a>

                <a href="#" className={classes.link} onClick={() => logout()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    )
}