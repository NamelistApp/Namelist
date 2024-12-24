import { Divider } from '@mantine/core'
import classes from '../styles/AppNavigation.module.scss'
import { A } from 'kea-router';
import { useActions, useValues } from 'kea';
import { userLogic } from '../../../auth/userLogic';
import { sceneLogic } from '../../sceneLogic';
import AppLogo from './AppLogo';
import { IconLifebuoy, IconLogout, IconUsers } from '@tabler/icons-react'

export default function AppNavigation() {
    const { activeScene } = useValues(sceneLogic)
    const { logout } = useActions(userLogic)

    const project = {
        id: 1,
        name: 'Demo Project',
        avatar_url: 'https://www.appatar.io/com.apple.Music',
    }

    const tabs = [
        { link: '', label: 'Users', scenes: ['AppUsers'], icon: IconUsers },
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
            <AppLogo />

            <Divider mt={"lg"} />

            <div className={classes.navbarMain}>{links}</div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
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